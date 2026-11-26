import { randomUUID } from "node:crypto";
import type { AgentServiceRecord, FilingRecord, Store } from "../store/types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { ChannelSender } from "../comms/senders.js";
import type { StripeClient } from "../billing/stripe.js";
import { STATES_REQUIRING_AGENT } from "./service.js";

/**
 * Decision 9 (Nov 26): partner firms can name their own registered agent or use ours. Ours is
 * Registered Agents, Inc., which we resell; the firm is charged a yearly fee per business (default
 * $59) on its Stripe invoices, from the year the filing is submitted until the firm cancels.
 *
 * The agent goes on the state form through the platform's third-party provider setting
 * (registeredAgentProvisioning.thirdParty: a per-state table of the provider's agents, or its API
 * once configured). Without the API, every new service and every cancellation emails our staff to
 * place it with the provider by hand.
 */
export interface AgentServicesOptions {
  store: Store;
  platformTenantId: string;
  /** The provider's name as firms and clients see it. */
  providerName: string;
  annualUsd: number;
  stripe?: StripeClient;
  email?: ChannelSender;
  /** Where staff are told to place or cancel orders with the provider. */
  opsEmail?: string;
  now?: () => Date;
}

export interface AgentOffer { provider: string; annualUsd: number; states: string[] }

const addYear = (iso: string) => { const d = new Date(iso); d.setUTCFullYear(d.getUTCFullYear() + 1); return d.toISOString(); };

export class AgentServices {
  private readonly now: () => Date;
  constructor(private readonly o: AgentServicesOptions) { this.now = o.now ?? (() => new Date()); }

  /** Only partner firms on the platform are charged by us; enterprise subscribers use their own provider. */
  appliesTo(tenant: Pick<TenantSettings, "tenantId">, client: Pick<ClientCompanySettings, "partner">): boolean {
    return tenant.tenantId === this.o.platformTenantId && !!client.partner;
  }

  /** What the partner portal offers: our agent in the states the platform's provider covers. */
  offer(tenant: TenantSettings, client: ClientCompanySettings): AgentOffer | null {
    if (!this.appliesTo(tenant, client)) return null;
    const tp = tenant.registeredAgentProvisioning?.thirdParty;
    if (!tp) return null;
    const covered = new Set<string>([...Object.keys(tp.agents ?? {}), ...Object.keys(tp.cachedPricing ?? {})]);
    if (tp.http?.order) for (const s of STATES_REQUIRING_AGENT) covered.add(s);
    const states = [...covered].filter((s) => STATES_REQUIRING_AGENT.has(s)).sort();
    return states.length ? { provider: this.o.providerName, annualUsd: this.o.annualUsd, states } : null;
  }

  /**
   * A filing that used our agent was submitted: start its yearly service and charge the first year.
   * Idempotent per filing.
   */
  async start(filing: FilingRecord, tenant: TenantSettings, client: ClientCompanySettings): Promise<AgentServiceRecord | null> {
    const ra = filing.registeredAgentResolution;
    if (!this.appliesTo(tenant, client) || ra?.source !== "third_party" || !ra.agent) return null;
    const existing = await this.o.store.findAgentServiceByFiling(filing.id);
    if (existing) return existing;
    const at = this.now().toISOString();
    const f = filing.request.formation;
    const viaApi = !!tenant.registeredAgentProvisioning?.thirdParty?.http?.order;
    const rec = await this.o.store.createAgentService({
      id: randomUUID(), tenantId: filing.tenantId, clientCompanyId: filing.clientCompanyId, filingId: filing.id,
      entityName: f ? `${f.name.baseName} ${f.name.designator}`.trim() : filing.id, state: filing.request.state,
      provider: this.o.providerName, providerRef: ra.procurementRef, orderedVia: viaApi ? "api" : "staff",
      annualUsd: this.o.annualUsd, status: "active", startedAt: at, nextChargeAt: at, yearsCharged: 0,
    });
    if (!viaApi) {
      await this.tellStaff(`Order registered agent service: ${rec.entityName} (${rec.state})`,
        `Place a registered agent order with ${this.o.providerName} for ${rec.entityName} in ${rec.state}, named on the state filing as ${ra.agent.name}, ${ra.agent.address.street1}, ${ra.agent.address.city}, ${ra.agent.address.state} ${ra.agent.address.zip}.\n\nFirm: ${client.portal?.displayName ?? client.name} (${client.clientCompanyId}). Filing: ${filing.id}. Service: ${rec.id}.`);
    }
    await this.chargeDue([rec]);
    return (await this.o.store.getAgentService(rec.id))!;
  }

  /** The firm stops renewal; the year already paid runs out. Staff cancel with the provider. */
  async cancel(id: string, clientCompanyId: string, by: string): Promise<AgentServiceRecord | null> {
    const rec = await this.o.store.getAgentService(id);
    if (!rec || rec.clientCompanyId !== clientCompanyId) return null;
    if (rec.status === "cancelled") return rec;
    const next = await this.o.store.updateAgentService(id, { status: "cancelled", cancelledAt: this.now().toISOString(), cancelledBy: by });
    await this.tellStaff(`Cancel registered agent service: ${rec.entityName} (${rec.state})`,
      `The firm cancelled the registered agent service for ${rec.entityName} in ${rec.state}. Cancel it with ${this.o.providerName}${rec.providerRef ? ` (order ${rec.providerRef})` : ""} when the paid year ends${rec.lastChargedAt ? ` (paid through ${addYear(rec.lastChargedAt).slice(0, 10)})` : ""}.\n\nService: ${rec.id}. Cancelled by ${by}.`);
    return next;
  }

  /**
   * Charges each due year to the firm's Stripe customer as an item on its next invoice. A firm
   * without a Stripe customer yet stays due and is charged once it subscribes. Each year is sent
   * with its own idempotency key, so a retry never charges twice.
   */
  async chargeDue(records?: AgentServiceRecord[]): Promise<number> {
    if (!this.o.stripe) return 0;
    const due = records ?? await this.o.store.listDueAgentServices(this.now().toISOString());
    let charged = 0;
    for (const r of due) {
      if (r.status !== "active" || r.nextChargeAt > this.now().toISOString()) continue;
      const account = await this.o.store.getBillingAccount(`firm:${r.clientCompanyId}`);
      if (!account?.customerId) continue;
      const year = r.yearsCharged + 1;
      try {
        await this.o.stripe.invoiceItem({
          customer: account.customerId, amountCents: Math.round(r.annualUsd * 100),
          description: `Registered agent service (${r.provider}) for ${r.entityName}, ${r.state}: year ${year}`,
          metadata: { agentService: r.id, filingId: r.filingId, year: String(year) },
          idempotencyKey: `agent-service-${r.id}-year-${year}`,
        });
      } catch (e) {
        console.error("agent service charge failed", r.id, (e as Error).message);
        continue;
      }
      await this.o.store.updateAgentService(r.id, { yearsCharged: year, lastChargedAt: this.now().toISOString(), nextChargeAt: addYear(r.nextChargeAt) });
      charged++;
    }
    return charged;
  }

  private async tellStaff(subject: string, body: string): Promise<void> {
    if (!this.o.email || !this.o.opsEmail) return;
    await this.o.email.send({ address: this.o.opsEmail }, { subject, body }).catch(() => undefined);
  }
}
