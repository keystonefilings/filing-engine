import { NextResponse } from "next/server";
import { clearSession, readSession } from "@/lib/session";

export async function POST(req: Request) {
  const s = await readSession();
  await clearSession();
  const to = s?.kind === "firm" ? `/p/${encodeURIComponent(s.slug)}/signed-out` : "/dashboard/login";
  return NextResponse.redirect(new URL(to, req.url), 303);
}
