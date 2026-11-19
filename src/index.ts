import { bootstrap } from "./bootstrap.js";
import { buildServer } from "./api/server.js";
import { config } from "./config.js";

/**
 * Cloud tier: API + approval pages + webhook delivery. With WORKER_ENABLED=true the
 * same process also drains the queue (development). In production the worker runs
 * on the fixed-IP VM (src/worker.ts) against the shared Postgres queue.
 */
const sys = await bootstrap({ withExecutor: config.workerEnabled, workerId: process.env.WORKER_ID ?? "api-inprocess" });
/** "key:value,key2:value2" -> { key: value }. Entries without both parts are ignored. */
const parseKeys = (raw: string) => Object.fromEntries(raw.split(",").map((p) => p.trim()).flatMap((p) => {
  const i = p.indexOf(":");
  return i > 0 && i < p.length - 1 ? [[p.slice(0, i), p.slice(i + 1)] as [string, string]] : [];
}));
const app = buildServer({
  service: sys.service, approvals: sys.approvals, store: sys.store, artifacts: sys.artifacts, publicBaseUrl: config.publicBaseUrl,
  nameResolution: sys.nameResolution, reviewGate: sys.reviewGate,
  apiKeys: parseKeys(process.env.API_KEYS ?? "dev-key:keystone"),
  // Platform staff (tenant settings, drift reviews). No default: those routes refuse every caller until set.
  staffKeys: parseKeys(process.env.STAFF_API_KEYS ?? ""),
});

setInterval(() => void sys.webhooks.processDue(), 15_000).unref();
if (config.workerEnabled) {
  // Same lease-aware recovery as the worker tier, on start and then periodically.
  const recover = async () => {
    try {
      await sys.service.reconcileOpenIntents();
      await sys.service.recoverInterruptedRuns();
    } catch (e) { console.error("recovery pass failed", e); }
  };
  await recover();
  setInterval(() => void recover(), 60_000).unref();
  let busy = false;
  setInterval(async () => {
    if (busy) return;
    busy = true;
    try {
      const job = await sys.queue.dequeue("api-inprocess");
      if (job?.kind === "run_filing" && job.filingId) await sys.service.runFiling(job.filingId, { dryRun: job.dryRun }).catch((e) => console.error("run failed", e));
      if (job) await sys.queue.complete(job.id);
    } finally { busy = false; }
  }, 2_000).unref();
}

await app.listen({ port: config.port, host: "0.0.0.0" });
console.log(`filing engine listening on ${config.publicBaseUrl} (worker ${config.workerEnabled ? "on" : "off"}, dry-run default ${config.dryRunDefault})`);
