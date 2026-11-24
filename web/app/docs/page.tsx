import Link from "next/link";
import { platformName, publicApiUrl } from "@/lib/brand";
import { GUIDES } from "./guides";

export default function DocsHome() {
  const api = publicApiUrl();
  return (
    <>
      <h1>{platformName()} API</h1>
      <p className="muted">File state business filings from your own product: LLC formation in New York, New Jersey, Florida and Missouri, EINs, certificates of standing, and NY and NJ payroll registration.</p>
      <h2>Quick start</h2>
      <ol>
        <li>Get an API key from the <Link href="/dashboard/keys">dashboard</Link>.</li>
        <li>Set up the client company (the CPA or payroll firm) with <code>PUT /v1/client-companies/{"{id}"}</code>, or ask your platform contact.</li>
        <li>Create a filing with <code>&quot;dryRun&quot;: true</code> and watch it go to <code>awaiting_approval</code>.</li>
        <li>Add a webhook endpoint so you hear about each step.</li>
      </ol>
      <pre><code>{`curl ${api}/v1/filings -H "x-api-key: $KEYSTONE_API_KEY"`}</code></pre>
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
