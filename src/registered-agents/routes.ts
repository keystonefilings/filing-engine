import type { FastifyInstance, FastifyRequest } from "fastify";
import type { Store } from "../store/types.js";
import type { Auth } from "../users/routes.js";
import type { AgentServices } from "./agent-services.js";

/**
 * Decision 9: a partner firm's registered agent services (ours, resold), and cancelling one's
 * renewal. A partner session reaches only its own firm (partner-guard.ts).
 */
export function registerAgentServices(app: FastifyInstance, deps: { store: Store; agentServices: AgentServices; authOf: (req: FastifyRequest) => Promise<Auth | null> }): void {
  const firmOf = async (req: FastifyRequest) => {
    const a = await deps.authOf(req);
    if (!a) return null;
    const id = (req.params as { id: string }).id;
    if (a.partnerOf && a.partnerOf !== id) return null;
    const c = await deps.store.getClientCompany(id);
    const t = c && c.tenantId === a.tenantId ? await deps.store.getTenant(c.tenantId) : null;
    return c && t ? { a, c, t } : null;
  };
  app.get("/v1/client-companies/:id/agent-services", async (req, reply) => {
    const o = await firmOf(req);
    if (!o) return reply.code(404).send({ error: "not found" });
    return { offer: deps.agentServices.offer(o.t, o.c), services: await deps.store.listAgentServices(o.c.clientCompanyId) };
  });
  app.post("/v1/client-companies/:id/agent-services/:serviceId/cancel", async (req, reply) => {
    const o = await firmOf(req);
    if (!o) return reply.code(404).send({ error: "not found" });
    const by = o.a.user ? `${o.a.user.name} <${o.a.user.email}>` : "api key";
    const r = await deps.agentServices.cancel((req.params as { serviceId: string }).serviceId, o.c.clientCompanyId, by);
    return r ? { service: r } : reply.code(404).send({ error: "not found" });
  });
}
