import { createHash, createHmac, randomInt, timingSafeEqual } from "node:crypto";
import type { Store, UserRecord } from "../store/types.js";
import { RequestIntake } from "./requests.js";

/**
 * V42-V43: filing requests by text message and WhatsApp, both through Twilio (one webhook, one
 * account; WhatsApp senders arrive as "whatsapp:+1..."). A person adds their mobile number in their
 * account and confirms it with a code we text them; messages from that number are theirs. The reply
 * goes back to the sending number in Twilio's own response (TwiML), so nothing else is sent.
 */
export interface TwilioOptions {
  store: Store;
  accountSid?: string;
  authToken?: string;
  /** Our numbers: E.164 for SMS, and the WhatsApp sender (also E.164; "whatsapp:" is added). */
  smsFrom?: string;
  whatsappFrom?: string;
  /** The URL Twilio posts to, exactly as configured in Twilio: it is part of the signature. */
  webhookUrl: string;
  webBaseUrl: string;
  apiBase?: string;
  fetchImpl?: typeof fetch;
  now?: () => Date;
}

/** Twilio's signature: base64 HMAC-SHA1 (auth token) of the URL followed by each POST param, sorted, as key then value. */
export function verifyTwilio(authToken: string, url: string, params: Record<string, string>, signature: string | undefined): boolean {
  if (!signature) return false;
  const data = url + Object.keys(params).sort().map((k) => k + params[k]).join("");
  const expected = Buffer.from(createHmac("sha1", authToken).update(data).digest("base64"));
  const got = Buffer.from(signature);
  return got.length === expected.length && timingSafeEqual(got, expected);
}

/** A US number in E.164 (+1XXXXXXXXXX), or another country's when written with its +code. */
export function e164(input: string): string | null {
  const t = input.trim();
  const digits = t.replace(/\D/g, "");
  if (t.startsWith("+")) return digits.length >= 8 && digits.length <= 15 ? `+${digits}` : null;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

const xml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]!);
export const twiml = (message?: string) => `<?xml version="1.0" encoding="UTF-8"?><Response>${message ? `<Message>${xml(message)}</Message>` : ""}</Response>`;
const hash = (code: string) => createHash("sha256").update(code).digest("hex");

export class TwilioChannel {
  private readonly now: () => Date;
  private readonly fetchImpl: typeof fetch;
  private readonly intake: RequestIntake;
  constructor(private readonly o: TwilioOptions) {
    this.now = o.now ?? (() => new Date());
    this.fetchImpl = o.fetchImpl ?? fetch;
    this.intake = new RequestIntake({ store: o.store, webBaseUrl: o.webBaseUrl, now: o.now });
  }

  get configured(): boolean { return !!(this.o.accountSid && this.o.authToken && (this.o.smsFrom || this.o.whatsappFrom)); }
  numbers() { return { sms: this.o.smsFrom ?? null, whatsapp: this.o.whatsappFrom ?? null }; }

  verify(params: Record<string, string>, signature: string | undefined): boolean {
    return !!this.o.authToken && verifyTwilio(this.o.authToken, this.o.webhookUrl, params, signature);
  }

  /** An incoming message; returns the TwiML to answer with. */
  async incoming(p: Record<string, string>): Promise<string> {
    const raw = String(p.From ?? "");
    const channel = raw.startsWith("whatsapp:") ? "whatsapp" as const : "sms" as const;
    const phone = e164(raw.replace(/^whatsapp:/, ""));
    const body = String(p.Body ?? "").trim();
    if (!phone || !p.MessageSid) return twiml();
    const user = await this.o.store.findUserByPhone(phone);
    if (!user) return twiml(); // unknown numbers get no answer
    if (!body) return twiml("Send the details of the filing in your message (business name, state, people and addresses), and we'll fill in the form for you to check.");
    const r = await this.intake.accept({ channel, providerId: `twilio:${p.MessageSid}`, user, from: phone, subject: body.split("\n")[0]!.slice(0, 80), text: body });
    if (r.status === "not_a_firm_user") return twiml(r.reply);
    if (r.status !== "stored") return twiml();
    return twiml(`Got it. Check the form filled in from your message, add what's missing and send it: ${r.link}`);
  }

  /** Texts a person a code to confirm their number (always by SMS). */
  async startPhone(user: UserRecord, input: string): Promise<{ ok: true; phone: string } | { ok: false; error: string; status: number }> {
    const phone = e164(input);
    if (!phone) return { ok: false, status: 422, error: "enter a mobile number, for example 212 555 0100" };
    const other = await this.o.store.findUserByPhone(phone);
    if (other && other.id !== user.id) return { ok: false, status: 409, error: "this number is already used by another account" };
    if (!this.configured || !this.o.smsFrom) return { ok: false, status: 503, error: "texting isn't set up yet" };
    const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
    const sent = await this.send(phone, `Your CoFile code is ${code}. It works for 10 minutes.`);
    if (!sent) return { ok: false, status: 502, error: "we couldn't text that number; check it and try again" };
    await this.o.store.updateUser(user.id, { phonePending: { phone, codeHash: hash(code), expiresAt: new Date(this.now().getTime() + 10 * 60_000).toISOString(), tries: 0 } });
    return { ok: true, phone };
  }

  async confirmPhone(user: UserRecord, code: string): Promise<{ ok: true; phone: string } | { ok: false; error: string; status: number }> {
    const p = user.phonePending;
    if (!p || p.expiresAt < this.now().toISOString() || p.tries >= 5) return { ok: false, status: 410, error: "that code has expired; ask for a new one" };
    const want = Buffer.from(p.codeHash), got = Buffer.from(hash(code.trim()));
    if (!(want.length === got.length && timingSafeEqual(want, got))) {
      await this.o.store.updateUser(user.id, { phonePending: { ...p, tries: p.tries + 1 } });
      return { ok: false, status: 400, error: "that code doesn't match" };
    }
    const other = await this.o.store.findUserByPhone(p.phone);
    if (other && other.id !== user.id) return { ok: false, status: 409, error: "this number is already used by another account" };
    await this.o.store.updateUser(user.id, { phone: p.phone, phoneVerifiedAt: this.now().toISOString(), phonePending: undefined });
    return { ok: true, phone: p.phone };
  }

  private async send(to: string, body: string): Promise<boolean> {
    const res = await this.fetchImpl(`${this.o.apiBase ?? "https://api.twilio.com"}/2010-04-01/Accounts/${encodeURIComponent(this.o.accountSid!)}/Messages.json`, {
      method: "POST",
      headers: { authorization: `Basic ${Buffer.from(`${this.o.accountSid}:${this.o.authToken}`).toString("base64")}`, "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ To: to, From: this.o.smsFrom!, Body: body }), signal: AbortSignal.timeout(15_000),
    }).catch(() => null);
    return !!res?.ok;
  }
}
