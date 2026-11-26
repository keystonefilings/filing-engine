/** Plain-language status for people who aren't developers (firm staff, clients). */
export type Tone = "ok" | "warn" | "bad" | "";

const LABELS: Record<string, [string, Tone]> = {
  created: ["Received", ""],
  invalid: ["Needs correcting", "bad"],
  awaiting_information: ["Needs information", "warn"],
  previewing: ["Getting the state's review page", ""],
  awaiting_approval: ["Waiting for approval", "warn"],
  changes_requested: ["Changes requested", "warn"],
  approved: ["Approved", "ok"],
  blocked: ["On hold", "warn"],
  queued: ["Queued", ""],
  running: ["Filing now", ""],
  awaiting_drift_review: ["Paused: state site changed", "warn"],
  awaiting_name_resolution: ["Name unavailable", "warn"],
  awaiting_review_gate: ["Final check", ""],
  ein_filed: ["EIN issued", "ok"],
  submitted: ["Submitted to the state", "ok"],
  accepted: ["Accepted by the state", "ok"],
  rejected: ["Rejected by the state", "bad"],
  completed: ["Completed", "ok"],
  failed: ["Failed", "bad"],
  aborted: ["Stopped", "bad"],
  needs_reconciliation: ["Being checked", "warn"],
};

export function statusLabel(s: string): { label: string; tone: Tone } {
  const [label, tone] = LABELS[s] ?? [s.replace(/_/g, " "), ""];
  return { label, tone };
}

/**
 * Where a filing is up to, as five steps a firm reads at a glance (owner, Nov 26: firms see which of
 * their clients sent filings and where each one is up to). Rejected, failed and stopped filings
 * have no step: their status says what happened.
 */
export const STAGES = ["Details", "Proof", "Filing", "With the state", "Done"] as const;
const STAGE_OF: Record<string, number> = {
  created: 0, invalid: 0, awaiting_information: 0,
  previewing: 1, awaiting_approval: 1, changes_requested: 1,
  approved: 2, blocked: 2, queued: 2, running: 2, awaiting_drift_review: 2, awaiting_name_resolution: 2,
  awaiting_review_gate: 2, ein_filed: 2, needs_reconciliation: 2,
  submitted: 3, accepted: 3,
  completed: 4,
};
/** The step a filing has reached (0-based) and its name, or null when it stopped. */
export function stageOf(status: string): { step: number; label: (typeof STAGES)[number] } | null {
  const step = STAGE_OF[status];
  return step === undefined ? null : { step, label: STAGES[step]! };
}

/** Statuses where someone at the firm or the client has to act. */
export const NEEDS_ACTION = new Set(["invalid", "awaiting_information", "awaiting_approval", "changes_requested", "awaiting_name_resolution", "rejected", "failed"]);

export function nextStep(s: string): string | undefined {
  switch (s) {
    case "invalid": return "Something in the filing doesn't meet the state's rules. Start a corrected filing.";
    case "awaiting_information": return "Fill in what's missing below and the filing moves on to approval.";
    case "previewing": return "We're filling in the state's form up to its review page. The approver then gets that page to check and approve.";
    case "awaiting_approval": return "The proof is ready: check exactly what will be filed and approve it.";
    case "changes_requested": return "The approver asked for changes. Start a corrected filing.";
    case "awaiting_name_resolution": return "The state says the name is taken. Your filing company will offer alternatives.";
    case "rejected": return "The state rejected the filing. Your filing company will be in touch with the reason.";
    case "failed": return "The filing didn't go through. Your filing company has been told and will follow up.";
    default: return undefined;
  }
}
