import pg from "pg";
import { readFileSync } from "node:fs";
import path from "node:path";
import type {
  ApprovalRecord, DriftHaltRecord, FilingRecord, RunRecord, Store, SubmitIntentRecord, WebhookDeliveryRecord,
} from "./types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { PageSnapshot } from "../resolver/types.js";

/** JSONB-document Postgres store. Schema: db/schema.sql (applied on connect). */
export class PostgresStore implements Store {
  private constructor(private readonly pool: pg.Pool) {}

  static async connect(url: string): Promise<PostgresStore> {
    const pool = new pg.Pool({ connectionString: url });
    await pool.query(readFileSync(path.resolve("db/schema.sql"), "utf8"));
    return new PostgresStore(pool);
  }

  async close(): Promise<void> { await this.pool.end(); }

  private async doc<T>(sql: string, params: unknown[]): Promise<T | null> {
    const r = await this.pool.query(sql, params);
    return r.rows[0] ? (r.rows[0].doc as T) : null;
  }
  private async docs<T>(sql: string, params: unknown[]): Promise<T[]> {
    const r = await this.pool.query(sql, params);
    return r.rows.map((row) => row.doc as T);
  }

  async createFiling(f: FilingRecord) {
    await this.pool.query(
      `insert into filings (id, tenant_id, client_company_id, idempotency_key, status, payload_hash, doc) values ($1,$2,$3,$4,$5,$6,$7)`,
      [f.id, f.tenantId, f.clientCompanyId, f.idempotencyKey, f.status, f.payloadHash, f],
    );
    return f;
  }
  async getFiling(id: string) { return this.doc<FilingRecord>(`select doc from filings where id=$1`, [id]); }
  async findFilingByIdempotency(tenantId: string, key: string) {
    return this.doc<FilingRecord>(`select doc from filings where tenant_id=$1 and idempotency_key=$2`, [tenantId, key]);
  }
  async updateFiling(id: string, patch: Partial<FilingRecord>) {
    const cur = await this.getFiling(id);
    if (!cur) throw new Error(`filing ${id} not found`);
    const next = { ...cur, ...patch, id, updatedAt: new Date().toISOString() };
    await this.pool.query(`update filings set status=$2, doc=$3, updated_at=now() where id=$1`, [id, next.status, next]);
    return next;
  }
  async listFilings(tenantId?: string) {
    return tenantId
      ? this.docs<FilingRecord>(`select doc from filings where tenant_id=$1 order by created_at desc`, [tenantId])
      : this.docs<FilingRecord>(`select doc from filings order by created_at desc`, []);
  }

  async createApproval(a: ApprovalRecord) {
    await this.pool.query(`insert into approvals (id, filing_id, status, token, expires_at, doc) values ($1,$2,$3,$4,$5,$6)`, [a.id, a.filingId, a.status, a.token, a.expiresAt, a]);
    return a;
  }
  async getApproval(id: string) { return this.doc<ApprovalRecord>(`select doc from approvals where id=$1`, [id]); }
  async updateApproval(id: string, patch: Partial<ApprovalRecord>) {
    const cur = await this.getApproval(id);
    if (!cur) throw new Error(`approval ${id} not found`);
    const next = { ...cur, ...patch, id };
    await this.pool.query(`update approvals set status=$2, doc=$3 where id=$1`, [id, next.status, next]);
    return next;
  }

  async createRun(r: RunRecord) {
    await this.pool.query(`insert into runs (id, filing_id, status, doc) values ($1,$2,$3,$4)`, [r.id, r.filingId, r.status, r]);
    return r;
  }
  async getRun(id: string) { return this.doc<RunRecord>(`select doc from runs where id=$1`, [id]); }
  async updateRun(id: string, patch: Partial<RunRecord>) {
    const cur = await this.getRun(id);
    if (!cur) throw new Error(`run ${id} not found`);
    const next = { ...cur, ...patch, id };
    await this.pool.query(`update runs set status=$2, doc=$3 where id=$1`, [id, next.status, next]);
    return next;
  }

  async createSubmitIntent(s: SubmitIntentRecord) {
    await this.pool.query(`insert into submit_intents (id, run_id, filing_id, outcome, doc) values ($1,$2,$3,$4,$5)`, [s.id, s.runId, s.filingId, s.outcome ?? null, s]);
    return s;
  }
  async updateSubmitIntent(id: string, patch: Partial<SubmitIntentRecord>) {
    const cur = await this.doc<SubmitIntentRecord>(`select doc from submit_intents where id=$1`, [id]);
    if (!cur) throw new Error(`submit intent ${id} not found`);
    const next = { ...cur, ...patch, id };
    await this.pool.query(`update submit_intents set outcome=$2, doc=$3 where id=$1`, [id, next.outcome ?? null, next]);
    return next;
  }
  async listOpenSubmitIntents() { return this.docs<SubmitIntentRecord>(`select doc from submit_intents where outcome is null`, []); }

