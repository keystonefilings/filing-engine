// Copied by web/design/build-tokens.mjs from web/lib/design/ink.ts. Don't edit: change the original and run `npm run tokens` in web/.
/**
 * The ink match (merged spec 3.6): turns a firm's Main and Second colors into the colors its client pages
 * use, so any color a firm picks prints well. Like a stationer matching a customer's ink, it never changes
 * the firm's exact color in its logo or the Firm Rule's 3 px line; it derives safe colors for buttons, links,
 * washes and tints. Runs on the server when Branding is saved and in the browser for the live preview.
 *
 * Self-contained: OKLab/OKLCH (Björn Ottosson's matrices), sRGB gamut clipping and WCAG 2.x contrast.
 */

export const PLATE_INK = "#1D2130";
export const WHITE = "#FFFFFF";
export const NIGHT_CARD = "#1F2230";
export const BOND = "#F5F5F2";

type RGB = [number, number, number];
export interface OKLCH { l: number; c: number; h: number }

// ---- sRGB <-> OKLab <-> OKLCH ----

export function parseHex(hex: string): RGB {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) throw new Error(`not a hex color: ${hex}`);
  const h = m[1]!.length === 3 ? m[1]!.split("").map((c) => c + c).join("") : m[1]!;
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255) as RGB;
}

