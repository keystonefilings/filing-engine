import { CLIENT_CARD_SIZE, clientCard, firmOfSlug } from "@/lib/client-card";

// The link-preview card of a firm's page for one filing: the firm's, never CoFile's (decision 12; lib/client-card.tsx).
export const size = CLIENT_CARD_SIZE;
export const contentType = "image/png";
export const alt = "";

export default async function Image({ params }: { params: Promise<{ firm: string; service: string }> | { firm: string; service: string } }) {
  const p = await params;
  return clientCard(firmOfSlug(p.firm));
}
