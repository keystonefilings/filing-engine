import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { BasisTheoryCardVault, cardRefsForFiling, cardsForPayment, type CardVault } from "../src/payments/card-vault.js";
import { PaymentSettings } from "../src/settings/payments.js";
import type { FilingRecord } from "../src/store/types.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";

/** V18 (decision 8): customers' own cards in Basis Theory; the engine keeps only tokens. */

const T1 = "11111111-1111-1111-1111-111111111111", T2 = "22222222-2222-2222-2222-222222222222", CVC = "33333333-3333-3333-3333-333333333333";

describe("Basis Theory card vault", () => {
  it("reads a card token with the private key and maps it", async () => {
    const calls: { url: string; key?: string }[] = [];
    const vault = new BasisTheoryCardVault({ apiKey: "key_priv", fetchImpl: (async (url: string, init: { headers: Record<string, string> }) => {
      calls.push({ url, key: init.headers["BT-API-KEY"] });
      return Response.json({ id: T1, type: "card", data: { number: "4242424242424242", expiration_month: 12, expiration_year: 2030 } });
    }) as never });
    expect(await vault.getCard(T1)).toEqual({ number: "4242424242424242", expMonth: 12, expYear: 2030 });
    expect(calls[0]).toEqual({ url: `https://api.basistheory.com/tokens/${T1}`, key: "key_priv" });
    expect(await vault.getCard("not-a-token")).toBeNull();
  });
});

describe("which cards pay a filing", () => {
  const filing = (kind?: string) => ({ request: { ...njFormationRequest(), intake: kind ? { portal: { kind } } : {} } }) as unknown as FilingRecord;
  const payments = PaymentSettings.parse({
    methods: [
      { id: "a", label: "Amex", provider: "basis_theory", providerRef: T1, last4: "0005" },
      { id: "b", label: "Visa", provider: "basis_theory", providerRef: T2, last4: "4242" },
    ],
    routing: { mode: "per_filing", defaultMethodId: "a", fallbackMethodId: "b", byFilingKind: { "nj-llc": "b" } },
  });
  it("uses the firm's own cards under own_account, by filing type, then the backup, with the CVC from approval", async () => {
    const store = await seededStore();
    const tenant = (await store.getTenant("keystone"))!;
    const client = { ...(await store.getClientCompany("acme-cpa"))!, payments };   // acme-cpa answers G1 = own_account
    expect(cardRefsForFiling(filing("nj-llc"), tenant, client).map((m) => m.id)).toEqual(["b"]);
    expect(cardRefsForFiling(filing("ny-llc"), tenant, client).map((m) => m.id)).toEqual(["a", "b"]);
    const vault: CardVault = { async getCard(id) { return id === CVC ? { number: "", expMonth: 0, expYear: 0, cvc: "123" } : { number: id === T1 ? "378282246310005" : "4242424242424242", expMonth: 1, expYear: 2031 }; } };
    const cards = await cardsForPayment(vault, cardRefsForFiling(filing("ny-llc"), tenant, client), async () => (await vault.getCard(CVC))?.cvc);
    expect(cards.map((c) => [c.label, c.number.slice(-4), c.cvc])).toEqual([["Amex", "0005", "123"], ["Visa", "4242", "123"]]);
  });
});

let app: FastifyInstance;
let store: Awaited<ReturnType<typeof seededStore>>;
beforeAll(async () => {
  store = await seededStore();
  const w = wire(store);
  app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" } });
  await app.ready();
});
afterAll(async () => { await app.close(); });

describe("saving cards (tokens only)", () => {
  it("adds a card as the default, refuses a card number, and removing one clears it from the routing", async () => {
    const add = (body: object) => app.inject({ method: "POST", url: "/v1/account/payment-methods", headers: { "x-api-key": "k1" }, payload: body });
    const a = await add({ provider: "basis_theory", providerRef: T1, label: "Company Amex", brand: "amex", last4: "0005", expMonth: 12, expYear: 2030 });
    expect(a.statusCode).toBe(201);
    const id = a.json().method.id;
    expect((await store.getTenant("keystone"))!.payments!.routing.defaultMethodId).toBe(id);
    expect((await add({ provider: "basis_theory", providerRef: "4242424242424242", label: "x" })).statusCode).toBe(422);
    const d = await app.inject({ method: "DELETE", url: `/v1/account/payment-methods/${id}`, headers: { "x-api-key": "k1" } });
    expect(d.statusCode).toBe(200);
    const p = (await store.getTenant("keystone"))!.payments!;
    expect(p.methods).toHaveLength(0);
    expect(p.routing.defaultMethodId).toBeUndefined();
  });
});

describe("token or card number", () => {
  it("takes real Basis Theory token ids and still refuses anything shaped like a card number", () => {
    const m = (providerRef: string) => PaymentSettings.safeParse({ methods: [{ id: "a", label: "x", provider: "basis_theory", providerRef }] }).success;
    expect(m("550e8400-e29b-41d4-a716-446655440000")).toBe(true);
    expect(m("4242 4242 4242 4242")).toBe(false);
    expect(m("4242-4242-4242-4242")).toBe(false);
    expect(m("tok_4242424242424242")).toBe(false);
  });
});
