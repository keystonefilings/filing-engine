/**
 * Run on the machine that will file to see which government portals serve it, each through
 * the network route it would actually use (BROWSER_PROXY / SITE_PROXIES, see
 * src/browser/egress.ts). Read-only: it loads each entry page and nothing else.
 *
 *   npm run probe-sites
 *   SITE_PROXIES="IRS=http://office:3128,NY=http://office:3128" npm run probe-sites
 *   STEEL_API_KEY=... npm run probe-sites -- --steel      every site through one plain Steel
 *                                                         cloud browser (src/browser/steel.ts)
 *
 * From the cloud container (2026-11-17 through 2026-11-19): NJ and FL served; the IRS EIN
 * assistant answered "Access Denied" (Akamai), NY DOS closed the connection, Missouri served a
 * Cloudflare challenge. Those three need a route their portals serve; the rest go direct.
 *
 * Through Steel (2026-11-23, one plain session per run, driven over Steel's HTTPS command API from
 * the cloud container, which carries no WebSocket so --steel itself could not run there): NJ, FL,
 * the IRS assistant and both NY DOS pages served their real pages (NY after its JavaScript check
 * cleared). Missouri stayed on Cloudflare's "Performing security verification" page in two
 * sessions, including after 60 seconds; it cleared once in an earlier scrape-API test.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Browser, Page } from "playwright";
import { describeRoute, parseProxy, parseSiteProxies, routeFor } from "../src/browser/egress.js";
import { createSteelSession, redact } from "../src/browser/steel.js";

export const SITES = [
  { key: "NJ formation", site: "NJ", url: "https://www.njportal.com/DOR/BusinessFormation/Home/Welcome", expect: /Business Formation/i },
  { key: "NJ business records", site: "NJ", url: "https://www.njportal.com/dor/businessrecords/EntityDocs/StandingCerts.aspx", expect: /Standing Certificates/i },
  { key: "NJ sign-in (my.nj.gov)", site: "NJ", url: "https://my.nj.gov/aui/Login", expect: /Log In/i },
  { key: "IRS EIN assistant", site: "IRS", url: "https://sa.www4.irs.gov/applyein/", expect: /EIN|Employer Identification/i },
  { key: "NY DOS ecorp", site: "NY", url: "https://filings.dos.ny.gov/ords/r/corpanc/ecorp/ecorphome", expect: /On-?Line Filing/i },
  { key: "NY DOS public inquiry", site: "NY", url: "https://apps.dos.ny.gov/publicInquiry/", expect: /Public Inquiry/i },
  { key: "MO online filing", site: "MO", url: "https://bsd.sos.mo.gov/", expect: /Missouri Business Filings/i },
  { key: "FL Sunbiz filing", site: "FL", url: "https://efile.sunbiz.org/llc_file.html", expect: /Articles of Organization/i },
];

/** Interstitials a real browser clears by running the site's own script (no CAPTCHA, nothing solved). */
export const JS_CHECK = /just a moment|performing security verification|checking your browser|your support id is|please enable javascript to view the page content/i;

/**
 * True while a page is a JavaScript check, or still blank: a check that runs before it shows
 * anything (NY DOS's does) leaves an empty page until it reloads into the real one.
 */
export function stillChecking(title: string, body: string): boolean {
  return JS_CHECK.test(`${title} ${body.slice(0, 2000)}`) || (!title.trim() && !body.trim());
}

/**
 * "ok" only for the portal's real page: a check page, a blank page, or a page that does not show
 * what that portal's real page shows (`expect`, matched against its title and text) is never ok.
 */
export function classify(status: number | null, title: string, body: string, error?: string, expect?: RegExp): "ok" | "blocked" | "error" {
  if (error) return /EMPTY_RESPONSE|CONNECTION_(RESET|CLOSED|REFUSED)|TUNNEL/i.test(error) ? "blocked" : "error";
  // A proxy in front of the browser reports a site that closes without answering as 502/504.
  if ((status === 502 || status === 504) && !title && !body.trim()) return "blocked";
  if (!title.trim() && !body.trim()) return "blocked";
  if (status === 403 || JS_CHECK.test(title + " " + body.slice(0, 2000)) || /access denied|request blocked|unusual traffic|pardon our interruption|verify you are (not a bot|human)/i.test(title + " " + body.slice(0, 2000))) return "blocked";
  if (!status || status >= 400) return "error";
  return expect && !expect.test(`${title} ${body}`) ? "error" : "ok";
}

