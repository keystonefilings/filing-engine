import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { startFixtureServer } from "../fixtures/serve.js";
import { seededStore, wire } from "./helpers.js";
import { RunExecutor } from "../src/orchestrator/run.js";
import { BrowserHarness } from "../src/browser/harness.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { validateFiling, hasErrors } from "../src/domain/validation.js";
import { FilingRequest } from "../src/domain/filing.js";
import { expectedFees, checkLiveFees, nyTaxOnShares } from "../src/fees/table.js";
import { MemoryStore } from "../src/store/memory.js";
import type { RunRecord } from "../src/store/types.js";

/*
 * NY DOS formation against the replica in fixtures/ny-formation, laid out as the portal map of
 * 2026-11-24 describes the signed-in service-company system (docs/portal-maps/ny-dos-corporations.md).
 */
const addr = (street1: string) => ({ street1, city: "Brooklyn", state: "NY", zip: "11201" });

function nyLlc(over: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `idem-${Math.random().toString(36).slice(2)}`,
    type: "formation", state: "NY",
    formation: {
      name: { baseName: "Hudson Ledger", designator: "LLC" }, county: "Kings",
      managementStructure: "member_managed", effectiveDate: "upon_filing",
      serviceOfProcess: { mode: "manual", person: { name: "Hudson Ledger LLC", address: addr("40 Water St") }, noticeEmail: "notices@hudson.example" },
      organizer: { name: "Dana Park", address: addr("7 Front St") },
      filer: { name: "Keystone Filings LLC", address: addr("1 Main St") },
      members: [{ name: "Dana Park" }],
      additionalCertificates: { certificateOfStanding: true },
    },
    contact: { firstName: "Dana", lastName: "Park", phone: "2125550100", email: "dana@example.test" },
    // As the front end's NY LLC form sends them (web/lib/intake/forms.ts).
    intake: { portal: { kind: "ny-llc", plainCopy: "on", customerReference: "ACME-42", ccEmail: "cc@acme.example" } },
    ...over,
  };
}

function nyCorp(): Record<string, unknown> {
  const base = nyLlc();
  const f = base.formation as Record<string, unknown>;
  return {
    ...base,
    formation: {
      ...f,
      nyEntityType: "business_corporation",
      name: { baseName: "Hudson Ledger", designator: "Inc." },
      managementStructure: undefined,
      stockShares: 200,
      incorporator: { name: "Dana J Park", address: addr("7 Front St") },
      serviceOfProcess: { mode: "service_company", serviceCompany: "CORPORATION SERVICE COMPANY" },
      additionalCertificates: {},
    },
    intake: undefined,
  };
}

let fx: Awaited<ReturnType<typeof startFixtureServer>>;
let harness: BrowserHarness;
let store: MemoryStore;
let artifacts: FsArtifactStore;
let executor: RunExecutor;

