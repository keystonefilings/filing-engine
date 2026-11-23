import { bootstrap } from "./bootstrap.js";
import { config } from "./config.js";
import { ADAPTERS } from "./adapters/index.js";
import { browserSetupProblems } from "./browser/setup-check.js";
import { startWorkerHttp, WorkerLoop } from "./orchestrator/worker-loop.js";

// Refuse to start on browser settings that would fail every run on some site.
const problems = browserSetupProblems({
  sites: Object.values(ADAPTERS).map((a) => a.site), browserProxy: config.browserProxy, siteProxies: config.siteProxies,
  steelOnly: config.browsersSteelOnly, production: config.production, steelKeySet: !!config.steel.apiKey,
});
if (problems.length) { for (const p of problems) console.error(`worker not started: ${p}`); process.exit(1); }

/** Worker tier (fixed-IP VM, decision 4): outbound-only; pulls jobs, drives browsers, uploads artifacts. */
const workerId = process.env.WORKER_ID ?? `worker-${process.pid}`;
// A service company's own worker sets WORKER_TENANTS to its tenant id(s).
const workerTenants = (process.env.WORKER_TENANTS ?? "").split(",").map((t) => t.trim()).filter(Boolean);
const sys = await bootstrap({ withExecutor: true, workerId });

// Recovery touches only filings in this worker's tenants whose run lease lapsed, i.e. whose
// worker stopped renewing it. It runs on start and then every minute, so a stopped worker's
// filings are settled once its leases expire, while another live worker's runs are left alone.
let recovering = false;
async function recover() {
  if (recovering) return;
  recovering = true;
  try {
    const scope = { tenants: workerTenants };
    const flagged = await sys.service.reconcileOpenIntents(scope);
    if (flagged.length) console.warn("filings needing reconciliation:", flagged);
    const interrupted = await sys.service.recoverInterruptedRuns(scope);
    if (interrupted.length) console.warn("filings interrupted by a worker stop:", interrupted);
  } catch (e) {
    console.warn(`worker: recovery pass failed (${(e as Error).message.split("\n")[0]}); retrying next pass`);
  } finally {
    recovering = false;
  }
}
await recover();
const recoveryTimer = setInterval(() => void recover(), 60_000);
recoveryTimer.unref();

const loop = new WorkerLoop({
  queue: sys.queue, run: (id, opts) => sys.service.runFiling(id, opts), workerId, tenants: workerTenants, idlePollMs: config.workerIdlePollMs,
});
const http = config.workerPort ? startWorkerHttp(config.workerPort, config.workerWakeToken, loop) : null;
if (http && !config.workerWakeToken) console.warn("worker: WORKER_WAKE_TOKEN is not set, so /wake is closed; new filings wait for the next periodic check");

// A deploy or restart sends SIGTERM: finish the filing in progress, take no new one, then exit.
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.once(signal, () => { console.log(`worker: ${signal}, stopping after the current filing`); loop.stop(); });
}
console.log("worker started");
await loop.runUntilStopped();
clearInterval(recoveryTimer);
http?.close();
await sys.harness.close();
console.log("worker stopped");
process.exit(0);
