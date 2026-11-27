import { filerNameFor } from "../settings/filer.js";
import { createHash, randomBytes, randomUUID } from "node:crypto";
import { isIP } from "node:net";
import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { EVENT_TYPES } from "../domain/events.js";
import type { ApiKeyRecord, Store } from "../store/types.js";
import type { ArtifactStore } from "../artifacts/store.js";
import { withLogoInfo } from "../brand/logo-analysis.js";

/**
 * Enterprise self-service: a tenant manages its own API keys and webhook endpoints and reads
 * its usage, with its own key. Platform-only settings (vault keys, approvers, branding,
 * locks) stay behind the staff key on PUT /v1/tenants/:id.
 */

/** New keys start with this (decision 17, Nov 26). */
export const API_KEY_PREFIX = "cofile_";
/** Keys issued before Nov 26 start with kfe_; they keep working until revoked. */
export const LEGACY_API_KEY_PREFIXES = ["kfe_"];
const ACCEPTED_PREFIXES = [API_KEY_PREFIX, ...LEGACY_API_KEY_PREFIXES];
/** Characters of a key kept readable after it is shown once: the prefix and 8 more. */
const SHOWN_LENGTH = API_KEY_PREFIX.length + 8;

export function hashApiKey(key: string): string {
  return createHash("sha256").update(key).digest("hex");
}

export function newApiKey(): { key: string; prefix: string; hash: string } {
  const key = `${API_KEY_PREFIX}${randomBytes(32).toString("base64url")}`;
  return { key, prefix: key.slice(0, SHOWN_LENGTH), hash: hashApiKey(key) };
}

/** Self-issued keys, looked up by hash. Only keys with a self-service prefix (cofile_, or the older kfe_) are looked up. */
export async function tenantFromStoredKey(store: Store, presented: string): Promise<{ tenantId: string; keyId: string } | null> {
  if (!ACCEPTED_PREFIXES.some((p) => presented.startsWith(p)) || presented.length > 200) return null;
  const rec = await store.findApiKeyByHash(hashApiKey(presented));
  if (!rec || rec.revokedAt) return null;
  return { tenantId: rec.tenantId, keyId: rec.id };
}

function publicKey(k: ApiKeyRecord) {
  return { id: k.id, name: k.name, prefix: k.prefix, createdAt: k.createdAt, createdBy: k.createdBy, revokedAt: k.revokedAt, lastUsedAt: k.lastUsedAt };
}

/** Hostnames a webhook may never point at: this machine, private networks, cloud metadata. */
export function webhookUrlProblem(raw: string): string | null {
  let u: URL;
  try { u = new URL(raw); } catch { return "not a valid URL"; }
  if (u.protocol !== "https:") return "must use https";
  if (u.username || u.password) return "must not carry a user name or password";
  const host = u.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local") || host.endsWith(".internal") || host.endsWith(".lan")) return "must be a public host";
  const ipKind = isIP(host);
  if (ipKind === 4) {
    const [a, b] = host.split(".").map(Number) as [number, number];
    if (a === 10 || a === 127 || a === 0 || (a === 169 && b === 254) || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 100 && b >= 64 && b <= 127) || a >= 224) return "must be a public address";
  }
  if (ipKind === 6) {
    if (host === "::1" || host === "::" || host.startsWith("fc") || host.startsWith("fd") || host.startsWith("fe80") || host.startsWith("::ffff:")) return "must be a public address";
  }
  return null;
}

const WebhookEndpointsBody = z.object({
  endpoints: z.array(z.object({
    url: z.string().min(1).max(2000),
    /** Omit to keep an existing endpoint's secret, or to have one generated for a new endpoint. */
    secret: z.string().min(16).max(200).optional(),
    events: z.array(z.enum(EVENT_TYPES)).optional(),
  })).max(10),
});

const CreateKeyBody = z.object({ name: z.string().min(1).max(60) });

export interface SelfServiceDeps {
  store: Store;
  /** The tenant for a request (environment or stored key), or null. */
  tenantOf: (req: FastifyRequest) => Promise<string | null>;
  now?: () => Date;
  /** The site's name, for "filing through CoFile". */
  platformName?: string;
  /** Decision 9: our registered agent offer for a firm, if any. */
  agentOffer?: (tenant: import("../settings/schema.js").TenantSettings, client: import("../settings/schema.js").ClientCompanySettings) => import("../registered-agents/agent-services.js").AgentOffer | null;
  /** Where uploaded logos are kept: a firm whose logo has no reading yet is read when it is loaded (3.5.1). */
  artifacts?: ArtifactStore;
}

