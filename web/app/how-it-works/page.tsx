import "@/styles/components/story.css";
import { SiteShell } from "@/components/site/SiteShell";
import { PageClose, PageHead } from "@/components/marketing/Words";
import { Photo } from "@/components/pictures/Photo";
import { PROOF_ID, ProofPicture } from "@/components/pictures/ProofPicture";
import { ProofPoints } from "@/components/pictures/ProofPoints";
import { SlabToDraft } from "@/components/pictures/TextToDraft";
import { PapersHome } from "@/components/pictures/RecordPicture";
import { platformName } from "@/lib/brand";

export function generateMetadata() {
  return {
    title: "How it works",
    description: `Your client asks, you approve the proof, ${platformName()} files it on the official state and IRS websites and brings the papers back.`,
  };
}

/** Stand-in words (COPY-NEEDED, D7): the three step photographs' alt text, the printer's proof's alt text. */
const ALT = {
  ask: "A baker typing a text message on her phone",
  approve: "A firm owner reading a proof on her laptop",
  files: "An envelope addressed to Harbor & Pine CPA on a walnut desk",
  printer: "A printer's proof of letterhead, initialled in pencil",
};

/** Stand-in words (COPY-NEEDED, 10A.1.3): what each point outlines on the sample proof, read aloud. */
const DESCRIBE = {
  details: "Outlines the business's details on the sample proof.",
  fees: "Outlines the fees and the total on the sample proof.",
  review: "Outlines the state's review page on the sample proof.",
  statements: "Outlines the statements on the sample proof.",
  button: "Outlines the Approve for filing button on the sample proof.",
};

