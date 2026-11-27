import { test } from "node:test";
import assert from "node:assert/strict";
import { filingKind } from "./intake/forms.ts";
import { buildRequest, type Raw } from "./intake/build.ts";
import { withFirmDefaults } from "./firm-defaults.ts";
import { offered, STATE_ROLES } from "./state-roles.ts";

/** Nov 27: per-state partner settings shape the forms, and the resolver turns each answer into the engine's fields. */

const ctx = { tenantId: "t1", clientCompanyId: "firm-1", idempotencyKey: "intake-abcdef123", submittedBy: "pat@example.test", source: "client_link" as const };
const addr = (p: string, state = "NY", street = "1 Main St"): Raw => ({ [`${p}.street1`]: street, [`${p}.city`]: state === "NJ" ? "Newark" : "Albany", [`${p}.state`]: state, [`${p}.zip`]: state === "NJ" ? "07102" : "12207" });
const contact: Raw = { "contact.firstName": "Pat", "contact.lastName": "Lee", "contact.email": "pat@example.test", "contact.phone": "555-123-4567" };
const auths = (id: string): Raw => Object.fromEntries(filingKind(id)!.authorizations.map((a) => [`auth.${a.id}`, "on"]));
const field = (kind: ReturnType<typeof filingKind>, path: string) => kind!.sections.flatMap((s) => s.items).find((i) => i.kind !== "note" && i.path === path) as any;
const note = (kind: ReturnType<typeof filingKind>, starts: string) => kind!.sections.flatMap((s) => s.items).find((i) => i.kind === "note" && i.text.startsWith(starts)) as any;

const firmNY = { street1: "250 Broadway", city: "New York", state: "NY", zip: "10007" };
const partner = {
  name: "Rivera CPA LLC", portal: { slug: "rivera", displayName: "Rivera CPA" }, partner: { companyType: "cpa" }, filerName: "CoFile", registeredAgentsByState: {},
  stateRoles: {
    NY: { firm: { name: "Rivera CPA", address: firmNY }, roles: { serviceOfProcess: { offer: ["partner"] }, organizer: { offer: ["partner"] }, filer: { offer: ["partner"], fixed: "partner" }, registeredAgent: { offer: ["partner"] } } },
    NJ: { signer: { name: "Pat Rivera", title: "Managing Member" }, roles: { signer: { offer: ["partner"] }, registeredAgent: { offer: ["entity", "member"] } } },
    FL: { signer: { name: "Pat Rivera" }, roles: { signer: { fixed: "partner" } } },
  },
} as never;

const nyBase: Raw = {
  "formation.name.baseName": "Blue Harbor", "formation.name.designator": "LLC", "formation.county": "Albany", "formation.managementStructure": "member_managed", "formation.effectiveDate": "upon_filing",
  ...contact, ...auths("ny-llc"),
};

test("the registry covers each role once per state, with answers the engine's fields can hold", () => {
  const keys = STATE_ROLES.map((r) => `${r.state}:${r.id}`);
  assert.equal(new Set(keys).size, keys.length);
  for (const r of STATE_ROLES) {
    assert.ok(r.always.length, `${r.state} ${r.id} offers nothing by itself`);
    for (const c of r.decidable) assert.ok([...r.always, ...r.optional].includes(c), `${r.state} ${r.id}: ${c} can be fixed but never offered`);
  }
});

test("New York: a client's form offers the firm where the firm said so, and the firm decides the filer", () => {
  const { kind } = withFirmDefaults(filingKind("ny-llc")!, partner, { forClient: true });
  const sop = field(kind, "formation.serviceOfProcess.mode");
  assert.deepEqual(sop.options.map((o: any) => o.value), ["partner", "entity", "manual", "service_company"]);
  assert.equal(sop.defaultValue, "partner");
  assert.equal(sop.options[0].label, "Rivera CPA, the firm that sent you this form (250 Broadway, New York)");
  assert.equal(sop.options[1].label, "The new LLC itself, at its principal business address (entered below)");
  const org = field(kind, "intake.portal.roles.organizer");
  assert.deepEqual(org.options.map((o: any) => o.value), ["partner", "client", "filing_company"]);
  assert.match(org.options[1].label, /^Me, or another owner/);
  assert.equal(org.options[2].label, "CoFile, the company that files this");
  assert.deepEqual(field(kind, "formation.organizer.name").showIf, { path: "intake.portal.roles.organizer", equals: ["client"] });
  assert.equal(field(kind, "formation.organizer.name").required, true);
  // The filer is fixed: no question, no fields, a note instead.
  assert.equal(field(kind, "intake.portal.roles.filer"), undefined);
  assert.equal(field(kind, "formation.filer.name"), undefined);
  assert.match(note(kind, "Filer:").text, /^Filer: Rivera CPA, the firm that sent you this form \(250 Broadway, New York\)\. Rivera CPA set this for its filings\./);
  // The optional agent starts at none.
  const ra = field(kind, "intake.portal.roles.registeredAgent");
  assert.deepEqual(ra.options.map((o: any) => o.value), ["partner", "other", "none"]);
  assert.equal(ra.defaultValue, "none");
  // The firm's own staff read the same answers in their own words.
  const staff = withFirmDefaults(filingKind("ny-llc")!, partner).kind;
  assert.equal(field(staff, "formation.serviceOfProcess.mode").options[0].label, "Your firm, Rivera CPA (250 Broadway, New York)");
  assert.match(note(staff, "Filer:").text, /Set under Setup/);
});

