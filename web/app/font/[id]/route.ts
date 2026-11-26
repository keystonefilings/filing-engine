import { engineBaseUrl } from "@/lib/engine";

/** A firm's uploaded font, passed through from the engine so client pages load it from this site. */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return new Response("Not found", { status: 404 });
  const res = await fetch(`${engineBaseUrl()}/v1/brand-fonts/${id}`, { next: { revalidate: 86400 } });
  const type = res.headers.get("content-type") ?? "";
  if (!res.ok || !/^font\/(woff2|woff|ttf|otf)$/.test(type)) return new Response("Not found", { status: 404 });
  return new Response(await res.arrayBuffer(), {
    headers: { "content-type": type, "cache-control": "public, max-age=31536000, immutable", "x-content-type-options": "nosniff" },
  });
}
