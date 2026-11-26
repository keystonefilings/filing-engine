import "@/styles/components/vignette.css";

/** The eleven engraved vignettes (owner's identity package, Nov 26; merged spec 7, D1.4), by name. */
export type VignetteName =
  | "v01-blank-plate" | "v02-clear-desk" | "v03-returned-envelope" | "v04-letter-at-door" | "v05-door-from-step" | "v06-fountain-pen"
  | "v07-card-face-down" | "v08-phone-bakery-counter" | "v09-paper-plane" | "v10-ruled-sheet" | "v11-empty-envelope";

/**
 * A one-ink engraved vignette beside the words that carry the meaning, so its alt is empty. The small master is drawn
 * for 120 to 160 px, the full one for larger; the dark export shows on Night in dark mode (by the device's setting or
 * the site's appearance switch). `size` is the width in px; phones may pass a smaller `phone` width.
 */
export function Vignette({ name, size = 120, phone, master }: { name: VignetteName; size?: number; phone?: number; master?: "small" | "full" }) {
  const m = master ?? (size <= 200 ? "small" : "full");
  const base = `/cofile/vignettes/${name}${m === "small" ? "-small" : ""}`;
  return (
    <span className="vignette2" style={{ ["--v-w" as string]: `${size}px`, ["--v-w-phone" as string]: `${phone ?? size}px` }} aria-hidden="true">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="vignette2-light" src={`${base}.svg`} alt="" loading="lazy" decoding="async" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="vignette2-dark" src={`${base}-dark.svg`} alt="" loading="lazy" decoding="async" />
    </span>
  );
}
