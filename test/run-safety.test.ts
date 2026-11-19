import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { RunExecutor, type RunInput, type RunOutcome } from "../src/orchestrator/run.js";
import { BrowserHarness } from "../src/browser/harness.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { LeaseLost } from "../src/browser/guard.js";
import { NameUnavailable, PLACEHOLDER_EIN, type ScreenStep, type SiteAdapter, type StepContext } from "../src/adapters/types.js";
import { irsEinAdapter } from "../src/adapters/index.js";
import type { ApprovalRecord, FilingRecord } from "../src/store/types.js";
import type { MemoryStore } from "../src/store/memory.js";
import { seededStore, njFormationRequest, wire } from "./helpers.js";

const page = (body: string) => `data:text/html,${encodeURIComponent(`<html><body>${body}</body></html>`)}`;
// Clicking Pay replaces the page with what the portal shows next.
const payPage = (after: string) => page(`<h1>Payment</h1><button onclick="document.body.innerHTML='${after}'">Pay</button>`);
const RECEIPT = "<h1>Thank you</h1><p>Confirmation number ABC-123</p>";
const NO_RECEIPT = "<h1>Something went wrong</h1>";

const EIN_REQUEST = { mode: "in_run", responsibleParty: { name: "Sam Rivera", ssn: "123-45-6789", title: "Member", address: { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" }, phone: "2015550100" } };

function testAdapter(o: { entry: string; confirm?: boolean; after?: (ctx: StepContext) => Promise<void>; priceList?: boolean; nameGate?: boolean }): SiteAdapter {
  const steps: ScreenStep[] = [];
  if (o.nameGate) {
    steps.push({ screen: { screenKey: "t.name", title: "Name", intents: [] }, nameCheckGate: true, async fill() {}, async advance() {} });
  }
  steps.push({
    screen: { screenKey: "t.pay", title: "Pay", intents: [] },
    paymentScreen: o.priceList, feeDisplay: o.priceList ? "price_list" : undefined,
    async fill() {},
    async advance(ctx) { await ctx.submit("Pay", () => ctx.clickButton(/^pay$/i)); },
  });
  if (o.after) steps.push({ screen: { screenKey: "t.after", title: "After", intents: [] }, fill: o.after, async advance() {} });
  return {
    site: "FL", key: "test-submit", complete: true, entryUrl: () => o.entry, profileKey: () => null, credentialKey: () => null, steps,
    ...(o.confirm === false ? {} : {
      async confirmSubmission(ctx: StepContext) {
        const m = /Confirmation number (\S+)/.exec(await ctx.page.locator("body").innerText());
        return m ? { reference: m[1]!, detail: "confirmation number on the receipt page" } : null;
      },
    }),
  };
}

let harness: BrowserHarness;
beforeAll(() => { harness = new BrowserHarness({ chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles" }); });
afterAll(async () => { await harness.close(); });

async function run(adapter: SiteAdapter, opts: Partial<RunInput> & { ein?: string; request?: Partial<FilingRecord["request"]> } = {}) {
  const store = await seededStore();
  const now = new Date().toISOString();
  const filing: FilingRecord = {
    id: randomUUID(), tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `idem-${Math.random()}`,
    status: "running", request: njFormationRequest({ dryRun: false, ...opts.request }), payloadHash: "h", createdAt: now, updatedAt: now, artifacts: [],
    ...(opts.ein ? { ein: opts.ein } : {}),
  };
  await store.createFiling(filing);
  const executor = new RunExecutor({
    store, artifacts: new FsArtifactStore("var/test-artifacts"), harness, drift: new DriftReviewService(store),
    vault: { getCredential: async () => null }, firstObservationPolicy: "accept",
  });
  const outcome: RunOutcome = await executor.execute({
    filing, approval: { id: "approval-1" } as ApprovalRecord, tenant: (await store.getTenant("keystone"))!, client: (await store.getClientCompany("acme-cpa"))!,
    adapter, dryRun: false, expectedFees: [{ label: "Filing fee", amountUsd: 100 }], ...opts,
  });
  return { store, filing, outcome, intents: [...store.intents.values()] };
}

describe("submit intent stays open until the portal confirms (finding 3)", () => {
  it("closes the intent with the evidence the adapter read", async () => {
    const { outcome, intents } = await run(testAdapter({ entry: payPage(RECEIPT) }));
    expect(outcome.kind).toBe("submitted");
    expect(intents).toHaveLength(1);
    expect(intents[0]).toMatchObject({ outcome: "submitted", evidence: { reference: "ABC-123" } });
    expect(intents[0]!.clickedAt).toBeTruthy();
  });

  it("a click the portal did not confirm goes to reconciliation, never failed", async () => {
    const { outcome, intents } = await run(testAdapter({ entry: payPage(NO_RECEIPT) }));
    expect(outcome.kind).toBe("needs_reconciliation");
    expect(intents).toHaveLength(1);
    expect(intents[0]!.outcome).toBeUndefined(); // still open: reconcileOpenIntents keeps it from re-running
    expect(intents[0]!.clickedAt).toBeTruthy();
  });

  it("an adapter with no confirmation check cannot finish a live run", async () => {
    const { outcome, intents } = await run(testAdapter({ entry: payPage(RECEIPT), confirm: false }));
    expect(outcome.kind).toBe("needs_reconciliation");
    if (outcome.kind === "needs_reconciliation") expect(outcome.error).toContain("no confirmation check");
    expect(intents[0]!.outcome).toBeUndefined();
  });

  it("an error after the click is reconciliation even when it would otherwise be a halt", async () => {
    // Before: a NameUnavailable/DriftHalt after the click was classified first, and the filing became re-runnable.
    const { outcome } = await run(testAdapter({ entry: payPage(RECEIPT), after: async () => { throw new NameUnavailable("Blue Harbor Consulting LLC", "portal message after payment"); } }));
    expect(outcome.kind).toBe("needs_reconciliation");
  });

  it("a worker that lost its lease never clicks", async () => {
    const { outcome, intents } = await run(testAdapter({ entry: payPage(RECEIPT) }), { assertLease: async () => { throw new LeaseLost("f"); } });
    expect(outcome.kind).toBe("failed");
    expect(intents).toHaveLength(0);
  });
});

describe("payment screens that show no payable total (finding 4)", () => {
  const priceList = page(`<table><tr><td>Formation</td><td>$100</td></tr><tr><td>Certified Copy</td><td>$25</td></tr></table><button>Pay</button>`);

  it("stop a live run before the click", async () => {
    const { outcome, intents } = await run(testAdapter({ entry: priceList, priceList: true }));
    expect(outcome.kind).toBe("failed");
    if (outcome.kind === "failed") expect(outcome.stage).toBe("fee_mismatch");
    expect(intents).toHaveLength(0);
  });

  it("let a dry run continue with a note", async () => {
    const { outcome } = await run(testAdapter({ entry: priceList, priceList: true }), { dryRun: true });
    expect(outcome.kind).toBe("dry_run_stop");
    expect(outcome.run.steps.some((s) => s.note?.includes("a live run stops here"))).toBe(true);
  });
});

describe("dry-run EIN placeholder stays in memory (finding 2)", () => {
  const adapter = () => testAdapter({ entry: payPage(RECEIPT), nameGate: true });

  it("is never written to the filing", async () => {
    const { store, filing, outcome } = await run(adapter(), { dryRun: true, einAdapter: irsEinAdapter, request: { ein: EIN_REQUEST } as never });
    expect(outcome.kind).toBe("dry_run_stop");
    if (outcome.kind === "dry_run_stop") {
      expect(outcome.einPlaceholder).toBe(true);
      expect(outcome.ein).toBeUndefined();
    }
    expect((await store.getFiling(filing.id))!.ein).toBeUndefined();
  });

  it("a placeholder already stored by an older version is not treated as an issued EIN", async () => {
    const { outcome } = await run(adapter(), { dryRun: true, einAdapter: irsEinAdapter, ein: PLACEHOLDER_EIN, request: { ein: EIN_REQUEST } as never });
    // The IRS step was still due, so the run went through it (placeholder note) instead of skipping it.
    expect(outcome.run.steps.some((s) => s.screenKey === "irs.skipped")).toBe(true);
  });

  it("a real EIN already on the filing is reused and the IRS step is skipped", async () => {
    const { outcome } = await run(adapter(), { dryRun: true, einAdapter: irsEinAdapter, ein: "12-3456789", request: { ein: EIN_REQUEST } as never });
    expect(outcome.kind).toBe("dry_run_stop");
    if (outcome.kind === "dry_run_stop") expect(outcome.ein).toBe("12-3456789");
    expect(outcome.run.steps.some((s) => s.screenKey === "irs.skipped")).toBe(false);
  });
});

/** Executor stand-in for service-level tests: records what it was asked to do. */
function fakeExecutor(calls: RunInput[]) {
  return {
    async execute(input: RunInput): Promise<RunOutcome> {
      calls.push(input);
      return { kind: "dry_run_stop", run: { id: randomUUID(), filingId: input.filing.id, approvalId: "a", site: input.adapter.site, dryRun: input.dryRun, status: "completed", startedAt: "", steps: [] }, stoppedBefore: "Pay Now" };
    },
  } as unknown as RunExecutor;
}

async function approvedFiling(store: MemoryStore, w: ReturnType<typeof wire>) {
  const { filing, approvalLink } = await w.service.createFiling(njFormationRequest());
  await w.service.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", {});
  await w.queue.dequeue(); // the live run job the approval queued
  return (await store.getFiling(filing.id))!;
}

describe("preview mode rides on the job, not the approved request (finding 2)", () => {
  it("leaves the request and its approval binding untouched", async () => {
    const store = await seededStore();
    const calls: RunInput[] = [];
    const w = wire(store, { executor: fakeExecutor(calls) });
    const before = await approvedFiling(store, w);
    await w.service.enqueueDryRun(before.id);
    const after = (await store.getFiling(before.id))!;
    expect(after.request.dryRun).toBeUndefined();
    expect(w.approvals.payloadHash(after.request)).toBe(before.payloadHash);
    const approval = (await store.getApproval(after.currentApprovalId!))!;
    expect(w.approvals.verifyForRun(after, approval, (await store.getTenant("keystone"))!, (await store.getClientCompany("acme-cpa"))!)).toEqual({ ok: true });
    const job = (await w.queue.dequeue())!;
    expect(job.dryRun).toBe(true);
    await w.service.runFiling(job.filingId!, { dryRun: job.dryRun });
    expect(calls).toHaveLength(1);
    expect(calls[0]!.dryRun).toBe(true);
  });

  it("a job flag can force a preview but never a live run", async () => {
    const store = await seededStore();
    const calls: RunInput[] = [];
    const w = wire(store, { executor: fakeExecutor(calls) }); // dryRunDefault: true
    const f = await approvedFiling(store, w);
    await store.updateFiling(f.id, { status: "queued" });
    await w.service.runFiling(f.id, { dryRun: false });
    expect(calls[0]!.dryRun).toBe(true);
  });
});

describe("recovery only touches runs whose lease lapsed (finding 5)", () => {
  async function runningFiling(store: MemoryStore, w: ReturnType<typeof wire>, tenantId = "keystone") {
    const { filing } = await w.service.createFiling(njFormationRequest());
    return store.updateFiling(filing.id, { status: "running", tenantId });
  }

  it("leaves a live worker's run and open intent alone, settles them once the lease expires", async () => {
    const store = await seededStore();
    const w = wire(store);
    const running = await runningFiling(store, w);
    const clicking = await runningFiling(store, w);
    await store.createSubmitIntent({ id: randomUUID(), runId: "r", filingId: clicking.id, site: "NJ", payloadHash: "h", createdAt: new Date().toISOString(), clickedAt: new Date().toISOString() });
    expect(await store.acquireRunLease(running.id, "worker-a", 60_000)).toBeTruthy();
    expect(await store.acquireRunLease(clicking.id, "worker-a", 60_000)).toBeTruthy();

    // worker-b starts: nothing of worker-a's is touched.
    expect(await w.service.reconcileOpenIntents()).toEqual([]);
    expect(await w.service.recoverInterruptedRuns()).toEqual([]);
    expect((await store.getFiling(running.id))!.status).toBe("running");
    expect((await store.getFiling(clicking.id))!.status).toBe("running");

    // worker-a stops renewing; after the TTL its filings are settled.
    const t0 = Date.now();
    store.now = () => t0 + 61_000;
    expect(await w.service.reconcileOpenIntents()).toEqual([clicking.id]);
    expect(await w.service.recoverInterruptedRuns()).toEqual([running.id]);
    expect((await store.getFiling(clicking.id))!.status).toBe("needs_reconciliation");
    expect((await store.getFiling(running.id))!.status).toBe("failed");
  });

  it("a service company's worker recovers only its own tenants", async () => {
    const store = await seededStore();
    const w = wire(store);
    const ours = await runningFiling(store, w);
    const theirs = await runningFiling(store, w, "otherco");
    expect(await w.service.recoverInterruptedRuns({ tenants: ["otherco"] })).toEqual([theirs.id]);
    expect((await store.getFiling(ours.id))!.status).toBe("running");
  });

  it("a second worker cannot run a filing whose lease is held, and the holder releases it when done", async () => {
    const store = await seededStore();
    const calls: RunInput[] = [];
    const w = wire(store, { executor: fakeExecutor(calls) });
    const f = await approvedFiling(store, w);
    const token = (await store.acquireRunLease(f.id, "worker-a", 60_000))!;
    await w.service.runFiling(f.id, { dryRun: true });
    expect(calls).toHaveLength(0);
    const types = (await store.listDeliveries(f.id)).map((d) => d.event.type);
    expect(types).toContain("filing.blocked");
    await store.releaseRunLease(f.id, token);
    await w.service.runFiling(f.id, { dryRun: true });
    expect(calls).toHaveLength(1);
    expect(await store.hasLiveRunLease(f.id)).toBe(false);
  });
});
