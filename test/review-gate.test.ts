import { afterAll, beforeAll, describe, it, expect } from "vitest";
import { randomUUID } from "node:crypto";
import { MemoryStore } from "../src/store/memory.js";
import { ReviewGateService } from "../src/review-gate/service.js";
import { ApprovalService } from "../src/approvals/service.js";
import { WebhookDispatcher } from "../src/webhooks/dispatcher.js";
import { InMemoryQueue } from "../src/orchestrator/queue.js";
import { InMemoryVault } from "../src/settings/vault.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { FilingService } from "../src/orchestrator/service.js";
import { RunExecutor } from "../src/orchestrator/run.js";
import { BrowserHarness } from "../src/browser/harness.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import type { SiteAdapter } from "../src/adapters/types.js";
import type { FilingRecord } from "../src/store/types.js";
import { seededStore, njFormationRequest, SECRET } from "./helpers.js";

function gateService(store = new MemoryStore()) {
  return new ReviewGateService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test" });
}

describe("ReviewGateService", () => {
  it("records a pending halt and approves it once", async () => {
    const s = gateService();
    const rec = await s.recordHalt({ runId: "r1", filingId: "f1", tenantId: "keystone", site: "FL", screenKey: "fl.review", screenshotArtifactId: "a1" });
    expect(rec.status).toBe("pending");
    expect(await s.lookup(rec.token)).not.toBeNull();
    const r = await s.decide(rec.token, { action: "approve", decidedBy: "admin@firm" });
    expect(r.ok && r.outcome).toBe("approved");
    const again = await s.decide(rec.token, { action: "approve", decidedBy: "admin@firm" });
    expect(again).toEqual({ ok: false, reason: "already_decided" });
  });

  it("rejects with a reason", async () => {
    const s = gateService();
    const rec = await s.recordHalt({ runId: "r1", filingId: "f1", tenantId: "keystone", site: "FL", screenKey: "fl.review" });
    const r = await s.decide(rec.token, { action: "reject", decidedBy: "a", reason: "wrong address" });
    expect(r.ok && r.outcome).toBe("rejected");
    if (r.ok) expect(r.record.reason).toBe("wrong address");
  });

  it("rejects a forged token", async () => {
    expect(await gateService().decide("nope", { action: "approve", decidedBy: "a" })).toEqual({ ok: false, reason: "invalid_token" });
  });
});

describe("FilingService review-gate decision", () => {
  async function setup() {
    const store = await seededStore();
    const approvals = new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 168 });
    const webhooks = new WebhookDispatcher(store, async () => ({ status: 200 }));
    const queue = new InMemoryQueue();
    const drift = new DriftReviewService(store);
    const reviewGate = new ReviewGateService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test" });
    const service = new FilingService({ store, approvals, webhooks, queue, vault: new InMemoryVault(), drift, reviewGate, dryRunDefault: false });
    const { filing } = await service.createFiling(njFormationRequest({ dryRun: false }));
    await store.updateFiling(filing.id, { status: "awaiting_review_gate" });
    const rec = await reviewGate.recordHalt({ runId: "r1", filingId: filing.id, tenantId: "keystone", site: "NJ", screenKey: "nj.review" });
    return { store, queue, service, filingId: filing.id, rec };
  }

  it("approve marks the gate passed and re-queues the run", async () => {
    const { store, queue, service, filingId, rec } = await setup();
    const r = await service.onReviewGateDecision(rec.token, { action: "approve", decidedBy: "admin@firm" });
    expect(r.ok).toBe(true);
    const after = (await store.getFiling(filingId))!;
    expect(after.status).toBe("queued");
    expect(after.reviewGate?.approvedBy).toBe("admin@firm");
    expect(after.reviewGate?.recordId).toBe(rec.id);
    expect(await queue.size()).toBe(1);
    const types = (await store.listDeliveries(filingId)).map((d) => d.event.type);
    expect(types).toContain("filing.review_gate_resolved");
  });

  it("reject aborts the filing", async () => {
    const { store, queue, service, filingId, rec } = await setup();
    const r = await service.onReviewGateDecision(rec.token, { action: "reject", decidedBy: "a", reason: "bad data" });
    expect(r.ok).toBe(true);
    const after = (await store.getFiling(filingId))!;
    expect(after.status).toBe("aborted");
    expect(after.reviewGate).toBeUndefined();
    expect(await queue.size()).toBe(0);
    const types = (await store.listDeliveries(filingId)).map((d) => d.event.type);
    expect(types).toContain("filing.aborted");
  });
});

describe("RunExecutor beta review-gate (real browser)", () => {
  let harness: BrowserHarness;
  beforeAll(() => { harness = new BrowserHarness({ chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles" }); });
  afterAll(async () => { await harness.close(); });

  function adapter(): SiteAdapter {
    return {
      site: "FL", key: "test-review-gate", complete: true,
      entryUrl: () => "data:text/html,<html><body><h1>Review your filing</h1><p>Everything looks right.</p><button>Continue</button></body></html>",
      profileKey: () => null, credentialKey: () => null,
      steps: [{
        screen: { screenKey: "test.review", title: "Review", intents: [] },
        reviewScreen: true,
        async fill() { /* nothing to fill on a review screen */ },
        async advance(ctx) { await ctx.clickButton(/continue/i); },
      }],
    };
  }

  async function runOnce(store: MemoryStore, reviewGate: ReviewGateService, betaReviewGate: boolean, reviewGateApproved: boolean) {
    const tenant = { ...(await store.getTenant("keystone"))!, betaReviewGate };
    const client = (await store.getClientCompany("acme-cpa"))!;
    const now = new Date().toISOString();
    const filing: FilingRecord = {
      id: randomUUID(), tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `idem-${Math.random()}`,
      status: "running", request: njFormationRequest({ dryRun: false }), payloadHash: "h", createdAt: now, updatedAt: now, artifacts: [],
    };
    await store.createFiling(filing);
    const executor = new RunExecutor({
      store, artifacts: new FsArtifactStore("var/test-artifacts"), harness,
      drift: new DriftReviewService(store), vault: { getCredential: async () => null }, reviewGate, firstObservationPolicy: "accept",
    });
    const outcome = await executor.execute({ filing, approval: null, tenant, client, adapter: adapter(), dryRun: false, expectedFees: [], reviewGateApproved });
    return { outcome, filing };
  }

  it("stops at the review screen in beta, then proceeds once approved", async () => {
    const store = await seededStore();
    const reviewGate = gateService(store);

    const first = await runOnce(store, reviewGate, true, false);
    expect(first.outcome.kind).toBe("review_gate");
    const [rec] = await store.listReviewGates("pending");
    expect(rec).toBeDefined();
    expect(rec!.screenshotArtifactId).toBeTruthy(); // the review screen was captured
    const f = (await store.getFiling(first.filing.id))!;
    expect(f.artifacts.some((a) => a.label === "beta review gate")).toBe(true);

    // With the gate already approved, the re-run proceeds past it.
    const second = await runOnce(store, reviewGate, true, true);
    expect(second.outcome.kind).not.toBe("review_gate");

    // With the gate off (production), it never stops.
    const off = await runOnce(store, reviewGate, false, false);
    expect(off.outcome.kind).not.toBe("review_gate");
  });
});
