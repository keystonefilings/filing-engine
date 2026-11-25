import type { FastifyInstance } from "fastify";
import type { FilingService } from "../orchestrator/service.js";
import { IdempotencyConflict, ValidationFailed } from "../orchestrator/service.js";
import { SubscriptionRequired } from "../billing/service.js";
import type { ClientCompanySettings } from "../settings/schema.js";
import type { Store } from "../store/types.js";
import { RateLimiter } from "../users/rate-limit.js";

/**
 * V19 / V39: a firm's public pages and its website widget, with no key. Open for partner firms of
 * the platform, and for a subscriber's firm whose owner switched public pages on. Anyone can submit;
 * each submission is a new filing for that firm, which then goes through the same preview and
 * approval as any other. The submitter never gets the approval link.
 */
export function registerPublicPages(app: FastifyInstance, deps: { store: Store; service: FilingService; platformTenantId: string }): void {
  const perFirm = new RateLimiter(30, 3_600_000);
  const overall = new RateLimiter(600, 3_600_000);

  const findFirm = async (tenantId: string, slug: string): Promise<ClientCompanySettings | null> => {
    if (!/^[a-z0-9][a-z0-9-]{0,62}$/.test(slug) || !/^[a-z0-9][a-z0-9-]{0,62}$/.test(tenantId)) return null;
    const c = (await deps.store.listClientCompanies(tenantId)).find((x) => x.portal?.slug === slug);
    if (!c?.portal) return null;
    const open = (tenantId === deps.platformTenantId && !!c.partner) || c.portal.publicPages === true;
    return open ? c : null;
  };

  app.get("/v1/public/firms/:tenantId/:slug", async (req, reply) => {
    const { tenantId, slug } = req.params as { tenantId: string; slug: string };
    const c = await findFirm(tenantId, slug);
    if (!c) return reply.code(404).send({ error: "not found" });
    const p = c.portal!;
    // Only what a public page shows: brand, services offered, and the firm's saved agents (public record anyway).
    return reply.header("cache-control", "public, max-age=60").send({
      clientCompany: {
        clientCompanyId: c.clientCompanyId, tenantId: c.tenantId, name: c.name,
        portal: { slug: p.slug, displayName: p.displayName, logoUrl: p.logoUrl, logoArtifactId: p.logoArtifactId, primaryColor: p.primaryColor, secondaryColor: p.secondaryColor, supportEmail: p.supportEmail, filingKinds: p.filingKinds, font: p.font, fontArtifactId: p.fontArtifactId },
        ...(c.partner ? { partner: { states: c.partner.states } } : {}),
        registeredAgentsByState: c.registeredAgentsByState,
      },
    });
  });

  app.post("/v1/public/firms/:tenantId/:slug/filings", async (req, reply) => {
    const { tenantId, slug } = req.params as { tenantId: string; slug: string };
    const c = await findFirm(tenantId, slug);
    if (!c) return reply.code(404).send({ error: "not found" });
    const body = (req.body ?? {}) as Record<string, unknown>;
    if (typeof body.idempotencyKey !== "string" || !/^public-[A-Za-z0-9_-]{8,80}$/.test(body.idempotencyKey)) return reply.code(422).send({ error: "send an idempotencyKey starting with public-" });
    if (!overall.take("all") || !perFirm.take(`${tenantId}/${c.clientCompanyId}`)) return reply.code(429).send({ error: "too many submissions to this firm's page right now; try again later" });
    // The firm and account come from the address, never from the body.
    const intake = (body.intake ?? {}) as Record<string, unknown>;
    const portal = { ...((intake.portal ?? {}) as Record<string, unknown>), source: "public_page" };
    delete (portal as { ccEmail?: unknown }).ccEmail; // the firm gets the state's copy (adapters/copies.ts)
    try {
      const r = await deps.service.createFiling({ ...body, tenantId, clientCompanyId: c.clientCompanyId, intake: { ...intake, portal } });
      return reply.code(r.existing ? 200 : 201).send({ filing: { id: r.filing.id, status: r.filing.status }, issues: r.issues });
    } catch (e) {
      if (e instanceof ValidationFailed) return reply.code(422).send({ error: "validation failed", issues: e.issues });
      if (e instanceof IdempotencyConflict) return reply.code(409).send({ error: e.message });
      if (e instanceof SubscriptionRequired) return reply.code(402).send({ error: "this firm can't take filings online right now" });
      throw e;
    }
  });
}
