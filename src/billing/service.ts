import type { BillingAccountRecord, Store } from "../store/types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import { StripeClient, verifyStripeSignature } from "./stripe.js";
import type { FilingRecord } from "../store/types.js";
import { allowanceFor, chargeFor, loadPartnerPricing, monthWindow, planForPrice, sumUnits, UNIT_LABEL, unitKindOf, type PartnerPricing, type UsageEntry } from "./pricing.js";

/**
 * V33: what subscribers pay the platform. An enterprise subscriber (a tenant) and a partner firm on
 * the platform each have one subscription, bought on Stripe's own Checkout page and managed on its
 * customer portal; Stripe's webhook keeps the status here. Prices live in Stripe and are named in
 * settings, so changing a price never needs a release.
 *
 * With BILLING_REQUIRED on, a live filing needs a subscription in good standing (practice filings
 * never do). The platform's own filings, and the firms an enterprise subscriber files for, aren't
 * billed here: the subscriber's subscription covers its firms.
 */
export interface BillingOptions {
  store: Store;
  stripe?: StripeClient;
  webhookSecret?: string;
  prices: { enterprise?: string; partner?: string };
  /** Partner pricing (Nov 26): plan id (and plan_annual) -> Stripe price id (STRIPE_PARTNER_PRICES). */
  partnerPrices?: Record<string, string>;
  pricing?: PartnerPricing;
  required: boolean;
  platformTenantId: string;
  webBaseUrl: string;
  trialDays?: number;
  now?: () => Date;
}

export type BillingAccountRef = { id: string; tenantId: string; clientCompanyId?: string; plan: "enterprise" | "partner" };

/** Statuses that may file: paid, in a trial, or a renewal Stripe is still retrying. */
const GOOD = new Set<BillingAccountRecord["status"]>(["active", "trialing", "past_due"]);

export class SubscriptionRequired extends Error {
  constructor(public readonly account: BillingAccountRef, public readonly status: string) {
    super(status === "none" ? "a subscription is needed for live filings (dry runs don't need one)" : `the subscription is ${status.replace(/_/g, " ")}; update it in Billing to file for real`);
  }
}

export class BillingService {
  private readonly now: () => Date;
  private readonly priceCache = new Map<string, { at: number; v: { amount: number | null; currency: string; interval?: string; intervalCount?: number; name?: string } }>();
  constructor(private readonly o: BillingOptions) { this.now = o.now ?? (() => new Date()); }

  get configured(): boolean { return !!this.o.stripe && !!(this.o.prices.enterprise || this.o.prices.partner || this.partnerPlansOn); }
  /** Partner plans are on once their Stripe prices are named. */
  get partnerPlansOn(): boolean { return !!this.o.stripe && Object.keys(this.o.partnerPrices ?? {}).length > 0; }
  private get pricing(): PartnerPricing { return this.o.pricing ?? loadPartnerPricing(); }
  get required(): boolean { return this.o.required; }

  /** Who pays for filings by this firm: the partner firm itself, the enterprise subscriber, or nobody. */
  accountFor(tenant: TenantSettings, client: ClientCompanySettings | null): BillingAccountRef | null {
    if (tenant.tenantId === this.o.platformTenantId) {
      return client?.partner ? { id: `firm:${client.clientCompanyId}`, tenantId: tenant.tenantId, clientCompanyId: client.clientCompanyId, plan: "partner" } : null;
    }
    return { id: `tenant:${tenant.tenantId}`, tenantId: tenant.tenantId, plan: "enterprise" };
  }

  async record(ref: BillingAccountRef): Promise<BillingAccountRecord> {
    return (await this.o.store.getBillingAccount(ref.id)) ?? { ...ref, status: "none", updatedAt: this.now().toISOString() };
  }

  /** Throws SubscriptionRequired when billing is required and this firm's payer isn't in good standing. */
  async assertCanFileLive(tenant: TenantSettings, client: ClientCompanySettings): Promise<void> {
    if (!this.o.required) return;
    const ref = this.accountFor(tenant, client);
    if (!ref) return;
    const rec = await this.record(ref);
    if (!GOOD.has(rec.status)) throw new SubscriptionRequired(ref, rec.status);
  }