export function registerSelfService(app: FastifyInstance, deps: SelfServiceDeps): void {
  const now = deps.now ?? (() => new Date());
  const requireTenant = async (req: FastifyRequest, reply: FastifyReply): Promise<string | null> => {
    const t = await deps.tenantOf(req);
    if (!t) void reply.code(401).send({ error: "invalid api key" });
    return t;
  };

  // ---- Account ----
  app.get("/v1/account", async (req, reply) => {
    const tenantId = await requireTenant(req, reply);
    if (!tenantId) return reply;
    const t = await deps.store.getTenant(tenantId);
    return {
      tenantId,
      name: t?.branding?.displayName ?? t?.name ?? tenantId,
      configured: !!t,
      branding: t?.branding ?? {},
      webhookEndpointCount: t?.webhookEndpoints.length ?? 0,
    };
  });

  // ---- API keys ----
  app.get("/v1/api-keys", async (req, reply) => {
    const tenantId = await requireTenant(req, reply);
    if (!tenantId) return reply;
    return { keys: (await deps.store.listApiKeys(tenantId)).map(publicKey) };
  });
  app.post("/v1/api-keys", async (req, reply) => {
    const tenantId = await requireTenant(req, reply);
    if (!tenantId) return reply;
    const parsed = CreateKeyBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: parsed.error.issues });
    const live = (await deps.store.listApiKeys(tenantId)).filter((k) => !k.revokedAt);
    if (live.length >= 20) return reply.code(409).send({ error: "a tenant may hold at most 20 live keys; revoke one first" });
    const { key, prefix, hash } = newApiKey();
    const rec = await deps.store.createApiKey({ id: randomUUID(), tenantId, name: parsed.data.name, prefix, hash, createdAt: now().toISOString() });
    // The only time the key itself leaves the engine.
    return reply.code(201).send({ key, apiKey: publicKey(rec) });
  });
  app.delete("/v1/api-keys/:id", async (req, reply) => {
    const tenantId = await requireTenant(req, reply);
    if (!tenantId) return reply;
    const ok = await deps.store.revokeApiKey(tenantId, (req.params as { id: string }).id, now().toISOString());
    return ok ? { revoked: true } : reply.code(404).send({ error: "not found" });
  });

  // ---- Webhook endpoints ----
  app.get("/v1/webhook-endpoints", async (req, reply) => {
    const tenantId = await requireTenant(req, reply);
    if (!tenantId) return reply;
    const t = await deps.store.getTenant(tenantId);
    return { endpoints: (t?.webhookEndpoints ?? []).map((e) => ({ url: e.url, events: e.events, secretHint: `…${e.secret.slice(-4)}` })) };
  });
  app.put("/v1/webhook-endpoints", async (req, reply) => {
    const tenantId = await requireTenant(req, reply);
    if (!tenantId) return reply;
    const t = await deps.store.getTenant(tenantId);
    if (!t) return reply.code(409).send({ error: "tenant settings are not set up yet; ask the platform to configure the tenant first" });
    const parsed = WebhookEndpointsBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: parsed.error.issues });
    const issues = parsed.data.endpoints.flatMap((e, i) => {
      const p = webhookUrlProblem(e.url);
      return p ? [{ path: `endpoints.${i}.url`, message: `webhook URL ${p}` }] : [];
    });
    const urls = parsed.data.endpoints.map((e) => e.url);
    if (new Set(urls).size !== urls.length) issues.push({ path: "endpoints", message: "each URL may appear once" });
    if (issues.length) return reply.code(422).send({ error: "validation failed", issues });
    const generated: { url: string; secret: string }[] = [];
    const endpoints = parsed.data.endpoints.map((e) => {
      const existing = t.webhookEndpoints.find((x) => x.url === e.url);
      let secret = e.secret ?? existing?.secret;
      if (!secret) {
        secret = `whsec_${randomBytes(24).toString("base64url")}`;
        generated.push({ url: e.url, secret });
      }
      return { url: e.url, secret, ...(e.events && e.events.length ? { events: e.events } : {}) };
    });
    await deps.store.putTenant({ ...t, webhookEndpoints: endpoints });
    // New secrets are shown once; afterwards only the last four characters.
    return { ok: true, generatedSecrets: generated, endpoints: endpoints.map((e) => ({ url: e.url, events: e.events, secretHint: `…${e.secret.slice(-4)}` })) };
  });

  // ---- Usage ----
  app.get("/v1/usage", async (req, reply) => {
    const tenantId = await requireTenant(req, reply);
    if (!tenantId) return reply;
    const filings = await deps.store.listFilings(tenantId);
    const count = (key: (f: (typeof filings)[number]) => string) => {
      const out: Record<string, number> = {};
      for (const f of filings) { const k = key(f); out[k] = (out[k] ?? 0) + 1; }
      return out;
    };
    const ids = new Set(filings.map((f) => f.id));
    const deliveries = (await deps.store.listDeliveries()).filter((d) => d.event.tenantId === tenantId && ids.has(d.event.filingId));
    const byDelivery: Record<string, number> = { delivered: 0, pending: 0, dead: 0 };
    for (const d of deliveries) byDelivery[d.status] = (byDelivery[d.status] ?? 0) + 1;
    const keys = await deps.store.listApiKeys(tenantId);
    return {
      tenantId,
      generatedAt: now().toISOString(),
      filings: {
        total: filings.length,
        live: filings.filter((f) => !f.request.dryRun).length,
        byStatus: count((f) => f.status),
        byType: count((f) => f.request.type),
        byState: count((f) => f.request.state),
        byClientCompany: count((f) => f.clientCompanyId),
        byMonth: count((f) => f.createdAt.slice(0, 7)),
      },
      webhooks: byDelivery,
      apiKeys: { live: keys.filter((k) => !k.revokedAt).length, revoked: keys.filter((k) => k.revokedAt).length },
    };
  });

  // ---- Client companies (read) ----
  app.get("/v1/client-companies", async (req, reply) => {
    const tenantId = await requireTenant(req, reply);
    if (!tenantId) return reply;
    const list = await deps.store.listClientCompanies(tenantId);
    return { clientCompanies: await Promise.all(list.map((c) => withLogoInfo(deps, c))) };
  });
  app.get("/v1/client-companies/:id", async (req, reply) => {
    const tenantId = await requireTenant(req, reply);
    if (!tenantId) return reply;
    const found = await deps.store.getClientCompany((req.params as { id: string }).id);
    if (!found || found.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    const c = await withLogoInfo(deps, found);
    const tenant = await deps.store.getTenant(c.tenantId);
    return { clientCompany: c, filerName: filerNameFor(c, tenant, deps.platformName ?? "CoFile"), ourAgent: tenant && deps.agentOffer ? deps.agentOffer(tenant, c) : null };
  });
}
