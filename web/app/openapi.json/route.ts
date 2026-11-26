import { openApiDocument } from "@/lib/api-catalog";
import { publicApiUrl } from "@/lib/brand";
import { engineBaseUrl } from "@/lib/engine";
import { filingRequestSchema } from "@/lib/docs-export";
import { EVENT_NAMES } from "@/app/docs/events";

export async function GET() {
  const schema = await filingRequestSchema(engineBaseUrl());
  return Response.json(openApiDocument(publicApiUrl(), { filingRequestSchema: schema ?? undefined, events: EVENT_NAMES }), { headers: { "cache-control": "public, max-age=300" } });
}