  async price(plan: "enterprise" | "partner") {
    const id = this.o.prices[plan];
    if (!id || !this.o.stripe) return null;
    const hit = this.priceCache.get(id);
    if (hit && this.now().getTime() - hit.at < 10 * 60_000) return hit.v;
    const p = await this.o.stripe.getPrice(id);
    const v = { amount: p.unit_amount, currency: p.currency, interval: p.recurring?.interval, intervalCount: p.recurring?.interval_count, name: p.nickname ?? undefined };
    this.priceCache.set(id, { at: this.now().getTime(), v });
    return v;
  }

  /** What the billing page shows. */
  async summary(ref: BillingAccountRef) {
    const rec = await this.record(ref);
    const price = await this.price(ref.plan).catch(() => null);
    const plans = ref.plan === "partner" && this.partnerPlansOn ? this.partnerPlansView(rec) : undefined;
    return {
      plan: ref.plan, status: rec.status, canFileLive: !this.o.required || GOOD.has(rec.status), required: this.o.required,
      configured: this.configured && (!!this.o.prices[ref.plan] || !!plans), price, ...(plans ?? {}),
      currentPeriodEnd: rec.currentPeriodEnd, cancelAtPeriodEnd: rec.cancelAtPeriodEnd ?? false,
      hasCustomer: !!rec.customerId, lastPaymentFailedAt: rec.lastPaymentFailedAt,
    };
  }

  /** Partner pricing on the billing page: every plan, the current one, and this month's filings. */
  private partnerPlansView(rec: BillingAccountRecord) {
    const pricing = this.pricing, prices = this.o.partnerPrices ?? {};
    const current = planForPrice(rec.priceId, prices, pricing);
    const now = this.now();
    let month: { start: string; end: string; used: number; included: number; rolledOver: number; allowance: number; chargedUsd: number; filings: number } | undefined;
    if (current && rec.currentPeriodStart) {
      const w = monthWindow(rec.currentPeriodStart, now), prev = monthWindow(rec.currentPeriodStart, now, 1);
      const usage = rec.usage ?? [];
      const inMonth = usage.filter((u) => Date.parse(u.at) >= w.start.getTime() && Date.parse(u.at) < w.end.getTime());
      const a = allowanceFor(current.plan, this.onPlanThen(rec, prev.start) ? sumUnits(usage, prev.start, prev.end) : null, pricing);
      month = { start: w.start.toISOString(), end: w.end.toISOString(), used: sumUnits(usage, w.start, w.end), ...a, chargedUsd: Math.round(inMonth.reduce((s, u) => s + u.chargedUsd, 0) * 100) / 100, filings: inMonth.length };
    }
    return {
      partnerPlans: pricing.plans.map((p) => ({ ...p, monthlyAvailable: !!prices[p.id], annualAvailable: !!prices[`${p.id}_annual`] })),
      payAsYouGo: pricing.payAsYouGo, units: pricing.units, rolloverMonths: pricing.rolloverMonths, annualMonthsFree: pricing.annualMonthsFree,
      currentPlan: current ? { id: current.plan.id, name: current.plan.name, annual: current.annual } : null,
      month,
    };
  }

  /**
   * A live filing reached the state (partner pricing, Nov 26): count it, and charge pay as you go or
   * what's past the plan's allowance on the firm's next Stripe invoice. Never blocks a filing; once per filing.
   */
  async recordLiveFiling(filing: FilingRecord, tenant: TenantSettings, client: ClientCompanySettings | null): Promise<UsageEntry | null> {
    if (filing.request.dryRun) return null;
    const ref = this.accountFor(tenant, client);
    if (!ref || ref.plan !== "partner" || !this.partnerPlansOn) return null;
    const kind = unitKindOf(filing.request);
    if (!kind) return null;
    const rec = await this.record(ref);
    if (rec.usage?.some((u) => u.filingId === filing.id)) return null;
    const pricing = this.pricing, now = this.now();
    const current = planForPrice(rec.priceId, this.o.partnerPrices ?? {}, pricing);
    // No plan on file (billing not required): count it at pay-as-you-go prices, uncharged.
    const plan = current?.plan ?? pricing.plans.find((p) => p.included === 0) ?? pricing.plans[0]!;
    const anchor = rec.currentPeriodStart ?? now.toISOString();
    const w = monthWindow(anchor, now), prev = monthWindow(anchor, now, 1);
    const usage = rec.usage ?? [];
    const { allowance } = allowanceFor(plan, current && this.onPlanThen(rec, prev.start) ? sumUnits(usage, prev.start, prev.end) : null, pricing);
    const c = chargeFor(plan, kind, sumUnits(usage, w.start, w.end), allowance, pricing);
    const entry: UsageEntry = { filingId: filing.id, at: now.toISOString(), kind, units: c.units, chargedUsd: c.chargedUsd, plan: plan.id };
    if (c.chargedUsd > 0) {
      if (!this.o.stripe || !rec.customerId || !current) entry.note = "not charged: no plan on file";
      else {
        try {
          const item = await this.o.stripe.invoiceItem({
            customer: rec.customerId, amountCents: Math.round(c.chargedUsd * 100),
            description: `${plan.name}: ${current.plan.included ? `${UNIT_LABEL[kind]} past the month's included filings` : UNIT_LABEL[kind]} (filing ${filing.id.slice(0, 8)})`,
            metadata: { account: ref.id, filingId: filing.id, kind }, idempotencyKey: `filing-usage-${filing.id}`,
          });
          entry.invoiceItemId = item.id;
        } catch (e) {
          entry.note = `charge failed: ${(e as Error).message}`;
        }
      }
    }
    const keepFrom = monthWindow(anchor, now, 3).start.getTime();
    await this.o.store.putBillingAccount({ ...rec, usage: [...usage.filter((u) => Date.parse(u.at) >= keepFrom), entry], updatedAt: now.toISOString() });
    return entry;
  }

