export type Channel = "email" | "slack" | "whatsapp" | "sms" | "webhook";

export interface OutboundMessage {
  subject: string;
  body: string;
  link?: string;
  screenshotUrl?: string;
}

/**
 * A delivery channel. The engine is built to scale across filing companies, each of which may
 * use different providers (SES, SendGrid, Slack, Twilio, ...). Real senders plug in per channel
 * with the tenant's own credentials from the vault; until one is wired, the LogChannelSender
 * records the message so nothing is lost and the flow is testable.
 */
export interface ChannelSender {
  channel: Channel;
  send(to: { address: string; name?: string }, msg: OutboundMessage): Promise<{ ok: boolean; detail?: string }>;
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
    return { ok: true, detail: "logged (no provider wired)" };
  }
}
