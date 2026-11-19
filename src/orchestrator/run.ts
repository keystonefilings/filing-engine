import { randomUUID } from "node:crypto";
import type { BrowserContext, Page } from "playwright";
import type { ApprovalRecord, FilingRecord, RunRecord, Store } from "../store/types.js";
import type { ClientCompanySettings, TenantSettings } from "../settings/schema.js";
import type { ScreenStep, SiteAdapter, StepContext } from "../adapters/types.js";
import { NameUnavailable } from "../adapters/types.js";
import { collectInventory } from "../resolver/inventory.js";
import { matchIntents } from "../resolver/match.js";
import { diffSnapshots, snapshotFromInventory } from "../resolver/drift.js";
import { normalizeLabel, structuralInventory, type FieldDescriptor, type PageInventory, type ScreenIntents } from "../resolver/types.js";
import { BotChallenge, DriftHalt, DryRunStop, FeeMismatch, ReviewGateHalt } from "../browser/guard.js";
import { BrowserHarness, detectChallenge } from "../browser/harness.js";
import { StepRecorder } from "../browser/recorder.js";
import type { ArtifactStore } from "../artifacts/store.js";
import { buildProposal, DriftReviewService } from "../drift-review/service.js";
import type { ReviewGateService } from "../review-gate/service.js";
import { checkLiveFees, type FeeLine } from "../fees/table.js";
import type { Vault } from "../settings/vault.js";
import { labelScore } from "../resolver/match.js";

export interface RunDeps {
  store: Store;
  artifacts: ArtifactStore;
  harness: BrowserHarness;
  drift: DriftReviewService;
  vault: Vault;
  /** Beta review-gate (optional): when set and the tenant has it on, the run stops at the review screen. */
  reviewGate?: ReviewGateService;
  /** First observation of a screen: halt for review (strict) or auto-approve the snapshot (bootstrap/fixtures). */
  firstObservationPolicy?: "halt" | "accept";
}

export interface RunInput {
  filing: FilingRecord;
  approval: ApprovalRecord | null;
  tenant: TenantSettings;
  client: ClientCompanySettings;
  adapter: SiteAdapter;
  einAdapter?: SiteAdapter;
  dryRun: boolean;
  expectedFees: FeeLine[];
  /** Set on the re-run after an admin approved the beta review-gate: proceed past the gate. */
  reviewGateApproved?: boolean;
}

export type RunOutcome =
  | { kind: "submitted"; run: RunRecord; ein?: string }
  | { kind: "dry_run_stop"; run: RunRecord; stoppedBefore: string; ein?: string }
  | { kind: "drift_halt"; run: RunRecord; haltId: string; requiresClientReapproval: boolean }
  | { kind: "name_unavailable"; run: RunRecord; requestedName: { baseName: string; designator: string; name: string }; purpose?: string; site: string }
  | { kind: "review_gate"; run: RunRecord; recordId: string; screenKey: string; screenshotArtifactId?: string }
  | { kind: "failed"; run: RunRecord; stage: string; error: string }
  | { kind: "needs_reconciliation"; run: RunRecord; error: string };

/**
 * One browser pass. Reads every screen live, matches by label, checks drift and
 * fees, and only reaches the final click after the approval was verified upstream.
 * Rule 4: the EIN sub-run happens after the name-check gate; an EIN error stops here.
 */
export class RunExecutor {
  constructor(private readonly deps: RunDeps) {}

