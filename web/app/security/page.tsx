import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHead } from "@/components/site-pages/PageHead";
import { platformName, supportEmail } from "@/lib/brand";
import "@/styles/components/support-pages.css";

export function generateMetadata() {
  return {
    title: "Security",
    description: `How ${platformName()} handles Social Security numbers, cards, state logins, links to the proof and each firm's account.`,
  };
}

export default function Security() {
  const name = platformName();
  const rows: [string, string][] = [
    ["Encrypted, masked SSNs", "Social Security numbers are encrypted, masked on proofs, in API responses, in logs and in recorded screens, used only for the filing they belong to, and deleted 30 days after that filing finishes."],
    ["Cards in a vault, logins encrypted", "Saved cards are held by Basis Theory, a card vault, never in our database. When filings are ready to pay, we ask the card's owner for its security code and keep it for an hour at most. State logins are encrypted as soon as they arrive, kept apart from every other account and read only when a filing runs."],
    ["Single-use links to the proof", "Signed, expiring links, bound to the exact details shown. An optional one-time code adds a second check."],
    ["Signatures only on approval", "A saved signature is applied only to a filing that has been approved."],
    ["Separate accounts", "Logins, jobs, clients and documents are kept per account. One account never sees another's."],
  ];
  return (
    <SiteShell>
      <PageHead kicker="Security" title="How we handle what you trust us with.">
        <p className="t-lede pg2-lede">Social Security numbers, cards and state logins, and how {name} keeps each one.</p>
      </PageHead>

      <section className="pg2-band is-support" id="security">
        <div className="site2-in">
          <div className="sec2">
            {rows.map(([h, p]) => (
              <div className="sec2-row" key={h}>
                <h3 className="t-display-s sec2-h3">{h}</h3>
                <p className="t-body sec2-p">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pg2-band is-support is-alt">
        <div className="site2-in">
          <p className="t-lede sec2-links">The checks {name} runs on every filing before it pays, such as reading the fee again on the state&apos;s payment screen, are on <Link href="/how-it-works#checks">How it works</Link>. How we use and keep personal information is in our <Link href="/privacy">Privacy Policy</Link>. Security questions: <a href={`mailto:${supportEmail()}`}>{supportEmail()}</a>.</p>
        </div>
      </section>
    </SiteShell>
  );
}
