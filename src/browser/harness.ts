import path from "node:path";
import { mkdir } from "node:fs/promises";
import type { Browser, BrowserContext, Page } from "playwright";

export interface HarnessOptions {
  chromiumPath?: string | null;
  /** Outbound proxy for the browser (decision 4: the static-IP proxy, or this session's agent proxy). */
  proxyServer?: string | null;
  profileDir: string;
  headless?: boolean;
}

/**
 * Owns browser contexts. A persistent context per (site, account) keeps cookies and
 * the ny.gov / client NJ sessions on the fixed-IP worker; the IRS gets a fresh
 * context every run. Secrets are never written to the profile directory by us.
 */
export class BrowserHarness {
  private browser: Browser | null = null;
  private pw: typeof import("playwright") | null = null;

  constructor(private readonly opts: HarnessOptions) {}

  private async playwright() {
    if (!this.pw) this.pw = await import("playwright");
    return this.pw;
  }

  private launchOptions() {
    return {
      headless: this.opts.headless ?? true,
      ...(this.opts.chromiumPath ? { executablePath: this.opts.chromiumPath } : {}),
      ...(this.opts.proxyServer ? { proxy: { server: this.opts.proxyServer } } : {}),
    };
  }

  /** Ephemeral context (IRS, NJ signed-out walks, fixtures). */
  async ephemeralContext(): Promise<BrowserContext> {
    const pw = await this.playwright();
    if (!this.browser) this.browser = await pw.chromium.launch(this.launchOptions());
    return this.browser.newContext({ viewport: { width: 1280, height: 1600 }, acceptDownloads: true });
  }

  /** Persistent context keyed by profile (e.g. "ny:keystone", "nj:client-123"). */
  async persistentContext(profileKey: string): Promise<BrowserContext> {
    const pw = await this.playwright();
    const dir = path.join(this.opts.profileDir, profileKey.replace(/[^a-z0-9:_-]/gi, "_"));
    await mkdir(dir, { recursive: true });
    return pw.chromium.launchPersistentContext(dir, {
      ...this.launchOptions(),
      viewport: { width: 1280, height: 1600 },
      acceptDownloads: true,
    });
  }

  async close(): Promise<void> {
    await this.browser?.close();
    this.browser = null;
  }
}

/** Heuristic bot-challenge detection; every hit is logged as a run event (decision 4). */
export async function detectChallenge(page: Page): Promise<string | null> {
  const title = (await page.title()).toLowerCase();
  const body = (await page.locator("body").innerText().catch(() => "")).toLowerCase().slice(0, 4000);
  const signals = ["access denied", "captcha", "verify you are human", "unusual traffic", "request blocked", "reference #", "pardon our interruption", "are you a robot"];
  for (const s of signals) if (title.includes(s) || body.includes(s)) return s;
  return null;
}
