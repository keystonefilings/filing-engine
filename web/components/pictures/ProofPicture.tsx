import type { CSSProperties } from "react";
import { Chip } from "@/components/ui/Chip";
import { FIRMS, HarborPineLettering, HarborPineSymbol } from "./examples";
import { MotionFigure } from "./MotionFigure";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

/** The outline a point draws around its part of the proof (decisions 16, 19): pre-drawn, only its opacity moves. */
function Outline({ part }: { part: string }) {
  return <span className="pproof-hl" data-part={part} aria-hidden="true" />;
}

export const PROOF_LABEL = "Sample proof · test details · not a real business";
export const PROOF_ID = "sample-proof";

/**
 * The sample proof (L4; merged spec 9.4, 10B.22): one page in CoFile's look, the firm and its client named at its
 * head as text, every detail and every fee, the state's own review page redrawn neutrally, and the proof's one Brass
 * button at the end, drawn as a picture. On the home page the New Jersey payment slip is tucked under its foot.
 * How it works (L10, M13) opens it as Harbor & Pine's letterhead proof from the printer, and adds the product's
 * Authorizations group above the button so its fourth point has somewhere to point.
 */
export function ProofPicture({ variant = "home", id = PROOF_ID }: { variant?: "home" | "hiw"; id?: string }) {
  const hiw = variant === "hiw";
  // Home: the head, labels and fees are on the sheet as it is laid. How it works: the same sheet sets them (M13).
  const head = hiw ? "m-ink" : undefined;
  const fee = hiw ? "m-set" : undefined;
  return (
    <MotionFigure pic={hiw ? "L10" : "L4"} ms={hiw ? 1600 : 2100} msPhone={hiw ? 1600 : 2000} id={id} className={`pic-proof is-${variant}`}
      ariaLabel="A sample proof for an example business" label={PROOF_LABEL}>
      <div className="pproof-stage">
        <div className="pproof sheet m-lay">
          <span className={["pproof-firm", head].join(" ")} style={d(400)}>{FIRMS.hp.name}</span>
          <span className={["pproof-example", head].join(" ")} style={d(400)}>example firm</span>
          <span className={["pproof-headrule", head].join(" ")} style={d(400)} aria-hidden="true" />
          <div className={["pproof-titlerow", head].join(" ")} style={d(400)}>
            <p className="pproof-title">Two Sisters Bakery LLC</p>
            <span className={hiw ? "m-press" : undefined} style={d(480)}><Chip tone="turn">Ready to approve</Chip></span>
          </div>
          <div className="pproof-part" data-for="details">
            <Outline part="details" />
            <dl className="pproof-details">
              <div><dt>Business name</dt><dd className="m-set" style={d(500)}><mark>TWO SISTERS BAKERY LLC</mark></dd></div>
              <div><dt>Members</dt><dd className="m-set" style={d(570)}>Ana Ortiz, Lucia Ortiz (50/50)</dd></div>
              <div><dt>Main business address</dt><dd className="m-set" style={d(640)}><mark>88 Grove St, Jersey City NJ 07302</mark></dd></div>
            </dl>
          </div>
          <div className="pproof-part" data-for="fees">
            <Outline part="fees" />
            <div className="pproof-fees">
              <p className={fee} style={d(800)}><span>Formation filing fee</span><span className="pproof-leader m-draw" style={d(hiw ? 800 : 900)} aria-hidden="true" /><span>$100.00</span></p>
              <p className={fee} style={d(870)}><span>NJ portal fee, by card</span><span className="pproof-leader m-draw" style={d(hiw ? 870 : 900)} aria-hidden="true" /><span>$3.50</span></p>
              <span className="pproof-sum m-draw" style={d(hiw ? 1100 : 1200)} aria-hidden="true" />
              <p className={["pproof-total", fee].join(" ")} style={d(1250)}><span>Total to the state</span><span className="pproof-amount">$103.50<span className="pproof-double m-draw" style={d(hiw ? 1250 : 1350)} aria-hidden="true" /></span></p>
            </div>
          </div>
          <div className="pproof-part" data-for="review">
            <Outline part="review" />
            <p className={["pproof-cap", hiw ? "m-ink" : undefined].join(" ")} style={d(1200)}>New Jersey&apos;s own review page, filled in</p>
            <div className="pproof-state m-ink" style={d(hiw ? 1200 : 1300)}>
              <span className="pproof-band" aria-hidden="true" />
              <dl>
                <div><dt>Business Name</dt><dd>TWO SISTERS BAKERY</dd></div>
                <div><dt>Designator</dt><dd>LLC</dd></div>
              </dl>
            </div>
          </div>
          {hiw ? (
            <div className="pproof-part" data-for="statements">
              <Outline part="statements" />
              <div className="pproof-auth m-set" style={d(1150)}>
                <p className="pproof-authhead">Authorizations</p>
                <p className="pproof-authline">I authorize the filing company to pay the state fee shown on the proof.</p>
                <span className="pproof-bar" aria-hidden="true" />
              </div>
            </div>
          ) : null}
          <div className="pproof-part is-button" data-for="button">
            <Outline part="button" />
            <span className="btn2 is-action is-block is-picture m-press" style={d(hiw ? 1160 : 1500)} aria-hidden="true">Approve for filing</span>
          </div>
          {hiw ? (
            <div className="pproof-letterhead" aria-hidden="true">
              <span className="pproof-crop is-tl" /><span className="pproof-crop is-tr" /><span className="pproof-crop is-bl" /><span className="pproof-crop is-br" />
              <div className="pproof-lh reg-firm">
                <span className="pproof-lh-name"><HarborPineSymbol size={40} /><HarborPineLettering size={20} /></span>
                <span className="pproof-lh-rule"><i /><i /></span>
              </div>
              {[100, 92, 96, 88, 94, 72, 40].map((w, i) => <span key={i} className="pproof-lh-bar" style={{ width: `${w}%` }} />)}
            </div>
          ) : null}
        </div>
        {hiw ? null : (
          <div className="pproof-slip sheet m-slip">
            <span className="pproof-slip-hl" data-part="fees" aria-hidden="true" />
            <span className="pproof-slip-what">New Jersey payment screen</span>
            <span className="pproof-slip-amt">$103.50</span>
            <Chip tone="done">Matches the proof</Chip>
          </div>
        )}
      </div>
    </MotionFigure>
  );
}
