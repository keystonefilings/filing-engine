import { config } from "./config.js";
import { MemoryStore } from "./store/memory.js";
import type { Store } from "./store/types.js";
import { FsArtifactStore } from "./artifacts/store.js";
import { ApprovalService } from "./approvals/service.js";
import { WebhookDispatcher } from "./webhooks/dispatcher.js";
import { InMemoryQueue, type JobQueue } from "./orchestrator/queue.js";
import { EnvVault } from "./settings/vault.js";
import { DriftReviewService } from "./drift-review/service.js";
import { FilingService } from "./orchestrator/service.js";
import { RunExecutor } from "./orchestrator/run.js";
import { BrowserHarness } from "./browser/harness.js";
import { ConcurrencyLimiter } from "./orchestrator/locks.js";

/** Wires one process. The API tier runs without an executor; the worker tier with one. */
export async function bootstrap(opts: { withExecutor: boolean }) {
  let store: Store = new MemoryStore();
  let queue: JobQueue = new InMemoryQueue();
  if (config.databaseUrl) {
    // Shared database: the cloud tier and the fixed-IP worker meet in Postgres (store + queue).
    const { PostgresStore } = await import("./store/postgres.js");
    const { PgQueue } = await import("./orchestrator/pg-queue.js");
    const pgStore = await PostgresStore.connect(config.databaseUrl);
    store = pgStore;
    queue = new PgQueue(pgStore.connectionPool);
  }
  const artifacts = new FsArtifactStore(config.artifactDir);
  const approvals = new ApprovalService({
    store, signingSecret: config.approvalSigningSecret, publicBaseUrl: config.publicBaseUrl, defaultTtlHours: config.approvalTtlHours,
  });
  const webhooks = new WebhookDispatcher(store);
  const vault = new EnvVault();
  const drift = new DriftReviewService(store);
  const harness = new BrowserHarness({ chromiumPath: config.chromiumPath, proxyServer: config.browserProxy, profileDir: config.browserProfileDir });
  const executor = opts.withExecutor ? new RunExecutor({ store, artifacts, harness, drift, vault }) : undefined;
  const limiter = new ConcurrencyLimiter({
    "site:IRS": config.siteConcurrency.IRS, "site:NY": config.siteConcurrency.NY, "site:NJ": config.siteConcurrency.NJ,
  });
  const service = new FilingService({ store, approvals, webhooks, queue, vault, drift, executor, limiter, dryRunDefault: config.dryRunDefault });
  return { store, artifacts, approvals, webhooks, queue, vault, drift, harness, executor, service };
}
