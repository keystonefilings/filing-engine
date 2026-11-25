import { randomUUID } from "node:crypto";
import { wantsPlainCopy } from "../domain/portal-intake.js";
import { FilingRequest, type FilingRequest as FilingRequestT } from "../domain/filing.js";
import { hasErrors, validateFiling, type ValidationIssue } from "../domain/validation.js";
import { checkCompleteness, type CompletenessConfig } from "../domain/completeness.js";
import { assertTransition, type FilingStatus } from "../domain/states.js";
import type { EventType } from "../domain/events.js";
import type { FilingRecord, Store } from "../store/types.js";
import { ApprovalService } from "../approvals/service.js";
import { WebhookDispatcher } from "../webhooks/dispatcher.js";
import { expectedFees, FeeUnknownError, type FeeLine } from "../fees/table.js";
import { paperUploadFees } from "../fees/paper-upload.js";
import { adapterFor, irsEinAdapter } from "../adapters/index.js";
import { preflight, unknownBalanceProvider, type BalanceProvider } from "./preflight.js";
import type { JobQueue } from "./queue.js";
import type { RunExecutor } from "./run.js";
import type { Vault } from "../settings/vault.js";
import type { DriftDecisionInput, DriftReviewService } from "../drift-review/service.js";
import type { NameDecision, NameResolutionService } from "../name-resolution/service.js";
import type { ReviewGateDecision, ReviewGateService } from "../review-gate/service.js";
import type { RegisteredAgentService } from "../registered-agents/service.js";
import type { ResolvedRegisteredAgent } from "../registered-agents/types.js";
import type { Notifier } from "../comms/notifier.js";
import { ConcurrencyLimiter } from "./locks.js";
import { LeaseLost } from "../browser/guard.js";
import { njAccount, moAccount, flAccount } from "../settings/accounts.js";
import { applyPolicies } from "../settings/policies.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { ArtifactStore } from "../artifacts/store.js";
import type { CapturedReview } from "./run.js";
import type { SiteAdapter } from "../adapters/types.js";
import { createHash } from "node:crypto";
import { cardRefsForFiling } from "../payments/card-vault.js";
import { CODE_MIN_LEFT_MS, cardOwnerFor, sameOwner, type CardCodes, type CardOwner } from "../payments/card-codes.js";
import type { PaymentMethodRef } from "../settings/payments.js";

export interface FilingServiceDeps {
  /** Which adapter files a request (tests inject their own); default: the adapter registry. */
  adapterFor?: (req: FilingRequestT) => SiteAdapter | null;
  store: Store;
  approvals: ApprovalService;
  webhooks: WebhookDispatcher;
  queue: JobQueue;
  vault: Vault;
  drift: DriftReviewService;
  nameResolution?: NameResolutionService; // beta: AI name-unavailability flow
  reviewGate?: ReviewGateService;         // beta: stop at the review screen for admin review
  registeredAgents?: RegisteredAgentService; // resolve/procure the registered agent
  notifier?: Notifier; // outbound communication layer (reports back / asks)
  executor?: RunExecutor; // absent on the API tier
  /** V18: the security codes card owners give for stored cards (payments/card-codes.ts). */
  cardCodes?: CardCodes;
  balances?: BalanceProvider;
  limiter?: ConcurrencyLimiter;
  dryRunDefault: boolean;
  /** Clock for pre-flight checks (IRS hours); injectable for tests. */
  now?: () => Date;
  /** This process's worker identity, recorded on the run leases it holds. */
  workerId?: string;
  /** How long a run lease lasts without renewal (renewed every quarter of this). Default 2 minutes. */
  leaseTtlMs?: number;
}

/** Which filings a recovery pass may touch: a service company's own worker passes its tenants. */
export interface RecoveryScope { tenants?: string[] }

export class ValidationFailed extends Error {
  constructor(public readonly issues: ValidationIssue[]) { super("filing failed validation"); }
}

/** Glue between API, approvals, queue, executor and webhooks. One instance per process. */
export class FilingService {
  private readonly limiter: ConcurrencyLimiter;
  constructor(private readonly d: FilingServiceDeps) {
    this.limiter = d.limiter ?? new ConcurrencyLimiter({});
  }

  /**
   * The state's answer to a submitted filing, when it comes later (the NY receipt email, a Florida
   * examiner's review, a rejection). Accepted: documents attached here go on the filing, then
   * filing.accepted and filing.completed (whose email carries them). Rejected: filing.rejected.
   */
  async recordOutcome(filingId: string, input: { outcome: "accepted" | "rejected"; reference?: string; reason?: string; by: string; documents?: { label: string; kind: string; contentType: string; body: Buffer }[] }, artifacts?: ArtifactStore): Promise<FilingRecord> {
    const f = await this.d.store.getFiling(filingId);
    if (!f) throw new OutcomeError(404, "filing not found");
    if (f.status !== "submitted") throw new OutcomeError(409, `the filing is ${f.status}; only a submitted filing takes the state's answer`);
    if (input.outcome === "rejected") {
      const rejected = await this.transition(f, "rejected", { lastError: input.reason ?? "rejected by the state" });
      await this.emit("filing.rejected", rejected, { reason: input.reason, reference: input.reference, recordedBy: input.by });
      return rejected;
    }
    let withDocs = f;
    for (const d of input.documents ?? []) {
      if (!artifacts) throw new OutcomeError(500, "documents can't be stored here");
      const meta = await artifacts.put({ filingId: f.id, kind: d.kind as never, label: d.label, contentType: d.contentType }, d.body);
      withDocs = await this.d.store.updateFiling(f.id, { artifacts: [...withDocs.artifacts, { id: meta.id, kind: d.kind, label: d.label }] });
    }
    const accepted = await this.transition(withDocs, "accepted");
    await this.emit("filing.accepted", accepted, { reference: input.reference, recordedBy: input.by });
    const done = await this.transition(accepted, "completed");
    await this.emit("filing.completed", done, { artifacts: done.artifacts, ein: done.ein, reference: input.reference });
    return done;
  }

