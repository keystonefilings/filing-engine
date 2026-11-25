import pg from "pg";
import { readFileSync } from "node:fs";
import path from "node:path";
import { randomUUID } from "node:crypto";
import {
  ClientCompanyOwnershipError,
  type ApiKeyRecord, type InquiryRecord, type UserRecord, type SignatureRecord, type ApprovalRecord, type DriftHaltRecord, type FilingRecord, type MessageRecord, type NameResolutionRecord, type ReviewGateRecord, type RunRecord, type Store, type SubmitIntentRecord, type WebhookDeliveryRecord,
} from "./types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { PageSnapshot } from "../resolver/types.js";
import type { FilingStatus } from "../domain/states.js";
import { FieldCipher, openFiling, sealFiling } from "./sensitive.js";

/**
 * Applies the schema in one transaction under a transaction-scoped lock, so an API and a worker
 * starting together on an empty database (a first deploy) do not race to create the same tables.
 * A transaction lock also works through a transaction-mode pooler (Neon), where a session lock
 * would not hold.
 */
async function applySchema(pool: pg.Pool, schema: string): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query("begin");
    await client.query("select pg_advisory_xact_lock(7372815)");
    await client.query(schema);
    await client.query("commit");
  } catch (e) {
    await client.query("rollback").catch(() => {});
    throw e;
  } finally {
    client.release();
  }
}

/** JSONB-document Postgres store. Schema: db/schema.sql (applied on connect). */
export class PostgresStore implements Store {
  /** cipher: SSNs in filings are sealed in the database (store/sensitive.ts); null keeps them plain (development). */
  private constructor(private readonly pool: pg.Pool, private readonly cipher: FieldCipher | null = null) {}

  static async connect(url: string, opts: { cipher?: FieldCipher | null } = {}): Promise<PostgresStore> {
    const pool = new pg.Pool({ connectionString: url, max: Number(process.env.PG_POOL_MAX) || 5, idleTimeoutMillis: 10_000 });
    // A hosted Postgres (Neon) closes idle connections when it scales to zero or its pooler
    // recycles them. Without a listener that error would crash the process; the pool simply
    // opens a new connection on the next query.
    pool.on("error", (e) => console.warn(`postgres: idle connection closed (${e.message.split("\n")[0]})`));
    await applySchema(pool, readFileSync(path.resolve("db/schema.sql"), "utf8"));
    return new PostgresStore(pool, opts.cipher ?? null);
  }

  async close(): Promise<void> { await this.pool.end(); }

  /** The pool, so the job queue can share it (one database for store and queue). */
  get connectionPool(): pg.Pool { return this.pool; }

  private async doc<T>(sql: string, params: unknown[]): Promise<T | null> {
    const r = await this.pool.query(sql, params);
    return r.rows[0] ? (r.rows[0].doc as T) : null;
  }
  private async docs<T>(sql: string, params: unknown[]): Promise<T[]> {
    const r = await this.pool.query(sql, params);
    return r.rows.map((row) => row.doc as T);
  }

  // Filings: SSNs are sealed on the way in and opened on the way out (store/sensitive.ts).
  async createFiling(f: FilingRecord) {
    await this.pool.query(
      `insert into filings (id, tenant_id, client_company_id, idempotency_key, status, payload_hash, doc) values ($1,$2,$3,$4,$5,$6,$7)`,
      [f.id, f.tenantId, f.clientCompanyId, f.idempotencyKey, f.status, f.payloadHash, sealFiling(f, this.cipher)],
    );
    return f;
  }
  async getFiling(id: string) { return openFiling(await this.doc<FilingRecord>(`select doc from filings where id=$1`, [id]), this.cipher); }
  async findFilingByIdempotency(tenantId: string, key: string) {
    return openFiling(await this.doc<FilingRecord>(`select doc from filings where tenant_id=$1 and idempotency_key=$2`, [tenantId, key]), this.cipher);
  }
  async updateFiling(id: string, patch: Partial<FilingRecord>) {
    const cur = await this.getFiling(id);
    if (!cur) throw new Error(`filing ${id} not found`);
    const next = { ...cur, ...patch, id, updatedAt: new Date().toISOString() };
    await this.pool.query(`update filings set status=$2, doc=$3, updated_at=now() where id=$1`, [id, next.status, sealFiling(next, this.cipher)]);
    return next;
  }
  async listFilings(tenantId?: string) {
    const rows = tenantId
      ? await this.docs<FilingRecord>(`select doc from filings where tenant_id=$1 order by created_at desc`, [tenantId])
      : await this.docs<FilingRecord>(`select doc from filings order by created_at desc`, []);
    return rows.map((f) => openFiling(f, this.cipher));
  }
  async listFilingsByStatus(statuses: FilingStatus[], tenants?: string[]) {
    const rows = await this.docs<FilingRecord>(
      `select doc from filings where status = any($1::text[]) and ($2::text[] is null or tenant_id = any($2::text[])) order by created_at`,
      [statuses, tenants?.length ? tenants : null],
    );
    return rows.map((f) => openFiling(f, this.cipher));
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
    // Never move a company to another tenant: the update applies only to the owner's row.
    const r = await this.pool.query(
      `insert into client_companies (id, tenant_id, doc) values ($1,$2,$3)
       on conflict (id) do update set doc=excluded.doc where client_companies.tenant_id = excluded.tenant_id`,
      [c.clientCompanyId, c.tenantId, c],
    );
    if (r.rowCount === 0) throw new ClientCompanyOwnershipError(c.clientCompanyId);
  }
  async listClientCompanies(tenantId: string) {
    return this.docs<ClientCompanySettings>(`select doc from client_companies where tenant_id=$1 order by id`, [tenantId]);
  }

