import Link from "next/link";
import { PageHead, Shell } from "@/components/landing/Shell";
import { Tick } from "@/components/landing/Visuals";
import { InquiryForm } from "@/components/AuthForms";
import { sendInquiry } from "@/lib/accounts";
import { platformName } from "@/lib/brand";

export function generateMetadata() {
  const name = platformName();
  return {
    title: "For platforms",
    description: `Filing companies, banks and fintechs: offer state filings inside your own product, under your own brand, with ${name} underneath.`,
  };
}

export default function Platforms() {
  const name = platformName();
  return (
    <Shell nav>
      <main>
        <PageHead kicker="For platforms" title={`Building a filing product? Put ${name} underneath it.`}>
          <p className="lede">Filing companies, and platforms that sign up new businesses, can offer state filings inside their own product under their own brand. Tell us what you file and roughly how many, and we&apos;ll set up your account with you.</p>
        </PageHead>

        <section className="nx-sec band" id="enterprise">
          <div className="wrap nx-two">
            <ul className="nx-list r3-gap">
              <li><Tick /><span>An API, with webhooks for each stage</span></li>
              <li><Tick /><span>A white-label setup, with your name and support contact on the proof</span></li>
              <li><Tick /><span>An embeddable widget for your own pages</span></li>
              <li><Tick /><span>Your own state logins, registered agent, signers and defaults</span></li>
              <li><Tick /><span>Start with <code>&quot;dryRun&quot;: true</code>: the run rehearses on the state&apos;s website and stops before the final submit. <Link href="/docs">Read the API docs</Link>.</span></li>
            </ul>
            <InquiryForm action={sendInquiry} />
          </div>
        </section>
      </main>
    </Shell>
  );
}
