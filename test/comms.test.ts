import { describe, it, expect } from "vitest";
import { MemoryStore } from "../src/store/memory.js";
import { Notifier } from "../src/comms/notifier.js";
import { LogChannelSender } from "../src/comms/senders.js";
import { TenantSettings } from "../src/settings/schema.js";
import { ApprovalService } from "../src/approvals/service.js";
import { WebhookDispatcher } from "../src/webhooks/dispatcher.js";
import { InMemoryQueue } from "../src/orchestrator/queue.js";
import { InMemoryVault } from "../src/settings/vault.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { FilingService } from "../src/orchestrator/service.js";
import { seededStore, njFormationRequest, SECRET } from "./helpers.js";
import type { WebhookEvent, EventType } from "../src/domain/events.js";
import type { FilingRecord } from "../src/store/types.js";

const now = new Date().toISOString();
function filing(): FilingRecord {
  return { id: "f1", tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: "k", status: "awaiting_approval", request: njFormationRequest(), payloadHash: "h", createdAt: now, updatedAt: now, artifacts: [] };
}
function ev(type: EventType, data: Record<string, unknown>): WebhookEvent {
  return { id: `e-${Math.random()}`, type, tenantId: "keystone", filingId: "f1", occurredAt: now, data };
}
function notifier(store = new MemoryStore()) {
  return new Notifier({ store, senders: {}, defaultSender: new LogChannelSender("email"), publicBaseUrl: "http://api.test" });
}

describe("Notifier", () => {
  it("sends the approval link to the client", async () => {
    const msgs = await notifier().notify(ev("filing.awaiting_approval", { approvalLink: "http://api.test/approve/tok", recipients: [{ channel: "email", address: "client@x.test", name: "Client" }] }), filing());
    expect(msgs).toHaveLength(1);
    expect(msgs[0]).toMatchObject({ audience: "client", address: "client@x.test", link: "http://api.test/approve/tok", status: "sent" });
  });

  it("routes name options to the filing-company admin, never the client", async () => {
    const tenant = TenantSettings.parse({ tenantId: "keystone", name: "Keystone", adminChannels: [{ channel: "slack", address: "#filings" }] });
    const msgs = await notifier().notify(ev("filing.name_options_ready", { adminLink: "http://api.test/admin/name-resolution/tok" }), filing(), tenant);
    expect(msgs).toHaveLength(1);
    expect(msgs[0]).toMatchObject({ audience: "admin", channel: "slack", address: "#filings", link: "http://api.test/admin/name-resolution/tok" });
  });

  it("carries the problem screenshot on the review-gate message", async () => {
    const tenant = TenantSettings.parse({ tenantId: "keystone", name: "Keystone", adminChannels: [{ channel: "email", address: "ops@firm.test" }] });
    const msgs = await notifier().notify(ev("filing.review_gate", { adminLink: "http://api.test/admin/review/tok", screenshotArtifactId: "art1" }), filing(), tenant);
    expect(msgs[0]?.screenshotArtifactId).toBe("art1");
    expect(msgs[0]?.audience).toBe("admin");
  });

  it("asks the client for missing info, defaulting to the filing contact", async () => {
    const msgs = await notifier().notify(ev("filing.information_required", { missing: [{ path: "formation.purpose", label: "business purpose" }] }), filing());
    expect(msgs[0]?.audience).toBe("client");
    expect(msgs[0]?.address).toBe("sam@example.test");
    expect(msgs[0]?.body).toMatch(/business purpose/);
  });

  it("ignores events no person needs to see", async () => {
    expect(await notifier().notify(ev("filing.started", { dryRun: true }), filing())).toHaveLength(0);
  });
});

describe("FilingService + Notifier", () => {
  it("records a client message when a filing reaches awaiting_approval", async () => {
    const store = await seededStore();
    const approvals = new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 168 });
    const webhooks = new WebhookDispatcher(store, async () => ({ status: 200 }));
    const service = new FilingService({
      store, approvals, webhooks, queue: new InMemoryQueue(), vault: new InMemoryVault(), drift: new DriftReviewService(store),
      notifier: notifier(store), dryRunDefault: true,
    });
    const { filing: f } = await service.createFiling(njFormationRequest());
    expect(f.status).toBe("awaiting_approval");
    const msgs = await store.listMessages(f.id);
    expect(msgs.some((m) => m.eventType === "filing.awaiting_approval" && m.audience === "client" && m.link)).toBe(true);
  });
});

import { renderMessage } from "../src/comms/render.js";

describe("bot-check stops", () => {
  it("tell the admin nothing was submitted and what to do, instead of a bare failure", () => {
    const m = renderMessage(ev("filing.failed", { stage: "bot_challenge", error: "bot challenge on MO: just a moment" }), filing())!;
    expect(m.audience).toBe("admin");
    expect(m.subject).toMatch(/^Portal bot check:/);
    expect(m.body).toContain("Nothing was submitted");
    expect(m.body).toContain("bot challenge on MO: just a moment");
    expect(renderMessage(ev("filing.failed", { stage: "payment", error: "card declined" }), filing())!.subject).toMatch(/^Failed:/);
  });
});
