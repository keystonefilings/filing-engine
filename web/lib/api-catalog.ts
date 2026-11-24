/**
 * The public API, described once. The reference page (/docs/reference) and the OpenAPI document
 * (/openapi.json) are both built from this list, so they can't drift apart. Keep it in step with
 * src/api/server.ts and src/api/self-service.ts.
 */

export interface Endpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  group: "Filings" | "Client companies" | "Account" | "API keys" | "Webhooks" | "Usage" | "Approvals";
  summary: string;
  description?: string;
  auth: "api_key" | "none";
  query?: { name: string; description: string }[];
  body?: string;
  bodyExample?: unknown;
  responses: { status: number; description: string; example?: unknown }[];
}

export const EXAMPLE_FILING = {
  tenantId: "your-tenant",
  clientCompanyId: "acme-cpa",
  idempotencyKey: "acme-2026-0042",
  type: "formation",
  state: "NJ",
  formation: {
    name: { baseName: "Shore Analytics", designator: "LLC" },
    effectiveDate: "upon_filing",
    registeredAgentChoice: "filing_company",
    members: [{ name: "Avery Example", address: { street1: "1 Main St", city: "Trenton", state: "NJ", zip: "08608" } }],
    signers: [{ name: "Avery Example", title: "Authorized Representative" }],
  },
  contact: { firstName: "Avery", lastName: "Example", email: "avery@example.com", phone: "609-555-0100" },
  dryRun: true,
};

const FILING_OUT = { id: "f_01J…", status: "awaiting_approval", clientCompanyId: "acme-cpa", createdAt: "2026-11-24T15:02:11.000Z", updatedAt: "2026-11-24T15:02:11.000Z", artifacts: [], request: { type: "formation", state: "NJ", "…": "…" } };

