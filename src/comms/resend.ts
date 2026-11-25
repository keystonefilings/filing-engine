import type { ChannelSender, OutboundMessage } from "./senders.js";

export interface ResendOptions {
  apiKey: string;
  /** "Keystone Filings <filings@keystonefilings.com>": the domain must be verified in Resend. */
  from: string;
  replyTo?: string;
  apiUrl?: string;
  fetchImpl?: typeof fetch;
  timeoutMs?: number;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Plain text and a simple HTML version of the same message; every value is escaped. */
export function renderEmail(msg: OutboundMessage): { text: string; html: string } {
  const paragraphs = msg.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const text = [...paragraphs, ...(msg.link ? [msg.link] : [])].join("\n\n");
  const button = msg.link
    ? `<p style="margin:24px 0"><a href="${escapeHtml(msg.link)}" style="background:#1f4fd1;color:#ffffff;padding:10px 18px;border-radius:6px;text-decoration:none;display:inline-block">Open</a></p>`
      + `<p style="color:#555;font-size:13px">Or paste this link into your browser:<br>${escapeHtml(msg.link)}</p>`
    : "";
  const html = `<div style="font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.5;color:#111;max-width:560px">`
    + paragraphs.map((p) => `<p>${escapeHtml(p).replace(/\n/g, "<br>")}</p>`).join("")
    + button + `</div>`;
  return { text, html };
}

/**
 * Email through Resend (https://resend.com/docs/api-reference/emails/send-email). A send that
 * Resend does not accept comes back as ok: false with its reason, so the Notifier records the
 * message as failed instead of losing it; nothing here throws on a provider error.
 */
export class ResendEmailSender implements ChannelSender {
  readonly channel = "email" as const;
  private readonly fetchImpl: typeof fetch;
  constructor(private readonly opts: ResendOptions) {
    this.fetchImpl = opts.fetchImpl ?? fetch;
  }

  async send(to: { address: string; name?: string }, msg: OutboundMessage): Promise<{ ok: boolean; detail?: string }> {
    const { text, html } = renderEmail(msg);
    const recipient = to.name ? `${to.name.replace(/[<>"\r\n]/g, "")} <${to.address}>` : to.address;
    let res: Response;
    try {
      res = await this.fetchImpl(this.opts.apiUrl ?? "https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${this.opts.apiKey}`, "content-type": "application/json" },
        body: JSON.stringify({
          from: this.opts.from, to: [recipient], subject: msg.subject.replace(/[\r\n]+/g, " "), text, html,
          ...(this.opts.replyTo ? { reply_to: this.opts.replyTo } : {}),
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
