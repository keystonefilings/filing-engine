import type { BillingAccountRecord, Store } from "../store/types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import { StripeClient, verifyStripeSignature } from "./stripe.js";

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
    super(status === "none" ? "a subscription is needed for live filings (dry runs are free)" : `the subscription is ${status.replace(/_/g, " ")}; update it in Billing to file for real`);
  }
}

export class BillingService {
  private readonly now: () => Date;
  private readonly priceCache = new Map<string, { at: number; v: { amount: number | null; currency: string; interval?: string; intervalCount?: number; name?: string } }>();
  constructor(private readonly o: BillingOptions) { this.now = o.now ?? (() => new Date()); }

  get configured(): boolean { return !!this.o.stripe && !!(this.o.prices.enterprise || this.o.prices.partner); }
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
    return {
      plan: ref.plan, status: rec.status, canFileLive: !this.o.required || GOOD.has(rec.status), required: this.o.required,
      configured: this.configured && !!this.o.prices[ref.plan], price,
      currentPeriodEnd: rec.currentPeriodEnd, cancelAtPeriodEnd: rec.cancelAtPeriodEnd ?? false,
      hasCustomer: !!rec.customerId, lastPaymentFailedAt: rec.lastPaymentFailedAt,
    };
  }

  /** A Stripe Checkout page for the plan; returns its URL. returnPath is a path on the web app. */
  async checkout(ref: BillingAccountRef, who: { email: string; name: string }, returnPath: string): Promise<string> {
    const stripe = this.o.stripe, price = this.o.prices[ref.plan];
    if (!stripe || !price) throw new Error("billing is not set up");
    let rec = await this.record(ref);
    if (!rec.customerId) {
      const c = await stripe.createCustomer({ email: who.email, name: who.name, account: ref.id });
      rec = await this.o.store.putBillingAccount({ ...rec, customerId: c.id, updatedAt: this.now().toISOString() });
    }
    const back = `${this.o.webBaseUrl}${returnPath}`;
    const s = await stripe.checkout({ customer: rec.customerId!, price, account: ref.id, successUrl: `${back}?subscribed=1`, cancelUrl: back, trialDays: this.o.trialDays });
    return s.url;
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
        await this.o.store.putBillingAccount({
          ...rec, customerId: obj.customer ?? rec.customerId, subscriptionId: obj.id,
          status: ev.type === "customer.subscription.deleted" ? "canceled" : (obj.status as BillingAccountRecord["status"]),
          priceId: item?.price?.id ?? rec.priceId,
          currentPeriodEnd: typeof end === "number" ? new Date(end * 1000).toISOString() : rec.currentPeriodEnd,
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
