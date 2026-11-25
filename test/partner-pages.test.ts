import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import type { ChannelSender, OutboundMessage } from "../src/comms/senders.js";
import { seededStore, wire } from "./helpers.js";

/** V19: a partner firm's address is also its public pages' address (keystonefilings.com/<address>/<service>). */

const PW = "correct horse battery staple";
const mail: OutboundMessage[] = [];
const email: ChannelSender = { channel: "email", async send(_to, msg) { mail.push(msg); return { ok: true }; } };
let app: FastifyInstance;
let store: Awaited<ReturnType<typeof seededStore>>;

beforeAll(async () => {
  store = await seededStore();
  const w = wire(store);
  app = buildServer({
    service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test",
    apiKeys: { k1: "keystone" }, sessionSecret: "session-secret-for-tests-0123456789", platformTenantId: "keystone", partnerSignupMode: "automatic",
    email, webBaseUrl: "http://web.test",
  });
  await app.ready();
});
afterAll(async () => { await app.close(); });

async function partner(companyName: string, address: string) {
  await app.inject({ method: "POST", url: "/v1/signups/partner", payload: { companyName, companyType: "cpa", name: "Pat Rivera", email: address, password: PW } });
  const token = new URL([...mail].reverse().find((m) => m.subject === "Confirm your email")!.link!).searchParams.get("token");
  await app.inject({ method: "POST", url: "/v1/auth/verify-email", payload: { token } });
  const s = (await app.inject({ method: "POST", url: "/v1/auth/sign-in", payload: { email: address, password: PW } })).json();
  return { key: s.sessionKey as string, firm: s.user.clientCompanyId as string };
}
const profile = (key: string, firm: string, brand: Record<string, unknown>) =>
  app.inject({ method: "PUT", url: `/v1/client-companies/${firm}/profile`, headers: { "x-api-key": key }, payload: { brand } });

describe("partner addresses (V19)", () => {
  it("never gives a firm an address the site uses", async () => {
    const { firm } = await partner("Docs", "lee@docs.test");
    expect((await store.getClientCompany(firm))!.portal!.slug).toBe("docs-2");
  });

  it("lets a firm choose its address, refusing reserved and taken ones", async () => {
    const a = await partner("Best Accounting", "pat@best.test");
    const b = await partner("Other Books", "kim@other.test");
    expect((await profile(a.key, a.firm, { slug: "login" })).statusCode).toBe(422);
    expect((await profile(a.key, a.firm, { slug: "Not Valid!" })).statusCode).toBe(422);
    const ok = await profile(a.key, a.firm, { slug: "bestaccounting" });
    expect(ok.statusCode).toBe(200);
    expect(ok.json().clientCompany.portal.slug).toBe("bestaccounting");
    expect((await profile(b.key, b.firm, { slug: "bestaccounting" })).statusCode).toBe(409);
    // Saving other branding keeps the chosen address.
    expect((await profile(a.key, a.firm, { primaryColor: "#112233" })).json().clientCompany.portal.slug).toBe("bestaccounting");
  });
});

describe("approval page in the firm's brand (V20)", () => {
  it("shows the partner firm's name, logo and color, co-branded with the platform", async () => {
    const { key, firm } = await partner("Rivera Tax", "ana@rivera-tax.test");
    await profile(key, firm, { displayName: "Rivera Tax & Books", logoUrl: "https://rivera-tax.test/logo.png", primaryColor: "#7a1f5c", supportEmail: "help@rivera-tax.test" });
    const { njFormationRequest } = await import("./helpers.js");
    const r = await app.inject({ method: "POST", url: "/v1/filings", headers: { "x-api-key": key }, payload: njFormationRequest({ clientCompanyId: firm }) });
    const link = r.json().approvalLink as string;
    const page = await app.inject({ method: "GET", url: new URL(link).pathname });
    expect(page.statusCode).toBe(200);
    expect(page.body).toContain("Rivera Tax &amp; Books");
    expect(page.body).toContain('src="https://rivera-tax.test/logo.png"');
    expect(page.body).toContain("#7a1f5c");
    expect(page.body).toContain("help@rivera-tax.test");
    expect(page.body).toMatch(/with CoFile/);
  });
});

