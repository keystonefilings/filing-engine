import { describe, it, expect } from "vitest";
import { DEV_SIGNING_SECRET, keyMatches, parseApiKeys, parseStaffKeys, signingSecretFrom } from "../src/api/keys.js";

const STRONG = "3f9c2a7d41b8e6055c1d9e2f7a4b8c60";

describe("production keys and secrets", () => {
  it("keep a development key outside production only", () => {
    expect(parseApiKeys(undefined, false)).toEqual({ "dev-key": "keystone" });
    expect(() => parseApiKeys(undefined, true)).toThrow(/API_KEYS must be set in production/);
    expect(() => parseApiKeys("", true)).toThrow(/API_KEYS must be set/);
  });

  it("refuse placeholder and short keys in production, without echoing them", () => {
    expect(() => parseApiKeys("change-me-long-random-key:keystone", true)).toThrow(/entry 1: use a random key/);
    expect(() => parseApiKeys(`${STRONG}:keystone,short:other`, true)).toThrow(/entry 2/);
    try { parseApiKeys("short:other", true); } catch (e) { expect((e as Error).message).not.toContain("short"); }
    expect(parseApiKeys(`${STRONG}:keystone`, true)).toEqual({ [STRONG]: "keystone" });
    expect(() => parseApiKeys("nokey", false)).toThrow(/entry 1 must look like key:tenantId/);
    expect(() => parseStaffKeys("change-me", true)).toThrow(/PLATFORM_STAFF_KEYS entry 1/);
    expect(parseStaffKeys(undefined, true)).toEqual([]);
  });

  it("require a real approval signing secret in production", () => {
    expect(signingSecretFrom(undefined, false)).toBe(DEV_SIGNING_SECRET);
    expect(() => signingSecretFrom(undefined, true)).toThrow(/APPROVAL_SIGNING_SECRET must be set/);
    expect(() => signingSecretFrom(DEV_SIGNING_SECRET, true)).toThrow(/APPROVAL_SIGNING_SECRET/);
    expect(() => signingSecretFrom("too-short", true)).toThrow(/at least 32/);
    expect(signingSecretFrom(STRONG, true)).toBe(STRONG);
  });

  it("match staff keys exactly", () => {
    expect(keyMatches(STRONG, [STRONG])).toBe(true);
    expect(keyMatches(STRONG.slice(0, -1), [STRONG])).toBe(false);
    expect(keyMatches("", [""])).toBe(false);
    expect(keyMatches(STRONG, [])).toBe(false);
  });
});
