import { platformName } from "./brand.ts";
import { PRICING, usd } from "./pricing.ts";

/**
 * The words on each public page's link-preview card (merged spec 13.3, "Social card and OG images"): the page's own
 * kicker and h1, as locked on the page, one sentence or phrase per line as the page sets them. Nothing here is new
 * copy; lib/share-cards.test.ts checks every line against the page's source, so a change to a headline that isn't
 * made here too fails `npm test`.
 */
export interface ShareCard {
  /** The page's source file, relative to web/, that the test reads. */
  source: string;
  kicker?: string;
  lines: string[];
  /** The home page's card is the dusk version, on the blank plate at dusk (C4). */
  dusk?: boolean;
}

export function shareCard(page: SharePage): ShareCard {
  const name = platformName();
  const cards: Record<SharePage, ShareCard> = {
    home: { source: "app/page.tsx", kicker: "For CPA, payroll, fractional CFO and title firms", lines: ["Your client needs an LLC.", "Say yes, under your own name."], dusk: true },
    "how-it-works": { source: "app/how-it-works/page.tsx", kicker: "How it works", lines: ["Your client asks.", "You approve it.", `${name} files it.`] },
    "for-firms": { source: "app/for-firms/page.tsx", kicker: "For CPA, payroll, fractional CFO and title firms", lines: ["Form the business.", "Keep the client."] },
    "what-we-file": { source: "app/what-we-file/page.tsx", kicker: "What we file", lines: ["New York,", "New Jersey,", "Florida", "and the IRS."] },
    pricing: { source: "app/pricing/page.tsx", kicker: "Pricing for firms", lines: [`${usd(PRICING.payAsYouGo.filing)} a filing.`, "EIN included with a formation."] },
    security: { source: "app/security/page.tsx", kicker: "Security", lines: ["How we handle what you trust us with."] },
    faq: { source: "app/faq/page.tsx", kicker: "Questions", lines: ["Questions, answered."] },
    platforms: { source: "app/platforms/page.tsx", kicker: "For platforms", lines: ["Building a filing product?", `Put ${name} underneath it.`] },
    terms: { source: "app/terms/page.tsx", lines: ["Terms of Service"] },
    privacy: { source: "app/privacy/page.tsx", lines: ["Privacy Policy"] },
    signup: { source: "components/site-pages/SignupDesk.tsx", kicker: "For firms", lines: ["Set up your firm's filing desk"] },
    login: { source: "app/login/page.tsx", kicker: "Log in", lines: ["Welcome back"] },
    "forgot-password": { source: "app/forgot-password/page.tsx", kicker: "Forgot password", lines: ["Reset your password"] },
    "reset-password": { source: "app/reset-password/page.tsx", kicker: "Reset password", lines: ["Choose a new password"] },
    "verify-email": { source: "app/verify-email/page.tsx", kicker: "Your filing desk", lines: ["Confirm your email"] },
    "invite-expired": { source: "app/invite-expired/page.tsx", lines: ["This link has expired or isn't valid"] },
    "signup-sent": { source: "app/signup/sent/page.tsx", kicker: "Your filing desk", lines: ["Check your email"] },
    docs: { source: "app/docs/page.tsx", lines: [`${name} API`] },
  };
  return cards[page];
}

export const SHARE_PAGES = ["home", "how-it-works", "for-firms", "what-we-file", "pricing", "security", "faq", "platforms", "terms", "privacy", "signup", "login", "forgot-password", "reset-password", "verify-email", "invite-expired", "signup-sent", "docs"] as const;
export type SharePage = (typeof SHARE_PAGES)[number];
