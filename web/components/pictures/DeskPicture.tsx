import { Chip, StageDots, type ChipTone } from "@/components/ui/Chip";
import { DeskHead, DeskRule } from "./DeskParts";
import { HarborPineSymbol } from "./examples";

/** D4's desk: four of Harbor & Pine's clients' filings, who sent each and where each is up to (the stand-in's words). */
const ROWS: { biz: string; filing: string; by?: string; tone: ChipTone; chip: string; status: string }[] = [
  { biz: "Two Sisters Bakery LLC", filing: "New Jersey LLC formation", by: "Ana Ortiz", tone: "turn", chip: "Proof ready to approve", status: "awaiting_approval" },
  { biz: "Hudson Ledger LLC", filing: "New York LLC formation", tone: "done", chip: "Filed", status: "completed" },
  { biz: "Hudson Ledger LLC", filing: "EIN", tone: "done", chip: "Filed, IRS letter saved", status: "completed" },
  { biz: "Orchard Lane Inc.", filing: "Payroll registration (NJ-REG)", tone: "inhand", chip: "Submitted", status: "submitted" },
];

export const DESK_LABEL = "Example · test details · not a real firm";
const ROW_HINT = "Goes to the sample proof below";

/**
 * The homepage shows the waiting proof and the most recent completed filing.
 * For Firms shows the wider desk with the navigation and every sample filing.
 */
function DeskSheet({ variant }: { variant: "hero" | "full" }) {
  const hero = variant === "hero";
  const nav = ["Filings", "New filing", "Ready to pay", "Client links", "Signatures", "Setup", "Billing"];
  const rows = hero ? ROWS.slice(0, 2) : ROWS;
  return (
    <div className={["pdesk", "sheet", `is-${variant}`].join(" ")}>
      <div className="pdesk-chrome"><DeskHead lockup={hero ? 24 : 28} /></div>
      <DeskRule />
      {hero ? null : <div className="pdesk-nav" aria-hidden="true">{nav.map((n, i) => <span key={n} className={i === 0 ? "is-current" : undefined}>{n}</span>)}</div>}
      <div className="pdesk-body">
        <div className="pdesk-top">
          <p className="pdesk-title">Client filings</p>
          {hero ? null : <span className="btn2 is-action is-medium is-picture" aria-hidden="true">New filing</span>}
        </div>
        <table className="pdesk-ledger">
          <thead><tr><th scope="col">Filing</th><th scope="col">Sent by</th>{hero ? null : <th scope="col">Type</th>}<th scope="col">Status</th></tr></thead>
          <tbody>
            {rows.map((r, i) => {
              const turn = i === 0;
              return (
                <tr key={r.biz + r.filing} className={turn ? "is-turn" : undefined}>
                  <th scope="row" className="pdesk-name">
                    {turn && hero ? <a href="#proof" aria-describedby="pdesk-hint">{r.biz}</a> : <span className="pdesk-biz">{r.biz}</span>}
                    {hero ? <span className="pdesk-filing">{r.filing}</span> : null}
                    {turn && hero ? <><span id="pdesk-hint" className="sr-only">{ROW_HINT}</span><span className="pdesk-chev" aria-hidden="true" /></> : null}
                  </th>
                  <td className="pdesk-by">
                    {r.by ? <span className="pdesk-who">{r.by}<Chip tone="quiet" compact>Your client</Chip></span> : <span className="pdesk-team">Your team</span>}
                  </td>
                  {hero ? null : <td className="pdesk-type">{r.filing}</td>}
                  <td className="pdesk-status">
                    <Chip tone={r.tone}>{r.chip}</Chip>
                    <span className="pdesk-track"><StageDots status={r.status} /></span>
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

export function HeroDesk() {
  return (
    <figure className="pic pic-hero" id="hero-desk" aria-label="An example firm's filing desk and client intake">
      <div className="phero">
        <DeskSheet variant="hero" />
        <div className="phero-client sheet">
          <HarborPineSymbol size={28} />
          <div>
            <p className="phero-client-firm">Harbor &amp; Pine CPA</p>
            <p className="phero-client-title">Start your New Jersey LLC</p>
          </div>
          <span className="phero-client-label">Client intake</span>
        </div>
      </div>
      <figcaption className="pic-cap"><span className="pic-label">Example with test details</span></figcaption>
    </figure>
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
