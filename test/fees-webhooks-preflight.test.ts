import { describe, expect, it } from "vitest";
import { expectedFees, checkLiveFees, FeeUnknownError } from "../src/fees/table.js";
import { WebhookDispatcher, verifySignature, BACKOFF_MS } from "../src/webhooks/dispatcher.js";
import { MemoryStore } from "../src/store/memory.js";
import { irsWindowMinutesRemaining } from "../src/orchestrator/preflight.js";
import { ConcurrencyLimiter } from "../src/orchestrator/locks.js";
import { TenantSettings } from "../src/settings/schema.js";

describe("fees (decision 5)", () => {
  it("builds expected lines and refuses unknown entries", () => {
    expect(expectedFees("NJ", "formation", { paymentMethod: "credit_card" })).toEqual([
      { label: "Formation filing fee", amountUsd: 100 }, { label: "Service fee (credit_card)", amountUsd: 3.5 },
    ]);
    // NJ standing certificates are priced by entity type (verified 2026-11-18).
    expect(expectedFees("NJ", "standing_certificate", { paymentMethod: "echeck", entityType: "LLC" }).map((l) => l.amountUsd)).toEqual([50, 1]);
    expect(expectedFees("NJ", "standing_certificate", { paymentMethod: "credit_card", entityType: "FLC" }).map((l) => l.amountUsd)).toEqual([50, 2]);
    expect(expectedFees("NJ", "standing_certificate", { paymentMethod: "credit_card", entityType: "DP" }).map((l) => l.amountUsd)).toEqual([25, 2]);
    expect(() => expectedFees("NJ", "standing_certificate", { paymentMethod: "credit_card" })).toThrow(/entity type/);
    expect(() => expectedFees("NJ", "standing_certificate", { paymentMethod: "credit_card", entityType: "LLP" })).toThrow(/not been verified/);
    // Yakov (Nov 26): a method saved in the NJ account is quoted at the card or eCheck figure until the signed-in checkout is walked.
    expect(expectedFees("NJ", "standing_certificate", { paymentMethod: "stored_echeck", entityType: "LLC" }).reduce((s, l) => s + l.amountUsd, 0)).toBe(51);
    expect(() => expectedFees("NJ", "alternate_name")).toThrow(FeeUnknownError);
    expect(expectedFees("NJ", "formation", { paymentMethod: "stored_card" }).reduce((s, l) => s + l.amountUsd, 0)).toBe(103.5);
  });
  it("checks the live page against approved lines and cap", () => {
    const exp = expectedFees("NJ", "formation", { paymentMethod: "credit_card" });
    const ok = checkLiveFees(exp, [{ label: "Formation filing fee", amountUsd: 100 }, { label: "Credit card service fee", amountUsd: 3.5 }, { label: "Total", amountUsd: 103.5 }], 110);
    expect(ok.ok).toBe(true);
    const raised = checkLiveFees(exp, [{ label: "Formation filing fee", amountUsd: 125 }, { label: "Total", amountUsd: 128.5 }], 110);
    expect(raised.ok).toBe(false);
    expect(raised.reason).toMatch(/not shown|differs|exceeds/);
    const overCap = checkLiveFees(exp, [{ label: "Formation filing fee", amountUsd: 100 }, { label: "Credit card service fee", amountUsd: 3.5 }, { label: "Total", amountUsd: 103.5 }], 100);
    expect(overCap.ok).toBe(false);
    expect(overCap.reason).toContain("cap");
  });

  it("refuses a surcharge the approval does not cover when no total reconciles it", () => {
    const exp = [{ label: "Filing fee", amountUsd: 100 }];
    // The reviewed case: $100 approved, $100 cap, page shows the fee plus a $20 surcharge, no total line.
    const surcharge = checkLiveFees(exp, [{ label: "Filing fee", amountUsd: 100 }, { label: "Processing surcharge", amountUsd: 20 }], 100);
    expect(surcharge.ok).toBe(false);
    expect(surcharge.reason).toContain("no payable total shown");
    expect(surcharge.unexpected.map((u) => u.amountUsd)).toEqual([20]);
    // A total line that matches the approval verifies the charge even with other amounts shown.
    const withTotal = checkLiveFees(exp, [{ label: "Filing fee", amountUsd: 100 }, { label: "Subtotal", amountUsd: 100 }, { label: "Total", amountUsd: 100 }], 100);
    expect(withTotal).toMatchObject({ ok: true, verifiedBy: "total" });
    // ...and a total that includes the surcharge does not.
    expect(checkLiveFees(exp, [{ label: "Filing fee", amountUsd: 100 }, { label: "Surcharge", amountUsd: 20 }, { label: "Total", amountUsd: 120 }], 150).ok).toBe(false);
  });

  it("without a total, reconciles charge lines one-for-one and applies the cap to the approved total", () => {
    const exp = [{ label: "Filing fee", amountUsd: 100 }, { label: "Service fee", amountUsd: 3.5 }];
    expect(checkLiveFees(exp, [{ label: "Filing fee", amountUsd: 100 }, { label: "Service fee", amountUsd: 3.5 }], 110)).toMatchObject({ ok: true, verifiedBy: "lines" });
    // A second $3.50 charge is not covered by the single approved $3.50 line.
    const doubled = checkLiveFees(exp, [{ label: "Filing fee", amountUsd: 100 }, { label: "Service fee", amountUsd: 3.5 }, { label: "Convenience fee", amountUsd: 3.5 }], 110);
    expect(doubled.ok).toBe(false);
    // Reconciled lines over the cap still fail; the cap no longer needs a total line to apply.
    const overCap = checkLiveFees(exp, [{ label: "Filing fee", amountUsd: 100 }, { label: "Service fee", amountUsd: 3.5 }], 100);
    expect(overCap.ok).toBe(false);
    expect(overCap.reason).toContain("cap");
    // A price list with every approved line on it is "listed", which is not the same as verified.
    const priceList = checkLiveFees(exp, [{ label: "Formation", amountUsd: 100 }, { label: "Service fee", amountUsd: 3.5 }, { label: "Certified copy", amountUsd: 25 }]);
    expect(priceList).toMatchObject({ ok: false, linesListed: true });
  });
});

