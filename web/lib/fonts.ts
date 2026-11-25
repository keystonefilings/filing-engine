/** V21: a firm's font on its client pages. Keep in step with src/settings/fonts.ts in the engine. */
export const FONT_PRESETS: Record<string, { label: string; family: string | null; stack: string }> = {
  system: { label: "Standard (the device's own)", family: null, stack: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif" },
  inter: { label: "Inter", family: "Inter", stack: "'Inter', system-ui, sans-serif" },
  "ibm-plex-sans": { label: "IBM Plex Sans", family: "IBM Plex Sans", stack: "'IBM Plex Sans', system-ui, sans-serif" },
  roboto: { label: "Roboto", family: "Roboto", stack: "'Roboto', system-ui, sans-serif" },
  "open-sans": { label: "Open Sans", family: "Open Sans", stack: "'Open Sans', system-ui, sans-serif" },
  lato: { label: "Lato", family: "Lato", stack: "'Lato', system-ui, sans-serif" },
  montserrat: { label: "Montserrat", family: "Montserrat", stack: "'Montserrat', system-ui, sans-serif" },
  "source-serif-4": { label: "Source Serif (serif)", family: "Source Serif 4", stack: "'Source Serif 4', Georgia, serif" },
  merriweather: { label: "Merriweather (serif)", family: "Merriweather", stack: "'Merriweather', Georgia, serif" },
  lora: { label: "Lora (serif)", family: "Lora", stack: "'Lora', Georgia, serif" },
};

export interface BrandFontSpec { stack: string; href?: string; fileUrl?: string }

/** What a page loads for a firm's font choice; null for the standard font. */
export function fontSpec(p: { font?: string; fontArtifactId?: string } | undefined): BrandFontSpec | null {
  if (!p?.font || p.font === "system") return null;
  if (p.font === "custom") {
    return p.fontArtifactId && /^[0-9a-f-]{36}$/i.test(p.fontArtifactId) ? { stack: `"FirmFont", ${FONT_PRESETS.system!.stack}`, fileUrl: `/font/${p.fontArtifactId}` } : null;
  }
  const preset = FONT_PRESETS[p.font];
  if (!preset?.family) return null;
  return { stack: preset.stack, href: `https://fonts.googleapis.com/css2?family=${encodeURIComponent(preset.family).replace(/%20/g, "+")}:wght@400;600&display=swap` };
}
