import Link from "next/link";
import { Shell } from "@/components/landing/Shell";
import { TraceScan } from "@/components/landing/TraceScan";
import { InquiryForm } from "@/components/AuthForms";
import { sendInquiry } from "@/lib/accounts";
import { platformName } from "@/lib/brand";

// Adapted from the designed page in site/landing.html.

function Tick() {
  return (
    <svg className="tick" viewBox="0 0 22 22" aria-hidden="true">
      <circle cx="11" cy="11" r="10" fill="none" stroke="var(--ok)" strokeWidth="1.5" />
      <path d="M6.5 11.5l3 3 6-6.5" fill="none" stroke="var(--ok)" strokeWidth="1.7" />
    </svg>
  );
}

const TRACE: [string, string, string | undefined, string, string?][] = [
  ["00.0s", "Welcome", undefined, "read"],
  ["02.1s", "Business name", "Type: NJ Domestic Limited Liability Company", "filled"],
  ["04.0s", "Designator", "Name check: available", "passed"],
  ["05.2s", "Business data · purpose · main address", undefined, "filled"],
  ["10.4s", "Registered agent", "Office address, attestation", "filled"],
  ["15.9s", "Members / managers", "1 member added", "filled"],
  ["24.6s", "Signatures", "Signer added, signature box checked", "filled"],
  ["26.0s", "Review", undefined, "matched"],
  ["28.3s", "Payment", "Fee check: $100.00 + $3.50 matches the approval", "verified"],
  ["28.9s", "Pay Now", undefined, "held", "halt"],
];

const COVERAGE: [string, string, "live" | "map" | "", string][] = [
  ["LLC formation", "New Jersey", "live", "Verified on the live site"],
  ["Standing certificate", "New Jersey", "live", "Verified on the live site"],
  ["LLC formation", "Florida", "live", "Verified on the live site"],
  ["Profit corporation formation", "Florida", "live", "Verified on the live site"],
  ["Limited partnership formation", "Florida", "live", "Verified on the live site"],
  ["EIN application, with confirmation letter", "IRS", "map", "Mapped from a live walk"],
  ["Articles of Organization (LLC)", "New York", "map", "Mapped from a live walk"],
  ["Certificate of Incorporation (business corporation)", "New York", "map", "Mapped from a live walk"],
  ["Payroll registration (NYS-100)", "New York", "map", "Mapped from a live walk"],
  ["Name-change amendment", "New York", "", "Planned"],
  ["Alternate name, charter amendments", "New Jersey", "", "Planned"],
  ["Paper filings by upload: certificate of status, assumed name, foreign qualification, dissolution", "New York", "", "Planned"],
];

