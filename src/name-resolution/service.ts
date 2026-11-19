import { randomUUID } from "node:crypto";
import type { FilingState } from "../domain/filing.js";
import type { FilingRecord, NameOption, NameResolutionRecord, Store } from "../store/types.js";
import type { NameCandidateGenerator } from "./generator.js";
import type { NameCheckerRegistry } from "./checker.js";
import { mintAdminToken, verifyAdminToken } from "../admin-links/token.js";

export interface NameResolutionConfig {
  /** How many available alternatives to offer the admin. */
  maxOptions: number;
  /** How many generation batches to try to fill the list (the open retry cap). */
  maxBatches: number;
  ttlHours: number;
}

export const DEFAULT_NAME_RESOLUTION_CONFIG: NameResolutionConfig = { maxOptions: 5, maxBatches: 3, ttlHours: 168 };

export type NameDecision =
  | { action: "pick"; option: string; decidedBy: string }
  | { action: "custom"; baseName: string; designator?: string; decidedBy: string }
  | { action: "regenerate"; decidedBy: string }
  | { action: "abort"; decidedBy: string; reason: string };

export type NameDecisionOutcome =
  | { ok: true; outcome: "resolved" | "regenerated" | "still_unavailable" | "aborted"; record: NameResolutionRecord }
  | { ok: false; reason: "invalid_token" | "not_found" | "already_decided" | "expired" | "not_offered" | "unverifiable" };

/**
 * Name-unavailability flow (Yakov): when a filing's chosen name is taken, generate
 * alternative names (AI), availability-check them, and offer only the available ones to
 * the admin — never the end client. A pick off the list needs no second check; a custom
 * name the admin types IS re-checked from scratch. The service records the decision;
 * FilingService applies the chosen name and re-queues the run.
 */
export class NameResolutionService {
  private readonly now: () => Date;
  constructor(private readonly deps: {
    store: Store;
    generator: NameCandidateGenerator;
    checkers: NameCheckerRegistry;
    signingSecret: string;
    publicBaseUrl: string;
    config?: NameResolutionConfig;
    now?: () => Date;
  }) { this.now = deps.now ?? (() => new Date()); }

  private get cfg(): NameResolutionConfig { return this.deps.config ?? DEFAULT_NAME_RESOLUTION_CONFIG; }

  linkFor(rec: NameResolutionRecord): string { return `${this.deps.publicBaseUrl}/admin/name-resolution/${rec.token}`; }

  private full(baseName: string, designator: string): string { return `${baseName.trim()} ${designator.trim()}`.replace(/\s+/g, " ").trim(); }

  /** Generate and availability-filter options, store the record awaiting the admin's pick. */
  async open(input: {
    filing: FilingRecord; site: string; state: FilingState;
    requested: { baseName: string; designator: string }; purpose?: string; runId?: string;
  }): Promise<NameResolutionRecord> {
    const id = randomUUID();
    const requestedFull = this.full(input.requested.baseName, input.requested.designator);
    const built = await this.buildOptions(input.state, input.requested, input.purpose, [requestedFull]);
    const createdAt = this.now();
    const rec: NameResolutionRecord = {
      id, filingId: input.filing.id, tenantId: input.filing.tenantId, runId: input.runId, site: input.site,
      requested: { ...input.requested, name: requestedFull }, purpose: input.purpose,
      status: "awaiting_admin", availabilityVerified: built.verified, options: built.options, attempts: built.attempts,
      token: mintAdminToken(this.deps.signingSecret, "name", id),
      createdAt: createdAt.toISOString(),
      expiresAt: new Date(createdAt.getTime() + this.cfg.ttlHours * 3_600_000).toISOString(),
    };
    return this.deps.store.createNameResolution(rec);
  }

