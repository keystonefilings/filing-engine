/**
 * Draws the QA gallery's logo files (merged spec 10B.2.5) and reads each one the way the product does, so the gallery
 * shows exactly what a firm would get. Run from web/ after changing the cases or the logo analysis:
 *
 *   node --experimental-strip-types scripts/qa-gallery.ts
 *
 * Writes public/cofile/qa-gallery/logos/* and lib/qa-logos.json; then run `npx tsx tools/render-gallery-heads.ts` from the
 * repository's root for the engine's email and proof heads. A "web" upload goes through Branding's processing (a white box
 * read away, the margin trimmed, at most 600 px: lib/logo-process.ts, as components/BrandFields.tsx does it); an "api"
 * upload is kept as sent. The reading is the engine's (lib/design/logo.ts at 600 px, as src/brand/logo-analysis.ts).
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
import { prepareLogoPixels } from "../lib/logo-process.ts";
import { analyzeLogoPixels, type LogoInfo } from "../lib/design/logo.ts";
import { QA_DIR, QA_LOGO_FILES } from "../lib/qa-gallery.ts";

const require = createRequire(import.meta.url);
const sharp = require("sharp") as typeof import("sharp").default;

const web = new URL("..", import.meta.url).pathname;
const pub = join(web, "public");
const outDir = join(pub, QA_DIR, "logos");
mkdirSync(outDir, { recursive: true });

const art = (f: string) => readFileSync(join(pub, "cofile/example-firm", f), "utf8");
const svg = (w: number, h: number, body: string, vb = `0 0 ${w} ${h}`) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="${vb}">${body}</svg>`);
const text = (s: string, o: { x: number; y: number; size: number; fill: string; weight?: number; family?: string; spacing?: number; anchor?: string }) =>
  `<text x="${o.x}" y="${o.y}" font-family="${o.family ?? "Inter Display"}" font-weight="${o.weight ?? 600}" font-size="${o.size}" letter-spacing="${o.spacing ?? 0}" fill="${o.fill}" text-anchor="${o.anchor ?? "start"}">${s.replace(/&/g, "&amp;")}</text>`;
/** An SVG file drawn at `width` px wide, as a transparent PNG. */
const raster = async (file: string, width: number) => sharp(Buffer.from(file), { density: 600 }).resize({ width }).png().toBuffer();
const png = (b: Buffer) => sharp(b).png({ compressionLevel: 9 }).toBuffer();

/** A wordmark of `s` set by the system's Inter Display, trimmed to its ink. */
async function wordmark(s: string, fill: string, size = 120, weight = 600, spacing = 0, family?: string): Promise<Buffer> {
  const w = Math.ceil(s.length * size * 0.75 + 40), h = Math.ceil(size * 1.5);
  return sharp(svg(w, h, text(s, { x: 20, y: size * 1.1, size, fill, weight, spacing, family }))).png().trim({ threshold: 0 }).toBuffer();
}

/** Harbor & Pine's symbol, Northgate's gate and plate lettering, set together as its wide wordmark (examples.tsx). */
function northgate(): string {
  const lettering = art("northgate-plate-lettering.svg").replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").replace(/#1D2130/g, "#C2410C");
  const lh = (142 * 830) / 12011;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 3 169 21" width="169" height="21"><g fill="#C2410C"><rect x="1" y="3" width="4" height="21"/><rect x="15" y="3" width="4" height="21"/><path d="M1 3h5.2L19 19.6V24h-4.6L1 7.4Z"/></g><svg x="27" y="${(26 - lh) / 2 + 0.5}" width="142" height="${lh}" viewBox="0 -20 12011 830">${lettering}</svg></svg>`;
}

const PHOTO = join(pub, "cofile/photography/c01-harbor-pine-entrance.webp");

