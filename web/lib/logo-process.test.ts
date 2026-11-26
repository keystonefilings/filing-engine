import { test } from "node:test";
import assert from "node:assert/strict";
import { prepareLogoPixels } from "./logo-process.ts";

/** A w × h picture filled with one RGBA color, and a painter for rectangles. */
function picture(w: number, h: number, fill: [number, number, number, number]) {
  const d = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) d.set(fill, i * 4);
  const rect = (x: number, y: number, rw: number, rh: number, c: [number, number, number, number]) => {
    for (let yy = y; yy < y + rh; yy++) for (let xx = x; xx < x + rw; xx++) d.set(c, (yy * w + xx) * 4);
  };
  const alpha = (x: number, y: number) => d[(y * w + x) * 4 + 3];
  return { d, rect, alpha };
}

test("a white box around a logo is read away and its margin trimmed", () => {
  const p = picture(40, 20, [255, 255, 255, 255]);
  p.rect(10, 6, 12, 6, [29, 78, 99, 255]);
  const box = prepareLogoPixels(p.d, 40, 20);
  assert.deepEqual(box, { x: 10, y: 6, width: 12, height: 6 });
  assert.equal(p.alpha(0, 0), 0, "the corner went transparent");
});

test("white shapes inside the logo stay: only white reached from the edges is cleared", () => {
  const p = picture(30, 20, [255, 255, 255, 255]);
  p.rect(5, 5, 20, 10, [20, 20, 20, 255]);
  p.rect(12, 8, 6, 4, [255, 255, 255, 255]);
  prepareLogoPixels(p.d, 30, 20);
  assert.equal(p.alpha(14, 9), 255, "the white inside the dark shape is untouched");
});

test("a transparent logo is only trimmed", () => {
  const p = picture(20, 20, [0, 0, 0, 0]);
  p.rect(3, 4, 5, 6, [200, 30, 30, 255]);
  assert.deepEqual(prepareLogoPixels(p.d, 20, 20), { x: 3, y: 4, width: 5, height: 6 });
});

test("a logo on a colored ground keeps its ground", () => {
  const p = picture(20, 10, [29, 78, 99, 255]);
  p.rect(5, 3, 10, 4, [255, 255, 255, 255]);
  assert.deepEqual(prepareLogoPixels(p.d, 20, 10), { x: 0, y: 0, width: 20, height: 10 });
  assert.equal(p.alpha(0, 0), 255);
});
