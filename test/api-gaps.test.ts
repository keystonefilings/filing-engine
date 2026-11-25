import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";

/** V35 (docs/vision-check-2026-11-25.md): idempotency conflicts, cancel, API approval, pages, webhook test and log. */

let app: FastifyInstance;
const hooks: { url: string; headers: Record<string, string> }[] = [];

beforeAll(async () => {
  const store = await seededStore();
  const w = wire(store, { fetchImpl: (async (url: string, init: { headers: Record<string, string> }) => { hooks.push({ url, headers: init.headers }); return { status: 200 }; }) as never });
  app = buildServer({
    service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test",
    apiKeys: { k1: "keystone", k2: "other-co" }, webhooks: w.webhooks,
  });
  await app.ready();
});
afterAll(async () => { await app.close(); });

const h = (key = "k1") => ({ "x-api-key": key });
const create = (body: object, key = "k1") => app.inject({ method: "POST", url: "/v1/filings", headers: h(key), payload: body });

describe("API gaps (V35)", () => {
  it("refuses an idempotency key reused for a different request, and returns the filing for a retry", async () => {
    const req = njFormationRequest({ idempotencyKey: "idem-v35-1" });
    expect((await create(req)).statusCode).toBe(201);
    expect((await create(req)).statusCode).toBe(200);
    const other = { ...req, formation: { ...req.formation, name: { baseName: "Something Else Entirely", designator: "LLC" } } };
    const r = await create(other);
    expect(r.statusCode).toBe(409);
    expect(r.json().error).toMatch(/different request/);
  });

  it("cancels before anything starts at the state, and the approval link stops working", async () => {
    const r = (await create(njFormationRequest())).json();
    const c = await app.inject({ method: "POST", url: `/v1/filings/${r.filing.id}/cancel`, headers: h(), payload: { reason: "client changed their mind" } });
    expect(c.statusCode).toBe(200);
    expect(c.json().filing.status).toBe("aborted");
    expect((await app.inject({ method: "GET", url: new URL(r.approvalLink).pathname })).statusCode).toBe(410);
    expect((await app.inject({ method: "POST", url: `/v1/filings/${r.filing.id}/cancel`, headers: h() })).statusCode).toBe(409);
    expect((await app.inject({ method: "POST", url: `/v1/filings/${r.filing.id}/cancel`, headers: h("k2") })).statusCode).toBe(404);
  });

  it("records the client's approval collected in the subscriber's app", async () => {
    const r = (await create(njFormationRequest())).json();
    expect((await app.inject({ method: "POST", url: `/v1/filings/${r.filing.id}/approval`, headers: h(), payload: { decision: "approve" } })).statusCode).toBe(422);
    const a = await app.inject({ method: "POST", url: `/v1/filings/${r.filing.id}/approval`, headers: h(), payload: { decision: "approve", approvedBy: "Sam Rivera (in our app)" } });
    expect(a.statusCode).toBe(200);
    expect(["approved", "queued"]).toContain(a.json().filing.status);
    expect((await app.inject({ method: "POST", url: `/v1/filings/${r.filing.id}/approval`, headers: h(), payload: { decision: "approve", approvedBy: "again" } })).statusCode).toBe(409);
  });

  it("pages the filings list", async () => {
    const all = (await app.inject({ method: "GET", url: "/v1/filings", headers: h() })).json().filings.length;
    const p1 = (await app.inject({ method: "GET", url: "/v1/filings?limit=2", headers: h() })).json();
    expect(p1.filings).toHaveLength(2);
    expect(p1.nextBefore).toBeTruthy();
    const seen = new Set(p1.filings.map((f: { id: string }) => f.id));
    let before = p1.nextBefore as string | null;
    while (before) {
      const p = (await app.inject({ method: "GET", url: `/v1/filings?limit=2&before=${encodeURIComponent(before)}`, headers: h() })).json();
      for (const f of p.filings) { expect(seen.has(f.id)).toBe(false); seen.add(f.id); }
      before = p.nextBefore;
    }
    expect(seen.size).toBe(all);
  });

  it("sends a test delivery and shows the delivery log", async () => {
    const t = await app.inject({ method: "POST", url: "/v1/webhooks/test", headers: h() });
    expect(t.statusCode).toBe(202);
    expect(hooks.some((x) => x.headers["x-cofile-event"] === "webhook.test")).toBe(true);
    const log = (await app.inject({ method: "GET", url: "/v1/webhooks/deliveries?limit=5", headers: h() })).json().deliveries;
    expect(log[0]).toMatchObject({ eventType: "webhook.test", status: "delivered" });
    expect((await app.inject({ method: "GET", url: "/v1/webhooks/deliveries", headers: h("k2") })).json().deliveries.every((d: { eventType: string }) => d.eventType !== "webhook.test")).toBe(true);
  });
});
