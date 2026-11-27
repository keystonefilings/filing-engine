import { NextResponse } from "next/server";
import { GOOGLE_CALLBACK_PATH, GOOGLE_COOKIE, googleConfigured, newGoogleRequest, type GooglePurpose } from "@/lib/google";
import { seal } from "@/lib/seal";

/**
 * V37: off to Google; the state, nonce and PKCE verifier wait in a sealed 10-minute cookie, with why the person
 * went: to log in (the default) or to set up a filing desk (`?for=signup`, "Continue with Google" on the sign-up page).
 */
export async function GET(req: Request) {
  const purpose: GooglePurpose = new URL(req.url).searchParams.get("for") === "signup" ? "signup" : "signin";
  if (!googleConfigured()) return NextResponse.redirect(new URL(`/${purpose === "signup" ? "signup" : "login"}?google=off`, req.url), 303);
  const g = newGoogleRequest();
  const res = NextResponse.redirect(g.url, 303);
  res.cookies.set(GOOGLE_COOKIE, seal("google-oauth", { purpose, state: g.state, nonce: g.nonce, verifier: g.verifier }, 600), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: GOOGLE_CALLBACK_PATH, maxAge: 600 });
  return res;
}
