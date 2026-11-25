/**
 * The public API, described once. The reference page (/docs/reference) and the OpenAPI document
 * (/openapi.json) are both built from this list, so they can't drift apart. Keep it in step with
 * src/api/server.ts and src/api/self-service.ts.
 */

export interface Endpoint {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  group: "Filings" | "Client companies" | "Account" | "API keys" | "Webhooks" | "Usage" | "Approvals" | "Signatures";
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
      { status: 402, description: "A live filing needs an active subscription (practice filings are free).", example: { error: "a subscription is needed to file for real (practice filings are free)", billing: { plan: "enterprise", status: "none" } } },
    ],
  },
  {
    id: "list-filings", method: "GET", path: "/v1/filings", group: "Filings", auth: "api_key",
    summary: "List filings, newest first",
    query: [
      { name: "clientCompanyId", description: "Only this client company's filings." }, { name: "status", description: "Comma-separated statuses, e.g. `awaiting_approval,awaiting_information`." },
      { name: "limit", description: "Page size, 1 to 200. Without it, every filing comes back in one list." },
      { name: "before", description: "The `nextBefore` of the previous page, for the next one." },
    ],
    responses: [{ status: 200, description: "Your filings, and `nextBefore` (null on the last page) when `limit` is given.", example: { filings: [FILING_OUT], nextBefore: "2026-11-25T20:41:00.000Z|f_122" } }],
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
    id: "cancel-filing", method: "POST", path: "/v1/filings/{id}/cancel", group: "Filings", auth: "api_key",
    summary: "Cancel a filing",
    description: "Before anything has started at the state: any status up to `queued`, and `failed`. The approval link stops working and `filing.aborted` is sent. A running or submitted filing can't be cancelled.",
    body: "{ reason? }", bodyExample: { reason: "The client changed their mind" },
    responses: [{ status: 200, description: "The filing, now `aborted`.", example: { filing: { id: "f_123", status: "aborted" } } }, { status: 409, description: "The filing has started at the state, or is already finished." }],
  },
  {
    id: "record-approval", method: "POST", path: "/v1/filings/{id}/approval", group: "Filings", auth: "api_key",
    summary: "Record the client's approval",
    description: "When you collect the client's approval in your own app instead of sending them the approval link. The same single decision as the link: it applies to the exact data and fees waiting for approval. You vouch for who approved (`approvedBy`); send `code` if the firm requires a one-time code.",
    body: "{ decision, approvedBy, comment?, code? }", bodyExample: { decision: "approve", approvedBy: "Sam Rivera, in our client portal" },
    responses: [{ status: 200, description: "The filing, now approved and queued.", example: { filing: { id: "f_123", status: "queued" } } }, { status: 409, description: "No approval is waiting, or it was already decided." }],
  },
  {
    id: "webhook-test", method: "POST", path: "/v1/webhooks/test", group: "Webhooks", auth: "api_key",
    summary: "Send a test delivery",
    description: "Sends a `webhook.test` event to each of your endpoints, signed like any other delivery, so you can check your receiver.",
    responses: [{ status: 202, description: "Sent; each endpoint's result.", example: { eventId: "e_1", deliveries: [{ url: "https://hooks.example.com/cofile", status: "delivered", attempts: 1, lastStatusCode: 200 }] } }, { status: 409, description: "No endpoints are set up." }],
  },
  {
    id: "webhook-deliveries", method: "GET", path: "/v1/webhooks/deliveries", group: "Webhooks", auth: "api_key",
    summary: "Recent deliveries",
    description: "Your most recent webhook deliveries, newest first, with their status and the last answer from your endpoint.",
    query: [{ name: "limit", description: "1 to 200, default 50." }],
    responses: [{ status: 200, description: "Deliveries.", example: { deliveries: [{ id: "d_1", url: "https://hooks.example.com/cofile", eventType: "filing.completed", filingId: "f_123", status: "delivered", attempts: 1, lastStatusCode: 200 }] } }],
  },
  {
    id: "preview", method: "POST", path: "/v1/filings/{id}/preview", group: "Filings", auth: "api_key",
    summary: "Take the state's review page again",
    description: "Where the client approves the state's own review page, a preview run takes it before the approval link is sent. If a preview failed, was blocked, or its site-change review is done, this starts a new one; the approval link follows when it ends.",
    responses: [
      { status: 202, description: "The filing, now `previewing`.", example: { filing: { id: "f_123", status: "previewing" } } },
      { status: 409, description: "The filing is not failed, blocked or waiting for a site-change review." },
    ],
  },
  {
    id: "record-outcome", method: "POST", path: "/v1/filings/{id}/outcome", group: "Filings", auth: "api_key",
    summary: "Record the state's answer",
    description: "For a `submitted` filing whose state answers later (New York's receipt email, a Florida examiner's review). `accepted` attaches up to five documents (PDF, PNG or JPEG, base64, 10 MB each), then sends `filing.accepted` and `filing.completed`; the completion email carries the documents. `rejected` sends `filing.rejected` with the reason.",
    body: "{ outcome, reference?, reason?, documents? }",
    bodyExample: { outcome: "accepted", reference: "DOS-2026-1188", documents: [{ label: "Filing receipt", kind: "filing_receipt", contentType: "application/pdf", data: "JVBERi0xLjQK..." }] },
    responses: [
      { status: 200, description: "The filing, now `completed` or `rejected`.", example: { filing: { id: "f_123", status: "completed" } } },
      { status: 409, description: "The filing is not `submitted`." },
      { status: 422, description: "The body is invalid, or a document is empty or over 10 MB." },
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
    description: "Includes the firm's onboarding answers, approvers and white-label portal settings (`portal.slug`, `displayName`, `logoUrl`, `primaryColor`, `secondaryColor`, `supportEmail`, `filingKinds`). Leave `portal.slug` out and the firm keeps its address, or gets one made from its name.",
    body: "ClientCompanySettings", bodyExample: { name: "Acme CPA", defaultState: "NJ", portal: { displayName: "Acme CPA Filings", primaryColor: "#1f4fd1", secondaryColor: "#0f766e" } },
    responses: [{ status: 200, description: "Saved.", example: { ok: true, portalSlug: "acme-cpa" } }, { status: 409, description: "The id or portal slug is already used by another firm." }, { status: 422, description: "Invalid settings." }],
  },
  {
    id: "put-client-company-logo", method: "PUT", path: "/v1/client-companies/{id}/logo", group: "Client companies", auth: "api_key",
    summary: "Upload a firm's logo",
    description: "A PNG, JPEG or WebP picture of 512 KB or less, base64 in `data` (a `data:` URL is fine). SVG isn't accepted. The logo is shown ahead of `portal.logoUrl` and replaces it.",
    bodyExample: { data: "data:image/png;base64,iVBORw0KGgo…" },
    responses: [{ status: 200, description: "Saved, with the logo's id.", example: { logoArtifactId: "6f1c…" } }, { status: 404, description: "Not found, or not yours." }, { status: 422, description: "Not a PNG, JPEG or WebP picture, or too large." }],
  },
  {
    id: "delete-client-company-logo", method: "DELETE", path: "/v1/client-companies/{id}/logo", group: "Client companies", auth: "api_key",
    summary: "Remove a firm's logo",
    responses: [{ status: 200, description: "Removed." }, { status: 404, description: "Not found, or not yours." }],
  },
  {
    id: "account", method: "GET", path: "/v1/account", group: "Account", auth: "api_key",
    summary: "Who this key belongs to",
    responses: [{ status: 200, description: "Your tenant.", example: { tenantId: "your-tenant", name: "Your Filing Co", configured: true, branding: { displayName: "Your Filing Co" }, webhookEndpointCount: 1 } }],
  },
  {
    id: "card-codes", method: "GET", path: "/v1/account/card-codes", group: "Account", auth: "api_key",
    summary: "Filings waiting for a saved card's security code",
    description: "A saved card's security code can't be stored, so filings that pay the state with a saved card wait for it (status `blocked`, `awaitingCardCode` set). Grouped by card; each group names the path that takes the code.",
    responses: [{ status: 200, description: "Waiting filings by card.", example: { waiting: [{ methodId: "card1", card: "Company Visa", last4: "4242", owner: {}, codePath: "/v1/account/payment-methods/card1/code", filings: [{ id: "f_123", title: "NJ formation: Blue Harbor LLC", since: "2026-11-25T15:02:11Z" }] }] } }],
  },
  {
    id: "card-code", method: "POST", path: "/v1/account/payment-methods/{methodId}/code", group: "Account", auth: "api_key",
    summary: "Give a saved card's security code",
    description: "Type the code into a Basis Theory field in your own page (never send the code itself here) and create a token of type `token` with data `{ cvc }` and `expires_at` within the hour. Send that token's id. Every filing waiting for this card goes back in the queue at once, and the code is used for an hour at most. A firm's own card takes the same body at `/v1/client-companies/{id}/payment-methods/{methodId}/code`.",
    body: "{ tokenId, expiresAt? }", bodyExample: { tokenId: "3f8c5a2e-1b7d-4c9e-8a6f-2d4b9e1c7a50", expiresAt: "2026-11-25T16:00:00Z" },
    responses: [{ status: 200, description: "Kept; the waiting filings are queued.", example: { expiresAt: "2026-11-25T16:00:00.000Z", queued: ["f_123"] } }, { status: 404, description: "No such card for state fees." }, { status: 409, description: "The card isn't held in the card vault." }, { status: 422, description: "Not a token id." }],
  },
  {
    id: "billing", method: "GET", path: "/v1/account/billing", group: "Account", auth: "api_key",
    summary: "Your subscription",
    description: "Plan, price and status of the subscription that pays for live filings. With billing required, creating a live filing without a subscription in good standing (active, trialing or past_due) returns 402; practice filings are always free. Subscribe and manage billing in the dashboard.",
    responses: [{ status: 200, description: "The subscription.", example: { billed: true, plan: "enterprise", status: "active", canFileLive: true, required: true, configured: true, price: { amount: 49900, currency: "usd", interval: "month" }, currentPeriodEnd: "2026-12-25T00:00:00.000Z", cancelAtPeriodEnd: false } }],
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
    responses: [{ status: 200, description: "Endpoints.", example: { endpoints: [{ url: "https://hooks.example.com/cofile", events: ["filing.completed"], secretHint: "…9f2a" }] } }],
  },
  {
    id: "put-webhooks", method: "PUT", path: "/v1/webhook-endpoints", group: "Webhooks", auth: "api_key",
    summary: "Replace your webhook endpoints",
    description: "Sends the whole list (up to 10). An endpoint that keeps its URL keeps its secret. A new endpoint without a `secret` gets one generated, returned once in `generatedSecrets`. URLs must be public https.",
    body: "{ endpoints: [{ url, secret?, events? }] }", bodyExample: { endpoints: [{ url: "https://hooks.example.com/cofile", events: ["filing.awaiting_approval", "filing.completed", "filing.failed"] }] },
    responses: [{ status: 200, description: "Saved.", example: { endpoints: [{ url: "https://hooks.example.com/cofile", secretHint: "…9f2a" }], generatedSecrets: [{ url: "https://hooks.example.com/cofile", secret: "whsec_…" }] } }, { status: 409, description: "Your tenant isn't set up yet; ask the platform team." }, { status: 422, description: "A URL is not public https, or is listed twice." }],
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
    id: "list-signatures", method: "GET", path: "/v1/signatures", group: "Signatures", auth: "api_key",
    summary: "Saved signatures for a client company",
    query: [{ name: "clientCompanyId", description: "Required. The company whose signatures to list." }],
    responses: [{ status: 200, description: "Signatures (never the image) and the consent text a new one must carry.", example: { consentText: "I adopt this image as my signature. …", signatures: [{ id: "sig_01J…", clientCompanyId: "acme-cpa", signerName: "Jordan Signer", createdAt: "2026-11-24T15:02:11.000Z", active: true }] } }],
  },
  {
    id: "create-signature", method: "POST", path: "/v1/signatures", group: "Signatures", auth: "api_key",
    summary: "Save a signer's signature",
    description: "A PNG of the signer's drawn signature, with the exact consent text from GET /v1/signatures and consented: true. The image is encrypted at rest and never returned. It is placed on a state form only for a filing the client approved, unchanged since approval, signed by the same named person, and never on a dry run. Up to 10 live signatures per company.",
    body: "clientCompanyId, signerName, signerEmail?, image (PNG data URL or base64), consentText, consented: true",
    bodyExample: { clientCompanyId: "acme-cpa", signerName: "Jordan Signer", image: "data:image/png;base64,iVBORw0KGgo…", consentText: "I adopt this image as my signature. …", consented: true },
    responses: [{ status: 201, description: "The saved signature, without the image." }, { status: 422, description: "Not a PNG of a sensible size, or the consent text doesn't match." }, { status: 503, description: "Signature storage isn't set up on this deployment." }],
  },
  {
    id: "revoke-signature", method: "DELETE", path: "/v1/signatures/{id}", group: "Signatures", auth: "api_key",
    summary: "Revoke a saved signature",
    description: "Deletes the stored image. Filings that name it can no longer be signed with it.",
    responses: [{ status: 200, description: "Revoked." }, { status: 404, description: "No such signature for your tenant." }],
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
  { status: "blocked", meaning: "Held by a policy, fee cap or site problem, or approved and waiting for a saved card's security code (awaitingCardCode is set)." },
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
export function openApiDocument(serverUrl: string, extra: { filingRequestSchema?: unknown; events?: [string, string][] } = {}): Record<string, unknown> {
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
    const bodySchema = e.id === "create-filing" && extra.filingRequestSchema ? { $ref: "#/components/schemas/FilingRequest" } : { type: "object" };
    if (e.body) op.requestBody = { required: true, description: e.body, content: { "application/json": { schema: bodySchema, example: e.bodyExample } } };
    (paths[e.path] ??= {})[e.method.toLowerCase()] = op;
  }
  return {
    openapi: "3.1.0",
    info: { title: "Filing engine API", version: "1", description: "Automated state business filings: LLC formation, EINs, certificates and payroll registration, each approved by the client before it is filed." },
    servers: [{ url: serverUrl }],
    components: {
      securitySchemes: { apiKey: { type: "apiKey", in: "header", name: "x-api-key" } },
      schemas: {
        ...(extra.filingRequestSchema ? { FilingRequest: extra.filingRequestSchema } : {}),
        WebhookEvent: {
          type: "object", required: ["id", "type", "tenantId", "filingId", "occurredAt", "data"],
          properties: {
            id: { type: "string", description: "Unique per event; deliveries of one event share it." },
            type: { type: "string", description: "The event name, e.g. filing.completed." },
            tenantId: { type: "string" }, filingId: { type: "string" }, runId: { type: "string" },
            occurredAt: { type: "string", format: "date-time" },
            data: { type: "object", description: "What the event carries (see each event)." },
          },
        },
      },
    },
    paths,
    // Every event we POST to your endpoints, signed (x-cofile-signature: t=<unix>,v1=<hex HMAC-SHA256 of "t.body">).
    ...(extra.events?.length ? {
      webhooks: Object.fromEntries(extra.events.map(([name, when]) => [name, {
        post: {
          summary: name, description: when,
          parameters: [
            { name: "x-cofile-event", in: "header", required: true, schema: { type: "string", const: name } },
            { name: "x-cofile-delivery", in: "header", required: true, schema: { type: "string" }, description: "Unique per delivery attempt series; use it to ignore repeats." },
            { name: "x-cofile-signature", in: "header", required: true, schema: { type: "string" }, description: "t=<unix seconds>,v1=<hex HMAC-SHA256 of `${t}.${rawBody}` with your endpoint secret>" },
          ],
          requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/WebhookEvent" } } } },
          responses: { "200": { description: "Any 2xx within a few seconds; anything else is retried after 1m, 5m, 30m, 2h and 12h." } },
        },
      }])),
    } : {}),
  };
}
