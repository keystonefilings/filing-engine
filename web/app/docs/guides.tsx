import Link from "next/link";
import { EVENT_NAMES } from "./events";
import { FILING_STATUSES, EXAMPLE_FILING } from "@/lib/api-catalog";
import { FILING_KINDS } from "@/lib/intake/forms";

export interface Guide { slug: string; title: string; summary: string; body: (api: string) => React.ReactNode }

const Code = ({ children }: { children: string }) => <pre><code>{children.trim()}</code></pre>;

export const GUIDES: Guide[] = [
  {
    slug: "authentication",
    title: "Authentication",
    summary: "API keys, where to send them and how to rotate them.",
    body: (api) => (
      <>
        <p>Every request carries your API key in the <code>x-api-key</code> header. Keys belong to your tenant: they see only your filings, client companies, webhooks and usage.</p>
        <Code>{`curl ${api}/v1/account -H "x-api-key: $COFILE_API_KEY"`}</Code>
        <Code>{`import os, requests\nr = requests.get("${api}/v1/account", headers={"x-api-key": os.environ["COFILE_API_KEY"]})\nprint(r.json())`}</Code>
        <p>Create and revoke keys on the <Link href="/dashboard/keys">dashboard</Link> or with <code>POST /v1/api-keys</code>. A new key starts with <code>cofile_</code> and is shown once; only its prefix (for example <code>cofile_AbCdEfGh</code>) stays readable afterwards. Keys issued earlier start with <code>kfe_</code> and keep working.</p>
        <h2>Rotating a key</h2>
        <ol>
          <li>Create a new key and deploy it to your systems.</li>
          <li>Check the old key&apos;s “last used” time on the dashboard stops moving.</li>
          <li>Revoke the old key. Revoking takes effect at once and can&apos;t be undone.</li>
        </ol>
        <h2>Keep keys on your server</h2>
        <p>A key can create filings that, once your client approves them, are submitted to a state and paid for. Never build it into a web page, a mobile app or a public repository. The CPA and payroll portal on this site calls the API from the server for the same reason.</p>
      </>
    ),
  },
  {
    slug: "filings",
    title: "Filings and the lifecycle",
    summary: "Creating a filing, idempotency, dry runs, missing information and statuses.",
    body: (api) => (
      <>
        <p>A filing is one thing to file with one state site: an LLC formation, an EIN, a certificate or a payroll registration. You create it, the client approves exactly what will be filed, and the engine files it.</p>
        <Code>{`curl ${api}/v1/filings \\
  -H "x-api-key: $COFILE_API_KEY" -H "content-type: application/json" \\
  -d '${JSON.stringify(EXAMPLE_FILING)}'`}</Code>
        <h2>What happens next</h2>
        <ol>
          <li><strong>Validation.</strong> The request is checked against the state&apos;s rules. Problems come back as <code>422</code> with an <code>issues</code> list, each with a <code>path</code> such as <code>formation.county</code>.</li>
          <li><strong>Firm defaults.</strong> Blanks are filled from the client company&apos;s onboarding answers (registered agent, organizer, approver and so on). A value you send always wins.</li>
          <li><strong>Completeness.</strong> If something is still missing the filing waits in <code>awaiting_information</code>. Send it with <code>POST /v1/filings/{"{id}"}/information</code>.</li>
          <li><strong>Approval.</strong> The client gets a link to a page showing exactly what will be filed and the fees. See <Link href="/docs/approvals">Approvals</Link>.</li>
          <li><strong>Run.</strong> After approval a worker fills the state site, checks the fee and the review page against what was approved, pays, submits it and collects the documents into <code>artifacts</code>. If the state&apos;s page changed, the run stops before paying.</li>
        </ol>
        <h2>Idempotency</h2>
        <p><code>idempotencyKey</code> (8 characters or more) makes retries safe: sending the same key again returns the original filing with status <code>200</code> and creates nothing. Use one key per filing you mean to make, such as your own order id.</p>
        <h2>Dry runs</h2>
        <p>Set <code>&quot;dryRun&quot;: true</code>, or call <code>POST /v1/filings/{"{id}"}/dry-run</code>, to walk the state site up to the final submit and stop. Nothing is filed and no fee is paid. Use it to test a new integration.</p>
        <h2>Statuses</h2>
        <div className="table-wrap"><table><thead><tr><th>Status</th><th>Meaning</th></tr></thead><tbody>
          {FILING_STATUSES.map((s) => <tr key={s.status}><td><code>{s.status}</code></td><td>{s.meaning}</td></tr>)}
        </tbody></table></div>
      </>
    ),
  },
  {
    slug: "filing-types",
    title: "Filing types, fields and state fees",
    summary: "What each state and filing needs, from the state-site walkthroughs.",
    body: () => (
      <>
        <p>The engine takes one request shape for every state; adapters turn it into each site&apos;s own form. These are the filings the API and the portal take today, with the state fees seen on each site. Not every type can be filed live yet, because some states&apos; checkouts are still being mapped; see <Link href="/#coverage">Coverage</Link> on the home page. Every field the engine accepts, with its type and whether it is required, is in the FilingRequest JSON Schema in <a href="/openapi.json">/openapi.json</a> (also at <code>GET /v1/schema/filing-request</code>). </p>
        <div className="table-wrap"><table><thead><tr><th>Filing</th><th>type / state</th><th>Fees</th></tr></thead><tbody>
          {FILING_KINDS.map((k) => <tr key={k.id}><td><strong>{k.title}</strong><div className="muted small">{k.summary}</div></td><td><code>{k.type}</code> / {k.type === "ein_only" ? "the state where the LLC was formed" : <code>{k.state}</code>}</td><td className="small">{k.feeNote}</td></tr>)}
        </tbody></table></div>
        <h2>Fields by area</h2>
        <ul>
          <li><code>formation</code>: name (<code>baseName</code> + <code>designator</code>), county (NY), management structure (NY), service of process (NY), registered agent or <code>registeredAgentChoice</code>, members and signers (NJ), Florida entity type, shares, incorporator and general partners, effective date, add-on certificates.</li>
          <li><code>ein</code>: <code>mode</code> (<code>in_run</code>, <code>after_acceptance</code> or <code>none</code>; a Florida formation is always <code>after_acceptance</code>: once the state accepts it, the EIN application starts as its own <code>ein_only</code> filing under the same approval, with <code>intake.einForFilingId</code> naming the formation, and the EIN is copied back onto the formation), responsible party, member count, reason, start date, regulated-activity answers, employees, business activity, how the confirmation letter is delivered.</li>
          <li><code>payroll</code>: legal name, FEIN, ownership type, business, mailing and books addresses, owners, NAICS, liability dates, work locations, signer, and <code>stateAnswers</code> for each state&apos;s long tail of questions.</li>
          <li><code>contact</code> (required): who the state and the filing company write to about the filing.</li>
        </ul>
        <h2>Sensitive fields</h2>
        <p><code>ein.responsibleParty.ssn</code> and <code>payroll.owners[].ssn</code> are encrypted, masked on proofs (approval pages), in API responses, in logs and in recorded screens, and deleted after 30 days.</p>
      </>
    ),
  },
  {
    slug: "approvals",
    title: "Approvals",
    summary: "How the client approves, and what you can show them.",
    body: () => (
      <>
        <p>Nothing is submitted or paid until the client approves it. Where the client approves the state&apos;s own review page, a preview run first fills in the state site up to that page, without submitting. When a filing is ready, the engine creates an approval and sends its link to the approvers on the client company (or those in <code>approvalRecipients</code>). The link is also returned as <code>approvalLink</code> when you create the filing, and from <code>GET /v1/filings/{"{id}"}</code> while it is open.</p>
        <p>The proof (the approval page) shows the full request as it will be filed, with sensitive numbers masked, the state fees and your fee cap. Approving authorizes submitting the filing exactly as shown and paying the fees shown, up to the fee cap (or the total when there is none), with a warning that government fees generally can&apos;t be refunded; the approval records which consent was agreed (<code>consentVersion</code>). Where possible, it also shows a screenshot of the state&apos;s own review page, filled in with this filing; a preview run (status <code>previewing</code>) captures it before the link is sent. The live run goes ahead only if the state shows exactly that page again; if it has changed, the run stops before paying. If you collect approval in your own app, show the same screenshot: <code>filing.awaiting_approval</code> carries <code>data.reviewShotArtifactId</code>, which you download with <code>GET /v1/artifacts/{"{id}"}</code>. The client approves or asks for changes, and can add a comment. Approval links expire; the page says so and a new filing gets a new link.</p>
        <h2>Changes requested</h2>
        <p>The filing moves to <code>changes_requested</code> and <code>filing.changes_requested</code> carries the comment. Correct the request and create a new filing with a new idempotency key.</p>
        <h2>Signatures and attestations</h2>
        <p>Some state forms ask for a typed signature, an attestation checkbox or a payment authorization. The client grants each one on the approval page; the portal intake also records them with who granted them and when, under <code>intake.portal.authorizations</code>.</p>
      </>
    ),
  },
  {
    slug: "webhooks",
    title: "Webhooks",
    summary: "Endpoints, events, signatures and retries.",
    body: () => (
      <>
        <p>Add up to 10 https endpoints on the <Link href="/dashboard/webhooks">dashboard</Link> or with <code>PUT /v1/webhook-endpoints</code>. Each endpoint can listen to every event or a chosen few. Each has its own signing secret, shown once when it is generated.</p>
        <h2>The request</h2>
        <Code>{`POST /your/endpoint
content-type: application/json
x-cofile-event: filing.completed
x-cofile-delivery: 6f1c…
x-cofile-signature: t=1764000000,v1=5d41402abc4b2a76b9719d911017c592…

{"id":"evt_…","type":"filing.completed","tenantId":"your-tenant","filingId":"f_…","occurredAt":"2026-11-24T15:30:00.000Z","data":{…}}`}</Code>
        <h2>Verifying the signature</h2>
        <p><code>v1</code> is the hex HMAC-SHA256 of <code>{"<t>.<raw body>"}</code> with your endpoint secret. Check it against the raw body before parsing, and reject timestamps more than five minutes old.</p>
        <Code>{`import { createHmac, timingSafeEqual } from "node:crypto";

export function verify(secret, header, rawBody, toleranceSec = 300) {
  const m = /t=(\\d+),v1=([0-9a-f]+)/.exec(header ?? "");
  if (!m) return false;
  const [, t, v1] = m;
  if (Math.abs(Date.now() / 1000 - Number(t)) > toleranceSec) return false;
  const expected = Buffer.from(createHmac("sha256", secret).update(\`\${t}.\${rawBody}\`).digest("hex"));
  const got = Buffer.from(v1);
  return expected.length === got.length && timingSafeEqual(expected, got);
}`}</Code>
        <p>The same in Python:</p>
        <Code>{`import hmac, hashlib, time

def verify(secret: str, header: str, raw_body: bytes, tolerance: int = 300) -> bool:
    parts = dict(p.split("=", 1) for p in header.split(","))
    if abs(time.time() - int(parts["t"])) > tolerance:
        return False
    expected = hmac.new(secret.encode(), f"{parts['t']}.".encode() + raw_body, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, parts.get("v1", ""))`}</Code>
        <p>To check your receiver, <code>POST /v1/webhooks/test</code> sends a signed <code>webhook.test</code> event to every endpoint; <code>GET /v1/webhooks/deliveries</code> lists recent deliveries.</p>
        <h2>Retries</h2>
        <p>Answer with any 2xx within a few seconds. Anything else is retried after 1 minute, 5 minutes, 30 minutes, 2 hours and 12 hours, then given up. Use <code>x-cofile-delivery</code> to ignore a delivery you have already handled. <code>GET /v1/filings/{"{id}"}/deliveries</code> shows every attempt.</p>
        <h2>Events</h2>
        <div className="table-wrap"><table><thead><tr><th>Event</th><th>When</th></tr></thead><tbody>
          {EVENT_NAMES.map(([e, when]) => <tr key={e}><td><code>{e}</code></td><td>{when}</td></tr>)}
        </tbody></table></div>
      </>
    ),
  },
  {
    slug: "errors",
    title: "Errors",
    summary: "Status codes and the error body.",
    body: () => (
      <>
        <p>Errors are JSON with an <code>error</code> message. Validation errors (422) also carry <code>issues</code>, one entry per problem, each with a <code>path</code>, <code>message</code> and <code>severity</code>.</p>
        <Code>{`{ "error": "validation failed", "issues": [ { "path": "formation.county", "message": "county is required in NY", "severity": "error" } ] }`}</Code>
        <div className="table-wrap"><table><thead><tr><th>Code</th><th>Meaning</th></tr></thead><tbody>
          <tr><td>400</td><td>The request body is not valid JSON.</td></tr>
          <tr><td>401</td><td>No API key, or the key is revoked or unknown.</td></tr>
          <tr><td>402</td><td>A live filing needs an active subscription; dry runs (rehearsals) never need one. See <code>GET /v1/account/billing</code>.</td></tr>
          <tr><td>403</td><td>The key is valid but not for this tenant or action.</td></tr>
          <tr><td>404</td><td>Not found, or it belongs to another tenant.</td></tr>
          <tr><td>409</td><td>A conflict: the filing isn&apos;t in the state this call needs, an id or slug is taken, or a limit is reached.</td></tr>
          <tr><td>410</td><td>An approval link has expired or was already used.</td></tr>
          <tr><td>422</td><td>Validation failed; see <code>issues</code>.</td></tr>
          <tr><td>5xx</td><td>Our side. Retry with the same idempotency key.</td></tr>
        </tbody></table></div>
      </>
    ),
  },
  {
    slug: "signatures",
    title: "Saved signatures and PDF uploads",
    summary: "New York filings that upload the state's own PDF, signed with the signer's saved signature.",
    body: () => (
      <>
        <p>Some New York filings go through DOS E-Submission as an uploaded PDF: the Application for Authority of a foreign business corporation (DOS-1335-f) and the Certificate of Assumed Name (DOS-1338-f). Send them as <code>type: &quot;paper_upload&quot;</code> with <code>state: &quot;NY&quot;</code> and the form&apos;s answers under <code>paperUpload</code>. The engine fills the state&apos;s form, flattens it, signs it and uploads it.</p>
        <h2>The signature</h2>
        <ol>
          <li>The signer draws their signature once, in the portal or your own app, and adopts it by accepting the consent text from <code>GET /v1/signatures</code>.</li>
          <li>Save it with <code>POST /v1/signatures</code>. The image is encrypted and never returned; you get its <code>id</code>.</li>
          <li>Put that id in <code>paperUpload.signatureId</code>. The signer named on the form must be the person who saved it.</li>
        </ol>
        <p>The engine places the signature on the form only during a live run of a filing the client approved, and only if the filing is unchanged since that approval. A dry run uses an unsigned copy marked as not for filing and stops before the final submit. A live run that can&apos;t sign stops before uploading. Revoke a signature with <code>DELETE /v1/signatures/{"{id}"}</code>.</p>
        <h2>Fees</h2>
        <p>Application for Authority is $225. A Certificate of Assumed Name is $25, plus, for a corporation, $100 for each New York City county and $25 for each other county. Expedited handling and copies are added.</p>
      </>
    ),
  },
  {
    slug: "portal",
    title: "White-label firm portal",
    summary: "Give a CPA or payroll firm its own branded filing portal.",
    body: () => (
      <>
        <p>Each client company can have a portal on this site at <code>/p/&lt;slug&gt;</code>, in the firm&apos;s own name, logo and color. Firm staff start filings, follow their status and send their own clients intake links. Clients fill in a branded form and never see your API key.</p>
        <ol>
          <li>On the dashboard, open <Link href="/dashboard/firms">Firms</Link> and set the firm&apos;s portal slug, name, logo, color and which filings it offers.</li>
          <li>Invite each person at the firm by email. The invitation lets them choose a password within 7 days, then log in to that firm&apos;s portal only.</li>
          <li>From the portal, staff fill in a filing themselves or send a client an intake link for one filing.</li>
        </ol>
        <p>Every portal filing goes through the same approval as an API filing.</p>
      </>
    ),
  },
];

export function guide(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