  async execute(input: RunInput): Promise<RunOutcome> {
    const { store } = this.deps;
    const run = await store.createRun({
      id: randomUUID(), filingId: input.filing.id, approvalId: input.approval?.id ?? "dry-run", site: input.adapter.site,
      dryRun: input.dryRun, status: "running", startedAt: new Date().toISOString(), steps: [],
    });
    const recorder = new StepRecorder(this.deps.artifacts, store, { filingId: input.filing.id, runId: run.id });
    const profileKey = input.adapter.profileKey(input);
    const context: BrowserContext = profileKey ? await this.deps.harness.persistentContext(profileKey) : await this.deps.harness.ephemeralContext();
    const credKey = input.adapter.credentialKey(input);
    const credential = credKey ? await this.deps.vault.getCredential(credKey) : null;
    const values: StepContext["values"] = {};
    if (input.filing.ein) values.ein = input.filing.ein; // reuse an EIN already filed; never file a second one
    let stage = "open";
    try {
      const page = await context.newPage();
      await page.goto(input.adapter.entryUrl(input), { waitUntil: "domcontentloaded" });
      for (const step of input.adapter.steps) {
        stage = step.screen.screenKey;
        const ctx = await this.stepContext(page, step.screen, input, values, credential, recorder, run);
        if (step.present && !(await step.present(ctx))) continue;
        await this.driftCheck(page, step.screen, input, run, recorder);
        await step.fill(ctx);
        await recorder.record(page, step.screen.screenKey, "filled");
        if (step.reviewScreen && this.deps.reviewGate && input.tenant.betaReviewGate && !input.dryRun && !input.reviewGateApproved) {
          stage = "review_gate";
          const screenshotArtifactId = await this.captureReviewShot(page, input, run);
          const rec = await this.deps.reviewGate.recordHalt({
            runId: run.id, filingId: input.filing.id, tenantId: input.filing.tenantId,
            site: input.adapter.site, screenKey: step.screen.screenKey, screenshotArtifactId,
          });
          await recorder.record(page, step.screen.screenKey, "review gate halt");
          throw new ReviewGateHalt(step.screen.screenKey, rec.id);
        }
        if (step.paymentScreen) await this.feeCheck(page, step.screen, input, run, recorder);
        await actAndSettle(page, () => step.advance(ctx));
        if (step.verify) await step.verify(ctx);
        if (step.nameCheckGate && input.einAdapter && input.filing.request.ein && !input.filing.ein && (input.filing.request.ein.mode ?? input.client.einMode) === "in_run") {
          stage = "ein";
          values.ein = await this.einSubRun(input, run, recorder);
          await store.updateFiling(input.filing.id, { ein: values.ein });
        }
      }
      // All steps done without a submit screen stopping us: the last advance was the submit.
      stage = "artifacts";
      if (input.adapter.collectArtifacts) {
        const ctx = await this.stepContext(page, { screenKey: "artifacts", title: "artifacts", intents: [] }, input, values, credential, recorder, run);
        for (const a of await input.adapter.collectArtifacts(ctx)) {
          const meta = await this.deps.artifacts.put({ filingId: input.filing.id, runId: run.id, kind: a.kind as never, label: a.label, contentType: a.contentType }, a.body);
          const f = await store.getFiling(input.filing.id);
          await store.updateFiling(input.filing.id, { artifacts: [...(f?.artifacts ?? []), { id: meta.id, kind: a.kind, label: a.label }] });
        }
      }
      const done = await store.updateRun(run.id, { status: "submitted", endedAt: new Date().toISOString() });
      return { kind: "submitted", run: done, ein: values.ein };
    } catch (e) {
      const err = e as Error;
      if (err instanceof DryRunStop) {
        const done = await store.updateRun(run.id, { status: "completed", endedAt: new Date().toISOString(), error: err.message });
        return { kind: "dry_run_stop", run: done, stoppedBefore: err.action, ein: values.ein };
      }
      if (err instanceof DriftHalt) {
        const halt = await store.getDriftHalt(err.haltId);
        const done = await store.updateRun(run.id, { status: "halted_drift", endedAt: new Date().toISOString(), error: err.message });
        return { kind: "drift_halt", run: done, haltId: err.haltId, requiresClientReapproval: halt?.requiresClientReapproval ?? false };
      }
      if (err instanceof ReviewGateHalt) {
        const done = await store.updateRun(run.id, { status: "halted_review", endedAt: new Date().toISOString(), error: err.message });
        return { kind: "review_gate", run: done, recordId: err.recordId, screenKey: err.screenKey };
      }
      if (err instanceof NameUnavailable) {
        const fm = input.filing.request.formation;
        const requestedName = fm
          ? { baseName: fm.name.baseName, designator: fm.name.designator, name: `${fm.name.baseName} ${fm.name.designator}` }
          : { baseName: err.name, designator: "", name: err.name };
        const done = await store.updateRun(run.id, { status: "halted_name", endedAt: new Date().toISOString(), error: err.message });
        return { kind: "name_unavailable", run: done, requestedName, purpose: fm?.purpose, site: input.adapter.site };
      }
      const open = (await store.listOpenSubmitIntents()).find((i) => i.runId === run.id);
      if (open) {
        const done = await store.updateRun(run.id, { status: "needs_reconciliation", endedAt: new Date().toISOString(), error: err.message });
        return { kind: "needs_reconciliation", run: done, error: err.message };
      }
      const done = await store.updateRun(run.id, { status: "failed", endedAt: new Date().toISOString(), error: `${stage}: ${err.message}` });
      const kindStage = err instanceof FeeMismatch ? "fee_mismatch" : err instanceof BotChallenge ? "bot_challenge" : stage;
      return { kind: "failed", run: done, stage: kindStage, error: err.message };
    } finally {
      await context.close().catch(() => {});
    }
  }

