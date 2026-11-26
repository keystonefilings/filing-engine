import { DashedOutline } from "@/components/ui/glyphs";
import { PlateGlyph, type PlateStage } from "./PlateGlyph";

/**
 * What we file's chip (merged spec 10A.3.2): the row's stage in words, led by its plate glyph. "Live" is Done, quiet;
 * "Rehearsed to the payment screen" carries the rehearsal's dashed edge; screens recorded and offered are cut in solid
 * Graphite; "Planned" is dotted. The label is the meaning; the glyph only repeats it.
 */
export function CoverageChip({ stage, label }: { stage: PlateStage; label: string }) {
  return (
    <span className={`cov2-chip is-${stage}`}>
      {stage === "rehearsed" ? <DashedOutline /> : null}
      <PlateGlyph stage={stage} />
      <span>{label}</span>
    </span>
  );
}
