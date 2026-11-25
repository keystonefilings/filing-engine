import { test } from "node:test";
import assert from "node:assert/strict";
import { FILING_KINDS } from "./intake/forms.ts";
import { addressBlocks, planSections } from "./intake/simplify.ts";

const ny = FILING_KINDS.find((k) => k.id === "ny-llc")!;

test("required questions stay out; optional ones fold", () => {
  const plan = planSections(ny);
  const articles = plan.find((p) => p.section.title === "Articles")!;
  const paths = (bs: typeof articles.main) => bs.flatMap((b) => b.kind === "row" ? b.fields.map((f) => f.path) : b.item.kind === "field" ? [b.item.path] : []);
  assert.ok(paths(articles.main).includes("formation.county"));
  assert.ok(paths(articles.main).includes("formation.effectiveDate"));
  assert.ok(paths(articles.main).includes("formation.effectiveDateValue"));
  assert.ok(paths(articles.more).includes("formation.dissolutionDate"));
  assert.ok(!paths(articles.main).includes("formation.dissolutionDate"));
});

test("a section with nothing required folds whole", () => {
  const plan = planSections(ny);
  assert.equal(plan.find((p) => p.section.title.startsWith("Registered agent"))!.folded, true);
  assert.equal(plan.find((p) => p.section.title === "Name")!.folded, false);
});

test("name and ending, city state and ZIP sit on one line", () => {
  const name = planSections(ny).find((p) => p.section.title === "Name")!;
  const row = name.main.find((b) => b.kind === "row");
  assert.ok(row && row.kind === "row");
  assert.deepEqual(row.fields.map((f) => f.path), ["formation.name.baseName", "formation.name.designator"]);
  const sop = planSections(ny).find((p) => p.section.title === "Service of process")!;
  const csz = sop.main.find((b) => b.kind === "row" && b.fields.length === 3);
  assert.ok(csz, "city, state and ZIP on one line");
});

test("every field is still on the page somewhere", () => {
  for (const k of FILING_KINDS) {
    const count = (bs: ReturnType<typeof planSections>[number]["main"]) => bs.reduce((n, b) => n + (b.kind === "row" ? b.fields.length : 1), 0);
    const planned = planSections(k).reduce((n, p) => n + count(p.main) + count(p.more), 0);
    const all = k.sections.reduce((n, s) => n + s.items.length, 0);
    assert.equal(planned, all, k.id);
  }
});

test("addresses get names for Same as", () => {
  const labels = addressBlocks(ny).map((a) => a.label);
  assert.ok(labels.includes("Organizer address"));
  assert.ok(labels.includes("Principal business address"));
});
