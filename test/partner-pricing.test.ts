import { describe, expect, it } from "vitest";
import { BillingService } from "../src/billing/service.js";
import { StripeClient } from "../src/billing/stripe.js";
import { allowanceFor, chargeFor, loadPartnerPricing, monthWindow, parsePriceMap, planForPrice, unitKindOf } from "../src/billing/pricing.js";
import { ClientCompanySettings, TenantSettings } from "../src/settings/schema.js";
import { MemoryStore } from "../src/store/memory.js";
import type { FilingRecord } from "../src/store/types.js";

/** Partner pricing (Nov 26): pay as you go, or a plan with filings included each month. */

const pricing = loadPartnerPricing();
const plan = (id: string) => pricing.plans.find((p) => p.id === id)!;

describe("the pricing rules", () => {
  it("counts a formation (its EIN included), a standalone EIN as half, a copy or certificate as a third", () => {
    expect(unitKindOf({ type: "formation" } as never)).toBe("filing");
    expect(unitKindOf({ type: "payroll_registration" } as never)).toBe("filing");
    expect(unitKindOf({ type: "ein_only" } as never)).toBe("ein_only");
    expect(unitKindOf({ type: "ein_only", intake: { einForFilingId: "f1" } } as never)).toBeNull(); // Florida's EIN after acceptance: part of the formation
    expect(unitKindOf({ type: "copy_request" } as never)).toBe("record");
    expect(unitKindOf({ type: "standing_certificate" } as never)).toBe("record");
    expect(pricing.units).toMatchObject({ filing: 1, ein_only: 0.5 });
  });

  it("prices pay as you go per filing, and a plan's extras only past the month's allowance", () => {
    const payg = plan("payg"), starter = plan("starter");
    expect(chargeFor(payg, "filing", 0, 0, pricing).chargedUsd).toBe(45);
    expect(chargeFor(payg, "ein_only", 0, 0, pricing).chargedUsd).toBe(25);
    expect(chargeFor(payg, "record", 0, 0, pricing).chargedUsd).toBe(15);
    expect(chargeFor(starter, "filing", 5, 6, pricing).chargedUsd).toBe(0); // the 6th is included
    expect(chargeFor(starter, "filing", 6, 6, pricing).chargedUsd).toBe(40); // the 7th is an extra
    expect(chargeFor(starter, "filing", 5.5, 6, pricing).chargedUsd).toBe(20); // half of it past the allowance
    expect(chargeFor(starter, "record", 6, 6, pricing).chargedUsd).toBe(13.33);
    expect(chargeFor(plan("unlimited"), "filing", 60, 60, pricing).chargedUsd).toBe(15); // fair use
  });

  it("rolls last month's unused filings into this month, one month's worth at most", () => {
    expect(allowanceFor(plan("starter"), 4, pricing)).toEqual({ included: 6, rolledOver: 2, allowance: 8 });
    expect(allowanceFor(plan("starter"), 0, pricing)).toEqual({ included: 6, rolledOver: 6, allowance: 12 });
    expect(allowanceFor(plan("starter"), 9, pricing).rolledOver).toBe(0);
    expect(allowanceFor(plan("starter"), null, pricing)).toEqual({ included: 6, rolledOver: 0, allowance: 6 }); // not on the plan last month
  });

  it("counts months from the subscription's start, and a start on the 31st ends on shorter months' last day", () => {
    const w = monthWindow("2026-01-31T10:00:00Z", new Date("2026-03-05T00:00:00Z"));
    expect(w.start.toISOString()).toBe("2026-02-28T10:00:00.000Z");
    expect(w.end.toISOString()).toBe("2026-03-31T10:00:00.000Z");
    expect(monthWindow("2026-01-31T10:00:00Z", new Date("2026-03-05T00:00:00Z"), 1).start.toISOString()).toBe("2026-01-31T10:00:00.000Z");
    expect(monthWindow("2026-11-15T00:00:00Z", new Date("2026-11-15T00:00:00Z")).start.toISOString()).toBe("2026-11-15T00:00:00.000Z");
  });

  it("knows each plan by its Stripe price, monthly or annual", () => {
    const prices = parsePriceMap("payg=price_p, starter=price_s,starter_annual=price_sa ,growth=price_g");
    expect(planForPrice("price_sa", prices, pricing)).toMatchObject({ plan: { id: "starter" }, annual: true });
    expect(planForPrice("price_g", prices, pricing)).toMatchObject({ plan: { id: "growth" }, annual: false });
    expect(planForPrice("price_other", prices, pricing)).toBeNull();
  });
});

