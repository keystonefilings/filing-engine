import { CLIENT_CARD_SIZE, clientCard, firmOfLink } from "@/lib/client-card";

// The link-preview card of a client link: the firm's, never CoFile's (decision 12; lib/client-card.tsx).
export const size = CLIENT_CARD_SIZE;
export const contentType = "image/png";
export const alt = "";

export default async function Image({ params }: { params: Promise<{ token: string }> | { token: string } }) {
  const p = await params;
  return clientCard(firmOfLink(p.token));
}
