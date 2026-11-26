import "@/styles/components/vignette.css";

/**
 * CoFile's horizontal lockup (merged spec 3.3), the drawn artwork from the owner's identity package: the Name Plate,
 * then the wordmark with its lozenge i-dot. The Display master shows at 28 px and up, the Small master below (the
 * compact header and phones, by context in CSS); the dark export (Night Ink wordmark, Brass plate and lozenge) shows
 * on Night. The images are decorative; the name is read from text.
 */
export function Lockup({ height = 28, name = "CoFile" }: { height?: number; name?: string }) {
  const src = (master: "" | "-small", theme: "light" | "dark") => `/cofile/identity/cofile-lockup-horizontal${master}-${theme}.svg`;
  // Intrinsic proportions of the artwork's view boxes (5290 × 951 and 5390 × 951).
  const img = (master: "" | "-small", theme: "light" | "dark", ratio: number) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={`ident-${theme}`} src={src(master, theme)} alt="" width={Math.round(height * ratio)} height={height} decoding="async" />
  );
  return (
    <span className={["lockup2", height < 28 && "is-small"].filter(Boolean).join(" ")} style={{ ["--lockup-h" as string]: `${height}px` }}>
      <span className="lockup2-d" aria-hidden="true">{img("", "light", 5290 / 951)}{img("", "dark", 5290 / 951)}</span>
      <span className="lockup2-s" aria-hidden="true">{img("-small", "light", 5390 / 951)}{img("-small", "dark", 5390 / 951)}</span>
      <span className="sr-only">{name}</span>
    </span>
  );
}
