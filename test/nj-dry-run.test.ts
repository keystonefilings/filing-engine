import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { startFixtureServer } from "../fixtures/serve.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";
import { RunExecutor } from "../src/orchestrator/run.js";
import { BrowserHarness } from "../src/browser/harness.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import type { MemoryStore } from "../src/store/memory.js";

let fx: Awaited<ReturnType<typeof startFixtureServer>>;
let harness: BrowserHarness;
let store: MemoryStore;
let w: ReturnType<typeof wire>;

beforeAll(async () => {
  fx = await startFixtureServer();
  process.env.NJ_FORMATION_URL = `${fx.url}/nj-formation/welcome.html`;
  harness = new BrowserHarness({ chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles" });
  store = await seededStore();
  const artifacts = new FsArtifactStore("var/test-artifacts");
  const drift = new DriftReviewService(store);
  const executor = new RunExecutor({ store, artifacts, harness, drift, vault: { getCredential: async () => null }, firstObservationPolicy: "accept" });
  w = wire(store, { executor });
});
afterAll(async () => { await harness.close(); await fx.close(); });

async function approveAndRun(req = njFormationRequest()) {
  const { filing, approvalLink } = await w.service.createFiling(req);
  await w.service.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", {});
  await w.service.runFiling(filing.id); // dryRunDefault: true -> stops before Pay Now
  return (await store.getFiling(filing.id))!;
}

describe("NJ formation dry run over the fixture wizard", () => {
  it("fills every screen by label and stops before Pay Now", async () => {
    const f = await approveAndRun();
    const run = (await store.getRun(f.currentRunId!))!;
    expect(run.status).toBe("completed");
    expect(run.error).toContain('dry run stopped before "Pay Now"');
    const screens = run.steps.map((s) => s.screenKey);
    for (const k of ["nj.welcome", "nj.business_name", "nj.designator", "nj.business_data", "nj.business_purpose", "nj.main_address", "nj.registered_agent", "nj.registered_agent_info", "nj.members", "nj.additional_information", "nj.signatures", "nj.review", "nj.payment"]) {
      expect(screens).toContain(k);
    }
    expect(run.steps.some((s) => s.note?.startsWith("member added"))).toBe(true);
    expect(run.steps.some((s) => s.note?.startsWith("signer added"))).toBe(true);
    // The NJ payment screen lists every option's price and no payable total: the approved lines
    // are there, but a live run cannot verify the charge on it and stops (dry runs continue).
    expect(run.steps.find((s) => s.note?.startsWith("fee check"))?.note).toBe("fee check: approved lines listed; payable total not shown on this screen (a live run stops here)");
    const intents = await store.listOpenSubmitIntents();
    expect(intents).toHaveLength(0); // dry-run intent carries outcome dry_run_stop
    expect([...store.intents.values()].map((i) => i.outcome)).toEqual(["dry_run_stop"]);
    expect(f.status).toBe("approved"); // dry run returns the filing to where it was
    const types = (await store.listDeliveries(f.id)).map((d) => d.event.type);
    expect(types).toContain("filing.started");
    expect(types).toContain("filing.step");
    expect(types).not.toContain("filing.submitted");
    // Snapshots were bootstrapped for every screen (firstObservationPolicy: accept).
    expect(await store.getApprovedSnapshot("NJ", "nj.payment")).not.toBeNull();
  });

  it("stops at the designator screen when the portal says the name is taken", async () => {
    const req = njFormationRequest();
    req.formation!.name.baseName = "Taken Name Holdings";
    const f = await approveAndRun(req);
    expect(f.status).toBe("failed");
    expect(f.lastError).toContain("not available");
    const types = (await store.listDeliveries(f.id)).map((d) => d.event.type);
    expect(types).toContain("filing.failed");
  });

  it("halts on drift, proposes a mapping, and sends the filing back for client re-approval", async () => {
    fx.setVariant("drift"); // payment screen gains a required "Daytime Phone"
    try {
      const f = await approveAndRun();
      expect(f.status).toBe("awaiting_drift_review");
      const [halt] = await store.listDriftHalts("pending");
      expect(halt).toBeDefined();
      expect(halt!.screenKey).toBe("nj.payment");
      expect(halt!.requiresClientReapproval).toBe(true);
      const proposal = halt!.proposal as { items: { kind: string; fieldLabel?: string; required?: boolean }[] };
      expect(proposal.items.some((i) => i.kind === "new_field" && /daytime phone/i.test(i.fieldLabel ?? "") && i.required)).toBe(true);
      const run = (await store.getRun(f.currentRunId!))!;
      expect(run.status).toBe("halted_drift");
      expect([...store.intents.values()].filter((i) => i.filingId === f.id)).toHaveLength(0); // never reached the submit guard

      await w.service.onDriftDecision(halt!.id, { action: "accept", decidedBy: "reviewer@keystone.test" });
      const after = (await store.getFiling(f.id))!;
      expect(after.status).toBe("awaiting_approval"); // new required field -> client approves again (decision 6)
      expect(after.currentApprovalId).not.toBe(f.currentApprovalId);
      const types = (await store.listDeliveries(f.id)).map((d) => d.event.type);
      expect(types).toContain("filing.drift_halted");
      expect(types).toContain("filing.drift_resolved");
      expect(types.filter((t) => t === "filing.awaiting_approval")).toHaveLength(2);
    } finally {
      fx.setVariant(null);
    }
  });

  it("blocks a real (non-dry) run when the fee table has no stored-method price yet", async () => {
    const req = njFormationRequest({ dryRun: false, clientCompanyId: "beta-llc" });
    const { filing, approvalLink } = await w.service.createFiling(req);
    // fee lookup for stored_echeck is still null in the table -> invalid; decision 5 demands a known price before approval
    expect(filing.status).toBe("invalid");
    expect(approvalLink).toBeUndefined();
    expect(filing.lastError).toContain("stored_echeck");
  });
});
