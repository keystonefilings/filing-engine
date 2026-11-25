import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { ResendEmailSender, renderEmail } from "../src/comms/resend.js";
import { Notifier } from "../src/comms/notifier.js";
import { LogChannelSender, type ChannelSender, type OutboundMessage } from "../src/comms/senders.js";
import { MemoryStore } from "../src/store/memory.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";

/** V1 (Resend email) and V2 (password reset, change password): docs/vision-check-2026-11-25.md. */

function fakeFetch(respond: (url: string, init: RequestInit) => Response | Promise<Response>) {
  const calls: { url: string; init: RequestInit; body: Record<string, unknown> }[] = [];
  const impl = (async (url: string | URL, init?: RequestInit) => {
    calls.push({ url: String(url), init: init!, body: JSON.parse(String(init!.body)) });
    return respond(String(url), init!);
  }) as typeof fetch;
  return { impl, calls };
}

describe("Resend email sender (V1)", () => {
  it("posts the message to Resend with the key, sender and both text and HTML", async () => {
    const f = fakeFetch(() => Response.json({ id: "msg_1" }));
    const s = new ResendEmailSender({ apiKey: "re_test", from: "Keystone Filings <filings@keystonefilings.com>", replyTo: "help@keystonefilings.com", fetchImpl: f.impl });
    const res = await s.send({ address: "pat@rivera-cpa.test", name: "Pat Rivera" }, { subject: "Approve: NJ formation", body: "Please review.", link: "https://api.test/approve/tok" });
    expect(res).toEqual({ ok: true, detail: "resend msg_1" });
    expect(f.calls[0]!.url).toBe("https://api.resend.com/emails");
    expect((f.calls[0]!.init.headers as Record<string, string>).authorization).toBe("Bearer re_test");
    expect(f.calls[0]!.body).toMatchObject({
      from: "Keystone Filings <filings@keystonefilings.com>", to: ["Pat Rivera <pat@rivera-cpa.test>"],
      subject: "Approve: NJ formation", reply_to: "help@keystonefilings.com",
    });
    expect(f.calls[0]!.body.text).toBe("Please review.\n\nhttps://api.test/approve/tok");
    expect(f.calls[0]!.body.html).toContain('href="https://api.test/approve/tok"');
  });

  it("escapes everything it puts into HTML and keeps headers on one line", async () => {
    const { html } = renderEmail({ subject: "x", body: "Name: <script>alert(1)</script> & co", link: 'https://x.test/?a="b"' });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("&amp; co");
    expect(html).toContain("&quot;b&quot;");
    const f = fakeFetch(() => Response.json({ id: "m" }));
    await new ResendEmailSender({ apiKey: "k", from: "a@b.test", fetchImpl: f.impl }).send({ address: "c@d.test", name: 'Evil\r\nBcc: x@y.test <z>' }, { subject: "Hi\r\nBcc: x@y.test", body: "b" });
    expect(f.calls[0]!.body.subject).toBe("Hi Bcc: x@y.test");
    expect(String((f.calls[0]!.body.to as string[])[0])).not.toMatch(/[\r\n<>]{2}/);
  });

  it("reports a rejected or unreachable send instead of throwing", async () => {
    const rejected = new ResendEmailSender({ apiKey: "k", from: "a@b.test", fetchImpl: fakeFetch(() => Response.json({ name: "validation_error", message: "The domain is not verified" }, { status: 403 })).impl });
    expect(await rejected.send({ address: "c@d.test" }, { subject: "s", body: "b" })).toEqual({ ok: false, detail: "resend 403: The domain is not verified" });
    const down = new ResendEmailSender({ apiKey: "k", from: "a@b.test", fetchImpl: (async () => { throw new Error("ECONNRESET"); }) as typeof fetch });
    expect(await down.send({ address: "c@d.test" }, { subject: "s", body: "b" })).toEqual({ ok: false, detail: "resend unreachable: ECONNRESET" });
  });

  it("a rejected send is recorded as a failed message by the Notifier", async () => {
    const store = new MemoryStore();
    const email = new ResendEmailSender({ apiKey: "k", from: "a@b.test", fetchImpl: fakeFetch(() => Response.json({ message: "rate limited" }, { status: 429 })).impl });
    const n = new Notifier({ store, senders: { email }, defaultSender: new LogChannelSender("email"), publicBaseUrl: "http://api.test" });
    const now = new Date().toISOString();
    const msgs = await n.notify(
      { id: "e1", type: "filing.awaiting_approval", tenantId: "keystone", filingId: "f1", occurredAt: now, data: { approvalLink: "http://api.test/approve/t", recipients: [{ channel: "email", address: "c@d.test" }] } },
      { id: "f1", tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: "k", status: "awaiting_approval", request: njFormationRequest(), payloadHash: "h", createdAt: now, updatedAt: now, artifacts: [] },
    );
    expect(msgs[0]).toMatchObject({ status: "failed", error: "resend 429: rate limited" });
  });
});

