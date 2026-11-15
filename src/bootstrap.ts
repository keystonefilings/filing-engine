import { config } from "./config.js";
import { MemoryStore } from "./store/memory.js";
import type { Store } from "./store/types.js";
import { FsArtifactStore } from "./artifacts/store.js";
import { ApprovalService } from "./approvals/service.js";
import { WebhookDispatcher } from "./webhooks/dispatcher.js";
import { InMemoryQueue } from "./orchestrator/queue.js";
import { EnvVault } from "./settings/vault.js";
import { DriftReviewService } from "./drift-review/service.js";
import { FilingService } from "./orchestrator/service.js";
import { RunExecutor } from "./orchestrator/run.js";
import { BrowserHarness } from "./browser/harness.js";
import { ConcurrencyLimiter } from "./orchestrator/locks.js";

/** Wires one process. The API tier runs without an executor; the worker tier with one. */
export async function bootstrap(opts: { withExecutor: boolean }) {
  let store: Store = new MemoryStore();
  if (config.databaseUrl) {
    const { PostgresStore } = await import("./store/postgres.js");
    store = await PostgresStore.connect(config.databaseUrl);
  }
  const artifacts = new FsArtifactStore(config.artifactDir);
  const approvals = new ApprovalService({
    store, signingSecret: config.approvalSigningSecret, publicBaseUrl: config.publicBaseUrl, defaultTtlHours: config.approvalTtlHours,
  });
  const webhooks = new WebhookDispatcher(store);
  const queue = new InMemoryQueue();
  const vault = new EnvVault();
  const drift = new DriftReviewService(store);
  const harness = new BrowserHarness({ chromiumPath: config.chromiumPath, profileDir: config.browserProfileDir });
  const executor = opts.withExecutor ? new RunExecutor({ store, artifacts, harness, drift, vault }) : undefined;
  const limiter = new ConcurrencyLimiter({
    "site:IRS": config.siteConcurrency.IRS, "site:NY": config.siteConcurrency.NY, "site:NJ": config.siteConcurrency.NJ,
  });
  const service = new FilingService({ store, approvals, webhooks, queue, vault, drift, executor, limiter, dryRunDefault: config.dryRunDefault });
  return { store, artifacts, approvals, webhooks, queue, vault, drift, harness, executor, service };
}
