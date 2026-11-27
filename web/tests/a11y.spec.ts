/**
 * axe in CI (merged spec 13.1): WCAG 2.2 A and AA on every public page, the design gallery and the desk's Filings, at
 * 390 and 1440, light and dark. A serious or critical finding fails; the rest are printed. Same rules as
 * scripts/a11y-check.cjs, which this reuses.
 */
import { test, expect } from "@playwright/test";
import { createRequire } from "node:module";
import { ALL_PAGES, VIEWPORTS } from "./site.ts";
import { deskCookie, ENGINE_URL, FIRM_SLUG } from "./desk.ts";

const require = createRequire(import.meta.url);
const { runAxe, failing, describe: describeFindings } = require("../scripts/a11y-check.cjs") as {
  runAxe: (page: import("@playwright/test").Page) => Promise<{ id: string; impact: string; help: string; nodes: string[] }[]>;
  failing: <T>(v: T[]) => T[];
  describe: (v: unknown[]) => string;
};

for (const colorScheme of ["light", "dark"] as const) {
  for (const width of [390, 1440] as const) {
    test.describe(`${width} ${colorScheme}`, () => {
      test.use({ viewport: VIEWPORTS[width], colorScheme });

      for (const p of ALL_PAGES) {
        test(p.path, async ({ page }) => {
          await page.goto(p.path, { waitUntil: "networkidle" });
          const found = await runAxe(page);
          if (found.length) console.log(`${p.path} ${width} ${colorScheme}\n${describeFindings(found)}`);
          expect(failing(found).map((v) => `${v.id}: ${v.help} (${v.nodes.join("; ")})`), "serious or critical axe findings").toEqual([]);
        });
      }

      // The desk needs the engine, which tests/global-setup.ts seeds when it is running.
      test.describe("the desk", () => {
        for (const [label, path] of [["Filings", ""], ["New filing", "/new"], ["a filing", "/filings/:id"]] as const) {
          test(`${label}`, async ({ page, context, baseURL }) => {
            const filingId = process.env.CHECKS_DESK_FILING ?? "";
            test.skip(!filingId, `no engine at ${ENGINE_URL} (install the repository's dependencies: npm ci at the root)`);
            await context.addCookies([deskCookie(baseURL!)]);
            const target = `/p/${FIRM_SLUG}${path.replace(":id", filingId)}`;
            await page.goto(target, { waitUntil: "networkidle" });
            expect(new URL(page.url()).pathname, "the desk session was refused: is the server using the same PORTAL_SESSION_SECRET?").toBe(target);
            const found = await runAxe(page);
            if (found.length) console.log(`${target} ${width} ${colorScheme}\n${describeFindings(found)}`);
            expect(failing(found).map((v) => `${v.id}: ${v.help} (${v.nodes.join("; ")})`), "serious or critical axe findings").toEqual([]);
          });
        }
      });
    });
  }
}