  /** Rule 4: file the EIN in the same session window; any failure throws and stops the state run. */
  private async einSubRun(input: RunInput, parentRun: RunRecord, recorder: StepRecorder): Promise<string> {
    const ein = input.einAdapter!;
    if (!ein.complete) {
      if (input.dryRun) { await recorder.noteOnly("irs.skipped", "dry run: IRS adapter not mapped (walk B); placeholder EIN used"); return "00-0000000"; }
      throw new Error("IRS EIN adapter not mapped (walk B); run stopped before the state filing per rule 4");
    }
    const context = await this.deps.harness.ephemeralContext();
    try {
      const page = await context.newPage();
      await page.goto(ein.entryUrl(input), { waitUntil: "domcontentloaded" });
      const values: StepContext["values"] = {};
      for (const step of ein.steps) {
        const ctx = await this.stepContext(page, step.screen, input, values, null, recorder, parentRun);
        if (step.present && !(await step.present(ctx))) continue;
        await this.driftCheck(page, step.screen, { ...input, adapter: ein }, parentRun, recorder);
        await step.fill(ctx);
        await recorder.record(page, step.screen.screenKey, "filled");
        await actAndSettle(page, () => step.advance(ctx));
        if (step.verify) await step.verify(ctx);
      }
      const text = await page.locator("body").innerText();
      const m = /\b(\d{2}-\d{7})\b/.exec(text);
      if (!m) throw new Error("EIN not found on the IRS confirmation page");
      if (ein.collectArtifacts) {
        const ctx = await this.stepContext(page, { screenKey: "irs.artifacts", title: "CP 575", intents: [] }, input, values, null, recorder, parentRun);
        for (const a of await ein.collectArtifacts(ctx)) {
          const meta = await this.deps.artifacts.put({ filingId: input.filing.id, runId: parentRun.id, kind: "cp575", label: a.label, contentType: a.contentType }, a.body);
          const f = await this.deps.store.getFiling(input.filing.id);
          await this.deps.store.updateFiling(input.filing.id, { artifacts: [...(f?.artifacts ?? []), { id: meta.id, kind: "cp575", label: a.label }] });
        }
      }
      return m[1]!;
    } finally {
      await context.close().catch(() => {});
    }
  }

  private async driftCheck(page: Page, screen: ScreenIntents, input: RunInput, run: RunRecord, recorder: StepRecorder): Promise<void> {
    const challenge = await detectChallenge(page);
    if (challenge) {
      await recorder.record(page, screen.screenKey, `bot challenge: ${challenge}`);
      throw new BotChallenge(input.adapter.site, challenge);
    }
    const inventory = structuralInventory(await collectInventory(page), screen);
    const current = snapshotFromInventory(input.adapter.site, screen.screenKey, inventory);
    const previous = await this.deps.store.getApprovedSnapshot(input.adapter.site, screen.screenKey);
    const overrides = await this.deps.store.getIntentOverrides(input.adapter.site, screen.screenKey);
    const knownUnused = [...(screen.knownUnused ?? []), ...(overrides["__known_unused__"] ?? [])];
    const match = matchIntents(screen.intents, inventory, overrides, knownUnused);
    const requiredUnmatched = match.unmatchedIntents.filter((i) => i.required);

    if (!previous) {
      if ((this.deps.firstObservationPolicy ?? "halt") === "accept" && requiredUnmatched.length === 0) {
        await this.deps.store.putApprovedSnapshot(input.adapter.site, screen.screenKey, current);
        return;
      }
      await this.halt(page, screen, input, run, recorder, null, null, match, inventory);
    }
    const diff = diffSnapshots(previous!, current);
    if (diff.substantive || requiredUnmatched.length) {
      await this.halt(page, screen, input, run, recorder, previous, diff, match, inventory);
    }
  }

