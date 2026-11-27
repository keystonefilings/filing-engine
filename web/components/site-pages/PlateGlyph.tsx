import "@/styles/components/plate-glyph.css";
import type { CoverageRow } from "@/lib/coverage";
import { isLive } from "@/lib/coverage";

/** Where a filing type is on its way to live, from the copy's own stages (merged spec 4.5, 10A.3). */
export type PlateStage = "live" | "rehearsed" | "recorded" | "offered" | "planned";

export function plateStage(row: CoverageRow): PlateStage {
  return isLive(row) ? "live" : row.stage;
}

/** A chamfered plate outline inset by i on a w × h box, corners cut at 45° with leg c. */
function plate(w: number, h: number, i: number, c: number) {
  const [x0, y0, x1, y1] = [i, i, w - i, h - i];
  return `M${x0 + c} ${y0}H${x1 - c}L${x1} ${y0 + c}V${y1 - c}L${x1 - c} ${y1}H${x0 + c}L${x0} ${y1 - c}V${y0 + c}Z`;
}

/**
 * The plate glyph (4.5): the Name Plate's outline without screws, cut, then marked out, then inked, so the scale reads
 * in grayscale and in print. 16 × 10 in a chip; 40 × 25 on the road to live, where "Screens recorded" carries three
 * short rules inside (its screens mapped). Hidden from screen readers where a label beside it carries the meaning;
 * with `label`, it carries its status as its own accessible name (the home page's coverage cards, 9.6).
 */
export function PlateGlyph({ stage, large, label }: { stage: PlateStage; large?: boolean; label?: string }) {
  const [w, h, c] = large ? [40, 25, 5] : [16, 10, 2.5];
  const cls = `plate2-glyph is-${stage}${large ? " is-large" : ""}`;
  const a11y = label ? { role: "img" as const, "aria-label": label } : { "aria-hidden": true as const };
  if (stage === "live") {
    return (
      <svg className={cls} width={w} height={h} viewBox={`0 0 ${w} ${h}`} {...a11y} focusable="false">
        <path d={plate(w, h, 0, c)} className="plate2-fill" />
        <path d={`M${large ? 6 : 2.5} ${h / 2}H${w - (large ? 6 : 2.5)}`} className="plate2-line" />
      </svg>
    );
  }
  const sw = stage === "rehearsed" ? 1.5 : 1;
  return (
    <svg className={cls} width={w} height={h} viewBox={`0 0 ${w} ${h}`} {...a11y} focusable="false">
      <path d={plate(w, h, sw / 2, c)} className="plate2-edge" strokeWidth={sw} />
      {large && stage === "recorded"
        ? [8.5, 12.5, 16.5].map((y) => <path key={y} d={`M11 ${y}H29`} className="plate2-rule" />)
        : null}
    </svg>
  );
}
