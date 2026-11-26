import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { startFixtureServer } from "../fixtures/serve.js";
import { RunExecutor } from "../src/orchestrator/run.js";
import { BrowserHarness } from "../src/browser/harness.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import type { RunRecord } from "../src/store/types.js";
import { FilingRequest } from "../src/domain/filing.js";
import { validateFiling, hasErrors } from "../src/domain/validation.js";
import { renderName } from "../src/domain/name.js";
import { expectedFees } from "../src/fees/table.js";
import { adapterFor, moFormationAdapter } from "../src/adapters/index.js";
import { moAccount } from "../src/settings/accounts.js";
import { TenantSettings, ClientCompanySettings } from "../src/settings/schema.js";
import { preflight, unknownBalanceProvider } from "../src/orchestrator/preflight.js";
import { ApprovalService } from "../src/approvals/service.js";
import { InMemoryVault } from "../src/settings/vault.js";
import { seededStore, wire, SECRET } from "./helpers.js";
import { irsEinAdapter } from "../src/adapters/index.js";

const MO_ADDR = { street1: "1 Capitol Ave", city: "Jefferson City", state: "MO", zip: "65101" };
function moFiling(overrides = {}) {
  return {
    tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: `mo-${Math.random().toString(36).slice(2)}`,
    type: "formation", state: "MO",
    formation: {
      name: { baseName: "Ozark Ridge Holdings", designator: "LLC" },
      managementStructure: "member_managed", purpose: "Any lawful purpose.",
      registeredAgent: { name: "Ozark Agents LLC", address: MO_ADDR },
      organizers: [{ name: "Dana Fields", address: MO_ADDR }],
      moSigner: { name: "Dana Fields", title: "Organizer" },
      mainBusinessAddress: MO_ADDR,
      duration: "perpetual",
    },
    contact: { firstName: "Dana", lastName: "Fields", phone: "5735550100", email: "dana@example.test" },
    ...overrides,
  };
}
void SECRET;

describe("Missouri domain", () => {
  it("renders the name with the indicator in the single field (like NY)", () => {
    expect(renderName({ baseName: "Ozark Ridge Holdings", designator: "LLC" }, "MO")).toEqual({ nameField: "Ozark Ridge Holdings LLC" });
  });
  it("accepts a complete MO formation", () => {
    expect(hasErrors(validateFiling(FilingRequest.parse(moFiling())))).toBe(false);
  });
  it("requires an MO registered agent address, management, purpose, organizer and principal office", () => {
    const req = FilingRequest.parse(moFiling());
    req.formation!.registeredAgent!.address!.state = "NJ";
    req.formation!.organizers = [];
    req.formation!.purpose = "";
    const paths = validateFiling(req).map((i) => i.path);
    expect(paths).toEqual(expect.arrayContaining(["formation.registeredAgent.address.state", "formation.organizers", "formation.purpose"]));
  });
  it("caps online organizers at five and refuses Series LLC", () => {
    const req = FilingRequest.parse(moFiling());
    req.formation!.organizers = Array.from({ length: 6 }, (_, i) => ({ name: `Org ${i}`, address: MO_ADDR }));
    req.formation!.seriesLlc = true;
    const paths = validateFiling(req).map((i) => i.path);
    expect(paths).toContain("formation.organizers");
    expect(paths).toContain("formation.seriesLlc");
  });
});

describe("Missouri fees", () => {
  it("online formation is $50, good standing $10 flat", () => {
    expect(expectedFees("MO", "formation", { paymentMethod: "credit_card" }).reduce((s, l) => s + l.amountUsd, 0)).toBe(50);
    expect(expectedFees("MO", "standing_certificate", { paymentMethod: "echeck" }).reduce((s, l) => s + l.amountUsd, 0)).toBe(10);
  });
  it("MO good standing needs no entity type (unlike NJ)", () => {
    expect(() => expectedFees("MO", "standing_certificate", { paymentMethod: "credit_card" })).not.toThrow();
  });
});

describe("Missouri account and adapter", () => {
  const tenant = TenantSettings.parse({ tenantId: "keystone", name: "Keystone", moAccountCredentialKey: "MO", moPaymentMethod: "echeck" });
  const client = ClientCompanySettings.parse({ clientCompanyId: "acme", tenantId: "keystone", name: "Acme" });
  it("uses the service company's Missouri login and its payment method", () => {
    expect(moAccount(tenant, client)).toMatchObject({ credentialKey: "keystone/MO", profileKey: "mo:keystone", feeMethod: "echeck", paymentTypeLabel: "Electronic Check", owner: "tenant" });
  });
  it("routes MO formation to the Missouri adapter, which is dry-run only", () => {
    expect(adapterFor(FilingRequest.parse(moFiling()))).toBe(moFormationAdapter);
    expect(moFormationAdapter.complete).toBe(false);
    expect(moFormationAdapter.site).toBe("MO");
  });
  it("pre-flight blocks a real MO run with no login, and the unmapped adapter", async () => {
    const store = await seededStore();
    const approvals = new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 24 });
    const filing = { id: "f", tenantId: "keystone", clientCompanyId: "acme-cpa", idempotencyKey: "k", status: "queued" as const, request: FilingRequest.parse(moFiling({ dryRun: false })), payloadHash: "h", createdAt: "", updatedAt: "", artifacts: [] };
    const pf = await preflight({
      filing, approval: null, tenant: (await store.getTenant("keystone"))!, client: (await store.getClientCompany("acme-cpa"))!,
      adapter: moFormationAdapter, einAdapter: irsEinAdapter, approvals, vault: new InMemoryVault(), balances: unknownBalanceProvider, dryRun: false,
    });
    expect(pf.ok).toBe(false);
    expect(pf.blockers.join(" ")).toMatch(/not fully mapped|Missouri login/);
  });
});

