/** The status glyphs (merged spec 4.3, 4.4): shape carries the meaning, so color is never alone. */
export type GlyphKind = "done" | "turn" | "attention" | "inhand" | "problem" | "ghost";

export function Glyph({ kind }: { kind: GlyphKind }) {
  switch (kind) {
    case "done":
      return <svg viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="5" fill="currentColor" /></svg>;
    case "turn":
      return <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 0.8 11.2 6 6 11.2 0.8 6Z" fill="currentColor" /></svg>;
    case "attention":
      return (
        <svg viewBox="0 0 12 12" aria-hidden="true">
          <circle cx="6" cy="6" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <path d="M6 1.25a4.75 4.75 0 0 1 0 9.5Z" fill="currentColor" />
        </svg>
      );
    case "inhand":
      return <svg viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>;
    case "problem":
      return <svg viewBox="0 0 12 12" aria-hidden="true"><rect x="0" y="4" width="12" height="4" fill="currentColor" /></svg>;
    case "ghost":
      // The ghost light: a bare bulb in a wire cage on a stand (4.4), the rehearsal's sign.
      return (
        <svg className="ghost" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
          <circle cx="7" cy="4.5" r="3" strokeWidth="1.5" />
          <path d="M3.6 4.5a3.4 3.4 0 0 1 6.8 0M3.9 6.3a3.4 3.4 0 0 0 6.2 0" />
          <path d="M7 7.6V12.6M4.6 12.8h4.8M7 12.6 5 13.2M7 12.6l2 .6" />
        </svg>
      );
  }
}

/** The rehearsal's dashed outline: SVG dashes, the same in every browser (11.6). */
export function DashedOutline() {
  return (
    <svg className="dash" aria-hidden="true" preserveAspectRatio="none">
      <rect x="0" y="0" width="100%" height="100%" rx="3" ry="3" />
    </svg>
  );
}
