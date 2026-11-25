import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { ClientCompanySettings, TenantSettings } from "../src/settings/schema.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";

/** V19 / V39: public pages and the website widget go through the engine with no key. */

let app: FastifyInstance;
let store: Awaited<ReturnType<typeof seededStore>>;
beforeAll(async () => {
  store = await seededStore();
  await store.putClientCompany(ClientCompanySettings.parse({ clientCompanyId: "firm-best", tenantId: "keystone", name: "Best Accounting", portal: { slug: "best-accounting", primaryColor: "#123456" }, partner: { setupDone: [] } }));
  await store.putTenant(TenantSettings.parse({ tenantId: "hale", name: "Hale Filing", approvalPreview: "payload" }));
  await store.putClientCompany(ClientCompanySettings.parse({ clientCompanyId: "hale-firm", tenantId: "hale", name: "Hale Client Firm", portal: { slug: "hale-client" } }));
  const w = wire(store);
  app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" }, platformTenantId: "keystone" });
  await app.ready();
});
afterAll(async () => { await app.close(); });

const submit = (tenant: string, slug: string, body: object) => app.inject({ method: "POST", url: `/v1/public/firms/${tenant}/${slug}/filings`, payload: body });

describe("public pages without a key (V39)", () => {
  it("shows a partner firm's public brand and takes a submission for that firm only", async () => {
    const g = await app.inject({ method: "GET", url: "/v1/public/firms/keystone/best-accounting" });
    expect(g.statusCode).toBe(200);
    expect(g.json().clientCompany.portal).toMatchObject({ slug: "best-accounting", primaryColor: "#123456" });
    expect(JSON.stringify(g.json())).not.toMatch(/approvers|payments|policies/);
    // The body can't move the filing to another firm or account.
    const r = await submit("keystone", "best-accounting", njFormationRequest({ idempotencyKey: "public-abcdef123456", clientCompanyId: "acme-cpa", tenantId: "other" } as never));
    expect(r.statusCode).toBe(201);
    expect(r.json().approvalLink).toBeUndefined();
    const f = (await store.getFiling(r.json().filing.id))!;
    expect(f).toMatchObject({ tenantId: "keystone", clientCompanyId: "firm-best" });
    expect((f.request.intake as { portal?: { source?: string } }).portal?.source).toBe("public_page");
    expect((await submit("keystone", "best-accounting", njFormationRequest({ idempotencyKey: "portal-x" } as never))).statusCode).toBe(422);
  });

  it("a subscriber's firm is public only once its owner switches public pages on", async () => {
    expect((await app.inject({ method: "GET", url: "/v1/public/firms/hale/hale-client" })).statusCode).toBe(404);
    const c = (await store.getClientCompany("hale-firm"))!;
    await store.putClientCompany({ ...c, portal: { ...c.portal!, publicPages: true } });
    expect((await app.inject({ method: "GET", url: "/v1/public/firms/hale/hale-client" })).statusCode).toBe(200);
    const r = await submit("hale", "hale-client", njFormationRequest({ idempotencyKey: "public-hale0000001" } as never));
    expect(r.statusCode).toBe(201);
    expect((await store.getFiling(r.json().filing.id))!.tenantId).toBe("hale");
    expect((await app.inject({ method: "GET", url: "/v1/public/firms/hale/nobody" })).statusCode).toBe(404);
  });
});
