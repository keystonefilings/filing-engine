import Link from "next/link";
import { PageHead, Shell } from "@/components/landing/Shell";
import { platformName, supportEmail } from "@/lib/brand";

export function generateMetadata() {
  return {
    title: "Security",
    description: `How ${platformName()} handles Social Security numbers, cards, state logins, links to the proof and each firm's account.`,
  };
}

export default function Security() {
  const name = platformName();
  return (
    <Shell nav>
      <main>
        <PageHead kicker="Security" title="How we handle what you trust us with.">
          <p className="lede">Social Security numbers, cards and state logins, and how {name} keeps each one.</p>
        </PageHead>

        <section className="nx-sec band" id="security">
          <div className="wrap">
            <div className="sec">
              <div><h3>Encrypted, masked SSNs</h3><p>Social Security numbers are encrypted, masked on proofs, in API responses, in logs and in recorded screens, used only for the filing they belong to, and deleted 30 days after that filing finishes.</p></div>
              <div><h3>Cards in a vault, logins encrypted</h3><p>Saved cards are held by Basis Theory, a card vault, never in our database. When filings are ready to pay, we ask the card&apos;s owner for its security code and keep it for an hour at most. State logins are encrypted as soon as they arrive, kept apart from every other account and read only when a filing runs.</p></div>
              <div><h3>Single-use links to the proof</h3><p>Signed, expiring links, bound to the exact details shown. An optional one-time code adds a second check.</p></div>
              <div><h3>Signatures only on approval</h3><p>A saved signature is applied only to a filing that has been approved.</p></div>
              <div><h3>Separate accounts</h3><p>Logins, jobs, clients and documents are kept per account. One account never sees another&apos;s.</p></div>
            </div>
          </div>
        </section>

        <section className="nx-sec band">
          <div className="wrap">
            <p className="lede">The checks {name} runs on every filing before it pays, such as reading the fee again on the state&apos;s payment screen, are on <Link href="/how-it-works#checks">How it works</Link>. How we use and keep personal information is in our <Link href="/privacy">Privacy Policy</Link>. Security questions: <a href={`mailto:${supportEmail()}`}>{supportEmail()}</a>.</p>
          </div>
        </section>
      </main>
    </Shell>
  );
}
