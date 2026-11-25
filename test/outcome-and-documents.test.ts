import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { Notifier } from "../src/comms/notifier.js";
import type { ChannelSender, OutboundMessage } from "../src/comms/senders.js";
import { ClientCompanySettings } from "../src/settings/schema.js";
import type { FilingRecord } from "../src/store/types.js";
import type { MemoryStore } from "../src/store/memory.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";

/**
 * V15 (the finished filing comes back by email, with its documents) and V16 (filing.accepted and
 * filing.rejected, and a way to record the state's later answer): docs/vision-check-2026-11-25.md.
 */

class Outbox implements ChannelSender {
  readonly channel = "email" as const;
  readonly sent: { address: string; msg: OutboundMessage }[] = [];
  async send(to: { address: string }, msg: OutboundMessage) { this.sent.push({ address: to.address, msg }); return { ok: true }; }
}

const artifacts = new FsArtifactStore("var/test-artifacts");
const PDF = Buffer.from("%PDF-1.4 receipt");
let store: MemoryStore;
let app: FastifyInstance;
let outbox: Outbox;

beforeAll(async () => {
  store = await seededStore();
  // A partner firm (signed up on the portal) with a contact email and a portal address.
  await store.putClientCompany(ClientCompanySettings.parse({
    clientCompanyId: "firm-best", tenantId: "keystone", name: "Best Accounting",
    portal: { slug: "best-accounting" }, partner: { companyType: "cpa", contactName: "Pat Rivera", contactEmail: "pat@best.test", setupDone: [] },
  }));
  outbox = new Outbox();
  const w = wire(store);
  // The service under test sends through a Notifier with our outbox and the artifact store.
  (w.service as unknown as { d: { notifier: Notifier } }).d.notifier = new Notifier({ store, senders: { email: outbox }, publicBaseUrl: "http://api.test", artifacts, webBaseUrl: "http://web.test" });
  app = buildServer({
    service: w.service, approvals: w.approvals, store, artifacts, publicBaseUrl: "http://api.test",
    apiKeys: { k1: "keystone", k2: "other-co" }, staffKeys: { "staff-key-0123456789abcdef": "ops@platform" }, sessionSecret: "session-secret-for-tests-0123456789",
  });
  await app.ready();
});
afterAll(async () => { await app.close(); });

async function submittedFiling(clientCompanyId = "acme-cpa"): Promise<FilingRecord> {
  const now = new Date().toISOString();
  const shot = await artifacts.put({ filingId: "x", kind: "screenshot", label: "review screen", contentType: "image/png" }, Buffer.from("png"));
  const f: FilingRecord = {
    id: crypto.randomUUID(), tenantId: "keystone", clientCompanyId, idempotencyKey: `k-${Math.random()}`, status: "submitted",
    request: njFormationRequest({ clientCompanyId, state: "NY" } as never), payloadHash: "h", createdAt: now, updatedAt: now,
    artifacts: [{ id: shot.id, kind: "screenshot", label: "review screen" }],
  };
  await store.createFiling(f);
  return f;
}
const outcome = (id: string, body: unknown, key = "k1") => app.inject({ method: "POST", url: `/v1/filings/${id}/outcome`, payload: body as object, headers: { "x-api-key": key } });
const events = async (id: string) => (await store.listDeliveries(id)).map((d) => d.event.type);

describe("recording the state's answer (V16)", () => {
  it("accepted: stores the state's documents, emits accepted then completed, and emails the documents", async () => {
    const f = await submittedFiling("firm-best");
    const r = await outcome(f.id, { outcome: "accepted", reference: "DOS-2026-1188", documents: [{ label: "Filing receipt", kind: "filing_receipt", contentType: "application/pdf", data: PDF.toString("base64") }] });
    expect(r.statusCode).toBe(200);
    expect(r.json().filing.status).toBe("completed");
    expect(await events(f.id)).toEqual(expect.arrayContaining(["filing.accepted", "filing.completed"]));
    // V15: the partner firm gets it, with the receipt attached (never the screenshot) and a link to the filing page.
    const mail = outbox.sent.find((m) => m.msg.subject.startsWith("Completed"))!;
    expect(mail.address).toBe("pat@best.test");
    expect(mail.msg.attachments?.map((a) => a.filename)).toEqual(["Filing receipt.pdf"]);
    expect(mail.msg.attachments?.[0]!.content.equals(PDF)).toBe(true);
    expect(mail.msg.link).toBe(`http://web.test/p/best-accounting/filings/${f.id}`);
    expect(mail.msg.body).toContain("DOS-2026-1188");
  });

  it("rejected: records the reason and tells the client", async () => {
    const f = await submittedFiling();
    const r = await outcome(f.id, { outcome: "rejected", reason: "The name is not distinguishable" }, "staff-key-0123456789abcdef");
    expect(r.json().filing.status).toBe("rejected");
    expect(r.json().filing.lastError).toBe("The name is not distinguishable");
    expect(await events(f.id)).toContain("filing.rejected");
    expect(outbox.sent.some((m) => m.msg.subject.startsWith("Rejected by the state") && m.msg.body.includes("not distinguishable"))).toBe(true);
  });

  it("only for a submitted filing of the caller's own", async () => {
    const f = await submittedFiling();
    expect((await outcome(f.id, { outcome: "accepted" }, "k2")).statusCode).toBe(404);
    expect((await outcome(f.id, { outcome: "accepted" }, "nope")).statusCode).toBe(401);
    expect((await outcome(f.id, { outcome: "rejected", documents: [{ label: "x", contentType: "application/pdf", data: "eA==" }] })).statusCode).toBe(422);
    expect((await outcome(f.id, { outcome: "accepted" })).statusCode).toBe(200);
    expect((await outcome(f.id, { outcome: "accepted" })).statusCode).toBe(409);
  });
});

describe("who gets the finished filing (V15, H1 documents go to)", () => {
  it("follows the firm's answer: the client, or both", async () => {
    for (const [to, expected] of [["client", ["sam@example.test"]], ["both", ["jordan@acme-cpa.test", "sam@example.test"]]] as const) {
      const c = (await store.getClientCompany("acme-cpa"))!;
      await store.putClientCompany({ ...c, approvers: [{ channel: "email", address: "jordan@acme-cpa.test" }], policies: { ...c.policies, documentsTo: to } });
      const f = await submittedFiling();
      await store.updateFiling(f.id, { request: { ...f.request, contact: { ...f.request.contact, email: "sam@example.test" } } });
      const before = outbox.sent.length;
      await outcome(f.id, { outcome: "accepted" });
      expect(outbox.sent.slice(before).filter((m) => m.msg.subject.startsWith("Completed")).map((m) => m.address).sort()).toEqual([...expected].sort());
    }
  });
});
