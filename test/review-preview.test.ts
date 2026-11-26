import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { RunExecutor } from "../src/orchestrator/run.js";
import { reviewFingerprint } from "../src/orchestrator/review-fingerprint.js";
import { BrowserHarness } from "../src/browser/harness.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { ApprovalService } from "../src/approvals/service.js";
import { WebhookDispatcher } from "../src/webhooks/dispatcher.js";
import { InMemoryQueue } from "../src/orchestrator/queue.js";
import { InMemoryVault } from "../src/settings/vault.js";
import { FilingService } from "../src/orchestrator/service.js";
import { Notifier } from "../src/comms/notifier.js";
import { buildServer } from "../src/api/server.js";
import type { ChannelSender, OutboundMessage } from "../src/comms/senders.js";
import type { SiteAdapter } from "../src/adapters/types.js";
import type { MemoryStore } from "../src/store/memory.js";
import { seededStore, njFormationRequest, SECRET } from "./helpers.js";

/**
 * Decision 7 (V17, docs/vision-check-2026-11-25.md): a preview takes the state's review page, the
 * client approves that screenshot, and the live run pays only if the state shows the same page.
 */

describe("review fingerprint", () => {
  it("ignores what changes per session and nothing else", () => {
    const a = reviewFingerprint("Review\nName: Blue Harbor LLC\nDate: 11/25/2026 10:41 AM\nEIN 00-0000000\nSession 8f3k29dk20slq0w1");
    expect(reviewFingerprint("Review\nName: Blue Harbor LLC\nDate: 11/26/2026 9:02 AM\nEIN 12-3456789\nSession 1a2b3c4d5e6f7g8h9i")).toBe(a);
    expect(reviewFingerprint("Review\nName: Blue Harbour LLC\nDate: 11/25/2026 10:41 AM\nEIN 00-0000000\nSession 8f3k29dk20slq0w1")).not.toBe(a);
    expect(reviewFingerprint("Review  Name: Blue Harbor LLC   Total $125.00")).not.toBe(reviewFingerprint("Review Name: Blue Harbor LLC Total $155.00"));
  });
});

class Outbox implements ChannelSender {
  readonly channel = "email" as const;
  readonly sent: { address: string; msg: OutboundMessage }[] = [];
  async send(to: { address: string }, msg: OutboundMessage) { this.sent.push({ address: to.address, msg }); return { ok: true }; }
}

/** A portal whose review page the test can change between the preview and the live run. */
const portal = { name: "Blue Harbor Consulting LLC", date: "11/25/2026 10:41 AM" };
const reviewPage = () => `data:text/html,${encodeURIComponent(`<html><body><h1>Review your filing</h1><p>Name: ${portal.name}</p><p>Printed ${portal.date}</p><p>Total $125.00</p><button onclick="document.body.innerHTML='<h1>Thank you</h1><p>Confirmation number FL-778</p>'">Submit and pay</button></body></html>`)}`;
const adapter: SiteAdapter = {
  site: "FL", key: "test-review-portal", complete: true, entryUrl: reviewPage, profileKey: () => null, credentialKey: () => null,
  steps: [{
    screen: { screenKey: "t.review", title: "Review", intents: [] }, reviewScreen: true,
    async fill() {},
    async advance(ctx) { await ctx.submit("Submit and pay", () => ctx.clickButton(/submit and pay/i)); },
  }],
  async confirmSubmission(ctx) {
    const m = /Confirmation number (\S+)/.exec(await ctx.page.locator("body").innerText());
    return m ? { reference: m[1]!, detail: "receipt page" } : null;
  },
};

let harness: BrowserHarness;
let store: MemoryStore;
let service: FilingService;
let queue: InMemoryQueue;
let outbox: Outbox;
const artifacts = new FsArtifactStore("var/test-artifacts");

beforeAll(async () => {
  harness = new BrowserHarness({ chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles" });
  store = await seededStore();
  await store.putTenant({ ...(await store.getTenant("keystone"))!, approvalPreview: "review_page" });
  queue = new InMemoryQueue();
  outbox = new Outbox();
  const approvals = new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 168 });
  const executor = new RunExecutor({ store, artifacts, harness, drift: new DriftReviewService(store), vault: { getCredential: async () => null }, firstObservationPolicy: "accept" });
  service = new FilingService({
    store, approvals, webhooks: new WebhookDispatcher(store, async () => ({ status: 200 })), queue, vault: new InMemoryVault(),
    drift: new DriftReviewService(store), executor, dryRunDefault: false, adapterFor: () => adapter,
    notifier: new Notifier({ store, senders: { email: outbox }, publicBaseUrl: "http://api.test", artifacts }),
  });
});
afterAll(async () => { await harness.close(); });