describe("webhooks", () => {
  it("signs, retries with backoff, dead-letters", async () => {
    const store = new MemoryStore();
    const ep = { url: "https://hooks.example.test/x", secret: "s3cret-s3cret-s3cret" };
    await store.putTenant(TenantSettings.parse({ tenantId: "t", name: "T", webhookEndpoints: [ep] }));
    let clock = new Date("2026-11-16T10:00:00Z");
    const calls: { url: string; headers: Record<string, string>; body: string }[] = [];
    let status = 500;
    const d = new WebhookDispatcher(store, async (url, init) => { calls.push({ url, headers: init.headers, body: init.body }); return { status }; }, () => clock);
    await d.emit("filing.started", { tenantId: "t", filingId: "f" }, { a: 1 }, [ep]);
    await d.processDue();
    expect(calls).toHaveLength(1);
    const sig = calls[0]!.headers["x-cofile-signature"]!;
    expect(verifySignature(ep.secret, sig, calls[0]!.body, 300, clock.getTime())).toBe(true);
    expect(verifySignature("wrong", sig, calls[0]!.body, 300, clock.getTime())).toBe(false);
    // Not due until backoff elapses.
    await d.processDue();
    expect(calls).toHaveLength(1);
    clock = new Date(clock.getTime() + BACKOFF_MS[0]! + 1);
    status = 200;
    await d.processDue();
    expect(calls).toHaveLength(2);
    expect((await store.listDeliveries("f"))[0]!.status).toBe("delivered");

    // Dead-letter after exhausting the schedule.
    status = 503;
    await d.emit("filing.failed", { tenantId: "t", filingId: "g" }, {}, [ep]);
    for (let i = 0; i <= BACKOFF_MS.length; i++) { await d.processDue(); clock = new Date(clock.getTime() + 86_400_000); }
    expect((await store.listDeliveries("g"))[0]!.status).toBe("dead");

    // A fresh dispatcher (restart, or another process) still signs with the tenant's secret.
    status = 200;
    const fresh = new WebhookDispatcher(store, async (url, init) => { calls.push({ url, headers: init.headers, body: init.body }); return { status }; }, () => clock);
    await d.emit("filing.completed", { tenantId: "t", filingId: "h" }, {}, [ep]);
    await fresh.processDue();
    const last = calls[calls.length - 1]!;
    expect(verifySignature(ep.secret, last.headers["x-cofile-signature"]!, last.body, 300, clock.getTime())).toBe(true);

    // Endpoint removed from settings: dead-lettered, never sent unsigned.
    await d.emit("filing.completed", { tenantId: "t", filingId: "i" }, {}, [{ url: "https://gone.example.test", secret: "x".repeat(20) }]);
    const before = calls.length;
    await fresh.processDue();
    expect(calls.length).toBe(before);
    expect((await store.listDeliveries("i"))[0]!.status).toBe("dead");
  });
});

describe("pre-flight", () => {
  it("knows the published IRS windows in Eastern time", () => {
    expect(irsWindowMinutesRemaining(new Date("2026-11-14T15:00:00Z"))).toBe(11 * 60); // Sat 10:00 ET, closes 21:00
    expect(irsWindowMinutesRemaining(new Date("2026-11-15T02:30:00Z"))).toBeNull(); // Sat 21:30 ET
    expect(irsWindowMinutesRemaining(new Date("2026-11-15T15:00:00Z"))).toBeNull(); // Sun 10:00 ET
    expect(irsWindowMinutesRemaining(new Date("2026-11-15T23:00:00Z"))).toBe(6 * 60); // Sun 18:00 ET
    expect(irsWindowMinutesRemaining(new Date("2026-11-16T05:30:00Z"))).toBeNull(); // Mon 00:30 ET: Sunday closes at midnight
    expect(irsWindowMinutesRemaining(new Date("2026-11-16T15:00:00Z"))).toBe(15 * 60); // Mon 10:00 ET, closes 1:00
    expect(irsWindowMinutesRemaining(new Date("2026-11-17T05:30:00Z"))).toBe(30); // Tue 00:30 ET, Monday window runs to 1:00
    expect(irsWindowMinutesRemaining(new Date("2026-11-17T06:30:00Z"))).toBeNull(); // Tue 01:30 ET
    expect(irsWindowMinutesRemaining(new Date("2026-11-21T05:15:00Z"))).toBe(45); // Sat 00:15 ET, Friday window runs to 1:00
  });
  it("serializes per key", async () => {
    const lim = new ConcurrencyLimiter({ "site:NJ": 1 });
    const r1 = await lim.acquire("site:NJ");
    let second = false;
    const p = lim.acquire("site:NJ").then((r) => { second = true; r(); });
    await new Promise((r) => setTimeout(r, 20));
    expect(second).toBe(false);
    r1();
    await p;
    expect(second).toBe(true);
  });
});
