import { createHmac, timingSafeEqual } from "node:crypto";
import type { Store } from "../store/types.js";
import { RequestIntake } from "./requests.js";
import type { ChannelSender } from "../comms/senders.js";
import { proseLetter } from "../comms/letter.js";

/**
 * V40: filing requests emailed in. A firm's user writes to the inbound address (file@in.cofile.app)
 * with what to file; Resend receives it and calls our webhook. We keep the text (sealed) for the
 * sender's firm and email back a link to a form filled in from it. Nothing is filed from an email:
 * the firm checks the form and sends it, and the proof is approved as always.
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
  private readonly intake: RequestIntake;
  constructor(private readonly o: InboundEmailOptions) {
    this.now = o.now ?? (() => new Date());
    this.fetchImpl = o.fetchImpl ?? fetch;
    this.intake = new RequestIntake({ store: o.store, webBaseUrl: o.webBaseUrl, now: o.now });
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
    const from = bareAddress(String(d.from ?? ""));
    const user = from ? await this.o.store.findUserByEmail(from) : null;
    if (!user || user.status !== "active") return { status: "unknown_sender" };
    if (await this.o.store.findInboundByProvider(providerId)) return { status: "duplicate" };
    const body = user.clientCompanyId ? await this.readBody(providerId) : "";
    const r = await this.intake.accept({ channel: "email", providerId, user, from, subject: String(d.subject ?? ""), text: body });
    if (r.status === "not_a_firm_user") {
      await this.reply(from, "Filing by email works from a firm's portal", r.reply);
      return { status: "not_a_firm_user" };
    }
    if (r.status !== "stored") return { status: r.status === "duplicate" ? "duplicate" : "unknown_sender" };
    await this.reply(from, `Ready to check: ${String(d.subject ?? "").slice(0, 300) || "your filing request"}`, r.reply, r.link, r.firmName);
    return { status: "stored", id: r.id };
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

  /** On CoFile's letterhead: the person works on their firm's desk, in CoFile's look (merged spec 10D.12). */
  private async reply(to: string, subject: string, body: string, link?: string, firmName?: string): Promise<void> {
    const letter = proseLetter(subject, body, firmName ? { context: firmName } : {});
    await this.o.email?.send({ address: to }, { subject, body, ...(link ? { link } : {}), letter }).catch(() => undefined);
  }
}
