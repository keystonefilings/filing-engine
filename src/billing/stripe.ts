import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * V33: subscriptions through Stripe Billing. Plain HTTPS against Stripe's API (form-encoded, like
 * their own libraries send), so nothing else to install. Prices are created in Stripe and named in
 * settings (STRIPE_PRICE_ENTERPRISE, STRIPE_PRICE_PARTNER).
 */
export interface StripeOptions { secretKey: string; apiUrl?: string; fetchImpl?: typeof fetch }

function form(data: Record<string, string | number | undefined>): string {
  return Object.entries(data).filter(([, v]) => v !== undefined).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`).join("&");
}

export class StripeClient {
  private readonly fetchImpl: typeof fetch;
  constructor(private readonly opts: StripeOptions) { this.fetchImpl = opts.fetchImpl ?? fetch; }

  private async post<T>(path: string, data: Record<string, string | number | undefined>): Promise<T> {
    const res = await this.fetchImpl(`${this.opts.apiUrl ?? "https://api.stripe.com"}${path}`, {
      method: "POST",
      headers: { authorization: `Bearer ${this.opts.secretKey}`, "content-type": "application/x-www-form-urlencoded" },
      body: form(data), signal: AbortSignal.timeout(20_000),
    });
    const body = (await res.json().catch(() => ({}))) as T & { error?: { message?: string } };
    if (!res.ok) throw new Error(`stripe ${res.status}: ${body.error?.message ?? "error"}`);
    return body;
  }

  private async get<T>(path: string): Promise<T> {
    const res = await this.fetchImpl(`${this.opts.apiUrl ?? "https://api.stripe.com"}${path}`, {
      headers: { authorization: `Bearer ${this.opts.secretKey}` }, signal: AbortSignal.timeout(20_000),
    });
    const body = (await res.json().catch(() => ({}))) as T & { error?: { message?: string } };
    if (!res.ok) throw new Error(`stripe ${res.status}: ${body.error?.message ?? "error"}`);
    return body;
  }

  async getPrice(id: string): Promise<{ id: string; unit_amount: number | null; currency: string; recurring?: { interval: string; interval_count: number } | null; nickname?: string | null }> {
    return this.get(`/v1/prices/${encodeURIComponent(id)}`);
  }

  async createCustomer(c: { email: string; name: string; account: string }): Promise<{ id: string }> {
    return this.post("/v1/customers", { email: c.email, name: c.name, "metadata[account]": c.account });
  }

  /** A Checkout page for one subscription; the account goes in metadata so the webhook knows whose it is. */
  async checkout(s: { customer: string; price: string; account: string; successUrl: string; cancelUrl: string; trialDays?: number }): Promise<{ id: string; url: string }> {
    return this.post("/v1/checkout/sessions", {
      mode: "subscription", customer: s.customer, "line_items[0][price]": s.price, "line_items[0][quantity]": 1,
      success_url: s.successUrl, cancel_url: s.cancelUrl, client_reference_id: s.account,
      "subscription_data[metadata][account]": s.account, "metadata[account]": s.account,
      ...(s.trialDays ? { "subscription_data[trial_period_days]": s.trialDays } : {}),
      allow_promotion_codes: "true",
    });
  }

  /** Stripe's own page to change the card, see invoices or cancel. */
  async portal(p: { customer: string; returnUrl: string }): Promise<{ url: string }> {
    return this.post("/v1/billing_portal/sessions", { customer: p.customer, return_url: p.returnUrl });
  }
}

/** Stripe's webhook signature: Stripe-Signature "t=<unix>,v1=<hex HMAC-SHA256 of `${t}.${rawBody}`>". */
export function verifyStripeSignature(secret: string, header: string | undefined, rawBody: string, nowSec = Math.floor(Date.now() / 1000), tolerance = 300): boolean {
  if (!header) return false;
  const parts = header.split(",").map((p) => p.split("=")) as [string, string][];
  const t = Number(parts.find(([k]) => k === "t")?.[1]);
  if (!Number.isFinite(t) || Math.abs(nowSec - t) > tolerance) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(`${t}.${rawBody}`).digest("hex"));
  return parts.filter(([k]) => k === "v1").some(([, v]) => { const got = Buffer.from(v); return got.length === expected.length && timingSafeEqual(got, expected); });
}