/** Records account emails as they are handed over (synchronously, before any await). */
class Outbox implements ChannelSender {
  readonly channel = "email" as const;
  readonly sent: { address: string; msg: OutboundMessage }[] = [];
  async send(to: { address: string }, msg: OutboundMessage) { this.sent.push({ address: to.address, msg }); return { ok: true }; }
  linkFor(address: string) { return [...this.sent].reverse().find((s) => s.address === address)?.msg.link; }
  tokenFor(address: string) { return new URL(this.linkFor(address)!).searchParams.get("token")!; }
}

const PW = "correct horse battery staple";
const NEW_PW = "a different long passphrase";
const STAFF = { "x-api-key": "staff-key-0123456789abcdef" };
let app: FastifyInstance;
let outbox: Outbox;

beforeAll(async () => {
  const store = await seededStore();
  const w = wire(store);
  outbox = new Outbox();
  app = buildServer({
    service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test",
    apiKeys: { k1: "keystone" }, staffKeys: { "staff-key-0123456789abcdef": "ops@platform" }, sessionSecret: "session-secret-for-tests-0123456789",
    platformTenantId: "keystone", partnerSignupMode: "automatic", email: outbox, webBaseUrl: "http://web.test",
  });
  await app.ready();
});
afterAll(async () => { await app.close(); });

const post = (url: string, payload: unknown, headers: Record<string, string> = {}) => app.inject({ method: "POST", url, payload: payload as object, headers });
const signIn = (email: string, password: string) => post("/v1/auth/sign-in", { email, password });
const me = (key: string) => app.inject({ method: "GET", url: "/v1/me", headers: { "x-api-key": key } });
async function enterpriseUser(email: string) {
  const r = await post("/v1/tenants/keystone/users", { email, name: "Dana Ortiz", password: PW }, STAFF);
  expect(r.statusCode).toBe(201);
}

