import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { chromium, type Browser } from "playwright";
import { renderReviewPage } from "../src/approvals/render.js";
import { contrast, DEFAULT_BUTTON, INK, MIN_CONTRAST, primaryButton, WHITE } from "../src/approvals/contrast.js";

/**
 * The proof's approve button authorizes a non-refundable state fee, so its label must read on the
 * firm's color: ink or white, whichever reads better, else the default green button.
 */

const hex = (n: number) => `#${n.toString(16).padStart(6, "0").toUpperCase()}`;

describe("approve button colors for a firm color", () => {
  it("always reaches 4.5:1, keeping the firm's color whenever ink or white can", () => {
    // Every 4-bit-per-channel color, plus a fixed pseudo-random sample of the full range.
    const colors: string[] = [];
    for (let r = 0; r < 16; r++) for (let g = 0; g < 16; g++) for (let b = 0; b < 16; b++) colors.push(hex(r * 0x110000 + g * 0x1100 + b * 0x11));
    let seed = 20261126;
    for (let i = 0; i < 20000; i++) { seed = (seed * 1103515245 + 12345) % 2 ** 31; colors.push(hex(seed % 0x1000000)); }
    for (const c of colors) {
      const b = primaryButton(c);
      expect(contrast(b.text, b.background), c).toBeGreaterThanOrEqual(MIN_CONTRAST);
      const best = Math.max(contrast(INK, c), contrast(WHITE, c));
      expect(b.firm, c).toBe(best >= MIN_CONTRAST);
      if (b.firm) expect([b.background, contrast(b.text, c)], c).toEqual([c, best]);
      else expect({ background: b.background, text: b.text }, c).toEqual(DEFAULT_BUTTON);
    }
  });
});

describe("approve button on the rendered proof", () => {
  let browser: Browser;
  beforeAll(async () => { browser = await chromium.launch(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {}); });
  afterAll(async () => { await browser?.close(); });

  const rgb = (css: string) => {
    const m = /^rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)$/.exec(css);
    if (!m) throw new Error(`unexpected color ${css}`);
    expect(m[4] ?? "1").toBe("1"); // opaque, so the ratio is the one the client sees
    return `#${[m[1], m[2], m[3]].map((v) => Number(v).toString(16).padStart(2, "0")).join("").toUpperCase()}`;
  };

  /** The approve button's and brand bar's computed colors, as the browser draws the page. */
  async function shown(primaryColor?: string) {
    const html = renderReviewPage({
      filingId: "f1", filingTitle: "NJ LLC", payload: { name: "Blue Harbor LLC" }, fees: [{ label: "Filing fee", amountUsd: 125 }],
      expiresAt: "2026-12-03T22:00:00Z", einInRun: false, postUrl: "/approve/t", requireCode: false, brandName: "Rivera Tax", primaryColor,
    });
    const page = await browser.newPage();
    try {
      await page.route("**/*", (r) => r.abort()); // no web fonts: colors only
      await page.setContent(html, { waitUntil: "domcontentloaded" });
      const button = page.getByRole("button", { name: "Approve, and authorize submission and payment" });
      const [background, text] = await button.evaluate((el) => { const s = getComputedStyle(el); return [s.backgroundColor, s.color]; });
      const bar = await page.locator(".brandbar").evaluate((el) => { const s = getComputedStyle(el); return { width: s.borderTopWidth, color: s.borderTopColor }; });
      return { background: rgb(background!), text: rgb(text!), bar: { width: bar.width, color: rgb(bar.color) } };
    } finally {
      await page.close();
    }
  }

  it("puts dark ink on a light firm color", async () => {
    const s = await shown("#F4C430");
    expect(s).toEqual({ background: "#F4C430", text: INK, bar: { width: "4px", color: "#F4C430" } });
    expect(contrast(s.text, s.background)).toBeGreaterThanOrEqual(MIN_CONTRAST);
  });

  it("puts white on a dark firm color", async () => {
    const s = await shown("#1D3C8C");
    expect(s).toEqual({ background: "#1D3C8C", text: WHITE, bar: { width: "4px", color: "#1D3C8C" } });
    expect(contrast(s.text, s.background)).toBeGreaterThanOrEqual(MIN_CONTRAST);
  });

  it("keeps the default green button without a firm color", async () => {
    const s = await shown(undefined);
    expect({ background: s.background, text: s.text }).toEqual(DEFAULT_BUTTON);
    expect(s.bar.width).toBe("0px");
    expect(contrast(s.text, s.background)).toBeGreaterThanOrEqual(MIN_CONTRAST);
  });

  it("falls back to the default green on a mid-tone neither label reads on, keeping the brand bar", async () => {
    // #D35400: white 4.17:1, ink 3.75:1.
    expect(Math.max(contrast(WHITE, "#D35400"), contrast(INK, "#D35400"))).toBeLessThan(MIN_CONTRAST);
    const s = await shown("#D35400");
    expect(s).toEqual({ ...DEFAULT_BUTTON, bar: { width: "4px", color: "#D35400" } });
    expect(contrast(s.text, s.background)).toBeGreaterThanOrEqual(MIN_CONTRAST);
  });
});
