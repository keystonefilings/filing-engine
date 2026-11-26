import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";
import { hashPassword, passwordProblem, verifyPassword } from "../src/users/password.js";
import { mintSessionKey, readSessionKey } from "../src/users/session-token.js";
import { slugFor } from "../src/users/routes.js";
import { PaymentSettings, stateFeeCards } from "../src/settings/payments.js";
import type { ChannelSender, OutboundMessage } from "../src/comms/senders.js";

/** Catches the confirmation emails, so a test can open the link like the person would. */
const outbox: { address: string; msg: OutboundMessage }[] = [];
const email: ChannelSender = { channel: "email", async send(to, msg) { outbox.push({ address: to.address, msg }); return { ok: true }; } };
async function confirmEmail(srv: FastifyInstance, address: string) {
  const link = [...outbox].reverse().find((m) => m.address === address && m.msg.subject === "Confirm your email for CoFile")?.msg.link;
  if (!link) throw new Error(`no confirmation email for ${address}`);
  return srv.inject({ method: "POST", url: "/v1/auth/verify-email", payload: { token: new URL(link).searchParams.get("token") } });
}

let app: FastifyInstance;
let auto: FastifyInstance;
let store: Awaited<ReturnType<typeof seededStore>>;
const PW = "correct horse battery staple";

