import { ImageResponse } from "next/og";
import { brandOf, loadCompany } from "./firm";
import { firmBySlug } from "./public-pages";
import { intakeKey, readClientIntake } from "./session";

/**
 * The link-preview card of a page a firm's client sees (client links, the firm's page for each filing, the widget). It
 * belongs to the firm, so nothing of CoFile is on it (decision 12): no lockup, no Miller, no Cotton, no Brass. A white
 * card with the firm's name and the firm's own rule in its color, set in next/og's plain sans. When the firm can't be
 * found (an expired link, a mistyped address) the card is blank white: no one's name.
 */
export const CLIENT_CARD_SIZE = { width: 1200, height: 630 };

export async function clientCard(find: () => Promise<{ name: string; color: string } | null>): Promise<ImageResponse> {
  const firm = await find().catch(() => null);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#FFFFFF", padding: "0 96px" }}>
        {firm ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", fontSize: firm.name.length > 28 ? 64 : 80, lineHeight: 1.1, color: "#1F2328", textAlign: "center" }}>{firm.name}</div>
            <div style={{ display: "flex", width: 160, height: 4, marginTop: 40, background: firm.color }} />
          </div>
        ) : null}
      </div>
    ),
    CLIENT_CARD_SIZE,
  );
}

/** The firm behind a client link (/i/<token>), read the way its page reads it. */
export function firmOfLink(token: string) {
  return async () => {
    const link = readClientIntake(token);
    if (!link) return null;
    const brand = brandOf(await loadCompany(intakeKey(link), link.clientCompanyId));
    return { name: brand.name, color: brand.color };
  };
}

/** The firm behind a public page (/<firm>/<service>, /e/…, /embed/…). */
export function firmOfSlug(slug: string, tenantId?: string) {
  return async () => {
    const company = await firmBySlug(slug, tenantId);
    if (!company) return null;
    const brand = brandOf(company);
    return { name: brand.name, color: brand.color };
  };
}
