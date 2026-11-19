import { randomUUID } from "node:crypto";
import { FilingRequest, type FilingRequest as FilingRequestT } from "../domain/filing.js";
import { hasErrors, validateFiling, type ValidationIssue } from "../domain/validation.js";
import { assertTransition, type FilingStatus } from "../domain/states.js";
import type { EventType } from "../domain/events.js";
import type { FilingRecord, Store } from "../store/types.js";
import { ApprovalService } from "../approvals/service.js";
import { WebhookDispatcher } from "../webhooks/dispatcher.js";
import { expectedFees, FeeUnknownError, type FeeLine } from "../fees/table.js";
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
import { ConcurrencyLimiter } from "./locks.js";
import { njAccount, moAccount, flAccount } from "../settings/accounts.js";
import { applyPolicies } from "../settings/policies.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";

export interface FilingServiceDeps {
  store: Store;
  approvals: ApprovalService;
  webhooks: WebhookDispatcher;
  queue: JobQueue;
  vault: Vault;
  drift: DriftReviewService;
  nameResolution?: NameResolutionService; // beta: AI name-unavailability flow
  reviewGate?: ReviewGateService;         // beta: stop at the review screen for admin review
  registeredAgents?: RegisteredAgentService; // resolve/procure the registered agent
  executor?: RunExecutor; // absent on the API tier
  balances?: BalanceProvider;
  limiter?: ConcurrencyLimiter;
  dryRunDefault: boolean;
}

export class ValidationFailed extends Error {
  constructor(public readonly issues: ValidationIssue[]) { super("filing failed validation"); }
}

/** Glue between API, approvals, queue, executor and webhooks. One instance per process. */
export class FilingService {
  private readonly limiter: ConcurrencyLimiter;
  constructor(private readonly d: FilingServiceDeps) {
    this.limiter = d.limiter ?? new ConcurrencyLimiter({});
  }

  private async emit(type: EventType, filing: FilingRecord, data: Record<string, unknown> = {}, runId?: string) {
    const tenant = await this.d.store.getTenant(filing.tenantId);
    return this.d.webhooks.emit(type, { tenantId: filing.tenantId, filingId: filing.id, runId }, data, tenant?.webhookEndpoints ?? []);
  }

  private async transition(filing: FilingRecord, to: FilingStatus, patch: Partial<FilingRecord> = {}): Promise<FilingRecord> {
    assertTransition(filing.status, to);
    return this.d.store.updateFiling(filing.id, { ...patch, status: to });
  }

  feesFor(req: FilingRequestT, tenant: TenantSettings, client: ClientCompanySettings): FeeLine[] {
    if (req.type === "ein_only") return [{ label: "EIN application", amountUsd: 0 }];
    if (req.type === "payroll_registration") return [{ label: `${req.state} payroll / employer registration (no fee)`, amountUsd: 0 }];
    return expectedFees(req.state, req.type, {
      // The method the NJ adapters will pick on the account the run signs in with.
      paymentMethod: req.state === "NJ" ? njAccount(tenant, client).feeMethod : req.state === "MO" ? moAccount(tenant, client).feeMethod : req.state === "FL" ? flAccount(tenant, client).feeMethod : undefined,
      certificateOfStanding: req.formation?.additionalCertificates.certificateOfStanding,
      certifiedCopy: req.formation?.additionalCertificates.certifiedCopy,
      entityType: req.standing?.entityType,
      floridaEntityType: req.formation?.floridaEntityType,
    });
  }

  /** POST /v1/filings: validate, store, create the approval, emit awaiting_approval. Idempotent per tenant+key. */
  async createFiling(raw: unknown): Promise<{ filing: FilingRecord; approvalLink?: string; issues: ValidationIssue[]; existing: boolean }> {
    const r0 = (raw ?? {}) as Record<string, unknown>;
    const tenant = typeof r0.tenantId === "string" ? await this.d.store.getTenant(r0.tenantId) : null;
    const client = typeof r0.clientCompanyId === "string" ? await this.d.store.getClientCompany(r0.clientCompanyId) : null;
    if (typeof r0.tenantId === "string" && typeof r0.idempotencyKey === "string") {
      const existing = await this.d.store.findFilingByIdempotency(r0.tenantId, r0.idempotencyKey);
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
      appliedPolicies: applied.provenance,
    };
    await this.d.store.createFiling(filing);
    if (hasErrors(issues)) {
      const f = await this.transition(filing, "invalid", { lastError: issues.filter((i) => i.severity === "error").map((i) => `${i.path}: ${i.message}`).join("; ") });
      await this.emit("filing.invalid", f, { issues });
      return { filing: f, issues, existing: false };
    }
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
      await this.d.store.updateFiling(filing.id, { registeredAgentResolution: raResolution });
    }
    await this.emit("filing.validated", filing, { warnings: issues });
    const approval = await this.d.approvals.create(filing, tenant, client, fees);
    const f = await this.transition(filing, "awaiting_approval", { currentApprovalId: approval.id });
    const link = this.d.approvals.linkFor(approval);
    await this.emit("filing.awaiting_approval", f, {
      approvalLink: link, expiresAt: approval.expiresAt, recipients: approval.recipients, fees, feeCapUsd: approval.feeCapUsd,
      einInRun: !!req.ein && req.ein.mode === "in_run",
      registeredAgent: raResolution ? { source: raResolution.source, provider: raResolution.provider, costUsd: raResolution.costUsd, pending: raResolution.pendingProcurement ?? false } : undefined,
    });
    return { filing: f, approvalLink: link, issues, existing: false };
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

