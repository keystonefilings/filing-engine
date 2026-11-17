import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { chromium, type Browser, type Page } from "playwright";
import { collectInventory } from "../src/resolver/inventory.js";
import { matchIntents } from "../src/resolver/match.js";
import { snapshotFromInventory } from "../src/resolver/drift.js";
import { NJ_NAME_AVAILABLE, NJ_SCREENS } from "../src/adapters/nj-formation/intents.js";
import type { ScreenIntents } from "../src/resolver/types.js";

/**
 * The NJ intents checked against the real pages captured on the live walk of 2026-11-17
 * (signed out, test entry, nothing submitted). Loaded offline with all network blocked;
 * Bootstrap's ".hide" rule is restored so closed modals stay hidden as they do live.
 * If NJ renames a field, update the capture and the intents together.
 */
const DIR = new URL("./captures/nj-2026-11-17/", import.meta.url);
let browser: Browser;
let page: Page;

beforeAll(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.route("**/*", (r) => r.abort());
});
afterAll(async () => { await browser.close(); });

async function load(file: string) {
  const html = readFileSync(new URL(file, DIR), "utf8").replace("</head>", "<style>.hide{display:none}</style></head>");
  await page.setContent(html, { waitUntil: "domcontentloaded" });
  return collectInventory(page);
}

const CASES: [string, ScreenIntents][] = [
  ["02-business-name.html", NJ_SCREENS.businessName],
  ["03-after-name.html", NJ_SCREENS.designator],
  ["04-after-designator.html", NJ_SCREENS.businessData],
  ["05-purpose.html", NJ_SCREENS.businessPurpose],
  ["06-address.html", NJ_SCREENS.mainAddress],
  ["08-registered-agent.html", NJ_SCREENS.registeredAgent],
  ["09-registered-agent-manual.html", NJ_SCREENS.registeredAgentInfo],
  ["13-member-modal.html", NJ_SCREENS.memberModal],
  ["18-payment.html", NJ_SCREENS.payment],
];

describe("NJ intents against live captures (2026-11-17)", () => {
  for (const [file, screen] of CASES) {
    it(`${screen.screenKey}: every intent matches and no live field is unaccounted for`, async () => {
      const inv = await load(file);
      const m = matchIntents(screen.intents, inv, {}, screen.knownUnused ?? []);
      expect(m.unmatchedIntents.map((i) => i.key)).toEqual([]);
      expect(m.unmatchedFields.map((f) => f.label)).toEqual([]);
    });
  }

  it("duplicate-label pairs land on the right boxes (EIN, ZIP+4)", async () => {
    let inv = await load("04-after-designator.html");
    let m = matchIntents(NJ_SCREENS.businessData.intents, inv);
    expect(m.matched.get("ein")?.name).toBe("FeinNumber");
    expect(m.matched.get("einLocation")?.name).toBe("FeinLocation");
    inv = await load("06-address.html");
    m = matchIntents(NJ_SCREENS.mainAddress.intents, inv);
    expect(m.matched.get("zip")?.name).toBe("Zip");
    expect(m.matched.get("zipPlus")?.name).toBe("ZipPlus");
    inv = await load("09-registered-agent-manual.html");
    m = matchIntents(NJ_SCREENS.registeredAgentInfo.intents, inv);
    expect(m.matched.get("agentZip")?.name).toBe("OfficeZip");
    expect(m.matched.get("agentAttest")?.name).toBe("Attested");
  });

  it("signature box is labelled by its table column and signer", async () => {
    const inv = await load("16-signer-added.html");
    const boxes = inv.fields.filter((f) => f.visible && f.kind === "checkbox");
    expect(boxes.map((b) => b.label)).toEqual(["Signature: Test Signer Walkthrough"]);
  });

  it("notification boxes are told apart by their own text", async () => {
    const inv = await load("18-payment.html");
    const m = matchIntents(NJ_SCREENS.payment.intents, inv);
    expect(m.matched.get("annualReportReminders")?.name).toBe("Gov2GoAnnualReports");
    expect(m.matched.get("corpWatchAlerts")?.name).toBe("Gov2GoCorpWatch");
    expect(m.matched.get("paymentType")?.options?.map((o) => o.label)).toEqual(["-- Select One --", "Credit Card", "E-Check"]);
  });

  it("help text saying 'not required' does not mark the upload required", async () => {
    const inv = await load("05-purpose.html");
    expect(inv.fields.find((f) => f.kind === "file")?.required).toBe(false);
  });

  it("availability wording and fee table are read as captured", async () => {
    await load("03-after-name.html");
    expect(NJ_NAME_AVAILABLE.test(await page.locator("body").innerText())).toBe(true);
    const inv = await load("18-payment.html");
    const amounts = inv.prices.map((p) => p.amountUsd).sort((a, b) => a - b);
    expect(amounts).toEqual([1, 1, 1, 2, 2, 3.5, 25, 50, 100]);
    // Repeated labels must survive into the drift snapshot (multiset, not a map).
    expect(snapshotFromInventory("NJ", "nj.payment", inv).prices).toHaveLength(9);
  });
});
