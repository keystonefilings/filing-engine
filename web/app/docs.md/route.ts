import { docsMarkdown } from "@/lib/docs-export";
import { platformName, publicApiUrl } from "@/lib/brand";
import { publicUrl } from "@/lib/session";

/** V34: every doc in one Markdown file, to download or hand to an AI coding agent. */
export function GET() {
  return new Response(docsMarkdown(publicApiUrl(), publicUrl(), platformName()), {
    headers: { "content-type": "text/markdown; charset=utf-8", "content-disposition": 'inline; filename="api-docs.md"', "cache-control": "public, max-age=300" },
  });
}
