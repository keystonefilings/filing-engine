import { describe, expect, it } from "vitest";
import { spawn } from "node:child_process";

/**
 * The real entrypoints, started the way the image starts them (NODE_ENV=production): they must
 * refuse to start without real API_KEYS, STAFF_API_KEYS and APPROVAL_SIGNING_SECRET instead of
 * falling back to development values, and the error must name the variable without echoing
 * what was given. Each case starts from a complete, valid environment and breaks one value.
 */
const API_KEY = "3f9c2a7d41b8e6055c1d9e2f7a4b8c60";
const STAFF_KEY = "7d2e9a4c1b6f8053e2a7c4d9b1f6e8a3";
const SECRET = "9b1e4c7a2d5f8036e1a4b7c0d3f6e9a2";
/** A port nothing listens on: getting as far as connecting proves every start-up check passed. */
const UNREACHABLE_DB = "postgres://filing:filing@127.0.0.1:1/filing";
const VALID = {
  API_KEYS: `${API_KEY}:keystone`, STAFF_API_KEYS: `${STAFF_KEY}:ops@keystone.test`, APPROVAL_SIGNING_SECRET: SECRET, DATABASE_URL: UNREACHABLE_DB, DATA_ENCRYPTION_KEY: "c".repeat(64),
  PUBLIC_BASE_URL: "https://api.cofile.app", WEB_BASE_URL: "https://cofile.app",
};
/** What each process prints once it is up: seeing it means the refusal did not happen. */
const STARTED = /listening on|worker started/;
/** Settings the test controls; anything set in the test runner's own environment is dropped. */
const CONTROLLED = [
  "API_KEYS", "STAFF_API_KEYS", "APPROVAL_SIGNING_SECRET", "DATABASE_URL", "DATA_ENCRYPTION_KEY", "WORKER_ENABLED", "PORT", "NODE_ENV",
  "BROWSER_PROXY", "SITE_PROXIES", "BROWSERS", "FLY_APP_NAME", "ARTIFACT_BUCKET", "BUCKET_NAME", "WORKER_WAKE_URL", "WORKER_WAKE_TOKEN", "WORKER_PORT", "PUBLIC_BASE_URL", "WEB_BASE_URL",
];

function start(entry: "src/index.ts" | "src/worker.ts", env: Record<string, string | undefined>) {
  const base = Object.fromEntries(Object.entries(process.env).filter(([k]) => !CONTROLLED.includes(k)));
  const merged = { ...base, NODE_ENV: "production", PORT: "0", WORKER_ENABLED: "false", ...env };
  const child = spawn(process.execPath, ["--import", "tsx", entry], {
    env: Object.fromEntries(Object.entries(merged).filter(([, v]) => v !== undefined)) as Record<string, string>, stdio: ["ignore", "pipe", "pipe"],
  });
  let out = "";
  return new Promise<{ code: number | null; out: string; started: boolean }>((resolve) => {
    const timer = setTimeout(() => { child.kill("SIGKILL"); resolve({ code: null, out, started: false }); }, 45_000);
    const onData = (d: Buffer) => {
      out += d.toString();
      if (STARTED.test(out)) { clearTimeout(timer); child.kill("SIGTERM"); resolve({ code: null, out, started: true }); }
    };
    child.stdout.on("data", onData);
    child.stderr.on("data", onData);
    child.on("exit", (code) => { clearTimeout(timer); resolve({ code, out, started: false }); });
  });
}

async function expectRefused(entry: "src/index.ts" | "src/worker.ts", env: Record<string, string | undefined>, problem: RegExp, notEchoed?: string) {
  const r = await start(entry, env);
  expect(r.started).toBe(false);
  expect(r.code).not.toBe(0);
  expect(r.out).toMatch(/not started/);
  expect(r.out).toMatch(problem);
  if (notEchoed) expect(r.out).not.toContain(notEchoed);
}

describe("production start-up refuses development keys and secrets", () => {
  it("the API will not start without API_KEYS, or with a placeholder key it does not print", async () => {
    await expectRefused("src/index.ts", { ...VALID, API_KEYS: undefined }, /API_KEYS must be set in production/);
    await expectRefused("src/index.ts", { ...VALID, API_KEYS: "change-me-long-random-key:keystone" }, /API_KEYS entry 1/, "change-me-long-random-key");
  }, 90_000);

  it("the API will not start without STAFF_API_KEYS, or with a short staff key it does not print", async () => {
    await expectRefused("src/index.ts", { ...VALID, STAFF_API_KEYS: undefined }, /STAFF_API_KEYS must be set in production/);
    await expectRefused("src/index.ts", { ...VALID, STAFF_API_KEYS: "shortstaffkey:ops" }, /STAFF_API_KEYS entry 1/, "shortstaffkey");
  }, 90_000);

  it("the API will not start without APPROVAL_SIGNING_SECRET or with the development default", async () => {
    await expectRefused("src/index.ts", { ...VALID, APPROVAL_SIGNING_SECRET: undefined }, /APPROVAL_SIGNING_SECRET must be set/);
    await expectRefused("src/index.ts", { ...VALID, APPROVAL_SIGNING_SECRET: "dev-only-secret-not-for-production" }, /APPROVAL_SIGNING_SECRET must be set/);
  }, 90_000);

  it("the worker will not start without APPROVAL_SIGNING_SECRET", async () => {
    await expectRefused("src/worker.ts", { ...VALID, APPROVAL_SIGNING_SECRET: undefined }, /APPROVAL_SIGNING_SECRET must be set/);
  }, 60_000);

  it("with every value real, the API passes its start-up checks and goes on to the database", async () => {
    const r = await start("src/index.ts", VALID);
    expect(r.out).not.toMatch(/not started/);
    expect(r.out).toMatch(/ECONNREFUSED/); // nothing listens on the test's database port
    for (const value of [API_KEY, STAFF_KEY, SECRET]) expect(r.out).not.toContain(value);
  }, 60_000);
});
