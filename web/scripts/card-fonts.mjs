// The link-preview cards' fonts (lib/share-card.tsx). The cards are drawn at build time by next/og, which reads TTF,
// OTF and WOFF but not WOFF2, and the licensed fonts arrive as WOFF2 (scripts/licensed-fonts.mjs opens them into
// public/fonts). So the faces the cards use are decoded here into the build's own cache, which is never committed or
// served: web/node_modules/.cache/cofile-card-fonts. Without the licensed fonts (CI, forks) the cache is emptied and
// the cards fall back to the stand-ins the site itself falls back to.
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const FONTS = fileURLToPath(new URL("../public/fonts/", import.meta.url));
const CACHE = fileURLToPath(new URL("../node_modules/.cache/cofile-card-fonts/", import.meta.url));
const FACES = ["miller-text-400", "founders-grotesk-400"];

rmSync(CACHE, { recursive: true, force: true });
const present = FACES.filter((f) => existsSync(`${FONTS}${f}.woff2`));
if (!present.length) {
  console.log("card fonts: no licensed fonts here, the link-preview cards use the stand-ins");
} else {
  let decompress;
  try { decompress = createRequire(import.meta.url)("wawoff2/decompress"); } catch {
    console.log("card fonts: wawoff2 isn't installed, the link-preview cards use the stand-ins");
  }
  if (decompress) {
    mkdirSync(CACHE, { recursive: true });
    for (const face of present) writeFileSync(`${CACHE}${face}.ttf`, Buffer.from(await decompress(readFileSync(`${FONTS}${face}.woff2`))));
    console.log(`card fonts: ${present.length} licensed face(s) ready for the link-preview cards`);
  }
}
