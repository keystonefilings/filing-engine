import path from "node:path";
import { parseSiteProxies, parseSteelProfiles } from "./browser/egress.js";

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
    /** Saved sign-ins by profile key, e.g. "nygov=<profile id>" (npm run steel-login). */
    profiles: parseSteelProfiles(process.env.STEEL_PROFILES),
    /** Hard cap per run; Keystone's Steel plan allows at most 15 minutes. */
    timeoutMs: envInt("STEEL_SESSION_TIMEOUT_MS", 15 * 60_000),
  },
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
