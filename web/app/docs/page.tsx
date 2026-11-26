import Link from "next/link";
import { platformName, publicApiUrl, supportEmail } from "@/lib/brand";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { GUIDES } from "./guides";
import { H2 } from "./anchors";

/** A sheet with its corner clipped at 45°, the plate's chamfer: a file to take away (10C.17). */
function FileGlyph() {
  return (
    <svg className="docs2-file" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
      <path d="M3.25 1.75h6.5l3 3v9.5h-9.5z" /><path d="M5.5 8.25h5M5.5 11h5" />
    </svg>
  );
}

/** The docs home (merged spec 10C.16): the lede, the Quick start's four steps, the file shelf, and the guides as cards. */
export default function DocsHome() {
  const api = publicApiUrl();
  return (
    <article className="docs2-article">
      <h1>{platformName()} API</h1>
      <p className="docs2-lede">File state business paperwork from your own product: LLC formations in New York, New Jersey and Florida, corporation formations in New York and Florida, Florida limited partnerships, New York foreign qualifications and assumed names (DBAs), IRS EINs, and New York (NYS-100) and New Jersey (NJ-REG) employer registrations. Not every filing type is live yet; see <Link href="/what-we-file">What we file</Link>.</p>
      <H2>Quick start</H2>
      <ol className="docs2-steps">
        <li>Get an API key from the <Link href="/dashboard/keys">dashboard</Link>.</li>
        <li>Set up the client company (the CPA or payroll firm) and its approvers with <code>PUT /v1/client-companies/{"{id}"}</code>, or email {supportEmail()} and we&apos;ll do it.</li>
        <li>Create a filing with <code className="is-rehearsal">&quot;dryRun&quot;: true</code>, then approve it with its <code>approvalLink</code> or <code>POST /v1/filings/{"{id}"}/approval</code>. The run walks the state site and stops before the final submit.</li>
        <li>Add a webhook endpoint so you hear about each step.</li>
      </ol>
      <CodeBlock lang="bash" code={`curl ${api}/v1/filings -H "x-api-key: $COFILE_API_KEY"`} />
      <p className="docs2-shelf">For your tools and AI agents: <FileGlyph /><a href="/docs.md">all docs in one Markdown file</a>, <FileGlyph /><a href="/openapi.json">OpenAPI 3.1</a> at <code>/openapi.json</code> (with the full FilingRequest schema and every webhook) and <FileGlyph /><a href="/llms.txt">llms.txt</a>.</p>
      <p className="small muted">Base URL: <code>{api}</code>. All requests and responses are JSON.</p>
      <H2>Guides</H2>
      <div className="docs2-cards">
        {GUIDES.map((g) => (
          <Link key={g.slug} href={`/docs/${g.slug}`} className="docs2-card">
            <strong>{g.title}</strong>
            <span className="muted small">{g.summary}</span>
          </Link>
        ))}
      </div>
    </article>
  );
}
