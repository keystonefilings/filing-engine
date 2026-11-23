import { bootstrap } from "./bootstrap.js";
import { buildServer } from "./api/server.js";
import { config } from "./config.js";
import { parseApiKeys, parseStaffKeys } from "./api/keys.js";
import { exitOnStartupProblems } from "./startup-check.js";

/**
 * Cloud tier: API + approval pages + webhook delivery. With WORKER_ENABLED=true the
 * same process also drains the queue (development). In production the worker runs
 * on the fixed-IP VM (src/worker.ts) against the shared Postgres queue.
 */
// Refuse to start on settings that would leave the API open, lose data or stall filings.
exitOnStartupProblems("api");
const sys = await bootstrap({ withExecutor: config.workerEnabled });
const app = buildServer({
  service: sys.service, approvals: sys.approvals, store: sys.store, artifacts: sys.artifacts, publicBaseUrl: config.publicBaseUrl,
  nameResolution: sys.nameResolution, reviewGate: sys.reviewGate,
  apiKeys: parseApiKeys(process.env.API_KEYS, config.production),
  staffKeys: parseStaffKeys(process.env.STAFF_API_KEYS, config.production),
});

setInterval(() => void sys.webhooks.processDue(), 15_000).unref();
if (config.workerEnabled) {
  await sys.service.reconcileOpenIntents();
  await sys.service.recoverInterruptedRuns();
  let busy = false;
  setInterval(async () => {
    if (busy) return;
    busy = true;
    try {
      const job = await sys.queue.dequeue("api-inprocess");
      if (job?.kind === "run_filing" && job.filingId) await sys.service.runFiling(job.filingId).catch((e) => console.error("run failed", e));
      if (job) await sys.queue.complete(job.id);
    } finally { busy = false; }
  }, 2_000).unref();
}

await app.listen({ port: config.port, host: "0.0.0.0" });
console.log(`filing engine listening on ${config.publicBaseUrl} (worker ${config.workerEnabled ? "on" : "off"}, dry-run default ${config.dryRunDefault})`);

// A deploy or restart sends SIGTERM. Inside a container this process is PID 1, which ignores the
// signal unless it handles it, so stop serving and exit instead of waiting to be killed.
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.once(signal, () => {
    console.log(`api: ${signal}, stopping`);
    void app.close().finally(() => process.exit(0));
    setTimeout(() => process.exit(0), 10_000).unref();
  });
}
