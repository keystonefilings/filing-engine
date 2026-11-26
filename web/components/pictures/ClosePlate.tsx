"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { PLATE_BOX } from "@/lib/photography";
import { plateText } from "@/lib/plate-lettering";
import { FIRM_NAME_EVENT, FIRM_NAME_MAX, readName, writeName } from "./carry";
import { Engraving } from "./Engraving";
import { reducedMotion } from "./motion";
import { ThemedPhoto } from "./ThemedPhoto";

/** Stand-in words (COPY-NEEDED, D7): the field's label, the engraving's description, and the photograph's alt text. */
export const PLATE_FIELD_LABEL = "Your firm's name";
const PLATE_DESCRIBE = "As you type, each letter is engraved on the blank plate in the photograph.";
export const PLATE_ALT = "A blank brass name plate beside a blue door";
const PLATE_ALT_NAMED = (name: string) => `A brass name plate engraved ${name} beside a blue door`;

const box = (b: { left: number; top: number; width: number; height: number }) => ({ left: `${b.left}%`, top: `${b.top}%`, width: `${b.width}%`, height: `${b.height}%` });

/** The plate's box on a crop, as CSS variables, so a crop switched by the window keeps the engraving in register. */
const boxVars = (name: "close" | "tall", b: (typeof PLATE_BOX)[keyof typeof PLATE_BOX]) => ({
  [`--pb-${name}-l`]: `${b.left}%`, [`--pb-${name}-t`]: `${b.top}%`, [`--pb-${name}-w`]: `${b.width}%`, [`--pb-${name}-h`]: `${b.height}%`,
});

/**
 * The Close (merged spec 9.9; D3, M9): Harbor & Pine's door with its brass plate blank, full bleed, and on a Cotton panel
 * the words, one optional field and the Brass button. As the visitor types their firm's name each letter is cut into
 * the plate; the name stays in this tab's sessionStorage and pre-fills "Firm name" at sign-up. The field is not in a
 * form and has no name, so it is never submitted anywhere. Shown only with JavaScript (an inline script marks the page
 * before first paint, so the panel never shifts).
 */