describe("charging a partner firm for its live filings", () => {
  const setup = async (priceId: string) => {
    const store = new MemoryStore();
    const tenant = TenantSettings.parse({ tenantId: "keystone", name: "CoFile" });
    const firm = ClientCompanySettings.parse({ clientCompanyId: "best", tenantId: "keystone", name: "Best Accounting", partner: { companyType: "cpa" } });
    await store.putTenant(tenant); await store.putClientCompany(firm);
    const items: { form: URLSearchParams; key: string | null }[] = [];
    const fetchImpl = (async (url: string, init: { body?: string; headers?: Record<string, string> }) => {
      if (new URL(url).pathname === "/v1/invoiceitems") { items.push({ form: new URLSearchParams(init.body ?? ""), key: init.headers?.["idempotency-key"] ?? null }); return Response.json({ id: `ii_${items.length}` }); }
      return Response.json({ error: { message: "no" } }, { status: 404 });
    }) as unknown as typeof fetch;
    let now = new Date("2026-12-10T12:00:00Z");
    const billing = new BillingService({
      store, stripe: new StripeClient({ secretKey: "rk_test_x", fetchImpl }), prices: {}, required: true, platformTenantId: "keystone", webBaseUrl: "http://web.test",
      partnerPrices: { payg: "price_payg", starter: "price_starter" }, now: () => now,
    });
    await store.putBillingAccount({ id: "firm:best", tenantId: "keystone", clientCompanyId: "best", plan: "partner", status: "active", customerId: "cus_1", priceId, currentPeriodStart: "2026-12-01T00:00:00Z", planSince: "2026-12-01T00:00:00Z", updatedAt: now.toISOString() });
    const filing = (id: string, type = "formation", extra: Record<string, unknown> = {}) => ({ id, tenantId: "keystone", clientCompanyId: "best", request: { type, state: "NY", dryRun: false, ...extra } }) as unknown as FilingRecord;
    return { store, tenant, firm, billing, items, filing, setNow: (d: string) => { now = new Date(d); } };
  };

  it("on Starter, includes six filings a month and bills the seventh at $40, once", async () => {
    const s = await setup("price_starter");
    for (let i = 1; i <= 6; i++) expect((await s.billing.recordLiveFiling(s.filing(`f${i}`), s.tenant, s.firm))!.chargedUsd).toBe(0);
    expect(s.items).toHaveLength(0);
    // The first month on the plan has nothing to roll over from, so the seventh is an extra.
    const extra = await s.billing.recordLiveFiling(s.filing("f7"), s.tenant, s.firm);
    expect(extra!.chargedUsd).toBe(40);
    expect(s.items).toHaveLength(1);
    expect(s.items[0]!.form.get("amount")).toBe("4000");
    expect(s.items[0]!.key).toBe("filing-usage-f7");
    expect(await s.billing.recordLiveFiling(s.filing("f7"), s.tenant, s.firm)).toBeNull(); // never twice
    // Practice filings and Florida's after-acceptance EIN are never counted.
    expect(await s.billing.recordLiveFiling(s.filing("p1", "formation", { dryRun: true }), s.tenant, s.firm)).toBeNull();
    expect(await s.billing.recordLiveFiling(s.filing("e1", "ein_only", { intake: { einForFilingId: "f1" } }), s.tenant, s.firm)).toBeNull();
    const view = await s.billing.summary({ id: "firm:best", tenantId: "keystone", clientCompanyId: "best", plan: "partner" }) as unknown as { currentPlan: { id: string }; month: { used: number; allowance: number; chargedUsd: number } };
    expect(view.currentPlan.id).toBe("starter");
    expect(view.month).toMatchObject({ used: 7, allowance: 6, rolledOver: 0, chargedUsd: 40 });

    // Next month: 7 used last month, so nothing rolls over; a quiet month would have carried its unused filings.
    s.setNow("2027-01-05T12:00:00Z");
    for (let i = 1; i <= 4; i++) await s.billing.recordLiveFiling(s.filing(`j${i}`), s.tenant, s.firm);
    s.setNow("2027-02-03T12:00:00Z");
    const feb = await s.billing.summary({ id: "firm:best", tenantId: "keystone", clientCompanyId: "best", plan: "partner" }) as unknown as { month: { rolledOver: number; allowance: number } };
    expect(feb.month).toMatchObject({ rolledOver: 2, allowance: 8 });
  });

  it("on pay as you go, bills each live filing at its price", async () => {
    const s = await setup("price_payg");
    expect((await s.billing.recordLiveFiling(s.filing("a"), s.tenant, s.firm))!.chargedUsd).toBe(45);
    expect((await s.billing.recordLiveFiling(s.filing("b", "ein_only"), s.tenant, s.firm))!.chargedUsd).toBe(25);
    expect((await s.billing.recordLiveFiling(s.filing("c", "copy_request"), s.tenant, s.firm))!.chargedUsd).toBe(15);
    expect(s.items.map((i) => i.form.get("amount"))).toEqual(["4500", "2500", "1500"]);
  });

  it("never bills an enterprise subscriber's firms this way", async () => {
    const s = await setup("price_payg");
    const ent = TenantSettings.parse({ tenantId: "acme", name: "Acme Filings" });
    const entFirm = ClientCompanySettings.parse({ clientCompanyId: "x", tenantId: "acme", name: "X" });
    expect(await s.billing.recordLiveFiling(s.filing("z"), ent, entFirm)).toBeNull();
  });
});

