import { randomUUID } from "node:crypto";
import type { FilingRequest } from "../domain/filing.js";
import type { ApprovalRecord, FilingRecord, Store } from "../store/types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import { settingsMatchSnapshot, takeSettingsSnapshot } from "../settings/snapshot.js";
import { canonicalHash } from "./hash.js";
import { mintOneTimeCode, mintToken, verifyToken } from "./token.js";
import { APPROVAL_CONSENT_VERSION, maskSensitive } from "./render.js";
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
    // Yakov (Nov 26): the end client hands the job to its CPA, CFO or payroll firm, and the firm
    // approves the proof. A partner firm's filings go to the firm, never to its client.
    if (client.partner?.contactEmail) return [{ channel: "email" as const, address: client.partner.contactEmail, name: client.partner.contactName ?? client.portal?.displayName ?? client.name }];
    // Default: the named signer/organizer has no address in the request; fall back to the filing contact.
    if (tenant.defaultApprovers.length) return tenant.defaultApprovers;
    return [{ channel: "email" as const, address: req.contact.email, name: `${req.contact.firstName} ${req.contact.lastName}` }];
  }

  async create(filing: FilingRecord, tenant: TenantSettings, client: ClientCompanySettings, fees: FeeLine[], review?: ApprovalRecord["review"]): Promise<ApprovalRecord> {
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
      ...(review ? { review } : {}),
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

  /**
   * Admin re-authorization after a name resolution (beta): the end client approved the
   * filing and its fees; only the (unavailable) name changed, resolved by the filing
   * company's admin. This records a pre-approved approval bound to the new payload hash so
   * the re-run's verifyForRun passes, with the admin — not the client — as the authority.
   * Fees are unchanged by a name change.
   */
  /**
   * An EIN application started after the state accepted its formation: the client approved its
   * details with the formation (shown on that approval page, with the note that it follows
   * acceptance). This records an approved approval bound to the EIN filing's own payload, citing
   * the formation's approval as the authority. The EIN details must be the ones approved.
   */
  async carryForward(filing: FilingRecord, from: ApprovalRecord, parent: FilingRecord, tenant: TenantSettings, client: ClientCompanySettings, fees: FeeLine[]): Promise<ApprovalRecord> {
    if (from.status !== "approved" || from.filingId !== parent.id) throw new Error("the formation's approval isn't an approved approval of that formation");
    const strip = (e: unknown) => { const { mode: _m, formationState: _f, startDate: _s, ...rest } = (e ?? {}) as Record<string, unknown>; return JSON.stringify(rest); };
    if (strip(filing.request.ein) !== strip(parent.request.ein)) throw new Error("the EIN details differ from the ones approved with the formation");
    const id = randomUUID();
    const now = this.now();
    const approval: ApprovalRecord = {
      id, filingId: filing.id, tenantId: filing.tenantId,
      payloadHash: this.payloadHash(filing.request),
      settingsSnapshot: takeSettingsSnapshot(tenant, client),
      shownPayload: maskSensitive(filing.request),
      fees, feeCapUsd: filing.request.feeCapUsd,
      recipients: from.recipients,
      token: mintToken(this.deps.signingSecret, id),
      status: "approved",
      createdAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + (client.approvalTtlHours ?? this.deps.defaultTtlHours) * 3_600_000).toISOString(),
      decidedAt: now.toISOString(),
      decidedVia: from.decidedVia,
      comment: `carried from approval ${from.id} of formation ${parent.id}: the EIN is applied for after the state accepted it`,
    };
    await this.deps.store.createApproval(approval);
    await this.deps.store.updateFiling(filing.id, { currentApprovalId: id });
    return approval;
  }

  async adminReauthorize(filing: FilingRecord, tenant: TenantSettings, client: ClientCompanySettings, fees: FeeLine[], by: string): Promise<ApprovalRecord> {
    if (filing.currentApprovalId) {
      const prev = await this.deps.store.getApproval(filing.currentApprovalId);
      if (prev && prev.status === "pending") await this.deps.store.updateApproval(prev.id, { status: "superseded" });
    }
    const id = randomUUID();
    const now = this.now();
    const approval: ApprovalRecord = {
      id, filingId: filing.id, tenantId: filing.tenantId,
      payloadHash: this.payloadHash(filing.request),
      settingsSnapshot: takeSettingsSnapshot(tenant, client),
      shownPayload: maskSensitive(filing.request),
      fees, feeCapUsd: filing.request.feeCapUsd,
      recipients: [{ channel: "webhook", address: by, name: "admin (name resolution)" }],
      token: mintToken(this.deps.signingSecret, id),
      status: "approved",
      createdAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + (client.approvalTtlHours ?? this.deps.defaultTtlHours) * 3_600_000).toISOString(),
      decidedAt: now.toISOString(),
      decidedVia: { recipient: by },
      comment: `name resolved by admin ${by}`,
    };
    await this.deps.store.createApproval(approval);
    await this.deps.store.updateFiling(filing.id, { currentApprovalId: id });
    return approval;
  }

  async lookup(token: string): Promise<ApprovalDecision> {
    const v = verifyToken(this.deps.signingSecret, token);
    if (!v) return { ok: false, reason: "invalid_token" };
    const approval = await this.deps.store.getApproval(v.approvalId);
    if (!approval || approval.token !== token) return { ok: false, reason: "not_found" };
    // A link marked expired on an earlier visit still reads as expired, not as decided.
    if (approval.status === "expired") return { ok: false, reason: "expired" };
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
      ...(decision === "approve" ? { consentVersion: APPROVAL_CONSENT_VERSION } : {}),
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
