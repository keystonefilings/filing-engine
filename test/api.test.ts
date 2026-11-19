import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";
import type { FastifyInstance } from "fastify";
import type { MemoryStore } from "../src/store/memory.js";
import { TenantSettings } from "../src/settings/schema.js";

let app: FastifyInstance;
let store: MemoryStore;
beforeAll(async () => {
  store = await seededStore();
  await store.putTenant(TenantSettings.parse({ tenantId: "otherco", name: "Other Co" }));
  const w = wire(store);
  app = buildServer({
    service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test",
    apiKeys: { k1: "keystone", k2: "otherco" }, staffKeys: { s1: "ops@platform.test" },
  });
  await app.ready();
});
afterAll(() => app.close());

describe("API", () => {
  it("creates a filing, serves the masked approval page, records approval", async () => {
    const req = njFormationRequest({ ein: { mode: "in_run", closingMonth: 12, responsibleParty: { name: "Sam Rivera", ssn: "123-45-6789", title: "Member", address: { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" }, phone: "2015550100" }, formationState: "NJ", businessActivity: { category: "Other", detail: "Consulting" }, ss4AuthorizationArtifactId: "art-1" } as never });
    const unauth = await app.inject({ method: "POST", url: "/v1/filings", payload: req });
    expect(unauth.statusCode).toBe(401);
    const res = await app.inject({ method: "POST", url: "/v1/filings", headers: { "x-api-key": "k1" }, payload: req });
    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body.filing.status).toBe("awaiting_approval");
    expect(body.filing.request.ein.responsibleParty.ssn).toBe("***-**-6789");
    expect(body.approvalLink).toContain("/approve/");

    const token = body.approvalLink.split("/approve/")[1];
    const page = await app.inject({ method: "GET", url: `/approve/${token}` });
    expect(page.statusCode).toBe(200);
    expect(page.body).toContain("***-**-6789");
    expect(page.body).not.toContain("123-45-6789");
    expect(page.body).toContain("Blue Harbor Consulting");

    const bad = await app.inject({ method: "POST", url: `/approve/${token}x`, payload: "decision=approve", headers: { "content-type": "application/x-www-form-urlencoded" } });
    expect(bad.statusCode).toBe(410);
    const ok = await app.inject({ method: "POST", url: `/approve/${token}`, payload: "decision=approve&comment=looks+right", headers: { "content-type": "application/x-www-form-urlencoded" } });
    expect(ok.statusCode).toBe(200);
    const get = await app.inject({ method: "GET", url: `/v1/filings/${body.filing.id}`, headers: { "x-api-key": "k1" } });
    expect(get.json().filing.status).toBe("queued");
    const deliveries = await app.inject({ method: "GET", url: `/v1/filings/${body.filing.id}/deliveries`, headers: { "x-api-key": "k1" } });
    expect(deliveries.json().deliveries.map((d: { event: { type: string } }) => d.event.type)).toEqual(["filing.validated", "filing.awaiting_approval", "filing.approved"]);
  });

  it("returns 422 with issues for invalid input", async () => {
    const res = await app.inject({ method: "POST", url: "/v1/filings", headers: { "x-api-key": "k1" }, payload: { type: "formation" } });
    expect(res.statusCode).toBe(422);
    expect(res.json().issues.length).toBeGreaterThan(0);
  });

  it("tenant settings are platform-staff only", async () => {
    const body = { name: "Keystone Filings", webhookEndpoints: [{ url: "https://attacker.example.test/h", secret: "attacker-secret-0123456789" }] };
    const none = await app.inject({ method: "PUT", url: "/v1/tenants/keystone", payload: body });
    expect(none.statusCode).toBe(401);
    const tenantKey = await app.inject({ method: "PUT", url: "/v1/tenants/keystone", headers: { "x-api-key": "k1" }, payload: body });
    expect(tenantKey.statusCode).toBe(403);
    // Prototype names are not keys.
    const proto = await app.inject({ method: "PUT", url: "/v1/tenants/keystone", headers: { "x-api-key": "constructor" }, payload: body });
    expect(proto.statusCode).toBe(401);
    expect((await store.getTenant("keystone"))!.webhookEndpoints[0]!.url).toBe("https://hooks.example.test/filings");
    const staff = await app.inject({ method: "PUT", url: "/v1/tenants/newco", headers: { "x-api-key": "s1" }, payload: { name: "New Co" } });
    expect(staff.statusCode).toBe(200);
    expect((await store.getTenant("newco"))!.name).toBe("New Co");
  });

  it("drift reviews are platform-staff only, and the decision records the staff identity", async () => {
    const { filing } = await wire(store).service.createFiling(njFormationRequest());
    const halt = await store.createDriftHalt({
      id: crypto.randomUUID(), runId: "r1", filingId: filing.id, site: "NJ", screenKey: "nj.payment", previous: null,
      current: { site: "NJ", screenKey: "nj.payment", fields: [], prices: [], takenAt: new Date().toISOString(), fingerprint: "x" },
      diff: null, proposal: { summary: "s", items: [], requiresClientReapproval: false }, status: "pending", requiresClientReapproval: false, createdAt: new Date().toISOString(),
    });
    for (const headers of [{}, { "x-api-key": "k1" }]) {
      expect((await app.inject({ method: "GET", url: "/v1/drift-reviews", headers })).statusCode).toBeGreaterThanOrEqual(401);
      expect((await app.inject({ method: "GET", url: `/v1/drift-reviews/${halt.id}`, headers })).statusCode).toBeGreaterThanOrEqual(401);
      const d = await app.inject({ method: "POST", url: `/v1/drift-reviews/${halt.id}/decision`, headers, payload: { action: "accept", decidedBy: "someone" } });
      expect([401, 403]).toContain(d.statusCode);
    }
    expect((await store.getDriftHalt(halt.id))!.status).toBe("pending");
    const list = await app.inject({ method: "GET", url: "/v1/drift-reviews", headers: { "x-api-key": "s1" } });
    expect(list.statusCode).toBe(200);
    const ok = await app.inject({ method: "POST", url: `/v1/drift-reviews/${halt.id}/decision`, headers: { "x-api-key": "s1" }, payload: { action: "accept", decidedBy: "spoofed" } });
    expect(ok.statusCode).toBe(200);
    expect((await store.getDriftHalt(halt.id))!.decidedBy).toBe("ops@platform.test");
  });

  it("a tenant cannot take over another tenant's client company", async () => {
    const res = await app.inject({ method: "PUT", url: "/v1/client-companies/acme-cpa", headers: { "x-api-key": "k2" }, payload: { name: "Hijacked", einMode: "after_acceptance" } });
    expect(res.statusCode).toBe(409);
    const acme = (await store.getClientCompany("acme-cpa"))!;
    expect(acme.tenantId).toBe("keystone");
    expect(acme.name).toBe("Acme CPA");
    // The owner can still update it, and anyone can create a new id.
    expect((await app.inject({ method: "PUT", url: "/v1/client-companies/acme-cpa", headers: { "x-api-key": "k1" }, payload: { ...acme, name: "Acme CPA LLP" } })).statusCode).toBe(200);
    expect((await store.getClientCompany("acme-cpa"))!.name).toBe("Acme CPA LLP");
    expect((await app.inject({ method: "PUT", url: "/v1/client-companies/other-firm", headers: { "x-api-key": "k2" }, payload: { name: "Other Firm", einMode: "after_acceptance" } })).statusCode).toBe(200);
    expect((await store.getClientCompany("other-firm"))!.tenantId).toBe("otherco");
  });
});
