import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { chmodSync, mkdtempSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { tmpdir } from "node:os";
import path from "node:path";
import EmbeddedPostgres from "embedded-postgres";
import { FieldCipher, mapSensitive, maskSsn, purgeSensitive } from "../src/store/sensitive.js";
import { PostgresStore } from "../src/store/postgres.js";
import { MemoryStore } from "../src/store/memory.js";
import { FilingRequest } from "../src/domain/filing.js";
import type { FilingRecord } from "../src/store/types.js";
import { njFormationRequest } from "./helpers.js";

/** V5 (docs/vision-check-2026-11-25.md): SSNs sealed at rest, and purged once a filing is finished. */

const KEY = "a".repeat(64);
const EIN = { mode: "in_run", responsibleParty: { name: "Sam Rivera", ssn: "123-45-6789", title: "Member", address: { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" }, phone: "2015550100" } };

function filing(over: Partial<FilingRecord> = {}): FilingRecord {
  const now = new Date().toISOString();
  return {
    id: randomUUID(), tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `k-${Math.random()}`,
    status: "completed", request: FilingRequest.parse(njFormationRequest({ ein: EIN } as never)), payloadHash: "h", createdAt: now, updatedAt: now, artifacts: [], ...over,
  };
}

describe("field cipher", () => {
  it("seals and opens, with a fresh IV each time, and leaves plain values from before readable", () => {
    const c = FieldCipher.fromSpec(KEY)!;
    const a = c.seal("123-45-6789"), b = c.seal("123-45-6789");
    expect(a).toMatch(/^enc:v1:/);
    expect(a).not.toBe(b);
    expect(a).not.toContain("6789");
    expect(c.open(a)).toBe("123-45-6789");
    expect(c.open("123-45-6789")).toBe("123-45-6789");
    expect(c.seal(a)).toBe(a);
  });
  it("refuses a tampered value and a wrong key", () => {
    const sealed = FieldCipher.fromSpec(KEY)!.seal("123-45-6789");
    const [iv, body, tag] = sealed.slice(7).split(".");
    const flipped = `enc:v1:${iv}.${body!.slice(0, -1)}${body!.endsWith("A") ? "B" : "A"}.${tag}`;
    expect(() => FieldCipher.fromSpec(KEY)!.open(flipped)).toThrow();
    expect(() => FieldCipher.fromSpec("b".repeat(64))!.open(sealed)).toThrow();
    expect(() => FieldCipher.fromSpec("short")).toThrow(/64 hex/);
  });
  it("reaches every sensitive path, payroll owners included", () => {
    const req = { ein: { responsibleParty: { ssn: "111-22-3333" } }, payroll: { owners: [{ ssn: "444-55-6666" }, { ssn: "777-88-9999" }, { name: "no ssn" }] } };
    expect(mapSensitive(req, maskSsn)).toEqual({ ein: { responsibleParty: { ssn: "***-**-3333" } }, payroll: { owners: [{ ssn: "***-**-6666" }, { ssn: "***-**-9999" }, { name: "no ssn" }] } });
    expect(req.ein.responsibleParty.ssn).toBe("111-22-3333");
  });
});

describe("purge after a filing is finished", () => {
  it("masks finished filings past retention and leaves everything else alone", async () => {
    const store = new MemoryStore();
    const old = new Date(Date.now() - 40 * 86_400_000).toISOString();
    const done = filing({ status: "completed", updatedAt: old });
    const recent = filing({ status: "completed" });
    const open = filing({ status: "needs_reconciliation", updatedAt: old });
    for (const f of [done, recent, open]) await store.createFiling(f);
    const ids = await purgeSensitive(store, { retentionDays: 30 });
    expect(ids).toEqual([done.id]);
    expect((await store.getFiling(done.id))!.request.ein!.responsibleParty!.ssn).toBe("***-**-6789");
    expect((await store.getFiling(done.id))!.sensitivePurgedAt).toBeTruthy();
    expect((await store.getFiling(recent.id))!.request.ein!.responsibleParty!.ssn).toBe("123-45-6789");
    expect((await store.getFiling(open.id))!.request.ein!.responsibleParty!.ssn).toBe("123-45-6789");
    expect(await purgeSensitive(store, { retentionDays: 30 })).toEqual([]);
  });
});

describe("Postgres keeps SSNs sealed", () => {
  const PORT = 55000 + Math.floor(Math.random() * 1000);
  const dir = mkdtempSync(path.join(tmpdir(), "ke-pg-sens-"));
  chmodSync(dir, 0o777);
  const pg = new EmbeddedPostgres({
    databaseDir: path.join(dir, "data"), port: PORT, user: "filing", password: "filing",
    persistent: false, createPostgresUser: process.getuid?.() === 0, onLog: () => {}, onError: () => {},
  });
  let store: PostgresStore;
  beforeAll(async () => {
    await pg.initialise(); await pg.start(); await pg.createDatabase("filing");
    store = await PostgresStore.connect(`postgres://filing:filing@127.0.0.1:${PORT}/filing`, { cipher: FieldCipher.fromSpec(KEY) });
  });
  afterAll(async () => { await store?.close(); await pg.stop(); });

  it("stores only sealed SSNs, reads them back plain, and still reads rows written before encryption", async () => {
    const f = filing({ status: "running" });
    await store.createFiling(f);
    const raw = JSON.stringify((await store.connectionPool.query("select doc from filings where id=$1", [f.id])).rows[0].doc);
    expect(raw).not.toContain("123-45-6789");
    expect(raw).toContain("enc:v1:");
    expect((await store.getFiling(f.id))!.request.ein!.responsibleParty!.ssn).toBe("123-45-6789");
    const updated = await store.updateFiling(f.id, { status: "submitted" });
    expect(updated.request.ein!.responsibleParty!.ssn).toBe("123-45-6789");
    expect(JSON.stringify((await store.connectionPool.query("select doc from filings where id=$1", [f.id])).rows[0].doc)).not.toContain("123-45-6789");
    expect((await store.listFilings("keystone")).find((x) => x.id === f.id)!.request.ein!.responsibleParty!.ssn).toBe("123-45-6789");
    // A row from before encryption (plain value) is read as it is.
    const legacy = filing({ status: "running" });
    await store.connectionPool.query(`insert into filings (id, tenant_id, client_company_id, idempotency_key, status, payload_hash, doc) values ($1,$2,$3,$4,$5,$6,$7)`,
      [legacy.id, legacy.tenantId, legacy.clientCompanyId, legacy.idempotencyKey, legacy.status, legacy.payloadHash, legacy]);
    expect((await store.getFiling(legacy.id))!.request.ein!.responsibleParty!.ssn).toBe("123-45-6789");
  });
});