  private async emit(type: EventType, filing: FilingRecord, data: Record<string, unknown> = {}, runId?: string) {
    const tenant = await this.d.store.getTenant(filing.tenantId);
    const event = await this.d.webhooks.emit(type, { tenantId: filing.tenantId, filingId: filing.id, runId }, data, tenant?.webhookEndpoints ?? []);
    if (this.d.notifier) await this.d.notifier.notify(event, filing, tenant ?? undefined);
    return event;
  }

  private async transition(filing: FilingRecord, to: FilingStatus, patch: Partial<FilingRecord> = {}): Promise<FilingRecord> {
    assertTransition(filing.status, to);
    return this.d.store.updateFiling(filing.id, { ...patch, status: to });
  }

  feesFor(req: FilingRequestT, tenant: TenantSettings, client: ClientCompanySettings): FeeLine[] {
    if (req.type === "ein_only") return [{ label: "EIN application", amountUsd: 0 }];
    if (req.type === "payroll_registration") return [{ label: `${req.state} payroll / employer registration (no fee)`, amountUsd: 0 }];
    if (req.type === "paper_upload") return paperUploadFees(req);
    return expectedFees(req.state, req.type, {
      // The method the NJ adapters will pick on the account the run signs in with.
      paymentMethod: req.state === "NJ" ? njAccount(tenant, client).feeMethod : req.state === "MO" ? moAccount(tenant, client).feeMethod : req.state === "FL" ? flAccount(tenant, client).feeMethod : undefined,
      certificateOfStanding: req.formation?.additionalCertificates.certificateOfStanding,
      certifiedCopy: req.formation?.additionalCertificates.certifiedCopy,
      plainCopy: wantsPlainCopy(req),
      entityType: req.standing?.entityType,
      floridaEntityType: req.formation?.floridaEntityType,
      nyEntityType: req.formation?.nyEntityType,
    });
  }

