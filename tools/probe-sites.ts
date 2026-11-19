/**
 * Run on the machine that will file (the fixed-IP worker, decision 4) to see whether
 * each government site serves it. Read-only: it loads each entry page and nothing else.
 *
 *   npm run probe-sites            (uses BROWSER_PROXY if set)
 *
 * From the cloud session on 2026-11-17: NJ OK; IRS EIN assistant "Access Denied" (Akamai);
 * NY DOS empty response. A machine that passes IRS and NY here is fit for walks B and C.
 */
import { chromium } from "playwright";

export const SITES = [
  { key: "NJ formation", url: "https://www.njportal.com/DOR/BusinessFormation/Home/Welcome", expect: /Business Formation/i },
  { key: "NJ business records", url: "https://www.njportal.com/dor/businessrecords/EntityDocs/StandingCerts.aspx", expect: /Standing Certificates/i },
  { key: "NJ sign-in (my.nj.gov)", url: "https://my.nj.gov/aui/Login", expect: /Log In/i },
  { key: "IRS EIN assistant", url: "https://sa.www4.irs.gov/modiein/individual/index.jsp", expect: /EIN|Employer Identification/i },
  { key: "NY DOS ecorp", url: "https://filings.dos.ny.gov/ords/r/corpanc/ecorp/ecorphome", expect: /.+/ },
  { key: "NY DOS public inquiry", url: "https://apps.dos.ny.gov/publicInquiry/", expect: /.+/ },
  { key: "MO online filing", url: "https://bsd.sos.mo.gov/", expect: /.+/ },
  { key: "FL Sunbiz filing", url: "https://efile.sunbiz.org/llc_file.html", expect: /Articles of Organization/i },
];

export function classify(status: number | null, title: string, body: string, error?: string): "ok" | "blocked" | "error" {
  if (error) return /EMPTY_RESPONSE|CONNECTION_(RESET|CLOSED|REFUSED)|TUNNEL/i.test(error) ? "blocked" : "error";
  // A proxy in front of the browser reports a site that closes without answering as 502/504.
  if ((status === 502 || status === 504) && !title && !body.trim()) return "blocked";
  if (status === 403 || /access denied|request blocked|unusual traffic|pardon our interruption|just a moment|performing security verification|verify you are (not a bot|human)/i.test(title + " " + body.slice(0, 2000))) return "blocked";
  return status && status < 400 ? "ok" : "error";
}

const proxy = process.env.BROWSER_PROXY || null;
const browser = await chromium.launch(proxy ? { proxy: { server: proxy } } : {});
const page = await browser.newPage();
let allOk = true;
for (const s of SITES) {
  let status: number | null = null, title = "", body = "", error: string | undefined;
  try {
    const r = await page.goto(s.url, { timeout: 30_000, waitUntil: "domcontentloaded" });
    status = r?.status() ?? null;
    title = await page.title();
    body = await page.locator("body").innerText().catch(() => "");
  } catch (e) { error = (e as Error).message.split("\n")[0]; }
  const verdict = classify(status, title, body, error);
  if (verdict !== "ok") allOk = false;
  console.log(`${verdict.padEnd(8)} ${s.key.padEnd(26)} ${status ?? "-"}  ${error ?? title.slice(0, 60)}`);
}
await browser.close();
console.log(allOk ? "\nAll sites reachable from this machine." : "\nSome sites refuse this machine; it cannot run those filings.");
process.exit(allOk ? 0 : 1);
