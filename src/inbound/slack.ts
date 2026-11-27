import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { Store } from "../store/types.js";
import type { FieldCipher } from "../store/sensitive.js";
import { RequestIntake } from "./requests.js";

/**
 * V41: filing requests from Slack. A firm adds the CoFile app to its Slack workspace (OAuth), then
 * anyone there types "/file" and the request. Slack tells us who typed it; we look up their email
 * in Slack (users:read.email) and answer only a person with a CoFile account at a firm. The answer
 * is a private (ephemeral) message with the link to the filled-in form.
 */
export interface SlackOptions {
  store: Store;
  clientId?: string;
  clientSecret?: string;
  signingSecret?: string;
  /** Seals workspace tokens in the database (DATA_ENCRYPTION_KEY). */
  cipher?: FieldCipher | null;
  /** The engine's public URL, for the OAuth redirect. */
  publicBaseUrl: string;
  webBaseUrl: string;
  /** Signs the OAuth state. */
  stateSecret: string;
  apiBase?: string;
  fetchImpl?: typeof fetch;
  now?: () => Date;
}

/** Slack's request signature: "v0=" + hex HMAC-SHA256 of "v0:<timestamp>:<raw body>". */
export function verifySlack(secret: string, timestamp: string | undefined, rawBody: string, signature: string | undefined, nowSec = Math.floor(Date.now() / 1000)): boolean {
  if (!timestamp || !signature || !/^\d+$/.test(timestamp) || Math.abs(nowSec - Number(timestamp)) > 300) return false;
  const expected = Buffer.from(`v0=${createHmac("sha256", secret).update(`v0:${timestamp}:${rawBody}`).digest("hex")}`);
  const got = Buffer.from(signature);
  return got.length === expected.length && timingSafeEqual(got, expected);
}

const SCOPES = "commands,users:read,users:read.email";
type Install = { botToken: string; teamName?: string; installedAt: string };

export class SlackChannel {
  private readonly now: () => Date;
  private readonly fetchImpl: typeof fetch;
  private readonly intake: RequestIntake;
  constructor(private readonly o: SlackOptions) {
    this.now = o.now ?? (() => new Date());
    this.fetchImpl = o.fetchImpl ?? fetch;
    this.intake = new RequestIntake({ store: o.store, webBaseUrl: o.webBaseUrl, now: o.now });
  }

  get configured(): boolean { return !!(this.o.clientId && this.o.clientSecret && this.o.signingSecret); }
  private get api() { return this.o.apiBase ?? "https://slack.com"; }
  private redirectUri() { return `${this.o.publicBaseUrl}/v1/slack/oauth/callback`; }

  verify(headers: Record<string, unknown>, rawBody: string): boolean {
    return !!this.o.signingSecret && verifySlack(this.o.signingSecret, headers["x-slack-request-timestamp"] as string | undefined, rawBody, headers["x-slack-signature"] as string | undefined, Math.floor(this.now().getTime() / 1000));
  }

