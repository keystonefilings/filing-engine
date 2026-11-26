import type { Metadata } from "next";
import "@/styles/tokens.css";
import "./globals.css";
import "@/styles/type.css";
import "@/styles/registers.css";
import "@/styles/base.css";
import { platformName, supportEmail } from "@/lib/brand";
import { BetaBanner } from "@/components/BetaBanner";

// Every page reads this deployment's settings (PLATFORM_NAME, PARTNER_SIGNUP_MODE, SITE_INDEXABLE) when
// it's served, not when the app was built (V38).
export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  return { title: { default: platformName(), template: `%s · ${platformName()}` }, robots: { index: process.env.SITE_INDEXABLE === "true" } };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap" />
      </head>
      <body>{process.env.SITE_BETA_BANNER !== "false" ? <BetaBanner name={platformName()} email={supportEmail()} /> : null}{children}</body>
    </html>
  );
}
