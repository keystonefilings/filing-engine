import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { SHARE_PAGES, shareCard } from "./share-cards.ts";
import { platformName } from "./brand.ts";
import { PRICING, usd } from "./pricing.ts";

const WEB = new URL("../", import.meta.url);

// The cards carry the pages' locked words and nothing else: every kicker and line is in its page's source, with the
// platform's name and the price standing where the page computes them.
test("each link-preview card says what its page says", () => {
  for (const page of SHARE_PAGES) {
    const card = shareCard(page);
    const file = new URL(card.source, WEB);
    assert.ok(existsSync(file), `${page}: ${card.source} is missing`);
    const source = readFileSync(file, "utf8").replace(/&apos;/g, "'").replace(/&quot;/g, '"');
    for (const text of [card.kicker, ...card.lines].filter((t): t is string => !!t)) {
      // The computed parts (the name, the price) split a line into the pieces the source spells out.
      const pieces = text.split(new RegExp(`${platformName()}|${usd(PRICING.payAsYouGo.filing).replace("$", "\\$")}`)).map((p) => p.trim()).filter(Boolean);
      for (const piece of pieces) assert.ok(source.includes(piece), `${page}: "${piece}" (from "${text}") isn't in ${card.source}`);
    }
  }
});

test("only the home page's card is the dusk version", () => {
  assert.deepEqual(SHARE_PAGES.filter((p) => shareCard(p).dusk), ["home"]);
});