export const ENDPOINTS: Endpoint[] = [
  {
    id: "create-filing", method: "POST", path: "/v1/filings", group: "Filings", auth: "api_key",
    summary: "Create a filing",
    description: "Validates the request, fills blanks from the firm's onboarding answers, checks completeness and fees, and sends the client an approval link. Nothing reaches a state site until the client approves. Sending the same idempotencyKey again returns the original filing with status 200.",
    body: "FilingRequest", bodyExample: EXAMPLE_FILING,
    responses: [
      { status: 201, description: "Created. `approvalLink` is set when the filing is waiting for the client's approval.", example: { filing: FILING_OUT, approvalLink: "https://api.example.com/approve/…", issues: [] } },
      { status: 200, description: "Already created with this idempotency key; the original filing." },
      { status: 401, description: "Missing or invalid API key." },
      { status: 403, description: "tenantId in the body is not your tenant." },
      { status: 422, description: "Validation failed. `issues` lists each problem with its path.", example: { error: "validation failed", issues: [{ path: "formation.county", message: "county is required in NY", severity: "error" }] } },
    ],
  },
  {
    id: "list-filings", method: "GET", path: "/v1/filings", group: "Filings", auth: "api_key",
    summary: "List filings, newest first",
    query: [{ name: "clientCompanyId", description: "Only this client company's filings." }, { name: "status", description: "Comma-separated statuses, e.g. `awaiting_approval,awaiting_information`." }],
    responses: [{ status: 200, description: "Your filings.", example: { filings: [FILING_OUT] } }],
  },
  {
    id: "get-filing", method: "GET", path: "/v1/filings/{id}", group: "Filings", auth: "api_key",
    summary: "Get a filing, its current run and any open approval link",
    responses: [{ status: 200, description: "The filing.", example: { filing: FILING_OUT, run: { id: "r_…", status: "running", dryRun: true, steps: [{ screenKey: "nj.business_name", at: "2026-11-24T15:10:00Z" }] }, approvalLink: "https://api.example.com/approve/…" } }, { status: 404, description: "Not found, or not yours." }],
  },
  {
    id: "supply-information", method: "POST", path: "/v1/filings/{id}/information", group: "Filings", auth: "api_key",
    summary: "Supply missing information",
    description: "For a filing in `awaiting_information`. The body is a partial FilingRequest, merged into the filing. When the filing is complete it moves on to approval.",
    body: "Partial FilingRequest", bodyExample: { formation: { county: "Albany" } },
    responses: [
      { status: 200, description: "`complete: false` with what is still `missing`, or `complete: true` with the filing and its approval link.", example: { complete: false, missing: [{ path: "formation.registeredAgent", label: "registered agent" }] } },
      { status: 409, description: "The filing is not waiting for information." },
      { status: 422, description: "The merged request is invalid." },
    ],
  },
  {
    id: "dry-run", method: "POST", path: "/v1/filings/{id}/dry-run", group: "Filings", auth: "api_key",
    summary: "Queue a dry run",
    description: "Walks the state site up to the final submit and stops. Nothing is filed and no fee is paid.",
    responses: [{ status: 202, description: "Queued.", example: { queued: true, dryRun: true } }],
  },
  {
    id: "deliveries", method: "GET", path: "/v1/filings/{id}/deliveries", group: "Filings", auth: "api_key",
    summary: "Webhook deliveries for a filing",
    responses: [{ status: 200, description: "Each delivery with its status and attempts." }],
  },
  {
    id: "messages", method: "GET", path: "/v1/filings/{id}/messages", group: "Filings", auth: "api_key",
    summary: "Messages sent about a filing (approval emails and reminders)",
    responses: [{ status: 200, description: "The messages." }],
  },
  {
    id: "artifact", method: "GET", path: "/v1/artifacts/{id}", group: "Filings", auth: "api_key",
    summary: "Download an artifact (filed document, receipt, EIN letter, screenshot)",
    responses: [{ status: 200, description: "The file, with its own content type." }, { status: 404, description: "Not found, or not yours." }],
  },
  {
    id: "list-client-companies", method: "GET", path: "/v1/client-companies", group: "Client companies", auth: "api_key",
    summary: "List your client companies (CPA, title and payroll firms)",
    responses: [{ status: 200, description: "Your firms.", example: { clientCompanies: [{ clientCompanyId: "acme-cpa", name: "Acme CPA", portal: { slug: "acme", displayName: "Acme CPA Filings" } }] } }],
  },
  {
    id: "get-client-company", method: "GET", path: "/v1/client-companies/{id}", group: "Client companies", auth: "api_key",
    summary: "Get one client company",
    responses: [{ status: 200, description: "The firm." }, { status: 404, description: "Not found, or not yours." }],
  },
  {
    id: "put-client-company", method: "PUT", path: "/v1/client-companies/{id}", group: "Client companies", auth: "api_key",
    summary: "Create or update a client company",
    description: "Includes the firm's onboarding answers, approvers and white-label portal settings (`portal.slug`, `displayName`, `logoUrl`, `primaryColor`, `supportEmail`, `filingKinds`).",
    body: "ClientCompanySettings", bodyExample: { name: "Acme CPA", defaultState: "NJ", portal: { slug: "acme", displayName: "Acme CPA Filings", primaryColor: "#1f4fd1" } },
    responses: [{ status: 200, description: "Saved.", example: { ok: true } }, { status: 409, description: "The id or portal slug is already used by another firm." }, { status: 422, description: "Invalid settings." }],
  },
  {
    id: "account", method: "GET", path: "/v1/account", group: "Account", auth: "api_key",
    summary: "Who this key belongs to",
    responses: [{ status: 200, description: "Your tenant.", example: { tenantId: "your-tenant", name: "Your Filing Co", configured: true, branding: { displayName: "Your Filing Co" }, webhookEndpointCount: 1 } }],
  },
  {
    id: "list-keys", method: "GET", path: "/v1/api-keys", group: "API keys", auth: "api_key",
    summary: "List API keys (never the keys themselves)",
    responses: [{ status: 200, description: "Keys with name, prefix, created, last used and revoked times.", example: { keys: [{ id: "…", name: "website", prefix: "kfe_AbCdEfGh", createdAt: "2026-11-24T15:00:00Z" }] } }],
  },
  {
    id: "create-key", method: "POST", path: "/v1/api-keys", group: "API keys", auth: "api_key",
    summary: "Create an API key",
    description: "The key is returned once, in `key`. Store it now; only its prefix is kept readable. Up to 20 live keys.",
    body: "{ name }", bodyExample: { name: "website" },
    responses: [{ status: 201, description: "Created.", example: { key: "kfe_…", apiKey: { id: "…", name: "website", prefix: "kfe_AbCdEfGh" } } }, { status: 409, description: "Already 20 live keys." }],
  },
  {
    id: "revoke-key", method: "DELETE", path: "/v1/api-keys/{id}", group: "API keys", auth: "api_key",
    summary: "Revoke an API key", description: "Takes effect at once. It can't be undone.",
    responses: [{ status: 200, description: "Revoked." }, { status: 404, description: "Not found, or not yours." }],
  },
  {
    id: "list-webhooks", method: "GET", path: "/v1/webhook-endpoints", group: "Webhooks", auth: "api_key",
    summary: "List webhook endpoints",
    description: "Secrets are never returned; `secretHint` shows the last four characters.",
    responses: [{ status: 200, description: "Endpoints.", example: { endpoints: [{ url: "https://hooks.example.com/keystone", events: ["filing.completed"], secretHint: "…9f2a" }] } }],
  },
  {
    id: "put-webhooks", method: "PUT", path: "/v1/webhook-endpoints", group: "Webhooks", auth: "api_key",
    summary: "Replace your webhook endpoints",
    description: "Sends the whole list (up to 10). An endpoint that keeps its URL keeps its secret. A new endpoint without a `secret` gets one generated, returned once in `generatedSecrets`. URLs must be public https.",
    body: "{ endpoints: [{ url, secret?, events? }] }", bodyExample: { endpoints: [{ url: "https://hooks.example.com/keystone", events: ["filing.awaiting_approval", "filing.completed", "filing.failed"] }] },
    responses: [{ status: 200, description: "Saved.", example: { endpoints: [{ url: "https://hooks.example.com/keystone", secretHint: "…9f2a" }], generatedSecrets: [{ url: "https://hooks.example.com/keystone", secret: "whsec_…" }] } }, { status: 409, description: "Your tenant isn't set up yet; ask the platform team." }, { status: 422, description: "A URL is not public https, or is listed twice." }],
  },
  {
    id: "list-events", method: "GET", path: "/v1/events", group: "Webhooks", auth: "none",
    summary: "The event types a webhook can receive",
    responses: [{ status: 200, description: "Event names.", example: { events: ["filing.validated", "filing.awaiting_approval", "…"] } }],
  },
  {
    id: "usage", method: "GET", path: "/v1/usage", group: "Usage", auth: "api_key",
    summary: "Usage for your tenant",
    description: "Filing counts by status, type, state, client company and month; webhook deliveries by status; API key counts.",
    responses: [{ status: 200, description: "Usage.", example: { tenantId: "your-tenant", filings: { total: 12, live: 3, byStatus: { completed: 9, awaiting_approval: 3 }, byMonth: { "2026-11": 12 } }, webhooks: { delivered: 40, failed: 1 }, apiKeys: { live: 2, revoked: 1 } } }],
  },
  {
    id: "approval-page", method: "GET", path: "/approve/{token}", group: "Approvals", auth: "none",
    summary: "The client's approval page",
    description: "The link sent to the client. It shows exactly what will be filed and the fees, and takes the client's approval or change request. Links expire.",
    responses: [{ status: 200, description: "HTML page." }, { status: 410, description: "The link expired or was already used." }],
  },
];

