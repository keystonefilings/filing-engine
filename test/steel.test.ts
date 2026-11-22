import { describe, it, expect } from "vitest";
import { createSteelSession, redact } from "../src/browser/steel.js";

type Call = { url: string; init: { method: string; headers: Record<string, string>; body?: string } };
function fakeFetch(status = 200, body: unknown = { id: "sess_123" }) {
  const calls: Call[] = [];
  const f = (async (url: string, init: Call["init"]) => {
    calls.push({ url: String(url), init });
    return { ok: status >= 200 && status < 300, status, json: async () => body };
  }) as unknown as typeof fetch;
  return { f, calls };
}

describe("Steel sessions", () => {
  it("creates a plain session (no residential proxy, no CAPTCHA solving) with the key in the header", async () => {
    const { f, calls } = fakeFetch();
    const s = await createSteelSession({ apiKey: "sk_test_abc", fetchImpl: f });
    expect(calls[0]!.url).toBe("https://api.steel.dev/v1/sessions");
    expect(calls[0]!.init.headers["steel-api-key"]).toBe("sk_test_abc");
    expect(JSON.parse(calls[0]!.init.body!)).toEqual({ useProxy: false, solveCaptcha: false });
    expect(s.id).toBe("sess_123");
    expect(s.connectUrl).toBe("wss://connect.steel.dev/?sessionId=sess_123&apiKey=sk_test_abc");
    await s.release();
    expect(calls[1]!.url).toBe("https://api.steel.dev/v1/sessions/sess_123/release");
    expect(calls[1]!.init.method).toBe("POST");
  });

  it("puts no key in the process when the network proxy supplies it", async () => {
    const { f, calls } = fakeFetch();
    const s = await createSteelSession({ fetchImpl: f });
    expect(s.connectUrl).toBe("wss://connect.steel.dev/?sessionId=sess_123");
    expect(calls[0]!.init.headers["steel-api-key"]).toBe("set-by-network-proxy");
  });

  it("reports a failed create by status only", async () => {
    const { f } = fakeFetch(401, { error: "invalid key sk_test_abc" });
    await expect(createSteelSession({ apiKey: "sk_test_abc", fetchImpl: f })).rejects.toThrow("Steel session create failed: HTTP 401");
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
