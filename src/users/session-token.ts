import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed session keys for people signed in through the dashboard: "kfs_<payload>.<mac>".
 * The front end presents one in x-api-key on the signed-in person's behalf, like an API key.
 * The payload names the user, the tenant and, for a partner, the one client company the key is
 * limited to; the engine re-reads the user on every request, so disabling a user ends its sessions.
 */
export const SESSION_PREFIX = "kfs_";

export interface SessionClaims {
  /** User id. */
  sub: string;
  tenantId: string;
  kind: "enterprise" | "partner";
  /** Set for partner sessions: every request is limited to this client company. */
  clientCompanyId?: string;
  /** Expiry, seconds since the epoch. */
  exp: number;
  /** Bumped when the user's password changes or sessions are revoked. */
  gen: number;
  /** This key's own id, so signing out ends this session alone (UserRecord.revokedSessions). */
  jti?: string;
}

const mac = (secret: string, data: string) => createHmac("sha256", `session:${secret}`).update(data).digest("base64url");

export function mintSessionKey(secret: string, claims: SessionClaims): string {
  const payload = Buffer.from(JSON.stringify(claims)).toString("base64url");
  return `${SESSION_PREFIX}${payload}.${mac(secret, payload)}`;
}

export function readSessionKey(secret: string, key: string, nowSec = Math.floor(Date.now() / 1000)): SessionClaims | null {
  if (!key.startsWith(SESSION_PREFIX) || key.length > 2000) return null;
  const [payload, sig] = key.slice(SESSION_PREFIX.length).split(".");
  if (!payload || !sig) return null;
  const a = Buffer.from(sig), b = Buffer.from(mac(secret, payload));
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const c = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as SessionClaims;
    if (typeof c.sub !== "string" || typeof c.tenantId !== "string" || typeof c.exp !== "number" || c.exp <= nowSec) return null;
    if (c.kind !== "enterprise" && c.kind !== "partner") return null;
    if (c.kind === "partner" && !c.clientCompanyId) return null;
    return c;
  } catch {
    return null;
  }
}
