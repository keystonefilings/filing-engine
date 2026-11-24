import { engine } from "./engine";

export interface SavedSignature { id: string; clientCompanyId: string; signerName: string; signerEmail?: string; createdAt: string; capturedBy: string; revokedAt?: string; lastUsedAt?: string; active: boolean }

/** A company's saved signatures (never the images) and the consent the signer has to accept. */
export async function listSignatures(apiKey: string, clientCompanyId: string): Promise<{ signatures: SavedSignature[]; consentText: string }> {
  return engine(apiKey, `/v1/signatures?clientCompanyId=${encodeURIComponent(clientCompanyId)}`);
}

export async function saveSignature(apiKey: string, input: { clientCompanyId: string; signerName: string; signerEmail?: string; image: string; consentText: string; capturedBy: string }): Promise<SavedSignature> {
  const r = await engine<{ signature: SavedSignature }>(apiKey, "/v1/signatures", { method: "POST", body: { ...input, consented: true } });
  return r.signature;
}

export async function revokeSignature(apiKey: string, id: string): Promise<void> {
  await engine(apiKey, `/v1/signatures/${encodeURIComponent(id)}`, { method: "DELETE" });
}

/** Names compared the way the engine compares them before signing. */
export function sameSigner(a: string, b: string): boolean {
  const n = (s: string) => s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]+/g, " ").trim();
  return n(a) === n(b);
}
