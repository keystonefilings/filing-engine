import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { chmodSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import EmbeddedPostgres from "embedded-postgres";
import { PostgresStore } from "../src/store/postgres.js";
import { PgQueue } from "../src/orchestrator/pg-queue.js";
import { ApprovalService } from "../src/approvals/service.js";
import { WebhookDispatcher } from "../src/webhooks/dispatcher.js";
import { InMemoryVault } from "../src/settings/vault.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { FilingService } from "../src/orchestrator/service.js";
import { TenantSettings, ClientCompanySettings } from "../src/settings/schema.js";
import { ClientCompanyOwnershipError } from "../src/store/types.js";
import { njFormationRequest, SECRET } from "./helpers.js";

/**
 * The shared-database path the two-tier deployment uses (decision 4): the cloud tier
 * enqueues, the fixed-IP worker claims. Runs against a real Postgres started for the test.
 */
const PORT = 54000 + Math.floor(Math.random() * 1000);
const dir = mkdtempSync(path.join(tmpdir(), "ke-pg-"));
chmodSync(dir, 0o777); // Postgres runs as its own unprivileged user when the tests run as root
const pgServer = new EmbeddedPostgres({
  databaseDir: path.join(dir, "data"), port: PORT, user: "filing", password: "filing",
  persistent: false, createPostgresUser: true, onLog: () => {}, onError: () => {},
});
let store: PostgresStore;
let queue: PgQueue;
let service: FilingService;

beforeAll(async () => {
  await pgServer.initialise();
  await pgServer.start();
  await pgServer.createDatabase("filing");
  store = await PostgresStore.connect(`postgres://filing:filing@127.0.0.1:${PORT}/filing`);
  // Applying the schema twice must be harmless (deploys re-run it on every start).
  await PostgresStore.connect(`postgres://filing:filing@127.0.0.1:${PORT}/filing`).then((s) => s.close());
  queue = new PgQueue(store.connectionPool);
  await store.putTenant(TenantSettings.parse({ tenantId: "keystone", name: "Keystone", webhookEndpoints: [{ url: "https://hooks.example.test/f", secret: "endpoint-secret-0123456789" }] }));
  await store.putClientCompany(ClientCompanySettings.parse({
    clientCompanyId: "acme-cpa", tenantId: "keystone", name: "Acme", einMode: "in_run", njStoredPaymentMethod: "stored_card", policies: { stateFees: "own_account" },
    registeredAgent: { name: "Acme Agents Inc", address: { street1: "9 Agent Way", city: "Newark", state: "NJ", zip: "07102" } },
  }));
  const approvals = new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 24 });
  service = new FilingService({
    store, approvals, webhooks: new WebhookDispatcher(store, async () => ({ status: 200 })), queue,
    vault: new InMemoryVault(), drift: new DriftReviewService(store), dryRunDefault: true,
  });
}, 120_000);

afterAll(async () => {
  await store?.close();
  await pgServer.stop().catch(() => {});
  rmSync(dir, { recursive: true, force: true });
});

