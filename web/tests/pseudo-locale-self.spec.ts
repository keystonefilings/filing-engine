/**
 * The pseudo-locale's own test: a small page with one of each breakage, and one of each thing that must not count, so
 * a change to the checks can't quietly stop them catching anything.
 */
import { test, expect } from "@playwright/test";
import { findBreakage, lengthenEveryText } from "./pseudo-locale.page.ts";

const PAGE = `<!doctype html><html><head><style>
  body { margin: 0; font: 16px/1.4 sans-serif; } .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  #wide { width: 600px; } #cut { width: 120px; height: 22px; overflow: hidden; } #nowrap { width: 80px; white-space: nowrap; }
  #btn { width: 90px; height: 40px; white-space: nowrap; overflow: hidden; display: inline-block; }
  #ok-btn { padding: 8px 16px; } .over { position: relative; } .over span + span { position: absolute; left: 0; top: 0; }
  figure { width: 100px; height: 20px; overflow: hidden; margin: 0; white-space: nowrap; }
</style></head><body>
  <div id="wide">A row wider than the screen</div>
  <div id="cut">Some words in a box too small to hold them all</div>
  <div id="nowrap">A label that never wraps</div>
  <button id="btn">Run a free rehearsal</button>
  <button id="ok-btn">Log in</button>
  <p class="over"><span>First words here</span><span>Second words drawn on top</span></p>
  <span class="sr-only">Read only by screen readers, longer than its one pixel</span>
  <figure>A picture cropped on purpose, with plenty of words in it</figure>
  <code>curl https://example.test/v1/filings</code> <a href="mailto:hello@example.test">hello@example.test</a>
</body></html>`;

test("catches each breakage, and nothing that is meant", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 600 });
  await page.setContent(PAGE);
  const growth = await page.evaluate(lengthenEveryText, 0.42);
  expect(growth).toBeGreaterThan(0.3);
  expect(await page.locator("code").textContent()).toBe("curl https://example.test/v1/filings");
  expect(await page.locator("a").textContent()).toBe("hello@example.test");
  const found = await page.evaluate(findBreakage);
  const kinds = (where: string) => found.filter((f) => f.where.includes(where)).map((f) => f.kind);
  expect(kinds("#wide")).toContain("overflow");
  expect(kinds("#cut")).toContain("clipped");
  expect(kinds("#nowrap")).toContain("overruns");
  expect(kinds("#btn")).toContain("button");
  expect(found.some((f) => f.kind === "overlap" && f.where.includes("p.over"))).toBe(true);
  expect(kinds("#ok-btn")).toEqual([]);
  expect(found.filter((f) => f.where.includes("sr-only") || f.where.includes("figure"))).toEqual([]);
});
