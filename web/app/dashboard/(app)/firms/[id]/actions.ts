"use server";

import { revalidatePath } from "next/cache";
import { engine, EngineError, type ClientCompany } from "@/lib/engine";
import { requireTenant, staffInviteLink } from "@/lib/session";
import { FILING_KINDS } from "@/lib/intake/forms";

export type PortalResult = { ok: boolean; message: string } | null;
export type InviteResult = { ok: true; link: string; email: string } | { ok: false; message: string } | null;

async function company(apiKey: string, id: string): Promise<ClientCompany> {
  return (await engine<{ clientCompany: ClientCompany }>(apiKey, `/v1/client-companies/${encodeURIComponent(id)}`)).clientCompany;
}

/** Saves the firm's portal brand, keeping every other setting as it is. */
export async function savePortal(id: string, _prev: PortalResult, fd: FormData): Promise<PortalResult> {
  const s = await requireTenant();
  const c = await company(s.apiKey, id);
  const str = (k: string) => String(fd.get(k) ?? "").trim() || undefined;
  const slug = str("slug")?.toLowerCase();
  const kinds = fd.getAll("kinds").map(String).filter((k) => FILING_KINDS.some((x) => x.id === k));
  const portal = slug ? {
    slug, displayName: str("displayName"), logoUrl: str("logoUrl"), primaryColor: str("primaryColor"), supportEmail: str("supportEmail"),
    ...(kinds.length && kinds.length < FILING_KINDS.length ? { filingKinds: kinds } : {}),
  } : undefined;
  const { clientCompanyId: _id, tenantId: _t, ...rest } = c;
  try {
    await engine(s.apiKey, `/v1/client-companies/${encodeURIComponent(id)}`, { method: "PUT", body: { ...rest, portal } });
  } catch (e) {
    if (e instanceof EngineError) {
      const issues = Array.isArray(e.body && (e.body as { error?: unknown }).error) ? ((e.body as { error: { path: (string | number)[]; message: string }[] }).error).map((i) => `${i.path.join(".")}: ${i.message}`).join("; ") : e.message;
      return { ok: false, message: issues };
    }
    return { ok: false, message: "The portal couldn't be saved." };
  }
  revalidatePath(`/dashboard/firms/${id}`);
  return { ok: true, message: portal ? `Saved. The portal is at /p/${portal.slug}.` : "Saved. This firm has no portal now." };
}

/** A sign-in link for one person at the firm. It opens that firm's portal only. */
export async function inviteStaff(id: string, _prev: InviteResult, fd: FormData): Promise<InviteResult> {
  const s = await requireTenant();
  const c = await company(s.apiKey, id);
  if (!c.portal?.slug) return { ok: false, message: "Set up the firm's portal first." };
  const email = String(fd.get("email") ?? "").trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, message: "Enter the person's email address." };
  return { ok: true, email, link: staffInviteLink({ apiKey: s.apiKey, tenantId: s.tenantId, clientCompanyId: c.clientCompanyId, slug: c.portal.slug, email }) };
}
