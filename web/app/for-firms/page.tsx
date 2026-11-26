import Link from "next/link";
import { PageHead, Shell } from "@/components/landing/Shell";
import { DeskVisual, Tick, TwoFirmsVisual } from "@/components/landing/Visuals";
import { platformName } from "@/lib/brand";

export function generateMetadata() {
  return {
    title: "For firms",
    description: `For CPA, payroll, fractional CFO and title firms: offer your clients business filings under your own name, with ${platformName()} doing the typing.`,
  };
}

export default function ForFirms() {
  const name = platformName();
  return (
    <Shell nav>
      <main>
        <PageHead kicker="For CPA, payroll, fractional CFO and title firms" title="Form the business. Keep the client.">
          <p className="lede">Your client needs an LLC. Who do they call? You. They always have. Until now, saying yes meant someone on staff typing the same agent address into a state website again, or sending the client to an online formation site and getting back a filing you never saw. {name} lets you say yes and keep your name on it.</p>
        </PageHead>

        <section className="nx-sec band" id="desk">
          <div className="wrap nx-two">
            <div>
              <h2>Your filing desk, in your brand.</h2>
              <ul className="nx-list r3-gap">
                <li><Tick /><span>Your filing desk carries your firm&apos;s name, logo and color.</span></li>
                <li><Tick /><span>Send one client a link, keep a permanent filing page for each filing you offer, or put the filing button on your own website.</span></li>
                <li><Tick /><span>Your client sees your firm on the form and in every email. The only sign of us is a small &ldquo;with {name}&rdquo;.</span></li>
                <li><Tick /><span>Your saved answers (registered agent, organizer, signer, addresses) fill in every filing, so nobody types them twice.</span></li>
                <li><Tick /><span>{name} is built and run by filing professionals. When a filing needs a person, one of them takes over.</span></li>
              </ul>
            </div>
            <DeskVisual name={name} />
          </div>
        </section>

        <section className="nx-sec band" id="brand">
          <div className="wrap nx-two">
            <div>
              <h2>Your name on the door. Ours in small type.</h2>
              <p className="lede">The same page carries each firm&apos;s own name, logo and color. Your clients never see another firm&apos;s, or a big {name} logo.</p>
            </div>
            <TwoFirmsVisual name={name} />
          </div>
        </section>

        <section className="nx-sec band" id="agent">
          <div className="wrap nx-two">
            <div>
              <h2>Your registered agent, or ours.</h2>
              <p className="lede">Name your own registered agent in each state, or use ours, provided through Registered Agents, Inc. Either way it&apos;s filled in on every filing.</p>
            </div>
            <ul className="nx-list r3-gap">
              <li><Tick /><span>You approve every filing before it goes to the state. <Link href="/how-it-works">How it works</Link></span></li>
              <li><Tick /><span>{name} saves the state&apos;s documents and the IRS letter and sends them to you.</span></li>
              <li><Tick /><span>Pay per filing or by plan. <Link href="/pricing">Pricing</Link></span></li>
            </ul>
          </div>
        </section>

        <section className="nx-close band">
          <div className="wrap">
            <h2>Open your firm&apos;s filing desk.</h2>
            <p className="lede">Add your logo and color, then rehearse a real filing on the state&apos;s own website. It&apos;s free, and nothing is filed or paid.</p>
            <div className="nx-ctas"><Link className="btn btn-primary" href="/signup">Run a free rehearsal</Link></div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
