import type { CSSProperties } from "react";
import { COVERAGE, PLACES, statusOf, type CoverageRow } from "@/lib/coverage";
import { PlateGlyph, type PlateStage } from "@/components/site-pages/PlateGlyph";
import { MotionFigure } from "./MotionFigure";

/** The cards' three tones (4.5): inked when live, dashed when rehearsed, cut otherwise. */
const stageOf = (r: CoverageRow): PlateStage => ({ live: "live", rehearsed: "rehearsed", plain: "recorded" } as const)[statusOf(r).tone];

/**
 * The sample cards (L6; merged spec 9.6): one card per place, each filing with its plate glyph, read straight from
 * web/lib/coverage.ts with "Planned" left out. Real data, so no example label. Dealt once (M6, 640 ms), then still.
 */
export function CoverageCards() {
  return (
    <MotionFigure pic="L6" ms={720} as="div" className="pic-coverage">
      <div className="pcov-legend">
        <span><PlateGlyph stage="live" /> Live</span>
        <span><PlateGlyph stage="rehearsed" /> Rehearsed to the payment screen</span>
        <span><PlateGlyph stage="recorded" /> Screens recorded or offered, rehearsal next</span>
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
                    <span className="pcov-mark"><PlateGlyph stage={stageOf(c)} label={s.label} /><span className="pcov-tip" aria-hidden="true">{s.label}</span></span>
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