describe("Missouri formation fill steps (dry run over a replica built from the state's guide)", () => {
  // fixtures/mo-formation follows the guide's screen order with the adapter's provisional labels;
  // the live site has not been walked, so this checks the steps' logic, not Missouri's wording.
  let fx: Awaited<ReturnType<typeof startFixtureServer>>;
  let harness: BrowserHarness;
  let store: Awaited<ReturnType<typeof seededStore>>;
  let artifacts: FsArtifactStore;
  let w: ReturnType<typeof wire>;
  beforeAll(async () => {
    fx = await startFixtureServer();
    harness = new BrowserHarness({ chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles" });
    store = await seededStore();
    artifacts = new FsArtifactStore("var/test-artifacts");
    const executor = new RunExecutor({ store, artifacts, harness, drift: new DriftReviewService(store), vault: { getCredential: async () => null }, firstObservationPolicy: "accept" });
    w = wire(store, { executor });
  });
  afterAll(async () => { await harness.close(); await fx.close(); delete process.env.MO_FORMATION_URL; });

  async function run(entry: string, over: Record<string, unknown> = {}) {
    process.env.MO_FORMATION_URL = `${fx.url}/mo-formation/${entry}`;
    const { filing, approvalLink } = await w.service.createFiling(moFiling({ dryRun: true, ...over }));
    await w.service.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", {});
    await w.service.runFiling(filing.id);
    const f = (await store.getFiling(filing.id))!;
    return { filing: f, run: (await store.getRun(f.currentRunId!))! };
  }
  async function domOf(r: RunRecord, screenKey: string) {
    const step = r.steps.find((s) => s.screenKey === screenKey && s.note === "filled")!;
    for (const id of step.artifactIds) {
      const a = await artifacts.get(id);
      if (a?.meta.kind === "dom_snapshot") return a.body.toString("utf8").replace(/<script\b[\s\S]*?<\/script>/g, "");
    }
    throw new Error(`no DOM snapshot for ${screenKey}`);
  }
  const valueOf = (html: string, id: string) => new RegExp(`id="${id}"[^>]*value="([^"]*)"`).exec(html)?.[1];

  it("fills every screen from the filing and stops before Payment on the cart", async () => {
    const { run: r } = await run("dashboard.html", { formation: { ...moFiling().formation, organizers: [{ name: "Dana Fields", address: MO_ADDR }, { name: "Lee Park", address: { ...MO_ADDR, street1: "2 Main St" } }] } });
    expect(r.status).toBe("completed");
    expect(r.error).toContain('dry run stopped before "Payment"');
    const screens = r.steps.map((s) => s.screenKey);
    for (const k of ["mo.dashboard", "mo.entity_type", "mo.details", "mo.registered_agent", "mo.organizers", "mo.principal_office", "mo.review", "mo.signer", "mo.cart"]) expect(screens).toContain(k);
    expect(screens).not.toContain("mo.login"); // a signed-in session goes straight to the dashboard
    const d = await domOf(r, "mo.details");
    expect(valueOf(d, "nm")).toBe("Ozark Ridge Holdings LLC");
    expect(valueOf(d, "dur")).toBe("perpetual");
    expect(d).toMatch(/value="MEM"[^>]*checked/);
    expect(valueOf(await domOf(r, "mo.registered_agent"), "ra-name")).toBe("Ozark Agents LLC");
    const notes = r.steps.map((s) => s.note ?? "");
    expect(notes).toContain("organizer saved: Dana Fields");
    expect(notes).toContain("organizer saved: Lee Park");
    expect(await domOf(r, "mo.review")).toMatch(/id="ack"[^>]*checked/);
    const s = await domOf(r, "mo.signer");
    expect(valueOf(s, "sg")).toBe("Dana Fields");
    expect(valueOf(s, "sg-title")).toBe("Organizer");
    expect(notes).toContain("fee check: ok");
  });

  it("stops with a clear message when the session is not signed in", async () => {
    const { filing } = await run("login.html");
    expect(filing.status).toBe("failed");
    expect(filing.lastError).toMatch(/MO: the sign-in page is showing; no Missouri login is set for this run, and typing the stored login is not built/);
  });
});

describe("Missouri filing creation", () => {
  it("creates an MO formation and sends it for approval in a dry run", async () => {
    const store = await seededStore();
    const { service } = wire(store);
    const { filing, approvalLink, issues } = await service.createFiling(moFiling({ dryRun: true }));
    expect(issues.filter((i) => i.severity === "error")).toEqual([]);
    expect(filing.status).toBe("awaiting_approval");
    expect(approvalLink).toBeDefined();
  });
});
