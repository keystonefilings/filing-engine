import Fastify, { type FastifyInstance, type FastifyReply } from "fastify";
import type { ChannelSender } from "../comms/senders.js";
import { lookupKey } from "./keys.js";
import { registerSelfService, tenantFromStoredKey } from "./self-service.js";
import { registerSignatures } from "./signatures.js";
import { z } from "zod";
import type { FilingService } from "../orchestrator/service.js";
import { IdempotencyConflict, OutcomeError, ValidationFailed } from "../orchestrator/service.js";
import type { ApprovalService } from "../approvals/service.js";
import { renderReviewPage, maskSensitive } from "../approvals/render.js";
import { ClientCompanyOwnershipError, type Store, type FilingRecord } from "../store/types.js";
import type { ArtifactStore } from "../artifacts/store.js";
import { TenantSettings, ClientCompanySettings } from "../settings/schema.js";
import { EVENT_TYPES } from "../domain/events.js";
import type { NameResolutionService, NameDecision } from "../name-resolution/service.js";
import type { ReviewGateService, ReviewGateDecision } from "../review-gate/service.js";
import { renderNameResolutionPage } from "../name-resolution/render.js";
import { renderReviewGatePage } from "../review-gate/render.js";
import { registerUsers, portalSlugFor, type Auth, type PartnerSignupMode } from "../users/routes.js";
import { registerBrandLogos } from "./brand-logos.js";
import { registerIntakeLinks } from "./intake-links.js";
import { readSessionKey, SESSION_PREFIX } from "../users/session-token.js";
import { partnerGuard } from "../users/partner-guard.js";
import { FONT_PRESETS, googleFontHref, type FontPreset } from "../settings/fonts.js";
import type { WebhookDispatcher } from "../webhooks/dispatcher.js";
import { FilingRequest } from "../domain/filing.js";

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
  /** Platform staff keys (STAFF_API_KEYS): key -> staff identity, presented in x-api-key. Only staff
   *  change tenant settings and decide drift reviews. None = those routes refuse every caller. */
  staffKeys?: Record<string, string>;
  /** Signs dashboard session keys (src/users). Defaults to a development value outside tests. */
  sessionSecret?: string;
  /** The platform's own tenant: partner firms that sign up on the landing page join it. */
  platformTenantId?: string;
  /** Whether partner sign-ups wait for approval (default) or are approved at once. */
  partnerSignupMode?: PartnerSignupMode;
  /** Sends account emails (password reset). Absent: those emails are not sent. */
  email?: ChannelSender;
  /** The web front end, for links in account emails. */
  webBaseUrl?: string;
  /** V29: where connected portal logins are sealed. */
  secrets?: import("../settings/db-vault.js").DbVault;
  /** Sends webhook test deliveries (V35). */
  webhooks?: WebhookDispatcher;
  /** The site's name (CoFile): the platform tenant's approval pages and partner firms' "with …". */
  platformName?: string;
}

function filingTitle(f: FilingRecord | null): string {
  if (!f) return "Filing";
  const n = f.request.formation ? `: ${f.request.formation.name.baseName} ${f.request.formation.name.designator}` : "";
  return `${f.request.state} ${f.request.type.replace(/_/g, " ")}${n}`;
}

const OutcomeBody = z.object({
  outcome: z.enum(["accepted", "rejected"]),
  /** The state's reference: filing receipt or document number. */
  reference: z.string().trim().max(120).optional(),
  /** Why the state rejected it (shown to the client). */
  reason: z.string().trim().max(1000).optional(),
  documents: z.array(z.object({
    label: z.string().trim().min(1).max(120),
    kind: z.enum(["filing_receipt", "formation_document", "standing_certificate", "other"]).default("formation_document"),
    contentType: z.enum(["application/pdf", "image/png", "image/jpeg"]),
    data: z.string().max(14_000_000).describe("base64"),
  })).max(5).optional(),
}).refine((b) => b.outcome === "accepted" || !b.documents?.length, { message: "documents go with an accepted filing", path: ["documents"] });

const DriftDecisionBody = z.discriminatedUnion("action", [
  // decidedBy comes from the authenticated staff key, never from the body.
  z.object({ action: z.literal("accept") }),
  z.object({ action: z.literal("correct"), mapping: z.record(z.string(), z.string()), knownUnused: z.array(z.string()).optional() }),
  z.object({ action: z.literal("reject"), reason: z.string().min(1) }),
]);

