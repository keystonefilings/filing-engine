import { createHmac } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { TwilioChannel, verifyTwilio, e164 } from "../src/inbound/twilio.js";
import { SlackChannel, verifySlack } from "../src/inbound/slack.js";
import { hashPassword } from "../src/users/password.js";
import type { MemoryStore } from "../src/store/memory.js";
import { seededStore, wire } from "./helpers.js";

/** V41-V43: filing requests from Slack, and by text and WhatsApp through Twilio. Free text never files. */

const TOKEN = "twilio-auth-token", HOOK = "https://api.cofile.test/v1/inbound/twilio", SLACK_SECRET = "slack-signing-secret";
const twilioSig = (params: Record<string, string>) => createHmac("sha1", TOKEN).update(HOOK + Object.keys(params).sort().map((k) => k + params[k]).join("")).digest("base64");
const slackHeaders = (raw: string, ts = Math.floor(Date.now() / 1000)) => ({ "x-slack-request-timestamp": String(ts), "x-slack-signature": `v0=${createHmac("sha256", SLACK_SECRET).update(`v0:${ts}:${raw}`).digest("hex")}` });

describe("helpers", () => {
  it("normalizes phone numbers", () => {
    expect(e164("(212) 555-0100")).toBe("+12125550100");
    expect(e164("1 212 555 0100")).toBe("+12125550100");
    expect(e164("+44 20 7946 0958")).toBe("+442079460958");
    expect(e164("555-0100")).toBeNull();
  });
  it("checks Twilio and Slack signatures", () => {
    const p = { From: "+12125550100", Body: "hi" };
    expect(verifyTwilio(TOKEN, HOOK, p, twilioSig(p))).toBe(true);
    expect(verifyTwilio(TOKEN, HOOK, { ...p, Body: "changed" }, twilioSig(p))).toBe(false);
    expect(verifyTwilio(TOKEN, "https://elsewhere.test/hook", p, twilioSig(p))).toBe(false);
    const raw = "text=hi&team_id=T1", now = 1_790_000_000;
    expect(verifySlack(SLACK_SECRET, String(now), raw, slackHeaders(raw, now)["x-slack-signature"], now)).toBe(true);
    expect(verifySlack(SLACK_SECRET, String(now - 600), raw, slackHeaders(raw, now - 600)["x-slack-signature"], now)).toBe(false);
    expect(verifySlack(SLACK_SECRET, String(now), raw + "x", slackHeaders(raw, now)["x-slack-signature"], now)).toBe(false);
  });
});

let store: MemoryStore;
let app: FastifyInstance;
const texts: { To: string; Body: string }[] = [];
let patKey = "", leeKey = "";

beforeAll(async () => {
  store = await seededStore();
  const acme = (await store.getClientCompany("acme-cpa"))!;
  await store.putClientCompany({ ...acme, portal: { ...(acme.portal ?? {}), slug: "acme" } as never });
  const passwordHash = await hashPassword("correct horse battery staple");
  for (const [email, name] of [["pat@acme.test", "Pat"], ["lee@acme.test", "Lee"]]) {
    await store.createUser({ id: crypto.randomUUID(), email, name, kind: "partner", tenantId: "keystone", clientCompanyId: "acme-cpa", status: "active", passwordHash, sessionGen: 0, createdAt: new Date().toISOString() } as never);
  }
  const fetchImpl = (async (url: string, init?: { body?: unknown; headers?: Record<string, string> }) => {
    const u = new URL(String(url));
    if (u.pathname.endsWith("/Messages.json")) { texts.push(Object.fromEntries(new URLSearchParams(String(init?.body))) as never); return Response.json({ sid: "SM1" }, { status: 201 }); }
    if (u.pathname === "/api/oauth.v2.access") return Response.json({ ok: true, access_token: "xoxb-test", team: { id: "T1", name: "Acme CPA" } });
    if (u.pathname === "/api/users.info") return Response.json({ ok: true, user: { profile: { email: u.searchParams.get("user") === "U012AB3CD" ? "Pat@acme.test" : "nobody@else.test" } } });
    return Response.json({}, { status: 404 });
  }) as unknown as typeof fetch;
  const twilio = new TwilioChannel({ store, accountSid: "AC1", authToken: TOKEN, smsFrom: "+18005550100", whatsappFrom: "+18005550101", webhookUrl: HOOK, webBaseUrl: "http://web.test", fetchImpl });
  const slack = new SlackChannel({ store, clientId: "c1", clientSecret: "s1", signingSecret: SLACK_SECRET, publicBaseUrl: "https://api.cofile.test", webBaseUrl: "http://web.test", stateSecret: "state-secret", apiBase: "https://slack.test", fetchImpl });
  const w = wire(store);
  app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "https://api.cofile.test", apiKeys: { k1: "keystone" }, sessionSecret: "session-secret-for-tests-0123456789", twilio, slack });
  await app.ready();
  const signIn = async (email: string) => (await app.inject({ method: "POST", url: "/v1/auth/sign-in", payload: { email, password: "correct horse battery staple" } })).json().sessionKey as string;
  patKey = await signIn("pat@acme.test");
  leeKey = await signIn("lee@acme.test");
});
afterAll(async () => { await app.close(); });

const sms = (params: Record<string, string>) => app.inject({ method: "POST", url: "/v1/inbound/twilio", headers: { "content-type": "application/x-www-form-urlencoded", "x-twilio-signature": twilioSig(params) }, payload: new URLSearchParams(params).toString() });

