import type {
  ApprovalRecord, DriftHaltRecord, FilingRecord, RunRecord, Store, SubmitIntentRecord, WebhookDeliveryRecord,
} from "./types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { PageSnapshot } from "../resolver/types.js";

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
  async putClientCompany(c: ClientCompanySettings) { this.clients.set(c.clientCompanyId, c); }

  async createDelivery(d: WebhookDeliveryRecord) { this.deliveries.set(d.id, d); return d; }
  async updateDelivery(id: string, patch: Partial<WebhookDeliveryRecord>) { return patchInto(this.deliveries, id, patch, "delivery"); }
  async listDueDeliveries(now: string) {
    return [...this.deliveries.values()].filter((d) => d.status === "pending" && d.nextAttemptAt <= now);
  }
  async listDeliveries(filingId?: string) {
    return [...this.deliveries.values()].filter((d) => !filingId || d.event.filingId === filingId);
  }
}
