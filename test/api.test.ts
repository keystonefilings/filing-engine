import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";
import type { FastifyInstance } from "fastify";

let app: FastifyInstance;
beforeAll(async () => {
  const store = await seededStore();
  const w = wire(store);
  app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" } });
  await app.ready();
});
afterAll(() => app.close());

describe("API", () => {
  it("creates a filing, serves the masked approval page, records approval", async () => {
    const req = njFormationRequest({ ein: { mode: "in_run", closingMonth: 12, responsibleParty: { name: "Sam Rivera", ssn: "123-45-6789", title: "Member", address: { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" }, phone: "2015550100" }, ss4AuthorizationArtifactId: "art-1" } });
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
});
