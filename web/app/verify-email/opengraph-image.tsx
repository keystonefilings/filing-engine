import { CARD_SIZE, CARD_TYPE, renderShareCard, shareCardAlt } from "@/lib/share-card";

// This page's link-preview card, drawn at build time (lib/share-card.tsx).
export const dynamic = "force-static";
export const size = CARD_SIZE;
export const contentType = CARD_TYPE;
export const alt = shareCardAlt("verify-email");

export default function Image() {
  return renderShareCard("verify-email");
}
