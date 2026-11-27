import type { FirmBrand } from "@/lib/firm";
import type { LogoInfo } from "@/lib/design/logo";
import { QA_CASES, type QaCase } from "@/lib/qa-gallery";
import LOGOS from "@/lib/qa-logos.json";

/** The gallery's logo files and the engine's reading of each (web/scripts/qa-gallery.ts). */
export const QA_LOGOS = LOGOS as Record<string, { src: string; info: LogoInfo }>;

export const googleHref = (family: string) => `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family).replace(/%20/g, "+")}:wght@400;600&display=swap`;

/** A case as the pages see a firm: the brand brandOf() would make from its settings, with the logo's reading. */
export function brandFor(c: QaCase): FirmBrand {
  const l = c.logo ? QA_LOGOS[c.logo] : undefined;
  return {
    name: c.name, color: c.color, color2: c.color2 ?? c.color,
    ...(l ? { logoUrl: l.src, logo: l.info } : {}),
    font: c.font ? { stack: c.font.stack, ...(c.font.google ? { href: googleHref(c.font.google) } : {}) } : null,
  };
}

export const caseById = (id: string | undefined) => QA_CASES.find((c) => c.id === id);

export function galleryOn(): boolean {
  return process.env.NODE_ENV !== "production" || process.env.DESIGN_GALLERY === "true";
}
