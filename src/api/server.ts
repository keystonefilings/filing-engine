import Fastify, { type FastifyInstance } from "fastify";
import { z } from "zod";
import type { FilingService } from "../orchestrator/service.js";
import { ValidationFailed } from "../orchestrator/service.js";
import type { ApprovalService } from "../approvals/service.js";
import { renderReviewPage } from "../approvals/render.js";
import type { Store } from "../store/types.js";
import type { ArtifactStore } from "../artifacts/store.js";
import { TenantSettings, ClientCompanySettings } from "../settings/schema.js";
import { EVENT_TYPES } from "../domain/events.js";

export interface ApiDeps {
  service: FilingService;
  approvals: ApprovalService;
  store: Store;
  artifacts: ArtifactStore;
  publicBaseUrl: string;
  /** Caller API keys: key -> tenantId. Production: hashed keys in the database. */
  apiKeys: Record<string, string>;
}

const DriftDecisionBody = z.discriminatedUnion("action", [
  z.object({ action: z.literal("accept"), decidedBy: z.string().min(1) }),
  z.object({ action: z.literal("correct"), decidedBy: z.string().min(1), mapping: z.record(z.string(), z.string()), knownUnused: z.array(z.string()).optional() }),
  z.object({ action: z.literal("reject"), decidedBy: z.string().min(1), reason: z.string().min(1) }),
]);

