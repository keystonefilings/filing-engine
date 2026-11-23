import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { createServer, type Server } from "node:http";
import net from "node:net";
import { chromium, type Browser } from "playwright";
import { startFixtureServer } from "../fixtures/serve.js";
import { einOnlyRequest, seededStore, wire } from "./helpers.js";
import { RunExecutor } from "../src/orchestrator/run.js";
import { BrowserHarness, readDownload } from "../src/browser/harness.js";
import { parseSiteProxies } from "../src/browser/egress.js";
import { FsArtifactStore } from "../src/artifacts/store.js";
import { DriftReviewService } from "../src/drift-review/service.js";

/*
 * Steel's cloud, played locally: a Chromium the harness reaches over CDP exactly as it reaches
 * a Steel session, behind a fake Steel API that records what the engine asks Steel for.
 */
type Call = { method: string; path: string; key: string | undefined; body?: Record<string, unknown> };
const calls: Call[] = [];
const files = new Map<string, Buffer>();
let n = 0; // fake session numbers, from 1 in each test
let api: Server;
let apiUrl = "";
let remote: Browser;
let cdpUrl = "";
let fx: Awaited<ReturnType<typeof startFixtureServer>>;
const OPEN = new Date("2026-11-17T17:00:00Z"); // IRS assistant open
const KEY = "sk_test_route_key";

async function freePort(): Promise<number> {
  return new Promise((resolve) => {
    const s = net.createServer();
    s.listen(0, "127.0.0.1", () => { const p = (s.address() as net.AddressInfo).port; s.close(() => resolve(p)); });
  });
}

function steelHarness(over: { site?: string; connectUrl?: string; apiKey?: string; profiles?: Record<string, string> } = {}) {
  return new BrowserHarness({
    chromiumPath: process.env.PW_CHROMIUM_PATH ?? null, profileDir: "var/test-profiles",
    siteProxies: parseSiteProxies(`${over.site ?? "IRS"}=steel`),
    steel: { apiKey: over.apiKey ?? KEY, apiUrl, connectUrl: over.connectUrl ?? cdpUrl, profiles: over.profiles ?? {} },
  });
}
const created = () => calls.filter((c) => c.method === "POST" && c.path === "/v1/sessions");
const released = () => calls.filter((c) => c.path.endsWith("/release")).map((c) => c.path.split("/")[3]);

beforeAll(async () => {
  api = createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://x");
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      const body = raw ? (JSON.parse(raw) as Record<string, unknown>) : undefined;
      calls.push({ method: req.method ?? "", path: url.pathname, key: req.headers["steel-api-key"] as string | undefined, ...(body ? { body } : {}) });
      const json = (v: unknown) => { res.setHeader("content-type", "application/json"); res.end(JSON.stringify(v)); };
      const m = /^\/v1\/sessions\/([^/]+)(\/.*)?$/.exec(url.pathname);
      if (req.method === "POST" && url.pathname === "/v1/sessions") return json({ id: `sess_${++n}`, debugUrl: "https://live.example.test/s", ...(body?.profileId ? { profileId: body.profileId } : {}) });
      if (m && m[2] === "/release") return json({ success: true });
      if (m && m[2] === "/files") return json({ data: [...files].map(([path, b]) => ({ path, size: b.length, lastModified: "2026-11-23T00:00:00Z" })) });
      if (m && m[2]?.startsWith("/files/")) {
        const f = files.get(`/${decodeURIComponent(m[2].slice("/files/".length))}`);
        if (!f) { res.statusCode = 404; return res.end(); }
        return res.end(f);
      }
      res.statusCode = 404; res.end();
    });
  });
  await new Promise<void>((r) => api.listen(0, "127.0.0.1", () => r()));
  apiUrl = `http://127.0.0.1:${(api.address() as net.AddressInfo).port}`;
  const port = await freePort();
  remote = await chromium.launch({ ...(process.env.PW_CHROMIUM_PATH ? { executablePath: process.env.PW_CHROMIUM_PATH } : {}), args: [`--remote-debugging-port=${port}`] });
  cdpUrl = ((await (await fetch(`http://127.0.0.1:${port}/json/version`)).json()) as { webSocketDebuggerUrl: string }).webSocketDebuggerUrl;
  fx = await startFixtureServer();
  process.env.IRS_EIN_URL = `${fx.url}/irs-ein/start.html`;
});
afterAll(async () => {
  await remote?.close();
  await new Promise((r) => api?.close(r));
  await fx?.close();
  delete process.env.IRS_EIN_URL;
});
beforeEach(() => { calls.length = 0; files.clear(); n = 0; });

