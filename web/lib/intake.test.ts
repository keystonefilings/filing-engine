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

  const irs = buildRequest(filingKind("irs-ein")!, { "ein.formationState": "NJ", "ein.startDate": "2026-11" }, ctx);
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

test("NYS-100 sends what the walked member and location screens ask, in the engine's shape", () => {
  const r = buildRequest(filingKind("ny-nys100")!, {
    // A US resident in New York: the US address and its county.
    "payroll.owners.0.stateAnswers_principalType": "person", "payroll.owners.0.title": "Member", "payroll.owners.0.name": "Avery Rivera",
    "payroll.owners.0.usResident": "yes", "payroll.owners.0.ssn": "123456789", ...addr("payroll.owners.0.address"), "payroll.owners.0.county": "Albany",
    // Not a US resident: the address outside the US; a US address typed before the answer changed is dropped.
    "payroll.owners.1.stateAnswers_principalType": "person", "payroll.owners.1.title": "Member", "payroll.owners.1.name": "Lee Chen",
    "payroll.owners.1.usResident": "no", ...addr("payroll.owners.1.address"), "payroll.owners.1.county": "Albany",
    "payroll.owners.1.foreignAddress.street1": "200 King St W", "payroll.owners.1.foreignAddress.city": "Toronto",
    "payroll.owners.1.foreignAddress.postalCode": "M5V 0A1", "payroll.owners.1.foreignAddress.country": "Canada",
    // A12: Manufacturing asks its own three questions; a service answer left over is not sent.
    "payroll.workLocations.0.activity": "Manufacturing", "payroll.workLocations.0.activityDetails.productsProduced": "Ship fittings",
    "payroll.workLocations.0.activityDetails.rawMaterials": "Bronze", "payroll.workLocations.0.activityDetails.percentOfSalesValue": "80",
    "payroll.workLocations.0.activityDetails.establishmentType": "Office",
    // A4: the acquired employer's New York address asks its county.
    "payroll.stateAnswers.acquiredBusiness": "yes", ...addr("payroll.stateAnswers.acquiredAddress"),
  }, ctx);
  const p = r.request.payroll as any;
  assert.equal(p.owners[0].ssn, "123-45-6789");
  assert.equal(p.owners[0].county, "Albany");
  assert.equal(p.owners[0].foreignAddress, undefined);
  assert.equal(p.owners[1].address, undefined);
  assert.equal(p.owners[1].county, undefined);
  assert.deepEqual(p.owners[1].foreignAddress, { street1: "200 King St W", city: "Toronto", postalCode: "M5V 0A1", country: "Canada" });
  assert.deepEqual(p.workLocations[0].activityDetails, { productsProduced: "Ship fittings", rawMaterials: "Bronze", percentOfSalesValue: 80 });
  const paths = r.issues.map((i) => i.path);
  assert.ok(paths.includes("payroll.stateAnswers.acquiredCounty"), "the county of a New York acquired employer is asked");
  assert.ok(!paths.includes("payroll.owners.1.foreignAddress.region"), "a state or province is optional");
});

