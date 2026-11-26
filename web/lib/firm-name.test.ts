import { test } from "node:test";
import assert from "node:assert/strict";
import { canBreakBefore, fitPlate, plateBlocked, plateText, plateWords, type Run } from "./firm-name.ts";

// A plain stand-in for the browser's measure: every glyph 0.6 em wide, the cap 0.7 em.
const measure = (r: Run, cap: number) => [...r.text].length * 0.6 * (cap / 0.7) * (r.style === "cred" ? 0.88 : 1);
const space = (cap: number) => 0.25 * (cap / 0.7);
const W = 389, H = 83; // the owner's plate box, in image pixels
const lines = (t: string) => fitPlate(t, W, H, measure, space)?.lines.map((l) => l.words.map((w) => w.map((r) => r.text).join("")).join(" "));

test("the plate cuts Latin letters, digits and the name's punctuation, and nothing else", () => {
  assert.equal(plateText("Muñoz & Gonçalves, CPAs"), "Muñoz & Gonçalves, CPAs");
  assert.equal(plateText("Café 🎉 Ledger 会计"), "Café Ledger");
  assert.equal(plateText("  Harbor   &  Pine  "), "Harbor & Pine");
});

test("a listed word keeps the plate blank, on whole words only", () => {
  assert.equal(plateBlocked("Shit Creek Bookkeeping"), true);
  assert.equal(plateBlocked("Scunthorpe Payroll"), false);
  assert.equal(plateBlocked("Dickens & Co."), false);
});

test("the ampersand is set in the italic and credentials in small capitals", () => {
  const words = plateWords("Harbor & Pine CPA");
  assert.deepEqual(words.map((w) => w.map((r) => r.style)), [["roman"], ["italic"], ["roman"], ["cred"]]);
  assert.deepEqual(plateWords("Smith&Jones")[0]!.map((r) => r.style), ["roman", "italic", "roman"]);
});

test("a line never breaks after a lone ampersand or before a credential", () => {
  const words = plateWords("Harbor & Pine CPA");
  assert.equal(canBreakBefore(words, 1), true); // "Harbor / & Pine CPA"
  assert.equal(canBreakBefore(words, 2), false); // not "Harbor & / Pine CPA"
  assert.equal(canBreakBefore(words, 3), false); // not "Harbor & Pine / CPA"
});

test("Harbor & Pine CPA sets on one line; a long name steps down to two, then three", () => {
  assert.deepEqual(lines("Harbor & Pine CPA"), ["Harbor & Pine CPA"]);
  const two = lines("Northgate Payroll and Bookkeeping Services LLC");
  assert.equal(two?.length, 2);
  assert.ok(two!.every((l) => !l.startsWith("LLC")));
  const sixty = "Abcdefgh Ijklmnop Qrstuvwx Yzabcdef Ghijklmn Opqrstuv Wxyzabc";
  assert.ok((lines(sixty)?.length ?? 0) <= 3);
});

test("a single word too long is squeezed to the field, never cut", () => {
  const l = fitPlate("Supercalifragilisticexpialidociousaccountingpartnership", W, H, measure, space)!;
  assert.equal(l.lines.length, 1);
  assert.ok(l.squeeze < 1);
});

test("nothing to cut gives no layout", () => {
  assert.equal(fitPlate("🎉", W, H, measure, space), null);
});