  private async halt(page: Page, screen: ScreenIntents, input: RunInput, run: RunRecord, recorder: StepRecorder, previous: Awaited<ReturnType<Store["getApprovedSnapshot"]>>, diff: ReturnType<typeof diffSnapshots> | null, match: ReturnType<typeof matchIntents>, inventory: PageInventory): Promise<never> {
    const proposal = buildProposal(screen, diff, match, inventory);
    await recorder.record(page, screen.screenKey, "drift halt");
    const rec = await this.deps.drift.recordHalt({
      runId: run.id, filingId: input.filing.id, site: input.adapter.site, screenKey: screen.screenKey,
      previous, current: snapshotFromInventory(input.adapter.site, screen.screenKey, inventory), diff, proposal,
    });
    throw new DriftHalt(screen.screenKey, rec.id, proposal.summary);
  }

  private async feeCheck(page: Page, screen: ScreenIntents, input: RunInput, run: RunRecord, recorder: StepRecorder): Promise<void> {
    const inventory = await collectInventory(page);
    const check = checkLiveFees(input.expectedFees, inventory.prices, input.filing.request.feeCapUsd);
    await recorder.record(page, screen.screenKey, `fee check: ${check.ok ? "ok" : check.reason}`);
    if (!check.ok) throw new FeeMismatch(screen.screenKey, check.reason ?? "mismatch");
  }

  /** Beta review-gate: capture the review screen as an artifact for the admin to inspect. */
  private async captureReviewShot(page: Page, input: RunInput, run: RunRecord): Promise<string | undefined> {
    try {
      const buf = await page.screenshot({ fullPage: true });
      const meta = await this.deps.artifacts.put(
        { filingId: input.filing.id, runId: run.id, kind: "screenshot", label: "beta review gate", contentType: "image/png" },
        buf,
      );
      const f = await this.deps.store.getFiling(input.filing.id);
      await this.deps.store.updateFiling(input.filing.id, { artifacts: [...(f?.artifacts ?? []), { id: meta.id, kind: "screenshot", label: "beta review gate" }] });
      return meta.id;
    } catch {
      return undefined;
    }
  }

  private async stepContext(page: Page, screen: ScreenIntents, input: RunInput, values: StepContext["values"], credential: StepContext["credential"], recorder: StepRecorder, run: RunRecord): Promise<StepContext> {
    const store = this.deps.store;
    const site = input.adapter.site;
    const resolve = async (s: ScreenIntents) => {
      const inventory = await collectInventory(page);
      const overrides = await store.getIntentOverrides(site, s.screenKey);
      const match = matchIntents(s.intents, inventory, overrides, s.knownUnused);
      const field = (key: string) => match.matched.get(key);
      const set = async (key: string, value: string | boolean) => {
        const f = field(key);
        const intent = s.intents.find((i) => i.key === key);
        if (!f) {
          if (intent?.required) throw new Error(`required field "${key}" not found on ${s.screenKey}`);
          return; // optional and absent: leave it
        }
        await fillField(page, f, value);
      };
      return { set, field, fields: inventory.fields };
    };
    const base = await resolve(screen);
    return {
      page, filing: input.filing, tenant: input.tenant, client: input.client, values, dryRun: input.dryRun, credential,
      set: base.set, field: base.field, resolve,
      expectedFees: input.expectedFees, feeCapUsd: input.filing.request.feeCapUsd,
      clickButton: async (label) => {
        const inventory = await collectInventory(page);
        const buttons = inventory.fields.filter((f) => f.kind === "button" && f.visible && !f.disabled);
        const hit = buttons.find((b) => (label instanceof RegExp ? label.test(b.label.trim()) : labelScore(label, b.label) >= 0.8));
        if (!hit) {
          // Links styled as buttons (NJ wizard uses <a class="btn">).
          // Links, and links given role="button" (NJ "Add New Member"), are not form controls.
          const link = page.getByRole("link", { name: label }).or(page.getByRole("button", { name: label })).first();
          if (await link.count()) { await link.click(); return; }
          throw new Error(`button ${String(label)} not found on ${screen.screenKey}`);
        }
        await page.locator(`[data-ke-ref="${hit.ref}"]`).click();
      },
      setByName: async (name, value) => {
        const inventory = await collectInventory(page);
        const f = inventory.fields.find((x) => x.name === name && x.visible);
        if (!f) throw new Error(`no live field named "${name}" on ${screen.screenKey}`);
        await fillField(page, f, value);
      },
      note: async (text) => { await recorder.record(page, screen.screenKey, text); },
      actAndSettle: (action) => actAndSettle(page, action),
      submit: async (action, click) => {
        if (input.dryRun) {
          await recorder.record(page, screen.screenKey, `dry run stop before ${action}`);
          await store.createSubmitIntent({ id: randomUUID(), runId: run.id, filingId: input.filing.id, site, payloadHash: input.filing.payloadHash, createdAt: new Date().toISOString(), outcome: "dry_run_stop", outcomeAt: new Date().toISOString() });
          throw new DryRunStop(screen.screenKey, action);
        }
        if (!input.approval) throw new Error("refusing to submit without an approval record");
        const intent = await store.createSubmitIntent({ id: randomUUID(), runId: run.id, filingId: input.filing.id, site, payloadHash: input.filing.payloadHash, createdAt: new Date().toISOString() });
        await recorder.record(page, screen.screenKey, `submit intent ${intent.id} before ${action}`);
        await click();
        await store.updateSubmitIntent(intent.id, { outcome: "submitted", outcomeAt: new Date().toISOString() });
        await recorder.record(page, screen.screenKey, `after ${action}`);
      },
    };
  }
}

