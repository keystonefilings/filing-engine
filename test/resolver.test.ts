import { describe, expect, it } from "vitest";
import { matchIntents, labelScore } from "../src/resolver/match.js";
import { diffSnapshots, snapshotFromInventory, describeDiff } from "../src/resolver/drift.js";
import type { PageInventory } from "../src/resolver/types.js";
import { buildProposal } from "../src/drift-review/service.js";

const inv = (fields: Partial<PageInventory["fields"][number]>[], prices: PageInventory["prices"] = []): PageInventory => ({
  url: "x", title: "t", headings: [],
  fields: fields.map((f, i) => ({ ref: `f${i}`, label: "", labelSource: "label-for", kind: "text", required: false, disabled: false, visible: true, ...f })),
  prices,
});

describe("matching", () => {
  it("scores exact, prefix, and token overlap", () => {
    expect(labelScore("Business Name", "Business Name *")).toBe(1);
    expect(labelScore("Street Address 1", "Street Address 1 (required)")).toBe(1);
    expect(labelScore("Zip", "Zip Code")).toBeGreaterThanOrEqual(0.8);
    expect(labelScore("City", "State")).toBe(0);
  });
  it("assigns each field once, by best score, honoring kinds and overrides", () => {
    const inventory = inv([
      { label: "Business Entity Type", kind: "select", options: [{ value: "DLLC", label: "Domestic LLC" }] },
      { label: "Proposed Name", kind: "text", required: true },
      { label: "Daytime Phone", kind: "tel", required: true },
    ]);
    const intents = [
      { key: "entityType", labels: ["Business Entity Type"], kinds: ["select" as const], required: true },
      { key: "businessName", labels: ["Business Name"], kinds: ["text" as const], required: true },
    ];
    const r1 = matchIntents(intents, inventory);
    expect(r1.matched.get("entityType")?.label).toBe("Business Entity Type");
    expect(r1.unmatchedIntents.map((i) => i.key)).toEqual(["businessName"]);
    expect(r1.unmatchedFields.map((f) => f.label)).toEqual(["Proposed Name", "Daytime Phone"]);
    const r2 = matchIntents(intents, inventory, { businessName: ["Proposed Name"] });
    expect(r2.matched.get("businessName")?.label).toBe("Proposed Name");
    expect(r2.unmatchedFields.map((f) => f.label)).toEqual(["Daytime Phone"]);
  });
});

describe("drift", () => {
  const base = inv([
    { label: "First Name", required: true },
    { label: "Payment Type", kind: "radio", required: true, options: [{ value: "CC", label: "Credit Card" }, { value: "EC", label: "E-Check" }] },
  ], [{ label: "Formation filing fee", amountUsd: 100 }]);

  it("ignores cosmetic change, flags structural change", () => {
    const a = snapshotFromInventory("NJ", "pay", base);
    const cosmetic = inv([...base.fields].reverse().map((f) => ({ ...f, ref: "zz", name: "renamed" })), base.prices);
    const b = snapshotFromInventory("NJ", "pay", cosmetic);
    expect(diffSnapshots(a, b).substantive).toBe(false);
    expect(a.fingerprint).toBe(b.fingerprint);

    const changed = inv([
      { label: "First Name", required: false },
      { label: "Payment Type", kind: "radio", required: true, options: [{ value: "CC", label: "Credit Card" }] },
      { label: "Daytime Phone", kind: "tel", required: true },
    ], [{ label: "Formation filing fee", amountUsd: 125 }]);
    const d = diffSnapshots(a, snapshotFromInventory("NJ", "pay", changed));
    expect(d.substantive).toBe(true);
    expect(d.added.map((f) => f.label)).toEqual(["daytime phone"]);
    expect(d.requiredChanged).toHaveLength(1);
    expect(d.optionsChanged[0]?.removed).toEqual(["e check"]);
    expect(d.pricesChanged[0]).toMatchObject({ from: 100, to: 125 });
    expect(describeDiff(d)).toContain("new fields");
  });

  it("proposes mappings and flags client re-approval for a new required field", () => {
    const screen = { screenKey: "pay", title: "Payment", intents: [
      { key: "firstName", labels: ["First Name"], required: true },
      { key: "contactPhone", labels: ["Phone"], kinds: ["tel" as const, "text" as const], required: true },
    ] };
    const live = inv([
      { label: "Given Name", required: true },
      { label: "Phone Number", kind: "tel", required: true },
      { label: "Daytime Phone", kind: "tel", required: true },
      { label: "Promo Code", kind: "text", required: false },
    ]);
    const match = matchIntents(screen.intents, live);
    expect(match.matched.get("contactPhone")?.label).toBe("Phone Number");
    const p = buildProposal(screen, null, match, live);
    const mapItem = p.items.find((i) => i.kind === "map_intent" && i.intentKey === "firstName");
    expect(mapItem?.candidates?.length ?? 0).toBeGreaterThanOrEqual(0);
    expect(p.items.some((i) => i.kind === "new_field" && i.fieldLabel === "Daytime Phone" && i.required)).toBe(true);
    expect(p.requiresClientReapproval).toBe(true);
    const optionalOnly = buildProposal(screen, null, matchIntents(screen.intents, inv([{ label: "First Name", required: true }, { label: "Phone", kind: "tel", required: true }, { label: "Promo Code" }])), live);
    expect(optionalOnly.requiresClientReapproval).toBe(false);
  });
});