interface Opener { open(site: string): Promise<Page>; label(site: string): string; close(): Promise<void> }

/** This machine's browser, out each site's configured route (BROWSER_PROXY / SITE_PROXIES). */
async function localOpener(): Promise<Opener> {
  const { chromium } = await import("playwright");
  const defaultRoute = process.env.BROWSER_PROXY ? parseProxy(process.env.BROWSER_PROXY) : null;
  const siteProxies = parseSiteProxies(process.env.SITE_PROXIES);
  const browsers = new Map<string, Browser>();
  return {
    async open(site) {
      const route = routeFor(site, defaultRoute, siteProxies);
      const key = route ? `${route.server}|${route.username ?? ""}` : "direct";
      let browser = browsers.get(key);
      if (!browser) { browser = await chromium.launch(route ? { proxy: route } : {}); browsers.set(key, browser); }
      return browser.newPage();
    },
    label: (site) => describeRoute(routeFor(site, defaultRoute, siteProxies)),
    async close() { for (const b of browsers.values()) await b.close(); },
  };
}

/** One plain Steel session (no residential proxy, no CAPTCHA solving) for every site. */
async function steelOpener(): Promise<Opener> {
  const { chromium } = await import("playwright");
  const session = await createSteelSession({ apiKey: process.env.STEEL_API_KEY, apiUrl: process.env.STEEL_API_URL, connectUrl: process.env.STEEL_CONNECT_URL });
  try {
    const browser = await chromium.connectOverCDP(session.connectUrl, { headers: session.headers });
    const context = browser.contexts()[0] ?? (await browser.newContext());
    const ip = await context.newPage();
    try {
      await ip.goto("https://api.ipify.org?format=json", { timeout: 30_000 });
      console.log(`Steel session ${session.id}: portals see ${(await ip.locator("body").innerText()).trim()}\n`);
    } catch { console.log(`Steel session ${session.id}: could not read its public IP\n`); }
    await ip.close();
    return {
      open: () => context.newPage(),
      label: () => "steel (us-east)",
      async close() { await browser.close().catch(() => {}); await session.release(); },
    };
  } catch (e) {
    await session.release();
    throw e;
  }
}

async function main() {
  const steel = process.argv.includes("--steel");
  const secret = process.env.STEEL_API_KEY;
  const say = (line: string) => console.log(redact(line, secret));
  let opener: Opener;
  try {
    opener = steel ? await steelOpener() : await localOpener();
  } catch (e) {
    say(`Could not start the ${steel ? "Steel" : "local"} browser: ${(e as Error).message.split("\n")[0]}`);
    process.exit(2);
  }
  const failedSites = new Set<string>();
  for (const s of SITES) {
    let status: number | null = null, title = "", body = "", error: string | undefined;
    let page: Page | undefined;
    try {
      page = await opener.open(s.site);
      const r = await page.goto(s.url, { timeout: 30_000, waitUntil: "domcontentloaded" });
      status = r?.status() ?? null;
      title = await page.title();
      body = await page.locator("body").innerText().catch(() => "");
      // A JavaScript check page clears itself within seconds in a real browser; wait (up to 20s) for it.
      for (let waited = 0; stillChecking(title, body) && waited < 20_000; waited += 1000) {
        await page.waitForTimeout(1000);
        title = await page.title().catch(() => title);
        body = await page.locator("body").innerText().catch(() => body);
        status = 200; // the check page itself answered; what matters is what replaced it
      }
    } catch (e) { error = (e as Error).message.split("\n")[0]; }
    await page?.close().catch(() => {});
    const verdict = classify(status, title, body, error, s.expect);
    if (verdict !== "ok") failedSites.add(s.site);
    say(`${verdict.padEnd(8)} ${s.key.padEnd(26)} ${opener.label(s.site).padEnd(28)} ${status ?? "-"}  ${error ?? (title.slice(0, 60) || "(blank page)")}`);
    if (verdict !== "ok" && !error && body.trim()) say(`         page text: ${body.replace(/\s+/g, " ").trim().slice(0, 160)}`);
  }
  await opener.close();
  if (!failedSites.size) {
    say(`\nEvery portal is reachable ${steel ? "through Steel" : "on its configured route"}.`);
    process.exit(0);
  }
  say(steel
    ? `\nNot reachable through Steel's network: ${[...failedSites].join(", ")}.`
    : `\nNot reachable on their current route: ${[...failedSites].join(", ")}. Give those sites a route their portals serve (SITE_PROXIES) and run this again.`);
  process.exit(1);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) await main();
