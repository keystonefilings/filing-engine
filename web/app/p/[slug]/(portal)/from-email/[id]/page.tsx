import Link from "next/link";
import { notFound } from "next/navigation";
import { firmContext, offeredKinds } from "@/lib/firm";
import { inboundMessage, readKind } from "@/lib/inbound";
import { emailReadingOn } from "@/lib/email-intake";

export const metadata = { title: "Filing request" };

const VIA: Record<string, string> = { email: "email", slack: "Slack", sms: "text message", whatsapp: "WhatsApp" };

/** V40: the link in the reply to an emailed request. It opens the matching form, filled in. */
export default async function FromEmailPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const { session, company } = await firmContext(slug);
  const kinds = offeredKinds(company);
  const found = await inboundMessage(session.apiKey, session.clientCompanyId, id);
  if (!found) notFound();
  const m = await readKind(session.apiKey, session.clientCompanyId, found, kinds);
  const base = `/p/${encodeURIComponent(slug)}`;
  const picked = m.extracted?.kind ? kinds.find((k) => k.id === m.extracted!.kind) : undefined;
  const filled = picked ? Object.keys(m.extracted?.byKind[picked.id] ?? {}).length : 0;
  const open = (kindId: string) => `${base}/new/${encodeURIComponent(kindId)}?email=${encodeURIComponent(m.id)}`;
  return (
    <div className="narrow stack">
      <h1>Request by {VIA[m.channel ?? "email"] ?? "message"}</h1>
      <p className="muted" style={{ marginTop: 0 }}>From {m.from}, {new Date(m.receivedAt).toLocaleString()}: <strong>{m.subject || "(no subject)"}</strong></p>
      {m.filingId ? <p className="notice ok">Already sent as a filing. <Link href={`${base}/filings/${encodeURIComponent(m.filingId)}`}>Open the filing</Link></p> : null}
      {m.purgedAt ? <p className="notice">The text of this message was deleted after 30 days, as we do with all personal details. Start the filing from the <Link href={`${base}/new`}>New filing</Link> page.</p> : (
        <>
          {picked ? (
            <div className="card stack">
              <p style={{ margin: 0 }}>This looks like a request for: <strong>{picked.title}</strong>.{m.extracted?.note ? ` ${m.extracted.note}` : ""}</p>
              <p className="small muted" style={{ margin: 0 }}>{filled ? `We filled in ${filled} answer${filled === 1 ? "" : "s"} from your message.` : "We couldn't find answers in your message for this form."} Check every answer and add what&apos;s missing before you send it.</p>
              <p style={{ margin: 0 }}><Link className="btn primary" href={open(picked.id)}>Open the filled-in form</Link></p>
            </div>
          ) : (
            <p className="notice">{!emailReadingOn() ? "Reading emails automatically isn't switched on for this site yet." : m.extracted?.note ? `We couldn't tell which filing this is. ${m.extracted.note}` : "We couldn't tell which filing this is."} Choose it below.</p>
          )}
          <details>
            <summary>{picked ? "Not this filing? Choose another" : "Choose the filing"}</summary>
            <ul>{kinds.map((k) => <li key={k.id}><Link href={open(k.id)}>{k.title}</Link></li>)}</ul>
          </details>
          {m.text ? <details><summary>Your message</summary><pre style={{ whiteSpace: "pre-wrap", font: "inherit" }}>{m.text}</pre></details> : null}
        </>
      )}
    </div>
  );
}
