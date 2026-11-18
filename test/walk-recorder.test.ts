import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { startFixtureServer } from "../fixtures/serve.js";
import { startRecorder } from "../tools/walk-recorder.js";

let fx: Awaited<ReturnType<typeof startFixtureServer>>;
const out = mkdtempSync(path.join(tmpdir(), "ke-walk-"));

beforeAll(async () => { fx = await startFixtureServer(); });
afterAll(async () => { await fx.close(); rmSync(out, { recursive: true, force: true }); });

describe("walk recorder", () => {
  it("captures screens, blocks Pay Now, and never writes sensitive values", async () => {
    const r = await startRecorder({
      walk: "fixture", url: `${fx.url}/nj-formation/payment.html`, outRoot: out, headless: true,
      profileDir: path.join(out, "profile"), date: "test",
    });
    try {
      const page = r.page;
      // A sensitive field typed into by the person must not reach disk.
      await page.evaluate(() => {
        const i = document.createElement("input");
        i.id = "ssn"; i.name = "ssn"; i.setAttribute("aria-label", "SSN");
        document.body.prepend(i);
      });
      await page.waitForTimeout(200);
      await page.fill("#ssn", "123-45-6789");
      await page.fill("#FirstName", "Walker");
      await r.captureNow();

      // Pay Now is blocked: the page must not navigate to submitted.html.
      await page.click("input[value='Pay Now']");
      await page.waitForTimeout(1500);
      expect(page.url()).toContain("payment.html");
      expect(await page.locator("#__walk_banner").innerText()).toContain("Blocked by the walk recorder");

      // An ordinary navigation is captured automatically.
      await page.goto(`${fx.url}/nj-formation/welcome.html`);
      await page.waitForTimeout(1500);
    } finally {
      await r.stop();
    }
    const files = readdirSync(r.outDir);
    expect(files.filter((f) => f.endsWith(".png")).length).toBeGreaterThanOrEqual(2);
    const all = files.filter((f) => /\.(html|json|txt)$/.test(f)).map((f) => readFileSync(path.join(r.outDir, f), "utf8")).join("\n");
    expect(all).not.toContain("123-45-6789");
    expect(all).not.toContain("6789");
    expect(all).toContain("Select Payment Type");
  });

  it("lets an explicitly allowed button through once, then blocks the same label again", async () => {
    const r = await startRecorder({
      walk: "fixture-allow", url: `${fx.url}/nj-formation/payment.html`, outRoot: out, headless: true,
      profileDir: path.join(out, "profile2"), date: "test", allow: ["Pay Now"],
    });
    try {
      await r.page.click("input[value='Pay Now']");
      await r.page.waitForURL(/submitted\.html/, { timeout: 5000 });
      // A second "Pay Now" (as a payment gateway's own button might be labelled) is blocked.
      await r.page.goto(`${fx.url}/nj-formation/payment.html`);
      await r.page.click("input[value='Pay Now']");
      await r.page.waitForTimeout(1500);
      expect(r.page.url()).toContain("payment.html");
      expect(await r.page.locator("#__walk_banner").innerText()).toContain("already used once");
    } finally {
      await r.stop();
    }
  });
});
