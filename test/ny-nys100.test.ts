import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { startFixtureServer } from "../fixtures/serve.js";
import { seededStore, wire, SECRET } from "./helpers.js";
import { RunExecutor } from "../src/orchestrator/run.js";
import { BrowserHarness } from "../src/browser/harness.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { ApprovalService } from "../src/approvals/service.js";
import { WebhookDispatcher } from "../src/webhooks/dispatcher.js";
import { InMemoryQueue } from "../src/orchestrator/queue.js";
import { InMemoryVault } from "../src/settings/vault.js";
import { FilingService } from "../src/orchestrator/service.js";
import { nyPayrollAdapter } from "../src/adapters/index.js";
import type { SiteAdapter } from "../src/adapters/types.js";
import type { MemoryStore } from "../src/store/memory.js";
import type { RunRecord } from "../src/store/types.js";
import { filingKind } from "../web/lib/intake/forms.js";
import { buildRequest, type Raw } from "../web/lib/intake/build.js";

/*
 * NYS-100 against the replica in fixtures/ny-nys100, laid out as the signed-in walk of 2026-11-24
 * describes the interview (docs/portal-maps/ny-nys100-unemployment.md): OPA spinners, styled Yes/No
 * buttons that reveal fields, Validate Address and its Address Verification window, the FEIN and
 * residency rules, and the A9 save that hung once. Requests are built by the web form's own builder.
 */

const kind = filingKind("ny-nys100")!;
const business = { street1: "100 Placeholder St", city: "Albany", state: "NY", zip: "12207" };
const addr = (p: string, a: { street1: string; city: string; state: string; zip: string }): Raw =>
  Object.fromEntries(Object.entries(a).map(([k, v]) => [`${p}.${k}`, v]));
const auth: Raw = Object.fromEntries(kind.authorizations.map((a) => [`auth.${a.id}`, "on"]));

/** What a firm's client sends through the NYS-100 form: an LLC, one US-resident member, all No branches. */
function form(over: Raw = {}): Raw {
  return {
    "payroll.ownershipType": "llc_member_managed",
    "payroll.legalName": "Blue Harbor Consulting LLC", "payroll.tradeName": "Blue Harbor", "payroll.fein": "86-1236789",
    ...addr("payroll.businessAddress", business), "payroll.county": "Albany", "intake.portal.nysMailingSame": "on",
    "payroll.stateAnswers.businessPhone": "518-555-0100", "payroll.stateAnswers.businessEmail": "office@blueharbor.example",
    "payroll.naics": "541611",
    "payroll.owners.0.stateAnswers_principalType": "person", "payroll.owners.0.title": "Member", "payroll.owners.0.name": "Avery Q Rivera",
    "payroll.owners.0.dateOfBirth": "1980-04-09", "payroll.owners.0.usResident": "yes", "payroll.owners.0.ssn": "123-45-6789",
    "payroll.owners.0.phone": "518-555-0101", "payroll.owners.0.email": "avery@blueharbor.example", "payroll.owners.0.percentOwnership": "100",
    ...addr("payroll.owners.0.address", { street1: "1 Old Rd", city: "Albany", state: "NY", zip: "12207" }), "payroll.owners.0.county": "Albany",
    "payroll.payingWages": "yes", "payroll.dateFirstOperations": "2026-01-05", "payroll.uiLiabilityQuarter": "Q1", "payroll.uiLiabilityYear": "2026",
    "payroll.stateAnswers.withholdsNyTax": "yes", "payroll.dateFirstWithholding": "2026-01-15", "payroll.coveredEmployees": "1",
    "payroll.stateAnswers.nonEmployeeWorkers": "no", "payroll.stateAnswers.acquiredBusiness": "no", "payroll.stateAnswers.legalEntityChanged": "no",
    "intake.portal.booksSameAsBusiness": "on", "intake.portal.chargesSameAsBusiness": "on", "payroll.stateAnswers.mailToAgent": "no",
    ...addr("payroll.workLocations.0.address", business), "payroll.workLocations.0.employees": "1",
    "payroll.workLocations.0.activity": "Scientific/Professional & Technical Services",
    "payroll.workLocations.0.activityDetails.establishmentType": "Consulting office",
    "payroll.workLocations.0.activityDetails.productOrService": "Management consulting",
    "payroll.workLocations.0.activityDetails.percentOfRevenue": "100",
    "payroll.signer.name": "Avery Q Rivera", "payroll.signer.title": "Managing Member", "payroll.signer.email": "avery@blueharbor.example",
    "payroll.stateAnswers.submitterPhone": "518-555-0101",
    "contact.firstName": "Pat", "contact.lastName": "Lee", "contact.email": "pat@acme.example", "contact.phone": "212-555-0100",
    ...auth,
    ...over,
  };
}

