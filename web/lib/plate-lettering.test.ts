import { test } from "node:test";
import assert from "node:assert/strict";
import { fitPlate, plateText, segments } from "./plate-lettering.ts";

// A stand-in measure: every character half an em wide.
const measure = (line: string, fs: number) => line.length * fs * 0.5;
const W = 467, H = 100;

test("a name sets on one line as large as fits, at most 30% of the face, and centred", () => {
  const l = fitPlate("Harbor & Pine CPA", W, H, measure)!;
  assert.deepEqual(l.lines, ["Harbor & Pine CPA"]);
  assert.ok(l.cap <= 0.3 * (H / 0.6) && l.cap >= 0.2 * (H / 0.6));
  assert.ok(Math.abs(fitPlate("Ortiz", W, H, measure)!.cap - 0.3 * (H / 0.6)) < 1e-9);
  assert.ok(l.firstBaseline > l.cap && l.firstBaseline < H);
});

test("a long name breaks onto two balanced lines; & stays with the word after it, a credential with the word before", () => {
  const l = fitPlate("Northgate Payroll & Bookkeeping Services of Hudson County LLC", W, H, measure)!;
  assert.equal(l.lines.length, 2);
  for (const line of l.lines) { assert.ok(!line.endsWith("&")); assert.ok(!line.startsWith("LLC")); }
  assert.equal(l.lines.join(" "), "Northgate Payroll & Bookkeeping Services of Hudson County LLC");
});

test("a very long name takes three lines and is never truncated", () => {
  const name = "The Very Long Named Accounting and Bookkeeping Practice of Northern New Jersey and Rockland";
  const l = fitPlate(name, W, H, measure)!;
  assert.equal(l.lines.length, 3);
  assert.equal(l.lines.join(" "), name);
  assert.ok(l.cap + l.pitch * 2 <= H + 1e-9);
});

test("the plate keeps the name as typed, leaves off other scripts and stays blank for a blocked word", () => {
  assert.equal(plateText("muñoz & gonçalves cpa"), "muñoz & gonçalves cpa");
  assert.equal(plateText("Café 😀 Ledger"), "Café Ledger");
  assert.equal(plateText("Shit Happens LLC"), "");
  assert.equal(fitPlate("   ", W, H, measure), null);
});

test("the & is set apart for its italic and credentials for their smaller size", () => {
  assert.deepEqual(segments("Harbor & Pine CPA").map((s) => s.kind), ["roman", "amp", "roman", "cred"]);
});
