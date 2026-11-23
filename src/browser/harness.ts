import path from "node:path";
import { mkdir, readFile } from "node:fs/promises";
import type { Browser, BrowserContext, Download, Page } from "playwright";
import { isSteel, parseRoute, routeFor, type ProxyRoute, type Route } from "./egress.js";
import { createSteelSession, redact, type SteelSession } from "./steel.js";

export interface SteelConfig {
  apiKey?: string | null;
  apiUrl?: string;
  connectUrl?: string;
  /** Saved Steel sign-ins by profile key ("nygov", "ny:<tenant>"); see tools/steel-login.ts. */
  profiles?: Record<string, string>;
  /** Hard cap on one run's Steel session (default 15 minutes, the most Keystone's Steel plan allows). */
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
}

export interface HarnessOptions {
  chromiumPath?: string | null;
  /** Default route for every site: a proxy URL, "steel" or empty (direct); see egress.ts. */
  proxyServer?: string | null;
  /** Per-site routes; a site listed here overrides the default (null = direct). */
  siteProxies?: Record<string, Route>;
  /** Needed when any site routes "steel". */
  steel?: SteelConfig;
  profileDir: string;
  headless?: boolean;
}

const VIEWPORT = { width: 1280, height: 1600 };
/** Steel sessions behind each live Steel-hosted context (readDownload looks here). */
const steelByContext = new WeakMap<BrowserContext, SteelSession>();

/**
 * Owns browser contexts. A persistent context per (site, account) keeps cookies and the
 * ny.gov / client NJ sessions; the IRS gets a fresh context every run. Each context goes out
 * the network route configured for its site (egress.ts): one shared local browser per
 * distinct proxy route, so a direct NJ run and a proxied run never share a network path, and
 * a fresh Steel session per run for sites routed "steel" (a saved sign-in rides along as a
 * Steel profile). Close contexts with closeContext(): for Steel it also ends the session.
 * Secrets are never written to the profile directory by us.
 */
export class BrowserHarness {
  private readonly browsers = new Map<string, Browser>();
  private readonly steelContexts = new Map<BrowserContext, { session: SteelSession; browser: Browser }>();
  private pw: typeof import("playwright") | null = null;
  private readonly defaultRoute: Route;

  constructor(private readonly opts: HarnessOptions) {
    this.defaultRoute = opts.proxyServer ? parseRoute(opts.proxyServer) : null;
  }

  /** The network route a site's browser uses (null = direct). */
  routeFor(site?: string): Route {
    return routeFor(site, this.defaultRoute, this.opts.siteProxies ?? {});
  }

  private async playwright() {
    if (!this.pw) this.pw = await import("playwright");
    return this.pw;
  }

  private launchOptions(route: ProxyRoute | null) {
    return {
      headless: this.opts.headless ?? true,
      ...(this.opts.chromiumPath ? { executablePath: this.opts.chromiumPath } : {}),
      ...(route ? { proxy: route } : {}),
    };
  }

  /** Ephemeral context (IRS, NJ signed-out walks, fixtures), out the site's route. */
  async ephemeralContext(site?: string): Promise<BrowserContext> {
    const route = this.routeFor(site);
    if (isSteel(route)) return this.steelContext({});
    const pw = await this.playwright();
    const key = route ? `${route.server}|${route.username ?? ""}` : "direct";
    let browser = this.browsers.get(key);
    if (!browser) {
      browser = await pw.chromium.launch(this.launchOptions(route));
      this.browsers.set(key, browser);
    }
    return browser.newContext({ viewport: VIEWPORT, acceptDownloads: true });
  }

  /** Persistent context keyed by profile (e.g. "ny:<tenant>", "nj:<tenant>" or "nj:<firm>"), out the site's route. */
  async persistentContext(profileKey: string, site?: string): Promise<BrowserContext> {
    const route = this.routeFor(site);
    if (isSteel(route)) {
      const profileId = this.opts.steel?.profiles?.[profileKey];
      if (!profileId) {
        throw new Error(`No saved Steel sign-in for "${profileKey}": sign in once with "npm run steel-login -- ${profileKey} <sign-in URL>" and add the profile it prints to STEEL_PROFILES`);
      }
      return this.steelContext({ profileId, persistProfile: true });
    }
    const pw = await this.playwright();
    const dir = path.join(this.opts.profileDir, profileKey.replace(/[^a-z0-9:_-]/gi, "_"));
    await mkdir(dir, { recursive: true });
    return pw.chromium.launchPersistentContext(dir, { ...this.launchOptions(route), viewport: VIEWPORT, acceptDownloads: true });
  }