  async createDriftHalt(d: DriftHaltRecord) {
    await this.pool.query(`insert into drift_halts (id, filing_id, site, screen_key, status, doc) values ($1,$2,$3,$4,$5,$6)`, [d.id, d.filingId, d.site, d.screenKey, d.status, d]);
    return d;
  }
  async getDriftHalt(id: string) { return this.doc<DriftHaltRecord>(`select doc from drift_halts where id=$1`, [id]); }
  async updateDriftHalt(id: string, patch: Partial<DriftHaltRecord>) {
    const cur = await this.getDriftHalt(id);
    if (!cur) throw new Error(`drift halt ${id} not found`);
    const next = { ...cur, ...patch, id };
    await this.pool.query(`update drift_halts set status=$2, doc=$3 where id=$1`, [id, next.status, next]);
    return next;
  }
  async listDriftHalts(status?: DriftHaltRecord["status"]) {
    return status
      ? this.docs<DriftHaltRecord>(`select doc from drift_halts where status=$1`, [status])
      : this.docs<DriftHaltRecord>(`select doc from drift_halts`, []);
  }
  async getApprovedSnapshot(site: string, screenKey: string) {
    return this.doc<PageSnapshot>(`select doc from approved_snapshots where site=$1 and screen_key=$2`, [site, screenKey]);
  }
  async putApprovedSnapshot(site: string, screenKey: string, snap: PageSnapshot) {
    await this.pool.query(
      `insert into approved_snapshots (site, screen_key, doc) values ($1,$2,$3) on conflict (site, screen_key) do update set doc=excluded.doc, updated_at=now()`,
      [site, screenKey, snap],
    );
  }
  async getIntentOverrides(site: string, screenKey: string) {
    return (await this.doc<Record<string, string[]>>(`select doc from intent_overrides where site=$1 and screen_key=$2`, [site, screenKey])) ?? {};
  }
  async putIntentOverrides(site: string, screenKey: string, o: Record<string, string[]>) {
    await this.pool.query(`insert into intent_overrides (site, screen_key, doc) values ($1,$2,$3) on conflict (site, screen_key) do update set doc=excluded.doc`, [site, screenKey, o]);
  }

  async getTenant(id: string) { return this.doc<TenantSettings>(`select doc from tenants where id=$1`, [id]); }
  async putTenant(t: TenantSettings) {
    await this.pool.query(`insert into tenants (id, doc) values ($1,$2) on conflict (id) do update set doc=excluded.doc`, [t.tenantId, t]);
  }
  async getClientCompany(id: string) { return this.doc<ClientCompanySettings>(`select doc from client_companies where id=$1`, [id]); }
  async putClientCompany(c: ClientCompanySettings) {
    await this.pool.query(`insert into client_companies (id, tenant_id, doc) values ($1,$2,$3) on conflict (id) do update set doc=excluded.doc, tenant_id=excluded.tenant_id`, [c.clientCompanyId, c.tenantId, c]);
  }

  async createDelivery(d: WebhookDeliveryRecord) {
    await this.pool.query(`insert into webhook_deliveries (id, filing_id, status, next_attempt_at, doc) values ($1,$2,$3,$4,$5)`, [d.id, d.event.filingId, d.status, d.nextAttemptAt, d]);
    return d;
  }
  async updateDelivery(id: string, patch: Partial<WebhookDeliveryRecord>) {
    const cur = await this.doc<WebhookDeliveryRecord>(`select doc from webhook_deliveries where id=$1`, [id]);
    if (!cur) throw new Error(`delivery ${id} not found`);
    const next = { ...cur, ...patch, id };
    await this.pool.query(`update webhook_deliveries set status=$2, next_attempt_at=$3, doc=$4 where id=$1`, [id, next.status, next.nextAttemptAt, next]);
    return next;
  }
  async listDueDeliveries(now: string) {
    return this.docs<WebhookDeliveryRecord>(`select doc from webhook_deliveries where status='pending' and next_attempt_at <= $1`, [now]);
  }
  async listDeliveries(filingId?: string) {
    return filingId
      ? this.docs<WebhookDeliveryRecord>(`select doc from webhook_deliveries where filing_id=$1`, [filingId])
      : this.docs<WebhookDeliveryRecord>(`select doc from webhook_deliveries`, []);
  }
}
