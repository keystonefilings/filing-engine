import { createHash, randomBytes } from "node:crypto";
import { publicUrl } from "./session";

/** V37: "Sign in with Google" (OAuth code flow with PKCE and a nonce); the engine checks the ID token. */
export function googleConfigured(): boolean {
  return !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export const GOOGLE_COOKIE = "g_oauth";
/**
 * Where Google sends the person back: this exact address is registered on the OAuth client
 * ("CoFile Web", https://cofile.app and http://localhost:3000). The state cookie is scoped to it.
 */
export const GOOGLE_CALLBACK_PATH = "/api/auth/callback/google";
export const googleRedirectUri = () => `${publicUrl()}${GOOGLE_CALLBACK_PATH}`;

export function newGoogleRequest(): { state: string; nonce: string; verifier: string; url: string } {
  const state = randomBytes(18).toString("base64url"), nonce = randomBytes(18).toString("base64url"), verifier = randomBytes(48).toString("base64url");
  const q = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!, redirect_uri: googleRedirectUri(), response_type: "code", scope: "openid email",
    state, nonce, code_challenge: createHash("sha256").update(verifier).digest("base64url"), code_challenge_method: "S256", prompt: "select_account",
  });
  return { state, nonce, verifier, url: `https://accounts.google.com/o/oauth2/v2/auth?${q}` };
}

/** Swaps the code Google sent back for its ID token. */
export async function googleIdToken(code: string, verifier: string): Promise<string | null> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, signal: AbortSignal.timeout(15_000),
    body: new URLSearchParams({ code, code_verifier: verifier, client_id: process.env.GOOGLE_CLIENT_ID!, client_secret: process.env.GOOGLE_CLIENT_SECRET!, redirect_uri: googleRedirectUri(), grant_type: "authorization_code" }),
  }).catch(() => null);
  if (!res?.ok) return null;
  return ((await res.json()) as { id_token?: string }).id_token ?? null;
}
