"use client";

import { usePathname } from "next/navigation";
import { BETA_CLIENT_TEXT } from "@/lib/beta";

/**
 * The site-wide beta notice (owner, Nov 26). Not in the widget firms embed on their own websites. On a
 * firm's white-label pages (portal, client links, public forms) it names neither us nor our address,
 * so the firm's own brand stays the only one; on our own pages it gives our contact. SITE_BETA_BANNER=false
 * turns it off. A client page (components/ClientPage.tsx) draws its own strip inside the firm's sheet instead
 * (merged spec 10B.1.8), and this one hides itself there in CSS.
 */
const OWN = /^\/($|login|signup|docs|dashboard|terms|privacy|forgot-password|reset-password|verify-email|invite-expired|session-ended|auth|how-it-works|for-firms|what-we-file|pricing|security|faq|platforms)/;

export function BetaBanner({ name, email }: { name: string; email: string }) {
  const path = usePathname() ?? "/";
  if (path.startsWith("/embed")) return null;
  const own = OWN.test(path);
  return (
    <div className="beta-banner" role="note">
      <strong>Beta</strong>
      <span>
        {own ? `${name} is in beta. Any filing can run as a free rehearsal on the state's real website. It stops before the last button, so nothing is filed or paid. Filing types go live one at a time.` : BETA_CLIENT_TEXT}
        {own ? <> Questions or problems? <a href={`mailto:${email}`}>{email}</a></> : null}
      </span>
    </div>
  );
}
