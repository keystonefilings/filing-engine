import { NextResponse } from "next/server";
import { clearSession, readSession } from "@/lib/session";

/** Where pages send someone whose session the engine no longer accepts: clear it and log in again. */
export async function GET(req: Request) {
  const s = await readSession();
  await clearSession();
  const to = s?.signedInWith === "password" ? "/login?ended=1"
    : s?.kind === "firm" ? `/p/${encodeURIComponent(s.slug)}/signed-out`
    : s ? "/dashboard/login" : "/login?ended=1";
  return NextResponse.redirect(new URL(to, req.url), 303);
}
