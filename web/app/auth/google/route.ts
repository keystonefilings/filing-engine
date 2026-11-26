import { NextResponse } from "next/server";
import { GOOGLE_CALLBACK_PATH, GOOGLE_COOKIE, googleConfigured, newGoogleRequest } from "@/lib/google";
import { seal } from "@/lib/seal";

/** V37: off to Google; the state, nonce and PKCE verifier wait in a sealed 10-minute cookie. */
export async function GET(req: Request) {
  if (!googleConfigured()) return NextResponse.redirect(new URL("/login?google=off", req.url), 303);
  const g = newGoogleRequest();
  const res = NextResponse.redirect(g.url, 303);
  res.cookies.set(GOOGLE_COOKIE, seal("google-oauth", { state: g.state, nonce: g.nonce, verifier: g.verifier }, 600), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: GOOGLE_CALLBACK_PATH, maxAge: 600 });
  return res;
}
