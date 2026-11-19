import path from "node:path";

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
  port: envInt("PORT", 8080),
  publicBaseUrl: env("PUBLIC_BASE_URL", "http://localhost:8080"),
  approvalSigningSecret: env("APPROVAL_SIGNING_SECRET", "dev-only-secret-not-for-production"),
  approvalTtlHours: envInt("APPROVAL_TTL_HOURS", 168),
  databaseUrl: process.env.DATABASE_URL || null,
  artifactDir: path.resolve(env("ARTIFACT_DIR", "./var/artifacts")),
  workerEnabled: env("WORKER_ENABLED", "true") === "true",
  chromiumPath: process.env.PW_CHROMIUM_PATH || null,
  /** Decision 4: route the browser through the fixed-IP proxy when the worker is not itself on that IP. */
  browserProxy: process.env.BROWSER_PROXY || null,
  browserProfileDir: path.resolve(env("BROWSER_PROFILE_DIR", "./var/profiles")),
  dryRunDefault: env("DRY_RUN_DEFAULT", "true") === "true",
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
