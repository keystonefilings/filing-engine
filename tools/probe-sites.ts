/**
 * Run on the machine that will file to see which government portals serve it, each through
 * the network route it would actually use (BROWSER_PROXY / SITE_PROXIES, see
 * src/browser/egress.ts). Read-only: it loads each entry page and nothing else.
 *
 *   npm run probe-sites
 *   SITE_PROXIES="IRS=http://office:3128,NY=http://office:3128" npm run probe-sites
 *
 * From the cloud container (2026-11-17 through 2026-11-19): NJ and FL served; the IRS EIN
 * assistant answered "Access Denied" (Akamai), NY DOS closed the connection, Missouri served a
 * Cloudflare challenge. Those three need a route their portals serve; the rest go direct.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Browser } from "playwright";
import { describeRoute, parseProxy, parseSiteProxies, routeFor } from "../src/browser/egress.js";

export const SITES = [
  { key: "NJ formation", site: "NJ", url: "https://www.njportal.com/DOR/BusinessFormation/Home/Welcome", expect: /Business Formation/i },
  { key: "NJ business records", site: "NJ", url: "https://www.njportal.com/dor/businessrecords/EntityDocs/StandingCerts.aspx", expect: /Standing Certificates/i },
  { key: "NJ sign-in (my.nj.gov)", site: "NJ", url: "https://my.nj.gov/aui/Login", expect: /Log In/i },
  { key: "IRS EIN assistant", site: "IRS", url: "https://sa.www4.irs.gov/applyein/", expect: /EIN|Employer Identification/i },
  { key: "NY DOS ecorp", site: "NY", url: "https://filings.dos.ny.gov/ords/r/corpanc/ecorp/ecorphome", expect: /.+/ },
  { key: "NY DOS public inquiry", site: "NY", url: "https://apps.dos.ny.gov/publicInquiry/", expect: /.+/ },
  { key: "MO online filing", site: "MO", url: "https://bsd.sos.mo.gov/", expect: /.+/ },
  { key: "FL Sunbiz filing", site: "FL", url: "https://efile.sunbiz.org/llc_file.html", expect: /Articles of Organization/i },
];

export function classify(status: number | null, title: string, body: string, error?: string): "ok" | "blocked" | "error" {
  if (error) return /EMPTY_RESPONSE|CONNECTION_(RESET|CLOSED|REFUSED)|TUNNEL/i.test(error) ? "blocked" : "error";
  // A proxy in front of the browser reports a site that closes without answering as 502/504.
  if ((status === 502 || status === 504) && !title && !body.trim()) return "blocked";
  if (status === 403 || /access denied|request blocked|unusual traffic|pardon our interruption|just a moment|performing security verification|verify you are (not a bot|human)/i.test(title + " " + body.slice(0, 2000))) return "blocked";
  return status && status < 400 ? "ok" : "error";
}

async function main() {
  const { chromium } = await import("playwright");
  const defaultRoute = process.env.BROWSER_PROXY ? parseProxy(process.env.BROWSER_PROXY) : null;
  const siteProxies = parseSiteProxies(process.env.SITE_PROXIES);
  const browsers = new Map<string, Browser>();
  const failedSites = new Set<string>();
  for (const s of SITES) {
    const route = routeFor(s.site, defaultRoute, siteProxies);
    const key = route ? `${route.server}|${route.username ?? ""}` : "direct";
    let browser = browsers.get(key);
    if (!browser) { browser = await chromium.launch(route ? { proxy: route } : {}); browsers.set(key, browser); }
    const page = await browser.newPage();
    let status: number | null = null, title = "", body = "", error: string | undefined;
    try {
      const r = await page.goto(s.url, { timeout: 30_000, waitUntil: "domcontentloaded" });
      status = r?.status() ?? null;
      title = await page.title();
      body = await page.locator("body").innerText().catch(() => "");
    } catch (e) { error = (e as Error).message.split("\n")[0]; }
    await page.close();
    const verdict = classify(status, title, body, error);
    if (verdict !== "ok") failedSites.add(s.site);
    console.log(`${verdict.padEnd(8)} ${s.key.padEnd(26)} ${describeRoute(route).padEnd(28)} ${status ?? "-"}  ${error ?? title.slice(0, 60)}`);
  }
  for (const b of browsers.values()) await b.close();
  if (!failedSites.size) {
    console.log("\nEvery portal is reachable on its configured route.");
    process.exit(0);
  }
  console.log(`\nNot reachable on their current route: ${[...failedSites].join(", ")}. Give those sites a route their portals serve (SITE_PROXIES) and run this again.`);
  process.exit(1);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) await main();
