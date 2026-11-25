import { test } from "node:test";
import assert from "node:assert/strict";
import { logoSrc, safeColor, textOn } from "./brand.ts";

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
});

test("a second color falls back to the main one", () => {
  assert.equal(safeColor(undefined, "#123456"), "#123456");
  assert.equal(safeColor("red; background:url(x)", "#123456"), "#123456");
});
