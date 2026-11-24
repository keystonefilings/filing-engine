import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

/**
 * Sealed tokens: AES-256-GCM over a JSON payload with an expiry. Used for sign-in cookies and
 * invite links, so this site needs no database of its own. Each purpose derives its own key,
 * so a cookie can never be replayed as an invite link or the other way round.
 */

export type Purpose = "session" | "staff-invite" | "client-intake";

const MIN_SECRET = 32;

function secret(): string {
  const s = process.env.PORTAL_SESSION_SECRET ?? "";
  if (s.length >= MIN_SECRET && !/change-me/i.test(s)) return s;
  if (process.env.NODE_ENV === "production") {
    throw new Error(`PORTAL_SESSION_SECRET must be a random value of at least ${MIN_SECRET} characters`);
  }
  return "development-only-portal-secret-not-for-production";
}

function keyFor(purpose: Purpose, s = secret()): Buffer {
  return createHash("sha256").update(`keystone-web:${purpose}:${s}`).digest();
}

export function seal(purpose: Purpose, payload: Record<string, unknown>, ttlSeconds: number, s?: string): string {
  const body = JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + ttlSeconds });
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", keyFor(purpose, s), iv);
  const enc = Buffer.concat([c.update(body, "utf8"), c.final()]);
  return Buffer.concat([iv, c.getAuthTag(), enc]).toString("base64url");
}

export function unseal<T extends Record<string, unknown>>(purpose: Purpose, token: string | undefined, s?: string): (T & { exp: number }) | null {
  if (!token || token.length > 8000) return null;
  try {
    const raw = Buffer.from(token, "base64url");
    if (raw.length < 29) return null;
    const d = createDecipheriv("aes-256-gcm", keyFor(purpose, s), raw.subarray(0, 12));
    d.setAuthTag(raw.subarray(12, 28));
    const body = Buffer.concat([d.update(raw.subarray(28)), d.final()]).toString("utf8");
    const parsed = JSON.parse(body) as T & { exp: number };
    if (typeof parsed.exp !== "number" || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}
