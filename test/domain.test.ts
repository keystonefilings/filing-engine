import { describe, expect, it } from "vitest";
import { renderName, hasLlcIndicator } from "../src/domain/name.js";
import { validateFiling, hasErrors } from "../src/domain/validation.js";
import { canTransition, assertTransition } from "../src/domain/states.js";
import { FilingRequest } from "../src/domain/filing.js";
import { njFormationRequest } from "./helpers.js";

describe("name model", () => {
  const name = { baseName: "Blue Harbor Consulting", designator: "llc" };
  it("renders per site", () => {
    expect(renderName(name, "NJ")).toEqual({ nameField: "Blue Harbor Consulting", designator: "LLC" });
    expect(renderName(name, "NY").nameField).toBe("Blue Harbor Consulting LLC");
    expect(renderName(name, "IRS").nameField).toBe("Blue Harbor Consulting LLC");
  });
  it("detects NY indicator", () => {
    expect(hasLlcIndicator("Foo LLC")).toBe(true);
    expect(hasLlcIndicator("Foo L.L.C.")).toBe(true);
    expect(hasLlcIndicator("Foo Inc")).toBe(false);
  });
});

describe("validation", () => {
  it("accepts a complete NJ formation", () => {
    const req = FilingRequest.parse(njFormationRequest());
    expect(hasErrors(validateFiling(req))).toBe(false);
  });
  it("rejects designator inside baseName and missing NJ member", () => {
    const req = FilingRequest.parse(njFormationRequest());
    req.formation!.name.baseName = "Blue Harbor LLC";
    req.formation!.members = [];
    const issues = validateFiling(req);
    expect(issues.map((i) => i.path)).toEqual(expect.arrayContaining(["formation.name.baseName", "formation.members"]));
  });
  it("NY needs county, SOP, organizer, filer, indicator; restricted words warn", () => {
    const req = FilingRequest.parse(njFormationRequest({ state: "NY" }));
    req.formation!.name.baseName = "Harbor Bank Holdings";
    const issues = validateFiling(req);
    expect(issues.filter((i) => i.severity === "error").map((i) => i.path)).toEqual(
      expect.arrayContaining(["formation.county", "formation.serviceOfProcess", "formation.managementStructure", "formation.organizer", "formation.filer"]),
    );
    expect(issues.some((i) => i.severity === "warning" && i.message.includes("bank"))).toBe(true);
  });
  it("in-run EIN requires a responsible party; only the designee route needs the SS-4 authorization", () => {
    const req = FilingRequest.parse(njFormationRequest({ ein: { mode: "in_run", closingMonth: 12 } as never }));
    const paths = validateFiling(req).map((i) => i.path);
    expect(paths).toContain("ein.responsibleParty");
    expect(paths).not.toContain("ein.ss4AuthorizationArtifactId"); // decision 6: an owner applies
    const designee = FilingRequest.parse(njFormationRequest({ ein: { mode: "in_run", closingMonth: 12, applicantRole: "third_party_designee" } as never }));
    expect(validateFiling(designee).map((i) => i.path)).toContain("ein.ss4AuthorizationArtifactId");
  });
});

describe("lifecycle", () => {
  it("allows the main path and blocks illegal jumps", () => {
    expect(canTransition("created", "awaiting_approval")).toBe(true);
    expect(canTransition("awaiting_approval", "approved")).toBe(true);
    expect(canTransition("approved", "queued")).toBe(true);
    expect(canTransition("running", "awaiting_drift_review")).toBe(true);
    expect(canTransition("awaiting_drift_review", "awaiting_approval")).toBe(true);
    expect(canTransition("created", "submitted")).toBe(false);
    expect(() => assertTransition("completed", "running")).toThrow();
  });
});
