import { generateKeyPairSync, createSign } from "node:crypto";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { GoogleIdTokens } from "../src/users/google.js";
import type { MemoryStore } from "../src/store/memory.js";
import { seededStore, wire } from "./helpers.js";

/** V37: Sign in with Google, for existing accounts; the engine checks Google's ID token itself. */

const CLIENT = "client-123.apps.googleusercontent.com";
const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const jwk = { ...publicKey.export({ format: "jwk" }), kid: "k1", alg: "RS256", use: "sig" };
const enc = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");
function token(claims: Record<string, unknown>, kid = "k1", key = privateKey) {
  const head = enc({ alg: "RS256", kid, typ: "JWT" });
  const body = enc({ iss: "https://accounts.google.com", aud: CLIENT, sub: "g-1", email_verified: true, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 600, nonce: "n-1", ...claims });
  const sig = createSign("RSA-SHA256").update(`${head}.${body}`).sign(key).toString("base64url");
  return `${head}.${body}.${sig}`;
}

let store: MemoryStore;
let app: FastifyInstance;
let certFetches = 0;
beforeAll(async () => {
  store = await seededStore();
  const user = (email: string, over: object) => store.createUser({ id: email, email, name: "x", kind: "partner", tenantId: "keystone", clientCompanyId: "acme-cpa", status: "active", passwordHash: "x", sessionGen: 0, createdAt: new Date().toISOString(), ...over } as never);
  await user("pat@acme.test", {});
  await user("new@acme.test", { emailVerification: { tokenHash: "x", expiresAt: "2099-01-01T00:00:00Z" } });
  await user("off@acme.test", { status: "disabled" });
  const google = new GoogleIdTokens({ clientId: CLIENT, fetchImpl: (async () => { certFetches++; return Response.json({ keys: [jwk] }, { headers: { "cache-control": "public, max-age=3600" } }); }) as unknown as typeof fetch });
  const w = wire(store);
  app = buildServer({ service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test", apiKeys: { k1: "keystone" }, sessionSecret: "session-secret-for-tests-0123456789", google });
  await app.ready();
});
afterAll(async () => { await app.close(); });

const signIn = (idToken: string, nonce = "n-1") => app.inject({ method: "POST", url: "/v1/auth/google", payload: { idToken, nonce } });

describe("Sign in with Google", () => {
  it("signs in an existing account and its session works", async () => {
    const r = await signIn(token({ email: "Pat@Acme.test" }));
    expect(r.statusCode).toBe(200);
    expect(r.json().user.email).toBe("pat@acme.test");
    const me = await app.inject({ method: "GET", url: "/v1/me", headers: { "x-api-key": r.json().sessionKey } });
    expect(me.json().user.email).toBe("pat@acme.test");
    await signIn(token({ email: "pat@acme.test" }));
    expect(certFetches).toBe(1); // Google's keys are cached
  });

  it("refuses anything Google didn't sign for us", async () => {
    const other = generateKeyPairSync("rsa", { modulusLength: 2048 }).privateKey;
    for (const t of [
      token({ email: "pat@acme.test" }, "k1", other),           // not Google's signature
      token({ email: "pat@acme.test", aud: "someone-else" }),   // another app's token
      token({ email: "pat@acme.test", iss: "https://evil.test" }),
      token({ email: "pat@acme.test", exp: Math.floor(Date.now() / 1000) - 3600 }),
      token({ email: "pat@acme.test", email_verified: false }),
      token({ email: "pat@acme.test" }, "unknown-kid"),
      "not.a.token",
    ]) expect((await signIn(t)).statusCode).toBe(401);
    expect((await signIn(token({ email: "pat@acme.test" }), "another-nonce")).statusCode).toBe(401);
  });

  it("needs an account, confirms an unconfirmed email, and keeps disabled accounts out", async () => {
    const none = await signIn(token({ email: "stranger@gmail.test" }));
    expect(none.statusCode).toBe(404);
    expect(none.json().status).toBe("no_account");
    expect((await signIn(token({ email: "new@acme.test" }))).statusCode).toBe(200);
    expect((await store.findUserByEmail("new@acme.test"))!.emailVerifiedAt).toBeTruthy();
    expect((await signIn(token({ email: "off@acme.test" }))).statusCode).toBe(403);
  });
});
