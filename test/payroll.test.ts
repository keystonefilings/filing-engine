import { describe, it, expect } from "vitest";
import { FilingRequest } from "../src/domain/filing.js";
import { validateFiling, hasErrors } from "../src/domain/validation.js";
import { adapterFor, nyPayrollAdapter, njPayrollAdapter } from "../src/adapters/index.js";
import { maskSensitive } from "../src/approvals/render.js";
import { seededStore, wire } from "./helpers.js";
import type { FilingRequest as FilingRequestT } from "../src/domain/filing.js";

function nyPayroll(over: Record<string, unknown> = {}): FilingRequestT {
  return FilingRequest.parse({
    tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `idem-${Math.random().toString(36).slice(2)}`,
    type: "payroll_registration", state: "NY",
    payroll: {
      reason: "new_business", legalName: "Blue Harbor Consulting LLC", employerType: "business",
      ownershipType: "Limited Liability Company (LLC)", fein: "12-3456789",
      businessAddress: { street1: "22 River Rd", city: "Albany", state: "NY", zip: "12207" },
      dateFirstOperations: "2026-01-15", registeringForUI: true, uiLiabilityQuarter: "Q1", uiLiabilityYear: 2026,
      owners: [{ name: "Sam Rivera", ssn: "123-45-6789", title: "Member", address: { street1: "22 River Rd", city: "Albany", state: "NY", zip: "12207" } }],
    },
    contact: { firstName: "Sam", lastName: "Rivera", phone: "2015550100", email: "sam@example.test" },
    ...over,
  });
}

function njPayroll(over: Record<string, unknown> = {}): FilingRequestT {
  return FilingRequest.parse({
    tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `idem-${Math.random().toString(36).slice(2)}`,
    type: "payroll_registration", state: "NJ",
    payroll: {
      reason: "new_business", legalName: "Blue Harbor Consulting LLC", ownershipType: "LLC (1065 Filer)",
      fein: "12-3456789", entity: { njBusinessNumber: "0100999999" },
      businessAddress: { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" },
      beginDate: "2026-01-15", payingWages: true,
      owners: [{ name: "Sam Rivera", ssn: "123-45-6789", title: "Member", address: { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" } }],
    },
    contact: { firstName: "Sam", lastName: "Rivera", phone: "2015550100", email: "sam@example.test" },
    ...over,
  });
}

describe("payroll_registration domain + validation", () => {
  it("accepts complete NY and NJ payroll requests", () => {
    expect(hasErrors(validateFiling(nyPayroll()))).toBe(false);
    expect(hasErrors(validateFiling(njPayroll()))).toBe(false);
  });

  it("NY requires the FEIN and the date of first operations", () => {
    const noFein = nyPayroll(); delete (noFein.payroll as Record<string, unknown>).fein;
    expect(validateFiling(noFein).some((i) => i.path === "payroll.fein" && i.severity === "error")).toBe(true);
    const noDate = nyPayroll(); delete (noDate.payroll as Record<string, unknown>).dateFirstOperations;
    expect(validateFiling(noDate).some((i) => i.path === "payroll.dateFirstOperations")).toBe(true);
    // feinAppliedFor satisfies the FEIN requirement.
    const applied = nyPayroll(); const pp = applied.payroll as Record<string, unknown>; delete pp.fein; pp.feinAppliedFor = true;
    expect(validateFiling(applied).some((i) => i.path === "payroll.fein")).toBe(false);
  });

  it("NJ requires a begin date and an identity (FEIN, applied-for, or an owner SSN)", () => {
    const noBegin = njPayroll(); delete (noBegin.payroll as Record<string, unknown>).beginDate;
    expect(validateFiling(noBegin).some((i) => i.path === "payroll.beginDate")).toBe(true);
    const noId = njPayroll();
    const p = noId.payroll as Record<string, unknown>;
    delete p.fein; (p.owners as { ssn?: string }[])[0]!.ssn = undefined;
    expect(validateFiling(noId).some((i) => i.path === "payroll.fein")).toBe(true);
  });

  it("requires at least one owner, and rejects unmapped states", () => {
    const noOwners = nyPayroll(); (noOwners.payroll as Record<string, unknown>).owners = [];
    expect(validateFiling(noOwners).some((i) => i.path === "payroll.owners")).toBe(true);
    const mo = nyPayroll({ state: "MO" });
    expect(validateFiling(mo).some((i) => i.path === "state")).toBe(true);
  });
});

describe("payroll_registration routing + fees + masking", () => {
  it("routes to the right complete:false adapter", () => {
    expect(adapterFor(nyPayroll())).toBe(nyPayrollAdapter);
    expect(adapterFor(njPayroll())).toBe(njPayrollAdapter);
    expect(nyPayrollAdapter.complete).toBe(false);
    expect(njPayrollAdapter.complete).toBe(false);
    // NY payroll uses the company-wide NY login; NJ-REG needs none.
    expect(nyPayrollAdapter.profileKey({ filing: {} as never, client: {} as never, tenant: { nyGovCredentialKey: "NYGOV" } as never })).toBe("nygov");
    expect(njPayrollAdapter.credentialKey({ filing: {} as never, client: {} as never, tenant: {} as never })).toBeNull();
  });

  it("masks every owner SSN in the request", () => {
    const masked = maskSensitive(nyPayroll());
    expect(masked.payroll!.owners[0]!.ssn).toBe("***-**-6789");
    expect(JSON.stringify(masked)).not.toContain("123-45-6789");
  });

  it("creates a NY payroll filing with no fee and a masked SSN on the approval", async () => {
    const store = await seededStore();
    const w = wire(store);
    const { filing, approvalLink } = await w.service.createFiling(nyPayroll({ dryRun: false }));
    expect(filing.status).toBe("awaiting_approval");
    expect(approvalLink).toBeDefined();
    const approval = (await store.getApproval(filing.currentApprovalId!))!;
    expect(approval.fees.reduce((s, f) => s + f.amountUsd, 0)).toBe(0);
    expect(JSON.stringify(approval.shownPayload)).toContain("***-**-6789");
    expect(JSON.stringify(approval.shownPayload)).not.toContain("123-45-6789");
  });
});
