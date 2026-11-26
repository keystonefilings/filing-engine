import type { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import type { Store } from "../store/types.js";
import type { Auth } from "../users/routes.js";
import type { InboundEmailService } from "./email.js";
import type { TwilioChannel } from "./twilio.js";
import type { SlackChannel } from "./slack.js";

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

export function registerInbound(app: FastifyInstance, deps: { store: Store; inbound?: InboundEmailService; twilio?: TwilioChannel; slack?: SlackChannel; publicBaseUrl?: string; authOf: (req: FastifyRequest) => Promise<Auth | null> }): void {
  const { store, inbound, twilio, slack } = deps;

  // Resend and Slack sign the exact bytes they sent, so these routes read their bodies as text.
  void app.register(async (hook) => {
    hook.removeContentTypeParser("application/json");
    hook.addContentTypeParser("application/json", { parseAs: "string", bodyLimit: 1_000_000 }, (_req, body, done) => done(null, body));
    hook.removeContentTypeParser("application/x-www-form-urlencoded");
    hook.addContentTypeParser("application/x-www-form-urlencoded", { parseAs: "string", bodyLimit: 100_000 }, (_req, body, done) => done(null, body));
    if (inbound) hook.post("/v1/inbound/email/resend", async (req, reply) => {
      const raw = String(req.body ?? "");
      if (!inbound.verify(req.headers as Record<string, unknown>, raw)) return reply.code(400).send({ error: "bad signature" });
      const r = await inbound.handle(JSON.parse(raw) as { type?: string; data?: Record<string, unknown> });
      req.log.info({ status: r.status, id: r.id }, "inbound email");
      return { received: true };
    });
    // V41: the /file command. Slack wants an answer within 3 seconds.
    if (slack) hook.post("/v1/slack/command", async (req, reply) => {
      const raw = String(req.body ?? "");
      if (!slack.verify(req.headers as Record<string, unknown>, raw)) return reply.code(401).send({ error: "bad signature" });
      return slack.command(Object.fromEntries(new URLSearchParams(raw)));
    });
  });

  // V41: adding the CoFile app to a Slack workspace.
  if (slack) {
    app.get("/v1/slack/install", async (_req, reply) => slack.configured ? reply.redirect(slack.installUrl(), 302) : reply.code(404).send({ error: "Slack isn't set up" }));
    app.get("/v1/slack/oauth/callback", async (req, reply) => {
      const q = req.query as { code?: string; state?: string; error?: string };
      const page = (title: string, body: string) => reply.type("text/html").send(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>body{font-family:system-ui,sans-serif;max-width:560px;margin:3rem auto;padding:0 1rem;color:#1b1b1b;line-height:1.5}</style></head><body><h1>${title}</h1><p>${body}</p></body></html>`);
      if (q.error || !q.code || !q.state) return page("CoFile wasn't added", "The install was cancelled. You can start it again from Slack.");
      const r = await slack.finishInstall(q.code, q.state);
      const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
      return r.ok
        ? page("CoFile is added to Slack", `CoFile is now in ${esc(r.team)}. Anyone there with a CoFile account can type <strong>/file</strong> and the filing they need; we answer with the form filled in to check and send.`)
        : page("CoFile wasn't added", esc(r.error));
    });
  }

  // V42-V43: texts and WhatsApp messages, through Twilio.
  if (twilio) {
    app.post("/v1/inbound/twilio", async (req, reply) => {
      const params = Object.fromEntries(Object.entries((req.body ?? {}) as Record<string, unknown>).map(([k, v]) => [k, String(v)]));
      if (!twilio.verify(params, req.headers["x-twilio-signature"] as string | undefined)) return reply.code(403).send({ error: "bad signature" });
      return reply.type("text/xml").send(await twilio.incoming(params));
    });
    const person = async (req: FastifyRequest) => (await deps.authOf(req))?.user ?? null;
    app.get("/v1/account/phone", async (req, reply) => {
      const u = await person(req);
      if (!u) return reply.code(401).send({ error: "sign in as a person to manage your phone" });
      return { phone: u.phoneVerifiedAt ? u.phone : null, pending: u.phonePending && u.phonePending.expiresAt > new Date().toISOString() ? u.phonePending.phone : null, numbers: twilio.configured ? twilio.numbers() : null };
    });
    app.post("/v1/account/phone", async (req, reply) => {
      const u = await person(req);
      if (!u) return reply.code(401).send({ error: "sign in as a person to manage your phone" });
      const r = await twilio.startPhone(u, String((req.body as { phone?: unknown } | undefined)?.phone ?? ""));
      return r.ok ? { pending: r.phone } : reply.code(r.status).send({ error: r.error });
    });
    app.post("/v1/account/phone/confirm", async (req, reply) => {
      const u = await person(req);
      if (!u) return reply.code(401).send({ error: "sign in as a person to manage your phone" });
      const r = await twilio.confirmPhone(u, String((req.body as { code?: unknown } | undefined)?.code ?? ""));
      return r.ok ? { phone: r.phone } : reply.code(r.status).send({ error: r.error });
    });
    app.delete("/v1/account/phone", async (req, reply) => {
      const u = await person(req);
      if (!u) return reply.code(401).send({ error: "sign in as a person to manage your phone" });
      await store.updateUser(u.id, { phone: undefined, phoneVerifiedAt: undefined, phonePending: undefined });
      return { phone: null };
    });
  }

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
    // Every way this firm's people can send a request.
    return {
      address: inbound?.configured ? inbound.address : null,
      ...(twilio?.configured ? twilio.numbers() : { sms: null, whatsapp: null }),
      slackInstallUrl: slack?.configured && deps.publicBaseUrl ? `${deps.publicBaseUrl}/v1/slack/install` : null,
    };
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
