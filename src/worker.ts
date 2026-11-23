import { bootstrap } from "./bootstrap.js";
import { config } from "./config.js";
import { ADAPTERS } from "./adapters/index.js";
import { browserSetupProblems } from "./browser/setup-check.js";

// Refuse to start on browser settings that would fail every run on some site.
const problems = browserSetupProblems({
  sites: Object.values(ADAPTERS).map((a) => a.site), browserProxy: config.browserProxy, siteProxies: config.siteProxies,
  steelOnly: config.browsersSteelOnly, production: config.production, steelKeySet: !!config.steel.apiKey,
});
if (problems.length) { for (const p of problems) console.error(`worker not started: ${p}`); process.exit(1); }

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
