import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { randomUUID } from "node:crypto";
import { RunExecutor, type RunInput } from "../src/orchestrator/run.js";
import { BrowserHarness } from "../src/browser/harness.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import type { ScreenStep, SiteAdapter, StepContext } from "../src/adapters/types.js";
import type { ApprovalRecord, FilingRecord } from "../src/store/types.js";
import type { MemoryStore } from "../src/store/memory.js";
import { seededStore, njFormationRequest } from "./helpers.js";

/**
 * V3 (docs/vision-check-2026-11-25.md): a dry run stops at the irreversible click, so a portal's
 * post-submit screens (the IRS EIN assignment page with its one-time CP 575 letter) never have an
 * approved snapshot before the first live run. Under the production default
 * (firstObservationPolicy "halt") such a screen must be recorded, not halted on, and whatever the
 * adapter collects must be saved even when the run ends in reconciliation.
 */

const page = (body: string) => `data:text/html,${encodeURIComponent(`<html><body>${body}</body></html>`)}`;
const submitPage = (button: string, after: string) => page(`<h1>Review</h1><button onclick="document.body.innerHTML='${after}'">${button}</button>`);
const ASSIGNED = "<h1>Congratulations! Your EIN has been successfully assigned</h1><p>EIN: 12-3456789</p>";
const NOT_ASSIGNED = "<h1>We are unable to provide you with an EIN</h1><p>Reference 101</p>";

const einRead = async (ctx: StepContext) => /\b(\d{2}-\d{7})\b/.exec(await ctx.page.locator("body").innerText())?.[1];

function portalAdapter(o: { site: string; key: string; button: string; after: string; nameGate?: boolean }): SiteAdapter {
  const steps: ScreenStep[] = [];
  if (o.nameGate) steps.push({ screen: { screenKey: `${o.key}.name`, title: "Name", intents: [] }, nameCheckGate: true, async fill() {}, async advance() {} });
  steps.push({
    screen: { screenKey: `${o.key}.review`, title: "Review", intents: [] },
    async fill() {},
    async advance(ctx) { await ctx.submit(o.button, () => ctx.clickButton(new RegExp(`^${o.button}$`, "i"))); },
  });
  steps.push({ screen: { screenKey: `${o.key}.assignment`, title: "Assignment", intents: [] }, async fill() {}, async advance() {} });
  return {
    site: o.site as SiteAdapter["site"], key: o.key, complete: true, entryUrl: () => submitPage(o.button, o.after), profileKey: () => null, credentialKey: () => null, steps,
    async confirmSubmission(ctx) {
      const ein = await einRead(ctx);
      return ein ? { reference: ein, detail: "number on the assignment page" } : null;
    },
    async collectArtifacts(ctx) {
      const text = await ctx.page.locator("body").innerText();
      return [
        { kind: "cp575", label: "CP 575 EIN confirmation letter", contentType: "application/pdf", body: Buffer.from(`%PDF-1.4 ${text}`) },
        { kind: "other", label: "Assignment page (printed)", contentType: "application/pdf", body: Buffer.from("%PDF-1.4 page") },
      ];
    },
  };
}

const EIN_REQUEST = { mode: "in_run", responsibleParty: { name: "Sam Rivera", ssn: "123-45-6789", title: "Member", address: { street1: "22 River Rd", city: "Hoboken", state: "NJ", zip: "07030" }, phone: "2015550100" } };

let harness: BrowserHarness;
beforeAll(() => { harness = new BrowserHarness({ chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles" }); });
afterAll(async () => { await harness.close(); });

async function filingIn(store: MemoryStore, request: Partial<FilingRecord["request"]> = {}): Promise<FilingRecord> {
  const now = new Date().toISOString();
  const filing: FilingRecord = {
    id: randomUUID(), tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `idem-${Math.random()}`,
    status: "running", request: njFormationRequest({ dryRun: false, ...request }), payloadHash: "h", createdAt: now, updatedAt: now, artifacts: [],
  };
  await store.createFiling(filing);
  return filing;
}

/**
 * Dry runs with first observations accepted (the bootstrap: each adapter on its own, since a dry
 * run stops at the first irreversible click), then a live run with the production default.
 */
async function dryThenLive(adapter: SiteAdapter, extra: Partial<RunInput> = {}, request: Partial<FilingRecord["request"]> = {}) {
  const store = await seededStore();
  const base = async (filing: FilingRecord) => ({
    filing, approval: { id: "approval-1" } as ApprovalRecord, tenant: (await store.getTenant("keystone"))!, client: (await store.getClientCompany("acme-cpa"))!,
    adapter, expectedFees: [], ...extra,
  });
  const executor = (firstObservationPolicy: "accept" | "halt") => new RunExecutor({
    store, artifacts: new FsArtifactStore("var/test-artifacts"), harness, drift: new DriftReviewService(store),
    vault: { getCredential: async () => null }, firstObservationPolicy,
  });
  for (const a of [adapter, ...(extra.einAdapter ? [extra.einAdapter] : [])]) {
    const preview = await executor("accept").execute({ ...(await base(await filingIn(store))), adapter: a, einAdapter: undefined, dryRun: true });
    expect(preview.kind).toBe("dry_run_stop");
  }
  const filing = await filingIn(store, request);
  const outcome = await executor("halt").execute({ ...(await base(filing)), dryRun: false });
  return { store, filing: (await store.getFiling(filing.id))!, outcome };
}

describe("post-submit screens on the first live run (V3)", () => {
  it("a post-submit screen with no snapshot is recorded, not halted, and the letter is saved", async () => {
    const { filing, outcome, store } = await dryThenLive(portalAdapter({ site: "IRS", key: "t-irs", button: "Submit EIN Request", after: ASSIGNED }));
    expect(outcome.kind).toBe("submitted");
    expect(filing.artifacts.map((a) => a.kind)).toEqual(["cp575", "other"]);
    expect(outcome.run.steps.some((s) => s.note?.includes("post-submit screen seen for the first time"))).toBe(true);
    // Recorded for review only: nothing was auto-approved and no drift halt was opened.
    expect(await store.getApprovedSnapshot("IRS", "t-irs.assignment")).toBeFalsy();
    expect([...store.intents.values()].find((i) => i.runId === outcome.run.id)).toMatchObject({ outcome: "submitted", evidence: { reference: "12-3456789" } });
  });

  it("an unconfirmed submission still saves what the page offered before going to reconciliation", async () => {
    const { filing, outcome } = await dryThenLive(portalAdapter({ site: "IRS", key: "t-irs", button: "Submit EIN Request", after: NOT_ASSIGNED }));
    expect(outcome.kind).toBe("needs_reconciliation");
    expect(filing.artifacts.map((a) => a.kind)).toEqual(["cp575", "other"]);
  });

  it("the in-run EIN keeps each artifact's own kind and survives a first-seen assignment screen", async () => {
    const state = portalAdapter({ site: "NJ", key: "t-nj", button: "Pay", after: "<h1>Thank you</h1><p>Filing 12-3456789 received</p>", nameGate: true });
    const irs = portalAdapter({ site: "IRS", key: "t-irs", button: "Submit EIN Request", after: ASSIGNED });
    const { filing, outcome } = await dryThenLive(state, { einAdapter: irs }, { ein: EIN_REQUEST } as never);
    expect(outcome.kind).toBe("submitted");
    if (outcome.kind === "submitted") expect(outcome.ein).toBe("12-3456789");
    expect(filing.artifacts.map((a) => a.kind)).toEqual(["cp575", "other", "cp575", "other"]);
  });
});
