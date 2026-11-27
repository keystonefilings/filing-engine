import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { GOOGLE_CALLBACK_PATH, GOOGLE_COOKIE, GOOGLE_SIGNUP_COOKIE, GOOGLE_SIGNUP_PATH, GOOGLE_SIGNUP_TTL, googleDocsToken, googleIdToken, type GooglePurpose, type GoogleSignup } from "@/lib/google";
import { createGoogleDoc, filingDocContent } from "@/lib/google-docs";
import { firmContext } from "@/lib/firm";
import { filingTitle, type Filing } from "@/lib/engine";
import { filingKind } from "@/lib/intake/forms";
import { statusLabel } from "@/lib/status";
import { publicUrl } from "@/lib/session";
import { seal, unseal } from "@/lib/seal";
import { engine, EngineError, type SignInResult } from "@/lib/engine";
import { finishSignIn } from "@/lib/sign-in";

/**
 * V37: back from Google. Checks the state, gets the ID token, and lets the engine check it. An account signs in
 * whether the person came from "Log in" or "Sign up"; a Google account with no account yet goes on to the short
 * sign-up page (Nov 27), its verified identity sealed in a 15-minute cookie, so the firm's details are all that's left.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const jar = await cookies();
  const saved = unseal<{ purpose?: GooglePurpose | "docs"; state: string; nonce: string; verifier: string; slug?: string; filingId?: string }>("google-oauth", jar.get(GOOGLE_COOKIE)?.value);
  jar.delete({ name: GOOGLE_COOKIE, path: GOOGLE_CALLBACK_PATH });
  if (saved?.purpose === "docs" && saved.slug && saved.filingId) return saveToDocs(req, url, saved as Required<Pick<typeof saved, "state" | "verifier" | "slug" | "filingId">>);
  const from: GooglePurpose = saved?.purpose === "signup" ? "signup" : "signin";
  const back = (why: string) => NextResponse.redirect(new URL(`/${from === "signup" ? "signup" : "login"}?google=${why}`, req.url), 303);
  if (url.searchParams.get("error")) return back("cancelled");
  const code = url.searchParams.get("code");
  if (!saved || !code || url.searchParams.get("state") !== saved.state) return back("expired");
  const idToken = await googleIdToken(code, saved.verifier);
  if (!idToken) return back("failed");
  let r: SignInResult;
  try {
    r = await engine<SignInResult>(null, "/v1/auth/google", { method: "POST", body: { idToken, nonce: saved.nonce } });
  } catch (e) {
    const body = e instanceof EngineError ? (e.body as { status?: string; email?: string; name?: string } | null) : null;
    if (body?.status === "no_account" && body.email) {
      const who: GoogleSignup = { idToken, nonce: saved.nonce, email: body.email, name: body.name, from };
      const res = NextResponse.redirect(new URL(GOOGLE_SIGNUP_PATH, req.url), 303);
      res.cookies.set(GOOGLE_SIGNUP_COOKIE, seal("google-signup", { ...who }, GOOGLE_SIGNUP_TTL), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/signup", maxAge: GOOGLE_SIGNUP_TTL });
      return res;
    }
    return back(body?.status === "pending" ? "pending" : e instanceof EngineError && e.status === 403 ? "blocked" : "failed");
  }
  const problem = await finishSignIn(r, "google"); // redirects on success
  return back(problem.includes("approval") ? "pending" : "failed");
}

/** Portal only: back from Google with Docs access; writes the filing's record and returns to its page. */
async function saveToDocs(req: Request, url: URL, saved: { state: string; verifier: string; slug: string; filingId: string }) {
  const page = (why: string) => NextResponse.redirect(new URL(`/p/${encodeURIComponent(saved.slug)}/filings/${encodeURIComponent(saved.filingId)}?doc=${encodeURIComponent(why)}`, req.url), 303);
  if (url.searchParams.get("error")) return page("cancelled");
  const code = url.searchParams.get("code");
  if (!code || url.searchParams.get("state") !== saved.state) return page("expired");
  const { session, company, brand } = await firmContext(saved.slug);
  if (!company.partner) return page("off");
  const token = await googleDocsToken(code, saved.verifier);
  if (!token) return page("denied");
  try {
    const { filing } = await engine<{ filing: Filing }>(session.apiKey, `/v1/filings/${encodeURIComponent(saved.filingId)}`);
    if (filing.clientCompanyId !== session.clientCompanyId) return page("failed");
    const kind = filingKind(((filing.request.intake as { portal?: { kind?: string } } | undefined)?.portal?.kind) ?? "");
    const content = filingDocContent(filing, {
      title: filingTitle(filing), statusLabel: statusLabel(filing.status).label, firmName: brand.name, kindTitle: kind?.title,
      filingUrl: `${publicUrl()}/p/${encodeURIComponent(saved.slug)}/filings/${encodeURIComponent(filing.id)}`, now: new Date(),
    });
    return page(await createGoogleDoc(token, content));
  } catch {
    return page("failed");
  }
}
