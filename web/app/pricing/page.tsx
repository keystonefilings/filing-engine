import Link from "next/link";
import { PageHead, Shell } from "@/components/landing/Shell";
import { Tick } from "@/components/landing/Visuals";
import { platformName } from "@/lib/brand";
import { PRICING, usd } from "@/lib/pricing";

// Owner, Nov 26: publish the partner prices on the site. The figures come from lib/pricing.ts, which
// a test keeps equal to config/partner-pricing.json (what the engine charges).

/** Owner, Nov 26: the last line of every plan. */
const TAKEOVER = "A filing professional takes over when a filing needs one";

export function generateMetadata() {
  return {
    title: "Pricing",
    description: `${usd(PRICING.payAsYouGo.filing)} a filing, with the EIN included in a formation, or a monthly plan. State fees separate. Rehearsals are free.`,
  };
}

export default function Pricing() {
  const name = platformName();
  const { payAsYouGo: pay, plans, annualMonthsFree } = PRICING;
  return (
    <Shell nav>
      <main>
        <PageHead kicker="Pricing for firms" title={`${usd(pay.filing)} a filing. EIN included with a formation.`}>
          <p className="lede">Pay for each live filing, or take a plan with filings included every month. Every plan is backed by filing professionals, and rehearsals are always free.</p>
        </PageHead>

        <section className="nx-sec band" id="plans">
          <div className="wrap">
            <div className="r3-plans">
              {plans.map((p) => (
                <div key={p.id} className={`r3-plan${p.id === "growth" ? " r3-plan-mid" : ""}`}>
                  <strong>{p.name}</strong>
                  {p.monthlyUsd === 0 ? (
                    <>
                      <p className="r3-price">{usd(pay.filing)}<span> a filing</span></p>
                      <p className="nx-small nx-muted">No monthly fee. Pay only for live filings.</p>
                    </>
                  ) : (
                    <>
                      <p className="r3-price">{usd(p.monthlyUsd)}<span> a month</span></p>
                      <p className="nx-small nx-muted">{p.annualUsd ? `or ${usd(p.annualUsd)} a year (${annualMonthsFree} months free)` : null}</p>
                    </>
                  )}
                  <ul className="nx-list">
                    {p.monthlyUsd === 0 ? (
                      <>
                        <li><Tick /><span>{usd(pay.ein_only)} for an EIN on its own</span></li>
                        <li><Tick /><span>{usd(pay.record)} for copies and certificates</span></li>
                        <li><Tick /><span>{TAKEOVER}</span></li>
                      </>
                    ) : (
                      <>
                        <li><Tick /><span>{p.fairUse ? `Unlimited filings (fair use: ${p.included} a month)` : `${p.included} filings a month`}</span></li>
                        <li><Tick /><span>{usd(p.extraUsd ?? 0)} for each filing past {p.fairUse ? "fair use" : "that"}</span></li>
                        {p.priorityHelp ? <li><Tick /><span>Priority help from a person</span></li> : null}
                        <li><Tick /><span>{TAKEOVER}</span></li>
                      </>
                    )}
                  </ul>
                </div>
              ))}
            </div>
            <p className="nx-small nx-muted r3-note">Prices in US dollars, for partner firms. Building a filing product for many businesses? <Link href="/platforms">Talk to us about platform pricing</Link>.</p>
          </div>
        </section>

        <section className="nx-sec band" id="counts">
          <div className="wrap nx-two">
            <div>
              <h2>What counts as a filing.</h2>
              <p className="lede">Only live filings sent to a state or the IRS count. Rehearsals never do.</p>
            </div>
            <ul className="nx-list r3-gap">
              <li><Tick /><span><b>One filing:</b> a formation, a payroll registration, an amendment, a dissolution, an assumed name or an application for authority.</span></li>
              <li><Tick /><span><b>Included:</b> the EIN that goes with a formation.</span></li>
              <li><Tick /><span><b>An EIN on its own:</b> {usd(pay.ein_only)}, or half a filing on a plan.</span></li>
              <li><Tick /><span><b>Copies and certificates:</b> {usd(pay.record)}, or a third of a filing on a plan.</span></li>
              <li><Tick /><span><b>Unused filings</b> roll over to the next month, for one month.</span></li>
            </ul>
          </div>
        </section>

        <section className="nx-sec band" id="separate">
          <div className="wrap nx-two">
            <div>
              <h2>What&apos;s separate.</h2>
            </div>
            <ul className="nx-list r3-gap">
              <li><Tick /><span><b>State fees</b> belong to the state. You see them on the proof to the cent, they&apos;re paid with the card or account you choose, and states generally don&apos;t refund them.</span></li>
              <li><Tick /><span><b>{name}&apos;s registered agent service,</b> if you use ours instead of your own.</span></li>
              <li><Tick /><span><b>New York&apos;s publication notice</b> for a new LLC, which has its own costs.</span></li>
              <li><Tick /><span>You see your plan and its price on your Billing page before you&apos;re charged. Filings past your plan go on your next invoice.</span></li>
            </ul>
          </div>
        </section>

        <section className="nx-close band">
          <div className="wrap">
            <h2>Start with a free rehearsal.</h2>
            <p className="lede">Rehearsals run on the state&apos;s real website and stop before the last button. They&apos;re free and never count toward a plan.</p>
            <div className="nx-ctas"><Link className="btn btn-primary" href="/signup">Run a free rehearsal</Link></div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
