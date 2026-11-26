import Link from "next/link";
import { Shell } from "@/components/landing/Shell";
import { DeskVisual, PapersVisual, ProofVisual, RehearsalLog, StateTiles, TextToFormVisual, Tick, TwoFirmsVisual } from "@/components/landing/Visuals";
import { platformName, supportEmail } from "@/lib/brand";
import { PRICING, startingPlan, usd } from "@/lib/pricing";

// Round 3 of the persona review (Nov 26): benefits first, far fewer words, pictures carry the page.
// Approved by the owner with public prices, the pages the cut text moved to, the beta banner kept,
// the filing desk as the hero picture, "See pricing" and "ours in small type".

export function generateMetadata() {
  const name = platformName();
  return {
    // absolute: the layout's "%s · name" template doesn't apply to a page in the layout's own segment.
    title: { absolute: `Your client needs an LLC. Say yes, under your own name. | ${name}` },
    description: `${name} files your clients' formations, EINs and payroll registrations on the official New York, New Jersey, Florida and IRS websites, under your firm's name, once you approve. ${usd(PRICING.payAsYouGo.filing)} a filing.`,
  };
}

export default function Home() {
  const name = platformName();
  const from = startingPlan();
  return (
    <Shell nav>
      <main id="top">
        <section className="nx-hero band">
          <div className="wrap nx-hero-grid">
            <div>
              <span className="nx-kicker">For CPA, payroll, fractional CFO and title firms</span>
              <h1>Your client needs an LLC. Say yes, under your own name.</h1>
              <p className="nx-sub">{name} files your clients&apos; formations, EINs and payroll registrations on the official state and IRS websites, once you approve.</p>
              <div className="nx-ctas">
                <Link className="btn btn-primary" href="/signup">Run a free rehearsal</Link>
                <Link className="btn btn-quiet" href="/pricing">See pricing</Link>
              </div>
              <p className="nx-note">Built and run by filing professionals. When a filing needs a person, one of them takes over.</p>
            </div>
            <DeskVisual name={name} />
          </div>
        </section>

        <section className="nx-sec band" id="firms">
          <div className="wrap nx-two">
            <div>
              <h2>Your name on the door. Ours in small type.</h2>
              <p className="lede">Your logo and color on every page your client sees.</p>
              <ul className="nx-list r3-short">
                <li><Tick /><span>A link for each client</span></li>
                <li><Tick /><span>A page for every filing you offer</span></li>
                <li><Tick /><span>A button for your own website</span></li>
                <li><Tick /><span>Your registered agent, or ours</span></li>
              </ul>
              <p className="r3-more"><Link href="/for-firms">For firms</Link></p>
            </div>
            <TwoFirmsVisual name={name} />
          </div>
        </section>

        <section className="nx-sec band" id="requests">
          <div className="wrap nx-two">
            <div>
              <h2>Your client sends a text. Nobody retypes it.</h2>
              <p className="lede">Forward the text, email, WhatsApp or Slack message. AI drafts the filing, your saved answers fill in the rest, and your team checks it.</p>
            </div>
            <TextToFormVisual />
          </div>
        </section>

        <section className="nx-sec band" id="proof">
          <div className="wrap nx-two">
            <div>
              <h2>Nothing is filed or paid until you approve the proof.</h2>
              <p className="lede">One page: every detail, every fee.</p>
              <ul className="nx-list r3-short">
                <li><Tick /><span>The state&apos;s own review page, where possible</span></li>
                <li><Tick /><span>Every fee checked again before paying</span></li>
                <li><Tick /><span>Any later change comes back for approval</span></li>
              </ul>
              <p className="r3-more"><Link href="/how-it-works">How it works</Link></p>
            </div>
            <ProofVisual />
          </div>
        </section>

        <section className="nx-sec band" id="after">
          <div className="wrap nx-two">
            <div>
              <h2>Then it&apos;s filed, and the papers come back to you.</h2>
              <ul className="nx-list r3-short">
                <li><Tick /><span>The state&apos;s documents, saved and sent to you</span></li>
                <li><Tick /><span>{name} applies for the EIN and keeps the IRS letter</span></li>
                <li><Tick /><span>An update at each stage</span></li>
              </ul>
            </div>
            <PapersVisual />
          </div>
        </section>

        <section className="nx-sec band" id="coverage">
          <div className="wrap">
            <h2>The filings your clients already ask you for.</h2>
            <p className="lede">New York, New Jersey, Florida and the IRS. <Link href="/what-we-file">See which are live today</Link></p>
            <StateTiles />
          </div>
        </section>

        <section className="nx-sec band" id="rehearsals">
          <div className="wrap nx-two">
            <div>
              <h2>In beta: rehearse a filing, free.</h2>
              <p className="lede">{name} fills in every screen of the state&apos;s real website and stops before the last button: nothing is filed or paid. Filing types go live one at a time.</p>
            </div>
            <RehearsalLog />
          </div>
        </section>

        <section className="nx-sec band" id="pricing">
          <div className="wrap">
            <h2>{usd(PRICING.payAsYouGo.filing)} a filing. EIN included with a formation.</h2>
            <ul className="r3-prices">
              <li><b>Pay as you go</b><span>per live filing</span></li>
              <li><b>{usd(PRICING.payAsYouGo.ein_only)}</b><span>an EIN on its own</span></li>
              <li><b>{usd(PRICING.payAsYouGo.record)}</b><span>copies and certificates</span></li>
              <li><b>Plans from {usd(from.monthlyUsd)}</b><span>a month for {from.included} filings</span></li>
            </ul>
            <p className="nx-small nx-muted">State fees separate. Rehearsals free. <Link href="/pricing">See all plans</Link></p>
            <p className="nx-small nx-muted r3-secline">Social Security numbers encrypted and deleted 30 days after the filing. Saved cards held in a card vault, never in our database. <Link href="/security">Security</Link></p>
          </div>
        </section>

        <section className="nx-close band">
          <div className="wrap">
            <h2>Run one rehearsal. Then decide.</h2>
            <p className="lede">Try it on a filing you know by heart. Questions? <a href={`mailto:${supportEmail()}`}>{supportEmail()}</a></p>
            <div className="nx-ctas"><Link className="btn btn-primary" href="/signup">Run a free rehearsal</Link></div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
