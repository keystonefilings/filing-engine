/**
 * CoFile's mark, the Name Plate (merged spec 3.2), drawn on its 40 × 16 grid: a chamfered plate, a bevel line from
 * 64 px wide, two screws with level slots (dots below 32 px), and "Co" in the middle. "Co" is set in the headline
 * face's italic until the lettering artist's drawing arrives (3.3, interim). One ink, never filled.
 */
export function NamePlate({ height = 28, className }: { height?: number; className?: string }) {
  const width = height * 2.5;
  const bevel = width >= 64;
  const slots = width >= 32;
  // Chamfered rectangle: corners cut at 45° with leg c, inset i from the 40 × 16 box.
  const plate = (i: number, c: number) => {
    const [x0, y0, x1, y1] = [i, i, 40 - i, 16 - i];
    return `M${x0 + c} ${y0}H${x1 - c}L${x1} ${y0 + c}V${y1 - c}L${x1 - c} ${y1}H${x0 + c}L${x0} ${y1 - c}V${y0 + c}Z`;
  };
  return (
    <svg className={["nameplate2", className].filter(Boolean).join(" ")} width={width} height={height} viewBox="-0.6 -0.6 41.2 17.2" aria-hidden="true" focusable="false">
      <path d={plate(0, 2.5)} fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="miter" />
      {bevel ? <path d={plate(2, 1.6)} fill="none" stroke="currentColor" strokeWidth="0.4" strokeLinejoin="miter" /> : null}
      {[4.5, 35.5].map((cx) => slots
        ? <g key={cx}><circle cx={cx} cy="8" r="1.1" fill="none" stroke="currentColor" strokeWidth="0.6" /><rect x={cx - 0.7} y="7.8" width="1.4" height="0.4" fill="currentColor" /></g>
        : <circle key={cx} cx={cx} cy="8" r="0.9" fill="currentColor" />)}
      <text x="19.7" y="11.2" textAnchor="middle" fill="currentColor" style={{ font: "italic 600 9.2px var(--font-display)", letterSpacing: "-0.4px" }}>Co</text>
    </svg>
  );
}
