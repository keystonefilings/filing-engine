/** The platform's own name, shown on the docs and the dashboard (firm portals show the firm's brand). */
export function platformName(): string {
  return process.env.PLATFORM_NAME?.trim() || "Keystone Filings";
}

/** The engine's public URL as callers use it, for the docs and the OpenAPI servers entry. */
export function publicApiUrl(): string {
  return (process.env.ENGINE_PUBLIC_URL ?? process.env.ENGINE_API_URL ?? "https://api.example.com").replace(/\/+$/, "");
}

/** Only #rgb / #rrggbb colors reach the page's CSS. */
export function safeColor(c: string | undefined, fallback = "#1f4fd1"): string {
  return c && /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(c) ? c : fallback;
}

/** Only https image URLs are shown as logos. */
export function safeLogo(u: string | undefined): string | undefined {
  if (!u) return undefined;
  try { return new URL(u).protocol === "https:" ? u : undefined; } catch { return undefined; }
}
