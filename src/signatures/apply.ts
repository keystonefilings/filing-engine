import type { ApprovalRecord, FilingRecord, Store } from "../store/types.js";
import { openImage, sha256, signatureKey } from "./sealed.js";

export type SignatureDecision =
  | { ok: true; png: Buffer; signatureId: string }
  | { ok: false; reason: string };

function normalizeName(s: string): string {
  return s.normalize("NFKD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z]+/g, " ").trim();
}

/**
 * The one gate for placing a saved signature on a form. It opens the sealed image only when every
 * condition holds, and otherwise says why not:
 *  - this is a real run, never a dry run or preview;
 *  - the filing's client approved it, and the approval covers exactly this payload (same hash);
 *  - the signature belongs to the filing's tenant and client company and is not revoked;
 *  - the name it was saved under is the signer named on the form;
 *  - the image is intact (its hash matches the one recorded when it was saved).
 */
export async function signatureForApprovedFiling(input: {
  store: Store;
  filing: FilingRecord;
  approval: ApprovalRecord | null;
  dryRun: boolean;
  signatureId: string | undefined;
  signerName: string;
  now?: () => Date;
  key?: Buffer;
}): Promise<SignatureDecision> {
  const { store, filing, approval } = input;
  if (input.dryRun) return { ok: false, reason: "dry run: forms are never signed on a dry run" };
  if (!input.signatureId) return { ok: false, reason: "no saved signature chosen for this filing" };
  if (!approval || approval.status !== "approved") return { ok: false, reason: "the filing has not been approved" };
  if (approval.filingId !== filing.id || approval.tenantId !== filing.tenantId) return { ok: false, reason: "the approval is for another filing" };
  if (approval.payloadHash !== filing.payloadHash) return { ok: false, reason: "the filing changed after it was approved" };
  const sig = await store.getSignature(input.signatureId);
  if (!sig || sig.tenantId !== filing.tenantId || sig.clientCompanyId !== filing.clientCompanyId) return { ok: false, reason: "the saved signature does not belong to this company" };
  if (sig.revokedAt || !sig.sealedImage) return { ok: false, reason: "the saved signature was revoked" };
  if (normalizeName(sig.signerName) !== normalizeName(input.signerName)) return { ok: false, reason: `the saved signature is ${sig.signerName}'s, but the form is signed by ${input.signerName}` };
  let png: Buffer;
  try {
    png = openImage(sig.sealedImage, sig.id, input.key ?? signatureKey());
  } catch {
    return { ok: false, reason: "the saved signature could not be opened (SIGNATURE_KEY missing or changed)" };
  }
  if (sha256(png) !== sig.imageSha256) return { ok: false, reason: "the saved signature image does not match its record" };
  await store.touchSignature(sig.id, (input.now ?? (() => new Date()))().toISOString());
  return { ok: true, png, signatureId: sig.id };
}