test("New York: the answers become the engine's fields on submit", () => {
  const { kind, resolve } = withFirmDefaults(filingKind("ny-llc")!, partner, { forClient: true });
  const raw: Raw = { ...nyBase, "formation.serviceOfProcess.mode": "partner", "intake.portal.roles.organizer": "client", "formation.organizer.name": "Ana Ortiz", ...addr("formation.organizer.address"), "intake.portal.roles.registeredAgent": "none" };
  const { request, issues } = buildRequest(kind, raw, ctx);
  assert.deepEqual(issues, []);
  assert.deepEqual(resolve(request, raw), []);
  const f = request.formation as any;
  assert.deepEqual(f.serviceOfProcess, { mode: "manual", person: { name: "Rivera CPA", address: firmNY }, noticeEmail: "pat@example.test" });
  assert.equal(f.organizer.name, "Ana Ortiz");
  assert.deepEqual(f.filer, { name: "Rivera CPA", address: firmNY });
  assert.equal(f.registeredAgent, undefined);
  // The LLC as its own service-of-process address needs that address.
  const entity: Raw = { ...nyBase, "formation.serviceOfProcess.mode": "entity", "intake.portal.roles.organizer": "filing_company", "intake.portal.roles.registeredAgent": "partner" };
  const short = buildRequest(kind, entity, ctx);
  assert.deepEqual(short.issues, []);
  assert.match(resolve(short.request, entity)[0]!.message, /principal business address/);
  const withAddr = { ...entity, ...addr("formation.mainBusinessAddress", "NY", "9 Harbor Rd") };
  const ok = buildRequest(kind, withAddr, ctx);
  assert.deepEqual(resolve(ok.request, withAddr), []);
  const g = ok.request.formation as any;
  assert.equal(g.serviceOfProcess.person.name, "Blue Harbor LLC");
  assert.equal(g.serviceOfProcess.person.address.street1, "9 Harbor Rd");
  assert.equal(g.organizer, undefined, "the filing company's organizer is left to its policy");
  assert.deepEqual(g.registeredAgent, { name: "Rivera CPA", address: firmNY });
});

test("New York without settings: the state's own answers, nothing about the firm", () => {
  const plain = { name: "Plain CPA", partner: { companyType: "cpa" }, filerName: "CoFile", registeredAgentsByState: {} };
  const { kind } = withFirmDefaults(filingKind("ny-llc")!, plain as never, { forClient: true });
  assert.deepEqual(field(kind, "formation.serviceOfProcess.mode").options.map((o: any) => o.value), ["entity", "manual", "service_company"]);
  assert.equal(field(kind, "formation.serviceOfProcess.mode").defaultValue, "entity");
  assert.deepEqual(field(kind, "intake.portal.roles.organizer").options.map((o: any) => o.value), ["client", "filing_company"]);
  assert.deepEqual(field(kind, "intake.portal.roles.filer").options.map((o: any) => o.value), ["client", "filing_company"]);
  assert.deepEqual(field(kind, "intake.portal.roles.registeredAgent").options.map((o: any) => o.value), ["other", "none"]);
  // A saved New York agent is offered as an answer, and starts selected, instead of being typed in behind the client's back.
  const saved = { ...plain, registeredAgentsByState: { NY: { name: "Empire Agents", address: { street1: "1 State St", city: "Albany", state: "NY", zip: "12207" } } } } as never;
  const s = withFirmDefaults(filingKind("ny-llc")!, saved, { forClient: true });
  assert.equal(field(s.kind, "intake.portal.roles.registeredAgent").defaultValue, "saved");
  assert.equal(field(s.kind, "intake.portal.roles.registeredAgent").options[0].label, "Our saved agent: Empire Agents");
  assert.equal(s.prefill["formation.registeredAgent.name"], undefined);
  // A firm an enterprise set up (no partner) keeps the form it had.
  assert.equal(withFirmDefaults(filingKind("ny-llc")!, { registeredAgentsByState: {} }).kind, filingKind("ny-llc"));
});

