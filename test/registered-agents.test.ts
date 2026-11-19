import { describe, it, expect } from "vitest";
import { FilingRequest } from "../src/domain/filing.js";
import { TenantSettings, ClientCompanySettings } from "../src/settings/schema.js";
import { InMemoryVault } from "../src/settings/vault.js";
import { RegisteredAgentService } from "../src/registered-agents/service.js";
import { StaticRegisteredAgentProvider } from "../src/registered-agents/provider.js";
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

  it("builds the built-in Registered Agents, Inc. provider from the vault with cached pricing", async () => {
    const vault = new InMemoryVault();
    vault.set("keystone/RA_INC", { username: "ra", password: "secret-key" });
    const s = new RegisteredAgentService({ vault });
    const t = tenant({ defaultProvisioning: "third_party", thirdParty: { provider: "registered_agents_inc", apiCredentialKey: "keystone/RA_INC", cachedPricing: { NJ: 150 } } });
    const r = await s.resolve(req("NJ", { registeredAgentChoice: "filing_company" }), t, client());
    expect(r.source).toBe("third_party");
    expect(r.provider).toBe("registered_agents_inc");
    expect(r.costUsd).toBe(150);
  });
});
