import { engineBaseUrl } from "@/lib/engine";

/**
 * A firm's uploaded logo, passed through from the engine so client pages load it from this site.
 * Only random ids reach the engine, and it serves logos only (never a filing's documents).
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) return new Response("Not found", { status: 404 });
  const res = await fetch(`${engineBaseUrl()}/v1/brand-logos/${id}`, { next: { revalidate: 86400 } });
  const type = res.headers.get("content-type") ?? "";
  if (!res.ok || !/^image\/(png|jpeg|webp)$/.test(type)) return new Response("Not found", { status: 404 });
  return new Response(await res.arrayBuffer(), {
    headers: {
      "content-type": type,
      // Each upload gets a new id, so a logo never changes under its address.
      "cache-control": "public, max-age=31536000, immutable",
      "content-security-policy": "default-src 'none'; sandbox",
    },
  });
}
