import { readFileSync } from "node:fs";
import path from "node:path";
import { normalizeLabel, type PriceItem } from "../resolver/types.js";

export interface FeeLine { label: string; amountUsd: number }

type FeeTable = Record<string, Record<string, unknown>>;

let cached: FeeTable | null = null;
export function loadFeeTable(file = path.resolve(process.env.FEE_TABLE_PATH ?? "config/fees.json")): FeeTable {
  if (!cached) cached = JSON.parse(readFileSync(file, "utf8")) as FeeTable;
  return cached;
}
export function resetFeeTableCache(): void { cached = null; }

export class FeeUnknownError extends Error {}

/** Expected charges for a filing, or FeeUnknownError when the table has no entry yet. */
export function expectedFees(
  state: "NY" | "NJ" | "MO" | "FL",
  type: string,
  opts: { paymentMethod?: string; certificateOfStanding?: boolean; certifiedCopy?: boolean; plainCopy?: boolean; entityType?: string; floridaEntityType?: string; nyEntityType?: string } = {},
  table: FeeTable = loadFeeTable(),
): FeeLine[] {
  const entry = table[state]?.[type] as Record<string, any> | null | undefined;
  if (!entry) throw new FeeUnknownError(`No fee table entry for ${state}/${type}; read it on the walk first`);
  const lines: FeeLine[] = [];
  // Florida formation is priced by entity type (LLC $125, profit corp $70, LP $1000).
  const flEntity = state === "FL" && type === "formation" && opts.floridaEntityType && opts.floridaEntityType !== "llc"
    ? (entry.entityFees as Record<string, any> | undefined)?.[opts.floridaEntityType]
    : undefined;
  if (flEntity) {
    lines.push({ label: `${flEntity._source ? "" : ""}Florida ${opts.floridaEntityType!.replace(/_/g, " ")} filing fee`, amountUsd: flEntity.statutory });
    const svc2 = opts.paymentMethod ? entry.serviceFee?.[opts.paymentMethod] : undefined;
    if (typeof svc2 === "number" && svc2 > 0) lines.push({ label: `Service fee (${opts.paymentMethod})`, amountUsd: svc2 });
    if (opts.certificateOfStanding && typeof flEntity.certificate_of_status === "number") lines.push({ label: "Certificate of Status", amountUsd: flEntity.certificate_of_status });
    if (opts.certifiedCopy && typeof flEntity.certified_copy === "number") lines.push({ label: "Certified Copy", amountUsd: flEntity.certified_copy });
    return lines;
  }
  // NY formation: an LLC's Articles use the entry's own fee; a business corporation's Certificate of
  // Incorporation is priced under entityFees. Both take the same additional services below.
  const nyEntity = state === "NY" && type === "formation" && opts.nyEntityType && opts.nyEntityType !== "llc"
    ? (entry.entityFees as Record<string, any> | undefined)?.[opts.nyEntityType]
    : undefined;
  if (state === "NY" && type === "formation" && opts.nyEntityType && opts.nyEntityType !== "llc" && !nyEntity) {
    throw new FeeUnknownError(`NY formation price for ${opts.nyEntityType} has not been verified yet`);
  }
  if (nyEntity) lines.push({ label: nyEntity.label, amountUsd: nyEntity.statutory });
  else if (entry.statutory) lines.push({ label: entry.statutory.label, amountUsd: entry.statutory.amountUsd });
  if (entry.byEntityType) {
    // Price depends on the entity's type (NJ standing certificate: LLC $50, corporation $25).
    if (!opts.entityType) throw new FeeUnknownError(`${state}/${type} is priced by entity type; the request must give it`);
    const byType = entry.byEntityType[opts.entityType];
    if (!byType) throw new FeeUnknownError(`${state}/${type} price for entity type ${opts.entityType} has not been verified yet`);
    lines.push({ label: byType.label, amountUsd: byType.amountUsd });
  }
  const method = opts.paymentMethod;
  const svc = method ? entry.serviceFee?.[method] : undefined;
  if (method && entry.serviceFee && (svc === null || svc === undefined)) {
    throw new FeeUnknownError(`Service fee for ${state}/${type} with ${method} not yet recorded`);
  }
  if (typeof svc === "number" && svc > 0) lines.push({ label: `Service fee (${method})`, amountUsd: svc });
  if (opts.certificateOfStanding && entry.certificate_of_standing) {
    const c = entry.certificate_of_standing;
    lines.push({ label: c.label, amountUsd: c.amountUsd });
    const s = method ? c.serviceFee?.[method] : undefined;
    if (typeof s === "number" && s > 0) lines.push({ label: `${c.label} service fee`, amountUsd: s });
  }
  if (opts.certifiedCopy && entry.certified_copy) {
    const c = entry.certified_copy;
    lines.push({ label: c.label, amountUsd: c.amountUsd });
    const s = method ? c.serviceFee?.[method] : undefined;
    if (typeof s === "number" && s > 0) lines.push({ label: `${c.label} service fee`, amountUsd: s });
  }
  if (opts.plainCopy && entry.plain_copy) lines.push({ label: entry.plain_copy.label, amountUsd: entry.plain_copy.amountUsd });
  return lines;
}

