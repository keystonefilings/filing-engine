import { PDFDocument } from "pdf-lib";
import type { ArtifactStore } from "../artifacts/store.js";
import { isArtifactId } from "../artifacts/store.js";
import type { FilingRequest } from "../domain/filing.js";
import type { ValidationIssue } from "../domain/validation.js";

/**
 * Supporting documents a client uploads with a filing (decision 19, Nov 26): the home state's
 * Certificate of Existence for a NY Application for Authority, and the NYS Tax Commission's consent
 * when the corporation already did business in New York. Each is a PDF kept per client company;
 * the filing names it by id, and the E-Submission run adds its pages after the signed form, in the
 * one PDF it uploads.
 */
export const SUPPORTING_DOCUMENT_KINDS = {
  certificate_of_existence: "Certificate of Existence from the home state",
  tax_commission_consent: "NYS Tax Commission consent",
} as const;
export type SupportingDocumentKind = keyof typeof SUPPORTING_DOCUMENT_KINDS;

/** Largest document we keep, in bytes. */
export const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;
const MAX_PAGES = 50;

/** Where a client company's documents are kept (the artifact store's folder). */
export const documentOwner = (clientCompanyId: string) => `document-${clientCompanyId}`;

/** Whether the bytes are a PDF we can add to the state's form: not password-protected, 1 to 50 pages. */
export async function checkPdf(bytes: Buffer): Promise<{ ok: true; pages: number } | { ok: false; reason: string }> {
  if (bytes.length === 0) return { ok: false, reason: "the file is empty" };
  if (bytes.length > MAX_DOCUMENT_BYTES) return { ok: false, reason: "the PDF must be 10 MB or smaller" };
  if (bytes.subarray(0, 1024).indexOf("%PDF-") < 0) return { ok: false, reason: "the file must be a PDF" };
  let pages: number;
  try {
    const doc = await PDFDocument.load(bytes, { updateMetadata: false });
    pages = doc.getPageCount(); // throws on a file with a PDF header but no page tree
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, reason: /encrypt/i.test(msg) ? "the PDF is password-protected; upload a copy without a password" : "the PDF can't be read; upload it again or save it as a new PDF" };
  }
  if (pages < 1) return { ok: false, reason: "the PDF has no pages" };
  if (pages > MAX_PAGES) return { ok: false, reason: `the PDF has ${pages} pages; at most ${MAX_PAGES}` };
  return { ok: true, pages };
}

/** The documents a filing names, with the kind each must be. */
export function documentRefs(req: Pick<FilingRequest, "paperUpload">): { path: string; id: string; kind: SupportingDocumentKind }[] {
  const a = req.paperUpload?.form === "ny_application_for_authority" ? req.paperUpload.applicationForAuthority : undefined;
  if (!a) return [];
  const out: { path: string; id: string; kind: SupportingDocumentKind }[] = [];
  const base = "paperUpload.applicationForAuthority";
  if (a.certificateOfExistenceDocumentId) out.push({ path: `${base}.certificateOfExistenceDocumentId`, id: a.certificateOfExistenceDocumentId, kind: "certificate_of_existence" });
  if (a.priorActivity === "tax_consent_attached" && a.taxConsentDocumentId) out.push({ path: `${base}.taxConsentDocumentId`, id: a.taxConsentDocumentId, kind: "tax_commission_consent" });
  return out;
}

/** A client company's document of the given kind, or why it can't be used. Another company's is never opened. */
export async function loadSupportingDocument(artifacts: ArtifactStore, clientCompanyId: string, id: string, kind: SupportingDocumentKind): Promise<{ ok: true; body: Buffer } | { ok: false; reason: string }> {
  if (!isArtifactId(id)) return { ok: false, reason: `${SUPPORTING_DOCUMENT_KINDS[kind]}: not an uploaded document` };
  const got = await artifacts.get(id);
  if (!got || got.meta.filingId !== documentOwner(clientCompanyId) || got.meta.kind !== kind) {
    return { ok: false, reason: `${SUPPORTING_DOCUMENT_KINDS[kind]}: no such document uploaded for this company` };
  }
  return { ok: true, body: got.body };
}

/** Errors for documents a filing names that aren't this company's uploads of the right kind. */
export async function documentIssues(artifacts: ArtifactStore | undefined, req: FilingRequest): Promise<ValidationIssue[]> {
  const refs = documentRefs(req);
  if (!refs.length || !artifacts) return [];
  const issues: ValidationIssue[] = [];
  for (const r of refs) {
    const d = await loadSupportingDocument(artifacts, req.clientCompanyId, r.id, r.kind);
    if (!d.ok) issues.push({ path: r.path, message: d.reason, severity: "error" });
  }
  return issues;
}

/** The state's form with each document's pages after it, in order, as one PDF. */
export async function appendDocuments(form: Uint8Array, documents: Buffer[]): Promise<Uint8Array> {
  if (!documents.length) return form;
  const out = await PDFDocument.load(form);
  for (const body of documents) {
    const doc = await PDFDocument.load(body);
    const pages = await out.copyPages(doc, doc.getPageIndices());
    for (const p of pages) out.addPage(p);
  }
  return out.save();
}
