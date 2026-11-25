/** Webhook event catalog. Every event carries filingId, tenantId, occurredAt and data. */
export const EVENT_TYPES = [
  "filing.validated",
  "filing.invalid",
  "filing.information_required",
  "filing.previewing",
  "filing.awaiting_approval",
  "filing.approved",
  "filing.changes_requested",
  "filing.blocked",
  "filing.started",
  "filing.step",
  "filing.drift_halted",
  "filing.drift_resolved",
  "filing.name_unavailable",
  "filing.name_options_ready",
  "filing.name_resolved",
  "filing.review_gate",
  "filing.review_gate_resolved",
  "filing.ein_filed",
  "filing.submitted",
  "filing.accepted",
  "filing.rejected",
  "filing.completed",
  "filing.failed",
  "filing.aborted",
  "filing.needs_reconciliation",
  /** V35: a test delivery the subscriber asked for (POST /v1/webhooks/test); no filing behind it. */
  "webhook.test",
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
