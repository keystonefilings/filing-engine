import { test } from "node:test";
import assert from "node:assert/strict";
import { FILING_KINDS, filingKind } from "./intake/forms.ts";
import { allFields, buildRequest, type Raw } from "./intake/build.ts";
import { seal, unseal } from "./seal.ts";
import { withFirmDefaults } from "./firm-defaults.ts";
import { answersFrom } from "./client-answers.ts";

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
    "intake.portal.flAgentSignerName": "Ana Diaz",
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

test("NY corporation builds a business corporation request", () => {
  const raw: Raw = {
    "formation.name.baseName": "Hudson Ledger", "formation.name.designator": "Inc.", "formation.county": "Kings",
    "formation.stockShares": "200", "formation.effectiveDate": "upon_filing",
    "formation.serviceOfProcess.mode": "manual", "formation.serviceOfProcess.person.name": "THE CORPORATION",
    ...addr("formation.serviceOfProcess.person.address"), "formation.serviceOfProcess.noticeEmail": "sop@example.test",
    "formation.incorporator.name": "Dana J Park", ...addr("formation.incorporator.address"),
    "formation.additionalCertificates.plainCopy": "on", "intake.portal.customerReference": "ACME-42",
    ...contact, ...auths("ny-corp"),
  };
  const { request, issues } = buildRequest(filingKind("ny-corp")!, raw, ctx);
  assert.deepEqual(issues, []);
  assert.equal(request.state, "NY");
  const f = request.formation as Record<string, any>;
  assert.equal(f.nyEntityType, "business_corporation");
  assert.equal(f.stockShares, 200);
  assert.equal(f.incorporator.name, "Dana J Park");
  assert.equal(f.incorporator.address.zip, "12207");
  assert.equal(f.additionalCertificates.plainCopy, true);
  assert.equal(f.organizer, undefined);
  assert.equal(f.managementStructure, undefined);
  assert.equal((request.intake as any).portal.customerReference, "ACME-42");
});

test("NY corporation wants whole shares and a first and last name", () => {
  const { issues } = buildRequest(filingKind("ny-corp")!, { "formation.stockShares": "2.5", "formation.incorporator.name": "Dana" }, ctx);
  const msg = (p: string) => issues.find((i) => i.path === p)?.message ?? "";
  assert.match(msg("formation.stockShares"), /whole number/);
  assert.match(msg("formation.incorporator.name"), /first and last name/);
  assert.ok(issues.some((i) => i.path === "auth.ny-corp-signature"));
});

test("a firm's saved agent is offered first and sent as the firm's own agent (V22)", () => {
  const company = { registeredAgentsByState: { NJ: { name: "Garden State Agents", address: { street1: "9 Agent Way", city: "Newark", state: "NJ", zip: "07102" } } } };
  const { kind, prefill } = withFirmDefaults(filingKind("nj-llc")!, company);
  const choice = kind.sections.flatMap((s) => s.items).find((i: any) => i.path === "formation.registeredAgentChoice") as any;
  assert.equal(choice.defaultValue, "firm_saved");
  assert.equal(choice.options[0].label, "Our saved agent: Garden State Agents");
  assert.deepEqual(prefill, {});
  const raw: Raw = {
    "formation.name.baseName": "Shore", "formation.name.designator": "LLC", "formation.effectiveDate": "upon_filing",
    "formation.registeredAgentChoice": "firm_saved",
    "formation.members.3.name": "Avery", ...addr("formation.members.3.address", "NJ"),
    "formation.signers.0.name": "Avery", "formation.signers.0.title": "Member",
    ...contact, ...auths("nj-llc"),
  };
  const { request, issues } = buildRequest(kind, raw, ctx);
  assert.deepEqual(issues, []);
  const f = request.formation as any;
  assert.equal(f.registeredAgentChoice, "client_provided");
  assert.equal(f.registeredAgent, undefined);
  // A New York form (agent optional) gets the saved agent filled in instead.
  const ny = withFirmDefaults(filingKind("ny-llc")!, { registeredAgentsByState: { NY: { name: "Empire Agents", address: { street1: "1 State St", city: "Albany", state: "NY", zip: "12207" } } } });
  assert.equal(ny.prefill["formation.registeredAgent.name"], "Empire Agents");
  assert.equal(ny.prefill["formation.registeredAgent.address.city"], "Albany");
  // No saved agent: the form is unchanged.
  assert.equal(withFirmDefaults(filingKind("nj-llc")!, {}).kind, filingKind("nj-llc"));
});

