import { createHmac } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { InboundEmailService, verifySvix, htmlToText, bareAddress } from "../src/inbound/email.js";
import { purgeSensitive } from "../src/store/sensitive.js";
import type { ChannelSender, OutboundMessage } from "../src/comms/senders.js";
import type { MemoryStore } from "../src/store/memory.js";
import { seededStore, wire } from "./helpers.js";

/** V40: filing requests emailed in become a filled-in form to check; nothing is filed from an email. */

const SECRET = `whsec_${Buffer.from("inbound-test-secret-0123456789").toString("base64")}`;
function svixHeaders(body: string, id = "msg_1", ts = Math.floor(Date.now() / 1000)) {
  const sig = createHmac("sha256", Buffer.from(SECRET.slice(6), "base64")).update(`${id}.${ts}.${body}`).digest("base64");
  return { "svix-id": id, "svix-timestamp": String(ts), "svix-signature": `v1,${sig}` };
}

describe("helpers", () => {
  it("checks Svix signatures", () => {
    const body = '{"type":"email.received"}';
    const now = 1_790_000_000;
    expect(verifySvix(SECRET, svixHeaders(body, "m", now), body, now)).toBe(true);
    expect(verifySvix(SECRET, svixHeaders(body, "m", now), body + " ", now)).toBe(false);
    expect(verifySvix(SECRET, svixHeaders(body, "m", now - 900), body, now)).toBe(false);
    expect(verifySvix(SECRET, {}, body, now)).toBe(false);
  });
  it("reads addresses and HTML bodies", () => {
    expect(bareAddress("Pat Rivera <Pat@Acme.test>")).toBe("pat@acme.test");
    expect(htmlToText("<p>Form an LLC<br>for Sam &amp; Co.</p><style>p{}</style><div>Thanks</div>")).toBe("Form an LLC\nfor Sam & Co.\nThanks");
  });
});

class Outbox implements ChannelSender {
  readonly channel = "email" as const;
  readonly sent: { address: string; msg: OutboundMessage }[] = [];
  async send(to: { address: string }, msg: OutboundMessage) { this.sent.push({ address: to.address, msg }); return { ok: true }; }
}

let store: MemoryStore;
let app: FastifyInstance;
let outbox: Outbox;
let inbound: InboundEmailService;
const BODY = "Please form a New York LLC called Blue Harbor Consulting LLC for Sam Rivera, 22 River Rd, Brooklyn NY 11201.";

beforeAll(async () => {
  store = await seededStore();
  const acme = (await store.getClientCompany("acme-cpa"))!;
  await store.putClientCompany({ ...acme, portal: { ...(acme.portal ?? {}), slug: "acme" } as never });
  const user = (email: string, over: object) => store.createUser({ id: email, email, name: "x", kind: "partner", tenantId: "keystone", status: "active", passwordHash: "x", sessionGen: 0, createdAt: new Date().toISOString(), ...over } as never);
  await user("pat@acme.test", { clientCompanyId: "acme-cpa" });
  await user("ops@keystone.test", { kind: "enterprise" });
  outbox = new Outbox();
  const fetchImpl = (async (url: string) => {
    if (String(url).endsWith("/emails/receiving/em_html")) return Response.json({ html: "<p>Form an LLC</p>" });
    return Response.json({ text: BODY });
  }) as unknown as typeof fetch;
  inbound = new InboundEmailService({ store, webhookSecret: SECRET, resendApiKey: "re_test", address: "file@in.cofile.app", email: outbox, webBaseUrl: "http://web.test", fetchImpl });
  const w = wire(store);
  app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" }, inbound });
  await app.ready();
});
afterAll(async () => { await app.close(); });

const deliver = (data: object, id = `msg_${Math.random()}`) => {
  const body = JSON.stringify({ type: "email.received", created_at: new Date().toISOString(), data });
  return app.inject({ method: "POST", url: "/v1/inbound/email/resend", headers: { "content-type": "application/json", ...svixHeaders(body, id) }, payload: body });
};

