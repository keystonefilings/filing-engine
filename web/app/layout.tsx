import type { Metadata } from "next";
import "./globals.css";
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
      <body>{process.env.SITE_BETA_BANNER !== "false" ? <BetaBanner name={platformName()} email={supportEmail()} /> : null}{children}</body>
    </html>
  );
}
