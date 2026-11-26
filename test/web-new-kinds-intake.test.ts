import { describe, expect, it } from "vitest";
import { FilingRequest } from "../src/domain/filing.js";
import { hasErrors, validateFiling } from "../src/domain/validation.js";
import { checkCompleteness } from "../src/domain/completeness.js";
import { expectedFees, totalUsd } from "../src/fees/table.js";
import { feeOptionsFor } from "../src/fees/request-fees.js";
import { adapterFor } from "../src/adapters/index.js";
import { ClientCompanySettings, TenantSettings } from "../src/settings/schema.js";
import { applyPolicies } from "../src/settings/policies.js";
import { filingKind } from "../web/lib/intake/forms.js";
import { buildRequest, type Raw } from "../web/lib/intake/build.js";

// The front end's forms for the filings added with V14, as a firm's client fills them, checked against the engine.
const ctx = { tenantId: "keystone", clientCompanyId: "keystone-direct", idempotencyKey: "intake-v14-0001", submittedBy: "pat@example.test", source: "firm_portal" as const };
const addr = (p: string, state = "NY", city = "Albany", zip = "12207"): Raw => ({ [`${p}.street1`]: "1 Main St", [`${p}.city`]: city, [`${p}.state`]: state, [`${p}.zip`]: zip });
const contact: Raw = { "contact.firstName": "Pat", "contact.lastName": "Lee", "contact.email": "pat@example.test", "contact.phone": "2125550100" };
const tenant = TenantSettings.parse({ tenantId: "keystone", name: "Keystone Filings", filer: { name: "Keystone Filings", address: { street1: "1 Main St", city: "Albany", state: "NY", zip: "12207" } } });
const client = ClientCompanySettings.parse({ clientCompanyId: "keystone-direct", tenantId: "keystone", name: "Keystone direct clients" });

function engineRequest(id: string, raw: Raw) {
  const kind = filingKind(id)!;
  const { request, issues } = buildRequest(kind, { ...raw, ...contact, ...Object.fromEntries(kind.authorizations.map((a) => [`auth.${a.id}`, "on"])) }, ctx);
  expect(issues).toEqual([]);
  const filled = applyPolicies(request, tenant, client);
  expect(filled.issues.filter((i) => i.severity === "error")).toEqual([]);
  const req = FilingRequest.parse(filled.request);
  expect(validateFiling(req).filter((i) => i.severity === "error")).toEqual([]);
  expect(checkCompleteness(req).missing).toEqual([]);
  return req;
}
const fees = (req: FilingRequest) => totalUsd(expectedFees(req.state as "NY", req.type, feeOptionsFor(req, tenant, client)));

const entity = (base: string): Raw => ({ [`${base}.dosId`]: "1234567", [`${base}.name`]: "Hudson Ledger LLC" });
const signer = (base: string): Raw => ({ [`${base}.signer.name`]: "Dana Park", [`${base}.signer.capacity`]: "manager" });

