/**
 * A firm's own sending domain through Resend's domains API (https://resend.com/docs/api-reference/domains), for
 * decision 37: once connected, emails to the firm's clients come from its own address. Every call returns a plain
 * result; nothing here throws on a provider error.
 */
export interface DomainRecord { record: string; type: string; name: string; value: string; priority?: number; status: "found" | "missing" }
export interface DomainState { providerId: string; domain: string; status: "pending" | "verified" | "failed"; records: DomainRecord[] }
export type DomainResult = { ok: true; domain: DomainState } | { ok: false; status: number; detail: string };

export interface DomainsOptions { apiKey: string; apiBase?: string; fetchImpl?: typeof fetch; timeoutMs?: number }

/** Domains that can't be a firm's sending domain: free mail and our own. */
const BLOCKED = new Set(["gmail.com", "googlemail.com", "yahoo.com", "outlook.com", "hotmail.com", "live.com", "icloud.com", "me.com", "aol.com", "proton.me", "protonmail.com", "gmx.com", "mail.com", "zoho.com"]);

/** A domain name as the firm types it, cleaned ("https://www.Firm.com/" → "firm.com"), or why it can't be used. */
export function normalizeDomain(input: string, platformDomains: string[] = []): { ok: true; domain: string } | { ok: false; reason: "invalid" | "unusable" } {
  const d = input.trim().toLowerCase().replace(/^[a-z]+:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "").replace(/\.$/, "");
  if (!/^(?=.{3,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/.test(d)) return { ok: false, reason: "invalid" };
  if (BLOCKED.has(d) || platformDomains.some((p) => d === p || d.endsWith(`.${p}`))) return { ok: false, reason: "unusable" };
  return { ok: true, domain: d };
}

const mapStatus = (s: string | undefined): DomainState["status"] => (s === "verified" ? "verified" : s === "failed" ? "failed" : "pending");

export class ResendDomains {
  private readonly fetchImpl: typeof fetch;
  private readonly base: string;
  constructor(private readonly opts: DomainsOptions) {
    this.fetchImpl = opts.fetchImpl ?? fetch;
    this.base = (opts.apiBase ?? "https://api.resend.com").replace(/\/+$/, "");
  }

  private async call(method: string, path: string, body?: unknown): Promise<{ ok: true; json: Record<string, unknown> } | { ok: false; status: number; detail: string }> {
    let res: Response;
    try {
      res = await this.fetchImpl(`${this.base}${path}`, {
        method, headers: { authorization: `Bearer ${this.opts.apiKey}`, "content-type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(this.opts.timeoutMs ?? 15_000),
      });
    } catch (e) {
      return { ok: false, status: 502, detail: `resend unreachable: ${(e as Error).message}` };
    }
    const json = (await res.json().catch(() => ({}))) as Record<string, unknown>;
    if (!res.ok) return { ok: false, status: res.status, detail: `resend ${res.status}: ${String(json.message ?? json.name ?? "rejected")}` };
    return { ok: true, json };
  }

  private state(json: Record<string, unknown>): DomainState {
    const records = (Array.isArray(json.records) ? json.records : []) as Record<string, unknown>[];
    return {
      providerId: String(json.id ?? ""), domain: String(json.name ?? ""), status: mapStatus(json.status as string | undefined),
      records: records.map((r) => ({
        record: String(r.record ?? ""), type: String(r.type ?? ""), name: String(r.name ?? ""), value: String(r.value ?? ""),
        ...(typeof r.priority === "number" ? { priority: r.priority } : {}),
        status: r.status === "verified" ? "found" : "missing",
      })),
    };
  }

  async create(domain: string): Promise<DomainResult> {
    const r = await this.call("POST", "/domains", { name: domain });
    return r.ok ? { ok: true, domain: this.state(r.json) } : r;
  }

  async get(providerId: string): Promise<DomainResult> {
    const r = await this.call("GET", `/domains/${encodeURIComponent(providerId)}`);
    return r.ok ? { ok: true, domain: this.state(r.json) } : r;
  }

  /** Asks the provider to look for the records again, then reads where things stand. */
  async check(providerId: string): Promise<DomainResult> {
    const v = await this.call("POST", `/domains/${encodeURIComponent(providerId)}/verify`);
    if (!v.ok && v.status !== 409) return v;
    return this.get(providerId);
  }

  async remove(providerId: string): Promise<{ ok: boolean; detail?: string }> {
    const r = await this.call("DELETE", `/domains/${encodeURIComponent(providerId)}`);
    return r.ok || r.status === 404 ? { ok: true } : { ok: false, detail: r.detail };
  }
}