/**
 * Runs an action that may change the page and waits until it has. Government sites do
 * this two ways: a full navigation (NJ formation, MVC), or an ASP.NET partial postback
 * that fetches in the background and rewrites the page in place without navigating (NJ
 * business records; measured 2026-11-17). Settled means: the main frame navigated and its
 * DOM is ready; or the requests the action started have all finished and the page has
 * been quiet briefly; or nothing started within the grace period (a no-op click).
 */
export async function actAndSettle(page: Page, action: () => Promise<void>, timeoutMs = 30_000, graceMs = 1500, quietMs = 500): Promise<void> {
  const main = page.mainFrame();
  let navigated = false, started = 0, inflight = 0, lastActivity = Date.now();
  const tracked = (r: import("playwright").Request) =>
    r.frame() === main && ["document", "xhr", "fetch"].includes(r.resourceType());
  const onReq = (r: import("playwright").Request) => { if (tracked(r)) { started++; inflight++; lastActivity = Date.now(); } };
  const onDone = (r: import("playwright").Request) => { if (tracked(r)) { inflight = Math.max(0, inflight - 1); lastActivity = Date.now(); } };
  const onNav = (f: import("playwright").Frame) => { if (f === main) navigated = true; };
  page.on("request", onReq); page.on("requestfinished", onDone); page.on("requestfailed", onDone); page.on("framenavigated", onNav);
  const t0 = Date.now();
  try {
    await action();
    while (Date.now() - t0 < timeoutMs) {
      if (navigated) break;
      if (started === 0 && Date.now() - t0 > graceMs) break;
      if (started > 0 && inflight === 0 && Date.now() - lastActivity > quietMs) break;
      await page.waitForTimeout(100);
    }
  } finally {
    page.off("request", onReq); page.off("requestfinished", onDone); page.off("requestfailed", onDone); page.off("framenavigated", onNav);
  }
  await page.waitForLoadState("domcontentloaded").catch(() => {});
}

/** Fills one resolved field according to its kind. Options are chosen by label similarity, then by value. */
export async function fillField(page: Page, f: FieldDescriptor, value: string | boolean): Promise<void> {
  const loc = page.locator(`[data-ke-ref="${f.ref}"]`);
  switch (f.kind) {
    case "checkbox":
      await loc.setChecked(typeof value === "boolean" ? value : /^(true|yes|1|on)$/i.test(value));
      return;
    case "radio": {
      const want = String(value);
      const opt = bestOption(f.options ?? [], want);
      if (!opt?.ref) throw new Error(`radio option "${want}" not found for "${f.label}"`);
      await page.locator(`[data-ke-ref="${opt.ref}"]`).check();
      return;
    }
    case "select": {
      const want = String(value);
      const opt = bestOption(f.options ?? [], want);
      if (!opt) throw new Error(`select option "${want}" not found for "${f.label}"`);
      await loc.selectOption({ value: opt.value });
      return;
    }
    case "file":
      await loc.setInputFiles(String(value));
      return;
    default:
      await loc.fill(String(value));
  }
}

function bestOption(options: { value: string; label: string; ref?: string }[], want: string) {
  let best: { value: string; label: string; ref?: string } | undefined, bestScore = 0;
  for (const o of options) {
    if (o.value === want || normalizeLabel(o.label) === normalizeLabel(want)) return o;
    const s = Math.max(labelScore(want, o.label), labelScore(want, o.value));
    if (s > bestScore) { bestScore = s; best = o; }
  }
  return bestScore >= 0.5 ? best : undefined;
}
