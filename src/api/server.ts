import Fastify, { type FastifyInstance } from "fastify";
import { keyMatches } from "./keys.js";
import { z } from "zod";
import type { FilingService } from "../orchestrator/service.js";
import { ValidationFailed } from "../orchestrator/service.js";
import type { ApprovalService } from "../approvals/service.js";
import { renderReviewPage, maskSensitive } from "../approvals/render.js";
import type { Store, FilingRecord } from "../store/types.js";
import type { ArtifactStore } from "../artifacts/store.js";
import { TenantSettings, ClientCompanySettings } from "../settings/schema.js";
import { EVENT_TYPES } from "../domain/events.js";
import type { NameResolutionService, NameDecision } from "../name-resolution/service.js";
import type { ReviewGateService, ReviewGateDecision } from "../review-gate/service.js";
import { renderNameResolutionPage } from "../name-resolution/render.js";
import { renderReviewGatePage } from "../review-gate/render.js";

export interface ApiDeps {
  service: FilingService;
  approvals: ApprovalService;
  store: Store;
  artifacts: ArtifactStore;
  publicBaseUrl: string;
  /** Beta admin flows; absent on tiers that do not run them. */
  nameResolution?: NameResolutionService;
  reviewGate?: ReviewGateService;
  /** Caller API keys: key -> tenantId. Production: hashed keys in the database. */
  apiKeys: Record<string, string>;
  /** Platform staff keys (header x-staff-key): drift reviews and any tenant's settings. None = those routes stay closed. */
  staffKeys?: string[];
}

