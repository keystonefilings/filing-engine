import { randomUUID } from "node:crypto";
import type { InboundMessageRecord, Store, UserRecord } from "../store/types.js";

/**
 * V40-V43: one path for filing requests from every channel (email, Slack, SMS, WhatsApp). The channel
 * proves who sent the message (their address, Slack account or phone); this keeps the text sealed
 * for that person's firm and says what to answer: a link to the form filled in from the message.
 * Free text never files anything.
 */
export type RequestChannel = InboundMessageRecord["channel"];
export type RequestOutcome =
  | { status: "stored" | "duplicate"; id: string; link: string; reply: string }
  | { status: "not_a_firm_user"; reply: string }
  | { status: "unknown_sender" | "ignored" };

/** Most of a request fits in a few thousand characters; a forwarded thread is cut here. */
export const MAX_TEXT = 20_000;

export class RequestIntake {
  private readonly now: () => Date;
  constructor(private readonly o: { store: Store; webBaseUrl: string; now?: () => Date }) { this.now = o.now ?? (() => new Date()); }

  linkFor(slug: string, id: string): string {
    return `${this.o.webBaseUrl}/p/${encodeURIComponent(slug)}/from-email/${id}`;
  }

  async accept(input: { channel: RequestChannel; providerId: string; user: UserRecord | null; from: string; subject: string; text: string }): Promise<RequestOutcome> {
    const { store } = this.o;
    const u = input.user;
    if (!u || u.status !== "active") return { status: "unknown_sender" };
    const firm = u.clientCompanyId ? await store.getClientCompany(u.clientCompanyId) : null;
    const slug = firm?.portal?.slug;
    if (!firm || !slug) {
      return { status: "not_a_firm_user", reply: "Sending a filing request this way works for people who sign in to a firm's filing portal. Start the filing from your dashboard, or through the API." };
    }
    const existing = await store.findInboundByProvider(input.providerId);
    if (existing) return { status: "duplicate", id: existing.id, link: this.linkFor(slug, existing.id), reply: "" };
    const rec: InboundMessageRecord = {
      id: randomUUID(), tenantId: firm.tenantId, clientCompanyId: firm.clientCompanyId, userId: u.id, channel: input.channel,
      providerId: input.providerId, from: input.from, subject: input.subject.slice(0, 300), text: input.text.slice(0, MAX_TEXT), receivedAt: this.now().toISOString(),
    };
    await store.createInbound(rec);
    const cut = input.text.length > MAX_TEXT ? " Your message was long, so we read only the first part of it." : "";
    return {
      status: "stored", id: rec.id, link: this.linkFor(slug, rec.id),
      reply: `We got your request. Open the link to see the form filled in from your message, check every answer, add what's missing, and send it. Nothing is filed until you send it and your client approves.${cut}`,
    };
  }
}
