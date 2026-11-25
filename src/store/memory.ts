import { randomUUID } from "node:crypto";
import {
  ClientCompanyOwnershipError,
  type ApiKeyRecord, type InquiryRecord, type IntakeLinkRecord, type UserRecord, type SignatureRecord, type ApprovalRecord, type DriftHaltRecord, type FilingRecord, type MessageRecord, type NameResolutionRecord, type ReviewGateRecord, type RunRecord, type Store, type SubmitIntentRecord, type WebhookDeliveryRecord,
} from "./types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { PageSnapshot } from "../resolver/types.js";
import type { FilingStatus } from "../domain/states.js";

function patchInto<T extends { id: string }>(map: Map<string, T>, id: string, patch: Partial<T>, what: string): T {
  const cur = map.get(id);
  if (!cur) throw new Error(`${what} ${id} not found`);
  const next = { ...cur, ...patch, id } as T;
  map.set(id, next);
  return next;
}

/** In-memory store for development and tests. Postgres implementation: store/postgres.ts. */
export class MemoryStore implements Store {
  filings = new Map<string, FilingRecord>();
  approvals = new Map<string, ApprovalRecord>();
  runs = new Map<string, RunRecord>();
  intents = new Map<string, SubmitIntentRecord>();
  drifts = new Map<string, DriftHaltRecord>();
  snapshots = new Map<string, PageSnapshot>();
  overrides = new Map<string, Record<string, string[]>>();
  tenants = new Map<string, TenantSettings>();
  clients = new Map<string, ClientCompanySettings>();
  deliveries = new Map<string, WebhookDeliveryRecord>();
  messages = new Map<string, MessageRecord>();
  nameResolutions = new Map<string, NameResolutionRecord>();
  reviewGates = new Map<string, ReviewGateRecord>();
  leases = new Map<string, { workerId: string; token: string; expiresAt: number }>();
  apiKeys = new Map<string, ApiKeyRecord>();
  users = new Map<string, UserRecord>();
  inquiries = new Map<string, InquiryRecord>();
  intakeLinks = new Map<string, IntakeLinkRecord>();
  signatures = new Map<string, SignatureRecord>();
  /** Clock for lease expiry; injectable for tests. */
  now: () => number = () => Date.now();

  async createFiling(f: FilingRecord) { this.filings.set(f.id, f); return f; }
  async getFiling(id: string) { return this.filings.get(id) ?? null; }
  async findFilingByIdempotency(tenantId: string, key: string) {
    for (const f of this.filings.values()) if (f.tenantId === tenantId && f.idempotencyKey === key) return f;
    return null;
  }
  async updateFiling(id: string, patch: Partial<FilingRecord>) {
    return patchInto(this.filings, id, { ...patch, updatedAt: new Date().toISOString() }, "filing");
  }
  async listFilings(tenantId?: string) {
    return [...this.filings.values()].filter((f) => !tenantId || f.tenantId === tenantId);
  }
  async listFilingsByStatus(statuses: FilingStatus[], tenants?: string[]) {
    return [...this.filings.values()].filter((f) => statuses.includes(f.status) && (!tenants?.length || tenants.includes(f.tenantId)));
  }

  async createApproval(a: ApprovalRecord) { this.approvals.set(a.id, a); return a; }
  async getApproval(id: string) { return this.approvals.get(id) ?? null; }
  async updateApproval(id: string, patch: Partial<ApprovalRecord>) { return patchInto(this.approvals, id, patch, "approval"); }

  async createRun(r: RunRecord) { this.runs.set(r.id, r); return r; }
  async getRun(id: string) { return this.runs.get(id) ?? null; }
  async updateRun(id: string, patch: Partial<RunRecord>) { return patchInto(this.runs, id, patch, "run"); }

  async createSubmitIntent(s: SubmitIntentRecord) { this.intents.set(s.id, s); return s; }
  async updateSubmitIntent(id: string, patch: Partial<SubmitIntentRecord>) { return patchInto(this.intents, id, patch, "submit intent"); }
  async listOpenSubmitIntents() { return [...this.intents.values()].filter((i) => !i.outcome); }

