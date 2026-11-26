import type { CSSProperties } from "react";
import { DeskHead, DeskRule } from "./DeskParts";
import { MotionFigure } from "./MotionFigure";
import { Photo } from "./Photo";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

export const RECORD_LABEL = "Example record · sample documents";
const RECORD_NAME = "A filed record with the state's document and the IRS letter";

/** CoFile's own document card (7.3.2, 3.9): the issuer as a word, the paper's name, its value, Rule bars for a body. */
function DocCard({ issuer, title, value, bars, className, style }: { issuer: string; title: string; value: string; bars: number[]; className?: string; style?: CSSProperties }) {
  return (
    <div className={["pdoc", className].filter(Boolean).join(" ")} style={style}>
      <span className="pdoc-issuer">{issuer}</span>
      <span className="pdoc-title">{title}</span>
      <span className="pdoc-value">{value.split(" ").map((w, i) => <span key={i}>{i ? " " : null}<span className="pdoc-word">{w}</span></span>)}</span>
      <span className="pdoc-bars" aria-hidden="true">{bars.map((w, i) => <i key={i} style={{ width: `${w}%` }} />)}</span>
    </div>
  );
}

const CARDS = [
  { issuer: "New Jersey", title: "Certificate of Formation", value: "TWO SISTERS BAKERY LLC", bars: [100, 92, 96, 58] },
  { issuer: "IRS", title: "EIN letter (CP 575)", value: "EIN 00-0000000", bars: [100, 88, 94, 46] },
];

/**
 * The filed record (9.5, 10A.1.6): a page of CoFile's desk with Harbor & Pine as the account, its three stages inked
 * along a hairline ("An update at each stage", drawn rather than written) and the two papers that came back.
 * `stages` and `land` set when each stage presses in and when each card arrives.
 */
function RecordSheet({ stages, cards, land }: { stages: number[]; cards: "fly" | "press"; land: number[] }) {
  return (
    <div className="prec sheet">
      <DeskHead lockup={20} spread />
      <DeskRule />
      <p className="prec-title">Two Sisters Bakery LLC</p>
      <p className="prec-filing">New Jersey LLC formation</p>
      <ol className="prec-stages">
        {["Approved", "Submitted", "Filed"].map((s, i) => (
          <li key={s} className={`is-${i}`}>
            <span className="prec-dot m-press" style={d(stages[i]!)} aria-hidden="true" />
            {i ? <span className="prec-seg m-draw" style={d(Math.max(0, stages[i]! - 160))} aria-hidden="true" /> : null}
            <span className="prec-stage">{s}</span>
          </li>
        ))}
      </ol>
      <div className="prec-papers">
        {CARDS.map((c, i) => <DocCard key={c.title} {...c} className={cards === "fly" ? "m-land" : "m-press"} style={d(land[i]!)} />)}
      </div>
    </div>
  );
}

/** CoFile's envelope addressed to the firm (7.3.2, 10D.7): its lockup in the corner, the firm's name as the address. */
function Envelope() {
  return (
    <div className="penv" aria-hidden="true">
      <svg className="penv-flap" viewBox="0 0 280 53" preserveAspectRatio="none"><path d="M0.5 52.5 140 0.8 279.5 52.5Z" /></svg>
      <div className="penv-face sheet">
        {/* In mail the lockup is one ink, the lozenge in the letters' color (10D.4): the one-color export */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <span className="penv-lockup"><img src="/cofile/identity/cofile-lockup-horizontal-small-onecolor.svg" width={91} height={16} alt="" /></span>
        <span className="penv-to">Harbor &amp; Pine CPA</span>
      </div>
    </div>
  );
}

/** Home 5 (L5, M5 about 2.3 s): the record on the firm's walnut desk, CoFile's envelope opening beside it, the papers settling onto it. */
export function OrderComesHome() {
  return (
    <MotionFigure pic="L5" ms={2300} className="pic-record" ariaLabel={RECORD_NAME} label={RECORD_LABEL}>
      <div className="precf">
        <div className="precf-photo"><Photo name="c06-desk" mobile="c06-desk-mobile" alt="" /></div>
        <div className="precf-record"><RecordSheet stages={[0, 400, 800]} cards="fly" land={[2150, 2270]} /></div>
        <div className="precf-env"><Envelope /></div>
        {/* The two papers in flight, from the envelope's mouth to their places on the record */}
        <div className="precf-fly" aria-hidden="true">
          {CARDS.map((c, i) => <DocCard key={c.title} {...c} className={`pdoc-fly is-${i}`} style={d(1350 + i * 120)} />)}
        </div>
      </div>
    </MotionFigure>
  );
}

/**
 * Stand-in words (COPY-NEEDED, D7): the alt text of How it works' C6 photograph. The page's step 3 already shows the
 * envelope addressed to the firm (c06-papers-returned), so this band takes the package's other envelope frame.
 */
const PAPERS_ALT = "An opened envelope with its papers on a walnut desk";

/** How it works' After (10A.1.6): the papers already home on the photograph, the record laid over its lower left. 1.6 s. */
export function PapersHome() {
  return (
    <MotionFigure pic="H6" ms={1600} className="pic-papers" ariaLabel={RECORD_NAME} label={RECORD_LABEL}>
      <div className="ppapers">
        <div className="ppapers-photo"><Photo name="c06-envelope-email" alt={PAPERS_ALT} /></div>
        <div className="ppapers-record"><RecordSheet stages={[0, 70, 140]} cards="press" land={[900, 1060]} /></div>
      </div>
    </MotionFigure>
  );
}
