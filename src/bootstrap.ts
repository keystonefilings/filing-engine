import { config } from "./config.js";
import { MemoryStore } from "./store/memory.js";
import type { Store } from "./store/types.js";
import { FsArtifactStore, type ArtifactStore } from "./artifacts/store.js";
import { ApprovalService } from "./approvals/service.js";
import { WebhookDispatcher } from "./webhooks/dispatcher.js";
import { InMemoryQueue, type JobQueue } from "./orchestrator/queue.js";
import { EnvVault } from "./settings/vault.js";
import { DriftReviewService } from "./drift-review/service.js";
import { FilingService } from "./orchestrator/service.js";
import { RunExecutor } from "./orchestrator/run.js";
import { BrowserHarness } from "./browser/harness.js";
import { ConcurrencyLimiter } from "./orchestrator/locks.js";
import { NameResolutionService, DEFAULT_NAME_RESOLUTION_CONFIG } from "./name-resolution/service.js";
import { ReviewGateService } from "./review-gate/service.js";
import { RegisteredAgentService } from "./registered-agents/service.js";
import { Notifier } from "./comms/notifier.js";
import { LogChannelSender } from "./comms/senders.js";
import { StaticNameGenerator, AnthropicNameGenerator, type NameCandidateGenerator } from "./name-resolution/generator.js";
import type { NameCheckerRegistry } from "./name-resolution/checker.js";

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
  // The API wakes a separate worker after queuing a filing (Fly.io); an in-process worker needs no wake.
  if (config.workerWakeUrl && !opts.withExecutor) {
    const { WakingQueue, WorkerWaker } = await import("./orchestrator/wake.js");
    queue = new WakingQueue(queue, new WorkerWaker(config.workerWakeUrl, config.workerWakeToken));
  }
  const artifacts: ArtifactStore = config.artifactBucket
    ? new (await import("./artifacts/s3.js")).S3ArtifactStore({ bucket: config.artifactBucket, ...config.artifactS3 })
    : new FsArtifactStore(config.artifactDir);
  const approvals = new ApprovalService({
    store, signingSecret: config.approvalSigningSecret, publicBaseUrl: config.publicBaseUrl, defaultTtlHours: config.approvalTtlHours,
  });
  const webhooks = new WebhookDispatcher(store);
  const vault = new EnvVault();
  const drift = new DriftReviewService(store);
  // The only language model in a filing: name alternatives when a chosen name is taken.
  const generator: NameCandidateGenerator = config.anthropicApiKey
    ? new AnthropicNameGenerator({ apiKey: config.anthropicApiKey, model: config.nameGeneratorModel })
    : new StaticNameGenerator();
  // Live state name-search (availability) runs from the fixed-IP worker and is not mapped yet;
  // with no checker for a state, the admin sees AI options marked "not checked".
  const nameCheckers: NameCheckerRegistry = {};
  const nameResolution = new NameResolutionService({
    store, generator, checkers: nameCheckers, signingSecret: config.approvalSigningSecret, publicBaseUrl: config.publicBaseUrl,
    config: { ...DEFAULT_NAME_RESOLUTION_CONFIG, ttlHours: config.approvalTtlHours },
  });
  const reviewGate = new ReviewGateService({ store, signingSecret: config.approvalSigningSecret, publicBaseUrl: config.publicBaseUrl, ttlHours: config.approvalTtlHours });
  // Registered-agent resolution: client's own agent, the filing company's per-state agent, or a third-party provider.
  const registeredAgents = new RegisteredAgentService({ vault });
  // Outbound communication: real channel senders (email/Slack/SMS) plug in per tenant with
  // their own vault credentials; until then every message is recorded via the log sender.
  const notifier = new Notifier({ store, senders: {}, defaultSender: new LogChannelSender("email"), publicBaseUrl: config.publicBaseUrl });
  const harness = new BrowserHarness({ chromiumPath: config.chromiumPath, proxyServer: config.browserProxy, siteProxies: config.siteProxies, steel: config.steel, profileDir: config.browserProfileDir });
  const executor = opts.withExecutor ? new RunExecutor({ store, artifacts, harness, drift, vault, reviewGate, registeredAgents }) : undefined;
  const limiter = new ConcurrencyLimiter({
    "site:IRS": config.siteConcurrency.IRS, "site:NY": config.siteConcurrency.NY, "site:NJ": config.siteConcurrency.NJ,
  });
  const service = new FilingService({ store, approvals, webhooks, queue, vault, drift, nameResolution, reviewGate, registeredAgents, notifier, executor, limiter, dryRunDefault: config.dryRunDefault });
  return { store, artifacts, approvals, webhooks, queue, vault, drift, nameResolution, reviewGate, registeredAgents, notifier, harness, executor, service };
}
