// CoFile's licensed fonts, sealed for a public repository (web/public/fonts/README.md).
//
// The WOFF2 files are never committed as they are. They travel in git as one AES-256-GCM sealed bundle,
// web/design/licensed-fonts.sealed, whose key lives only in the deployment's settings (LICENSED_FONTS_KEY on
// Vercel). The build opens the bundle into web/public/fonts before `next build`; without the key the build goes on
// with the metric-matched stand-in fonts, so CI and forks build as before.
//
//   node scripts/licensed-fonts.mjs unpack   the build step (npm run build): opens the bundle when the key is set
//   node scripts/licensed-fonts.mjs pack     seals web/public/fonts/*.woff2 into the bundle with the key in the env
//   node scripts/licensed-fonts.mjs key      prints a new random key (base64, 32 bytes)
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const WEB = new URL("..", import.meta.url);
const FONTS = fileURLToPath(new URL("public/fonts/", WEB));
const BUNDLE = fileURLToPath(new URL("design/licensed-fonts.sealed", WEB));
const MAGIC = Buffer.from("CFF1");
const NAME = /^[a-z0-9-]+\.woff2$/;

function keyFromEnv() {
  const raw = process.env.LICENSED_FONTS_KEY?.trim();
  if (!raw) return null;
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) throw new Error("LICENSED_FONTS_KEY must be 32 bytes, base64");
  return key;
}

/** The files, one after another: name length (1 byte), name, size (4 bytes), bytes. */
function packFiles(files) {
  const parts = [];
  for (const [name, body] of files) {
    const n = Buffer.from(name);
    const size = Buffer.alloc(4);
    size.writeUInt32BE(body.length);
    parts.push(Buffer.from([n.length]), n, size, body);
  }
  return Buffer.concat(parts);
}

function unpackFiles(buf) {
  const files = [];
  for (let i = 0; i < buf.length; ) {
    const len = buf[i];
    const name = buf.subarray(i + 1, i + 1 + len).toString();
    const size = buf.readUInt32BE(i + 1 + len);
    const start = i + 5 + len;
    files.push([name, buf.subarray(start, start + size)]);
    i = start + size;
  }
  return files;
}

export function seal(files, key) {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key, iv);
  const body = Buffer.concat([c.update(packFiles(files)), c.final()]);
  return Buffer.concat([MAGIC, iv, c.getAuthTag(), body]);
}

export function open(sealed, key) {
  if (!sealed.subarray(0, 4).equals(MAGIC)) throw new Error("not a sealed font bundle");
  const d = createDecipheriv("aes-256-gcm", key, sealed.subarray(4, 16));
  d.setAuthTag(sealed.subarray(16, 32));
  return unpackFiles(Buffer.concat([d.update(sealed.subarray(32)), d.final()]));
}

const cmd = process.argv[2] ?? "unpack";
if (cmd === "key") {
  console.log(randomBytes(32).toString("base64"));
} else if (cmd === "pack") {
  const key = keyFromEnv();
  if (!key) throw new Error("set LICENSED_FONTS_KEY to seal the fonts");
  const names = readdirSync(FONTS).filter((f) => NAME.test(f)).sort();
  if (!names.length) throw new Error(`no .woff2 files in ${FONTS}`);
  writeFileSync(BUNDLE, seal(names.map((n) => [n, readFileSync(FONTS + n)]), key));
  console.log(`sealed ${names.length} fonts into ${BUNDLE}`);
} else if (cmd === "unpack") {
  const key = keyFromEnv();
  if (!existsSync(BUNDLE)) console.log("licensed fonts: no sealed bundle, building with the stand-in fonts");
  else if (!key) console.log("licensed fonts: LICENSED_FONTS_KEY isn't set, building with the stand-in fonts");
  else {
    // A key that doesn't open the bundle is a settings mistake: stop the build rather than ship the stand-ins unseen.
    let files;
    try { files = open(readFileSync(BUNDLE), key); } catch { console.error("licensed fonts: LICENSED_FONTS_KEY doesn't open the sealed bundle"); process.exit(1); }
    mkdirSync(FONTS, { recursive: true });
    for (const [name, body] of files) if (NAME.test(name)) writeFileSync(FONTS + name, body);
    console.log(`licensed fonts: opened ${files.length} fonts into public/fonts`);
  }
} else {
  throw new Error(`unknown command ${cmd}`);
}