export function ClosePlate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const id = useId();
  const [name, setName] = useState("");
  const [rake, setRake] = useState(0);
  const [focus, setFocus] = useState(false);
  const [strip, setStrip] = useState<{ top: number } | null>(null);
  const [push, setPush] = useState(false);
  const bandRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const idle = useRef(0);
  const save = useRef(0);
  const lastRake = useRef(0);
  const stored = useRef(false);

  // Back in the same tab: the field pre-filled and the name already cut, with no animation and no push-in.
  useEffect(() => {
    const n = readName();
    if (n) { stored.current = true; setName(n); }
    const onName = (e: Event) => setName((e as CustomEvent<string>).detail);
    window.addEventListener(FIRM_NAME_EVENT, onName);
    return () => window.removeEventListener(FIRM_NAME_EVENT, onName);
  }, []);

  // Written 300 ms after typing settles and on pagehide; removed when the field is emptied.
  useEffect(() => {
    window.clearTimeout(save.current);
    save.current = window.setTimeout(() => writeName(name), 300);
    const hide = () => writeName(name);
    window.addEventListener("pagehide", hide);
    return () => window.removeEventListener("pagehide", hide);
  }, [name]);

  // The slow push-in at 40% in view, once (Hal M8): not with reduced motion or a name already on the plate.
  useEffect(() => {
    const el = bandRef.current;
    if (!el || reducedMotion()) return;
    const io = new IntersectionObserver(([e]) => {
      if (e && e.intersectionRatio >= 0.4) { if (!stored.current) setPush(true); io.disconnect(); }
    }, { threshold: [0, 0.4] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Phones and touch tablets: while the field has focus and the plate is mostly off screen (the keyboard is up), a strip
  // of the same plate docks under the header, placed with the visual viewport so the keyboard never covers it.
  useEffect(() => {
    const vv = window.visualViewport;
    if (!focus || !vv || !window.matchMedia("(max-width: 1023px)").matches) { setStrip(null); return; }
    const place = () => {
      const r = plateRef.current?.getBoundingClientRect();
      const top = vv.offsetTop, bottom = vv.offsetTop + vv.height;
      const inView = r ? Math.max(0, Math.min(r.bottom, bottom) - Math.max(r.top, top)) / Math.max(1, r.height) : 0;
      setStrip(inView < 0.5 ? { top: vv.offsetTop + 72 } : null);
    };
    place();
    vv.addEventListener("resize", place); vv.addEventListener("scroll", place); window.addEventListener("scroll", place, { passive: true });
    return () => { vv.removeEventListener("resize", place); vv.removeEventListener("scroll", place); window.removeEventListener("scroll", place); };
  }, [focus]);

  const onChange = (v: string) => {
    setName(v);
    stored.current = false;
    window.clearTimeout(idle.current);
    // 700 ms after the last keystroke the late sun rakes across the plate once, at most once every 6 s.
    if (plateText(v) && !reducedMotion()) {
      idle.current = window.setTimeout(() => {
        if (performance.now() - lastRake.current > 6000) { lastRake.current = performance.now(); setRake((k) => k + 1); }
      }, 700);
    }
  };

  return (
    <section ref={bandRef} className="pclose">
      <div className={["pclose-photo", push && "is-push"].filter(Boolean).join(" ")}>
        <div className="pclose-frame" style={{ ...boxVars("close", PLATE_BOX.close), ...boxVars("tall", PLATE_BOX.tall) } as CSSProperties}>
          <ThemedPhoto day="c03-close-day" dayMobile="c03-close-day-mobile" dusk="c04-close-dusk" duskMobile="c04-close-dusk-mobile" alt={PLATE_ALT} />
          <div className="pclose-plate" ref={plateRef}><Engraving name={name} live={!stored.current} rakeKey={rake} /></div>
        </div>
      </div>
      <div className="site2-in pclose-in">
        <div className="pclose-panel">
          {children}
          <div className="pclose-field">
            <label htmlFor={`${id}-firm`}>{PLATE_FIELD_LABEL}</label>
            <input
              id={`${id}-firm`} type="text" autoComplete="organization" autoCapitalize="words" spellCheck={false} maxLength={FIRM_NAME_MAX}
              enterKeyHint="go" aria-describedby={`${id}-plate`} data-private="" data-ph-no-capture="" value={name}
              onChange={(e) => onChange(e.target.value)} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); writeName(name); router.push("/signup"); } }}
            />
            <span id={`${id}-plate`} className="sr-only">{PLATE_DESCRIBE}</span>
          </div>
          <Link className="btn2 is-action pclose-btn" href="/signup" data-brass-cta="" onClick={() => writeName(name)}>Run a free rehearsal</Link>
        </div>
      </div>
      {strip ? (
        <div className="pclose-strip" style={{ top: strip.top }} aria-hidden="true">
          <div className="pclose-strip-frame">
            <ThemedPhoto day="c03-signup-strip-day" dusk="c04-signup-strip-dusk" alt="" />
            <div className="pclose-plate" style={box(PLATE_BOX.strip)}><Engraving name={name} /></div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

/**
 * For firms' close (10A.2.6): the blank plate at 4:5, and if the visitor typed a name at the home page's Close or in the
 * studio, it is already engraved there: still, complete on first paint, no cutting and no push-in.
 */
export function StillPlate() {
  const [name, setName] = useState("");
  useEffect(() => {
    setName(readName());
    const onName = (e: Event) => setName((e as CustomEvent<string>).detail);
    window.addEventListener(FIRM_NAME_EVENT, onName);
    return () => window.removeEventListener(FIRM_NAME_EVENT, onName);
  }, []);
  const shown = plateText(name);
  return (
    <div className="pstill">
      <ThemedPhoto day="c03-close-day-mobile" dusk="c04-close-dusk-mobile" alt={shown ? PLATE_ALT_NAMED(shown) : PLATE_ALT} />
      <div className="pclose-plate" style={box(PLATE_BOX.tall)}><Engraving name={shown} /></div>
    </div>
  );
}
