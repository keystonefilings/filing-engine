import path from "node:path";
import { mkdir } from "node:fs/promises";
import type { Browser, BrowserContext, Page } from "playwright";
import { parseProxy, routeFor, type ProxyRoute } from "./egress.js";

export interface HarnessOptions {
  chromiumPath?: string | null;
  /** Default outbound proxy URL for every site (optional; see egress.ts). */
  proxyServer?: string | null;
  /** Per-site routes; a site listed here overrides the default (null = direct). */
  siteProxies?: Record<string, ProxyRoute | null>;
  profileDir: string;
  headless?: boolean;
}

/**
 * Owns browser contexts. A persistent context per (site, account) keeps cookies and the
 * ny.gov / client NJ sessions; the IRS gets a fresh context every run. Each context goes out
 * the network route configured for its site (egress.ts): one shared browser per distinct
 * route, so a direct NJ run and a proxied IRS run never share a network path. Secrets are
 * never written to the profile directory by us.
 */
export class BrowserHarness {
  private readonly browsers = new Map<string, Browser>();
  private pw: typeof import("playwright") | null = null;
  private readonly defaultRoute: ProxyRoute | null;

  constructor(private readonly opts: HarnessOptions) {
    this.defaultRoute = opts.proxyServer ? parseProxy(opts.proxyServer) : null;
  }

  /** The network route a site's browser uses (null = direct). */
  routeFor(site?: string): ProxyRoute | null {
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
    const pw = await this.playwright();
    const route = this.routeFor(site);
    const key = route ? `${route.server}|${route.username ?? ""}` : "direct";
    let browser = this.browsers.get(key);
    if (!browser) {
      browser = await pw.chromium.launch(this.launchOptions(route));
      this.browsers.set(key, browser);
    }
    return browser.newContext({ viewport: { width: 1280, height: 1600 }, acceptDownloads: true });
  }

  /** Persistent context keyed by profile (e.g. "ny:<tenant>", "nj:<tenant>" or "nj:<firm>"), out the site's route. */
  async persistentContext(profileKey: string, site?: string): Promise<BrowserContext> {
    const pw = await this.playwright();
    const dir = path.join(this.opts.profileDir, profileKey.replace(/[^a-z0-9:_-]/gi, "_"));
    await mkdir(dir, { recursive: true });
    return pw.chromium.launchPersistentContext(dir, {
      ...this.launchOptions(this.routeFor(site)),
      viewport: { width: 1280, height: 1600 },
      acceptDownloads: true,
    });
  }

  async close(): Promise<void> {
    for (const b of this.browsers.values()) await b.close().catch(() => {});
    this.browsers.clear();
  }
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
  let hit = await detectChallenge(page);
  for (let waited = 0; hit && JS_CHECKS.has(hit) && waited < maxMs; waited += 1000) {
    await page.waitForTimeout(1000);
    hit = await detectChallenge(page);
  }
  return hit;
}
