"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { reducedMotion } from "./motion";

export interface ProofPoint { part: string; text: ReactNode; describe: string }

/**
 * The points beside the sample proof (decisions 16, 19; merged spec 9.4, 10A.1.3): each list item, hovered, focused or
 * tapped, outlines its part of the proof with a 2 px Plate Ink outline and a Brass Tint wash, one at a time. The
 * outlines are drawn on the proof already; this only says which one shows. Without JavaScript they are a plain list.
 * Touch: a tap toggles, first bringing the part to the middle of the screen if it isn't wholly in view.
 */
export function ProofPoints({ proofId, points, className, tail }: { proofId: string; points: ProofPoint[]; className?: string; tail?: ReactNode }) {
  const [on, setOn] = useState<string | null>(null);
  const [js, setJs] = useState(false);
  const touch = useRef(false);
  useEffect(() => setJs(true), []);

  useEffect(() => {
    const fig = document.getElementById(proofId);
    if (!fig) return;
    if (on) {
      // Pointing while the proof is still being laid down: the picture goes to its final frame first.
      if (fig.dataset.motion === "before" || fig.dataset.motion === "play") fig.dispatchEvent(new CustomEvent("pic-finish"));
      fig.dataset.point = on;
    } else delete fig.dataset.point;
  }, [on, proofId]);

  useEffect(() => {
    const fig = document.getElementById(proofId);
    const clear = () => setOn(null);
    fig?.addEventListener("pic-replay", clear);
    // On touch, a tap anywhere else clears the outline.
    const away = (e: PointerEvent) => { if (e.pointerType !== "mouse" && !(e.target as HTMLElement).closest?.(".ppoints")) setOn(null); };
    document.addEventListener("pointerdown", away);
    return () => { fig?.removeEventListener("pic-replay", clear); document.removeEventListener("pointerdown", away); };
  }, [proofId]);

  const tap = (part: string) => {
    if (on === part) { setOn(null); return; }
    const target = document.querySelector<HTMLElement>(`#${proofId} [data-for="${part}"]`);
    const r = target?.getBoundingClientRect();
    if (r && (r.top < 64 || r.bottom > window.innerHeight)) {
      target!.scrollIntoView({ block: "center", behavior: reducedMotion() ? "auto" : "smooth" });
    }
    setOn(part);
  };

  return (
    <ul className={["ppoints", className].filter(Boolean).join(" ")}>
      {points.map((p, i) => (
        <li key={p.part}>
          {js ? (
            <>
              <button
                type="button" className="ppoints-btn" aria-describedby={`${proofId}-pt-${i}`}
                onPointerDown={(e) => { touch.current = e.pointerType !== "mouse"; }}
                onPointerEnter={(e) => { if (e.pointerType === "mouse") setOn(p.part); }}
                onPointerLeave={(e) => { if (e.pointerType === "mouse") setOn((o) => (o === p.part ? null : o)); }}
                onFocus={() => { if (!touch.current) setOn(p.part); }}
                onBlur={() => { if (!touch.current) setOn((o) => (o === p.part ? null : o)); }}
                onClick={() => { if (touch.current) tap(p.part); touch.current = false; }}
              >{p.text}</button>
              <span id={`${proofId}-pt-${i}`} className="sr-only">{p.describe}</span>
            </>
          ) : <span>{p.text}</span>}
        </li>
      ))}
      {tail}
    </ul>
  );
}
