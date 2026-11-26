import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { API_KEY_PREFIX, hashApiKey, newApiKey, webhookUrlProblem } from "../src/api/self-service.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";
import type { FastifyInstance } from "fastify";

let app: FastifyInstance;
let store: Awaited<ReturnType<typeof seededStore>>;
beforeAll(async () => {
  store = await seededStore();
  const w = wire(store);
  app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone", k2: "other-co" }, staffKeys: {} });
  await app.ready();
});
afterAll(() => app.close());

const as = (key: string) => ({ "x-api-key": key });

describe("self-service API keys", () => {
  it("creates a key shown once, accepts it, lists it without the key, and revokes it", async () => {
    const created = await app.inject({ method: "POST", url: "/v1/api-keys", headers: as("k1"), payload: { name: "website" } });
    expect(created.statusCode).toBe(201);
    const { key, apiKey } = created.json();
    expect(key).toMatch(/^cofile_[A-Za-z0-9_-]{43}$/); // decision 17: new keys carry the CoFile prefix
    expect(apiKey.prefix).toBe(key.slice(0, 15));
    expect(JSON.stringify(apiKey)).not.toContain(key);

    const account = await app.inject({ method: "GET", url: "/v1/account", headers: as(key) });
    expect(account.statusCode).toBe(200);
    expect(account.json().tenantId).toBe("keystone");

    const list = await app.inject({ method: "GET", url: "/v1/api-keys", headers: as("k1") });
    expect(list.body).not.toContain(key);
    expect(list.json().keys).toHaveLength(1);

    // Another tenant cannot see or revoke it.
    expect((await app.inject({ method: "GET", url: "/v1/api-keys", headers: as("k2") })).json().keys).toHaveLength(0);
    expect((await app.inject({ method: "DELETE", url: `/v1/api-keys/${apiKey.id}`, headers: as("k2") })).statusCode).toBe(404);

    expect((await app.inject({ method: "DELETE", url: `/v1/api-keys/${apiKey.id}`, headers: as("k1") })).statusCode).toBe(200);
    expect((await app.inject({ method: "GET", url: "/v1/account", headers: as(key) })).statusCode).toBe(401);
  });

  it("keeps accepting keys issued with the older kfe_ prefix (decision 17)", async () => {
    const legacy = `kfe_${"a".repeat(43)}`;
    await store.createApiKey({ id: "legacy-key", tenantId: "keystone", name: "old website", prefix: legacy.slice(0, 12), hash: hashApiKey(legacy), createdAt: "2026-11-20T12:00:00Z" });
    const account = await app.inject({ method: "GET", url: "/v1/account", headers: as(legacy) });
    expect(account.statusCode).toBe(200);
    expect(account.json().tenantId).toBe("keystone");
    // A stored hash alone isn't enough: a key without a self-service prefix is never looked up.
    const other = `xyz_${"a".repeat(43)}`;
    await store.createApiKey({ id: "no-prefix", tenantId: "keystone", name: "bad", prefix: other.slice(0, 12), hash: hashApiKey(other), createdAt: "2026-11-20T12:00:00Z" });
    expect((await app.inject({ method: "GET", url: "/v1/account", headers: as(other) })).statusCode).toBe(401);
    expect(newApiKey().key.startsWith(API_KEY_PREFIX)).toBe(true);
    expect(API_KEY_PREFIX).toBe("cofile_");
  });

  it("refuses requests without a key", async () => {
    expect((await app.inject({ method: "GET", url: "/v1/api-keys" })).statusCode).toBe(401);
    expect((await app.inject({ method: "GET", url: "/v1/usage" })).statusCode).toBe(401);
  });
});

