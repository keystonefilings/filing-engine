import { test } from "node:test";
import assert from "node:assert/strict";
import { analyzeLogoPixels, isWide, logoPlate, logoSize } from "./logo.ts";
import { contrast, inkMatch, PLATE_INK, WHITE } from "./ink.ts";

/** A w × h RGBA picture: `ground` everywhere, `ink` inside the box [x0, y0, x1, y1). */
function picture(w: number, h: number, ground: [number, number, number, number], ink: [number, number, number, number], box = [Math.round(w * 0.2), Math.round(h * 0.2), Math.round(w * 0.8), Math.round(h * 0.8)]) {
  const d = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const c = x >= box[0]! && x < box[2]! && y >= box[1]! && y < box[3]! ? ink : ground;
    d.set(c, (y * w + x) * 4);
  }
  return d;
}
const CLEAR: [number, number, number, number] = [0, 0, 0, 0];
const WHITE_PX: [number, number, number, number] = [255, 255, 255, 255];

test("a dark logo on transparent sits straight on the sheet", () => {
  const a = analyzeLogoPixels(picture(200, 100, CLEAR, [29, 78, 99, 255]), 200, 100);
  assert.equal(a.background, "transparent");
  assert.equal(a.light, false);
  assert.ok(a.inkL < 0.5);
  assert.equal(a.ratio, 2);
  assert.equal(logoPlate(a, "#1D4E63"), null);
});

test("white letters on transparent are light marks (mean ink L over 0.80)", () => {
  const a = analyzeLogoPixels(picture(700, 100, CLEAR, WHITE_PX), 700, 100);
  assert.equal(a.background, "transparent");
  assert.ok(a.inkL > 0.99);
  assert.equal(a.light, true);
  assert.equal(a.ink, "#FFFFFF");
  // A pale grey, L about 0.86, is light too; a mid grey, L about 0.6, is not.
  assert.equal(analyzeLogoPixels(picture(100, 100, CLEAR, [210, 210, 210, 255]), 100, 100).light, true);
  assert.equal(analyzeLogoPixels(picture(100, 100, CLEAR, [128, 128, 128, 255]), 100, 100).light, false);
});

test("a white box and a solid tile are told apart, and neither is light marks", () => {
  const box = analyzeLogoPixels(picture(240, 240, WHITE_PX, [29, 78, 99, 255]), 240, 240);
  assert.equal(box.background, "white");
  assert.ok(box.inkL < 0.5, "the ink is what isn't the white box");
  const tile = analyzeLogoPixels(picture(240, 240, [29, 33, 48, 255], WHITE_PX), 240, 240);
  assert.equal(tile.background, "tile");
  assert.equal(tile.light, false, "white letters on their own dark tile are shown as uploaded");
});

test("a photograph is busy", () => {
  const w = 120, h = 90, d = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) d.set([(i * 37) % 256, (i * 91) % 256, (i * 53) % 256, 255], i * 4);
  assert.equal(analyzeLogoPixels(d, w, h).background, "busy");
});

test("a wordmark trimmed tight to its letters still reads as transparent", () => {
  // Letters touching every edge, with gaps between them: a third of the ring is ink.
  const w = 300, h = 40, d = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) if (x % 30 < 18) d.set([255, 255, 255, 255], (y * w + x) * 4);
  const a = analyzeLogoPixels(d, w, h);
  assert.equal(a.background, "transparent");
  assert.equal(a.light, true);
});

test("the plate takes the firm's fill only when the logo's ink reaches 3:1 on it, else Plate Ink (10B.2.3)", () => {
  const white = { light: true, ink: "#FFFFFF" };
  assert.equal(logoPlate(white, inkMatch("#1D4E63").fill), "#1D4E63", "white marks on Harbor blue: 9:1");
  assert.equal(logoPlate(white, inkMatch("#F2C200").fill), PLATE_INK, "white marks vanish on yellow (1.68:1)");
  assert.equal(logoPlate(white, inkMatch("#F5F5F5").fill), PLATE_INK, "a near-white main prints Plate Ink buttons anyway");
  assert.equal(logoPlate({ light: false, ink: "#000000" }, "#1D4E63"), null);
  assert.equal(logoPlate(undefined, "#1D4E63"), null);
  // Whatever the color, the plate it picks holds the light ink at 3:1 or better.
  for (let i = 0; i < 400; i++) {
    const hex = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, "0")}`;
    const plate = logoPlate({ light: true, ink: "#F2F2F2" }, inkMatch(hex).fill)!;
    assert.ok(contrast("#F2F2F2", plate) >= 3, `${hex}: ${plate}`);
  }
});

test("logos are sized by area, so a wide wordmark and a square emblem look like peers (3.5.1)", () => {
  // The spec's worked values at 6,400 px²: square 64 × 64, 2:1 57 × 113, 4:1 40 × 160, 8:1 28 × 226.
  const at = (r: number, s: Parameters<typeof logoSize>[1] = "sheet") => logoSize({ width: 1000 * r, height: 1000 }, s);
  assert.deepEqual(at(1), { width: 64, height: 64 });
  assert.equal(Math.round(at(2).height), 57);
  assert.equal(Math.round(at(4).width), 160);
  assert.equal(Math.round(at(8).height), 28);
  // The awkward brand's 7:1 light wordmark: 30 × 212 on sheets, 25 × 175 on phones and in previews (10B.2.3).
  assert.deepEqual([Math.round(at(7).height), Math.round(at(7).width)], [30, 212]);
  assert.equal(Math.round(at(7, "phone").height), 25);
  assert.ok(Math.abs(at(7, "phone").width - 175) <= 1);
  // Never wider than the surface allows, and never past half the picture's own pixels.
  assert.ok(at(20).width <= 280);
  assert.deepEqual(logoSize({ width: 64, height: 64 }, "sheet"), { width: 32, height: 32 });
  assert.equal(isWide(2.5), true);
  assert.equal(isWide(2.4), false);
});

test("the Firm Rule's thin line never vanishes, and a very pale main gets its under-line (10B.2.3, 3.5.3)", () => {
  const yellow = inkMatch("#F2C200");
  assert.equal(yellow.firm2, yellow.ink, "yellow at 35% is 1.21:1 on white, so the thin line is the link ink");
  assert.equal(yellow.ruleUnder, null, "1.68:1 is over 1.5:1: no under-line");
  const nearWhite = inkMatch("#F5F5F5");
  assert.ok(nearWhite.ruleUnder, "a near-white main's rule gets the 1 px under-line");
  assert.ok(contrast(nearWhite.firm2, WHITE) >= 1.25);
  // A second color the firm chose is kept as given, however light (3.6, "Second color too light").
  assert.equal(inkMatch("#1D4E63", "#FCE38A").firm2, "#FCE38A");
  // The example firms keep their reference thin lines.
  assert.equal(inkMatch("#C2410C").firm2, "#EABDAA", "Ember at 35% (the spec rounds it to #EABCAA)");
});
