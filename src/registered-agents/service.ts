import type { FilingRequest } from "../domain/filing.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { Vault } from "../settings/vault.js";
import type { RegisteredAgentProvider } from "./provider.js";
import { StaticRegisteredAgentProvider, ConfigurableHttpAgentProvider } from "./provider.js";
import type { RegisteredAgentChoice, RegisteredAgentDetails, ResolvedRegisteredAgent } from "./types.js";

/**
 * Formation states that require a registered agent. NY is not here: NY LLCs designate the
 * Secretary of State as agent for process, so "none" is valid there.
 */
export const STATES_REQUIRING_AGENT = new Set(["NJ", "FL", "MO"]);

export interface RegisteredAgentDeps {
  vault: Vault;
  /** Code-level provider plugins by id, for exotic APIs a declarative config can't express. */
  providers?: Record<string, RegisteredAgentProvider>;
  /** Injected for the configurable HTTP provider (tests pass a fake). */
  fetchImpl?: typeof fetch;
}

export class RegisteredAgentService {
  constructor(private readonly deps: RegisteredAgentDeps) {}

  /** The client's request-level choice, inferring client_provided from an explicit agent. */
  clientChoice(req: FilingRequest, client: ClientCompanySettings): RegisteredAgentChoice {
    const f = req.formation;
    if (f?.registeredAgent) return "client_provided";
    return f?.registeredAgentChoice ?? client.registeredAgentChoice ?? "filing_company";
  }

  /** Builds the tenant's third-party provider from its config — no provider is hardcoded. */
  async providerFor(tenant: TenantSettings): Promise<RegisteredAgentProvider | null> {
    const tp = tenant.registeredAgentProvisioning?.thirdParty;
    if (!tp) return null;
    // A code-level plugin injected per deployment (exotic APIs) takes precedence.
    if (this.deps.providers?.[tp.provider]) return this.deps.providers[tp.provider]!;
    // Static per-state agent table (a flat arrangement, no live API).
    if (tp.agents && Object.keys(tp.agents).length) {
      const table: Record<string, { agent: RegisteredAgentDetails; amountUsd: number }> = {};
      for (const [st, a] of Object.entries(tp.agents)) {
        table[st] = { agent: { name: a.name, address: a.address, email: a.email }, amountUsd: tp.cachedPricing?.[st] ?? 0 };
      }
      return new StaticRegisteredAgentProvider(tp.provider, table, tp.cachedPricing);
    }
    // A declaratively configured HTTP API adapter (any provider), credential from the vault.
    if (tp.http) {
      const cred = tp.apiCredentialKey ? await this.deps.vault.getCredential(tp.apiCredentialKey) : null;
      const secret = cred?.password ?? cred?.username ?? null;
      return new ConfigurableHttpAgentProvider(tp.provider, tp.http, secret, tp.cachedPricing, this.deps.fetchImpl);
    }
    // Quote-only (cachedPricing with no agents/http): quotes work; procure() will report it cannot order.
    if (tp.cachedPricing) return new StaticRegisteredAgentProvider(tp.provider, {}, tp.cachedPricing);
    return null;
  }

  /** How the filing company fulfills "filing_company" for a state: self, third_party, or none. */
  private fulfillment(tenant: TenantSettings, state: string): "self" | "third_party" | "none" | undefined {
    const prov = tenant.registeredAgentProvisioning;
    const explicit = prov?.perStateProvisioning?.[state] ?? prov?.defaultProvisioning;
    if (explicit) return explicit;
    if (prov?.selfByState?.[state]) return "self";
    if (prov?.thirdParty) return "third_party";
    if (tenant.registeredAgent?.address) return "self"; // legacy single-agent fallback
    return undefined;
  }

  private selfAgent(tenant: TenantSettings, state: string): RegisteredAgentDetails | null {
    const rec = tenant.registeredAgentProvisioning?.selfByState?.[state];
    if (rec) return { name: rec.name, address: rec.address, email: rec.email };
    const legacy = tenant.registeredAgent;
    if (legacy?.address) return { name: legacy.name, address: legacy.address, email: legacy.email };
    return null;
  }

  /**
   * Resolve the registered agent for a filing. For third_party this returns a quote and marks
   * pendingProcurement — the agent is ordered at run time via procure(). Throws on a
   * misconfiguration (a choice the tenant cannot fulfil), which the caller surfaces as a blocker.
   */
  async resolve(req: FilingRequest, tenant: TenantSettings, client: ClientCompanySettings): Promise<ResolvedRegisteredAgent> {
    const state = req.state;
    const choice = this.clientChoice(req, client);

    if (choice === "none") {
      if (STATES_REQUIRING_AGENT.has(state)) throw new Error(`${state} requires a registered agent; "none" is not allowed`);
      return { source: "none", agent: null };
    }

    if (choice === "client_provided") {
      // V22: the filing's own agent, else the firm's saved agent for this state, else its one saved agent.
      const a = req.formation?.registeredAgent ?? client.registeredAgentsByState?.[state as "NY" | "NJ" | "FL" | "MO"] ?? client.registeredAgent;
      if (!a?.address) throw new Error("client-provided registered agent is missing a name or address");
      if (a.address.state !== state) throw new Error(`the registered agent address must be in ${state}`);
      return { source: "client_provided", agent: { name: a.name, address: a.address, email: a.email } };
    }

    // filing_company: the filing company handles it, self (case 2) or third-party (case 3).
    const how = this.fulfillment(tenant, state);
    if (how === "none") {
      if (STATES_REQUIRING_AGENT.has(state)) throw new Error(`the filing company opted out of providing a ${state} agent, which ${state} requires`);
      return { source: "none", agent: null };
    }
    if (how === "third_party") {
      const provider = await this.providerFor(tenant);
      if (!provider) throw new Error("the filing company's registered-agent provisioning is third_party, but no provider is configured");
      const quote = await provider.pricing(state);
      return { source: "third_party", agent: null, pendingProcurement: true, provider: provider.id, costUsd: quote?.amountUsd };
    }
    // self (explicit or inferred)
    const self = this.selfAgent(tenant, state);
    if (!self) throw new Error(`the filing company provides the registered agent but has no agent configured for ${state} (registeredAgentProvisioning.selfByState.${state})`);
    if (self.address.state !== state) throw new Error(`the filing company's ${state} registered agent address must be in ${state}`);
    return { source: "filing_company", agent: self };
  }

  /** Run-time ordering of a third-party agent (irreversible). Returns the assigned agent. */
  async procure(req: FilingRequest, tenant: TenantSettings): Promise<ResolvedRegisteredAgent> {
    const provider = await this.providerFor(tenant);
    if (!provider) throw new Error("no third-party registered-agent provider configured");
    const entityName = req.formation ? `${req.formation.name.baseName} ${req.formation.name.designator}` : "";
    const r = await provider.procure({ state: req.state, entityName, tenantId: req.tenantId });
    return { source: "third_party", agent: r.agent, provider: provider.id, procurementRef: r.ref, costUsd: r.amountUsd };
  }
}