describe("emailing a filing request in", () => {
  it("stores a firm user's request and sends back a link to the filled-in form", async () => {
    const r = await deliver({ email_id: "em_1", from: "Pat <PAT@acme.test>", to: ["file@in.cofile.app"], subject: "New LLC for Sam" });
    expect(r.statusCode).toBe(200);
    const msg = (await store.findInboundByProvider("em_1"))!;
    expect(msg).toMatchObject({ clientCompanyId: "acme-cpa", from: "pat@acme.test", subject: "New LLC for Sam", text: BODY });
    const mail = outbox.sent.at(-1)!;
    expect(mail.address).toBe("pat@acme.test");
    expect(mail.msg.link).toBe(`http://web.test/p/acme/from-email/${msg.id}`);
    expect(mail.msg.body).toMatch(/Nothing is filed until you send it/);
    // Resend retries a delivery: the same message is stored once.
    await deliver({ email_id: "em_1", from: "pat@acme.test", to: ["file@in.cofile.app"], subject: "New LLC for Sam" });
    expect([...store.inbound.values()].filter((m) => m.providerId === "em_1")).toHaveLength(1);
  });

  it("ignores strangers, other addresses and bad signatures, and points staff without a firm elsewhere", async () => {
    const before = outbox.sent.length;
    await deliver({ email_id: "em_2", from: "someone@else.test", to: ["file@in.cofile.app"], subject: "hi" });
    await deliver({ email_id: "em_3", from: "pat@acme.test", to: ["other@in.cofile.app"], subject: "hi" });
    expect(outbox.sent.length).toBe(before); // no backscatter
    expect(await store.findInboundByProvider("em_2")).toBeNull();
    await deliver({ email_id: "em_4", from: "ops@keystone.test", to: ["file@in.cofile.app"], subject: "hi" });
    expect(outbox.sent.at(-1)!.msg.subject).toMatch(/firm's portal/);
    const body = JSON.stringify({ type: "email.received", data: { email_id: "em_5" } });
    expect((await app.inject({ method: "POST", url: "/v1/inbound/email/resend", headers: { "content-type": "application/json", "svix-id": "x", "svix-timestamp": "1", "svix-signature": "v1,AAAA" }, payload: body })).statusCode).toBe(400);
  });

  it("reads an HTML-only message", async () => {
    await deliver({ email_id: "em_html", from: "pat@acme.test", to: ["file@in.cofile.app"], subject: "html" });
    expect((await store.findInboundByProvider("em_html"))!.text).toBe("Form an LLC");
  });

  it("lets the firm read the message and save what was read from it, and nobody else", async () => {
    const msg = (await store.findInboundByProvider("em_1"))!;
    const url = `/v1/client-companies/acme-cpa/inbound/${msg.id}`;
    const got = await app.inject({ method: "GET", url, headers: { "x-api-key": "k1" } });
    expect(got.json().message).toMatchObject({ subject: "New LLC for Sam", text: BODY });
    expect(got.json().message.providerId).toBeUndefined();
    expect((await app.inject({ method: "GET", url: `/v1/client-companies/beta-llc/inbound/${msg.id}`, headers: { "x-api-key": "k1" } })).statusCode).toBe(404);
    const put = await app.inject({ method: "PUT", url: `${url}/extracted`, headers: { "x-api-key": "k1" }, payload: { kind: "ny-llc", byKind: { "ny-llc": { "formation.name.baseName": "Blue Harbor Consulting" } } } });
    expect(put.statusCode).toBe(200);
    expect((await store.getInbound(msg.id))!.extracted).toMatchObject({ kind: "ny-llc", byKind: { "ny-llc": { "formation.name.baseName": "Blue Harbor Consulting" } } });
    expect((await app.inject({ method: "PUT", url: `${url}/extracted`, headers: { "x-api-key": "k1" }, payload: { kind: "NY LLC!", byKind: {} } })).statusCode).toBe(422);
    expect((await app.inject({ method: "GET", url: "/v1/client-companies/acme-cpa/inbound", headers: { "x-api-key": "k1" } })).json()).toEqual({ address: "file@in.cofile.app", sms: null, whatsapp: null, slackInstallUrl: null });
  });

  it("removes the text and what was read after the retention period", async () => {
    const msg = (await store.findInboundByProvider("em_1"))!;
    await purgeSensitive(store, { retentionDays: 30, now: new Date(Date.now() + 31 * 86_400_000) });
    const after = (await store.getInbound(msg.id))!;
    expect(after.text).toBeUndefined();
    expect(after.extracted).toBeUndefined();
    expect(after.purgedAt).toBeTruthy();
    expect(after.subject).toBe("New LLC for Sam");
  });
});
