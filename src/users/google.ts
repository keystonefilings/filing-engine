import { createPublicKey, verify as verifySig, type webcrypto } from "node:crypto";

type JsonWebKey = webcrypto.JsonWebKey;

/**
 * V37: "Sign in with Google" for existing accounts. The web app runs the OAuth code flow and hands
 * us Google's ID token; we check it ourselves (Google's signature, our client id, expiry, the nonce
 * the web app made) before trusting the email in it. Nothing else from Google is used.
 */
export interface GoogleOptions { clientId: string; fetchImpl?: typeof fetch; now?: () => Date; certsUrl?: string }
export interface GoogleIdentity { email: string; sub: string; name?: string }

const ISSUERS = new Set(["https://accounts.google.com", "accounts.google.com"]);
const b64 = (s: string) => Buffer.from(s.replace(/-/g, "+").replace(/_/g, "/"), "base64");

export class GoogleIdTokens {
  private keys: { at: number; maxAgeMs: number; byKid: Map<string, JsonWebKey> } | null = null;
  private readonly fetchImpl: typeof fetch;
  private readonly now: () => Date;
  constructor(private readonly o: GoogleOptions) {
    this.fetchImpl = o.fetchImpl ?? fetch;
    this.now = o.now ?? (() => new Date());
  }

  private async key(kid: string): Promise<JsonWebKey | null> {
    const t = this.now().getTime();
    if (!this.keys || t - this.keys.at > this.keys.maxAgeMs || !this.keys.byKid.has(kid)) {
      const res = await this.fetchImpl(this.o.certsUrl ?? "https://www.googleapis.com/oauth2/v3/certs", { signal: AbortSignal.timeout(10_000) });
      if (!res.ok) throw new Error(`google certs ${res.status}`);
      const body = (await res.json()) as { keys?: (JsonWebKey & { kid?: string })[] };
      const maxAge = Number(/max-age=(\d+)/.exec(res.headers.get("cache-control") ?? "")?.[1] ?? 3600);
      this.keys = { at: t, maxAgeMs: Math.min(maxAge, 86_400) * 1000, byKid: new Map((body.keys ?? []).filter((k) => k.kid).map((k) => [k.kid!, k])) };
    }
    return this.keys.byKid.get(kid) ?? null;
  }

  /** The verified identity, or null with nothing trusted. */
  async verify(idToken: string, nonce: string): Promise<GoogleIdentity | null> {
    const parts = idToken.split(".");
    if (parts.length !== 3) return null;
    let header: { alg?: string; kid?: string }, claims: Record<string, unknown>;
    try {
      header = JSON.parse(b64(parts[0]!).toString("utf8"));
      claims = JSON.parse(b64(parts[1]!).toString("utf8"));
    } catch { return null; }
    if (header.alg !== "RS256" || !header.kid) return null;
    const jwk = await this.key(header.kid);
    if (!jwk) return null;
    const ok = verifySig("RSA-SHA256", Buffer.from(`${parts[0]}.${parts[1]}`), createPublicKey({ key: jwk, format: "jwk" }), b64(parts[2]!));
    if (!ok) return null;
    const nowSec = Math.floor(this.now().getTime() / 1000);
    if (!ISSUERS.has(String(claims.iss)) || claims.aud !== this.o.clientId) return null;
    if (typeof claims.exp !== "number" || claims.exp < nowSec - 60) return null;
    if (typeof claims.iat === "number" && claims.iat > nowSec + 300) return null;
    if (!nonce || claims.nonce !== nonce) return null;
    if (claims.email_verified !== true || typeof claims.email !== "string") return null;
    return { email: claims.email.toLowerCase(), sub: String(claims.sub), name: typeof claims.name === "string" ? claims.name : undefined };
  }
}
