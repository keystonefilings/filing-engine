/**
 * Readable text on a firm's color (the engine's copy of the web app's `textOn`, which the engine
 * can't import). The approve button on the proof authorizes a non-refundable state fee, so its
 * label must read on whatever color the firm picked.
 */

/** The page's dark ink (its body text color) and white: the two label colors a firm button can take. */
export const INK = "#1C2430";
export const WHITE = "#FFFFFF";
/** The engine's own approve button, used when no firm color is set or none reads well enough. */
export const DEFAULT_BUTTON = { background: "#1F6B4F", text: WHITE } as const;
/** WCAG AA for normal-size text. */
export const MIN_CONTRAST = 4.5;

/** WCAG relative luminance of a #rrggbb color. */
export function luminance(hex: string): number {
  const [r, g, b] = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r! + 0.7152 * g! + 0.0722 * b!;
}

/** WCAG contrast ratio between two #rrggbb colors (1 to 21). */
export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi! + 0.05) / (lo! + 0.05);
}

/** Ink or white, whichever has the higher contrast against `bg`. */
export function textOn(bg: string): string {
  return contrast(INK, bg) >= contrast(WHITE, bg) ? INK : WHITE;
}

/**
 * The approve button's colors for a firm color: the firm color with ink or white text, or the
 * default green button when the color isn't a #rrggbb or neither label reaches 4.5:1 on it.
 */
export function primaryButton(color: string | undefined): { background: string; text: string; firm: boolean } {
  if (color && /^#[0-9a-fA-F]{6}$/.test(color)) {
    const text = textOn(color);
    if (contrast(text, color) >= MIN_CONTRAST) return { background: color, text, firm: true };
  }
  return { ...DEFAULT_BUTTON, firm: false };
}
