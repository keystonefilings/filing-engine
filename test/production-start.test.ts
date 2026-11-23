import { describe, expect, it } from "vitest";
import { spawn } from "node:child_process";

/**
 * The real entrypoints, started the way the image starts them (NODE_ENV=production): they must
 * refuse to start without real API_KEYS and APPROVAL_SIGNING_SECRET instead of falling back to
 * the development values, and the error must name the variable without echoing what was given.
 */
const STRONG_KEY = "3f9c2a7d41b8e6055c1d9e2f7a4b8c60";
const STRONG_SECRET = "9b1e4c7a2d5f8036e1a4b7c0d3f6e9a2";
/** What each process prints once it is up: seeing it means the refusal did not happen. */
const STARTED = /listening on|worker started/;
const CONTROLLED = ["API_KEYS", "APPROVAL_SIGNING_SECRET", "PLATFORM_STAFF_KEYS", "DATABASE_URL", "WORKER_ENABLED", "PORT", "NODE_ENV", "BROWSER_PROXY", "SITE_PROXIES", "BROWSERS"];

function start(entry: "src/index.ts" | "src/worker.ts", env: Record<string, string>, untilOutput?: RegExp) {
  const base = Object.fromEntries(Object.entries(process.env).filter(([k]) => !CONTROLLED.includes(k))) as Record<string, string>;
  const child = spawn(process.execPath, ["--import", "tsx", entry], {
    env: { ...base, NODE_ENV: "production", PORT: "0", WORKER_ENABLED: "false", ...env }, stdio: ["ignore", "pipe", "pipe"],
  });
  let out = "";
  return new Promise<{ code: number | null; out: string; startedOk: boolean }>((resolve) => {
    const timer = setTimeout(() => { child.kill("SIGKILL"); resolve({ code: null, out, startedOk: false }); }, 45_000);
    const onData = (d: Buffer) => {
      out += d.toString();
      if (untilOutput?.test(out)) { clearTimeout(timer); child.kill("SIGTERM"); resolve({ code: null, out, startedOk: true }); }
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("exit", (code) => { clearTimeout(timer); resolve({ code, out, startedOk: false }); });
  });
}

describe("production start-up refuses development keys and secrets", () => {
  it("the API will not start without API_KEYS", async () => {
    const r = await start("src/index.ts", { APPROVAL_SIGNING_SECRET: STRONG_SECRET }, STARTED);
    expect(r.startedOk).toBe(false);
    expect(r.code).not.toBe(0);
    expect(r.out).toMatch(/API_KEYS must be set in production/);
    expect(r.out).not.toMatch(/listening/);
  }, 60_000);

  it("the API will not start with a placeholder API key, and does not print it", async () => {
    const r = await start("src/index.ts", { APPROVAL_SIGNING_SECRET: STRONG_SECRET, API_KEYS: "change-me-long-random-key:keystone" }, STARTED);
    expect(r.startedOk).toBe(false);
    expect(r.code).not.toBe(0);
    expect(r.out).toMatch(/API_KEYS entry 1/);
    expect(r.out).not.toContain("change-me-long-random-key");
  }, 60_000);

  it("the API will not start without APPROVAL_SIGNING_SECRET or with the development default", async () => {
    for (const secret of [undefined, "dev-only-secret-not-for-production"]) {
      const r = await start("src/index.ts", { API_KEYS: `${STRONG_KEY}:keystone`, ...(secret ? { APPROVAL_SIGNING_SECRET: secret } : {}) }, STARTED);
      expect(r.startedOk).toBe(false);
      expect(r.code).not.toBe(0);
      expect(r.out).toMatch(/APPROVAL_SIGNING_SECRET must be set/);
      expect(r.out).not.toMatch(/listening/);
    }
  }, 90_000);

  it("the worker will not start without APPROVAL_SIGNING_SECRET", async () => {
    const r = await start("src/worker.ts", {}, STARTED);
    expect(r.startedOk).toBe(false);
    expect(r.code).not.toBe(0);
    expect(r.out).toMatch(/APPROVAL_SIGNING_SECRET must be set/);
    expect(r.out).not.toMatch(/worker started/);
  }, 60_000);

  it("the API starts once both are real", async () => {
    const r = await start("src/index.ts", { API_KEYS: `${STRONG_KEY}:keystone`, APPROVAL_SIGNING_SECRET: STRONG_SECRET }, STARTED);
    expect(r.startedOk).toBe(true);
    expect(r.out).not.toContain(STRONG_SECRET);
  }, 60_000);
});