function request(raw: Raw, extra: Record<string, unknown> = {}): Record<string, unknown> {
  const { request, issues } = buildRequest(kind, raw, {
    tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `nys100-${Math.random().toString(36).slice(2)}`,
    submittedBy: "pat@acme.example", source: "firm_portal",
  });
  expect(issues).toEqual([]);
  return { ...request, ...extra };
}

let fx: Awaited<ReturnType<typeof startFixtureServer>>;
let harness: BrowserHarness;
let store: MemoryStore;
let artifacts: FsArtifactStore;
let executor: RunExecutor;
const entry = (page = "dashboard.html") => { process.env.NY_PAYROLL_URL = `${fx.url}/ny-nys100/${page}`; };

beforeAll(async () => {
  fx = await startFixtureServer();
  harness = new BrowserHarness({ chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles" });
  store = await seededStore();
  artifacts = new FsArtifactStore("var/test-artifacts");
  executor = new RunExecutor({ store, artifacts, harness, drift: new DriftReviewService(store), vault: { getCredential: async () => null }, firstObservationPolicy: "accept" });
});
afterAll(async () => { await harness.close(); await fx.close(); delete process.env.NY_PAYROLL_URL; });

async function domOf(run: RunRecord, screenKey: string, note = "filled"): Promise<string> {
  const step = [...run.steps].reverse().find((s) => s.screenKey === screenKey && s.note === note);
  if (!step) throw new Error(`no "${note}" step for ${screenKey}`);
  for (const id of step.artifactIds) {
    const a = await artifacts.get(id);
    if (a?.meta.kind === "dom_snapshot") return a.body.toString("utf8");
  }
  throw new Error(`no DOM snapshot for ${screenKey}`);
}
/** What the replica saved, screen by screen (the SSN only masked), as the last filled screen carries it. */
async function portalLog(run: RunRecord, screenKey = "ny.nys100.ui_submitter", note = "filled") {
  const html = await domOf(run, screenKey, note);
  const m = /<script type="application\/json" id="fixture-log">([\s\S]*?)<\/script>/.exec(html);
  if (!m) throw new Error("no fixture log on the page");
  return JSON.parse(m[1]!.replace(/\\u003c/g, "<")) as {
    visited: string[]; values: Record<string, Record<string, string>>; hangs: number; attested: boolean;
    members: { name: string; ssn: string; dob: string; resident: string; own: string; tel: string; edited?: boolean; values: Record<string, string> }[];
    addressChoices: { screen: string; block: string; choice: string }[];
  };
}

const notes = (run: RunRecord) => run.steps.filter((s) => s.note && s.note !== "filled").map((s) => `${s.screenKey}: ${s.note}`);

async function dryRun(raw: Record<string, unknown>): Promise<RunRecord> {
  const w = wire(store, { executor });
  const { filing, approvalLink, issues } = await w.service.createFiling(raw);
  expect(issues.filter((i) => i.severity === "error")).toEqual([]);
  await w.service.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", {});
  await w.service.runFiling(filing.id);
  const f = (await store.getFiling(filing.id))!;
  return (await store.getRun(f.currentRunId!))!;
}

const SCREEN_ORDER = [
  "ny.nys100.select_business", "ny.nys100.bp_introduction", "ny.nys100.bp_entity_type", "ny.nys100.bp_identification",
  "ny.nys100.bp_addresses", "ny.nys100.bp_physical_address", "ny.nys100.bp_additional_locations", "ny.nys100.bp_mailing_addresses",
  "ny.nys100.bp_contact", "ny.nys100.bp_industry", "ny.nys100.bp_owner_intro", "ny.nys100.bp_members",
  "ny.nys100.ui_introduction", "ny.nys100.ui_identification", "ny.nys100.ui_liability", "ny.nys100.ui_transfers",
  "ny.nys100.ui_legal_entity_change", "ny.nys100.ui_member_check", "ny.nys100.ui_address_contact", "ny.nys100.ui_books_records",
  "ny.nys100.ui_potential_charges", "ny.nys100.ui_agent", "ny.nys100.ui_physical_locations", "ny.nys100.ui_location_details",
  "ny.nys100.ui_submitter",
];

describe("NYS-100 on the walked screens (dry run)", () => {
  it("fills the Business Profile and the Application in walked order and stops before the attestation", async () => {
    entry();
    const run = await dryRun(request(form()));
    expect({ status: run.status, error: run.error }, notes(run).join("\n")).toEqual({ status: "completed", error: expect.stringContaining("I attest to the above") });
    expect(run.steps.filter((s) => s.note === "filled").map((s) => s.screenKey)).toEqual(SCREEN_ORDER);

    const log = await portalLog(run);
    expect(log.visited).toEqual(["P1", "P2", "P3", "P4", "P5", "P6", "P7", "P8", "P9", "P10", "P11", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10", "A11", "A12", "A13"]);
    const v = log.values;
    expect(v.P0).toEqual({ business: "new" });
    expect(v.P2).toMatchObject({ ent: "Limited Liability Company", "llc-sub": "Member Managed LLC" });
    expect(v.P3).toMatchObject({ legal: "Blue Harbor Consulting LLC", dba: "Blue Harbor", fein: "86-1236789", nofein: "" });
    // The address the client approved, not USPS's rewrite; New York shows County*.
    expect(v.P5).toMatchObject({ "phys-l1": "100 Placeholder St", "phys-city": "Albany", "phys-state": "NY", "phys-zip": "12207", "phys-county": "Albany", "phys-mailing": "on" });
    expect(log.addressChoices.map((c) => `${c.screen}:${c.choice}`)).toEqual(["physical:provided", "members:provided", "books:provided", "charges:provided"]);
    expect(v.P8).toMatchObject({ tel: "518-555-0100", email: "office@blueharbor.example" });
    expect(v.P9).toMatchObject({ naics: "541611", secondary: "No" });
    // The member record: name in parts, date of birth from three lists, the SSN in three boxes (kept masked).
    expect(log.members).toHaveLength(1);
    expect(log.members[0]).toMatchObject({ name: "Avery Q. Rivera", ssn: "***-**-6789", dob: "1980-04-09", resident: "Yes", own: "100", tel: "518-555-0101" });
    expect(log.members[0]!.values).toMatchObject({ "m-type": "Person", "m-title": "Member", "mem-l1": "1 Old Rd", "mem-county": "Albany" });
    expect(v.A3).toMatchObject({ paid300: "Yes", began: "01/05/2026", quarter: "January - March", year: "2026", withhold: "Yes", firstpay: "01/15/2026", employees: "1", nonemp: "No" });
    expect(v.A3!.services).toBeUndefined(); // No: the services box never opened
    expect(v.A4).toMatchObject({ acquired: "No" });
    expect(v.A5).toMatchObject({ changed: "No" });
    expect(v.A7).toMatchObject({ "pick-mail": "1", "pick-email": "1", "pick-tel": "1" });
    expect(v.A8).toMatchObject({ "books-pick": "100 Placeholder St, Albany NY 12207", "books-l1": "100 Placeholder St", "books-tel": "518-555-0100" });
    expect(v.A9).toMatchObject({ "charges-pick": "100 Placeholder St, Albany NY 12207", "charges-tel": "518-555-0100" });
    expect(v.A10).toMatchObject({ toagent: "No" });
    expect(v.A12).toMatchObject({ "loc-emp": "1", activity: "Scientific/Professional & Technical Services", estab: "Consulting office", product: "Management consulting", revpct: "100" });
    // A9's first save hung and dropped back; the adapter clicked once more.
    expect(log.hangs).toBe(1);
    expect(run.steps.some((s) => s.screenKey === "ny.nys100.ui_potential_charges" && /clicking once more/.test(s.note ?? ""))).toBe(true);

    // A13 is filled, and the attestation is left alone: never ticked on a dry run.
    const a13 = await domOf(run, "ny.nys100.ui_submitter");
    expect(a13).toMatch(/id="s-first"[^>]*value="Avery"/);
    expect(a13).toMatch(/id="s-mi"[^>]*value="Q"/);
    expect(a13).toMatch(/id="s-last"[^>]*value="Rivera"/);
    expect(a13).toMatch(/id="s-pos"[^>]*value="Managing Member"/);
    expect(a13).toMatch(/id="s-tel"[^>]*value="518-555-0101"/);
    expect(a13).not.toMatch(/id="attest"[^>]*checked/);
    expect(log.attested).toBe(false);

    // The SSN never lands in an artifact.
    for (const s of run.steps) for (const id of s.artifactIds) {
      const a = await artifacts.get(id);
      if (a?.meta.kind === "dom_snapshot") expect(a.body.toString("utf8")).not.toMatch(/123-?45-?6789/);
    }
  }, 240_000);

  it("answers the Yes branches the walk recorded and waits for what each reveals", async () => {
    entry();
    const raw = form({
      // A3: no withholding (its date stays closed), non-employee workers (Describe services opens).
      "payroll.stateAnswers.withholdsNyTax": "no", "payroll.dateFirstWithholding": "",
      "payroll.stateAnswers.nonEmployeeWorkers": "yes", "payroll.stateAnswers.nonEmployeeServices": "Bookkeeping by an outside contractor",
      // A4: an acquired employer, with its New York address and county.
      "payroll.stateAnswers.acquiredBusiness": "yes", "payroll.stateAnswers.acquiredAllOrPart": "All", "payroll.stateAnswers.acquiredDate": "2025-12-01",
      "payroll.stateAnswers.acquiredLegalName": "Old Harbor Partners LLC", ...addr("payroll.stateAnswers.acquiredAddress", { street1: "9 Dock St", city: "Albany", state: "NY", zip: "12210" }),
      "payroll.stateAnswers.acquiredCounty": "Albany", "payroll.stateAnswers.acquiredRegistrationNumber": "1234567", "payroll.stateAnswers.acquiredFein": "45-6789012",
      // A5: the legal entity changed.
      "payroll.stateAnswers.legalEntityChanged": "yes", "payroll.stateAnswers.legalEntityChangeDate": "2025-11-01",
      "payroll.stateAnswers.previousRegistrationNumber": "7654321", "payroll.stateAnswers.previousFein": "45-1112223",
      // A8: books kept elsewhere ("Other"); A10: all mail to an agent.
      "intake.portal.booksSameAsBusiness": "", ...addr("payroll.booksRecordsAddress", { street1: "5 Ledger Ln", city: "Troy", state: "NY", zip: "12180" }),
      "payroll.stateAnswers.booksPhone": "518-555-0177",
      "payroll.stateAnswers.mailToAgent": "yes", "payroll.stateAnswers.agentAttn": "Keystone Filings",
      ...addr("payroll.stateAnswers.agentAddress", { street1: "1 Main St", city: "Brooklyn", state: "NY", zip: "11201" }),
      // P11: a member who is not a US resident: no SSN, an address outside the US.
      "payroll.owners.0.usResident": "no", "payroll.owners.0.ssn": "", "payroll.owners.0.county": "",
      ...addr("payroll.owners.0.address", { street1: "", city: "", state: "", zip: "" }),
      "payroll.owners.0.foreignAddress.street1": "200 King St W", "payroll.owners.0.foreignAddress.city": "Toronto",
      "payroll.owners.0.foreignAddress.region": "Ontario", "payroll.owners.0.foreignAddress.postalCode": "M5V 0A1", "payroll.owners.0.foreignAddress.country": "Canada",
      // A12: Manufacturing asks its own three questions.
      "payroll.workLocations.0.activity": "Manufacturing", "payroll.workLocations.0.activityDetails.productsProduced": "Ship fittings",
      "payroll.workLocations.0.activityDetails.rawMaterials": "Bronze", "payroll.workLocations.0.activityDetails.percentOfSalesValue": "80",
    });
    const run = await dryRun(request(raw));
    expect({ status: run.status, error: run.error }, notes(run).join("\n")).toEqual({ status: "completed", error: expect.stringContaining("I attest to the above") });
    const { values: v, members, addressChoices } = await portalLog(run);
    expect(v.A3).toMatchObject({ withhold: "No", nonemp: "Yes", services: "Bookkeeping by an outside contractor" });
    expect(v.A3!.firstpay).toBeUndefined();
    expect(v.A4).toMatchObject({ acquired: "Yes", allpart: "All", "acq-date": "12/01/2025", "acq-name": "Old Harbor Partners LLC", "acq-l1": "9 Dock St", "acq-zip": "12210", "acq-county": "Albany", "acq-reg": "12-34567", "acq-fein": "45-6789012" });
    expect(v.A5).toMatchObject({ changed: "Yes", "chg-date": "11/01/2025", "prev-reg": "7654321", "prev-fein": "45-1112223" });
    expect(v.A8).toMatchObject({ "books-pick": "Other", "books-l1": "5 Ledger Ln", "books-city": "Troy", "books-zip": "12180", "books-tel": "518-555-0177" });
    expect(v.A10).toMatchObject({ toagent: "Yes", "agent-attn": "Keystone Filings", "agent-l1": "1 Main St", "agent-city": "Brooklyn" });
    expect(members[0]).toMatchObject({ resident: "No", ssn: "" });
    expect(members[0]!.values).toMatchObject({ "mem-l1": "200 King St W", "mem-city": "Toronto", "mem-country": "Canada", "mem-state": "ON", "mem-postal": "M5V 0A1" });
    expect(v.A12).toMatchObject({ activity: "Manufacturing", products: "Ship fittings", raw: "Bronze", salespct: "80" });
    expect(addressChoices.map((c) => c.screen)).toEqual(["physical", "members", "transfers", "books", "charges", "agent"]);
    expect(addressChoices.every((c) => c.choice === "provided")).toBe(true);
  }, 240_000);

  it("stops before typing anything when the filing needs a screen the walk did not see", async () => {
    entry();
    const nonResidentInUs = request(form());
    const owner = ((nonResidentInUs.payroll as Record<string, unknown>).owners as Record<string, unknown>[])[0]!;
    owner.usResident = false; delete owner.ssn;
    const cases: [Record<string, unknown>, RegExp][] = [
      [request(form({ "payroll.ownershipType": "corporation_c" })), /only the LLC member path was walked; the Corporation owner screens are not mapped/],
      [request(form({ "intake.portal.nysMailingSame": "", ...addr("payroll.mailingAddress", { street1: "PO Box 12", city: "Albany", state: "NY", zip: "12201" }) })), /mailing address apart from the physical address/],
      [request(form({ "payroll.fein": "99-9999999" })), /cannot have all of the same numbers/],
      [request(form({ "payroll.stateAnswers.secondaryNaics": "541612" })), /secondary NAICS code/],
      [nonResidentInUs, /not a US resident needs a residential address outside the US/],
    ];
    for (const [req, why] of cases) {
      const run = await dryRun(req);
      expect(run.status).toBe("failed");
      expect(run.error).toMatch(why);
      expect(run.steps.filter((s) => s.note === "filled")).toHaveLength(0);
    }
  }, 240_000);

  it("stops at the login wall when the subscriber's NY.gov session is signed out", async () => {
    entry("login.html");
    const run = await dryRun(request(form()));
    expect(run.status).toBe("failed");
    expect(run.error).toMatch(/NY\.gov business login is not signed in for this subscriber \(browser profile nygov:keystone\)/);
  }, 120_000);

  it("reuses the business's own Business Profile and updates its member instead of adding a second", async () => {
    entry("dashboard.html?profile=existing");
    const run = await dryRun(request(form()));
    expect({ status: run.status, error: run.error }, notes(run).join("\n")).toEqual({ status: "completed", error: expect.stringContaining("I attest to the above") });
    const log = await portalLog(run);
    expect(log.values.P0).toEqual({ business: "mine" });
    expect(log.values.P2).toMatchObject({ ent: "Limited Liability Company", "llc-sub": "Member Managed LLC" });
    expect(log.members).toHaveLength(1);
    expect(log.members[0]).toMatchObject({ edited: true, name: "Avery Q. Rivera", ssn: "***-**-6789" });
    expect(notes(run)).toEqual(expect.arrayContaining([expect.stringMatching(/reusing the Business Profile "Blue Harbor Consulting LLC, Limited Liability Company, XX-XXX6789"/)]));
  }, 240_000);
});

describe("NYS-100 attestation (live path, with the adapter forced complete)", () => {
  // The adapter is complete:false, so a real run is refused before it starts; this copy lets the live
  // branch run against the replica to show the attestation is ticked only with the submitter's grant.
  const live: SiteAdapter = { ...nyPayrollAdapter, complete: true, async confirmSubmission() { return null; } };
  const service = () => {
    const vault = new InMemoryVault();
    vault.set("keystone/NYGOV", { username: "keystone-ny", password: "pw" }); // the subscriber's own, tenant-scoped login
    return new FilingService({
      store, approvals: new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 168 }),
      webhooks: new WebhookDispatcher(store, async () => ({ status: 200 })), queue: new InMemoryQueue(), vault,
      drift: new DriftReviewService(store), executor, dryRunDefault: false, adapterFor: () => live,
    });
  };
  async function liveRun(req: Record<string, unknown>) {
    const s = service();
    const { filing, approvalLink } = await s.createFiling({ ...req, dryRun: false });
    await s.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", {});
    await s.runFiling(filing.id);
    const f = (await store.getFiling(filing.id))!;
    expect(f.currentRunId, `${f.status}: ${f.lastError}`).toBeTruthy();
    return { run: (await store.getRun(f.currentRunId!))!, filingId: f.id };
  }

  it("the real adapter only dry-runs", async () => {
    expect(nyPayrollAdapter.complete).toBe(false);
    expect(nyPayrollAdapter.confirmSubmission).toBeUndefined();
    expect(nyPayrollAdapter.steps.some((s) => s.reviewScreen)).toBe(false); // Ready to Submit is behind the attestation
  });

  it("without the submitter's own attestation on file, nothing is typed", async () => {
    entry();
    const req = request(form());
    (req.intake as { portal: Record<string, unknown> }).portal.authorizations = [];
    const { run, filingId } = await liveRun(req);
    expect(run.status).toBe("failed");
    expect(run.error).toMatch(/submitter's own attestation \(nys100-attest\) is not on file/);
    expect(run.steps.filter((s) => s.note === "filled")).toHaveLength(0);
    expect([...store.intents.values()].filter((i) => i.filingId === filingId)).toHaveLength(0);
  }, 120_000);

  it("with it, ticks I attest to the above and stops at Ready to Submit, which is not mapped", async () => {
    entry();
    const { run, filingId } = await liveRun(request(form()));
    expect(run.status).toBe("failed");
    expect(run.error).toMatch(/Ready to Submit is not mapped/);
    const ready = await portalLog(run, "ny.nys100.ready_to_submit", "NYS-100 Ready to Submit reached: recorded for the walk that maps it");
    expect(ready.attested).toBe(true);
    expect(ready.values.A13).toMatchObject({ "s-first": "Avery", "s-last": "Rivera", attest: "on" });
    // Nothing was submitted: no irreversible click was ever started.
    expect([...store.intents.values()].filter((i) => i.filingId === filingId)).toHaveLength(0);
  }, 240_000);
});
