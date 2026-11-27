import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { firmContext, offeredKinds } from "@/lib/firm";
import { inboundMessage, readKind } from "@/lib/inbound";
import { emailReadingOn } from "@/lib/email-intake";
import { Notice } from "@/components/ui/Sheet";
import "@/styles/components/desk-work.css";

export const metadata = { title: "Filing request" };

const VIA: Record<string, string> = { email: "email", slack: "Slack", sms: "text message", whatsapp: "WhatsApp" };

const DAYTIME = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });

/**
 * The message as it arrived, with each answer we filled in from it marked where it appears word for word: Brass Tint
 * behind it and a Brass Line underline, the marks of the home page's Requests picture, in CoFile's colors (10B.15).
 */
function marked(text: string, answers: string[]): ReactNode[] {
  const find = answers.map((a) => a.trim()).filter((a) => a.length >= 2).sort((a, b) => b.length - a.length);
  if (!find.length) return [text];
  const lower = text.toLowerCase();
  const spans: [number, number][] = [];
  for (const a of find) {
    const needle = a.toLowerCase();
    for (let at = lower.indexOf(needle); at >= 0; at = lower.indexOf(needle, at + needle.length)) {
      const end = at + needle.length;
      // Whole words only, so a short answer never lights up the inside of another word
      const edge = (i: number) => i < 0 || i >= text.length || !/[\p{L}\p{N}]/u.test(text[i]!);
      if (edge(at - 1) && edge(end) && !spans.some(([s, e]) => at < e && end > s)) spans.push([at, end]);
    }
  }
  spans.sort((x, y) => x[0] - y[0]);
  const out: ReactNode[] = [];
  let pos = 0;
  for (const [s, e] of spans) {
    if (s > pos) out.push(text.slice(pos, s));
    out.push(<mark key={s} className="req2-mark">{text.slice(s, e)}</mark>);
    pos = e;
  }
  if (pos < text.length) out.push(text.slice(pos));
  return out;
}

/**
 * A request from a text or email (merged spec 10B.15; V40): the link in the reply to a forwarded request. The match,
 * as the page's hero card with the filled-in form behind its one Brass button; beside it, the message as it arrived.
 */
export default async function FromEmailPage({ params }: { params: Promise<{ slug: string; id: string }> }) {
  const { slug, id } = await params;
  const { session, company } = await firmContext(slug);
  const kinds = offeredKinds(company);
  const found = await inboundMessage(session.apiKey, session.clientCompanyId, id);
  if (!found) notFound();
  const m = await readKind(session.apiKey, session.clientCompanyId, found, kinds);
  const base = `/p/${encodeURIComponent(slug)}`;
  const picked = m.extracted?.kind ? kinds.find((k) => k.id === m.extracted!.kind) : undefined;
  const answers = picked ? m.extracted?.byKind[picked.id] ?? {} : {};
  const filled = Object.keys(answers).length;
  const open = (kindId: string) => `${base}/new/${encodeURIComponent(kindId)}?email=${encodeURIComponent(m.id)}`;
  const when = DAYTIME.format(new Date(m.receivedAt));
  const chat = m.channel === "sms" || m.channel === "whatsapp" || m.channel === "slack";
  const choose = (
    <details className="dw-fold req2-choose" open={picked ? undefined : true}>
      <summary>{picked ? "Not this filing? Choose another" : "Choose the filing"}</summary>
      <ul className="req2-kinds">{kinds.map((k) => <li key={k.id}><Link href={open(k.id)}>{k.title}</Link></li>)}</ul>
    </details>
  );
  return (
    <div className="req2">
      <div className="req2-head">
        <h1>Request by {VIA[m.channel ?? "email"] ?? "message"}</h1>
        <p className="req2-from">From {m.from}, <time dateTime={m.receivedAt}>{when}</time>: <strong>{m.subject || "(no subject)"}</strong></p>
      </div>
      {m.filingId ? <Notice tone="done">Already sent as a filing. <Link href={`${base}/filings/${encodeURIComponent(m.filingId)}`}>Open the filing</Link></Notice> : null}
      {m.purgedAt ? (
        <div className="req2-body is-purged">
          <div className="req2-message">
            <div className={chat ? "req2-bubble is-gone" : "req2-letter is-gone"}>
              <p>The text of this message was deleted after 30 days, as we do with all personal details. Start the filing from the <Link href={`${base}/new`}>New filing</Link> page.</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="req2-body">
          <div className="req2-match">
            {picked ? (
              <div className="req2-card">
                <p className="req2-what">This looks like a request for: <strong>{picked.title}</strong>.{m.extracted?.note ? ` ${m.extracted.note}` : ""}</p>
                <p className="req2-count">{filled ? `We filled in ${filled} answer${filled === 1 ? "" : "s"} from your message.` : "We couldn't find answers in your message for this form."} Check every answer and add what&apos;s missing before you send it.</p>
                <p className="req2-go"><Link className="btn primary is-main" href={open(picked.id)}>Open the filled-in form</Link></p>
              </div>
            ) : (
              <Notice>{!emailReadingOn() ? "Reading emails automatically isn't switched on for this site yet." : m.extracted?.note ? `We couldn't tell which filing this is. ${m.extracted.note}` : "We couldn't tell which filing this is."} Choose it below.</Notice>
            )}
            {choose}
          </div>
          {m.text ? (
            <details className="dw-fold req2-message" open>
              <summary>Your message</summary>
              {chat ? (
                <figure className="req2-said">
                  <p className="req2-bubble">{marked(m.text, Object.values(answers))}</p>
                  <figcaption className="req2-by">{m.from} · <time dateTime={m.receivedAt}>{when}</time></figcaption>
                </figure>
              ) : (
                <div className="req2-letter">
                  <p className="req2-letter-head">{m.from}<br />{m.subject || "(no subject)"}</p>
                  <p className="req2-letter-body">{marked(m.text, Object.values(answers))}</p>
                </div>
              )}
            </details>
          ) : null}
        </div>
      )}
    </div>
  );
}
