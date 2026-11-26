/**
 * The firm name a visitor types beside the blank plate (merged spec 9.9, D3). It lives only in this browser tab's
 * sessionStorage and reaches the server only as "Firm name" in the sign-up form the visitor submits. Every read and
 * write is wrapped: where storage is blocked the plate still works on the page and simply doesn't carry.
 */
export const FIRM_NAME_KEY = "cofile.firmName";
/** The color chosen in For firms' studio (10A.2.2), kept beside the name for sign-up's and Branding's previews. */
export const FIRM_COLOR_KEY = "cofile.firmColor";
/** Fired on window when the name changes in this tab, so the plate and the field stay in step. */
export const FIRM_NAME_EVENT = "cofile:firmname";
export const FIRM_NAME_MAX = 60;

export function readFirmName(): string {
  try { return (sessionStorage.getItem(FIRM_NAME_KEY) ?? "").slice(0, FIRM_NAME_MAX); } catch { return ""; }
}

export function writeFirmName(value: string): void {
  const v = value.trim().slice(0, FIRM_NAME_MAX);
  try { if (v) sessionStorage.setItem(FIRM_NAME_KEY, v); else sessionStorage.removeItem(FIRM_NAME_KEY); } catch { /* storage blocked */ }
}

export function clearFirmName(): void {
  try { sessionStorage.removeItem(FIRM_NAME_KEY); sessionStorage.removeItem(FIRM_COLOR_KEY); } catch { /* storage blocked */ }
}

