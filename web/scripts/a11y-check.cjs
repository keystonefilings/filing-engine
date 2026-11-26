#!/usr/bin/env node
/**
 * Automated accessibility checks (merged spec, build plan item 18): axe-core against WCAG 2.2 A and AA on each page,
 * at phone and desktop widths, light and dark. A serious or critical finding fails the run.
 *
 *   node scripts/a11y-check.cjs <baseUrl> <path> [<path> …]
 *   COOKIE=<kfe_session value> node scripts/a11y-check.cjs http://127.0.0.1:3000 /p/firm /p/firm/setup
 *
 * Needs Playwright's Chromium (require('playwright')) and the axe-core dev dependency.
 */
const { chromium } = require("playwright");
const { readFileSync } = require("node:fs");

const [base, ...paths] = process.argv.slice(2);
if (!base || !paths.length) { console.error("usage: a11y-check.cjs <baseUrl> <path> [<path> …]"); process.exit(2); }
const axe = readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");

(async () => {
  const browser = await chromium.launch();
  let bad = 0;
  for (const scheme of ["light", "dark"]) {
    for (const width of [390, 1440]) {
      const ctx = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme, reducedMotion: "reduce" });
      if (process.env.COOKIE) await ctx.addCookies([{ name: "kfe_session", value: process.env.COOKIE, url: base }]);
      const page = await ctx.newPage();
      for (const p of paths) {
        await page.goto(base + p, { waitUntil: "networkidle" });
        await page.addScriptTag({ content: axe });
        const res = await page.evaluate(async () => {
          // eslint-disable-next-line no-undef
          const r = await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"] } });
          return r.violations.map((v) => ({ id: v.id, impact: v.impact, help: v.help, nodes: v.nodes.slice(0, 4).map((n) => n.target.join(" ") + (n.failureSummary ? ` :: ${n.failureSummary.split("\n").slice(1, 2).join(" ")}` : "")) }));
        });
        const serious = res.filter((v) => v.impact === "serious" || v.impact === "critical");
        bad += serious.length;
        console.log(`${serious.length ? "FAIL" : res.length ? "warn" : "ok  "} ${p} ${width} ${scheme}${res.length ? ` (${res.length} rule${res.length > 1 ? "s" : ""})` : ""}`);
        for (const v of res) {
          console.log(`     ${v.impact} ${v.id}: ${v.help}`);
          for (const n of v.nodes) console.log(`        ${n}`);
        }
      }
      await ctx.close();
    }
  }
  await browser.close();
  process.exit(bad ? 1 : 0);
})();
