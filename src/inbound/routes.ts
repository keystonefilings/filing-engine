import type { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import type { Store } from "../store/types.js";
import type { Auth } from "../users/routes.js";
import type { InboundEmailService } from "./email.js";

/**
 * V40: Resend's receiving webhook, and the firm-side reads and writes the web app's "from email" page
 * makes. A partner session reaches only its own firm's messages (partner-guard.ts).
 */
const Answers = z.record(z.string().regex(/^[A-Za-z0-9_.]{1,120}$/), z.string().max(2000)).refine((a) => Object.keys(a).length <= 300, "too many answers");
const Extracted = z.object({
  kind: z.string().regex(/^[a-z0-9-]{2,40}$/).nullable(),
  byKind: z.record(z.string().regex(/^[a-z0-9-]{2,40}$/), Answers).refine((b) => Object.keys(b).length <= 15, "too many filing kinds"),
  note: z.string().max(1000).optional(),
});

export function registerInbound(app: FastifyInstance, deps: { store: Store; inbound: InboundEmailService; authOf: (req: FastifyRequest) => Promise<Auth | null> }): void {
  const { store, inbound } = deps;

  // Resend signs the exact bytes it sent (Svix), so this route reads its body as text.
  void app.register(async (hook) => {
    hook.removeContentTypeParser("application/json");
    hook.addContentTypeParser("application/json", { parseAs: "string", bodyLimit: 1_000_000 }, (_req, body, done) => done(null, body));
    hook.post("/v1/inbound/email/resend", async (req, reply) => {
      const raw = String(req.body ?? "");
      if (!inbound.verify(req.headers as Record<string, unknown>, raw)) return reply.code(400).send({ error: "bad signature" });
      const r = await inbound.handle(JSON.parse(raw) as { type?: string; data?: Record<string, unknown> });
      req.log.info({ status: r.status, id: r.id }, "inbound email");
      return { received: true };
    });
  });

  const firmOf = async (req: FastifyRequest) => {
    const a = await deps.authOf(req);
    if (!a) return null;
    const id = (req.params as { id: string }).id;
    if (a.partnerOf && a.partnerOf !== id) return null;
    const c = await store.getClientCompany(id);
    return c && c.tenantId === a.tenantId ? c : null;
  };
  const messageOf = async (req: FastifyRequest) => {
    const c = await firmOf(req);
    if (!c) return null;
    const m = await store.getInbound((req.params as { messageId: string }).messageId).catch(() => null);
    return m && m.clientCompanyId === c.clientCompanyId ? m : null;
  };
  const view = (m: NonNullable<Awaited<ReturnType<typeof messageOf>>>) => {
    const { providerId: _p, ...rest } = m;
    return rest;
  };

  app.get("/v1/client-companies/:id/inbound", async (req, reply) => {
    const c = await firmOf(req);
    if (!c) return reply.code(404).send({ error: "not found" });
    return { address: inbound.configured ? inbound.address : null };
  });
  app.get("/v1/client-companies/:id/inbound/:messageId", async (req, reply) => {
    const m = await messageOf(req);
    return m ? { message: view(m) } : reply.code(404).send({ error: "not found" });
  });
  app.put("/v1/client-companies/:id/inbound/:messageId/extracted", async (req, reply) => {
    const m = await messageOf(req);
    if (!m) return reply.code(404).send({ error: "not found" });
    if (m.purgedAt) return reply.code(410).send({ error: "this message was removed after the retention period" });
    const parsed = Extracted.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) });
    const next = await store.updateInbound(m.id, {
      extracted: { kind: parsed.data.kind ?? m.extracted?.kind ?? null, byKind: { ...(m.extracted?.byKind ?? {}), ...parsed.data.byKind }, note: parsed.data.note ?? m.extracted?.note, at: new Date().toISOString() },
    });
    return { message: view(next) };
  });
  app.post("/v1/client-companies/:id/inbound/:messageId/filed", async (req, reply) => {
    const m = await messageOf(req);
    if (!m) return reply.code(404).send({ error: "not found" });
    const filingId = String((req.body as { filingId?: unknown } | undefined)?.filingId ?? "");
    const f = filingId ? await store.getFiling(filingId) : null;
    if (!f || f.clientCompanyId !== m.clientCompanyId) return reply.code(422).send({ error: "unknown filing" });
    await store.updateInbound(m.id, { filingId });
    return { ok: true };
  });
}
