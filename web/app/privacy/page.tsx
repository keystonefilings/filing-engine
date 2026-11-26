import { LegalPage } from "@/components/legal/LegalPage";
import { platformName, supportEmail } from "@/lib/brand";

export const metadata = { title: "Privacy Policy", description: "What CoFile collects to prepare and submit filings, how it is protected and how long it is kept." };

export default function PrivacyPage() {
  const name = platformName();
  const email = supportEmail();
  const mail = <a href={`mailto:${email}`}>{email}</a>;
  return (
    <LegalPage title="Privacy Policy" effective="November 26, 2026" other="terms">
      <p>This policy explains what {name} collects, why, how we protect it and how long we keep it. {name} is not a law firm or a government agency. If a firm files for you through {name}, that firm decides what to file; please also ask it about its own practices.</p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Account details:</strong> names, work emails, phone numbers, the firm&apos;s name, address and branding, and your settings.</li>
        <li><strong>Filing details:</strong> what a government form asks for, such as business names and addresses, owners, members, officers and agents, dates of birth, and Social Security numbers or EINs where a form requires them.</li>
        <li><strong>Signatures and authorizations</strong> a signer adopts or grants, with who granted them and when.</li>
        <li><strong>State portal logins</strong> a firm connects so filings can run in its own accounts.</li>
        <li><strong>Payment details:</strong> saved cards are held by Basis Theory, a card vault, never in our database; we keep only a reference, the brand and the last four digits. Subscriptions are billed through Stripe.</li>
        <li><strong>Requests you send us</strong> by email, Slack, text message or WhatsApp, and the mobile number you confirm for texting.</li>
        <li><strong>Records of each filing:</strong> what was approved, the screens of the government site, the state&apos;s receipts and documents, and the messages we sent.</li>
        <li><strong>Technical data:</strong> logs of requests to our service. We use cookies only to keep you logged in (and, for a few minutes, while you log in with Google), never for advertising or tracking.</li>
      </ul>

      <h2>How we use it</h2>
      <p>To prepare and submit the filings you ask for, show them for approval, pay government fees with the cards you choose, send notices and documents, bill subscriptions, keep the service secure and answer you. We don&apos;t sell personal information or use it for advertising.</p>

      <h2>Sensitive information</h2>
      <ul>
        <li>Social Security numbers are encrypted, masked on proofs, in API responses, in logs and in recorded screens, used only for the filing they belong to, and deleted 30 days after that filing finishes.</li>
        <li>The text of requests sent to us by email, Slack, text or WhatsApp, and what was read from it, is encrypted and deleted after 30 days.</li>
        <li>State logins are encrypted as soon as they arrive, kept apart from every other account and read only when a filing runs.</li>
        <li>A card&apos;s security code is never saved with the card; it is asked of the card&apos;s owner when filings are ready to pay and kept for an hour at most.</li>
      </ul>

      <h2>Who we share it with</h2>
      <ul>
        <li><strong>Government agencies</strong> receive the filings you approve; that is the purpose of the service.</li>
        <li><strong>The firm or filing company you work with</strong> sees the filings it prepares for you.</li>
        <li><strong>Service providers</strong> that run parts of {name} for us, under contracts that limit their use of the data: hosting, database and file storage, hosted browsers that open government sites, Basis Theory (cards), Stripe (subscriptions), Registered Agents, Inc. (the business&apos;s name, state and filing details, when a firm uses our registered agent service), Resend (email), Twilio (texts and WhatsApp), Slack (if your workspace adds {name}), Google (if you log in with Google) and Anthropic (Claude reads requests sent to us by email, Slack, text or WhatsApp to fill in the form).</li>
        <li><strong>Others when the law requires it</strong>, or to protect people, our service or our rights.</li>
      </ul>

      <h2>How long we keep it</h2>
      <p>Account details, filing records and the state&apos;s documents are kept while the account is open, so you have proof of what was filed, and for as long afterwards as the law requires. Social Security numbers and requests sent to us are deleted on the schedule above. Ask us to delete anything else at {mail}; we&apos;ll keep only what the law requires us to.</p>

      <h2>Security</h2>
      <p>Data is encrypted in transit and sensitive fields are encrypted at rest. Access is limited to what each person and service needs. No system is perfectly secure; if a breach affects your information, we&apos;ll tell you as the law requires.</p>

      <h2>Your choices</h2>
      <p>You can see and correct most account details on your filing desk or dashboard. To ask for a copy of your information or for its deletion or correction, email {mail}. If a firm filed for you, we may pass your request to it, because it decides what is filed.</p>

      <h2>Children</h2>
      <p>{name} is for businesses and isn&apos;t meant for anyone under 18.</p>

      <h2>Changes</h2>
      <p>We&apos;ll update this policy as {name} changes, and tell you by email or in the product before a change that matters takes effect.</p>

      <h2>Contact</h2>
      <p>Questions about privacy: {mail}.</p>
    </LegalPage>
  );
}
