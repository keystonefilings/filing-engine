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
    expect(page.body).toMatch(/with Keystone/);
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
