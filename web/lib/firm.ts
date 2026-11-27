import { cache } from "react";
import { engine, type ClientCompany, type PartnerProfile, type PortalBrand } from "./engine";
import { requireFirm, type FirmSession } from "./session";
import { FILING_KINDS, type FilingKind } from "./intake/forms";
import { logoSrc, safeColor } from "./brand";
import { firmVars, inkMatch } from "./design/ink";
import { logoPlate, type LogoInfo } from "./design/logo";
import { redirect } from "next/navigation";
import { sessionEnded } from "./engine";
import { fontSpec, type BrandFontSpec } from "./fonts";

export interface FirmBrand {
  name: string; logoUrl?: string; color: string; color2: string; supportEmail?: string; font?: BrandFontSpec | null;
  /** The engine's reading of the uploaded logo (lib/design/logo.ts): its size and shape, and whether its marks are light. */
  logo?: LogoInfo;
}

/** The reading of the logo the pages show: the uploaded one's, when the engine has read that logo. */
export function logoInfoOf(p: PortalBrand | undefined): LogoInfo | undefined {
  const i = p?.logoInfo;
  return i && p?.logoArtifactId && i.artifactId === p.logoArtifactId && logoSrc(p)?.startsWith("/logo/") ? i : undefined;
}

export function brandOf(c: Pick<ClientCompany, "name" | "portal">): FirmBrand {
  const p: PortalBrand | undefined = c.portal;
  const color = safeColor(p?.primaryColor);
  const logo = logoInfoOf(p);
  return { name: p?.displayName || c.name, logoUrl: logoSrc(p), color, color2: safeColor(p?.secondaryColor, color), supportEmail: p?.supportEmail, font: fontSpec(p), ...(logo ? { logo } : {}) };
}

/**
 * The CSS variables a firm's pages use, from the ink match (web/lib/design/ink.ts): every --firm-* token for
 * rebuilt pages, and the older --accent names for pages not yet rebuilt. The button fill and its text always
 * reach 4.5:1 whatever color the firm picks; links use the firm's color deepened where needed.
 */
export function brandStyle(b: Pick<FirmBrand, "color" | "color2"> & { font?: BrandFontSpec | null; logo?: LogoInfo }): Record<string, string> {
  const ink = inkMatch(b.color, b.color2);
  // A logo of light marks sits on its plate: the fill where it reads at 3:1, else Plate Ink (10B.2.3).
  const plate = logoPlate(b.logo, ink.fill);
  return {
    ...firmVars(ink),
    ...(plate ? { "--logo-plate": plate } : {}),
    "--accent": ink.fill, "--accent-text": ink.on, "--accent-2": ink.ink,
    ...(b.font ? { "--brand-font": b.font.stack, "--font-firm": b.font.stack } : {}),
  };
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
  const r = await engine<{ clientCompany: ClientCompany; filerName?: string; ourAgent?: ClientCompany["ourAgent"] }>(apiKey, `/v1/client-companies/${encodeURIComponent(clientCompanyId)}`);
  return { ...r.clientCompany, filerName: r.filerName, ourAgent: r.ourAgent ?? null };
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

/**
 * Whether filings of this type created from the portal, client links and public pages file for real.
 * Decision 8 (Nov 26): filing types switch live one by one, once each is verified on the government
 * site: list them in PORTAL_LIVE_KINDS (comma-separated kind ids, e.g. "nj-llc,fl-llc").
 * PORTAL_LIVE_FILINGS=true switches every type at once. Off unless the deployment turns it on. The
 * engine still refuses a real filing without a subscription when billing is required.
 */
export function liveFilings(kindId?: string): boolean {
  if (process.env.PORTAL_LIVE_FILINGS === "true") return true;
  if (!kindId) return false;
  return (process.env.PORTAL_LIVE_KINDS ?? "").split(",").map((k) => k.trim()).filter(Boolean).includes(kindId);
}

/** Filings for a state: that state's own, plus the federal EIN, which goes with a business in any state. */
export function kindsForState(all: FilingKind[], st: string): FilingKind[] {
  return all.filter((k) => (k.type === "ein_only" ? true : k.state === st));
}
