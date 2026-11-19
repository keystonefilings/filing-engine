import { describe, it, expect } from "vitest";
import { FilingRequest } from "../src/domain/filing.js";
import { TenantSettings, ClientCompanySettings } from "../src/settings/schema.js";
import { InMemoryVault } from "../src/settings/vault.js";
import { RegisteredAgentService } from "../src/registered-agents/service.js";
import { StaticRegisteredAgentProvider } from "../src/registered-agents/provider.js";
import { ApprovalService } from "../src/approvals/service.js";
import { WebhookDispatcher } from "../src/webhooks/dispatcher.js";
import { InMemoryQueue } from "../src/orchestrator/queue.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { FilingService } from "../src/orchestrator/service.js";
import { seededStore, njFormationRequest, SECRET } from "./helpers.js";
import type { FilingRequest as Req } from "../src/domain/filing.js";

const njAddr = { street1: "1 NJ Plaza", city: "Newark", state: "NJ", zip: "07102" };
const flAddr = { street1: "1 FL Way", city: "Miami", state: "FL", zip: "33101" };

function req(state: string, formationOver: Record<string, unknown> = {}): Req {
  return FilingRequest.parse({
    tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `idem-${Math.random().toString(36).slice(2)}`,
    type: "formation", state,
    formation: { entityType: "LLC", name: { baseName: "Acme", designator: "LLC" }, effectiveDate: "upon_filing", additionalCertificates: {}, ...formationOver },
    contact: { firstName: "A", lastName: "B", phone: "2015550100", email: "a@b.test" },
  });
}
function tenant(provisioning?: Record<string, unknown>, legacyAgent?: Record<string, unknown>): TenantSettings {
  return TenantSettings.parse({ tenantId: "keystone", name: "Keystone", registeredAgentProvisioning: provisioning, registeredAgent: legacyAgent });
}
function client(over: Record<string, unknown> = {}): ClientCompanySettings {
  return ClientCompanySettings.parse({ clientCompanyId: "acme-cpa", tenantId: "keystone", name: "Acme", ...over });
}
function svc(providers?: Record<string, StaticRegisteredAgentProvider>) {
  return new RegisteredAgentService({ vault: new InMemoryVault(), providers });
}

