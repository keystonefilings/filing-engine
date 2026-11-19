import type { Credential } from "../settings/vault.js";
import type { RegisteredAgentDetails } from "./types.js";

export interface RegisteredAgentQuote { state: string; amountUsd: number; }

/**
 * A third-party registered-agent provider (case 3). The engine is built to scale across
 * filing companies, and each may use a different RA provider (Registered Agents, Inc.,
 * Northwest, their own, ...). So there is no provider baked into the engine: a provider is
 * either (a) a static per-state table, (b) a declaratively configured HTTP API adapter, or
 * (c) a code-level plugin injected per deployment for an exotic API. All speak this interface.
 */
export interface RegisteredAgentProvider {
  id: string;
  /** Price to provide an RA in a state; null if the provider does not cover it. */
  pricing(state: string): Promise<RegisteredAgentQuote | null>;
  /** Order an RA for an entity in a state (irreversible, costs money); returns the assigned agent. */
  procure(input: { state: string; entityName: string; tenantId: string }): Promise<{ agent: RegisteredAgentDetails; ref: string; amountUsd: number }>;
}

/** Offline / test / flat-arrangement provider: a fixed per-state agent + price table. */
export class StaticRegisteredAgentProvider implements RegisteredAgentProvider {
  constructor(
    readonly id: string,
    private readonly table: Record<string, { agent: RegisteredAgentDetails; amountUsd: number }>,
    private readonly cachedPricing?: Record<string, number>,
  ) {}
  async pricing(state: string): Promise<RegisteredAgentQuote | null> {
    const e = this.table[state];
    if (e) return { state, amountUsd: e.amountUsd };
    const c = this.cachedPricing?.[state];
    return c !== undefined ? { state, amountUsd: c } : null;
  }
  async procure(input: { state: string; entityName: string; tenantId: string }) {
    const e = this.table[input.state];
    if (!e) throw new Error(`no registered-agent coverage for ${input.state}`);
    return { agent: e.agent, ref: `static-${input.state}-${Date.now()}`, amountUsd: e.amountUsd };
  }
}

/** Declarative HTTP adapter config — a tenant describes any provider's API with this. */
export interface HttpAgentEndpoint {
  method?: "GET" | "POST";
  /** Path/query template; {state}, {entityName}, {tenantId} are substituted (URL-encoded in the path). */
  path: string;
  /** Request body template (JSON string) for POST; same substitutions, not URL-encoded. */
  body?: string;
  amountPath?: string;   // dot-path to the price in the JSON response
  amountInCents?: boolean;
}
export interface HttpAgentOrderEndpoint extends HttpAgentEndpoint {
  agentNamePath: string;
  agentStreet1Path: string;
  agentStreet2Path?: string;
  agentCityPath: string;
  agentStatePath: string;
  agentZipPath: string;
  refPath: string;
}
export interface HttpAgentProviderConfig {
  baseUrl: string;
  authHeader?: string;   // default "Authorization"
  authPrefix?: string;   // default "Bearer " — the vault secret is appended
  pricing?: HttpAgentEndpoint;
  order?: HttpAgentOrderEndpoint;
}

function getPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, k) => (acc && typeof acc === "object" ? (acc as Record<string, unknown>)[k] : undefined), obj);
}
function fillTemplate(s: string, vars: Record<string, string>, encode: boolean): string {
  return s.replace(/\{(\w+)\}/g, (_, k) => { const v = vars[k] ?? ""; return encode ? encodeURIComponent(v) : v; });
}
function num(v: unknown, inCents?: boolean): number | undefined {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  if (!Number.isFinite(n)) return undefined;
  return inCents ? n / 100 : n;
}

/**
 * Generic HTTP registered-agent provider: calls a provider's API as described by the
 * tenant's config, with the tenant's credential from the vault. No provider specifics are
 * hardcoded — any provider that has a pricing endpoint and an order endpoint can be driven
 * by config. cachedPricing covers quotes before (or instead of) a live pricing call.
 */
export class ConfigurableHttpAgentProvider implements RegisteredAgentProvider {
  constructor(
    readonly id: string,
    private readonly config: HttpAgentProviderConfig,
    private readonly secret: string | null,
    private readonly cachedPricing?: Record<string, number>,
    private readonly fetchImpl: typeof fetch = fetch,
  ) {}

  private headers(): Record<string, string> {
    const h: Record<string, string> = { "content-type": "application/json" };
    if (this.secret) h[this.config.authHeader ?? "Authorization"] = `${this.config.authPrefix ?? "Bearer "}${this.secret}`;
    return h;
  }

  private async call(ep: HttpAgentEndpoint, vars: Record<string, string>): Promise<unknown> {
    const url = `${this.config.baseUrl.replace(/\/$/, "")}/${fillTemplate(ep.path, vars, true).replace(/^\//, "")}`;
    const method = ep.method ?? "GET";
    const res = await this.fetchImpl(url, { method, headers: this.headers(), body: ep.body ? fillTemplate(ep.body, vars, false) : undefined });
    if (!res.ok) throw new Error(`${this.id} ${method} ${ep.path} -> ${res.status}`);
    return res.json();
  }

  async pricing(state: string): Promise<RegisteredAgentQuote | null> {
    const cached = this.cachedPricing?.[state];
    if (cached !== undefined) return { state, amountUsd: cached };
    if (!this.config.pricing?.amountPath) return null;
    const data = await this.call(this.config.pricing, { state });
    const amt = num(getPath(data, this.config.pricing.amountPath), this.config.pricing.amountInCents);
    return amt === undefined ? null : { state, amountUsd: amt };
  }

  async procure(input: { state: string; entityName: string; tenantId: string }): Promise<{ agent: RegisteredAgentDetails; ref: string; amountUsd: number }> {
    const o = this.config.order;
    if (!o) throw new Error(`${this.id}: no order endpoint configured; cannot procure a registered agent`);
    const vars = { state: input.state, entityName: input.entityName, tenantId: input.tenantId };
    const data = await this.call(o, vars);
    const name = getPath(data, o.agentNamePath);
    const street1 = getPath(data, o.agentStreet1Path);
    const city = getPath(data, o.agentCityPath);
    const st = getPath(data, o.agentStatePath);
    const zip = getPath(data, o.agentZipPath);
    const ref = getPath(data, o.refPath);
    if (typeof name !== "string" || typeof street1 !== "string" || typeof city !== "string" || typeof st !== "string" || typeof zip !== "string") {
      throw new Error(`${this.id}: order response did not contain the agent name/address at the configured paths`);
    }
    const street2 = o.agentStreet2Path ? getPath(data, o.agentStreet2Path) : undefined;
    const agent: RegisteredAgentDetails = {
      name,
      address: { street1, street2: typeof street2 === "string" ? street2 : undefined, city, state: st, zip },
    };
    const amountUsd = num(o.amountPath ? getPath(data, o.amountPath) : undefined, o.amountInCents) ?? this.cachedPricing?.[input.state] ?? 0;
    return { agent, ref: typeof ref === "string" || typeof ref === "number" ? String(ref) : `order-${Date.now()}`, amountUsd };
  }
}
