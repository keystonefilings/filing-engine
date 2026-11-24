import type { FilingRequest } from "../domain/filing.js";
import type { FilingStatus } from "../domain/states.js";
import type { SettingsSnapshot } from "../settings/snapshot.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { WebhookEvent } from "../domain/events.js";
import type { PageSnapshot } from "../resolver/types.js";
import type { ResolvedRegisteredAgent } from "../registered-agents/types.js";

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
  /** Field path -> source ("filing", "service_company", "firm", "intake", ...) from the onboarding answers. */
  appliedPolicies?: Record<string, string>;
  /** Set when a beta review-gate was approved; the re-queued run proceeds past the gate. */
  reviewGate?: { approvedAt: string; approvedBy: string; recordId: string };
  /** Resolved registered agent (client/self/third-party); a third-party agent is ordered at run time. */
  registeredAgentResolution?: ResolvedRegisteredAgent;
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
  status: "running" | "halted_drift" | "halted_name" | "halted_review" | "submitted" | "completed" | "failed" | "aborted" | "needs_reconciliation";
  startedAt: string;
  endedAt?: string;
  steps: { screenKey: string; at: string; artifactIds: string[]; note?: string }[];
  error?: string;
}

/**
 * Written before an irreversible click. It stays open (no outcome) through the click and
 * is closed as "submitted" only once the adapter has read evidence that the portal took the
 * filing (a confirmation number, an assigned EIN). An open intent is never re-run.
 */
export interface SubmitIntentRecord {
  id: string;
  runId: string;
  filingId: string;
  site: string;
  payloadHash: string;
  createdAt: string;
  /** When the irreversible click returned. Not proof of submission. */
  clickedAt?: string;
  outcome?: "submitted" | "failed" | "dry_run_stop";
  outcomeAt?: string;
  /** What the adapter read to confirm the submission. */
  evidence?: { reference?: string; detail: string };
}

