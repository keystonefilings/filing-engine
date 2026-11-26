import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { RunExecutor } from "../src/orchestrator/run.js";
import { BrowserHarness } from "../src/browser/harness.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { DriftReviewService } from "../src/drift-review/service.js";
import { ApprovalService } from "../src/approvals/service.js";
import { WebhookDispatcher } from "../src/webhooks/dispatcher.js";
import { InMemoryQueue } from "../src/orchestrator/queue.js";
import { InMemoryVault } from "../src/settings/vault.js";
import { FilingService } from "../src/orchestrator/service.js";
import { Notifier } from "../src/comms/notifier.js";
import { buildServer } from "../src/api/server.js";
import { CardCodes, CODE_MIN_LEFT_MS } from "../src/payments/card-codes.js";
import { PaymentSettings } from "../src/settings/payments.js";
import type { CardVault } from "../src/payments/card-vault.js";
import type { ChannelSender, OutboundMessage } from "../src/comms/senders.js";
import type { SiteAdapter } from "../src/adapters/types.js";
import type { MemoryStore } from "../src/store/memory.js";
import { seededStore, njFormationRequest, SECRET } from "./helpers.js";

/**
 * V18: a stored card's security code can't be kept (PCI DSS), so the card's owner gives it for the
 * hour when filings are ready to pay; every filing waiting for that card then goes ahead.
 */

const CARD = "11111111-1111-4111-8111-111111111111", CODE = "33333333-3333-4333-8333-333333333333";

describe("card code store", () => {
  it("keeps a code at most an hour, and a run needs a quarter hour of it left", async () => {
    const store = await seededStore();
    let now = new Date("2026-11-25T10:00:00Z");
    const codes = new CardCodes(store, () => now);
    const owner = { tenantId: "keystone", clientCompanyId: "acme-cpa" };
    expect(await codes.put(owner, "card1", CODE, "2026-11-26T10:00:00Z")).toBe("2026-11-25T11:00:00.000Z");
    expect(await codes.fresh(owner, "card1", CODE_MIN_LEFT_MS)).toBe(CODE);
    expect(await codes.fresh({ tenantId: "keystone" }, "card1")).toBeNull(); // another owner's card of the same id
    now = new Date("2026-11-25T10:50:00Z");
    expect(await codes.fresh(owner, "card1", CODE_MIN_LEFT_MS)).toBeNull();
    expect(await codes.fresh(owner, "card1")).toBe(CODE);
    now = new Date("2026-11-25T11:00:01Z");
    expect(await codes.fresh(owner, "card1")).toBeNull();
    expect(await store.getVaultSecret("cardcode:keystone:acme-cpa:card1")).toBeNull(); // deleted once expired
  });
});

class Outbox implements ChannelSender {
  readonly channel = "email" as const;
  readonly sent: { address: string; msg: OutboundMessage }[] = [];
  async send(to: { address: string }, msg: OutboundMessage) { this.sent.push({ address: to.address, msg }); return { ok: true }; }
}

/** A state checkout that takes a card: the receipt shows what was typed. */
const checkout = `data:text/html,${encodeURIComponent(`<html><body><h1>Payment</h1><label>Card number <input id="num"></label><label>Security code <input id="cvc"></label>
<button onclick="document.body.innerHTML='<h1>Receipt R-9</h1><p>card '+document.getElementById('num').value.slice(-4)+' code '+document.getElementById('cvc').value+'</p>'">Pay</button></body></html>`)}`;
const adapter: SiteAdapter = {
  site: "FL", key: "test-card-checkout", complete: true, paysWithCard: true, entryUrl: () => checkout, profileKey: () => null, credentialKey: () => null,
  steps: [{
    screen: { screenKey: "t.pay", title: "Payment", intents: [] }, reviewScreen: true,
    async fill(ctx) {
      const [card] = await ctx.paymentCards!();
      await ctx.page.fill("#num", card!.number);
      await ctx.page.fill("#cvc", card!.cvc ?? "");
    },
    async advance(ctx) { await ctx.submit("Pay", () => ctx.clickButton(/^pay$/i)); },
  }],
  async confirmSubmission(ctx) {
    const t = await ctx.page.locator("body").innerText();
    return /Receipt R-9/.test(t) ? { reference: "R-9", detail: t } : null;
  },
};
const cardVault: CardVault = {
  async getCard(id) { return id === CARD ? { number: "4242424242424242", expMonth: 12, expYear: 2030 } : null; },
  async getCode(id) { return id === CODE ? "123" : null; },
};

let harness: BrowserHarness;
let store: MemoryStore;
let service: FilingService;
let outbox: Outbox;
let app: FastifyInstance;
const artifacts = new FsArtifactStore("var/test-artifacts");

