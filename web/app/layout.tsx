import type { Metadata } from "next";
import "./globals.css";
import { platformName } from "@/lib/brand";

export function generateMetadata(): Metadata {
  return { title: { default: platformName(), template: `%s · ${platformName()}` }, robots: { index: false } };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
