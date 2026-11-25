import { describe, it, expect } from "vitest";
import { MemoryStore } from "../src/store/memory.js";
import { NameResolutionService } from "../src/name-resolution/service.js";
import { StaticNameGenerator } from "../src/name-resolution/generator.js";
import { predicateChecker, type NameCheckerRegistry } from "../src/name-resolution/checker.js";
import { ApprovalService } from "../src/approvals/service.js";
import { WebhookDispatcher } from "../src/webhooks/dispatcher.js";
import { InMemoryQueue } from "../src/orchestrator/queue.js";
import { InMemoryVault } from "../src/settings/vault.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { ReviewGateService } from "../src/review-gate/service.js";
import { FilingService } from "../src/orchestrator/service.js";
import { seededStore, njFormationRequest, SECRET } from "./helpers.js";
import type { FilingRecord } from "../src/store/types.js";

const filing = { id: "f1", tenantId: "keystone" } as FilingRecord;

function svc(checkers: NameCheckerRegistry, store = new MemoryStore()) {
  return new NameResolutionService({
    store, generator: new StaticNameGenerator(), checkers,
    signingSecret: SECRET, publicBaseUrl: "http://api.test",
    config: { maxOptions: 3, maxBatches: 3, ttlHours: 168 },
  });
}

const requested = { baseName: "Blue Harbor Consulting", designator: "LLC" };

describe("NameResolutionService", () => {
  it("offers only available options when a checker is wired", async () => {
    const s = svc({ NJ: predicateChecker((n) => !n.includes("Group")) });
    const rec = await s.open({ filing, site: "NJ", state: "NJ", requested, purpose: "consulting" });
    expect(rec.status).toBe("awaiting_admin");
    expect(rec.availabilityVerified).toBe(true);
    expect(rec.options).toHaveLength(3);
    expect(rec.options.every((o) => o.available)).toBe(true);
    expect(rec.options.some((o) => o.name.includes("Group"))).toBe(false);
    expect(rec.attempts.some((a) => a.name.includes("Group") && !a.available)).toBe(true);
    expect(rec.options.every((o) => o.name.endsWith(" LLC"))).toBe(true);
  });

  it("offers unverified options when no checker is wired for the state", async () => {
    const s = svc({});
    const rec = await s.open({ filing, site: "NJ", state: "NJ", requested });
    expect(rec.availabilityVerified).toBe(false);
    expect(rec.options.length).toBeGreaterThan(0);
    expect(rec.options.every((o) => !o.available)).toBe(true);
  });

  it("resolves on a pick from the list", async () => {
    const s = svc({ NJ: predicateChecker(() => true) });
    const rec = await s.open({ filing, site: "NJ", state: "NJ", requested });
    const choice = rec.options[0]!.name;
    const r = await s.decide(rec.token, { action: "pick", option: choice, decidedBy: "admin@firm" });
    expect(r.ok).toBe(true);
    if (!r.ok) return;
    expect(r.outcome).toBe("resolved");
    expect(r.record.status).toBe("resolved");
    expect(r.record.chosen?.name).toBe(choice);
    expect(r.record.chosen?.source).toBe("ai_option");
  });

  it("rejects a pick that was not offered, and a second decision", async () => {
    const s = svc({ NJ: predicateChecker(() => true) });
    const rec = await s.open({ filing, site: "NJ", state: "NJ", requested });
    const bad = await s.decide(rec.token, { action: "pick", option: "Something Else LLC", decidedBy: "a" });
    expect(bad).toEqual({ ok: false, reason: "not_offered" });
    await s.decide(rec.token, { action: "pick", option: rec.options[0]!.name, decidedBy: "a" });
    const again = await s.decide(rec.token, { action: "pick", option: rec.options[0]!.name, decidedBy: "a" });
    expect(again).toEqual({ ok: false, reason: "already_decided" });
  });

  it("re-checks a custom name from scratch: available resolves, taken stays open", async () => {
    const taken = new Set(["Taken Name LLC"]);
    const s = svc({ NJ: predicateChecker((n) => !taken.has(n)) });
    const rec = await s.open({ filing, site: "NJ", state: "NJ", requested });
    const stillTaken = await s.decide(rec.token, { action: "custom", baseName: "Taken Name", decidedBy: "a" });
    expect(stillTaken.ok && stillTaken.outcome).toBe("still_unavailable");
    const ok = await s.decide(rec.token, { action: "custom", baseName: "Fresh Idea", designator: "LLC", decidedBy: "a" });
    expect(ok.ok && ok.outcome).toBe("resolved");
    if (ok.ok) {
      expect(ok.record.chosen).toEqual({ baseName: "Fresh Idea", designator: "LLC", name: "Fresh Idea LLC", source: "custom" });
      expect(ok.record.attempts.some((a) => a.source === "custom" && a.name === "Taken Name LLC" && !a.available)).toBe(true);
    }
  });

  it("will not accept a custom name when the state has no availability checker", async () => {
    const s = svc({});
    const rec = await s.open({ filing, site: "NJ", state: "NJ", requested });
    const r = await s.decide(rec.token, { action: "custom", baseName: "Unchecked", decidedBy: "a" });
    expect(r).toEqual({ ok: false, reason: "unverifiable" });
  });

  it("regenerates a fresh set of options avoiding the prior ones", async () => {
    const s = svc({ NJ: predicateChecker(() => true) });
    const rec = await s.open({ filing, site: "NJ", state: "NJ", requested });
    const before = rec.options.map((o) => o.name);
    const r = await s.decide(rec.token, { action: "regenerate", decidedBy: "a" });
    expect(r.ok && r.outcome).toBe("regenerated");
    if (r.ok) {
      expect(r.record.status).toBe("awaiting_admin");
      expect(r.record.options.some((o) => before.includes(o.name))).toBe(false);
    }
  });

  it("aborts the filing on request", async () => {
    const s = svc({ NJ: predicateChecker(() => true) });
    const rec = await s.open({ filing, site: "NJ", state: "NJ", requested });
    const r = await s.decide(rec.token, { action: "abort", decidedBy: "a", reason: "client withdrew" });
    expect(r.ok && r.outcome).toBe("aborted");
    if (r.ok) expect(r.record.status).toBe("aborted");
  });

  it("rejects a forged or malformed token", async () => {
    const s = svc({ NJ: predicateChecker(() => true) });
    expect(await s.decide("not-a-token", { action: "regenerate", decidedBy: "a" })).toEqual({ ok: false, reason: "invalid_token" });
  });
});

