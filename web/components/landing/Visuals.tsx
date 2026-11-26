import { COVERAGE, PLACES, statusOf } from "@/lib/coverage";

/**
 * Round 3 (Nov 26): the home page's pictures. These are plain, labeled HTML stand-ins for each picture
 * the reviewers asked for; the designer replaces them later. Every name and figure is sample data.
 */

export function Tick() {
  return (
    <svg className="tick" viewBox="0 0 22 22" aria-hidden="true">
      <path d="M5.5 11.5l3.5 3.5 7.5-8" fill="none" stroke="var(--ok)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Chip({ tone, children }: { tone: "live" | "rehearsed" | "plain"; children: React.ReactNode }) {
  return <span className={`nx-chip ${tone === "live" ? "nx-live" : tone === "rehearsed" ? "nx-reh" : "nx-plain"}`}>{children}</span>;
}

/** Hero: an example firm's filing desk, in its own brand. */
export function DeskVisual({ name }: { name: string }) {
  const rows: [string, string, string, "live" | "rehearsed" | "plain"][] = [
    ["Two Sisters Bakery LLC", "New Jersey LLC formation", "Proof ready to approve", "rehearsed"],
    ["Hudson Ledger LLC", "New York LLC formation", "Filed", "live"],
    ["Hudson Ledger LLC", "EIN", "Filed, IRS letter saved", "live"],
    ["Orchard Lane Inc.", "Payroll registration (NJ-REG)", "Submitted", "plain"],
  ];
  return (
    <figure className="nx-proof r3-desk" aria-label="An example firm's filing desk">
      <div className="nx-proof-firm"><span><span className="r3-logo" aria-hidden="true">H&amp;P</span> Harbor &amp; Pine CPA</span><small>Filing desk</small></div>
      <div className="r3-desk-body">
        <div className="r3-desk-head"><strong>Client filings</strong><span className="btn btn-primary nx-fake r3-mini">New filing</span></div>
        <ul className="r3-rows">
          {rows.map(([biz, what, stage, tone]) => (
            <li key={biz + what}><span><b>{biz}</b><small>{what}</small></span><Chip tone={tone}>{stage}</Chip></li>
          ))}
        </ul>
        <p className="r3-with">with {name}</p>
      </div>
      <figcaption>Example · test details · not a real firm</figcaption>
    </figure>
  );
}

/** The same client page under two firms' brands. */
export function TwoFirmsVisual({ name }: { name: string }) {
  const firms = [
    { firm: "Harbor & Pine CPA", cls: "r3-firm-a" },
    { firm: "Northgate Payroll", cls: "r3-firm-b" },
  ];
  return (
    <figure className="r3-two" aria-label="The same client page under two example firms">
      {firms.map((f) => (
        <div key={f.firm} className={`r3-page ${f.cls}`}>
          <div className="r3-page-bar">{f.firm}</div>
          <div className="r3-page-body">
            <strong>Start your New Jersey LLC</strong>
            <span className="r3-field">Business name</span>
            <span className="r3-field">Who owns it</span>
            <span className="r3-btn">Continue</span>
            <small>with {name}</small>
          </div>
        </div>
      ))}
      <figcaption>Two example firms · same page, each in its own brand</figcaption>
    </figure>
  );
}

/** A client's text becomes a drafted filing; saved answers fill in the rest. */
export function TextToFormVisual() {
  const rows: [string, string, "text" | "saved"][] = [
    ["Business name", "TWO SISTERS BAKERY LLC", "text"],
    ["Members", "Ana Ortiz, Lucia Ortiz (50/50)", "text"],
    ["City", "Jersey City, NJ", "text"],
    ["Registered agent", "Your saved agent", "saved"],
    ["Organizer and signer", "Your saved answers", "saved"],
  ];
  return (
    <figure className="r3-text" aria-label="A client's text drafted into a New Jersey LLC formation">
      <div className="nx-bubble">Need an LLC for the bakery. It&apos;s me and my sister, 50/50, in Jersey City.<small>Ana Ortiz · text message · example</small></div>
      <span className="r3-down" aria-hidden="true">&#8595;</span>
      <div className="r3-form">
        <div className="r3-form-head"><strong>Draft: New Jersey LLC formation</strong><span className="nx-chip nx-plain">For your team to check</span></div>
        {rows.map(([k, v, from]) => (
          <div key={k} className="r3-form-row"><span>{k}</span><span className="mono">{v}</span><span className={`r3-from r3-from-${from}`}>{from === "text" ? "from the text" : "already filled"}</span></div>
        ))}
      </div>
    </figure>
  );
}

/** The proof, and the state's payment screen matching it. */
export function ProofVisual() {
  return (
    <figure className="nx-proof" aria-label="A sample proof for an example business">
      <div className="nx-proof-firm"><span>Harbor &amp; Pine CPA</span><small>example firm</small></div>
      <div className="nx-proof-body">
        <div className="nx-proof-head"><h2>Two Sisters Bakery LLC</h2><span className="nx-chip nx-reh">Ready to approve</span></div>
        <div className="nx-num"><span className="nx-callout">1</span><table>
          <tbody>
            <tr><td>Business name</td><td className="mono"><mark>TWO SISTERS BAKERY LLC</mark></td></tr>
            <tr><td>Members</td><td className="mono">Ana Ortiz, Lucia Ortiz (50/50)</td></tr>
            <tr><td>Main business address</td><td className="mono"><mark>88 Grove St, Jersey City NJ 07302</mark></td></tr>
          </tbody>
        </table></div>
        <div className="nx-num"><span className="nx-callout">2</span><table className="nx-fees">
          <tbody>
            <tr><td>Formation filing fee</td><td>$100.00</td></tr>
            <tr><td>NJ portal fee, by card</td><td>$3.50</td></tr>
            <tr className="nx-total"><td>Total to the state</td><td>$103.50</td></tr>
          </tbody>
        </table></div>
        <div className="nx-num"><span className="nx-callout">3</span><div className="nx-statepage">
          <span className="mono nx-small nx-muted">New Jersey&apos;s own review page, filled in</span>
          <div><span>Business Name</span><span className="mono">TWO SISTERS BAKERY</span></div>
          <div><span>Designator</span><span className="mono">LLC</span></div>
        </div></div>
        <div className="nx-num nx-approve"><span className="nx-callout">4</span><span className="btn btn-primary nx-fake">Approve for filing</span></div>
      </div>
      <div className="r3-match"><span>New Jersey payment screen</span><span className="mono">$103.50</span><span className="nx-chip nx-live">Matches the proof</span></div>
      <figcaption>Sample proof · test details · not a real business</figcaption>
    </figure>
  );
}

/** After filing: the record, the state's document and the IRS letter. */
export function PapersVisual() {
  return (
    <figure className="r3-papers" aria-label="A filed record with the state's document and the IRS letter">
      <ol className="r3-stages">
        {["Approved", "Submitted", "Filed"].map((s) => <li key={s}><Tick /><span>{s}</span></li>)}
      </ol>
      <div className="r3-docs">
        <div className="r3-doc"><span className="r3-doc-k">New Jersey</span><strong>Certificate of Formation</strong><span className="mono nx-small">TWO SISTERS BAKERY LLC</span></div>
        <div className="r3-doc"><span className="r3-doc-k">IRS</span><strong>EIN letter (CP 575)</strong><span className="mono nx-small">EIN 00-0000000</span></div>
      </div>
      <figcaption>Example record · sample documents</figcaption>
    </figure>
  );
}

/** Four places, each filing type with where it stands. */
export function StateTiles() {
  return (
    <>
    <div className="r3-tiles">
      {PLACES.map((place) => (
        <div key={place} className="r3-tile">
          <strong>{place}</strong>
          <ul>
            {COVERAGE.filter((c) => c.where === place && c.stage !== "planned").map((c) => {
              const s = statusOf(c);
              return <li key={c.what}><span>{c.short}</span><span className={`r3-dot r3-dot-${s.tone}`} title={s.label} aria-label={s.label} /></li>;
            })}
          </ul>
        </div>
      ))}
    </div>
    <p className="r3-legend nx-small nx-muted">
      <span><span className="r3-dot r3-dot-live" aria-hidden="true" /> Live</span>
      <span><span className="r3-dot r3-dot-rehearsed" aria-hidden="true" /> Rehearsed to the payment screen</span>
      <span><span className="r3-dot r3-dot-plain" aria-hidden="true" /> Screens recorded or offered, rehearsal next</span>
    </p>
    </>
  );
}

/** A rehearsal, stopped on purpose before paying. */
export function RehearsalLog() {
  const log: [string, string, string?][] = [
    ["Business name", "filled"],
    ["Name check", "passed"],
    ["Registered agent", "filled"],
    ["Members and signatures", "filled"],
    ["Review page", "matched the proof"],
    ["Payment: $103.50", "matches the proof"],
    ["Pay Now", "held, on purpose", "held"],
  ];
  return (
    <figure className="r3-log" aria-label="Example rehearsal log">
      <div className="nx-log">
        <div><span>Rehearsal · New Jersey LLC formation</span><span className="nx-muted">test details</span></div>
        {log.map(([what, result, tone]) => <div key={what}><span>{what}</span><span className={tone === "held" ? "nx-held" : undefined}>{result}</span></div>)}
      </div>
      <figcaption className="nx-small nx-muted">Rehearsal · nothing filed, nothing paid</figcaption>
    </figure>
  );
}
