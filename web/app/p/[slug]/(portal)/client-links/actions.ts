"use server";

import { firmContext, offeredKinds } from "@/lib/firm";
import { clientIntakeLink } from "@/lib/session";
import { newNonce } from "@/lib/intake/submit";

export type LinkResult = { ok: true; link: string; kindTitle: string; label?: string; days?: number; from?: string } | { ok: false; message: string } | null;

/** A link the firm sends one client to fill in one filing. Each link makes at most one filing. */
export async function makeClientLink(slug: string, _prev: LinkResult, fd: FormData): Promise<LinkResult> {
  const { session, company } = await firmContext(slug);
  const kind = offeredKinds(company).find((k) => k.id === fd.get("kind"));
  if (!kind) return { ok: false, message: "Pick a filing." };
  const label = String(fd.get("label") ?? "").trim().slice(0, 80) || undefined;
  const base = { tenantId: session.tenantId, clientCompanyId: session.clientCompanyId, slug, kind: kind.id, nonce: newNonce(), label };
  const from = company.portal?.displayName || company.name;
  if (session.signedInWith !== "password") {
    return { ok: true, link: clientIntakeLink({ ...base, apiKey: session.apiKey }), kindTitle: kind.title, label, from };
  }
  // A partner signed in with a password holds a session key that ends within days. With the site's platform
  // key set, the link carries no key at all and lasts 30 days; without it, the link ends with the session.
  if (process.env.PLATFORM_API_KEY?.trim()) {
    return { ok: true, link: clientIntakeLink({ ...base, apiKey: "", via: "platform" }), kindTitle: kind.title, label, from };
  }
  const left = Math.floor(((session.expiresAt ? Date.parse(session.expiresAt) : Date.now()) - Date.now()) / 1000);
  if (left < 3600) return { ok: false, message: "Sign out and back in, then make the link again." };
  return { ok: true, link: clientIntakeLink({ ...base, apiKey: session.apiKey }, left), kindTitle: kind.title, label, days: Math.max(1, Math.floor(left / 86400)), from };
}