beforeAll(async () => {
  fx = await startFixtureServer();
  process.env.NY_FORMATION_URL = `${fx.url}/ny-formation/home.html`;
  harness = new BrowserHarness({ chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles" });
  store = await seededStore();
  artifacts = new FsArtifactStore("var/test-artifacts");
  executor = new RunExecutor({ store, artifacts, harness, drift: new DriftReviewService(store), vault: { getCredential: async () => null }, firstObservationPolicy: "accept" });
});
afterAll(async () => { await harness.close(); await fx.close(); delete process.env.NY_FORMATION_URL; });

async function domOf(run: RunRecord, screenKey: string): Promise<string> {
  const step = run.steps.find((s) => s.screenKey === screenKey && s.note === "filled");
  if (!step) throw new Error(`no filled step for ${screenKey}`);
  for (const id of step.artifactIds) {
    const a = await artifacts.get(id);
    if (a?.meta.kind === "dom_snapshot") return a.body.toString("utf8");
  }
  throw new Error(`no DOM snapshot for ${screenKey}`);
}
const selected = (html: string, id: string, value: string) =>
  new RegExp(`value="${value}" selected`).test(new RegExp(`<select[^>]*id="${id}"[^>]*>([\\s\\S]*?)</select>`).exec(html)?.[1] ?? "");
const valueOf = (html: string, id: string) => new RegExp(`id="${id}"[^>]*value="([^"]*)"`).exec(html)?.[1];
const checked = (html: string, id: string) => new RegExp(`id="${id}"[^>]*checked`).test(html);

async function dryRun(raw: Record<string, unknown>): Promise<RunRecord> {
  const w = wire(store, { executor });
  const { filing, approvalLink, issues } = await w.service.createFiling(raw);
  expect(issues.filter((i) => i.severity === "error")).toEqual([]);
  await w.service.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", {});
  await w.service.runFiling(filing.id);
  const f = (await store.getFiling(filing.id))!;
  return (await store.getRun(f.currentRunId!))!;
}

describe("NY DOS formation (dry run)", () => {
  it("prepares the exact deposit, files an LLC up to Payment Information and stops before File Document", async () => {
    const run = await dryRun(nyLlc());
    expect(run.status).toBe("completed");
    expect(run.error).toContain('dry run stopped before "File Document"');
    const screens = run.steps.map((s) => s.screenKey);
    for (const k of ["ny.menu", "ny.replenish", "ny.home", "ny.filing_selection", "ny.entity_name", "ny.filing", "ny.review", "ny.payment"]) expect(screens).toContain(k);
    expect(screens).not.toContain("ny.bcl_filing");

    // Prepay: the only listed account, exactly the approved total ($200 + Certificate of Existence $25
    // + the portal's Plain Copy $5), never authorized.
    const m = await domOf(run, "ny.replenish");
    expect(selected(m, "dd", "F12")).toBe(true);
    expect(valueOf(m, "deposit")).toBe("230.00");
    expect(checked(m, "auth")).toBe(false);
    expect(run.steps.some((s) => /dry run: draw-down deposit of \$230\.00 into KEYSTONE FILINGS LLC - F12 prepared, not authorized/.test(s.note ?? ""))).toBe(true);

    // The long form: repeated labels landed in their own sections.
    const d = await domOf(run, "ny.filing");
    expect(valueOf(d, "llc-name")).toBe("HUDSON LEDGER LLC");
    expect(selected(d, "county", "Kings")).toBe(true);
    expect(valueOf(d, "sop-name")).toBe("Hudson Ledger LLC");
    expect(valueOf(d, "sop-addr1")).toBe("40 Water St");
    expect(valueOf(d, "sop-email1")).toBe("notices@hudson.example");
    expect(valueOf(d, "org-name")).toBe("Dana Park");
    expect(valueOf(d, "org-addr1")).toBe("7 Front St");
    expect(valueOf(d, "filer-name")).toBe("Keystone Filings LLC");
    expect(valueOf(d, "filer-addr1")).toBe("1 Main St");
    expect(valueOf(d, "ra-addr1")).toBeUndefined(); // the registered agent clause stays off
    expect(d).toMatch(/value="members"[^>]*checked/);
    expect(valueOf(d, "sig")).toBe("Dana Park");

    // Payment: draw-down account, the extra service ticked, Payment Authorization never ticked.
    const p = await domOf(run, "ny.payment");
    expect(p).toMatch(/value="dd"[^>]*checked/);
    expect(selected(p, "dd", "F12")).toBe(true);
    expect(checked(p, "existence")).toBe(true);
    expect(checked(p, "plain")).toBe(true); // the portal's plainCopy answer
    expect(checked(p, "certified")).toBe(false);
    expect(valueOf(p, "ref")).toBe("ACME-42");
    expect(valueOf(p, "cc")).toBe("cc@acme.example");
    expect(checked(p, "auth")).toBe(false);
  });

  it("files a business corporation's Certificate of Incorporation with the incorporator's typed signature", async () => {
    const run = await dryRun(nyCorp());
    expect(run.status).toBe("completed");
    expect(run.error).toContain('dry run stopped before "File Document"');
    const screens = run.steps.map((s) => s.screenKey);
    expect(screens).toContain("ny.bcl_filing");
    expect(screens).not.toContain("ny.filing");

    expect(valueOf(await domOf(run, "ny.replenish"), "deposit")).toBe("125.00");
    const d = await domOf(run, "ny.bcl_filing");
    expect(valueOf(d, "corp-name")).toBe("HUDSON LEDGER INC.");
    expect(valueOf(d, "shares")).toBe("200");
    expect(selected(d, "share-value", "NPV")).toBe(true);
    expect(selected(d, "sop-company", "CORPORATION SERVICE COMPANY")).toBe(true);
    expect(valueOf(d, "inc-first")).toBe("Dana");
    expect(valueOf(d, "inc-mid")).toBe("J");
    expect(valueOf(d, "inc-last")).toBe("Park");
    expect(valueOf(d, "sig")).toBe("Dana J Park"); // DOS requires it to equal the incorporator's name
    expect(screens).toContain("ny.bcl_payment"); // its own snapshot: the fee lines differ from an LLC's
    expect(checked(await domOf(run, "ny.bcl_payment"), "auth")).toBe(false);
  });

  it("files par-value shares: Par Value, its amount, and a deposit that covers the quoted tax on shares", async () => {
    const c = nyCorp();
    Object.assign(c.formation as Record<string, unknown>, { stockShares: 20000, stockParValueUsd: 1 });
    const run = await dryRun(c);
    expect(run.status).toBe("completed");
    expect(run.error).toContain('dry run stopped before "File Document"');
    // $125 + Tax on Shares quoted at 1/20 of 1% of $20,000 total par value = $10.
    expect(valueOf(await domOf(run, "ny.replenish"), "deposit")).toBe("135.00");
    const d = await domOf(run, "ny.bcl_filing");
    expect(valueOf(d, "shares")).toBe("20000");
    expect(selected(d, "share-value", "PV")).toBe(true);
    expect(valueOf(d, "par")).toBe("1");
    expect(run.steps.some((s) => /shares: 20000 at \$1 par; the form shows Tax On Shares \$0\.00; quoted \$10\.00/.test(s.note ?? ""))).toBe(true);
    // The replica's payment page computes the same tax, so the page's TOTAL FEE matches the approval.
    expect(run.steps.some((s) => s.screenKey === "ny.bcl_payment" && s.note === "fee check: ok")).toBe(true);
  });
});

describe("NY business corporation requests", () => {
  const issues = (raw: Record<string, unknown>) => validateFiling(FilingRequest.parse(raw));
  it("need a corporate type indicator, shares (with or without par value), and an incorporator", () => {
    expect(hasErrors(issues(nyCorp()))).toBe(false);
    const c = nyCorp();
    const f = c.formation as Record<string, unknown>;
    expect(issues({ ...c, formation: { ...f, name: { baseName: "Hudson Ledger", designator: "LLC" } } }).some((i) => i.path === "formation.name")).toBe(true);
    // Par value is accepted; the warning says the page computes the tax and a different amount stops the run.
    const par = issues({ ...c, formation: { ...f, stockParValueUsd: 0.01 } });
    expect(hasErrors(par)).toBe(false);
    expect(par.find((i) => i.path === "formation.stockParValueUsd")?.severity).toBe("warning");
    expect(issues(nyLlc({ formation: { ...(nyLlc().formation as object), stockParValueUsd: 1 } })).find((i) => i.path === "formation.stockParValueUsd")?.severity).toBe("error");
    expect(issues({ ...c, formation: { ...f, incorporator: undefined } }).some((i) => i.path === "formation.incorporator")).toBe(true);
    expect(issues({ ...c, state: "NJ" }).some((i) => i.path === "formation.nyEntityType")).toBe(true);
  });

  it("are priced at $125 plus the services asked for, and the page's TOTAL FEE is recognized", () => {
    expect(expectedFees("NY", "formation", { nyEntityType: "business_corporation" })).toEqual([{ label: "Certificate of Incorporation filing fee", amountUsd: 125 }]);
    const llc = expectedFees("NY", "formation", { certificateOfStanding: true, certifiedCopy: true, plainCopy: true });
    expect(llc.map((l) => l.amountUsd)).toEqual([200, 25, 10, 5]);
    // Unticked services show their prices beside their boxes; the TOTAL FEE line decides.
    const page = [{ label: "Certificate Filing Fee", amountUsd: 200 }, { label: "Plain Copy ()", amountUsd: 5 }, { label: "Certificate of Existence", amountUsd: 25 }, { label: "TOTAL FEE", amountUsd: 225 }];
    expect(checkLiveFees(expectedFees("NY", "formation", { certificateOfStanding: true }), page).ok).toBe(true);
  });

  it("quote the tax on par-value shares from the share answers, and a page that computes another amount stops the run", () => {
    const corp = (stockShares: number, stockParValueUsd?: number) => expectedFees("NY", "formation", { nyEntityType: "business_corporation", stockShares, stockParValueUsd });
    expect(nyTaxOnShares(200, undefined)).toBe(0); // no par value: $0, as the page showed for 200 shares
    expect(corp(200).map((l) => l.amountUsd)).toEqual([125]);
    expect(nyTaxOnShares(20000, 1)).toBe(10); // 1/20 of 1% of $20,000
    expect(corp(20000, 1).map((l) => l.amountUsd)).toEqual([125, 10]);
    expect(corp(200, 0.001).map((l) => l.amountUsd)).toEqual([125]); // rounds to $0.00
    const page = (tax: number) => [{ label: "Certificate Filing Fee", amountUsd: 125 }, { label: "Tax on Shares", amountUsd: tax }, { label: "TOTAL FEE", amountUsd: 125 + tax }];
    expect(checkLiveFees(corp(20000, 1), page(10)).ok).toBe(true);
    const other = checkLiveFees(corp(20000, 1), page(12.5));
    expect(other.ok).toBe(false);
    expect(other.reason).toMatch(/expected fee lines not shown|differs from approved total/);
  });
});
