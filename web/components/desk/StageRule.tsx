import { statusLabel } from "@/lib/status";

/** The filing type's main path, in the product's own status labels (merged spec 10B.13.1). */
const STATE_PATH = ["awaiting_approval", "approved", "submitted", "accepted", "completed"] as const;
const EIN_PATH = ["awaiting_approval", "approved", "ein_filed"] as const;

/** How far along the path a status is: the last stop reached, whether the current stop is the firm's turn, and where a stopped filing stopped. */
function position(status: string, einOnly: boolean, ran: boolean): { reached: number; turn: boolean; stoppedAt?: number } {
  const last = einOnly ? 2 : 4;
  switch (status) {
    case "awaiting_approval": case "changes_requested": return { reached: -1, turn: true };
    case "approved": case "queued": case "running": case "blocked": case "awaiting_drift_review":
    case "awaiting_name_resolution": case "awaiting_review_gate": case "needs_reconciliation": return { reached: 1, turn: false };
    case "ein_filed": return { reached: einOnly ? last : 1, turn: false };
    case "submitted": return { reached: 2, turn: false };
    case "accepted": return { reached: 3, turn: false };
    case "completed": return { reached: last, turn: false };
    case "rejected": return { reached: 2, turn: false, stoppedAt: 3 };
    case "failed": case "aborted": return ran ? { reached: 1, turn: false, stoppedAt: 2 } : { reached: -1, turn: false, stoppedAt: 0 };
    case "invalid": return { reached: -1, turn: false, stoppedAt: 0 };
    default: return { reached: -1, turn: false };
  }
}

/**
 * The stage rule (10B.13.1): the filing's road as stops on a line. Reached stops are Verdigris dots joined by a 2 px
 * Plate Ink line; the current stop is the Ochre lozenge when it is the firm's turn; stops ahead are small Rule Strong
 * dots; a stopped filing shows the Madder bar where it stopped. A rehearsal's line is dashed. Decorative: the chip
 * carries the meaning, so the rule is hidden from screen readers.
 */
export function StageRule({ status, einOnly, rehearsal, ran }: { status: string; einOnly: boolean; rehearsal: boolean; ran: boolean }) {
  const path = einOnly ? EIN_PATH : STATE_PATH;
  const { reached, turn, stoppedAt } = position(status, einOnly, ran);
  return (
    <ol className={["stagerule2", rehearsal && "is-rehearsal"].filter(Boolean).join(" ")} aria-hidden="true" style={{ ["--stops" as string]: path.length }}>
      {path.map((s, i) => {
        const state = stoppedAt === i ? "stopped" : i <= reached ? "reached" : turn && i === reached + 1 ? "turn" : "ahead";
        const inked = i <= reached;
        return (
          <li key={s} className={`is-${state}${inked ? " is-inked" : ""}`}>
            <span className="stagerule2-stop" />
            <span className="stagerule2-label">{statusLabel(s).label}</span>
          </li>
        );
      })}
    </ol>
  );
}
