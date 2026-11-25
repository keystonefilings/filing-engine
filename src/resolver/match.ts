import { kindsCompatible, normalizeLabel, type FieldDescriptor, type FieldIntent, type PageInventory } from "./types.js";

export interface MatchResult {
  matched: Map<string, FieldDescriptor>;          // intentKey -> field
  scores: Map<string, number>;
  unmatchedIntents: FieldIntent[];
  unmatchedFields: FieldDescriptor[];               // visible, non-button fields no intent claims
  candidates: Map<string, { field: FieldDescriptor; score: number }[]>; // per intent, ranked
}

function tokens(s: string): Set<string> {
  return new Set(normalizeLabel(s).split(" ").filter((t) => t.length > 1));
}

export function labelScore(intentLabel: string, fieldLabel: string): number {
  const a = normalizeLabel(intentLabel);
  const b = normalizeLabel(fieldLabel);
  if (!a || !b) return 0;
  if (a === b) return 1;
  if (b.startsWith(a) || a.startsWith(b)) return 0.9;
  if (b.includes(a) || a.includes(b)) return 0.8;
  const ta = tokens(a), tb = tokens(b);
  let inter = 0;
  for (const t of ta) if (tb.has(t)) inter++;
  const union = new Set([...ta, ...tb]).size;
  return union ? (inter / union) * 0.85 : 0;
}

export const MATCH_THRESHOLD = 0.6;

/**
 * Matches each intent to at most one live field by label text and kind. Overrides are
 * extra label spellings a reviewer accepted during a drift review (decision 6).
 */
export function matchIntents(
  intents: FieldIntent[],
  inventory: PageInventory,
  overrides: Record<string, string[]> = {},
  knownUnused: string[] = [],
): MatchResult {
  const fields = inventory.fields.filter((f) => f.visible && f.kind !== "hidden");
  const matched = new Map<string, FieldDescriptor>();
  const scores = new Map<string, number>();
  const candidates = new Map<string, { field: FieldDescriptor; score: number }[]>();
  const taken = new Set<string>();

  // Rank all (intent, field) pairs, then assign greedily by score.
  const pairs: { intent: FieldIntent; field: FieldDescriptor; score: number }[] = [];
  for (const intent of intents) {
    const labels = [...intent.labels, ...(overrides[intent.key] ?? [])];
    const ranked: { field: FieldDescriptor; score: number }[] = [];
    for (const field of fields) {
      if (field.kind === "button") continue;
      if (!kindsCompatible(intent.kinds, field.kind)) continue;
      if (intent.section && !normalizeLabel(field.section ?? "").includes(normalizeLabel(intent.section))) continue;
      let best = 0;
      for (const l of labels) best = Math.max(best, labelScore(l, field.label));
      if (best > 0) ranked.push({ field, score: best });
    }
    ranked.sort((x, y) => y.score - x.score);
    candidates.set(intent.key, ranked.slice(0, 5));
    for (const r of ranked) if (r.score >= MATCH_THRESHOLD) pairs.push({ intent, field: r.field, score: r.score });
  }
  pairs.sort((x, y) => y.score - x.score);
  for (const p of pairs) {
    if (matched.has(p.intent.key) || taken.has(p.field.ref)) continue;
    matched.set(p.intent.key, p.field);
    scores.set(p.intent.key, p.score);
    taken.add(p.field.ref);
  }

  const unmatchedIntents = intents.filter((i) => !matched.has(i.key));
  const unusedNorm = new Set(knownUnused.map(normalizeLabel));
  const unmatchedFields = fields.filter(
    (f) => f.kind !== "button" && !taken.has(f.ref) && !unusedNorm.has(normalizeLabel(f.label)),
  );
  return { matched, scores, unmatchedIntents, unmatchedFields, candidates };
}