beforeAll(async () => {
  store = await seededStore();
  const w = wire(store);
  const base = { service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone", k2: "other-co" }, staffKeys: { "staff-key-0123456789abcdef": "ops@platform" }, sessionSecret: "session-secret-for-tests-0123456789", email, webBaseUrl: "http://web.test" };
  app = buildServer({ ...base, platformTenantId: "keystone", partnerSignupMode: "approval" });
  auto = buildServer({ ...base, platformTenantId: "keystone", partnerSignupMode: "automatic" });
  await app.ready(); await auto.ready();
});
afterAll(async () => { await app.close(); await auto.close(); });

const as = (key: string) => ({ "x-api-key": key });
const signIn = (email: string, password = PW) => app.inject({ method: "POST", url: "/v1/auth/sign-in", payload: { email, password } });
const signup = (srv: FastifyInstance, email: string, companyName: string) =>
  srv.inject({ method: "POST", url: "/v1/signups/partner", payload: { companyName, companyType: "cpa", name: "Pat Rivera", email, password: PW, states: ["NY"] } });

describe("passwords and session keys", () => {
  it("hashes with a salt and verifies", async () => {
    const a = await hashPassword(PW), b = await hashPassword(PW);
    expect(a).not.toBe(b);
    expect(a).not.toContain(PW);
    expect(await verifyPassword(PW, a)).toBe(true);
    expect(await verifyPassword("wrong password here", a)).toBe(false);
  });
  it("refuses short passwords", () => {
    expect(passwordProblem("short")).toMatch(/12/);
    expect(passwordProblem(PW)).toBeNull();
  });
  it("rejects a tampered or expired session key", () => {
    const k = mintSessionKey("s".repeat(32), { sub: "u", tenantId: "t", kind: "enterprise", exp: 2_000_000_000, gen: 0 });
    expect(readSessionKey("s".repeat(32), k)?.sub).toBe("u");
    expect(readSessionKey("x".repeat(32), k)).toBeNull();
    expect(readSessionKey("s".repeat(32), k, 2_000_000_001)).toBeNull();
    const [p, m] = k.slice(4).split(".");
    const forged = Buffer.from(JSON.stringify({ sub: "u", tenantId: "other", kind: "enterprise", exp: 2_000_000_000, gen: 0 })).toString("base64url");
    expect(readSessionKey("s".repeat(32), `kfs_${forged}.${m}`)).toBeNull();
    expect(p).toBeTruthy();
  });
  it("makes portal slugs", () => {
    expect(slugFor("Rivera & Sons, CPAs!")).toBe("rivera-sons-cpas");
  });
});

describe("partner sign-up with approval", () => {
  it("waits for approval, then signs in limited to its own firm", async () => {
    const r = await signup(app, "pat@rivera-cpa.test", "Rivera CPA");
    expect(r.statusCode).toBe(202);
    expect(r.json()).toEqual({ status: "verify_email", approvalRequired: true });

    // First the email is confirmed, then the platform approves.
    const unconfirmed = await signIn("pat@rivera-cpa.test");
    expect(unconfirmed.statusCode).toBe(403);
    expect(unconfirmed.json().status).toBe("unverified");
    expect((await confirmEmail(app, "pat@rivera-cpa.test")).json()).toEqual({ ok: true, status: "pending" });
    const early = await signIn("pat@rivera-cpa.test");
    expect(early.statusCode).toBe(403);
    expect(early.json().status).toBe("pending");

    // The platform tenant sees the request; another tenant doesn't.
    const list = await app.inject({ method: "GET", url: "/v1/partner-signups", headers: as("k1") });
    const req = list.json().signups.find((s: { email: string }) => s.email === "pat@rivera-cpa.test");
    expect(req.status).toBe("pending");
    expect(JSON.stringify(list.json())).not.toContain("scrypt");
    expect((await app.inject({ method: "GET", url: "/v1/partner-signups", headers: as("k2") })).json().signups).toHaveLength(0);
    expect((await app.inject({ method: "POST", url: `/v1/partner-signups/${req.id}/decision`, headers: as("k2"), payload: { action: "approve" } })).statusCode).toBe(404);

    const ok = await app.inject({ method: "POST", url: `/v1/partner-signups/${req.id}/decision`, headers: as("k1"), payload: { action: "approve" } });
    expect(ok.statusCode).toBe(200);
    const firm = ok.json().user.clientCompanyId;
    expect(firm).toBe("firm-rivera-cpa");
    expect((await store.getClientCompany(firm))?.portal?.slug).toBe("rivera-cpa");

    const s = await signIn("pat@rivera-cpa.test");
    expect(s.statusCode).toBe(200);
    const key = s.json().sessionKey as string;
    expect(key).toMatch(/^kfs_/);
    expect(s.json().user.kind).toBe("partner");

    // Own firm: yes. Tenant-wide or other firms: no.
    expect((await app.inject({ method: "GET", url: `/v1/client-companies/${firm}`, headers: as(key) })).statusCode).toBe(200);
    expect((await app.inject({ method: "GET", url: "/v1/client-companies/acme-cpa", headers: as(key) })).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: "/v1/client-companies", headers: as(key) })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: "/v1/api-keys", headers: as(key) })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: "/v1/usage", headers: as(key) })).statusCode).toBe(403);
    expect((await app.inject({ method: "PUT", url: `/v1/client-companies/${firm}`, headers: as(key), payload: { name: "x" } })).statusCode).toBe(403);
    expect((await app.inject({ method: "GET", url: "/v1/partner-signups", headers: as(key) })).statusCode).toBe(403);

    // Filings list is forced to the firm; another firm's filing is not found.
    const other = await app.inject({ method: "POST", url: "/v1/filings", headers: as("k1"), payload: njFormationRequest() });
    expect([200, 201]).toContain(other.statusCode);
    const otherId = other.json().filing.id;
    const mine = await app.inject({ method: "GET", url: "/v1/filings", headers: as(key) });
    expect(mine.statusCode).toBe(200);
    expect(mine.json().filings.every((f: { clientCompanyId: string }) => f.clientCompanyId === firm)).toBe(true);
    expect((await app.inject({ method: "GET", url: "/v1/filings?clientCompanyId=acme-cpa", headers: as(key) })).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: `/v1/filings/${otherId}`, headers: as(key) })).statusCode).toBe(404);
    expect((await app.inject({ method: "POST", url: "/v1/filings", headers: as(key), payload: njFormationRequest() })).statusCode).toBe(404);

    // Profile, brand and payment routing.
    const prof = await app.inject({ method: "PUT", url: `/v1/client-companies/${firm}/profile`, headers: as(key), payload: {
      partner: { phone: "212-555-0100", setupDone: ["details"] }, brand: { displayName: "Rivera CPA", primaryColor: "#123456" }, paymentRouting: { mode: "single" },
    } });
    expect(prof.statusCode).toBe(200);
    expect(prof.json().clientCompany.portal.primaryColor).toBe("#123456");
    expect((await app.inject({ method: "PUT", url: `/v1/client-companies/${firm}/profile`, headers: as(key), payload: { paymentRouting: { defaultMethodId: "nope" } } })).statusCode).toBe(422);
    expect((await app.inject({ method: "PUT", url: "/v1/client-companies/acme-cpa/profile", headers: as(key), payload: { name: "Taken" } })).statusCode).toBe(404);

    // Me, and sign out everywhere ends the key.
    expect((await app.inject({ method: "GET", url: "/v1/me", headers: as(key) })).json().user.email).toBe("pat@rivera-cpa.test");
    expect((await app.inject({ method: "POST", url: "/v1/auth/sign-out-everywhere", headers: as(key) })).statusCode).toBe(200);
    expect((await app.inject({ method: "GET", url: "/v1/me", headers: as(key) })).statusCode).toBe(401);
  });

  it("answers the same for an email that already has an account", async () => {
    const r = await signup(app, "pat@rivera-cpa.test", "Someone Else");
    expect(r.statusCode).toBe(202);
    expect(r.json()).toEqual({ status: "verify_email", approvalRequired: true });
  });

  it("refuses weak passwords and bad input", async () => {
    const r = await app.inject({ method: "POST", url: "/v1/signups/partner", payload: { companyName: "X Co", companyType: "cpa", name: "Al B", email: "al@x.test", password: "short" } });
    expect(r.statusCode).toBe(422);
    expect((await app.inject({ method: "POST", url: "/v1/signups/partner", payload: { email: "nope" } })).statusCode).toBe(422);
  });

  it("opens as soon as the email is confirmed in automatic mode", async () => {
    const r = await signup(auto, "dana@ledger.test", "Ledger Payroll");
    expect(r.statusCode).toBe(202);
    expect(r.json()).toEqual({ status: "verify_email", approvalRequired: false });
    const before = await auto.inject({ method: "POST", url: "/v1/auth/sign-in", payload: { email: "dana@ledger.test", password: PW } });
    expect(before.json().status).toBe("unverified");
    expect((await confirmEmail(auto, "dana@ledger.test")).json()).toEqual({ ok: true, status: "active" });
    const s = await auto.inject({ method: "POST", url: "/v1/auth/sign-in", payload: { email: "dana@ledger.test", password: PW } });
    expect(s.statusCode).toBe(200);
  });

  it("refuses a confirmation link that was altered, and sends a new one on request", async () => {
    await signup(auto, "sam@numbers.test", "Numbers LLC");
    const link = [...outbox].reverse().find((m) => m.address === "sam@numbers.test")!.msg.link!;
    const token = new URL(link).searchParams.get("token")!;
    const bad = await auto.inject({ method: "POST", url: "/v1/auth/verify-email", payload: { token: `${token.slice(0, -2)}xx` } });
    expect(bad.statusCode).toBe(410);
    const sent = outbox.length;
    expect((await auto.inject({ method: "POST", url: "/v1/auth/verify-email/resend", payload: { email: "sam@numbers.test" } })).statusCode).toBe(202);
    expect(outbox.length).toBe(sent + 1);
    // The old link no longer works; the new one does.
    expect((await auto.inject({ method: "POST", url: "/v1/auth/verify-email", payload: { token } })).statusCode).toBe(410);
    expect((await confirmEmail(auto, "sam@numbers.test")).json().status).toBe("active");
    // Nothing to resend once confirmed, and the same answer for unknown emails.
    expect((await auto.inject({ method: "POST", url: "/v1/auth/verify-email/resend", payload: { email: "sam@numbers.test" } })).statusCode).toBe(202);
    expect((await auto.inject({ method: "POST", url: "/v1/auth/verify-email/resend", payload: { email: "who@nowhere.test" } })).statusCode).toBe(202);
    expect(outbox.length).toBe(sent + 1);
  });

  it("rejects a request", async () => {
    await signup(app, "no@nope.test", "Nope LLC");
    const req = (await app.inject({ method: "GET", url: "/v1/partner-signups", headers: as("k1") })).json().signups.find((s: { email: string }) => s.email === "no@nope.test");
    const r = await app.inject({ method: "POST", url: `/v1/partner-signups/${req.id}/decision`, headers: as("k1"), payload: { action: "reject" } });
    expect(r.json().user.status).toBe("rejected");
    expect((await signIn("no@nope.test")).statusCode).toBe(403);
  });
});

