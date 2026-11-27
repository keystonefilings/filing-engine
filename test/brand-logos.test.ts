import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { logoType, MAX_LOGO_BYTES } from "../src/api/brand-logos.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";
import type { OutboundMessage } from "../src/comms/senders.js";

const mail: OutboundMessage[] = [];

let app: FastifyInstance;
let store: Awaited<ReturnType<typeof seededStore>>;
const PW = "correct horse battery staple";
const as = (key: string) => ({ "x-api-key": key });

/** A real 1x1 PNG. */
const PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==", "base64");

beforeAll(async () => {
  store = await seededStore();
  const w = wire(store);
  app = buildServer({
    service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test",
    apiKeys: { k1: "keystone", k2: "other-co" }, sessionSecret: "session-secret-for-tests-0123456789", platformTenantId: "keystone", partnerSignupMode: "automatic",
    email: { channel: "email", async send(_to, msg) { mail.push(msg); return { ok: true }; } }, webBaseUrl: "http://web.test",
  });
  await app.ready();
});
afterAll(async () => { await app.close(); });

describe("portal address", () => {
  it("is made from the firm's name when the portal is saved without one, and kept after", async () => {
    const put = (id: string, body: object) => app.inject({ method: "PUT", url: `/v1/client-companies/${id}`, headers: as("k1"), payload: body });
    const a = await put("smith-one", { name: "Smith & Co CPA", portal: { displayName: "Smith" } });
    expect(a.statusCode).toBe(200);
    expect(a.json().portalSlug).toBe("smith-co-cpa");
    // A second firm with the same name gets the next free address.
    const b = await put("smith-two", { name: "Smith & Co CPA", portal: {} });
    expect(b.json().portalSlug).toBe("smith-co-cpa-2");
    // Saving again (even under a new name) keeps the address the firm has.
    const again = await put("smith-one", { name: "Smith Partners", portal: { displayName: "Smith Partners" } });
    expect(again.json().portalSlug).toBe("smith-co-cpa");
    expect((await store.getClientCompany("smith-one"))?.portal?.slug).toBe("smith-co-cpa");
  });
});

