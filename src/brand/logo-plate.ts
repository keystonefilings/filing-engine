import sharp from "sharp";
import { logoBox, PLATE_CUT, PLATE_PAD } from "../comms/email.js";

/**
 * The white plate baked into a firm's logo for email (merged spec 10D.3; owner's decision, Nov 26: firm logos
 * stay visible in forced dark mode). Mail apps that force dark mode recolor backgrounds and text but never
 * images, so the white the logo was drawn on has to be part of the image: 12 px of white around the logo at the
 * size the email shows it, the corners cut at 45° like the Name Plate. On the white sheet the plate is invisible.
 * A logo with no transparent pixels (a JPEG, or a logo on its own solid tile) is used as uploaded.
 */

/** Whether the picture has any transparent pixel, so it needs the plate. False when it can't be read. */
export async function needsPlate(body: Buffer): Promise<boolean> {
  try {
    const img = sharp(body);
    const meta = await img.metadata();
    if (!meta.hasAlpha) return false;
    return !(await img.stats()).isOpaque;
  } catch {
    return false;
  }
}

/** Largest pixel density the plated picture keeps, relative to its size in the email (sharp on 3x screens). */
const MAX_DENSITY = 3;

/** The logo on its white plate, as a PNG; null when the picture can't be read or has no size. */
export async function plateLogo(body: Buffer): Promise<{ body: Buffer; width: number; height: number } | null> {
  try {
    const meta = await sharp(body).metadata();
    const box = logoBox(meta.width, meta.height);
    if (!box || !meta.width) return null;
    const density = Math.min(meta.width / box.width, MAX_DENSITY);
    const w = Math.round(box.width * density), h = Math.round(box.height * density);
    const pad = Math.round(PLATE_PAD * density), cut = Math.round(PLATE_CUT * density);
    const W = w + 2 * pad, H = h + 2 * pad;
    const plate = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><polygon fill="#FFFFFF" points="${cut},0 ${W - cut},0 ${W},${cut} ${W},${H - cut} ${W - cut},${H} ${cut},${H} 0,${H - cut} 0,${cut}"/></svg>`;
    const logo = await sharp(body).resize(w, h, { fit: "fill" }).png().toBuffer();
    const out = await sharp(Buffer.from(plate)).composite([{ input: logo, top: pad, left: pad }]).png({ compressionLevel: 9 }).toBuffer();
    return { body: out, width: W, height: H };
  } catch {
    return null;
  }
}

/** Plated logos by artifact id. Artifacts never change under their id, so an entry never goes stale. */
const cache = new Map<string, Buffer>();
const CACHE_MAX = 64;

export async function platedLogoCached(id: string, body: Buffer): Promise<Buffer | null> {
  const hit = cache.get(id);
  if (hit) return hit;
  const made = await plateLogo(body);
  if (!made) return null;
  if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value!);
  cache.set(id, made.body);
  return made.body;
}