test("starting from an earlier client copies the client's details only (V23)", () => {
  const a = answersFrom({
    contact: { firstName: "Sam", lastName: "Rivera", email: "sam@x.test", phone: "555" },
    formation: { name: { baseName: "Old Co", designator: "LLC" }, mainBusinessAddress: { street1: "1 Main", city: "Albany", state: "NY", zip: "12207" },
      members: [{ name: "Sam Rivera", address: { street1: "2 Elm", city: "Troy", state: "NY", zip: "12180" } }, { name: "Second" }] },
    ein: { responsibleParty: { name: "Sam Rivera", ssn: "***-**-6789" } },
  });
  assert.equal(a["contact.email"], "sam@x.test");
  assert.equal(a["formation.mainBusinessAddress.city"], "Albany");
  assert.equal(a["formation.members.0.name"], "Sam Rivera");
  assert.equal(a["formation.members.0.address.city"], "Troy");
  assert.equal(a["formation.name.baseName"], undefined);
  assert.equal(a["formation.members.1.name"], undefined);
  assert.equal(Object.keys(a).some((k) => k.startsWith("ein.")), false);
});

test("answers given once are reused, not asked again (V24)", () => {
  const ny = buildRequest(filingKind("ny-llc")!, { "formation.serviceOfProcess.mode": "manual", ...contact }, ctx).request as any;
  assert.equal(ny.formation.serviceOfProcess.noticeEmail, "pat@example.test");
  const nys = buildRequest(filingKind("ny-nys100")!, {
    "payroll.stateAnswers.businessPhone": "5185550100", "intake.portal.booksSameAsBusiness": "on", "intake.portal.chargesSameAsBusiness": "on",
  }, ctx).request as any;
  assert.equal(nys.payroll.stateAnswers.booksPhone, "5185550100");
  assert.equal(nys.payroll.stateAnswers.chargesPhone, "5185550100");
  const ein = buildRequest(filingKind("irs-ein")!, { ...addr("ein.responsibleParty.address", "NJ") }, ctx).request as any;
  assert.equal(ein.ein.physicalState, "NJ");
  // Florida's correspondence is the filing contact: the form no longer asks for it.
  assert.ok(!allFields(filingKind("fl-llc")!).some((f) => f.path.startsWith("intake.portal.flCorrespondence")));
});

test("V40: answers read from an email are kept only when the form takes them", async () => {
  const { checkAnswers, slots } = await import("./email-answers.ts");
  const k = filingKind("ny-llc")!;
  const out = checkAnswers(k, [
    { field: "formation.name.baseName", value: "Blue Harbor Consulting" },
    { field: "formation.name.designator", value: slots(k).find((x) => x.name === "formation.name.designator")!.field.options![0]!.value },
    { field: "formation.name.designator", value: "Corp." },
    { field: "formation.mainBusinessAddress.state", value: "ZZ" },
    { field: "formation.mainBusinessAddress.zip", value: "11201" },
    { field: "formation.effectiveDateValue", value: "next Tuesday" },
    { field: "formation.unknown", value: "x" },
    { field: "contact.email", value: "not an email" },
    { field: "contact.firstName", value: "  " },
  ]);
  assert.deepEqual(Object.keys(out).sort(), ["formation.mainBusinessAddress.zip", "formation.name.baseName", "formation.name.designator"]);
  // Repeated items: by position, within the form's limit.
  const grouped = FILING_KINDS.find((x) => slots(x).some((s) => s.group))!;
  const slot = slots(grouped).find((s) => s.group && s.field.type === "text")!;
  const g = checkAnswers(grouped, [
    { field: slot.name.replace(".N.", ".1."), value: "Sam Rivera" },
    { field: slot.name.replace(".N.", `.${slot.group!.max}.`), value: "one too many" },
  ]);
  assert.deepEqual(Object.keys(g), [slot.name.replace(".N.", ".1.")]);
});
