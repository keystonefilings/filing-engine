import { NextResponse } from "next/server";
import { GOOGLE_CALLBACK_PATH, GOOGLE_COOKIE, googleConfigured, newGoogleDocsRequest } from "@/lib/google";
import { firmContext } from "@/lib/firm";
import { seal } from "@/lib/seal";

/**
 * Portal only: "Save to Google Docs" on a filing's page. Off to Google for Docs access; the
 * callback (the registered /api/auth/callback/google) writes the Doc and comes back here.
 */
export async function GET(req: Request, { params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const { session, company } = await firmContext(slug);
  const back = (why: string) => NextResponse.redirect(new URL(`/p/${encodeURIComponent(slug)}/filings/${encodeURIComponent(id)}?doc=${why}`, req.url), 303);
  // Partner firms' portals only, never an enterprise account's (Nov 26).
  if (!googleConfigured() || !company.partner) return back("off");
  const g = newGoogleDocsRequest(session.email);
  const res = NextResponse.redirect(g.url, 303);
  res.cookies.set(GOOGLE_COOKIE, seal("google-oauth", { purpose: "docs", state: g.state, verifier: g.verifier, slug, filingId: id }, 600), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: GOOGLE_CALLBACK_PATH, maxAge: 600,
  });
  return res;
}
