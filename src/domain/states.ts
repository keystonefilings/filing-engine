/**
 * Filing lifecycle. One filing may have several runs (a run is one browser pass).
 * No drafts exist on any site, so a run that stops before submit leaves nothing behind;
 * "resume" after a drift review means a new run from the first screen.
 */
export type FilingStatus =
  | "created"
  | "invalid"
  | "awaiting_approval"
  | "changes_requested"
  | "approved"
  | "blocked"            // pre-flight failed (IRS hours, DD balance, login, approval hash)
  | "queued"
  | "running"
  | "awaiting_drift_review"
  | "awaiting_name_resolution" // name taken; admin picks an available alternative (beta/AI flow)
  | "awaiting_review_gate"     // beta: stopped at the review screen for admin review before submit
  | "ein_filed"
  | "submitted"          // final click done, site accepted the submission
  | "accepted"           // state confirmed the filing (NJ: documents; NY: receipt email)
  | "rejected"           // state examiner rejected after submission
  | "completed"
  | "failed"
  | "aborted"
  | "needs_reconciliation"; // submit intent recorded, outcome unknown; never auto re-run

const TRANSITIONS: Record<FilingStatus, FilingStatus[]> = {
  created: ["invalid", "awaiting_approval"],
  invalid: ["created"],
  awaiting_approval: ["approved", "changes_requested", "aborted"],
  changes_requested: ["awaiting_approval", "aborted"],
  approved: ["queued", "blocked", "awaiting_approval"],
  blocked: ["queued", "aborted", "awaiting_approval"],
  queued: ["running", "blocked", "aborted"],
  running: ["awaiting_drift_review", "awaiting_name_resolution", "awaiting_review_gate", "ein_filed", "submitted", "failed", "aborted", "needs_reconciliation", "blocked"],
  awaiting_drift_review: ["queued", "awaiting_approval", "aborted"],
  awaiting_name_resolution: ["queued", "aborted"],
  awaiting_review_gate: ["queued", "aborted"],
  ein_filed: ["submitted", "failed", "needs_reconciliation", "awaiting_drift_review", "awaiting_review_gate"],
  submitted: ["accepted", "rejected", "completed"],
  accepted: ["completed"],
  rejected: ["created"],
  completed: [],
  failed: ["queued", "aborted"],
  aborted: [],
  needs_reconciliation: ["completed", "failed"],
};

export function canTransition(from: FilingStatus, to: FilingStatus): boolean {
  return (TRANSITIONS[from] ?? []).includes(to);
}

export function assertTransition(from: FilingStatus, to: FilingStatus): void {
  if (!canTransition(from, to)) {
    throw new Error(`Illegal filing transition ${from} -> ${to}`);
  }
}

export const TERMINAL: ReadonlySet<FilingStatus> = new Set(["completed", "aborted"]);