  // ---- installing the app in a workspace ----
  private sign(v: string) { return createHmac("sha256", this.o.stateSecret).update(`slack-state:${v}`).digest("base64url"); }
  installUrl(): string {
    const n = `${Math.floor(this.now().getTime() / 1000)}.${randomBytes(9).toString("base64url")}`;
    const q = new URLSearchParams({ client_id: this.o.clientId!, scope: SCOPES, redirect_uri: this.redirectUri(), state: `${n}.${this.sign(n)}` });
    return `${this.api}/oauth/v2/authorize?${q}`;
  }
  private stateOk(state: string): boolean {
    const i = state.lastIndexOf(".");
    if (i < 0) return false;
    const n = state.slice(0, i), sig = Buffer.from(state.slice(i + 1)), want = Buffer.from(this.sign(n));
    const age = Math.floor(this.now().getTime() / 1000) - Number(n.split(".")[0]);
    return sig.length === want.length && timingSafeEqual(sig, want) && age >= 0 && age < 900;
  }
  /** Slack sent the admin back with a code: keep the workspace's bot token. Returns the workspace name. */
  async finishInstall(code: string, state: string): Promise<{ ok: true; team: string } | { ok: false; error: string }> {
    if (!this.stateOk(state)) return { ok: false, error: "this install link expired; start again" };
    const res = await this.fetchImpl(`${this.api}/api/oauth.v2.access`, {
      method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, signal: AbortSignal.timeout(15_000),
      body: new URLSearchParams({ client_id: this.o.clientId!, client_secret: this.o.clientSecret!, code, redirect_uri: this.redirectUri() }),
    }).catch(() => null);
    const b = (await res?.json().catch(() => null)) as { ok?: boolean; access_token?: string; team?: { id?: string; name?: string }; error?: string } | null;
    if (!b?.ok || !b.access_token || !b.team?.id) return { ok: false, error: b?.error ?? "Slack didn't finish the install" };
    await this.putInstall(b.team.id, { botToken: b.access_token, teamName: b.team.name, installedAt: this.now().toISOString() });
    return { ok: true, team: b.team.name ?? b.team.id };
  }
  private async putInstall(teamId: string, i: Install) {
    const v = JSON.stringify(i);
    await this.o.store.putVaultSecret(`slack:team:${teamId}`, "platform", this.o.cipher ? this.o.cipher.seal(v) : v);
  }
  private async install(teamId: string): Promise<Install | null> {
    const v = await this.o.store.getVaultSecret(`slack:team:${teamId}`);
    if (!v) return null;
    return JSON.parse(this.o.cipher ? this.o.cipher.open(v) : v) as Install;
  }

  // ---- the /file command ----
  /** Answers a slash command (Slack shows the text privately to the person who typed it). */
  async command(p: Record<string, string>): Promise<{ response_type: "ephemeral"; text: string }> {
    const say = (text: string) => ({ response_type: "ephemeral" as const, text });
    const text = String(p.text ?? "").trim();
    if (!text || text === "help") return say(`Type ${p.command || "/file"} and the filing you need, with the details you have. For example: ${p.command || "/file"} New York LLC for Blue Harbor Consulting, organizer Sam Rivera, 22 River Rd, Brooklyn NY 11201. We fill in the form for you to check and send; nothing is filed until you do and the proof is approved.`);
    const inst = p.team_id ? await this.install(p.team_id) : null;
    if (!inst) return say("CoFile isn't added to this Slack workspace yet. Ask an admin to add it, then try again.");
    const email = await this.emailOf(inst.botToken, p.user_id ?? "");
    const user = email ? await this.o.store.findUserByEmail(email) : null;
    if (!user) return say("Your Slack email doesn't match a CoFile account. Use the email you sign in to CoFile with in Slack, or ask your firm to add you.");
    const r = await this.intake.accept({ channel: "slack", providerId: `slack:${p.team_id}:${p.trigger_id || `${p.user_id}:${this.now().getTime()}`}`, user, from: email!, subject: text.split("\n")[0]!.slice(0, 80), text });
    if (r.status === "not_a_firm_user") return say(r.reply);
    if (r.status === "stored" || r.status === "duplicate") return say(`${r.status === "stored" ? r.reply : "We already have this request."} <${r.link}|Open the filled-in form>`);
    return say("Your CoFile account can't take requests right now.");
  }

  private async emailOf(token: string, userId: string): Promise<string | null> {
    if (!/^[UW][A-Z0-9]{2,20}$/.test(userId)) return null;
    const res = await this.fetchImpl(`${this.api}/api/users.info?user=${encodeURIComponent(userId)}`, { headers: { authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(2_000) }).catch(() => null);
    const b = (await res?.json().catch(() => null)) as { ok?: boolean; user?: { deleted?: boolean; is_bot?: boolean; profile?: { email?: string } } } | null;
    if (!b?.ok || b.user?.deleted || b.user?.is_bot) return null;
    return b.user?.profile?.email?.toLowerCase() ?? null;
  }
}