export const FILING_STATUSES: { status: string; meaning: string }[] = [
  { status: "created", meaning: "Received." },
  { status: "invalid", meaning: "Validation failed; see lastError and the filing.invalid event." },
  { status: "awaiting_information", meaning: "Something is missing; supply it with POST /v1/filings/{id}/information." },
  { status: "awaiting_approval", meaning: "Waiting for the client to approve on the approval page." },
  { status: "changes_requested", meaning: "The client asked for changes. Create a corrected filing with a new idempotency key." },
  { status: "approved", meaning: "Approved; a run is queued." },
  { status: "blocked", meaning: "Held by a policy, fee cap or site problem." },
  { status: "queued", meaning: "Waiting for a worker." },
  { status: "running", meaning: "The state site is being filled in." },
  { status: "awaiting_drift_review", meaning: "The state site changed; the platform team is checking the map." },
  { status: "awaiting_name_resolution", meaning: "The name was taken; alternatives are being offered." },
  { status: "awaiting_review_gate", meaning: "Stopped before submit for a staff check." },
  { status: "ein_filed", meaning: "The EIN was issued (EIN filings, or formation with EIN in the run)." },
  { status: "submitted", meaning: "Submitted to the state." },
  { status: "accepted", meaning: "The state accepted it." },
  { status: "rejected", meaning: "The state rejected it." },
  { status: "completed", meaning: "Done; documents are in artifacts." },
  { status: "failed", meaning: "The run failed; see lastError." },
  { status: "aborted", meaning: "Stopped by staff." },
  { status: "needs_reconciliation", meaning: "Unclear whether the state received it; staff are checking before anything is retried." },
];

/** OpenAPI 3.1 document built from ENDPOINTS. Schemas are summarized; the guides carry the field detail. */
export function openApiDocument(serverUrl: string): Record<string, unknown> {
  const paths: Record<string, Record<string, unknown>> = {};
  for (const e of ENDPOINTS) {
    const params = [...e.path.matchAll(/\{(\w+)\}/g)].map((m) => ({ name: m[1], in: "path", required: true, schema: { type: "string" } }));
    for (const q of e.query ?? []) params.push({ name: q.name, in: "query", required: false, schema: { type: "string" }, description: q.description } as never);
    const op: Record<string, unknown> = {
      operationId: e.id, tags: [e.group], summary: e.summary, description: e.description,
      parameters: params.length ? params : undefined,
      security: e.auth === "api_key" ? [{ apiKey: [] }] : [],
      responses: Object.fromEntries(e.responses.map((r) => [String(r.status), { description: r.description, ...(r.example !== undefined ? { content: { "application/json": { example: r.example } } } : {}) }])),
    };
    if (e.body) op.requestBody = { required: true, description: e.body, content: { "application/json": { schema: { type: "object" }, example: e.bodyExample } } };
    (paths[e.path] ??= {})[e.method.toLowerCase()] = op;
  }
  return {
    openapi: "3.1.0",
    info: { title: "Filing engine API", version: "1", description: "Automated state business filings: LLC formation, EINs, certificates and payroll registration, each approved by the client before it is filed." },
    servers: [{ url: serverUrl }],
    components: { securitySchemes: { apiKey: { type: "apiKey", in: "header", name: "x-api-key" } } },
    paths,
  };
}
