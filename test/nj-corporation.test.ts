import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { startFixtureServer } from "../fixtures/serve.js";
import { seededStore, wire } from "./helpers.js";
import { RunExecutor } from "../src/orchestrator/run.js";
import { BrowserHarness } from "../src/browser/harness.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { FilingRequest } from "../src/domain/filing.js";
import { hasErrors, validateFiling } from "../src/domain/validation.js";
import { checkCompleteness } from "../src/domain/completeness.js";
import { expectedFees } from "../src/fees/table.js";
import { adapterFor, ADAPTERS } from "../src/adapters/index.js";
import { applyPolicies } from "../src/settings/policies.js";
import { ClientCompanySettings, TenantSettings } from "../src/settings/schema.js";
import type { MemoryStore } from "../src/store/memory.js";
import type { RunRecord } from "../src/store/types.js";

/*
 * NJ Domestic For-Profit Corporation (DP) on NJ Business Formation, against the wizard replica in
 * fixtures/nj-formation, laid out as docs/portal-maps/nj-business-formation.md (2026-11-24) maps
 * the corporation's screens: its designators, Stock on Business Data, Board of Directors and
 * Incorporators. Signatures, Review and Payment are the LLC's replica pages (the corporation's
 * were not reached on its walk); they run under the corporation's own screen keys.
 */
const nj = (street1: string) => ({ street1, city: "Hoboken", state: "NJ", zip: "07030" });
function njCorp(over: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `idem-${Math.random().toString(36).slice(2)}`,
    type: "formation", state: "NJ",
    formation: {
      njEntityType: "for_profit_corporation",
      name: { baseName: "Garden Ledger", designator: "INC." },
      effectiveDate: "upon_filing", stockShares: 1000,
      mainBusinessAddress: nj("22 River Rd"),
      registeredAgent: { name: "Acme Agents Inc", address: { street1: "9 Agent Way", city: "Newark", state: "NJ", zip: "07102" } },
      directors: [{ name: "Avery Stone", address: nj("5 Park Ave") }, { name: "Jordan Hale", address: nj("8 Hudson St") }],
      incorporators: [{ name: "Sam Rivera", address: nj("22 River Rd") }],
      ...over,
    },
    contact: { firstName: "Sam", lastName: "Rivera", phone: "2015550100", email: "sam@example.test" },
  };
}

let fx: Awaited<ReturnType<typeof startFixtureServer>>;
let harness: BrowserHarness;
let store: MemoryStore;
let artifacts: FsArtifactStore;
let w: ReturnType<typeof wire>;

