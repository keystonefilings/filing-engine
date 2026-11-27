import type { CSSProperties } from "react";
import { Glyph } from "@/components/ui/glyphs";
import { Lockup } from "@/components/shell/Lockup";

/** The rehearsal's cues, from the stand-in's log (the old landing page's rehearsal log). Example data. */
export const CUES: [string, string][] = [
  ["Business name", "filled"],
  ["Name check", "passed"],
  ["Registered agent", "filled"],
  ["Members and signatures", "filled"],
  ["Review page", "matched the proof"],
  ["Payment: $103.50", "matches the proof"],
  ["Pay Now", "held, on purpose"],
];

/**
 * The run sheet (merged spec 4.4, art direction L7, Home 7): a page of CoFile's filing desk with Harbor & Pine as the
 * account, printed like a programme. The head, "test details", the rehearsal's dashed rule, then seven cues set with
 * dot leaders. Every cue is set the same: nothing singles out "Pay Now". White paper in either mode.
 * The ghost light's pool (the site's one gradient) lies on a layer clipped to the sheet.
 */
export function RunSheet({ name }: { name: string }) {
  return (
    <div className="rs2 sheet">
      <div className="rs2-top">
        <span aria-hidden="true"><Lockup height={20} name={name} /></span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <span className="rs2-account"><img src="/cofile/example-firm/harbor-pine-symbol.svg" width={24} height={24} alt="" />Harbor &amp; Pine CPA</span>
      </div>
      <div className="rs2-rule" aria-hidden="true" />
      <p className="rs2-head"><Glyph kind="ghost" /><span>Rehearsal · New Jersey LLC formation</span></p>
      <p className="rs2-test">test details</p>
      <div className="rs2-dash" aria-hidden="true" />
      <ol className="rs2-cues">
        {CUES.map(([step, result], i) => (
          <li key={step} className="rs2-cue" style={{ "--i": i } as CSSProperties}>
            <span className="rs2-step">{step}</span>
            <span className="rs2-leader" aria-hidden="true" />
            <span className="rs2-result">{result}</span>
          </li>
        ))}
      </ol>
      <span className="rs2-pool" aria-hidden="true" />
    </div>
  );
}
