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
  "nj-llc": "llc-formation-new-jersey",
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

/** The platform tenant's key: public pages act for the platform, on behalf of the firm. */
export function platformKey(): string | null {
  return process.env.PLATFORM_API_KEY?.trim() || null;
}

/** The partner firm a public address belongs to, or null. Only partner firms have public pages. */
export const firmBySlug = cache(async (slug: string): Promise<ClientCompany | null> => {
  const key = platformKey();
  if (!key || !/^[a-z0-9][a-z0-9-]{0,62}$/.test(slug)) return null;
  const r = await engine<{ clientCompanies: ClientCompany[] }>(key, "/v1/client-companies").catch(() => ({ clientCompanies: [] as ClientCompany[] }));
  return r.clientCompanies.find((c) => c.portal?.slug === slug && c.partner) ?? null;
});

/** In-memory, per web process: a brake on someone flooding a firm's public page. */
const hits = new Map<string, { n: number; until: number }>();
export function takePublicSubmission(firm: string, max = 30, windowMs = 3_600_000): boolean {
  const now = Date.now();
  const h = hits.get(firm);
  if (!h || h.until <= now) { hits.set(firm, { n: 1, until: now + windowMs }); return true; }
  if (h.n >= max) return false;
  h.n++;
  return true;
}
