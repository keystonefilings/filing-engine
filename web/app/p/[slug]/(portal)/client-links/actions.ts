"use server";

import { firmContext, offeredKinds } from "@/lib/firm";
import { clientIntakeLink } from "@/lib/session";
import { newNonce } from "@/lib/intake/submit";

export type LinkResult = { ok: true; link: string; kindTitle: string; label?: string } | { ok: false; message: string } | null;

/** A link the firm sends one client to fill in one filing. Each link makes at most one filing. */
export async function makeClientLink(slug: string, _prev: LinkResult, fd: FormData): Promise<LinkResult> {
  const { session, company } = await firmContext(slug);
  const kind = offeredKinds(company).find((k) => k.id === fd.get("kind"));
  if (!kind) return { ok: false, message: "Pick a filing." };
  const label = String(fd.get("label") ?? "").trim().slice(0, 80) || undefined;
  const link = clientIntakeLink({ apiKey: session.apiKey, tenantId: session.tenantId, clientCompanyId: session.clientCompanyId, slug, kind: kind.id, nonce: newNonce(), label });
  return { ok: true, link, kindTitle: kind.title, label };
}
