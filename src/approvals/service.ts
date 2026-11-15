import { randomUUID } from "node:crypto";
import type { FilingRequest } from "../domain/filing.js";
import type { ApprovalRecord, FilingRecord, Store } from "../store/types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import { settingsMatchSnapshot, takeSettingsSnapshot } from "../settings/snapshot.js";
import { canonicalHash } from "./hash.js";
import { mintOneTimeCode, mintToken, verifyToken } from "./token.js";
import { maskSensitive } from "./render.js";
import type { FeeLine } from "../fees/table.js";

export interface ApprovalDeps {
  store: Store;
  signingSecret: string;
  publicBaseUrl: string;
  defaultTtlHours: number;
  now?: () => Date;
}

export type ApprovalDecision =
  | { ok: true; approval: ApprovalRecord }
  | { ok: false; reason: "invalid_token" | "not_found" | "expired" | "already_decided" | "bad_code" };

export type RunReadiness = { ok: true } | { ok: false; reason: string };

/**
 * Decision 2: the client approves the exact payload BEFORE the run through a signed,
 * single-use link. The approval binds to a hash of the request and a settings
 * snapshot; the run re-checks both at start.
 */
export class ApprovalService {
  private readonly now: () => Date;
  constructor(private readonly deps: ApprovalDeps) { this.now = deps.now ?? (() => new Date()); }

  payloadHash(req: FilingRequest): string { return canonicalHash(req); }

  resolveRecipients(req: FilingRequest, client: ClientCompanySettings, tenant: TenantSettings) {
    if (req.approvalRecipients?.length) return req.approvalRecipients;
    if (client.approvers.length) return client.approvers;
    // Default: the named signer/organizer has no address in the request; fall back to the filing contact.
    if (tenant.defaultApprovers.length) return tenant.defaultApprovers;
    return [{ channel: "email" as const, address: req.contact.email, name: `${req.contact.firstName} ${req.contact.lastName}` }];
  }

  async create(filing: FilingRecord, tenant: TenantSettings, client: ClientCompanySettings, fees: FeeLine[]): Promise<ApprovalRecord> {
    // Supersede any pending approval for this filing.
    if (filing.currentApprovalId) {
      const prev = await this.deps.store.getApproval(filing.currentApprovalId);
      if (prev && prev.status === "pending") await this.deps.store.updateApproval(prev.id, { status: "superseded" });
    }
    const id = randomUUID();
    const ttlHours = client.approvalTtlHours ?? this.deps.defaultTtlHours;
    const createdAt = this.now();
    const approval: ApprovalRecord = {
      id,
      filingId: filing.id,
      tenantId: filing.tenantId,
      payloadHash: this.payloadHash(filing.request),
      settingsSnapshot: takeSettingsSnapshot(tenant, client),
      shownPayload: maskSensitive(filing.request),
      fees,
      feeCapUsd: filing.request.feeCapUsd,
      recipients: this.resolveRecipients(filing.request, client, tenant),
      token: mintToken(this.deps.signingSecret, id),
      oneTimeCode: client.requireOneTimeCode ? mintOneTimeCode() : undefined,
      status: "pending",
      createdAt: createdAt.toISOString(),
      expiresAt: new Date(createdAt.getTime() + ttlHours * 3_600_000).toISOString(),
    };
    await this.deps.store.createApproval(approval);
    await this.deps.store.updateFiling(filing.id, { currentApprovalId: id });
    return approval;
  }

  linkFor(approval: ApprovalRecord): string {
    return `${this.deps.publicBaseUrl}/approve/${approval.token}`;
  }

  async lookup(token: string): Promise<ApprovalDecision> {
    const v = verifyToken(this.deps.signingSecret, token);
    if (!v) return { ok: false, reason: "invalid_token" };
    const approval = await this.deps.store.getApproval(v.approvalId);
    if (!approval || approval.token !== token) return { ok: false, reason: "not_found" };
    if (approval.status !== "pending") return { ok: false, reason: "already_decided" };
    if (approval.expiresAt <= this.now().toISOString()) {
      await this.deps.store.updateApproval(approval.id, { status: "expired" });
      return { ok: false, reason: "expired" };
    }
    return { ok: true, approval };
  }

  async decide(
    token: string,
    decision: "approve" | "request_changes",
    via: { ip?: string; userAgent?: string; recipient?: string; comment?: string; code?: string },
  ): Promise<ApprovalDecision> {
    const found = await this.lookup(token);
    if (!found.ok) return found;
    const a = found.approval;
    if (a.oneTimeCode && decision === "approve" && via.code !== a.oneTimeCode) return { ok: false, reason: "bad_code" };
    const updated = await this.deps.store.updateApproval(a.id, {
      status: decision === "approve" ? "approved" : "changes_requested",
      decidedAt: this.now().toISOString(),
      decidedVia: { ip: via.ip, userAgent: via.userAgent, recipient: via.recipient },
      comment: via.comment,
    });
    return { ok: true, approval: updated };
  }

  /** Run-start check: approval still valid, payload unchanged, settings unchanged. */
  verifyForRun(filing: FilingRecord, approval: ApprovalRecord, tenant: TenantSettings, client: ClientCompanySettings): RunReadiness {
    if (approval.filingId !== filing.id) return { ok: false, reason: "approval belongs to another filing" };
    if (approval.status !== "approved") return { ok: false, reason: `approval status is ${approval.status}` };
    if (approval.payloadHash !== this.payloadHash(filing.request)) return { ok: false, reason: "filing data changed after approval; new approval required" };
    if (!settingsMatchSnapshot(approval.settingsSnapshot, tenant, client)) return { ok: false, reason: "settings changed after approval; new approval required" };
    return { ok: true };
  }
}