beforeAll(async () => {
  fx = await startFixtureServer();
  process.env.NJ_FORMATION_URL = `${fx.url}/nj-formation/welcome.html`;
  harness = new BrowserHarness({ chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles" });
  store = await seededStore();
  artifacts = new FsArtifactStore("var/test-artifacts");
  const executor = new RunExecutor({ store, artifacts, harness, drift: new DriftReviewService(store), vault: { getCredential: async () => null }, firstObservationPolicy: "accept" });
  w = wire(store, { executor });
});
afterAll(async () => { await harness.close(); await fx.close(); delete process.env.NJ_FORMATION_URL; });

async function approveAndRun(raw: Record<string, unknown>) {
  const { filing, approvalLink, issues } = await w.service.createFiling(raw);
  expect(issues.filter((i) => i.severity === "error")).toEqual([]);
  await w.service.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", {});
  await w.service.runFiling(filing.id);
  const f = (await store.getFiling(filing.id))!;
  return { filing: f, run: (await store.getRun(f.currentRunId!))! };
}

async function domOf(run: RunRecord, screenKey: string): Promise<string> {
  const step = run.steps.find((s) => s.screenKey === screenKey && s.note === "filled");
  if (!step) throw new Error(`no filled step for ${screenKey}`);
  for (const id of step.artifactIds) {
    const a = await artifacts.get(id);
    if (a?.meta.kind === "dom_snapshot") return a.body.toString("utf8");
  }
  throw new Error(`no DOM snapshot for ${screenKey}`);
}

describe("NJ for-profit corporation dry run over the fixture wizard", () => {
  it("files a DP: designator, shares, directors, incorporators who sign, and stops before Pay Now", async () => {
    const { filing, run } = await approveAndRun(njCorp());
    expect(run.status).toBe("completed");
    expect(run.error).toContain('dry run stopped before "Pay Now"');
    const screens = run.steps.map((s) => s.screenKey);
    for (const k of ["nj.business_name", "nj.dp.designator", "nj.dp.business_data", "nj.registered_agent_info", "nj.dp.directors", "nj.dp.incorporators", "nj.additional_information", "nj.dp.signatures", "nj.dp.review", "nj.dp.payment"]) {
      expect(screens).toContain(k);
    }
    for (const k of ["nj.designator", "nj.business_data", "nj.members", "nj.signatures", "nj.payment"]) expect(screens).not.toContain(k);
    const notes = run.steps.map((s) => s.note ?? "");
    expect(notes).toContain("director added: Avery Stone");
    expect(notes).toContain("director added: Jordan Hale");
    expect(notes).toContain("incorporator added: Sam Rivera");
    // The incorporator signs; with no title named, the only title the list offers is taken.
    expect(notes).toContain("signer added: Sam Rivera (Authorized Representative)");
    expect(notes).toContain("signature checkboxes checked: 1");
    expect(await domOf(run, "nj.business_name")).toMatch(/<option value="DP"[^>]*>NJ Domestic For-Profit Corporation \(DP\)/);
    // $100 published fee plus the stored-card service fee, listed on the price list (a live run stops there).
    expect(run.steps.find((s) => s.screenKey === "nj.dp.payment" && s.note?.startsWith("fee check"))?.note).toBe("fee check: approved lines listed; payable total not shown on this screen (a live run stops here)");
    expect(filing.status).toBe("approved");
  });

  it("stops at Signatures when the title list offers several and the filing names none", async () => {
    fx.setVariant("titles"); // the signer popup offers two titles
    try {
      const { filing } = await approveAndRun(njCorp());
      expect(filing.status).toBe("failed");
      expect(filing.lastError).toMatch(/the title list offers "Authorized Representative", "Incorporator"; name the title for Sam Rivera/);
      const named = await approveAndRun(njCorp({ signers: [{ name: "Sam Rivera", title: "Incorporator" }] }));
      expect(named.run.status).toBe("completed");
      expect(named.run.steps.map((s) => s.note)).toContain("signer added: Sam Rivera (Incorporator)");
    } finally {
      fx.setVariant(null);
    }
  });
});

describe("NJ for-profit corporation requests", () => {
  const issues = (raw: Record<string, unknown>) => validateFiling(FilingRequest.parse(raw));
  const errorPaths = (raw: Record<string, unknown>) => issues(raw).filter((i) => i.severity === "error").map((i) => i.path);

  it("go to the NJ formation adapter, which stays dry-run only", () => {
    expect(adapterFor(FilingRequest.parse(njCorp()))?.key).toBe("nj-formation");
    expect(ADAPTERS["nj-formation"]!.complete).toBe(false);
  });

  it("need a corporate designator, shares, a director and an incorporator, and no LLC members", () => {
    expect(hasErrors(issues(njCorp()))).toBe(false);
    expect(errorPaths(njCorp({ name: { baseName: "Garden Ledger", designator: "LLC" } }))).toContain("formation.name.designator");
    expect(errorPaths(njCorp({ name: { baseName: "Garden Ledger Inc.", designator: "INC." } }))).toContain("formation.name.baseName");
    expect(errorPaths(njCorp({ stockShares: undefined }))).toContain("formation.stockShares");
    expect(errorPaths(njCorp({ directors: [] }))).toContain("formation.directors");
    expect(errorPaths(njCorp({ incorporators: [{ name: "Sam Rivera" }] }))).toContain("formation.incorporators[0].address");
    expect(errorPaths(njCorp({ members: [{ name: "Sam Rivera", address: nj("1 Main") }] }))).toContain("formation.members");
    expect(errorPaths(njCorp({ additionalCertificates: { certificateOfStanding: true } }))).toContain("formation.additionalCertificates");
    expect(errorPaths({ ...njCorp(), state: "NY" })).toContain("formation.njEntityType");
    const missing = checkCompleteness(FilingRequest.parse(njCorp({ directors: [], incorporators: [] }))).missing.map((m) => m.path);
    expect(missing).toEqual(expect.arrayContaining(["formation.directors", "formation.incorporators"]));
    expect(missing).not.toContain("formation.members");
  });

  it("are priced at the published $100 plus the portal fee, with formation add-ons unpriced", () => {
    expect(expectedFees("NJ", "formation", { njEntityType: "for_profit_corporation", paymentMethod: "credit_card" }).map((l) => l.amountUsd)).toEqual([100, 3.5]);
    expect(() => expectedFees("NJ", "formation", { njEntityType: "for_profit_corporation", paymentMethod: "credit_card", certifiedCopy: true })).toThrow(/has not been seen/);
  });

  it("don't get the firm's LLC defaults: no members, no LLC signer, no formation add-ons", () => {
    const tenant = TenantSettings.parse({ tenantId: "keystone", name: "Keystone", signer: { name: "Jordan Lee" } });
    const client = ClientCompanySettings.parse({ clientCompanyId: "c", tenantId: "keystone", name: "C", policies: { njSigner: "service_company", njExtraCertificates: "both" } });
    const raw = njCorp();
    delete (raw.formation as Record<string, unknown>).additionalCertificates;
    const out = applyPolicies(raw, tenant, client).request as { formation: Record<string, unknown> };
    expect(out.formation.signers).toBeUndefined();
    expect(out.formation.additionalCertificates).toBeUndefined();
    const llc = applyPolicies({ ...raw, formation: { ...(raw.formation as object), njEntityType: "llc" } }, tenant, client).request as { formation: Record<string, unknown> };
    expect(llc.formation.signers).toEqual([{ name: "Jordan Lee", title: "Authorized Representative" }]);
  });
});
