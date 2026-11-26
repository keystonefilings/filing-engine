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
  /** V35: a hash of the request as submitted, to refuse an idempotency key reused for another request. */
  requestFingerprint?: string;
  /** V27: what the completeness check still needs while the filing is awaiting_information. */
  missingInformation?: { path: string; label: string }[];
  /** V18: approved and ready to pay, waiting for the card owner to give the card's security code. */
  awaitingCardCode?: { methodId: string; label: string; last4?: string; owner: { tenantId: string; clientCompanyId?: string }; since: string };
  /** When the SSNs in request were replaced by their masked form (store/sensitive.ts). */
  sensitivePurgedAt?: string;
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
  /** Decision 7: the state's review page the client approved (a hash of its text, never the text). */
  review?: { screenKey: string; site: string; fingerprint: string; artifactId?: string; capturedAt: string };
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
  audience: "client" | "admin" | "card_owner";
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

/** A person who signs in to the dashboards with email and password (src/users). */
export interface UserRecord {
  id: string;
  /** Lower-cased; unique across the platform. */
  email: string;
  name: string;
  /** enterprise: a subscriber's staff (enterprise dashboard). partner: a CPA, payroll or CFO firm's staff (partner dashboard). */
  kind: "enterprise" | "partner";
  tenantId: string;
  /** Partner users only: the firm they belong to. Unset while a partner sign-up waits for approval. */
  clientCompanyId?: string;
  /** pending: a partner sign-up not yet approved. disabled: can't sign in. */
  status: "active" | "pending" | "disabled" | "rejected";
  passwordHash: string;
  /** Bumped to end every session of this user. */
  sessionGen: number;
  createdAt: string;
  createdBy?: string;
  lastSignInAt?: string;
  failedSignIns?: number;
  lockedUntil?: string;
  /** What a partner told us at sign-up; becomes the client company on approval. */
  signup?: PartnerSignupDetails;
  decidedAt?: string;
  decidedBy?: string;
  /** Partner sign-ups confirm their email before they can sign in: the latest link (hash only). */
  emailVerification?: { tokenHash: string; expiresAt: string; sentAt: string };
  emailVerifiedAt?: string;
  /** Session keys signed out one by one (sign-out on one device); pruned once they expire. */
  revokedSessions?: { jti: string; exp: number }[];
  /** The Terms of Service and Privacy Policy version this person agreed to at sign-up, and when. */
  termsAccepted?: { version: string; at: string };
  /** V42-V43: a mobile number (E.164) for filing requests by text or WhatsApp, once confirmed by a code. */
  phone?: string;
  phoneVerifiedAt?: string;
  /** A number waiting for its code: only a hash of the code. */
  phonePending?: { phone: string; codeHash: string; expiresAt: string; tries: number };
  /** The latest password-reset link: only a hash of its secret. Marked used rather than removed. */
  passwordReset?: { tokenHash: string; expiresAt: string; sessionGen: number; requestedAt: string; usedAt?: string };
}

/**
 * V33: who pays the platform and where their Stripe subscription stands. Kept apart from settings,
 * which approvals are bound to: a renewal must never void an approval.
 */
export interface BillingAccountRecord {
  /** "tenant:<tenantId>" (an enterprise subscriber) or "firm:<clientCompanyId>" (a partner firm). */
  id: string;
  tenantId: string;
  clientCompanyId?: string;
  plan: "enterprise" | "partner";
  customerId?: string;
  subscriptionId?: string;
  /** Stripe's subscription status; "none" before the first checkout. */
  status: "none" | "incomplete" | "incomplete_expired" | "trialing" | "active" | "past_due" | "canceled" | "unpaid" | "paused";
  priceId?: string;
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
  lastPaymentFailedAt?: string;
  /** The Stripe event last applied (seconds), so an older event that arrives late changes nothing. */
  lastEventAt?: number;
  updatedAt: string;
}

/**
 * V40: a filing request a firm emailed in. Nothing is filed from it: the sender gets a link to a form
 * filled in from the email, checks it and sends it like any other. The text and what was read from
 * it are sealed in the database and removed after the retention period, like SSNs.
 */