  /** Whether the firm was already on its current plan when that month began. */
  private onPlanThen(rec: BillingAccountRecord, monthStart: Date): boolean {
    return !!rec.planSince && Date.parse(rec.planSince) <= monthStart.getTime();
  }

  /** A Stripe Checkout page for the plan; returns its URL. returnPath is a path on the web app. */
  async checkout(ref: BillingAccountRef, who: { email: string; name: string }, returnPath: string, choice?: { plan?: string; annual?: boolean }): Promise<string> {
    const stripe = this.o.stripe;
    const price = ref.plan === "partner" && this.partnerPlansOn
      ? (choice?.plan ? (this.o.partnerPrices ?? {})[`${choice.plan}${choice.annual ? "_annual" : ""}`] : undefined)
      : this.o.prices[ref.plan];
    if (!stripe || !price) throw new Error("billing is not set up");
    let rec = await this.record(ref);
    // Already on a plan: switch the subscription in place, never a second one billing alongside it.
    if (ref.plan === "partner" && rec.subscriptionId && GOOD.has(rec.status)) {
      if (rec.priceId !== price) await stripe.changeSubscriptionPrice(rec.subscriptionId, price);
      return `${this.o.webBaseUrl}${returnPath}?switched=1`;
    }
    if (!rec.customerId) {
      const c = await stripe.createCustomer({ email: who.email, name: who.name, account: ref.id });
      rec = await this.o.store.putBillingAccount({ ...rec, customerId: c.id, updatedAt: this.now().toISOString() });
    }
    const back = `${this.o.webBaseUrl}${returnPath}`;
    const s = await stripe.checkout({ customer: rec.customerId!, price, account: ref.id, successUrl: `${back}?subscribed=1`, cancelUrl: back, trialDays: this.o.trialDays });
    return s.url;
  }

  /**
   * Decided Nov 27: a partner firm manages its subscription from its own account. Cancelling ends the
   * plan when the paid period runs out (Stripe's cancel_at_period_end); until then it can be kept again.
   * Returns null when there is no subscription to change.
   */
  async setCancelAtPeriodEnd(ref: BillingAccountRef, cancel: boolean): Promise<BillingAccountRecord | null> {
    const rec = await this.record(ref);
    if (!this.o.stripe || !rec.subscriptionId || !GOOD.has(rec.status)) return null;
    const sub = await this.o.stripe.setCancelAtPeriodEnd(rec.subscriptionId, cancel);
    return this.o.store.putBillingAccount({
      ...rec, cancelAtPeriodEnd: typeof sub.cancel_at_period_end === "boolean" ? sub.cancel_at_period_end : cancel,
      ...(typeof sub.current_period_end === "number" ? { currentPeriodEnd: new Date(sub.current_period_end * 1000).toISOString() } : {}),
      updatedAt: this.now().toISOString(),
    });
  }

