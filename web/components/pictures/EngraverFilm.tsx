"use client";

import { useEffect, useRef, useState } from "react";
import "@/styles/components/film.css";

/**
 * For firms' frontispiece (merged spec 10A.2.1; the owner's C11 film, Nov 27): 12 seconds, silent, a graver cutting
 * "Harbor & Pine CPA" into brass, the plate wiped and fitted beside the blue door. Two portrait cuts, 4:5: the desktop
 * and tablet cut, and the phone's own, tighter on the hands and the plate; each in AV1 with an H.264 fallback, and a
 * poster of its last frame.
 *
 * Plays once, muted and inline, when 40% of it is in view; pauses when it leaves the screen and resumes when it comes
 * back; holds its last frame (the finished plate on the door, which is also the poster). A 40 px control in its lower
 * left corner pauses, plays and plays again. With reduced motion, Save-Data, or when the browser won't autoplay, the
 * poster stands and the control plays it on request; with no script, the poster alone. The description track and a
 * text description (both the owner's) tell what happens for anyone who can't see it. The film carries no caption:
 * it's generated imagery, so there's no craftsperson to credit, and no example label (10A.0.5).
 */

const BASE = "/cofile/film/cofile-engraving-12s";
const CUTS = {
  desktop: { av1: `${BASE}-desktop-av1.mp4`, h264: `${BASE}-desktop-h264.mp4`, poster: `${BASE}-desktop-poster.avif` },
  phone: { av1: `${BASE}-phone-av1.mp4`, h264: `${BASE}-phone-h264.mp4`, poster: `${BASE}-phone-poster.avif` },
} as const;
const PHONE = "(max-width: 639px)";

/** The owner's description of the film (C11 package README), for screen readers. */
const DESCRIPTION = "A graver cuts Harbor & Pine CPA into a brass plaque. A hand wipes the waxed lettering, and a screwdriver tightens the plaque beside a blue door.";
/** Stand-in words (COPY-NEEDED, 10A.2.1): the control's accessible names. "Play again" is the replay control's elsewhere. */
const NAMES = { pause: "Pause", play: "Play", again: "Play again" } as const;

type State = "idle" | "playing" | "paused" | "ended";

export function EngraverFilm() {
  const video = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [cut, setCut] = useState<keyof typeof CUTS | null>(null);
  const [state, setState] = useState<State>("idle");
  const [shown, setShown] = useState(false); // the video drawn over the poster once it has a frame to show
  const auto = useRef(true); // false under reduced motion or Save-Data, or once the visitor pauses it
  const visible = useRef(false);

  useEffect(() => {
    setMounted(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const save = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reduce || save) auto.current = false;
    setCut(window.matchMedia(PHONE).matches ? "phone" : "desktop");
  }, []);

  useEffect(() => {
    const v = video.current;
    if (!v || !cut) return;
    const tryPlay = () => {
      v.play().catch(() => { auto.current = false; setState((s) => (s === "playing" ? "paused" : s)); });
    };
    const io = new IntersectionObserver(([e]) => {
      if (!e) return;
      visible.current = e.intersectionRatio >= 0.4;
      if (!e.isIntersecting && !v.paused) v.pause();
      else if (visible.current && auto.current && v.paused && !v.ended) tryPlay();
    }, { threshold: [0, 0.4] });
    io.observe(v);
    return () => io.disconnect();
  }, [cut]);

  const onPlaying = () => { setShown(true); setState("playing"); };
  const onPause = () => { const v = video.current; if (v && !v.ended) setState("paused"); };
  const onEnded = () => setState("ended");

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (state === "playing") {
      auto.current = false; // the visitor paused it: scrolling back doesn't start it again
      v.pause();
      return;
    }
    if (state === "ended") v.currentTime = 0;
    auto.current = true;
    v.play().catch(() => {});
  };

  const label = state === "playing" ? NAMES.pause : state === "ended" ? NAMES.again : NAMES.play;

  return (
    <figure className="pfilm">
      <picture className="pfilm-poster">
        <source media={PHONE} srcSet={CUTS.phone.poster} type="image/avif" />
        <img src={CUTS.desktop.poster} alt="" width={1008} height={1260} fetchPriority="high" decoding="async" />
      </picture>
      {cut ? (
        <video ref={video} className={["pfilm-video", shown && "is-shown"].filter(Boolean).join(" ")} muted playsInline preload="metadata"
          poster={CUTS[cut].poster} aria-hidden="true" tabIndex={-1}
          onPlaying={onPlaying} onPause={onPause} onEnded={onEnded}>
          <source src={CUTS[cut].av1} type={'video/mp4; codecs="av01.0.08M.08"'} />
          <source src={CUTS[cut].h264} type={'video/mp4; codecs="avc1.640028"'} />
          <track kind="descriptions" src={`${BASE}-descriptions.vtt`} srcLang="en" label="English descriptions" />
        </video>
      ) : null}
      <p className="sr-only">{DESCRIPTION}</p>
      {mounted ? (
        <button type="button" className="pfilm-control" onClick={toggle} aria-label={label} title={label}>
          {state === "playing" ? <PauseGlyph /> : state === "ended" ? <ReplayGlyph /> : <PlayGlyph />}
        </button>
      ) : null}
    </figure>
  );
}

function PauseGlyph() {
  return <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor"><rect x="3.5" y="2.5" width="3" height="11" rx="0.5" /><rect x="9.5" y="2.5" width="3" height="11" rx="0.5" /></svg>;
}
function PlayGlyph() {
  return <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="currentColor"><path d="M4.5 2.6v10.8c0 .4.4.6.7.4l8.4-5.4a.5.5 0 0 0 0-.8L5.2 2.2c-.3-.2-.7 0-.7.4Z" /></svg>;
}
function ReplayGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.2 9.5A7.5 7.5 0 1 1 4.5 13" /><path d="M4.8 5.2v4.6h4.6" />
    </svg>
  );
}