describe("self-service webhook endpoints", () => {
  it("keeps an existing secret, generates one for a new endpoint, and never returns secrets on read", async () => {
    const put = await app.inject({
      method: "PUT", url: "/v1/webhook-endpoints", headers: as("k1"),
      payload: { endpoints: [{ url: "https://hooks.example.test/filings" }, { url: "https://other.example.test/in", events: ["filing.completed"] }] },
    });
    expect(put.statusCode).toBe(200);
    const body = put.json();
    expect(body.generatedSecrets).toHaveLength(1);
    expect(body.generatedSecrets[0].url).toBe("https://other.example.test/in");
    const tenant = await store.getTenant("keystone");
    expect(tenant!.webhookEndpoints.find((e) => e.url === "https://hooks.example.test/filings")!.secret).toBe("endpoint-secret-0123456789");
    const read = await app.inject({ method: "GET", url: "/v1/webhook-endpoints", headers: as("k1") });
    expect(read.body).not.toContain("endpoint-secret-0123456789");
    expect(read.json().endpoints[0].secretHint).toBe("…6789");
  });

  it("rejects private, plain-http and duplicate URLs", async () => {
    const res = await app.inject({
      method: "PUT", url: "/v1/webhook-endpoints", headers: as("k1"),
      payload: { endpoints: [{ url: "http://example.test/x" }, { url: "https://127.0.0.1/x" }, { url: "https://a.example.test/" }, { url: "https://a.example.test/" }] },
    });
    expect(res.statusCode).toBe(422);
    expect(res.json().issues.length).toBe(3);
  });

  it("names the URL problems", () => {
    expect(webhookUrlProblem("https://hooks.example.com/x")).toBeNull();
    expect(webhookUrlProblem("https://169.254.169.254/latest")).toMatch(/public/);
    expect(webhookUrlProblem("https://10.0.0.5/")).toMatch(/public/);
    expect(webhookUrlProblem("https://[::1]/")).toMatch(/public/);
    expect(webhookUrlProblem("https://svc.internal/")).toMatch(/public/);
    expect(webhookUrlProblem("https://user:pw@example.com/")).toMatch(/password/);
  });
});

describe("usage, client companies and filing filters", () => {
  it("counts only the tenant's own filings and lists only its own firms", async () => {
    const r = await app.inject({ method: "POST", url: "/v1/filings", headers: as("k1"), payload: njFormationRequest() });
    expect(r.statusCode).toBe(201);
    const usage = (await app.inject({ method: "GET", url: "/v1/usage", headers: as("k1") })).json();
    expect(usage.filings.total).toBeGreaterThanOrEqual(1);
    expect(usage.filings.byClientCompany["acme-cpa"]).toBeGreaterThanOrEqual(1);
    expect((await app.inject({ method: "GET", url: "/v1/usage", headers: as("k2") })).json().filings.total).toBe(0);

    const firms = (await app.inject({ method: "GET", url: "/v1/client-companies", headers: as("k1") })).json().clientCompanies;
    expect(firms.map((c: { clientCompanyId: string }) => c.clientCompanyId).sort()).toEqual(["acme-cpa", "beta-llc"]);
    expect((await app.inject({ method: "GET", url: "/v1/client-companies/acme-cpa", headers: as("k2") })).statusCode).toBe(404);

    const mine = (await app.inject({ method: "GET", url: "/v1/filings?clientCompanyId=beta-llc", headers: as("k1") })).json().filings;
    expect(mine).toHaveLength(0);
    const detail = (await app.inject({ method: "GET", url: `/v1/filings/${r.json().filing.id}`, headers: as("k1") })).json();
    expect(detail.approvalLink).toContain("/approve/");
  });

  it("keeps portal slugs unique within a tenant", async () => {
    const put = (id: string, slug: string) => app.inject({ method: "PUT", url: `/v1/client-companies/${id}`, headers: as("k1"), payload: { name: id, portal: { slug } } });
    expect((await put("gamma-cpa", "gamma")).statusCode).toBe(200);
    expect((await put("delta-cpa", "gamma")).statusCode).toBe(409);
    expect((await put("gamma-cpa", "gamma")).statusCode).toBe(200);
  });
});
