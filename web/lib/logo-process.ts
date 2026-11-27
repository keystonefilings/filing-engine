/**
 * A logo as it arrives, made ready for the pages (merged spec 3.5.1): a plain white or near-white box around it is
 * read away, flooding in from the edges only, so white shapes inside the logo stay; then the empty margin is trimmed.
 * Works on raw RGBA pixels, so the browser's canvas and the tests share it.
 */
export interface Box { x: number; y: number; width: number; height: number }

const near = (d: Uint8ClampedArray, i: number, r: number, g: number, b: number, tol: number) =>
  Math.abs(d[i]! - r) <= tol && Math.abs(d[i + 1]! - g) <= tol && Math.abs(d[i + 2]! - b) <= tol;

/** Whether the four corners are the same opaque, near-white color: a box drawn around the logo. */
function whiteBox(d: Uint8ClampedArray, w: number, h: number): [number, number, number] | null {
  const corners = [0, (w - 1) * 4, (h - 1) * w * 4, ((h - 1) * w + w - 1) * 4];
  const [r, g, b] = [d[0]!, d[1]!, d[2]!];
  for (const i of corners) {
    if (d[i + 3]! < 240) return null;
    if (d[i]! < 230 || d[i + 1]! < 230 || d[i + 2]! < 230) return null;
    if (!near(d, i, r, g, b, 12)) return null;
  }
  return [r, g, b];
}

/** Clears a white box around the logo in place (from the edges inward), and returns the logo's box without its empty margin. */
export function prepareLogoPixels(d: Uint8ClampedArray, w: number, h: number): Box {
  const bg = whiteBox(d, w, h);
  if (bg) {
    const [r, g, b] = bg;
    const seen = new Uint8Array(w * h);
    const stack: number[] = [];
    const push = (x: number, y: number) => { const p = y * w + x; if (!seen[p]) { seen[p] = 1; stack.push(p); } };
    for (let x = 0; x < w; x++) { push(x, 0); push(x, h - 1); }
    for (let y = 0; y < h; y++) { push(0, y); push(w - 1, y); }
    while (stack.length) {
      const p = stack.pop()!;
      const i = p * 4;
      if (!near(d, i, r, g, b, 18)) {
        // An anti-aliased edge pixel: fade it by how close it is to the box's white, so no pale halo stays.
        const dist = Math.max(Math.abs(d[i]! - r), Math.abs(d[i + 1]! - g), Math.abs(d[i + 2]! - b));
        if (dist < 48) d[i + 3] = Math.min(d[i + 3]!, Math.round((255 * (dist - 18)) / 30));
        continue;
      }
      d[i + 3] = 0;
      const x = p % w, y = (p - x) / w;
      if (x > 0) push(x - 1, y);
      if (x < w - 1) push(x + 1, y);
      if (y > 0) push(x, y - 1);
      if (y < h - 1) push(x, y + 1);
    }
  }
  let x0 = w, y0 = h, x1 = -1, y1 = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (d[(y * w + x) * 4 + 3]! > 8) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    }
  }
  if (x1 < 0) return { x: 0, y: 0, width: w, height: h };
  return { x: x0, y: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
}
