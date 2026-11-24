/**
 * Run on the machine that will file to see which government portals serve it, each through
 * the route a filing run would actually use: the worker's own browser harness and config
 * (BROWSER_PROXY / SITE_PROXIES / STEEL_*, see src/browser/egress.ts and src/config.ts).
 * Read-only: it loads each entry page and nothing else.
 *
 *   npm run probe-sites
 *   SITE_PROXIES="IRS=steel,NY=steel,MO=http://office:3128" npm run probe-sites
 *   npm run probe-sites -- --steel        every site through Steel (needs STEEL_API_KEY); each
 *                                         site gets its own plain session, as a run would
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
import type { BrowserContext, Page } from "playwright";
import { describeRoute } from "../src/browser/egress.js";
import { BrowserHarness } from "../src/browser/harness.js";
import { redact } from "../src/browser/steel.js";
import { config } from "../src/config.js";

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

/** A page that is still loading names itself so in its title ("Loading https://filings.dos.ny.gov/…"). */
export const LOADING_TITLE = /^\s*loading\b/i;

/**
 * True while a page is a JavaScript check, still blank, or still titled "Loading…": a check that
 * runs before it shows anything (NY DOS's does) leaves an empty or loading page until it reloads
 * into the real one. Only the title counts for "Loading": real pages often say it in their text.
 */
export function stillChecking(title: string, body: string): boolean {
  return JS_CHECK.test(`${title} ${body.slice(0, 2000)}`) || (!title.trim() && !body.trim()) || LOADING_TITLE.test(title);
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

async function main() {
  const steel = process.argv.includes("--steel");
  const say = (line: string) => console.log(redact(line, config.steel.apiKey));
  // The worker's own harness: each site goes out exactly the way a filing run would send it.
  const harness = new BrowserHarness({
    chromiumPath: config.chromiumPath, profileDir: config.browserProfileDir, steel: config.steel,
    proxyServer: steel ? "steel" : config.browserProxy, siteProxies: steel ? {} : config.siteProxies,
  });
  const failedSites = new Set<string>();
  for (const s of SITES) {
    let status: number | null = null, title = "", body = "", error: string | undefined;
    let context: BrowserContext | undefined;
    try {
      context = await harness.ephemeralContext(s.site);
      const page: Page = await context.newPage();
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
    if (context) await harness.closeContext(context); // a Steel site's session ends here
    const verdict = classify(status, title, body, error, s.expect);
    if (verdict !== "ok") failedSites.add(s.site);
    say(`${verdict.padEnd(8)} ${s.key.padEnd(26)} ${describeRoute(harness.routeFor(s.site)).padEnd(28)} ${status ?? "-"}  ${error ?? (title.slice(0, 60) || "(blank page)")}`);
    if (verdict !== "ok" && !error && body.trim()) say(`         page text: ${body.replace(/\s+/g, " ").trim().slice(0, 160)}`);
  }
  await harness.close();
  if (!failedSites.size) {
    say(`\nEvery portal is reachable on its configured route.`);
    process.exit(0);
  }
  say(`\nNot reachable on their current route: ${[...failedSites].join(", ")}. Give those sites a route their portals serve (SITE_PROXIES: a proxy URL or steel) and run this again.`);
  process.exit(1);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) await main();
