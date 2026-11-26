"use client";

import { useEffect, useMemo, useState } from "react";
import { PHOTOS, PLATE_BOX } from "@/lib/photography";
import { fitPlate, segments, type Lettering } from "@/lib/plate-lettering";

/** The lettering box's aspect in SVG units: the plate's face inside the bevel and screws (the same for both crops). */
const W = 467, H = 100;
const FONT = `"Miller Display", "Miller Text", "Miller Text Fallback", Georgia, "Times New Roman", serif`;

let ctx: CanvasRenderingContext2D | null | undefined;
/** A line's advance in Miller Display at font size fs, the "&" in its italic, credentials at 88% with +0.04 em, tracking +3%. */
function measure(line: string, fs: number): number {
  if (ctx === undefined) ctx = typeof document === "undefined" ? null : document.createElement("canvas").getContext("2d");
  if (!ctx) return line.length * fs * 0.5;
  let w = 0;
  for (const s of segments(line)) {
    const size = s.kind === "cred" ? fs * 0.88 : fs;
    ctx.font = `${s.kind === "amp" ? "italic " : ""}400 ${size}px ${FONT}`;
    w += ctx.measureText(s.text).width + s.text.length * size * (s.kind === "cred" ? 0.07 : 0.03);
  }
  return w;
}

/** One line, a tspan per letter so each new letter is cut on its own (a 90 ms fill, the SVG tier of 9.9). */
function Line({ text, fs }: { text: string; fs: number }) {
  let n = 0;
  return (
    <>
      {segments(text).map((s) => [...s.text].map((ch) => (
        <tspan key={n++} className="plate3-ch" fontStyle={s.kind === "amp" ? "italic" : undefined} fontSize={s.kind === "cred" ? fs * 0.88 : undefined}
          letterSpacing={s.kind === "cred" ? `${fs * 0.88 * 0.07}` : undefined}>{ch}</tspan>
      )))}
    </>
  );
}

/**
 * The blank brass plate with the visitor's firm name cut into it (merged spec 10A.9.3, 10A.9.4, the SVG tier of 9.9):
 * the owner's photograph (day, or dusk in dark mode), and over the plate's face the name in Miller Display, filled
 * black at 88% Plate Ink with a lit lip under each cut, laid out by lib/plate-lettering. Decorative: the field holds
 * the name. `rake` sends one slow light across the plate (an arrival with a name already carried in).
 */
export function PlateName({ name, view, rake }: { name: string; view: "tall" | "strip"; rake?: boolean }) {
  const [fontsReady, setFontsReady] = useState(0);
  useEffect(() => { document.fonts?.ready.then(() => setFontsReady((n) => n + 1)).catch(() => undefined); }, []);
  const fit: Lettering | null = useMemo(() => (fontsReady >= 0 ? fitPlate(name, W, H, measure) : null), [name, fontsReady]);
  const [day, dusk] = view === "tall"
    ? [PHOTOS["c03-close-day-mobile"], PHOTOS["c04-close-dusk-mobile"]]
    : [PHOTOS["c03-signup-strip-day"], PHOTOS["c04-signup-strip-dusk"]];
  const box = PLATE_BOX[view];
  return (
    <div className={`plate3 is-${view}${rake ? " is-raking" : ""}`} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="plate3-day" src={day.src} width={day.width} height={day.height} alt="" decoding="async" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="plate3-dusk" src={dusk.src} width={dusk.width} height={dusk.height} alt="" decoding="async" loading="lazy" />
      <svg className="plate3-letters" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet"
        style={{ left: `${box.left}%`, top: `${box.top}%`, width: `${box.width}%`, height: `${box.height}%` }}>
        {fit ? (
          <g fontFamily={FONT} fontSize={fit.fontSize} textAnchor="middle" letterSpacing={`${fit.fontSize * 0.03}`}>
            {fit.lines.map((line, i) => {
              const y = fit.firstBaseline + i * fit.pitch;
              return (
                <g key={i} className="plate3-line">
                  <text className="plate3-lip" x={W / 2} y={y + fit.fontSize * 0.022}><Line text={line} fs={fit.fontSize} /></text>
                  <text className="plate3-cut" x={W / 2} y={y}><Line text={line} fs={fit.fontSize} /></text>
                </g>
              );
            })}
          </g>
        ) : null}
      </svg>
      <span className="plate3-rake" style={{ left: `${box.left - 4}%`, top: `${box.top - 6}%`, width: `${box.width + 8}%`, height: `${box.height + 12}%` }} />
    </div>
  );
}
