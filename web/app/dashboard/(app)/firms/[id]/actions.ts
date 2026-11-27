"use server";

import { revalidatePath } from "next/cache";
import { engine, EngineError, type ClientCompany } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { FILING_KINDS } from "@/lib/intake/forms";
import { applyLogo } from "@/lib/logo-upload";

export type PortalResult = { ok: boolean; message: string } | null;
export type InviteResult = { ok: true; link: string; email: string } | { ok: false; message: string } | null;

async function company(apiKey: string, id: string): Promise<ClientCompany> {
  return (await engine<{ clientCompany: ClientCompany }>(apiKey, `/v1/client-companies/${encodeURIComponent(id)}`)).clientCompany;
}

/** Saves the firm's portal brand, keeping every other setting as it is. The address is assigned, never typed. */
export async function savePortal(id: string, _prev: PortalResult, fd: FormData): Promise<PortalResult> {
  const s = await requireTenant();
  const c = await company(s.apiKey, id);
  const str = (k: string) => String(fd.get(k) ?? "").trim() || undefined;
  const hex = (k: string) => { const v = str(k); return v && /^#[0-9a-fA-F]{6}$/.test(v) ? v : undefined; };
  const on = fd.get("portalOn") === "on";
  const kinds = fd.getAll("kinds").map(String).filter((k) => FILING_KINDS.some((x) => x.id === k));
  const link = str("logoUrl");
  if (link && !/^https:\/\//.test(link)) return { ok: false, message: "A logo link must start with https://" };
  const uploading = Boolean(str("logoData"));
  const removing = fd.get("logoRemove") === "1";
  const old = c.portal;
  const portal = on ? {
    // No slug for a new portal: the engine makes one from the firm's name.
    ...(old?.slug ? { slug: old.slug } : {}),
    displayName: str("displayName"),
    logoUrl: link ?? (removing || uploading ? undefined : old?.logoArtifactId ? undefined : old?.logoUrl),
    logoArtifactId: link || removing ? undefined : old?.logoArtifactId,
    primaryColor: hex("primaryColor"), secondaryColor: hex("secondaryColor"), supportEmail: str("supportEmail"),
    ...(kinds.length && kinds.length < FILING_KINDS.length ? { filingKinds: kinds } : {}),
    // V39: public pages and the website widget, so this firm's clients can file from the firm's own site.
    publicPages: fd.get("publicPages") === "on",
  } : undefined;
  const { clientCompanyId: _id, tenantId: _t, ...rest } = c;
  let slug: string | undefined;
  try {
    slug = (await engine<{ ok: true; portalSlug?: string }>(s.apiKey, `/v1/client-companies/${encodeURIComponent(id)}`, { method: "PUT", body: { ...rest, portal } })).portalSlug;
  } catch (e) {
    if (e instanceof EngineError) {
      const issues = Array.isArray(e.body && (e.body as { error?: unknown }).error) ? ((e.body as { error: { path: (string | number)[]; message: string }[] }).error).map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") : e.message;
      return { ok: false, message: issues };
    }
    return { ok: false, message: "The filing desk couldn't be saved." };
  }
  if (on && uploading) {
    const problem = await applyLogo(s.apiKey, id, fd);
    if (problem) { revalidatePath(`/dashboard/firms/${id}`); return { ok: false, message: `The rest was saved. ${problem}` }; }
  }
  revalidatePath(`/dashboard/firms/${id}`);
  return { ok: true, message: portal ? `Saved. The filing desk is at /p/${slug ?? old?.slug}.` : "Saved. This firm has no filing desk now." };
}

/**
 * V36: an account for one person at the firm, limited to that firm's portal. They're emailed a
 * link to set their own password (7 days); the link is shown here too in case email isn't set up.
 */
export async function inviteStaff(id: string, _prev: InviteResult, fd: FormData): Promise<InviteResult> {
  const s = await requireTenant();
  const c = await company(s.apiKey, id);
  if (!c.portal?.slug) return { ok: false, message: "Set up the firm's portal first." };
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "Enter the person's email address." };
  try {
    const r = await engine<{ link: string }>(s.apiKey, `/v1/client-companies/${encodeURIComponent(c.clientCompanyId)}/staff`, { method: "POST", body: { email } });
    return { ok: true, email, link: r.link };
  } catch (e) {
    if (e instanceof EngineError && e.status === 409) return { ok: false, message: (e.body as { error?: string } | null)?.error === "that email already has an account" ? "That email already has an account." : "Set up the firm's portal first." };
    return { ok: false, message: "The invitation couldn't be made just now. Try again in a minute." };
  }
}
