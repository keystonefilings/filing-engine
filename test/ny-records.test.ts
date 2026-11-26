import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { startFixtureServer } from "../fixtures/serve.js";
import { seededStore, wire } from "./helpers.js";
import { RunExecutor } from "../src/orchestrator/run.js";
import { BrowserHarness } from "../src/browser/harness.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { validateFiling, hasErrors } from "../src/domain/validation.js";
import { FilingRequest } from "../src/domain/filing.js";
import { expectedFees, checkLiveFees } from "../src/fees/table.js";
import { adapterFor, ADAPTERS } from "../src/adapters/index.js";
import { MemoryStore } from "../src/store/memory.js";
import type { RunRecord } from "../src/store/types.js";

/*
 * NY DOS filings about an existing entity (dissolution, name-change amendment, certificate of change,
 * copies, certificates of status) against the replica in fixtures/ny-formation, laid out as the portal
 * map of 2026-11-24 describes Screens G to K (docs/portal-maps/ny-dos-corporations.md).
 */
const addr = (street1: string, city = "Brooklyn", zip = "11201") => ({ street1, city, state: "NY", zip });
const entity = { dosId: "1234567", name: "Hudson Ledger LLC" };
const signer = { name: "Dana Park", capacity: "member" as const };
const contact = { firstName: "Dana", lastName: "Park", phone: "2125550100", email: "dana@example.test" };
const base = (type: string, over: Record<string, unknown>) => ({
  tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `idem-${Math.random().toString(36).slice(2)}`,
  type, state: "NY", contact, intake: { portal: { ccEmail: "cc@acme.example" } }, ...over,
});
const dissolutionReq = (over: Record<string, unknown> = {}) => base("dissolution", { dissolution: { entity, reason: "member_vote", signer, ...over } });
const amendmentReq = (over: Record<string, unknown> = {}) => base("amendment", { amendment: { entity, newName: { baseName: "Hudson Books", designator: "LLC" }, signer, ...over } });
const changeReq = (over: Record<string, unknown> = {}) => base("certificate_of_change", {
  certificateOfChange: { entity, county: "Queens", serviceOfProcessEmail: "sop@hudson.example", registeredAgentAddress: addr("12 State St", "Albany", "12207"), signer: { name: "Dana Park", capacity: "manager" }, ...over },
});
const copyReq = (documents: Record<string, unknown>[]) => base("copy_request", { copyRequest: { entity: { dosId: "1234567", name: "Hudson Ledger LLC" }, documents } });
const statusReq = (form = "long_filing_history") => base("standing_certificate", { standing: { entityName: "Hudson Ledger LLC", dosId: "1234567", form } });

let fx: Awaited<ReturnType<typeof startFixtureServer>>;
let harness: BrowserHarness;
let store: MemoryStore;
let artifacts: FsArtifactStore;
let executor: RunExecutor;

