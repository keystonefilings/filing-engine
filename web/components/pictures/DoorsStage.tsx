"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { reducedMotion } from "./motion";

/** Stand-in words (COPY-NEEDED, D7): the wipe handle's accessible name and its spoken value (9.2). */
export const WIPE_NAME = "Compare the two firms' pages";
function valueText(v: number): string {
  if (v < 0) return `${Math.round(-v)}% of Harbor & Pine CPA's page in Northgate Payroll's brand`;
  if (v > 0) return `${Math.round(v)}% of Northgate Payroll's page in Harbor & Pine CPA's brand`;
  return "Each page in its own firm's brand";
}

interface Geo { aL: number; aR: number; bL: number; bR: number; xc: number; top: number; height: number; grip: number }

/**
 * The live part of the two doors (merged spec 9.2, 10A.2.3): the brass wipe handle on wider screens, which re-inks the
 * part of a page past it into the other firm's brand while nothing else moves a pixel, and on phones the two-card
 * swipe with its dots, which slides itself once to the second firm after the first has played.
 * `parked` rests the handle in the middle of the left page (For firms), so both brands show on one sheet.
 */
export function DoorsStage({ parked, names, children }: { parked?: boolean; names: [string, string]; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [geo, setGeo] = useState<Geo | null>(null);
  const [x, setX] = useState<number | null>(null);
  const [spring, setSpring] = useState<"" | "back" | "glide">("");
  const [live, setLive] = useState(false);
  const [card, setCard] = useState(0);
  const dragging = useRef(false);
  const touched = useRef(false);

  const restX = useCallback((g: Geo) => (parked ? (g.aL + g.aR) / 2 : g.xc), [parked]);

  // Measure the two pages: the handle and the clips are set in pixels from their boxes.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Layout offsets, not bounding boxes: the motion moves the panels with transforms, and the handle belongs to where they rest.
    const pos = (node: HTMLElement) => {
      let x = 0, y = 0, n: HTMLElement | null = node;
      while (n && n !== el) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent as HTMLElement | null; }
      return { x, y, w: node.offsetWidth, h: node.offsetHeight };
    };
    const measure = () => {
      const [pa, pb] = [...el.querySelectorAll<HTMLElement>(".pdoors-panel")];
      if (!pa || !pb || pa.offsetWidth === 0) return;
      const a = pos(pa), b = pos(pb);
      const btnEl = pa.querySelector<HTMLElement>(".cpp-btn");
      const btn = btnEl ? pos(btnEl) : null;
      const g = { aL: a.x, aR: a.x + a.w, bL: b.x, bR: b.x + b.w, xc: (a.x + a.w + b.x) / 2, top: a.y, height: a.h, grip: btn ? btn.y + btn.h / 2 : a.y + a.h * 0.9 };
      setGeo(g);
      if (!dragging.current) setX(restX(g));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [restX]);

  // Follow the picture's motion: the handle appears at rest; on For firms it glides to its parked place after playing.
  useEffect(() => {
    const fig = ref.current?.closest<HTMLElement>(".pic");
    if (!fig) return;
    let prev = fig.dataset.motion;
    const sync = () => {
      const m = fig.dataset.motion;
      setLive(m === undefined || m === "rest");
      if (prev === "play" && m === "rest") {
        if (parked && geo) { setX(geo.xc); requestAnimationFrame(() => { setSpring("glide"); setX(restX(geo)); }); }
        // Phones: 1.2 s after the first firm has played, the strip slides itself once to the second.
        const strip = ref.current?.querySelector<HTMLElement>(".pdoors-strip");
        if (strip && window.matchMedia("(max-width: 599px)").matches && !touched.current && !reducedMotion()) {
          window.setTimeout(() => { if (!touched.current) strip.scrollTo({ left: strip.scrollWidth, behavior: "smooth" }); }, 1200);
        }
      }
      prev = m;
    };
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(fig, { attributes: true, attributeFilter: ["data-motion"] });
    return () => mo.disconnect();
  }, [geo, parked, restX]);

  // The strip's dots follow the card in view.
  useEffect(() => {
    const strip = ref.current?.querySelector<HTMLElement>(".pdoors-strip");
    if (!strip) return;
    const on = () => setCard(strip.scrollLeft > strip.scrollWidth / 4 ? 1 : 0);
    const touch = () => { touched.current = true; };
    strip.addEventListener("scroll", on, { passive: true });
    strip.addEventListener("pointerdown", touch);
    strip.addEventListener("touchstart", touch, { passive: true });
    return () => { strip.removeEventListener("scroll", on); strip.removeEventListener("pointerdown", touch); strip.removeEventListener("touchstart", touch); };
  }, []);

  const valueOf = (px: number, g: Geo) => (px < g.aR ? -((g.aR - px) / (g.aR - g.aL)) * 100 : px > g.bL ? ((px - g.bL) / (g.bR - g.bL)) * 100 : 0);
  const xOf = (v: number, g: Geo) => (v < 0 ? g.aR + (v / 100) * (g.aR - g.aL) : v > 0 ? g.bL + (v / 100) * (g.bR - g.bL) : g.xc);
  const clamp = (px: number, g: Geo) => Math.min(g.bR, Math.max(g.aL, px));

  const onDown = (e: React.PointerEvent) => {
    if (!geo) return;
    dragging.current = true; setSpring("");
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current || !geo || !ref.current) return;
    setX(clamp(e.clientX - ref.current.getBoundingClientRect().left, geo));
  };
  const release = () => {
    if (!dragging.current || !geo) return;
    dragging.current = false;
    setSpring(reducedMotion() ? "" : "back"); setX(restX(geo));
  };
  const onKey = (e: React.KeyboardEvent) => {
    if (!geo || x === null) return;
    const v = valueOf(x, geo);
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = Math.max(-100, (v > 0 ? 0 : v) - 10);
    else if (e.key === "ArrowRight" || e.key === "ArrowUp") next = Math.min(100, (v < 0 ? 0 : v) + 10);
    else if (e.key === "Home") next = -100;
    else if (e.key === "End") next = 100;
    else if (e.key === "Escape") { setSpring(reducedMotion() ? "" : "back"); setX(restX(geo)); e.preventDefault(); return; }
    if (next === null) return;
    e.preventDefault(); setSpring(""); setX(xOf(next, geo));
  };

  const v = geo && x !== null ? valueOf(x, geo) : 0;
  const clips = geo && x !== null ? {
    a: `inset(0 0 0 ${Math.max(0, Math.min(geo.aR - geo.aL, x - geo.aL))}px)`,
    b: `inset(0 ${Math.max(0, Math.min(geo.bR - geo.bL, geo.bR - x))}px 0 0)`,
  } : null;

  return (
    <div ref={ref} className={["pdoors-stage", spring && `is-${spring}`, live && geo && "is-live"].filter(Boolean).join(" ")}
      style={clips ? { ["--clip-a" as string]: clips.a, ["--clip-b" as string]: clips.b } : undefined}
      onTransitionEnd={() => setSpring("")}>
      {children}
      {geo && x !== null ? (
        <div className="pdoors-handle" style={{ transform: `translateX(${x}px)`, top: geo.top, height: geo.height }}>
          <span className="pdoors-handle-rule" aria-hidden="true" />
          <span
            className="pdoors-grip" role="slider" tabIndex={live ? 0 : -1} aria-label={WIPE_NAME}
            aria-valuemin={-100} aria-valuemax={100} aria-valuenow={Math.round(v)} aria-valuetext={valueText(v)}
            style={{ top: geo.grip - geo.top }}
            onPointerDown={onDown} onPointerMove={onMove} onPointerUp={release} onPointerCancel={release} onKeyDown={onKey}
            onBlur={() => { if (!dragging.current) { setSpring(reducedMotion() ? "" : "back"); setX(restX(geo)); } }}
          >
            <svg viewBox="0 0 28 56" aria-hidden="true"><circle cx="14" cy="28" r="4" fill="none" strokeWidth="1" /><path d="M11.2 28h5.6" strokeWidth="1" /></svg>
          </span>
        </div>
      ) : null}
      <div className="pdoors-dots">
        {names.map((n, i) => (
          <button key={n} type="button" aria-label={n} aria-current={card === i ? "true" : undefined} onClick={() => {
            touched.current = true;
            const strip = ref.current?.querySelector<HTMLElement>(".pdoors-strip");
            strip?.scrollTo({ left: i ? strip.scrollWidth : 0, behavior: reducedMotion() ? "auto" : "smooth" });
          }}><span /></button>
        ))}
      </div>
    </div>
  );
}
