// Copied by web/design/build-tokens.mjs from web/lib/design/logo.ts. Don't edit: change the original and run `npm run tokens` in web/.
/**
 * The logo analysis and the logo's size and plate (merged spec 3.5.1, 10B.2.3). A firm's logo is read once, from its
 * pixels: whether it sits on transparency, on a white box or on its own solid tile, and how light its ink is. A logo
 * drawn for a dark website (white or pale marks on transparent, mean OKLCH L of its ink over 0.80) vanishes on the
 * white sheet, so it is shown on a small chamfered plate: the firm's button fill when the logo's mean ink reaches 3:1
 * on it, else Plate Ink. Every other logo sits straight on white, never touched.
 *
 * Pure functions over raw RGBA pixels, so the engine (sharp, at upload and for older logos), the browser (a canvas, for
 * the live preview) and the tests share one reading. Copied to src/design/logo.ts by web/design/build-tokens.mjs.
 */
import { contrast, PLATE_INK, toHex } from "./ink.js";

/** What the outer 2 px ring of the logo holds (3.5.1, step 2). */
export type LogoBackground = "transparent" | "white" | "tile" | "busy";

export interface LogoInfo {
  /** The analysis's version: a stored reading older than LOGO_INFO_VERSION is made again. */
  v: number;
  /** The picture's own pixels. */
  width: number;
  height: number;
  /** width ÷ height: wide at 2.5 and over, mid from 1.6, square or tall under 1.6 (3.5.1, step 3). */
  ratio: number;
  background: LogoBackground;
  /** The mean OKLCH lightness of the ink (the logo's opaque pixels), 0 to 1. */
  inkL: number;
  /** The ink's mean color, for the plate's 3:1 test. */
  ink: string;
  /** Light marks on transparent: the logo needs a dark plate on white. */
  light: boolean;
}

export const LOGO_INFO_VERSION = 1;
/** Light marks: the mean OKLCH L of the ink over this (3.5.1). */
export const LIGHT_INK_L = 0.8;

// sRGB 0..255 to linear light, once.
const LIN = new Float64Array(256);
for (let i = 0; i < 256; i++) { const v = i / 255; LIN[i] = v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }

/** OKLab lightness of a linear-light color (Björn Ottosson's matrices, as in ink.ts). */
function okL(r: number, g: number, b: number): number {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
}

const gamma = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);

type Pixels = ArrayLike<number>;

/**
 * Reads a logo from its RGBA pixels (width × height × 4 bytes). Large pictures are sampled on a grid, so a 4000 px
 * logo reads as fast as a 400 px one.
 */
