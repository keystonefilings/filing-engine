import Link from "next/link";
import { PageHead, Shell } from "@/components/landing/Shell";
import { ProofVisual, TextToFormVisual, Tick } from "@/components/landing/Visuals";
import { platformName } from "@/lib/brand";

export function generateMetadata() {
  return {
    title: "How it works",
    description: `Your client asks, you approve the proof, ${platformName()} files it on the official state and IRS websites and brings the papers back.`,
  };
}

export default function HowItWorks() {
  const name = platformName();
  return (
    <Shell nav>
      <main>
        <PageHead kicker="How it works" title={`Your client asks. You approve it. ${name} files it.`}>
          <p className="lede">Three steps. Your client hands the job to you, and you sign off before anything is filed.</p>
        </PageHead>

        <section className="nx-sec band" id="steps">
          <div className="wrap">
            <div className="nx-steps">
              <div><strong>Your client asks.</strong><p>They fill in a short form from your link, or text or email you, and you forward it; or you fill it in yourself. Your saved answers fill in the rest: registered agent, organizer, signer, addresses.</p></div>
              <div><strong>You approve it.</strong><p>You get the proof: one page with your firm&apos;s name at the top, showing every detail and every fee.</p></div>
              <div><strong>{name} files it.</strong><p>It fills in the state&apos;s own website screen by screen, checks the fee again before paying, and brings back the state&apos;s documents. When a filing needs a person, one of the filing professionals who run {name} takes over. You hear about each stage.</p></div>
            </div>
          </div>
        </section>

        <section className="nx-sec band" id="proof">
          <div className="wrap nx-two">
            <div>
              <h2>You see what the state will see, before the state does.</h2>
              <p className="lede">You&apos;ve approved a proof before: business cards, letterhead, an invitation at the printer. Nothing went to press until you said so. The proof does the same for a filing. You get one page with your firm&apos;s name and logo at the top, on your filing desk and by email. Approving it locks in exactly what&apos;s on it. If anything has to change later, it comes back to you to approve again.</p>
              <ul className="nx-list r3-gap">
                <li><Tick /><span>Every name, address and answer, in the order the state asks for them</span></li>
                <li><Tick /><span>Every fee in dollars and cents, from a verified fee table</span></li>
                <li><Tick /><span>Where the state&apos;s website allows it, a picture of the state&apos;s own review page, filled in</span></li>
                <li><Tick /><span>Each statement on the form, and who made it, such as letting the filing company sign or pay</span></li>
                <li><Tick /><span>One button. Until it&apos;s pressed, nothing is submitted and nothing is paid.</span></li>
                <li><Tick /><span>Like reviewing a return before you e-file it: nothing goes to the state until you&apos;ve signed off.</span></li>
              </ul>
            </div>
            <ProofVisual />
          </div>
        </section>

        <section className="nx-sec band" id="requests">
          <div className="wrap nx-two">
            <div>
              <h2>Clients don&apos;t always fill in forms. They text you.</h2>
              <p className="lede">Send the request on as it is, by email, text, WhatsApp or Slack. {name}&apos;s AI reads the message and drafts the filing, and your saved answers fill in the rest. Someone at your firm checks the draft, and you approve it as a proof, like any other filing. A message alone never reaches the state.</p>
            </div>
            <TextToFormVisual />
          </div>
        </section>

        <section className="nx-sec band" id="checks">
          <div className="wrap nx-two">
            <div>
              <h2>Checks before every filing.</h2>
              <p className="lede">A state filing can&apos;t be taken back, so {name} would rather stop and ask than guess.</p>
            </div>
            <ul className="nx-list r3-gap">
              <li><Tick /><span>The fee you approve comes from a verified fee table. {name} reads it again on the state&apos;s payment screen. If the two differ, it stops before paying and tells you why.</span></li>
              <li><Tick /><span>It reads the fine print. By card, New Jersey&apos;s standing certificate costs $52 for an LLC and $27 for a corporation, so {name} checks the business type on the state&apos;s record before it pays.</span></li>
              <li><Tick /><span>If a state has changed its form since {name} last verified it, the filing stops before anything is submitted, and you see what changed.</span></li>
              <li><Tick /><span>A filing is never sent twice on its own. If one is interrupted, a person checks what the state received first.</span></li>
            </ul>
          </div>
        </section>

        <section className="nx-sec band" id="after">
          <div className="wrap nx-two">
            <div>
              <h2>The papers come back to you.</h2>
              <p className="lede">Some states answer at once. Others take their time: New York sends a receipt by email, and in Florida an examiner reviews the filing first. {name} saves what the state sends, passes it on to you and tells you where things stand at each stage.</p>
            </div>
            <ul className="nx-list r3-gap">
              <li><Tick /><span>The state&apos;s documents, saved to the filing and sent to you</span></li>
              <li><Tick /><span>The EIN: {name} applies with the IRS once the name check passes in New York or New Jersey, or after the state accepts the formation (always in Florida, as the IRS advises), and keeps the IRS letter with the filing</span></li>
              <li><Tick /><span>What was approved, what was filed and what the state sent back, in one place</span></li>
            </ul>
          </div>
        </section>

        <section className="nx-close band">
          <div className="wrap">
            <h2>Run one rehearsal. Then decide.</h2>
            <p className="lede">A rehearsal fills in every screen of the state&apos;s real website and stops before the last button. It&apos;s free, and nothing is filed or paid.</p>
            <div className="nx-ctas"><Link className="btn btn-primary" href="/signup">Run a free rehearsal</Link><Link className="btn btn-quiet" href="/faq">Questions</Link></div>
          </div>
        </section>
      </main>
    </Shell>
  );
}
