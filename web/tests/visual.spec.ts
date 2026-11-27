/**
 * Visual regression (merged spec 13.1): every public page and the design gallery, full length, compared with the
 * committed baselines in tests/visual/linux on every change.
 *
 * Light at 320, 390, 834 and 1440; dark at 390 and 1440 (dark mode changes colours, not layout, so two widths catch
 * it). To keep the repository small the screenshots are taken at half resolution (device scale 0.5: a 1440 page is a
 * 720 px wide image, its layout untouched) and the photographs are masked (their boxes stay, their pixels don't:
 * the photographs are fixed files, the layout around them is what changes). Motion is reduced, so every picture is in
 * its final state; other hosts (Google Fonts) are refused and the fonts are pinned (tests/fonts.conf), so the result
 * doesn't depend on the network or on what the machine has installed.
 *
 * Updating the baselines: web/design/BUILDING.md, "The automated checks".
 */
import { test, expect } from "@playwright/test";
import { ALL_PAGES, VIEWPORTS, blockOtherHosts, openAtRest, type Width } from "./site.ts";

const RUNS: { width: Width; colorScheme: "light" | "dark" }[] = [
  { width: 320, colorScheme: "light" },
  { width: 390, colorScheme: "light" },
  { width: 834, colorScheme: "light" },
  { width: 1440, colorScheme: "light" },
  { width: 390, colorScheme: "dark" },
  { width: 1440, colorScheme: "dark" },
];

/** The long API reference changes with every endpoint; its frame is covered by the other docs pages. */
const PAGES = ALL_PAGES.filter((p) => p.name !== "docs-reference");

// The baselines are drawn with the stand-in fonts, as CI has no others: a build that declares the licensed ones would
// differ on every page, so it is refused rather than compared (or, worse, saved as the baselines).
test.beforeAll(async ({ request }) => {
  const html = await (await request.get("/login")).text();
  if (/\/fonts\/(miller|founders)-/.test(html)) throw new Error("This build declares the licensed fonts: remove web/public/fonts/*.woff2 and run `npm run build` again before the screenshots.");
});

for (const { width, colorScheme } of RUNS) {
  test.describe(`${width} ${colorScheme}`, () => {
    test.use({ viewport: VIEWPORTS[width], colorScheme, deviceScaleFactor: 0.5 });

    for (const p of PAGES) {
      test(p.path, async ({ page, baseURL }) => {
        await blockOtherHosts(page, baseURL!);
        await openAtRest(page, p.path);
        // "No sideways page scroll at any width" (merged spec 12.2), said plainly before the picture is compared.
        const sideways = await page.evaluate(() => { scrollTo(100000, 0); const x = scrollX; scrollTo(0, 0); return x; });
        expect.soft(sideways, "the page scrolls sideways").toBe(0);
        await expect(page).toHaveScreenshot(`${p.name}-${width}-${colorScheme}.png`, {
          fullPage: true,
          mask: [page.locator("picture.ph, img[src*=\"/cofile/photography/\"]")],
          maskColor: "#9a9da6",
        });
      });
    }
  });
}
