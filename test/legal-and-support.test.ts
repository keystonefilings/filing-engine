import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { Notifier } from "../src/comms/notifier.js";
import { filerNameFor } from "../src/settings/filer.js";
import type { ChannelSender, OutboundMessage } from "../src/comms/senders.js";
import type { MemoryStore } from "../src/store/memory.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";

/** Nov 26 decisions: who "the filing company" is, the support address, and agreeing to the terms. */

const outbox: { address: string; msg: OutboundMessage }[] = [];
const email: ChannelSender = { channel: "email", async send(to, msg) { outbox.push({ address: to.address, msg }); return { ok: true }; } };
let store: MemoryStore;
let app: FastifyInstance;
beforeAll(async () => {
  store = await seededStore();
  const w = wire(store);
  app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" }, sessionSecret: "session-secret-for-tests-0123456789", email, webBaseUrl: "http://web.test", platformTenantId: "keystone", partnerSignupMode: "automatic", platformName: "CoFile", supportEmail: "hello@cofile.app" });
  await app.ready();
});
afterAll(async () => { await app.close(); });

describe("the filing company", () => {
  it("is the partner firm filing through CoFile, or the enterprise under its own name", async () => {
    const tenant = (await store.getTenant("keystone"))!;
    expect(filerNameFor({ name: "Best Accounting LLC", portal: { displayName: "Best Accounting" } as never, partner: {} as never }, tenant, "CoFile")).toBe("Best Accounting, filing through CoFile");
    expect(filerNameFor({ name: "Acme CPA", portal: undefined, partner: undefined }, { ...tenant, name: "Acme Filings Inc", branding: { displayName: "Acme Filings" } }, "CoFile")).toBe("Acme Filings");
    const r = await app.inject({ method: "GET", url: "/v1/client-companies/acme-cpa", headers: { "x-api-key": "k1" } });
    expect(r.json().filerName).toBe(tenant.branding.displayName || tenant.name);
  });
});

describe("terms at sign-up", () => {
  it("records the version the person agreed to, and when", async () => {
    const r = await app.inject({ method: "POST", url: "/v1/signups/partner", payload: { companyName: "Terms Firm", companyType: "cpa", name: "Ana Lee", email: "ana@terms.test", password: "correct horse battery staple", states: ["NY"], termsVersion: "2026-11-26" } });
    expect(r.statusCode).toBe(202);
    const u = (await store.findUserByEmail("ana@terms.test"))!;
    expect(u.termsAccepted?.version).toBe("2026-11-26");
    expect(u.termsAccepted?.at).toBeTruthy();
    expect((await app.inject({ method: "POST", url: "/v1/signups/partner", payload: { companyName: "Bad", companyType: "cpa", name: "Bo Lee", email: "bo@terms.test", password: "correct horse battery staple", termsVersion: "yes" } })).statusCode).toBe(422);
  });
});

describe("support address", () => {
  it("ends staff notices, never a client's email", async () => {
    const sent: { address: string; msg: OutboundMessage }[] = [];
    const n = new Notifier({ store, senders: { email: { channel: "email", async send(to, msg) { sent.push({ address: to.address, msg }); return { ok: true }; } } }, publicBaseUrl: "http://api.test", supportEmail: "hello@cofile.app" });
    const w = wire(store);
    const { filing } = await w.service.createFiling(njFormationRequest({ dryRun: true }));
    const tenant = { ...(await store.getTenant("keystone"))!, adminChannels: [{ channel: "email" as const, address: "ops@firm.test" }] };
    await n.notify({ id: "e1", type: "filing.failed", tenantId: "keystone", filingId: filing.id, occurredAt: new Date().toISOString(), data: { error: "x" } }, filing, tenant);
    await n.notify({ id: "e2", type: "filing.awaiting_approval", tenantId: "keystone", filingId: filing.id, occurredAt: new Date().toISOString(), data: { approvalLink: "http://api.test/approve/t" } }, filing, tenant);
    expect(sent.find((m) => m.address === "ops@firm.test")!.msg.body).toMatch(/Questions\? Email hello@cofile\.app\.$/);
    expect(sent.find((m) => m.address !== "ops@firm.test")!.msg.body).not.toContain("hello@cofile.app");
  });
});

describe("approval consent (decision 3)", () => {
  it("covers paying the fees shown up to the stated maximum, warns about refunds, and is recorded", async () => {
    const { renderReviewPage, approvalConsent, APPROVAL_CONSENT_VERSION } = await import("../src/approvals/render.js");
    const fees = [{ label: "Filing fee", amountUsd: 125 }, { label: "Copy", amountUsd: 5 }];
    expect(approvalConsent(fees, 200)).toMatch(/payment of the fees shown, up to the maximum you authorize \(\$200\.00\)/);
    expect(approvalConsent(fees)).toMatch(/up to the total shown \(\$130\.00\)/);
    expect(approvalConsent(fees)).toMatch(/can't be refunded once paid/);
    const html = renderReviewPage({ filingId: "f1", filingTitle: "T", payload: {}, fees, feeCapUsd: 200, expiresAt: "2026-12-01T00:00:00Z", einInRun: false, postUrl: "#", requireCode: false });
    expect(html).toContain("Approve, and authorize submission and payment");
    expect(html).toContain("up to the maximum you authorize ($200.00)");

    const w = wire(store);
    const { filing } = await w.service.createFiling(njFormationRequest({ dryRun: true }));
    const a = (await store.getApproval((await store.getFiling(filing.id))!.currentApprovalId!))!;
    await w.service.onApprovalDecision(a.token, "approve", {});
    expect((await store.getApproval(a.id))!.consentVersion).toBe(APPROVAL_CONSENT_VERSION);
  });
});

describe("saved-signature consent (decision 4)", () => {
  it("covers only forms that name the signer, drops 'filed in my name', and is revocable", async () => {
    const { SIGNATURE_CONSENT } = await import("../src/api/signatures.js");
    expect(SIGNATURE_CONSENT).toMatch(/that name me as the signer/);
    expect(SIGNATURE_CONSENT).toMatch(/only on a filing that has been approved for submission/);
    expect(SIGNATURE_CONSENT).toMatch(/I can revoke this authorization at any time/);
    expect(SIGNATURE_CONSENT).not.toMatch(/filed in my name/);
    const r = await app.inject({ method: "GET", url: "/v1/signatures?clientCompanyId=acme-cpa", headers: { "x-api-key": "k1" } });
    expect(r.json().consentText).toBe(SIGNATURE_CONSENT);
  });
});
