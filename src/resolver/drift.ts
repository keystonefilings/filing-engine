import { createHash } from "node:crypto";
import { normalizeLabel, type PageInventory, type PageSnapshot, type PriceItem, type SnapshotField } from "./types.js";

/**
 * Drift detection (decision 6). A snapshot keeps only structure: label, kind,
 * required flag, option labels, prices. Ids, names, order and layout are cosmetic
 * and never trigger a halt. Any structural difference does.
 */
export function snapshotFromInventory(site: string, screenKey: string, inv: PageInventory): PageSnapshot {
  const fields: SnapshotField[] = inv.fields
    .filter((f) => f.visible && f.kind !== "hidden")
    .map((f) => ({
      label: normalizeLabel(f.label),
      kind: f.kind,
      required: f.required,
      options: f.options ? f.options.map((o) => normalizeLabel(o.label)).filter(Boolean) : undefined,
    }))
    .sort((a, b) => (a.label + a.kind).localeCompare(b.label + b.kind));
  const prices = [...inv.prices]
    .map((p) => ({ label: normalizeLabel(p.label), amountUsd: p.amountUsd }))
    .sort((a, b) => a.label.localeCompare(b.label) || a.amountUsd - b.amountUsd);
  const fingerprint = createHash("sha256").update(JSON.stringify({ fields, prices })).digest("hex");
  return { site, screenKey, fields, prices, takenAt: new Date().toISOString(), fingerprint };
}

export interface DriftDiff {
  added: SnapshotField[];
  removed: SnapshotField[];
  requiredChanged: { label: string; kind: string; from: boolean; to: boolean }[];
  optionsChanged: { label: string; kind: string; added: string[]; removed: string[] }[];
  pricesChanged: { label: string; from?: number; to?: number }[];
  substantive: boolean;
}

const key = (f: SnapshotField) => `${f.kind}|${f.label}`;

export function diffSnapshots(prev: PageSnapshot, cur: PageSnapshot): DriftDiff {
  const pm = new Map(prev.fields.map((f) => [key(f), f]));
  const cm = new Map(cur.fields.map((f) => [key(f), f]));
  const diff: DriftDiff = { added: [], removed: [], requiredChanged: [], optionsChanged: [], pricesChanged: [], substantive: false };

  for (const [k, f] of cm) if (!pm.has(k)) diff.added.push(f);
  for (const [k, f] of pm) if (!cm.has(k)) diff.removed.push(f);
  for (const [k, c] of cm) {
    const p = pm.get(k);
    if (!p) continue;
    if (p.required !== c.required) diff.requiredChanged.push({ label: c.label, kind: c.kind, from: p.required, to: c.required });
    if (p.options || c.options) {
      const po = new Set(p.options ?? []), co = new Set(c.options ?? []);
      const added = [...co].filter((o) => !po.has(o));
      const removed = [...po].filter((o) => !co.has(o));
      if (added.length || removed.length) diff.optionsChanged.push({ label: c.label, kind: c.kind, added, removed });
    }
  }
  // Prices compare as multisets per label: NJ's fee table repeats one label ("Formation")
  // for the statutory fee and each service fee, so a plain label->amount map would collapse them.
  const byLabel = (items: PriceItem[]) => {
    const m = new Map<string, number[]>();
    for (const p of items) m.set(p.label, [...(m.get(p.label) ?? []), p.amountUsd].sort((a, b) => a - b));
    return m;
  };
  const pp = byLabel(prev.prices);
  const cp = byLabel(cur.prices);
  for (const label of new Set([...pp.keys(), ...cp.keys()])) {
    const before = [...(pp.get(label) ?? [])];
    const after = [...(cp.get(label) ?? [])];
    for (const a of [...after]) {
      const i = before.indexOf(a);
      if (i >= 0) { before.splice(i, 1); after.splice(after.indexOf(a), 1); }
    }
    const n = Math.max(before.length, after.length);
    for (let i = 0; i < n; i++) diff.pricesChanged.push({ label, from: before[i], to: after[i] });
  }

  diff.substantive =
    diff.added.length + diff.removed.length + diff.requiredChanged.length + diff.optionsChanged.length + diff.pricesChanged.length > 0;
  return diff;
}

export function describeDiff(d: DriftDiff): string {
  const parts: string[] = [];
  if (d.added.length) parts.push(`new fields: ${d.added.map((f) => `"${f.label}"${f.required ? " (required)" : ""}`).join(", ")}`);
  if (d.removed.length) parts.push(`removed fields: ${d.removed.map((f) => `"${f.label}"`).join(", ")}`);
  if (d.requiredChanged.length) parts.push(`required flag changed: ${d.requiredChanged.map((c) => `"${c.label}" ${c.from}->${c.to}`).join(", ")}`);
  if (d.optionsChanged.length) parts.push(`options changed: ${d.optionsChanged.map((c) => `"${c.label}" +[${c.added.join("|")}] -[${c.removed.join("|")}]`).join(", ")}`);
  if (d.pricesChanged.length) parts.push(`prices changed: ${d.pricesChanged.map((c) => `"${c.label}" ${c.from ?? "none"}->${c.to ?? "none"}`).join(", ")}`);
  return parts.join("; ") || "no structural change";
}

export type { PriceItem };
