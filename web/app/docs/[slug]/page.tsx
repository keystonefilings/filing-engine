import { notFound } from "next/navigation";
import { publicApiUrl } from "@/lib/brand";
import { GUIDES, guide } from "../guides";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const g = guide((await params).slug);
  return { title: g?.title ?? "Not found" };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const g = guide((await params).slug);
  if (!g) notFound();
  return (
    <article>
      <h1>{g.title}</h1>
      {g.body(publicApiUrl())}
    </article>
  );
}
