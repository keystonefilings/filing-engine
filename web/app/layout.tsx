import type { Metadata } from "next";
import "@/styles/fonts.css";
import { licensedFonts } from "@/lib/licensed-fonts";
import { THEME_SCRIPT } from "@/lib/theme";
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
  return {
    title: { default: platformName(), template: `%s · ${platformName()}` }, robots: { index: process.env.SITE_INDEXABLE === "true" },
    // CoFile's own icons (owner's identity package). Set as metadata, not as app/icon files, so the pages a firm's
    // clients see can replace them with the firm's monogram (lib/firm-icon.ts; decision 12).
    icons: {
      icon: [{ url: "/cofile/identity/cofile-favicon.svg", type: "image/svg+xml" }, { url: "/cofile/identity/favicon.ico", sizes: "16x16 32x32 48x48" }],
      apple: [{ url: "/cofile/identity/apple-touch-icon-180.png", sizes: "180x180" }],
    },
    manifest: "/cofile/identity/site.webmanifest",
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fonts = licensedFonts();
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        {fonts.preload ? <link rel="preload" href={fonts.preload} as="font" type="font/woff2" crossOrigin="" /> : null}
        {fonts.css ? <style>{fonts.css}</style> : null}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@400;500;600&family=Source+Serif+4:opsz,wght@8..60,500;8..60,600&display=swap" />
      </head>
      <body>{process.env.SITE_BETA_BANNER !== "false" ? <BetaBanner name={platformName()} email={supportEmail()} /> : null}{children}</body>
    </html>
  );
}