  private async buildOptions(
    state: FilingState, requested: { baseName: string; designator: string }, purpose: string | undefined, avoidFull: string[],
  ): Promise<{ options: NameOption[]; attempts: NameResolutionRecord["attempts"]; verified: boolean }> {
    const checker = this.deps.checkers[state];
    const options: NameOption[] = [];
    const attempts: NameResolutionRecord["attempts"] = [];
    const avoid = [...avoidFull];
    let batches = 0;
    while (options.length < this.cfg.maxOptions && batches < this.cfg.maxBatches) {
      batches++;
      const cands = await this.deps.generator.generate({
        baseName: requested.baseName, designator: requested.designator, purpose, state, count: this.cfg.maxOptions, avoid: [...avoid],
      });
      if (!cands.length) break;
      for (const baseName of cands) {
        const name = this.full(baseName, requested.designator);
        if (options.some((o) => o.name.toLowerCase() === name.toLowerCase()) || avoid.some((a) => a.toLowerCase() === name.toLowerCase())) continue;
        if (checker) {
          const at = this.now().toISOString();
          const r = await checker.check(name);
          attempts.push({ name, available: r.available, source: "ai", at });
          avoid.push(name);
          if (!r.available) continue;
          options.push({ baseName, designator: requested.designator, name, available: true, source: "ai", checkedAt: at, detail: r.detail });
        } else {
          options.push({ baseName, designator: requested.designator, name, available: false, source: "ai" });
          avoid.push(name);
        }
        if (options.length >= this.cfg.maxOptions) break;
      }
      if (!checker) break; // without a checker we cannot verify beyond the first batch
    }
    return { options, attempts, verified: !!checker };
  }

  async lookup(token: string): Promise<NameResolutionRecord | null> {
    const v = verifyAdminToken(this.deps.signingSecret, token);
    if (!v || v.scope !== "name") return null;
    const rec = await this.deps.store.getNameResolution(v.id);
    return rec && rec.token === token ? rec : null;
  }

  async decide(token: string, decision: NameDecision): Promise<NameDecisionOutcome> {
    const v = verifyAdminToken(this.deps.signingSecret, token);
    if (!v || v.scope !== "name") return { ok: false, reason: "invalid_token" };
    const rec = await this.deps.store.getNameResolution(v.id);
    if (!rec || rec.token !== token) return { ok: false, reason: "not_found" };
    if (rec.status !== "awaiting_admin") return { ok: false, reason: "already_decided" };
    if (rec.expiresAt <= this.now().toISOString()) return { ok: false, reason: "expired" };
    const decidedAt = this.now().toISOString();

    if (decision.action === "abort") {
      const updated = await this.deps.store.updateNameResolution(rec.id, { status: "aborted", decidedAt, decidedBy: decision.decidedBy, reason: decision.reason });
      return { ok: true, outcome: "aborted", record: updated };
    }

    if (decision.action === "pick") {
      const opt = rec.options.find((o) => o.name.toLowerCase() === decision.option.toLowerCase());
      if (!opt) return { ok: false, reason: "not_offered" };
      const updated = await this.deps.store.updateNameResolution(rec.id, {
        status: "resolved", decidedAt, decidedBy: decision.decidedBy,
        chosen: { baseName: opt.baseName, designator: opt.designator, name: opt.name, source: "ai_option" },
      });
      return { ok: true, outcome: "resolved", record: updated };
    }

    if (decision.action === "regenerate") {
      const state = rec.site as FilingState; // name-resolution state == site for the four filing states
      const avoid = [rec.requested.name, ...rec.options.map((o) => o.name), ...rec.attempts.map((a) => a.name)];
      const built = await this.buildOptions(state, { baseName: rec.requested.baseName, designator: rec.requested.designator }, rec.purpose, avoid);
      const updated = await this.deps.store.updateNameResolution(rec.id, {
        options: built.options, attempts: [...rec.attempts, ...built.attempts], availabilityVerified: built.verified,
      });
      return { ok: true, outcome: "regenerated", record: updated };
    }

    // custom: a name NOT on the list must be availability-checked from scratch.
    const state = rec.site as FilingState;
    const checker = this.deps.checkers[state];
    const designator = decision.designator?.trim() || rec.requested.designator;
    const name = this.full(decision.baseName, designator);
    if (!checker) return { ok: false, reason: "unverifiable" }; // cannot honour "check from scratch" without a checker
    const r = await checker.check(name);
    const attempt = { name, available: r.available, source: "custom" as const, at: decidedAt, by: decision.decidedBy };
    if (r.available) {
      const updated = await this.deps.store.updateNameResolution(rec.id, {
        status: "resolved", decidedAt, decidedBy: decision.decidedBy, attempts: [...rec.attempts, attempt],
        chosen: { baseName: decision.baseName.trim(), designator, name, source: "custom" },
      });
      return { ok: true, outcome: "resolved", record: updated };
    }
    const updated = await this.deps.store.updateNameResolution(rec.id, { attempts: [...rec.attempts, attempt] });
    return { ok: true, outcome: "still_unavailable", record: updated };
  }
}
