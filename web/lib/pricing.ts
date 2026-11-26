/**
 * Partner firm pricing as the public site shows it (owner, Nov 26: publish prices on the site). The
 * engine charges from config/partner-pricing.json; pricing.test.ts fails if these figures drift from it.
 */
export interface PublicPlan {
  id: string;
  name: string;
  monthlyUsd: number;
  annualUsd?: number;
  included: number;
  extraUsd?: number;
  fairUse?: boolean;
  priorityHelp?: boolean;
}

export const PRICING = {
  payAsYouGo: { filing: 45, ein_only: 25, record: 15 },
  units: { filing: 1, ein_only: 0.5, record: 1 / 3 },
  rolloverMonths: 1,
  annualMonthsFree: 2,
  plans: [
    { id: "payg", name: "Pay as you go", monthlyUsd: 0, included: 0 },
    { id: "starter", name: "Starter", monthlyUsd: 250, annualUsd: 2500, included: 6, extraUsd: 40 },
    { id: "growth", name: "Growth", monthlyUsd: 500, annualUsd: 5000, included: 15, extraUsd: 33 },
    { id: "unlimited", name: "Unlimited", monthlyUsd: 1000, annualUsd: 10000, included: 60, extraUsd: 15, fairUse: true, priorityHelp: true },
  ] as PublicPlan[],
};

export const usd = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

/** The lowest monthly plan, for "plans from" lines. */
export function startingPlan(): PublicPlan {
  return PRICING.plans.filter((p) => p.monthlyUsd > 0).sort((a, b) => a.monthlyUsd - b.monthlyUsd)[0]!;
}
