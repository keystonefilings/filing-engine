/**
 * Server-side client for the filing engine API. Every call runs on the server (route handlers,
 * server components, server actions); API keys never reach the browser.
 */

export class EngineError extends Error {
  constructor(public readonly status: number, public readonly body: unknown, message: string) { super(message); }
}

export function engineBaseUrl(): string {
  const u = process.env.ENGINE_API_URL?.replace(/\/+$/, "");
  if (u) return u;
  if (process.env.NODE_ENV === "production") throw new Error("ENGINE_API_URL is not set");
  return "http://127.0.0.1:8080";
}

export async function engine<T = unknown>(apiKey: string, path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`${engineBaseUrl()}${path}`, {
    method: init.method ?? "GET",
    headers: { "x-api-key": apiKey, ...(init.body !== undefined ? { "content-type": "application/json" } : {}) },
    body: init.body !== undefined ? JSON.stringify(init.body) : undefined,
    cache: "no-store",
  });
  const text = await res.text();
  let body: unknown = text;
  try { body = text ? JSON.parse(text) : null; } catch { /* keep text */ }
  if (!res.ok) {
    const msg = typeof body === "object" && body && "error" in body ? String((body as { error: unknown }).error) : `engine answered ${res.status}`;
    throw new EngineError(res.status, body, msg);
  }
  return body as T;
}

// ---- Shapes the front end reads (a subset of the engine's records) ----

export interface Account { tenantId: string; name: string; configured: boolean; branding: { displayName?: string; logoUrl?: string; supportEmail?: string }; webhookEndpointCount: number }

export interface PortalBrand { slug: string; displayName?: string; logoUrl?: string; primaryColor?: string; supportEmail?: string; filingKinds?: string[] }

export interface ClientCompany {
  clientCompanyId: string;
  tenantId: string;
  name: string;
  defaultState?: string;
  einMode?: string;
  approvers?: { channel: string; address: string; name?: string }[];
  portal?: PortalBrand;
  [k: string]: unknown;
}

export interface Filing {
  id: string;
  tenantId: string;
  clientCompanyId: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  ein?: string;
  lastError?: string;
  artifacts: { id: string; kind: string; label: string }[];
  request: {
    type: string;
    state: string;
    dryRun?: boolean;
    contact?: { firstName: string; lastName: string; email: string; phone: string };
    formation?: { name?: { baseName: string; designator: string }; floridaEntityType?: string };
    payroll?: { legalName?: string };
    standing?: { entityName?: string };
    intake?: Record<string, unknown>;
    [k: string]: unknown;
  };
}

export interface Run { id: string; status: string; startedAt: string; endedAt?: string; dryRun: boolean; steps: { screenKey: string; at: string; note?: string }[]; error?: string }

export interface ApiKeyInfo { id: string; name: string; prefix: string; createdAt: string; revokedAt?: string; lastUsedAt?: string }

export interface WebhookEndpointInfo { url: string; events?: string[]; secretHint: string }

export interface Usage {
  tenantId: string;
  generatedAt: string;
  filings: { total: number; live: number; byStatus: Record<string, number>; byType: Record<string, number>; byState: Record<string, number>; byClientCompany: Record<string, number>; byMonth: Record<string, number> };
  webhooks: Record<string, number>;
  apiKeys: { live: number; revoked: number };
}

export interface CreateFilingResult { filing: Filing; approvalLink?: string; issues?: { path: string; message: string; severity: string }[] }

export function filingTitle(f: Filing): string {
  const r = f.request;
  const n = r.formation?.name ? `${r.formation.name.baseName} ${r.formation.name.designator}` : r.payroll?.legalName ?? r.standing?.entityName ?? "";
  return n || `${r.state} ${r.type.replace(/_/g, " ")}`;
}