describe("sites routed to Steel", () => {
  it("runs the IRS interview in a fresh plain Steel session and ends the session after", async () => {
    const harness = steelHarness();
    const store = await seededStore();
    const executor = new RunExecutor({ store, artifacts: new FsArtifactStore("var/test-artifacts"), harness, drift: new DriftReviewService(store), vault: { getCredential: async () => null }, firstObservationPolicy: "accept" });
    const w = wire(store, { executor, now: () => OPEN });
    const { filing, approvalLink } = await w.service.createFiling(einOnlyRequest());
    await w.service.onApprovalDecision(approvalLink!.split("/approve/")[1]!, "approve", {});
    await w.service.runFiling(filing.id);

    const run = (await store.getRun((await store.getFiling(filing.id))!.currentRunId!))!;
    expect(run.status).toBe("completed");
    expect(run.error).toContain('dry run stopped before "Submit EIN Request"');
    expect(run.steps.map((s) => s.screenKey)).toContain("irs.review");

    // One session, asked for plainly: no proxy, no CAPTCHA solving, no fingerprint, no recording, view-only.
    expect(created()).toHaveLength(1);
    expect(created()[0]!.key).toBe(KEY);
    expect(created()[0]!.body).toEqual({
      useProxy: false, solveCaptcha: false, recording: false,
      stealthConfig: { autoCaptchaSolving: false, humanizeInteractions: false, skipFingerprintInjection: true },
      debugConfig: { interactive: false },
      dimensions: { width: 1280, height: 1600 }, timeout: 900_000, inactivityTimeout: 300_000,
    });
    expect(released()).toEqual(["sess_1"]);
    expect(remote.contexts().flatMap((c) => c.pages())).toHaveLength(0); // nothing left open in Steel's browser
    await harness.close();
  });

  it("carries a saved sign-in as a Steel profile, and refuses a site with none saved", async () => {
    const harness = steelHarness({ site: "NY", profiles: { nygov: "prof_nygov" } });
    const ctx = await harness.persistentContext("nygov", "NY");
    expect(created()[0]!.body).toMatchObject({ profileId: "prof_nygov", persistProfile: true });
    await harness.closeContext(ctx);
    expect(released()).toHaveLength(1);

    await expect(harness.persistentContext("ny:acme", "NY")).rejects.toThrow(/No saved Steel sign-in for "ny:acme".*steel-login/);
    expect(created()).toHaveLength(1); // no session was opened for it
    await harness.close();
  });

  it("ends the session when the browser connect fails, and never shows the key", async () => {
    const dead = await freePort();
    const harness = steelHarness({ connectUrl: `ws://127.0.0.1:${dead}/devtools/browser/x`, apiKey: "sk_secret_value_9" });
    const err = await harness.ephemeralContext("IRS").then(() => null, (e: Error) => e);
    expect(err?.message).toMatch(/Steel browser connect failed/);
    expect(err?.message).not.toContain("sk_secret_value_9");
    expect(released()).toEqual(["sess_1"]);
    await harness.close();
  });

  it("reads a download from Steel's file store when the file is on Steel's machine", async () => {
    const harness = steelHarness();
    const ctx = await harness.ephemeralContext("IRS");
    files.set("/files/CP575.pdf", Buffer.from("%PDF-1.7 cp575"));
    const remoteOnly = {
      path: async () => { throw new Error("connected remotely"); },
      createReadStream: async () => { throw new Error("connected remotely"); },
      suggestedFilename: () => "CP575.pdf",
      page: () => ({ context: () => ctx }),
    } as never;
    expect((await readDownload(remoteOnly)).toString()).toBe("%PDF-1.7 cp575");

    // And a real download over the CDP connection.
    const page = await ctx.newPage();
    await page.setContent(`<a href="data:application/pdf;base64,${Buffer.from("%PDF-real").toString("base64")}" download="letter.pdf">Download</a>`);
    const [dl] = await Promise.all([page.waitForEvent("download"), page.click("a")]);
    expect((await readDownload(dl)).toString()).toBe("%PDF-real");
    await harness.close(); // releases the session still open
    expect(released()).toEqual(["sess_1"]);
  });
});
