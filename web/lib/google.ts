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

/**
 * Why the person went to Google: to log in, or to set up a firm's filing desk ("Continue with Google" on the
 * sign-up page). Either way an existing account is signed in, and a Google account without one is offered the
 * short set-up page; the purpose only decides which page a problem comes back to.
 */
export type GooglePurpose = "signin" | "signup";

/**
 * A Google identity with no account yet, waiting on /signup/google while the firm's details are typed. The ID
 * token itself travels in the sealed cookie, so the engine checks Google's word again when the account is made.
 */
export const GOOGLE_SIGNUP_COOKIE = "g_signup";
export const GOOGLE_SIGNUP_PATH = "/signup/google";
export const GOOGLE_SIGNUP_TTL = 15 * 60;
export interface GoogleSignup { idToken: string; nonce: string; email: string; name?: string; from: GooglePurpose }

export function newGoogleRequest(): { state: string; nonce: string; verifier: string; url: string } {
  const state = randomBytes(18).toString("base64url"), nonce = randomBytes(18).toString("base64url"), verifier = randomBytes(48).toString("base64url");
  const q = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!, redirect_uri: googleRedirectUri(), response_type: "code", scope: "openid email profile",
    state, nonce, code_challenge: createHash("sha256").update(verifier).digest("base64url"), code_challenge_method: "S256", prompt: "select_account",
  });
  return { state, nonce, verifier, url: `https://accounts.google.com/o/oauth2/v2/auth?${q}` };
}

/**
 * Portal only: asks Google for access to the person's Google Docs, to save one filing's record
 * there. The access token is used once, in the callback, and never kept.
 */
export function newGoogleDocsRequest(loginHint?: string): { state: string; verifier: string; url: string } {
  const state = randomBytes(18).toString("base64url"), verifier = randomBytes(48).toString("base64url");
  const q = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!, redirect_uri: googleRedirectUri(), response_type: "code", scope: "https://www.googleapis.com/auth/documents",
    state, code_challenge: createHash("sha256").update(verifier).digest("base64url"), code_challenge_method: "S256", include_granted_scopes: "true",
    ...(loginHint ? { login_hint: loginHint } : {}),
  });
  return { state, verifier, url: `https://accounts.google.com/o/oauth2/v2/auth?${q}` };
}

/** Swaps the code for an access token, if Google granted the Docs scope. */
export async function googleDocsToken(code: string, verifier: string): Promise<string | null> {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, signal: AbortSignal.timeout(15_000),
    body: new URLSearchParams({ code, code_verifier: verifier, client_id: process.env.GOOGLE_CLIENT_ID!, client_secret: process.env.GOOGLE_CLIENT_SECRET!, redirect_uri: googleRedirectUri(), grant_type: "authorization_code" }),
  }).catch(() => null);
  if (!res?.ok) return null;
  const t = (await res.json()) as { access_token?: string; scope?: string };
  return t.access_token && (t.scope ?? "").split(" ").includes("https://www.googleapis.com/auth/documents") ? t.access_token : null;
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
