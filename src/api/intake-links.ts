import type { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import type { IntakeLinkRecord, Store } from "../store/types.js";
import type { Auth } from "../users/routes.js";

/**
 * V26: client links a firm sends (one link, one client, one filing). The link itself is a sealed
 * token made by the web app; this record lets the firm list and revoke its links, and makes a used
 * or revoked link refuse a second submission. Same keys as the firm's other settings: a partner
 * session only for its own firm (partner-guard.ts).
 */
const NewLink = z.object({
  id: z.string().regex(/^[A-Za-z0-9_-]{16,64}$/),
  kind: z.string().regex(/^[a-z0-9-]{2,40}$/),
  label: z.string().trim().max(80).optional(),
  expiresAt: z.string().datetime().optional(),
});

export function linkState(l: IntakeLinkRecord, now = new Date()): "open" | "used" | "revoked" | "expired" {
  if (l.revokedAt) return "revoked";
  if (l.usedAt) return "used";
  if (l.expiresAt && l.expiresAt <= now.toISOString()) return "expired";
  return "open";
}

export function registerIntakeLinks(app: FastifyInstance, deps: { store: Store; authOf: (req: FastifyRequest) => Promise<Auth | null> }): void {
  const own = async (req: FastifyRequest) => {
    const a = await deps.authOf(req);
    if (!a) return { status: 401 as const };
    const id = (req.params as { id: string }).id;
    if (a.partnerOf && a.partnerOf !== id) return { status: 404 as const };
    const c = await deps.store.getClientCompany(id);
    if (!c || c.tenantId !== a.tenantId) return { status: 404 as const };
    return { status: 200 as const, auth: a, company: c };
  };
  const linkOf = async (req: FastifyRequest) => {
    const o = await own(req);
    if (o.status !== 200) return o;
    const l = await deps.store.getIntakeLink((req.params as { linkId: string }).linkId);
    if (!l || l.clientCompanyId !== o.company.clientCompanyId) return { status: 404 as const };
    return { status: 200 as const, link: l };
  };
  const view = (l: IntakeLinkRecord) => ({ ...l, state: linkState(l) });
  const fail = (s: 401 | 404) => ({ error: s === 401 ? "invalid api key" : "not found" });

  app.post("/v1/client-companies/:id/intake-links", async (req, reply) => {
    const o = await own(req);
    if (o.status !== 200) return reply.code(o.status).send(fail(o.status));
    const parsed = NewLink.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) });
    const rec: IntakeLinkRecord = {
      ...parsed.data, tenantId: o.company.tenantId, clientCompanyId: o.company.clientCompanyId,
      createdAt: new Date().toISOString(), createdBy: o.auth.user?.email ?? "api key",
    };
    try { await deps.store.createIntakeLink(rec); } catch { return reply.code(409).send({ error: "that link id is taken" }); }
    return reply.code(201).send({ link: view(rec) });
  });

  app.get("/v1/client-companies/:id/intake-links", async (req, reply) => {
    const o = await own(req);
    if (o.status !== 200) return reply.code(o.status).send(fail(o.status));
    return { links: (await deps.store.listIntakeLinks(o.company.clientCompanyId)).map(view) };
  });

  app.get("/v1/client-companies/:id/intake-links/:linkId", async (req, reply) => {
    const l = await linkOf(req);
    if (l.status !== 200) return reply.code(l.status).send(fail(l.status));
    return { link: view(l.link) };
  });

  app.post("/v1/client-companies/:id/intake-links/:linkId/revoke", async (req, reply) => {
    const l = await linkOf(req);
    if (l.status !== 200) return reply.code(l.status).send(fail(l.status));
    const next = l.link.revokedAt ? l.link : await deps.store.updateIntakeLink(l.link.id, { revokedAt: new Date().toISOString() });
    return { link: view(next) };
  });

  // The web app marks a link used once its filing exists; a second use is refused.
  app.post("/v1/client-companies/:id/intake-links/:linkId/used", async (req, reply) => {
    const l = await linkOf(req);
    if (l.status !== 200) return reply.code(l.status).send(fail(l.status));
    const parsed = z.object({ filingId: z.string().min(1).max(80) }).safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "send the filingId" });
    const st = linkState(l.link);
    if (st !== "open" && !(st === "used" && l.link.filingId === parsed.data.filingId)) return reply.code(409).send({ error: `this link is ${st}`, link: view(l.link) });
    const next = st === "used" ? l.link : await deps.store.updateIntakeLink(l.link.id, { usedAt: new Date().toISOString(), filingId: parsed.data.filingId });
    return { link: view(next) };
  });
}
