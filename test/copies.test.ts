import { describe, expect, it } from "vitest";
import { copyCc } from "../src/adapters/copies.js";
import { njFormationRequest } from "./helpers.js";

/** V28 / V31: who the state's copy is CC'd to (adapters/copies.ts). */
const ctx = (o: { ccOnFiling?: string; client?: Record<string, unknown>; tenant?: Record<string, unknown> }) => ({
  filing: { request: { ...njFormationRequest(), ...(o.ccOnFiling ? { intake: { portal: { ccEmail: o.ccOnFiling } } } : {}) } } as never,
  client: (o.client ?? {}) as never,
  tenant: (o.tenant ?? {}) as never,
});

describe("state copy CC", () => {
  it("prefers the filing's own address, then the firm's, then a partner's contact, then the subscriber's", () => {
    expect(copyCc(ctx({ ccOnFiling: "sam@client.test", client: { copyEmail: "copies@firm.test" } }))).toBe("sam@client.test");
    expect(copyCc(ctx({ client: { copyEmail: "copies@firm.test", partner: { contactEmail: "pat@firm.test" } } }))).toBe("copies@firm.test");
    // A CPA filing on the platform's state account: the CPA gets the copy, not the end client.
    expect(copyCc(ctx({ client: { partner: { contactEmail: "pat@firm.test" } }, tenant: { copyEmail: "ops@cofile.test" } }))).toBe("pat@firm.test");
    expect(copyCc(ctx({ tenant: { copyEmail: "ops@cofile.test" } }))).toBe("ops@cofile.test");
    expect(copyCc(ctx({}))).toBeUndefined();
  });
});
