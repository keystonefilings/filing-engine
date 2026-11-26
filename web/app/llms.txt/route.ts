import { platformName } from "@/lib/brand";
import { publicUrl } from "@/lib/session";

/** V34: the llms.txt convention: where AI agents find these docs in plain text. */
export function GET() {
  const site = publicUrl(), name = platformName();
  const body = `# ${name}

> State business filings by API: LLC and corporation formation, EINs, certificates and payroll registration, each approved before it is filed.

## Docs
- [The whole API in one Markdown file](${site}/docs.md): authentication, the filing lifecycle, every endpoint with examples, webhooks and signature verification (JavaScript and Python).
- [OpenAPI 3.1](${site}/openapi.json): every endpoint, the FilingRequest JSON Schema and every webhook event.
- [Guides](${site}/docs): the same, for people.
`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=300" } });
}
