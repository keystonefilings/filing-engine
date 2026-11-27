/**
 * The site checks (web/design/BUILDING.md, "The automated checks"), run against the production build (`npm run build`
 * first). Each project is one check:
 *   a11y           axe, WCAG 2.2 AA: every public page, the design gallery and the desk's Filings, 390 and 1440, light and dark
 *   visual         screenshots compared with the baselines in tests/visual/linux
 *   pseudo-locale  every public page with each text 35% longer, 390 and 1440: no overflow, clipping or overlap
 * The server is started here (`next start`, with DESIGN_GALLERY=true), with an in-memory engine beside it for the
 * desk when the repository's dependencies are installed; a server already on the port is used as it is (not in CI).
 */
import { defineConfig } from "@playwright/test";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { ENGINE_ENV, ENGINE_URL, SESSION_SECRET, engineRunner, REPO_ROOT } from "./desk.ts";

const HERE = dirname(fileURLToPath(import.meta.url));
const WEB = join(HERE, "..");
const PORT = Number(process.env.CHECKS_PORT ?? 3303);
const BASE = `http://127.0.0.1:${PORT}`;
const CI = !!process.env.CI;
const tsx = engineRunner();

if (!existsSync(join(WEB, ".next", "BUILD_ID")) && !process.env.CHECKS_BASE_URL) {
  throw new Error("No production build in web/.next: run `npm run build` first (the checks test what ships).");
}

export default defineConfig({
  testDir: HERE,
  outputDir: join(HERE, "test-results"),
  globalSetup: join(HERE, "global-setup.ts"),
  // Baselines are per platform: they are made on Linux (CI's machine), so a Mac never overwrites them.
  snapshotPathTemplate: "{testDir}/visual/{platform}/{arg}{ext}",
  fullyParallel: true,
  workers: process.env.CHECKS_WORKERS ? Number(process.env.CHECKS_WORKERS) : 4,
  retries: CI ? 1 : 0,
  forbidOnly: CI,
  timeout: 60_000,
  reporter: CI ? [["list"], ["html", { open: "never", outputFolder: join(HERE, "report") }]] : [["list"]],
  expect: {
    timeout: 15_000,
    toHaveScreenshot: { animations: "disabled", caret: "hide", scale: "device", threshold: 0.2, maxDiffPixels: 64 },
  },
  use: {
    baseURL: process.env.CHECKS_BASE_URL ?? BASE,
    reducedMotion: "reduce",
    trace: "off",
    screenshot: "only-on-failure",
    // One set of fonts, whatever the machine has installed (tests/fonts.conf), so screenshots match across machines.
    launchOptions: { env: { ...process.env, FONTCONFIG_FILE: join(HERE, "fonts.conf") } },
  },
  projects: [
    { name: "a11y", testMatch: "a11y.spec.ts" },
    { name: "visual", testMatch: "visual.spec.ts" },
    { name: "pseudo-locale", testMatch: /pseudo-locale(-self)?\.spec\.ts/ },
  ],
  webServer: process.env.CHECKS_BASE_URL ? undefined : [
    ...(tsx ? [{
      command: `${tsx} src/index.ts`, cwd: REPO_ROOT, url: `${ENGINE_URL}/healthz`, env: ENGINE_ENV,
      reuseExistingServer: !CI, timeout: 60_000, stdout: "ignore" as const, stderr: "pipe" as const,
    }] : []),
    {
      command: `npx next start -p ${PORT} -H 127.0.0.1`, cwd: WEB, url: `${BASE}/login`,
      env: {
        DESIGN_GALLERY: "true", ENGINE_API_URL: ENGINE_URL, PORTAL_SESSION_SECRET: SESSION_SECRET, NEXT_TELEMETRY_DISABLED: "1",
      },
      reuseExistingServer: !CI, timeout: 60_000, stdout: "ignore", stderr: "pipe",
    },
  ],
});
