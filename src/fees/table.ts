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
  state: "NY" | "NJ",
  type: string,
  opts: { paymentMethod?: string; certificateOfStanding?: boolean; certifiedCopy?: boolean; entityType?: string } = {},
  table: FeeTable = loadFeeTable(),
): FeeLine[] {
  const entry = table[state]?.[type] as Record<string, any> | null | undefined;
  if (!entry) throw new FeeUnknownError(`No fee table entry for ${state}/${type}; read it on the walk first`);
  const lines: FeeLine[] = [];
  if (entry.statutory) lines.push({ label: entry.statutory.label, amountUsd: entry.statutory.amountUsd });
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
  return lines;
}

export function totalUsd(lines: FeeLine[]): number {
  return Math.round(lines.reduce((s, l) => s + l.amountUsd, 0) * 100) / 100;
}

export interface FeeCheck {
  ok: boolean;
  reason?: string;
  expectedTotal: number;
  liveTotal?: number;
  missing: FeeLine[];
  unexpected: PriceItem[];
}

/**
 * Compares what the payment screen shows against the approved fee lines. Every
 * expected amount must appear on the page; any live total above the cap fails.
 */
export function checkLiveFees(expected: FeeLine[], live: PriceItem[], capUsd?: number): FeeCheck {
  const liveAmounts = live.map((p) => p.amountUsd);
  const missing = expected.filter((e) => !liveAmounts.includes(e.amountUsd));
  const expectedAmounts = new Set(expected.map((e) => e.amountUsd));
  const expectedTotal = totalUsd(expected);
  // Only a line labelled as a total ("Total", "Cart Total"); table headers that merely contain
  // the word (NJ cart: "Description Statutory Fee Portal Admin Fee Total ...") do not count.
  const totals = live.filter((p) => /(^|\s)((cart|grand|order|amount) )?total( due)?$/.test(normalizeLabel(p.label)));
  const totalLine = totals.length ? totals.reduce((a, b) => (b.amountUsd > a.amountUsd ? b : a)) : undefined;
  const liveTotal = totalLine?.amountUsd;
  const unexpected = live.filter(
    (p) => !expectedAmounts.has(p.amountUsd) && p.amountUsd !== liveTotal && p.amountUsd !== expectedTotal && p.amountUsd > 0,
  );
  const result: FeeCheck = { ok: true, expectedTotal, liveTotal, missing, unexpected };
  if (missing.length) { result.ok = false; result.reason = `expected fee lines not shown: ${missing.map((m) => `${m.label} $${m.amountUsd}`).join(", ")}`; }
  if (liveTotal !== undefined && Math.abs(liveTotal - expectedTotal) > 0.005) {
    result.ok = false; result.reason = `live total $${liveTotal} differs from approved total $${expectedTotal}`;
  }
  if (capUsd !== undefined && liveTotal !== undefined && liveTotal > capUsd + 0.005) {
    result.ok = false; result.reason = `live total $${liveTotal} exceeds approved cap $${capUsd}`;
  }
  return result;
}
