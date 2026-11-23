import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";
import type { FastifyInstance } from "fastify";

let app: FastifyInstance;
const STAFF = "staff-key-0123456789abcdefghij";
beforeAll(async () => {
  const store = await seededStore();
  const w = wire(store);
  app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone", k2: "other-co" }, staffKeys: { [STAFF]: "ops@keystone" } });
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

  it("lets only platform staff change tenant settings (they carry webhooks, approvers and vault keys)", async () => {
    const put = (id: string, headers: Record<string, string>) => app.inject({ method: "PUT", url: `/v1/tenants/${id}`, headers, payload: { name: "Keystone Filings" } });
    expect((await put("keystone", {})).statusCode).toBe(401);
    expect((await put("keystone", { "x-api-key": "k1" })).statusCode).toBe(403); // even the tenant's own key
    expect((await put("new-co", { "x-api-key": "k2" })).statusCode).toBe(403);
    expect((await put("keystone", { "x-api-key": "wrong" })).statusCode).toBe(401);
    expect((await put("keystone", { "x-api-key": STAFF })).statusCode).toBe(200);
    expect((await put("new-co", { "x-api-key": STAFF })).statusCode).toBe(200); // staff create tenants
  });

  it("keeps drift reviews to platform staff and takes the reviewer from the key", async () => {
    for (const [method, url] of [["GET", "/v1/drift-reviews"], ["GET", "/v1/drift-reviews/x"], ["POST", "/v1/drift-reviews/x/decision"]] as const) {
      expect((await app.inject({ method, url })).statusCode).toBe(401);
      expect((await app.inject({ method, url, headers: { "x-api-key": "k1" } })).statusCode).toBe(403); // a tenant key is not enough
    }
    expect((await app.inject({ method: "GET", url: "/v1/drift-reviews", headers: { "x-api-key": STAFF } })).statusCode).toBe(200);
    // No decidedBy in the body: it is the staff identity. Unknown halt -> 409, not a validation error.
    const r = await app.inject({ method: "POST", url: "/v1/drift-reviews/nope/decision", headers: { "x-api-key": STAFF }, payload: { action: "accept" } });
    expect(r.statusCode).toBe(409);
  });

  it("does not treat built-in object names as API keys", async () => {
    for (const key of ["constructor", "__proto__", "toString"]) {
      expect((await app.inject({ method: "GET", url: "/v1/filings", headers: { "x-api-key": key } })).statusCode).toBe(401);
    }
  });
});