  async createDriftHalt(d: DriftHaltRecord) { this.drifts.set(d.id, d); return d; }
  async getDriftHalt(id: string) { return this.drifts.get(id) ?? null; }
  async updateDriftHalt(id: string, patch: Partial<DriftHaltRecord>) { return patchInto(this.drifts, id, patch, "drift halt"); }
  async listDriftHalts(status?: DriftHaltRecord["status"]) {
    return [...this.drifts.values()].filter((d) => !status || d.status === status);
  }
  async getApprovedSnapshot(site: string, screenKey: string) { return this.snapshots.get(`${site}:${screenKey}`) ?? null; }
  async putApprovedSnapshot(site: string, screenKey: string, snap: PageSnapshot) { this.snapshots.set(`${site}:${screenKey}`, snap); }
  async getIntentOverrides(site: string, screenKey: string) { return this.overrides.get(`${site}:${screenKey}`) ?? {}; }
  async putIntentOverrides(site: string, screenKey: string, o: Record<string, string[]>) { this.overrides.set(`${site}:${screenKey}`, o); }

  async getTenant(id: string) { return this.tenants.get(id) ?? null; }
  async putTenant(t: TenantSettings) { this.tenants.set(t.tenantId, t); }
  async getClientCompany(id: string) { return this.clients.get(id) ?? null; }
  async putClientCompany(c: ClientCompanySettings) {
    const cur = this.clients.get(c.clientCompanyId);
    if (cur && cur.tenantId !== c.tenantId) throw new ClientCompanyOwnershipError(c.clientCompanyId);
    this.clients.set(c.clientCompanyId, c);
  }
  async listClientCompanies(tenantId: string) { return [...this.clients.values()].filter((c) => c.tenantId === tenantId); }

  async createSignature(r: SignatureRecord) { this.signatures.set(r.id, { ...r }); return r; }
  async getSignature(id: string) { const r = this.signatures.get(id); return r ? { ...r } : null; }
  async listSignatures(tenantId: string, clientCompanyId?: string) {
    return [...this.signatures.values()].filter((r) => r.tenantId === tenantId && (!clientCompanyId || r.clientCompanyId === clientCompanyId)).map((r) => ({ ...r }));
  }
  async revokeSignature(tenantId: string, id: string, at: string) {
    const r = this.signatures.get(id);
    if (!r || r.tenantId !== tenantId) return false;
    const { sealedImage: _gone, ...rest } = r;
    this.signatures.set(id, { ...rest, revokedAt: r.revokedAt ?? at });
    return true;
  }
  async touchSignature(id: string, at: string) { const r = this.signatures.get(id); if (r) r.lastUsedAt = at; }
  async createApiKey(k: ApiKeyRecord) { this.apiKeys.set(k.id, k); return k; }
  async listApiKeys(tenantId: string) { return [...this.apiKeys.values()].filter((k) => k.tenantId === tenantId); }
  async findApiKeyByHash(hash: string) {
    for (const k of this.apiKeys.values()) if (k.hash === hash && !k.revokedAt) return k;
    return null;
  }
  async revokeApiKey(tenantId: string, id: string, at: string) {
    const k = this.apiKeys.get(id);
    if (!k || k.tenantId !== tenantId || k.revokedAt) return false;
    this.apiKeys.set(id, { ...k, revokedAt: at });
    return true;
  }
  async touchApiKey(id: string, at: string) {
    const k = this.apiKeys.get(id);
    if (k) this.apiKeys.set(id, { ...k, lastUsedAt: at });
  }

