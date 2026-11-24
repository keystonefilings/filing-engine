import { ENDPOINTS, type Endpoint } from "@/lib/api-catalog";

export const metadata = { title: "API reference" };

const GROUPS = [...new Set(ENDPOINTS.map((e) => e.group))];
const json = (v: unknown) => JSON.stringify(v, null, 2);

function EndpointBlock({ e }: { e: Endpoint }) {
  return (
    <section className="endpoint" id={e.id}>
      <h3><span className={`method ${e.method}`}>{e.method}</span><code>{e.path}</code></h3>
      <p><strong>{e.summary}.</strong> {e.description}</p>
      {e.auth === "none" ? <p className="small muted">No API key needed.</p> : null}
      {e.query?.length ? (
        <>
          <div className="label">Query</div>
          <ul className="small">{e.query.map((q) => <li key={q.name}><code>{q.name}</code>: {q.description}</li>)}</ul>
        </>
      ) : null}
      {e.body ? (
        <>
          <div className="label">Body: <span className="muted">{e.body}</span></div>
          {e.bodyExample !== undefined ? <pre><code>{json(e.bodyExample)}</code></pre> : null}
        </>
      ) : null}
      <div className="label">Responses</div>
      <ul className="small">
        {e.responses.map((r) => (
          <li key={r.status}>
            <code>{r.status}</code> {r.description}
            {r.example !== undefined ? <pre><code>{json(r.example)}</code></pre> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function Reference() {
  return (
    <>
      <h1>API reference</h1>
      <p className="muted">Send your key in <code>x-api-key</code>. Also available as <a href="/openapi.json">OpenAPI 3.1</a>.</p>
      <nav className="small" aria-label="Endpoints">
        {GROUPS.map((g) => (
          <div key={g} style={{ marginBottom: 6 }}>
            <strong>{g}:</strong>{" "}
            {ENDPOINTS.filter((e) => e.group === g).map((e, i) => <span key={e.id}>{i ? " · " : ""}<a href={`#${e.id}`}>{e.summary}</a></span>)}
          </div>
        ))}
      </nav>
      {GROUPS.map((g) => (
        <div key={g}>
          <h2>{g}</h2>
          {ENDPOINTS.filter((e) => e.group === g).map((e) => <EndpointBlock key={e.id} e={e} />)}
        </div>
      ))}
    </>
  );
}
