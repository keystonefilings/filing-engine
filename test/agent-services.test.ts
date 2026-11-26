import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { AgentServices } from "../src/registered-agents/agent-services.js";
import { StripeClient } from "../src/billing/stripe.js";
import type { ChannelSender, OutboundMessage } from "../src/comms/senders.js";
import type { FilingRecord } from "../src/store/types.js";
import type { MemoryStore } from "../src/store/memory.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";

/** Decision 9: our registered agent (Registered Agents, Inc., resold) for partner firms, $59 a year per business. */

const RAI_NJ = { name: "Registered Agents Inc", address: { street1: "1 Agent Way", city: "Trenton", state: "NJ", zip: "08608" } };
let store: MemoryStore;
let now = new Date("2026-12-01T12:00:00Z");
const mail: { address: string; msg: OutboundMessage }[] = [];
const email: ChannelSender = { channel: "email", async send(to, msg) { mail.push({ address: to.address, msg }); return { ok: true }; } };
const stripeCalls: { path: string; form: URLSearchParams; key?: string }[] = [];
const stripe = new StripeClient({ secretKey: "rk_test", fetchImpl: (async (url: string, init: { body?: string; headers: Record<string, string> }) => {
  stripeCalls.push({ path: new URL(url).pathname, form: new URLSearchParams(init.body ?? ""), key: init.headers["idempotency-key"] });
  return Response.json({ id: `ii_${stripeCalls.length}` });
}) as unknown as typeof fetch });
let agents: AgentServices;
let app: FastifyInstance;

beforeAll(async () => {
  store = await seededStore();
  // The platform resells Registered Agents, Inc.: its NJ agent is configured as the third-party provider.
  const t = (await store.getTenant("keystone"))!;
  await store.putTenant({ ...t, registeredAgentProvisioning: { ...(t.registeredAgentProvisioning ?? { selfByState: {} }), defaultProvisioning: "third_party", thirdParty: { provider: "registered_agents_inc", agents: { NJ: RAI_NJ } } } as never });
  const acme = (await store.getClientCompany("acme-cpa"))!;
  await store.putClientCompany({ ...acme, partner: { companyType: "cpa", contactName: "Pat", contactEmail: "pat@acme.test" } as never, portal: { ...(acme.portal ?? {}), slug: "acme" } as never });
  agents = new AgentServices({ store, platformTenantId: "keystone", providerName: "Registered Agents, Inc.", annualUsd: 59, stripe, email, opsEmail: "hello@cofile.app", now: () => now });
  const w = wire(store);
  app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" }, agentServices: agents });
  await app.ready();
});
afterAll(async () => { await app.close(); });

async function submittedWithOurAgent(name: string): Promise<FilingRecord> {
  const w = wire(store);
  const { filing } = await w.service.createFiling(njFormationRequest({ dryRun: true, formation: { ...(njFormationRequest().formation as object), name: { baseName: name, designator: "LLC" } } as never }));
  return store.updateFiling(filing.id, { status: "submitted", registeredAgentResolution: { source: "third_party", agent: RAI_NJ, provider: "registered_agents_inc", procurementRef: "static-NJ-1" } });
}

describe("what partner firms are offered", () => {
  it("our agent in the states the provider covers, only to partner firms on the platform", async () => {
    const t = (await store.getTenant("keystone"))!;
    expect(agents.offer(t, (await store.getClientCompany("acme-cpa"))!)).toEqual({ provider: "Registered Agents, Inc.", annualUsd: 59, states: ["NJ"] });
    expect(agents.offer(t, (await store.getClientCompany("beta-llc"))!)).toBeNull(); // not a partner
    expect(agents.offer({ ...t, tenantId: "acme-filings" }, (await store.getClientCompany("acme-cpa"))!)).toBeNull(); // an enterprise subscriber
    const got = await app.inject({ method: "GET", url: "/v1/client-companies/acme-cpa", headers: { "x-api-key": "k1" } });
    expect(got.json().ourAgent).toMatchObject({ provider: "Registered Agents, Inc.", annualUsd: 59 });
  });
});

