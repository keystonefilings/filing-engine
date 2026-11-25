import { config } from "./config.js";
import { parseApiKeys, parseStaffKeys } from "./api/keys.js";
import { ADAPTERS } from "./adapters/index.js";
import { browserSetupProblems } from "./browser/setup-check.js";

export interface DeploySettings {
  role: "api" | "worker";
  production: boolean;
  databaseUrl: string | null;
  dataEncryptionKey?: string | null;
  /** Fly sets FLY_APP_NAME on every machine. */
  onFly: boolean;
  artifactBucket: string | null;
  workerWakeUrl: string | null;
  workerPort: number | null;
  workerWakeToken: string | null;
}

/** Production settings that would lose data or stall filings without an error later. */
export function deployProblems(s: DeploySettings): string[] {
  if (!s.production) return [];
  const p: string[] = [];
  if (!s.databaseUrl) p.push("DATABASE_URL is not set: filings would be kept in memory and lost on every restart");
  if (s.databaseUrl && !s.dataEncryptionKey) p.push("DATA_ENCRYPTION_KEY is not set: Social Security numbers would be stored unencrypted (openssl rand -hex 32)");
  if (s.onFly && !s.artifactBucket) {
    p.push("no object storage for documents and screenshots (ARTIFACT_BUCKET or BUCKET_NAME): on Fly the API cannot read the worker's disk and every deploy wipes it; run fly storage create");
  }
  if (s.role === "api" && s.workerWakeUrl && !s.workerWakeToken) p.push("WORKER_WAKE_URL is set but WORKER_WAKE_TOKEN is not: the worker would refuse every wake");
  if (s.role === "worker" && s.workerPort && !s.workerWakeToken) p.push("WORKER_PORT is set but WORKER_WAKE_TOKEN is not: /wake would stay closed");
  return p;
}

/** V33: billing switched on without what it needs would refuse every live filing. */
export function billingProblems(s: { secretKey: string | null; webhookSecret?: string; prices: { enterprise?: string; partner?: string }; required: boolean }): string[] {
  const p: string[] = [];
  if (!s.required) return p;
  if (!s.secretKey) p.push("BILLING_REQUIRED is on but STRIPE_SECRET_KEY is not set: nobody could subscribe, so every live filing would be refused");
  if (!s.webhookSecret) p.push("BILLING_REQUIRED is on but STRIPE_WEBHOOK_SECRET is not set: payments would never be recorded");
  if (!s.prices.enterprise && !s.prices.partner) p.push("BILLING_REQUIRED is on but no price is set (STRIPE_PRICE_ENTERPRISE, STRIPE_PRICE_PARTNER)");
  return p;
}

/** Everything wrong with this process's settings, all at once, so one pass of fixes is enough. */
export function startupProblems(role: "api" | "worker", env: NodeJS.ProcessEnv = process.env): string[] {
  const p = [...config.problems];
  if (role === "api") {
    for (const parse of [() => parseApiKeys(env.API_KEYS, config.production), () => parseStaffKeys(env.STAFF_API_KEYS, config.production)]) {
      try { parse(); } catch (e) { p.push((e as Error).message); }
    }
  }
  p.push(...deployProblems({
    role, production: config.production, databaseUrl: config.databaseUrl, dataEncryptionKey: config.dataEncryptionKey, onFly: !!env.FLY_APP_NAME,
    artifactBucket: config.artifactBucket, workerWakeUrl: config.workerWakeUrl, workerPort: config.workerPort, workerWakeToken: config.workerWakeToken,
  }));
  p.push(...billingProblems(config.stripe));
  if (role === "worker" || config.workerEnabled) {
    p.push(...browserSetupProblems({
      sites: Object.values(ADAPTERS).map((a) => a.site), browserProxy: config.browserProxy, siteProxies: config.siteProxies,
      steelOnly: config.browsersSteelOnly, production: config.production, steelKeySet: !!config.steel.apiKey,
    }));
  }
  return p;
}

/** Print every problem and exit before connecting to anything. */
export function exitOnStartupProblems(role: "api" | "worker"): void {
  const p = startupProblems(role);
  if (!p.length) return;
  for (const line of p) console.error(`${role} not started: ${line}`);
  process.exit(1);
}
