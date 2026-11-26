/**
 * How a typed firm name is laid out on the blank brass plate (merged spec 10A.9.4, 9.9 "Lettering" and "Fitting"),
 * for sign-up's plate and the Close's. Pure functions: the caller supplies a width measure for its font.
 *
 * The lettering box is the plate's face inside the bevel, between the screws (lib/photography.ts PLATE_BOX), about
 * 60% of the face's height. One line at a cap height of 30% of the face while it fits, shrinking to 20%; then two
 * balanced lines up to 20%, shrinking to a floor of 12%; then a third line. Never truncated, spaced or condensed.
 */

/** Credentials set at 88% with +0.04 em where the face has no small capitals (3.5). */
const CREDENTIALS = new Set(["cpa", "cpas", "llc", "llp", "pc", "pllc", "inc.", "co."]);

/** A short list of words the plate won't cut (Elaine; shared with the Close): while one is typed, the plate stays blank. */
const BLOCKED = ["fuck", "shit", "cunt", "nigger", "nigga", "faggot", "fag", "bitch", "asshole", "whore", "slut", "retard", "kike", "spic", "chink", "twat", "wanker", "cock", "pussy", "dick"];

/** Latin and Latin Extended-A, digits and & . , ' ’ - – ( ) /; anything else is left off the plate and kept in the field. */
export function plateText(typed: string): string {
  const kept = typed.replace(/[^A-Za-z0-9À-ſ&.,'’\-–()/ ]/g, "").replace(/\s+/g, " ").trim();
  const words = kept.toLowerCase().split(/[^a-zÀ-ſ]+/);
  return words.some((w) => BLOCKED.includes(w)) ? "" : kept;
}

export type Seg = { text: string; kind: "roman" | "amp" | "cred" };

/** A line split into its roman text, the italic "&" and the credentials. */
export function segments(line: string): Seg[] {
  const out: Seg[] = [];
  const push = (text: string, kind: Seg["kind"]) => {
    const last = out[out.length - 1];
    if (last && last.kind === kind) last.text += text; else out.push({ text, kind });
  };
  for (const tok of line.split(/(\s+)/)) {
    if (!tok) continue;
    if (/^\s+$/.test(tok)) { push(tok, "roman"); continue; }
    if (CREDENTIALS.has(tok.toLowerCase()) || CREDENTIALS.has(tok.toLowerCase().replace(/[,]$/, ""))) { push(tok, "cred"); continue; }
    for (const part of tok.split(/(&)/)) if (part) push(part, part === "&" ? "amp" : "roman");
  }
  return out;
}

/** Candidate line breaks at word spaces: "&" stays with the word after it, a credential with the word before it. */
function breaks(words: string[]): number[] {
  const ok: number[] = [];
  for (let i = 1; i < words.length; i++) {
    if (words[i - 1] === "&") continue;
    if (CREDENTIALS.has(words[i]!.toLowerCase())) continue;
    ok.push(i);
  }
  return ok;
}

/** Split into n lines as evenly as the measure allows, avoiding a single short word alone where another break exists. */
function balance(words: string[], n: number, measure: (s: string) => number): string[] {
  const cuts = breaks(words);
  if (n <= 1 || !cuts.length) return [words.join(" ")];
  let best: string[] = [words.join(" ")];
  let bestScore = Infinity;
  const combos: number[][] = [];
  if (n === 2) for (const c of cuts) combos.push([c]);
  else for (const a of cuts) for (const b of cuts) if (b > a) combos.push([a, b]);
  for (const c of combos) {
    const lines: string[] = [];
    let from = 0;
    for (const at of [...c, words.length]) { lines.push(words.slice(from, at).join(" ")); from = at; }
    const widths = lines.map(measure);
    const lonely = lines.some((l) => !l.includes(" ") && l.length <= 3) ? 1e6 : 0;
    const score = Math.max(...widths) + lonely;
    if (score < bestScore) { bestScore = score; best = lines; }
  }
  return best;
}

export interface Lettering { lines: string[]; cap: number; pitch: number; firstBaseline: number; fontSize: number }

/**
 * Fit the name into a box w × h (any units). `measure(text, fontSize)` returns a line's advance width; `capRatio` is the
 * face's cap height over its em. Returns the lines, the font size and where the first baseline sits.
 */
export function fitPlate(name: string, w: number, h: number, measure: (line: string, fontSize: number) => number, capRatio = 0.68): Lettering | null {
  const text = plateText(name);
  if (!text) return null;
  const face = h / 0.6;
  const words = text.split(" ");
  const at = (lines: string[], capMax: number, capMin: number) => {
    const widest = Math.max(...lines.map((l) => measure(l, 100)));
    const capFit = (w / widest) * 100 * capRatio;
    const cap = Math.min(capMax, capFit);
    return cap >= capMin ? cap : null;
  };
  let lines = [text];
  let cap = at(lines, 0.30 * face, 0.20 * face);
  if (cap === null && words.length > 1) {
    lines = balance(words, 2, (s) => measure(s, 100));
    cap = at(lines, 0.20 * face, 0.12 * face);
    if (cap === null && words.length > 2) {
      lines = balance(words, 3, (s) => measure(s, 100));
      cap = at(lines, Math.min(0.12 * face, h / 4.8), 0);
    }
  }
  if (cap === null) {
    // One word too long at the floor: that line scales to fit.
    const widest = Math.max(...lines.map((l) => measure(l, 100)));
    cap = (w / widest) * 100 * capRatio;
  }
  cap = Math.min(cap, h / (1 + 1.9 * (lines.length - 1)));
  const pitch = 1.9 * cap;
  const block = cap + pitch * (lines.length - 1);
  return { lines, cap, pitch, firstBaseline: (h - block) / 2 + cap, fontSize: cap / capRatio };
}
