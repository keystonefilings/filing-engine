import { randomBytes } from "node:crypto";
import { engine, EngineError, type CreateFilingResult } from "../engine";
import { saveSignature, listSignatures, sameSigner } from "../signatures";
import { buildRequest, getPath, rawFromFormData, type BuildContext } from "./build";
import type { FilingKind } from "./forms";
import { NEW_SIGNATURE } from "./signature-field";

export type SubmitOutcome =
  | { ok: true; result: CreateFilingResult }
  | { ok: false; error?: string; issues: { path: string; message: string }[] };

export interface SubmitContext extends Omit<BuildContext, "idempotencyKey"> {
  apiKey: string;
  /** A stable key per form (its nonce), so a double submit makes one filing. */
  idempotencySeed: string;
  /** Whether the form may use a signature saved earlier (firm staff), or must be signed fresh (a client link). */
  allowSavedSignature: boolean;
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
      if (raw[NEW_SIGNATURE.consent] !== "on") issues.push({ path: sig.path, message: "Signature: please tick the box to adopt it" });
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

  // Check the form before saving anything, so a form with mistakes saves no signature.
  const idempotencyKey = `portal-${ctx.idempotencySeed}`.slice(0, 120);
  const probe = buildRequest(kind, { ...raw, ...(sig && raw[sig.path] === NEW_SIGNATURE.choice ? { [sig.path]: "pending" } : {}) }, { ...ctx, idempotencyKey });
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

  const { request } = buildRequest(kind, raw, { ...ctx, idempotencyKey });
  try {
    const result = await engine<CreateFilingResult>(ctx.apiKey, "/v1/filings", { method: "POST", body: request });
    return { ok: true, result };
  } catch (e) {
    if (e instanceof EngineError && e.status === 422) {
      const body = e.body as { issues?: { path: string; message: string }[]; error?: unknown };
      const list = Array.isArray(body?.issues) ? body.issues : Array.isArray(body?.error) ? (body.error as { path: (string | number)[]; message: string }[]).map((i) => ({ path: (i.path ?? []).join("."), message: i.message })) : [];
      return { ok: false, error: "The filing engine found problems with these answers.", issues: list.map((i) => ({ path: i.path, message: i.message })) };
    }
    return { ok: false, error: e instanceof EngineError ? e.message : "The filing could not be created. Please try again.", issues: [] };
  }
}

/** A fresh nonce for a form render. */
export function newNonce(): string {
  return randomBytes(12).toString("base64url");
}

export { getPath };
