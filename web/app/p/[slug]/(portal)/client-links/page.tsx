import "@/styles/components/desk.css";
import "@/styles/components/desk-work.css";
import { brandStyle, firmContext, offeredKinds } from "@/lib/firm";
import { ClientLinkForm } from "@/components/ClientLinkForm";
import Link from "next/link";
import { makeClientLink, revokeClientLink } from "./actions";
import { listLinks } from "@/lib/intake-links";
import { filingKind } from "@/lib/intake/forms";
import { Glyph } from "@/components/ui/glyphs";

export const metadata = { title: "Client links" };

const DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

/**
 * Client links (merged spec 10B.14): the form in a white sheet with the page's one Brass button, the link once made
 * beside the page it opens (drawn live in the firm's brand), and the ledger of links sent.
 */
export default async function ClientLinksPage({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<{ kind?: string }> }) {
  const { slug } = await params;
  const { kind } = await searchParams;
  const { session, company, brand } = await firmContext(slug);
  const links = await listLinks(session.apiKey, session.clientCompanyId).catch(() => []);
  const base = `/p/${encodeURIComponent(slug)}`;
  const STATE: Record<string, string> = { open: "Waiting for the client", used: "Used", revoked: "Turned off", expired: "Expired" };
  return (
    <div className="links2">
      <h1>Send a client a link</h1>
      <p className="dw-lede">Your client fills in the filing on a page with {brand.name}&apos;s name and logo. It then appears here under Filings, and you get the proof to approve before anything is filed. Filing types that aren&apos;t live yet run as rehearsals: they stop before the last button, and nothing is filed or paid.</p>
      <ClientLinkForm action={makeClientLink.bind(null, slug)} kinds={offeredKinds(company).map((k) => ({ id: k.id, title: k.title }))}
        defaultKind={offeredKinds(company).some((k) => k.id === kind) ? kind : undefined}
        firm={{ name: brand.name, logoUrl: brand.logoUrl, style: brandStyle(brand) }} />
      {links.length ? (
        <section className="dw-ledger links2-sent" aria-labelledby="links2-sent-title">
          <h2 id="links2-sent-title" className="dw-ledger-title">Links you sent</h2>
          <table>
            <thead><tr><th scope="col">For</th><th scope="col">Filing</th><th scope="col">Made</th><th scope="col">Status</th><td /></tr></thead>
            <tbody>
              {links.map((l) => (
                <tr key={l.id}>
                  <td className="links2-for">{l.label ?? <span className="dw-quiet">No label</span>}</td>
                  <td className="links2-kind">{filingKind(l.kind)?.title ?? l.kind}</td>
                  <td className="dw-date" data-label="Made"><time dateTime={l.createdAt}>{DAY.format(new Date(l.createdAt))}</time></td>
                  <td className="links2-state">
                    {l.state === "open" ? <span className="dw-state is-inhand"><Glyph kind="inhand" />{STATE.open}</span>
                      : l.state === "used" ? <span className="dw-state is-done"><Glyph kind="done" />{l.filingId ? <Link href={`${base}/filings/${encodeURIComponent(l.filingId)}`}>Used: open the filing</Link> : STATE.used}</span>
                      : <span className="dw-quiet">{STATE[l.state]}</span>}
                  </td>
                  <td className="links2-act">{l.state === "open" ? <form action={revokeClientLink.bind(null, slug, l.id)}><button className="btn small" type="submit">Turn off</button></form> : null}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : null}
    </div>
  );
}
