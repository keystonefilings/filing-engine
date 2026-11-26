import Link from "next/link";
import { platformName, publicApiUrl, supportEmail } from "@/lib/brand";
import { GUIDES } from "./guides";

export default function DocsHome() {
  const api = publicApiUrl();
  return (
    <>
      <h1>{platformName()} API</h1>
      <p className="muted">File state business paperwork from your own product: LLC formations in New York, New Jersey and Florida, corporation formations in New York and Florida, Florida limited partnerships, New York foreign qualifications and assumed names (DBAs), IRS EINs, and New York (NYS-100) and New Jersey (NJ-REG) employer registrations. Not every filing type is live yet; see <Link href="/what-we-file">What we file</Link>.</p>
      <h2>Quick start</h2>
      <ol>
        <li>Get an API key from the <Link href="/dashboard/keys">dashboard</Link>.</li>
        <li>Set up the client company (the CPA or payroll firm) and its approvers with <code>PUT /v1/client-companies/{"{id}"}</code>, or email {supportEmail()} and we&apos;ll do it.</li>
        <li>Create a filing with <code>&quot;dryRun&quot;: true</code>, then approve it with its <code>approvalLink</code> or <code>POST /v1/filings/{"{id}"}/approval</code>. The run walks the state site and stops before the final submit.</li>
        <li>Add a webhook endpoint so you hear about each step.</li>
      </ol>
      <pre><code>{`curl ${api}/v1/filings -H "x-api-key: $COFILE_API_KEY"`}</code></pre>
      <p className="small">For your tools and AI agents: <a href="/docs.md">all docs in one Markdown file</a>, <a href="/openapi.json">OpenAPI 3.1</a> at <code>/openapi.json</code> (with the full FilingRequest schema and every webhook) and <a href="/llms.txt">llms.txt</a>.</p>
      <p className="small muted">Base URL: <code>{api}</code>. All requests and responses are JSON.</p>
      <h2>Guides</h2>
      <div className="grid">
        {GUIDES.map((g) => (
          <Link key={g.slug} href={`/docs/${g.slug}`} className="card" style={{ textDecoration: "none", color: "inherit" }}>
            <strong>{g.title}</strong>
            <div className="muted small">{g.summary}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
