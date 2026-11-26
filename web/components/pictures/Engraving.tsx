"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CRED_SCALE, CRED_TRACKING, fitPlate, plateBlocked, plateText, TRACKING, type GlyphStyle, type PlateLayout, type Run } from "@/lib/firm-name";

/** The engraving field's units: the owner's plate boxes all come to about 389 × 83 image pixels (lib/photography.ts). */
export const PLATE_W = 389;
export const PLATE_H = 83;
/** The share of the box the lettering may fill, so it stays a clear unit from the screws (9.9). */
const FIELD = 0.9;

interface Glyph { key: number; ch: string; style: GlyphStyle; x: number; y: number; size: number; sx: number }

type Measurer = { measure: (r: Run, cap: number) => number; space: (cap: number) => number; glyph: (ch: string, style: GlyphStyle, size: number) => number; capRatio: number; family: string };

const FONT = (style: GlyphStyle, size: number, family: string) => `${style === "italic" ? "italic " : ""}400 ${size}px ${family}`;

/** Canvas metrics for the house roman (Miller Display, or Miller Text standing in), read once its faces are loaded. */
function useMeasurer(probe: React.RefObject<SVGSVGElement | null>): Measurer | null {
  const [m, setM] = useState<Measurer | null>(null);
  useEffect(() => {
    let off = false;
    const build = () => {
      const el = probe.current;
      if (!el || off) return;
      const family = getComputedStyle(el).fontFamily || "Georgia, serif";
      const ctx = document.createElement("canvas").getContext("2d");
      if (!ctx) return;
      ctx.font = FONT("roman", 100, family);
      const capRatio = (ctx.measureText("H").actualBoundingBoxAscent || 70) / 100;
      const glyph = (ch: string, style: GlyphStyle, size: number) => {
        const s = style === "cred" ? size * CRED_SCALE : size;
        ctx.font = FONT(style, s, family);
        return ctx.measureText(ch).width + s * (style === "cred" ? CRED_TRACKING : TRACKING);
      };
      const measure = (r: Run, cap: number) => [...r.text].reduce((w, ch) => w + glyph(ch, r.style, cap / capRatio), 0);
      const space = (cap: number) => glyph(" ", "roman", cap / capRatio);
      setM({ measure, space, glyph, capRatio, family });
    };
    const fam = getComputedStyle(probe.current ?? document.body).fontFamily;
    Promise.all([document.fonts.load(`400 40px ${fam}`, "Harbor"), document.fonts.load(`italic 400 40px ${fam}`, "&")]).catch(() => null).then(build);
    return () => { off = true; };
  }, [probe]);
  return m;
}

/** Glyph positions for a layout: centred lines, the block centred on the field, a squeezed line scaled to fit (9.9). */
function place(layout: PlateLayout, m: Measurer): Glyph[] {
  const out: Glyph[] = [];
  const size = layout.cap / m.capRatio;
  const pitch = layout.cap * 1.9;
  const block = layout.cap + pitch * (layout.lines.length - 1);
  let key = 0;
  layout.lines.forEach((line, li) => {
    const y = (PLATE_H - block) / 2 + layout.cap + pitch * li;
    const sx = Math.min(1, layout.squeeze);
    let x = (PLATE_W - line.width * sx) / 2;
    line.words.forEach((word, wi) => {
      if (wi) x += m.space(layout.cap) * sx;
      for (const run of word) for (const ch of run.text) {
        out.push({ key: key++, ch, style: run.style, x, y, size, sx });
        x += m.glyph(ch, run.style, size) * sx;
      }
    });
    key++; // the line break counts as a character, so keys follow the typed text
  });
  return out;
}

/**
 * The visitor's firm name cut into the blank plate (merged spec 9.9, 10A.2.6; D3), the SVG version that works
 * everywhere: each letter in Miller with the "&" in its italic and credentials in small capitals, centred and fitted
 * by the engraver's rules (lib/firm-name.ts), drawn as a black enamel fill with the groove's shadowed and lit lips.
 * `live`: a letter typed is cut (groove, glint, fill, about 270 ms), letters slide to their new places, a pause brings
 * the late sun across the plate once; clearing the field fills the letters back in, right to left. Otherwise the name
 * is simply there, complete on first paint. Laid over the plate's box by its parent; aria-hidden (the field is the
 * real thing).
 */
export function Engraving({ name, live, rakeKey }: { name: string; live?: boolean; rakeKey?: number }) {
  const probe = useRef<SVGSVGElement>(null);
  const m = useMeasurer(probe);
  const text = plateBlocked(name) ? "" : plateText(name);
  const glyphs = useMemo(() => {
    if (!m || !text) return [];
    const layout = fitPlate(text, PLATE_W * FIELD, PLATE_H, m.measure, m.space);
    return layout ? place(layout, m) : [];
  }, [m, text]);

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
    <g key={key} className={cls} style={{ transform: `translate(${g.x}px, ${g.y}px) scale(${g.sx}, 1)`, ["--cut-d" as string]: delay ? `${delay}ms` : undefined }}>
      {(["shadow", "lip", "fill", "glint"] as const).map((layer) => (
        <text key={layer} className={`eng-${layer}`} fontSize={g.style === "cred" ? g.size * CRED_SCALE : g.size} fontStyle={g.style === "italic" ? "italic" : undefined} letterSpacing="0">{g.ch}</text>
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
            <mask id="eng-face" maskUnits="userSpaceOnUse"><rect x="-40" y="-26" width={PLATE_W + 80} height={PLATE_H + 52} fill="url(#eng-fade)" /></mask>
          </defs>
          <g mask="url(#eng-face)"><rect className="eng-sunband" x="-120" y="-26" width="120" height={PLATE_H + 52} fill="url(#eng-sun)" /></g>
        </g>
      ) : null}
    </svg>
  );
}
