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
import { njPayrollAdapter } from "../src/adapters/index.js";
import type { SiteAdapter } from "../src/adapters/types.js";
import type { MemoryStore } from "../src/store/memory.js";
import type { RunRecord } from "../src/store/types.js";
import { filingKind } from "../web/lib/intake/forms.js";
import { buildRequest, type Raw } from "../web/lib/intake/build.js";
import { NJ_TAX_QUESTIONS } from "../src/adapters/nj-payroll/intents.js";

/*
 * NJ-REG against the replica in fixtures/nj-reg, laid out as the walk of 2026-11-24 describes the
 * wizard (docs/portal-maps/nj-reg.md): the IMPORTANT NOTICE modal, the Entity ID + EIN gate, the
 * record's read-only name, County and Municipality lists filtered by the address, the owner dialogs,
 * keyword autocompletes, Yes answers that open more questions, and the Review page's attestations.
 * Requests are built by the web form's own builder.
 */

const kind = filingKind("nj-reg")!;
const addr = (p: string, a: { street1: string; city: string; state: string; zip: string }): Raw =>
  Object.fromEntries(Object.entries(a).map(([k, v]) => [`${p}.${k}`, v]));
const auth: Raw = Object.fromEntries(kind.authorizations.map((a) => [`auth.${a.id}`, "on"]));
const office = { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" };

function form(over: Raw = {}): Raw {
  return {
    "payroll.legalName": "Blue Harbor Consulting LLC", "payroll.entity.njBusinessNumber": "0450123456", "payroll.fein": "86-1236789",
    "payroll.beginDate": "2026-01-15", "payroll.stateAnswers.yearRound": "yes", "payroll.tradeName": "Blue Harbor",
    ...addr("payroll.businessAddress", office), "payroll.county": "Hudson", "payroll.stateAnswers.municipality": "Hoboken",
    "payroll.stateAnswers.mailingAttention": "Sam Rivera",
    "payroll.ownershipType": "Ltd. Liability Co. (1065 Filer)", "payroll.entity.fiscalMonth": "12",
    "payroll.stateAnswers.subsidiary": "no", "payroll.stateAnswers.sCorpStatus": "neither",
    "payroll.owners.0.name": "Sam J Rivera", "payroll.owners.0.title": "Managing Member", "payroll.owners.0.ssn": "123-45-6789",
    "payroll.owners.0.percentOwnership": "60", ...addr("payroll.owners.0.address", { street1: "5 Park Ave", city: "Hoboken", state: "NJ", zip: "07030-1234" }),
    "payroll.njBusinessCode": "2754", "payroll.businessActivity": "Management consulting",
    "payroll.stateAnswers.typeOfActivity": "Consulting services to small businesses", "payroll.naics": "541611", "payroll.coveredEmployees": "2",
    "payroll.stateAnswers.acquiredPredecessor": "no", "payroll.stateAnswers.njResidentsOutsideNj": "no", "payroll.stateAnswers.pensionPayer": "no",
    "payroll.stateAnswers.multipleFacilities": "no", "payroll.payingWages": "yes", "payroll.firstWageDate": "2026-02-01",
    "payroll.stateAnswers.firstNjHireDate": "2026-01-20", "payroll.stateAnswers.payrollOver1000Date": "2026-02-15",
    "payroll.stateAnswers.agricultural": "no", "payroll.stateAnswers.household": "no", "payroll.stateAnswers.futa": "yes",
    "payroll.stateAnswers.futaYear": "2026", "payroll.stateAnswers.uiExempt": "no", "payroll.stateAnswers.peo": "no",
    ...Object.fromEntries(NJ_TAX_QUESTIONS.map(([k]) => [`payroll.stateAnswers.tax.${k}`, k === "salesTax" ? "yes" : "no"])),
    "payroll.stateAnswers.tax.firstSaleDate": "2026-03-01", "payroll.stateAnswers.tax.multipleSalesLocations": "no",
    "payroll.stateAnswers.tax.otherEligibility": "Unemployment and Disability Taxes",
    "payroll.stateAnswers.contactTitle": "Managing Member", "payroll.stateAnswers.eveningPhone": "201-555-0199",
    "payroll.signer.name": "Sam J Rivera", "payroll.signer.title": "Managing Member",
    "contact.firstName": "Sam", "contact.lastName": "Rivera", "contact.email": "sam@blueharbor.example", "contact.phone": "201-555-0100",
    ...auth,
    ...over,
  };
}

function request(raw: Raw): Record<string, unknown> {
  const { request, issues } = buildRequest(kind, raw, {
    tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `njreg-${Math.random().toString(36).slice(2)}`,
    submittedBy: "sam@blueharbor.example", source: "client_link",
  });
  expect(issues).toEqual([]);
  return request;
}

let fx: Awaited<ReturnType<typeof startFixtureServer>>;
let harness: BrowserHarness;
let store: MemoryStore;
let artifacts: FsArtifactStore;
let executor: RunExecutor;

beforeAll(async () => {
  fx = await startFixtureServer();
  process.env.NJ_PAYROLL_URL = `${fx.url}/nj-reg/index.html`;
  harness = new BrowserHarness({ chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles" });
  store = await seededStore();
  artifacts = new FsArtifactStore("var/test-artifacts");
  executor = new RunExecutor({ store, artifacts, harness, drift: new DriftReviewService(store), vault: { getCredential: async () => null }, firstObservationPolicy: "accept" });
});
afterAll(async () => { await harness.close(); await fx.close(); delete process.env.NJ_PAYROLL_URL; });

async function domOf(run: RunRecord, screenKey: string, note = "filled"): Promise<string> {
  const step = [...run.steps].reverse().find((s) => s.screenKey === screenKey && s.note === note);
  if (!step) throw new Error(`no "${note}" step for ${screenKey}`);
  for (const id of step.artifactIds) {
    const a = await artifacts.get(id);
    if (a?.meta.kind === "dom_snapshot") return a.body.toString("utf8");
  }
  throw new Error(`no DOM snapshot for ${screenKey}`);
}
async function portalLog(html: string) {
  const m = /<script type="application\/json" id="fixture-log">([\s\S]*?)<\/script>/.exec(html);
  if (!m) throw new Error("no fixture log on the page");
  return JSON.parse(m[1]!.replace(/\\u003c/g, "<")) as {
    visited: string[]; values: Record<string, Record<string, string>>;
    owners: { name: string; title: string; ssn: string; percent: string; address: string }[];
    businessOwners: { name: string; ein: string; percent: string; address: string }[];
    submitted: { employment: boolean; tax: boolean; perjury: boolean; gov2go: boolean; name: string } | null;
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

const SCREEN_ORDER = ["nj.reg.welcome", "nj.reg.start", "nj.reg.entity.identification", "nj.reg.business_data", "nj.reg.business_address",
  "nj.reg.ownership", "nj.reg.owners", "nj.reg.classification", "nj.reg.employment", "nj.reg.taxable_activities", "nj.reg.contact", "nj.reg.review"];

describe("NJ-REG on the walked screens (dry run)", () => {
  it("fills every screen in walked order and stops on Review before Complete Registration, attesting nothing", async () => {
    const raw = form({
      // Screen 4: a separate mailing address opens its own block.
      "intake.portal.njMailingDifferent": "on", ...addr("payroll.mailingAddress", { street1: "PO Box 77", city: "Hoboken", state: "NJ", zip: "07031" }),
      // Screen 6: an individual owner and a business owner.
      "payroll.stateAnswers.businessOwners.0.name": "Harbor Holdings Inc", "payroll.stateAnswers.businessOwners.0.ein": "45-6789012",
      "payroll.stateAnswers.businessOwners.0.percentOwnership": "40", ...addr("payroll.stateAnswers.businessOwners.0.address", { street1: "1 Hudson Pl", city: "Hoboken", state: "NJ", zip: "07030" }),
    });
    const run = await dryRun(request(raw));
    expect({ status: run.status, error: run.error }, notes(run).join("\n")).toEqual({ status: "completed", error: expect.stringContaining('"Complete Registration"') });
    expect(run.steps.filter((s) => s.note === "filled").map((s) => s.screenKey)).toEqual(SCREEN_ORDER);

    const review = await domOf(run, "nj.reg.review");
    const log = await portalLog(review);
    expect(log.visited).toEqual(["first", "details", "data", "address", "ownership", "owners", "classification", "tax", "activities", "contact", "review"]);
    const v = log.values;
    expect(v.first).toEqual({ regType: "1" });
    expect(v.details).toEqual({ EntityId: "0450123456", Ein: "861236789" });
    expect(v.data).toMatchObject({ YearRound: "Y", TradeName: "BLUE HARBOR" });
    expect(v.address).toMatchObject({ Street1: "22 River Rd", Street2: "", State: "NJ", City: "Hoboken", County: "Hudson", Municipality: "0905", Zip: "07030", AttentionTo: "Sam Rivera", MailingDifferent: "on", MStreet1: "PO Box 77", MCity: "Hoboken", MState: "NJ", MZip: "07031" });
    expect(v.ownership).toMatchObject({ OwnershipType: "Ltd. Liability Co. (1065 Filer)", FiscalMonth: "December", Subsidiary: "N", SCorp: "N" });
    expect(log.owners).toEqual([{ name: "Sam J Rivera", title: "Managing Member", ssn: "***-**-6789", percent: "60", address: "5 Park Ave, Hoboken, NJ 07030-1234" }]);
    expect(log.businessOwners).toEqual([{ name: "Harbor Holdings Inc", ein: "456789012", percent: "40", address: "1 Hudson Pl, Hoboken, NJ 07030" }]);
    expect(v.classification).toMatchObject({ BusinessCode: "2754", "BusinessCode-picked": "2754", PrincipalProduct: "Management consulting", TypeOfActivity: "Consulting services to small businesses", Naics: "541611", "Naics-picked": "541611", Workers: "2" });
    // Paying wages opened the dates and the questions under it; FUTA = Yes opened its year.
    expect(v.tax).toMatchObject({ Acquired: "N", OutsideNj: "N", Pension: "N", Facilities: "N", PayingWages: "Y", FirstWage: "02/01/2026", FirstHire: "01/20/2026", Over1000: "02/15/2026", Agricultural: "N", Household: "N", Futa: "Y", FutaYear: "2026", Exempt: "N", Peo: "N" });
    expect(v.tax!.Household1000).toBeUndefined();
    // Sales tax = Yes opened the first-sale date; the other 16 are No; one other state tax ticked.
    expect(v.activities).toMatchObject({ salesTax: "Y", FirstSale: "03/01/2026", MultiSales: "N", tobacco: "N", millvilleDistrict: "N", Other11: "on", Other0: "" });
    expect(v.contact).toMatchObject({ ContactName: "Sam Rivera", ContactTitle: "Managing Member", Email: "sam@blueharbor.example", ConfirmEmail: "sam@blueharbor.example", DayPhone: "201-555-0100", EveningPhone: "201-555-0199" });
    // Review: Gov2Go unticked (the site ticks it), and nothing attested or signed on a dry run.
    expect(review).toContain("boxes: employment=false tax=false perjury=false gov2go=false name=blank");
    expect(log.submitted).toBeNull();
    for (const s of run.steps) for (const id of s.artifactIds) {
      const a = await artifacts.get(id);
      if (a?.meta.kind === "dom_snapshot") expect(a.body.toString("utf8")).not.toMatch(/123-?45-?6789/);
    }
  }, 240_000);

  it("previews the state's Review page for the client's approval (decision 7)", async () => {
    await store.putTenant({ ...(await store.getTenant("keystone"))!, approvalPreview: "review_page" });
    try {
      const w = wire(store, { executor });
      const { filing } = await w.service.createFiling({ ...request(form({ "payroll.ownershipType": "Ltd. Liability Co. - Single Member" })), dryRun: false });
      expect(filing.status).toBe("previewing");
      await w.service.runFiling(filing.id, { dryRun: true });
      const f = (await store.getFiling(filing.id))!;
      expect(f.status).toBe("awaiting_approval");
      const approval = (await store.getApproval(f.currentApprovalId!))!;
      expect(approval.review).toMatchObject({ screenKey: "nj.reg.review", site: "NJ" });
      // Single Member: the S corporation and QSSS choices are disabled and Neither stands.
      const run = (await store.getRun(f.currentRunId!))!;
      expect((await portalLog(await domOf(run, "nj.reg.review"))).values.ownership).toMatchObject({ OwnershipType: "Ltd. Liability Co. - Single Member", SCorp: "N" });
    } finally {
      await store.putTenant({ ...(await store.getTenant("keystone"))!, approvalPreview: "payload" });
    }
  }, 240_000);

  it("stops before typing anything on a branch the walk did not open, and on the portal's own refusal", async () => {
    const cases: [Raw, RegExp][] = [
      [{ "payroll.stateAnswers.yearRound": "no", "payroll.stateAnswers.season": "May to September" }, /a seasonal business \(year round = No\) was not walked/],
      [{ "payroll.stateAnswers.sCorpStatus": "s_corp", "payroll.stateAnswers.sCorpApprovalDate": "2026-01-02" }, /S corporation \/ QSSS election block was not walked/],
      [{ "payroll.stateAnswers.acquiredPredecessor": "yes", "payroll.stateAnswers.predecessorDetails": "Old Harbor LLC, 0400000001, 2025-12-01" }, /an acquired predecessor \(Yes\) was not walked/],
      [{ "payroll.stateAnswers.tax.tobacco": "yes", "payroll.stateAnswers.tax.tobaccoDetails": "Retailer; buys from a licensed wholesaler" }, /cigarette and tobacco branch \(Yes\) was not walked/],
      [{ "payroll.stateAnswers.tax.otherEligibility": "Hotel Occupancy Fee" }, /not on the portal's list of other state taxes: Hotel Occupancy Fee/],
    ];
    for (const [over, why] of cases) {
      const run = await dryRun(request(form(over)));
      expect(run.status).toBe("failed");
      expect(run.error).toMatch(why);
      expect(run.steps.filter((s) => s.note === "filled")).toHaveLength(0);
    }
    // The portal's refusal of an Entity ID / EIN pair is reported in its words, on that screen.
    const run = await dryRun(request(form({ "payroll.fein": "86-1230000" })));
    expect(run.status).toBe("failed");
    expect(run.error).toMatch(/nj\.reg\.entity\.identification: NJ-REG Business Identification: the portal did not move on: The Entity ID and EIN entered do not match our records\./);
  }, 240_000);
});

describe("NJ-REG attestations (live path, with the adapter forced complete)", () => {
  // The real adapter is complete:false (the page after Complete Registration was never seen); this copy
  // reads the replica's confirmation so the live branch can show what is ticked, and only with the grants.
  const live: SiteAdapter = {
    ...njPayrollAdapter, complete: true,
    async confirmSubmission(ctx) {
      const m = /Confirmation Number: (\S+)/.exec(await ctx.page.locator("body").innerText());
      // The detail carries what the replica recorded at Complete Registration, for the test to read.
      return m ? { reference: m[1]!, detail: (await ctx.page.locator("#fixture-log").textContent()) ?? "" } : null;
    },
  };
  async function liveRun(req: Record<string, unknown>) {
    const s = new FilingService({
      store, approvals: new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 168 }),
      webhooks: new WebhookDispatcher(store, async () => ({ status: 200 })), queue: new InMemoryQueue(), vault: new InMemoryVault(),
      drift: new DriftReviewService(store), executor, dryRunDefault: false, adapterFor: () => live,
    });
    const { filing, approvalLink } = await s.createFiling({ ...req, dryRun: false });
    await s.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", {});
    await s.runFiling(filing.id);
    const f = (await store.getFiling(filing.id))!;
    expect(f.currentRunId, `${f.status}: ${f.lastError}`).toBeTruthy();
    return { filing: f, run: (await store.getRun(f.currentRunId!))! };
  }

  it("the real adapter only dry-runs, and its Review is the review screen", () => {
    expect(njPayrollAdapter.complete).toBe(false);
    expect(njPayrollAdapter.confirmSubmission).toBeUndefined();
    expect(njPayrollAdapter.steps.filter((s) => s.reviewScreen).map((s) => s.screen.screenKey)).toEqual(["nj.reg.review"]);
    expect(njPayrollAdapter.credentialKey({ filing: {} as never, client: {} as never, tenant: {} as never })).toBeNull();
  });

  it("refuses to start without the client's own attestations", async () => {
    const req = request(form());
    (req.intake as { portal: Record<string, unknown> }).portal.authorizations = [];
    const { filing, run } = await liveRun(req);
    expect(run.status).toBe("failed");
    expect(run.error).toMatch(/client's own attestations \(njreg-employment, njreg-tax, njreg-perjury\) are not on file/);
    expect(run.steps.filter((s) => s.note === "filled")).toHaveLength(0);
    expect([...store.intents.values()].filter((i) => i.filingId === filing.id)).toHaveLength(0);
  }, 120_000);

  it("with them, ticks the confirmations and the declaration, types the representative's name, and keeps Gov2Go off", async () => {
    const { filing, run } = await liveRun(request(form()));
    expect({ status: run.status, error: run.error }, notes(run).join("\n")).toEqual({ status: "submitted", error: undefined });
    const intents = [...store.intents.values()].filter((i) => i.filingId === filing.id && i.outcome !== "dry_run_stop");
    expect(intents).toHaveLength(1);
    expect(intents[0]).toMatchObject({ outcome: "submitted", evidence: { reference: "NJREG-000123" } });
    const done = await portalLog(`<script type="application/json" id="fixture-log">${intents[0]!.evidence!.detail}</script>`);
    expect(done.submitted).toEqual({ employment: true, tax: true, perjury: true, gov2go: false, name: "Sam J Rivera" });
  }, 240_000);
});
