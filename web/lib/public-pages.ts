import { cache } from "react";
import { engine, type ClientCompany } from "./engine";
import { FILING_KINDS, type FilingKind } from "./intake/forms";
import { publicUrl } from "./session";

/**
 * V19 (docs/vision-check-2026-11-25.md): each partner firm's permanent, branded page per service,
 * cofile.app/<firm>/<service>, e.g. /best-accounting/llc-formation-new-york. Anyone with
 * the address can fill it in; each submission is a new filing for that firm, which then goes
 * through the same preview and approval as any other.
 */

/** Readable addresses for each service. A kind's own id (ny-llc) works too. */
export const SERVICE_SLUGS: Record<string, string> = {
  "ny-llc": "llc-formation-new-york",
  "ny-corp": "corporation-formation-new-york",
  "ny-authority": "foreign-qualification-new-york",
  "ny-assumed-name": "assumed-name-new-york",
  "ny-nys100": "payroll-registration-new-york",
  "ny-llc-dissolution": "llc-dissolution-new-york",
  "ny-llc-name-change": "llc-name-change-new-york",
  "ny-llc-change": "llc-certificate-of-change-new-york",
  "ny-copies": "document-copies-new-york",
  "ny-status": "certificate-of-status-new-york",
  "nj-llc": "llc-formation-new-jersey",
  "nj-corp": "corporation-formation-new-jersey",
  "nj-reg": "payroll-registration-new-jersey",
  "fl-llc": "llc-formation-florida",
  "fl-corp": "corporation-formation-florida",
  "fl-lp": "limited-partnership-florida",
  "irs-ein": "ein",
};

export function serviceSlug(kind: FilingKind): string {
  return SERVICE_SLUGS[kind.id] ?? kind.id;
}

export function kindForServiceSlug(slug: string): FilingKind | undefined {
  const id = Object.entries(SERVICE_SLUGS).find(([, s]) => s === slug)?.[0] ?? slug;
  return FILING_KINDS.find((k) => k.id === id && SERVICE_SLUGS[k.id]);
}

export function publicPageUrl(firmSlug: string, kind: FilingKind): string {
  return `${publicUrl()}/${encodeURIComponent(firmSlug)}/${serviceSlug(kind)}`;
}

/** The platform's own account: partner firms' pages live at /<firm>/<service>. */
export function platformTenant(): string {
  return process.env.PLATFORM_TENANT_ID?.trim() || "keystone";
}

/** Signed forms save a drawn signature with the firm's own key, so they stay on the firm's portal and client links. */
export function publicKind(kind: FilingKind | undefined): kind is FilingKind {
  return !!kind && !kind.sections.some((s) => s.items.some((i) => i.kind === "field" && i.type === "signature"));
}

/** A firm with public pages (a partner, or a subscriber's firm with them switched on), or null. No key involved. */
export const firmBySlug = cache(async (slug: string, tenantId: string = platformTenant()): Promise<ClientCompany | null> => {
  if (!/^[a-z0-9][a-z0-9-]{0,62}$/.test(slug) || !/^[a-z0-9][a-z0-9-]{0,62}$/.test(tenantId)) return null;
  try {
    return (await engine<{ clientCompany: ClientCompany }>(null, `/v1/public/firms/${encodeURIComponent(tenantId)}/${encodeURIComponent(slug)}`)).clientCompany;
  } catch { return null; }
});

export function publicSubmitPath(tenantId: string, slug: string): string {
  return `/v1/public/firms/${encodeURIComponent(tenantId)}/${encodeURIComponent(slug)}/filings`;
}

/** The widget snippet a firm pastes on its own site. */
export function widgetSnippet(tenantId: string, firmSlug: string, kind: FilingKind): string {
  return `<script src="${publicUrl()}/embed.js" data-account="${tenantId}" data-firm="${firmSlug}" data-service="${serviceSlug(kind)}" async></script>`;
}

/** Where a firm's public page lives: partners at /<firm>/<service>, a subscriber's firms under /e/<account>/. */
export function firmPageUrl(tenantId: string, firmSlug: string, kind: FilingKind): string {
  return tenantId === platformTenant() ? publicPageUrl(firmSlug, kind) : `${publicUrl()}/e/${encodeURIComponent(tenantId)}/${encodeURIComponent(firmSlug)}/${serviceSlug(kind)}`;
}
