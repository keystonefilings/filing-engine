import { describe, it, expect } from "vitest";
import { createSteelSession, redact } from "../src/browser/steel.js";

type Call = { url: string; init: { method: string; headers: Record<string, string>; body?: string } };
function fakeFetch(status = 200, body: unknown = { id: "sess_123" }) {
  const calls: Call[] = [];
  const f = (async (url: string, init: Call["init"]) => {
    calls.push({ url: String(url), init });
    return { ok: status >= 200 && status < 300, status, json: async () => body, arrayBuffer: async () => new TextEncoder().encode("%PDF").buffer };
  }) as unknown as typeof fetch;
  return { f, calls };
}

describe("Steel sessions", () => {
  it("creates a plain session (no proxy, no CAPTCHA solving, no fingerprint, no recording) with the key in the header", async () => {
    const { f, calls } = fakeFetch();
    const s = await createSteelSession({ apiKey: "sk_test_abc", fetchImpl: f });
    expect(calls[0]!.url).toBe("https://api.steel.dev/v1/sessions");
    expect(calls[0]!.init.headers["steel-api-key"]).toBe("sk_test_abc");
    expect(JSON.parse(calls[0]!.init.body!)).toEqual({
      useProxy: false, solveCaptcha: false, recording: false,
      stealthConfig: { autoCaptchaSolving: false, humanizeInteractions: false, skipFingerprintInjection: true },
      debugConfig: { interactive: false },
    });
    expect(s.id).toBe("sess_123");
    expect(s.connectUrl).toBe("wss://connect.steel.dev/?sessionId=sess_123&apiKey=sk_test_abc");
    await s.release();
    expect(calls[1]!.url).toBe("https://api.steel.dev/v1/sessions/sess_123/release");
    expect(calls[1]!.init.method).toBe("POST");
  });

  it("passes time limits and a saved profile, and only the sign-in tool gets an interactive view", async () => {
    const { f, calls } = fakeFetch(200, { id: "sess_9", debugUrl: "https://live.example.test/x", profileId: "prof_1" });
    const s = await createSteelSession({ fetchImpl: f, timeoutMs: 60_000, inactivityTimeoutMs: 10_000, profileId: "prof_1", persistProfile: true, interactive: true, dimensions: { width: 1280, height: 1600 } });
    expect(JSON.parse(calls[0]!.init.body!)).toMatchObject({ timeout: 60_000, inactivityTimeout: 10_000, profileId: "prof_1", persistProfile: true, debugConfig: { interactive: true }, dimensions: { width: 1280, height: 1600 }, useProxy: false, solveCaptcha: false, recording: false });
    expect(s.debugUrl).toBe("https://live.example.test/x");
    expect(s.profileId).toBe("prof_1");
  });

  it("lists and reads the session's downloaded files", async () => {
    const { f, calls } = fakeFetch(200, { id: "sess_1", data: [{ path: "/files/CP575.pdf", size: 4, lastModified: "x" }] });
    const s = await createSteelSession({ apiKey: "k", fetchImpl: f });
    expect(await s.listFiles()).toEqual([{ path: "/files/CP575.pdf", size: 4, lastModified: "x" }]);
    expect((await s.readFile("/files/CP575.pdf")).toString()).toBe("%PDF");
    expect(calls[1]!.url).toBe("https://api.steel.dev/v1/sessions/sess_1/files");
    expect(calls[2]!.url).toBe("https://api.steel.dev/v1/sessions/sess_1/files/files%2FCP575.pdf");
  });

  it("puts no key in the process when the network proxy supplies it", async () => {
    const { f, calls } = fakeFetch();
    const s = await createSteelSession({ fetchImpl: f });
    expect(s.connectUrl).toBe("wss://connect.steel.dev/?sessionId=sess_123");
    expect(calls[0]!.init.headers["steel-api-key"]).toBe("set-by-network-proxy");
  });

  it("reports a failed create by status and Steel's error code only", async () => {
    const { f } = fakeFetch(401, { error: "invalid key sk_test_abc" });
    const err = await createSteelSession({ apiKey: "sk_test_abc", fetchImpl: f }).then(() => null, (e: Error) => e);
    expect(err?.message).toBe("Steel session create failed: HTTP 401");
    const { f: f2 } = fakeFetch(400, { code: "session_timeout_exceeded", message: "Requested 'timeout' exceeds the maximum" });
    await expect(createSteelSession({ fetchImpl: f2 })).rejects.toThrow(/^Steel session create failed: HTTP 400 \(session_timeout_exceeded\)$/);
  });

  it("says plainly when the worker cannot reach Steel at all", async () => {
    const down = (async () => { throw Object.assign(new TypeError("fetch failed"), { cause: { code: "ENOTFOUND" } }); }) as unknown as typeof fetch;
    await expect(createSteelSession({ apiKey: "k", fetchImpl: down })).rejects.toThrow(/^Steel API unreachable from this worker \(ENOTFOUND\)$/);
  });

  it("redacts the key, raw and URL-encoded", () => {
    const key = "sk/te+st=";
    const line = `connect failed: wss://connect.steel.dev/?sessionId=s&apiKey=${encodeURIComponent(key)} (key ${key})`;
    const out = redact(line, key);
    expect(out).not.toContain(key);
    expect(out).not.toContain(encodeURIComponent(key));
    expect(redact("nothing secret", undefined)).toBe("nothing secret");
  });
});