describe("the firm's font (V21)", () => {
  const WOFF2 = Buffer.concat([Buffer.from("wOF2"), Buffer.alloc(60, 1)]);
  it("takes a preset or an uploaded font file, and serves only fonts", async () => {
    const { key, firm } = await partner("Font Firm", "fo@font-firm.test");
    const preset = await profile(key, firm, { font: "lora" });
    expect(preset.json().clientCompany.portal.font).toBe("lora");
    expect((await profile(key, firm, { font: "comic-sans" })).statusCode).toBe(422);
    const bad = await app.inject({ method: "PUT", url: `/v1/client-companies/${firm}/font`, headers: { "x-api-key": key }, payload: { data: Buffer.from("<svg>not a font</svg>").toString("base64") } });
    expect(bad.statusCode).toBe(422);
    const up = await app.inject({ method: "PUT", url: `/v1/client-companies/${firm}/font`, headers: { "x-api-key": key }, payload: { data: WOFF2.toString("base64") } });
    expect(up.statusCode).toBe(200);
    expect(up.json().clientCompany.portal).toMatchObject({ font: "custom", fontArtifactId: up.json().fontArtifactId });
    const served = await app.inject({ method: "GET", url: `/v1/brand-fonts/${up.json().fontArtifactId}` });
    expect(served.statusCode).toBe(200);
    expect(served.headers["content-type"]).toBe("font/woff2");
    // Another firm's key can't change it.
    const other = await partner("Not Font Firm", "nf@not-font.test");
    expect((await app.inject({ method: "PUT", url: `/v1/client-companies/${firm}/font`, headers: { "x-api-key": other.key }, payload: { data: WOFF2.toString("base64") } })).statusCode).toBe(404);
    // The approval page loads it.
    const { njFormationRequest } = await import("./helpers.js");
    const link = (await app.inject({ method: "POST", url: "/v1/filings", headers: { "x-api-key": key }, payload: njFormationRequest({ clientCompanyId: firm }) })).json().approvalLink as string;
    const page = (await app.inject({ method: "GET", url: new URL(link).pathname })).body;
    expect(page).toContain(`/v1/brand-fonts/${up.json().fontArtifactId}`);
    expect(page).toContain('font-family:"FirmFont"');
  });
});

describe("client links: list, turn off, one use (V26)", () => {
  it("records a link, lists it, refuses a second use, and lets the firm turn it off", async () => {
    const { key, firm } = await partner("Link Firm", "li@link-firm.test");
    const base = `/v1/client-companies/${firm}/intake-links`;
    const h = { "x-api-key": key };
    const make = (id: string) => app.inject({ method: "POST", url: base, headers: h, payload: { id, kind: "ny-llc", label: "Sam's LLC", expiresAt: new Date(Date.now() + 86_400_000).toISOString() } });
    expect((await make("AAAAAAAAAAAAAAAA")).statusCode).toBe(201);
    expect((await make("BBBBBBBBBBBBBBBB")).statusCode).toBe(201);
    expect((await make("AAAAAAAAAAAAAAAA")).statusCode).toBe(409);
    const list = (await app.inject({ method: "GET", url: base, headers: h })).json().links;
    expect(list.map((l: { id: string; state: string }) => l.state)).toEqual(["open", "open"]);
    // One use: the same filing again is fine (a retry), another filing is refused.
    expect((await app.inject({ method: "POST", url: `${base}/AAAAAAAAAAAAAAAA/used`, headers: h, payload: { filingId: "f1" } })).json().link.state).toBe("used");
    expect((await app.inject({ method: "POST", url: `${base}/AAAAAAAAAAAAAAAA/used`, headers: h, payload: { filingId: "f1" } })).statusCode).toBe(200);
    expect((await app.inject({ method: "POST", url: `${base}/AAAAAAAAAAAAAAAA/used`, headers: h, payload: { filingId: "f2" } })).statusCode).toBe(409);
    // Turned off: it can no longer be used.
    expect((await app.inject({ method: "POST", url: `${base}/BBBBBBBBBBBBBBBB/revoke`, headers: h })).json().link.state).toBe("revoked");
    expect((await app.inject({ method: "POST", url: `${base}/BBBBBBBBBBBBBBBB/used`, headers: h, payload: { filingId: "f3" } })).statusCode).toBe(409);
    // Another firm can't see or touch them.
    const other = await partner("Other Link Firm", "ol@other-link.test");
    expect((await app.inject({ method: "GET", url: base, headers: { "x-api-key": other.key } })).statusCode).toBe(404);
    expect((await app.inject({ method: "POST", url: `${base}/BBBBBBBBBBBBBBBB/revoke`, headers: { "x-api-key": other.key } })).statusCode).toBe(404);
  });
});

