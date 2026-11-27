import Link from "next/link";
import "@/styles/components/story.css";
import { SiteShell } from "@/components/site/SiteShell";
import { JsMark } from "@/components/marketing/Words";
import { Lines, PageHead } from "@/components/site-pages/PageHead";
import { ExampleFonts } from "@/components/pictures/examples";
import { FullDesk } from "@/components/pictures/DeskPicture";
import { BrandStudio } from "@/components/pictures/BrandStudio";
import { TwoDoors } from "@/components/pictures/TwoDoors";
import { EngraverStill, SavedAgent } from "@/components/pictures/ForFirms";
import { StillPlate } from "@/components/pictures/ClosePlate";
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
    <SiteShell>
      <JsMark />
      <ExampleFonts />
      <div className="st ff">
        <PageHead kicker="For CPA, payroll, fractional CFO and title firms" title={<Lines lines={["Form the business.", "Keep the client."]} />} className="ff-head"
          aside={<div className="ff-front"><EngraverStill /></div>}>
          <p className="t-lede pg2-lede ff-letter">Your client needs an LLC. Who do they call? You. They always have. Until now, saying yes meant someone on staff typing the same agent address into a state website again, or sending the client to an online formation site and getting back a filing you never saw. {name} lets you say yes and keep your name on it.</p>
        </PageHead>

        {/* 10A.2.2 The desk, in CoFile's look, and under it the studio: the three pages the firm's clients see, live */}
        <section className="pg2-band is-show" id="desk" aria-labelledby="ff-desk">
          <div className="site2-in">
            <div className="pg2-two st-two">
              <div className="pg2-words">
                <h2 id="ff-desk" className="t-display-m pg2-h2">Your filing desk, in your brand.</h2>
                <ul className="pg2-list st-list">
                  <li>Your filing desk carries your firm&apos;s name, logo and color.</li>
                  <li>Send one client a link, keep a permanent filing page for each filing you offer, or put the filing button on your own website.</li>
                  <li>Your client sees your firm on the form and in every email. The only sign of us is a small &ldquo;with {name}&rdquo;.</li>
                  <li>Your saved answers (registered agent, organizer, signer, addresses) fill in every filing, so nobody types them twice.</li>
                  <li>{name} is built and run by filing professionals. When a filing needs a person, one of them takes over.</li>
                </ul>
              </div>
              <div className="pg2-pic st-bleed-right ff-desk-pic"><FullDesk /></div>
            </div>
            <div className="ff-studio"><BrandStudio /></div>
          </div>
        </section>

        {/* 10A.2.3 The doors: the home page's signature picture, resting with the handle parked on the left page */}
        <section className="pg2-band is-show" id="brand" aria-labelledby="ff-brand">
          <div className="site2-in pg2-two st-two ff-doors">
            <div className="pg2-words">
              <h2 id="ff-brand" className="ff-door pg2-h2"><span className="t-display-m">Your name on the door.</span> <span className="ff-small t-small-type">Ours in small type.</span></h2>
              <p className="t-lede pg2-band-lede">The same page carries each firm&apos;s own name, logo and color. Your clients never see another firm&apos;s, or a big {name} logo.</p>
            </div>
            <div className="pg2-pic ff-doors-pic"><TwoDoors parked /></div>
          </div>
        </section>

        {/* 10A.2.4 The agent: the owner, her proof and her saved agent, in one picture */}
        <section className="pg2-band is-show" id="agent" aria-labelledby="ff-agent">
          <div className="site2-in pg2-two st-two">
            <div className="pg2-words">
              <h2 id="ff-agent" className="t-display-m pg2-h2">Your registered agent, or ours.</h2>
              <p className="t-lede pg2-band-lede">Name your own registered agent in each state, or use ours, provided through Registered Agents, Inc. Either way it&apos;s filled in on every filing.</p>
              <ul className="pg2-list st-list">
                <li>You approve every filing before it goes to the state. <Link href="/how-it-works">How it works</Link></li>
                <li>{name} saves the state&apos;s documents and the IRS letter and sends them to you.</li>
                <li>Pay per filing or by plan. <Link href="/pricing">Pricing</Link></li>
              </ul>
            </div>
            <div className="pg2-pic st-bleed-right"><SavedAgent /></div>
          </div>
        </section>

        {/* 10A.2.6 The close, the one with a picture: the blank plate, with the name typed at the Close or in the studio engraved */}
        <section className="pg2-band pg2-close ff-close" aria-labelledby="ff-close">
          <div className="site2-in ff-close-in">
            <div className="ff-close-words">
              <h2 id="ff-close" className="t-display-l pg2-close-h2">Open your firm&apos;s filing desk.</h2>
              <p className="t-lede pg2-close-lede">Add your logo and color, then rehearse a real filing on the state&apos;s own website. It&apos;s free, and nothing is filed or paid.</p>
              <div className="pg2-close-ctas"><Link className="btn2 is-action" href="/signup" data-brass-cta="">Run a free rehearsal</Link></div>
            </div>
            <div className="ff-close-aside"><StillPlate /></div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
