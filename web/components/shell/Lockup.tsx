import { NamePlate } from "./NamePlate";

/**
 * The horizontal lockup (merged spec 3.3): the Name Plate, then the wordmark. Interim until the lettering lands:
 * "CoFile" in the headline face's semibold with tracking +10, the i's dot drawn as the lozenge (Brass Line on light
 * grounds, Brass on dark), so nothing moves when the drawn wordmark replaces it.
 */
export function Lockup({ height = 28, name = "CoFile" }: { height?: number; name?: string }) {
  const at = name.indexOf("i");
  return (
    <span className="lockup2" style={{ ["--lockup-h" as string]: `${height}px` }}>
      <NamePlate height={height} />
      <span className="lockup2-word" aria-hidden="true">
        {at < 0 ? name : <>{name.slice(0, at)}<span className="lockup2-i">ı<span className="lockup2-dot" /></span>{name.slice(at + 1)}</>}
      </span>
      <span className="sr-only">{name}</span>
    </span>
  );
}
