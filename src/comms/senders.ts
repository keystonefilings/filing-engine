import type { Letter } from "./letter.js";

export type Channel = "email" | "slack" | "whatsapp" | "sms" | "webhook";

export interface OutboundMessage {
  subject: string;
  body: string;
  link?: string;
  /** The email button's text; "Open" when not set. */
  linkLabel?: string;
  screenshotUrl?: string;
  /** Files sent with the message (email only): the filing's documents. contentId: shown inline in the email
   *  (the state's review page beside its paragraph), referenced as cid:<contentId>. */
  attachments?: { filename: string; contentType: string; content: Buffer; contentId?: string }[];
  /** Email only: how the message is laid out, and on whose letterhead (merged spec 10D). Absent: CoFile's
   *  letterhead, the subject as the headline and the body's paragraphs as written. */
  letter?: Letter;
  /** Email only: who it is from. Absent: the sender's configured From ("CoFile <filings@cofile.app>").
   *  An email to a firm's client is sent under the firm's name (decision 37); address is the firm's own
   *  sending address once its domain is verified, else the configured address is kept under the firm's name. */
  from?: { name: string; address?: string };
  /** Email only: where replies go. Absent: the sender's configured Reply-To. */
  replyTo?: string[];
}

/**
 * A delivery channel. The engine is built to scale across filing companies, each of which may
 * use different providers (SES, SendGrid, Slack, Twilio, ...). Real senders plug in per channel
 * with the tenant's own credentials from the vault; until one is wired, the LogChannelSender
 * records the message so nothing is lost and the flow is testable.
 */
export interface ChannelSender {
  channel: Channel;
  /** notSent: accepted but not delivered to anyone (no provider is set up for the channel). */
  send(to: { address: string; name?: string }, msg: OutboundMessage): Promise<{ ok: boolean; detail?: string; notSent?: boolean }>;
}

/**
 * Default sender: records the message instead of making an external call. print: also write it
 * to the console, so a developer without an email provider can follow links (password reset,
 * approval). Never in production: those links are credentials.
 */
export class LogChannelSender implements ChannelSender {
  readonly sent: { address: string; subject: string }[] = [];
  constructor(readonly channel: Channel = "email", private readonly opts: { print?: boolean } = {}) {}
  async send(to: { address: string; name?: string }, msg: OutboundMessage) {
    this.sent.push({ address: to.address, subject: msg.subject });
    if (this.opts.print) console.log(`[${this.channel} not sent: no provider] to ${to.address}: ${msg.subject}${msg.link ? `\n  ${msg.link}` : ""}`);
    return { ok: true, notSent: true, detail: `not sent: no ${this.channel} provider is set up` };
  }
}