  /** One fresh, plain Steel session (browser/steel.ts) for one run. */
  private async steelContext(extra: { profileId?: string; persistProfile?: boolean }): Promise<BrowserContext> {
    const pw = await this.playwright();
    const s = this.opts.steel ?? {};
    const session = await createSteelSession({
      apiKey: s.apiKey, apiUrl: s.apiUrl, connectUrl: s.connectUrl, fetchImpl: s.fetchImpl,
      timeoutMs: s.timeoutMs ?? 15 * 60_000, inactivityTimeoutMs: 5 * 60_000, dimensions: VIEWPORT, ...extra,
    });
    try {
      const browser = await pw.chromium.connectOverCDP(session.connectUrl, { headers: session.headers, timeout: 60_000 });
      // The session's own context: it carries the Steel profile (a saved sign-in) when one was given.
      const context = browser.contexts()[0] ?? (await browser.newContext({ viewport: VIEWPORT, acceptDownloads: true }));
      this.steelContexts.set(context, { session, browser });
      steelByContext.set(context, session);
      return context;
    } catch (e) {
      await session.release();
      // The connect URL can carry the key; the message can quote the URL.
      throw new Error(redact(`Steel browser connect failed: ${(e as Error).message.split("\n")[0]}`, s.apiKey));
    }
  }

  /** Close a context from this harness. A Steel context also disconnects and ends its session. */
  async closeContext(context: BrowserContext): Promise<void> {
    const steel = this.steelContexts.get(context);
    if (!steel) { await context.close().catch(() => {}); return; }
    this.steelContexts.delete(context);
    for (const page of context.pages()) await page.close().catch(() => {});
    await steel.browser.close().catch(() => {}); // disconnects; the remote browser ends with the session
    await steel.session.release(); // also saves a persisted profile
  }

  async close(): Promise<void> {
    for (const context of [...this.steelContexts.keys()]) await this.closeContext(context);
    for (const b of this.browsers.values()) await b.close().catch(() => {});
    this.browsers.clear();
  }
}

/**
 * A finished download's bytes, wherever the browser runs: the local file, Playwright's stream,
 * or for a Steel-hosted browser the copy Steel keeps with the session.
 */
export async function readDownload(download: Download, waitMs = 15_000): Promise<Buffer> {
  const local = await download.path().catch(() => null);
  if (local) { try { return await readFile(local); } catch { /* the file is on the remote machine */ } }
  try {
    const stream = await download.createReadStream();
    const chunks: Buffer[] = [];
    for await (const c of stream) chunks.push(Buffer.from(c as Buffer));
    if (chunks.length) return Buffer.concat(chunks);
  } catch { /* not streamable from a CDP-connected browser */ }
  const session = steelByContext.get(download.page().context());
  if (session) {
    const name = download.suggestedFilename();
    for (let waited = 0; waited <= waitMs; waited += 1000) {
      const files = await session.listFiles().catch(() => []);
      const hit = files.find((f) => f.path.split("/").pop() === name);
      if (hit) return session.readFile(hit.path);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error(`download "${download.suggestedFilename()}" could not be read`);
}

/** Heuristic bot-challenge detection; every hit is logged as a run event (decision 4). */
export async function detectChallenge(page: Page): Promise<string | null> {
  const title = (await page.title()).toLowerCase();
  const body = (await page.locator("body").innerText().catch(() => "")).toLowerCase().slice(0, 4000);
  const signals = [
    "access denied", "captcha", "verify you are human", "unusual traffic", "request blocked", "reference #",
    "pardon our interruption", "are you a robot", "just a moment", "performing security verification",
    "your support id is", "please enable javascript to view the page content",
  ];
  for (const s of signals) if (title.includes(s) || body.includes(s)) return s;
  return null;
}

/** Interstitials that a real browser clears by running the site's own script within seconds. */
const JS_CHECKS = new Set(["just a moment", "performing security verification", "your support id is", "please enable javascript to view the page content"]);

/**
 * Waits (bounded) for a JavaScript check page to clear on its own; returns the challenge still
 * showing, or null. A hard block or a CAPTCHA returns at once: nothing is solved or bypassed, so
 * the run stops and reports.
 */
export async function waitOutJsCheck(page: Page, maxMs = 20_000): Promise<string | null> {
  // A check that runs before it shows anything (NY DOS's) leaves a blank page until it reloads.
  const blank = async () => !(await page.title().catch(() => "")).trim() && !(await page.locator("body").innerText().catch(() => "")).trim();
  let hit = await detectChallenge(page);
  for (let waited = 0; ((hit && JS_CHECKS.has(hit)) || (!hit && (await blank()))) && waited < maxMs; waited += 1000) {
    await page.waitForTimeout(1000);
    hit = await detectChallenge(page);
  }
  return hit;
}