  async createSignature(r: SignatureRecord) {
    await this.pool.query(`insert into signatures (id, tenant_id, client_company_id, revoked_at, doc) values ($1,$2,$3,$4,$5)`, [r.id, r.tenantId, r.clientCompanyId, r.revokedAt ?? null, r]);
    return r;
  }
  async getSignature(id: string) {
    return this.doc<SignatureRecord>(`select doc from signatures where id=$1`, [id]);
  }
  async listSignatures(tenantId: string, clientCompanyId?: string) {
    return clientCompanyId
      ? this.docs<SignatureRecord>(`select doc from signatures where tenant_id=$1 and client_company_id=$2 order by created_at`, [tenantId, clientCompanyId])
      : this.docs<SignatureRecord>(`select doc from signatures where tenant_id=$1 order by created_at`, [tenantId]);
  }
  async revokeSignature(tenantId: string, id: string, at: string) {
    const r = await this.pool.query(
      `update signatures set revoked_at = coalesce(revoked_at, $3::timestamptz),
         doc = (doc - 'sealedImage') || jsonb_build_object('revokedAt', coalesce(doc->>'revokedAt', $3::text))
       where id=$1 and tenant_id=$2`, [id, tenantId, at]);
    return (r.rowCount ?? 0) > 0;
  }
  async touchSignature(id: string, at: string) {
    await this.pool.query(`update signatures set doc = doc || jsonb_build_object('lastUsedAt', $2::text) where id=$1`, [id, at]);
  }
  async createApiKey(k: ApiKeyRecord) {
    await this.pool.query(`insert into tenant_api_keys (id, tenant_id, hash, revoked_at, doc) values ($1,$2,$3,$4,$5)`, [k.id, k.tenantId, k.hash, k.revokedAt ?? null, k]);
    return k;
  }
  async listApiKeys(tenantId: string) {
    return this.docs<ApiKeyRecord>(`select doc from tenant_api_keys where tenant_id=$1 order by created_at`, [tenantId]);
  }
  async findApiKeyByHash(hash: string) {
    return this.doc<ApiKeyRecord>(`select doc from tenant_api_keys where hash=$1 and revoked_at is null`, [hash]);
  }
  async revokeApiKey(tenantId: string, id: string, at: string) {
    const r = await this.pool.query(
      `update tenant_api_keys set revoked_at=$3, doc = doc || jsonb_build_object('revokedAt', $3::text)
       where id=$1 and tenant_id=$2 and revoked_at is null`,
      [id, tenantId, at],
    );
    return r.rowCount === 1;
  }
  async touchApiKey(id: string, at: string) {
    await this.pool.query(`update tenant_api_keys set doc = doc || jsonb_build_object('lastUsedAt', $2::text) where id=$1`, [id, at]);
  }

  async createUser(u: UserRecord) {
    await this.pool.query(`insert into users (id, email, tenant_id, doc) values ($1,$2,$3,$4)`, [u.id, u.email, u.tenantId, u]);
    return u;
  }
  async getUser(id: string) { return this.doc<UserRecord>(`select doc from users where id=$1`, [id]); }
  async findUserByEmail(email: string) { return this.doc<UserRecord>(`select doc from users where email=$1`, [email]); }
  async listUsers(tenantId: string) { return this.docs<UserRecord>(`select doc from users where tenant_id=$1 order by created_at`, [tenantId]); }
  async updateUser(id: string, patch: Partial<UserRecord>) {
    const { id: _i, email: _e, ...rest } = patch;
    const r = await this.pool.query(`update users set doc = doc || $2::jsonb, tenant_id = coalesce($3, tenant_id) where id=$1 returning doc`, [id, JSON.stringify(rest), rest.tenantId ?? null]);
    if (!r.rows[0]) throw new Error("user not found");
    return r.rows[0].doc as UserRecord;
  }
  async createInquiry(i: InquiryRecord) {
    await this.pool.query(`insert into inquiries (id, doc) values ($1,$2)`, [i.id, i]);
    return i;
  }
  async listInquiries() { return this.docs<InquiryRecord>(`select doc from inquiries order by created_at desc limit 500`, []); }

