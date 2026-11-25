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

/** Calls the engine. Pass null as the key only for its public routes (sign-in, partner sign-up, contact form). */
export async function engine<T = unknown>(apiKey: string | null, path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
  const res = await fetch(`${engineBaseUrl()}${path}`, {
    method: init.method ?? "GET",
    headers: { ...(apiKey ? { "x-api-key": apiKey } : {}), ...(init.body !== undefined ? { "content-type": "application/json" } : {}) },
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

/** The engine refused the key itself: the session expired, was signed out, or the password changed. */
export function sessionEnded(e: unknown): boolean {
  return e instanceof EngineError && e.status === 401 && (e.body as { error?: string } | null)?.error === "invalid api key";
}

// ---- Shapes the front end reads (a subset of the engine's records) ----

export interface Account { tenantId: string; name: string; configured: boolean; branding: { displayName?: string; logoUrl?: string; supportEmail?: string }; webhookEndpointCount: number }

export interface PortalBrand { slug: string; displayName?: string; logoUrl?: string; logoArtifactId?: string; font?: string; fontArtifactId?: string; primaryColor?: string; secondaryColor?: string; supportEmail?: string; filingKinds?: string[] }

export interface ClientCompany {
  clientCompanyId: string;
  tenantId: string;
  name: string;
  defaultState?: string;
  einMode?: string;
  approvers?: { channel: string; address: string; name?: string }[];
  portal?: PortalBrand;
  /** Set on firms that signed up themselves (partners of the platform). */
  partner?: PartnerProfile;
  payments?: PaymentSettings;
  /** V22: the firm's saved registered agent per state. */
  registeredAgentsByState?: Record<string, { name: string; email?: string; address?: { street1: string; street2?: string; city: string; state: string; zip: string } } | undefined>;
  [k: string]: unknown;
}

export interface Filing {
  id: string;
  missingInformation?: { path: string; label: string }[];
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

// ---- Accounts, sign-up and self-service setup ----

export type CompanyType = "cpa" | "payroll" | "cfo" | "other";

export interface PublicUser {
  id: string; email: string; name: string; kind: "enterprise" | "partner"; tenantId: string; clientCompanyId?: string;
  status: "pending" | "active" | "rejected" | "disabled"; createdAt: string; lastSignInAt?: string; decidedAt?: string;
  signup?: { companyName: string; companyType: CompanyType; phone?: string; website?: string; states?: string[]; expectedVolume?: string };
}

export interface SignInResult { user: PublicUser; sessionKey: string; expiresAt: string }

export interface Inquiry { id: string; createdAt: string; name: string; company: string; email: string; phone?: string; states?: string; volume?: string; message?: string }

export interface PaymentMethodRef { id: string; label: string; provider: string; brand?: string; last4?: string; expMonth?: number; expYear?: number; purpose: "state_fees" | "subscription" }
export interface PaymentRouting { mode: "single" | "per_filing"; defaultMethodId?: string; fallbackMethodId?: string; byFilingKind: Record<string, string>; subscriptionMethodId?: string }
export interface PaymentSettings { methods: PaymentMethodRef[]; routing: PaymentRouting }

export interface PortalDefaultField { id: string; label: string; type: "boolean" | "number" | "select"; options?: { value: string; label: string }[]; help?: string }
export interface PortalInfo { id: string; state: "NY" | "NJ" | "FL" | "MO" | "US"; name: string; needsLogin: boolean; pays: string; defaults: PortalDefaultField[] }

export interface AccountSetup {
  configured: boolean;
  payments: PaymentSettings;
  portalLogins: Record<string, { connectedAt: string; connectedBy?: string }>;
  portalDefaults: Record<string, Record<string, string | number | boolean>>;
  portals: PortalInfo[];
}

export interface PartnerProfile {
  companyType?: CompanyType; contactName?: string; contactEmail?: string; phone?: string; website?: string;
  states?: string[];
  setupDone?: ("details" | "branding" | "payments")[];
}
