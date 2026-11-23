import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { startFixtureServer } from "../fixtures/serve.js";
import { einOnlyRequest, seededStore, wire } from "./helpers.js";
import { RunExecutor } from "../src/orchestrator/run.js";
import { BrowserHarness } from "../src/browser/harness.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { adapterFor, irsEinAdapter } from "../src/adapters/index.js";
import { irsName, splitPersonName } from "../src/adapters/irs-ein/adapter.js";
import { validateFiling, hasErrors } from "../src/domain/validation.js";
import { FilingRequest } from "../src/domain/filing.js";
import { StepRecorder } from "../src/browser/recorder.js";
import { MemoryStore } from "../src/store/memory.js";
import type { RunRecord } from "../src/store/types.js";

const SSN = "123-45-6789";
const SSN_DIGITS = "123456789";
const OPEN = new Date("2026-11-17T17:00:00Z");   // Tuesday 12:00 ET: assistant open
const CLOSED = new Date("2026-11-22T15:00:00Z"); // Sunday 10:00 ET: assistant closed until 6 p.m.

const einOnly = einOnlyRequest;

let fx: Awaited<ReturnType<typeof startFixtureServer>>;
let harness: BrowserHarness;
let store: MemoryStore;
let artifacts: FsArtifactStore;
let executor: RunExecutor;