describe("front end forms added with V14", () => {
  it("NY corporation with par-value shares: accepted, quoted $125 plus the tax on shares", () => {
    const req = engineRequest("ny-corp", {
      "formation.name.baseName": "Hudson Ledger", "formation.name.designator": "Inc.", "formation.county": "Kings",
      "formation.stockShares": "20000", "intake.portal.nyShareValue": "par", "formation.stockParValueUsd": "1", "formation.effectiveDate": "upon_filing",
      "formation.serviceOfProcess.mode": "service_company", "formation.serviceOfProcess.serviceCompany": "CORPORATION SERVICE COMPANY",
      "formation.incorporator.name": "Dana J Park", ...addr("formation.incorporator.address"),
    });
    expect(req.formation?.stockParValueUsd).toBe(1);
    expect(adapterFor(req)?.key).toBe("ny-formation");
    expect(fees(req)).toBe(135);
  });

  it("NJ corporation: a for-profit corporation on the NJ formation adapter, $100 plus the portal fee", () => {
    const req = engineRequest("nj-corp", {
      "formation.name.baseName": "Garden Ledger", "formation.name.designator": "INC.", "formation.stockShares": "1000", "formation.effectiveDate": "upon_filing",
      "formation.registeredAgentChoice": "client_provided", "formation.registeredAgent.name": "Acme Agents Inc", ...addr("formation.registeredAgent.address", "NJ", "Newark", "07102"),
      "formation.directors.0.name": "Avery Stone", ...addr("formation.directors.0.address", "NJ", "Hoboken", "07030"),
      "formation.incorporators.0.name": "Sam Rivera", ...addr("formation.incorporators.0.address", "NJ", "Hoboken", "07030"),
    });
    expect(req.formation?.njEntityType).toBe("for_profit_corporation");
    expect(req.formation?.signers).toEqual([]);
    expect(adapterFor(req)?.key).toBe("nj-formation");
    expect(fees(req)).toBe(103.5);
  });

  it("every ending the NJ corporation form offers is one the engine accepts", () => {
    const kind = filingKind("nj-corp")!;
    const ending = kind.sections[0]!.items.find((i) => i.kind === "field" && i.path === "formation.name.designator") as { options: { value: string }[] };
    for (const o of ending.options) {
      const r = buildRequest(kind, { "formation.name.baseName": "Garden Ledger", "formation.name.designator": o.value, "formation.stockShares": "1", "formation.effectiveDate": "upon_filing", "formation.registeredAgentChoice": "filing_company",
        "formation.directors.0.name": "A B", ...addr("formation.directors.0.address", "NJ", "Hoboken", "07030"), "formation.incorporators.0.name": "C D", ...addr("formation.incorporators.0.address", "NJ", "Hoboken", "07030"), ...contact }, ctx).request;
      expect(validateFiling(FilingRequest.parse(r)).filter((i) => i.path === "formation.name.designator"), o.value).toEqual([]);
    }
  });

  it("NY record filings: accepted, routed to their adapters and priced from the map", () => {
    const d = engineRequest("ny-llc-dissolution", { ...entity("dissolution.entity"), "dissolution.reason": "no_members", ...signer("dissolution") });
    expect([adapterFor(d)?.key, fees(d)]).toEqual(["ny-dissolution", 60]);
    const a = engineRequest("ny-llc-name-change", { ...entity("amendment.entity"), "amendment.newName.baseName": "Hudson Books", "amendment.newName.designator": "LLC", ...signer("amendment") });
    expect([adapterFor(a)?.key, fees(a)]).toEqual(["ny-amendment", 60]);
    const c = engineRequest("ny-llc-change", { ...entity("certificateOfChange.entity"), ...signer("certificateOfChange"), "intake.portal.nyChangeSop": "on", "certificateOfChange.serviceOfProcess.name": "THE LLC", ...addr("certificateOfChange.serviceOfProcess.address") });
    expect([adapterFor(c)?.key, fees(c)]).toEqual(["ny-certificate-of-change", 30]);
    expect(c.certificateOfChange?.serviceOfProcess?.address.zip).toBe("12207");
    const k = engineRequest("ny-copies", { "copyRequest.entity.dosId": "1234567", "copyRequest.documents.0.filingNumber": "240115000123", "copyRequest.documents.1.description": "Biennial Statement" });
    expect([adapterFor(k)?.key, fees(k)]).toEqual(["ny-copy-request", 10]);
    const s = engineRequest("ny-status", { "standing.dosId": "1234567", "standing.entityName": "Hudson Ledger LLC", "standing.form": "short" });
    expect([adapterFor(s)?.key, fees(s)]).toEqual(["ny-status-certificate", 25]);
  });

  it("a certificate of change with nothing ticked is refused by the engine with a plain reason", () => {
    const kind = filingKind("ny-llc-change")!;
    const { request } = buildRequest(kind, { ...entity("certificateOfChange.entity"), ...signer("certificateOfChange"), ...contact }, ctx);
    const issues = validateFiling(FilingRequest.parse(request));
    expect(hasErrors(issues)).toBe(true);
    expect(issues.find((i) => i.path === "certificateOfChange")?.message).toMatch(/at least one change/);
  });
});
