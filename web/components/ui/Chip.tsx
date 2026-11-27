import "@/styles/components/chip.css";
import type { ReactNode } from "react";
import { statusLabel, stageOf, STAGES } from "@/lib/status";
import { DashedOutline, Glyph, type GlyphKind } from "./glyphs";

export type ChipTone = "done" | "done-quiet" | "turn" | "attention" | "inhand" | "problem" | "rehearsal" | "neutral" | "quiet" | "mono";

const GLYPH: Partial<Record<ChipTone, GlyphKind>> = {
  done: "done", "done-quiet": "done", turn: "turn", attention: "attention", inhand: "inhand", problem: "problem", rehearsal: "ghost",
};

/** A chip (11.6): a label with its glyph and tone; never color alone. */
export function Chip({ tone, compact, children }: { tone: ChipTone; compact?: boolean; children: ReactNode }) {
  const g = GLYPH[tone];
  return (
    <span className={["chip2", `is-${tone}`, compact && "is-compact"].filter(Boolean).join(" ")}>
      {tone === "rehearsal" ? <DashedOutline /> : null}
      {g ? <Glyph kind={g} /> : null}
      <span>{children}</span>
    </span>
  );
}

/** Statuses where it is the firm's move: "Your turn", not a warning (11.6). */
const TURN = new Set(["awaiting_approval", "awaiting_information", "changes_requested"]);

/** The tone a filing status takes, from the product's own labels (web/lib/status.ts). */
export function statusTone(status: string): ChipTone {
  if (TURN.has(status)) return "turn";
  const { tone } = statusLabel(status);
  return tone === "ok" ? "done" : tone === "bad" ? "problem" : tone === "warn" ? "attention" : "inhand";
}

export function StatusChip({ status, quiet }: { status: string; quiet?: boolean }) {
  const tone = statusTone(status);
  return <Chip tone={tone === "done" && quiet ? "done-quiet" : tone}>{statusLabel(status).label}</Chip>;
}

/** The stage track (11.7): five dots and "Proof, step 2 of 5"; nothing for a filing that stopped. */
export function StageDots({ status }: { status: string }) {
  const s = stageOf(status);
  if (!s) return null;
  return (
    <span className="stage2" role="img" aria-label={`Step ${s.step + 1} of ${STAGES.length}: ${s.label}`}>
      <span className="stage2-dots" aria-hidden="true">{STAGES.map((n, i) => <i key={n} className={i <= s.step ? "on" : undefined} />)}</span>
      <span className="stage2-text" aria-hidden="true">{s.label}, step {s.step + 1} of {STAGES.length}</span>
    </span>
  );
}

export function CountBadge({ n, label }: { n: number; label: string }) {
  return <span className="count2" aria-label={label}>{n}</span>;
}