const makers: Record<string, () => Promise<{ body: Buffer; type: "png" | "jpg" }>> = {
  "hp-symbol": async () => ({ body: await raster(art("harbor-pine-symbol.svg"), 480), type: "png" }),
  "hp-whitebox": async () => ({ body: await sharp({ create: { width: 640, height: 640, channels: 3, background: "#ffffff" } }).composite([{ input: await raster(art("harbor-pine-symbol.svg"), 420), top: 110, left: 110 }]).jpeg({ quality: 90 }).toBuffer(), type: "jpg" }),
  "ng-wordmark": async () => ({ body: await raster(northgate(), 600), type: "png" }),
  "best-wordmark": async () => ({ body: await raster(art("best-accounting-wordmark.svg"), 600), type: "png" }),
  "kitefold-light": async () => ({ body: await raster(art("kitefold-wordmark-light.svg"), 600), type: "png" }),
  "merrow-mid": async () => ({ body: await raster(art("merrow-vale-logo.svg"), 480), type: "png" }),
  "merrow-whitebox": async () => ({ body: await sharp({ create: { width: 640, height: 400, channels: 3, background: "#ffffff" } }).composite([{ input: await raster(art("merrow-vale-logo.svg"), 440), gravity: "centre" }]).jpeg({ quality: 90 }).toBuffer(), type: "jpg" }),
  "square-tile": async () => ({ body: await png(svg(300, 300, `<rect width="300" height="300" fill="#1B2A41"/>${text("OL", { x: 150, y: 178, size: 128, fill: "#ffffff", anchor: "middle" })}${text("ORTEGA &amp; LUND", { x: 150, y: 246, size: 22, fill: "#C9D3E0", weight: 500, spacing: 3, anchor: "middle" }).replace("&amp;amp;", "&amp;")}`)), type: "png" }),
  "dark-site-jpeg": async () => ({ body: await sharp(svg(600, 140, `<rect width="600" height="140" fill="#0E1726"/>${text("NORTHLAKE TAX", { x: 300, y: 88, size: 50, fill: "#ffffff", spacing: 6, anchor: "middle" })}`)).jpeg({ quality: 88 }).toBuffer(), type: "jpg" }),
  "tiny-text": async () => ({ body: await png(svg(160, 18, text("BRIAR LANE BOOKS", { x: 2, y: 14, size: 14, fill: "#6B3F12", spacing: 0.5 }))), type: "png" }),
  "small-64": async () => ({ body: await png(svg(64, 64, `<rect x="4" y="4" width="56" height="56" fill="#334155"/>${text("SL", { x: 32, y: 42, size: 26, fill: "#ffffff", anchor: "middle" })}`)), type: "png" }),
  "huge-4000": async () => ({ body: await sharp(svg(4000, 640, text("LARGE LOGO GROUP", { x: 2000, y: 450, size: 400, fill: "#1F4FD1", weight: 700, anchor: "middle" }))).png({ compressionLevel: 9 }).toBuffer(), type: "png" }),
  "padded-40": async () => ({ body: await png(svg(1000, 600, text("MARGIN STREET", { x: 500, y: 316, size: 44, fill: "#0F766E", spacing: 2, anchor: "middle" }))), type: "png" }),
  photo: async () => ({ body: await sharp(PHOTO).resize({ width: 480, height: 320, fit: "cover" }).jpeg({ quality: 82 }).toBuffer(), type: "jpg" }),
  "light-pale": async () => ({ body: await wordmark("WHITESTONE", "#D6D6D2", 120, 500, 8), type: "png" }),
  "light-yellow": async () => ({ body: await wordmark("Sunnyside", "#F2C200", 140, 700), type: "png" }),
  "white-accent": async () => ({ body: await png(svg(640, 150, `${text("EMBER TAX", { x: 10, y: 104, size: 110, fill: "#ffffff", weight: 700 })}<rect x="12" y="126" width="120" height="12" fill="#F97316"/>`)), type: "png" }),
  "two-tone": async () => ({ body: await png(svg(620, 140, `<rect x="6" y="10" width="120" height="120" fill="#1E293B"/><path d="M66 30 L96 80 H76 V110 H56 V80 H36 Z" fill="#ffffff"/>${text("TWIN OAKS", { x: 150, y: 98, size: 74, fill: "#ffffff", weight: 700 })}`)), type: "png" }),
  "very-wide": async () => ({ body: await wordmark("RIVERBEND PAYROLL", "#0F766E", 60, 500, 3), type: "png" }),
  tall: async () => ({ body: await png(svg(280, 400, `<path d="M140 20 L240 180 H40 Z" fill="#111827"/>${text("PIKE", { x: 140, y: 290, size: 96, fill: "#111827", weight: 700, anchor: "middle" })}${text("&amp; CO.", { x: 140, y: 372, size: 64, fill: "#111827", weight: 500, anchor: "middle" }).replace("&amp;amp;", "&amp;")}`)), type: "png" }),
  shadow: async () => ({ body: await png(svg(560, 180, `<defs><filter id="s" x="-10%" y="-10%" width="130%" height="160%"><feDropShadow dx="6" dy="8" stdDeviation="6" flood-color="#000" flood-opacity="0.35"/></filter></defs><g filter="url(#s)">${text("Lumen", { x: 20, y: 124, size: 130, fill: "#BE185D", weight: 700 })}</g>`)), type: "png" }),
  "long-wordmark": async () => ({ body: await png(svg(900, 150, `${text("HARTWELL, OKAFOR &amp; LINDQVIST", { x: 450, y: 66, size: 46, fill: "#334155", weight: 700, anchor: "middle" }).replace("&amp;amp;", "&amp;")}${text("CERTIFIED ACCOUNTANTS", { x: 450, y: 128, size: 34, fill: "#64748B", weight: 500, spacing: 8, anchor: "middle" })}`)), type: "png" }),
};
for (const c of ["1f4fd1", "0f766e", "15803d", "b45309", "b91c1c", "7e22ce", "be185d", "334155", "111827"]) {
  const names: Record<string, string> = { "1f4fd1": "Alder Street Tax", "0f766e": "Tidewater Books", "15803d": "Greenfield CPA", b45309: "Copperline Payroll", b91c1c: "Redbrick Accounting", "7e22ce": "Violet Hour CPA", be185d: "Rosemont Tax & Books", "334155": "Slate Ledger LLC", "111827": "Inkwell Bookkeeping" };
  makers[`ready-${c}`] = async () => ({ body: await wordmark(names[c]!, `#${c}`, 120, 600, -1), type: "png" });
}

