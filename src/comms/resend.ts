import type { ChannelSender, OutboundMessage } from "./senders.js";
import { renderEmail } from "./email.js";

export { renderEmail };

export interface ResendOptions {
  apiKey: string;
  /** "CoFile <filings@cofile.app>": the domain must be verified in Resend. */
  from: string;
  replyTo?: string;
  apiUrl?: string;
  /** The web app's public address: CoFile's lockup and the two engravings (src/comms/email.ts, EMAIL_ART). */
  webBaseUrl?: string;
  /** The engine's public address + /email-assets: the ghost light and the document card (EMAIL_ASSETS). */
  assetBaseUrl?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

/** The address inside "Name <a@b.c>", or the value itself. */
const addressOf = (from: string) => /<([^>]+)>/.exec(from)?.[1]?.trim() ?? from.trim();

/** A display name, quoted, on one line: "Harbor & Pine CPA" <filings@cofile.app>. */
export function mailbox(name: string, address: string): string {
  const clean = name.replace(/[\r\n<>]+/g, " ").replace(/\s+/g, " ").trim().replace(/[\\"]/g, (c) => `\\${c}`);
  return clean ? `"${clean}" <${address}>` : address;
}

/**
 * Email through Resend (https://resend.com/docs/api-reference/emails/send-email). A send that
 * Resend does not accept comes back as ok: false with its reason, so the Notifier records the
 * message as failed instead of losing it; nothing here throws on a provider error.
 *
 * Sender (decision 37): CoFile's configured From and Reply-To, unless the message is an email to a firm's
 * client, which goes out under the firm's name (from the firm's own address once its domain is verified,
 * else from the configured address) with replies to the firm.
 */
export class ResendEmailSender implements ChannelSender {
  readonly channel = "email" as const;
  private readonly fetchImpl: typeof fetch;
  constructor(private readonly opts: ResendOptions) {
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }

  async send(to: { address: string; name?: string }, msg: OutboundMessage): Promise<{ ok: boolean; detail?: string }> {
    const { text, html } = renderEmail(msg, { webBaseUrl: this.opts.webBaseUrl, assetBaseUrl: this.opts.assetBaseUrl });
    const recipient = to.name ? `${to.name.replace(/[<>"\r\n]/g, "")} <${to.address}>` : to.address;
    const from = msg.from ? mailbox(msg.from.name, msg.from.address ?? addressOf(this.opts.from)) : this.opts.from;
    const replyTo = msg.replyTo ?? (this.opts.replyTo ? [this.opts.replyTo] : []);
    let res: Response;
    try {
      res = await this.fetchImpl(this.opts.apiUrl ?? "https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${this.opts.apiKey}`, "content-type": "application/json" },
        body: JSON.stringify({
          from, to: [recipient], subject: msg.subject.replace(/[\r\n]+/g, " "), text, html,
          ...(replyTo.length ? { reply_to: replyTo.length === 1 ? replyTo[0] : replyTo } : {}),
          ...(msg.attachments?.length ? { attachments: msg.attachments.map((a) => ({ filename: a.filename, content: a.content.toString("base64"), content_type: a.contentType, ...(a.contentId ? { content_id: a.contentId } : {}) })) } : {}),
        }),
        signal: AbortSignal.timeout(this.opts.timeoutMs ?? 15_000),
      });
    } catch (e) {
      return { ok: false, detail: `resend unreachable: ${(e as Error).message}` };
    }
    const body = await res.json().catch(() => ({})) as { id?: string; message?: string; name?: string };
    if (!res.ok) return { ok: false, detail: `resend ${res.status}: ${body.message ?? body.name ?? "rejected"}` };
    return { ok: true, detail: body.id ? `resend ${body.id}` : "resend accepted" };
  }
}
