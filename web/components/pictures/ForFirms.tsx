import "@/styles/components/pictures.css";
import { DraftSheet } from "./TextToDraft";
import { Photo } from "./Photo";

/** Stand-in words (COPY-NEEDED, D7, 7.11): alt text for C8 and C11, and the saved agent picture's accessible name. */
const OWNER_ALT = "A firm owner reading a proof on her laptop";
const ENGRAVER_ALT = "An engraver polishing a brass plate engraved Harbor & Pine CPA";
const AGENT_NAME = "The saved registered agent and answers on an example draft";

/**
 * The saved agent (L12; merged spec 10A.2.4): the firm owner at her desk (C8) and a detail plate of the draft laid over
 * its lower left, the desk's two "already filled" rows marked as the desk marks what CoFile filled in. Still.
 */
export function SavedAgent() {
  return (
    <figure className="pic pic-agent" aria-label={AGENT_NAME}>
      <div className="pagent">
        <div className="pagent-photo"><Photo name="c08-approval-mobile" alt={OWNER_ALT} /></div>
        <div className="pagent-plate"><DraftSheet only="saved" /></div>
      </div>
      <figcaption className="pic-cap"><span className="pic-label">Example · test details · not a real firm</span></figcaption>
    </figure>
  );
}

/**
 * For firms' frontispiece (10A.2.1): the engraver at the bench with Harbor & Pine's plate. The owner's package gives
 * the scene as stills (C11), so it stands as a photograph, the film's last frame, with no controls and nothing moving.
 */
export function EngraverStill() {
  return <Photo name="c11-engravers-bench-mobile" alt={ENGRAVER_ALT} className="pfront" eager />;
}