/** Branding's processing of an upload (components/BrandFields.tsx shrinkLogo), on the server: box read away, trimmed, ≤ 600 px. */
async function asUploaded(body: Buffer): Promise<Buffer> {
  const { data, info } = await sharp(body).resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const px = new Uint8ClampedArray(data.buffer, data.byteOffset, data.length);
  const box = prepareLogoPixels(px, info.width, info.height);
  return sharp(Buffer.from(px.buffer, px.byteOffset, px.length), { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract({ left: box.x, top: box.y, width: box.width, height: box.height })
    .resize({ width: 600, height: 600, fit: "inside", withoutEnlargement: true })
    .png({ compressionLevel: 9 }).toBuffer();
}

/**
 * The engine's processing of a logo sent by the API (src/brand/logo-analysis.ts trimLogo): transparent margins, or
 * near-white ones on a picture with no transparency, cut to the ink with 4% of its shorter side; a JPEG stays a JPEG.
 */
async function asSent(body: Buffer, type: "png" | "jpg"): Promise<Buffer> {
  const { data, info } = await sharp(body).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  let clear = false;
  for (let i = 3; i < data.length; i += 4) if (data[i]! < 16) { clear = true; break; }
  const white = (i: number) => Math.min(data[i]!, data[i + 1]!, data[i + 2]!) >= 245;
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4;
    if (clear ? data[i + 3]! > 8 : !white(i)) { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); }
  }
  if (x1 < 0) return body;
  const pad = Math.round(0.04 * Math.min(x1 - x0 + 1, y1 - y0 + 1));
  const left = Math.max(0, x0 - pad), top = Math.max(0, y0 - pad);
  const width = Math.min(w, x1 + pad + 1) - left, height = Math.min(h, y1 + pad + 1) - top;
  if (width >= 0.96 * w && height >= 0.96 * h) return body;
  const cut = sharp(body).extract({ left, top, width, height });
  return type === "jpg" ? cut.jpeg({ quality: 92 }).toBuffer() : cut.png({ compressionLevel: 9 }).toBuffer();
}

/** The engine's reading (src/brand/logo-analysis.ts): the pixels at 600 px, the size of the file itself. */
async function read(body: Buffer): Promise<LogoInfo> {
  const meta = await sharp(body).metadata();
  const { data, info } = await sharp(body).resize({ width: 600, height: 600, fit: "inside", withoutEnlargement: true }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const r = analyzeLogoPixels(data, info.width, info.height);
  return { ...r, width: meta.width!, height: meta.height!, ratio: Math.round((meta.width! / meta.height!) * 1000) / 1000 };
}

const manifest: Record<string, { src: string; info: LogoInfo }> = {};
for (const f of QA_LOGO_FILES) {
  const baseId = f.id.replace(/-web$/, "");
  const make = makers[f.id] ?? makers[baseId];
  if (!make) throw new Error(`no maker for ${f.id}`);
  const made = await make();
  const body = f.upload === "web" ? await asUploaded(made.body) : await asSent(made.body, made.type);
  const type = f.upload === "web" ? "png" : made.type;
  const name = `${f.id}.${type}`;
  writeFileSync(join(outDir, name), body);
  manifest[f.id] = { src: `${QA_DIR}/logos/${name}`, info: await read(body) };
  const i = manifest[f.id]!.info;
  console.log(f.id.padEnd(18), `${i.width}×${i.height}`.padEnd(10), i.background.padEnd(12), `L ${i.inkL.toFixed(2)}`, i.light ? "LIGHT" : "");
}
writeFileSync(join(web, "lib", "qa-logos.json"), `${JSON.stringify(manifest, null, 1)}\n`);
