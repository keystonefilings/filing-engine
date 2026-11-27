import { createHmac } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { BillingService } from "../src/billing/service.js";
import { StripeClient, verifyStripeSignature } from "../src/billing/stripe.js";
import { billingProblems } from "../src/startup-check.js";
import { FilingService } from "../src/orchestrator/service.js";
import type { MemoryStore } from "../src/store/memory.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";

/** V33: subscriptions through Stripe Billing. */

const WHSEC = "whsec_test_secret";
const sign = (body: string, t = Math.floor(Date.now() / 1000)) => `t=${t},v1=${createHmac("sha256", WHSEC).update(`${t}.${body}`).digest("hex")}`;

describe("Stripe webhook signature", () => {
  it("accepts Stripe's signature and refuses a changed body, an old timestamp or another secret", () => {
    const body = JSON.stringify({ id: "evt_1" });
    const now = 1_790_000_000;
    expect(verifyStripeSignature(WHSEC, sign(body, now), body, now)).toBe(true);
    expect(verifyStripeSignature(WHSEC, sign(body, now), body + " ", now)).toBe(false);
    expect(verifyStripeSignature(WHSEC, sign(body, now - 600), body, now)).toBe(false);
    expect(verifyStripeSignature("whsec_other", sign(body, now), body, now)).toBe(false);
    expect(verifyStripeSignature(WHSEC, undefined, body, now)).toBe(false);
  });
});

describe("startup checks", () => {
  it("refuses to require billing that nobody could pay", () => {
    expect(billingProblems({ secretKey: null, prices: {}, required: false })).toEqual([]);
    expect(billingProblems({ secretKey: null, prices: {}, required: true })).toHaveLength(3);
    expect(billingProblems({ secretKey: "rk_test_x", webhookSecret: WHSEC, prices: { partner: "price_1" }, required: true })).toEqual([]);
  });
});

/** A stand-in for Stripe's API: records each call, answers like Stripe. */
function fakeStripe() {
  const calls: { method: string; path: string; form: URLSearchParams }[] = [];
  const fetchImpl = (async (url: string, init: { method?: string; body?: string }) => {
    const path = new URL(url).pathname;
    calls.push({ method: init.method ?? "GET", path, form: new URLSearchParams(init.body ?? "") });
    if (path === "/v1/customers") return Response.json({ id: "cus_123" });
    if (path === "/v1/checkout/sessions") return Response.json({ id: "cs_1", url: "https://checkout.stripe.com/c/pay/cs_1" });
    if (path === "/v1/billing_portal/sessions") return Response.json({ url: "https://billing.stripe.com/p/session/1" });
    if (path.startsWith("/v1/subscriptions/") && init.method === "POST") return Response.json({ id: path.split("/").pop(), cancel_at_period_end: new URLSearchParams(init.body ?? "").get("cancel_at_period_end") === "true", current_period_end: 1_900_000_000 });
    if (path.startsWith("/v1/prices/")) return Response.json({ id: path.split("/").pop(), unit_amount: 9900, currency: "usd", recurring: { interval: "month", interval_count: 1 }, nickname: "Partner" });
    return Response.json({ error: { message: "no" } }, { status: 404 });
  }) as unknown as typeof fetch;
  return { calls, client: new StripeClient({ secretKey: "rk_test_x", fetchImpl }) };
}

let app: FastifyInstance;
let store: MemoryStore;
let service: FilingService;
let stripe: ReturnType<typeof fakeStripe>;
let billing: BillingService;

