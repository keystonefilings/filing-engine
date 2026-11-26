import type { CSSProperties } from "react";
import { COVERAGE, PLACES, statusOf, type CoverageRow } from "@/lib/coverage";
import { MotionFigure } from "./MotionFigure";

type Mark = "live" | "rehearsed" | "plain";

/** The plate glyph (4.5): the Name Plate's outline without screws, 16 × 10, inked when live, dashed when rehearsed, cut otherwise. */
export function PlateGlyph({ mark, label }: { mark: Mark; label?: string }) {
  const plate = "M2.5 .5H13.5L15.5 2.5V7.5L13.5 9.5H2.5L.5 7.5V2.5Z";
  return (
    <svg className={`pglyph is-${mark}`} width="16" height="10" viewBox="0 0 16 10" role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <path d={plate} />
      {mark === "live" ? <path className="pglyph-line" d="M3.5 5H12.5" /> : null}
    </svg>
  );
}

const markOf = (r: CoverageRow): Mark => statusOf(r).tone;

/**
 * The sample cards (L6; merged spec 9.6): one card per place, each filing with its plate glyph, read straight from
 * web/lib/coverage.ts with "Planned" left out. Real data, so no example label. Dealt once (M6, 640 ms), then still.
 */
export function CoverageCards() {
  return (
    <MotionFigure pic="L6" ms={720} as="div" className="pic-coverage">
      <div className="pcov-legend">
        <span><PlateGlyph mark="live" /> Live</span>
        <span><PlateGlyph mark="rehearsed" /> Rehearsed to the payment screen</span>
        <span><PlateGlyph mark="plain" /> Screens recorded or offered, rehearsal next</span>
      </div>
      <div className="pcov-cards">
        {PLACES.map((place, i) => (
          <article key={place} className="pcov-card m-deal" style={{ ["--d" as string]: `${i * 80}ms` } as CSSProperties}>
            <h3 className="pcov-place">{place}</h3>
            <ul>
              {COVERAGE.filter((c) => c.where === place && c.stage !== "planned").map((c) => {
                const s = statusOf(c);
                return (
                  <li key={c.what}>
                    <span>{c.short}</span>
                    <span className="pcov-mark"><PlateGlyph mark={markOf(c)} label={s.label} /><span className="pcov-tip" aria-hidden="true">{s.label}</span></span>
                  </li>
                );
              })}
            </ul>
          </article>
        ))}
      </div>
    </MotionFigure>
  );
}
