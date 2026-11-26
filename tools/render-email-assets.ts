// Cuts the engine's own small images for mail at 2× (merged spec 10D.5): the ghost light of the rehearsal band
// and CoFile's document card on each document row. Drawn from the same geometry as web/components/ui/glyphs.tsx,
// on white, so a mail app that forces dark mode still shows them on the paper they were drawn for (10D.16).
// CoFile's lockup and the two engravings are the owner's artwork, served by the web app (web/public/cofile/).
//
// usage: npx tsx tools/render-email-assets.ts [outDir]   (default assets/email)
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { chromium } from "playwright";
import { color } from "../src/design/tokens.js";
import { EMAIL_ASSETS } from "../src/comms/email.js";

const out = process.argv[2] ?? "assets/email";
mkdirSync(out, { recursive: true });
const INK = color.light.ink, GRAPHITE = color.light.graphite, RULE_STRONG = color.light["rule-strong"];

const GHOST = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="${INK}" stroke-width="1.25" stroke-linecap="round"><circle cx="7" cy="4.5" r="3" stroke-width="1.5"/><path d="M3.6 4.5a3.4 3.4 0 0 1 6.8 0M3.9 6.3a3.4 3.4 0 0 0 6.2 0"/><path d="M7 7.6V12.6M4.6 12.8h4.8M7 12.6 5 13.2M7 12.6l2 .6"/></svg>`;

// CoFile's own document card (3.9): a plain sheet, its corner clipped at 45°, three grey text bars. Never a
// facsimile of any state's or the IRS's paper.
const DOCUMENT = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 24 32">
<path d="M1.5 1.5H16.5L22.5 7.5V30.5H1.5Z" fill="#FFFFFF" stroke="${GRAPHITE}" stroke-width="1" stroke-linejoin="miter"/>
<rect x="5" y="12" width="14" height="1.5" fill="${RULE_STRONG}"/><rect x="5" y="17" width="14" height="1.5" fill="${RULE_STRONG}"/><rect x="5" y="22" width="9" height="1.5" fill="${RULE_STRONG}"/></svg>`;

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 2 });
for (const [name, svg] of [[EMAIL_ASSETS.ghost, GHOST], [EMAIL_ASSETS.document, DOCUMENT]] as const) {
  await page.setContent(`<!doctype html><html><body style="margin:0;background:#FFFFFF"><div id="a" style="display:inline-block;line-height:0;background:#FFFFFF">${svg}</div></body></html>`);
  await page.locator("#a").screenshot({ path: join(out, name) });
}
await browser.close();
console.log(`wrote ${out}`);
