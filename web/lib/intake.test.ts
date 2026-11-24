import { test } from "node:test";
import assert from "node:assert/strict";
import { FILING_KINDS, filingKind } from "./intake/forms.ts";
import { allFields, buildRequest, type Raw } from "./intake/build.ts";
import { seal, unseal } from "./seal.ts";

const ctx = { tenantId: "t1", clientCompanyId: "firm-1", idempotencyKey: "intake-abcdef123", submittedBy: "pat@example.test", source: "firm_portal" as const };
const addr = (p: string, state = "NY"): Raw => ({ [`${p}.street1`]: "1 Main St", [`${p}.city`]: "Albany", [`${p}.state`]: state, [`${p}.zip`]: "12207" });
const contact: Raw = { "contact.firstName": "Pat", "contact.lastName": "Lee", "contact.email": "pat@example.test", "contact.phone": "555-123-4567" };
const auths = (id: string): Raw => Object.fromEntries(filingKind(id)!.authorizations.map((a) => [`auth.${a.id}`, "on"]));

test("every kind has unique field paths and walkthrough refs", () => {
  for (const k of FILING_KINDS) {
    const paths = allFields(k).map((f) => f.path);
    assert.equal(new Set(paths).size, paths.length, `${k.id} has duplicate paths: ${paths.filter((p, i) => paths.indexOf(p) !== i)}`);
    assert.ok(k.authorizations.length > 0, `${k.id} has no authorizations`);
  }
});

test("NY LLC builds an engine request", () => {
  const raw: Raw = {
    "formation.name.baseName": "Blue Harbor", "formation.name.designator": "LLC", "formation.county": "Albany",
    "formation.managementStructure": "member_managed", "formation.effectiveDate": "upon_filing",
    "formation.serviceOfProcess.mode": "manual", "formation.serviceOfProcess.person.name": "THE LLC",
    ...addr("formation.serviceOfProcess.person.address"), "formation.serviceOfProcess.noticeEmail": "sop@example.test",
    "formation.serviceOfProcess.serviceCompany": "should be dropped",
    "formation.additionalCertificates.certifiedCopy": "on", ...contact, ...auths("ny-llc"),
  };
  const { request, issues } = buildRequest(filingKind("ny-llc")!, raw, ctx);
  assert.deepEqual(issues, []);
  assert.equal(request.type, "formation");
  assert.equal(request.state, "NY");
  const f = request.formation as Record<string, any>;
  assert.equal(f.entityType, "LLC");
  assert.equal(f.serviceOfProcess.person.address.zip, "12207");
  assert.equal(f.serviceOfProcess.serviceCompany, undefined);
  assert.equal(f.additionalCertificates.certifiedCopy, true);
  assert.equal(f.organizer, undefined, "blank optional organizer is left for the firm's policy");
  const portal = (request.intake as any).portal;
  assert.equal(portal.authorizations.length, 2);
  assert.equal(portal.kind, "ny-llc");
});

test("missing required fields and authorizations are reported", () => {
  const { issues } = buildRequest(filingKind("ny-llc")!, { "formation.registeredAgent.address.city": "Albany" }, ctx);
  const paths = issues.map((i) => i.path);
  assert.ok(paths.includes("formation.county"));
  assert.ok(paths.includes("contact.email"));
  assert.ok(paths.includes("formation.registeredAgent.name"), "agent name required once its address is started");
  assert.ok(paths.includes("auth.ny-signature"));
});

test("NJ groups are re-indexed and empty rows skipped", () => {
  const raw: Raw = {
    "formation.name.baseName": "Shore", "formation.name.designator": "LLC", "formation.effectiveDate": "upon_filing",
    "formation.registeredAgentChoice": "filing_company",
    "formation.members.0.name": "", "formation.members.3.name": "Avery", ...addr("formation.members.3.address", "NJ"),
    "formation.signers.0.name": "Avery", "formation.signers.0.title": "Member",
    "formation.otherProvisions.2": "Provision text",
    ...contact, ...auths("nj-llc"),
  };
  const { request, issues } = buildRequest(filingKind("nj-llc")!, raw, ctx);
  assert.deepEqual(issues, []);
  const f = request.formation as any;
  assert.equal(f.members.length, 1);
  assert.equal(f.members[0].name, "Avery");
  assert.deepEqual(f.otherProvisions, ["Provision text"]);
  assert.equal(f.registeredAgent, undefined);
});

