import path from "node:path";
import { parseSiteProxies, parseSteelProfiles } from "./browser/egress.js";
import { signingSecretFrom } from "./api/keys.js";

/** The Docker image sets NODE_ENV=production: no development defaults for keys or secrets there. */
const production = process.env.NODE_ENV === "production";
/** Settings that are wrong for this environment, collected so start-up reports them all at once (startup-check.ts). */
const problems: string[] = [];
function collect<T>(read: () => T, fallback: T): T {
  try { return read(); } catch (e) { problems.push((e as Error).message); return fallback; }
}

function env(name: string, fallback?: string): string {
  const v = process.env[name];
  if (v === undefined || v === "") {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing required environment variable ${name}`);
  }
  return v;
}

function envInt(name: string, fallback: number): number {
  const v = process.env[name];
  if (v === undefined || v === "") return fallback;
  const n = Number(v);
  if (!Number.isInteger(n)) throw new Error(`${name} must be an integer`);
  return n;
}

export const config = {
  production,
  problems,
  port: envInt("PORT", 8080),
  publicBaseUrl: env("PUBLIC_BASE_URL", "http://localhost:8080"),
  approvalSigningSecret: collect(() => signingSecretFrom(process.env.APPROVAL_SIGNING_SECRET, production), ""),
  approvalTtlHours: envInt("APPROVAL_TTL_HOURS", 168),
  databaseUrl: process.env.DATABASE_URL || null,
  /** Seals SSNs in the database (store/sensitive.ts): 64 hex characters. Required in production. */
  dataEncryptionKey: collect(() => {
    const v = process.env.DATA_ENCRYPTION_KEY || null;
    if (v && !/^[0-9a-fA-F]{64}$/.test(v)) throw new Error("DATA_ENCRYPTION_KEY must be 64 hex characters (openssl rand -hex 32)");
    return v;
  }, null),
  /** Days after a filing is completed or aborted before its SSNs are replaced by the masked form. */
  sensitiveRetentionDays: envInt("SENSITIVE_RETENTION_DAYS", 30),
  artifactDir: path.resolve(env("ARTIFACT_DIR", "./var/artifacts")),
  /** Object storage for artifacts, shared by an API and a worker on different machines (Fly.io).
   *  Fly Tigris (fly storage create) sets BUCKET_NAME and the AWS_* variables; unset = ARTIFACT_DIR. */
  artifactBucket: process.env.ARTIFACT_BUCKET || process.env.BUCKET_NAME || null,
  artifactS3: {
    endpoint: process.env.AWS_ENDPOINT_URL_S3 || undefined,
    region: process.env.AWS_REGION || undefined,
    forcePathStyle: process.env.ARTIFACT_S3_PATH_STYLE === "true",
  },
  /** API side: the worker's wake endpoint (POST), called after a filing is queued. Unset = no wake. */
  workerWakeUrl: process.env.WORKER_WAKE_URL || null,
  /** Shared by the API (sends it) and the worker (checks it). */
  workerWakeToken: process.env.WORKER_WAKE_TOKEN || null,
  /** Worker side: the port for /healthz and /wake (unset = no HTTP listener), and how long it waits between checks when idle. */
  workerPort: process.env.WORKER_PORT ? envInt("WORKER_PORT", 8081) : null,
  workerIdlePollMs: envInt("WORKER_IDLE_POLL_MS", 2_000),
  /** The API process also runs filings (development). Off by default in production, where the
   *  worker is its own process: an API that stops when idle must never be mid-filing. */
  workerEnabled: env("WORKER_ENABLED", production ? "false" : "true") === "true",
  chromiumPath: process.env.PW_CHROMIUM_PATH || null,
  /** Default network route for the browser (see browser/egress.ts): a proxy URL or "steel"; unset = direct. */
  browserProxy: process.env.BROWSER_PROXY || null,
  /** Per-portal routes, e.g. "IRS=steel,NY=steel,MO=http://office:3128,NJ=direct". Only the
   *  portals that refuse the worker's own network need one (npm run probe-sites shows which). */
  siteProxies: parseSiteProxies(process.env.SITE_PROXIES),
  /** Steel hosted browsers, for sites routed "steel" (browser/steel.ts). The key comes from the
   *  deployment's secret store, never a committed file. */
  steel: {
    apiKey: process.env.STEEL_API_KEY || null,
    apiUrl: process.env.STEEL_API_URL || undefined,
    connectUrl: process.env.STEEL_CONNECT_URL || undefined,
    /** Saved sign-ins by profile key, e.g. "nygov:keystone=<profile id>" (npm run steel-login). */
    profiles: parseSteelProfiles(process.env.STEEL_PROFILES),
    /** Hard cap per run; Keystone's Steel plan allows at most 15 minutes. */
    timeoutMs: envInt("STEEL_SESSION_TIMEOUT_MS", 15 * 60_000),
  },
  browserProfileDir: path.resolve(env("BROWSER_PROFILE_DIR", "./var/profiles")),
  /** "steel-only": this image ships no local browser (Dockerfile target "steel"); every site must route to Steel. */
  browsersSteelOnly: process.env.BROWSERS === "steel-only",
  dryRunDefault: env("DRY_RUN_DEFAULT", "true") === "true",
  /** The platform's own tenant: partner firms that sign up on the landing page join it. */
  platformTenantId: env("PLATFORM_TENANT_ID", "keystone"),
  /** The site's name, shown to clients on approval pages (partner firms are "with CoFile"). */
  platformName: env("PLATFORM_NAME", "CoFile"),
  /** The web front end (web/): links in account emails (password reset) point here. */
  webBaseUrl: env("WEB_BASE_URL", "http://localhost:3000").replace(/\/+$/, ""),
  /** V33: subscriptions through Stripe Billing (billing/). Prices are made in Stripe and named here. */
  stripe: {
    /** A restricted key: write on Customers, Checkout Sessions and Customer portal; read on Prices. */
    secretKey: process.env.STRIPE_SECRET_KEY || null,
    /** Only for stripe-mock or a local stand-in; unset in production. */
    apiUrl: process.env.STRIPE_API_URL || undefined,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || undefined,
    prices: { enterprise: process.env.STRIPE_PRICE_ENTERPRISE || undefined, partner: process.env.STRIPE_PRICE_PARTNER || undefined },
    trialDays: process.env.STRIPE_TRIAL_DAYS ? Number(process.env.STRIPE_TRIAL_DAYS) : undefined,
    /** On: a live filing needs a subscription in good standing. Off until prices are set. */
    required: env("BILLING_REQUIRED", "false") === "true",
  },
  /** V18: Basis Theory private key (token:read) the worker uses to read a card at the payment screen. */
  basisTheoryApiKey: process.env.BASIS_THEORY_API_KEY || null,
  /** Email through Resend (comms/resend.ts). No key: every message is recorded, none is sent. */
  email: {
    resendApiKey: process.env.RESEND_API_KEY || null,
    /** A sender on a domain verified in Resend. */
    from: env("EMAIL_FROM", "CoFile <filings@cofile.app>"),
    replyTo: process.env.EMAIL_REPLY_TO || undefined,
  },
  /** Name-resolution AI generator (the only LLM in a filing). No key -> deterministic static generator. */
  anthropicApiKey: process.env.ANTHROPIC_API_KEY || null,
  nameGeneratorModel: env("NAME_GENERATOR_MODEL", "claude-haiku-5-5"),
  siteConcurrency: {
    IRS: envInt("SITE_CONCURRENCY_IRS", 1),
    NY: envInt("SITE_CONCURRENCY_NY", 1),
    NJ: envInt("SITE_CONCURRENCY_NJ", 1),
  },
};

export type Config = typeof config;
