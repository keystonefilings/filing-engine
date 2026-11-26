import { randomUUID } from "node:crypto";
import type { WebhookEvent } from "../domain/events.js";
import type { FilingRecord, MessageRecord, Store } from "../store/types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { ArtifactStore } from "../artifacts/store.js";
import { effectivePolicies } from "../settings/policies.js";
import { renderMessage } from "./render.js";
import type { Channel, ChannelSender } from "./senders.js";

export interface NotifierDeps {
  store: Store;
  /** Per-channel senders; a channel with no sender falls back to defaultSender. */
  senders: Partial<Record<Channel, ChannelSender>>;
  defaultSender?: ChannelSender;
  publicBaseUrl: string;
  /** Reads the filing's documents to send with the completion email. */
  artifacts?: ArtifactStore;
  /** The web front end: a portal firm's completion email links to the filing page there. */
  webBaseUrl?: string;
  /** Ours, named in notices to a filing company's staff (never in its clients' emails, which carry the firm's own). */
  supportEmail?: string;
  now?: () => Date;
}

/** What a finished filing's email carries: the state's documents, never screenshots or the SS-4 authorization. */
const DOCUMENT_KINDS = new Set(["cp575", "filing_receipt", "formation_document", "standing_certificate", "generated_pdf", "other"]);
const MAX_ATTACHMENT_BYTES = 15 * 1024 * 1024;

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
    const client = rendered.audience === "client" ? await this.deps.store.getClientCompany(filing.clientCompanyId) : null;
    const recipients = rendered.audience === "admin"
      ? (tenant?.adminChannels ?? [])
      : rendered.audience === "card_owner"
        ? (Array.isArray(event.data.recipients) ? event.data.recipients as { channel: string; address: string; name?: string }[] : [])
        : await this.clientRecipients(event, filing, tenant, client);
    if (event.type === "filing.card_code_needed" && this.deps.webBaseUrl && typeof event.data.webPath === "string") rendered.link = `${this.deps.webBaseUrl}${event.data.webPath}`;
    if (rendered.audience === "admin" && this.deps.supportEmail) rendered.body += `\n\nQuestions? Email ${this.deps.supportEmail}.`;
    const screenshotUrl = rendered.screenshotArtifactId ? `${this.deps.publicBaseUrl}/v1/artifacts/${rendered.screenshotArtifactId}` : undefined;
    let attachments: NonNullable<import("./senders.js").OutboundMessage["attachments"]> | undefined;
    if (event.type === "filing.awaiting_approval" && typeof event.data.reviewShotArtifactId === "string" && this.deps.artifacts) {
      const shot = await this.deps.artifacts.get(event.data.reviewShotArtifactId).catch(() => null);
      if (shot && shot.meta.filingId === filing.id) {
        attachments = [{ filename: "State review page.png", contentType: shot.meta.contentType, content: shot.body }];
        rendered.body += "\n\nAttached is a picture of the state's own review page, filled in with your details; every value on it is also listed as text on the proof. When we file, we go ahead only if the state shows exactly this page again; if anything is different, we stop before paying.";
      }
    }
    if (event.type === "filing.completed") {
      const docs = await this.documents(filing);
      attachments = docs.files;
      const portal = client?.portal?.slug && this.deps.webBaseUrl ? `${this.deps.webBaseUrl}/p/${encodeURIComponent(client.portal.slug)}/filings/${encodeURIComponent(filing.id)}` : undefined;
      if (portal) rendered.link = portal;
      const names = filing.artifacts.filter((a) => DOCUMENT_KINDS.has(a.kind)).map((a) => a.label);
      rendered.body += names.length
        ? `\n\nDocuments: ${names.join("; ")}.${docs.files.length ? " They're attached." : ""}${docs.skipped ? ` ${docs.skipped}` : ""}${portal ? " You can also download them from the filing page." : ""}`
        : `\n\nThe state's documents will follow once it sends them.`;
    }

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
        const res = await sender.send({ address: r.address, name: r.name }, { subject: rendered.subject, body: rendered.body, link: rendered.link, ...(rendered.linkLabel ? { linkLabel: rendered.linkLabel } : {}), screenshotUrl, ...(channel === "email" && attachments?.length ? { attachments } : {}) });
        // A message only recorded (no provider set up) is "skipped", never reported as sent.
        out.push(await this.deps.store.createMessage({ ...base, status: res.notSent ? "skipped" : res.ok ? "sent" : "failed", error: res.ok && !res.notSent ? undefined : res.detail }));
      } catch (e) {
        out.push(await this.deps.store.createMessage({ ...base, status: "failed", error: (e as Error).message }));
      }
    }
    return out;
  }

  private async clientRecipients(event: WebhookEvent, filing: FilingRecord, tenant?: TenantSettings, client?: ClientCompanySettings | null): Promise<{ channel: string; address: string; name?: string }[]> {
    const fromEvent = event.data.recipients;
    if (Array.isArray(fromEvent) && fromEvent.length) return fromEvent as { channel: string; address: string; name?: string }[];
    const c = filing.request.contact;
    const contact = { channel: "email", address: c.email, name: `${c.firstName} ${c.lastName}` };
    const firm = client?.partner?.contactEmail
      ? [{ channel: "email", address: client.partner.contactEmail, name: client.partner.contactName }]
      : client?.approvers?.length ? client.approvers : [contact];
    if (event.type === "filing.completed" || event.type === "filing.rejected") {
      // H1 "documents go to": the firm, its client (the filing contact) or both. A partner firm
      // that hasn't answered gets them itself: it files for its clients from our portal.
      let to = tenant && client ? effectivePolicies(tenant, client).documentsTo : undefined;
      if (!to && client?.partner) to = "firm";
      const list = to === "client" ? [contact] : to === "both" ? [...firm, contact] : to === "firm" ? firm : (client?.approvers?.length ? client.approvers : [contact]);
      return list.filter((r, i) => list.findIndex((o) => o.address.toLowerCase() === r.address.toLowerCase()) === i);
    }
    return client?.approvers?.length ? client.approvers : [contact];
  }

  /** The filing's documents as attachments, within the email size limit. */
  private async documents(filing: FilingRecord): Promise<{ files: { filename: string; contentType: string; content: Buffer }[]; skipped?: string }> {
    if (!this.deps.artifacts) return { files: [] };
    const files: { filename: string; contentType: string; content: Buffer }[] = [];
    let total = 0, left = 0;
    for (const a of filing.artifacts.filter((x) => DOCUMENT_KINDS.has(x.kind))) {
      const got = await this.deps.artifacts.get(a.id).catch(() => null);
      if (!got) continue;
      if (total + got.body.length > MAX_ATTACHMENT_BYTES) { left++; continue; }
      total += got.body.length;
      const ext = got.meta.contentType === "application/pdf" ? ".pdf" : got.meta.contentType === "image/png" ? ".png" : got.meta.contentType === "image/jpeg" ? ".jpg" : "";
      files.push({ filename: `${a.label.replace(/[^\w .()-]+/g, "").trim().slice(0, 80) || a.kind}${ext}`, contentType: got.meta.contentType, content: got.body });
    }
    return { files, skipped: left ? `${left} more ${left === 1 ? "is" : "are"} too large to attach.` : undefined };
  }
}