test("Florida agent name is assembled and EIN start month becomes a date", () => {
  const fl = buildRequest(filingKind("fl-llc")!, {
    "formation.name.baseName": "Sun", "formation.name.designator": "LLC", "formation.effectiveDate": "upon_filing",
    ...addr("formation.mainBusinessAddress", "FL"), "intake.portal.flMailingSameAsPrincipal": "on",
    "formation.registeredAgentChoice": "client_provided", "intake.portal.flAgentKind": "individual",
    "intake.portal.flAgentFirstName": "Ana", "intake.portal.flAgentLastName": "Diaz", ...addr("formation.registeredAgent.address", "FL"),
    "intake.portal.flAgentSignerName": "Ana Diaz", "intake.portal.flCorrespondenceName": "Ana", "intake.portal.flCorrespondenceEmail": "ana@example.test",
    "intake.portal.flSignerName": "Ana Diaz", ...contact, ...auths("fl-llc"),
  }, ctx);
  assert.deepEqual(fl.issues, []);
  assert.equal((fl.request.formation as any).registeredAgent.name, "Ana Diaz");
  assert.equal((fl.request.formation as any).floridaEntityType, "llc");

  const irs = buildRequest(filingKind("irs-ein")!, { state: "NJ", "ein.startDate": "2026-11" }, ctx);
  assert.equal((irs.request.ein as any).startDate, "2026-11-01");
  assert.equal((irs.request.ein as any).formationState, "NJ");
  assert.equal(irs.request.state, "NJ");
  assert.ok(irs.issues.some((i) => i.path === "ein.responsibleParty.ssn"));
});

test("NYS-100 member extras go to stateAnswers and SSN follows residency", () => {
  const r = buildRequest(filingKind("ny-nys100")!, {
    "payroll.owners.0.stateAnswers_principalType": "person", "payroll.owners.0.title": "Member", "payroll.owners.0.name": "Avery",
    "payroll.owners.0.usResident": "no", "payroll.owners.0.ssn": "123-45-6789", "payroll.owners.0.percentOwnership": "100",
  }, ctx);
  const p = r.request.payroll as any;
  assert.equal(p.owners[0].ssn, undefined, "SSN is not collected for a non-resident");
  assert.equal(p.owners[0].usResident, false);
  assert.equal(p.owners[0].percentOwnership, 100);
  assert.equal(p.stateAnswers.owners[0].principalType, "person");
});

test("sealed tokens round-trip, are purpose-bound and expire", () => {
  const s = "x".repeat(40);
  const t = seal("client-intake", { a: 1 }, 60, s);
  assert.equal(unseal<{ a: number }>("client-intake", t, s)?.a, 1);
  assert.equal(unseal("session", t, s), null);
  assert.equal(unseal("client-intake", t, "y".repeat(40)), null);
  assert.equal(unseal("client-intake", seal("client-intake", {}, -1, s), s), null);
});

test("a hidden controller closes the fields under it", () => {
  const r = buildRequest(filingKind("fl-llc")!, {
    "formation.registeredAgentChoice": "filing_company", "intake.portal.flAgentKind": "individual", "intake.portal.flAgentFirstName": "Ana",
  }, ctx);
  assert.equal((r.request.intake as any).portal.flAgentFirstName, undefined);
  assert.ok(!r.issues.some((i) => i.path === "intake.portal.flAgentLastName"));
});

test("NY Certificate of Assumed Name builds a paper upload with counties and locations", () => {
  const AN = "paperUpload.assumedName";
  const base: Raw = {
    [`${AN}.realName`]: "Blue Harbor Inc.", [`${AN}.formedUnder`]: "business_corporation", [`${AN}.assumedName`]: "Blue Harbor Bakery",
    ...addr(`${AN}.principalPlace`), "intake.portal.nyAllCounties": "some",
    [`${AN}.counties.0`]: "Albany", [`${AN}.counties.3`]: "Kings",
    ...addr(`${AN}.locations.2`), [`${AN}.signer.name`]: "Jordan Lee", [`${AN}.signer.capacity`]: "officer",
    "paperUpload.signatureId": "sig-1", [`${AN}.filer.name`]: "Pat Lee", ...addr(`${AN}.filer.address`),
    "paperUpload.levelOfService": "routine", ...contact, ...auths("ny-assumed-name"),
  };
  const { request, issues } = buildRequest(filingKind("ny-assumed-name")!, base, ctx);
  assert.deepEqual(issues, []);
  assert.equal(request.type, "paper_upload");
  const u = request.paperUpload as Record<string, any>;
  assert.equal(u.form, "ny_assumed_name");
  assert.equal(u.signatureId, "sig-1");
  assert.deepEqual(u.assumedName.counties, ["Albany", "Kings"]);
  assert.equal(u.assumedName.locations.length, 1);
  assert.equal(u.assumedName.locations[0].zip, "12207");

  const all = buildRequest(filingKind("ny-assumed-name")!, { ...base, "intake.portal.nyAllCounties": "all" }, ctx);
  assert.equal((all.request.paperUpload as any).assumedName.counties, "all");
});

test("NY Application for Authority needs a signature and the signer", () => {
  const { issues } = buildRequest(filingKind("ny-authority")!, { ...contact, ...auths("ny-authority") }, ctx);
  const paths = issues.map((i) => i.path);
  assert.ok(paths.includes("paperUpload.signatureId"));
  assert.ok(paths.includes("paperUpload.applicationForAuthority.signer.name"));
});
