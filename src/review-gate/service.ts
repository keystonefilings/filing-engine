import { randomUUID } from "node:crypto";
import type { ReviewGateRecord, Store } from "../store/types.js";
import { mintAdminToken, verifyAdminToken } from "../admin-links/token.js";

export type ReviewGateDecision =
  | { action: "approve"; decidedBy: string }
  | { action: "reject"; decidedBy: string; reason: string };

export type ReviewGateOutcome =
  | { ok: true; outcome: "approved" | "rejected"; record: ReviewGateRecord }
  | { ok: false; reason: "invalid_token" | "not_found" | "already_decided" | "expired" };

/**
 * Beta review-gate (Yakov): since the state forms have no save, a live run must finish in
 * one pass. In beta the engine instead stops at the review screen, screenshots it, and
 * sends it to the admin to approve before the filing is submitted. On approval the filing
 * is re-queued and runs straight through the gate; on rejection it is aborted. The record
 * is created by the run executor (which has the page/screenshot); this service holds the
 * link and the decision.
 */
export class ReviewGateService {
  private readonly now: () => Date;
  constructor(private readonly deps: {
    store: Store;
    signingSecret: string;
    publicBaseUrl: string;
    ttlHours?: number;
    now?: () => Date;
  }) { this.now = deps.now ?? (() => new Date()); }

  linkFor(rec: ReviewGateRecord): string { return `${this.deps.publicBaseUrl}/admin/review/${rec.token}`; }

  async recordHalt(input: {
    runId: string; filingId: string; tenantId: string; site: string; screenKey: string; screenshotArtifactId?: string;
  }): Promise<ReviewGateRecord> {
    const id = randomUUID();
    const createdAt = this.now();
    const rec: ReviewGateRecord = {
      id, runId: input.runId, filingId: input.filingId, tenantId: input.tenantId, site: input.site, screenKey: input.screenKey,
      screenshotArtifactId: input.screenshotArtifactId, status: "pending",
      token: mintAdminToken(this.deps.signingSecret, "review", id),
      createdAt: createdAt.toISOString(),
      expiresAt: new Date(createdAt.getTime() + (this.deps.ttlHours ?? 168) * 3_600_000).toISOString(),
    };
    return this.deps.store.createReviewGate(rec);
  }

  async lookup(token: string): Promise<ReviewGateRecord | null> {
    const v = verifyAdminToken(this.deps.signingSecret, token);
    if (!v || v.scope !== "review") return null;
    const rec = await this.deps.store.getReviewGate(v.id);
    return rec && rec.token === token ? rec : null;
  }

  async decide(token: string, decision: ReviewGateDecision): Promise<ReviewGateOutcome> {
    const v = verifyAdminToken(this.deps.signingSecret, token);
    if (!v || v.scope !== "review") return { ok: false, reason: "invalid_token" };
    const rec = await this.deps.store.getReviewGate(v.id);
    if (!rec || rec.token !== token) return { ok: false, reason: "not_found" };
    if (rec.status !== "pending") return { ok: false, reason: "already_decided" };
    if (rec.expiresAt <= this.now().toISOString()) return { ok: false, reason: "expired" };
    const decidedAt = this.now().toISOString();
    if (decision.action === "approve") {
      const updated = await this.deps.store.updateReviewGate(rec.id, { status: "approved", decidedAt, decidedBy: decision.decidedBy });
      return { ok: true, outcome: "approved", record: updated };
    }
    const updated = await this.deps.store.updateReviewGate(rec.id, { status: "rejected", decidedAt, decidedBy: decision.decidedBy, reason: decision.reason });
    return { ok: true, outcome: "rejected", record: updated };
  }
}
