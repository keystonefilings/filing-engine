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

/** Statuses where someone at the firm or the client has to act. */
export const NEEDS_ACTION = new Set(["invalid", "awaiting_information", "awaiting_approval", "changes_requested", "awaiting_name_resolution", "rejected", "failed"]);

export function nextStep(s: string): string | undefined {
  switch (s) {
    case "invalid": return "Something in the filing doesn't meet the state's rules. Start a corrected filing.";
    case "awaiting_information": return "Fill in what's missing below and the filing moves on to approval.";
    case "previewing": return "We're filling in the state's form up to its review page. The approver then gets that page to check and approve.";
    case "awaiting_approval": return "The approver has a link to check exactly what will be filed and approve it.";
    case "changes_requested": return "The approver asked for changes. Start a corrected filing.";
    case "awaiting_name_resolution": return "The state says the name is taken. Your filing company will offer alternatives.";
    case "rejected": return "The state rejected the filing. Your filing company will be in touch with the reason.";
    case "failed": return "The filing didn't go through. Your filing company has been told and will follow up.";
    default: return undefined;
  }
}
