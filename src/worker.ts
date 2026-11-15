import { bootstrap } from "./bootstrap.js";

/** Worker tier (fixed-IP VM, decision 4): outbound-only; pulls jobs, drives browsers, uploads artifacts. */
const sys = await bootstrap({ withExecutor: true });
const flagged = await sys.service.reconcileOpenIntents();
if (flagged.length) console.warn("filings needing reconciliation:", flagged);
console.log("worker started");
for (;;) {
  const job = await sys.queue.dequeue();
  if (!job) { await new Promise((r) => setTimeout(r, 2_000)); continue; }
  if (job.kind === "run_filing" && job.filingId) await sys.service.runFiling(job.filingId).catch((e) => console.error("run failed", e));
}
