/**
 * After a deploy, run on each machine to check everything it depends on, one line each:
 *
 *   fly ssh console --app keystone-filing-engine --select -C "node --import tsx tools/check-deploy.ts"
 *
 * The role comes from Fly's process group (FLY_PROCESS_GROUP: api or worker) or the first
 * argument. Read-only, except that the worker check opens one Steel session and releases it at
 * once. Nothing secret is printed. Exit 1 when any check fails.
 */
import pg from "pg";
import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { config } from "../src/config.js";
import { startupProblems } from "../src/startup-check.js";
import { createSteelSession, redact } from "../src/browser/steel.js";
import { isSteel, parseRoute } from "../src/browser/egress.js";

const role = (process.argv[2] ?? process.env.FLY_PROCESS_GROUP ?? "api") === "worker" ? "worker" : "api";
let failed = 0;
const say = (mark: "ok" | "FAIL" | "note", what: string, detail = "") => {
  if (mark === "FAIL") failed++;
  console.log(redact(`${mark.padEnd(5)} ${what}${detail ? `: ${detail}` : ""}`, config.steel.apiKey));
};
const first = (e: unknown) => (e as Error).message.split("\n")[0];

console.log(`Checking the ${role} (${process.env.FLY_APP_NAME ?? "local"}, ${process.env.FLY_REGION ?? "no region"})\n`);

const problems = startupProblems(role);
if (problems.length) for (const p of problems) say("FAIL", "setting", p);
else say("ok", "settings");

if (config.databaseUrl) {
  const pool = new pg.Pool({ connectionString: config.databaseUrl, max: 1 });
  try {
    const r = await pool.query("select to_regclass('public.jobs') is not null as ready, (select count(*)::int from tenants) as tenants");
    say(r.rows[0].ready ? "ok" : "FAIL", "database", r.rows[0].ready ? `reachable, ${r.rows[0].tenants} tenant(s) configured` : "reachable, but the tables are missing (the API creates them on start)");
    const tenant = (process.env.WORKER_TENANTS ?? "keystone").split(",")[0]!.trim();
    const t = await pool.query("select 1 from tenants where id = $1", [tenant]);
    if (!t.rowCount) say("note", `tenant "${tenant}"`, "not configured yet (docs/deploy-fly.md, step 6)");
  } catch (e) {
    say("FAIL", "database", first(e));
  } finally {
    await pool.end().catch(() => {});
  }
}

if (config.artifactBucket) {
  try {
    const s3 = new S3Client({ ...(config.artifactS3.endpoint ? { endpoint: config.artifactS3.endpoint } : {}), region: config.artifactS3.region ?? "auto", forcePathStyle: config.artifactS3.forcePathStyle });
    await s3.send(new ListObjectsV2Command({ Bucket: config.artifactBucket, MaxKeys: 1 }));
    say("ok", "object storage", `bucket ${config.artifactBucket} reachable`);
  } catch (e) {
    say("FAIL", "object storage", first(e));
  }
}

if (role === "worker") {
  const def = config.browserProxy ? parseRoute(config.browserProxy) : null;
  if (isSteel(def) || Object.values(config.siteProxies).some((r) => isSteel(r))) {
    try {
      const s = await createSteelSession({ apiKey: config.steel.apiKey, apiUrl: config.steel.apiUrl, timeoutMs: 60_000 });
      await s.release();
      say("ok", "Steel", "the key opens a session (released at once)");
    } catch (e) {
      say("FAIL", "Steel", first(e));
    }
    const profiles = Object.keys(config.steel.profiles);
    say("note", "saved sign-ins", profiles.length ? profiles.join(", ") : "none yet (docs/deploy-fly.md, step 7)");
  }
}

if (role === "api" && config.workerWakeUrl) {
  try {
    const health = await fetch(config.workerWakeUrl.replace(/\/wake$/, "/healthz"), { signal: AbortSignal.timeout(5_000) });
    say(health.ok ? "ok" : "FAIL", "worker reachable from the API", health.ok ? "" : `HTTP ${health.status}`);
    const wake = await fetch(config.workerWakeUrl, { method: "POST", headers: { authorization: `Bearer ${config.workerWakeToken ?? ""}` }, signal: AbortSignal.timeout(5_000) });
    say(wake.status === 202 ? "ok" : "FAIL", "worker wake", wake.status === 202 ? "" : `HTTP ${wake.status} (is WORKER_WAKE_TOKEN the same on both?)`);
  } catch (e) {
    say("FAIL", "worker reachable from the API", `${first(e)} (check WORKER_WAKE_URL matches the app name; until it does, new filings start at the worker's next periodic check)`);
  }
}

if (role === "api") {
  const local = /localhost|127\.0\.0\.1/.test(config.publicBaseUrl);
  say("note", "approval links", local ? "PUBLIC_BASE_URL not set yet: links point at a placeholder (docs/deploy-fly.md, step 9)" : config.publicBaseUrl);
}

console.log(failed ? `\n${failed} check(s) failed.` : "\nAll checks passed.");
process.exit(failed ? 1 : 0);
