import { cache } from "react";
import { engine, type ClientCompany, type PortalBrand } from "./engine";
import { requireFirm, type FirmSession } from "./session";
import { FILING_KINDS, type FilingKind } from "./intake/forms";
import { safeColor, safeLogo } from "./brand";

export interface FirmBrand { name: string; logoUrl?: string; color: string; supportEmail?: string }

export function brandOf(c: Pick<ClientCompany, "name" | "portal">): FirmBrand {
  const p: PortalBrand | undefined = c.portal;
  return { name: p?.displayName || c.name, logoUrl: safeLogo(p?.logoUrl), color: safeColor(p?.primaryColor), supportEmail: p?.supportEmail };
}

/** Filings this firm's portal offers: all of them unless the firm's settings list some. */
export function offeredKinds(c: Pick<ClientCompany, "portal">): FilingKind[] {
  const only = c.portal?.filingKinds;
  return only && only.length ? FILING_KINDS.filter((k) => only.includes(k.id)) : FILING_KINDS;
}

export const loadCompany = cache(async (apiKey: string, clientCompanyId: string): Promise<ClientCompany> => {
  const r = await engine<{ clientCompany: ClientCompany }>(apiKey, `/v1/client-companies/${encodeURIComponent(clientCompanyId)}`);
  return r.clientCompany;
});

/** The signed-in firm for a portal page, its settings and brand. Redirects when not signed in to this portal. */
export async function firmContext(slug: string): Promise<{ session: FirmSession; company: ClientCompany; brand: FirmBrand }> {
  const session = await requireFirm(slug);
  const company = await loadCompany(session.apiKey, session.clientCompanyId);
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
