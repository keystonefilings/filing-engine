import { test } from "node:test";
import assert from "node:assert/strict";
import { contrast, logoSrc, safeColor, textOn } from "./brand.ts";

test("an uploaded logo is shown from this site, ahead of a link", () => {
  assert.equal(logoSrc({ logoArtifactId: "6f1c2a3b-0000-4000-8000-000000000001", logoUrl: "https://x.test/l.png" }), "/logo/6f1c2a3b-0000-4000-8000-000000000001");
  assert.equal(logoSrc({ logoUrl: "https://x.test/l.png" }), "https://x.test/l.png");
  assert.equal(logoSrc({ logoUrl: "http://x.test/l.png" }), undefined);
  assert.equal(logoSrc({ logoArtifactId: "../../etc/passwd" }), undefined);
  assert.equal(logoSrc(undefined), undefined);
});

test("button text stays readable on light and dark brand colors", () => {
  assert.equal(textOn("#1f4fd1"), "#ffffff");
  assert.equal(textOn("#111827"), "#ffffff");
  assert.equal(textOn("#fde047"), "#111111");
  assert.equal(textOn("#ffffff"), "#111111");
  assert.equal(textOn("#fff"), "#111111");
  assert.equal(textOn("#000"), "#ffffff");
});

test("mid-light brand colors get dark text, which reads far better there than white", () => {
  // These once got white text, at about 2.5:1.
  for (const c of ["#ff8000", "#e69500", "#20b2aa", "#f08080"]) {
    assert.equal(textOn(c), "#111111", c);
    assert.ok(contrast("#111111", c) >= 7, c);
  }
});

test("button text is whichever of dark or white has the higher contrast", () => {
  for (let r = 0; r < 16; r++) for (let g = 0; g < 16; g++) for (let b = 0; b < 16; b++) {
    const c = `#${[r, g, b].map((v) => (v * 17).toString(16).padStart(2, "0")).join("")}`;
    const t = textOn(c);
    assert.equal(contrast(t, c), Math.max(contrast("#111111", c), contrast("#ffffff", c)), c);
  }
});

test("a second color falls back to the main one", () => {
  assert.equal(safeColor(undefined, "#123456"), "#123456");
  assert.equal(safeColor("red; background:url(x)", "#123456"), "#123456");
});
