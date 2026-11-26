import { afterAll, beforeAll, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildServer } from "../src/api/server.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { normalizeDomain, ResendDomains } from "../src/comms/resend-domains.js";
import { seededStore, wire } from "./helpers.js";

// Decision 37: a firm connects its own email domain (merged spec 10B.5.1), through a stand-in for Resend's domains API.

const calls: { method: string; path: string; body?: unknown }[] = [];
let verified = false;
const fakeResend: typeof fetch = async (input, init) => {
  const url = new URL(String(input));
  const method = init?.method ?? "GET";
  const body = init?.body ? JSON.parse(String(init.body)) : undefined;
  calls.push({ method, path: url.pathname, body });
  const state = (name: string) => ({
    id: "dom_1", name, status: verified ? "verified" : "pending",
    records: [
      { record: "SPF", type: "TXT", name: "send", value: "v=spf1 include:amazonses.com ~all", status: verified ? "verified" : "not_started" },
      { record: "DKIM", type: "TXT", name: "resend._domainkey", value: "p=MIGf…", status: verified ? "verified" : "not_started" },
    ],
  });
  if (method === "POST" && url.pathname === "/domains") return new Response(JSON.stringify(state(body.name)), { status: 200 });
  if (method === "GET" && url.pathname === "/domains/dom_1") return new Response(JSON.stringify(state("harborpine.com")), { status: 200 });
  if (method === "POST" && url.pathname === "/domains/dom_1/verify") return new Response(JSON.stringify({ object: "domain", id: "dom_1" }), { status: 200 });
  if (method === "DELETE" && url.pathname === "/domains/dom_1") return new Response(JSON.stringify({ deleted: true }), { status: 200 });
  return new Response(JSON.stringify({ message: "not found" }), { status: 404 });
};

let app: FastifyInstance;
let store: Awaited<ReturnType<typeof seededStore>>;
const as = (key: string) => ({ "x-api-key": key });

beforeAll(async () => {
  store = await seededStore();
  const w = wire(store);
  app = buildServer({
    service: w.service, approvals: w.approvals, store, artifacts: new FsArtifactStore("var/test-artifacts"), publicBaseUrl: "http://api.test",
    apiKeys: { k1: "keystone", k2: "other-co" }, sessionSecret: "session-secret-for-tests-0123456789", platformTenantId: "keystone", partnerSignupMode: "automatic",
    webBaseUrl: "http://web.test",
    emailDomains: new ResendDomains({ apiKey: "re_test", apiBase: "http://resend.test", fetchImpl: fakeResend }), platformEmailDomains: ["cofile.app"],
  });
  await app.ready();
  await app.inject({ method: "PUT", url: "/v1/client-companies/harbor", headers: as("k1"), payload: { name: "Harbor & Pine CPA", portal: { displayName: "Harbor & Pine CPA" } } });
});
afterAll(async () => { await app.close(); });

describe("a firm's own email domain", () => {
  it("cleans what the firm types, and refuses free mail and our own domain", () => {
    expect(normalizeDomain("https://www.HarborPine.com/")).toEqual({ ok: true, domain: "harborpine.com" });
    expect(normalizeDomain("not a domain")).toEqual({ ok: false, reason: "invalid" });
    expect(normalizeDomain("gmail.com")).toEqual({ ok: false, reason: "unusable" });
    expect(normalizeDomain("mail.cofile.app", ["cofile.app"])).toEqual({ ok: false, reason: "unusable" });
  });

  it("starts with none", async () => {
    const r = await app.inject({ method: "GET", url: "/v1/client-companies/harbor/email-domain", headers: as("k1") });
    expect(r.json()).toEqual({ emailDomain: null, records: [], available: true });
  });

  it("adds a domain, returns the records to set, and keeps it pending until they're found", async () => {
    const r = await app.inject({ method: "PUT", url: "/v1/client-companies/harbor/email-domain", headers: as("k1"), payload: { domain: "www.harborpine.com" } });
    expect(r.statusCode).toBe(200);
    expect(r.json().emailDomain).toMatchObject({ domain: "harborpine.com", status: "pending", providerId: "dom_1" });
    expect(r.json().records).toHaveLength(2);
    expect(r.json().records[0]).toMatchObject({ type: "TXT", name: "send", status: "missing" });
    expect(calls.find((c) => c.method === "POST" && c.path === "/domains")?.body).toEqual({ name: "harborpine.com" });
    expect((await store.getClientCompany("harbor"))!.portal!.emailDomain?.status).toBe("pending");
  });

  it("refuses a domain that can't be used, before calling the provider", async () => {
    const before = calls.length;
    const r = await app.inject({ method: "PUT", url: "/v1/client-companies/harbor/email-domain", headers: as("k1"), payload: { domain: "gmail.com" } });
    expect(r.statusCode).toBe(422);
    expect(r.json().issues[0]).toEqual({ path: "domain", message: "unusable" });
    expect(calls.length).toBe(before);
  });

  it("checks again and records the domain as verified once its records are found", async () => {
    verified = true;
    const r = await app.inject({ method: "POST", url: "/v1/client-companies/harbor/email-domain/check", headers: as("k1") });
    expect(r.json().emailDomain.status).toBe("verified");
    expect(r.json().records.every((x: { status: string }) => x.status === "found")).toBe(true);
    expect((await store.getClientCompany("harbor"))!.portal!.emailDomain?.status).toBe("verified");
  });

  it("is another tenant's business only through its own key", async () => {
    const r = await app.inject({ method: "GET", url: "/v1/client-companies/harbor/email-domain", headers: as("k2") });
    expect(r.statusCode).toBe(404);
  });

  it("disconnects: the provider's domain is removed and client emails go back to the platform's address", async () => {
    const r = await app.inject({ method: "DELETE", url: "/v1/client-companies/harbor/email-domain", headers: as("k1") });
    expect(r.json().emailDomain).toBeNull();
    expect(calls.some((c) => c.method === "DELETE" && c.path === "/domains/dom_1")).toBe(true);
    expect((await store.getClientCompany("harbor"))!.portal!.emailDomain).toBeUndefined();
  });
});
