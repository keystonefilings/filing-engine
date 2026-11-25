import { ENDPOINTS } from "./api-catalog";
import { EVENT_NAMES } from "@/app/docs/events";
import { FILING_KINDS } from "./intake/forms";

/** The filing request's JSON Schema from the engine (null if it can't be reached right now). */
export async function filingRequestSchema(engineUrl: string): Promise<unknown | null> {
  try {
    const r = await fetch(`${engineUrl}/v1/schema/filing-request`, { next: { revalidate: 3600 } });
    return r.ok ? await r.json() : null;
  } catch { return null; }
}

/**
 * V34: the whole API as one Markdown file (/docs.md), for developers and for AI coding agents
 * (/llms.txt points here). Built from the same catalog as the docs pages, so they never disagree.
 */
export function docsMarkdown(api: string, site: string, name: string): string {
  const out: string[] = [];
  out.push(`# ${name} API`, "", `Base URL: ${api}`, "", "Automated state business filings: LLC and corporation formation, EINs, certificates and payroll registration. Every filing is approved by the client before it is submitted.", "");
  out.push("Machine-readable: OpenAPI 3.1 at " + `${site}/openapi.json` + " (includes the full FilingRequest JSON Schema and every webhook).", "");
  out.push("## Authentication", "", "Send your API key in the `x-api-key` header. Keys belong to one account and see only its filings. Keep them on your server.", "");
  out.push("```bash", `curl ${api}/v1/account -H "x-api-key: $COFILE_API_KEY"`, "```", "");
  out.push("```python", "import os, requests", `r = requests.get("${api}/v1/account", headers={"x-api-key": os.environ["COFILE_API_KEY"]})`, "print(r.json())", "```", "");
  out.push("## How a filing goes", "", "1. `POST /v1/filings` with a FilingRequest. Missing answers: status `awaiting_information` (send them with `POST /v1/filings/{id}/information`).",
    "2. Where the state's review screen is mapped, a preview run takes the state's own review page (`previewing`).",
    "3. The client approves through the approval link (`filing.awaiting_approval` carries it), or you record it with `POST /v1/filings/{id}/approval`.",
    "4. The engine files: `filing.started`, `filing.submitted`, then `filing.accepted` and `filing.completed` with the documents. The live run stops before paying if the state's review page differs from the approved one.", "");
  out.push("## Filing types", "", "| Filing | type | state |", "|---|---|---|", ...FILING_KINDS.map((k) => `| ${k.title} | \`${k.type}\` | ${k.type === "ein_only" ? "any" : k.state} |`), "");
  out.push("## Endpoints", "");
  for (const e of ENDPOINTS) {
    out.push(`### ${e.method} ${e.path}`, "", `**${e.summary}.** ${e.description ?? ""}`.trim(), "");
    if (e.query?.length) out.push("Query: " + e.query.map((q) => `\`${q.name}\` (${q.description})`).join("; "), "");
    if (e.body) out.push(`Body: ${e.body}`, "");
    if (e.bodyExample !== undefined) out.push("```json", JSON.stringify(e.bodyExample, null, 2), "```", "");
    out.push(...e.responses.map((r) => `- ${r.status}: ${r.description}`), "");
  }
  out.push("## Webhooks", "", "Each event is POSTed as JSON `{ id, type, tenantId, filingId, runId?, occurredAt, data }` with headers `x-cofile-event`, `x-cofile-delivery` and `x-cofile-signature: t=<unix>,v1=<hex>`, where v1 is HMAC-SHA256 of `${t}.${rawBody}` with your endpoint secret. Answer 2xx within a few seconds; anything else is retried after 1m, 5m, 30m, 2h and 12h.", "");
  out.push("```javascript", 'import { createHmac, timingSafeEqual } from "node:crypto";', "export function verify(secret, header, rawBody, toleranceSec = 300) {",
    '  const parts = Object.fromEntries(header.split(",").map((p) => p.split("=")));',
    "  if (Math.abs(Date.now() / 1000 - Number(parts.t)) > toleranceSec) return false;",
    '  const expected = Buffer.from(createHmac("sha256", secret).update(`${parts.t}.${rawBody}`).digest("hex"));',
    "  const got = Buffer.from(parts.v1 ?? \"\");", "  return got.length === expected.length && timingSafeEqual(got, expected);", "}", "```", "");
  out.push("```python", "import hmac, hashlib, time", "def verify(secret: str, header: str, raw_body: bytes, tolerance: int = 300) -> bool:",
    '    parts = dict(p.split("=", 1) for p in header.split(","))',
    '    if abs(time.time() - int(parts["t"])) > tolerance:', "        return False",
    '    expected = hmac.new(secret.encode(), f"{parts[\'t\']}.".encode() + raw_body, hashlib.sha256).hexdigest()',
    '    return hmac.compare_digest(expected, parts.get("v1", ""))', "```", "");
  out.push("### Events", "", ...EVENT_NAMES.map(([n, w]) => `- \`${n}\`: ${w}`), "");
  return out.join("\n");
}
