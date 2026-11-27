// Re-encodes the visual baselines losslessly (zlib level 9, adaptive filters): the same pixels at under half the bytes
// of Playwright's own PNGs, so the repository stays small. Run after updating them (npm run check:visual:update does).
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const dir = fileURLToPath(new URL("./linux/", import.meta.url));
let sharp;
try { sharp = (await import("sharp")).default; } catch { console.warn("compress: sharp isn't installed, the baselines stay as Playwright wrote them"); process.exit(0); }

let before = 0, after = 0, changed = 0;
for (const name of readdirSync(dir).filter((f) => f.endsWith(".png"))) {
  const raw = readFileSync(dir + name);
  const packed = await sharp(raw).png({ compressionLevel: 9, adaptiveFiltering: true, effort: 10 }).toBuffer();
  before += raw.length;
  // Only a real gain rewrites a file, so running this again leaves committed baselines untouched.
  if (packed.length < raw.length * 0.97) { writeFileSync(dir + name, packed); changed++; after += packed.length; } else after += raw.length;
}
console.log(`compress: ${changed} baseline(s) re-encoded, ${(before / 1048576).toFixed(1)} MB → ${(after / 1048576).toFixed(1)} MB`);
