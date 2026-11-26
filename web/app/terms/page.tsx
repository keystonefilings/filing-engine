import { LegalPage } from "@/components/legal/LegalPage";
import { platformName, supportEmail } from "@/lib/brand";

export const metadata = { title: "Terms of Service", description: "The terms for using CoFile to prepare and submit state business filings and IRS EIN applications." };

export default function TermsPage() {
  const name = platformName();
  const email = supportEmail();
  const mail = <a href={`mailto:${email}`}>{email}</a>;
  return (
    <LegalPage title="Terms of Service" effective="November 26, 2026" other="privacy">
      <p>These terms govern your use of {name}: the website, the portals and dashboards, the API and the messages we exchange with you. By creating an account, sending a filing or using the API, you agree to them. If you use {name} for a company, you agree for that company and confirm you may do so.</p>

      <h2>1. What {name} does</h2>
      <p>{name} is software that fills in and submits business filings on government websites at your direction: for example LLC and corporation formations, employer registrations, certificates and copies with state agencies, and EIN applications with the IRS. It prepares each filing from the details you or your client give, shows them for approval, and submits only what was approved. Practice filings go through the government site and stop before submitting; nothing is filed or paid.</p>

      <h2>2. What {name} is not</h2>
      <p><strong>{name} is not a law firm or an accounting firm and does not give legal, tax or accounting advice.</strong> Using {name} creates no attorney-client or other professional relationship. Help text on our pages explains what a government form asks; it isn&apos;t advice about your situation. <strong>{name} is not a government agency</strong> and is not affiliated with or endorsed by any state, the IRS or any other agency. Each agency decides whether to accept a filing, and its own rules, fees and processing times apply.</p>

      <h2>3. Accounts</h2>
      <p>Keep your account details accurate and your password, API keys and connected logins secure. You are responsible for what happens under your account, including what your team members and API keys do. Tell us at once at {mail} if you think your account has been misused.</p>

      <h2>4. Filing for others, approvals and authorizations</h2>
      <p>If you file for clients, you confirm that each client has asked you to file, that you may give us their information, and that the person who approves a filing may approve it for the business. Nothing is submitted until it is approved through the approval link or the API. By approving, the approver confirms the details are correct and authorizes their submission exactly as shown. Some forms ask for authorizations, such as typing a signer&apos;s name, checking an attestation box or paying a fee. Each authorization is shown on the form and the approval page, and &quot;the filing company&quot; in it means the company named there: a firm filing through {name}, or the filing company whose name is on the page. We act on approvals and authorizations as given and don&apos;t check the facts behind them.</p>

      <h2>5. Government sites</h2>
      <p>Government websites change, go offline and keep their own hours. When a site&apos;s pages change, we stop before paying and may ask for a new approval. We don&apos;t promise that a filing will be submitted by a particular time, or accepted.</p>

      <h2>6. Fees</h2>
      <p>State and other government fees are set by each agency. They are shown before approval and paid with the cards or accounts you choose; agencies generally don&apos;t refund them. A card&apos;s security code is asked of the card&apos;s owner when filings are ready to pay and kept for an hour at most. If you buy a subscription, the plan and price shown at checkout apply, and it renews until you cancel it in Billing; cancelling stops renewal at the end of the current period.</p>

      <h2>7. Your information</h2>
      <p>You keep your rights in the information you give us, and you let us use it to provide {name}: to prepare and submit filings, show approvals, send notices and keep records. Our <a href="/privacy">Privacy Policy</a> explains what we collect, how we protect it and how long we keep it.</p>

      <h2>8. Acceptable use</h2>
      <p>Don&apos;t use {name} to file anything false, misleading or without the authority to file it; to impersonate a person or business; to get around a government site&apos;s security or bot checks; to overload our systems; or to break any law. We may refuse or stop a filing we reasonably believe breaks these terms.</p>

      <h2>9. Other services</h2>
      <p>{name} relies on other providers, such as card storage (Basis Theory), payments (Stripe), email (Resend), text messages (Twilio), Slack, hosted browsers and AI that reads requests sent to us. Their own terms apply to their services. We aren&apos;t responsible for government sites or for services we don&apos;t control.</p>

      <h2>10. Changes and availability</h2>
      <p>We improve {name} continually and may change or stop features. We may change these terms; when the change matters, we&apos;ll tell you by email or in the product before it takes effect. Using {name} after that means you accept the new terms.</p>

      <h2>11. Disclaimers</h2>
      <p>{name} is provided &quot;as is&quot;. To the extent the law allows, we disclaim all implied warranties, including merchantability, fitness for a particular purpose and non-infringement, and we don&apos;t promise that {name} will be uninterrupted or error-free or that an agency will accept a filing.</p>

      <h2>12. Limitation of liability</h2>
      <p>To the extent the law allows, we aren&apos;t liable for indirect, incidental, special, consequential or punitive damages, or for lost profits, revenue or data. Our total liability for any claim about {name} is limited to the greater of the amount you paid us in the 12 months before the claim and $100. Government fees paid to an agency aren&apos;t amounts paid to us.</p>

      <h2>13. Indemnity</h2>
      <p>You will defend and indemnify us against claims that arise from information you or your clients give us, from filings you or they approve, or from your breach of these terms.</p>

      <h2>14. Ending your account</h2>
      <p>You may stop using {name} and ask us to close your account at any time. We may suspend or close an account that breaks these terms or puts others at risk. Sections 2, 6, 7 and 11 to 15 continue after an account ends.</p>

      <h2>15. Law and disputes</h2>
      <p>The laws of the State of New York govern these terms, without regard to conflict-of-law rules. Disputes go to the state and federal courts in New York County, New York, and you and we consent to their jurisdiction.</p>

      <h2>16. Contact</h2>
      <p>Questions about these terms: {mail}.</p>
    </LegalPage>
  );
}
