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