export function analyzeLogoPixels(d: Pixels, width: number, height: number): LogoInfo {
  const w = Math.max(1, Math.floor(width)), h = Math.max(1, Math.floor(height));
  const step = Math.max(1, Math.floor(Math.sqrt((w * h) / 400_000)));
  const L =(i: number) => okL(LIN[d[i]!]!, LIN[d[i + 1]!]!, LIN[d[i + 2]!]!);

  // The ring: clear, white, or one color (a tile) — else busy.
  let ringN = 0, ringClear = 0, ringWhite = 0;
  const opaque: number[] = [];
  const visit = (x: number, y: number) => {
    const i = (y * w + x) * 4;
    ringN++;
    const a = d[i + 3]!;
    if (a < 16) { ringClear++; return; }
    if (a >= 240 && L(i) > 0.96) ringWhite++;
    if (a >= 240) opaque.push(i);
  };
  for (let y = 0; y < h; y++) {
    if (y < 2 || y >= h - 2) { for (let x = 0; x < w; x += step) visit(x, y); }
    else { for (let x = 0; x < Math.min(2, w); x++) visit(x, y); for (let x = Math.max(2, w - 2); x < w; x++) visit(x, y); }
  }
  let background: LogoBackground;
  // A logo trimmed tight still shows its transparency between the letters that touch its edges.
  if (ringClear >= 0.2 * ringN) background = "transparent";
  else if (ringWhite >= 0.9 * ringN) background = "white";
  else {
    // One color all round, within a small distance in linear light: a deliberate tile, shown as uploaded.
    let mr = 0, mg = 0, mb = 0;
    for (const i of opaque) { mr += LIN[d[i]!]!; mg += LIN[d[i + 1]!]!; mb += LIN[d[i + 2]!]!; }
    const n = Math.max(1, opaque.length);
    mr /= n; mg /= n; mb /= n;
    const ml = okL(mr, mg, mb);
    let near = 0;
    for (const i of opaque) {
      const dl = Math.abs(L(i) - ml);
      const dc = Math.max(Math.abs(LIN[d[i]!]! - mr), Math.abs(LIN[d[i + 1]!]! - mg), Math.abs(LIN[d[i + 2]!]! - mb));
      if (dl < 0.04 && dc < 0.04) near++;
    }
    background = opaque.length >= 0.9 * ringN && near >= 0.9 * opaque.length ? "tile" : "busy";
  }

  // The ink: what isn't the background. On transparency, the opaque pixels (weighted by their alpha); on a white box,
  // everything that isn't near-white; on a tile or a photograph, the whole picture.
  let sumL = 0, sumW = 0, sr = 0, sg = 0, sb = 0;
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4;
      const a = d[i + 3]!;
      if (a < 128) continue;
      const l = L(i);
      if (background === "white" && l > 0.96) continue;
      const weight = a / 255;
      sumL += l * weight; sumW += weight;
      sr += LIN[d[i]!]! * weight; sg += LIN[d[i + 1]!]! * weight; sb += LIN[d[i + 2]!]! * weight;
    }
  }
  const inkL = sumW ? sumL / sumW : 0;
  const ink = sumW ? toHex([gamma(sr / sumW), gamma(sg / sumW), gamma(sb / sumW)]) : "#000000";
  const round = (v: number, p = 1000) => Math.round(v * p) / p;
  return {
    v: LOGO_INFO_VERSION, width: w, height: h, ratio: round(w / h), background, inkL: round(inkL), ink,
    light: background === "transparent" && sumW > 0 && inkL > LIGHT_INK_L,
  };
}

/**
 * The plate a logo sits on, on white (10B.2.3, rule 1): none for a logo that reads on white; for light marks, the
 * firm's button fill when the logo's mean ink reaches 3:1 on it, else Plate Ink, which is almost always what a logo
 * made for a dark website was drawn on. Returns the plate's color, or null for no plate.
 */
export function logoPlate(logo: Pick<LogoInfo, "light" | "ink"> | null | undefined, fill: string): string | null {
  if (!logo?.light) return null;
  return contrast(logo.ink, fill) >= 3 ? fill.toUpperCase() : PLATE_INK;
}

/** Where a logo is shown, and the area rule for each (3.5.1, step 4; 10B.3.3 for the white-label desk row). */
export const LOGO_AREA = {
  /** Sheets on desktop: forms, client pages, a platform's proof. */
  sheet: { area: 6400, min: 28, max: 64, maxWidth: 280 },
  /** Sheets on phones, and every preview of a client page. */
  phone: { area: 4400, min: 24, max: 48, maxWidth: 220 },
  /** Emails to the firm's clients. */
  email: { area: 5000, min: 28, max: 56, maxWidth: 260 },
  /** The white-label desk's Letterhead row, desktop and phone. */
  row: { area: 3200, min: 24, max: 44, maxWidth: 200 },
  rowPhone: { area: 2400, min: 24, max: 36, maxWidth: 160 },
} as const;
export type LogoSurface = keyof typeof LOGO_AREA;

/** Wide logos are wordmarks that already spell the name, so the typeset name is hidden beside them (3.5.2). */
export const isWide = (ratio: number) => ratio >= 2.5;

/**
 * A logo's size on a surface, by area so a wide wordmark and a square emblem look like peers: height √(A ÷ r), clamped,
 * then held under the surface's width; a raster never shows past half its own pixels (3.5.1, steps 4 and 5).
 */
export function logoSize(logo: Pick<LogoInfo, "width" | "height">, surface: LogoSurface): { width: number; height: number } {
  const s = LOGO_AREA[surface];
  const r = logo.width / logo.height;
  let height = Math.min(s.max, Math.max(s.min, Math.sqrt(s.area / r)));
  if (height * r > s.maxWidth) height = s.maxWidth / r;
  height = Math.min(height, logo.height / 2);
  return { width: Math.round(height * r * 10) / 10, height: Math.round(height * 10) / 10 };
}