  /** POST /v1/filings: validate, store, create the approval, emit awaiting_approval. Idempotent per tenant+key. */
  async createFiling(raw: unknown): Promise<{ filing: FilingRecord; approvalLink?: string; issues: ValidationIssue[]; existing: boolean }> {
    const r0 = (raw ?? {}) as Record<string, unknown>;
    const tenant = typeof r0.tenantId === "string" ? await this.d.store.getTenant(r0.tenantId) : null;
    const client = typeof r0.clientCompanyId === "string" ? await this.d.store.getClientCompany(r0.clientCompanyId) : null;
    if (typeof r0.tenantId === "string" && typeof r0.idempotencyKey === "string") {
      const existing = await this.d.store.findFilingByIdempotency(r0.tenantId, r0.idempotencyKey);
      // V35: the same key with a different request is a mistake to report, not the old filing to return.
      if (existing?.requestFingerprint && existing.requestFingerprint !== requestFingerprint(r0)) {
        throw new IdempotencyConflict(existing.id);
      }
      if (existing) {
        const a = existing.currentApprovalId ? await this.d.store.getApproval(existing.currentApprovalId) : null;
        return { filing: existing, approvalLink: a && a.status === "pending" ? this.d.approvals.linkFor(a) : undefined, issues: [], existing: true };
      }
    }
    if (!tenant) throw new ValidationFailed([{ path: "tenantId", message: "unknown tenant", severity: "error" }]);
    if (!client || client.tenantId !== tenant.tenantId) throw new ValidationFailed([{ path: "clientCompanyId", message: "unknown client company for this tenant", severity: "error" }]);

    // The firm's onboarding answers fill what the filing left out (docs/onboarding/customer-firm.md).
    const applied = applyPolicies(raw, tenant, client);
    const parsed = FilingRequest.safeParse(applied.request);
    if (!parsed.success) {
      throw new ValidationFailed([
        ...applied.issues,
        ...parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message, severity: "error" as const })),
      ]);
    }
    const req = parsed.data;
    if (req.ein && !req.ein.mode) req.ein.mode = client.einMode; // decision 1

    const issues = [...applied.issues, ...validateFiling(req)];
    const now = new Date().toISOString();
    const filing: FilingRecord = {
      id: randomUUID(), tenantId: req.tenantId, clientCompanyId: req.clientCompanyId, idempotencyKey: req.idempotencyKey,
      status: "created", request: req, payloadHash: this.d.approvals.payloadHash(req), createdAt: now, updatedAt: now, artifacts: [],
      appliedPolicies: applied.provenance, requestFingerprint: requestFingerprint(r0),
    };
    await this.d.store.createFiling(filing);
    if (hasErrors(issues)) {
      const f = await this.transition(filing, "invalid", { lastError: issues.filter((i) => i.severity === "error").map((i) => `${i.path}: ${i.message}`).join("; ") });
      await this.emit("filing.invalid", f, { issues });
      return { filing: f, issues, existing: false };
    }
    // Pre-flight completeness: verify the filing has every piece of info it needs before it proceeds.
    const completeness = checkCompleteness(req, this.completenessConfig(tenant, client));
    if (!completeness.complete) {
      const f = await this.transition(filing, "awaiting_information", { lastError: `missing: ${completeness.missing.map((m) => m.label).join(", ")}`, missingInformation: completeness.missing });
      await this.emit("filing.information_required", f, { missing: completeness.missing });
      return { filing: f, issues, existing: false };
    }
    return this.finalizeFiling(filing, tenant, client, issues);
  }

  private completenessConfig(tenant: TenantSettings, client: ClientCompanySettings): CompletenessConfig {
    const t = tenant.completeness ?? { strictOptional: false, overrides: {} };
    const c = client.completeness;
    return { strictOptional: c?.strictOptional ?? t.strictOptional, overrides: { ...t.overrides, ...(c?.overrides ?? {}) } };
  }

  /** Fees + registered-agent resolution + approval. Shared by createFiling and supplyInformation. */
  private async finalizeFiling(filing: FilingRecord, tenant: TenantSettings, client: ClientCompanySettings, issues: ValidationIssue[]): Promise<{ filing: FilingRecord; approvalLink?: string; issues: ValidationIssue[]; existing: boolean }> {
    const req = filing.request;
    let fees: FeeLine[];
    try {
      fees = this.feesFor(req, tenant, client);
    } catch (e) {
      if (!(e instanceof FeeUnknownError)) throw e;
      const f = await this.transition(filing, "invalid", { lastError: e.message });
      await this.emit("filing.invalid", f, { issues: [{ path: "fees", message: e.message, severity: "error" }] });
      return { filing: f, issues: [{ path: "fees", message: e.message, severity: "error" }], existing: false };
    }
    // Resolve the registered agent (formation only). A misconfiguration or an unfulfillable
    // choice is a validation error. The third-party cost is surfaced to the client but kept
    // out of the live-checked state fees (it is not shown on the government filing site).
    let raResolution: ResolvedRegisteredAgent | undefined;
    if (this.d.registeredAgents && req.type === "formation") {
      try {
        raResolution = await this.d.registeredAgents.resolve(req, tenant, client);
      } catch (e) {
        const message = (e as Error).message;
        const invalid = [{ path: "registeredAgent", message, severity: "error" as const }];
        const fi = await this.transition(filing, "invalid", { lastError: message });
        await this.emit("filing.invalid", fi, { issues: invalid });
        return { filing: fi, issues: invalid, existing: false };
      }
      filing = await this.d.store.updateFiling(filing.id, { registeredAgentResolution: raResolution });
    }
    await this.emit("filing.validated", filing, { warnings: issues });
    // Decision 7: where the portal's review screen is mapped, the client approves the state's own
    // review page, taken by a preview run first; the approval link follows when the preview ends.
    if (this.wantsPreview(filing.request, tenant)) {
      const f = await this.startPreview(filing);
      return { filing: f, issues, existing: false };
    }
    const r = await this.requestApproval(filing, tenant, client, fees);
    return { filing: r.filing, approvalLink: r.link, issues, existing: false };
  }

  private adapterOf(req: FilingRequestT): SiteAdapter | null {
    return this.d.adapterFor ? this.d.adapterFor(req) : adapterFor(req);
  }

  /** Decision 7 applies to live filings whose portal has a mapped review screen. */
  private wantsPreview(req: FilingRequestT, tenant: TenantSettings): boolean {
    if ((tenant.approvalPreview ?? "review_page") !== "review_page" || (req.dryRun ?? this.d.dryRunDefault)) return false;
    return !!this.adapterOf(req)?.steps.some((s) => s.reviewScreen);
  }

  /** Queues the preview run (a dry run of a filing in "previewing"; see runLeased). */
  private async startPreview(filing: FilingRecord, reason?: string): Promise<FilingRecord> {
    const f = await this.transition(filing, "previewing");
    await this.emit("filing.previewing", f, reason ? { reason } : {});
    await this.d.queue.enqueue({ kind: "run_filing", filingId: f.id, tenantId: f.tenantId, dryRun: true });
    return f;
  }

  /** Preview again (staff or the subscriber): after a preview failed, was blocked or its drift review is done. */
  async requestPreview(filingId: string): Promise<FilingRecord> {
    const filing = await this.d.store.getFiling(filingId);
    if (!filing) throw new OutcomeError(404, "filing not found");
    if (!["failed", "blocked", "awaiting_drift_review"].includes(filing.status)) throw new OutcomeError(409, `the filing is ${filing.status}; a preview starts from failed, blocked or awaiting_drift_review`);
    return this.startPreview(filing, "preview requested again");
  }

  /**
   * V35: cancel a filing before anything has started at the state. A running or submitted filing
   * can't be cancelled (the portal may already have it); its pending approval stops working.
   */
  async cancelFiling(filingId: string, by: string, reason?: string): Promise<FilingRecord> {
    const f = await this.d.store.getFiling(filingId);
    if (!f) throw new OutcomeError(404, "filing not found");
    const CANCELLABLE = new Set(["created", "invalid", "awaiting_information", "previewing", "awaiting_approval", "changes_requested", "approved", "blocked", "queued", "failed", "awaiting_drift_review", "awaiting_name_resolution", "awaiting_review_gate"]);
    if (!CANCELLABLE.has(f.status)) throw new OutcomeError(409, `the filing is ${f.status} and can't be cancelled`);
    if (f.currentApprovalId) {
      const a = await this.d.store.getApproval(f.currentApprovalId);
      if (a?.status === "pending") await this.d.store.updateApproval(a.id, { status: "superseded" });
    }
    const done = await this.transition(f, "aborted", { lastError: `cancelled by ${by}${reason ? `: ${reason}` : ""}` });
    await this.emit("filing.aborted", done, { cancelledBy: by, reason });
    return done;
  }

  /**
   * V35: a subscriber that collects its client's approval in its own app records it here. It is the
   * same decision as the link (single use, bound to the payload); the caller vouches for the person.
   */
  async decideByApi(filingId: string, decision: "approve" | "request_changes", via: { by: string; comment?: string; code?: string }) {
    const f = await this.d.store.getFiling(filingId);
    if (!f) throw new OutcomeError(404, "filing not found");
    const a = f.currentApprovalId ? await this.d.store.getApproval(f.currentApprovalId) : null;
    if (!a || a.status !== "pending" || f.status !== "awaiting_approval") throw new OutcomeError(409, `the filing is ${f.status}; there is no approval waiting`);
    return this.onApprovalDecision(a.token, decision, { userAgent: `api:${via.by}`, comment: via.comment, code: via.code });
  }

  /** Creates the approval (with the captured review page, if any) and sends the link. */
  private async requestApproval(filing: FilingRecord, tenant: TenantSettings, client: ClientCompanySettings, fees: FeeLine[], extra: { review?: CapturedReview; reason?: string } = {}): Promise<{ filing: FilingRecord; link: string }> {
    const req = filing.request;
    const approval = await this.d.approvals.create(filing, tenant, client, fees, extra.review);
    const f = await this.transition(filing, "awaiting_approval", { currentApprovalId: approval.id });
    const link = this.d.approvals.linkFor(approval);
    const ra = filing.registeredAgentResolution;
    await this.emit("filing.awaiting_approval", f, {
      approvalLink: link, expiresAt: approval.expiresAt, recipients: approval.recipients, fees, feeCapUsd: approval.feeCapUsd,
      einInRun: !!req.ein && req.ein.mode === "in_run",
      registeredAgent: ra ? { source: ra.source, provider: ra.provider, costUsd: ra.costUsd, pending: ra.pendingProcurement ?? false } : undefined,
      ...(extra.review ? { reviewPage: true, reviewShotArtifactId: extra.review.artifactId } : {}),
      ...(extra.reason ? { reason: extra.reason } : {}),
    });
    return { filing: f, link };
  }

  /** Supply missing info for a filing in awaiting_information; re-check and proceed to approval when complete. */
  async supplyInformation(filingId: string, partial: Record<string, unknown>) {
    const filing = await this.d.store.getFiling(filingId);
    if (!filing) return { ok: false as const, reason: "not_found" as const };
    if (filing.status !== "awaiting_information") return { ok: false as const, reason: "not_awaiting_information" as const };
    const tenant = await this.d.store.getTenant(filing.tenantId);
    const client = await this.d.store.getClientCompany(filing.clientCompanyId);
    if (!tenant || !client) return { ok: false as const, reason: "not_found" as const };
    const merged = deepMerge(filing.request as unknown as Record<string, unknown>, partial);
    const applied = applyPolicies({ ...merged, tenantId: filing.tenantId, clientCompanyId: filing.clientCompanyId }, tenant, client);
    const parsed = FilingRequest.safeParse(applied.request);
    if (!parsed.success) {
      return { ok: false as const, reason: "invalid" as const, issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message, severity: "error" as const })) };
    }
    const req = parsed.data;
    if (req.ein && !req.ein.mode) req.ein.mode = client.einMode;
    const issues = [...applied.issues, ...validateFiling(req)];
    const updated = await this.d.store.updateFiling(filing.id, { request: req, payloadHash: this.d.approvals.payloadHash(req), appliedPolicies: applied.provenance });
    if (hasErrors(issues)) {
      const f = await this.transition(updated, "invalid", { lastError: issues.filter((i) => i.severity === "error").map((i) => `${i.path}: ${i.message}`).join("; ") });
      await this.emit("filing.invalid", f, { issues });
      return { ok: false as const, reason: "invalid" as const, issues };
    }
    const completeness = checkCompleteness(req, this.completenessConfig(tenant, client));
    if (!completeness.complete) {
      const still = await this.d.store.updateFiling(updated.id, { missingInformation: completeness.missing, lastError: `missing: ${completeness.missing.map((m) => m.label).join(", ")}` });
      await this.emit("filing.information_required", still, { missing: completeness.missing });
      return { ok: true as const, complete: false as const, missing: completeness.missing };
    }
    const result = await this.finalizeFiling(await this.d.store.updateFiling(updated.id, { missingInformation: [], lastError: undefined }), tenant, client, issues);
    return { ok: true as const, complete: true as const, filing: result.filing, approvalLink: result.approvalLink };
  }

  /** Link decision (decision 2). Approve -> queued for a run; request changes -> back to the caller. */
  async onApprovalDecision(token: string, decision: "approve" | "request_changes", via: { ip?: string; userAgent?: string; comment?: string; code?: string }) {
    const result = await this.d.approvals.decide(token, decision, via);
    if (!result.ok) return result;
    const filing = await this.d.store.getFiling(result.approval.filingId);
    if (!filing) return { ok: false as const, reason: "not_found" as const };
    if (decision === "approve") {
      const f = await this.transition(filing, "approved");
      await this.emit("filing.approved", f, { approvalId: result.approval.id, decidedAt: result.approval.decidedAt });
      await this.enqueueRun(f.id);
    } else {
      const f = await this.transition(filing, "changes_requested", { lastError: via.comment });
      await this.emit("filing.changes_requested", f, { comment: via.comment });
    }
    return result;
  }

  /** The card that pays this filing when its owner hasn't given its security code for the hour. */
  private async cardCodeNeeded(filing: FilingRecord, tenant: TenantSettings, client: ClientCompanySettings, fees: FeeLine[]): Promise<{ owner: CardOwner; card: PaymentMethodRef } | null> {
    const codes = this.d.cardCodes;
    // Only a worker that can read stored cards pays with one.
    if (!codes || !this.d.executor?.readsStoredCards || fees.reduce((s, f) => s + f.amountUsd, 0) <= 0) return null;
    const card = cardRefsForFiling(filing, tenant, client).find((r) => r.provider === "basis_theory");
    if (!card) return null;
    const owner = cardOwnerFor(tenant, client);
    return (await codes.fresh(owner, card.id, CODE_MIN_LEFT_MS)) ? null : { owner, card };
  }

  private async waitForCardCode(filing: FilingRecord, tenant: TenantSettings, client: ClientCompanySettings, need: { owner: CardOwner; card: PaymentMethodRef }) {
    const { owner, card } = need;
    const already = (await this.d.store.listFilingsByStatus(["blocked"], [filing.tenantId]))
      .some((f) => f.id !== filing.id && f.awaitingCardCode?.methodId === card.id && sameOwner(f.awaitingCardCode.owner, owner));
    const named = `${card.label}${card.last4 ? ` ending ${card.last4}` : ""}`;
    const f = await this.transition(filing, "blocked", {
      lastError: `waiting for the security code of ${named}`,
      awaitingCardCode: { methodId: card.id, label: card.label, last4: card.last4, owner, since: new Date().toISOString() },
    });
    // One email per card while filings wait on it; the dashboard lists every waiting filing.
    const recipients = already ? [] : await this.cardOwnerRecipients(owner, tenant, client);
    const slug = owner.clientCompanyId && client.portal?.slug && client.partner ? client.portal.slug : undefined;
    await this.emit("filing.card_code_needed", f, {
      methodId: card.id, card: named, owner: owner.clientCompanyId ? "firm" : "subscriber", recipients,
      webPath: slug ? `/p/${encodeURIComponent(slug)}/pay` : "/dashboard/pay",
    });
  }

  /** Who can type a card's code: the firm's own users (and its contact), else the subscriber's staff. */
  private async cardOwnerRecipients(owner: CardOwner, tenant: TenantSettings, client: ClientCompanySettings) {
    const users = (await this.d.store.listUsers(owner.tenantId)).filter((u) => u.status === "active");
    const firmUsers = owner.clientCompanyId ? users.filter((u) => u.clientCompanyId === owner.clientCompanyId) : [];
    let list = firmUsers.map((u) => ({ channel: "email", address: u.email, name: u.name }));
    if (owner.clientCompanyId && client.partner?.contactEmail) list.push({ channel: "email", address: client.partner.contactEmail, name: client.partner.contactName ?? "" });
    if (!list.length) list = users.filter((u) => u.kind === "enterprise").map((u) => ({ channel: "email", address: u.email, name: u.name }));
    if (!list.length) list = tenant.adminChannels.map((c) => ({ channel: c.channel, address: c.address, name: c.name ?? "" }));
    return list.filter((r, i) => list.findIndex((o) => o.address.toLowerCase() === r.address.toLowerCase()) === i);
  }

  /**
   * V18: the card's owner gave its security code (a Basis Theory token id that expires within the
   * hour). Every filing waiting for that card goes back in the queue at once.
   */
  async supplyCardCode(owner: CardOwner, methodId: string, tokenId: string, expiresAt?: string, by?: string): Promise<{ expiresAt: string; queued: string[] }> {
    if (!this.d.cardCodes) throw new Error("no card code store");
    const exp = await this.d.cardCodes.put(owner, methodId, tokenId, expiresAt, by);
    const waiting = await this.filingsAwaitingCardCode(owner, methodId);
    const queued: string[] = [];
    for (const f of waiting) {
      await this.d.store.updateFiling(f.id, { awaitingCardCode: undefined, lastError: undefined });
      await this.enqueueRun(f.id);
      queued.push(f.id);
    }
    return { expiresAt: exp, queued };
  }

  /** Filings approved and waiting for a card's code; with no owner, every one in the tenant. */
  async filingsAwaitingCardCode(owner: CardOwner, methodId?: string, opts: { anyOwner?: boolean } = {}): Promise<FilingRecord[]> {
    return (await this.d.store.listFilingsByStatus(["blocked"], [owner.tenantId]))
      .filter((f) => f.awaitingCardCode && (opts.anyOwner || sameOwner(f.awaitingCardCode.owner, owner)) && (!methodId || f.awaitingCardCode.methodId === methodId));
  }

  async enqueueRun(filingId: string): Promise<void> {
    const filing = await this.d.store.getFiling(filingId);
    if (!filing) throw new Error("filing not found");
    const f = await this.transition(filing, "queued");
    await this.d.queue.enqueue({ kind: "run_filing", filingId: f.id, tenantId: f.tenantId });
  }

  /**
   * Dry run from any pre-approval state: executes to the last screen and stops before the
   * irreversible click. Preview mode rides on the queued job; the approved request is untouched.
   */
  async enqueueDryRun(filingId: string): Promise<void> {
    const filing = await this.d.store.getFiling(filingId);
    if (!filing) throw new Error("filing not found");
    await this.d.queue.enqueue({ kind: "run_filing", filingId: filing.id, tenantId: filing.tenantId, dryRun: true });
  }

  private get leaseTtlMs(): number { return this.d.leaseTtlMs ?? 120_000; }
  private get workerId(): string { return this.d.workerId ?? `worker-${process.pid}`; }

  /**
   * Worker entry point. Holds the filing's run lease for the whole pass (renewed in the
   * background) so no other worker's recovery touches it while this one is alive.
   * opts.dryRun (from the job) can only force a preview, never make a run live.
   */
  async runFiling(filingId: string, opts: { dryRun?: boolean } = {}): Promise<void> {
    if (!this.d.executor) throw new Error("this process has no executor (API tier)");
    const store = this.d.store;
    const token = await store.acquireRunLease(filingId, this.workerId, this.leaseTtlMs);
    if (!token) {
      const f = await store.getFiling(filingId);
      if (f) await this.emit("filing.blocked", f, { blockers: ["another worker holds this filing's run lease; run request ignored"] });
      return;
    }
    let lost = false;
    const renew = async () => {
      if (lost) return false;
      const ok = await store.renewRunLease(filingId, token, this.leaseTtlMs).catch(() => false);
      if (!ok) lost = true;
      return ok;
    };
    const timer = setInterval(() => void renew(), Math.max(1_000, Math.floor(this.leaseTtlMs / 4)));
    timer.unref?.();
    const assertLease = async () => { if (!(await renew())) throw new LeaseLost(filingId); };
    try {
      await this.runLeased(filingId, opts, assertLease);
    } finally {
      clearInterval(timer);
      await store.releaseRunLease(filingId, token).catch(() => {});
    }
  }

  private async runLeased(filingId: string, opts: { dryRun?: boolean }, assertLease: () => Promise<void>): Promise<void> {
    const store = this.d.store;
    const executor = this.d.executor!;
    const filing = await store.getFiling(filingId);
    if (!filing) return;
    const dryRequested = opts.dryRun === true || (filing.request.dryRun ?? this.d.dryRunDefault);
    // Only a queued filing runs for real. A dry run may start from any pre-submission state,
    // but never over a run in progress or a filing that may already be at the state.
    const NEVER = new Set(["running", "needs_reconciliation", "ein_filed", "submitted", "accepted", "completed", "aborted"]);
    if (NEVER.has(filing.status) || (!dryRequested && filing.status !== "queued")) {
      await this.emit("filing.blocked", filing, { blockers: [`filing is ${filing.status}; run request ignored`] });
      return;
    }
    const tenant = await store.getTenant(filing.tenantId);
    const client = await store.getClientCompany(filing.clientCompanyId);
    if (!tenant || !client) return;
    const approval = filing.currentApprovalId ? await store.getApproval(filing.currentApprovalId) : null;
    const dryRun = dryRequested;
    const adapter = this.adapterOf(filing.request);
    const priorStatus = filing.status;
    // A dry run of a filing in "previewing" is the decision-7 preview: it captures the review page.
    const preview = dryRun && filing.status === "previewing";

    const pf = await preflight({
      filing, approval, tenant, client, adapter, einAdapter: irsEinAdapter, approvals: this.d.approvals, vault: this.d.vault,
      balances: this.d.balances ?? unknownBalanceProvider, dryRun, now: this.d.now?.(),
    });
    if (!pf.ok || !adapter) {
      const f = filing.status === "queued" || filing.status === "approved" ? await this.transition(filing, "blocked", { lastError: pf.blockers.join("; ") }) : await store.updateFiling(filing.id, { lastError: pf.blockers.join("; ") });
      await this.emit("filing.blocked", f, { blockers: pf.blockers, warnings: pf.warnings, dryRun });
      return;
    }

    // V18: a checkout that takes a stored card needs its security code, given by the card's owner.
    if (!dryRun && adapter.paysWithCard) {
      const need = await this.cardCodeNeeded(filing, tenant, client, approval?.fees ?? []);
      if (need) { await this.waitForCardCode(filing, tenant, client, need); return; }
    }

    const releaseSite = await this.limiter.acquire(`site:${adapter.site}`);
    const accountKey = adapter.profileKey({ filing, client, tenant });
    const releaseAccount = accountKey ? await this.limiter.acquire(`account:${accountKey}`) : () => {};
    try {
      const running = filing.status === "queued" ? await this.transition(filing, "running") : await store.updateFiling(filing.id, { status: "running" });
      await this.emit("filing.started", running, { dryRun, site: adapter.site, warnings: pf.warnings });
      const fees = (() => { try { return this.feesFor(filing.request, tenant, client); } catch { return []; } })();
      const outcome = await executor.execute({
        filing: running, approval, tenant, client, adapter, einAdapter: irsEinAdapter, dryRun, expectedFees: approval?.fees ?? fees,
        reviewGateApproved: !!running.reviewGate, assertLease,
        previewCapture: preview,
        approvedReview: !dryRun && approval?.review ? { screenKey: approval.review.screenKey, fingerprint: approval.review.fingerprint } : undefined,
      });
      const latest = (await store.getFiling(filing.id))!;
      switch (outcome.kind) {
        case "submitted": {
          const f = await this.transition(latest, "submitted", { currentRunId: outcome.run.id, ein: outcome.ein ?? latest.ein });
          if (outcome.ein) await this.emit("filing.ein_filed", f, { ein: outcome.ein }, outcome.run.id);
          await this.emit("filing.submitted", f, { site: adapter.site, artifacts: f.artifacts }, outcome.run.id);
          // NJ returns documents at once and the IRS assigns the EIN on the spot; NY waits for the
          // receipt email (inbox module, build order 3).
          if (adapter.site === "NJ" || adapter.site === "IRS") {
            const accepted = await this.transition(f, "accepted");
            await this.emit("filing.accepted", accepted, { site: adapter.site, ein: accepted.ein }, outcome.run.id);
            const done = await this.transition(accepted, "completed");
            await this.emit("filing.completed", done, { artifacts: done.artifacts, ein: done.ein }, outcome.run.id);
          }
          break;
        }
        case "dry_run_stop": {
          // Dry runs leave the filing where it was; the run record carries the evidence.
          const f = await store.updateFiling(latest.id, { status: dryRunReturnStatus(priorStatus), currentRunId: outcome.run.id, lastError: undefined });
          await this.emit("filing.step", f, {
            dryRun: true, stoppedBefore: outcome.stoppedBefore, steps: outcome.run.steps.length,
            ...(outcome.einPlaceholder ? { einPlaceholder: true } : { ein: outcome.ein }),
          }, outcome.run.id);
          if (preview) {
            // The preview's end is the approval's start: with the review page when it was reached,
            // or with the data alone when the run stopped before it.
            await this.requestApproval(f, tenant, client, fees, outcome.review
              ? { review: outcome.review }
              : { reason: "the state's review page could not be captured; approve the data shown" });
          }
          break;
        }
        case "review_mismatch": {
          // Nothing was paid or submitted. The client approves the page the state shows now.
          const blocked = await this.transition(latest, "blocked", { currentRunId: outcome.run.id, lastError: "the state's review page changed since it was approved; a new preview and approval are on the way" });
          await this.emit("filing.blocked", blocked, { blockers: [blocked.lastError!], screenKey: outcome.screenKey }, outcome.run.id);
          await this.startPreview(blocked, "the state's review page changed since approval");
          break;
        }
        case "drift_halt": {
          const f = await this.transition(latest, "awaiting_drift_review", { currentRunId: outcome.run.id, lastError: outcome.run.error });
          await this.emit("filing.drift_halted", f, { haltId: outcome.haltId, requiresClientReapproval: outcome.requiresClientReapproval }, outcome.run.id);
          break;
        }
        case "name_unavailable": {
          // A dry run previews only; name resolution runs for real runs.
          if (!dryRun && this.d.nameResolution && (tenant.nameResolution?.enabled ?? true) && latest.request.formation) {
            const rec = await this.d.nameResolution.open({
              filing: latest, site: outcome.site, state: latest.request.state,
              requested: { baseName: outcome.requestedName.baseName, designator: outcome.requestedName.designator },
              purpose: outcome.purpose, runId: outcome.run.id,
            });
            const f = await this.transition(latest, "awaiting_name_resolution", { currentRunId: outcome.run.id, lastError: `name unavailable: ${outcome.requestedName.name}` });
            await this.emit("filing.name_unavailable", f, { requestedName: outcome.requestedName.name, site: outcome.site }, outcome.run.id);
            await this.emit("filing.name_options_ready", f, {
              resolutionId: rec.id, adminLink: this.d.nameResolution.linkFor(rec),
              options: rec.options.map((o) => ({ name: o.name, available: o.available })),
              availabilityVerified: rec.availabilityVerified, recipients: tenant.adminChannels,
            }, outcome.run.id);
          } else {
            const err = outcome.run.error ?? `name unavailable: ${outcome.requestedName.name}`;
            const f = await this.transition(latest, "failed", { currentRunId: outcome.run.id, lastError: err });
            await this.emit("filing.failed", f, { stage: "name_unavailable", error: err }, outcome.run.id);
          }
          break;
        }
        case "review_gate": {
          const f = await this.transition(latest, "awaiting_review_gate", { currentRunId: outcome.run.id });
          const rec = this.d.reviewGate ? await this.d.store.getReviewGate(outcome.recordId) : null;
          await this.emit("filing.review_gate", f, {
            reviewGateId: outcome.recordId, screenKey: outcome.screenKey,
            screenshotArtifactId: rec?.screenshotArtifactId,
            adminLink: rec && this.d.reviewGate ? this.d.reviewGate.linkFor(rec) : undefined,
            recipients: tenant.adminChannels,
          }, outcome.run.id);
          break;
        }
        case "needs_reconciliation": {
          const f = await this.transition(latest, "needs_reconciliation", { currentRunId: outcome.run.id, lastError: outcome.error });
          await this.emit("filing.needs_reconciliation", f, { error: outcome.error }, outcome.run.id);
          break;
        }
        case "failed": {
          const f = await this.transition(latest, "failed", { currentRunId: outcome.run.id, lastError: outcome.error });
          await this.emit("filing.failed", f, { stage: outcome.stage, error: outcome.error, dryRun }, outcome.run.id);
          break;
        }
      }
    } finally {
      releaseAccount();
      releaseSite();
    }
  }

  /** Decision 6: reviewer accepts/corrects/rejects; accepted mapping re-queues the run from the first screen, or sends the filing back for client re-approval when a new required field appeared. */
  async onDriftDecision(haltId: string, input: DriftDecisionInput) {
    const halt = await this.d.drift.decide(haltId, input);
    const filing = await this.d.store.getFiling(halt.filingId);
    if (!filing) return halt;
    if (halt.status === "rejected") {
      const f = await this.transition(filing, "aborted", { lastError: `drift review rejected: ${(input as { reason?: string }).reason ?? ""}` });
      await this.emit("filing.aborted", f, { haltId });
      return halt;
    }
    await this.emit("filing.drift_resolved", filing, { haltId, status: halt.status, requiresClientReapproval: halt.requiresClientReapproval });
    if (filing.status !== "awaiting_drift_review") return halt; // dry run or already moved on
    const tenantNow = await this.d.store.getTenant(filing.tenantId);
    const approvalNow = filing.currentApprovalId ? await this.d.store.getApproval(filing.currentApprovalId) : null;
    // Halted during a preview (nothing approved yet), or the client must approve again where the
    // review page is what they approve: take a new preview first.
    if (tenantNow && this.wantsPreview(filing.request, tenantNow) && (approvalNow?.status !== "approved" || halt.requiresClientReapproval)) {
      await this.startPreview(filing, halt.requiresClientReapproval ? "form changed: new required field" : "site change reviewed");
      return halt;
    }
    if (halt.requiresClientReapproval) {
      const tenant = (await this.d.store.getTenant(filing.tenantId))!;
      const client = (await this.d.store.getClientCompany(filing.clientCompanyId))!;
      const approval = await this.d.approvals.create(filing, tenant, client, this.feesFor(filing.request, tenant, client));
      const f = await this.transition(filing, "awaiting_approval", { currentApprovalId: approval.id });
      await this.emit("filing.awaiting_approval", f, { approvalLink: this.d.approvals.linkFor(approval), reason: "form changed: new required field", expiresAt: approval.expiresAt });
    } else {
      const f = await this.transition(filing, "queued");
      await this.d.queue.enqueue({ kind: "run_filing", filingId: f.id, tenantId: f.tenantId });
    }
    return halt;
  }

  /**
   * Beta name-resolution decision. A pick (or a verified custom name) applies the new name,
   * re-authorizes the filing as the admin (fees unchanged; the client never re-approves)
   * and re-queues the run. An abort ends the filing. Regenerate / still-unavailable just
   * refresh the options.
   */
  async onNameResolutionDecision(token: string, decision: NameDecision) {
    if (!this.d.nameResolution) return { ok: false as const, reason: "not_found" as const };
    const result = await this.d.nameResolution.decide(token, decision);
    if (!result.ok) return result;
    const rec = result.record;
    const filing = await this.d.store.getFiling(rec.filingId);
    if (!filing) return { ok: false as const, reason: "not_found" as const };

    if (result.outcome === "resolved" && rec.chosen) {
      const tenant = (await this.d.store.getTenant(filing.tenantId))!;
      const client = (await this.d.store.getClientCompany(filing.clientCompanyId))!;
      const req = JSON.parse(JSON.stringify(filing.request)) as typeof filing.request;
      if (req.formation) { req.formation.name.baseName = rec.chosen.baseName; req.formation.name.designator = rec.chosen.designator; }
      const updated = await this.d.store.updateFiling(filing.id, { request: req, payloadHash: this.d.approvals.payloadHash(req) });
      const prior = filing.currentApprovalId ? await this.d.store.getApproval(filing.currentApprovalId) : null;
      if (prior?.status !== "approved") {
        // Halted during the decision-7 preview: the client hasn't approved anything yet, so an admin
        // can't approve for them. The new name goes through a new preview and the client's approval.
        const reloaded = (await this.d.store.getFiling(filing.id))!;
        if (reloaded.status === "awaiting_name_resolution") {
          await this.emit("filing.name_resolved", reloaded, { resolutionId: rec.id, chosenName: rec.chosen.name, by: rec.decidedBy });
          if (this.wantsPreview(reloaded.request, tenant)) await this.startPreview(reloaded, `name changed to ${rec.chosen.name}`);
          else await this.requestApproval(reloaded, tenant, client, this.feesFor(req, tenant, client), { reason: `name changed to ${rec.chosen.name}` });
        }
        return result;
      }
      let fees: FeeLine[];
      try { fees = this.feesFor(req, tenant, client); }
      catch { fees = prior?.fees ?? []; }
      await this.d.approvals.adminReauthorize(updated, tenant, client, fees, rec.decidedBy ?? "admin");
      const reloaded = (await this.d.store.getFiling(filing.id))!;
      if (reloaded.status === "awaiting_name_resolution") {
        const q = await this.transition(reloaded, "queued");
        await this.emit("filing.name_resolved", q, { resolutionId: rec.id, chosenName: rec.chosen.name, by: rec.decidedBy });
        await this.d.queue.enqueue({ kind: "run_filing", filingId: q.id, tenantId: q.tenantId });
      }
    } else if (result.outcome === "aborted") {
      if (filing.status === "awaiting_name_resolution") {
        const f = await this.transition(filing, "aborted", { lastError: `name resolution aborted: ${rec.reason ?? ""}` });
        await this.emit("filing.aborted", f, { resolutionId: rec.id, reason: rec.reason });
      }
    } else {
      await this.emit("filing.name_options_ready", filing, {
        resolutionId: rec.id, adminLink: this.d.nameResolution.linkFor(rec),
        options: rec.options.map((o) => ({ name: o.name, available: o.available })),
        availabilityVerified: rec.availabilityVerified, outcome: result.outcome,
      });
    }
    return result;
  }

  /**
   * Beta review-gate decision. Approve marks the gate passed and re-queues the run (it then
   * goes straight through to submission); reject aborts the filing. Nothing was submitted.
   */
  async onReviewGateDecision(token: string, decision: ReviewGateDecision) {
    if (!this.d.reviewGate) return { ok: false as const, reason: "not_found" as const };
    const result = await this.d.reviewGate.decide(token, decision);
    if (!result.ok) return result;
    const rec = result.record;
    const filing = await this.d.store.getFiling(rec.filingId);
    if (!filing) return { ok: false as const, reason: "not_found" as const };
    if (result.outcome === "approved") {
      if (filing.status === "awaiting_review_gate") {
        const marked = await this.d.store.updateFiling(filing.id, {
          reviewGate: { approvedAt: rec.decidedAt ?? new Date().toISOString(), approvedBy: rec.decidedBy ?? "admin", recordId: rec.id },
        });
        const q = await this.transition(marked, "queued");
        await this.emit("filing.review_gate_resolved", q, { reviewGateId: rec.id, status: "approved", by: rec.decidedBy });
        await this.d.queue.enqueue({ kind: "run_filing", filingId: q.id, tenantId: q.tenantId });
      }
    } else if (filing.status === "awaiting_review_gate") {
      const f = await this.transition(filing, "aborted", { lastError: `review gate rejected: ${rec.reason ?? ""}` });
      await this.emit("filing.aborted", f, { reviewGateId: rec.id, reason: rec.reason });
    }
    return result;
  }

  /**
   * Periodically on each worker, after reconcileOpenIntents: a filing still "running" whose run
   * lease lapsed lost its worker (a live worker renews its lease, so its runs are never touched).
   * With no open submit intent nothing reached the state (no drafts exist), so it is marked
   * failed and reported; a person re-queues it. Nothing is re-run automatically.
   */
  async recoverInterruptedRuns(scope: RecoveryScope = {}): Promise<string[]> {
    const out: string[] = [];
    for (const f of await this.d.store.listFilingsByStatus(["running", "ein_filed"], scope.tenants)) {
      if (await this.d.store.hasLiveRunLease(f.id)) continue; // its worker is still alive
      const fresh = await this.d.store.getFiling(f.id);
      if (!fresh || (fresh.status !== "running" && fresh.status !== "ein_filed")) continue; // settled meanwhile
      const f2 = await this.d.store.updateFiling(f.id, {
        status: f.status === "ein_filed" ? "needs_reconciliation" : "failed",
        lastError: f.status === "ein_filed"
          ? "worker stopped after the EIN was issued and before the state filing; reconcile by hand"
          : "worker stopped mid-run before any submission; safe to re-queue",
      });
      await this.emit(f2.status === "failed" ? "filing.failed" : "filing.needs_reconciliation", f2, { stage: "worker_restart", error: f2.lastError });
      out.push(f.id);
    }
    return out;
  }

  /**
   * Periodically on each worker: a submit intent without an outcome whose run lease lapsed is a
   * possible double-submit. Never re-run; flag it. An intent under a live lease belongs to a
   * worker that is between the click and reading the confirmation, and is left alone.
   */
  async reconcileOpenIntents(scope: RecoveryScope = {}): Promise<string[]> {
    const flagged: string[] = [];
    for (const intent of await this.d.store.listOpenSubmitIntents()) {
      const filing = await this.d.store.getFiling(intent.filingId);
      if (!filing || filing.status === "needs_reconciliation") continue;
      if (scope.tenants?.length && !scope.tenants.includes(filing.tenantId)) continue;
      if (await this.d.store.hasLiveRunLease(filing.id)) continue;
      const f = await this.d.store.updateFiling(filing.id, { status: "needs_reconciliation", lastError: `submit intent ${intent.id} has no recorded outcome` });
      await this.emit("filing.needs_reconciliation", f, { submitIntentId: intent.id, site: intent.site });
      flagged.push(filing.id);
    }
    return flagged;
  }
}