describe("Postgres store + queue", () => {
  it("runs the API-side flow and hands each job to exactly one worker", async () => {
    const { filing, approvalLink } = await service.createFiling(njFormationRequest());
    expect(filing.status).toBe("awaiting_approval");
    await service.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", { ip: "203.0.113.5" });
    const stored = (await store.getFiling(filing.id))!;
    expect(stored.status).toBe("queued");
    expect((await store.getApproval(stored.currentApprovalId!))!.decidedVia?.ip).toBe("203.0.113.5");
    expect(await queue.size()).toBe(1);

    // Two workers race for the same job.
    const [a, b] = await Promise.all([queue.dequeue("vm-1"), queue.dequeue("vm-2")]);
    const got = [a, b].filter(Boolean);
    expect(got).toHaveLength(1);
    expect(got[0]!.filingId).toBe(filing.id);
    expect(await queue.dequeue("vm-3")).toBeNull();
    await queue.complete(got[0]!.id);

    const idem = await service.createFiling({ ...njFormationRequest(), idempotencyKey: stored.idempotencyKey });
    expect(idem.existing).toBe(true);
    const types = (await store.listDeliveries(filing.id)).map((d) => d.event.type);
    expect(types).toEqual(["filing.validated", "filing.awaiting_approval", "filing.approved"]);
  });

  it("a service company's own worker claims only its own tenant's jobs", async () => {
    await queue.enqueue({ kind: "run_filing", filingId: crypto.randomUUID(), tenantId: "otherco" });
    expect(await queue.dequeue("keystone-vm", ["keystone"])).toBeNull();
    const j = await queue.dequeue("otherco-vm", ["otherco"]);
    expect(j?.tenantId).toBe("otherco");
    await queue.complete(j!.id);
  });

  it("settles filings a dead worker left behind, without re-running them", async () => {
    const { filing } = await service.createFiling(njFormationRequest());
    await store.updateFiling(filing.id, { status: "running" });
    const { filing: f2 } = await service.createFiling(njFormationRequest());
    await store.updateFiling(f2.id, { status: "ein_filed", ein: "12-3456789" });
    const recovered = await service.recoverInterruptedRuns();
    expect(recovered.sort()).toEqual([filing.id, f2.id].sort());
    expect((await store.getFiling(filing.id))!.status).toBe("failed");
    expect((await store.getFiling(f2.id))!.status).toBe("needs_reconciliation");
    expect(await queue.size()).toBe(0); // nothing was re-queued
  });

  it("flags open submit intents for reconciliation", async () => {
    const { filing } = await service.createFiling(njFormationRequest());
    await store.createSubmitIntent({ id: crypto.randomUUID(), runId: crypto.randomUUID(), filingId: filing.id, site: "NJ", payloadHash: filing.payloadHash, createdAt: new Date().toISOString() });
    expect(await service.reconcileOpenIntents()).toEqual([filing.id]);
    expect((await store.getFiling(filing.id))!.status).toBe("needs_reconciliation");
  });

  it("leaves a filing alone while its run lease is live", async () => {
    const { filing } = await service.createFiling(njFormationRequest());
    await store.updateFiling(filing.id, { status: "running" });
    await store.createSubmitIntent({ id: crypto.randomUUID(), runId: crypto.randomUUID(), filingId: filing.id, site: "NJ", payloadHash: filing.payloadHash, createdAt: new Date().toISOString() });
    const token = (await store.acquireRunLease(filing.id, "vm-1", 60_000))!;
    expect(token).toBeTruthy();
    expect(await store.acquireRunLease(filing.id, "vm-2", 60_000)).toBeNull(); // held
    expect(await service.reconcileOpenIntents()).not.toContain(filing.id);
    expect(await service.recoverInterruptedRuns()).not.toContain(filing.id);
    expect((await store.getFiling(filing.id))!.status).toBe("running");
    expect(await store.renewRunLease(filing.id, token, 60_000)).toBe(true);
    expect(await store.renewRunLease(filing.id, "not-the-token", 60_000)).toBe(false);
    await store.releaseRunLease(filing.id, token);
    expect(await store.hasLiveRunLease(filing.id)).toBe(false);
    expect(await service.reconcileOpenIntents()).toContain(filing.id);
  });

  it("an expired lease can be taken over and no longer renews for its old holder", async () => {
    const id = crypto.randomUUID();
    const old = (await store.acquireRunLease(id, "vm-1", 1))!;
    await new Promise((r) => setTimeout(r, 20));
    expect(await store.hasLiveRunLease(id)).toBe(false);
    const next = await store.acquireRunLease(id, "vm-2", 60_000);
    expect(next).toBeTruthy();
    expect(await store.renewRunLease(id, old, 60_000)).toBe(false);
  });

  it("never moves a client company to another tenant", async () => {
    await expect(store.putClientCompany(ClientCompanySettings.parse({ clientCompanyId: "acme-cpa", tenantId: "otherco", name: "Hijack", einMode: "after_acceptance" })))
      .rejects.toBeInstanceOf(ClientCompanyOwnershipError);
    expect((await store.getClientCompany("acme-cpa"))!.tenantId).toBe("keystone");
  });

  it("carries the preview flag on the job", async () => {
    await queue.enqueue({ kind: "run_filing", filingId: crypto.randomUUID(), tenantId: "previewco", dryRun: true });
    await queue.enqueue({ kind: "run_filing", filingId: crypto.randomUUID(), tenantId: "previewco" });
    const a = (await queue.dequeue("vm", ["previewco"]))!;
    const b = (await queue.dequeue("vm", ["previewco"]))!;
    expect(a.dryRun).toBe(true);
    expect(b.dryRun).toBeUndefined();
  });
});
