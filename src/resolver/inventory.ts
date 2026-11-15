import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Page } from "playwright";
import type { PageInventory } from "./types.js";

/**
 * Reads the live page and returns every form control with the best label we can
 * find, its required flag, options, and the prices shown on the page. The script
 * runs in the browser (see inventory.browser.js) and tags each control with a
 * data-ke-ref attribute so the filler can locate it afterwards without selectors.
 */
const SCRIPT = readFileSync(path.join(path.dirname(fileURLToPath(import.meta.url)), "inventory.browser.js"), "utf8");

export async function collectInventory(page: Page): Promise<PageInventory> {
  return page.evaluate(SCRIPT) as Promise<PageInventory>;
}
