import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Approval link token: <approvalId>.<nonce>.<hmac>. Single use is enforced by the
 * approval record (status), expiry by the record's expiresAt; the HMAC proves the
 * link was issued by us and not altered.
 */
export function mintToken(secret: string, approvalId: string): string {
  const nonce = randomBytes(12).toString("base64url");
  const mac = sign(secret, `${approvalId}.${nonce}`);
  return `${approvalId}.${nonce}.${mac}`;
}

export function verifyToken(secret: string, token: string): { approvalId: string } | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [approvalId, nonce, mac] = parts as [string, string, string];
  const expected = sign(secret, `${approvalId}.${nonce}`);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return { approvalId };
}

function sign(secret: string, data: string): string {
  return createHmac("sha256", secret).update(data).digest("base64url");
}

export function mintOneTimeCode(): string {
  return String(randomBytes(4).readUInt32BE(0) % 1_000_000).padStart(6, "0");
}
