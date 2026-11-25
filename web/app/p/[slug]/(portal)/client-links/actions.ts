"use server";

import { firmContext, offeredKinds } from "@/lib/firm";
import { clientIntakeLink, INVITE_TTL } from "@/lib/session";
import { recordLink, revokeLink } from "@/lib/intake-links";
import { revalidatePath } from "next/cache";
import { newNonce } from "@/lib/intake/submit";

export type LinkResult = { ok: true; link: string; kindTitle: string; label?: string; days?: number; from?: string } | { ok: false; message: string } | null;

/** A link the firm sends one client to fill in one filing. Each link makes at most one filing; the firm can list and revoke it. */
export async function makeClientLink(slug: string, _prev: LinkResult, fd: FormData): Promise<LinkResult> {
  const { session, company } = await firmContext(slug);
  const kind = offeredKinds(company).find((k) => k.id === fd.get("kind"));
  if (!kind) return { ok: false, message: "Pick a filing." };
  const label = String(fd.get("label") ?? "").trim().slice(0, 80) || undefined;
  const base = { tenantId: session.tenantId, clientCompanyId: session.clientCompanyId, slug, kind: kind.id, nonce: newNonce(), label };
  const from = company.portal?.displayName || company.name;
  let link: string, ttl = INVITE_TTL.client, days: number | undefined;
  if (session.signedInWith !== "password") {
    link = clientIntakeLink({ ...base, apiKey: session.apiKey });
  } else if (process.env.PLATFORM_API_KEY?.trim()) {
    // With the site's platform key set, the link carries no key at all and lasts 30 days.
    link = clientIntakeLink({ ...base, apiKey: "", via: "platform" });
  } else {
    // Otherwise the link carries the partner's session key and ends with the session.
    const left = Math.floor(((session.expiresAt ? Date.parse(session.expiresAt) : Date.now()) - Date.now()) / 1000);
    if (left < 3600) return { ok: false, message: "Sign out and back in, then make the link again." };
    link = clientIntakeLink({ ...base, apiKey: session.apiKey }, left);
    ttl = Math.min(left, INVITE_TTL.client);
    days = Math.max(1, Math.floor(left / 86400));
  }
  try {
    await recordLink(session.apiKey, session.clientCompanyId, { id: base.nonce, kind: kind.id, label, expiresAt: new Date(Date.now() + ttl * 1000).toISOString() });
  } catch {
    return { ok: false, message: "That link couldn't be made just now. Try again in a minute." };
  }
  revalidatePath(`/p/${encodeURIComponent(slug)}/client-links`);
  return { ok: true, link, kindTitle: kind.title, label, days, from };
}

/** Turns a link off: the client sees that it was turned off, and nothing can be sent with it. */
export async function revokeClientLink(slug: string, id: string): Promise<void> {
  const { session } = await firmContext(slug);
  await revokeLink(session.apiKey, session.clientCompanyId, id).catch(() => undefined);
  revalidatePath(`/p/${encodeURIComponent(slug)}/client-links`);
}
