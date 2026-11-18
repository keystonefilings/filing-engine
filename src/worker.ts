import { bootstrap } from "./bootstrap.js";

/** Worker tier (fixed-IP VM, decision 4): outbound-only; pulls jobs, drives browsers, uploads artifacts. */
const sys = await bootstrap({ withExecutor: true });
const flagged = await sys.service.reconcileOpenIntents();
if (flagged.length) console.warn("filings needing reconciliation:", flagged);
const interrupted = await sys.service.recoverInterruptedRuns();
if (interrupted.length) console.warn("filings interrupted by a worker stop:", interrupted);
const workerId = process.env.WORKER_ID ?? `worker-${process.pid}`;
// A service company's own worker (its own fixed IP) sets WORKER_TENANTS to its tenant id(s).
const workerTenants = (process.env.WORKER_TENANTS ?? "").split(",").map((t) => t.trim()).filter(Boolean);
console.log("worker started");
for (;;) {
  const job = await sys.queue.dequeue(workerId, workerTenants);
  if (!job) { await new Promise((r) => setTimeout(r, 2_000)); continue; }
  if (job.kind === "run_filing" && job.filingId) await sys.service.runFiling(job.filingId).catch((e) => console.error("run failed", e));
  await sys.queue.complete(job.id);
}
