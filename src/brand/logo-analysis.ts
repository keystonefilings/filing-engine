import sharp from "sharp";
import { analyzeLogoPixels, LOGO_INFO_VERSION, type LogoInfo } from "../design/logo.js";
import type { ArtifactStore } from "../artifacts/store.js";
import type { ClientCompanySettings } from "../settings/schema.js";
import type { Store } from "../store/types.js";

/**
 * A firm's uploaded logo, read on the server (merged spec 3.5.1, 10B.2.3): whether it sits on transparency, a white box
 * or its own tile, and whether its marks are light (a logo drawn for a dark website), with the same reading the web
 * app's live preview uses (src/design/logo.ts, copied from web/lib/design/logo.ts). Read once at upload and stored on
 * the firm's portal settings beside the logo it describes; a logo uploaded before the reading existed is read the first
 * time its firm is loaded.
 */

/** The longest side the reading looks at: the pixels past it change nothing. */
const READ_SIDE = 600;

/** The logo's reading, or null when the picture can't be read. Its size is the picture's own. */
export async function analyzeLogo(body: Buffer): Promise<LogoInfo | null> {
  try {
    const meta = await sharp(body).metadata();
    if (!meta.width || !meta.height) return null;
    const { data, info } = await sharp(body)
      .resize({ width: READ_SIDE, height: READ_SIDE, fit: "inside", withoutEnlargement: true })
      .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const read = analyzeLogoPixels(data, info.width, info.height);
    return { ...read, width: meta.width, height: meta.height, ratio: Math.round((meta.width / meta.height) * 1000) / 1000 };
  } catch {
    return null;
  }
}

/**
 * The logo with its empty margin trimmed (3.5.1, step 1), as the web app's Branding does before it uploads, for a logo
 * sent another way (the API): transparent margins, or near-white ones (OKLCH L over 0.96) on a picture with no
 * transparency, cut to the ink's box with 4% of its shorter side added back. Null when there's nothing worth trimming
 * or the picture can't be read; a JPEG stays a JPEG, anything else becomes a PNG.
 */
export async function trimLogo(body: Buffer): Promise<{ body: Buffer; type: string } | null> {
  try {
    const meta = await sharp(body).metadata();
    const { data, info } = await sharp(body).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const w = info.width, h = info.height;
    let clear = false;
    for (let i = 3; i < data.length; i += 4) if (data[i]! < 16) { clear = true; break; }
    const lin = (v: number) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    // OKLab L > 0.96 is, closely enough, every channel at 249 or more; a light grey ink stays ink.
    const white = (i: number) => lin(data[i]!) > 0.9 && lin(data[i + 1]!) > 0.9 && lin(data[i + 2]!) > 0.9 && Math.min(data[i]!, data[i + 1]!, data[i + 2]!) >= 245;
    let x0 = w, y0 = h, x1 = -1, y1 = -1;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const i = (y * w + x) * 4;
        const ink = clear ? data[i + 3]! > 8 : !white(i);
        if (ink) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
      }
    }
    if (x1 < 0) return null;
    const pad = Math.round(0.04 * Math.min(x1 - x0 + 1, y1 - y0 + 1));
    const left = Math.max(0, x0 - pad), top = Math.max(0, y0 - pad);
    const width = Math.min(w, x1 + pad + 1) - left, height = Math.min(h, y1 + pad + 1) - top;
    if (width >= 0.96 * w && height >= 0.96 * h) return null;
    const cut = sharp(body).extract({ left, top, width, height });
    return meta.format === "jpeg"
      ? { body: await cut.jpeg({ quality: 92 }).toBuffer(), type: "image/jpeg" }
      : { body: await cut.png({ compressionLevel: 9 }).toBuffer(), type: "image/png" };
  } catch {
    return null;
  }
}

/** The stored reading of the firm's uploaded logo, when it is current: of this logo, by this version of the reading. */
export function currentLogoInfo(portal: ClientCompanySettings["portal"]): (LogoInfo & { artifactId: string }) | undefined {
  const info = portal?.logoInfo;
  return info && portal?.logoArtifactId && info.artifactId === portal.logoArtifactId && info.v === LOGO_INFO_VERSION ? info : undefined;
}

/**
 * The firm with a current reading of its uploaded logo: read now (and saved) when it has none, or one of another logo
 * or an older reading. A firm with no uploaded logo, or whose logo can't be found, comes back as it was.
 */
export async function withLogoInfo(deps: { store: Store; artifacts?: ArtifactStore }, c: ClientCompanySettings): Promise<ClientCompanySettings> {
  const portal = c.portal;
  if (!portal?.logoArtifactId || !deps.artifacts || currentLogoInfo(portal)) return c;
  const got = await deps.artifacts.get(portal.logoArtifactId).catch(() => null);
  if (!got || got.meta.kind !== "brand_logo") return c;
  const info = await analyzeLogo(got.body);
  if (!info) return c;
  const next: ClientCompanySettings = { ...c, portal: { ...portal, logoInfo: { ...info, artifactId: portal.logoArtifactId } } };
  // Saved on the stored firm as it is now, so a change made meanwhile isn't overwritten.
  const fresh = await deps.store.getClientCompany(c.clientCompanyId).catch(() => null);
  if (fresh?.portal?.logoArtifactId === portal.logoArtifactId) {
    await deps.store.putClientCompany({ ...fresh, portal: { ...fresh.portal, logoInfo: next.portal!.logoInfo } }).catch(() => undefined);
  }
  return next;
}
