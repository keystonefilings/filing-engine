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
import { ConcurrencyLimiter } from "./locks.js";

export interface FilingServiceDeps {
  store: Store;
  approvals: ApprovalService;
  webhooks: WebhookDispatcher;
  queue: JobQueue;
  vault: Vault;
  drift: DriftReviewService;
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

  feesFor(req: FilingRequestT, client: { njStoredPaymentMethod?: string }): FeeLine[] {
    if (req.type === "ein_only") return [{ label: "EIN application", amountUsd: 0 }];
    return expectedFees(req.state, req.type, {
      // NJ adapters pick Credit Card unless the client's stored method is an eCheck.
      paymentMethod: req.state === "NJ" ? (client.njStoredPaymentMethod ?? "credit_card") : undefined,
      certificateOfStanding: req.formation?.additionalCertificates.certificateOfStanding,
      certifiedCopy: req.formation?.additionalCertificates.certifiedCopy,
    });
  }

  /** POST /v1/filings: validate, store, create the approval, emit awaiting_approval. Idempotent per tenant+key. */
  async createFiling(raw: unknown): Promise<{ filing: FilingRecord; approvalLink?: string; issues: ValidationIssue[]; existing: boolean }> {
    const parsed = FilingRequest.safeParse(raw);
    if (!parsed.success) {
      throw new ValidationFailed(parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message, severity: "error" as const })));
    }
    const req = parsed.data;
    const existing = await this.d.store.findFilingByIdempotency(req.tenantId, req.idempotencyKey);
    if (existing) {
      const a = existing.currentApprovalId ? await this.d.store.getApproval(existing.currentApprovalId) : null;
      return { filing: existing, approvalLink: a && a.status === "pending" ? this.d.approvals.linkFor(a) : undefined, issues: [], existing: true };
    }
    const tenant = await this.d.store.getTenant(req.tenantId);
    const client = await this.d.store.getClientCompany(req.clientCompanyId);
    if (!tenant) throw new ValidationFailed([{ path: "tenantId", message: "unknown tenant", severity: "error" }]);
    if (!client || client.tenantId !== tenant.tenantId) throw new ValidationFailed([{ path: "clientCompanyId", message: "unknown client company for this tenant", severity: "error" }]);

    // Apply client defaults (requirement 7) before validation so the approved payload is complete.
    if (req.ein && !req.ein.mode) req.ein.mode = client.einMode;
    if (req.formation) {
      req.formation.registeredAgent ??= client.registeredAgent;
      if (!req.formation.members.length && client.defaultMember) req.formation.members = [client.defaultMember];
      if (!req.formation.signers.length && client.defaultSigner) req.formation.signers = [client.defaultSigner];
      req.formation.county ??= client.countyDefault;
    }

    const issues = validateFiling(req);
    const now = new Date().toISOString();
    const filing: FilingRecord = {
      id: randomUUID(), tenantId: req.tenantId, clientCompanyId: req.clientCompanyId, idempotencyKey: req.idempotencyKey,
      status: "created", request: req, payloadHash: this.d.approvals.payloadHash(req), createdAt: now, updatedAt: now, artifacts: [],
    };
    await this.d.store.createFiling(filing);
    if (hasErrors(issues)) {
      const f = await this.transition(filing, "invalid", { lastError: issues.filter((i) => i.severity === "error").map((i) => `${i.path}: ${i.message}`).join("; ") });
      await this.emit("filing.invalid", f, { issues });
      return { filing: f, issues, existing: false };
    }
    let fees: FeeLine[];
    try {
      fees = this.feesFor(req, client);
    } catch (e) {
      if (!(e instanceof FeeUnknownError)) throw e;
      const f = await this.transition(filing, "invalid", { lastError: e.message });
      await this.emit("filing.invalid", f, { issues: [{ path: "fees", message: e.message, severity: "error" }] });
      return { filing: f, issues: [{ path: "fees", message: e.message, severity: "error" }], existing: false };
    }
    await this.emit("filing.validated", filing, { warnings: issues });
    const approval = await this.d.approvals.create(filing, tenant, client, fees);
    const f = await this.transition(filing, "awaiting_approval", { currentApprovalId: approval.id });
    const link = this.d.approvals.linkFor(approval);
    await this.emit("filing.awaiting_approval", f, {
      approvalLink: link, expiresAt: approval.expiresAt, recipients: approval.recipients, fees, feeCapUsd: approval.feeCapUsd,
      einInRun: !!req.ein && req.ein.mode === "in_run",
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
    await this.d.queue.enqueue({ kind: "run_filing", filingId: f.id });
  }

  /** Dry run from any pre-approval state: executes to the last screen and stops before the irreversible click. */
  async enqueueDryRun(filingId: string): Promise<void> {
    const filing = await this.d.store.getFiling(filingId);
    if (!filing) throw new Error("filing not found");
    await this.d.store.updateFiling(filing.id, { request: { ...filing.request, dryRun: true } });
    await this.d.queue.enqueue({ kind: "run_filing", filingId: filing.id });
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
      const fees = (() => { try { return this.feesFor(filing.request, client); } catch { return []; } })();
      const outcome = await this.d.executor.execute({
        filing: running, approval, tenant, client, adapter, einAdapter: irsEinAdapter, dryRun, expectedFees: approval?.fees ?? fees,
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
      const approval = await this.d.approvals.create(filing, tenant, client, this.feesFor(filing.request, client));
      const f = await this.transition(filing, "awaiting_approval", { currentApprovalId: approval.id });
      await this.emit("filing.awaiting_approval", f, { approvalLink: this.d.approvals.linkFor(approval), reason: "form changed: new required field", expiresAt: approval.expiresAt });
    } else {
      const f = await this.transition(filing, "queued");
      await this.d.queue.enqueue({ kind: "run_filing", filingId: f.id });
    }
    return halt;
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