export function totalUsd(lines: FeeLine[]): number {
  return Math.round(lines.reduce((s, l) => s + l.amountUsd, 0) * 100) / 100;
}

export interface FeeCheck {
  /** True only when the amount that will be charged is verified against the approval and cap. */
  ok: boolean;
  reason?: string;
  expectedTotal: number;
  liveTotal?: number;
  /** How the charge was verified: a total line on the page, or every charge line reconciled. */
  verifiedBy?: "total" | "lines";
  /** Every approved line is listed (enough for a price-list screen, not for payment). */
  linesListed: boolean;
  missing: FeeLine[];
  unexpected: PriceItem[];
}

const cents = (usd: number) => Math.round(usd * 100);

/**
 * Compares what the payment screen shows against the approved fee lines. Payment is allowed
 * only when the payable amount is verified: a total line equal to the approved total, or, with
 * no total shown, every charge on the page accounted for one-for-one by an approved line. A
 * charge the approval does not cover, with no total to reconcile it, fails. The verified
 * amount must be within the cap.
 */
export function checkLiveFees(expected: FeeLine[], live: PriceItem[], capUsd?: number): FeeCheck {
  const expectedTotal = totalUsd(expected);
  const missing = expected.filter((e) => !live.some((p) => cents(p.amountUsd) === cents(e.amountUsd)));
  // Only a line labelled as a total ("Total", "Cart Total", NY's "TOTAL FEE" / "Total Fees"); table
  // headers that merely contain the word (NJ cart: "Description Statutory Fee Portal Admin Fee Total ...") do not count.
  const totals = live.filter((p) => /(^|\s)((cart|grand|order|amount) )?total( fees?| due)?$/.test(normalizeLabel(p.label)));
  const totalLine = totals.length ? totals.reduce((a, b) => (b.amountUsd > a.amountUsd ? b : a)) : undefined;
  const liveTotal = totalLine?.amountUsd;
  // One-for-one: each approved line accounts for one charge on the page. A line repeating the
  // approved total, or the total line itself, is not a separate charge.
  const pool = expected.filter((e) => e.amountUsd > 0).map((e) => cents(e.amountUsd));
  const unexpected: PriceItem[] = [];
  for (const p of live) {
    if (p.amountUsd <= 0 || p === totalLine) continue;
    const i = pool.indexOf(cents(p.amountUsd));
    if (i >= 0) { pool.splice(i, 1); continue; }
    if (cents(p.amountUsd) === cents(expectedTotal)) continue;
    unexpected.push(p);
  }
  const result: FeeCheck = { ok: false, expectedTotal, liveTotal, linesListed: missing.length === 0, missing, unexpected };
  if (missing.length) {
    result.reason = `expected fee lines not shown: ${missing.map((m) => `${m.label} $${m.amountUsd}`).join(", ")}`;
    return result;
  }
  if (liveTotal !== undefined) {
    if (cents(liveTotal) !== cents(expectedTotal)) {
      result.reason = `live total $${liveTotal} differs from approved total $${expectedTotal}`;
      return result;
    }
    result.verifiedBy = "total";
  } else if (unexpected.length) {
    result.reason = `no payable total shown, and charges not in the approval: ${unexpected.map((u) => `${u.label} $${u.amountUsd}`).join(", ")}`;
    return result;
  } else {
    result.verifiedBy = "lines";
  }
  const payable = liveTotal ?? expectedTotal;
  if (capUsd !== undefined && cents(payable) > cents(capUsd)) {
    result.verifiedBy = undefined;
    result.reason = `payable $${payable} exceeds approved cap $${capUsd}`;
    return result;
  }
  result.ok = true;
  return result;
}
