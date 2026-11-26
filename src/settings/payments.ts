import { z } from "zod";

/**
 * Saved payment methods and which one pays what. The engine never holds a card number: a method is a
 * reference into the payment vault (Basis Theory, payments/card-vault.ts), plus what the owner needs to
 * tell cards apart. At run time the worker asks the vault for the card and types it into the state's
 * own payment page (NJ, FL) or the NY DOS draw-down deposit page (docs/portal-maps/ny-dos-corporations.md).
 *
 * purpose: state_fees pays government fees; subscription pays the platform (enterprise only).
 */
const CARD_NUMBER_LIKE = /\d[\d -]{11,}\d/;
/** A provider token in UUID form (Basis Theory's): its digit-and-dash runs are not a card number. */
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const PaymentMethodRef = z.object({
  id: z.string().regex(/^[a-z0-9_-]{1,40}$/),
  label: z.string().min(1).max(60),
  /** The vault or card provider that holds the card. */
  provider: z.string().min(1).max(40),
  /** The provider's token for the card. Never a card number. */
  providerRef: z.string().min(1).max(200).refine((v) => UUID.test(v) || !CARD_NUMBER_LIKE.test(v), "must be the provider's token, never a card number"),
  brand: z.string().max(20).optional(),
  last4: z.string().regex(/^\d{4}$/).optional(),
  expMonth: z.number().int().min(1).max(12).optional(),
  expYear: z.number().int().min(2024).max(2100).optional(),
  purpose: z.enum(["state_fees", "subscription"]).default("state_fees"),
});
export type PaymentMethodRef = z.infer<typeof PaymentMethodRef>;

/**
 * Yakov (Nov 26): NJ filing types whose state fees are paid with the payment method saved in the
 * NJ portal account the run signs in with, instead of a card saved with us. Ids are the filing
 * kinds (web/lib/intake ids); "nj-standing" is the standing certificate, filed through the API.
 */
export const NJ_PORTAL_PAYMENT_KINDS = { "nj-llc": "New Jersey LLC formation", "nj-corp": "New Jersey corporation formation", "nj-standing": "New Jersey standing certificate" } as const;
export type NjPortalPaymentKind = keyof typeof NJ_PORTAL_PAYMENT_KINDS;
export const StatePortalPayment = z.object({
  /** What is saved in the NJ account: a card or an eCheck (bank account). */
  method: z.enum(["stored_card", "stored_echeck"]).default("stored_card"),
  kinds: z.array(z.enum(Object.keys(NJ_PORTAL_PAYMENT_KINDS) as [NjPortalPaymentKind, ...NjPortalPaymentKind[]])).max(10).default([]),
});
export type StatePortalPayment = z.infer<typeof StatePortalPayment>;

export const PaymentRouting = z.object({
  /** single: one card pays every filing. per_filing: a card per filing kind, the default card for the rest. */
  mode: z.enum(["single", "per_filing"]).default("single"),
  defaultMethodId: z.string().optional(),
  /** Tried when the first card is declined. */
  fallbackMethodId: z.string().optional(),
  /** Filing kind id (web/lib/intake ids, e.g. "ny-llc") -> method id. Used only in per_filing mode. */
  byFilingKind: z.record(z.string(), z.string()).default({}),
  /** Enterprise only: the card that pays the platform subscription. */
  subscriptionMethodId: z.string().optional(),
  /** Filing types paid with the state portal account's own saved method (NJ only for now). */
  statePortal: z.object({ NJ: StatePortalPayment.optional() }).prefault({}),
});
export type PaymentRouting = z.infer<typeof PaymentRouting>;

export const PaymentSettings = z.object({
  methods: z.array(PaymentMethodRef).max(10).default([]),
  routing: PaymentRouting.prefault({}),
}).superRefine((p, ctx) => {
  const ids = new Set(p.methods.map((m) => m.id));
  if (ids.size !== p.methods.length) ctx.addIssue({ code: "custom", path: ["methods"], message: "each method id may appear once" });
  const fee = new Set(p.methods.filter((m) => m.purpose === "state_fees").map((m) => m.id));
  const check = (id: string | undefined, path: (string | number)[], set: Set<string>, what: string) => {
    if (id && !set.has(id)) ctx.addIssue({ code: "custom", path: ["routing", ...path], message: `${what} is not one of the saved methods` });
  };
  check(p.routing.defaultMethodId, ["defaultMethodId"], fee, "the default card");
  check(p.routing.fallbackMethodId, ["fallbackMethodId"], fee, "the fallback card");
  for (const [kind, id] of Object.entries(p.routing.byFilingKind)) check(id, ["byFilingKind", kind], fee, `the card for ${kind}`);
  const subs = new Set(p.methods.filter((m) => m.purpose === "subscription").map((m) => m.id));
  check(p.routing.subscriptionMethodId, ["subscriptionMethodId"], subs, "the subscription card");
  if (p.routing.fallbackMethodId && p.routing.fallbackMethodId === p.routing.defaultMethodId && p.routing.mode === "single") {
    ctx.addIssue({ code: "custom", path: ["routing", "fallbackMethodId"], message: "the fallback must be a different card" });
  }
});
export type PaymentSettings = z.infer<typeof PaymentSettings>;

/**
 * A filing's kind for routing: the form it came from, or, for a filing sent through the API, the
 * kind its state and type stand for (so per-type routing applies to API filings too).
 */
export function filingKindOf(req: { state: string; type: string; intake?: unknown; formation?: { njEntityType?: string } }): string {
  const k = (req.intake as { portal?: { kind?: string } } | undefined)?.portal?.kind;
  if (k) return k;
  if (req.state === "NJ" && req.type === "formation") return req.formation?.njEntityType && req.formation.njEntityType !== "llc" ? "nj-corp" : "nj-llc";
  if (req.state === "NJ" && req.type === "standing_certificate") return "nj-standing";
  return "";
}

/** The cards to try for a filing's state fees, in order: its own (or the default), then the fallback. */
export function stateFeeCards(p: PaymentSettings | undefined, filingKind: string): PaymentMethodRef[] {
  if (!p) return [];
  const byId = new Map(p.methods.filter((m) => m.purpose === "state_fees").map((m) => [m.id, m]));
  const first = (p.routing.mode === "per_filing" ? p.routing.byFilingKind[filingKind] : undefined) ?? p.routing.defaultMethodId;
  const order = [first, p.routing.fallbackMethodId].filter((id, i, a): id is string => !!id && a.indexOf(id) === i);
  return order.map((id) => byId.get(id)).filter((m): m is PaymentMethodRef => !!m);
}
