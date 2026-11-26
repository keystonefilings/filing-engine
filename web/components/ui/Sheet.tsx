import "@/styles/components/sheet.css";
import type { CSSProperties, ReactNode } from "react";
import { DashedOutline, Glyph } from "./glyphs";

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

/** The firm's Letterhead: its logo or typeset name, then the Firm Rule. Heads client pages only (11.4). */
export function Letterhead({ name, logoUrl, centred, draw }: { name: string; logoUrl?: string; centred?: boolean; draw?: boolean }) {
  return (
    <div className={["letterhead2", centred && "is-centred"].filter(Boolean).join(" ")}>
      <div className="letterhead2-row">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {logoUrl ? <img className="letterhead2-logo" src={logoUrl} alt={name} /> : <span className="letterhead2-name">{name}</span>}
      </div>
      <FirmRule draw={draw} />
    </div>
  );
}

/** The firm on a page in CoFile's look: its logo small with its name, as content (11.4). */
export function FirmLogo({ name, logoUrl }: { name: string; logoUrl?: string }) {
  const initials = name.split(/\s+/).filter((w) => /^[A-Za-zÀ-ÿ]/.test(w)).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");
  return (
    <span className="firmlogo2">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {logoUrl ? <img src={logoUrl} alt="" /> : <span className="monogram2" aria-hidden="true">{initials}</span>}
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
