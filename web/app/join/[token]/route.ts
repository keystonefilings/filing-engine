import { NextResponse } from "next/server";

/**
 * Old staff invite links carried the inviting account's key; they no longer sign anyone in (V36).
 * Invitations are now emailed links to set a password for an account of the person's own.
 */
export async function GET(req: Request) {
  return NextResponse.redirect(new URL("/invite-expired", req.url), 303);
}
