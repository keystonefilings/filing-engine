import { firmContext, offeredKinds } from "@/lib/firm";
import { ClientLinkForm } from "@/components/ClientLinkForm";
import Link from "next/link";
import { makeClientLink, revokeClientLink } from "./actions";
import { listLinks } from "@/lib/intake-links";
import { filingKind } from "@/lib/intake/forms";

export const metadata = { title: "Client links" };

export default async function ClientLinksPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ kind?: string }> }) {
  const { slug } = await params;
  const { kind } = await searchParams;
  const { session, company, brand } = await firmContext(slug);
  const links = await listLinks(session.apiKey, session.clientCompanyId).catch(() => []);
  const base = `/p/${encodeURIComponent(slug)}`;
  const STATE: Record<string, string> = { open: "Waiting for the client", used: "Used", revoked: "Turned off", expired: "Expired" };
  return (
    <div className="narrow stack">
      <h1>Send a client a link</h1>
      <p className="muted">Your client fills in the filing on a page with {brand.name}&apos;s name and logo. It then appears here under Filings, and your client gets a link to approve exactly what will be filed. While your portal is in practice mode, these filings stop before the final step: nothing is filed or paid.</p>
      <ClientLinkForm action={makeClientLink.bind(null, slug)} kinds={offeredKinds(company).map((k) => ({ id: k.id, title: k.title }))}
        defaultKind={offeredKinds(company).some((k) => k.id === kind) ? kind : undefined} />
      {links.length ? (
        <div className="card">
          <strong>Links you sent</strong>
          <table className="small" style={{ width: "100%", marginTop: 8 }}>
            <thead><tr><th style={{ textAlign: "left" }}>For</th><th style={{ textAlign: "left" }}>Filing</th><th style={{ textAlign: "left" }}>Made</th><th style={{ textAlign: "left" }}>Status</th><th /></tr></thead>
            <tbody>
              {links.map((l) => (
                <tr key={l.id}>
                  <td>{l.label ?? <span className="muted">No label</span>}</td>
                  <td>{filingKind(l.kind)?.title ?? l.kind}</td>
                  <td>{new Date(l.createdAt).toLocaleDateString()}</td>
                  <td>{l.state === "used" && l.filingId ? <Link href={`${base}/filings/${encodeURIComponent(l.filingId)}`}>Used: open the filing</Link> : STATE[l.state]}</td>
                  <td>{l.state === "open" ? <form action={revokeClientLink.bind(null, slug, l.id)}><button className="btn small" type="submit">Turn off</button></form> : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  );
}
