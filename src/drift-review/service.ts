import { randomUUID } from "node:crypto";
import type { DriftHaltRecord, Store } from "../store/types.js";
import type { DriftDiff } from "../resolver/drift.js";
import { describeDiff } from "../resolver/drift.js";
import { labelScore, type MatchResult } from "../resolver/match.js";
import type { FieldIntent, PageInventory, PageSnapshot, ScreenIntents } from "../resolver/types.js";

export interface ProposalItem {
  kind: "map_intent" | "new_field" | "removed_intent" | "price_change";
  intentKey?: string;
  intentLabel?: string;
  fieldLabel?: string;
  required?: boolean;
  candidates?: { label: string; score: number }[];
  suggestion: string;
}

export interface Proposal {
  summary: string;
  items: ProposalItem[];
  requiresClientReapproval: boolean;
}

/**
 * Decision 6: on a drift halt the system proposes the updated mapping and a human
 * accepts or corrects it. Proposals are heuristic (label similarity); a model may
 * rank candidates later, since a reviewer always decides before anything resumes.
 */
export function buildProposal(screen: ScreenIntents, diff: DriftDiff | null, match: MatchResult, inventory: PageInventory): Proposal {
  const items: ProposalItem[] = [];
  let requiresClientReapproval = false;

  for (const intent of match.unmatchedIntents) {
    const cands = (match.candidates.get(intent.key) ?? []).map((c) => ({ label: c.field.label, score: Math.round(c.score * 100) / 100 }));
    const best = cands[0];
    items.push({
      kind: "map_intent",
      intentKey: intent.key,
      intentLabel: intent.labels[0],
      required: intent.required,
      candidates: cands,
      suggestion: best
        ? `Map "${intent.key}" to live field "${best.label}" (similarity ${best.score})`
        : `No live field resembles "${intent.key}"${intent.required ? "; this required value can no longer be entered" : ""}`,
    });
  }

  for (const f of match.unmatchedFields) {
    // Could this be a renamed version of an unmatched intent?
    let bestIntent: FieldIntent | undefined, bestScore = 0;
    for (const intent of match.unmatchedIntents) {
      for (const l of intent.labels) {
        const s = labelScore(l, f.label);
        if (s > bestScore) { bestScore = s; bestIntent = intent; }
      }
    }
    if (f.required && !bestIntent) requiresClientReapproval = true;
    items.push({
      kind: "new_field",
      fieldLabel: f.label,
      required: f.required,
      intentKey: bestIntent?.key,
      suggestion: bestIntent
        ? `Treat "${f.label}" as the renamed "${bestIntent.key}" (similarity ${Math.round(bestScore * 100) / 100})`
        : f.required
          ? `New REQUIRED field "${f.label}": no known meaning. Needs a new intent and new client data; client re-approval required.`
          : `New optional field "${f.label}": mark as known-unused or give it a meaning.`,
    });
  }

  if (diff) {
    for (const p of diff.pricesChanged) {
      items.push({ kind: "price_change", fieldLabel: p.label, suggestion: `Price "${p.label}" changed ${p.from ?? "none"} -> ${p.to ?? "none"}; update the fee table and re-approve affected filings.` });
      requiresClientReapproval = true;
    }
  }

  const summary = diff ? describeDiff(diff) : "first observation of this screen; no approved snapshot yet";
  return { summary, items, requiresClientReapproval };
}

export type DriftDecisionInput =
  | { action: "accept"; decidedBy: string }
  | { action: "correct"; decidedBy: string; mapping: Record<string, string>; knownUnused?: string[] }
  | { action: "reject"; decidedBy: string; reason: string };

export class DriftReviewService {
  constructor(private readonly store: Store) {}

  async recordHalt(input: {
    runId: string; filingId: string; site: string; screenKey: string;
    previous: PageSnapshot | null; current: PageSnapshot; diff: DriftDiff | null; proposal: Proposal;
  }): Promise<DriftHaltRecord> {
    const rec: DriftHaltRecord = {
      id: randomUUID(), ...input, status: "pending",
      requiresClientReapproval: input.proposal.requiresClientReapproval,
      createdAt: new Date().toISOString(),
    };
    return this.store.createDriftHalt(rec);
  }

  /**
   * Accept: the current snapshot becomes the approved one and proposed mappings
   * become label overrides. Correct: same, with the reviewer's mapping instead.
   * Reject: nothing changes; the filing is aborted by the orchestrator.
   */
  async decide(id: string, input: DriftDecisionInput): Promise<DriftHaltRecord> {
    const halt = await this.store.getDriftHalt(id);
    if (!halt) throw new Error(`drift halt ${id} not found`);
    if (halt.status !== "pending") throw new Error(`drift halt ${id} already ${halt.status}`);
    const decidedAt = new Date().toISOString();
    if (input.action === "reject") {
      return this.store.updateDriftHalt(id, { status: "rejected", decidedAt, decidedBy: input.decidedBy, resolution: { reason: input.reason } });
    }
    const overrides = await this.store.getIntentOverrides(halt.site, halt.screenKey);
    const proposal = halt.proposal as Proposal;
    let mapping: Record<string, string> = {};
    if (input.action === "accept") {
      for (const item of proposal.items) {
        if (item.kind === "map_intent" && item.intentKey && item.candidates?.[0]) mapping[item.intentKey] = item.candidates[0].label;
        if (item.kind === "new_field" && item.intentKey && item.fieldLabel) mapping[item.intentKey] = item.fieldLabel;
      }
    } else {
      mapping = input.mapping;
    }
    for (const [intentKey, label] of Object.entries(mapping)) {
      const list = overrides[intentKey] ?? [];
      if (!list.includes(label)) list.push(label);
      overrides[intentKey] = list;
    }
    if (input.action === "correct" && input.knownUnused?.length) {
      const list = overrides["__known_unused__"] ?? [];
      for (const l of input.knownUnused) if (!list.includes(l)) list.push(l);
      overrides["__known_unused__"] = list;
    }
    await this.store.putIntentOverrides(halt.site, halt.screenKey, overrides);
    await this.store.putApprovedSnapshot(halt.site, halt.screenKey, halt.current);
    return this.store.updateDriftHalt(id, {
      status: input.action === "accept" ? "accepted" : "corrected", decidedAt, decidedBy: input.decidedBy, resolution: { mapping },
    });
  }
}
