import type { FastifyInstance, FastifyRequest } from "fastify";
import type { Store } from "../store/types.js";
import type { Auth } from "../users/routes.js";
import type { BillingAccountRef, BillingService } from "./service.js";

/**
 * V33: the billing page's API (status, Checkout, customer portal) for an enterprise subscriber and a
 * partner firm, and Stripe's webhook. A partner session reaches only its own firm (partner-guard.ts).
 */
export function registerBilling(app: FastifyInstance, deps: { store: Store; billing: BillingService; authOf: (req: FastifyRequest) => Promise<Auth | null> }): void {
  const { billing, store } = deps;

  const tenantAccount = async (req: FastifyRequest) => {
    const a = await deps.authOf(req);
    if (!a || a.partnerOf) return null;
    const t = await store.getTenant(a.tenantId);
    if (!t) return null;
    return { a, ref: billing.accountFor(t, null), who: { email: a.user?.email ?? t.branding.supportEmail ?? "", name: t.branding.displayName ?? t.name }, back: "/dashboard/billing" };
  };
  const firmAccount = async (req: FastifyRequest) => {
    const a = await deps.authOf(req);
    if (!a) return null;
    const id = (req.params as { id: string }).id;
    if (a.partnerOf && a.partnerOf !== id) return null;
    const c = await store.getClientCompany(id);
    const t = c && c.tenantId === a.tenantId ? await store.getTenant(c.tenantId) : null;
    if (!c || !t) return null;
    const ref = billing.accountFor(t, c);
    if (!ref || ref.plan !== "partner") return null; // an enterprise subscriber's firms are on its own plan
    return { a, ref, who: { email: a.user?.email ?? c.partner?.contactEmail ?? "", name: c.portal?.displayName ?? c.name }, back: `/p/${encodeURIComponent(c.portal?.slug ?? c.clientCompanyId)}/billing` };
  };

  const routes = (base: string, find: typeof tenantAccount) => {
    app.get(base, async (req, reply) => {
      const o = await find(req);
      if (!o) return reply.code(404).send({ error: "not found" });
      if (!o.ref) return { plan: null, billed: false, canFileLive: true };
      return { billed: true, ...(await billing.summary(o.ref)) };
    });
    app.post(`${base}/checkout`, async (req, reply) => {
      const o = await find(req);
      if (!o?.ref) return reply.code(404).send({ error: "not found" });
      if (!o.who.email) return reply.code(422).send({ error: "an email address is needed for the receipts" });
      try {
        return { url: await billing.checkout(o.ref as BillingAccountRef, o.who, o.back) };
      } catch (e) {
        req.log.warn({ err: (e as Error).message }, "stripe checkout failed");
        return reply.code(503).send({ error: "billing isn't available right now" });
      }
    });
    app.post(`${base}/portal`, async (req, reply) => {
      const o = await find(req);
      if (!o?.ref) return reply.code(404).send({ error: "not found" });
      const url = await billing.portal(o.ref, o.back).catch((e: Error) => { req.log.warn({ err: e.message }, "stripe portal failed"); return null; });
      return url ? { url } : reply.code(409).send({ error: "subscribe first" });
    });
  };
  routes("/v1/account/billing", tenantAccount);
  routes("/v1/client-companies/:id/billing", firmAccount);

  // Stripe signs the exact bytes it sent, so this route reads its body as text.
  void app.register(async (hook) => {
    hook.removeContentTypeParser("application/json");
    hook.addContentTypeParser("application/json", { parseAs: "string", bodyLimit: 1_000_000 }, (_req, body, done) => done(null, body));
    hook.post("/v1/billing/stripe-webhook", async (req, reply) => {
      const ok = await billing.handleWebhook(String(req.body ?? ""), req.headers["stripe-signature"] as string | undefined).catch((e: Error) => {
        req.log.error({ err: e.message }, "stripe webhook failed");
        throw e;
      });
      return ok ? { received: true } : reply.code(400).send({ error: "bad signature" });
    });
  });
}
