import type { CSSProperties } from "react";
import { Chip, StageDots, type ChipTone } from "@/components/ui/Chip";
import { DeskHead, DeskRule } from "./DeskParts";
import { ClientPagePicture } from "./ClientPagePicture";
import { MotionFigure } from "./MotionFigure";
import { prepaintScript } from "./motion";

/** D4's desk: four of Harbor & Pine's clients' filings, who sent each and where each is up to (the stand-in's words). */
const ROWS: { biz: string; filing: string; by?: string; tone: ChipTone; chip: string; status: string }[] = [
  { biz: "Two Sisters Bakery LLC", filing: "New Jersey LLC formation", by: "Ana Ortiz", tone: "turn", chip: "Proof ready to approve", status: "awaiting_approval" },
  { biz: "Hudson Ledger LLC", filing: "New York LLC formation", tone: "done", chip: "Filed", status: "completed" },
  { biz: "Hudson Ledger LLC", filing: "EIN", tone: "done", chip: "Filed, IRS letter saved", status: "completed" },
  { biz: "Orchard Lane Inc.", filing: "Payroll registration (NJ-REG)", tone: "inhand", chip: "Submitted", status: "submitted" },
];

export const DESK_LABEL = "Example · test details · not a real firm";
/** Stand-in words (COPY-NEEDED): where the hero's waiting row goes, and whose page lies in front of the desk. */
const ROW_HINT = "Goes to the sample proof below";
const CLIENT_PAGE_NAME = "The page Harbor & Pine CPA's clients see";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/**
 * The desk sheet (L1; merged spec 9.1, 10A.2.2): CoFile's filing desk in CoFile's look with Harbor & Pine as the account,
 * its Filings ledger with "Sent by" and each filing's five-step track. `hero` draws the home page's crop (three columns,
 * the waiting row a link to the proof below); `full` draws For firms' wider crop (the navigation in full, a Type column,
 * the head on Cotton), still and inert.
 */
function DeskSheet({ variant }: { variant: "hero" | "full" }) {
  const hero = variant === "hero";
  const nav = hero ? ["Filings", "New filing", "Ready to pay", "Client links"] : ["Filings", "New filing", "Ready to pay", "Client links", "Signatures", "Setup", "Billing"];
  return (
    <div className={["pdesk", "sheet", `is-${variant}`].join(" ")}>
      <div className="pdesk-chrome"><DeskHead lockup={28} /></div>
      <DeskRule />
      <div className="pdesk-nav" aria-hidden="true">{nav.map((n, i) => <span key={n} className={i === 0 ? "is-current" : undefined}>{n}</span>)}</div>
      <div className="pdesk-body">
        <div className="pdesk-top">
          <p className="pdesk-title">Client filings</p>
          <span className="btn2 is-action is-medium is-picture" aria-hidden="true">New filing</span>
        </div>
        <table className="pdesk-ledger">
          <thead><tr><th scope="col">Filing</th><th scope="col">Sent by</th>{hero ? null : <th scope="col">Type</th>}<th scope="col">Status</th></tr></thead>
          <tbody>
            {ROWS.map((r, i) => {
              const turn = i === 0;
              const at = 120 + i * 90;
              return (
                <tr key={r.biz + r.filing} className={turn ? "is-turn" : undefined}>
                  <th scope="row" className="pdesk-name">
                    <span className="m-set" style={d(at)}>
                      {turn && hero ? <a href="#proof" aria-describedby="pdesk-hint">{r.biz}</a> : <span className="pdesk-biz">{r.biz}</span>}
                      {hero ? <span className="pdesk-filing">{r.filing}</span> : null}
                    </span>
                    {turn && hero ? <><span id="pdesk-hint" className="sr-only">{ROW_HINT}</span><span className="pdesk-chev m-fade" style={d(760)} aria-hidden="true" /></> : null}
                  </th>
                  <td className="pdesk-by">
                    <span className="m-set" style={d(at)}>
                      {r.by ? <span className="pdesk-who">{r.by}<Chip tone="quiet" compact>Your client</Chip></span> : <span className="pdesk-team">Your team</span>}
                    </span>
                  </td>
                  {hero ? null : <td className="pdesk-type"><span className="m-set" style={d(at)}>{r.filing}</span></td>}
                  <td className="pdesk-status">
                    <span className={turn ? "m-press" : "m-set"} style={d(turn ? 760 : at)}><Chip tone={r.tone}>{r.chip}</Chip></span>
                    <span className={turn ? "pdesk-track is-turn m-fade" : "pdesk-track m-set"} style={d(turn ? 760 : at)}><StageDots status={r.status} /></span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** The hero's picture (9.1): the desk, and the page Harbor & Pine's clients see lying in front of its lower right. M1, 2.2 s. */
export function HeroDesk() {
  return (
    <>
      <MotionFigure pic="L1" id="hero-desk" ms={2200} prepaint replayApart className="pic-hero" ariaLabel="An example firm's filing desk" label={DESK_LABEL}>
        <div className="phero">
          <DeskSheet variant="hero" />
          <ClientPagePicture firm="hp" className="phero-client" label={CLIENT_PAGE_NAME} />
        </div>
      </MotionFigure>
      <script dangerouslySetInnerHTML={{ __html: prepaintScript("hero-desk", "L1") }} />
    </>
  );
}

/** For firms' desk (10A.2.2): the same desk, wider, complete and still. */
export function FullDesk() {
  return (
    <figure className="pic pic-fulldesk" aria-label="An example firm's filing desk">
      <DeskSheet variant="full" />
      <figcaption className="pic-cap"><span className="pic-label">{DESK_LABEL}</span></figcaption>
    </figure>
  );
}
