import "@/styles/components/pictures.css";
import { PRICING, startingPlan, usd } from "@/lib/pricing";

/** A price with its "$" set at 60%, raised to the figures' cap height (5.4); `hang` hangs it in the margin. */
export function Price({ amount, hang, className }: { amount: string; hang?: boolean; className?: string }) {
  const n = amount.replace(/^\$/, "");
  return <span className={["pprice", hang && "is-hung", className].filter(Boolean).join(" ")}><span className="pprice-sign">$</span>{n}</span>;
}

/**
 * The price card (L8; merged spec 9.8): the copy's four price items printed on heavy card, figures in Miller, dot
 * leaders on a shared baseline. Real prices from web/lib/pricing.ts, so no example label. Nothing moves.
 */
export function PriceCard() {
  const from = startingPlan();
  return (
    <ul className="pcard">
      <li><b><span className="pcard-name">Pay as you go</span></b><span className="pcard-dots" aria-hidden="true" /><span className="pcard-what">per live filing</span></li>
      <li><b><Price amount={usd(PRICING.payAsYouGo.ein_only)} hang /></b><span className="pcard-dots" aria-hidden="true" /><span className="pcard-what">an EIN on its own</span></li>
      <li><b><Price amount={usd(PRICING.payAsYouGo.record)} hang /></b><span className="pcard-dots" aria-hidden="true" /><span className="pcard-what">copies and certificates</span></li>
      <li><b><span className="pcard-name">Plans from</span> <Price amount={usd(from.monthlyUsd)} /></b><span className="pcard-dots" aria-hidden="true" /><span className="pcard-what">a month for {from.included} filings</span></li>
    </ul>
  );
}
