import { NextResponse } from "next/server";
import { readStaffInvite, writeSession } from "@/lib/session";

/** Opens a staff invite link: signs the person in to that one firm's portal. */
export async function GET(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const invite = readStaffInvite(token);
  const url = new URL(req.url);
  if (!invite) return NextResponse.redirect(new URL("/invite-expired", url), 303);
  await writeSession({ kind: "firm", apiKey: invite.apiKey, tenantId: invite.tenantId, clientCompanyId: invite.clientCompanyId, slug: invite.slug, email: invite.email });
  return NextResponse.redirect(new URL(`/p/${encodeURIComponent(invite.slug)}`, url), 303);
}
