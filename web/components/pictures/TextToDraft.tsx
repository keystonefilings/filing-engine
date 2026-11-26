import type { CSSProperties } from "react";
import { Chip } from "@/components/ui/Chip";
import { DeskHead, DeskRule } from "./DeskParts";
import { MotionFigure } from "./MotionFigure";
import { Photo } from "./Photo";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/** D4's draft: three answers from Ana's text, two from the firm's saved answers (the stand-in's words). */
const ROWS: { label: string; value: string; from: "text" | "saved"; at: number }[] = [
  { label: "Business name", value: "TWO SISTERS BAKERY LLC", from: "text", at: 1520 },
  { label: "Members", value: "Ana Ortiz, Lucia Ortiz (50/50)", from: "text", at: 1670 },
  { label: "City", value: "Jersey City, NJ", from: "text", at: 1820 },
  { label: "Registered agent", value: "Your saved agent", from: "saved", at: 2080 },
  { label: "Organizer and signer", value: "Your saved answers", from: "saved", at: 2080 },
];

/** The source tags (11.6): "from the text" after a speech-bubble glyph; "already filled" after a Brass Line lozenge. */
function Tag({ from, at }: { from: "text" | "saved"; at: number }) {
  return from === "text"
    ? <span className="pdraft-tag is-text m-set" style={d(at + 120)}><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M1.5 2.25h9v6h-5.5L2.5 10.5V8.25h-1Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>from the text</span>
    : <span className="pdraft-tag is-saved m-set" style={d(at)}><i aria-hidden="true" />already filled</span>;
}

/** The draft of a request from a text, a page of CoFile's desk with Harbor & Pine as the account (L3, 10B.15). */
export function DraftSheet({ only }: { only?: "saved" }) {
  const rows = only ? ROWS.filter((r) => r.from === only) : ROWS;
  return (
    <div className={["pdraft", "sheet", only && "is-detail"].filter(Boolean).join(" ")}>
      <DeskHead lockup={24} />
      <DeskRule />
      {only ? null : (
        <>
          <p className="pdraft-title">Draft: New Jersey LLC formation</p>
          <span className="pdraft-chip m-press" style={d(2600)}><Chip tone="turn">For your team to check</Chip></span>
          <span className="pdraft-hr" aria-hidden="true" />
        </>
      )}
      <dl className="pdraft-rows">
        {rows.map((r) => (
          <div key={r.label} className={`pdraft-row is-${r.from}`}>
            <span className="pdraft-mark m-fade" style={d(r.at)} aria-hidden="true" />
            <dt>{r.label}</dt>
            <Tag from={r.from} at={r.at} />
            <dd className={r.from === "text" ? "m-set" : undefined} style={r.from === "text" ? d(r.at) : undefined}>{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Ana's message in CoFile's own neutral bubble (7.3.2), its three phrases underlined in Brass Line. */
function Bubble() {
  return (
    <div className="pbubble m-rise">
      <p>
        <span className="pbubble-line">Need <mark className="m-hl" style={d(720)}>an LLC for the bakery</mark>.</span>{" "}
        <span className="pbubble-line">It&apos;s <mark className="m-hl" style={d(870)}>me and my sister, 50/50</mark>,</span>{" "}
        <span className="pbubble-line"><mark className="m-hl" style={d(1020)}>in Jersey City</mark>.</span>
      </p>
    </div>
  );
}

/** Three dotted Brass Line leaders from the bubble's lines to their rows, elbows in three columns so none crosses. */
function Leaders() {
  // Coordinates in the 774 × 674 desktop composition (9.3): the bubble's lines at y 306, 334, 362; the rows' label lines at 324, 393, 462.
  const paths = [
    { d: "M334 306H354a8 8 0 0 1 8 8v2a8 8 0 0 0 8 8", at: 1020 },
    { d: "M334 334H346a8 8 0 0 1 8 8v43a8 8 0 0 0 8 8H370", at: 1170 },
    { d: "M334 362H338a8 8 0 0 1 8 8v84a8 8 0 0 0 8 8H370", at: 1320 },
  ];
  return (
    <svg className="pleaders" viewBox="0 0 774 674" aria-hidden="true">
      <defs>
        {paths.map((p, i) => (
          <mask key={i} id={`pleader-m${i}`} maskUnits="userSpaceOnUse">
            <path className="m-stroke" style={d(p.at)} d={p.d} pathLength={1} fill="none" stroke="#fff" strokeWidth="6" />
          </mask>
        ))}
      </defs>
      {paths.map((p, i) => (
        <g key={i} mask={`url(#pleader-m${i})`}>
          <path d={p.d} fill="none" className="pleader-dots" />
          <circle cx={i === 0 ? 370 : 370} cy={[324, 393, 462][i]} r="2" className="pleader-end" />
        </g>
      ))}
    </svg>
  );
}

const LABEL = "Ana Ortiz · text message · example";
/** Stand-in words (COPY-NEEDED, D7): Ana's photograph's alt text. */
const ANA_ALT = "A baker reading a text message on her phone at the counter";

/** Home 3 (L3, M3 3.4 s): Ana's photograph, her text at reading size, the leaders and the draft on the firm's desk. */
export function TextToDraft() {
  return (
    <MotionFigure pic="L3" ms={3400} msPhone={3000} className="pic-text" ariaLabel="A client's text drafted into a New Jersey LLC formation">
      <div className="ptext">
        <div className="ptext-photo"><Photo name="c05-phone-detail" alt={ANA_ALT} /></div>
        <div className="ptext-msg">
          <Bubble />
          <p className="ptext-label m-rise">{LABEL}</p>
        </div>
        <span className="ptext-drop" aria-hidden="true" />
        <Leaders />
        <div className="ptext-draft"><DraftSheet /></div>
      </div>
    </MotionFigure>
  );
}

/** How it works (10A.1.4): the drawn phone slab holds the text, the draft beside it; the same choreography. */
export function SlabToDraft() {
  return (
    <MotionFigure pic="L3" ms={3400} msPhone={3000} className="pic-slab" ariaLabel="A client's text drafted into a New Jersey LLC formation" label="Example · test details · not a real firm">
      <div className="pslab-wrap">
        <div className="pslab" aria-hidden="false">
          <div className="pslab-screen">
            <Bubble />
            <p className="ptext-label m-rise">{LABEL}</p>
          </div>
        </div>
        <div className="pslab-draft"><DraftSheet /></div>
      </div>
    </MotionFigure>
  );
}
