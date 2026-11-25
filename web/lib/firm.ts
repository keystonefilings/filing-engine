import { cache } from "react";
import { engine, type ClientCompany, type PartnerProfile, type PortalBrand } from "./engine";
import { requireFirm, type FirmSession } from "./session";
import { FILING_KINDS, type FilingKind } from "./intake/forms";
import { logoSrc, safeColor, textOn } from "./brand";
import { redirect } from "next/navigation";
import { sessionEnded } from "./engine";
import { fontSpec, type BrandFontSpec } from "./fonts";

export interface FirmBrand { name: string; logoUrl?: string; color: string; color2: string; supportEmail?: string; font?: BrandFontSpec | null }

export function brandOf(c: Pick<ClientCompany, "name" | "portal">): FirmBrand {
  const p: PortalBrand | undefined = c.portal;
  const color = safeColor(p?.primaryColor);
  return { name: p?.displayName || c.name, logoUrl: logoSrc(p), color, color2: safeColor(p?.secondaryColor, color), supportEmail: p?.supportEmail, font: fontSpec(p) };
}

/** The CSS variables a firm's pages use: main color (buttons), its text color, second color (links, highlights). */
export function brandStyle(b: Pick<FirmBrand, "color" | "color2"> & { font?: BrandFontSpec | null }): Record<string, string> {
  return { "--accent": b.color, "--accent-text": textOn(b.color), "--accent-2": b.color2, ...(b.font ? { "--brand-font": b.font.stack } : {}) };
}

/** Filings this firm's portal offers: all of them unless the firm's settings list some. */
export function offeredKinds(c: Pick<ClientCompany, "portal"> & { partner?: PartnerProfile }): FilingKind[] {
  const only = c.portal?.filingKinds;
  if (only && only.length) return FILING_KINDS.filter((k) => only.includes(k.id));
  // A partner that hasn't chosen yet offers what it files: its sign-up states, plus the federal EIN.
  const states = c.partner?.states;
  if (states?.length) return FILING_KINDS.filter((k) => k.type === "ein_only" || (states as string[]).includes(k.state));
  return FILING_KINDS;
}

export const loadCompany = cache(async (apiKey: string, clientCompanyId: string): Promise<ClientCompany> => {
  const r = await engine<{ clientCompany: ClientCompany }>(apiKey, `/v1/client-companies/${encodeURIComponent(clientCompanyId)}`);
  return r.clientCompany;
});

/** The signed-in firm for a portal page, its settings and brand. Redirects when not signed in to this portal. */
export async function firmContext(slug: string): Promise<{ session: FirmSession; company: ClientCompany; brand: FirmBrand }> {
  const session = await requireFirm(slug);
  let company: ClientCompany;
  try {
    company = await loadCompany(session.apiKey, session.clientCompanyId);
  } catch (e) {
    // The session ended at the engine (expired, signed out elsewhere, password changed).
    if (sessionEnded(e)) redirect("/session-ended");
    throw e;
  }
  return { session, company, brand: brandOf(company) };
}

/** Whether filings created from the portal file for real. Off unless the deployment turns it on. */
export function liveFilings(): boolean {
  return process.env.PORTAL_LIVE_FILINGS === "true";
}

/** Filings for a state: that state's own, plus the federal EIN, which goes with a business in any state. */
export function kindsForState(all: FilingKind[], st: string): FilingKind[] {
  return all.filter((k) => (k.type === "ein_only" ? true : k.state === st));
}