describe("uploaded logos", () => {
  it("tells pictures apart by their bytes", () => {
    expect(logoType(PNG)).toBe("image/png");
    expect(logoType(Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0, 0]))).toBe("image/jpeg");
    expect(logoType(Buffer.from("<svg xmlns='http://www.w3.org/2000/svg'><script>alert(1)</script></svg>"))).toBeNull();
  });

  it("stores a firm's logo, shows it to anyone, and lets the firm remove it", async () => {
    const up = await app.inject({ method: "PUT", url: "/v1/client-companies/acme-cpa/logo", headers: as("k1"), payload: { data: `data:image/png;base64,${PNG.toString("base64")}` } });
    expect(up.statusCode).toBe(200);
    const id = up.json().logoArtifactId as string;
    const saved = await store.getClientCompany("acme-cpa");
    expect(saved?.portal?.logoArtifactId).toBe(id);
    expect(saved?.portal?.slug).toBeTruthy();

    const view = await app.inject({ method: "GET", url: `/v1/brand-logos/${id}` });
    expect(view.statusCode).toBe(200);
    expect(view.headers["content-type"]).toBe("image/png");
    expect(view.headers["content-security-policy"]).toContain("default-src 'none'");
    expect(view.rawPayload.equals(PNG)).toBe(true);

    // Logos only: the same address never serves a filing's documents.
    const doc = await new FsArtifactStore("var/test-artifacts").put({ filingId: "f-1", kind: "filing_receipt", label: "Receipt", contentType: "image/png" }, PNG);
    expect((await app.inject({ method: "GET", url: `/v1/brand-logos/${doc.id}` })).statusCode).toBe(404);

    const del = await app.inject({ method: "DELETE", url: "/v1/client-companies/acme-cpa/logo", headers: as("k1") });
    expect(del.statusCode).toBe(200);
    expect((await store.getClientCompany("acme-cpa"))?.portal?.logoArtifactId).toBeUndefined();
  });

  it("refuses SVG, oversized files, other tenants and no key", async () => {
    const svg = Buffer.from("<svg xmlns='http://www.w3.org/2000/svg'/>").toString("base64");
    expect((await app.inject({ method: "PUT", url: "/v1/client-companies/acme-cpa/logo", headers: as("k1"), payload: { data: svg } })).statusCode).toBe(422);
    const big = Buffer.concat([PNG, Buffer.alloc(MAX_LOGO_BYTES)]).toString("base64");
    expect((await app.inject({ method: "PUT", url: "/v1/client-companies/acme-cpa/logo", headers: as("k1"), payload: { data: big } })).statusCode).toBe(422);
    expect((await app.inject({ method: "PUT", url: "/v1/client-companies/acme-cpa/logo", headers: as("k2"), payload: { data: PNG.toString("base64") } })).statusCode).toBe(404);
    expect((await app.inject({ method: "PUT", url: "/v1/client-companies/acme-cpa/logo", payload: { data: PNG.toString("base64") } })).statusCode).toBe(401);
  });

  it("lets a partner change only its own firm's logo", async () => {
    const r = await app.inject({ method: "POST", url: "/v1/signups/partner", payload: { companyName: "Logo Test CPA", companyType: "cpa", name: "Lee Park", email: "lee@logo-test.test", password: PW, states: ["NY"] } });
    expect(r.statusCode).toBe(201); // automatic mode: open and signed in at once
    const key = r.json().sessionKey as string;
    const firm = "firm-logo-test-cpa";
    expect((await app.inject({ method: "PUT", url: `/v1/client-companies/${firm}/logo`, headers: as(key), payload: { data: PNG.toString("base64") } })).statusCode).toBe(200);
    expect((await app.inject({ method: "PUT", url: "/v1/client-companies/acme-cpa/logo", headers: as(key), payload: { data: PNG.toString("base64") } })).statusCode).toBe(404);
    // Two brand colors, and a typed logo link replaces the uploaded one.
    const prof = await app.inject({ method: "PUT", url: `/v1/client-companies/${firm}/profile`, headers: as(key), payload: { brand: { primaryColor: "#112233", secondaryColor: "#445566", logoUrl: "https://logo-test.test/logo.png" } } });
    expect(prof.statusCode).toBe(200);
    const p = prof.json().clientCompany.portal;
    expect(p.secondaryColor).toBe("#445566");
    expect(p.logoUrl).toBe("https://logo-test.test/logo.png");
    expect(p.logoArtifactId).toBeUndefined();
  });
});

describe("the firm approves its own clients' filings from its filing desk (Nov 26)", () => {
  it("lets a partner approve its own filing, gets the proof itself, and can't touch another firm's", async () => {
    const r = await app.inject({ method: "POST", url: "/v1/signups/partner", payload: { companyName: "Approve Test CPA", companyType: "cpa", name: "Kim Lee", email: "kim@approve-test.test", password: PW, states: ["NJ"] } });
    expect(r.statusCode).toBe(201);
    const key = r.json().sessionKey as string;
    const firm = "firm-approve-test-cpa";
    const created = await app.inject({ method: "POST", url: "/v1/filings", headers: as(key), payload: { ...njFormationRequest(), tenantId: "keystone", clientCompanyId: firm, contact: { firstName: "Ana", lastName: "Ortiz", phone: "2015550100", email: "ana@bakery.test" }, dryRun: true } });
    expect(created.statusCode).toBeLessThan(300);
    const filing = created.json().filing;
    expect(filing.status).toBe("awaiting_approval");
    const approval = (await store.getApproval(filing.currentApprovalId))!;
    expect(approval.recipients.map((x) => x.address)).toEqual(["kim@approve-test.test"]); // the firm, not ana@
    // Another firm's filing: not found. Its own: approved.
    const other = await app.inject({ method: "POST", url: "/v1/filings", headers: as("k1"), payload: njFormationRequest() });
    expect((await app.inject({ method: "POST", url: `/v1/filings/${other.json().filing.id}/approval`, headers: as(key), payload: { decision: "approve", approvedBy: "Kim Lee" } })).statusCode).toBe(404);
    const ok = await app.inject({ method: "POST", url: `/v1/filings/${filing.id}/approval`, headers: as(key), payload: { decision: "approve", approvedBy: "Kim Lee" } });
    expect(ok.statusCode).toBe(200);
    expect(["approved", "queued"]).toContain(ok.json().filing.status);
  });
});
