/**
 * Steel (steel.dev) hosted browser sessions: a browser that runs in Steel's cloud (us-east)
 * and is driven over CDP, so its traffic leaves from Steel's network, not the worker's.
 *
 * Sessions are created plain: no Steel residential proxy and no CAPTCHA solving. Those options
 * route traffic through third parties' home connections and defeat bot checks, which is not how
 * Keystone files with the IRS or a state. If a portal refuses Steel's own network, the answer is
 * a route Keystone controls (docs/fixed-ip-machine.md), not those options.
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
}

export interface SteelSession {
  id: string;
  /** CDP websocket URL for chromium.connectOverCDP. Contains the key when one was given: never log it unredacted. */
  connectUrl: string;
  /** Headers for the CDP handshake (connectOverCDP's `headers` option). */
  headers: Record<string, string>;
  release(): Promise<void>;
}

/** Placeholder header value when the network proxy supplies the real key. */
const PROXY_SUPPLIED = "set-by-network-proxy";

export async function createSteelSession(opts: SteelOptions = {}): Promise<SteelSession> {
  const key = opts.apiKey || null;
  const headers = { "steel-api-key": key ?? PROXY_SUPPLIED };
  const api = (opts.apiUrl ?? "https://api.steel.dev").replace(/\/$/, "");
  const f = opts.fetchImpl ?? fetch;
  const res = await f(`${api}/v1/sessions`, {
    method: "POST",
    headers: { ...headers, "content-type": "application/json" },
    body: JSON.stringify({ useProxy: false, solveCaptcha: false }),
  });
  // Status only: never echo a response body that could carry request details.
  if (!res.ok) throw new Error(`Steel session create failed: HTTP ${res.status}`);
  const created = (await res.json()) as { id?: string };
  if (!created.id) throw new Error("Steel session create returned no session id");
  const id = created.id;
  const url = new URL(opts.connectUrl ?? "wss://connect.steel.dev");
  url.searchParams.set("sessionId", id);
  if (key) url.searchParams.set("apiKey", key);
  return {
    id,
    connectUrl: url.toString(),
    headers,
    async release() {
      await f(`${api}/v1/sessions/${encodeURIComponent(id)}/release`, { method: "POST", headers }).catch(() => {});
    },
  };
}

/** Replace every occurrence of a secret (raw and URL-encoded) before text is printed or stored. */
export function redact(text: string, secret: string | null | undefined): string {
  if (!secret) return text;
  return text.split(secret).join("***").split(encodeURIComponent(secret)).join("***");
}
