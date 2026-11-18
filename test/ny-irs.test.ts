import { describe, expect, it } from "vitest";
import { FilingRequest, EinRequest } from "../src/domain/filing.js";
import { validateFiling } from "../src/domain/validation.js";
import { IRS_SCREENS, IRS_ACTIVITY_CATEGORIES } from "../src/adapters/irs-ein/intents.js";
import { irsWindowMinutesRemaining } from "../src/orchestrator/preflight.js";
import { NY_SCREENS, NY_ESUBMISSION_SCREENS, NY_EXPEDITE } from "../src/adapters/ny-formation/intents.js";
import { expectedFees } from "../src/fees/table.js";
import { njFormationRequest } from "./helpers.js";

describe("IRS EIN map (from the 2026-11-18 walk)", () => {
  it("has the verified interview stages in order", () => {
    const keys = Object.values(IRS_SCREENS).map((s) => s.screenKey);
    expect(keys).toEqual([
      "irs.legal_structure", "irs.llc_members", "irs.reason", "irs.identity", "irs.designee",
      "irs.address", "irs.mailing", "irs.details", "irs.regulatory", "irs.employees",
      "irs.activity", "irs.review", "irs.assignment",
    ]);
    expect(IRS_ACTIVITY_CATEGORIES).toHaveLength(15);
    expect(IRS_ACTIVITY_CATEGORIES).toContain("Real Estate");
    // The SSN field is marked sensitive.
    const ssn = IRS_SCREENS.identity.intents.find((i) => i.key === "rpSsn");
    expect(ssn?.note).toMatch(/SENSITIVE/);
    // Notice delivery is in Review (digital = CP575 this session).
    expect(IRS_SCREENS.review.intents.some((i) => i.key === "noticeDelivery")).toBe(true);
  });

  it("defaults the applicant role to third-party designee and requires SS-4 + identity for a designee EIN", () => {
    const parsed = EinRequest.parse({ mode: "in_run" });
    expect(parsed.applicantRole).toBe("third_party_designee");
    expect(parsed.noticeDelivery).toBe("digital");
    const req = FilingRequest.parse(njFormationRequest({ ein: { mode: "in_run", responsibleParty: { name: "Sam Rivera", ssn: "123-45-6789", title: "Member", address: { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" }, phone: "2015550100" } } as never }));
    const paths = validateFiling(req).map((i) => i.path);
    expect(paths).toContain("ein.ss4AuthorizationArtifactId");
    expect(paths).toContain("ein.formationState");
    expect(paths).toContain("ein.businessActivity");
  });

  it("an owner-role EIN does not need the SS-4 designee authorization", () => {
    const req = FilingRequest.parse(njFormationRequest({ ein: { mode: "in_run", applicantRole: "owner", formationState: "NJ", businessActivity: { category: "Other" }, responsibleParty: { name: "Sam Rivera", ssn: "123-45-6789", title: "Member", address: { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" }, phone: "2015550100" } } as never }));
    const paths = validateFiling(req).map((i) => i.path);
    expect(paths).not.toContain("ein.ss4AuthorizationArtifactId");
  });

  it("knows the published IRS hours", () => {
    expect(irsWindowMinutesRemaining(new Date("2026-11-16T15:00:00Z"))).toBe(15 * 60); // Mon 10:00 ET
    expect(irsWindowMinutesRemaining(new Date("2026-11-15T15:00:00Z"))).toBeNull(); // Sun 10:00 ET (closed)
  });
});

describe("NY DOS map (from the 2026-11-18 walk)", () => {
  it("makes the conditional service-of-process and clause fields optional, keeps organizer/filer/name required", () => {
    const req = (k: string) => NY_SCREENS.filing.intents.find((i) => i.key === k);
    expect(req("county")?.required).toBe(true);
    expect(req("sopMode")?.required).toBe(true);
    expect(req("sopEmail")?.required).toBe(false); // electronic notice is optional
    expect(req("managementStructure")?.required).toBe(false); // clause is optional
    expect(req("organizerName")?.required).toBe(true);
    expect(req("signature")?.required).toBe(true);
    expect(req("filerName")?.required).toBe(true);
    expect(req("filerZip")?.required).toBe(true);
  });

  it("maps the E-Submission upload envelope with the level-of-service tiers", () => {
    const fi = NY_ESUBMISSION_SCREENS.filingInformation.intents;
    expect(fi.find((i) => i.key === "uploadDocument")?.kinds).toContain("file");
    expect(fi.find((i) => i.key === "levelOfService")?.required).toBe(true);
    expect(NY_EXPEDITE.same_day).toBe(75);
  });

  it("prices NY copies, certified copies, status certificates and formation", () => {
    expect(expectedFees("NY", "copy")[0].amountUsd).toBe(5);
    expect(expectedFees("NY", "certified_copy")[0].amountUsd).toBe(10);
    expect(expectedFees("NY", "status_certificate")[0].amountUsd).toBe(25);
    expect(expectedFees("NY", "formation")[0].amountUsd).toBe(200);
  });
});