beforeAll(async () => {
  fx = await startFixtureServer();
  process.env.NY_DOS_HOME_URL = `${fx.url}/ny-formation/home.html`;
  harness = new BrowserHarness({ chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles" });
  store = await seededStore();
  artifacts = new FsArtifactStore("var/test-artifacts");
  executor = new RunExecutor({ store, artifacts, harness, drift: new DriftReviewService(store), vault: { getCredential: async () => null }, firstObservationPolicy: "accept" });
});
afterAll(async () => { await harness.close(); await fx.close(); delete process.env.NY_DOS_HOME_URL; });

async function domOf(run: RunRecord, screenKey: string): Promise<string> {
  const step = run.steps.find((s) => s.screenKey === screenKey && s.note === "filled");
  if (!step) throw new Error(`no filled step for ${screenKey}`);
  for (const id of step.artifactIds) {
    const a = await artifacts.get(id);
    // The replica writes parts of its pages from scripts: read the rendered markup only.
    if (a?.meta.kind === "dom_snapshot") return a.body.toString("utf8").replace(/<script\b[\s\S]*?<\/script>/g, "");
  }
  throw new Error(`no DOM snapshot for ${screenKey}`);
}
const valueOf = (html: string, id: string) => new RegExp(`id="${id}"[^>]*value="([^"]*)"`).exec(html)?.[1];
const checked = (html: string, id: string) => new RegExp(`id="${id}"[^>]*checked`).test(html);
/** The option the replica marked selected in a select, by its value or its text. */
function selected(html: string, id: string, value: string): boolean {
  const inner = new RegExp(`<select[^>]*id="${id}"[^>]*>([\\s\\S]*?)</select>`).exec(html)?.[1] ?? "";
  const opt = /<option[^>]*selected[^>]*>[^<]*/.exec(inner)?.[0] ?? "";
  return opt.includes(`value="${value}"`) || opt.endsWith(`>${value}`);
}

async function dryRun(raw: Record<string, unknown>) {
  const w = wire(store, { executor });
  const { filing, approvalLink, issues } = await w.service.createFiling(raw);
  expect(issues.filter((i) => i.severity === "error")).toEqual([]);
  await w.service.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", {});
  await w.service.runFiling(filing.id);
  const f = (await store.getFiling(filing.id))!;
  return { filing: f, run: (await store.getRun(f.currentRunId!))! };
}

const notes = (run: RunRecord) => run.steps.map((s) => s.note ?? "");

describe("NY DOS record filings (dry run)", () => {
  it("dissolves an LLC: exact search, reason, attestation, the preview's transaction number, and stops before Submit", async () => {
    const { run } = await dryRun(dissolutionReq());
    expect(run.status).toBe("completed");
    expect(run.error).toContain('dry run stopped before "Submit"');
    const screens = run.steps.map((s) => s.screenKey);
    for (const k of ["ny.menu", "ny.replenish", "ny.home", "ny.dissolution.search", "ny.dissolution.form", "ny.dissolution.preview", "ny.dissolution.payment"]) expect(screens).toContain(k);
    // Prepay: exactly the approved $60.
    expect(valueOf(await domOf(run, "ny.replenish"), "deposit")).toBe("60.00");
    const s = await domOf(run, "ny.dissolution.search");
    expect(valueOf(s, "dos-id")).toBe("1234567");
    expect(valueOf(s, "entity-name")).toBe("Hudson Ledger LLC");
    const d = await domOf(run, "ny.dissolution.form");
    expect(d).toMatch(/name="reason" value="1"[^>]*checked/);
    expect(checked(d, "certify")).toBe(true);
    expect(valueOf(d, "sig")).toBe("Dana Park");
    expect(d).toMatch(/name="cap" value="MBR"[^>]*checked/);
    expect(valueOf(d, "req-name")).toBe("KEYSTONE FILINGS LLC"); // left as DOS prefilled it
    expect(valueOf(d, "cc")).toBe("cc@acme.example");
    expect(notes(run).some((n) => n.startsWith("DOS transaction number T2611260001"))).toBe(true);
    const p = await domOf(run, "ny.dissolution.payment");
    expect(selected(p, "dd", "F12")).toBe(true);
    expect(checked(p, "auth")).toBe(false); // Payment Authorization is never ticked on a dry run
    expect(notes(run)).toContain("fee check: ok");
  });

  it("changes an LLC's name: the new name is checked, carried over and signed", async () => {
    const { run } = await dryRun(amendmentReq());
    expect(run.status).toBe("completed");
    expect(run.error).toContain('dry run stopped before "Submit"');
    expect(valueOf(await domOf(run, "ny.amendment.name"), "new-name")).toBe("Hudson Books LLC");
    expect(notes(run)).toContain("new name available: Hudson Books LLC");
    const f = await domOf(run, "ny.amendment.form");
    expect(valueOf(f, "new-name")).toBe("HUDSON BOOKS LLC");
    expect(valueOf(f, "sig")).toBe("Dana Park");
    expect(checked(await domOf(run, "ny.amendment.payment"), "auth")).toBe(false);
  });

  it("files a certificate of change with only the ticked sections", async () => {
    const { run } = await dryRun(changeReq());
    expect(run.status).toBe("completed");
    expect(run.error).toContain('dry run stopped before "Submit"');
    const sel = await domOf(run, "ny.change.selection");
    expect(checked(sel, "ct-county")).toBe(true);
    expect(checked(sel, "ct-sopEmail")).toBe(true);
    expect(checked(sel, "ct-raAddress")).toBe(true);
    expect(checked(sel, "ct-sop")).toBe(false);
    expect(checked(sel, "ct-raName")).toBe(false);
    const f = await domOf(run, "ny.change.form");
    expect(selected(f, "new-county", "Queens")).toBe(true);
    expect(valueOf(f, "sop-e1")).toBe("sop@hudson.example");
    expect(valueOf(f, "sop-e2")).toBe("sop@hudson.example");
    expect(valueOf(f, "ra-a1")).toBe("12 State St");
    expect(valueOf(f, "ra-zip")).toBe("12207");
    expect(f).toMatch(/name="cap" value="MGR"[^>]*checked/);
    expect(valueOf(await domOf(run, "ny.replenish"), "deposit")).toBe("30.00");
  });

  it("orders plain copies of the documents named, $5 each", async () => {
    const { run } = await dryRun(copyReq([{ filingNumber: "240115000123" }, { description: "Certificate of Publication" }]));
    expect(run.status).toBe("completed");
    expect(run.error).toContain('dry run stopped before "Submit"');
    expect(valueOf(await domOf(run, "ny.replenish"), "deposit")).toBe("10.00");
    const h = await domOf(run, "ny.copy.history");
    expect((h.match(/type="checkbox"[^>]*checked/g) ?? []).length).toBe(2);
    expect(valueOf(h, "cc")).toBe("cc@acme.example");
    expect(valueOf(h, "confirm")).toBe("cc@acme.example");
    expect(notes(run)).toContain("documents selected: 2");
    expect(notes(run)).toContain("fee check: ok");
    // The next request copies one document: its smaller total is not drift, and the fee check still passes.
    const one = await dryRun(copyReq([{ description: "Biennial Statement", filingDate: "2026-01-01" }]));
    expect(one.run.status).toBe("completed");
    expect(valueOf(await domOf(one.run, "ny.replenish"), "deposit")).toBe("5.00");
    expect(notes(one.run)).toContain("fee check: ok");
  });

  it("orders a long-form certificate of status by DOS ID", async () => {
    const { run } = await dryRun(statusReq());
    expect(run.status).toBe("completed");
    expect(run.error).toContain('dry run stopped before "Submit"');
    const r = await domOf(run, "ny.status.request");
    expect(valueOf(r, "dos-id")).toBe("1234567");
    expect(r).toMatch(/value="LONG"[^>]*checked/);
    expect(valueOf(await domOf(run, "ny.replenish"), "deposit")).toBe("25.00");
    const p = await domOf(run, "ny.status.payment");
    expect(valueOf(p, "ref")).toBeTruthy(); // the Customer Reference Number on this page
    expect(checked(p, "auth")).toBe(false);
  });

  it("stops with what it searched when DOS finds no exact match", async () => {
    const { filing } = await dryRun(dissolutionReq({ entity: { dosId: "1234567", name: "Hudson Ledger L.L.C." } }));
    expect(filing.status).toBe("failed");
    expect(filing.lastError).toMatch(/no entity matching DOS ID 1234567 and the name "Hudson Ledger L\.L\.C\." exactly/);
  });

  it("stops instead of guessing where a plain copy is ticked (not in the recording)", async () => {
    const { filing } = await dryRun(dissolutionReq({ plainCopy: true }));
    expect(filing.status).toBe("failed");
    expect(filing.lastError).toMatch(/Plain Copy choice is not on this screen/);
  });

  it("stops when DOS says the new name is not available", async () => {
    const { filing } = await dryRun(amendmentReq({ newName: { baseName: "Taken Name", designator: "LLC" } }));
    expect(filing.status).toBe("failed");
    expect(filing.lastError).toMatch(/not available/);
  });

  it("stops when a change the filing asks for is greyed out for the entity", async () => {
    const { filing } = await dryRun(changeReq({ county: undefined, serviceOfProcessEmail: undefined, registeredAgentAddress: undefined, entity: { dosId: "7654321", name: "River Stone LLC" }, registeredAgentName: "New Agent Inc." }));
    expect(filing.status).toBe("failed");
    expect(filing.lastError).toMatch(/Name of Registered Agent \(Edit\)" is greyed out/);
  });

  it("stops when a document is named ambiguously or not on the filing history", async () => {
    const none = await dryRun(copyReq([{ filingNumber: "999999999999" }]));
    expect(none.filing.lastError).toMatch(/no document matches filing number 999999999999/);
    const many = await dryRun(copyReq([{ description: "of" }])); // Articles OF Organization, Certificate OF Publication
    expect(many.filing.status).toBe("failed");
    expect(many.filing.lastError).toMatch(/2 documents match "of"; give its filing number/);
  });
});

describe("NY DOS record filing requests", () => {
  const issues = (raw: Record<string, unknown>) => validateFiling(FilingRequest.parse(raw));
  const paths = (raw: Record<string, unknown>) => issues(raw).filter((i) => i.severity === "error").map((i) => i.path);

  it("route to their own dry-run-only adapters, tenant-scoped like the formation", () => {
    const keys = [dissolutionReq(), amendmentReq(), changeReq(), copyReq([{ filingNumber: "1" }]), statusReq()].map((r) => adapterFor(FilingRequest.parse(r))?.key);
    expect(keys).toEqual(["ny-dissolution", "ny-amendment", "ny-certificate-of-change", "ny-copy-request", "ny-status-certificate"]);
    for (const k of keys) {
      const a = ADAPTERS[k!]!;
      expect(a.complete).toBe(false);
      const tenant = { tenantId: "t9", nyGovCredentialKey: "NYGOV" } as never;
      expect(a.profileKey({ tenant } as never)).toBe("ny:t9");
      expect(a.credentialKey({ tenant } as never)).toBe("t9/NYGOV");
    }
  });

  it("are valid as built, and say what is missing or wrong", () => {
    for (const r of [dissolutionReq(), amendmentReq(), changeReq(), copyReq([{ filingNumber: "1" }]), statusReq()]) expect(hasErrors(issues(r))).toBe(false);
    expect(paths(base("dissolution", {}))).toContain("dissolution");
    expect(paths({ ...dissolutionReq(), state: "NJ" })).toContain("state");
    expect(paths(amendmentReq({ newName: { baseName: "Hudson Books", designator: "Inc." } }))).toContain("amendment.newName");
    expect(paths(amendmentReq({ newName: { baseName: "Hudson Ledger", designator: "LLC" } }))).toContain("amendment.newName");
    expect(paths(changeReq({ county: undefined, serviceOfProcessEmail: undefined, registeredAgentAddress: undefined }))).toContain("certificateOfChange");
    expect(paths(changeReq({ registeredAgentAddress: { street1: "1 Main", city: "Newark", state: "NJ", zip: "07102" } }))).toContain("certificateOfChange.registeredAgentAddress.state");
    expect(paths(copyReq([{ filingDate: "2024-01-15" }]))).toContain("copyRequest.documents[0]");
    expect(paths(base("standing_certificate", { standing: { entityName: "Hudson Ledger LLC", form: "short" } }))).toContain("standing.dosId");
    expect(paths(statusReq("long_officers"))).toContain("standing.form");
  });

  it("are priced from the map: $60, $60, $30, $5 a document, $25, plus a plain copy when asked", () => {
    expect(expectedFees("NY", "dissolution", {}).map((l) => l.amountUsd)).toEqual([60]);
    expect(expectedFees("NY", "dissolution", { plainCopy: true }).map((l) => l.amountUsd)).toEqual([60, 5]);
    expect(expectedFees("NY", "amendment", {}).map((l) => l.amountUsd)).toEqual([60]);
    expect(expectedFees("NY", "certificate_of_change", {}).map((l) => l.amountUsd)).toEqual([30]);
    expect(expectedFees("NY", "copy_request", { documentCount: 3 }).map((l) => l.amountUsd)).toEqual([15]);
    expect(() => expectedFees("NY", "copy_request", {})).toThrow(/per document/);
    expect(expectedFees("NY", "standing_certificate", {}).map((l) => l.amountUsd)).toEqual([25]);
    // A page that charges a plain copy the approval did not cover stops the run.
    const page = [{ label: "Domestic LLC Fee", amountUsd: 60 }, { label: "Plain Copy", amountUsd: 5 }, { label: "Total Fees", amountUsd: 65 }];
    expect(checkLiveFees(expectedFees("NY", "dissolution", {}), page).ok).toBe(false);
    expect(checkLiveFees(expectedFees("NY", "dissolution", { plainCopy: true }), page).ok).toBe(true);
  });
});
