import { ImageResponse } from "next/og";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { shareCard, type SharePage } from "./share-cards.ts";

/**
 * The link-preview cards (merged spec 13.3: "1200 × 630 PNG templates rendered per page at build: the page's h1 in
 * Miller on Cotton …; the home page's in a dusk version on C4"), drawn at build time by each public page's
 * opengraph-image. CoFile's look: Cotton paper, Plate Ink, the lockup from the identity package, the page's own kicker
 * and h1 (lib/share-cards.ts), and the blank plate (C3 by day; C4 at dusk for the home page) in the right third.
 * Only CoFile's own pages carry one: a firm's client pages have their own neutral card (lib/client-card.tsx).
 */
export const CARD_SIZE = { width: 1200, height: 630 };
export const CARD_TYPE = "image/png";

const WEB = process.cwd();
const INK = { cotton: "#FBFAF6", plateInk: "#1D2130", graphite: "#555867", brassLine: "#A87A1E", night: "#14161E", nightInk: "#ECE8DF", graphiteDark: "#A9ABB5", brass: "#D9A84A" };

/**
 * Miller Text and Founders Grotesk where the build has them (decoded from the licensed WOFF2 by scripts/card-fonts.mjs),
 * else the metric-matched stand-ins the site itself falls back to (Liberation), else next/og's own sans.
 */
function fonts(): { name: string; data: Buffer; weight: 400; style: "normal" }[] {
  const pick = (...paths: string[]) => paths.find((p) => existsSync(p));
  const cache = join(WEB, "node_modules", ".cache", "cofile-card-fonts");
  const serif = pick(join(cache, "miller-text-400.ttf"), "/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf");
  const sans = pick(join(cache, "founders-grotesk-400.ttf"), "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf");
  return [
    ...(serif ? [{ name: "Card Serif", data: readFileSync(serif), weight: 400 as const, style: "normal" as const }] : []),
    ...(sans ? [{ name: "Card Sans", data: readFileSync(sans), weight: 400 as const, style: "normal" as const }] : []),
  ];
}

const dataUrl = (type: string, body: Buffer) => `data:${type};base64,${body.toString("base64")}`;

/** The blank plate, cropped around the plate to the panel's shape, as a JPEG next/og can read (it can't read WebP). */
async function platePhoto(dusk: boolean, width: number): Promise<string | null> {
  try {
    const sharp = (await import("sharp")).default;
    const file = join(WEB, "public", "cofile", "photography", dusk ? "c04-close-dusk.webp" : "c03-close-day.webp");
    // The 1824 × 798 frame; the plate's centre sits at x 1475.
    const cropW = Math.round((width / CARD_SIZE.height) * 798);
    const left = Math.min(1824 - cropW, Math.max(0, 1475 - Math.round(cropW / 2)));
    const jpeg = await sharp(file).extract({ left, top: 0, width: cropW, height: 798 }).resize(width, CARD_SIZE.height).jpeg({ quality: 84, mozjpeg: true }).toBuffer();
    return dataUrl("image/jpeg", jpeg);
  } catch {
    return null;
  }
}

export async function renderShareCard(page: SharePage): Promise<ImageResponse> {
  const card = shareCard(page);
  const dusk = !!card.dusk;
  const photoW = 400;
  const photo = await platePhoto(dusk, photoW);
  const textW = CARD_SIZE.width - (photo ? photoW : 0) - 72 - 64;
  const lockup = readFileSync(join(WEB, "public", "cofile", "identity", `cofile-lockup-horizontal-${dusk ? "dark" : "light"}.svg`));
  const longest = Math.max(...card.lines.map((l) => l.length));
  // As large as the longest line allows (a line of Miller averages about half an em a character), and no more than four lines tall.
  const size = Math.round(Math.max(40, Math.min(88, textW / (longest * 0.5), 360 / (card.lines.length * 1.08))));
  const ink = dusk ? INK.nightInk : INK.plateInk;
  const cardFonts = fonts();

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: dusk ? INK.night : INK.cotton }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 64px 64px 72px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dataUrl("image/svg+xml", lockup)} width={Math.round((44 * 5290) / 951)} height={44} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {card.kicker ? (
              <div style={{ display: "flex", alignItems: "center", marginBottom: 28, fontFamily: "Card Sans", fontSize: 26, color: dusk ? INK.graphiteDark : INK.graphite }}>
                <div style={{ width: 32, height: 2, marginRight: 16, background: dusk ? INK.brass : INK.brassLine }} />
                {card.kicker}
              </div>
            ) : null}
            <div style={{ display: "flex", flexDirection: "column", fontFamily: "Card Serif", fontSize: size, lineHeight: 1.08, letterSpacing: "-0.01em", color: ink }}>
              {card.lines.map((line) => <div key={line}>{line}</div>)}
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {photo ? <img src={photo} width={photoW} height={CARD_SIZE.height} alt="" /> : null}
      </div>
    ),
    { ...CARD_SIZE, fonts: cardFonts.length ? cardFonts : undefined },
  );
}

/** The card's alt text: the page's own words. */
export function shareCardAlt(page: SharePage): string {
  const card = shareCard(page);
  return [card.kicker, card.lines.join(" ")].filter(Boolean).join(": ");
}