describe("password reset (V2)", () => {
  it("emails a single-use link to the web app, ends old sessions, and sets the new password", async () => {
    await enterpriseUser("dana@acme-filings.test");
    const oldKey = (await signIn("dana@acme-filings.test", PW)).json().sessionKey as string;
    const r = await post("/v1/auth/password-reset", { email: "Dana@Acme-Filings.test" });
    expect(r.statusCode).toBe(202);
    expect(outbox.linkFor("dana@acme-filings.test")).toMatch(/^http:\/\/web\.test\/reset-password\?token=/);
    const token = outbox.tokenFor("dana@acme-filings.test");

    const done = await post("/v1/auth/password-reset/confirm", { token, password: NEW_PW });
    expect(done.statusCode).toBe(200);
    expect(done.json()).toEqual({ ok: true, email: "dana@acme-filings.test" });
    expect((await me(oldKey)).statusCode).toBe(401);
    expect((await signIn("dana@acme-filings.test", PW)).statusCode).toBe(401);
    expect((await signIn("dana@acme-filings.test", NEW_PW)).statusCode).toBe(200);
    // The link works once.
    expect((await post("/v1/auth/password-reset/confirm", { token, password: "yet another passphrase" })).statusCode).toBe(410);
  });

  it("answers the same for an unknown email and sends nothing", async () => {
    const before = outbox.sent.length;
    const r = await post("/v1/auth/password-reset", { email: "nobody@nowhere.test" });
    expect(r.statusCode).toBe(202);
    expect(r.json().message).toMatch(/If that email has an account/);
    expect(outbox.sent.length).toBe(before);
  });

  it("refuses a tampered link, and a link from before a sign-out-everywhere", async () => {
    await enterpriseUser("lee@acme-filings.test");
    await post("/v1/auth/password-reset", { email: "lee@acme-filings.test" });
    const token = outbox.tokenFor("lee@acme-filings.test");
    const [id, secret] = [token.slice(0, token.indexOf(".")), token.slice(token.indexOf(".") + 1)];
    const flipped = `${id}.${secret.slice(0, -1)}${secret.endsWith("A") ? "B" : "A"}`;
    expect((await post("/v1/auth/password-reset/confirm", { token: flipped, password: NEW_PW })).statusCode).toBe(410);
    expect((await post("/v1/auth/password-reset/confirm", { token: "no-dot-in-this-token-at-all", password: NEW_PW })).statusCode).toBe(410);
    const key = (await signIn("lee@acme-filings.test", PW)).json().sessionKey as string;
    await post("/v1/auth/sign-out-everywhere", {}, { "x-api-key": key });
    expect((await post("/v1/auth/password-reset/confirm", { token, password: NEW_PW })).statusCode).toBe(410);
    expect((await signIn("lee@acme-filings.test", PW)).statusCode).toBe(200);
  });

  it("checks the new password like sign-up does", async () => {
    await enterpriseUser("kim@acme-filings.test");
    await post("/v1/auth/password-reset", { email: "kim@acme-filings.test" });
    const r = await post("/v1/auth/password-reset/confirm", { token: outbox.tokenFor("kim@acme-filings.test"), password: "short" });
    expect(r.statusCode).toBe(422);
  });

  it("limits how many links one email can ask for", async () => {
    await enterpriseUser("max@acme-filings.test");
    const before = outbox.sent.filter((s) => s.address === "max@acme-filings.test").length;
    for (let i = 0; i < 5; i++) expect((await post("/v1/auth/password-reset", { email: "max@acme-filings.test" })).statusCode).toBe(202);
    expect(outbox.sent.filter((s) => s.address === "max@acme-filings.test").length - before).toBe(3);
  });
});

describe("account emails that the pages promise (V1, V6)", () => {
  it("an approved partner sign-up is emailed a link to log in", async () => {
    const store = await seededStore();
    const w = wire(store);
    const box = new Outbox();
    const srv = buildServer({
      service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test",
      apiKeys: { k1: "keystone" }, staffKeys: {}, sessionSecret: "session-secret-for-tests-0123456789",
      platformTenantId: "keystone", partnerSignupMode: "approval", email: box, webBaseUrl: "http://web.test",
    });
    await srv.ready();
    try {
      const s = await srv.inject({ method: "POST", url: "/v1/signups/partner", payload: { companyName: "Rivera CPA", companyType: "cpa", name: "Pat Rivera", email: "pat@rivera.test", password: PW } });
      expect(s.statusCode).toBe(202);
      expect(box.sent.map((m) => m.msg.subject)).toEqual(["Confirm your email"]);
      const id = (await srv.inject({ method: "GET", url: "/v1/partner-signups", headers: { "x-api-key": "k1" } })).json().signups[0].id as string;
      const d = await srv.inject({ method: "POST", url: `/v1/partner-signups/${id}/decision`, payload: { action: "approve" }, headers: { "x-api-key": "k1" } });
      expect(d.statusCode).toBe(200);
      expect(box.sent[1]).toMatchObject({ address: "pat@rivera.test", msg: { subject: "Your partner account is open", link: "http://web.test/login" } });
    } finally { await srv.close(); }
  });
});