const events = async (id: string) => (await store.listDeliveries(id)).map((d) => d.event);
async function previewAndApprove() {
  portal.name = "Blue Harbor Consulting LLC"; portal.date = "11/25/2026 10:41 AM";
  const { filing, approvalLink } = await service.createFiling(njFormationRequest({ dryRun: false }));
  expect(filing.status).toBe("previewing");
  expect(approvalLink).toBeUndefined();
  await service.runFiling(filing.id, { dryRun: true });
  const previewed = (await store.getFiling(filing.id))!;
  expect(previewed.status).toBe("awaiting_approval");
  const approval = (await store.getApproval(previewed.currentApprovalId!))!;
  return { id: filing.id, approval };
}

describe("approval on the state's review page (decision 7)", () => {
  it("previews, sends the screenshot for approval, and files when the state shows the same page", async () => {
    const { id, approval } = await previewAndApprove();
    expect(approval.review).toMatchObject({ screenKey: "t.review", site: "FL" });
    expect(approval.review!.artifactId).toBeTruthy();
    // The email carries the screenshot; the event says the approval is on the review page.
    const ev = (await events(id)).find((e) => e.type === "filing.awaiting_approval")!;
    expect(ev.data).toMatchObject({ reviewPage: true, reviewShotArtifactId: approval.review!.artifactId });
    const mail = outbox.sent.find((m) => m.msg.subject.startsWith("Your proof is ready to approve"))!;
    expect(mail.msg.attachments?.[0]).toMatchObject({ filename: "State review page.png", contentType: "image/png" });

    await service.onApprovalDecision(approval.token, "approve", {});
    expect((await store.getFiling(id))!.status).toBe("queued");
    portal.date = "11/26/2026 9:02 AM"; // a later day: still the same page
    await service.runFiling(id);
    const done = (await store.getFiling(id))!;
    expect(done.status).toBe("submitted");
    const run = (await store.getRun(done.currentRunId!))!;
    expect(run.steps.some((s) => s.note === "review page matches the one the client approved")).toBe(true);
  });

  it("stops before paying when the state's page changed, and starts a new preview", async () => {
    const { id, approval } = await previewAndApprove();
    await service.onApprovalDecision(approval.token, "approve", {});
    portal.name = "Blue Harbour Consulting LLC"; // the state now shows something else
    await service.runFiling(id);
    const f = (await store.getFiling(id))!;
    expect(f.status).toBe("previewing");
    expect(f.lastError).toMatch(/review page changed/);
    // Nothing was clicked: no submit intent was opened for the live run.
    expect([...store.intents.values()].filter((i) => i.filingId === id && i.clickedAt && i.outcome !== "dry_run_stop")).toHaveLength(0);
    expect((await events(id)).map((e) => e.type)).toEqual(expect.arrayContaining(["filing.blocked", "filing.previewing"]));
  });

  it("shows the screenshot on the approval page, only to a usable link", async () => {
    const { approval } = await previewAndApprove();
    const app = buildServer({ service, approvals: new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 168 }), store, artifacts, publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" } });
    await app.ready();
    try {
      const page = await app.inject({ method: "GET", url: `/approve/${approval.token}` });
      expect(page.body).toContain(`/approve/${approval.token}/review.png`);
      const img = await app.inject({ method: "GET", url: `/approve/${approval.token}/review.png` });
      expect(img.statusCode).toBe(200);
      expect(img.headers["content-type"]).toBe("image/png");
      expect((await app.inject({ method: "GET", url: "/approve/not-a-real-token/review.png" })).statusCode).toBe(404);
    } finally { await app.close(); }
  });

  it("practice filings and tenants on data-only approval skip the preview", async () => {
    const practice = await service.createFiling(njFormationRequest({ dryRun: true }));
    expect(practice.filing.status).toBe("awaiting_approval");
    await store.putTenant({ ...(await store.getTenant("keystone"))!, approvalPreview: "payload" });
    try {
      const plain = await service.createFiling(njFormationRequest({ dryRun: false }));
      expect(plain.filing.status).toBe("awaiting_approval");
    } finally {
      await store.putTenant({ ...(await store.getTenant("keystone"))!, approvalPreview: "review_page" });
    }
  });
});
