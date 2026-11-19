import { bootstrap } from "./bootstrap.js";
import { buildServer } from "./api/server.js";
import { config } from "./config.js";

/**
 * Cloud tier: API + approval pages + webhook delivery. With WORKER_ENABLED=true the
 * same process also drains the queue (development). In production the worker runs
 * on the fixed-IP VM (src/worker.ts) against the shared Postgres queue.
 */
const sys = await bootstrap({ withExecutor: config.workerEnabled });
const app = buildServer({
  service: sys.service, approvals: sys.approvals, store: sys.store, artifacts: sys.artifacts, publicBaseUrl: config.publicBaseUrl,
  nameResolution: sys.nameResolution, reviewGate: sys.reviewGate,
  apiKeys: Object.fromEntries((process.env.API_KEYS ?? "dev-key:keystone").split(",").map((p) => p.split(":") as [string, string])),
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
