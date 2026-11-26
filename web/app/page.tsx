import Link from "next/link";
import "@/styles/components/home.css";
import { SiteShell } from "@/components/site/SiteShell";
import { ArrowLink, JsMark } from "@/components/marketing/Words";
import { ExampleFonts } from "@/components/pictures/examples";
import { HeroDesk } from "@/components/pictures/DeskPicture";
import { TwoDoors } from "@/components/pictures/TwoDoors";
import { TextToDraft } from "@/components/pictures/TextToDraft";
import { PROOF_ID, ProofPicture } from "@/components/pictures/ProofPicture";
import { ProofPoints } from "@/components/pictures/ProofPoints";
import { OrderComesHome } from "@/components/pictures/RecordPicture";
import { CoverageCards } from "@/components/pictures/CoverageCards";
import { RunSheet } from "@/components/pictures/RunSheet";
import { Price, PriceCard } from "@/components/pictures/PriceCard";
import { ClosePlate } from "@/components/pictures/ClosePlate";
import { platformName, supportEmail } from "@/lib/brand";
import { PRICING, usd } from "@/lib/pricing";

// The home page in the merged design (Plate & Proof, merged spec 9.0 to 9.10): nine spreads, each a few words and one
// picture, the pictures telling one story about one example firm. The words are round 3's, unchanged.

export function generateMetadata() {
  const name = platformName();
  return {
    // absolute: the layout's "%s · name" template doesn't apply to a page in the layout's own segment.
    title: { absolute: `Your client needs an LLC. Say yes, under your own name. | ${name}` },
    description: `${name} files your clients' formations, EINs and payroll registrations on the official New York, New Jersey, Florida and IRS websites, under your firm's name, once you approve. ${usd(PRICING.payAsYouGo.filing)} a filing.`,
  };
}

/** Stand-in words (COPY-NEEDED): what each point beside the sample proof outlines, read aloud (9.4, decision 19). */
const HOME_POINTS = [
  { part: "review", text: <>The state&apos;s own review page, where possible</>, describe: "Outlines the state's review page on the sample proof." },
  { part: "fees", text: "Every fee checked again before paying", describe: "Outlines the fees, the total and the payment screen's total on the sample proof." },
  { part: "button", text: "Any later change comes back for approval", describe: "Outlines the Approve for filing button on the sample proof." },
];

