import { bootstrap } from "./bootstrap.js";
import { config } from "./config.js";
import { exitOnStartupProblems } from "./startup-check.js";
import { startWorkerHttp, WorkerLoop } from "./orchestrator/worker-loop.js";

// Refuse to start on settings that would lose data or fail every run on some site.
exitOnStartupProblems("worker");

/** Worker tier (fixed-IP VM, decision 4): outbound-only; pulls jobs, drives browsers, uploads artifacts. */
const sys = await bootstrap({ withExecutor: true });
const flagged = await sys.service.reconcileOpenIntents();
if (flagged.length) console.warn("filings needing reconciliation:", flagged);
const interrupted = await sys.service.recoverInterruptedRuns();
if (interrupted.length) console.warn("filings interrupted by a worker stop:", interrupted);
const workerId = process.env.WORKER_ID ?? `worker-${process.pid}`;
// A service company's own worker sets WORKER_TENANTS to its tenant id(s).
const workerTenants = (process.env.WORKER_TENANTS ?? "").split(",").map((t) => t.trim()).filter(Boolean);
const loop = new WorkerLoop({
  queue: sys.queue, run: (id) => sys.service.runFiling(id), workerId, tenants: workerTenants, idlePollMs: config.workerIdlePollMs,
});
const http = config.workerPort ? startWorkerHttp(config.workerPort, config.workerWakeToken, loop) : null;
if (http && !config.workerWakeToken) console.warn("worker: WORKER_WAKE_TOKEN is not set, so /wake is closed; new filings wait for the next periodic check");

// A deploy or restart sends SIGTERM: finish the filing in progress, take no new one, then exit.
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.once(signal, () => { console.log(`worker: ${signal}, stopping after the current filing`); loop.stop(); });
}
console.log("worker started");
await loop.runUntilStopped();
http?.close();
await sys.harness.close();
console.log("worker stopped");
process.exit(0);
