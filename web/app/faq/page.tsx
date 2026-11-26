import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHead } from "@/components/site-pages/PageHead";
import { FaqAnchors } from "@/components/site-pages/FaqAnchors";
import { platformName, supportEmail } from "@/lib/brand";
import { PRICING, usd } from "@/lib/pricing";
import "@/styles/components/support-pages.css";

export function generateMetadata() {
  return {
    title: "Questions",
    description: `Answers about ${platformName()}: the beta, rehearsals, the proof, who approves, state fees, the EIN and what it costs.`,
  };
}

export default function Faq() {
  const name = platformName();
  const email = supportEmail();
  const qa: [string, string, React.ReactNode][] = [
    ["beta", "What does “in beta” mean?", <>{name} is in beta. Any filing can run as a free rehearsal on the state&apos;s real website. Filing types go live one at a time, each only after it has been verified on the state&apos;s website. <Link href="/what-we-file">What we file</Link> shows where each one stands.</>],
    ["rehearsal", "What is a rehearsal?", <>The whole filing, performed on the state&apos;s real website with no audience. {name} fills in every screen with your details and stops before the last button. Nothing is filed, nothing is paid, and rehearsals are free. Try one on a filing you know by heart and compare it screen by screen.</>],
    ["approves", "Who approves a filing?", <>You, the firm. Your client hands you the job; {name} sends the proof to you, and nothing is filed or paid until you approve it. If anything has to change later, it comes back to you to approve again.</>],
    ["people", "Is a person involved?", <>Yes. {name} is built and run by filing professionals. Software fills in the state&apos;s website; when a filing needs a person, such as when something unusual comes up or a filing is interrupted, one of them takes over. Every plan includes it.</>],
    ["proof", "What’s on the proof?", <>Every name, address and answer in the order the state asks for them; every fee to the cent; where the state&apos;s website allows it, a picture of the state&apos;s own review page filled in; and each statement on the form and who made it, such as letting the filing company sign or pay. <Link href="/how-it-works#proof">More on the proof</Link>.</>],
    ["texts", "What happens to a forwarded text or email?", <>Forward a client&apos;s email, text, WhatsApp or Slack message as it is. {name}&apos;s AI reads it and drafts the filing, your saved answers fill in the rest, and someone at your firm checks the draft. Then you approve it as a proof, like any other filing. A message alone never reaches the state.</>],
    ["fees", "Are state fees included?", <>No. State fees belong to the state. You see them on the proof, they&apos;re paid with the card or account you choose, and states generally don&apos;t refund them. That&apos;s why {name} checks the fee against a verified fee table and again on the state&apos;s payment screen, and stops if the two differ.</>],
    ["cost", `What does ${name} cost?`, <>{usd(PRICING.payAsYouGo.filing)} a live filing, with the EIN included in a formation, or a plan with filings included each month. Rehearsals are free. <Link href="/pricing">Pricing</Link>.</>],
    ["ein", "When does the EIN get applied for?", <>In New York and New Jersey, once the name check passes. In Florida, only after the state accepts the formation, as the IRS advises. {name} keeps the IRS letter with the filing.</>],
    ["timing", "How long does the state take?", <>It depends on the state. Some answer at once; New York sends a receipt by email, and in Florida an examiner reviews the filing first. {name} saves what the state sends, passes it on to you and tells you where things stand at each stage.</>],
    ["publication", "Does New York need anything after an LLC is formed?", <>Yes. New York requires a new LLC to publish a notice of its formation within 120 days. That&apos;s a separate step with its own costs, and it isn&apos;t part of the filing.</>],
    ["agent", "Who is the registered agent?", <>Yours, if you name one in each state, or ours, provided through Registered Agents, Inc. Ours is priced separately from filings.</>],
    ["law", `Is ${name} a law firm?`, <>No. {name} is not a law firm or a government agency, isn&apos;t affiliated with any state or the IRS, and doesn&apos;t give legal or tax advice. You do the advising. We do the typing.</>],
    ["live", "Which filing types are live for my account?", <>While types are switching on, it can differ by account. Write to <a href={`mailto:${email}?subject=${encodeURIComponent("Which filing types are live for my account?")}`}>{email}</a> and we&apos;ll tell you each one by name.</>],
  ];
  return (
    <SiteShell>
      <PageHead kicker="Questions" title="Questions, answered.">
        <p className="t-lede pg2-lede">Something else? <a href={`mailto:${email}`}>{email}</a></p>
      </PageHead>
      <section className="pg2-band is-support">
        <div className="site2-in">
          <div className="faq2">
            {qa.map(([id, q, a]) => (
              <details key={id} id={id} className="faq2-row">
                <summary><span className="t-display-s faq2-q">{q}</span><span className="faq2-mark" aria-hidden="true" /></summary>
                <div className="faq2-a"><p className="t-body">{a}</p></div>
              </details>
            ))}
          </div>
          <FaqAnchors />
        </div>
      </section>
    </SiteShell>
  );
}
