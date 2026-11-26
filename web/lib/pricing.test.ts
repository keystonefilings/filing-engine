import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { PRICING, startingPlan, usd } from "./pricing.ts";

// The engine charges from config/partner-pricing.json; the site must show the same figures.
const engine = JSON.parse(readFileSync(new URL("../../config/partner-pricing.json", import.meta.url), "utf8"));

test("the public prices match what the engine charges", () => {
  assert.deepEqual(PRICING.payAsYouGo, engine.payAsYouGo);
  for (const k of Object.keys(engine.units)) assert.ok(Math.abs(PRICING.units[k as keyof typeof PRICING.units] - engine.units[k]) < 1e-9, k);
  assert.equal(PRICING.rolloverMonths, engine.rolloverMonths);
  assert.equal(PRICING.annualMonthsFree, engine.annualMonthsFree);
  assert.equal(PRICING.plans.length, engine.plans.length);
  for (const [i, p] of engine.plans.entries()) {
    const site = PRICING.plans[i]!;
    for (const k of ["id", "name", "monthlyUsd", "annualUsd", "included", "extraUsd", "fairUse", "priorityHelp"]) {
      assert.equal((site as unknown as Record<string, unknown>)[k], p[k], `${p.id}.${k}`);
    }
  }
});

test("plans from, and dollar amounts", () => {
  assert.equal(startingPlan().id, "starter");
  assert.equal(usd(45), "$45");
  assert.equal(usd(1000), "$1,000");
  assert.equal(usd(103.5), "$103.5");
});
