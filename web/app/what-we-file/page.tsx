import { SiteShell } from "@/components/site/SiteShell";
import { Lines, PageHead } from "@/components/site-pages/PageHead";
import { PageClose } from "@/components/site-pages/PageClose";
import { CoverageChip } from "@/components/site-pages/CoverageChip";
import { PlateGlyph, plateStage, type PlateStage } from "@/components/site-pages/PlateGlyph";
import { RunSheet } from "@/components/site-pages/RunSheet";
import { PlayOnce } from "@/components/site-pages/PlayOnce";
import { platformName, supportEmail } from "@/lib/brand";
import { COVERAGE, STAGES, statusOf } from "@/lib/coverage";
import { PHOTOS } from "@/lib/photography";
import "@/styles/components/what-we-file.css";

export function generateMetadata() {
  return {
    title: "What we file",
    description: `The filings ${platformName()} handles in New York, New Jersey, Florida and with the IRS, and which are live today.`,
  };
}

/** "Standing certificate (through the API; not on the filing desk yet)" → the name, then its parenthetical in Graphite. */
function splitWhat(what: string): [string, string | null] {
  const m = /^(.*?)\s*(\([^)]*\))$/.exec(what);
  return m ? [m[1]!, m[2]!] : [what, null];
}

/** The road to live, left to right, with the copy's own stage labels (10A.3.3). */
const ROAD: [PlateStage, string][] = [
  ["planned", STAGES.planned],
  ["offered", STAGES.offered],
  ["recorded", STAGES.recorded],
  ["rehearsed", STAGES.rehearsed],
  ["live", "Live"],
];

export default function WhatWeFile() {
  const name = platformName();
  const email = supportEmail();
  const stage = PHOTOS["c07-rehearsal-mobile"];
  return (
    <SiteShell>
      <PageHead
        kicker="What we file"
        className="wwf2-head"
        title={<Lines lines={["New York,", "New Jersey,", "Florida", "and the IRS."]} />}
        aside={<p className="t-lede wwf2-lede">Every filing type carries a plain label, so you always know which ones are live today.</p>}
      />

      <section className="pg2-band is-show" id="coverage">
        <div className="site2-in">
          <table className="cov2" role="table">
            <thead role="rowgroup">
              <tr role="row" className="cov2-row is-head">
                <th role="columnheader" scope="col">Filing</th>
                <th role="columnheader" scope="col">Where</th>
                <th role="columnheader" scope="col">Where it stands</th>
              </tr>
            </thead>
            <tbody role="rowgroup">
              {COVERAGE.map((c) => {
                const [what, aside] = splitWhat(c.what);
                return (
                  <tr role="row" className="cov2-row" key={`${c.what}-${c.where}`}>
                    <td role="cell" className="cov2-what">{what}{aside ? <> <span className="cov2-aside">{aside}</span></> : null}</td>
                    <td role="cell" className="cov2-where">{c.where}</td>
                    <td role="cell" className="cov2-stands"><CoverageChip stage={plateStage(c)} label={statusOf(c).label} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="t-small cov2-note">Rehearsed to the payment screen: {name} completed every screen on the state&apos;s real website with test details and stopped before paying. Screens recorded: the website&apos;s screens are mapped, and a full rehearsal is next. While types are switching on, which ones are live can differ by account. <a href={`mailto:${email}?subject=${encodeURIComponent("Which filing types are live for my account?")}`}>Write to {email}</a> and we&apos;ll tell you each one by name.</p>
        </div>
      </section>

      <section className="pg2-band is-stage" id="live">
        <div className="site2-in">
          <div className="stage2-grid">
            <div className="stage2-words">
              <h2 className="t-display-m pg2-h2">How a filing type goes live.</h2>
              <p className="t-lede pg2-band-lede">Any filing can run as a rehearsal: the whole filing, performed on the state&apos;s real website with no audience. {name} fills in every screen with your details and stops before the last button. Nothing is filed, nothing is paid, and rehearsals are free. Rehearsals are also how each filing type earns its way to live: we switch types on one at a time, each only after it has been verified on the state&apos;s website.</p>
            </div>
            <PlayOnce className="stage2" duration={2400} label="Example rehearsal log" caption="Rehearsal · nothing filed, nothing paid" replayLabel="Play again">
              <div className="stage2-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={stage.src} width={stage.width} height={stage.height} alt="" loading="lazy" decoding="async" />
                <span className="stage2-shade" aria-hidden="true" />
              </div>
              <RunSheet name={name} />
            </PlayOnce>
          </div>
          <ol className="road2" aria-hidden="true">
            {ROAD.map(([s, label]) => (
              <li key={s}><PlateGlyph stage={s} large /><span>{label}</span></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="pg2-band is-show" id="states">
        <div className="site2-in">
          <h2 className="t-display-m pg2-h2">State by state.</h2>
          <div className="states2">
            <div className="states2-card"><h3 className="t-display-m">New York</h3><p className="t-body">New York sends a receipt by email. A new LLC must also publish a notice of its formation within 120 days; that&apos;s a separate step with its own costs, and it isn&apos;t part of the filing. {name} applies for the EIN once the name check passes.</p></div>
            <div className="states2-card"><h3 className="t-display-m">New Jersey</h3><p className="t-body">Filed on the state&apos;s business portal, which adds its own card or e-check fee, shown on the proof. {name} applies for the EIN once the name check passes.</p></div>
            <div className="states2-card"><h3 className="t-display-m">Florida</h3><p className="t-body">Filed on Sunbiz, where an examiner reviews the filing first. As the IRS advises, {name} applies for the EIN only after the state accepts the formation.</p></div>
            <div className="states2-card"><h3 className="t-display-m">IRS</h3><p className="t-body">{name} applies for the EIN and keeps the IRS letter (CP 575) with the filing.</p></div>
          </div>
        </div>
      </section>

      <PageClose title="Rehearse one you know by heart." secondary={{ href: "/pricing", label: "See pricing" }} />
    </SiteShell>
  );
}
