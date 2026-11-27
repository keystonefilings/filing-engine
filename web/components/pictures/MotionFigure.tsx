"use client";

import "@/styles/components/pictures.css";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { hasPlayed, IN_VIEW, markPlayed, reducedMotion, released, requestPlay } from "./motion";

export type MotionState = "final" | "before" | "play" | "rest";

/** The replay glyph: an open circle with an arrowhead, 1.5 px, Graphite (8.7 U13). */
function ReplayGlyph() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.2 9.5A7.5 7.5 0 1 1 4.5 13" />
      <path d="M4.8 5.2v4.6h4.6" />
    </svg>
  );
}

/** Stand-in words (COPY-NEEDED, D7): the replay control's accessible name. */
export const REPLAY_NAME = "Play again";

/**
 * A moving picture (merged spec 8.1, 8.9): a figure whose markup is its final frame. The motion module sets
 * data-motion="before" while it is out of view, "play" the first time 40% of it is in view, then "rest", and shows the
 * 24 px replay control in its caption row. CSS in styles/components/pictures.css holds each picture's timeline.
 * `ms` is the timeline's length; `msPhone` its length on phones, where some timelines run differently.
 */
export function MotionFigure({ pic, ms, msPhone, label, ariaLabel, id, className, prepaint, replayApart, onState, as = "figure", children }: {
  pic: string; ms: number; msPhone?: number; label?: ReactNode; ariaLabel?: string; id?: string; className?: string;
  /** "div" for real data that moves but isn't an example (the coverage cards, 9.6). */
  as?: "figure" | "div";
  /** The hero: its "before" state is set by a script before first paint (motion.ts prepaintScript). */
  prepaint?: boolean;
  /** Draw the replay control outside the caption, for pictures that place it apart from their label. */
  replayApart?: boolean;
  onState?: (s: MotionState) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [state, setState] = useState<MotionState>("final");
  const [replay, setReplay] = useState(false);
  const stateRef = useRef<MotionState>("final");
  const timer = useRef(0);
  const cancelWait = useRef<() => void>(() => {});
  const onStateRef = useRef(onState);
  onStateRef.current = onState;
  const set = useCallback((s: MotionState) => { stateRef.current = s; setState(s); onStateRef.current?.(s); }, []);
  const duration = useCallback(() => (msPhone !== undefined && window.matchMedia("(max-width: 599px)").matches ? msPhone : ms), [ms, msPhone]);

  const finish = useCallback(() => {
    window.clearTimeout(timer.current);
    cancelWait.current();
    released(pic);
    if (stateRef.current === "before" || stateRef.current === "play") set("rest");
    markPlayed(pic);
    if (!reducedMotion()) setReplay(true);
  }, [pic, set]);

  const start = useCallback(() => {
    if (reducedMotion()) { finish(); return; }
    const total = duration();
    cancelWait.current = requestPlay(pic, total, () => {
      set("play");
      timer.current = window.setTimeout(finish, total + 60);
    }, finish);
  }, [duration, finish, pic, set]);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion()) return;
    const pre = prepaint && document.documentElement.getAttribute("data-pre") === pic;
    if (pre) set("before");
    else if (hasPlayed(pic)) { setReplay(true); return; }
    else {
      const r = el.getBoundingClientRect();
      // Already on screen when the page runs: it stays complete (nothing flashes), with its replay control.
      if (r.bottom > 0 && r.top < window.innerHeight) { setReplay(true); return; }
      set("before");
    }
    const io = new IntersectionObserver(([e]) => {
      if (!e) return;
      if (stateRef.current === "before" && e.intersectionRatio >= IN_VIEW) start();
      // Never half-built: a playing picture that leaves the screen jumps to its final frame.
      else if (stateRef.current === "play" && e.intersectionRatio < 0.1) finish();
    }, { threshold: [0, 0.1, IN_VIEW, 0.6] });
    io.observe(el);
    const hidden = () => { if (document.hidden && stateRef.current === "play") finish(); };
    document.addEventListener("visibilitychange", hidden);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => { if (mq.matches) { finish(); setReplay(false); } };
    mq.addEventListener("change", onMq);
    // A part of the page may ask for the final frame (the proof's points, 9.4).
    const onFinish = () => { if (stateRef.current === "before" || stateRef.current === "play") finish(); };
    el.addEventListener("pic-finish", onFinish);
    return () => {
      io.disconnect(); document.removeEventListener("visibilitychange", hidden); mq.removeEventListener("change", onMq);
      el.removeEventListener("pic-finish", onFinish); window.clearTimeout(timer.current); cancelWait.current();
    };
  }, [finish, pic, prepaint, set, start]);

  // The hero's pre-paint mark comes off <html> once the figure carries its own "before".
  useEffect(() => {
    if (state !== "final" && document.documentElement.getAttribute("data-pre") === pic) document.documentElement.removeAttribute("data-pre");
  }, [state, pic]);

  const again = () => {
    if (stateRef.current === "play") return;
    ref.current?.dispatchEvent(new CustomEvent("pic-replay"));
    set("before");
    // Two frames so the "before" state is painted before the timeline starts again.
    requestAnimationFrame(() => requestAnimationFrame(() => start()));
  };
  const button = replay ? (
    <button type="button" className="pic-replay" aria-label={REPLAY_NAME} disabled={state === "play"} onClick={again}><ReplayGlyph /></button>
  ) : null;

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      id={id}
      className={["pic", className].filter(Boolean).join(" ")}
      data-pic={pic}
      data-motion={state === "final" ? undefined : state}
      data-prepaint={prepaint ? "" : undefined}
      aria-label={ariaLabel}
    >
      {children}
      {label !== undefined && as === "figure" ? <figcaption className="pic-cap"><span className="pic-label">{label}</span>{replayApart ? null : button}</figcaption> : null}
      {replayApart || label === undefined ? <span className="pic-replay-apart">{button}</span> : null}
    </Tag>
  );
}
