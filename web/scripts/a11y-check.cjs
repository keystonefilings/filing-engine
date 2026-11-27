#!/usr/bin/env node
/**
 * Automated accessibility checks (merged spec, build plan item 18): axe-core against WCAG 2.2 A and AA on each page,
 * at phone and desktop widths, light and dark. A serious or critical finding fails the run.
 *
 *   node scripts/a11y-check.cjs <baseUrl> <path> [<path> …]
 *   COOKIE=<kfe_session value> node scripts/a11y-check.cjs http://127.0.0.1:3000 /p/firm /p/firm/setup
 *
 * CI runs the same rules through the site checks (`npm run check:a11y`, tests/a11y.spec.ts), which use runAxe below.
 * Needs Playwright's Chromium (require('playwright')) and the axe-core dev dependency.
 */
const { readFileSync } = require("node:fs");

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];
let axeSource;

/** axe's findings on the page as it stands: [{ id, impact, help, nodes: ["selector :: what to fix", …] }]. */
async function runAxe(page) {
  axeSource ??= readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async (tags) => {
    // eslint-disable-next-line no-undef
    const r = await axe.run(document, { runOnly: { type: "tag", values: tags } });
    return r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 4).map((n) => n.target.join(" ") + (n.failureSummary ? ` :: ${n.failureSummary.split("\n").slice(1, 2).join(" ")}` : "")) }));
  }, TAGS);
}

/** Serious and critical findings fail; moderate and minor ones are reported. */
const failing = (violations) => violations.filter((v) => v.impact === "serious" || v.impact === "critical");

function describe(violations) {
  return violations.map((v) => `     ${v.impact} ${v.id}: ${v.help}\n${v.nodes.map((n) => `        ${n}`).join("\n")}`).join("\n");
}

module.exports = { runAxe, failing, describe, TAGS };

if (require.main === module) {
  const { chromium } = require("playwright");
  const [base, ...paths] = process.argv.slice(2);
  if (!base || !paths.length) { console.error("usage: a11y-check.cjs <baseUrl> <path> [<path> …]"); process.exit(2); }
  (async () => {
    const browser = await chromium.launch();
    const runs = [];
    for (const scheme of ["light", "dark"]) for (const width of [390, 1440]) runs.push({ scheme, width });
    // The four contexts run side by side; each prints its own lines when it is done.
    const results = await Promise.all(runs.map(async ({ scheme, width }) => {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme, reducedMotion: "reduce" });
      if (process.env.COOKIE) await ctx.addCookies([{ name: "kfe_session", value: process.env.COOKIE, url: base }]);
      const page = await ctx.newPage();
      const lines = [];
      let bad = 0;
      for (const p of paths) {
        await page.goto(base + p, { waitUntil: "networkidle" });
        const res = await runAxe(page);
        const serious = failing(res);
        bad += serious.length;
        lines.push(`${serious.length ? "FAIL" : res.length ? "warn" : "ok  "} ${p} ${width} ${scheme}${res.length ? ` (${res.length} rule${res.length > 1 ? "s" : ""})` : ""}`);
        if (res.length) lines.push(describe(res));
      }
      await ctx.close();
      return { lines, bad };
    }));
    await browser.close();
    for (const r of results) console.log(r.lines.join("\n"));
    process.exit(results.some((r) => r.bad) ? 1 : 0);
  })();
}