  async createUser(u: UserRecord) {
    for (const x of this.users.values()) if (x.email === u.email) throw new Error("email already in use");
    this.users.set(u.id, u); return u;
  }
  async getUser(id: string) { return this.users.get(id) ?? null; }
  async findUserByEmail(email: string) { for (const u of this.users.values()) if (u.email === email) return u; return null; }
  async listUsers(tenantId: string) { return [...this.users.values()].filter((u) => u.tenantId === tenantId); }
  async updateUser(id: string, patch: Partial<UserRecord>) {
    const u = this.users.get(id); if (!u) throw new Error("user not found");
    const next = { ...u, ...patch, id: u.id, email: u.email }; this.users.set(id, next); return next;
  }
  async createIntakeLink(l: IntakeLinkRecord) { if (this.intakeLinks.has(l.id)) throw new Error("link exists"); this.intakeLinks.set(l.id, l); return l; }
  async getIntakeLink(id: string) { return this.intakeLinks.get(id) ?? null; }
  async listIntakeLinks(clientCompanyId: string) { return [...this.intakeLinks.values()].filter((l) => l.clientCompanyId === clientCompanyId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)); }
  async updateIntakeLink(id: string, patch: Partial<IntakeLinkRecord>) {
    const l = this.intakeLinks.get(id); if (!l) throw new Error("link not found");
    const next = { ...l, ...patch, id: l.id }; this.intakeLinks.set(id, next); return next;
  }
  async createInquiry(i: InquiryRecord) { this.inquiries.set(i.id, i); return i; }
  async listInquiries() { return [...this.inquiries.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)); }

  async acquireRunLease(filingId: string, workerId: string, ttlMs: number) {
    const cur = this.leases.get(filingId);
    if (cur && cur.expiresAt > this.now()) return null;
    const token = randomUUID();
    this.leases.set(filingId, { workerId, token, expiresAt: this.now() + ttlMs });
    return token;
  }
  async renewRunLease(filingId: string, token: string, ttlMs: number) {
    const cur = this.leases.get(filingId);
    if (!cur || cur.token !== token || cur.expiresAt <= this.now()) return false;
    cur.expiresAt = this.now() + ttlMs;
    return true;
  }
  async releaseRunLease(filingId: string, token: string) {
    if (this.leases.get(filingId)?.token === token) this.leases.delete(filingId);
  }
  async hasLiveRunLease(filingId: string) {
    const cur = this.leases.get(filingId);
    return !!cur && cur.expiresAt > this.now();
  }

  async createNameResolution(r: NameResolutionRecord) { this.nameResolutions.set(r.id, r); return r; }
  async getNameResolution(id: string) { return this.nameResolutions.get(id) ?? null; }
  async updateNameResolution(id: string, patch: Partial<NameResolutionRecord>) { return patchInto(this.nameResolutions, id, patch, "name resolution"); }
  async listNameResolutions(status?: NameResolutionRecord["status"]) {
    return [...this.nameResolutions.values()].filter((r) => !status || r.status === status);
  }

  async createReviewGate(r: ReviewGateRecord) { this.reviewGates.set(r.id, r); return r; }
  async getReviewGate(id: string) { return this.reviewGates.get(id) ?? null; }
  async updateReviewGate(id: string, patch: Partial<ReviewGateRecord>) { return patchInto(this.reviewGates, id, patch, "review gate"); }
  async listReviewGates(status?: ReviewGateRecord["status"]) {
    return [...this.reviewGates.values()].filter((r) => !status || r.status === status);
  }

  async createDelivery(d: WebhookDeliveryRecord) { this.deliveries.set(d.id, d); return d; }
  async updateDelivery(id: string, patch: Partial<WebhookDeliveryRecord>) { return patchInto(this.deliveries, id, patch, "delivery"); }
  async listDueDeliveries(now: string) {
    return [...this.deliveries.values()].filter((d) => d.status === "pending" && d.nextAttemptAt <= now);
  }
  async listDeliveries(filingId?: string) {
    return [...this.deliveries.values()].filter((d) => !filingId || d.event.filingId === filingId);
  }
  async listTenantDeliveries(tenantId: string, limit: number) {
    return [...this.deliveries.values()].filter((d) => d.event.tenantId === tenantId).sort((a, b) => b.event.occurredAt.localeCompare(a.event.occurredAt)).slice(0, limit);
  }

  async createMessage(m: MessageRecord) { this.messages.set(m.id, m); return m; }
  async listMessages(filingId?: string) {
    return [...this.messages.values()].filter((m) => !filingId || m.filingId === filingId);
  }
}
