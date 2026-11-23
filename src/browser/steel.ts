/**
 * Steel (steel.dev) hosted browser sessions: a browser that runs in Steel's cloud (us-east)
 * and is driven over CDP, so its traffic leaves from Steel's network, not the worker's.
 *
 * Every session is created plain, and says so explicitly rather than relying on defaults:
 * no Steel residential proxy, no CAPTCHA solving, no fingerprint injection, no "humanized"
 * input, and no session recording (Steel records by default; filings show SSNs, logins and
 * payment pages). Those stealth options route traffic through third parties' home connections
 * or defeat bot checks, which is not how Keystone files with the IRS or a state. If a portal
 * refuses Steel's own network (Missouri's Cloudflare check did, 2026-11-23), the answer is a
 * route Keystone controls (docs/fixed-ip-machine.md) or a manual filing, not those options.
 *
 * Key handling: REST calls send it as the `steel-api-key` header. On a machine where it is set
 * (STEEL_API_KEY) it is also put in the connect URL, as Steel documents. In a cloud session
 * whose network proxy injects the header, no key is in the process at all.
 */
export interface SteelOptions {
  apiKey?: string | null;
  apiUrl?: string;
  connectUrl?: string;
  fetchImpl?: typeof fetch;
  /** Hard cap on the session's life (Steel's default is 5 minutes; Keystone's plan allows at most 15). */
  timeoutMs?: number;
  /** Released when no command arrives for this long (a crashed worker stops paying quickly). */
  inactivityTimeoutMs?: number;
  dimensions?: { width: number; height: number };
  /** Start from a saved Steel profile (cookies and storage of an earlier sign-in). */
  profileId?: string;
  /** Save the profile when the session is released (keeps a sign-in fresh). */
  persistProfile?: boolean;
  /** Whether the live view (debugUrl) accepts clicks and typing. Off for filing runs. */
  interactive?: boolean;
}

export interface SteelFile { path: string; size: number; lastModified: string }

export interface SteelSession {
  id: string;
  /** CDP websocket URL for chromium.connectOverCDP. Contains the key when one was given: never log it unredacted. */
  connectUrl: string;
  /** Headers for the CDP handshake (connectOverCDP's `headers` option). */
  headers: Record<string, string>;
  /** Live view of the session. A capability link: show it only to the operator who asked for it. */
  debugUrl?: string;
  profileId?: string;
  /** Files the session's browser downloaded (Steel keeps them with the session). */
  listFiles(): Promise<SteelFile[]>;
  readFile(path: string): Promise<Buffer>;
  /** The session as Steel reports it now (status, the profile it saved, signals such as bot_detection_triggered). */
  info(): Promise<{ status?: string; profileId?: string; signals?: string[] }>;
  release(): Promise<void>;
}

/** Placeholder header value when the network proxy supplies the real key. */
const PROXY_SUPPLIED = "set-by-network-proxy";

/** The session settings the engine sends. Exported so tests can hold them fixed. */
export function sessionBody(opts: SteelOptions): Record<string, unknown> {
  return {
    useProxy: false,
    solveCaptcha: false,
    recording: false,
    stealthConfig: { autoCaptchaSolving: false, humanizeInteractions: false, skipFingerprintInjection: true },
    debugConfig: { interactive: opts.interactive ?? false },
    ...(opts.dimensions ? { dimensions: opts.dimensions } : {}),
    ...(opts.timeoutMs ? { timeout: opts.timeoutMs } : {}),
    ...(opts.inactivityTimeoutMs ? { inactivityTimeout: opts.inactivityTimeoutMs } : {}),
    ...(opts.profileId ? { profileId: opts.profileId } : {}),
    ...(opts.persistProfile ? { persistProfile: true } : {}),
  };
}

export async function createSteelSession(opts: SteelOptions = {}): Promise<SteelSession> {
  const key = opts.apiKey || null;
  const headers = { "steel-api-key": key ?? PROXY_SUPPLIED };
  const api = (opts.apiUrl ?? "https://api.steel.dev").replace(/\/$/, "");
  const f = opts.fetchImpl ?? fetch;
  const res = await f(`${api}/v1/sessions`, {
    method: "POST",
    headers: { ...headers, "content-type": "application/json" },
    body: JSON.stringify(sessionBody(opts)),
  }).catch((e: Error & { cause?: { code?: unknown } }) => {
    // The worker's network never reached Steel (DNS, firewall, outage): say so plainly.
    const code = typeof e.cause?.code === "string" && /^[A-Z_]{1,40}$/.test(e.cause.code) ? ` (${e.cause.code})` : "";
    throw new Error(`Steel API unreachable from this worker${code}`);
  });
  // Status and Steel's error code only: never echo a response body that could carry request details.
  if (!res.ok) throw new Error(`Steel session create failed: HTTP ${res.status}${await errorCode(res)}`);
  const created = (await res.json()) as { id?: string; debugUrl?: string; profileId?: string };
  if (!created.id) throw new Error("Steel session create returned no session id");
  const id = created.id;
  const base = `${api}/v1/sessions/${encodeURIComponent(id)}`;
  const url = new URL(opts.connectUrl ?? "wss://connect.steel.dev");
  url.searchParams.set("sessionId", id);
  if (key) url.searchParams.set("apiKey", key);
  return {
    id,
    connectUrl: url.toString(),
    headers,
    ...(created.debugUrl ? { debugUrl: created.debugUrl } : {}),
    ...(created.profileId ? { profileId: created.profileId } : {}),
    async listFiles() {
      const r = await f(`${base}/files`, { method: "GET", headers });
      if (!r.ok) throw new Error(`Steel file list failed: HTTP ${r.status}`);
      return ((await r.json()) as { data?: SteelFile[] }).data ?? [];
    },
    async readFile(path: string) {
      const r = await f(`${base}/files/${encodeURIComponent(path.replace(/^\/+/, ""))}`, { method: "GET", headers });
      if (!r.ok) throw new Error(`Steel file download failed: HTTP ${r.status}`);
      return Buffer.from(await r.arrayBuffer());
    },
    async info() {
      const r = await f(base, { method: "GET", headers });
      if (!r.ok) throw new Error(`Steel session lookup failed: HTTP ${r.status}`);
      const s = (await r.json()) as { status?: string; profileId?: string; signals?: string[] };
      return { status: s.status, profileId: s.profileId, signals: s.signals };
    },
    async release() {
      await f(`${base}/release`, { method: "POST", headers }).catch(() => {});
    },
  };
}

/** " (session_timeout_exceeded)" from a Steel error body: a fixed identifier, nothing more. */
async function errorCode(res: Response): Promise<string> {
  try {
    const code = ((await res.json()) as { code?: unknown }).code;
    return typeof code === "string" && /^[a-z0-9_]{1,64}$/.test(code) ? ` (${code})` : "";
  } catch { return ""; }
}

/** Replace every occurrence of a secret (raw and URL-encoded) before text is printed or stored. */
export function redact(text: string, secret: string | null | undefined): string {
  if (!secret) return text;
  return text.split(secret).join("***").split(encodeURIComponent(secret)).join("***");
}