describe("the yearly service", () => {
  it("starts when the filing is submitted, asks staff to place the order, and charges once a year", async () => {
    await store.putBillingAccount({ id: "firm:acme-cpa", tenantId: "keystone", clientCompanyId: "acme-cpa", plan: "partner", status: "active", customerId: "cus_acme", updatedAt: now.toISOString() });
    const f = await submittedWithOurAgent("Blue Harbor");
    const t = (await store.getTenant("keystone"))!, c = (await store.getClientCompany("acme-cpa"))!;
    const rec = (await agents.start(f, t, c))!;
    expect(rec).toMatchObject({ entityName: "Blue Harbor LLC", state: "NJ", orderedVia: "staff", yearsCharged: 1, status: "active" });
    expect(rec.nextChargeAt).toBe("2027-12-01T12:00:00.000Z");
    expect(mail.at(-1)).toMatchObject({ address: "hello@cofile.app" });
    expect(mail.at(-1)!.msg.subject).toMatch(/Order registered agent service: Blue Harbor LLC \(NJ\)/);
    const charge = stripeCalls.at(-1)!;
    expect(charge.path).toBe("/v1/invoiceitems");
    expect(charge.form.get("amount")).toBe("5900");
    expect(charge.form.get("customer")).toBe("cus_acme");
    expect(charge.key).toBe(`agent-service-${rec.id}-year-1`);
    // The same filing never starts a second service or a second charge.
    const before = stripeCalls.length;
    expect((await agents.start(f, t, c))!.id).toBe(rec.id);
    expect(stripeCalls.length).toBe(before);
    // A year later the sweep charges year 2.
    now = new Date("2027-12-02T00:00:00Z");
    expect(await agents.chargeDue()).toBe(1);
    expect((await store.getAgentService(rec.id))!).toMatchObject({ yearsCharged: 2, nextChargeAt: "2028-12-01T12:00:00.000Z" });
    expect(stripeCalls.at(-1)!.key).toBe(`agent-service-${rec.id}-year-2`);
    now = new Date("2026-12-01T12:00:00Z");
  });

  it("waits for a firm without a Stripe customer, and charges once it subscribes", async () => {
    await store.putBillingAccount({ id: "firm:acme-cpa", tenantId: "keystone", clientCompanyId: "acme-cpa", plan: "partner", status: "none", updatedAt: now.toISOString() });
    const f = await submittedWithOurAgent("Green Field");
    const rec = (await agents.start(f, (await store.getTenant("keystone"))!, (await store.getClientCompany("acme-cpa"))!))!;
    expect(rec.yearsCharged).toBe(0);
    await store.putBillingAccount({ id: "firm:acme-cpa", tenantId: "keystone", clientCompanyId: "acme-cpa", plan: "partner", status: "active", customerId: "cus_acme", updatedAt: now.toISOString() });
    expect(await agents.chargeDue()).toBe(1);
    expect((await store.getAgentService(rec.id))!.yearsCharged).toBe(1);
  });

  it("a filing with the firm's own agent, or by a non-partner, starts nothing", async () => {
    const f = await submittedWithOurAgent("Own Agent");
    const own = await store.updateFiling(f.id, { registeredAgentResolution: { source: "client_provided", agent: RAI_NJ } });
    expect(await agents.start(own, (await store.getTenant("keystone"))!, (await store.getClientCompany("acme-cpa"))!)).toBeNull();
    expect(await agents.start(f, (await store.getTenant("keystone"))!, (await store.getClientCompany("beta-llc"))!)).toBeNull();
  });

  it("the firm lists its services and cancels renewal; staff are told, and no later year is charged", async () => {
    const list = await app.inject({ method: "GET", url: "/v1/client-companies/acme-cpa/agent-services", headers: { "x-api-key": "k1" } });
    expect(list.json().services.length).toBeGreaterThanOrEqual(2);
    expect(list.json().offer.states).toEqual(["NJ"]);
    const id = list.json().services.find((s: { entityName: string }) => s.entityName === "Blue Harbor LLC").id;
    const r = await app.inject({ method: "POST", url: `/v1/client-companies/acme-cpa/agent-services/${id}/cancel`, headers: { "x-api-key": "k1" } });
    expect(r.json().service.status).toBe("cancelled");
    expect(mail.at(-1)!.msg.subject).toMatch(/Cancel registered agent service: Blue Harbor LLC/);
    now = new Date("2029-01-01T00:00:00Z");
    const before = stripeCalls.length;
    await agents.chargeDue();
    expect(stripeCalls.filter((c, i) => i >= before && c.form.get("metadata[agentService]") === id)).toHaveLength(0);
    now = new Date("2026-12-01T12:00:00Z");
    expect((await app.inject({ method: "POST", url: `/v1/client-companies/beta-llc/agent-services/${id}/cancel`, headers: { "x-api-key": "k1" } })).statusCode).toBe(404);
  });
});