describe("FilingService name-resolution decision", () => {
  it("applies the chosen name, re-authorizes as admin, and re-queues the run", async () => {
    const store = await seededStore();
    const approvals = new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 168 });
    const webhooks = new WebhookDispatcher(store, async () => ({ status: 200 }));
    const queue = new InMemoryQueue();
    const vault = new InMemoryVault();
    const drift = new DriftReviewService(store);
    const nameResolution = new NameResolutionService({
      store, generator: new StaticNameGenerator(), checkers: { NJ: predicateChecker(() => true) },
      signingSecret: SECRET, publicBaseUrl: "http://api.test", config: { maxOptions: 3, maxBatches: 3, ttlHours: 168 },
    });
    const reviewGate = new ReviewGateService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test" });
    const service = new FilingService({ store, approvals, webhooks, queue, vault, drift, nameResolution, reviewGate, dryRunDefault: false });

    // A validated filing, moved (for the test) into the awaiting_name_resolution state.
    const { filing: created } = await service.createFiling(njFormationRequest({ dryRun: false }));
    const rec = await nameResolution.open({
      filing: created, site: "NJ", state: "NJ",
      requested: { baseName: created.request.formation!.name.baseName, designator: created.request.formation!.name.designator },
      purpose: created.request.formation!.purpose,
    });
    // The client approved, and the live run then found the name taken.
    await store.updateApproval(created.currentApprovalId!, { status: "approved" });
    await store.updateFiling(created.id, { status: "awaiting_name_resolution" });

    const choice = rec.options[0]!;
    const r = await service.onNameResolutionDecision(rec.token, { action: "pick", option: choice.name, decidedBy: "admin@firm" });
    expect(r.ok).toBe(true);

    const after = (await store.getFiling(created.id))!;
    expect(after.request.formation!.name.baseName).toBe(choice.baseName);
    expect(after.status).toBe("queued");
    // A new, admin-authorized approval bound to the renamed payload (client never re-approves).
    expect(after.currentApprovalId).not.toBe(created.currentApprovalId);
    const appr = (await store.getApproval(after.currentApprovalId!))!;
    expect(appr.status).toBe("approved");
    expect(appr.payloadHash).toBe(approvals.payloadHash(after.request));
    expect(appr.comment).toContain("name resolved by admin");
    // Re-queued for a fresh run, and the resolution event emitted.
    expect(await queue.size()).toBe(1);
    const types = (await store.listDeliveries(created.id)).map((d) => d.event.type);
    expect(types).toContain("filing.name_resolved");
  });
});
