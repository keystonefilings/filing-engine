import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import type { InboundMessageRecord, Store } from "../store/types.js";
import type { ChannelSender } from "../comms/senders.js";

/**
 * V40: filing requests emailed in. A firm's user writes to the inbound address (file@in.cofile.app)
 * with what to file; Resend receives it and calls our webhook. We keep the text (sealed) for the
 * sender's firm and email back a link to a form filled in from it. Nothing is filed from an email:
 * the firm checks the form and sends it, and the client approves as always.
 *
 * Only a known, active firm user's address is answered, and the answer goes to that address, so a
 * forged sender learns nothing and gets nothing. Unknown senders get no reply (no backscatter).
 */
export interface InboundEmailOptions {
  store: Store;
  /** Resend's signing secret for the receiving webhook (whsec_...). */
  webhookSecret?: string;
  /** Resend API key: reads the message body, which the webhook does not carry. */
  resendApiKey?: string;
  apiBase?: string;
  /** The address firms write to; mail to any other address is ignored. */
  address?: string;
  email?: ChannelSender;
  webBaseUrl: string;
  platformName?: string;
  fetchImpl?: typeof fetch;
  now?: () => Date;
}

/** Most of a request fits in a few thousand characters; a forwarded thread is cut here. */
const MAX_TEXT = 20_000;

/** Svix signatures, which Resend's webhooks use: "v1,<base64 HMAC-SHA256 of `${id}.${timestamp}.${body}`>". */
export function verifySvix(secret: string, headers: Record<string, unknown>, rawBody: string, nowSec = Math.floor(Date.now() / 1000), tolerance = 300): boolean {
  const id = String(headers["svix-id"] ?? ""), ts = String(headers["svix-timestamp"] ?? ""), sig = String(headers["svix-signature"] ?? "");
  if (!id || !ts || !sig || !/^\d+$/.test(ts) || Math.abs(nowSec - Number(ts)) > tolerance) return false;
  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const expected = Buffer.from(createHmac("sha256", key).update(`${id}.${ts}.${rawBody}`).digest("base64"));
  return sig.split(" ").some((part) => {
    const [v, s] = part.split(",");
    if (v !== "v1" || !s) return false;
    const got = Buffer.from(s);
    return got.length === expected.length && timingSafeEqual(got, expected);
  });
}

/** The address inside "Name <a@b.c>", lower-cased. */
export function bareAddress(v: string): string {
  const m = /<([^>]+)>/.exec(v);
  return (m ? m[1]! : v).trim().toLowerCase();
}

/** Plain text from an HTML body, for messages sent without a text part. */
export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n").replace(/<\/(p|div|li|tr|h\d)>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/[ \t]+\n/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

export type InboundOutcome = { status: "ignored" | "unknown_sender" | "not_a_firm_user" | "duplicate" | "stored"; id?: string };

export class InboundEmailService {
  private readonly now: () => Date;
  private readonly fetchImpl: typeof fetch;
  constructor(private readonly o: InboundEmailOptions) {
    this.now = o.now ?? (() => new Date());
    this.fetchImpl = o.fetchImpl ?? fetch;
  }

  get configured(): boolean { return !!(this.o.webhookSecret && this.o.resendApiKey && this.o.address); }
  get address(): string | undefined { return this.o.address; }

  verify(headers: Record<string, unknown>, rawBody: string): boolean {
    return !!this.o.webhookSecret && verifySvix(this.o.webhookSecret, headers, rawBody, Math.floor(this.now().getTime() / 1000));
  }

  /** Handles a verified Resend webhook event. */
  async handle(event: { type?: string; data?: Record<string, unknown> }): Promise<InboundOutcome> {
    if (event.type !== "email.received" || !event.data) return { status: "ignored" };
    const d = event.data;
    const providerId = String(d.email_id ?? d.id ?? "");
    const to = (Array.isArray(d.to) ? d.to : [d.to]).map((x) => bareAddress(String(x ?? "")));
    if (!providerId || (this.o.address && !to.includes(this.o.address.toLowerCase()))) return { status: "ignored" };
    const existing = await this.o.store.findInboundByProvider(providerId);
    if (existing) return { status: "duplicate", id: existing.id };

    const from = bareAddress(String(d.from ?? ""));
    const user = from ? await this.o.store.findUserByEmail(from) : null;
    if (!user || user.status !== "active") return { status: "unknown_sender" };
    const firm = user.clientCompanyId ? await this.o.store.getClientCompany(user.clientCompanyId) : null;
    const slug = firm?.portal?.slug;
    if (!firm || !slug) {
      await this.reply(from, "Email filing works from a firm's portal", "We got your email, but filing by email works for people who sign in to a firm's filing portal. Start the filing from your dashboard, or through the API.");
      return { status: "not_a_firm_user" };
    }

    const body = await this.readBody(providerId);
    const subject = String(d.subject ?? "").slice(0, 300);
    const rec: InboundMessageRecord = {
      id: randomUUID(), tenantId: firm.tenantId, clientCompanyId: firm.clientCompanyId, userId: user.id, channel: "email",
      providerId, from, subject, text: body.slice(0, MAX_TEXT), receivedAt: this.now().toISOString(),
    };
    await this.o.store.createInbound(rec);
    const link = `${this.o.webBaseUrl}/p/${encodeURIComponent(slug)}/from-email/${rec.id}`;
    await this.reply(from, `Ready to check: ${subject || "your filing request"}`,
      `We got your request. Open the link to see the form filled in from your email, check every answer, add what's missing, and send it. Nothing is filed until you send it and your client approves.${body.length > MAX_TEXT ? "\n\nYour email was long, so we read only the first part of it." : ""}`, link);
    return { status: "stored", id: rec.id };
  }

  /** The body is not in the webhook; Resend's receiving API has it. */
  private async readBody(providerId: string): Promise<string> {
    if (!this.o.resendApiKey) return "";
    const res = await this.fetchImpl(`${this.o.apiBase ?? "https://api.resend.com"}/emails/receiving/${encodeURIComponent(providerId)}`, {
      headers: { authorization: `Bearer ${this.o.resendApiKey}` }, signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) throw new Error(`resend receiving ${res.status}`);
    const m = (await res.json()) as { text?: string | null; html?: string | null };
    return (m.text && m.text.trim()) ? m.text.trim() : m.html ? htmlToText(m.html) : "";
  }

  private async reply(to: string, subject: string, body: string, link?: string): Promise<void> {
    await this.o.email?.send({ address: to }, { subject, body, ...(link ? { link } : {}) }).catch(() => undefined);
  }
}