describe("change password (V2)", () => {
  it("needs the current password, returns a fresh key and ends the other sessions", async () => {
    await enterpriseUser("ari@acme-filings.test");
    const a = (await signIn("ari@acme-filings.test", PW)).json().sessionKey as string;
    const b = (await signIn("ari@acme-filings.test", PW)).json().sessionKey as string;
    expect((await post("/v1/auth/change-password", { currentPassword: "not the password", newPassword: NEW_PW }, { "x-api-key": a })).statusCode).toBe(401);
    const r = await post("/v1/auth/change-password", { currentPassword: PW, newPassword: NEW_PW }, { "x-api-key": a });
    expect(r.statusCode).toBe(200);
    const fresh = r.json().sessionKey as string;
    expect((await me(fresh)).statusCode).toBe(200);
    expect((await me(a)).statusCode).toBe(401);
    expect((await me(b)).statusCode).toBe(401);
    expect((await signIn("ari@acme-filings.test", NEW_PW)).statusCode).toBe(200);
  });

  it("is open to partner sessions too", async () => {
    const s = await post("/v1/signups/partner", { companyName: "Best Accounting", companyType: "cpa", name: "Pat Rivera", email: "pat@best-accounting.test", password: PW, states: ["NY"] });
    expect(s.statusCode).toBe(202);
    const link = outbox.linkFor("pat@best-accounting.test")!;
    expect((await post("/v1/auth/verify-email", { token: new URL(link).searchParams.get("token") })).json().status).toBe("active");
    const key = (await signIn("pat@best-accounting.test", PW)).json().sessionKey as string;
    const r = await post("/v1/auth/change-password", { currentPassword: PW, newPassword: NEW_PW }, { "x-api-key": key });
    expect(r.statusCode).toBe(200);
  });
});

describe("sign out on one device (V7)", () => {
  it("ends that session's key and leaves the person's other sessions alone", async () => {
    await enterpriseUser("rae@acme-filings.test");
    const laptop = (await signIn("rae@acme-filings.test", PW)).json().sessionKey as string;
    const phone = (await signIn("rae@acme-filings.test", PW)).json().sessionKey as string;
    const r = await post("/v1/auth/sign-out", {}, { "x-api-key": laptop });
    expect(r.json()).toEqual({ ok: true, ended: true });
    expect((await me(laptop)).statusCode).toBe(401);
    expect((await me(phone)).statusCode).toBe(200);
  });
});

describe("enterprise requests: approve creates the account (V32)", () => {
  it("creates the subscriber and its first user, who sets their own password from the email", async () => {
    await post("/v1/inquiries", { name: "Morgan Hale", company: "Hale Filing Services", email: "morgan@hale-filings.test", message: "We file 300 a month" });
    const list = (await app.inject({ method: "GET", url: "/v1/inquiries", headers: STAFF })).json().inquiries;
    const q = list.find((i: { email: string }) => i.email === "morgan@hale-filings.test");
    const d = await post(`/v1/inquiries/${q.id}/decision`, { action: "approve" }, STAFF);
    expect(d.statusCode).toBe(201);
    expect(d.json().tenantId).toBe("hale-filing-services");
    const mail = outbox.sent.find((m) => m.address === "morgan@hale-filings.test")!;
    expect(mail.msg.subject).toBe("Your account is ready");
    // Nobody knows the password until Morgan sets it.
    const token = new URL(mail.msg.link!).searchParams.get("token")!;
    expect((await post("/v1/auth/password-reset/confirm", { token, password: NEW_PW })).statusCode).toBe(200);
    const s = await signIn("morgan@hale-filings.test", NEW_PW);
    expect(s.statusCode).toBe(200);
    expect(s.json().user).toMatchObject({ kind: "enterprise", tenantId: "hale-filing-services" });
    expect((await post(`/v1/inquiries/${q.id}/decision`, { action: "decline" }, STAFF)).statusCode).toBe(409);
    // A subscriber's own key can't decide requests: they're the platform's.
    expect((await post(`/v1/inquiries/${q.id}/decision`, { action: "approve" }, { "x-api-key": s.json().sessionKey })).statusCode).toBe(403);
  });
});