  async enqueueRun(filingId: string): Promise<void> {
    const filing = await this.d.store.getFiling(filingId);
    if (!filing) throw new Error("filing not found");
    const f = await this.transition(filing, "queued");
    await this.d.queue.enqueue({ kind: "run_filing", filingId: f.id, tenantId: f.tenantId });
  }

  /** Dry run from any pre-approval state: executes to the last screen and stops before the irreversible click. */
  async enqueueDryRun(filingId: string): Promise<void> {
    const filing = await this.d.store.getFiling(filingId);
    if (!filing) throw new Error("filing not found");
    await this.d.store.updateFiling(filing.id, { request: { ...filing.request, dryRun: true } });
    await this.d.queue.enqueue({ kind: "run_filing", filingId: filing.id, tenantId: filing.tenantId });
  }

  /** Worker entry point. Pre-flight, then one browser pass, then webhooks for the outcome. */
  async runFiling(filingId: string): Promise<void> {
    if (!this.d.executor) throw new Error("this process has no executor (API tier)");
    const store = this.d.store;
    const filing = await store.getFiling(filingId);
    if (!filing) return;
    const dryRequested = filing.request.dryRun ?? this.d.dryRunDefault;
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
    const dryRun = filing.request.dryRun ?? this.d.dryRunDefault;
    const adapter = adapterFor(filing.request);
    const priorStatus = filing.status;

    const pf = await preflight({
      filing, approval, tenant, client, adapter, einAdapter: irsEinAdapter, approvals: this.d.approvals, vault: this.d.vault,
      balances: this.d.balances ?? unknownBalanceProvider, dryRun,
    });
    if (!pf.ok || !adapter) {
      const f = filing.status === "queued" || filing.status === "approved" ? await this.transition(filing, "blocked", { lastError: pf.blockers.join("; ") }) : await store.updateFiling(filing.id, { lastError: pf.blockers.join("; ") });
      await this.emit("filing.blocked", f, { blockers: pf.blockers, warnings: pf.warnings, dryRun });
      return;
    }

    const releaseSite = await this.limiter.acquire(`site:${adapter.site}`);
    const accountKey = adapter.profileKey({ filing, client, tenant });
    const releaseAccount = accountKey ? await this.limiter.acquire(`account:${accountKey}`) : () => {};
    try {
      const running = filing.status === "queued" ? await this.transition(filing, "running") : await store.updateFiling(filing.id, { status: "running" });
      await this.emit("filing.started", running, { dryRun, site: adapter.site, warnings: pf.warnings });
      const fees = (() => { try { return this.feesFor(filing.request, tenant, client); } catch { return []; } })();
      const outcome = await this.d.executor.execute({
        filing: running, approval, tenant, client, adapter, einAdapter: irsEinAdapter, dryRun, expectedFees: approval?.fees ?? fees,
        reviewGateApproved: !!running.reviewGate,
      });
      const latest = (await store.getFiling(filing.id))!;
      switch (outcome.kind) {
        case "submitted": {
          const f = await this.transition(latest, "submitted", { currentRunId: outcome.run.id, ein: outcome.ein ?? latest.ein });
          if (outcome.ein) await this.emit("filing.ein_filed", f, { ein: outcome.ein }, outcome.run.id);
          await this.emit("filing.submitted", f, { site: adapter.site, artifacts: f.artifacts }, outcome.run.id);
          // NJ returns documents at once; NY waits for the receipt email (inbox module, build order 3).
          if (adapter.site === "NJ") {
            const done = await this.transition(await this.transition(f, "accepted"), "completed");
            await this.emit("filing.completed", done, { artifacts: done.artifacts, ein: done.ein }, outcome.run.id);
          }
          break;
        }
        case "dry_run_stop": {
          // Dry runs leave the filing where it was; the run record carries the evidence.
          const f = await store.updateFiling(latest.id, { status: dryRunReturnStatus(priorStatus), currentRunId: outcome.run.id, lastError: undefined });
          await this.emit("filing.step", f, { dryRun: true, stoppedBefore: outcome.stoppedBefore, steps: outcome.run.steps.length, ein: outcome.ein }, outcome.run.id);
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
      let fees: FeeLine[];
      try { fees = this.feesFor(req, tenant, client); }
      catch { const prior = filing.currentApprovalId ? await this.d.store.getApproval(filing.currentApprovalId) : null; fees = prior?.fees ?? []; }
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
   * On worker start, after reconcileOpenIntents: a filing still "running" lost its worker.
   * With no open submit intent nothing reached the state (no drafts exist), so it is marked
   * failed and reported; a person re-queues it. Nothing is re-run automatically.
   */
  async recoverInterruptedRuns(): Promise<string[]> {
    const out: string[] = [];
    for (const f of await this.d.store.listFilings()) {
      if (f.status !== "running" && f.status !== "ein_filed") continue;
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

  /** On worker start: any submit intent without an outcome is a possible double-submit. Never re-run; flag it. */
  async reconcileOpenIntents(): Promise<string[]> {
    const flagged: string[] = [];
    for (const intent of await this.d.store.listOpenSubmitIntents()) {
      const filing = await this.d.store.getFiling(intent.filingId);
      if (!filing || filing.status === "needs_reconciliation") continue;
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
