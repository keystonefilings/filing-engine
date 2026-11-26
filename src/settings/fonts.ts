/**
 * V21: a firm's font on its client pages. A preset (loaded from Google Fonts) or a font file the
 * firm uploads (custom). Keep in step with web/lib/fonts.ts.
 */
export const FONT_PRESETS = {
  system: { family: null, stack: "system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif" },
  inter: { family: "Inter", stack: "'Inter', system-ui, sans-serif" },
  "ibm-plex-sans": { family: "IBM Plex Sans", stack: "'IBM Plex Sans', system-ui, sans-serif" },
  roboto: { family: "Roboto", stack: "'Roboto', system-ui, sans-serif" },
  "open-sans": { family: "Open Sans", stack: "'Open Sans', system-ui, sans-serif" },
  lato: { family: "Lato", stack: "'Lato', system-ui, sans-serif" },
  montserrat: { family: "Montserrat", stack: "'Montserrat', system-ui, sans-serif" },
  "source-serif-4": { family: "Source Serif 4", stack: "'Source Serif 4', Georgia, serif" },
  merriweather: { family: "Merriweather", stack: "'Merriweather', Georgia, serif" },
  lora: { family: "Lora", stack: "'Lora', Georgia, serif" },
} as const;
export type FontPreset = keyof typeof FONT_PRESETS;
export const FONT_CHOICES = ["custom", ...Object.keys(FONT_PRESETS)] as [string, ...string[]];

export function googleFontHref(preset: string | undefined): string | null {
  const p = preset && preset in FONT_PRESETS ? FONT_PRESETS[preset as FontPreset] : null;
  return p?.family ? `https://fonts.googleapis.com/css2?family=${encodeURIComponent(p.family).replace(/%20/g, "+")}:wght@400;600&display=swap` : null;
}

export const MAX_FONT_BYTES = 600 * 1024;

/** Font formats told by their first bytes. */
export function fontType(b: Buffer): { type: string; format: string } | null {
  const tag = b.subarray(0, 4).toString("latin1");
  if (tag === "wOF2") return { type: "font/woff2", format: "woff2" };
  if (tag === "wOFF") return { type: "font/woff", format: "woff" };
  if (tag === "OTTO") return { type: "font/otf", format: "opentype" };
  if (b.length > 4 && (b.readUInt32BE(0) === 0x00010000 || tag === "true")) return { type: "font/ttf", format: "truetype" };
  return null;
}
