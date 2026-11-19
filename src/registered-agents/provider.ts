import type { RegisteredAgentDetails } from "./types.js";

export interface RegisteredAgentQuote { state: string; amountUsd: number; }

/**
 * A third-party registered-agent provider (case 3). Yakov's example is Registered Agents,
 * Inc.: an API integration that quotes pricing across all states and, on order, assigns the
 * agent name/address to put on the filing.
 */
export interface RegisteredAgentProvider {
  id: string;
  /** Price to provide an RA in a state; null if the provider does not cover it. */
  pricing(state: string): Promise<RegisteredAgentQuote | null>;
  /** Order an RA for an entity in a state (irreversible, costs money); returns the assigned agent. */
  procure(input: { state: string; entityName: string; tenantId: string }): Promise<{ agent: RegisteredAgentDetails; ref: string; amountUsd: number }>;
}

/** Offline / test provider: a fixed per-state agent + price table. */
export class StaticRegisteredAgentProvider implements RegisteredAgentProvider {
  constructor(readonly id: string, private readonly table: Record<string, { agent: RegisteredAgentDetails; amountUsd: number }>) {}
  async pricing(state: string): Promise<RegisteredAgentQuote | null> {
    const e = this.table[state];
    return e ? { state, amountUsd: e.amountUsd } : null;
  }
  async procure(input: { state: string; entityName: string; tenantId: string }) {
    const e = this.table[input.state];
    if (!e) throw new Error(`no registered-agent coverage for ${input.state}`);
    return { agent: e.agent, ref: `static-${input.state}-${Date.now()}`, amountUsd: e.amountUsd };
  }
}

export interface RegisteredAgentsIncOptions {
  apiKey: string;
  baseUrl?: string;
  fetchImpl?: typeof fetch;
  /** Cached per-state pricing used until the live pricing call is wired. */
  cachedPricing?: Record<string, number>;
}

/**
 * Registered Agents, Inc. integration. The real HTTP calls (pricing, order) go to the
 * provider's API with the tenant's key from the vault; they are stubbed here (the live
 * credential and endpoint are not available in this environment), with cached pricing used
 * for quotes so approvals can show the RA cost. procure() throws until the API is wired.
 */
export class RegisteredAgentsIncProvider implements RegisteredAgentProvider {
  readonly id = "registered_agents_inc";
  constructor(private readonly opts: RegisteredAgentsIncOptions) {}

  async pricing(state: string): Promise<RegisteredAgentQuote | null> {
    // Live: GET `${baseUrl}/v1/pricing?state=${state}` with Authorization from opts.apiKey.
    const cached = this.opts.cachedPricing?.[state];
    return cached !== undefined ? { state, amountUsd: cached } : null;
  }

  async procure(_input: { state: string; entityName: string; tenantId: string }): Promise<{ agent: RegisteredAgentDetails; ref: string; amountUsd: number }> {
    throw new Error("Registered Agents, Inc. order API is not wired yet; set the provider API credential and enable procurement");
  }
}
