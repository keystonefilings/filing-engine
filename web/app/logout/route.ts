import { NextResponse } from "next/server";
import { clearSession, readSession } from "@/lib/session";
import { engine } from "@/lib/engine";

export async function POST(req: Request) {
  const s = await readSession();
  // A signed-in person's key ends at the engine too, not only in this browser's cookie. Only for
  // password sign-ins: an invite session holds a key that isn't the visitor's own to end.
  if (s?.signedInWith === "password" && s.apiKey.startsWith("kfs_")) await engine(s.apiKey, "/v1/auth/sign-out", { method: "POST", body: {} }).catch(() => undefined);
  await clearSession();
  // People who signed in with email and password go back to the shared log-in page.
  const to = s?.signedInWith === "password" ? "/login" : s?.kind === "firm" ? `/p/${encodeURIComponent(s.slug)}/signed-out` : "/dashboard/login";
  return NextResponse.redirect(new URL(to, req.url), 303);
}