export default function Home() {
  const name = platformName();
  return (
    <Shell nav>
      <TraceScan />
      <main id="top">
        <section className="hero band">
          <div className="wrap">
            <div className="hero-copy">
              <span className="field-label">For CPA, payroll and CFO firms</span>
              <h1>State filings, done on the government sites. Approved before they leave.</h1>
              <p className="lede">{name} fills formation, EIN and payroll registration filings on the live state and IRS websites, under your brand. It reads every form fresh, checks every fee, and submits nothing until your client approves the exact data.</p>
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/signup">Create a partner account</Link>
                <a className="btn btn-quiet" href="#enterprise">Enterprise and API</a>
              </div>
              <p className="hero-note">Starting with New York, New Jersey, Florida and the IRS.</p>
            </div>

            <figure className="trace" aria-label="Run trace from a dry run on the New Jersey portal" style={{ margin: 0 }}>
              <div className="trace-head">
                <span><strong>NJ · Domestic LLC formation</strong> · njportal.com</span>
                <span className="pill pill-dry">Dry run</span>
              </div>
              <ol>
                {TRACE.map(([t, s, small, out, tone], i) => (
                  <li key={t} className={i === 0 ? "scan" : undefined}>
                    <span className="t">{t}</span>
                    <span className="s">{s}{small ? <small>{small}</small> : null}</span>
                    <span className={tone === "halt" ? "halt" : "ok"}>{out}</span>
                  </li>
                ))}
              </ol>
              <div className="trace-foot">
                <span>13 live screens, test entry, nothing filed.</span>
                <span className="stamp">Stopped before Pay Now</span>
              </div>
            </figure>
          </div>
        </section>

        <div className="principles band">
          <div className="wrap">
            <div className="principle"><b>Approval first</b><span>Your client approves the exact data through a signed link before any run starts.</span></div>
            <div className="principle"><b>Live forms, every run</b><span>Fields are matched by their labels on the page as it is today.</span></div>
            <div className="principle"><b>Stops on change</b><span>A changed form halts the run before submission and proposes the fix.</span></div>
            <div className="principle"><b>Your brand</b><span>Your logo and colors on the pages your clients see.</span></div>
          </div>
        </div>

        <section className="block band" id="start">
          <div className="wrap">
            <div className="section-head">
              <span className="field-label">Two ways in</span>
              <h2>File for your clients yourself, or build it into your own product.</h2>
            </div>
            <div className="paths">
              <article className="path">
                <span className="field-label">Partner firms</span>
                <h3>For CPA, payroll and CFO firms</h3>
                <ul>
                  <li>Create an account, then add your logo and colors.</li>
                  <li>Choose how state fees are paid: one card for everything, or one per filing type, with a backup card.</li>
                  <li>Pick a state and a filing, then fill it in yourself or send your client a link.</li>
                  <li>Your client checks and approves exactly what will be filed.</li>
                </ul>
                <Link className="btn btn-primary" href="/signup">Create a partner account</Link>
              </article>
              <article className="path">
                <span className="field-label">Enterprise</span>
                <h3>For filing companies and platforms</h3>
                <ul>
                  <li>API keys, endpoints, webhooks and full docs.</li>
                  <li>Your own state portal logins, connected securely.</li>
                  <li>Separate payment methods for your subscription and for state fees.</li>
                  <li>Defaults per portal and per filing type.</li>
                </ul>
                <a className="btn btn-quiet" href="#enterprise">Talk to us</a>
              </article>
            </div>
          </div>
        </section>

        <section className="block band alt" id="process">
          <div className="wrap">
            <div className="section-head">
              <span className="field-label">How a filing runs</span>
              <h2>One pass from intake to filed documents.</h2>
              <p className="lede">State sites keep no drafts, so every filing is a single run from the first screen to the last. Everything is checked before it starts.</p>
            </div>
            <div className="steps">
              <div className="step"><h3>Intake</h3><p>You or your client fill in a short form. Your saved answers fill the rest: agent, organizer, signer, addresses.</p></div>
              <div className="step"><h3>Approval</h3><p>The client receives a link with every value and the fees. Approving binds those exact values to the run.</p></div>
              <div className="step"><h3>Pre-flight</h3><p>Site hours, logins, account balance and fee table are checked before a browser opens.</p></div>
              <div className="step"><h3>Run</h3><p>The engine reads each screen live, fills it by label and keeps a screenshot and page copy of every step.</p></div>
              <div className="step"><h3>EIN in the same pass</h3><p>After the name check passes, the EIN is filed and its letter saved, then entered into the state form.</p></div>
              <div className="step"><h3>Filed</h3><p>Documents are stored, and each stage is reported back to you.</p></div>
            </div>
          </div>
        </section>

        <section className="block band" id="controls">
          <div className="wrap">
            <div className="section-head">
              <span className="field-label">Controls</span>
              <h2>Built for filings that cannot be taken back.</h2>
              <p className="lede">A government submission is final. Every control below exists to stop a wrong filing before it happens, and to prove what happened after.</p>
            </div>
            <div className="controls">
              <article className="control">
                <h3>Halts when a state changes a form</h3>
                <p>Each screen is compared with its last approved structure: fields, required marks, options and prices. Any difference stops the run before submission, with the change and a proposed fix for review.</p>
                <div className="exhibit" role="img" aria-label="Example of a detected form change">
                  <div className="exhibit-head"><span>Example · NJ payment screen</span><span>Run halted</span></div>
                  <div className="exhibit-body">
                    <div className="row"><span>First Name *</span><span>unchanged</span></div>
                    <div className="row"><span>Phone Number *</span><span>unchanged</span></div>
                    <div className="row add"><span>+ Daytime Phone *</span><span>new, required</span></div>
                    <div className="row"><span>Outcome</span><span>client re-approval</span></div>
                  </div>
                </div>
              </article>
              <article className="control">
                <h3>Checks the price before paying</h3>
                <p>Fees are quoted at approval from a verified fee table and read again on the payment screen. NJ charges $50 for an LLC standing certificate and $25 for a corporation&apos;s, so the engine also confirms the entity type on the state record.</p>
                <div className="exhibit" role="img" aria-label="Example fee checks">
                  <div className="exhibit-head"><span>NJ standing certificate · by card</span><span>Fee check</span></div>
                  <div className="exhibit-body">
                    <div className="row"><span>LLC record, approved $52.00</span><span className="ok">page $52.00 · match</span></div>
                    <div className="row"><span>Corporation record, approved $27.00</span><span className="ok">page $27.00 · match</span></div>
                    <div className="row"><span>LLC record requested as corporation</span><span className="halt">stopped</span></div>
                  </div>
                </div>
              </article>
              <article className="control">
                <h3>Never submits twice</h3>
                <p>A record is written before the final click. If a machine stops mid-run, that filing is flagged for reconciliation and never re-run on its own.</p>
              </article>
              <article className="control">
                <h3>Shows where every value came from</h3>
                <p>Each filled field records its source: the filing itself, the intake form, your saved answers or your defaults. Every screen of every run keeps a screenshot and a copy of the page.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="block band alt" id="companies">
          <div className="wrap tenancy">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="field-label">For enterprise</span>
              <h2>Your company, your accounts, your customers&apos; rules.</h2>
              <p className="lede">Each enterprise account runs independently. Your customers sign up under your brand and answer the questions you choose to ask them.</p>
              <ul className="checks" style={{ marginTop: 12 }}>
                <li><Tick /><span><b>Your state logins.</b> Kept under your account only, never shared with another account.</span></li>
                <li><Tick /><span><b>Your services on the forms.</b> Your registered agent service, organizer, signer and filer.</span></li>
                <li><Tick /><span><b>Defaults and locks.</b> Set the answer for any customer question, or lock it for all of them.</span></li>
                <li><Tick /><span><b>Your brand.</b> Approval pages carry your name and your support contact.</span></li>
              </ul>
            </div>
            <dl className="levels" aria-label="Who decides what">
              <div className="level"><dt>Your company</dt><dd><b>Accounts and services.</b> State logins, NY draw-down account, registered agent service, people who sign and file, defaults for your customers.</dd></div>
              <div className="level"><dt>Your customer</dt><dd><b>Their rules.</b> Who is the registered agent, who organizes and signs, who approves.</dd></div>
              <div className="level"><dt>The entity</dt><dd><b>The facts.</b> Name, owners, addresses and the responsible party, from your intake.</dd></div>
              <div className="level"><dt>Each filing</dt><dd><b>Final say.</b> A value sent with a filing always overrides a default. A missing answer stops the filing and names the question.</dd></div>
            </dl>
          </div>
        </section>

        <section className="block band" id="coverage">
          <div className="wrap">
            <div className="section-head">
              <span className="field-label">Coverage</span>
              <h2>Where the engine files today, and what is next.</h2>
            </div>
            <div className="table-wrap">
              <table>
                <thead><tr><th scope="col">Filing</th><th scope="col">Where</th><th scope="col">Status</th></tr></thead>
                <tbody>
                  {COVERAGE.map(([f, w, tone, s]) => (
                    <tr key={f + w}><td>{f}</td><td>{w}</td><td><span className={`status${tone ? ` ${tone}` : ""}`}>{s}</span></td></tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="table-note">Verified means the engine completed every screen on the live government site with a test entry and stopped before payment. Each filing type is switched to live submission only after its payment step has been mapped.</p>
          </div>
        </section>

        <section className="block band alt" id="security">
          <div className="wrap">
            <div className="section-head">
              <span className="field-label">Security</span>
              <h2>Sensitive data stays where it belongs.</h2>
            </div>
            <div className="sec">
              <div><h3>Masked SSNs</h3><p>Social Security numbers are masked on approval pages, in API responses and in recorded screens.</p></div>
              <div><h3>Cards and logins in a vault</h3><p>Card numbers and state logins are held by a vault, never in our database, and are read only when a run needs them.</p></div>
              <div><h3>Single-use approval links</h3><p>Signed, expiring links, bound to the exact data shown. An optional one-time code adds a second check.</p></div>
              <div><h3>Signatures only on approval</h3><p>A saved signature is applied only to a filing the client has approved.</p></div>
              <div><h3>Dry-run mode</h3><p>New sites and new accounts can run every screen and stop before submission until they are switched live.</p></div>
              <div><h3>Separate accounts</h3><p>Logins, jobs, clients and documents are kept per account. One account never sees another&apos;s.</p></div>
            </div>
          </div>
        </section>

        <section className="block band brief" id="enterprise">
          <div className="wrap">
            <div className="section-head" style={{ marginBottom: 0 }}>
              <span className="field-label">Enterprise</span>
              <h2>Talk to us about enterprise and the API.</h2>
              <p className="lede">Tell us what you file and how many. We&apos;ll set up your account, your API keys and your state portal connections with you.</p>
              <p className="lede">Filing for your own clients? <Link href="/signup" style={{ color: "inherit" }}>Create a partner account</Link> instead.</p>
            </div>
            <InquiryForm action={sendInquiry} />
          </div>
        </section>
      </main>
    </Shell>
  );
}