beforeAll(async () => {
  harness = new BrowserHarness({ chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles" });
  store = await seededStore();
  // acme-cpa pays the state from its own account (G1), with one saved card.
  await store.putClientCompany({ ...(await store.getClientCompany("acme-cpa"))!, payments: PaymentSettings.parse({ methods: [{ id: "card1", label: "Firm Visa", provider: "basis_theory", providerRef: CARD, last4: "4242" }], routing: { defaultMethodId: "card1" } }) });
  const user = (email: string, over: object) => store.createUser({ id: email, email, name: email.split("@")[0]!, kind: "enterprise", tenantId: "keystone", status: "active", passwordHash: "x", sessionGen: 0, createdAt: new Date().toISOString(), ...over } as never);
  await user("ops@keystone.test", {});
  await user("pat@acme.test", { kind: "partner", clientCompanyId: "acme-cpa" });
  outbox = new Outbox();
  const approvals = new ApprovalService({ store, signingSecret: SECRET, publicBaseUrl: "http://api.test", defaultTtlHours: 168 });
  const cardCodes = new CardCodes(store);
  const executor = new RunExecutor({ store, artifacts, harness, drift: new DriftReviewService(store), vault: { getCredential: async () => null }, firstObservationPolicy: "accept", cardVault, cardCodes });
  service = new FilingService({
    store, approvals, webhooks: new WebhookDispatcher(store, async () => ({ status: 200 })), queue: new InMemoryQueue(), vault: new InMemoryVault(),
    drift: new DriftReviewService(store), executor, cardCodes, dryRunDefault: false, adapterFor: () => adapter,
    notifier: new Notifier({ store, senders: { email: outbox }, publicBaseUrl: "http://api.test", artifacts, webBaseUrl: "http://web.test" }),
  });
  app = buildServer({ service, approvals, store, artifacts, publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" } });
  await app.ready();
});
afterAll(async () => { await app.close(); await harness.close(); });

async function approved() {
  const { filing } = await service.createFiling(njFormationRequest({ dryRun: false }));
  const a = (await store.getApproval((await store.getFiling(filing.id))!.currentApprovalId!))!;
  await service.onApprovalDecision(a.token, "approve", {});
  return filing.id;
}

describe("paying with a stored card", () => {
  it("waits for the owner's code, emails the firm once, then files every waiting filing with it", async () => {
    const first = await approved();
    await service.runFiling(first);
    const f1 = (await store.getFiling(first))!;
    expect(f1.status).toBe("blocked");
    expect(f1.awaitingCardCode).toMatchObject({ methodId: "card1", last4: "4242", owner: { clientCompanyId: "acme-cpa" } });
    const asks = () => outbox.sent.filter((m) => m.msg.subject.startsWith("Card security code needed"));
    expect(asks().map((m) => m.address)).toEqual(["pat@acme.test"]); // the firm's own user, not the subscriber's staff
    expect(asks()[0]!.msg.link).toBe("http://web.test/dashboard/pay");
    expect(asks()[0]!.msg.body).toMatch(/Firm Visa ending 4242/);

    const second = await approved();
    await service.runFiling(second);
    expect((await store.getFiling(second))!.status).toBe("blocked");
    expect(asks()).toHaveLength(1); // one email per card while filings wait

    const list = await app.inject({ method: "GET", url: "/v1/client-companies/acme-cpa/card-codes", headers: { "x-api-key": "k1" } });
    expect(list.json().waiting).toEqual([expect.objectContaining({ methodId: "card1", card: "Firm Visa", codePath: "/v1/client-companies/acme-cpa/payment-methods/card1/code" })]);
    expect(list.json().waiting[0].filings.map((f: { id: string }) => f.id).sort()).toEqual([first, second].sort());
    expect((await app.inject({ method: "GET", url: "/v1/account/card-codes", headers: { "x-api-key": "k1" } })).json().waiting[0].owner.name).toBeTruthy();

    const post = (body: object, url = "/v1/client-companies/acme-cpa/payment-methods/card1/code") => app.inject({ method: "POST", url, headers: { "x-api-key": "k1" }, payload: body });
    expect((await post({ tokenId: "4242424242424242" })).statusCode).toBe(422);
    expect((await post({ tokenId: CODE }, "/v1/client-companies/acme-cpa/payment-methods/nope/code")).statusCode).toBe(404);
    expect((await post({ tokenId: CODE }, "/v1/account/payment-methods/card1/code")).statusCode).toBe(404); // not the subscriber's card
    const ok = await post({ tokenId: CODE });
    expect(ok.statusCode).toBe(200);
    expect(ok.json().queued.sort()).toEqual([first, second].sort());
    expect((await store.getFiling(first))!).toMatchObject({ status: "queued", awaitingCardCode: undefined });

    await service.runFiling(first);
    const done = (await store.getFiling(first))!;
    expect(done.status).toBe("submitted");
    expect([...store.intents.values()].find((i) => i.filingId === first && i.evidence)?.evidence?.detail).toContain("card 4242 code 123");
    const run = (await store.getRun(done.currentRunId!))!;
    expect(JSON.stringify(run)).not.toContain("4242424242424242");
    expect((await app.inject({ method: "GET", url: "/v1/client-companies/acme-cpa/card-codes", headers: { "x-api-key": "k1" } })).json().waiting).toEqual([]);
  });

  it("practice runs never wait for a code", async () => {
    const { filing } = await service.createFiling(njFormationRequest({ dryRun: true }));
    await service.runFiling(filing.id, { dryRun: true });
    expect((await store.getFiling(filing.id))!.awaitingCardCode).toBeUndefined();
  });
});