function filingTitle(f: FilingRecord | null): string {
  if (!f) return "Filing";
  const n = f.request.formation ? `: ${f.request.formation.name.baseName} ${f.request.formation.name.designator}` : "";
  return `${f.request.state} ${f.request.type.replace(/_/g, " ")}${n}`;
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
    return Object.prototype.hasOwnProperty.call(deps.apiKeys, key) ? deps.apiKeys[key]! : null;
  };
  const isStaff = (req: { headers: Record<string, unknown> }): boolean => keyMatches(String(req.headers["x-staff-key"] ?? ""), deps.staffKeys ?? []);
  const STAFF_ONLY = { error: "platform staff key required" };

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

  // Supply missing info for a filing in awaiting_information (completeness check).
  app.post("/v1/filings/:id/information", async (req, reply) => {
    const tenantId = tenantOf(req);
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || f.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    const r = await deps.service.supplyInformation(f.id, (req.body ?? {}) as Record<string, unknown>);
    if (!r.ok) return reply.code(r.reason === "not_awaiting_information" ? 409 : r.reason === "not_found" ? 404 : 422).send({ error: r.reason, issues: (r as { issues?: unknown }).issues });
    if (!r.complete) return reply.code(200).send({ complete: false, missing: r.missing });
    return reply.code(200).send({ complete: true, filing: publicFiling(r.filing!), approvalLink: r.approvalLink });
  });

  app.get("/v1/filings/:id/deliveries", async (req, reply) => {
    const tenantId = tenantOf(req);
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || f.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    return { deliveries: await deps.store.listDeliveries(f.id) };
  });

  app.get("/v1/filings/:id/messages", async (req, reply) => {
    const tenantId = tenantOf(req);
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || f.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    return { messages: await deps.store.listMessages(f.id) };
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
    // A filing company changes its own settings; only platform staff touch another's (or create one).
    const id = (req.params as { id: string }).id;
    const caller = tenantOf(req);
    if (!isStaff(req) && caller !== id) return reply.code(caller ? 403 : 401).send({ error: caller ? "tenant mismatch" : "invalid api key" });
    const parsed = TenantSettings.safeParse({ ...(req.body as object), tenantId: id });
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
  app.get("/v1/drift-reviews", async (req, reply) => {
    if (!isStaff(req)) return reply.code(401).send(STAFF_ONLY);
    const status = (req.query as { status?: "pending" | "accepted" | "corrected" | "rejected" }).status;
    return { halts: await deps.store.listDriftHalts(status) };
  });
  app.get("/v1/drift-reviews/:id", async (req, reply) => {
    if (!isStaff(req)) return reply.code(401).send(STAFF_ONLY);
    const h = await deps.store.getDriftHalt((req.params as { id: string }).id);
    return h ? h : reply.code(404).send({ error: "not found" });
  });
  app.post("/v1/drift-reviews/:id/decision", async (req, reply) => {
    if (!isStaff(req)) return reply.code(401).send(STAFF_ONLY);
    const parsed = DriftDecisionBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: parsed.error.issues });
    try {
      return await deps.service.onDriftDecision((req.params as { id: string }).id, parsed.data);
    } catch (e) {
      return reply.code(409).send({ error: (e as Error).message });
    }
  });

  // ---- Name resolution (admin link, filing company only; beta) ----
  app.get("/admin/name-resolution/:token", async (req, reply) => {
    if (!deps.nameResolution) return reply.code(404).send({ error: "not enabled" });
    const token = (req.params as { token: string }).token;
    const rec = await deps.nameResolution.lookup(token);
    if (!rec) return reply.code(410).type("text/html").send("<p>This link is invalid or has expired.</p>");
    if (rec.status !== "awaiting_admin") return reply.code(410).type("text/html").send(`<p>This name request was already ${rec.status === "resolved" ? "resolved" : "closed"}.</p>`);
    const f = await deps.store.getFiling(rec.filingId);
    const tenant = await deps.store.getTenant(rec.tenantId);
    return reply.type("text/html").send(renderNameResolutionPage({
      brandName: tenant?.branding.displayName ?? tenant?.name, supportEmail: tenant?.branding.supportEmail,
      filingTitle: filingTitle(f), record: rec, postUrl: `${deps.publicBaseUrl}/admin/name-resolution/${token}`,
    }));
  });
  app.post("/admin/name-resolution/:token", async (req, reply) => {
    if (!deps.nameResolution) return reply.code(404).send({ error: "not enabled" });
    const token = (req.params as { token: string }).token;
    const body = (req.body ?? {}) as Record<string, string>;
    const decidedBy = body.decidedBy || "admin via link";
    let decision: NameDecision;
    switch (body.decision) {
      case "pick": decision = { action: "pick", option: body.option ?? "", decidedBy }; break;
      case "custom": decision = { action: "custom", baseName: body.baseName ?? "", designator: body.designator, decidedBy }; break;
      case "regenerate": decision = { action: "regenerate", decidedBy }; break;
      case "abort": decision = { action: "abort", reason: body.reason ?? "", decidedBy }; break;
      default: return reply.code(400).type("text/html").send("<p>Unrecognized action.</p>");
    }
    const r = await deps.service.onNameResolutionDecision(token, decision);
    if (!r.ok) return reply.code(410).type("text/html").send(`<p>Could not record your choice: ${r.reason.replace(/_/g, " ")}.</p>`);
    const msg = r.outcome === "resolved" ? "The name is set and the filing will proceed."
      : r.outcome === "aborted" ? "The filing has been cancelled."
      : r.outcome === "still_unavailable" ? "That name is also taken. Open the link again to choose another."
      : "More options were generated. Open the link again to choose.";
    return reply.type("text/html").send(`<p>${msg}</p>`);
  });

  // ---- Review gate (admin link, filing company only; beta) ----
  app.get("/admin/review/:token", async (req, reply) => {
    if (!deps.reviewGate) return reply.code(404).send({ error: "not enabled" });
    const token = (req.params as { token: string }).token;
    const rec = await deps.reviewGate.lookup(token);
    if (!rec) return reply.code(410).type("text/html").send("<p>This link is invalid or has expired.</p>");
    if (rec.status !== "pending") return reply.code(410).type("text/html").send(`<p>This review was already ${rec.status}.</p>`);
    const f = await deps.store.getFiling(rec.filingId);
    const tenant = await deps.store.getTenant(rec.tenantId);
    return reply.type("text/html").send(renderReviewGatePage({
      brandName: tenant?.branding.displayName ?? tenant?.name, supportEmail: tenant?.branding.supportEmail,
      filingTitle: filingTitle(f), record: rec, postUrl: `${deps.publicBaseUrl}/admin/review/${token}`,
      screenshotUrl: rec.screenshotArtifactId ? `${deps.publicBaseUrl}/admin/review/${token}/screenshot` : undefined,
    }));
  });
  app.get("/admin/review/:token/screenshot", async (req, reply) => {
    if (!deps.reviewGate) return reply.code(404).send({ error: "not enabled" });
    const rec = await deps.reviewGate.lookup((req.params as { token: string }).token);
    if (!rec?.screenshotArtifactId) return reply.code(404).send({ error: "not found" });
    const a = await deps.artifacts.get(rec.screenshotArtifactId);
    if (!a) return reply.code(404).send({ error: "not found" });
    return reply.header("content-type", a.meta.contentType).send(a.body);
  });
  app.post("/admin/review/:token", async (req, reply) => {
    if (!deps.reviewGate) return reply.code(404).send({ error: "not enabled" });
    const token = (req.params as { token: string }).token;
    const body = (req.body ?? {}) as Record<string, string>;
    const decidedBy = body.decidedBy || "admin via link";
    const decision: ReviewGateDecision = body.decision === "approve"
      ? { action: "approve", decidedBy }
      : { action: "reject", decidedBy, reason: body.reason ?? "" };
    const r = await deps.service.onReviewGateDecision(token, decision);
    if (!r.ok) return reply.code(410).type("text/html").send(`<p>Could not record your decision: ${r.reason.replace(/_/g, " ")}.</p>`);
    return reply.type("text/html").send(r.outcome === "approved"
      ? "<p>Approved. The filing will now run through to submission.</p>"
      : "<p>Rejected. The filing has been aborted; nothing was submitted.</p>");
  });

  // ---- Beta flows, JSON for dashboards (tenant-scoped) ----
  app.get("/v1/name-resolutions", async (req, reply) => {
    const tenantId = tenantOf(req);
    if (!tenantId) return reply.code(401).send({ error: "invalid api key" });
    const all = await deps.store.listNameResolutions((req.query as { status?: "awaiting_admin" | "resolved" | "aborted" }).status);
    return { resolutions: all.filter((r) => r.tenantId === tenantId) };
  });
  app.get("/v1/review-gates", async (req, reply) => {
    const tenantId = tenantOf(req);
    if (!tenantId) return reply.code(401).send({ error: "invalid api key" });
    const all = await deps.store.listReviewGates((req.query as { status?: "pending" | "approved" | "rejected" }).status);
    return { reviewGates: all.filter((r) => r.tenantId === tenantId) };
  });

  return app;
}

/** Strips every sensitive value (EIN responsible-party SSN, payroll owner SSNs) from API responses. */
function publicFiling(f: import("../store/types.js").FilingRecord) {
  return { ...f, request: maskSensitive(f.request) };
}