describe("enterprise accounts", () => {
  it("are created by staff only, sign in to their tenant, and add their own team", async () => {
    const body = { email: "ops@acme-filings.test", name: "Ops Lead", password: PW };
    expect((await app.inject({ method: "POST", url: "/v1/tenants/other-co/users", headers: as("k2"), payload: body })).statusCode).toBe(403);
    const made = await app.inject({ method: "POST", url: "/v1/tenants/other-co/users", headers: as("staff-key-0123456789abcdef"), payload: body });
    expect(made.statusCode).toBe(201);
    const s = await signIn("ops@acme-filings.test");
    expect(s.statusCode).toBe(200);
    const key = s.json().sessionKey;
    const acct = await app.inject({ method: "GET", url: "/v1/account", headers: as(key) });
    expect(acct.json().tenantId).toBe("other-co");
    expect((await app.inject({ method: "GET", url: "/v1/api-keys", headers: as(key) })).statusCode).toBe(200);
    const team = await app.inject({ method: "POST", url: "/v1/users", headers: as(key), payload: { email: "two@acme-filings.test", name: "Second Person", password: PW } });
    expect(team.statusCode).toBe(201);
    expect((await app.inject({ method: "GET", url: "/v1/users", headers: as(key) })).json().users).toHaveLength(2);
  });

  it("locks an account after five wrong passwords", async () => {
    for (let i = 0; i < 5; i++) expect((await signIn("ops@acme-filings.test", "wrong password number")).statusCode).toBe(401);
    expect((await signIn("ops@acme-filings.test")).statusCode).toBe(429);
  });

  it("takes contact requests and shows them only to the platform", async () => {
    const r = await app.inject({ method: "POST", url: "/v1/inquiries", payload: { name: "Sam Q", company: "Big Filings", email: "sam@big.test", volume: "250 to 1,000" } });
    expect(r.statusCode).toBe(202);
    expect((await app.inject({ method: "GET", url: "/v1/inquiries", headers: as("k1") })).json().inquiries[0].company).toBe("Big Filings");
    expect((await app.inject({ method: "GET", url: "/v1/inquiries", headers: as("k2") })).statusCode).toBe(403);
    // Bots that fill the hidden field get a quiet yes and nothing is stored.
    await app.inject({ method: "POST", url: "/v1/inquiries", payload: { name: "Bot", company: "Bot Co", email: "b@b.test", website: "x" } });
    expect((await app.inject({ method: "GET", url: "/v1/inquiries", headers: as("k1") })).json().inquiries).toHaveLength(1);
  });

  it("sets portal defaults and checks them against the portal", async () => {
    const ok = await app.inject({ method: "PUT", url: "/v1/account/portal-defaults/ny-dos", headers: as("k1"), payload: { plainCopy: true, expedite: "24 HOUR" } });
    expect(ok.statusCode).toBe(200);
    expect((await app.inject({ method: "PUT", url: "/v1/account/portal-defaults/ny-dos", headers: as("k1"), payload: { expedite: "1 MINUTE" } })).statusCode).toBe(422);
    expect((await app.inject({ method: "PUT", url: "/v1/account/portal-defaults/nowhere", headers: as("k1"), payload: {} })).statusCode).toBe(422);
    const setup = await app.inject({ method: "GET", url: "/v1/account/setup", headers: as("k1") });
    expect(setup.json().portalDefaults["ny-dos"].expedite).toBe("24 HOUR");
  });
});

