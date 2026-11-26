import type { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import type { Store } from "../store/types.js";
import type { Auth } from "../users/routes.js";
import { normalizeDomain, type ResendDomains } from "../comms/resend-domains.js";

interface Deps {
  store: Store;
  authOf: (req: FastifyRequest) => Promise<Auth | null>;
  /** Absent when no RESEND_API_KEY is set: the routes say so. */
  domains?: ResendDomains;
  /** Our own sending domains, which a firm can't claim. */
  platformDomains: string[];
}

const Body = z.object({ domain: z.string().min(1).max(300) });

/**
 * Decision 37: a partner firm connects its own email domain (merged spec 10B.5.1). The firm enters a domain; the
 * sending service gives the DNS records to add; checking finds them; once verified, emails to the firm's clients come
 * from the firm's own address. Same keys as the firm's other settings (a partner session only for its own firm).
 */
export function registerEmailDomains(app: FastifyInstance, deps: Deps): void {
  const own = async (req: FastifyRequest) => {
    const a = await deps.authOf(req);
    if (!a) return { status: 401 as const };
    const id = (req.params as { id: string }).id;
    if (a.partnerOf && a.partnerOf !== id) return { status: 404 as const };
    const c = await deps.store.getClientCompany(id);
    if (!c || c.tenantId !== a.tenantId || !c.portal) return { status: 404 as const };
    return { status: 200 as const, company: c };
  };
  const unavailable = { error: "email domains are not available here (no sending service is configured)" };
  const save = async (company: Awaited<ReturnType<typeof deps.store.getClientCompany>>, emailDomain: unknown) => {
    const c = company!;
    const portal = { ...c.portal! } as Record<string, unknown>;
    if (emailDomain) portal.emailDomain = emailDomain; else delete portal.emailDomain;
    await deps.store.putClientCompany({ ...c, portal: portal as typeof c.portal });
  };

  app.get("/v1/client-companies/:id/email-domain", async (req, reply) => {
    const o = await own(req);
    if (o.status !== 200) return reply.code(o.status).send({ error: o.status === 401 ? "invalid api key" : "not found" });
    const stored = o.company.portal!.emailDomain;
    if (!stored) return { emailDomain: null, records: [], available: Boolean(deps.domains) };
    if (!deps.domains || !stored.providerId) return { emailDomain: stored, records: [], available: Boolean(deps.domains) };
    const r = await deps.domains.get(stored.providerId);
    if (!r.ok) return { emailDomain: stored, records: [], available: true, error: r.detail };
    const next = { ...stored, status: r.domain.status, checkedAt: new Date().toISOString() };
    if (next.status !== stored.status) await save(o.company, next);
    return { emailDomain: next, records: r.domain.records, available: true };
  });

  app.put("/v1/client-companies/:id/email-domain", async (req, reply) => {
    const o = await own(req);
    if (o.status !== 200) return reply.code(o.status).send({ error: o.status === 401 ? "invalid api key" : "not found" });
    if (!deps.domains) return reply.code(503).send(unavailable);
    const parsed = Body.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: [{ path: "domain", message: "invalid" }] });
    const n = normalizeDomain(parsed.data.domain, deps.platformDomains);
    if (!n.ok) return reply.code(422).send({ error: "validation failed", issues: [{ path: "domain", message: n.reason }] });
    const old = o.company.portal!.emailDomain;
    if (old?.providerId && old.domain !== n.domain) await deps.domains.remove(old.providerId);
    const r = old?.providerId && old.domain === n.domain ? await deps.domains.get(old.providerId) : await deps.domains.create(n.domain);
    if (!r.ok) return reply.code(r.status === 422 || r.status === 409 ? 422 : 502).send({ error: r.detail, issues: [{ path: "domain", message: "unusable" }] });
    const stored = { domain: n.domain, status: r.domain.status, providerId: r.domain.providerId, checkedAt: new Date().toISOString() };
    await save(o.company, stored);
    return { emailDomain: stored, records: r.domain.records, available: true };
  });

  app.post("/v1/client-companies/:id/email-domain/check", async (req, reply) => {
    const o = await own(req);
    if (o.status !== 200) return reply.code(o.status).send({ error: o.status === 401 ? "invalid api key" : "not found" });
    if (!deps.domains) return reply.code(503).send(unavailable);
    const stored = o.company.portal!.emailDomain;
    if (!stored?.providerId) return reply.code(404).send({ error: "no email domain" });
    const r = await deps.domains.check(stored.providerId);
    if (!r.ok) return reply.code(502).send({ error: r.detail });
    const next = { ...stored, status: r.domain.status, checkedAt: new Date().toISOString() };
    await save(o.company, next);
    return { emailDomain: next, records: r.domain.records, available: true };
  });

  app.delete("/v1/client-companies/:id/email-domain", async (req, reply) => {
    const o = await own(req);
    if (o.status !== 200) return reply.code(o.status).send({ error: o.status === 401 ? "invalid api key" : "not found" });
    const stored = o.company.portal!.emailDomain;
    if (stored?.providerId && deps.domains) await deps.domains.remove(stored.providerId);
    await save(o.company, undefined);
    return { emailDomain: null, records: [], available: Boolean(deps.domains) };
  });
}
