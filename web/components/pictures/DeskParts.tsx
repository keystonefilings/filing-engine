import "@/styles/components/shell.css";
import "@/styles/components/chip.css";
import "@/styles/components/button.css";
import "@/styles/components/pictures.css";
import { Lockup } from "@/components/shell/Lockup";
import { platformName } from "@/lib/brand";
import { HarborPineSymbol } from "./examples";

/**
 * The head of a page of CoFile's filing desk inside a picture (merged spec 10C.1, 10C.2, 3.5): CoFile's lockup, then
 * Harbor & Pine as the account (its symbol 24 px tall and its name in Founders Grotesk, as content, never in the
 * firm's font or color), and CoFile's 1 px Plate Ink rule under the row. `spread` puts the account label at the row's
 * right end (the record, the run sheet); otherwise it follows the lockup past a Rule divider (the desk, the draft).
 */
export function DeskHead({ lockup = 28, spread, className }: { lockup?: number; spread?: boolean; className?: string }) {
  return (
    <div className={["pdh", spread && "is-spread", className].filter(Boolean).join(" ")}>
      <span className="pdh-lockup" aria-hidden="true"><Lockup height={lockup} name={platformName()} /></span>
      {spread ? null : <span className="pdh-div" aria-hidden="true" />}
      <span className="pdh-acct"><HarborPineSymbol size={24} /><span>Harbor &amp; Pine CPA</span></span>
    </div>
  );
}

/** CoFile's 1 px Plate Ink rule under the desk's head (10C.1). No Firm Rule on CoFile's pages. */
export function DeskRule() {
  return <div className="pdh-rule" aria-hidden="true" />;
}
