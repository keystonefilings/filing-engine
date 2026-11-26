import { randomBytes } from "node:crypto";
import { engine, EngineError, type CreateFilingResult } from "../engine";
import { saveSignature, listSignatures, sameSigner } from "../signatures";
import { buildRequest, getPath, rawFromFormData, visibility, type BuildContext } from "./build";
import { uploadDocument, MAX_DOCUMENT_BYTES } from "../documents";
import type { FilingKind } from "./forms";
import { NEW_SIGNATURE } from "./signature-field";

export type SubmitOutcome =
  | { ok: true; result: CreateFilingResult }
  | { ok: false; error?: string; issues: { path: string; message: string }[] };

export interface SubmitContext extends Omit<BuildContext, "idempotencyKey"> {
  apiKey: string;
  /** V39: a public page or widget: post here with no key (the engine's /v1/public/firms/... route). */
  publicPath?: string;
  /** A stable key per form (its nonce), so a double submit makes one filing. */
  idempotencySeed: string;
  /** Whether the form may use a signature saved earlier (firm staff), or must be signed fresh (a client link). */
  allowSavedSignature: boolean;
}

/** The kind's PDF fields (decision 19). Top-level fields only. */
function pdfFields(kind: FilingKind) {
  const out = [];
  for (const s of kind.sections) for (const it of s.items) if (it.kind === "field" && it.type === "pdf") out.push(it);
  return out;
}

/** The signature field of a kind, if it has one. */
function signatureField(kind: FilingKind) {
  for (const s of kind.sections) for (const it of s.items) if (it.kind === "field" && it.type === "signature") return it;
  return undefined;
}

/**
 * Turns a submitted intake form into an engine filing. A signature drawn in the form is saved first,
 * with the signer's consent, and only its id goes into the filing; the engine places it on the form
 * after the filing is approved.
 */
