import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { GOOGLE_COOKIE, googleIdToken } from "@/lib/google";
import { unseal } from "@/lib/seal";
import { engine, EngineError, type SignInResult } from "@/lib/engine";
import { finishSignIn } from "@/lib/sign-in";

/** V37: back from Google. Checks the state, gets the ID token, and lets the engine check it. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const jar = await cookies();
  const saved = unseal<{ state: string; nonce: string; verifier: string }>("google-oauth", jar.get(GOOGLE_COOKIE)?.value);
  jar.delete({ name: GOOGLE_COOKIE, path: "/auth/google" });
  const back = (why: string) => NextResponse.redirect(new URL(`/login?google=${why}`, req.url), 303);
  if (url.searchParams.get("error")) return back("cancelled");
  const code = url.searchParams.get("code");
  if (!saved || !code || url.searchParams.get("state") !== saved.state) return back("expired");
  const idToken = await googleIdToken(code, saved.verifier);
  if (!idToken) return back("failed");
  let r: SignInResult;
  try {
    r = await engine<SignInResult>(null, "/v1/auth/google", { method: "POST", body: { idToken, nonce: saved.nonce } });
  } catch (e) {
    const status = e instanceof EngineError ? (e.body as { status?: string } | null)?.status : undefined;
    return back(status === "no_account" ? "no-account" : status === "pending" ? "pending" : e instanceof EngineError && e.status === 403 ? "blocked" : "failed");
  }
  const problem = await finishSignIn(r, "google"); // redirects on success
  return NextResponse.redirect(new URL(`/login?google=${problem.includes("approval") ? "pending" : "failed"}`, req.url), 303);
}