/** Thrown when a client company id already belongs to another tenant. */
export class ClientCompanyOwnershipError extends Error {
  constructor(public readonly clientCompanyId: string) { super(`client company ${clientCompanyId} belongs to another tenant`); }
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

/** One name-resolution flow for a filing whose chosen name was unavailable (beta/AI). */
export interface NameOption {
  baseName: string;
  designator: string;
  /** Rendered full name (baseName + designator) as shown to the admin and checked. */
  name: string;
  available: boolean;
  source: "ai" | "custom";
  checkedAt?: string;
  detail?: string;
}

export interface NameResolutionRecord {
  id: string;
  filingId: string;
  tenantId: string;
  runId?: string;
  site: string;
  requested: { baseName: string; designator: string; name: string };
  purpose?: string;
  status: "awaiting_admin" | "resolved" | "aborted";
  /** False when no availability checker is wired for the state: options are unverified. */
  availabilityVerified: boolean;
  options: NameOption[];
  /** Every availability check made (AI candidates and admin custom entries). */
  attempts: { name: string; available: boolean; source: "ai" | "custom"; at: string; by?: string }[];
  chosen?: { baseName: string; designator: string; name: string; source: "ai_option" | "custom" };
  token: string;
  createdAt: string;
  expiresAt: string;
  decidedAt?: string;
  decidedBy?: string;
  reason?: string;
}

/** One beta review-gate stop for a run: the review screen awaiting admin approval. */
export interface ReviewGateRecord {
  id: string;
  filingId: string;
  tenantId: string;
  runId: string;
  site: string;
  screenKey: string;
  screenshotArtifactId?: string;
  status: "pending" | "approved" | "rejected";
  token: string;
  createdAt: string;
  expiresAt: string;
  decidedAt?: string;
  decidedBy?: string;
  reason?: string;
}

/** One outbound human message produced by the comms layer for a filing event. */
export interface MessageRecord {
  id: string;
  filingId: string;
  tenantId: string;
  eventType: string;
  audience: "client" | "admin";
  channel: string;
  address: string;
  subject: string;
  body: string;
  link?: string;
  screenshotArtifactId?: string;
  status: "sent" | "failed" | "skipped";
  createdAt: string;
  error?: string;
}

/**
 * A tenant API key the tenant issued itself (enterprise self-service). Only the SHA-256 of the
 * key is stored; the key is shown once, when it is created. Keys from API_KEYS in the
 * environment keep working alongside these.
 */
/** A signer's saved signature for one client company. The image is sealed (src/signatures/sealed.ts). */
export interface SignatureRecord {
  id: string;
  tenantId: string;
  clientCompanyId: string;
  signerName: string;
  signerEmail?: string;
  /** Who captured it (portal user or API caller), and the consent the signer gave. */
  capturedBy: string;
  consentText: string;
  createdAt: string;
  revokedAt?: string;
  lastUsedAt?: string;
  imageSha256: string;
  width: number;
  height: number;
  /** Encrypted PNG; removed when revoked. Never returned by the API. */
  sealedImage?: string;
}

export interface ApiKeyRecord {
  id: string;
  tenantId: string;
  /** The caller's label for the key ("website", "zapier"). */
  name: string;
  /** First characters of the key, shown so the owner can tell keys apart. */
  prefix: string;
  /** Hex SHA-256 of the full key. */
  hash: string;
  createdAt: string;
  createdBy?: string;
  revokedAt?: string;
  lastUsedAt?: string;
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
  /** Filings in any of these statuses, optionally only for these tenants (recovery scans). */
  listFilingsByStatus(statuses: FilingStatus[], tenants?: string[]): Promise<FilingRecord[]>;
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
  // name resolution (beta)
  createNameResolution(r: NameResolutionRecord): Promise<NameResolutionRecord>;
  getNameResolution(id: string): Promise<NameResolutionRecord | null>;
  updateNameResolution(id: string, patch: Partial<NameResolutionRecord>): Promise<NameResolutionRecord>;
  listNameResolutions(status?: NameResolutionRecord["status"]): Promise<NameResolutionRecord[]>;
  // review gate (beta)
  createReviewGate(r: ReviewGateRecord): Promise<ReviewGateRecord>;
  getReviewGate(id: string): Promise<ReviewGateRecord | null>;
  updateReviewGate(id: string, patch: Partial<ReviewGateRecord>): Promise<ReviewGateRecord>;
  listReviewGates(status?: ReviewGateRecord["status"]): Promise<ReviewGateRecord[]>;
  // settings
  getTenant(id: string): Promise<TenantSettings | null>;
  putTenant(t: TenantSettings): Promise<void>;
  getClientCompany(id: string): Promise<ClientCompanySettings | null>;
  /** Creates or updates; throws ClientCompanyOwnershipError if the id belongs to another tenant. */
  putClientCompany(c: ClientCompanySettings): Promise<void>;
  /** A tenant's own client companies (its customer firms). */
  listClientCompanies(tenantId: string): Promise<ClientCompanySettings[]>;
  // self-service API keys (hashed)
  createSignature(s: SignatureRecord): Promise<SignatureRecord>;
  getSignature(id: string): Promise<SignatureRecord | null>;
  listSignatures(tenantId: string, clientCompanyId?: string): Promise<SignatureRecord[]>;
  /** Marks it revoked and deletes the sealed image. False when not found for this tenant. */
  revokeSignature(tenantId: string, id: string, at: string): Promise<boolean>;
  touchSignature(id: string, at: string): Promise<void>;
  createApiKey(k: ApiKeyRecord): Promise<ApiKeyRecord>;
  listApiKeys(tenantId: string): Promise<ApiKeyRecord[]>;
  /** The live (not revoked) key with this hash, or null. */
  findApiKeyByHash(hash: string): Promise<ApiKeyRecord | null>;
  /** Revokes the tenant's own key; false when no such live key belongs to the tenant. */
  revokeApiKey(tenantId: string, id: string, at: string): Promise<boolean>;
  touchApiKey(id: string, at: string): Promise<void>;
  // run leases: the worker running a filing holds and renews one; recovery skips live leases
  /** Takes the filing's lease unless another unexpired one holds it. Returns the lease token, or null. */
  acquireRunLease(filingId: string, workerId: string, ttlMs: number): Promise<string | null>;
  /** Extends a lease this token still holds. False when it lapsed and was taken, or was released. */
  renewRunLease(filingId: string, token: string, ttlMs: number): Promise<boolean>;
  releaseRunLease(filingId: string, token: string): Promise<void>;
  /** True while an unexpired lease holds the filing (some worker is still renewing it). */
  hasLiveRunLease(filingId: string): Promise<boolean>;
  // webhooks
  createDelivery(d: WebhookDeliveryRecord): Promise<WebhookDeliveryRecord>;
  updateDelivery(id: string, patch: Partial<WebhookDeliveryRecord>): Promise<WebhookDeliveryRecord>;
  listDueDeliveries(now: string): Promise<WebhookDeliveryRecord[]>;
  listDeliveries(filingId?: string): Promise<WebhookDeliveryRecord[]>;
  // comms (outbound messages)
  createMessage(m: MessageRecord): Promise<MessageRecord>;
  listMessages(filingId?: string): Promise<MessageRecord[]>;
}