describe("the firm's registered agent per state (V22)", () => {
  it("saves one per state, checks the state, and a filing that names none uses it", async () => {
    const { key, firm } = await partner("Agent Firm", "ag@agent-firm.test");
    const nj = { name: "Garden State Agents", address: { street1: "9 Agent Way", city: "Newark", state: "NJ", zip: "07102" } };
    expect((await app.inject({ method: "PUT", url: `/v1/client-companies/${firm}/profile`, headers: { "x-api-key": key }, payload: { registeredAgents: { NJ: { ...nj, address: { ...nj.address, state: "NY" } } } } })).statusCode).toBe(422);
    const ok = await app.inject({ method: "PUT", url: `/v1/client-companies/${firm}/profile`, headers: { "x-api-key": key }, payload: { registeredAgents: { NJ: nj } } });
    expect(ok.statusCode).toBe(200);
    expect(ok.json().clientCompany.registeredAgentsByState.NJ.name).toBe("Garden State Agents");
    const { RegisteredAgentService } = await import("../src/registered-agents/service.js");
    const { njFormationRequest } = await import("./helpers.js");
    const req = njFormationRequest({ clientCompanyId: firm }) as any;
    delete req.formation.registeredAgent;
    req.formation.registeredAgentChoice = "client_provided";
    const r = await new RegisteredAgentService({ vault: { getCredential: async () => null } }).resolve(req, (await store.getTenant("keystone"))!, (await store.getClientCompany(firm))!);
    expect(r).toMatchObject({ source: "client_provided", agent: { name: "Garden State Agents" } });
    // null removes it.
    const gone = await app.inject({ method: "PUT", url: `/v1/client-companies/${firm}/profile`, headers: { "x-api-key": key }, payload: { registeredAgents: { NJ: null } } });
    expect(gone.json().clientCompany.registeredAgentsByState?.NJ).toBeUndefined();
  });
});

describe("inviting a firm's staff (V36)", () => {
  it("creates their own account limited to that firm, with a link to set a password; no key in any link", async () => {
    const { ClientCompanySettings } = await import("../src/settings/schema.js");
    await store.putClientCompany(ClientCompanySettings.parse({ clientCompanyId: "firm-invite", tenantId: "keystone", name: "Invite Firm", portal: { slug: "invite-firm" } }));
    const r = await app.inject({ method: "POST", url: "/v1/client-companies/firm-invite/staff", headers: { "x-api-key": "k1" }, payload: { email: "jo@invite-firm.test" } });
    expect(r.statusCode).toBe(201);
    expect(r.json().link).toMatch(/^http:\/\/web\.test\/reset-password\?token=/);
    expect(r.json().link).not.toMatch(/k1|kfs_/);
    expect(mail.at(-1)!.subject).toBe("You're invited to Invite Firm's filing portal");
    const token = new URL(r.json().link).searchParams.get("token");
    expect((await app.inject({ method: "POST", url: "/v1/auth/password-reset/confirm", payload: { token, password: PW } })).statusCode).toBe(200);
    const s = (await app.inject({ method: "POST", url: "/v1/auth/sign-in", payload: { email: "jo@invite-firm.test", password: PW } })).json();
    expect(s.user).toMatchObject({ kind: "partner", clientCompanyId: "firm-invite" });
    // Limited to that firm by the engine itself.
    expect((await app.inject({ method: "GET", url: "/v1/client-companies/firm-invite", headers: { "x-api-key": s.sessionKey } })).statusCode).toBe(200);
    expect((await app.inject({ method: "GET", url: "/v1/client-companies/acme-cpa", headers: { "x-api-key": s.sessionKey } })).statusCode).toBe(404);
    expect((await app.inject({ method: "GET", url: "/v1/api-keys", headers: { "x-api-key": s.sessionKey } })).statusCode).toBe(403);
  });
});