test("New Jersey: the firm's signer and the agent answers it added", () => {
  const { kind, resolve } = withFirmDefaults(filingKind("nj-llc")!, partner, { forClient: true });
  const signer = field(kind, "intake.portal.roles.signer");
  assert.deepEqual(signer.options.map((o: any) => o.value), ["partner", "client"]);
  assert.equal(signer.options[0].label, "Rivera CPA's authorized representative, Pat Rivera");
  assert.deepEqual(field(kind, "formation.signers").showIf, { path: "intake.portal.roles.signer", equals: ["client"] });
  const agent = field(kind, "formation.registeredAgentChoice");
  assert.deepEqual(agent.options.map((o: any) => o.value), ["new_entity", "entity_member", "client_provided"]);
  assert.equal(agent.options[2].label, "I'll name the agent");
  const base: Raw = { "formation.name.baseName": "Shore", "formation.name.designator": "LLC", "formation.effectiveDate": "upon_filing", "intake.portal.roles.signer": "partner",
    "formation.members.0.name": "Avery", ...addr("formation.members.0.address", "NY"), "formation.members.1.name": "Blake", ...addr("formation.members.1.address", "NJ", "7 Shore Dr"), ...contact, ...auths("nj-llc") };
  // The firm signs; no signer typed, and no complaint about the empty signers list.
  const r1: Raw = { ...base, "formation.registeredAgentChoice": "entity_member" };
  const b1 = buildRequest(kind, r1, ctx);
  assert.deepEqual(b1.issues, []);
  assert.deepEqual(resolve(b1.request, r1), []);
  const f1 = b1.request.formation as any;
  assert.deepEqual(f1.signers, [{ name: "Pat Rivera", title: "Managing Member" }]);
  assert.equal(f1.registeredAgentChoice, "client_provided");
  assert.deepEqual(f1.registeredAgent, { name: "Blake", address: { street1: "7 Shore Dr", city: "Newark", state: "NJ", zip: "07102" } });
  // The LLC as its own agent needs a New Jersey business address.
  const r2: Raw = { ...base, "formation.registeredAgentChoice": "new_entity", ...addr("formation.mainBusinessAddress", "NY") };
  assert.match(resolve(buildRequest(kind, r2, ctx).request, r2)[0]!.message, /New Jersey street address/);
  const r3: Raw = { ...base, "formation.registeredAgentChoice": "new_entity", ...addr("formation.mainBusinessAddress", "NJ", "3 Boardwalk") };
  const b3 = buildRequest(kind, r3, ctx);
  assert.deepEqual(resolve(b3.request, r3), []);
  assert.deepEqual((b3.request.formation as any).registeredAgent, { name: "Shore LLC", address: { street1: "3 Boardwalk", city: "Newark", state: "NJ", zip: "07102" } });
  // Without a member in New Jersey, that answer is refused with a reason.
  const r4: Raw = { ...base, "formation.registeredAgentChoice": "entity_member", "formation.members.1.address.state": "NY" };
  assert.match(resolve(buildRequest(kind, r4, ctx).request, r4)[0]!.message, /none of the members/);
});

test("Florida: the firm fixed its signer, so the client isn't asked", () => {
  const { kind, resolve } = withFirmDefaults(filingKind("fl-llc")!, partner, { forClient: true });
  assert.equal(field(kind, "intake.portal.roles.signer"), undefined);
  assert.equal(field(kind, "intake.portal.flSignerName"), undefined);
  assert.match(note(kind, "Authorized representative:").text, /Pat Rivera/);
  const request: Record<string, unknown> = { formation: { name: { baseName: "Sun", designator: "LLC" } } };
  assert.deepEqual(resolve(request, {}), []);
  assert.equal((request.intake as any).portal.flSignerName, "Pat Rivera");
});

test("an answer the firm can't back isn't offered: no address, no firm; no signer, no firm", () => {
  const spec = STATE_ROLES.find((r) => r.state === "NY" && r.id === "serviceOfProcess")!;
  const noAddress = { name: "X", partner: {}, stateRoles: { NY: { roles: { serviceOfProcess: { offer: ["partner"] } } } } } as never;
  assert.deepEqual(offered(spec, noAddress).candidates, ["entity", "other", "service_company"]);
  const wrongState = { name: "X", partner: {}, stateRoles: { NY: { firm: { name: "X", address: { ...firmNY, state: "NJ" } }, roles: { serviceOfProcess: { offer: ["partner"] } } } } } as never;
  assert.deepEqual(offered(spec, wrongState).candidates, ["entity", "other", "service_company"]);
  const signer = STATE_ROLES.find((r) => r.state === "NJ" && r.id === "signer")!;
  const noSigner = { name: "X", partner: {}, stateRoles: { NJ: { roles: { signer: { offer: ["partner"], fixed: "partner" } } } } } as never;
  assert.deepEqual(offered(signer, noSigner), { candidates: ["client"], fixed: "client" });
});