describe("choosing and switching a partner plan", () => {
  it("opens Checkout for a firm's first plan, and switches an existing subscription in place", async () => {
    const store = new MemoryStore();
    const tenant = TenantSettings.parse({ tenantId: "keystone", name: "CoFile" });
    const firm = ClientCompanySettings.parse({ clientCompanyId: "best", tenantId: "keystone", name: "Best Accounting", partner: { companyType: "cpa" } });
    await store.putTenant(tenant); await store.putClientCompany(firm);
    const calls: { method: string; path: string; form: URLSearchParams }[] = [];
    const fetchImpl = (async (url: string, init: { method?: string; body?: string }) => {
      const path = new URL(url).pathname;
      calls.push({ method: init.method ?? "GET", path, form: new URLSearchParams(init.body ?? "") });
      if (path === "/v1/customers") return Response.json({ id: "cus_1" });
      if (path === "/v1/checkout/sessions") return Response.json({ id: "cs_1", url: "https://checkout.stripe.com/c/pay/cs_1" });
      if (path === "/v1/subscriptions/sub_1" && (init.method ?? "GET") === "GET") return Response.json({ id: "sub_1", items: { data: [{ id: "si_1" }] } });
      if (path === "/v1/subscriptions/sub_1") return Response.json({ id: "sub_1" });
      return Response.json({ error: { message: "no" } }, { status: 404 });
    }) as unknown as typeof fetch;
    const billing = new BillingService({
      store, stripe: new StripeClient({ secretKey: "rk_test_x", fetchImpl }), prices: {}, required: true, platformTenantId: "keystone", webBaseUrl: "http://web.test",
      partnerPrices: { payg: "price_payg", starter: "price_starter", starter_annual: "price_starter_y" },
    });
    const ref = billing.accountFor(tenant, firm)!;
    const url = await billing.checkout(ref, { email: "pat@best.test", name: "Best Accounting" }, "/p/best/billing", { plan: "starter", annual: true });
    expect(url).toContain("checkout.stripe.com");
    expect(calls.find((c) => c.path === "/v1/checkout/sessions")!.form.get("line_items[0][price]")).toBe("price_starter_y");
    await expect(billing.checkout(ref, { email: "pat@best.test", name: "Best" }, "/p/best/billing", { plan: "nope" })).rejects.toThrow();

    await store.putBillingAccount({ ...(await store.getBillingAccount("firm:best"))!, status: "active", subscriptionId: "sub_1", priceId: "price_starter_y" });
    const switched = await billing.checkout(ref, { email: "pat@best.test", name: "Best" }, "/p/best/billing", { plan: "payg" });
    expect(switched).toBe("http://web.test/p/best/billing?switched=1");
    const update = calls.find((c) => c.method === "POST" && c.path === "/v1/subscriptions/sub_1")!;
    expect(update.form.get("items[0][id]")).toBe("si_1");
    expect(update.form.get("items[0][price]")).toBe("price_payg");
    expect(calls.filter((c) => c.path === "/v1/checkout/sessions")).toHaveLength(1); // no second subscription
  });
});