  // Lease expiry uses the database clock, so workers on different machines agree on it.
  async acquireRunLease(filingId: string, workerId: string, ttlMs: number) {
    const token = randomUUID();
    const r = await this.pool.query(
      `insert into run_leases (filing_id, worker_id, token, acquired_at, expires_at)
         values ($1, $2, $3, now(), now() + $4 * interval '1 millisecond')
       on conflict (filing_id) do update
         set worker_id = excluded.worker_id, token = excluded.token, acquired_at = excluded.acquired_at, expires_at = excluded.expires_at
         where run_leases.expires_at <= now()`,
      [filingId, workerId, token, ttlMs],
    );
    return r.rowCount === 1 ? token : null;
  }
  async renewRunLease(filingId: string, token: string, ttlMs: number) {
    const r = await this.pool.query(
      `update run_leases set expires_at = now() + $3 * interval '1 millisecond' where filing_id = $1 and token = $2 and expires_at > now()`,
      [filingId, token, ttlMs],
    );
    return r.rowCount === 1;
  }
  async releaseRunLease(filingId: string, token: string) {
    await this.pool.query(`delete from run_leases where filing_id = $1 and token = $2`, [filingId, token]);
  }
  async hasLiveRunLease(filingId: string) {
    const r = await this.pool.query(`select 1 from run_leases where filing_id = $1 and expires_at > now()`, [filingId]);
    return (r.rowCount ?? 0) > 0;
  }

  async createNameResolution(r: NameResolutionRecord) {
    await this.pool.query(`insert into name_resolutions (id, filing_id, status, token, doc) values ($1,$2,$3,$4,$5)`, [r.id, r.filingId, r.status, r.token, r]);
    return r;
  }
  async getNameResolution(id: string) { return this.doc<NameResolutionRecord>(`select doc from name_resolutions where id=$1`, [id]); }
  async updateNameResolution(id: string, patch: Partial<NameResolutionRecord>) {
    const cur = await this.getNameResolution(id);
    if (!cur) throw new Error(`name resolution ${id} not found`);
    const next = { ...cur, ...patch, id };
    await this.pool.query(`update name_resolutions set status=$2, doc=$3 where id=$1`, [id, next.status, next]);
    return next;
  }
  async listNameResolutions(status?: NameResolutionRecord["status"]) {
    return status
      ? this.docs<NameResolutionRecord>(`select doc from name_resolutions where status=$1`, [status])
      : this.docs<NameResolutionRecord>(`select doc from name_resolutions`, []);
  }

  async createReviewGate(r: ReviewGateRecord) {
    await this.pool.query(`insert into review_gates (id, filing_id, status, token, doc) values ($1,$2,$3,$4,$5)`, [r.id, r.filingId, r.status, r.token, r]);
    return r;
  }
  async getReviewGate(id: string) { return this.doc<ReviewGateRecord>(`select doc from review_gates where id=$1`, [id]); }
  async updateReviewGate(id: string, patch: Partial<ReviewGateRecord>) {
    const cur = await this.getReviewGate(id);
    if (!cur) throw new Error(`review gate ${id} not found`);
    const next = { ...cur, ...patch, id };
    await this.pool.query(`update review_gates set status=$2, doc=$3 where id=$1`, [id, next.status, next]);
    return next;
  }
  async listReviewGates(status?: ReviewGateRecord["status"]) {
    return status
      ? this.docs<ReviewGateRecord>(`select doc from review_gates where status=$1`, [status])
      : this.docs<ReviewGateRecord>(`select doc from review_gates`, []);
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

  async createMessage(m: MessageRecord) {
    await this.pool.query(`insert into messages (id, filing_id, status, doc) values ($1,$2,$3,$4)`, [m.id, m.filingId, m.status, m]);
    return m;
  }
  async listMessages(filingId?: string) {
    return filingId
      ? this.docs<MessageRecord>(`select doc from messages where filing_id=$1 order by created_at desc`, [filingId])
      : this.docs<MessageRecord>(`select doc from messages order by created_at desc`, []);
  }
}
