import { readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import type { FilingRequest } from "../domain/filing.js";

/**
 * Partner firm pricing (Nov 26): pay as you go, or a plan with filings included each month. The
 * figures live in config/partner-pricing.json. Only live filings submitted to a state or the IRS
 * count; practice filings never do. A formation's EIN is part of the formation.
 */
export const UnitKind = z.enum(["filing", "ein_only", "record"]);
export type UnitKind = z.infer<typeof UnitKind>;

export const PartnerPlan = z.object({
  id: z.string().regex(/^[a-z0-9_-]{1,30}$/),
  name: z.string().min(1),
  monthlyUsd: z.number().nonnegative(),
  annualUsd: z.number().nonnegative().optional(),
  /** Filings included each month (0 for pay as you go). */
  included: z.number().nonnegative(),
  /** Price of each filing beyond what's included; unset for pay as you go. */
  extraUsd: z.number().nonnegative().optional(),
  fairUse: z.boolean().optional(),
  priorityHelp: z.boolean().optional(),
  blurb: z.string().optional(),
});
export type PartnerPlan = z.infer<typeof PartnerPlan>;

export const PartnerPricing = z.object({
  payAsYouGo: z.object({ filing: z.number().nonnegative(), ein_only: z.number().nonnegative(), record: z.number().nonnegative() }),
  units: z.object({ filing: z.number().positive(), ein_only: z.number().positive(), record: z.number().positive() }),
  rolloverMonths: z.number().int().min(0).max(12).default(1),
  annualMonthsFree: z.number().int().min(0).max(12).default(2),
  plans: z.array(PartnerPlan).min(1),
});
export type PartnerPricing = z.infer<typeof PartnerPricing>;

let cached: PartnerPricing | null = null;
export function loadPartnerPricing(file = path.resolve(process.env.PARTNER_PRICING_PATH ?? "config/partner-pricing.json")): PartnerPricing {
  if (!cached) cached = PartnerPricing.parse(JSON.parse(readFileSync(file, "utf8")));
  return cached;
}

/** What a live filing counts as: a filing, a standalone EIN, or a record (copies, certificates); null when it isn't billed. */
export function unitKindOf(req: Pick<FilingRequest, "type" | "intake">): UnitKind | null {
  // An EIN applied for after its formation was accepted is part of that formation (Florida).
  if ((req.intake as { einForFilingId?: string } | undefined)?.einForFilingId) return null;
  if (req.type === "ein_only") return "ein_only";
  if (req.type === "copy_request" || req.type === "standing_certificate") return "record";
  return "filing";
}

export const UNIT_LABEL: Record<UnitKind, string> = { filing: "filing", ein_only: "standalone EIN", record: "copy or certificate" };

const round2 = (n: number) => Math.round(n * 100) / 100;
const round4 = (n: number) => Math.round(n * 10_000) / 10_000;

/** The plan a Stripe price stands for, read from STRIPE_PARTNER_PRICES ("starter=price_..,starter_annual=price_.."). */
export function parsePriceMap(raw: string | undefined): Record<string, string> {
  const out: Record<string, string> = {};
  for (const part of (raw ?? "").split(",").map((s) => s.trim()).filter(Boolean)) {
    const [k, v] = part.split("=").map((s) => s.trim());
    if (k && v) out[k] = v;
  }
  return out;
}
export function planForPrice(priceId: string | undefined, prices: Record<string, string>, pricing: PartnerPricing): { plan: PartnerPlan; annual: boolean } | null {
  if (!priceId) return null;
  const key = Object.entries(prices).find(([, v]) => v === priceId)?.[0];
  if (!key) return null;
  const annual = key.endsWith("_annual");
  const plan = pricing.plans.find((p) => p.id === (annual ? key.slice(0, -"_annual".length) : key));
  return plan ? { plan, annual } : null;
}

/**
 * The monthly window `now` falls in, counted from the subscription's start (annual plans count by
 * month too). A start on the 31st falls on the last day of shorter months, as Stripe does.
 */
export function monthWindow(anchorIso: string, now: Date, back = 0): { start: Date; end: Date } {
  const a = new Date(anchorIso);
  const at = (m: number) => {
    const y = a.getUTCFullYear() + Math.floor((a.getUTCMonth() + m) / 12), mo = (((a.getUTCMonth() + m) % 12) + 12) % 12;
    const day = Math.min(a.getUTCDate(), new Date(Date.UTC(y, mo + 1, 0)).getUTCDate());
    return new Date(Date.UTC(y, mo, day, a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds()));
  };
  let m = (now.getUTCFullYear() - a.getUTCFullYear()) * 12 + (now.getUTCMonth() - a.getUTCMonth());
  if (now.getTime() < at(m).getTime()) m -= 1;
  if (now.getTime() >= at(m + 1).getTime()) m += 1;
  return { start: at(m - back), end: at(m - back + 1) };
}

export interface UsageEntry { filingId: string; at: string; kind: UnitKind; units: number; chargedUsd: number; plan: string; invoiceItemId?: string; note?: string }

/**
 * This month's allowance: the plan's filings plus what last month left unused (one month's rollover
 * at most). usedLastMonth is null when the firm wasn't on this plan last month: nothing rolls over.
 */
export function allowanceFor(plan: PartnerPlan, usedLastMonth: number | null, pricing: PartnerPricing): { included: number; rolledOver: number; allowance: number } {
  const rolledOver = pricing.rolloverMonths > 0 && usedLastMonth !== null ? Math.max(0, round4(plan.included - usedLastMonth)) : 0;
  return { included: plan.included, rolledOver: Math.min(rolledOver, plan.included), allowance: round4(plan.included + Math.min(rolledOver, plan.included)) };
}

/** What one more live filing costs: pay-as-you-go price, or the part of it past the allowance at the plan's extra rate. */
export function chargeFor(plan: PartnerPlan, kind: UnitKind, usedThisMonth: number, allowance: number, pricing: PartnerPricing): { units: number; overUnits: number; chargedUsd: number } {
  const units = pricing.units[kind];
  if (plan.included === 0 || plan.extraUsd === undefined) return { units, overUnits: units, chargedUsd: pricing.payAsYouGo[kind] };
  const before = Math.max(0, round4(usedThisMonth - allowance));
  const after = Math.max(0, round4(usedThisMonth + units - allowance));
  const overUnits = round4(after - before);
  return { units, overUnits, chargedUsd: round2(overUnits * plan.extraUsd) };
}

export const sumUnits = (entries: UsageEntry[], start: Date, end: Date) =>
  round4(entries.filter((e) => { const t = Date.parse(e.at); return t >= start.getTime() && t < end.getTime(); }).reduce((s, e) => s + e.units, 0));