test("NJ-REG sends the fiscal month as the number the engine takes", () => {
  const r = buildRequest(filingKind("nj-reg")!, { "payroll.entity.fiscalMonth": "6" }, ctx);
  assert.equal((r.request.payroll as any).entity.fiscalMonth, 6);
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

test("NY corporation takes par-value shares only when Par value is picked", () => {
  const raw: Raw = {
    "formation.name.baseName": "Hudson Ledger", "formation.name.designator": "Inc.", "formation.county": "Kings",
    "formation.stockShares": "20000", "intake.portal.nyShareValue": "par", "formation.stockParValueUsd": "0.01", "formation.effectiveDate": "upon_filing",
    "formation.serviceOfProcess.mode": "service_company", "formation.serviceOfProcess.serviceCompany": "CORPORATION SERVICE COMPANY",
    "formation.incorporator.name": "Dana J Park", ...addr("formation.incorporator.address"), ...contact, ...auths("ny-corp"),
  };
  const par = buildRequest(filingKind("ny-corp")!, raw, ctx);
  assert.deepEqual(par.issues, []);
  assert.equal((par.request.formation as any).stockParValueUsd, 0.01);
  // No par value: the amount is not sent, even if one was typed before switching back.
  const noPar = buildRequest(filingKind("ny-corp")!, { ...raw, "intake.portal.nyShareValue": "no_par" }, ctx);
  assert.deepEqual(noPar.issues, []);
  assert.equal((noPar.request.formation as any).stockParValueUsd, undefined);
  const missing = buildRequest(filingKind("ny-corp")!, { ...raw, "formation.stockParValueUsd": "" }, ctx);
  assert.ok(missing.issues.some((i) => i.path === "formation.stockParValueUsd"));
  const zero = buildRequest(filingKind("ny-corp")!, { ...raw, "formation.stockParValueUsd": "0" }, ctx);
  assert.match(zero.issues.find((i) => i.path === "formation.stockParValueUsd")?.message ?? "", /at least/);
});

test("NJ corporation builds a for-profit corporation request with directors and incorporators", () => {
  const raw: Raw = {
    "formation.name.baseName": "Garden Ledger", "formation.name.designator": "INC.", "formation.stockShares": "1000", "formation.effectiveDate": "upon_filing",
    "formation.registeredAgentChoice": "client_provided", "formation.registeredAgent.name": "Acme Agents Inc", ...addr("formation.registeredAgent.address", "NJ"),
    "formation.directors.0.name": "Avery Stone", ...addr("formation.directors.0.address", "NJ"),
    "formation.directors.2.name": "Jordan Hale", ...addr("formation.directors.2.address", "NJ"),
    "formation.incorporators.0.name": "Sam Rivera", ...addr("formation.incorporators.0.address", "NJ"),
    ...contact, ...auths("nj-corp"),
  };
  const { request, issues } = buildRequest(filingKind("nj-corp")!, raw, ctx);
  assert.deepEqual(issues, []);
  assert.equal(request.state, "NJ");
  const f = request.formation as any;
  assert.equal(f.njEntityType, "for_profit_corporation");
  assert.equal(f.stockShares, 1000);
  assert.deepEqual(f.directors.map((d: any) => d.name), ["Avery Stone", "Jordan Hale"]);
  assert.equal(f.incorporators[0].address.state, "NJ");
  assert.equal(f.members, undefined);
  assert.equal(f.signers, undefined, "the incorporators sign; the form doesn't ask again");
  const empty = buildRequest(filingKind("nj-corp")!, { ...contact }, ctx).issues.map((i) => i.path);
  for (const p of ["formation.stockShares", "formation.directors", "formation.incorporators", "auth.nj-corp-signature"]) assert.ok(empty.includes(p), p);
  // Only the corporation's endings are offered.
  const ending = filingKind("nj-corp")!.sections[0]!.items.find((i: any) => i.path === "formation.name.designator") as any;
  assert.ok(ending.options.every((o: any) => !/L\.?L\.?C|LIABILITY/.test(o.value)));
});

test("NY record filings build their own requests", () => {
  const entity = (base: string): Raw => ({ [`${base}.dosId`]: "1234567", [`${base}.name`]: "Hudson Ledger LLC" });
  const signer = (base: string): Raw => ({ [`${base}.signer.name`]: "Dana Park", [`${base}.signer.capacity`]: "member" });
  const build = (id: string, raw: Raw) => buildRequest(filingKind(id)!, { ...raw, ...contact, ...auths(id) }, ctx);

  const d = build("ny-llc-dissolution", { ...entity("dissolution.entity"), "dissolution.reason": "member_vote", ...signer("dissolution") });
  assert.deepEqual(d.issues, []);
  assert.equal(d.request.type, "dissolution");
  assert.deepEqual((d.request as any).dissolution, { entity: { dosId: "1234567", name: "Hudson Ledger LLC" }, reason: "member_vote", signer: { name: "Dana Park", capacity: "member" } });

  const a = build("ny-llc-name-change", { ...entity("amendment.entity"), "amendment.newName.baseName": "Hudson Books", "amendment.newName.designator": "LLC", ...signer("amendment") });
  assert.deepEqual(a.issues, []);
  assert.equal(a.request.type, "amendment");
  assert.equal((a.request as any).amendment.kind, "name_change");
  assert.equal((a.request as any).amendment.newName.baseName, "Hudson Books");

  // Only the ticked changes are sent.
  const c = build("ny-llc-change", {
    ...entity("certificateOfChange.entity"), ...signer("certificateOfChange"),
    "intake.portal.nyChangeCounty": "on", "certificateOfChange.county": "Queens",
    "certificateOfChange.serviceOfProcessEmail": "left over from an unticked box",
    "intake.portal.nyChangeAgentAddress": "on", ...addr("certificateOfChange.registeredAgentAddress"),
  });
  assert.deepEqual(c.issues, []);
  const ch = (c.request as any).certificateOfChange;
  assert.equal(ch.county, "Queens");
  assert.equal(ch.serviceOfProcessEmail, undefined);
  assert.equal(ch.registeredAgentAddress.city, "Albany");
  assert.ok(build("ny-llc-change", { ...entity("certificateOfChange.entity"), ...signer("certificateOfChange"), "intake.portal.nyChangeCounty": "on" }).issues.some((i) => i.path === "certificateOfChange.county"));

  const k = build("ny-copies", { "copyRequest.entity.dosId": "1234567", "copyRequest.documents.0.filingNumber": "240115000123", "copyRequest.documents.4.description": "Certificate of Publication", "copyRequest.documents.4.filingDate": "2024-05-02" });
  assert.deepEqual(k.issues, []);
  assert.equal(k.request.type, "copy_request");
  assert.deepEqual((k.request as any).copyRequest.documents, [{ filingNumber: "240115000123" }, { description: "Certificate of Publication", filingDate: "2024-05-02" }]);
  assert.ok(build("ny-copies", { "copyRequest.entity.dosId": "1234567" }).issues.some((i) => i.path === "copyRequest.documents"));

  const s = build("ny-status", { "standing.dosId": "1234567", "standing.entityName": "Hudson Ledger LLC", "standing.form": "long_filing_history" });
  assert.deepEqual(s.issues, []);
  assert.equal(s.request.type, "standing_certificate");
  assert.deepEqual((s.request as any).standing, { dosId: "1234567", entityName: "Hudson Ledger LLC", form: "long_filing_history" });

  // Each asks for the portal's signature and payment authorizations (copies and status: payment only).
  assert.deepEqual(filingKind("ny-llc-dissolution")!.authorizations.map((x) => x.id), ["ny-dissolution-signature", "ny-dissolution-payment"]);
  assert.deepEqual(filingKind("ny-copies")!.authorizations.map((x) => x.id), ["ny-copies-payment"]);
  assert.deepEqual(filingKind("ny-status")!.authorizations.map((x) => x.id), ["ny-status-payment"]);
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

test("decision 9: partner forms offer our registered agent where it's set up, priced for the firm, as the firm's service for clients", () => {
  const nj = filingKind("nj-llc")!, fl = filingKind("fl-llc")!;
  const firm = { name: "Best Accounting LLC", portal: { displayName: "Best Accounting" }, partner: { companyType: "cpa" }, ourAgent: { provider: "Registered Agents, Inc.", annualUsd: 59, states: ["NJ"] }, registeredAgentsByState: {} } as never;
  const label = (k: typeof nj, forClient: boolean) => {
    const { kind } = withFirmDefaults(k, firm, { forClient });
    const f = kind.sections.flatMap((s) => s.items).find((i) => i.kind === "field" && i.path === "formation.registeredAgentChoice") as { options: { value: string; label: string }[] } | undefined;
    return f?.options.find((o) => o.value === "filing_company")?.label ?? null;
  };
  assert.equal(label(nj, false), "Ours: Registered Agents, Inc., through CoFile ($59 a year per business, billed to your firm)");
  assert.equal(label(nj, true), "Best Accounting's registered agent service (Registered Agents, Inc.)");
  assert.equal(label(fl, false), null); // not set up in Florida: not offered
  // A firm an enterprise set up keeps its own wording.
  const ent = { name: "Acme CPA", registeredAgentsByState: {} } as never;
  const { kind } = withFirmDefaults(nj, ent);
  const f = kind.sections.flatMap((s) => s.items).find((i) => i.kind === "field" && i.path === "formation.registeredAgentChoice") as { options: { value: string }[] };
  assert.ok(f.options.some((o) => o.value === "filing_company"));
});

test("decision 15: the EIN form lists every state, and the filing is for the state where the LLC was formed", () => {
  const k = filingKind("irs-ein")!;
  const f = k.sections.flatMap((s) => s.items).find((i) => i.kind === "field" && i.path === "ein.formationState") as { type: string } | undefined;
  assert.equal(f?.type, "usState");
});


test("decision 18: the Florida forms offer professional endings and ask a professional entity for its purpose", () => {
  const endings = (id: string) => allFields(filingKind(id)!).find((f) => f.path === "formation.name.designator")!.field.options!.map((o) => o.value);
  for (const e of ["PLLC", "P.L.L.C.", "Chartered"]) assert.ok(endings("fl-llc").includes(e), e);
  for (const e of ["P.A.", "Professional Association", "Chartered"]) assert.ok(endings("fl-corp").includes(e), e);
  const help = (id: string) => allFields(filingKind(id)!).find((f) => f.path === "formation.name.baseName")!.field.help!;
  assert.match(help("fl-llc"), /PLLC, P\.L\.L\.C\., Professional Limited Liability Company or Chartered/);
  assert.match(help("fl-corp"), /P\.A\., Professional Association or Chartered/);

  const llc = (designator: string, purpose = "") => buildRequest(filingKind("fl-llc")!, {
    "formation.name.baseName": "Fields Accounting", "formation.name.designator": designator, "formation.purpose": purpose,
  }, ctx).issues.filter((i) => i.path === "formation.purpose");
  assert.equal(llc("PLLC").length, 1);
  assert.equal(llc("PLLC", "The practice of public accounting").length, 0);
  assert.equal(llc("LLC").length, 0);

  const corp = (designator: string, anyLawful: string) => buildRequest(filingKind("fl-corp")!, {
    "formation.name.baseName": "Rivera Dental", "formation.name.designator": designator, "intake.portal.flAnyLawfulBusiness": anyLawful,
  }, ctx).issues.filter((i) => i.path === "intake.portal.flAnyLawfulBusiness");
  assert.equal(corp("P.A.", "on").length, 1);
  assert.equal(corp("P.A.", "").length, 0);
  assert.equal(corp("Inc.", "on").length, 0);
});

test("decision 19: the Application for Authority asks for the Certificate of Existence, and the Tax Commission consent when it says so", () => {
  const kind = filingKind("ny-authority")!;
  const AU = "paperUpload.applicationForAuthority";
  const field = (p: string) => allFields(kind).find((f) => f.path === p)!.field;
  assert.equal(field(`${AU}.certificateOfExistenceDocumentId`).type, "pdf");
  assert.equal(field(`${AU}.certificateOfExistenceDocumentId`).documentKind, "certificate_of_existence");
  assert.equal(field(`${AU}.taxConsentDocumentId`).documentKind, "tax_commission_consent");
  // No "send it to the filing company" without an upload step.
  assert.ok(!JSON.stringify(kind).includes("Send it to the filing company"));
  const issuesAt = (raw: Raw, p: string) => buildRequest(kind, raw, ctx).issues.filter((i) => i.path === p);
  assert.equal(issuesAt({ [`${AU}.priorActivity`]: "none_in_new_york" }, `${AU}.certificateOfExistenceDocumentId`).length, 1);
  assert.equal(issuesAt({ [`${AU}.priorActivity`]: "none_in_new_york" }, `${AU}.taxConsentDocumentId`).length, 0);
  assert.equal(issuesAt({ [`${AU}.priorActivity`]: "tax_consent_attached" }, `${AU}.taxConsentDocumentId`).length, 1);
  const built = buildRequest(kind, { [`${AU}.priorActivity`]: "tax_consent_attached", [`${AU}.certificateOfExistenceDocumentId`]: "doc-1", [`${AU}.taxConsentDocumentId`]: "doc-2" }, ctx);
  const a = (built.request.paperUpload as any).applicationForAuthority;
  assert.equal(a.certificateOfExistenceDocumentId, "doc-1");
  assert.equal(a.taxConsentDocumentId, "doc-2");
});