export function readFirmColor(): string {
  try { const c = sessionStorage.getItem(FIRM_COLOR_KEY) ?? ""; return /^#[0-9a-fA-F]{6}$/.test(c) ? c : ""; } catch { return ""; }
}

export function writeFirmColor(hex: string): void {
  try { if (/^#[0-9a-fA-F]{6}$/.test(hex)) sessionStorage.setItem(FIRM_COLOR_KEY, hex); } catch { /* storage blocked */ }
}

/* ---------------------------------------------------------------------------------------------------------------
   What the plate can cut (9.9 "Characters"): Latin and Latin Extended-A, digits and & . , ' ’ - – ( ) /. Anything else
   stays in the field and is left off the plate. */
const CUTTABLE = /[A-Za-z0-9À-ÖØ-öø-ſ&.,'’\-–()/ ]/;

export function plateText(value: string): string {
  return [...value.slice(0, FIRM_NAME_MAX)].filter((c) => CUTTABLE.test(c)).join("").replace(/\s+/g, " ").trim();
}

/**
 * A short list of slurs and obscenities, shared with sign-up's plate: while the field contains one, the plate stays
 * blank (9.9). Matched on whole words, ignoring case and accents, so "Scunthorpe" and "Dickens" still engrave.
 */
const BLOCKED = ["fuck", "fucking", "fucker", "shit", "cunt", "bitch", "bastard", "asshole", "arsehole", "dick", "cock", "pussy", "whore", "slut", "nigger", "nigga", "faggot", "fag", "retard", "kike", "spic", "chink", "wank", "wanker", "twat", "porn", "nazi"];

export function plateBlocked(value: string): boolean {
  const words = value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().split(/[^a-z]+/).filter(Boolean);
  return words.some((w) => BLOCKED.includes(w));
}

/* ---------------------------------------------------------------------------------------------------------------
   The firm-name rules (3.5) on the plate: the "&" in the italic, credentials in small capitals (88% with +0.04 em
   where the cut has none), as typed otherwise. */
export type GlyphStyle = "roman" | "italic" | "cred";
export interface Run { text: string; style: GlyphStyle }
export type Word = Run[];

const CREDENTIALS = new Set(["CPA", "CPAS", "LLC", "LLP", "PC", "PLLC", "INC", "INC.", "CO", "CO.", "P.C.", "L.L.C."]);

export function isCredential(word: string): boolean {
  return CREDENTIALS.has(word.replace(/[,]$/, "").toUpperCase());
}

/** The name as words, each word as styled runs. */
export function plateWords(text: string): Word[] {
  return text.split(" ").filter(Boolean).map((w) => {
    if (isCredential(w)) return [{ text: w, style: "cred" }];
    const runs: Run[] = [];
    for (const part of w.split(/(&)/)) {
      if (!part) continue;
      runs.push({ text: part, style: part === "&" ? "italic" : "roman" });
    }
    return runs;
  });
}

const wordText = (w: Word) => w.map((r) => r.text).join("");

/** Where a line may break: never after a lone "&" (it stays with the word after it), never before a credential. */
export function canBreakBefore(words: Word[], i: number): boolean {
  if (i <= 0 || i >= words.length) return false;
  if (wordText(words[i - 1]!) === "&") return false;
  if (words[i]!.length === 1 && words[i]![0]!.style === "cred") return false;
  return true;
}

/** Every way to split the words into `n` lines at allowed breaks. */
export function splits(words: Word[], n: number): Word[][][] {
  if (n === 1) return [[words]];
  const out: Word[][][] = [];
  for (let i = 1; i < words.length; i++) {
    if (!canBreakBefore(words, i)) continue;
    for (const rest of splits(words.slice(i), n - 1)) out.push([words.slice(0, i), ...rest]);
  }
  return out;
}

/**
 * The engraving field and the cap heights 9.9 sets, as fractions of the field's height (9 units): one line 2.0 to
 * 3.0 units, two lines 2.2 to 1.6, three lines 1.6 to 1.3; line pitch 1.9 × cap. The owner's plate boxes are wider
 * than the spec's 27 × 9 field, so the widths simply give more room.
 */
const CAPS: Record<1 | 2 | 3, [number, number]> = { 1: [3.0 / 9, 2.0 / 9], 2: [2.2 / 9, 1.6 / 9], 3: [1.6 / 9, 1.3 / 9] };
export const LINE_PITCH = 1.9;
export const TRACKING = 0.03;
export const CRED_SCALE = 0.88;
export const CRED_TRACKING = 0.04;

export interface PlateLine { words: Word[]; width: number }
export interface PlateLayout { lines: PlateLine[]; cap: number; squeeze: number }

/**
 * Lays a name out on a field of `w` × `h` units. `measure(run, cap)` gives a run's advance width at that cap height,
 * with its tracking. Returns null when there is nothing to cut.
 */
export function fitPlate(text: string, w: number, h: number, measure: (run: Run, cap: number) => number, space: (cap: number) => number): PlateLayout | null {
  const words = plateWords(plateText(text));
  if (!words.length) return null;
  const lineWidth = (line: Word[], cap: number) => line.reduce((s, word, i) => s + (i ? space(cap) : 0) + word.reduce((t, r) => t + measure(r, cap), 0), 0);
  const lonely = (lines: Word[][]) => lines.length > 1 && lines.some((l) => l.length === 1 && wordText(l[0]!).length <= 3);
  type Pick = { lines: Word[][]; cap: number; spread: number; lonely: boolean };
  const pick = (n: 1 | 2 | 3): Pick | null => {
    const [max] = CAPS[n];
    let best: Pick | null = null;
    for (const lines of splits(words, n)) {
      // Width scales linearly with the cap, so the cap that fits is max × (w ÷ width at max).
      const atMax = Math.max(...lines.map((l) => lineWidth(l, max * h)));
      const cap = Math.min(max * h, atMax > 0 ? (max * h * w) / atMax : max * h);
      const widths = lines.map((l) => lineWidth(l, cap));
      const c: Pick = { lines, cap, spread: Math.max(...widths) - Math.min(...widths), lonely: lonely(lines) };
      // Prefer no lone short word, then the larger cap, then the more even lines.
      const better = !best || (best.lonely && !c.lonely) || (best.lonely === c.lonely && (c.cap > best.cap + 0.01 || (Math.abs(c.cap - best.cap) <= 0.01 && c.spread < best.spread)));
      if (better) best = c;
    }
    return best;
  };
  const layout = (p: Pick, cap: number): PlateLayout => {
    const lines = p.lines.map((l) => ({ words: l, width: lineWidth(l, cap) }));
    const widest = Math.max(...lines.map((l) => l.width));
    return { lines, cap, squeeze: widest > w ? w / widest : 1 };
  };
  let last: { p: Pick; n: 1 | 2 | 3 } | null = null;
  for (const n of [1, 2, 3] as const) {
    const p = pick(n);
    if (!p) continue;
    last = { p, n };
    if (p.cap >= CAPS[n][1] * h - 1e-6) return layout(p, p.cap);
  }
  // Nothing fits at its minimum: the most lines the name allows, at their smallest cap, squeezed to the field.
  return last ? layout(last.p, CAPS[last.n][1] * h) : null;
}
