import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { DbVault, ChainVault } from "../src/settings/db-vault.js";
import { EnvVault } from "../src/settings/vault.js";
import { FieldCipher } from "../src/store/sensitive.js";
import { seededStore, wire } from "./helpers.js";

/** V29: state portal logins connected in the dashboard, sealed in the database, never sent back. */

let app: FastifyInstance;
let store: Awaited<ReturnType<typeof seededStore>>;
let secrets: DbVault;

beforeAll(async () => {
  store = await seededStore();
  secrets = new DbVault(store, FieldCipher.fromSpec("d".repeat(64))!);
  const w = wire(store);
  app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" }, secrets });
  await app.ready();
});
afterAll(async () => { await app.close(); });

describe("portal logins (V29)", () => {
  it("seals a connected login, shows only when and by whom, and the engine can read it", async () => {
    const r = await app.inject({ method: "PUT", url: "/v1/account/portal-logins/nj-portal", headers: { "x-api-key": "k1" }, payload: { username: "keystone-nj", password: "s3cret-pass", totpSeed: "JBSW Y3DP EHPK 3PXP" } });
    expect(r.statusCode).toBe(200);
    expect(JSON.stringify(r.json())).not.toContain("s3cret-pass");
    const raw = await store.getVaultSecret("keystone/NJ");
    expect(raw).toMatch(/^enc:v1:/);
    expect(raw).not.toContain("s3cret-pass");
    const setup = (await app.inject({ method: "GET", url: "/v1/account/setup", headers: { "x-api-key": "k1" } })).json();
    expect(setup.portalLogins["nj-portal"].connectedAt).toBeTruthy();
    expect(JSON.stringify(setup)).not.toContain("s3cret-pass");
    // The engine reads it through the vault chain (connected logins first, then environment variables).
    const vault = new ChainVault([secrets, new EnvVault({})]);
    expect(await vault.getCredential("keystone/NJ")).toEqual({ username: "keystone-nj", password: "s3cret-pass", totpSeed: "JBSWY3DPEHPK3PXP" });
    expect((await store.getTenant("keystone"))!.njAccountCredentialKey).toBe("NJ");
  });

  it("disconnects, and refuses unknown portals and bad authenticator keys", async () => {
    expect((await app.inject({ method: "PUT", url: "/v1/account/portal-logins/nowhere", headers: { "x-api-key": "k1" }, payload: { username: "a", password: "b" } })).statusCode).toBe(404);
    expect((await app.inject({ method: "PUT", url: "/v1/account/portal-logins/ny-dos", headers: { "x-api-key": "k1" }, payload: { username: "a", password: "b", totpSeed: "not a key!" } })).statusCode).toBe(422);
    const d = await app.inject({ method: "DELETE", url: "/v1/account/portal-logins/nj-portal", headers: { "x-api-key": "k1" } });
    expect(d.statusCode).toBe(200);
    expect(await store.getVaultSecret("keystone/NJ")).toBeNull();
    expect((await app.inject({ method: "DELETE", url: "/v1/account/portal-logins/nj-portal", headers: { "x-api-key": "k1" } })).statusCode).toBe(404);
  });
});
