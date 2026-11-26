import { engine } from "./engine";

/** Largest PDF the engine keeps (src/documents/supporting.ts). */
export const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024;

export interface UploadedDocument { id: string; kind: string; label: string; pages: number; bytes: number; createdAt: string }

/** Uploads a client's supporting PDF (decision 19) for a company; the filing names it by the returned id. */
export async function uploadDocument(apiKey: string, clientCompanyId: string, input: { kind: "certificate_of_existence" | "tax_commission_consent"; bytes: Buffer; fileName?: string }): Promise<UploadedDocument> {
  const r = await engine<{ document: UploadedDocument }>(apiKey, `/v1/client-companies/${encodeURIComponent(clientCompanyId)}/documents`, {
    method: "POST", body: { kind: input.kind, data: input.bytes.toString("base64"), fileName: input.fileName?.slice(0, 200) },
  });
  return r.document;
}