export function buildServer(deps: ApiDeps): FastifyInstance {
  const app = Fastify({ logger: false });

  // Minimal form-body parsing for the approval page (no extra dependency).
  app.addContentTypeParser("application/x-www-form-urlencoded", { parseAs: "string" }, (_req, body, done) => {
    done(null, Object.fromEntries(new URLSearchParams(String(body))));
  });

  const presented = (req: { headers: Record<string, unknown> }) => String(req.headers["x-api-key"] ?? "");
  const sessionSecret = deps.sessionSecret ?? "dev-only-session-secret";
  /**
   * The caller: a key from API_KEYS, a key the tenant issued itself (stored hashed), or a signed-in
   * person's session key. A partner's session is limited to its firm (partnerGuard below).
   */
  const authOf = async (req: { headers: Record<string, unknown> }): Promise<Auth | null> => {
    const key = presented(req);
    if (key.startsWith(SESSION_PREFIX)) {
      const c = readSessionKey(sessionSecret, key);
      if (!c) return null;
      const u = await deps.store.getUser(c.sub);
      if (!u || u.status !== "active" || u.sessionGen !== c.gen || u.tenantId !== c.tenantId || u.kind !== c.kind) return null;
      if (c.jti && u.revokedSessions?.some((r) => r.jti === c.jti)) return null;
      if (u.kind === "partner") return u.clientCompanyId && u.clientCompanyId === c.clientCompanyId ? { tenantId: u.tenantId, user: u, partnerOf: u.clientCompanyId, session: c } : null;
      return { tenantId: u.tenantId, user: u, session: c };
    }
    const fromEnv = lookupKey(deps.apiKeys, key);
    if (fromEnv) return { tenantId: fromEnv };
    const stored = await tenantFromStoredKey(deps.store, key);
    if (!stored) return null;
    void deps.store.touchApiKey(stored.keyId, new Date().toISOString()).catch(() => {});
    return { tenantId: stored.tenantId };
  };
  /** The caller's tenant (any of the three kinds of key). */
  const tenantOf = async (req: { headers: Record<string, unknown> }): Promise<string | null> => (await authOf(req))?.tenantId ?? null;
  const staffOf = (req: { headers: Record<string, unknown> }): string | null => lookupKey(deps.staffKeys ?? {}, presented(req));
  /** Platform-staff routes: the staff identity, or null after answering 401 (no key) / 403 (a tenant's key). */
  const requireStaff = async (req: { headers: Record<string, unknown> }, reply: FastifyReply): Promise<string | null> => {
    const staff = staffOf(req);
    if (staff) return staff;
    const tenant = await tenantOf(req);
    void reply.code(tenant ? 403 : 401).send({ error: tenant ? "platform staff only" : "invalid api key" });
    return null;
  };

  // A partner's session reaches only its own firm's filings, signatures and settings.
  app.addHook("preHandler", partnerGuard({ store: deps.store, artifacts: deps.artifacts, authOf }));

  app.get("/healthz", async () => ({ ok: true }));
  app.get("/v1/events", async () => ({ events: EVENT_TYPES }));

  // ---- Filings (callers) ----
  app.post("/v1/filings", async (req, reply) => {
    const tenantId = await tenantOf(req);
    if (!tenantId) return reply.code(401).send({ error: "invalid api key" });
    const body = (req.body ?? {}) as Record<string, unknown>;
    if (body.tenantId && body.tenantId !== tenantId) return reply.code(403).send({ error: "tenant mismatch" });
    try {
      const r = await deps.service.createFiling({ ...body, tenantId });
      return reply.code(r.existing ? 200 : 201).send({ filing: publicFiling(r.filing), approvalLink: r.approvalLink, issues: r.issues });
    } catch (e) {
      if (e instanceof ValidationFailed) return reply.code(422).send({ error: "validation failed", issues: e.issues });
      if (e instanceof IdempotencyConflict) return reply.code(409).send({ error: e.message, filingId: e.filingId });
      throw e;
    }
  });

  app.get("/v1/filings", async (req, reply) => {
    const tenantId = await tenantOf(req);
    if (!tenantId) return reply.code(401).send({ error: "invalid api key" });
    const { clientCompanyId, status } = req.query as { clientCompanyId?: string; status?: string };
    let filings = await deps.store.listFilings(tenantId);
    if (clientCompanyId) filings = filings.filter((f) => f.clientCompanyId === clientCompanyId);
    if (status) { const wanted = new Set(status.split(",")); filings = filings.filter((f) => wanted.has(f.status)); }
    filings.sort((a, b) => b.createdAt.localeCompare(a.createdAt) || b.id.localeCompare(a.id));
    // V35: pages, newest first. limit (1 to 200) and before (the nextBefore of the page before).
    const q = req.query as { limit?: string; before?: string };
    if (q.before) { const [at, id] = q.before.split("|"); filings = filings.filter((f) => f.createdAt < at! || (f.createdAt === at && !!id && f.id < id)); }
    if (q.limit) {
      const n = Math.min(200, Math.max(1, Number(q.limit) || 50));
      const page = filings.slice(0, n);
      const last = page[page.length - 1];
      return { filings: page.map(publicFiling), nextBefore: filings.length > n && last ? `${last.createdAt}|${last.id}` : null };
    }
    return { filings: filings.map(publicFiling) };
  });

  app.get("/v1/filings/:id", async (req, reply) => {
    const tenantId = await tenantOf(req);
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || f.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    const run = f.currentRunId ? await deps.store.getRun(f.currentRunId) : null;
    // The pending approval link, so a caller that lost the one returned at creation can show it again.
    const approval = f.status === "awaiting_approval" && f.currentApprovalId ? await deps.store.getApproval(f.currentApprovalId) : null;
    const approvalLink = approval && approval.status === "pending" && approval.expiresAt > new Date().toISOString() ? `${deps.publicBaseUrl}/approve/${approval.token}` : undefined;
    return { filing: publicFiling(f), run, approvalLink };
  });

  app.post("/v1/filings/:id/dry-run", async (req, reply) => {
    const tenantId = await tenantOf(req);
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || f.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    await deps.service.enqueueDryRun(f.id);
    return reply.code(202).send({ queued: true, dryRun: true });
  });

  // Supply missing info for a filing in awaiting_information (completeness check).
  app.post("/v1/filings/:id/information", async (req, reply) => {
    const tenantId = await tenantOf(req);
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || f.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    const r = await deps.service.supplyInformation(f.id, (req.body ?? {}) as Record<string, unknown>);
    if (!r.ok) return reply.code(r.reason === "not_awaiting_information" ? 409 : r.reason === "not_found" ? 404 : 422).send({ error: r.reason, issues: (r as { issues?: unknown }).issues });
    if (!r.complete) return reply.code(200).send({ complete: false, missing: r.missing });
    return reply.code(200).send({ complete: true, filing: publicFiling(r.filing!), approvalLink: r.approvalLink });
  });

  // The state's answer to a submitted filing (NY receipt email, FL examiner, a rejection): platform
  // staff, or the subscriber whose filing it is. Partner sessions can't (partner-guard has no rule).
  app.post("/v1/filings/:id/outcome", async (req, reply) => {
    const staff = staffOf(req);
    const auth = staff ? null : await authOf(req);
    if (!staff && !auth) return reply.code(401).send({ error: "invalid api key" });
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || (!staff && f.tenantId !== auth!.tenantId)) return reply.code(404).send({ error: "not found" });
    const parsed = OutcomeBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "validation failed", issues: parsed.error.issues.map((i) => ({ path: i.path.join("."), message: i.message })) });
    const docs = (parsed.data.documents ?? []).map((d) => ({ label: d.label, kind: d.kind, contentType: d.contentType, body: Buffer.from(d.data, "base64") }));
    if (docs.some((d) => d.body.length === 0 || d.body.length > 10 * 1024 * 1024)) return reply.code(422).send({ error: "each document must be 1 byte to 10 MB" });
    try {
      const done = await deps.service.recordOutcome(f.id, { ...parsed.data, documents: docs, by: staff ?? auth?.user?.email ?? "api key" }, deps.artifacts);
      return { filing: publicFiling(done) };
    } catch (e) {
      if (e instanceof OutcomeError) return reply.code(e.status).send({ error: e.message });
      throw e;
    }
  });

  // Decision 7: take the state's review page again (after a preview failed, was blocked, or its drift review is done).
  app.post("/v1/filings/:id/preview", async (req, reply) => {
    const staff = staffOf(req);
    const auth = staff ? null : await authOf(req);
    if (!staff && !auth) return reply.code(401).send({ error: "invalid api key" });
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || (!staff && f.tenantId !== auth!.tenantId)) return reply.code(404).send({ error: "not found" });
    try {
      return reply.code(202).send({ filing: publicFiling(await deps.service.requestPreview(f.id)) });
    } catch (e) {
      if (e instanceof OutcomeError) return reply.code(e.status).send({ error: e.message });
      throw e;
    }
  });

  // V34: the filing request's JSON Schema, generated from the model the engine validates with (public: it's documentation).
  let requestSchema: unknown;
  app.get("/v1/schema/filing-request", async (_req, reply) => {
    requestSchema ??= z.toJSONSchema(FilingRequest, { io: "input", unrepresentable: "any" });
    return reply.header("cache-control", "public, max-age=3600").send(requestSchema);
  });

  // V35: cancel before anything has started at the state.
  app.post("/v1/filings/:id/cancel", async (req, reply) => {
    const auth = await authOf(req);
    if (!auth) return reply.code(401).send({ error: "invalid api key" });
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || f.tenantId !== auth.tenantId) return reply.code(404).send({ error: "not found" });
    const reason = typeof (req.body as { reason?: unknown } | undefined)?.reason === "string" ? String((req.body as { reason: string }).reason).slice(0, 500) : undefined;
    try {
      return { filing: publicFiling(await deps.service.cancelFiling(f.id, auth.user?.email ?? "api key", reason)) };
    } catch (e) {
      if (e instanceof OutcomeError) return reply.code(e.status).send({ error: e.message });
      throw e;
    }
  });

  // V35: the client's decision, collected in the subscriber's own app.
  app.post("/v1/filings/:id/approval", async (req, reply) => {
    const auth = await authOf(req);
    if (!auth) return reply.code(401).send({ error: "invalid api key" });
    if (auth.partnerOf) return reply.code(403).send({ error: "partners approve through the approval link" });
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || f.tenantId !== auth.tenantId) return reply.code(404).send({ error: "not found" });
    const parsed = z.object({ decision: z.enum(["approve", "request_changes"]), approvedBy: z.string().trim().min(2).max(200), comment: z.string().max(2000).optional(), code: z.string().max(20).optional() }).safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: "send decision and approvedBy (who approved)" });
    try {
      const r = await deps.service.decideByApi(f.id, parsed.data.decision, { by: parsed.data.approvedBy, comment: parsed.data.comment, code: parsed.data.code });
      if (!r.ok) return reply.code(409).send({ error: r.reason });
      return { filing: publicFiling((await deps.store.getFiling(f.id))!) };
    } catch (e) {
      if (e instanceof OutcomeError) return reply.code(e.status).send({ error: e.message });
      throw e;
    }
  });

  // V35: a test delivery to every endpoint, and the recent delivery log.
  app.post("/v1/webhooks/test", async (req, reply) => {
    const auth = await authOf(req);
    if (!auth || auth.partnerOf) return reply.code(auth ? 403 : 401).send({ error: auth ? "not available to partner accounts" : "invalid api key" });
    const tenant = await deps.store.getTenant(auth.tenantId);
    if (!tenant?.webhookEndpoints.length) return reply.code(409).send({ error: "no webhook endpoints are set up" });
    if (!deps.webhooks) return reply.code(501).send({ error: "webhook delivery isn't available on this server" });
    const event = await deps.webhooks.emit("webhook.test", { tenantId: auth.tenantId, filingId: "00000000-0000-0000-0000-000000000000" }, { message: "a test delivery you asked for" }, tenant.webhookEndpoints);
    await deps.webhooks.processDue();
    return reply.code(202).send({ eventId: event.id, deliveries: (await deps.store.listDeliveries("00000000-0000-0000-0000-000000000000")).filter((d) => d.event.id === event.id).map(({ event: _e, ...d }) => d) });
  });
  app.get("/v1/webhooks/deliveries", async (req, reply) => {
    const auth = await authOf(req);
    if (!auth || auth.partnerOf) return reply.code(auth ? 403 : 401).send({ error: auth ? "not available to partner accounts" : "invalid api key" });
    const limit = Math.min(200, Math.max(1, Number((req.query as { limit?: string }).limit) || 50));
    const ds = await deps.store.listTenantDeliveries(auth.tenantId, limit);
    return { deliveries: ds.map((d) => ({ id: d.id, url: d.url, eventType: d.event.type, filingId: d.event.filingId, occurredAt: d.event.occurredAt, status: d.status, attempts: d.attempts, lastStatusCode: d.lastStatusCode, lastError: d.lastError })) };
  });

  app.get("/v1/filings/:id/deliveries", async (req, reply) => {
    const tenantId = await tenantOf(req);
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || f.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    return { deliveries: await deps.store.listDeliveries(f.id) };
  });

  app.get("/v1/filings/:id/messages", async (req, reply) => {
    const tenantId = await tenantOf(req);
    const f = await deps.store.getFiling((req.params as { id: string }).id);
    if (!f || f.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    return { messages: await deps.store.listMessages(f.id) };
  });

  app.get("/v1/artifacts/:id", async (req, reply) => {
    const tenantId = await tenantOf(req);
    if (!tenantId) return reply.code(401).send({ error: "invalid api key" });
    const a = await deps.artifacts.get((req.params as { id: string }).id);
    if (!a) return reply.code(404).send({ error: "not found" });
    const f = await deps.store.getFiling(a.meta.filingId);
    if (!f || f.tenantId !== tenantId) return reply.code(404).send({ error: "not found" });
    return reply.header("content-type", a.meta.contentType).send(a.body);
  });

  // ---- Settings ----
  app.put("/v1/tenants/:id", async (req, reply) => {
    // Tenant settings carry webhook endpoints, approvers and vault keys: platform staff only.
    if (!(await requireStaff(req, reply))) return reply;
    const id = (req.params as { id: string }).id;
    const parsed = TenantSettings.safeParse({ ...(req.body as object), tenantId: id });
    if (!parsed.success) return reply.code(422).send({ error: parsed.error.issues });
    await deps.store.putTenant(parsed.data);
    return { ok: true };
  });
  app.put("/v1/client-companies/:id", async (req, reply) => {
    const tenantId = await tenantOf(req);
    if (!tenantId) return reply.code(401).send({ error: "invalid api key" });
    const id = (req.params as { id: string }).id;
    // Company ids are global: a tenant may create a new one or update its own, never take another tenant's.
    const existing = await deps.store.getClientCompany(id);
    if (existing && existing.tenantId !== tenantId) return reply.code(409).send({ error: "client company id already in use" });
    const body = { ...(req.body as Record<string, unknown>) };
    // A portal sent without an address gets one: the firm's own, or one made from its name.
    const portalIn = body.portal as Record<string, unknown> | undefined;
    if (portalIn && typeof portalIn === "object" && !portalIn.slug) {
      const name = typeof body.name === "string" && body.name ? body.name : existing?.name ?? id;
      body.portal = { ...portalIn, slug: await portalSlugFor(deps.store, tenantId, { clientCompanyId: id, name, portal: existing?.portal }) };
    }
    const parsed = ClientCompanySettings.safeParse({ ...body, clientCompanyId: id, tenantId });
    if (!parsed.success) return reply.code(422).send({ error: parsed.error.issues });
    const slug = parsed.data.portal?.slug;
    if (slug && (await deps.store.listClientCompanies(tenantId)).some((c) => c.clientCompanyId !== id && c.portal?.slug === slug)) {
      return reply.code(409).send({ error: "portal slug already in use by another client company" });
    }
    try {
      await deps.store.putClientCompany(parsed.data);
    } catch (e) {
      if (e instanceof ClientCompanyOwnershipError) return reply.code(409).send({ error: "client company id already in use" });
      throw e;
    }
    return { ok: true, ...(slug ? { portalSlug: slug } : {}) };
  });

  registerBrandLogos(app, { store: deps.store, artifacts: deps.artifacts, authOf });
  registerSelfService(app, { store: deps.store, tenantOf });
  registerSignatures(app, { store: deps.store, tenantOf });
  registerIntakeLinks(app, { store: deps.store, authOf });
  registerUsers(app, {
    store: deps.store, authOf, staffOf, sessionSecret,
    platformTenantId: deps.platformTenantId ?? "keystone", partnerSignupMode: deps.partnerSignupMode ?? "approval",
    email: deps.email, webBaseUrl: deps.webBaseUrl ?? "http://localhost:3000", secrets: deps.secrets,
  });

  // ---- Approval link (client-facing, decision 2) ----
  // Decision 7: the review-page screenshot, for whoever holds a usable approval link.
  app.get("/approve/:token/review.png", async (req, reply) => {
    const found = await deps.approvals.lookup((req.params as { token: string }).token);
    if (!found.ok || !found.approval.review?.artifactId) return reply.code(404).send({ error: "not found" });
    const got = await deps.artifacts.get(found.approval.review.artifactId);
    if (!got || got.meta.filingId !== found.approval.filingId) return reply.code(404).send({ error: "not found" });
    return reply.header("cache-control", "private, no-store").type(got.meta.contentType).send(got.body);
  });

  app.get("/approve/:token", async (req, reply) => {
    const found = await deps.approvals.lookup((req.params as { token: string }).token);
    if (!found.ok) return reply.code(410).type("text/html").send(`<p>This approval link is ${found.reason.replace("_", " ")}.</p>`);
    const a = found.approval;
    const f = await deps.store.getFiling(a.filingId);
    const tenant = await deps.store.getTenant(a.tenantId);
    // V20: the client sees the firm they work with. A firm with portal branding (a partner, or a
    // firm a subscriber set up) brands the page; partners are co-branded with the platform.
    const client = f ? await deps.store.getClientCompany(f.clientCompanyId) : null;
    const portal = client?.portal;
    const firmBrand = portal && (portal.displayName || portal.logoUrl || portal.logoArtifactId || client?.partner);
    const firmLogo = portal?.logoArtifactId ? `${deps.publicBaseUrl}/v1/brand-logos/${portal.logoArtifactId}` : portal?.logoUrl?.startsWith("https://") ? portal.logoUrl : undefined;
    const html = renderReviewPage({
      brandName: firmBrand ? (portal!.displayName ?? client!.name) : (a.tenantId === (deps.platformTenantId ?? "keystone") ? (deps.platformName ?? "CoFile") : (tenant?.branding.displayName ?? tenant?.name)),
      supportEmail: (firmBrand ? portal!.supportEmail : undefined) ?? tenant?.branding.supportEmail,
      logoUrl: firmBrand ? firmLogo : undefined, primaryColor: firmBrand ? portal!.primaryColor : undefined,
      font: firmBrand && portal!.font && portal!.font !== "system"
        ? portal!.font === "custom"
          ? (portal!.fontArtifactId ? { stack: FONT_PRESETS.system.stack, fileUrl: `${deps.publicBaseUrl}/v1/brand-fonts/${portal!.fontArtifactId}` } : undefined)
          : { stack: FONT_PRESETS[portal!.font as FontPreset]?.stack ?? FONT_PRESETS.system.stack, href: googleFontHref(portal!.font) ?? undefined }
        : undefined,
      poweredBy: client?.partner ? (deps.platformName ?? "CoFile") : undefined,
      filingId: a.filingId,
      filingTitle: f ? `${f.request.state} ${f.request.type.replace("_", " ")}${f.request.formation ? `: ${f.request.formation.name.baseName} ${f.request.formation.name.designator}` : ""}` : "Filing",
      payload: a.shownPayload, fees: a.fees, feeCapUsd: a.feeCapUsd, expiresAt: a.expiresAt,
      einInRun: !!f?.request.ein && f.request.ein.mode === "in_run",
      postUrl: `${deps.publicBaseUrl}/approve/${a.token}`, requireCode: !!a.oneTimeCode,
      reviewImageUrl: a.review?.artifactId ? `${deps.publicBaseUrl}/approve/${a.token}/review.png` : undefined,
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
    if (!(await requireStaff(req, reply))) return reply;
    const status = (req.query as { status?: "pending" | "accepted" | "corrected" | "rejected" }).status;
    return { halts: await deps.store.listDriftHalts(status) };
  });
  app.get("/v1/drift-reviews/:id", async (req, reply) => {
    if (!(await requireStaff(req, reply))) return reply;
    const h = await deps.store.getDriftHalt((req.params as { id: string }).id);
    return h ? h : reply.code(404).send({ error: "not found" });
  });
  app.post("/v1/drift-reviews/:id/decision", async (req, reply) => {
    const staff = await requireStaff(req, reply);
    if (!staff) return reply;
    const parsed = DriftDecisionBody.safeParse(req.body);
    if (!parsed.success) return reply.code(422).send({ error: parsed.error.issues });
    try {
      return await deps.service.onDriftDecision((req.params as { id: string }).id, { ...parsed.data, decidedBy: staff });
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
    const tenantId = await tenantOf(req);
    if (!tenantId) return reply.code(401).send({ error: "invalid api key" });
    const all = await deps.store.listNameResolutions((req.query as { status?: "awaiting_admin" | "resolved" | "aborted" }).status);
    return { resolutions: all.filter((r) => r.tenantId === tenantId) };
  });
  app.get("/v1/review-gates", async (req, reply) => {
    const tenantId = await tenantOf(req);
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
