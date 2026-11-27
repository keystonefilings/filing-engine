import "@/styles/components/pictures.css";
import type { CSSProperties, ReactNode } from "react";
import { FirmName, firmStyle, HarborPineLettering, HarborPineSymbol, NorthgateWordmark, type ExampleFirm } from "./examples";

/** The letterhead block for an example firm: Harbor & Pine's square symbol with its name beside it; Northgate's wide wordmark alone (3.5). */
export function ExampleLetterhead({ firm }: { firm: ExampleFirm }) {
  if (firm === "ng") return <NorthgateWordmark width={169} />;
  return <><HarborPineSymbol size={48} className="cpp-symbol" /><HarborPineLettering size={20} className="cpp-lettering" /></>;
}

/**
 * A firm's client page, "Start your New Jersey LLC", as a picture (merged spec 9.2, L2): a panel of the firm's wash
 * holding a white sheet with its Letterhead, Firm Rule, title in its font, two labelled empty fields and "Continue" in
 * its fill. Nothing of CoFile is on it (3.4). The letterhead block, the title box and every field keep fixed boxes, so
 * the same page in two brands puts its bones on the same pixels. `bare` adds the unbranded copies the signature
 * moment starts from (the page before any firm owns it).
 */
export function ClientPagePicture({ firm, brand, bare, className, label }: {
  firm?: ExampleFirm;
  /** Any firm: a name, a register (colorStyle) and an optional mark (For firms' studio). */
  brand?: { name: string; style: CSSProperties; mark?: ReactNode };
  bare?: boolean;
  className?: string;
  /** Read aloud as a group: whose page this is (hero, 9.1). */
  label?: string;
}) {
  const style = firm ? firmStyle(firm) : brand?.style;
  const head = firm ? <ExampleLetterhead firm={firm} /> : brand?.mark ?? <FirmName name={brand?.name || "Your firm"} className="cpp-name is-alone" />;
  return (
    <div className={["cpp", "reg-firm", className].filter(Boolean).join(" ")} style={style} data-firm={firm} role={label ? "group" : undefined} aria-label={label}>
      {bare ? <span className="cpp-bond" aria-hidden="true" /> : null}
      <div className="cpp-sheet sheet">
        <div className="cpp-lh">{head}</div>
        <div className="cpp-rule" aria-hidden="true"><i /><i /></div>
        {bare ? <span className="cpp-bare-rule" aria-hidden="true" /> : null}
        <p className="cpp-title">Start your New Jersey&nbsp;LLC</p>
        {bare ? <p className="cpp-title is-bare" aria-hidden="true">Start your New Jersey&nbsp;LLC</p> : null}
        <span className="cpp-label">Business name</span>
        <span className="cpp-field" />
        <span className="cpp-label">Who owns it</span>
        <span className="cpp-field" />
        <span className="cpp-btn" aria-hidden="true">Continue</span>
        {bare ? <span className="cpp-btn is-bare" aria-hidden="true">Continue</span> : null}
      </div>
    </div>
  );
}
