import Link from "next/link";
import { PageHead, Shell } from "@/components/landing/Shell";
import { RehearsalLog } from "@/components/landing/Visuals";
import { platformName, supportEmail } from "@/lib/brand";
import { COVERAGE, statusOf } from "@/lib/coverage";

export function generateMetadata() {
  return {
    title: "What we file",
    description: `The filings ${platformName()} handles in New York, New Jersey, Florida and with the IRS, and which are live today.`,
  };
}

export default function WhatWeFile() {
  const name = platformName();
  return (
    <Shell nav>
      <main>
        <PageHead kicker="What we file" title="New York, New Jersey, Florida and the IRS.">
          <p className="lede">Every filing type carries a plain label, so you always know which ones are live today.</p>
        </PageHead>

        <section className="nx-sec band" id="coverage">
          <div className="wrap">
            <div className="table-wrap">
              <table className="cov">
                <thead><tr><th>Filing</th><th>Where</th><th>Where it stands</th></tr></thead>
                <tbody>
                  {COVERAGE.map((c) => {
                    const s = statusOf(c);
                    return (
                      <tr key={`${c.what}-${c.where}`}>
                        <td>{c.what}</td><td>{c.where}</td>
                        <td><span className={`nx-chip ${s.tone === "live" ? "nx-live" : s.tone === "rehearsed" ? "nx-reh" : "nx-plain"}`}>{s.label}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="nx-small nx-muted r3-note">Rehearsed to the payment screen: {name} completed every screen on the state&apos;s real website with test details and stopped before paying. Screens recorded: the website&apos;s screens are mapped, and a full rehearsal is next. While types are switching on, which ones are live can differ by account. <a href={`mailto:${supportEmail()}?subject=${encodeURIComponent("Which filing types are live for my account?")}`}>Write to {supportEmail()}</a> and we&apos;ll tell you each one by name.</p>
          </div>
        </section>

        <section className="nx-sec band" id="live">
          <div className="wrap nx-two">
            <div>
              <h2>How a filing type goes live.</h2>
              <p className="lede">Any filing can run as a rehearsal: the whole filing, performed on the state&apos;s real website with no audience. {name} fills in every screen with your details and stops before the last button. Nothing is filed, nothing is paid, and rehearsals are free. Rehearsals are also how each filing type earns its way to live: we switch types on one at a time, each only after it has been verified on the state&apos;s website.</p>
            </div>
            <RehearsalLog />
          </div>
        </section>

        <section className="nx-sec band" id="states">
          <div className="wrap">
            <h2>State by state.</h2>
            <div className="r3-notes">
              <div><h3>New York</h3><p>New York sends a receipt by email. A new LLC must also publish a notice of its formation within 120 days; that&apos;s a separate step with its own costs, and it isn&apos;t part of the filing. {name} applies for the EIN once the name check passes.</p></div>
              <div><h3>New Jersey</h3><p>Filed on the state&apos;s business portal, which adds its own card or e-check fee, shown on the proof. {name} applies for the EIN once the name check passes.</p></div>
              <div><h3>Florida</h3><p>Filed on Sunbiz, where an examiner reviews the filing first. As the IRS advises, {name} applies for the EIN only after the state accepts the formation.</p></div>
              <div><h3>IRS</h3><p>{name} applies for the EIN and keeps the IRS letter (CP 575) with the filing.</p></div>
            </div>
          </div>
        </section>

        <section className="nx-close band">
          <div className="wrap">
            <h2>Rehearse one you know by heart.</h2>
            <div className="nx-ctas"><Link className="btn btn-primary" href="/signup">Run a free rehearsal</Link><Link className="btn btn-quiet" href="/pricing">See pricing</Link></div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
