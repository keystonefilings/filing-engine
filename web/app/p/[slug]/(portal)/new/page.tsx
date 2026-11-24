import Link from "next/link";
import { firmContext, offeredKinds } from "@/lib/firm";

export const metadata = { title: "New filing" };

export default async function NewFilingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company } = await firmContext(slug);
  const base = `/p/${encodeURIComponent(slug)}`;
  return (
    <div className="stack">
      <h1>New filing</h1>
      <p className="muted">Fill it in yourself, or <Link href={`${base}/client-links`}>send your client a link</Link> to fill it in. Either way the approver checks exactly what will be filed before anything is sent to the state.</p>
      <div className="grid">
        {offeredKinds(company).map((k) => (
          <Link key={k.id} href={`${base}/new/${k.id}`} className="card" style={{ textDecoration: "none", color: "inherit" }}>
            <strong>{k.title}</strong>
            <p className="small muted" style={{ marginBottom: 6 }}>{k.summary}</p>
            {k.feeNote ? <p className="small" style={{ margin: 0 }}>{k.feeNote}</p> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
