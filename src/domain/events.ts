/** Webhook event catalog. Every event carries filingId, tenantId, occurredAt and data. */
export const EVENT_TYPES = [
  "filing.validated",
  "filing.invalid",
  "filing.awaiting_approval",
  "filing.approved",
  "filing.changes_requested",
  "filing.blocked",
  "filing.started",
  "filing.step",
  "filing.drift_halted",
  "filing.drift_resolved",
  "filing.ein_filed",
  "filing.submitted",
  "filing.accepted",
  "filing.rejected",
  "filing.completed",
  "filing.failed",
  "filing.aborted",
  "filing.needs_reconciliation",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export interface WebhookEvent {
  id: string;
  type: EventType;
  tenantId: string;
  filingId: string;
  runId?: string;
  occurredAt: string;
  data: Record<string, unknown>;
}