export interface InboundMessageRecord {
  id: string;
  tenantId: string;
  clientCompanyId: string;
  userId: string;
  channel: "email" | "slack" | "sms" | "whatsapp";
  /** The provider's id for the message (Resend's email_id, Twilio's MessageSid, Slack's trigger): a retried webhook finds it again. */
  providerId: string;
  from: string;
  subject: string;
  text?: string;
  receivedAt: string;
  /** What the web app read from the text: the filing it asks for and form answers per filing kind. */
  extracted?: { kind: string | null; byKind: Record<string, Record<string, string>>; note?: string; at: string };
  filingId?: string;
  purgedAt?: string;
}

/** V26: a link a firm sends one client to fill in one filing (the link itself is a sealed token in the web app). */
export interface IntakeLinkRecord {
  id: string;
  tenantId: string;
  clientCompanyId: string;
  /** The service (web filing kind id). */
  kind: string;
  label?: string;
  createdAt: string;
  createdBy?: string;
  expiresAt?: string;
  revokedAt?: string;
  usedAt?: string;
  filingId?: string;
}

export interface PartnerSignupDetails {
  companyName: string;
  companyType: "cpa" | "payroll" | "cfo" | "title" | "other";
  phone?: string;
  website?: string;
  states?: string[];
  expectedVolume?: string;
}

/** A request from the landing page's enterprise contact form. */
export interface InquiryRecord {
  id: string;
  kind: "enterprise";
  name: string;
  company: string;
  email: string;
  phone?: string;
  states?: string;
  volume?: string;
  message?: string;
  createdAt: string;
  status: "new" | "contacted" | "closed" | "approved" | "declined";
  /** V32: the staff decision, and the subscriber an approval created. */
  decidedAt?: string;
  decidedBy?: string;
  tenantId?: string;
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
  // dashboard users and landing-page inquiries
  createUser(u: UserRecord): Promise<UserRecord>;
  getUser(id: string): Promise<UserRecord | null>;
  findUserByEmail(email: string): Promise<UserRecord | null>;
  /** The user who confirmed this mobile number (E.164). */
  findUserByPhone(phone: string): Promise<UserRecord | null>;
  listUsers(tenantId: string): Promise<UserRecord[]>;
  updateUser(id: string, patch: Partial<UserRecord>): Promise<UserRecord>;
  /** V29: sealed portal logins (settings/db-vault.ts); the store never sees them unsealed. */
  getVaultSecret(key: string): Promise<string | null>;
  putVaultSecret(key: string, tenantId: string, sealed: string): Promise<void>;
  deleteVaultSecret(key: string): Promise<void>;
  createInbound(m: InboundMessageRecord): Promise<InboundMessageRecord>;
  getInbound(id: string): Promise<InboundMessageRecord | null>;
  findInboundByProvider(providerId: string): Promise<InboundMessageRecord | null>;
  updateInbound(id: string, patch: Partial<InboundMessageRecord>): Promise<InboundMessageRecord>;
  /** Messages received before the cutoff that still hold their text. */
  listInboundToPurge(cutoff: string): Promise<InboundMessageRecord[]>;
  getBillingAccount(id: string): Promise<BillingAccountRecord | null>;
  getBillingAccountByCustomer(customerId: string): Promise<BillingAccountRecord | null>;
  putBillingAccount(b: BillingAccountRecord): Promise<BillingAccountRecord>;
  createIntakeLink(l: IntakeLinkRecord): Promise<IntakeLinkRecord>;
  getIntakeLink(id: string): Promise<IntakeLinkRecord | null>;
  listIntakeLinks(clientCompanyId: string): Promise<IntakeLinkRecord[]>;
  updateIntakeLink(id: string, patch: Partial<IntakeLinkRecord>): Promise<IntakeLinkRecord>;
  createInquiry(i: InquiryRecord): Promise<InquiryRecord>;
  getInquiry(id: string): Promise<InquiryRecord | null>;
  updateInquiry(id: string, patch: Partial<InquiryRecord>): Promise<InquiryRecord>;
  listInquiries(): Promise<InquiryRecord[]>;
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
  /** V35: a subscriber's most recent deliveries, newest first. */
  listTenantDeliveries(tenantId: string, limit: number): Promise<WebhookDeliveryRecord[]>;
  // comms (outbound messages)
  createMessage(m: MessageRecord): Promise<MessageRecord>;
  listMessages(filingId?: string): Promise<MessageRecord[]>;
}