export default function Home() {
  const name = platformName();
  const email = supportEmail();
  return (
    <SiteShell>
      <JsMark />
      <ExampleFonts />
      <div className="hm" id="top">
        <section className="hm-hero" aria-labelledby="hm-h1">
          <div className="site2-in">
            <p className="hm-kicker t-kicker">For CPA, payroll, fractional CFO and title firms</p>
            <h1 id="hm-h1" className="hm-h1 t-display-xl"><span>Your client needs an LLC.</span> <span>Say yes, under your own name.</span></h1>
            <div className="hm-hero-grid">
              <div className="hm-hero-words">
                <p className="hm-sub t-lede">{name} files your clients&apos; formations, EINs and payroll registrations on the official state and IRS websites, once you approve.</p>
                <div className="hm-ctas">
                  <Link className="btn2 is-action" href="/signup" data-brass-cta="">Run a free rehearsal</Link>
                  <ArrowLink href="/pricing">See pricing</ArrowLink>
                </div>
                <p className="hm-note t-body">Built and run by filing professionals. When a filing needs a person, one of them takes over.</p>
              </div>
              <div className="hm-hero-pic"><HeroDesk /></div>
            </div>
          </div>
        </section>

        <section className="hm-band" id="firms" aria-labelledby="hm-firms">
          <div className="site2-in hm-grid is-pic-left">
            <div className="hm-words">
              <h2 id="hm-firms" className="hm-door"><span className="t-display-l">Your name on the door.</span> <span className="hm-small t-small-type">Ours in small type.</span></h2>
              <p className="hm-lede t-lede">Your logo and color on every page your client sees.</p>
              <ul className="hm-list t-list">
                <li>A link for each client</li>
                <li>A page for every filing you offer</li>
                <li>A button for your own website</li>
                <li>Your registered agent, or ours</li>
              </ul>
              <p className="hm-more"><ArrowLink href="/for-firms">For firms</ArrowLink></p>
            </div>
            <div className="hm-pic is-bleed-left"><TwoDoors /></div>
          </div>
        </section>

        <section className="hm-band" id="requests" aria-labelledby="hm-requests">
          <div className="site2-in hm-grid">
            <div className="hm-words">
              <h2 id="hm-requests" className="hm-run t-display-l"><span>Your client sends a text.</span> <span>Nobody retypes it.</span></h2>
              <p className="hm-lede t-lede">Forward the text, email, WhatsApp or Slack message. AI drafts the filing, your saved answers fill in the rest, and your team checks it.</p>
            </div>
            <div className="hm-pic is-bleed-right"><TextToDraft /></div>
          </div>
        </section>

        <section className="hm-band hm-quiet" id="proof" aria-labelledby="hm-proof">
          <div className="site2-in hm-grid is-pic-left">
            <div className="hm-words">
              <h2 id="hm-proof" className="t-display-l">Nothing is filed or paid until you approve the proof.</h2>
              <p className="hm-lede t-lede hm-grey">One page: every detail, every fee.</p>
              <ProofPoints proofId={PROOF_ID} points={HOME_POINTS} className="hm-list t-list" />
              <p className="hm-more"><ArrowLink href="/how-it-works">How it works</ArrowLink></p>
            </div>
            <div className="hm-pic hm-proof-pic"><ProofPicture /></div>
          </div>
        </section>

        <section className="hm-band" id="after" aria-labelledby="hm-after">
          <div className="site2-in hm-grid">
            <div className="hm-words">
              <h2 id="hm-after" className="t-display-l">Then it&apos;s filed, and the papers come back to you.</h2>
              <ul className="hm-list t-list hm-list-after">
                <li>The state&apos;s documents, saved and sent to you</li>
                <li>{name} applies for the EIN and keeps the IRS letter</li>
                <li>An update at each stage</li>
              </ul>
            </div>
            <div className="hm-pic is-bleed-right"><OrderComesHome /></div>
          </div>
        </section>

        <section className="hm-band" id="coverage" aria-labelledby="hm-coverage">
          <div className="site2-in">
            <h2 id="hm-coverage" className="hm-wide t-display-l">The filings your clients already ask you for.</h2>
            <p className="hm-lede t-lede hm-wide">New York, New Jersey, Florida and the IRS. <Link href="/what-we-file">See which are live today</Link></p>
            <div className="hm-cards"><CoverageCards /></div>
          </div>
        </section>

        <section className="hm-band hm-stage" id="rehearsals" aria-labelledby="hm-rehearsals">
          <div className="site2-in hm-grid">
            <div className="hm-words">
              <h2 id="hm-rehearsals" className="hm-colon t-display-l"><span>In beta:</span> rehearse a filing, free.</h2>
              <p className="hm-lede t-lede">{name} fills in every screen of the state&apos;s real website and stops before the last button: nothing is filed or paid. Filing types go live one at a time.</p>
            </div>
            <div className="hm-pic is-bleed-right"><RunSheet /></div>
          </div>
        </section>

        <section className="hm-band hm-pricing" id="pricing" aria-labelledby="hm-pricing">
          <div className="site2-in">
            <h2 id="hm-pricing" className="hm-price-h">
              <span className="hm-price-1"><Price amount={usd(PRICING.payAsYouGo.filing)} hang className="hm-45" /> <span className="t-display-l">a filing.</span></span>{" "}
              <span className="hm-price-2 t-display-l">EIN included with a formation.</span>
            </h2>
            <div className="hm-card"><PriceCard /></div>
            <p className="hm-fine">State fees separate. Rehearsals free. <Link href="/pricing">See all plans</Link></p>
            <p className="hm-fine hm-security">Social Security numbers encrypted and deleted 30 days after the filing. Saved cards held in a card vault, never in our database. <Link href="/security">Security</Link></p>
          </div>
        </section>

        <ClosePlate>
          <h2 className="hm-close-h t-display-l"><span>Run one rehearsal.</span> <span>Then decide.</span></h2>
          <p className="hm-close-lede t-lede">Try it on a filing you know by heart. Questions? <a href={`mailto:${email}`}>{email}</a></p>
        </ClosePlate>
      </div>
    </SiteShell>
  );
}