beforeAll(async () => {
  store = await seededStore();
  // acme-cpa becomes a partner firm on the platform's tenant, with a portal.
  const acme = (await store.getClientCompany("acme-cpa"))!;
  await store.putClientCompany({ ...acme, partner: { companyType: "cpa", contactName: "Pat", contactEmail: "pat@acme.test" } as never, portal: { ...(acme.portal ?? {}), slug: "acme" } as never });
  stripe = fakeStripe();
  billing = new BillingService({ store, stripe: stripe.client, webhookSecret: WHSEC, prices: { partner: "price_partner", enterprise: "price_ent" }, required: true, platformTenantId: "keystone", webBaseUrl: "http://web.test" });
  const w = wire(store, { billing });
  service = w.service;
  app = buildServer({ service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" }, billing });
  await app.ready();
});
afterAll(async () => { await app.close(); });

const hook = (event: object) => {
  const body = JSON.stringify(event);
  return app.inject({ method: "POST", url: "/v1/billing/stripe-webhook", headers: { "content-type": "application/json", "stripe-signature": sign(body) }, payload: body });
};
const createLive = () => app.inject({ method: "POST", url: "/v1/filings", headers: { "x-api-key": "k1" }, payload: njFormationRequest({ dryRun: false }) });

describe("subscribing", () => {
  it("refuses a live filing without a subscription, and always takes a practice one", async () => {
    const r = await createLive();
    expect(r.statusCode).toBe(402);
    expect(r.json().billing).toEqual({ plan: "partner", status: "none" });
    expect((await app.inject({ method: "POST", url: "/v1/filings", headers: { "x-api-key": "k1" }, payload: njFormationRequest({ dryRun: true }) })).statusCode).toBe(201);
  });

  it("shows the plan and price, and sends the firm to Stripe Checkout with its account in the metadata", async () => {
    const s = await app.inject({ method: "GET", url: "/v1/client-companies/acme-cpa/billing", headers: { "x-api-key": "k1" } });
    expect(s.json()).toMatchObject({ billed: true, plan: "partner", status: "none", canFileLive: false, configured: true, price: { amount: 9900, currency: "usd", interval: "month" } });
    const c = await app.inject({ method: "POST", url: "/v1/client-companies/acme-cpa/billing/checkout", headers: { "x-api-key": "k1" } });
    expect(c.json().url).toBe("https://checkout.stripe.com/c/pay/cs_1");
    const session = stripe.calls.find((x) => x.path === "/v1/checkout/sessions")!.form;
    expect(session.get("line_items[0][price]")).toBe("price_partner");
    expect(session.get("subscription_data[metadata][account]")).toBe("firm:acme-cpa");
    expect(session.get("success_url")).toBe("http://web.test/p/acme/billing?subscribed=1");
    expect((await store.getBillingAccount("firm:acme-cpa"))!.customerId).toBe("cus_123");
    // The subscriber's own account isn't billed on the platform's tenant.
    expect((await app.inject({ method: "GET", url: "/v1/account/billing", headers: { "x-api-key": "k1" } })).json()).toMatchObject({ billed: false });
  });

  it("records the subscription from Stripe's webhook, ignores late events, and files once active", async () => {
    expect((await app.inject({ method: "POST", url: "/v1/billing/stripe-webhook", headers: { "content-type": "application/json", "stripe-signature": "t=1,v1=00" }, payload: "{}" })).statusCode).toBe(400);
    const now = Math.floor(Date.now() / 1000);
    const sub = (status: string, created: number) => ({ id: `evt_${created}`, type: "customer.subscription.updated", created, data: { object: { id: "sub_1", customer: "cus_123", status, metadata: { account: "firm:acme-cpa" }, cancel_at_period_end: false, items: { data: [{ price: { id: "price_partner" }, current_period_end: now + 30 * 86400 }] } } } });
    expect((await hook(sub("active", now))).statusCode).toBe(200);
    expect((await hook(sub("incomplete", now - 60))).statusCode).toBe(200); // older: no effect
    const rec = (await store.getBillingAccount("firm:acme-cpa"))!;
    expect(rec).toMatchObject({ status: "active", subscriptionId: "sub_1", priceId: "price_partner" });
    expect(rec.currentPeriodEnd).toBeTruthy();
    expect((await createLive()).statusCode).toBe(201);

    const portal = await app.inject({ method: "POST", url: "/v1/client-companies/acme-cpa/billing/portal", headers: { "x-api-key": "k1" } });
    expect(portal.json().url).toBe("https://billing.stripe.com/p/session/1");

    // Nov 27: the firm cancels its plan from its account (it runs to the period's end), then keeps it after all.
    const cancelled = await app.inject({ method: "POST", url: "/v1/client-companies/acme-cpa/billing/cancel", headers: { "x-api-key": "k1" } });
    expect(cancelled.statusCode).toBe(200);
    expect(cancelled.json()).toMatchObject({ status: "active", cancelAtPeriodEnd: true, canFileLive: true, currentPeriodEnd: new Date(1_900_000_000 * 1000).toISOString() });
    const call = stripe.calls.filter((x) => x.path === "/v1/subscriptions/sub_1" && x.method === "POST").at(-1)!;
    expect(call.form.get("cancel_at_period_end")).toBe("true");
    expect((await createLive()).statusCode).toBe(201); // paid through the period
    const kept = await app.inject({ method: "POST", url: "/v1/client-companies/acme-cpa/billing/resume", headers: { "x-api-key": "k1" } });
    expect(kept.json().cancelAtPeriodEnd).toBe(false);
    expect((await store.getBillingAccount("firm:acme-cpa"))!.cancelAtPeriodEnd).toBe(false);

    // Payment failing keeps filing open while Stripe retries; cancellation closes it.
    await hook({ id: "evt_f", type: "invoice.payment_failed", created: now + 1, data: { object: { customer: "cus_123" } } });
    await hook(sub("past_due", now + 2));
    expect((await store.getBillingAccount("firm:acme-cpa"))!.lastPaymentFailedAt).toBeTruthy();
    expect((await createLive()).statusCode).toBe(201);
    await hook({ ...sub("canceled", now + 3), type: "customer.subscription.deleted" });
    expect((await store.getBillingAccount("firm:acme-cpa"))!.status).toBe("canceled");
    const refused = await createLive();
    expect(refused.statusCode).toBe(402);
    expect(refused.json().error).toMatch(/canceled/);
  });

  it("an enterprise subscriber has its own plan, and covers the firms it files for", async () => {
    await store.putTenant({ ...(await store.getTenant("keystone"))!, tenantId: "acme-filings", name: "Acme Filings" });
    const ent = new BillingService({ store, stripe: stripe.client, webhookSecret: WHSEC, prices: { enterprise: "price_ent" }, required: true, platformTenantId: "keystone", webBaseUrl: "http://web.test" });
    const t = (await store.getTenant("acme-filings"))!;
    const firm = { ...(await store.getClientCompany("acme-cpa"))!, tenantId: "acme-filings", partner: undefined };
    expect(ent.accountFor(t, firm)).toEqual({ id: "tenant:acme-filings", tenantId: "acme-filings", plan: "enterprise" });
    await expect(ent.assertCanFileLive(t, firm)).rejects.toThrow(/subscription is needed/);
    await ent.handleWebhook(JSON.stringify({ id: "e", type: "customer.subscription.created", created: 1, data: { object: { id: "sub_e", customer: "cus_e", status: "trialing", metadata: { account: "tenant:acme-filings" }, items: { data: [] } } } }), sign(JSON.stringify({ id: "e", type: "customer.subscription.created", created: 1, data: { object: { id: "sub_e", customer: "cus_e", status: "trialing", metadata: { account: "tenant:acme-filings" }, items: { data: [] } } } })));
    await expect(ent.assertCanFileLive(t, firm)).resolves.toBeUndefined();
  });
});