export default function HowItWorks() {
  const name = platformName();
  return (
    <SiteShell>
      <div className="mk st">
        <PageHead kicker="How it works" title={["Your client asks.", "You approve it.", `${name} files it.`]}
          lede={<p>Three steps. Your client hands the job to you, and you sign off before anything is filed.</p>} />

        {/* 10A.1.2 The three steps: who does each, on its numeral and photograph; the firm's step on a white sheet */}
        <section className="mk-band st-steps" id="steps">
          <div className="site2-in">
            <ol className="st-steps-list">
              <li className="st-step">
                <span className="st-num" aria-hidden="true">1</span>
                <Photo name="c05-phone-detail" mobile="c05-phone-detail-mobile" alt={ALT.ask} className="st-photo" />
                <h2 className="st-lead t-display-s">Your client asks.</h2>
                <p className="st-body t-body">They fill in a short form from your link, or text or email you, and you forward it; or you fill it in yourself. Your saved answers fill in the rest: registered agent, organizer, signer, addresses.</p>
              </li>
              <li className="st-step sheet">
                <span className="st-num" aria-hidden="true">2</span>
                <Photo name="c08-approval-mobile" mobile="c08-approval" alt={ALT.approve} className="st-photo is-approve" />
                <h2 className="st-lead t-display-s">You approve it.</h2>
                <p className="st-body t-body">You get the proof: one page with your firm&apos;s name at the top, showing every detail and every fee.</p>
              </li>
              <li className="st-step">
                <span className="st-num" aria-hidden="true">3</span>
                <Photo name="c06-papers-returned" alt={ALT.files} className="st-photo is-files" />
                <h2 className="st-lead t-display-s">{name} files it.</h2>
                <p className="st-body t-body">It fills in the state&apos;s own website screen by screen, checks the fee again before paying, and brings back the state&apos;s documents. When a filing needs a person, one of the filing professionals who run {name} takes over. You hear about each stage.</p>
              </li>
            </ol>
          </div>
        </section>

        {/* 10A.1.3 The proof: a letterhead proof from the printer becomes the filing's proof, and the list points at it */}
        <section className="mk-band" id="proof" aria-labelledby="st-proof">
          <div className="site2-in mk-grid is-top">
            <div className="mk-words">
              <h2 id="st-proof" className="mk-h2">You see what the state will see, before the state does.</h2>
              <p className="mk-band-lede t-lede">You&apos;ve approved a proof before: business cards, letterhead, an invitation at the printer. Nothing went to press until you said so. The proof does the same for a filing. You get one page with your firm&apos;s name and logo at the top, on your filing desk and by email. Approving it locks in exactly what&apos;s on it. If anything has to change later, it comes back to you to approve again.</p>
              <Photo name="c09-printers-proof" alt={ALT.printer} className="st-printer" />
              <ProofPoints proofId={PROOF_ID} className="mk-list" points={[
                { part: "details", text: "Every name, address and answer, in the order the state asks for them", describe: DESCRIBE.details },
                { part: "fees", text: "Every fee in dollars and cents, from a verified fee table", describe: DESCRIBE.fees },
                { part: "review", text: <>Where the state&apos;s website allows it, a picture of the state&apos;s own review page, filled in</>, describe: DESCRIBE.review },
                { part: "statements", text: "Each statement on the form, and who made it, such as letting the filing company sign or pay", describe: DESCRIBE.statements },
                { part: "button", text: <>One button. Until it&apos;s pressed, nothing is submitted and nothing is paid.</>, describe: DESCRIBE.button },
              ]} tail={<li className="is-remark">Like reviewing a return before you e-file it: nothing goes to the state until you&apos;ve signed off.</li>} />
            </div>
            <div className="mk-pic is-bleed-right st-proof-pic"><ProofPicture variant="hiw" /></div>
          </div>
        </section>

        {/* 10A.1.4 Requests: the drawn phone slab and the draft, on the left this time */}
        <section className="mk-band" id="requests" aria-labelledby="st-requests">
          <div className="site2-in mk-grid is-pic-left">
            <div className="mk-words">
              <h2 id="st-requests" className="mk-h2">Clients don&apos;t always fill in forms. They text you.</h2>
              <p className="mk-band-lede t-lede">Send the request on as it is, by email, text, WhatsApp or Slack. {name}&apos;s AI reads the message and drafts the filing, and your saved answers fill in the rest. Someone at your firm checks the draft, and you approve it as a proof, like any other filing. A message alone never reaches the state.</p>
            </div>
            <div className="mk-pic is-bleed-left"><SlabToDraft /></div>
          </div>
        </section>

        {/* 10A.1.5 Checks: a support band, reading only */}
        <section className="mk-band is-support" id="checks" aria-labelledby="st-checks">
          <div className="site2-in mk-grid is-top">
            <div className="mk-words st-checks-words">
              <h2 id="st-checks" className="mk-h2">Checks before every filing.</h2>
              <p className="mk-band-lede t-lede">A state filing can&apos;t be taken back, so {name} would rather stop and ask than guess.</p>
            </div>
            <ul className="mk-list is-support st-checks">
              <li>The fee you approve comes from a verified fee table. {name} reads it again on the state&apos;s payment screen. If the two differ, it stops before paying and tells you why.</li>
              <li>It reads the fine print. By card, New Jersey&apos;s standing certificate costs <span className="mk-num">$52</span> for an LLC and <span className="mk-num">$27</span> for a corporation, so {name} checks the business type on the state&apos;s record before it pays.</li>
              <li>If a state has changed its form since {name} last verified it, the filing stops before anything is submitted, and you see what changed.</li>
              <li>A filing is never sent twice on its own. If one is interrupted, a person checks what the state received first.</li>
            </ul>
          </div>
        </section>

        {/* 10A.1.6 After: the papers come home */}
        <section className="mk-band" id="after" aria-labelledby="st-after">
          <div className="site2-in mk-grid">
            <div className="mk-words">
              <h2 id="st-after" className="mk-h2">The papers come back to you.</h2>
              <p className="mk-band-lede t-lede">Some states answer at once. Others take their time: New York sends a receipt by email, and in Florida an examiner reviews the filing first. {name} saves what the state sends, passes it on to you and tells you where things stand at each stage.</p>
              <ul className="mk-list">
                <li>The state&apos;s documents, saved to the filing and sent to you</li>
                <li>The EIN: {name} applies with the IRS once the name check passes in New York or New Jersey, or after the state accepts the formation (always in Florida, as the IRS advises), and keeps the IRS letter with the filing</li>
                <li>What was approved, what was filed and what the state sent back, in one place</li>
              </ul>
            </div>
            <div className="mk-pic is-bleed-right"><PapersHome /></div>
          </div>
        </section>

        <PageClose title={["Run one rehearsal.", "Then decide."]} secondary={{ href: "/faq", label: "Questions" }}
          lede={<>A rehearsal fills in every screen of the state&apos;s real website and stops before the last button. It&apos;s free, and nothing is filed or paid.</>} />
      </div>
    </SiteShell>
  );
}
