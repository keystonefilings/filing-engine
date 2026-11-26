import type { CSSProperties } from "react";
import { firmVars, inkMatch } from "@/lib/design/ink";

/**
 * The example firms (merged spec 3.8, D4): content inside the pictures, never CoFile's own marks. Their artwork is the
 * owner's (public/cofile/example-firm): Harbor & Pine's pine-and-waves symbol and its lettering, and Northgate
 * Payroll's plate lettering, set here as its one-color wide wordmark beside the gate mark.
 */
export type ExampleFirm = "hp" | "ng";

export const FIRMS: Record<ExampleFirm, { name: string; color: string; color2: string | null; font: string }> = {
  hp: { name: "Harbor & Pine CPA", color: "#1D4E63", color2: "#2B5A47", font: "'Lora', Georgia, serif" },
  ng: { name: "Northgate Payroll", color: "#C2410C", color2: null, font: "'Montserrat', 'Helvetica Neue', Arial, sans-serif" },
};

/** A firm's register for a picture of its client page: the ink match of its colors, and its font (3.6, 3.7). */
export function firmStyle(firm: ExampleFirm): CSSProperties {
  const f = FIRMS[firm];
  return { ...firmVars(inkMatch(f.color, f.color2)), ["--font-firm" as string]: f.font } as CSSProperties;
}

/** A register for any color (For firms' studio): the same ink match, live. */
export function colorStyle(color: string, font: string): CSSProperties {
  return { ...firmVars(inkMatch(color, color)), ["--font-firm" as string]: font } as CSSProperties;
}

/** The two faces the example firms' pages use, Lora (with its italic for the "&") and Montserrat, 600 only. */
export function ExampleFonts() {
  return <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;1,600&family=Montserrat:wght@600&display=swap" precedence="default" />;
}

const ART = "/cofile/example-firm";

/** Harbor & Pine's square symbol, the owner's artwork: a pine over two short waves, one weight, in Harbor (3.8). */
export function HarborPineSymbol({ size = 24, className }: { size?: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={`${ART}/harbor-pine-symbol.svg`} width={size} height={size} alt="" />;
}

/** Harbor & Pine's lettering, the owner's artwork: Lora 600 with the italic ampersand and a reduced, letter-spaced CPA (3.5). */
export function HarborPineLettering({ size = 20, className }: { size?: number; className?: string }) {
  // The artwork's em is 1000 units in an 8792 × 830 box, so it sets at the size its type would.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className={className} src={`${ART}/harbor-pine-lettering.svg`} width={Math.round(8.7921 * size)} height={Math.round(0.83 * size)} alt={FIRMS.hp.name} />;
}

/**
 * Northgate Payroll's wide wordmark (3.8): the gate mark (two posts and a lintel that read as an N), then its Montserrat
 * 600 plate lettering from the owner's artwork, in one color, Ember (the lettering file is drawn in ink, so a mask inks it).
 */
export function NorthgateWordmark({ width = 169, className }: { width?: number; className?: string }) {
  const h = (width * 26) / 169;
  return (
    <span className={["ng-mark", className].filter(Boolean).join(" ")} style={{ width, height: h }} role="img" aria-label={FIRMS.ng.name}>
      <svg width={(h * 20) / 26} height={h} viewBox="0 0 20 26" aria-hidden="true" focusable="false">
        <g fill="#C2410C"><rect x="1" y="3" width="4" height="21" /><rect x="15" y="3" width="4" height="21" /><path d="M1 3h5.2L19 19.6V24h-4.6L1 7.4Z" /></g>
      </svg>
      <span className="ng-letters" aria-hidden="true" />
    </span>
  );
}

/**
 * A firm's name typeset by the firm-name rules (3.5): the "&" in the italic, credentials at 88% with +0.04 em where the
 * face has no small capitals. For a name the visitor types (For firms' studio), in the chosen font.
 */
export function FirmName({ name, className }: { name: string; className?: string }) {
  const parts = name.split(/(\s+)/);
  return (
    <span className={className}>
      {parts.map((p, i) => {
        if (p === "&") return <span key={i} className="fname-amp">&amp;</span>;
        if (/^(CPA|CPAs|LLC|LLP|PC|PLLC)$/.test(p)) return <span key={i} className="fname-cred">{p}</span>;
        return p;
      })}
    </span>
  );
}
