import type { CSSProperties } from "react";
import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHead } from "@/components/site-pages/PageHead";
import { PageClose } from "@/components/site-pages/PageClose";
import { platformName } from "@/lib/brand";
import { PRICING, usd } from "@/lib/pricing";
import "@/styles/components/pricing.css";

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

/** A price as the price card sets it: the "$" small, raised to cap height and hung; the figure in Miller (5.4). */
function Figure({ n, className }: { n: number; className: string }) {
  return <span className={className}><span className="pr2-d">$</span>{usd(n).slice(1)}</span>;
}

/** "Half a filing", "a third of a filing", seen rather than computed (10A.4.3). */
function Units({ share }: { share: number }) {
  return <span className="pr2-units" style={{ "--share": share } as CSSProperties} aria-hidden="true" />;
}

export default function Pricing() {
  const name = platformName();
  const { payAsYouGo: pay, plans, annualMonthsFree, units } = PRICING;
  return (
    <SiteShell>
      <PageHead
        kicker="Pricing for firms"
        className="pr2-head"
        title={<><span className="pr2-first"><Figure n={pay.filing} className="pr2-xl" /> a filing.</span> <span className="pg2-line">EIN included with a formation.</span></>}
      >
        <p className="t-lede pg2-lede">Pay for each live filing, or take a plan with filings included every month. Every plan is backed by filing professionals, and rehearsals are always free.</p>
      </PageHead>

      <section className="pg2-band is-show" id="plans">
        <div className="site2-in">
          <div className="pr2-card">
            {plans.map((p) => (
              <section key={p.id} className={`pr2-plan${p.id === "growth" ? " is-growth" : ""}`} aria-labelledby={`plan-${p.id}`}>
                <h2 className="t-display-s pr2-name" id={`plan-${p.id}`}>{p.name}</h2>
                {p.monthlyUsd === 0 ? (
                  <>
                    <p className="pr2-price"><Figure n={pay.filing} className="pr2-fig" /><span className="pr2-per"> a filing</span></p>
                    <p className="t-small pr2-annual">No monthly fee. Pay only for live filings.</p>
                  </>
                ) : (
                  <>
                    <p className="pr2-price"><Figure n={p.monthlyUsd} className="pr2-fig" /><span className="pr2-per"> a month</span></p>
                    <p className="t-small pr2-annual">{p.annualUsd ? `or ${usd(p.annualUsd)} a year (${annualMonthsFree} months free)` : null}</p>
                  </>
                )}
                <ul className="pg2-list pr2-list">
                  {p.monthlyUsd === 0 ? (
                    <>
                      <li>{usd(pay.ein_only)} for an EIN on its own</li>
                      <li>{usd(pay.record)} for copies and certificates</li>
                    </>
                  ) : (
                    <>
                      <li>{p.fairUse ? `Unlimited filings (fair use: ${p.included} a month)` : `${p.included} filings a month`}</li>
                      <li>{usd(p.extraUsd ?? 0)} for each filing past {p.fairUse ? "fair use" : "that"}</li>
                      {p.priorityHelp ? <li>Priority help from a person</li> : null}
                    </>
                  )}
                </ul>
                <p className="pr2-takeover">{TAKEOVER}</p>
              </section>
            ))}
          </div>
          <p className="t-small pr2-note">Prices in US dollars, for partner firms. Building a filing product for many businesses? <Link href="/platforms">Talk to us about platform pricing</Link>.</p>
        </div>
      </section>

      <section className="pg2-band is-show" id="counts">
        <div className="site2-in pg2-two is-top">
          <div className="pg2-words">
            <h2 className="t-display-m pg2-h2">What counts as a filing.</h2>
            <p className="t-lede pg2-band-lede">Only live filings sent to a state or the IRS count. Rehearsals never do.</p>
          </div>
          <ul className="pg2-pic pr2-counts">
            <li><span className="pr2-lead"><span className="pr2-lead-line"><b>One filing:</b></span><Units share={units.filing} /></span> <span className="pr2-def">a formation, a payroll registration, an amendment, a dissolution, an assumed name or an application for authority.</span></li>
            <li><span className="pr2-lead"><span className="pr2-lead-line"><b>Included:</b></span></span> <span className="pr2-def">the EIN that goes with a formation.</span></li>
            <li><span className="pr2-lead"><span className="pr2-lead-line"><b>An EIN on its own:</b></span><Units share={units.ein_only} /></span> <span className="pr2-def">{usd(pay.ein_only)}, or half a filing on a plan.</span></li>
            <li><span className="pr2-lead"><span className="pr2-lead-line"><b>Copies and certificates:</b></span><Units share={units.record} /></span> <span className="pr2-def">{usd(pay.record)}, or a third of a filing on a plan.</span></li>
            <li><span className="pr2-lead"><span className="pr2-lead-line"><b>Unused filings</b></span></span> <span className="pr2-def">roll over to the next month, for one month.</span></li>
          </ul>
        </div>
      </section>

      <section className="pg2-band is-support" id="separate">
        <div className="site2-in pg2-two is-top">
          <div className="pg2-words">
            <h2 className="t-display-m pg2-h2">What&apos;s separate.</h2>
          </div>
          <div className="pg2-pic pr2-slip">
            <ul className="pg2-list is-rule t-body">
              <li><b>State fees</b> belong to the state. You see them on the proof to the cent, they&apos;re paid with the card or account you choose, and states generally don&apos;t refund them.</li>
              <li><b>{name}&apos;s registered agent service,</b> if you use ours instead of your own: {usd(PRICING.registeredAgentAnnualUsd)} a year per business, until you cancel it.</li>
              <li><b>New York&apos;s publication notice</b> for a new LLC, which has its own costs.</li>
              <li>You see your plan and its price on your Billing page before you&apos;re charged. Filings past your plan go on your next invoice.</li>
            </ul>
          </div>
        </div>
      </section>

      <PageClose title="Start with a free rehearsal." lede="Rehearsals run on the state's real website and stop before the last button. They're free and never count toward a plan." />
    </SiteShell>
  );
}
