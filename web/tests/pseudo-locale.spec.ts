/**
 * The +35% pseudo-locale (merged spec 12.4: "test every page with a +35% pseudo-locale before launch"). There is no
 * translation layer yet, so it is done on the page itself: every visible text is made about 35% longer (each word keeps
 * its letters, accented, and grows by accented filler, so words get longer the way Spanish ones do), and the page must
 * still hold, at 390 and 1440:
 *   overflow   nothing pushes the page wider than the screen
 *   clipped    no text is cut off by a box that hides its overflow
 *   overruns   no text runs out of its own box (a word too long for a fixed width, a nowrap line)
 *   overlap    no two texts sit on top of each other (outside the pictures, which layer on purpose)
 *   button     every button's label still fits inside the button
 * Values that never translate are left alone: code, email addresses and web addresses.
 */
import { test, expect } from "@playwright/test";
import { PUBLIC_PAGES, VIEWPORTS, blockOtherHosts, openAtRest } from "./site.ts";
import { KNOWN } from "./pseudo-locale.known.ts";
import { findBreakage, lengthenEveryText, type Finding } from "./pseudo-locale.page.ts";

/**
 * Each word grows by this share of its letters, which makes a page's text about 35% longer in all (spaces and figures
 * don't grow). PSEUDO_LOCALE_GROWTH=0 runs the same checks on the page as it is, to tell what longer text broke from
 * what was already broken.
 */
const PER_WORD = process.env.PSEUDO_LOCALE_GROWTH !== undefined ? Number(process.env.PSEUDO_LOCALE_GROWTH) : 0.42;

for (const width of [390, 1440] as const) {
  test.describe(`${width}`, () => {
    test.use({ viewport: VIEWPORTS[width] });

    for (const p of PUBLIC_PAGES) {
      test(p.path, async ({ page, baseURL }) => {
        await blockOtherHosts(page, baseURL!);
        await openAtRest(page, p.path);
        // Every question's answer open, so the answers are checked too.
        await page.evaluate(() => document.querySelectorAll("main details").forEach((d) => ((d as HTMLDetailsElement).open = true)));
        const growth = await page.evaluate(lengthenEveryText, PER_WORD);
        if (PER_WORD) expect(growth, "the texts grew by about 35%").toBeGreaterThan(0.3);
        await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
        const found = await page.evaluate(findBreakage);
        const known = KNOWN.filter((k) => k.path === p.path && (!k.width || k.width === width));
        const isKnown = (f: Finding) => known.some((k) => k.kind === f.kind && f.where.includes(k.where));
        for (const f of found.filter(isKnown)) console.log(`known: ${p.path} ${width} ${f.kind} ${f.where} "${f.text}"`);
        const fresh = found.filter((f) => !isKnown(f));
        if (fresh.length) {
          const shot = test.info().outputPath(`pseudo-locale-${width}.png`);
          await page.screenshot({ fullPage: true, path: shot });
          await test.info().attach("the page with longer text", { path: shot, contentType: "image/png" });
        }
        expect(fresh.map((f) => `${f.kind}: ${f.where} "${f.text}"`), `layout breaks with 35% longer text (grew ${Math.round(growth * 100)}%)`).toEqual([]);
      });
    }
  });
}
