"use client";

import { useActionState, useState } from "react";
import type { PartnerPricingView } from "@/lib/billing";

const usd = (n: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: n % 1 ? 2 : 0 }).format(n);
const filings = (n: number) => (Math.round(n * 100) / 100).toString();

/** Partner pricing (Nov 26): pay as you go or a plan, monthly or annual, and this month's filings. */
export function PlanPicker({ view, choose }: { view: PartnerPricingView; choose: (choice: { plan: string; annual: boolean }) => Promise<{ error?: string }> }) {
  const [annual, setAnnual] = useState(view.currentPlan?.annual ?? false);
  const [state, act, pending] = useActionState(async (_: { error?: string }, fd: FormData) => choose({ plan: String(fd.get("plan")), annual: fd.get("annual") === "true" }), {});
  const m = view.month;
  return (
    <div className="stack">
      {view.currentPlan && m ? (
        <div className="card stack" style={{ maxWidth: 560 }}>
          <div className="row"><strong>This month on {view.currentPlan.name}</strong><span className="spacer" /><span className="small muted">{new Date(m.start).toLocaleDateString()} to {new Date(m.end).toLocaleDateString()}</span></div>
          {m.allowance > 0 ? (
            <>
              <div aria-label={`${filings(m.used)} of ${filings(m.allowance)} filings used`} style={{ height: 10, borderRadius: 6, background: "var(--surface-2)", overflow: "hidden" }}>
                <div style={{ width: `${Math.min(100, (m.used / m.allowance) * 100)}%`, height: "100%", background: m.used > m.allowance ? "var(--warn)" : "var(--ok)" }} />
              </div>
              <p style={{ margin: 0 }}>{filings(m.used)} of {filings(m.allowance)} filings used{m.rolledOver ? ` (${filings(m.included)} in the plan, ${filings(m.rolledOver)} carried over from last month)` : ""}.{m.chargedUsd ? ` Extras so far: ${usd(m.chargedUsd)}, on your next invoice.` : ""}</p>
            </>
          ) : <p style={{ margin: 0 }}>{m.filings} live {m.filings === 1 ? "filing" : "filings"} this month: {usd(m.chargedUsd)}, on your next invoice.</p>}
        </div>
      ) : null}

      <div className="row" role="radiogroup" aria-label="Billed">
        <label className="choice"><input type="radio" name="period" checked={!annual} onChange={() => setAnnual(false)} /><span>Monthly</span></label>
        <label className="choice"><input type="radio" name="period" checked={annual} onChange={() => setAnnual(true)} /><span>Yearly ({view.annualMonthsFree} months free)</span></label>
      </div>
      <div className="pick" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        {view.partnerPlans.map((p) => {
          const current = view.currentPlan?.id === p.id && view.currentPlan.annual === (annual && p.monthlyUsd > 0);
          const available = annual && p.monthlyUsd > 0 ? p.annualAvailable : p.monthlyAvailable;
          const price = p.monthlyUsd === 0 ? "No monthly fee" : annual && p.annualUsd ? `${usd(p.annualUsd)} a year` : `${usd(p.monthlyUsd)} a month`;
          return (
            <form key={p.id} action={act} className="card stack" style={{ margin: 0 }}>
              <input type="hidden" name="plan" value={p.id} />
              <input type="hidden" name="annual" value={String(annual && p.monthlyUsd > 0)} />
              <div className="row"><strong>{p.name}</strong>{current ? <><span className="spacer" /><span className="badge ok">Your plan</span></> : null}</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 600 }}>{price}</div>
              <p className="small" style={{ margin: 0 }}>{p.blurb}</p>
              {p.included === 0
                ? <p className="small muted" style={{ margin: 0 }}>{usd(view.payAsYouGo.filing)} a filing (a formation&apos;s EIN included), {usd(view.payAsYouGo.ein_only)} a standalone EIN, {usd(view.payAsYouGo.record)} a copy or certificate.</p>
                : <p className="small muted" style={{ margin: 0 }}>Past {p.included} a month{p.fairUse ? " (fair use)" : ""}: {usd(p.extraUsd ?? 0)} a filing. Unused filings carry over {view.rolloverMonths === 1 ? "one month" : `${view.rolloverMonths} months`}.{p.priorityHelp ? " Priority help from our team on any filing." : ""}</p>}
              {current ? null : <button className="btn primary small" type="submit" disabled={pending || !available}>{!available ? "Not available yet" : view.currentPlan ? "Switch to this plan" : "Choose this plan"}</button>}
            </form>
          );
        })}
      </div>
      {state.error ? <p className="notice bad" role="alert">{state.error}</p> : null}
      <p className="help">Only live filings count; rehearsals are always free and never count. A standalone EIN counts as half a filing and a copy or certificate as a third; an EIN applied for with a formation is part of it. You&apos;re never stopped for going past your plan: extras go on your next invoice. State fees and our registered agent service are separate. A filing is charged only once it reaches the state; if one stops on our side, our team finishes it at no extra charge.</p>
    </div>
  );
}