export async function submitIntake(kind: FilingKind, fd: FormData, ctx: SubmitContext): Promise<SubmitOutcome> {
  const raw = rawFromFormData(fd);
  const sig = signatureField(kind);
  const issues: { path: string; message: string }[] = [];

  if (sig && sig.signerPath) {
    const signer = raw[sig.signerPath]?.trim() ?? "";
    const choice = raw[sig.path] ?? "";
    if (choice === NEW_SIGNATURE.choice) {
      const image = raw[NEW_SIGNATURE.image] ?? "";
      if (!image) issues.push({ path: sig.path, message: "Signature: please sign in the box" });
      if (raw[NEW_SIGNATURE.consent] !== "on") issues.push({ path: sig.path, message: "Signature: please check the box to adopt it" });
      if (!signer) issues.push({ path: sig.signerPath, message: "Signer's name: required before signing" });
    } else if (choice && !ctx.allowSavedSignature) {
      issues.push({ path: sig.path, message: "Signature: please sign in the box" });
    } else if (choice) {
      const { signatures } = await listSignatures(ctx.apiKey, ctx.clientCompanyId);
      const saved = signatures.find((s) => s.id === choice && s.active);
      if (!saved) issues.push({ path: sig.path, message: "Signature: that saved signature is no longer available" });
      else if (signer && !sameSigner(saved.signerName, signer)) issues.push({ path: sig.path, message: `Signature: the saved signature is ${saved.signerName}'s, but the signer is ${signer}` });
    }
  }

  // PDFs: each shown field needs a PDF of 10 MB or less. They're uploaded once the form checks out.
  const shown = visibility(kind, raw).top;
  const files: { path: string; label: string; kind: NonNullable<ReturnType<typeof pdfFields>[number]["documentKind"]>; file: File }[] = [];
  for (const pf of pdfFields(kind)) {
    if (!shown.has(pf.path) || !pf.documentKind) continue;
    const file = fd.get(pf.path);
    if (!(file instanceof File) || file.size === 0) { if (pf.required) issues.push({ path: pf.path, message: `${pf.label}: choose the PDF` }); continue; }
    if (file.size > MAX_DOCUMENT_BYTES) { issues.push({ path: pf.path, message: `${pf.label}: the PDF must be 10 MB or smaller` }); continue; }
    if (ctx.publicPath) { issues.push({ path: pf.path, message: `${pf.label}: this form takes uploads only from the firm's own portal` }); continue; }
    files.push({ path: pf.path, label: pf.label, kind: pf.documentKind, file });
  }

  // Check the form before saving anything, so a form with mistakes saves no signature and no upload.
  const idempotencyKey = `${ctx.publicPath ? "public" : "portal"}-${ctx.idempotencySeed}`.slice(0, 120);
  const pendingUploads = Object.fromEntries(files.map((f) => [f.path, "pending"]));
  const probe = buildRequest(kind, { ...raw, ...pendingUploads, ...(sig && raw[sig.path] === NEW_SIGNATURE.choice ? { [sig.path]: "pending" } : {}) }, { ...ctx, idempotencyKey });
  issues.push(...probe.issues);
  if (issues.length) return { ok: false, issues };

  if (sig && raw[sig.path] === NEW_SIGNATURE.choice) {
    try {
      const { consentText } = await listSignatures(ctx.apiKey, ctx.clientCompanyId);
      const saved = await saveSignature(ctx.apiKey, {
        clientCompanyId: ctx.clientCompanyId, signerName: raw[sig.signerPath!]!.trim(), image: raw[NEW_SIGNATURE.image]!,
        consentText, capturedBy: `${ctx.source}:${ctx.submittedBy}`,
      });
      raw[sig.path] = saved.id;
    } catch (e) {
      return { ok: false, error: e instanceof EngineError ? `The signature couldn't be saved: ${e.message}` : "The signature couldn't be saved.", issues: [] };
    }
  }

  for (const f of files) {
    try {
      const doc = await uploadDocument(ctx.apiKey, ctx.clientCompanyId, { kind: f.kind, bytes: Buffer.from(await f.file.arrayBuffer()), fileName: f.file.name });
      raw[f.path] = doc.id;
    } catch (e) {
      const why = e instanceof EngineError ? ((e.body as { issues?: { message: string }[] })?.issues?.[0]?.message ?? e.message) : "it couldn't be uploaded";
      return { ok: false, issues: [{ path: f.path, message: `${f.label}: ${why}` }] };
    }
  }

  const { request } = buildRequest(kind, raw, { ...ctx, idempotencyKey });
  try {
    const result = ctx.publicPath
      ? await engine<CreateFilingResult>(null, ctx.publicPath, { method: "POST", body: request })
      : await engine<CreateFilingResult>(ctx.apiKey, "/v1/filings", { method: "POST", body: request });
    return { ok: true, result };
  } catch (e) {
    if (e instanceof EngineError && e.status === 422) {
      const body = e.body as { issues?: { path: string; message: string }[]; error?: unknown };
      const list = Array.isArray(body?.issues) ? body.issues : Array.isArray(body?.error) ? (body.error as { path: (string | number)[]; message: string }[]).map((i) => ({ path: (i.path ?? []).join("."), message: i.message })) : [];
      return { ok: false, error: "The filing engine found problems with these answers.", issues: list.map((i) => ({ path: i.path, message: i.message })) };
    }
    if (e instanceof EngineError && e.status === 402) {
      return { ok: false, error: ctx.publicPath ? "This firm can't take filings online right now. Please contact them directly." : "Your subscription isn't active, so this can't be filed for real. Subscribe under Billing, or send it as a practice filing.", issues: [] };
    }
    return { ok: false, error: e instanceof EngineError ? e.message : "The filing could not be created. Please try again.", issues: [] };
  }
}

/** A fresh nonce for a form render. */
export function newNonce(): string {
  return randomBytes(12).toString("base64url");
}

export { getPath };
