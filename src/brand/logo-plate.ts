import sharp from "sharp";
import { LIGHT_PLATE_PAD_Y, logoBox, PLATE_CUT, PLATE_PAD } from "../comms/email.js";

/**
 * The plate baked into a firm's logo for email (merged spec 10D.3; owner's decision, Nov 26: firm logos stay visible
 * in forced dark mode). Mail apps that force dark mode recolor backgrounds and text but never images, so the ground
 * the logo was drawn for has to be part of the image, at the size the email shows it, the corners cut at 45° like the
 * Name Plate. For most logos that is 12 px of white, invisible on the white sheet. A logo of light marks (drawn for a
 * dark website, 10B.2.3) goes on its dark plate instead, 8 × 12 px, in the plate color the pages use: seen on the white
 * sheet, by design. A logo with no transparent pixels (a JPEG, or a logo on its own solid tile) is used as uploaded.
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

/** The plate's margins in email px: 12 all round on white; 12 across and 8 above and below on a light logo's plate. */
export function platePad(color?: string): { x: number; y: number } {
  return color && color.toUpperCase() !== "#FFFFFF" ? { x: PLATE_PAD, y: LIGHT_PLATE_PAD_Y } : { x: PLATE_PAD, y: PLATE_PAD };
}

/** The logo on its plate (white unless `color` is given), as a PNG; null when the picture can't be read or has no size. */
export async function plateLogo(body: Buffer, color = "#FFFFFF"): Promise<{ body: Buffer; width: number; height: number } | null> {
  if (!/^#[0-9A-Fa-f]{6}$/.test(color)) return null;
  try {
    const meta = await sharp(body).metadata();
    const box = logoBox(meta.width, meta.height);
    if (!box || !meta.width) return null;
    const density = Math.min(meta.width / box.width, MAX_DENSITY);
    const w = Math.round(box.width * density), h = Math.round(box.height * density);
    const pad = platePad(color);
    const px = Math.round(pad.x * density), py = Math.round(pad.y * density), cut = Math.round(PLATE_CUT * density);
    const W = w + 2 * px, H = h + 2 * py;
    const plate = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><polygon fill="${color}" points="${cut},0 ${W - cut},0 ${W},${cut} ${W},${H - cut} ${W - cut},${H} ${cut},${H} 0,${H - cut} 0,${cut}"/></svg>`;
    const logo = await sharp(body).resize(w, h, { fit: "fill" }).png().toBuffer();
    const out = await sharp(Buffer.from(plate)).composite([{ input: logo, top: py, left: px }]).png({ compressionLevel: 9 }).toBuffer();
    return { body: out, width: W, height: H };
  } catch {
    return null;
  }
}

/** Plated logos by artifact id and plate color. Artifacts never change under their id, so an entry never goes stale. */
const cache = new Map<string, Buffer>();
const CACHE_MAX = 64;

export async function platedLogoCached(id: string, body: Buffer, color?: string): Promise<Buffer | null> {
  const key = `${id}:${color ?? "#FFFFFF"}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const made = await plateLogo(body, color);
  if (!made) return null;
  if (cache.size >= CACHE_MAX) cache.delete(cache.keys().next().value!);
  cache.set(key, made.body);
  return made.body;
}