  /** Stripe's customer portal: change card, see invoices, cancel. */
  async portal(ref: BillingAccountRef, returnPath: string): Promise<string | null> {
    const rec = await this.record(ref);
    if (!this.o.stripe || !rec.customerId) return null;
    return (await this.o.stripe.portal({ customer: rec.customerId, returnUrl: `${this.o.webBaseUrl}${returnPath}` })).url;
  }

  /**
   * Stripe's webhook. Verifies the signature over the raw body, then applies subscription changes.
   * Returns false for a bad signature; unknown events are accepted and ignored.
   */
  async handleWebhook(rawBody: string, signature: string | undefined): Promise<boolean> {
    if (!this.o.webhookSecret || !verifyStripeSignature(this.o.webhookSecret, signature, rawBody, Math.floor(this.now().getTime() / 1000))) return false;
    const ev = JSON.parse(rawBody) as { type: string; created: number; data: { object: Record<string, any> } };
    const obj = ev.data.object;
    switch (ev.type) {
      case "checkout.session.completed": {
        if (obj.mode !== "subscription") break;
        const rec = await this.find(obj.metadata?.account ?? obj.client_reference_id, obj.customer);
        if (rec) await this.o.store.putBillingAccount({ ...rec, customerId: obj.customer ?? rec.customerId, subscriptionId: obj.subscription ?? rec.subscriptionId, ...(rec.status === "none" ? { status: "incomplete" as const } : {}), updatedAt: this.now().toISOString() });
        break;
      }
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
      case "customer.subscription.paused":
      case "customer.subscription.resumed": {
        const rec = await this.find(obj.metadata?.account, obj.customer);
        if (!rec || (rec.lastEventAt && ev.created < rec.lastEventAt)) break;
        // A second subscription on the same account: the newest event wins, by design of one plan each.
        const item = obj.items?.data?.[0];
        const end = obj.current_period_end ?? item?.current_period_end;
        const start = obj.current_period_start ?? item?.current_period_start;
        await this.o.store.putBillingAccount({
          ...rec, customerId: obj.customer ?? rec.customerId, subscriptionId: obj.id,
          status: ev.type === "customer.subscription.deleted" ? "canceled" : (obj.status as BillingAccountRecord["status"]),
          priceId: item?.price?.id ?? rec.priceId,
          currentPeriodEnd: typeof end === "number" ? new Date(end * 1000).toISOString() : rec.currentPeriodEnd,
          currentPeriodStart: typeof start === "number" ? new Date(start * 1000).toISOString() : rec.currentPeriodStart,
          planSince: item?.price?.id && item.price.id !== rec.priceId ? (typeof start === "number" ? new Date(start * 1000).toISOString() : this.now().toISOString()) : rec.planSince ?? (typeof start === "number" ? new Date(start * 1000).toISOString() : undefined),
          cancelAtPeriodEnd: !!obj.cancel_at_period_end, lastEventAt: ev.created, updatedAt: this.now().toISOString(),
        });
        break;
      }
      case "invoice.payment_failed": {
        const rec = await this.find(obj.subscription_details?.metadata?.account ?? obj.parent?.subscription_details?.metadata?.account, obj.customer);
        if (rec) await this.o.store.putBillingAccount({ ...rec, lastPaymentFailedAt: this.now().toISOString(), updatedAt: this.now().toISOString() });
        break;
      }
      case "invoice.paid": {
        const rec = await this.find(undefined, obj.customer);
        if (rec?.lastPaymentFailedAt) await this.o.store.putBillingAccount({ ...rec, lastPaymentFailedAt: undefined, updatedAt: this.now().toISOString() });
        break;
      }
    }
    return true;
  }

  /** The account a Stripe object belongs to: by the account named in its metadata, else by customer. */
  private async find(account: unknown, customer: unknown): Promise<BillingAccountRecord | null> {
    if (typeof account === "string") {
      const m = /^(tenant|firm):(.+)$/.exec(account);
      if (m) {
        const got = await this.o.store.getBillingAccount(account);
        if (got) return got;
        if (m[1] === "tenant") return { id: account, tenantId: m[2]!, plan: "enterprise", status: "none", updatedAt: this.now().toISOString() };
        const firm = await this.o.store.getClientCompany(m[2]!);
        if (firm) return { id: account, tenantId: firm.tenantId, clientCompanyId: firm.clientCompanyId, plan: "partner", status: "none", updatedAt: this.now().toISOString() };
      }
    }
    return typeof customer === "string" ? this.o.store.getBillingAccountByCustomer(customer) : null;
  }
}