beforeAll(async () => {
  fx = await startFixtureServer();
  process.env.IRS_EIN_URL = `${fx.url}/irs-ein/start.html`;
  harness = new BrowserHarness({ chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles" });
  store = await seededStore();
  artifacts = new FsArtifactStore("var/test-artifacts");
  executor = new RunExecutor({ store, artifacts, harness, drift: new DriftReviewService(store), vault: { getCredential: async () => null }, firstObservationPolicy: "accept" });
});
afterAll(async () => { await harness.close(); await fx.close(); delete process.env.IRS_EIN_URL; });

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

describe("EIN-only filings", () => {
  it("route to the IRS adapter and validate without the state formation rules", () => {
    const req = FilingRequest.parse(einOnly());
    expect(adapterFor(req)).toBe(irsEinAdapter);
    expect(hasErrors(validateFiling(req))).toBe(false); // no NY service-of-process / organizer checks
    const noStart = FilingRequest.parse(einOnly());
    delete (noStart.ein as Record<string, unknown>).startDate;
    expect(validateFiling(noStart).some((i) => i.path === "ein.startDate" && i.severity === "error")).toBe(true);
  });

  it("dry-runs the full interview and stops before Submit EIN Request", async () => {
    const w = wire(store, { executor, now: () => OPEN });
    const { filing, approvalLink } = await w.service.createFiling(einOnly());
    expect(filing.status).toBe("awaiting_approval");
    await w.service.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", {});
    await w.service.runFiling(filing.id);

    const f = (await store.getFiling(filing.id))!;
    const run = (await store.getRun(f.currentRunId!))!;
    expect(run.status).toBe("completed");
    expect(run.error).toContain('dry run stopped before "Submit EIN Request"');
    const screens = run.steps.map((s) => s.screenKey);
    for (const k of ["irs.start", "irs.legal_structure", "irs.llc_members", "irs.reason", "irs.identity", "irs.address", "irs.details", "irs.regulatory", "irs.employees", "irs.activity", "irs.review"]) {
      expect(screens).toContain(k);
    }
    expect(screens).not.toContain("irs.designee");   // owner route
    expect(screens).not.toContain("irs.assignment"); // never past the submit click
    expect(f.status).toBe("approved");               // a dry run leaves the filing where it was

    // Physical and mailing fields share labels ("City", "State"); each value landed in its own field.
    const address = await domOf(run, "irs.address");
    expect(address).toMatch(/id="street"[^>]*value="22 River Rd"/);
    expect(address).toMatch(/id="mail-street"[^>]*value="PO Box 100"/);
    expect(address).toMatch(/id="city"[^>]*value="Brooklyn"/);
    expect(address).toMatch(/id="mail-city"[^>]*value="Jersey City"/);
    expect(selected(address, "state", "NY")).toBe(true);
    expect(selected(address, "mail-state", "NJ")).toBe(true);

    const details = await domOf(run, "irs.details");
    expect(details).toMatch(/id="legal-name"[^>]*value="Blue Harbor Consulting LLC"/);
    expect(selected(details, "formation-state", "NY")).toBe(true);
    expect(selected(details, "start-month", "11")).toBe(true);
    expect(await domOf(run, "irs.activity")).toMatch(/value="Manage real estate for others"[^>]*checked/);
  });

  it("never writes the SSN into an artifact, a run note, or a webhook", async () => {
    const w = wire(store, { executor, now: () => OPEN });
    const { filing, approvalLink } = await w.service.createFiling(einOnly());
    await w.service.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", {});
    await w.service.runFiling(filing.id);
    const f = (await store.getFiling(filing.id))!;
    const run = (await store.getRun(f.currentRunId!))!;

    const identity = await domOf(run, "irs.identity");
    expect(identity).not.toContain(SSN_DIGITS);
    expect(identity).not.toContain(SSN);
    expect(identity).not.toMatch(/id="first"[^>]*value=/); // every value stripped on a sensitive screen
    // Non-sensitive screens keep their values (the scrub is targeted, not global).
    expect(await domOf(run, "irs.address")).toMatch(/value="22 River Rd"/);

    const runJson = JSON.stringify(run);
    expect(runJson).not.toContain(SSN_DIGITS);
    expect(runJson).toContain("responsible party entered (SSN/ITIN masked)");
    const deliveries = JSON.stringify(await store.listDeliveries(filing.id));
    expect(deliveries).not.toContain(SSN_DIGITS);
    expect(deliveries).not.toContain(SSN);
  });

  it("is blocked before opening a browser when the IRS assistant is closed", async () => {
    const w = wire(store, { executor, now: () => CLOSED });
    const { filing, approvalLink } = await w.service.createFiling(einOnly());
    await w.service.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", {});
    await w.service.runFiling(filing.id);
    const f = (await store.getFiling(filing.id))!;
    expect(f.status).toBe("blocked");
    expect(f.lastError).toContain("IRS EIN assistant is closed");
  });
});

describe("StepRecorder masking", () => {
  it("masks form controls and scrubs the DOM only on sensitive screens", async () => {
    const shots: Record<string, unknown>[] = [];
    const page = {
      screenshot: async (o: Record<string, unknown>) => { shots.push(o); return Buffer.from("png"); },
      locator: (sel: string) => ({ sel }),
      content: async () => `<html><input value="${SSN}"></html>`,
      evaluate: async () => "<html><input></html>",
    } as never;
    const rec = new StepRecorder(artifacts, new MemoryStore(), { filingId: "f", runId: "r" }, new Set(["irs.identity"]));
    await rec.screenshot(page, "irs.identity");
    await rec.screenshot(page, "irs.address");
    expect(shots[0]!.mask).toBeDefined();
    expect(shots[1]!.mask).toBeUndefined();
    expect(await rec.domSnapshot(page, "irs.identity")).not.toContain(SSN);
    expect(await rec.domSnapshot(page, "irs.address")).toContain(SSN);
  });
});

describe("IRS name rendering", () => {
  it("splits responsible-party names and renders IRS-permitted characters only", () => {
    expect(splitPersonName("Mary Ann Smith Jr")).toEqual({ first: "Mary", middle: "Ann", last: "Smith", suffix: "Jr" });
    expect(splitPersonName("Sam Rivera")).toEqual({ first: "Sam", middle: undefined, last: "Rivera", suffix: undefined });
    expect(irsName("Smith, Jones & Co. L.L.C.")).toBe("Smith Jones & Co LLC");
  });
});