describe("payment routing", () => {
  const p = PaymentSettings.parse({
    methods: [
      { id: "ops", label: "Ops card", provider: "vault", providerRef: "tok_ops", last4: "4242" },
      { id: "backup", label: "Backup", provider: "vault", providerRef: "tok_backup" },
      { id: "ny", label: "NY card", provider: "vault", providerRef: "tok_ny" },
      { id: "plan", label: "Plan", provider: "vault", providerRef: "tok_plan", purpose: "subscription" },
    ],
    routing: { mode: "per_filing", defaultMethodId: "ops", fallbackMethodId: "backup", byFilingKind: { "ny-llc": "ny" }, subscriptionMethodId: "plan" },
  });
  it("picks the filing's card, then the fallback", () => {
    expect(stateFeeCards(p, "ny-llc").map((m) => m.id)).toEqual(["ny", "backup"]);
    expect(stateFeeCards(p, "nj-llc").map((m) => m.id)).toEqual(["ops", "backup"]);
  });
  it("never accepts a card number as a token, or a subscription card for state fees", () => {
    expect(PaymentSettings.safeParse({ methods: [{ id: "x", label: "x", provider: "v", providerRef: "4242 4242 4242 4242" }] }).success).toBe(false);
    expect(PaymentSettings.safeParse({ methods: p.methods, routing: { defaultMethodId: "plan" } }).success).toBe(false);
  });
});
