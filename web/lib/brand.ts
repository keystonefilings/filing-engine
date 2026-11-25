/** The platform's own name, shown on the docs and the dashboard (firm portals show the firm's brand). */
export function platformName(): string {
  return process.env.PLATFORM_NAME?.trim() || "CoFile";
}

/** The engine's public URL as callers use it, for the docs and the OpenAPI servers entry. */
export function publicApiUrl(): string {
  return (process.env.ENGINE_PUBLIC_URL ?? process.env.ENGINE_API_URL ?? "https://api.example.com").replace(/\/+$/, "");
}

/** Only #rgb / #rrggbb colors reach the page's CSS. */
export function safeColor(c: string | undefined, fallback = "#1f4fd1"): string {
  return c && /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(c) ? c : fallback;
}

/** Text color that reads on a brand color: dark on light colors, white on dark ones. */
export function textOn(hex: string): string {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  const lum = 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
  return lum > 0.4 ? "#111111" : "#ffffff";
}

/** Where a firm's logo is shown from: its uploaded picture (served by this site), else its https link. */
export function logoSrc(p: { logoArtifactId?: string; logoUrl?: string } | undefined): string | undefined {
  if (p?.logoArtifactId && /^[0-9a-f-]{36}$/i.test(p.logoArtifactId)) return `/logo/${p.logoArtifactId}`;
  return safeLogo(p?.logoUrl);
}

/** Only https image URLs are shown as logos. */
export function safeLogo(u: string | undefined): string | undefined {
  if (!u) return undefined;
  try { return new URL(u).protocol === "https:" ? u : undefined; } catch { return undefined; }
}

/** Mirrors the engine's PARTNER_SIGNUP_MODE so the sign-up page says what will happen. Approval unless set to "automatic". */
export function partnerApprovalRequired(): boolean {
  return process.env.PARTNER_SIGNUP_MODE !== "automatic";
}

/** The platform's own tenant (mirrors the engine's PLATFORM_TENANT_ID): partners sign up under it. */
export function isPlatformTenant(tenantId: string): boolean {
  return tenantId === (process.env.PLATFORM_TENANT_ID?.trim() || "keystone");
}
