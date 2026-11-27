import "@/styles/components/sheet.css";
import type { CSSProperties, ReactNode } from "react";
import { DashedOutline, Glyph } from "./glyphs";
import { LetterheadRow, LogoImage } from "./LogoImage";
import type { LogoInfo } from "@/lib/design/logo";

/**
 * A register: whose look a subtree wears (the Stripe model, decision 2). `cofile` is everything a firm uses;
 * `firm` is what reaches its clients and previews of it, with the firm's ink-matched tokens inline.
 */
export function Register({ value, firmStyle, className, children, as: Tag = "div" }: {
  value: "cofile" | "firm" | "white"; firmStyle?: Record<string, string>; className?: string; children: ReactNode; as?: "div" | "main" | "section" | "body";
}) {
  return <Tag className={[`reg-${value}`, className].filter(Boolean).join(" ")} style={firmStyle as CSSProperties}>{children}</Tag>;
}

/**
 * A sheet (11.4). `page` and `picture` sizes are paper: white with light inks in either mode (the proof, client
 * pages, product pictures). A `card` follows the register (CoFile's own cards go Night Card in dark mode)
 * unless `paper` is set.
 */
export function Sheet({ size = "card", paper, className, children, as: Tag = "div", label }: {
  size?: "page" | "card" | "picture"; paper?: boolean; className?: string; children: ReactNode; as?: "div" | "section" | "article" | "figure"; label?: string;
}) {
  const isPaper = paper ?? size !== "card";
  return <Tag className={[isPaper && "sheet", "sheet2", `is-${size}`, className].filter(Boolean).join(" ")} aria-label={label}>{children}</Tag>;
}

/** The Firm Rule: 3 px main, 2 px gap, 1 px second. Client-facing only (11.4). */
export function FirmRule({ draw, cofile }: { draw?: boolean; cofile?: boolean }) {
  return <div className={["firmrule2", draw && "is-draw", cofile && "is-cofile"].filter(Boolean).join(" ")} aria-hidden="true" />;
}

/**
 * The firm's Letterhead: its logo or typeset name, then the Firm Rule. Heads client pages only (11.4). The logo is sized
 * by area, the name typeset beside a square or mid logo, and a logo of light marks sits on its plate (3.5.1, 10B.2.3):
 * `logo` is the engine's reading of it (FirmBrand.logo); without one, the logo is read in the browser once it loads.
 * `preview` sizes it as a phone sheet, for every picture and preview of a client page.
 */
export function Letterhead({ name, logoUrl, logo, centred, draw, preview }: { name: string; logoUrl?: string; logo?: LogoInfo; centred?: boolean; draw?: boolean; preview?: boolean }) {
  return (
    <div className={["letterhead2", centred && "is-centred", preview && "is-preview"].filter(Boolean).join(" ")}>
      <LetterheadRow name={name} logoUrl={logoUrl} logo={logo} preview={preview} />
      <FirmRule draw={draw} />
    </div>
  );
}

/** The firm on a page in CoFile's look: its logo small with its name, as content (11.4). Light marks take a Plate Ink plate. */
export function FirmLogo({ name, logoUrl, logo }: { name: string; logoUrl?: string; logo?: LogoInfo }) {
  const initials = name.split(/\s+/).filter((w) => /^[A-Za-zÀ-ÿ]/.test(w)).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");
  return (
    <span className="firmlogo2">
      {logoUrl ? <LogoImage src={logoUrl} alt="" info={logo} place="mark" /> : <span className="monogram2" aria-hidden="true">{initials}</span>}
      <span>{name}</span>
    </span>
  );
}

export type NoticeTone = "info" | "turn" | "attention" | "problem" | "done" | "rehearsal";

/** A notice (11.11): a quiet band with its glyph and words. */
export function Notice({ tone = "info", children, role }: { tone?: NoticeTone; children: ReactNode; role?: "status" | "alert" }) {
  const glyph = tone === "info" ? null : tone === "rehearsal" ? "ghost" : tone;
  return (
    <div className={`notice2 is-${tone}`} role={role}>
      {tone === "rehearsal" ? <DashedOutline /> : null}
      {glyph ? <Glyph kind={glyph as never} /> : <span aria-hidden="true" />}
      <div>{children}</div>
    </div>
  );
}
