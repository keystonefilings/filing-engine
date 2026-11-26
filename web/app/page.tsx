import Link from "next/link";
import { Shell, FolderTab } from "@/components/landing/Shell";
import { InquiryForm } from "@/components/AuthForms";
import { sendInquiry } from "@/lib/accounts";
import { platformName, supportEmail } from "@/lib/brand";
import { liveFilings } from "@/lib/firm";

// Round 2 of the persona review (Nov 26): the merged direction, approved by Yakov with the five
// choices: "rehearsal", "the proof", "your filing desk", free rehearsals and the paper-and-ink look.

export function generateMetadata() {
  const name = platformName();
  return {
    // absolute: the layout's "%s · name" template doesn't apply to a page in the layout's own segment.
    title: { absolute: `You approve the proof. Then ${name} files it.` },
    description: `${name} fills in your clients' LLC and corporation formations, EINs and employer registrations on the official state and IRS websites, with your firm's name on every page your client sees. Nothing is filed until you approve the proof.`,
  };
}

function Tick() {
  return (
    <svg className="tick" viewBox="0 0 22 22" aria-hidden="true">
      <path d="M5.5 11.5l3.5 3.5 7.5-8" fill="none" stroke="var(--ok)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Coverage: where each filing type stands. "Live" comes from the deployment's live switch, per type. */
const STAGES = {
  rehearsed: "Rehearsed to the payment screen",
  recorded: "Screens recorded, rehearsal next",
  offered: "Offered, not yet rehearsed",
  planned: "Planned",
} as const;
const COVERAGE: { what: string; where: string; stage: keyof typeof STAGES; kind?: string }[] = [
  { what: "LLC formation", where: "New Jersey", stage: "rehearsed", kind: "nj-llc" },
  { what: "Standing certificate (through the API; not on the filing desk yet)", where: "New Jersey", stage: "rehearsed" },
  { what: "LLC formation", where: "Florida", stage: "rehearsed", kind: "fl-llc" },
  { what: "Profit corporation formation", where: "Florida", stage: "rehearsed", kind: "fl-corp" },
  { what: "Limited partnership formation", where: "Florida", stage: "rehearsed", kind: "fl-lp" },
  { what: "EIN, with the IRS letter saved", where: "IRS", stage: "recorded", kind: "irs-ein" },
  { what: "Articles of Organization (LLC)", where: "New York", stage: "recorded", kind: "ny-llc" },
  { what: "Certificate of Incorporation (business corporation)", where: "New York", stage: "recorded", kind: "ny-corp" },
  { what: "Employer registration (NYS-100)", where: "New York", stage: "recorded", kind: "ny-nys100" },
  { what: "Employer registration (NJ-REG)", where: "New Jersey", stage: "recorded", kind: "nj-reg" },
  { what: "LLC name change, certificate of change and dissolution", where: "New York", stage: "recorded" },
  { what: "Copies and certificate of status", where: "New York", stage: "recorded", kind: "ny-copies" },
  { what: "Corporation formation (for-profit)", where: "New Jersey", stage: "offered", kind: "nj-corp" },
  { what: "Application for Authority (foreign corporation)", where: "New York", stage: "offered", kind: "ny-authority" },
  { what: "Certificate of Assumed Name (DBA)", where: "New York", stage: "offered", kind: "ny-assumed-name" },
  { what: "Alternate name, charter amendments", where: "New Jersey", stage: "planned" },
];

const LOG: [string, string, string?][] = [
  ["Business name", "filled"],
  ["Name check", "passed"],
  ["Registered agent", "filled"],
  ["Members and signatures", "filled"],
  ["Review page", "matched the proof"],
  ["Payment: $100.00 + $3.50 NJ portal fee", "matches the proof"],
  ["Pay Now", "held, on purpose", "held"],
];

export default function Home() {
  const name = platformName();
  return (
    <Shell nav>
      <main id="top">
        <section className="nx-hero band">
          <div className="wrap nx-hero-grid">
            <div>
              <span className="nx-kicker">For CPA, payroll, fractional CFO and title firms</span>
              <h1>You approve the proof. Then {name} files it.</h1>
              <p className="nx-sub">{name} fills in your clients&apos; LLC and corporation formations, EINs and employer registrations on the official New York, New Jersey, Florida and IRS websites, with your firm&apos;s name and logo on every page your client sees. Your client hands you the job; before anything is filed, you get one page showing every detail, every fee and, where possible, the state&apos;s own review page, filled in.</p>
              <div className="nx-ctas">
                <Link className="btn btn-primary" href="/signup">Run a free rehearsal</Link>
                <a className="btn btn-quiet" href="#proof">See the proof</a>
              </div>
              <p className="nx-note">In beta. A rehearsal fills in every screen of the state&apos;s real website and stops before the last button, so nothing is filed and nothing is paid. You&apos;ll set up your firm&apos;s filing desk first.</p>
            </div>
            <figure className="nx-proof" aria-label="A sample proof for an example business">
              <div className="nx-proof-firm"><span>Harbor &amp; Pine CPA</span><small>example firm</small></div>
              <div className="nx-proof-body">
                <div className="nx-proof-head"><h2>Two Sisters Bakery LLC</h2><span className="nx-chip nx-reh">Rehearsal</span></div>
                <p className="nx-small nx-muted">New Jersey LLC formation. Please approve by Dec 3, 5:00 PM Eastern.</p>
                <div className="nx-num"><span className="nx-callout">1</span><table>
                  <tbody>
                    <tr><td>Business name</td><td className="mono"><mark>TWO SISTERS BAKERY LLC</mark></td></tr>
                    <tr><td>Members</td><td className="mono">Ana Ortiz, Lucia Ortiz (50/50)</td></tr>
                    <tr><td>Main business address</td><td className="mono"><mark>88 Grove St, Jersey City NJ 07302</mark></td></tr>
                  </tbody>
                </table></div>
                <div className="nx-num"><span className="nx-callout">2</span><table className="nx-fees">
                  <tbody>
                    <tr><td>Formation filing fee</td><td>$100.00</td></tr>
                    <tr><td>NJ portal fee, by card</td><td>$3.50</td></tr>
                    <tr className="nx-total"><td>Total to the state</td><td>$103.50</td></tr>
                  </tbody>
                </table></div>
                <div className="nx-num"><span className="nx-callout">3</span><div className="nx-statepage">
                  <span className="mono nx-small nx-muted">New Jersey&apos;s own review page, filled in</span>
                  <div><span>Business Name</span><span className="mono">TWO SISTERS BAKERY</span></div>
                  <div><span>Designator</span><span className="mono">LLC</span></div>
                </div></div>
                <div className="nx-num nx-approve"><span className="nx-callout">4</span><span className="btn btn-primary nx-fake">Approve for filing</span><span className="nx-small nx-muted">Nothing is submitted or paid until you approve.</span></div>
              </div>
              <figcaption>Sample proof · test details · not a real business</figcaption>
            </figure>
          </div>
        </section>

        <section className="nx-sec band" id="process">
          <div className="wrap">
            <h2>Your client asks. You approve it. {name} files it.</h2>
            <p className="lede">Three steps. Your client hands the job to you, and you sign off before anything is filed.</p>
            <div className="nx-steps">
              <div><strong>Your client asks.</strong><p>They fill in a short form from your link, or text or email you, and you forward it; or you fill it in yourself. Your saved answers fill in the rest: registered agent, organizer, signer, addresses.</p></div>
              <div><strong>You approve it.</strong><p>You get the proof: one page with your firm&apos;s name at the top, showing every detail and every fee.</p></div>
              <div><strong>{name} files it.</strong><p>It fills in the state&apos;s own website screen by screen, checks the fee again before paying, and brings back the state&apos;s documents. You hear about each stage.</p></div>
            </div>
          </div>
        </section>

        <section className="nx-sec band" id="proof">
          <div className="wrap nx-two">
            <div>
              <h2>You see what the state will see, before the state does.</h2>
              <p className="lede">You&apos;ve approved a proof before: business cards, letterhead, an invitation at the printer. Nothing went to press until you said so. The proof does the same for a filing. You get one page with your firm&apos;s name and logo at the top, on your filing desk and by email. Approving it locks in exactly what&apos;s on it. If anything has to change later, it comes back to you to approve again.</p>
            </div>
            <ul className="nx-list">
              <li><Tick /><span>Every name, address and answer, in the order the state asks for them</span></li>
              <li><Tick /><span>Every fee in dollars and cents, from a verified fee table</span></li>
              <li><Tick /><span>Where the state&apos;s website allows it, a picture of the state&apos;s own review page, filled in</span></li>
              <li><Tick /><span>Each statement on the form, and who made it, such as letting the filing company sign or pay</span></li>
              <li><Tick /><span>One button. Until it&apos;s pressed, nothing is submitted and nothing is paid.</span></li>
              <li><Tick /><span>Like reviewing a return before you e-file it: nothing goes to the state until you&apos;ve signed off.</span></li>
            </ul>
          </div>
        </section>

        <section className="nx-sec band" id="firms">
          <div className="wrap nx-two">
            <div>
              <h2>Your name on the door. Ours in small print.</h2>
              <p className="lede">Your client needs an LLC. Who do they call? You. They always have. Until now, saying yes meant someone on staff typing the same agent address into a state website again, or sending the client to an online formation site and getting back a filing you never saw. {name} lets you say yes and keep your name on it.</p>
            </div>
            <ul className="nx-list">
              <li><Tick /><span>Your filing desk carries your firm&apos;s name, logo and color.</span></li>
              <li><Tick /><span>Send one client a link, keep a permanent filing page for each filing you offer, or put the filing button on your own website.</span></li>
              <li><Tick /><span>Your client sees your firm on the form and in every email. The only sign of us is a small &ldquo;with {name}&rdquo;.</span></li>
              <li><Tick /><span>Name your own registered agent in each state, or use ours, provided through Registered Agents, Inc.</span></li>
            </ul>
          </div>
        </section>

        <section className="nx-sec band" id="requests">
          <div className="wrap nx-two">
            <div>
              <h2>Clients don&apos;t fill in forms. They text you.</h2>
              <p className="lede">That&apos;s how requests really arrive. Send it on as it is, by email, text, WhatsApp or Slack. {name}&apos;s AI reads the message and drafts the filing, and your saved answers fill in the rest. Someone at your firm checks the draft, and you approve it as a proof, like any other filing. A message alone never reaches the state.</p>
            </div>
            <div className="nx-chat">
              <div className="nx-bubble">Need an LLC for the bakery. It&apos;s me and my sister, 50/50, in Jersey City.<small>Ana Ortiz · text message · example</small></div>
              <span className="nx-arrow mono">&#8627; read into a drafted New Jersey LLC formation for your team to check</span>
            </div>
          </div>
        </section>

        <section className="nx-sec band" id="checks">
          <div className="wrap nx-two">
            <div>
              <h2>Checked twice. Filed once.</h2>
              <p className="lede">A state filing can&apos;t be taken back, so {name} would rather stop and ask than guess.</p>
            </div>
            <ul className="nx-list">
              <li><Tick /><span>The fee you approve comes from a verified fee table. {name} reads it again on the state&apos;s payment screen. If the two differ, it stops before paying and tells you why.</span></li>
              <li><Tick /><span>It reads the fine print. By card, New Jersey&apos;s standing certificate costs $52 for an LLC and $27 for a corporation, so {name} checks the business type on the state&apos;s record before it pays.</span></li>
              <li><Tick /><span>If a state has changed its form since {name} last verified it, the filing stops before anything is submitted, and you see what changed.</span></li>
              <li><Tick /><span>A filing is never sent twice on its own. If one is interrupted, a person checks what the state received first.</span></li>
              <li><Tick /><span>How {name} handles Social Security numbers, cards and state logins: see <a href="#security">Security</a>.</span></li>
            </ul>
          </div>
        </section>

        <section className="nx-sec band" id="after">
          <div className="wrap nx-two">
            <div>
              <h2>The papers come back to you.</h2>
              <p className="lede">Some states answer at once. Others take their time: New York sends a receipt by email, and in Florida an examiner reviews the filing first. {name} saves what the state sends, passes it on to you and tells you where things stand at each stage.</p>
            </div>
            <ul className="nx-list">
              <li><Tick /><span>The state&apos;s documents, saved to the filing and sent to you</span></li>
              <li><Tick /><span>The EIN: {name} applies with the IRS once the name check passes in New York or New Jersey, or after the state accepts the formation (always in Florida, as the IRS advises), and keeps the IRS letter with the filing</span></li>
              <li><Tick /><span>What was approved, what was filed and what the state sent back, in one place</span></li>
            </ul>
          </div>
        </section>

        <section className="nx-sec band" id="rehearsals">
          <div className="wrap nx-two">
            <div>
              <h2>Rehearse on the real stage.</h2>
              <p className="lede">{name} is in beta, and here&apos;s what that means. Any filing can run as a rehearsal: the whole filing, performed on the state&apos;s real website with no audience. {name} fills in every screen with your details and stops before the last button. Nothing is filed, nothing is paid, and rehearsals are free. Rehearsals are also how each filing type earns its way to live: we switch types on one at a time, each only after it has been verified on the state&apos;s website.</p>
              <p className="lede">Try one on a filing you know by heart, and compare it screen by screen.</p>
            </div>
            <div>
              <div className="nx-log" aria-label="Example rehearsal log">
                <div><span>Rehearsal · New Jersey LLC formation</span><span className="nx-muted">test details</span></div>
                {LOG.map(([what, result, tone]) => <div key={what}><span>{what}</span><span className={tone === "held" ? "nx-held" : undefined}>{result}</span></div>)}
              </div>
              <p className="nx-small nx-muted">13 screens of New Jersey&apos;s own LLC form, some grouped here, filled in with test details. Nothing was filed.</p>
            </div>
          </div>
        </section>

        <section className="nx-sec band" id="coverage">
          <div className="wrap">
            <h2>New York, New Jersey, Florida and the IRS.</h2>
            <p className="lede">Every filing type carries a plain label, so you always know which ones are live today.</p>
            <div className="table-wrap">
              <table className="cov">
                <thead><tr><th>Filing</th><th>Where</th><th>Where it stands</th></tr></thead>
                <tbody>
                  {COVERAGE.map((c) => {
                    const live = c.kind ? liveFilings(c.kind) : false;
                    return (
                      <tr key={`${c.what}-${c.where}`}>
                        <td>{c.what}</td><td>{c.where}</td>
                        <td>{live ? <span className="nx-chip nx-live">Live</span> : <span className={`nx-chip ${c.stage === "rehearsed" ? "nx-reh" : "nx-plain"}`}>{STAGES[c.stage]}</span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="nx-small nx-muted">Rehearsed to the payment screen: {name} completed every screen on the state&apos;s real website with test details and stopped before paying. Screens recorded: the website&apos;s screens are mapped, and a full rehearsal is next. While types are switching on, which ones are live can differ by account. <a href={`mailto:${supportEmail()}?subject=${encodeURIComponent("Which filing types are live for my account?")}`}>Write to {supportEmail()}</a> and we&apos;ll tell you each one by name.</p>
          </div>
        </section>

        <section className="nx-sec band" id="catch">
          <div className="wrap">
            <h2>Every filing service has a catch. Here&apos;s ours.</h2>
            <p className="lede">We&apos;d rather tell you now than have you find out later.</p>
            <ol className="nx-catch">
              <li>We&apos;re in beta. Filing types go live one at a time, and until then they run as rehearsals.</li>
              <li>Rehearsals are free. Live filing is paid per filing or by plan, and you see your plan and its price on your Billing page before you&apos;re charged.</li>
              <li>State fees belong to the state. You see them on the proof, they&apos;re paid with the card or account you chose, and states generally don&apos;t refund them. That&apos;s why we check them twice.</li>
              <li>New York requires a new LLC to publish a notice of its formation within 120 days. That&apos;s a separate step with its own costs, and it isn&apos;t part of the filing.</li>
              <li>We&apos;re not a law firm or a government agency, and we don&apos;t give legal or tax advice. You do the advising. We do the typing.</li>
            </ol>
          </div>
        </section>

        <section className="nx-sec band" id="security">
          <div className="wrap">
            <h2>Security</h2>
            <div className="sec">
              <div><h3>Encrypted, masked SSNs</h3><p>Social Security numbers are encrypted, masked on proofs, in API responses, in logs and in recorded screens, used only for the filing they belong to, and deleted 30 days after that filing finishes.</p></div>
              <div><h3>Cards in a vault, logins encrypted</h3><p>Saved cards are held by Basis Theory, a card vault, never in our database. When filings are ready to pay, we ask the card&apos;s owner for its security code and keep it for an hour at most. State logins are encrypted as soon as they arrive, kept apart from every other account and read only when a filing runs.</p></div>
              <div><h3>Single-use links to the proof</h3><p>Signed, expiring links, bound to the exact details shown. An optional one-time code adds a second check.</p></div>
              <div><h3>Signatures only on approval</h3><p>A saved signature is applied only to a filing the client has approved.</p></div>
              <div><h3>Separate accounts</h3><p>Logins, jobs, clients and documents are kept per account. One account never sees another&apos;s.</p></div>
            </div>
          </div>
        </section>

        <section className="nx-sec band" id="enterprise">
          <div className="wrap nx-two">
            <div>
              <h2>Building a filing product? Put {name} underneath it.</h2>
              <p className="lede">Filing companies, and platforms that sign up new businesses, can offer state filings inside their own product under their own brand. Tell us what you file and roughly how many, and we&apos;ll set up your account with you.</p>
              <ul className="nx-list">
                <li><Tick /><span>An API, with webhooks for each stage</span></li>
                <li><Tick /><span>A white-label setup, with your name and support contact on the proof</span></li>
                <li><Tick /><span>An embeddable widget for your own pages</span></li>
                <li><Tick /><span>Your own state logins, registered agent, signers and defaults</span></li>
                <li><Tick /><span>Start with <code>&quot;dryRun&quot;: true</code>: the run rehearses on the state&apos;s website and stops before the final submit. <Link href="/docs">Read the API docs</Link>.</span></li>
              </ul>
            </div>
            <InquiryForm action={sendInquiry} />
          </div>
        </section>

        <section className="nx-close band">
          <div className="wrap">
            <h2>Run one rehearsal. Then decide.</h2>
            <p className="lede">Open your firm&apos;s filing desk, add your logo, and rehearse a real filing on the state&apos;s own website. It&apos;s free, and nothing is filed. You&apos;ll see the proof you&apos;d approve, and you&apos;ll know whether we&apos;ve earned your name on the door.</p>
            <div className="nx-ctas"><Link className="btn btn-primary" href="/signup">Run a free rehearsal</Link><span className="nx-small nx-muted">Questions first? <a href={`mailto:${supportEmail()}`}>{supportEmail()}</a></span></div>
            <p className="nx-tagline"><FolderTab /> Approve the proof. Then it&apos;s filed.</p>
          </div>
        </section>
      </main>
    </Shell>
  );
}
