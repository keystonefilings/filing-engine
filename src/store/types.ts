import type { FilingRequest } from "../domain/filing.js";
import type { FilingStatus } from "../domain/states.js";
import type { SettingsSnapshot } from "../settings/snapshot.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { WebhookEvent } from "../domain/events.js";
import type { PageSnapshot } from "../resolver/types.js";

export interface FilingRecord {
  id: string;
  tenantId: string;
  clientCompanyId: string;
  idempotencyKey: string;
  status: FilingStatus;
  request: FilingRequest;
  payloadHash: string;
  createdAt: string;
  updatedAt: string;
  currentApprovalId?: string;
  currentRunId?: string;
  ein?: string;
  lastError?: string;
  artifacts: { id: string; kind: string; label: string }[];
}

export interface ApprovalRecord {
  id: string;
  filingId: string;
  tenantId: string;
  payloadHash: string;
  settingsSnapshot: SettingsSnapshot;
  shownPayload: unknown; // masked payload as rendered
  fees: { label: string; amountUsd: number }[];
  feeCapUsd?: number;
  recipients: { channel: string; address: string; name?: string }[];
  token: string;
  oneTimeCode?: string;
  status: "pending" | "approved" | "changes_requested" | "expired" | "superseded";
  createdAt: string;
  expiresAt: string;
  decidedAt?: string;
  decidedVia?: { ip?: string; userAgent?: string; recipient?: string };
  comment?: string;
}

export interface RunRecord {
  id: string;
  filingId: string;
  approvalId: string;
  site: string;
  dryRun: boolean;
  status: "running" | "halted_drift" | "submitted" | "completed" | "failed" | "aborted" | "needs_reconciliation";
  startedAt: string;
  endedAt?: string;
  steps: { screenKey: string; at: string; artifactIds: string[]; note?: string }[];
  error?: string;
}

export interface SubmitIntentRecord {
  id: string;
  runId: string;
  filingId: string;
  site: string;
  payloadHash: string;
  createdAt: string;
  outcome?: "submitted" | "failed" | "dry_run_stop";
  outcomeAt?: string;
}

export interface DriftHaltRecord {
  id: string;
  runId: string;
  filingId: string;
  site: string;
  screenKey: string;
  previous: PageSnapshot | null;
  current: PageSnapshot;
  diff: unknown;
  proposal: unknown;
  status: "pending" | "accepted" | "corrected" | "rejected";
  requiresClientReapproval: boolean;
  createdAt: string;
  decidedAt?: string;
  decidedBy?: string;
  resolution?: unknown;
}

export interface WebhookDeliveryRecord {
  id: string;
  event: WebhookEvent;
  url: string;
  attempts: number;
  nextAttemptAt: string;
  status: "pending" | "delivered" | "dead";
  lastStatusCode?: number;
  lastError?: string;
}

export interface Store {
  // filings
  createFiling(f: FilingRecord): Promise<FilingRecord>;
  getFiling(id: string): Promise<FilingRecord | null>;
  findFilingByIdempotency(tenantId: string, key: string): Promise<FilingRecord | null>;
  updateFiling(id: string, patch: Partial<FilingRecord>): Promise<FilingRecord>;
  listFilings(tenantId?: string): Promise<FilingRecord[]>;
  // approvals
  createApproval(a: ApprovalRecord): Promise<ApprovalRecord>;
  getApproval(id: string): Promise<ApprovalRecord | null>;
  updateApproval(id: string, patch: Partial<ApprovalRecord>): Promise<ApprovalRecord>;
  // runs
  createRun(r: RunRecord): Promise<RunRecord>;
  getRun(id: string): Promise<RunRecord | null>;
  updateRun(id: string, patch: Partial<RunRecord>): Promise<RunRecord>;
  // submit intents
  createSubmitIntent(s: SubmitIntentRecord): Promise<SubmitIntentRecord>;
  updateSubmitIntent(id: string, patch: Partial<SubmitIntentRecord>): Promise<SubmitIntentRecord>;
  listOpenSubmitIntents(): Promise<SubmitIntentRecord[]>;
  // drift
  createDriftHalt(d: DriftHaltRecord): Promise<DriftHaltRecord>;
  getDriftHalt(id: string): Promise<DriftHaltRecord | null>;
  updateDriftHalt(id: string, patch: Partial<DriftHaltRecord>): Promise<DriftHaltRecord>;
  listDriftHalts(status?: DriftHaltRecord["status"]): Promise<DriftHaltRecord[]>;
  getApprovedSnapshot(site: string, screenKey: string): Promise<PageSnapshot | null>;
  putApprovedSnapshot(site: string, screenKey: string, snap: PageSnapshot): Promise<void>;
  getIntentOverrides(site: string, screenKey: string): Promise<Record<string, string[]>>;
  putIntentOverrides(site: string, screenKey: string, overrides: Record<string, string[]>): Promise<void>;
  // settings
  getTenant(id: string): Promise<TenantSettings | null>;
  putTenant(t: TenantSettings): Promise<void>;
  getClientCompany(id: string): Promise<ClientCompanySettings | null>;
  putClientCompany(c: ClientCompanySettings): Promise<void>;
  // webhooks
  createDelivery(d: WebhookDeliveryRecord): Promise<WebhookDeliveryRecord>;
  updateDelivery(id: string, patch: Partial<WebhookDeliveryRecord>): Promise<WebhookDeliveryRecord>;
  listDueDeliveries(now: string): Promise<WebhookDeliveryRecord[]>;
  listDeliveries(filingId?: string): Promise<WebhookDeliveryRecord[]>;
}
