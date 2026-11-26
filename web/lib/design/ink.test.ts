import { test } from "node:test";
import assert from "node:assert/strict";
import { contrast, firmVars, inkMatch, NIGHT_CARD, PLATE_INK, WHITE } from "./ink.ts";
import { firmExample } from "./tokens.ts";

/** Two hex colors within `tol` per channel (the spec's reference values are rounded). */
function near(actual: string, expected: string, tol = 1) {
  const a = actual.match(/[0-9a-f]{2}/gi)!.map((x) => parseInt(x, 16));
  const e = expected.match(/[0-9a-f]{2}/gi)!.map((x) => parseInt(x, 16));
  assert.ok(a.every((v, i) => Math.abs(v - e[i]!) <= tol), `${actual} is not ${expected}`);
}

test("the three example firms get the spec's reference inks (4.7)", () => {
  const harbor = inkMatch("#1D4E63", "#2B5A47");
  near(harbor.firm2, "#2B5A47"); near(harbor.fill, "#1D4E63"); near(harbor.ink, "#2B5A47");
  near(harbor.wash, "#F2F8FB"); near(harbor.row, "#EBF7FE"); near(harbor.tint, "#DDEEF7"); near(harbor.inkDark, "#6394AB");
  assert.equal(harbor.on, WHITE);

  const northgate = inkMatch("#C2410C");
  near(northgate.firm2, "#EABCAA"); near(northgate.fill, "#C2410C"); near(northgate.ink, "#C2410C");
  near(northgate.wash, "#FEF5F2"); near(northgate.row, "#FFF0E9"); near(northgate.tint, "#FFE2D6"); near(northgate.inkDark, "#D76E4D");
  assert.ok(northgate.flags.redFamily, "Ember is in the red family: errors there never rely on hue");

  const best = inkMatch("#1F4FD1");
  near(best.firm2, "#B1C1EF"); near(best.fill, "#1F4FD1"); near(best.ink, "#1F4FD1");
  near(best.wash, "#F4F7FE"); near(best.row, "#EDF5FF"); near(best.tint, "#DCECFF"); near(best.inkDark, "#628AE2");
});

test("the generated example tokens agree with the ink match", () => {
  const harbor = firmVars(inkMatch(firmExample.firm, firmExample["firm-2"]));
  for (const [k, v] of Object.entries(firmExample)) assert.equal(harbor[`--${k}`], v, k);
});

test("the edge cases are designed on purpose (3.6)", () => {
  const yellow = inkMatch("#F2C200");
  assert.equal(yellow.fill, "#F2C200", "yellow stays yellow");
  assert.equal(yellow.on, PLATE_INK);
  assert.ok(contrast(PLATE_INK, yellow.fill) >= 9.4);
  assert.ok(yellow.fillBorder, "a light fill keeps its shape on white with a border");
  near(yellow.ink, "#8A6D00", 3);

  const pink = inkMatch("#F9C5D1");
  assert.equal(pink.fill, "#F9C5D1"); assert.equal(pink.on, PLATE_INK); assert.ok(pink.fillBorder);

  const nearWhite = inkMatch("#F5F5F5");
  assert.equal(nearWhite.fill, PLATE_INK, "a near-white main becomes a Plate Ink button");
  assert.equal(nearWhite.fillEdge, "#F5F5F5", "with a 4 px edge in the firm's color");
  assert.equal(nearWhite.wash, "#F5F5F2", "and a neutral main gets the Bond wash");

  const neon = inkMatch("#39FF14");
  assert.ok(neon.flags.neon && neon.deepened, "neon fills are toned down");
  assert.equal(neon.firm, "#39FF14", "but the firm's exact color is kept for its rule and logo");

  assert.ok(inkMatch("#0f766e").flags.greenNearDone, "a teal near Verdigris is flagged");
  assert.equal(inkMatch("#1D2130").wash, "#F5F5F2", "near-black gets the Bond wash");
});

test("a second color too light for links still draws, and links fall back", () => {
  const k = inkMatch("#1D4E63", "#FCE38A");
  assert.equal(k.firm2, "#FCE38A");
  assert.ok(k.flags.secondTooLight);
  assert.equal(k.ink, "#1D4E63");
});

/** A small seeded generator, so a failure always repeats. */
function rng(seed: number) {
  return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 2 ** 32);
}

test("every pair the ink match emits passes, for 1,000 random colors and the product's presets", () => {
  const next = rng(20261126);
  const hex = () => `#${Math.floor(next() * 0xffffff).toString(16).padStart(6, "0")}`;
  const presets = ["#1f4fd1", "#0f766e", "#15803d", "#b45309", "#b91c1c", "#7e22ce", "#be185d", "#334155", "#111827", "#000000", "#FFFFFF"];
  const colors = [...presets, ...Array.from({ length: 1000 }, hex)];
  for (const c of colors) {
    const k = inkMatch(c, next() < 0.5 ? hex() : null);
    const need = k.on === PLATE_INK ? 7 : 4.5;
    assert.ok(contrast(k.on, k.fill) >= need, `${c}: button label ${k.on} on ${k.fill}`);
    assert.ok(contrast(k.on, k.fillHover) >= 4.5, `${c}: hover label ${k.on} on ${k.fillHover}`);
    assert.ok(contrast(k.ink, WHITE) >= 4.5, `${c}: link ${k.ink} on white`);
    assert.ok(contrast(k.selectLine, WHITE) >= 3, `${c}: selection edge ${k.selectLine} on white`);
    assert.ok(contrast(k.inkDark, NIGHT_CARD) >= 4.5, `${c}: dark link ${k.inkDark} on Night Card`);
    for (const bg of [k.wash, k.row, k.tint]) assert.ok(contrast(PLATE_INK, bg) >= 12, `${c}: Plate Ink on ${bg}`);
  }
});