function dryRunReturnStatus(prior: FilingStatus): FilingStatus {
  return prior === "running" || prior === "queued" ? "approved" : prior;
}

/** Deep-merges supplied info into a request: nested objects merge, arrays/scalars replace. */
function deepMerge(base: Record<string, unknown>, patch: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    const existing = out[k];
    out[k] = v && typeof v === "object" && !Array.isArray(v) && existing && typeof existing === "object" && !Array.isArray(existing)
      ? deepMerge(existing as Record<string, unknown>, v as Record<string, unknown>)
      : v;
  }
  return out;
}

export class IdempotencyConflict extends Error {
  constructor(readonly filingId: string) { super("this idempotency key was already used for a different request"); }
}

/** A stable hash of a submitted request (key order ignored), to tell a retry from a different request. */
export function requestFingerprint(raw: Record<string, unknown>): string {
  const stable = (v: unknown): unknown => Array.isArray(v) ? v.map(stable)
    : v && typeof v === "object" ? Object.fromEntries(Object.keys(v as object).sort().map((k) => [k, stable((v as Record<string, unknown>)[k])])) : v;
  const { idempotencyKey: _k, ...rest } = raw;
  return createHash("sha256").update(JSON.stringify(stable(rest))).digest("hex");
}

export class OutcomeError extends Error {
  constructor(readonly status: number, message: string) { super(message); }
}