describe("RegisteredAgentService", () => {
  it("case 1 — client needs no agent (allowed in NY, refused where required)", async () => {
    const r = await svc().resolve(req("NY", { registeredAgentChoice: "none" }), tenant(), client());
    expect(r).toEqual({ source: "none", agent: null });
    await expect(svc().resolve(req("NJ", { registeredAgentChoice: "none" }), tenant(), client())).rejects.toThrow(/NJ requires a registered agent/);
  });

  it("client brings its own agent (inferred from an explicit agent, must be in-state)", async () => {
    const agent = { name: "Client Agent LLC", address: njAddr };
    const r = await svc().resolve(req("NJ", { registeredAgent: agent }), tenant(), client());
    expect(r.source).toBe("client_provided");
    expect(r.agent?.name).toBe("Client Agent LLC");
    await expect(svc().resolve(req("FL", { registeredAgent: agent }), tenant(), client())).rejects.toThrow(/must be in FL/);
  });

  it("case 2 — filing company is the agent, from its per-state record", async () => {
    const t = tenant({ selfByState: { NJ: { name: "Keystone Agents NJ", address: njAddr }, FL: { name: "Keystone Agents FL", address: flAddr } } });
    const r = await svc().resolve(req("NJ", { registeredAgentChoice: "filing_company" }), t, client());
    expect(r.source).toBe("filing_company");
    expect(r.agent).toEqual({ name: "Keystone Agents NJ", address: njAddr, email: undefined });
    // No record for a state -> clear error.
    await expect(svc().resolve(req("MO", { registeredAgentChoice: "filing_company" }), t, client())).rejects.toThrow(/no agent configured for MO/);
  });

  it("case 3 — third-party provider: quote at resolve, order at run time", async () => {
    const provider = new StaticRegisteredAgentProvider("test_ra", {
      NJ: { agent: { name: "Registered Agents Inc - NJ", address: njAddr }, amountUsd: 125 },
    });
    const t = tenant({ defaultProvisioning: "third_party", thirdParty: { provider: "test_ra", apiCredentialKey: "RA_KEY" } });
    const r = await svc({ test_ra: provider }).resolve(req("NJ", { registeredAgentChoice: "filing_company" }), t, client());
    expect(r.source).toBe("third_party");
    expect(r.agent).toBeNull();
    expect(r.pendingProcurement).toBe(true);
    expect(r.costUsd).toBe(125);
    // Procurement assigns the agent and a reference.
    const procured = await svc({ test_ra: provider }).procure(req("NJ", { registeredAgentChoice: "filing_company" }), t);
    expect(procured.agent?.name).toBe("Registered Agents Inc - NJ");
    expect(procured.procurementRef).toBeTruthy();
    expect(procured.costUsd).toBe(125);
  });

  it("per-state mix: self in one state, third-party elsewhere", async () => {
    const provider = new StaticRegisteredAgentProvider("test_ra", { FL: { agent: { name: "RA Inc FL", address: flAddr }, amountUsd: 99 } });
    const t = tenant({
      selfByState: { NJ: { name: "Keystone NJ", address: njAddr } },
      thirdParty: { provider: "test_ra", apiCredentialKey: "RA_KEY" },
      perStateProvisioning: { NJ: "self", FL: "third_party" },
    });
    const s = svc({ test_ra: provider });
    expect((await s.resolve(req("NJ", { registeredAgentChoice: "filing_company" }), t, client())).source).toBe("filing_company");
    expect((await s.resolve(req("FL", { registeredAgentChoice: "filing_company" }), t, client())).source).toBe("third_party");
  });

  it("falls back to the legacy single agent, and takes the choice from client settings", async () => {
    const t = tenant(undefined, { name: "Keystone Legacy RA", address: njAddr });
    const r = await svc().resolve(req("NJ"), t, client({ registeredAgentChoice: "filing_company" }));
    expect(r.source).toBe("filing_company");
    expect(r.agent?.name).toBe("Keystone Legacy RA");
  });

  it("third-party chosen but no provider configured is a clear error", async () => {
    const t = tenant({ defaultProvisioning: "third_party" });
    await expect(svc().resolve(req("NJ", { registeredAgentChoice: "filing_company" }), t, client())).rejects.toThrow(/no provider is configured/);
  });

  it("drives any provider from a static per-state agent table (no API)", async () => {
    const t = tenant({ defaultProvisioning: "third_party", thirdParty: {
      provider: "some_ra_co",
      cachedPricing: { NJ: 150 },
      agents: { NJ: { name: "Some RA Co - NJ", address: njAddr } },
    } });
    const s = new RegisteredAgentService({ vault: new InMemoryVault() });
    const quote = await s.resolve(req("NJ", { registeredAgentChoice: "filing_company" }), t, client());
    expect(quote.source).toBe("third_party");
    expect(quote.provider).toBe("some_ra_co");
    expect(quote.costUsd).toBe(150);
    const procured = await s.procure(req("NJ", { registeredAgentChoice: "filing_company" }), t);
    expect(procured.agent?.name).toBe("Some RA Co - NJ");
  });

  it("drives any provider from a declarative HTTP config with the tenant's own credential", async () => {
    const vault = new InMemoryVault();
    vault.set("keystone/PROV_KEY", { username: "x", password: "tenant-secret" });
    let authSeen = "";
    const fakeFetch = (async (url: string, init: { headers: Record<string, string> }) => {
      authSeen = init.headers["X-Api-Key"] ?? "";
      if (String(url).includes("/pricing")) return { ok: true, json: async () => ({ data: { priceCents: 12500 } }) };
      if (String(url).includes("/order")) return { ok: true, json: async () => ({ agent: { name: "Prov Agent", line1: "5 Prov St", city: "Newark", state: "NJ", zip: "07102" }, order_id: "ORD-1", price: 125 }) };
      return { ok: false, status: 404, json: async () => ({}) };
    }) as unknown as typeof fetch;
    const t = tenant({ defaultProvisioning: "third_party", thirdParty: {
      provider: "generic_http", apiCredentialKey: "keystone/PROV_KEY",
      http: {
        baseUrl: "https://ra.example.test", authHeader: "X-Api-Key", authPrefix: "",
        pricing: { method: "GET", path: "pricing?state={state}", amountPath: "data.priceCents", amountInCents: true },
        order: { method: "POST", path: "order", body: '{"state":"{state}","entity":"{entityName}"}', agentNamePath: "agent.name", agentStreet1Path: "agent.line1", agentCityPath: "agent.city", agentStatePath: "agent.state", agentZipPath: "agent.zip", refPath: "order_id", amountPath: "price" },
      },
    } });
    const s = new RegisteredAgentService({ vault, fetchImpl: fakeFetch });
    const quote = await s.resolve(req("NJ", { registeredAgentChoice: "filing_company" }), t, client());
    expect(quote.source).toBe("third_party");
    expect(quote.costUsd).toBe(125); // 12500 cents
    expect(authSeen).toBe("tenant-secret");
    const procured = await s.procure(req("NJ", { registeredAgentChoice: "filing_company" }), t);
    expect(procured.agent).toEqual({ name: "Prov Agent", address: { street1: "5 Prov St", street2: undefined, city: "Newark", state: "NJ", zip: "07102" } });
    expect(procured.procurementRef).toBe("ORD-1");
    expect(procured.costUsd).toBe(125);
  });
});