export function toHex([r, g, b]: RGB): string {
  const c = (v: number) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`.toUpperCase();
}

const toLinear = (v: number) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
const toGamma = (v: number) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);

function linearToOklab([r, g, b]: RGB): RGB {
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}

function oklabToLinear([L, a, b]: RGB): RGB {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

export function hexToOklab(hex: string): RGB {
  return linearToOklab(parseHex(hex).map(toLinear) as RGB);
}

export function hexToOklch(hex: string): OKLCH {
  const [l, a, b] = hexToOklab(hex);
  const h = (Math.atan2(b, a) * 180) / Math.PI;
  return { l, c: Math.hypot(a, b), h: h < 0 ? h + 360 : h };
}

function oklchToLinear({ l, c, h }: OKLCH): RGB {
  const r = (h * Math.PI) / 180;
  return oklabToLinear([l, c * Math.cos(r), c * Math.sin(r)]);
}

const EPS = 1e-6;
const inGamut = (lin: RGB) => lin.every((v) => v >= -EPS && v <= 1 + EPS);

/** An OKLCH color as sRGB hex, with chroma reduced (lightness and hue kept) until it fits sRGB. */
export function oklchToHex(c: OKLCH): string {
  let lo = 0, hi = c.c, lin = oklchToLinear(c);
  if (!inGamut(lin)) {
    for (let i = 0; i < 30; i++) {
      const mid = (lo + hi) / 2;
      if (inGamut(oklchToLinear({ ...c, c: mid }))) lo = mid; else hi = mid;
    }
    lin = oklchToLinear({ ...c, c: lo });
  }
  return toHex(lin.map((v) => toGamma(Math.min(1, Math.max(0, v)))) as RGB);
}

/** An OKLCH color as sRGB hex with each channel clamped to 0..1: for the near-white washes and tints, where
 *  clamping keeps them as saturated as the formula asks (the spec's reference values are computed this way). */
export function oklchToHexClamped(c: OKLCH): string {
  return toHex(oklchToLinear(c).map((v) => toGamma(Math.min(1, Math.max(0, v)))) as RGB);
}

/** Distance in OKLab (ΔE OK). */
export function deltaE(a: string, b: string): number {
  const x = hexToOklab(a), y = hexToOklab(b);
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]);
}

// ---- WCAG 2.x contrast ----

export function luminance(hex: string): number {
  const [r, g, b] = parseHex(hex).map(toLinear);
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

export function contrast(a: string, b: string): number {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

/** `hex` laid at `alpha` over white, in sRGB, the way a tint is mixed on paper. */
export function overWhite(hex: string, alpha: number): string {
  return toHex(parseHex(hex).map((v) => v * alpha + (1 - alpha)) as RGB);
}

/** Move lightness in 0.02 steps (hue fixed, chroma clipped to sRGB) until `ok` holds. */
function stepL(base: OKLCH, dir: -1 | 1, ok: (hex: string) => boolean): string {
  for (let l = base.l; l >= 0 && l <= 1; l += 0.02 * dir) {
    const hex = oklchToHex({ ...base, l });
    if (ok(hex)) return hex;
  }
  return dir < 0 ? "#000000" : WHITE;
}

// ---- The ink match ----

export interface FirmInk {
  /** The Main color, exact: the Firm Rule's 3 px line, the "your turn" glyph, bullets. */
  firm: string;
  /** The Second color, exact if set and distinct; else the Main at 35% over white, or the link ink where that
   *  would vanish on white (10B.2.3). The Firm Rule's thin line. */
  firm2: string;
  /** A 1 px rgba(29,33,48,.10) line under the Firm Rule's 3 px line when the Main is very pale (under 1.5:1 on
   *  white), so the rule still reads as a deliberate edge (3.5.3); else null. */
  ruleUnder: string | null;
  /** Button and selected-choice fill, contrast-safe. */
  fill: string;
  fillHover: string;
  /** Text on the fill: white or Plate Ink. */
  on: string;
  /** A 1 px border that keeps a light fill's shape on white (rule b), else null. */
  fillBorder: string | null;
  /** A 4 px left edge in the firm's color on a Plate Ink button, for a near-white Main (rule e), else null. */
  fillEdge: string | null;
  /** The edge of a selected choice, a checked box and a radio dot: the fill if it reaches 3:1 on white
   *  (WCAG's minimum for a control's edge), else the link ink. */
  selectLine: string;
  /** Links, focus rings, the "your turn" chip: at least 4.5:1 on white. */
  ink: string;
  /** The page under the firm's sheets. */
  wash: string;
  /** Hovered and selected rows, saved-answer rows. */
  row: string;
  /** The "check this" highlight; the focus halo at 50% alpha. */
  tint: string;
  /** Links and focus rings on the dark desk chrome: at least 4.5:1 on Night Card. */
  inkDark: string;
  /** The fill isn't the Main as given (the setup preview shows both, with a short note). */
  deepened: boolean;
  /** Which special cases applied (3.6, "Edge cases, designed on purpose"). */
  flags: {
    nearWhite: boolean;
    light: boolean;
    neutral: boolean;
    neon: boolean;
    redFamily: boolean;
    greenNearDone: boolean;
    secondTooLight: boolean;
  };
}

const hueIn = (h: number, from: number, to: number) => h >= from && h <= to;

export function inkMatch(main: string, second?: string | null): FirmInk {
  const firm = toHex(parseHex(main));
  const m = hexToOklch(firm);

  const secondHex = second ? toHex(parseHex(second)) : null;
  // "Distinct" is ΔE OK > 0.05. The spec writes 0.08, but its own reference firm (Harbor blue with Pine
  // green, ΔE 0.072) keeps its second color; 0.05 still catches a second color that is the main again.
  const ownSecond = !!secondHex && deltaE(secondHex, firm) > 0.05;

  const flags = {
    nearWhite: contrast(firm, WHITE) < 1.25,
    light: contrast(firm, WHITE) < 3,
    neutral: m.c < 0.03,
    // Neon is saturated and bright. The spec's C > 0.20 alone would also catch ordinary saturated brand colors
    // (its reference Best Blue #1F4FD1 is C 0.207 and keeps its exact fill), so lightness above 0.70 is required too.
    neon: m.c > 0.2 && m.l > 0.7,
    redFamily: hueIn(m.h, 15, 40) && m.c > 0.12,
    greenNearDone: hueIn(m.h, 140, 190) && m.c > 0.05,
    secondTooLight: !!secondHex && contrast(secondHex, WHITE) < 4.5,
  };

  // Links: the second color if it reads on white, else the main, else the main deepened.
  const ink = secondHex && contrast(secondHex, WHITE) >= 4.5 ? secondHex
    : contrast(firm, WHITE) >= 4.5 ? firm
    : stepL(m, -1, (h) => contrast(h, WHITE) >= 4.5);

  // The Firm Rule's thin line: the second color as given, else the main at 35% over white; a derived line under
  // 1.25:1 on white would vanish, so it is drawn in the link ink and the rule keeps its two lines (10B.2.3, rule 2).
  const derived = overWhite(firm, 0.35);
  const firm2 = ownSecond ? secondHex! : contrast(derived, WHITE) < 1.25 ? ink : derived;

  // The fill: rules (e), (d), (a), (b), (c), in that order.
  let fill: string, on: string, fillBorder: string | null = null, fillEdge: string | null = null;
  if (flags.nearWhite) {
    fill = PLATE_INK; on = WHITE; fillEdge = firm;
  } else {
    const base: OKLCH = flags.neon ? { ...m, c: 0.17 } : m;
    const candidate = flags.neon ? oklchToHex(base) : firm;
    if (contrast(WHITE, candidate) >= 4.5) {
      fill = candidate; on = WHITE;
    } else if (flags.light && contrast(PLATE_INK, candidate) >= 7) {
      fill = candidate; on = PLATE_INK; fillBorder = ink;
    } else {
      fill = stepL(base, -1, (h) => contrast(WHITE, h) >= 4.5); on = WHITE;
    }
  }

  // Hover: lightness × 0.92 (8% deeper); if that drops the label under 4.5:1, lighter by the same step.
  const f = hexToOklch(fill);
  let fillHover = oklchToHex({ ...f, l: f.l * 0.92 });
  if (contrast(on, fillHover) < 4.5) fillHover = oklchToHex({ ...f, l: Math.min(1, f.l * 1.08) });

  const wash = flags.neutral ? BOND : oklchToHexClamped({ l: 0.976, c: Math.min(m.c * 0.12, 0.01), h: m.h });
  const row = oklchToHexClamped({ l: 0.97, c: Math.min(m.c * 0.25, 0.025), h: m.h });
  const tint = oklchToHexClamped({ l: 0.94, c: Math.min(m.c * 0.35, 0.045), h: m.h });
  const inkDark = stepL({ ...m, c: Math.min(m.c, 0.14) }, 1, (h) => contrast(h, NIGHT_CARD) >= 4.5);

  const selectLine = contrast(fill, WHITE) >= 3 ? fill : ink;

  const ruleUnder = contrast(firm, WHITE) < 1.5 ? "rgba(29,33,48,.10)" : null;

  return { firm, firm2, ruleUnder, fill, fillHover, on, fillBorder, fillEdge, selectLine, ink, wash, row, tint, inkDark, deepened: fill !== firm, flags };
}

/** The custom properties a firm's client pages (and previews of them) carry, from one ink match. */
export function firmVars(k: FirmInk): Record<string, string> {
  return {
    "--firm": k.firm,
    "--firm-2": k.firm2,
    "--firm-rule-under": k.ruleUnder ?? "transparent",
    "--firm-fill": k.fill,
    "--firm-fill-hover": k.fillHover,
    "--firm-on": k.on,
    "--firm-fill-border": k.fillBorder ?? "transparent",
    "--firm-fill-edge": k.fillEdge ?? "transparent",
    "--firm-select-line": k.selectLine,
    "--firm-ink": k.ink,
    "--firm-wash": k.wash,
    "--firm-row": k.row,
    "--firm-tint": k.tint,
    "--firm-ink-dark": k.inkDark,
  };
}
