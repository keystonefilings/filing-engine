import { notFound } from "next/navigation";
import { publicApiUrl } from "@/lib/brand";
import { GUIDES, guide } from "../guides";
import { withAnchors } from "../anchors";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const g = guide((await params).slug);
  return { title: g?.title ?? "Not found" };
}

/** A guide (merged spec 10C.16): the book's type, its h2s anchored for the contents beside it. */
export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = guide((await params).slug);
  if (!g) notFound();
  return (
    <article className="docs2-article">
      <h1>{g.title}</h1>
      {withAnchors(g.body(publicApiUrl()))}
    </article>
  );
}