describe("texts and WhatsApp", () => {
  it("confirms a person's mobile number with a code we text them", async () => {
    const start = await app.inject({ method: "POST", url: "/v1/account/phone", headers: { "x-api-key": patKey }, payload: { phone: "(212) 555-0100" } });
    expect(start.json()).toEqual({ pending: "+12125550100" });
    const code = /code is (\d{6})/.exec(texts.at(-1)!.Body)![1]!;
    expect(texts.at(-1)!.To).toBe("+12125550100");
    expect((await app.inject({ method: "POST", url: "/v1/account/phone/confirm", headers: { "x-api-key": patKey }, payload: { code: code === "000000" ? "111111" : "000000" } })).statusCode).toBe(400);
    expect((await app.inject({ method: "POST", url: "/v1/account/phone/confirm", headers: { "x-api-key": patKey }, payload: { code } })).json()).toEqual({ phone: "+12125550100" });
    expect((await app.inject({ method: "GET", url: "/v1/account/phone", headers: { "x-api-key": patKey } })).json()).toMatchObject({ phone: "+12125550100", numbers: { sms: "+18005550100", whatsapp: "+18005550101" } });
    // Someone else can't take the number; an API key isn't a person.
    expect((await app.inject({ method: "POST", url: "/v1/account/phone", headers: { "x-api-key": leeKey }, payload: { phone: "212-555-0100" } })).statusCode).toBe(409);
    expect((await app.inject({ method: "POST", url: "/v1/account/phone", headers: { "x-api-key": "k1" }, payload: { phone: "212-555-0199" } })).statusCode).toBe(401);
  });

  it("answers a text from a confirmed number with the link, and WhatsApp the same way", async () => {
    const r = await sms({ MessageSid: "SM100", From: "+12125550100", To: "+18005550100", Body: "NY LLC for Blue Harbor Consulting, organizer Sam Rivera" });
    expect(r.headers["content-type"]).toMatch(/xml/);
    expect(r.body).toMatch(/<Message>Got it\. .*http:\/\/web\.test\/p\/acme\/from-email\/[0-9a-f-]+<\/Message>/);
    const m = (await store.findInboundByProvider("twilio:SM100"))!;
    expect(m).toMatchObject({ channel: "sms", clientCompanyId: "acme-cpa", from: "+12125550100" });
    await sms({ MessageSid: "SM101", From: "whatsapp:+12125550100", To: "whatsapp:+18005550101", Body: "EIN for Blue Harbor Consulting LLC" });
    expect((await store.findInboundByProvider("twilio:SM101"))!.channel).toBe("whatsapp");
  });

  it("stays silent to unknown numbers and refuses unsigned posts", async () => {
    const r = await sms({ MessageSid: "SM102", From: "+13135550100", Body: "hello" });
    expect(r.body).toBe('<?xml version="1.0" encoding="UTF-8"?><Response></Response>');
    expect(await store.findInboundByProvider("twilio:SM102")).toBeNull();
    const bad = await app.inject({ method: "POST", url: "/v1/inbound/twilio", headers: { "content-type": "application/x-www-form-urlencoded", "x-twilio-signature": "nope" }, payload: "MessageSid=SM103&From=%2B12125550100&Body=x" });
    expect(bad.statusCode).toBe(403);
  });
});

describe("Slack", () => {
  const command = (fields: Record<string, string>) => {
    const raw = new URLSearchParams({ command: "/file", ...fields }).toString();
    return app.inject({ method: "POST", url: "/v1/slack/command", headers: { "content-type": "application/x-www-form-urlencoded", ...slackHeaders(raw) }, payload: raw });
  };

  it("installs in a workspace through Slack's OAuth", async () => {
    const go = await app.inject({ method: "GET", url: "/v1/slack/install" });
    expect(go.statusCode).toBe(302);
    const to = new URL(go.headers.location as string);
    expect(to.origin + to.pathname).toBe("https://slack.test/oauth/v2/authorize");
    expect(to.searchParams.get("scope")).toBe("commands,users:read,users:read.email");
    const bad = await app.inject({ method: "GET", url: "/v1/slack/oauth/callback?code=x&state=forged.sig" });
    expect(bad.body).toMatch(/expired/);
    const done = await app.inject({ method: "GET", url: `/v1/slack/oauth/callback?code=abc&state=${encodeURIComponent(to.searchParams.get("state")!)}` });
    expect(done.body).toMatch(/CoFile is now in Acme CPA/);
  });

  it("turns /file into a link for a person with a CoFile account, privately", async () => {
    const r = await command({ team_id: "T1", user_id: "U012AB3CD", trigger_id: "tr1", text: "NY LLC for Blue Harbor Consulting" });
    expect(r.json().response_type).toBe("ephemeral");
    expect(r.json().text).toMatch(/<http:\/\/web\.test\/p\/acme\/from-email\/[0-9a-f-]+\|Open the filled-in form>/);
    expect((await store.findInboundByProvider("slack:T1:tr1"))!).toMatchObject({ channel: "slack", from: "pat@acme.test" });
    expect((await command({ team_id: "T1", user_id: "U0OTHER99", trigger_id: "tr2", text: "x" })).json().text).toMatch(/doesn't match a CoFile account/);
    expect((await command({ team_id: "T9", user_id: "U012AB3CD", trigger_id: "tr3", text: "x" })).json().text).toMatch(/isn't added to this Slack workspace/);
    expect((await command({ team_id: "T1", user_id: "U012AB3CD", text: "" })).json().text).toMatch(/Type \/file/);
    const raw = "team_id=T1&user_id=U012AB3CD&text=x";
    expect((await app.inject({ method: "POST", url: "/v1/slack/command", headers: { "content-type": "application/x-www-form-urlencoded", "x-slack-request-timestamp": String(Math.floor(Date.now() / 1000)), "x-slack-signature": "v0=00" }, payload: raw })).statusCode).toBe(401);
  });
});
