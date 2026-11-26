import { describe, expect, it } from "vitest";
import { canonicalHash } from "../src/approvals/hash.js";
import { mintToken, verifyToken } from "../src/approvals/token.js";
import { maskSensitive, renderReviewPage } from "../src/approvals/render.js";
import { seededStore, wire, njFormationRequest, SECRET } from "./helpers.js";
import { ClientCompanySettings } from "../src/settings/schema.js";

describe("hash and token", () => {
  it("hashes independent of key order and undefined", () => {
    expect(canonicalHash({ a: 1, b: { c: 2, d: undefined } })).toBe(canonicalHash({ b: { c: 2 }, a: 1 }));
    expect(canonicalHash({ a: 1 })).not.toBe(canonicalHash({ a: 2 }));
  });
  it("verifies its own tokens and rejects tampering", () => {
    const t = mintToken(SECRET, "abc");
    expect(verifyToken(SECRET, t)).toEqual({ approvalId: "abc" });
    expect(verifyToken(SECRET, t.replace(/.$/, (c) => (c === "A" ? "B" : "A")))).toBeNull();
    expect(verifyToken("other-secret", t)).toBeNull();
  });
  it("masks the SSN", () => {
    const m = maskSensitive({ ein: { responsibleParty: { ssn: "123-45-6789" } } });
    expect(m.ein.responsibleParty.ssn).toBe("***-**-6789");
    const html = renderReviewPage({ filingId: "f", filingTitle: "t", payload: m, fees: [{ label: "fee", amountUsd: 100 }], expiresAt: "x", einInRun: true, postUrl: "/p", requireCode: false });
    expect(html).toContain("***-**-6789");
    expect(html).not.toContain("123-45");
    expect(html).toContain("we'll get the EIN from the IRS");
  });
});

describe("approval service", () => {
  it("creates, decides once, and verifies hash + settings at run start", async () => {
    const store = await seededStore();
    const { service, approvals } = wire(store);
    const { filing, approvalLink } = await service.createFiling(njFormationRequest());
    expect(filing.status).toBe("awaiting_approval");
    expect(approvalLink).toMatch(/^http:\/\/api.test\/approve\//);
    const token = approvalLink!.split("/approve/")[1]!;

    const first = await service.onApprovalDecision(token, "approve", { ip: "1.2.3.4" });
    expect(first.ok).toBe(true);
    const second = await approvals.decide(token, "approve", {});
    expect(second).toEqual({ ok: false, reason: "already_decided" });

    const f = (await store.getFiling(filing.id))!;
    expect(f.status).toBe("queued");
    const a = (await store.getApproval(f.currentApprovalId!))!;
    const tenant = (await store.getTenant("keystone"))!;
    const client = (await store.getClientCompany("acme-cpa"))!;
    expect(approvals.verifyForRun(f, a, tenant, client)).toEqual({ ok: true });

    // Settings change after approval -> run must not start (decision 2).
    const changed = ClientCompanySettings.parse({ ...client, njStoredPaymentMethod: "stored_echeck" });
    expect(approvals.verifyForRun(f, a, tenant, changed).ok).toBe(false);
    // Payload change after approval -> same.
    const tampered = { ...f, request: { ...f.request, contact: { ...f.request.contact, email: "x@y.test" } } };
    expect(approvals.verifyForRun(tampered, a, tenant, client).ok).toBe(false);
  });

  it("expires and is idempotent per tenant+key", async () => {
    const store = await seededStore();
    let now = new Date("2026-11-16T10:00:00Z");
    const { ApprovalService } = await import("../src/approvals/service.js");
    const approvals = new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 1, now: () => now });
    const w = wire(store);
    const req = njFormationRequest();
    const r1 = await w.service.createFiling(req);
    const r2 = await w.service.createFiling(req);
    expect(r2.existing).toBe(true);
    expect(r2.filing.id).toBe(r1.filing.id);

    const tenant = (await store.getTenant("keystone"))!;
    const client = (await store.getClientCompany("acme-cpa"))!;
    const a = await approvals.create(r1.filing, tenant, client, []);
    now = new Date("2026-11-16T12:00:00Z");
    expect(await approvals.lookup(a.token)).toEqual({ ok: false, reason: "expired" });
  });
});
