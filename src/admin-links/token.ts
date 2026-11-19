import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/**
 * Admin decision link: <scope>.<id>.<nonce>.<hmac>. Used for the two beta flows that
 * send a filing-company admin (never the end client) a signed link to decide on:
 *   name   -> a name-resolution record (pick an available alternative, or type one)
 *   review -> a beta review-gate record (approve/reject the review screen before submit)
 * Single use and expiry are enforced by the record's status/expiresAt; the HMAC proves
 * the link was issued by us and not altered. Same secret as the client approval links.
 */
export type AdminLinkScope = "name" | "review";

export function mintAdminToken(secret: string, scope: AdminLinkScope, id: string): string {
  const nonce = randomBytes(12).toString("base64url");
  const mac = sign(secret, `${scope}.${id}.${nonce}`);
  return `${scope}.${id}.${nonce}.${mac}`;
}

export function verifyAdminToken(secret: string, token: string): { scope: AdminLinkScope; id: string } | null {
  const parts = token.split(".");
  if (parts.length !== 4) return null;
  const [scope, id, nonce, mac] = parts as [string, string, string, string];
  if (scope !== "name" && scope !== "review") return null;
  const expected = sign(secret, `${scope}.${id}.${nonce}`);
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return { scope, id };
}

function sign(secret: string, data: string): string {
  return createHmac("sha256", secret).update(data).digest("base64url");
}
