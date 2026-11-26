import Link from "next/link";
import "@/styles/components/story.css";
import { SiteShell } from "@/components/site/SiteShell";
import { JsMark, PageClose, PageHead } from "@/components/marketing/Words";
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
      <div className="mk ff">
        <PageHead kicker="For CPA, payroll, fractional CFO and title firms" title={["Form the business.", "Keep the client."]} aside={<EngraverStill />}
          lede={<p className="ff-letter">Your client needs an LLC. Who do they call? You. They always have. Until now, saying yes meant someone on staff typing the same agent address into a state website again, or sending the client to an online formation site and getting back a filing you never saw. {name} lets you say yes and keep your name on it.</p>} />

        {/* 10A.2.2 The desk, in CoFile's look, and under it the studio: the three pages the firm's clients see, live */}
        <section className="mk-band" id="desk" aria-labelledby="ff-desk">
          <div className="site2-in">
            <div className="mk-grid">
              <div className="mk-words">
                <h2 id="ff-desk" className="mk-h2">Your filing desk, in your brand.</h2>
                <ul className="mk-list">
                  <li>Your filing desk carries your firm&apos;s name, logo and color.</li>
                  <li>Send one client a link, keep a permanent filing page for each filing you offer, or put the filing button on your own website.</li>
                  <li>Your client sees your firm on the form and in every email. The only sign of us is a small &ldquo;with {name}&rdquo;.</li>
                  <li>Your saved answers (registered agent, organizer, signer, addresses) fill in every filing, so nobody types them twice.</li>
                  <li>{name} is built and run by filing professionals. When a filing needs a person, one of them takes over.</li>
                </ul>
              </div>
              <div className="mk-pic is-bleed-right ff-desk-pic"><FullDesk /></div>
            </div>
            <div className="ff-studio"><BrandStudio /></div>
          </div>
        </section>

        {/* 10A.2.3 The doors: the home page's signature picture, resting with the handle parked on the left page */}
        <section className="mk-band" id="brand" aria-labelledby="ff-brand">
          <div className="site2-in mk-grid is-pic-left ff-doors">
            <div className="mk-words">
              <h2 id="ff-brand" className="ff-door"><span className="mk-h2">Your name on the door.</span> <span className="ff-small t-small-type">Ours in small type.</span></h2>
              <p className="mk-band-lede t-lede">The same page carries each firm&apos;s own name, logo and color. Your clients never see another firm&apos;s, or a big {name} logo.</p>
            </div>
            <div className="mk-pic ff-doors-pic"><TwoDoors parked /></div>
          </div>
        </section>

        {/* 10A.2.4 The agent: the owner, her proof and her saved agent, in one picture */}
        <section className="mk-band" id="agent" aria-labelledby="ff-agent">
          <div className="site2-in mk-grid">
            <div className="mk-words">
              <h2 id="ff-agent" className="mk-h2">Your registered agent, or ours.</h2>
              <p className="mk-band-lede t-lede">Name your own registered agent in each state, or use ours, provided through Registered Agents, Inc. Either way it&apos;s filled in on every filing.</p>
              <ul className="mk-list">
                <li>You approve every filing before it goes to the state. <Link href="/how-it-works">How it works</Link></li>
                <li>{name} saves the state&apos;s documents and the IRS letter and sends them to you.</li>
                <li>Pay per filing or by plan. <Link href="/pricing">Pricing</Link></li>
              </ul>
            </div>
            <div className="mk-pic is-bleed-right"><SavedAgent /></div>
          </div>
        </section>

        <PageClose title={["Open your firm's filing desk."]} aside={<StillPlate />}
          lede={<>Add your logo and color, then rehearse a real filing on the state&apos;s own website. It&apos;s free, and nothing is filed or paid.</>} />
      </div>
    </SiteShell>
  );
}
