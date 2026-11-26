"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Motion = "rest" | "ready" | "play";

/**
 * A picture that plays once (merged spec D2.2, 10A.0.5): it rests in its final frame (no JavaScript, reduced motion,
 * or already on screen when the page opens), and otherwise is set to its starting frame while below the fold and
 * plays once when 40% of it is in view, then rests. The CSS reads data-motion: "ready" is the starting frame, "play"
 * runs the choreography, "rest" is the final frame. With a caption, the replay control sits at the caption row's end.
 */
export function PlayOnce({ className, duration, caption, replayLabel, children, label }: {
  className: string; duration: number; caption?: ReactNode; replayLabel?: string; children: ReactNode; label?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [motion, setMotion] = useState<Motion>("rest");
  const [played, setPlayed] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  const play = useCallback(() => {
    setMotion("play");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => { setMotion("rest"); setPlayed(true); }, duration + 100);
  }, [duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) { setPlayed(true); return; }
    setMotion("ready");
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); play(); }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); window.clearTimeout(timer.current); };
  }, [play]);

  const replay = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setMotion("ready");
    requestAnimationFrame(() => requestAnimationFrame(play));
  };

  return (
    <figure ref={ref} className={className} data-motion={motion} aria-label={label}>
      {children}
      {caption ? (
        <figcaption className="play2-caption">
          <span>{caption}</span>
          {replayLabel && played ? (
            <button type="button" className="play2-replay" onClick={replay} aria-label={replayLabel} title={replayLabel}>
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path d="M18.4 9.2A7 7 0 1 0 19 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M19.2 4.6v5h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
