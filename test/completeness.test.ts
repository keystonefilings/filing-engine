import { describe, it, expect } from "vitest";
import { checkCompleteness } from "../src/domain/completeness.js";
import { fieldRequirements } from "../src/domain/requirements.js";
import { TenantSettings } from "../src/settings/schema.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";
import type { FilingRequest } from "../src/domain/filing.js";

function nj(over: (f: Record<string, unknown>) => void = () => {}): FilingRequest {
  const r = njFormationRequest();
  over(r.formation as unknown as Record<string, unknown>);
  return r;
}

describe("checkCompleteness", () => {
  it("passes a complete filing and reports missing required fields", () => {
    expect(checkCompleteness(nj()).complete).toBe(true);
    const r = checkCompleteness(nj((f) => { f.members = []; }));
    expect(r.complete).toBe(false);
    expect(r.missing.some((m) => m.path === "formation.members")).toBe(true);
  });

  it("ignores optional fields by default, requires them in strict mode, and skips not_needed ones", () => {
    const withoutPurpose = nj((f) => { delete f.purpose; });
    const has = (r: ReturnType<typeof checkCompleteness>, p: string) => r.missing.some((m) => m.path === p);
    expect(has(checkCompleteness(withoutPurpose), "formation.purpose")).toBe(false); // optional, default off
    expect(has(checkCompleteness(withoutPurpose, { strictOptional: true, overrides: {} }), "formation.purpose")).toBe(true);
    expect(has(checkCompleteness(withoutPurpose, { strictOptional: true, overrides: { "formation.purpose": "not_needed" } }), "formation.purpose")).toBe(false);
  });

  it("an override can require an otherwise-optional field", () => {
    const r = checkCompleteness(nj((f) => { delete f.purpose; }), { strictOptional: false, overrides: { "formation.purpose": "required" } });
    expect(r.missing.some((m) => m.path === "formation.purpose")).toBe(true);
  });

  it("not_needed cannot drop a state-mandated required field", () => {
    const r = checkCompleteness(nj((f) => { f.signers = []; }), { strictOptional: false, overrides: { "formation.signers": "not_needed" } });
    expect(r.missing.some((m) => m.path === "formation.signers")).toBe(true);
  });

  it("the requirements spec covers the active filing types", () => {
    expect(fieldRequirements(nj()).some((r) => r.path === "formation.members")).toBe(true);
  });
});

describe("FilingService completeness gate", () => {
  it("holds a filing awaiting_information when a tenant-required field is missing, then proceeds when supplied", async () => {
    const store = await seededStore();
    await store.putTenant(TenantSettings.parse({
      tenantId: "keystone", name: "Keystone Filings",
      webhookEndpoints: [{ url: "https://hooks.example.test/x", secret: "endpoint-secret-0123456789" }],
      completeness: { overrides: { "formation.purpose": "required" } },
    }));
    const w = wire(store);
    const raw = njFormationRequest();
    delete (raw.formation as unknown as Record<string, unknown>).purpose;

    const { filing } = await w.service.createFiling(raw);
    expect(filing.status).toBe("awaiting_information");
    expect(filing.lastError).toMatch(/business purpose/);
    const types = (await store.listDeliveries(filing.id)).map((d) => d.event.type);
    expect(types).toContain("filing.information_required");
    expect(types).not.toContain("filing.awaiting_approval");

    const r = await w.service.supplyInformation(filing.id, { formation: { purpose: "General consulting services" } });
    expect(r.ok && r.complete).toBe(true);
    const after = (await store.getFiling(filing.id))!;
    expect(after.status).toBe("awaiting_approval");
    expect(after.request.formation!.purpose).toBe("General consulting services");
    expect((await store.listDeliveries(filing.id)).map((d) => d.event.type)).toContain("filing.awaiting_approval");
  });

  it("re-reports still-missing info and does not proceed", async () => {
    const store = await seededStore();
    await store.putTenant(TenantSettings.parse({
      tenantId: "keystone", name: "Keystone Filings",
      webhookEndpoints: [{ url: "https://hooks.example.test/x", secret: "endpoint-secret-0123456789" }],
      completeness: { overrides: { "formation.purpose": "required", "formation.naicsCode": "required" } },
    }));
    const w = wire(store);
    const raw = njFormationRequest();
    const f = raw.formation as unknown as Record<string, unknown>;
    delete f.purpose; delete f.naicsCode;
    const { filing } = await w.service.createFiling(raw);
    expect(filing.status).toBe("awaiting_information");
    const r = await w.service.supplyInformation(filing.id, { formation: { purpose: "Consulting" } });
    expect(r.ok && r.complete === false).toBe(true);
    if (r.ok && !r.complete) expect(r.missing.some((m) => m.path === "formation.naicsCode")).toBe(true);
    expect((await store.getFiling(filing.id))!.status).toBe("awaiting_information");
  });
});
