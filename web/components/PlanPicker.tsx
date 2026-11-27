"use client";

import type { CSSProperties } from "react";
import { useActionState, useState } from "react";
import type { PartnerPricingView } from "@/lib/billing";
import { Chip } from "@/components/ui/Chip";
import { Notice } from "@/components/ui/Sheet";

const usd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n % 1 ? 2 : 0 }).format(n);
const filings = (n: number) => (Math.round(n * 100) / 100).toString();
/** Dates as "Nov 26 to Dec 25, 2026" (10B.1.2), in UTC so the server's and the browser's renders agree. */
const DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
const MONTH_DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
const range = (a: string, b: string) => {
  const s = new Date(a), e = new Date(b);
  return `${s.getUTCFullYear() === e.getUTCFullYear() ? MONTH_DAY.format(s) : DAY.format(s)} to ${DAY.format(e)}`;
};
const pct = (n: number) => `${Math.max(0, Math.min(100, n * 100))}%`;

/**
 * "This month on {plan}" (merged spec 10B.18): the filings used, on a 12 px meter that never turns amber or red: the plan's
 * own filings in Plate Ink, any used past them (into the ones carried over) in Graphite, and a tick where the plan's own
 * end. Going past the plan isn't a warning; the sentence says what it adds to the next invoice.
 */
export function PlanMonth({ view }: { view: Pick<PartnerPricingView, "currentPlan" | "month"> }) {
  const m = view.month;
  if (!view.currentPlan || !m) return null;
  const used = Math.min(m.used, m.allowance);
  const meter = m.allowance > 0 ? {
    "--own": pct(Math.min(used, m.included) / m.allowance),
    "--carried": pct(Math.max(0, used - m.included) / m.allowance),
    "--tick": pct(m.included / m.allowance),
  } as CSSProperties : undefined;
  return (
    <section className="ds2-sheet ds2-month" aria-labelledby="month-title">
      <div className="ds2-month-head">
        <h2 className="ds2-card-title" id="month-title">This month on {view.currentPlan.name}</h2>
        <span className="ds2-dates">{range(m.start, m.end)}</span>
      </div>
      {m.allowance > 0 ? (
        <>
          <div className="ds2-meter" role="img" aria-label={`${filings(m.used)} of ${filings(m.allowance)} filings used`} style={meter}>
            <span className="ds2-meter-own" />
            <span className="ds2-meter-carried" />
            {m.rolledOver ? <span className="ds2-meter-tick" /> : null}
          </div>
          <p className="ds2-month-line">{filings(m.used)} of {filings(m.allowance)} filings used{m.rolledOver ? ` (${filings(m.included)} in the plan, ${filings(m.rolledOver)} carried over from last month)` : ""}.{m.chargedUsd ? ` Extras so far: ${usd(m.chargedUsd)}, on your next invoice.` : ""}</p>
        </>
      ) : <p className="ds2-month-line">{m.filings} live {m.filings === 1 ? "filing" : "filings"} this month: {usd(m.chargedUsd)}, on your next invoice.</p>}
    </section>
  );
}

/**
 * Partner pricing (Nov 26): pay as you go or a plan, monthly or annual. In CoFile's look (10B.18): "Billed" as a
 * two-part segmented control, the plans as four ruled cards with their figures in Miller, the current plan marked by
 * a 2 px Plate Ink rule and "Your plan"; every other plan's button an Outline, a choice among equals.
 */
export function PlanPicker({ view, choose }: { view: PartnerPricingView; choose: (choice: { plan: string; annual: boolean }) => Promise<{ error?: string }> }) {
  const [annual, setAnnual] = useState(view.currentPlan?.annual ?? false);
  const [state, act, pending] = useActionState(async (_: { error?: string }, fd: FormData) => choose({ plan: String(fd.get("plan")), annual: fd.get("annual") === "true" }), {});
  return (
    <div className="ds2-picker">
      <div className="ds2-period" role="radiogroup" aria-label="Billed">
        <label className="ds2-seg"><input type="radio" name="period" checked={!annual} onChange={() => setAnnual(false)} /><span>Monthly</span></label>
        <label className="ds2-seg"><input type="radio" name="period" checked={annual} onChange={() => setAnnual(true)} /><span>Yearly ({view.annualMonthsFree} months free)</span></label>
      </div>
      <div className="ds2-plans">
        {view.partnerPlans.map((p) => {
          const current = view.currentPlan?.id === p.id && view.currentPlan.annual === (annual && p.monthlyUsd > 0);
          const available = annual && p.monthlyUsd > 0 ? p.annualAvailable : p.monthlyAvailable;
          return (
            <form key={p.id} action={act} className={["ds2-plancard", current && "is-current"].filter(Boolean).join(" ")} aria-labelledby={`plan-${p.id}`}>
              <input type="hidden" name="plan" value={p.id} />
              <input type="hidden" name="annual" value={String(annual && p.monthlyUsd > 0)} />
              <div className="ds2-plancard-head"><h3 id={`plan-${p.id}`}>{p.name}</h3>{current ? <Chip tone="quiet" compact>Your plan</Chip> : null}</div>
              <p className="ds2-planprice">
                {p.monthlyUsd === 0 ? <span className="ds2-nofee">No monthly fee</span>
                  : annual && p.annualUsd ? <><span className="ds2-fig">{usd(p.annualUsd)}</span> a year</>
                  : <><span className="ds2-fig">{usd(p.monthlyUsd)}</span> a month</>}
              </p>
              <p className="ds2-blurb">{p.blurb}</p>
              {p.included === 0
                ? <p className="ds2-detail">{usd(view.payAsYouGo.filing)} a filing (a formation&apos;s EIN included), {usd(view.payAsYouGo.ein_only)} a standalone EIN, {usd(view.payAsYouGo.record)} a copy or certificate.</p>
                : <p className="ds2-detail">Past {p.included} a month{p.fairUse ? " (fair use)" : ""}: {usd(p.extraUsd ?? 0)} a filing. Unused filings carry over {view.rolloverMonths === 1 ? "one month" : `${view.rolloverMonths} months`}.{p.priorityHelp ? " Priority help from our team on any filing." : ""}</p>}
              {current ? null : <p className="ds2-planbutton"><button className="btn" type="submit" disabled={pending || !available}>{!available ? "Not available yet" : view.currentPlan ? "Switch to this plan" : "Choose this plan"}</button></p>}
            </form>
          );
        })}
      </div>
      {state.error ? <Notice tone="problem" role="alert">{state.error}</Notice> : null}
      <p className="ds2-small ds2-measure">Only live filings count; rehearsals are always free and never count. A standalone EIN counts as half a filing and a copy or certificate as a third; an EIN applied for with a formation is part of it. You&apos;re never stopped for going past your plan: extras go on your next invoice. State fees and our registered agent service are separate. A filing is charged only once it reaches the state; if one stops on our side, our team finishes it at no extra charge.</p>
    </div>
  );
}
