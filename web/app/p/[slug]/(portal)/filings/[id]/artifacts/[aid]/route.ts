import { engine, engineBaseUrl, type Filing } from "@/lib/engine";
import { requireFirm } from "@/lib/session";

/** Streams a filing's document from the engine, only for a filing of the signed-in firm. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string; id: string; aid: string }> }) {
  const { slug, id, aid } = await params;
  const session = await requireFirm(slug);
  const { filing } = await engine<{ filing: Filing }>(session.apiKey, `/v1/filings/${encodeURIComponent(id)}`).catch(() => ({ filing: null as Filing | null }));
  if (!filing || filing.clientCompanyId !== session.clientCompanyId) return new Response("Not found", { status: 404 });
  const a = filing.artifacts.find((x) => x.id === aid);
  if (!a) return new Response("Not found", { status: 404 });
  const res = await fetch(`${engineBaseUrl()}/v1/artifacts/${encodeURIComponent(aid)}`, { headers: { "x-api-key": session.apiKey }, cache: "no-store" });
  if (!res.ok || !res.body) return new Response("Not available", { status: 502 });
  const type = res.headers.get("content-type") ?? "application/octet-stream";
  const ext = type.includes("pdf") ? ".pdf" : type.includes("png") ? ".png" : "";
  const name = `${a.label.replace(/[^\w .-]+/g, "").slice(0, 80) || "document"}${a.label.toLowerCase().endsWith(ext) ? "" : ext}`;
  return new Response(res.body, { headers: { "content-type": type, "content-disposition": `attachment; filename="${name}"`, "cache-control": "private, no-store" } });
}
