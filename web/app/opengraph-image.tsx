import { CARD_SIZE, CARD_TYPE, renderShareCard, shareCardAlt } from "@/lib/share-card";

// The home page's, the dusk version: also every page below that has none of its own link-preview card, drawn at build time (lib/share-card.tsx).
export const dynamic = "force-static";
export const size = CARD_SIZE;
export const contentType = CARD_TYPE;
export const alt = shareCardAlt("home");

export default function Image() {
  return renderShareCard("home");
}
