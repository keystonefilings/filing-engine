import { openApiDocument } from "@/lib/api-catalog";
import { publicApiUrl } from "@/lib/brand";

export function GET() {
  return Response.json(openApiDocument(publicApiUrl()), { headers: { "cache-control": "public, max-age=300" } });
}
