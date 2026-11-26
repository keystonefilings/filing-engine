import type { CSSProperties } from "react";
import { Glyph } from "@/components/ui/glyphs";
import { DeskHead, DeskRule } from "./DeskParts";
import { MotionFigure } from "./MotionFigure";
import { Photo } from "./Photo";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/** The stand-in's rehearsal log, cued line by line; the last line is set exactly like the others (4.4). */
const CUES: [string, string][] = [
  ["Business name", "filled"],
  ["Name check", "passed"],
  ["Registered agent", "filled"],
  ["Members and signatures", "filled"],
  ["Review page", "matched the proof"],
  ["Payment: $103.50", "matches the proof"],
  ["Pay Now", "held, on purpose"],
];

/** Stand-in words (COPY-NEEDED, D7): the stage photograph's alt text. */
const STAGE_ALT = "An empty stage lit by a single ghost light";

/**
 * The programme (L7; merged spec 9.7): an empty theatre with one ghost light, and Harbor & Pine's run sheet for a
 * rehearsal, a page of CoFile's desk, every screen cued like a printed programme. M7, about 2.3 s: the light comes up,
 * the cues set one by one with the pool of light stepping down to each, then the pool widens over the whole sheet.
 */
export function RunSheet() {
  return (
    <MotionFigure pic="L7" ms={2340} className="pic-stage" ariaLabel="Example rehearsal log" label="Rehearsal · nothing filed, nothing paid">
      <div className="pstage">
        <div className="pstage-photo">
          <Photo name="c07-rehearsal" mobile="c07-rehearsal-mobile" alt={STAGE_ALT} />
          <span className="pstage-dim" aria-hidden="true" />
        </div>
        <div className="prun sheet">
          <span className="prun-pool" aria-hidden="true"><i /></span>
          <DeskHead lockup={20} spread />
          <DeskRule />
          <p className="prun-head"><Glyph kind="ghost" /><span>Rehearsal · New Jersey LLC formation</span></p>
          <p className="prun-test">test details</p>
          <span className="prun-tape" aria-hidden="true" />
          <ol className="prun-cues">
            {CUES.map(([step, result], i) => (
              <li key={step} className="m-set" style={d(700 + i * 120)}>
                <span className="prun-step">{step}</span>
                <span className="prun-dots m-draw" style={d(700 + i * 120)} aria-hidden="true" />
                <span className="prun-result">{result}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </MotionFigure>
  );
}
