"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { fitPlate, plateText, segments, type Seg } from "@/lib/plate-lettering";

/**
 * The lettering box in SVG units: the plate's face inside the bevel and screws as lib/photography.ts registers it (the
 * same aspect on every crop, and the same units as sign-up's plate, components/site-pages/PlateName.tsx).
 */
export const PLATE_W = 467;
export const PLATE_H = 100;
/** The share of the box the lettering may fill, so it stays a clear unit from the screws (9.9). */
const FIELD = 0.9;
const CRED = 0.88;

type Style = Seg["kind"];
interface Glyph { key: number; ch: string; style: Style; x: number; y: number; size: number }
type Measurer = { line: (text: string, fs: number) => number; glyph: (ch: string, style: Style, fs: number) => number };

/** Canvas metrics for the house roman (Miller Display, or Miller Text standing in), read once its faces are loaded. */
function useMeasurer(probe: React.RefObject<SVGSVGElement | null>): Measurer | null {
  const [m, setM] = useState<Measurer | null>(null);
  useEffect(() => {
    let off = false;
    const build = () => {
      const el = probe.current;
      const ctx = document.createElement("canvas").getContext("2d");
      if (!el || off || !ctx) return;
      const family = getComputedStyle(el).fontFamily || "Georgia, serif";
      // As sign-up's plate measures: the "&" in the italic, credentials at 88%, tracking +3% (+7% of a credential's
      // own size, its +4% included).
      const glyph = (ch: string, style: Style, fs: number) => {
        const size = style === "cred" ? fs * CRED : fs;
        ctx.font = `${style === "amp" ? "italic " : ""}400 ${size}px ${family}`;
        return ctx.measureText(ch).width + size * (style === "cred" ? 0.07 : 0.03);
      };
      const line = (text: string, fs: number) => segments(text).reduce((w, s) => w + [...s.text].reduce((a, ch) => a + glyph(ch, s.kind, fs), 0), 0);
      setM({ line, glyph });
    };
    const fam = getComputedStyle(probe.current ?? document.body).fontFamily;
    Promise.all([document.fonts.load(`400 40px ${fam}`, "Harbor"), document.fonts.load(`italic 400 40px ${fam}`, "&")]).catch(() => null).then(build);
    return () => { off = true; };
  }, [probe]);
  return m;
}

/** Each letter's place: the shared fitting (lib/plate-lettering.ts) gives the lines and the size; each line is centred. */
function place(name: string, m: Measurer): Glyph[] {
  const fit = fitPlate(name, PLATE_W * FIELD, PLATE_H, m.line);
  if (!fit) return [];
  const out: Glyph[] = [];
  let key = 0;
  fit.lines.forEach((text, li) => {
    const y = fit.firstBaseline + fit.pitch * li;
    let x = (PLATE_W - m.line(text, fit.fontSize)) / 2;
    for (const s of segments(text)) for (const ch of s.text) {
      if (ch !== " ") out.push({ key, ch, style: s.kind, x, y, size: fit.fontSize });
      key++;
      x += m.glyph(ch, s.kind, fit.fontSize);
    }
    key++; // the line break stands for the space it replaced, so keys follow the typed text
  });
  return out;
}

/**
 * The visitor's firm name cut into the blank plate (merged spec 9.9, 10A.2.6; D3), the SVG version that works
 * everywhere: each letter in Miller with the "&" in its italic and credentials in small capitals, fitted by the
 * engraver's rules shared with sign-up's plate (lib/plate-lettering.ts), drawn as a black enamel fill with the
 * groove's shadowed and lit lips. `live`: a letter typed is cut (groove, glint, fill, about 270 ms), letters slide to
 * their new places, a pause brings the late sun across the plate once; clearing the field fills the letters back in,
 * right to left. Otherwise the name is simply there, complete on first paint. Laid over the plate's box by its
 * parent; aria-hidden (the field is the real thing).
 */
export function Engraving({ name, live, rakeKey }: { name: string; live?: boolean; rakeKey?: number }) {
  const probe = useRef<SVGSVGElement>(null);
  const m = useMeasurer(probe);
  const text = plateText(name);
  const glyphs = useMemo(() => (m && text ? place(text, m) : []), [m, text]);

  // Which glyphs are new this render (cut them), and a paste or autofill (cut left to right, 40 ms a letter).
  const prev = useRef<number>(-1);
  const [leaving, setLeaving] = useState<Glyph[]>([]);
  const last = useRef<Glyph[]>([]);
  const cuts = useRef(new Map<number, { at: number; delay: number }>());
  const before = prev.current;
  const added = before < 0 ? 0 : Math.max(0, glyphs.length - before);
  useEffect(() => {
    if (live && glyphs.length === 0 && last.current.length > 0) {
      setLeaving(last.current);
      const t = window.setTimeout(() => setLeaving([]), Math.min(600, last.current.length * 40) + 80);
      last.current = [];
      return () => window.clearTimeout(t);
    }
    if (glyphs.length) { last.current = glyphs; setLeaving([]); }
  }, [glyphs, live]);
  useEffect(() => { if (m) prev.current = glyphs.length; }, [glyphs, m]);

  const draw = (g: Glyph, key: string, cls: string, delay?: number) => (
    <g key={key} className={cls} style={{ transform: `translate(${g.x}px, ${g.y}px)`, ["--cut-d" as string]: delay ? `${delay}ms` : undefined }}>
      {(["shadow", "lip", "fill", "glint"] as const).map((layer) => (
        <text key={layer} className={`eng-${layer}`} fontSize={g.style === "cred" ? g.size * CRED : g.size} fontStyle={g.style === "amp" ? "italic" : undefined} letterSpacing="0">{g.ch}</text>
      ))}
    </g>
  );

  // A letter keeps its cut for 450 ms, so typing on doesn't cut the one before it short.
  const now = typeof performance !== "undefined" ? performance.now() : 0;
  if (live && added > 0) {
    glyphs.slice(glyphs.length - added).forEach((g, j) => cuts.current.set(g.key, { at: now, delay: added > 1 ? Math.min(1200, j * 40) : 0 }));
  }
  for (const [k, c] of cuts.current) if (now - c.at > 450 + c.delay) cuts.current.delete(k);

  return (
    <svg ref={probe} className="eng" viewBox={`0 0 ${PLATE_W} ${PLATE_H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      {glyphs.map((g) => {
        const c = cuts.current.get(g.key);
        return draw(g, `l${g.key}`, c ? "eng-l is-cut" : "eng-l", c?.delay);
      })}
      {leaving.map((g, i) => draw(g, `u${g.key}`, "eng-l is-uncut", (leaving.length - 1 - i) * 40))}
      {live && rakeKey ? (
        <g key={rakeKey} className="eng-rake" aria-hidden="true">
          <defs>
            <linearGradient id="eng-sun" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#fff3d6" stopOpacity="0" />
              <stop offset="0.5" stopColor="#fff3d6" stopOpacity="0.55" />
              <stop offset="1" stopColor="#fff3d6" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="eng-fade" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0.55" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </radialGradient>
            <mask id="eng-face" maskUnits="userSpaceOnUse"><rect x="-48" y="-32" width={PLATE_W + 96} height={PLATE_H + 64} fill="url(#eng-fade)" /></mask>
          </defs>
          <g mask="url(#eng-face)"><rect className="eng-sunband" x="-144" y="-32" width="144" height={PLATE_H + 64} fill="url(#eng-sun)" /></g>
        </g>
      ) : null}
    </svg>
  );
}
