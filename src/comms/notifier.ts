import { randomUUID } from "node:crypto";
import type { WebhookEvent } from "../domain/events.js";
import type { FilingRecord, MessageRecord, Store } from "../store/types.js";
import type { TenantSettings } from "../settings/schema.js";
import { renderMessage } from "./render.js";
import type { Channel, ChannelSender } from "./senders.js";

export interface NotifierDeps {
  store: Store;
  /** Per-channel senders; a channel with no sender falls back to defaultSender. */
  senders: Partial<Record<Channel, ChannelSender>>;
  defaultSender?: ChannelSender;
  publicBaseUrl: string;
  now?: () => Date;
}

/**
 * The outbound communication layer: how the engine reports back and asks. On each filing
 * event it renders a message for the right audience (the client, or the filing-company admin),
 * resolves the recipients, and delivers through the configured channel senders — recording a
 * MessageRecord for every send. Non-human events are ignored.
 */
export class Notifier {
  private readonly now: () => Date;
  constructor(private readonly deps: NotifierDeps) { this.now = deps.now ?? (() => new Date()); }

  async notify(event: WebhookEvent, filing: FilingRecord, tenant?: TenantSettings): Promise<MessageRecord[]> {
    const rendered = renderMessage(event, filing);
    if (!rendered) return [];
    const recipients = rendered.audience === "admin"
      ? (tenant?.adminChannels ?? [])
      : await this.clientRecipients(event, filing);
    const screenshotUrl = rendered.screenshotArtifactId ? `${this.deps.publicBaseUrl}/v1/artifacts/${rendered.screenshotArtifactId}` : undefined;

    const out: MessageRecord[] = [];
    for (const r of recipients) {
      const channel = r.channel as Channel;
      const sender = this.deps.senders[channel] ?? this.deps.defaultSender;
      const base: Omit<MessageRecord, "status" | "error"> = {
        id: randomUUID(), filingId: filing.id, tenantId: filing.tenantId, eventType: event.type,
        audience: rendered.audience, channel, address: r.address, subject: rendered.subject,
        body: rendered.body, link: rendered.link, screenshotArtifactId: rendered.screenshotArtifactId,
        createdAt: this.now().toISOString(),
      };
      if (!sender) { out.push(await this.deps.store.createMessage({ ...base, status: "skipped", error: `no sender for ${channel}` })); continue; }
      try {
        const res = await sender.send({ address: r.address, name: r.name }, { subject: rendered.subject, body: rendered.body, link: rendered.link, screenshotUrl });
        // A message only recorded (no provider set up) is "skipped", never reported as sent.
        out.push(await this.deps.store.createMessage({ ...base, status: res.notSent ? "skipped" : res.ok ? "sent" : "failed", error: res.ok && !res.notSent ? undefined : res.detail }));
      } catch (e) {
        out.push(await this.deps.store.createMessage({ ...base, status: "failed", error: (e as Error).message }));
      }
    }
    return out;
  }

  private async clientRecipients(event: WebhookEvent, filing: FilingRecord): Promise<{ channel: string; address: string; name?: string }[]> {
    const fromEvent = event.data.recipients;
    if (Array.isArray(fromEvent) && fromEvent.length) return fromEvent as { channel: string; address: string; name?: string }[];
    const client = await this.deps.store.getClientCompany(filing.clientCompanyId);
    if (client?.approvers?.length) return client.approvers;
    const c = filing.request.contact;
    return [{ channel: "email", address: c.email, name: `${c.firstName} ${c.lastName}` }];
  }
}
