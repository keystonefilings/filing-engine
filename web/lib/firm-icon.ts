import type { Metadata } from "next";
import { inkMatch } from "./design/ink";
import type { FirmBrand } from "./firm";

/**
 * What a client page puts in the browser's tab (merged spec 10B.1.9; decision 12): the firm's name, never CoFile's,
 * and the firm's monogram tile as the favicon (its first letter on its ink-matched fill), so nothing of CoFile shows
 * in the tab either. `title` is absolute, so the site's "· CoFile" template is not added.
 */
export function firmMonogram(brand: Pick<FirmBrand, "name" | "color" | "color2">): string {
  let fill = "#1D2130", on = "#FFFFFF";
  try { const k = inkMatch(brand.color, brand.color2); fill = k.fill; on = k.on; } catch { /* keep Plate Ink */ }
  const letter = (brand.name.trim().match(/[A-Za-z0-9]/)?.[0] ?? "·").toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="5" fill="${fill}"/><text x="16" y="22.5" text-anchor="middle" font-family="Helvetica,Arial,sans-serif" font-size="19" font-weight="700" fill="${on}">${letter}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export function clientPageMetadata(title: string, brand: Pick<FirmBrand, "name" | "color" | "color2">): Metadata {
  const icon = firmMonogram(brand);
  return { title: { absolute: `${title} · ${brand.name}` }, icons: { icon: [{ url: icon, type: "image/svg+xml" }], apple: [], shortcut: [] } };
}

/** A client page whose firm isn't known: a neutral tab with no one's name and no icon of ours. */
export const NEUTRAL_CLIENT_METADATA: Metadata = { icons: { icon: [{ url: "data:,", type: "image/x-icon" }], apple: [], shortcut: [] } };
