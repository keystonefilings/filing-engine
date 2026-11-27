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
