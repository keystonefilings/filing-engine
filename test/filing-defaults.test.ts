import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { applyPolicies } from "../src/settings/policies.js";
import { seededStore, wire, njFormationRequest } from "./helpers.js";

/** V30 (portal defaults read, filing defaults set by the subscriber) and V31 (copy address). */

let app: FastifyInstance;
let store: Awaited<ReturnType<typeof seededStore>>;
beforeAll(async () => {
  store = await seededStore();
  const w = wire(store);
  app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" } });
  await app.ready();
});
afterAll(async () => { await app.close(); });
const put = (url: string, payload: object) => app.inject({ method: "PUT", url, headers: { "x-api-key": "k1" }, payload });

describe("subscriber defaults (V30, V31)", () => {
  it("portal defaults fill what a New York filing leaves unset, never what it says", async () => {
    expect((await put("/v1/account/portal-defaults/ny-dos", { certifiedCopy: true, plainCopy: true, certificateOfExistence: false })).statusCode).toBe(200);
    const tenant = (await store.getTenant("keystone"))!;
    const client = (await store.getClientCompany("acme-cpa"))!;
    const ny = njFormationRequest({ state: "NY" } as never) as any;
    delete ny.formation.additionalCertificates;
    const r = applyPolicies(ny, tenant, client);
    expect((r.request as any).formation.additionalCertificates).toMatchObject({ certifiedCopy: true, plainCopy: true, certificateOfStanding: false });
    expect(r.provenance["formation.additionalCertificates.certifiedCopy"]).toBe("portal default (ny-dos)");
    const own = njFormationRequest({ state: "NY" } as never) as any;
    own.formation.additionalCertificates = { certifiedCopy: false };
    expect((applyPolicies(own, tenant, client).request as any).formation.additionalCertificates.certifiedCopy).toBe(false);
  });

  it("the subscriber names its organizer, filer, signer, agents and copy address itself", async () => {
    const r = await put("/v1/account/filing-defaults", {
      organizer: { name: "Acme Filings LLC", address: { street1: "1 Main St", city: "Albany", state: "NY", zip: "12207" } },
      copyEmail: "Copies@Acme.test",
      registeredAgents: { NJ: { name: "Acme Agents NJ", address: { street1: "9 Agent Way", city: "Newark", state: "NJ", zip: "07102" } } },
    });
    expect(r.statusCode).toBe(200);
    const t = (await store.getTenant("keystone"))!;
    expect(t.organizer?.name).toBe("Acme Filings LLC");
    expect(t.copyEmail).toBe("copies@acme.test");
    expect(t.registeredAgentProvisioning?.selfByState?.NJ?.name).toBe("Acme Agents NJ");
    // A field left out keeps its value; null clears it; agents must be in their own state.
    await put("/v1/account/filing-defaults", { copyEmail: null });
    expect((await store.getTenant("keystone"))!.organizer?.name).toBe("Acme Filings LLC");
    expect((await store.getTenant("keystone"))!.copyEmail).toBeUndefined();
    expect((await put("/v1/account/filing-defaults", { registeredAgents: { FL: { name: "X Agents", address: { street1: "1 A St", city: "Miami", state: "NY", zip: "33101" } } } })).statusCode).toBe(422);
    const setup = (await app.inject({ method: "GET", url: "/v1/account/setup", headers: { "x-api-key": "k1" } })).json();
    expect(setup.filingDefaults.organizer.name).toBe("Acme Filings LLC");
  });
});
