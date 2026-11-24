import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

/**
 * Saved signatures are sensitive: a signature image signs legal documents. The image is kept only
 * encrypted (AES-256-GCM) with SIGNATURE_KEY, which lives in the environment (Fly secrets), never in
 * the database. The API never returns the image; only a filing run that the client approved reads it.
 */
export class SignatureKeyMissing extends Error {
  constructor() { super("signature storage is not set up: set SIGNATURE_KEY (32 random bytes, base64) on the API and worker"); }
}

export function signatureKey(env: NodeJS.ProcessEnv = process.env, production = env.NODE_ENV === "production"): Buffer {
  const raw = env.SIGNATURE_KEY?.trim();
  if (raw) {
    const k = Buffer.from(raw, "base64");
    if (k.length !== 32) throw new Error("SIGNATURE_KEY must be 32 bytes, base64-encoded (openssl rand -base64 32)");
    return k;
  }
  if (production) throw new SignatureKeyMissing();
  return createHash("sha256").update("development-only-signature-key").digest();
}

/** iv(12) | tag(16) | ciphertext, base64. The record id is bound in as associated data. */
export function sealImage(png: Buffer, recordId: string, key: Buffer = signatureKey()): string {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key, iv);
  c.setAAD(Buffer.from(`signature:${recordId}`));
  const enc = Buffer.concat([c.update(png), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), enc]).toString("base64");
}

export function openImage(sealed: string, recordId: string, key: Buffer = signatureKey()): Buffer {
  const raw = Buffer.from(sealed, "base64");
  const d = createDecipheriv("aes-256-gcm", key, raw.subarray(0, 12));
  d.setAAD(Buffer.from(`signature:${recordId}`));
  d.setAuthTag(raw.subarray(12, 28));
  return Buffer.concat([d.update(raw.subarray(28)), d.final()]);
}

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** Accepts a PNG as a data URL or bare base64; checks it is a real, reasonably sized PNG. */
export function parsePng(input: string): { png: Buffer; width: number; height: number } {
  const b64 = input.startsWith("data:") ? input.replace(/^data:image\/png;base64,/, "") : input;
  if (b64 === input && input.startsWith("data:")) throw new Error("signature must be a PNG image");
  const png = Buffer.from(b64, "base64");
  if (png.length < 100 || png.length > 300_000) throw new Error("signature image must be between 100 bytes and 300 KB");
  if (!png.subarray(0, 8).equals(PNG_MAGIC) || png.toString("ascii", 12, 16) !== "IHDR") throw new Error("signature must be a PNG image");
  const width = png.readUInt32BE(16), height = png.readUInt32BE(20);
  if (width < 50 || height < 20 || width > 3000 || height > 1500) throw new Error("signature image has an unusual size");
  return { png, width, height };
}

export function sha256(b: Buffer): string {
  return createHash("sha256").update(b).digest("hex");
}