describe("FilingService registered-agent resolution at createFiling", () => {
  function filingService(store: Awaited<ReturnType<typeof seededStore>>, registeredAgents: RegisteredAgentService) {
    const approvals = new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 168 });
    const webhooks = new WebhookDispatcher(store, async () => ({ status: 200 }));
    return new FilingService({ store, approvals, webhooks, queue: new InMemoryQueue(), vault: new InMemoryVault(), drift: new DriftReviewService(store), registeredAgents, dryRunDefault: true });
  }
  function njFormationDeferred(): Record<string, unknown> {
    const raw = njFormationRequest() as unknown as { formation: Record<string, unknown> };
    delete raw.formation.registeredAgent;
    raw.formation.registeredAgentChoice = "filing_company";
    return raw as unknown as Record<string, unknown>;
  }

  it("stores the filing company's per-state agent (case 2) without an agent in the request", async () => {
    const store = await seededStore();
    await store.putTenant(TenantSettings.parse({
      tenantId: "keystone", name: "Keystone Filings",
      webhookEndpoints: [{ url: "https://hooks.example.test/x", secret: "endpoint-secret-0123456789" }],
      registeredAgentProvisioning: { selfByState: { NJ: { name: "Keystone Agents NJ", address: njAddr } } },
    }));
    const fs = filingService(store, new RegisteredAgentService({ vault: new InMemoryVault() }));
    const { filing } = await fs.createFiling(njFormationDeferred());
    expect(filing.status).toBe("awaiting_approval");
    const stored = (await store.getFiling(filing.id))!;
    expect(stored.registeredAgentResolution?.source).toBe("filing_company");
    expect(stored.registeredAgentResolution?.agent?.name).toBe("Keystone Agents NJ");
  });

  it("surfaces the third-party quote and cost, pending procurement (case 3)", async () => {
    const store = await seededStore();
    await store.putTenant(TenantSettings.parse({
      tenantId: "keystone", name: "Keystone Filings",
      webhookEndpoints: [{ url: "https://hooks.example.test/x", secret: "endpoint-secret-0123456789" }],
      registeredAgentProvisioning: { defaultProvisioning: "third_party", thirdParty: { provider: "some_ra", cachedPricing: { NJ: 125 }, agents: { NJ: { name: "Some RA NJ", address: njAddr } } } },
    }));
    const fs = filingService(store, new RegisteredAgentService({ vault: new InMemoryVault() }));
    const { filing } = await fs.createFiling(njFormationDeferred());
    const stored = (await store.getFiling(filing.id))!;
    expect(stored.registeredAgentResolution?.source).toBe("third_party");
    expect(stored.registeredAgentResolution?.pendingProcurement).toBe(true);
    expect(stored.registeredAgentResolution?.costUsd).toBe(125);
    const evt = (await store.listDeliveries(filing.id)).map((d) => d.event).find((e) => e.type === "filing.awaiting_approval");
    expect((evt!.data.registeredAgent as { costUsd: number }).costUsd).toBe(125);
  });

  it("rejects a filing whose agent choice the tenant cannot fulfil", async () => {
    const store = await seededStore();
    const fs = filingService(store, new RegisteredAgentService({ vault: new InMemoryVault() }));
    const raw = njFormationRequest() as unknown as { formation: Record<string, unknown> };
    delete raw.formation.registeredAgent;
    raw.formation.registeredAgentChoice = "none"; // NJ requires an agent
    const { filing } = await fs.createFiling(raw as unknown as Record<string, unknown>);
    expect(filing.status).toBe("invalid");
    expect(filing.lastError).toMatch(/requires a registered agent/);
  });
});