export function buildServer(deps: ApiDeps): FastifyInstance {
  const app = Fastify({ logger: false });

  // Minimal form-body parsing for the approval page (no extra dependency).
  app.addContentTypeParser("application/x-www-form-urlencoded", { parseAs: "string" }, (_req, body, done) => {
    done(null, Object.fromEntries(new URLSearchParams(String(body))));
  });

  const tenantOf = (req: { headers: Record<string, unknown> }): string | null => {
    const key = String(req.headers["x-api-key"] ?? "");
    return deps.apiKeys[key] ?? null;
  };

  app.get("/healthz", async () => ({ ok: true }));
  app.get("/v1/events", async () => ({ events: EVENT_TYPES }));

  // ---- Filings (callers) ----
  app.post("/v1/filings", async (req, reply) => {
    const tenantId = tenantOf(req);
    if (!tenantId) return reply.code(401).send({ error: "invalid api key" });
    const body = (req.body ?? {}) as Record<string, unknown>;
    if (body.tenantId && body.tenantId !== tenantId) return reply.code(403).send({ error: "tenant mismatch" });
    try {
      const r = await deps.service.createFiling({ ...body, tenantId });
      return reply.code(r.existing ? 200 : 201).send({ filing: publicFiling(r.filing), approvalLink: r.approvalLink, issues: r.issues });
    } catch (e) {
      if (e instanceof ValidationFailed) return reply.code(422).send({ error: "validation failed", issues: e.issues });
      throw e;
    }
  });

  app.get("/v1/filings", async (req, reply) => {
    const tenantId = tenantOf(req);
    if (!tenantId) return reply.code(401).send({ error: "invalid api key" });
    return { filings: (await deps.store.listFilings(tenantId)).map(publicFiling) };
  });

  app.get("/v1/filings/:id", async (req, reply) => {
    const tenantId = tenantOf(req);
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || f.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    const run = f.currentRunId ? await deps.store.getRun(f.currentRunId) : null;
    return { filing: publicFiling(f), run };
  });

  app.post("/v1/filings/:id/dry-run", async (req, reply) => {
    const tenantId = tenantOf(req);
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || f.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    await deps.service.enqueueDryRun(f.id);
    return reply.code(202).send({ queued: true, dryRun: true });
  });

  app.get("/v1/filings/:id/deliveries", async (req, reply) => {
    const tenantId = tenantOf(req);
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || f.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    return { deliveries: await deps.store.listDeliveries(f.id) };
  });

  app.get("/v1/artifacts/:id", async (req, reply) => {
    const tenantId = tenantOf(req);
    if (!tenantId) return reply.code(401).send({ error: "invalid api key" });
    const a = await deps.artifacts.get((req.params as { id: string }).id);
    if (!a) return reply.code(404).send({ error: "not found" });
    const f = await deps.store.getFiling(a.meta.filingId);
    if (!f || f.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    return reply.header("content-type", a.meta.contentType).send(a.body);
  });

  // ---- Settings ----
  app.put("/v1/tenants/:id", async (req, reply) => {
    const parsed = TenantSettings.safeParse({ ...(req.body as object), tenantId: (req.params as { id: string }).id });
    if (!parsed.success) return reply.code(422).send({ error: parsed.error.issues });
    await deps.store.putTenant(parsed.data);
    return { ok: true };
  });
  app.put("/v1/client-companies/:id", async (req, reply) => {
    const tenantId = tenantOf(req);
    if (!tenantId) return reply.code(401).send({ error: "invalid api key" });
    const parsed = ClientCompanySettings.safeParse({ ...(req.body as object), clientCompanyId: (req.params as { id: string }).id, tenantId });
    if (!parsed.success) return reply.code(422).send({ error: parsed.error.issues });
    await deps.store.putClientCompany(parsed.data);
    return { ok: true };
  });

  // ---- Approval link (client-facing, decision 2) ----
  app.get("/approve/:token", async (req, reply) => {
    const found = await deps.approvals.lookup((req.params as { token: string }).token);
    if (!found.ok) return reply.code(410).type("text/html").send(`<p>This approval link is ${found.reason.replace("_", " ")}.</p>`);
    const a = found.approval;
    const f = await deps.store.getFiling(a.filingId);
    const tenant = await deps.store.getTenant(a.tenantId);
    const html = renderReviewPage({
      brandName: tenant?.branding.displayName ?? tenant?.name, supportEmail: tenant?.branding.supportEmail,
      filingId: a.filingId,
      filingTitle: f ? `${f.request.state} ${f.request.type.replace("_", " ")}${f.request.formation ? `: ${f.request.formation.name.baseName} ${f.request.formation.name.designator}` : ""}` : "Filing",
      payload: a.shownPayload, fees: a.fees, feeCapUsd: a.feeCapUsd, expiresAt: a.expiresAt,
      einInRun: !!f?.request.ein && f.request.ein.mode === "in_run",
      postUrl: `${deps.publicBaseUrl}/approve/${a.token}`, requireCode: !!a.oneTimeCode,
    });
    return reply.type("text/html").send(html);
  });

  app.post("/approve/:token", async (req, reply) => {
    const body = (req.body ?? {}) as Record<string, string>;
    const decision = body.decision === "approve" ? "approve" : "request_changes";
    const r = await deps.service.onApprovalDecision((req.params as { token: string }).token, decision, {
      ip: req.ip, userAgent: String(req.headers["user-agent"] ?? ""), comment: body.comment, code: body.code,
    });
    if (!r.ok) return reply.code(r.reason === "bad_code" ? 400 : 410).type("text/html").send(`<p>Could not record your decision: ${r.reason.replace("_", " ")}.</p>`);
    return reply.type("text/html").send(decision === "approve"
      ? "<p>Thank you. Your approval is recorded and the filing will be submitted exactly as shown.</p>"
      : "<p>Thank you. Your change request is recorded; you will receive a new link once the filing is updated.</p>");
  });

  // ---- Drift reviews (platform staff, decision 6): the platform maintains the site adapters for all tenants ----
  app.get("/v1/drift-reviews", async (req) => {
    const status = (req.query as { status?: "pending" | "accepted" | "corrected" | "rejected" }).status;
    return { halts: await deps.store.listDriftHalts(status) };
  });
  app.get("/v1/drift-reviews/:id", async (req, reply) => {
    const h = await deps.store.getDriftHalt((req.params as { id: string }).id);
    return h ? h : reply.code(404).send({ error: "not found" });
  });
  app.post("/v1/drift-reviews/:id/decision", async (req, reply) => {
    const parsed = DriftDecisionBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: parsed.error.issues });
    try {
      return await deps.service.onDriftDecision((req.params as { id: string }).id, parsed.data);
    } catch (e) {
      return reply.code(409).send({ error: (e as Error).message });
    }
  });

  return app;
}

/** Strips the SSN from API responses; the approval page shows it masked. */
function publicFiling(f: import("../store/types.js").FilingRecord) {
  const request = JSON.parse(JSON.stringify(f.request)) as typeof f.request;
  if (request.ein?.responsibleParty) request.ein.responsibleParty.ssn = `***-**-${request.ein.responsibleParty.ssn.replace(/\D/g, "").slice(-4)}`;
  return { ...f, request };
}
