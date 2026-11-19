import { bootstrap } from "./bootstrap.js";

/** Worker tier (fixed-IP VM, decision 4): outbound-only; pulls jobs, drives browsers, uploads artifacts. */
const workerId = process.env.WORKER_ID ?? `worker-${process.pid}`;
// A service company's own worker (its own fixed IP) sets WORKER_TENANTS to its tenant id(s).
const workerTenants = (process.env.WORKER_TENANTS ?? "").split(",").map((t) => t.trim()).filter(Boolean);
const sys = await bootstrap({ withExecutor: true, workerId });

// Recovery touches only filings in this worker's tenants whose run lease lapsed, i.e. whose
// worker stopped renewing it. It runs on start and then periodically, so a crashed worker's
// filings are settled once its leases expire, while other live workers' runs are left alone.
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
    console.error("recovery pass failed", e);
  } finally {
    recovering = false;
  }
}
await recover();
setInterval(() => void recover(), 60_000).unref();

console.log("worker started");
for (;;) {
  const job = await sys.queue.dequeue(workerId, workerTenants);
  if (!job) { await new Promise((r) => setTimeout(r, 2_000)); continue; }
  if (job.kind === "run_filing" && job.filingId) await sys.service.runFiling(job.filingId, { dryRun: job.dryRun }).catch((e) => console.error("run failed", e));
  await sys.queue.complete(job.id);
}
