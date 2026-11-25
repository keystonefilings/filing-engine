import { describe, expect, it } from "vitest";
import { FilingRequest } from "../src/domain/filing.js";
import { hasErrors, validateFiling } from "../src/domain/validation.js";
import { expectedFees } from "../src/fees/table.js";
import { ClientCompanySettings, TenantSettings } from "../src/settings/schema.js";
import { applyPolicies } from "../src/settings/policies.js";
import { filingKind } from "../web/lib/intake/forms.js";
import { buildRequest, type Raw } from "../web/lib/intake/build.js";

// The front end's NY corporation form, as a firm's client fills it, checked against the engine.
const ctx = { tenantId: "keystone", clientCompanyId: "keystone-direct", idempotencyKey: "intake-nycorp-0001", submittedBy: "pat@example.test", source: "firm_portal" as const };
const addr = (p: string): Raw => ({ [`${p}.street1`]: "7 Front St", [`${p}.city`]: "Brooklyn", [`${p}.state`]: "NY", [`${p}.zip`]: "11201" });
const kind = filingKind("ny-corp")!;
const raw: Raw = {
  "formation.name.baseName": "Hudson Ledger", "formation.name.designator": "Inc.", "formation.county": "Kings",
  "formation.stockShares": "200", "formation.effectiveDate": "upon_filing",
  "formation.serviceOfProcess.mode": "service_company", "formation.serviceOfProcess.serviceCompany": "CORPORATION SERVICE COMPANY",
  "formation.serviceOfProcess.noticeEmail": "sop@example.test",
  "formation.incorporator.name": "Dana J Park", ...addr("formation.incorporator.address"),
  "formation.additionalCertificates.plainCopy": "on",
  "contact.firstName": "Dana", "contact.lastName": "Park", "contact.email": "dana@example.test", "contact.phone": "2125550100",
  ...Object.fromEntries(kind.authorizations.map((a) => [`auth.${a.id}`, "on"])),
};

describe("front end NY corporation form", () => {
  const client = ClientCompanySettings.parse({ clientCompanyId: "keystone-direct", tenantId: "keystone", name: "Keystone direct clients" });
  const filer = { name: "Keystone Filings", address: { street1: "1 Main St", city: "Albany", state: "NY", zip: "12207" } };

  it("builds a request the engine accepts as a NY business corporation, with the filer from the filing company", () => {
    const { request, issues } = buildRequest(kind, raw, ctx);
    expect(issues).toEqual([]);
    const tenant = TenantSettings.parse({ tenantId: "keystone", name: "Keystone Filings", filer });
    const filled = applyPolicies(request, tenant, client);
    expect(filled.issues.filter((i) => i.severity === "error")).toEqual([]);
    const req = FilingRequest.parse(filled.request);
    expect(req.formation?.nyEntityType).toBe("business_corporation");
    expect(req.formation?.organizer).toBeUndefined();
    expect(req.formation?.filer?.name).toBe("Keystone Filings");
    expect(hasErrors(validateFiling(req))).toBe(false);
  });

  it("says so when the filer is left blank and the filing company has none on file", () => {
    const { request } = buildRequest(kind, raw, ctx);
    const filled = applyPolicies(request, TenantSettings.parse({ tenantId: "keystone", name: "Keystone Filings" }), client);
    expect(filled.issues.map((i) => i.path)).toEqual(["formation.filer"]);
  });

  it("offers every corporate ending the engine accepts, and the engine prices it at $125 plus the copy", () => {
    const endings = kind.sections[0]!.items.find((i) => i.kind === "field" && i.path === "formation.name.designator");
    for (const o of (endings as { options: { value: string }[] }).options) {
      const { request } = buildRequest(kind, { ...raw, "formation.name.designator": o.value, "formation.filer.name": filer.name, ...Object.fromEntries(Object.entries(filer.address).map(([k, v]) => [`formation.filer.address.${k}`, v])) }, ctx);
      expect(hasErrors(validateFiling(FilingRequest.parse(request))), o.value).toBe(false);
    }
    expect(expectedFees("NY", "formation", { nyEntityType: "business_corporation", plainCopy: true }).map((l) => l.amountUsd)).toEqual([125, 5]);
  });
});
