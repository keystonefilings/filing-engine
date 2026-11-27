import { ENDPOINTS, type Endpoint } from "@/lib/api-catalog";
import { CodeBlock } from "@/components/docs/CodeBlock";
import { groupId, HeadAnchor } from "../anchors";

export const metadata = { title: "API reference" };

const GROUPS = [...new Set(ENDPOINTS.map((e) => e.group))];
const json = (v: unknown) => JSON.stringify(v, null, 2);

/** A path with its `/dry-run` carrying the rehearsal mark. */
function Path({ path }: { path: string }) {
  const at = path.indexOf("/dry-run");
  if (at < 0) return <>{path}</>;
  return <>{path.slice(0, at)}<span className="docs2-rehearsal">/dry-run</span>{path.slice(at + 8)}</>;
}

/**
 * An endpoint (merged spec 10C.16): a rule, the method chip and path, the summary as an italic run-in, then its
 * query, body and responses. Its examples sit where the product puts them, and from 1280 px in the rail beside it.
 */
function EndpointBlock({ e }: { e: Endpoint }) {
  const examples = e.bodyExample !== undefined || e.responses.some((r) => r.example !== undefined);
  return (
    <section className={["docs2-endpoint", examples && "has-rail"].filter(Boolean).join(" ")} id={e.id}>
      <div className="docs2-ep-text">
        <h3 className="docs2-ep-head"><span className="docs2-method">{e.method}</span><code className="docs2-path"><Path path={e.path} /></code></h3>
        <p><strong>{e.summary}.</strong> {e.description}</p>
        {e.auth === "none" ? <p className="small muted">No API key needed.</p> : null}
        {e.query?.length ? (
          <>
            <div className="label">Query</div>
            <ul className="docs2-params">{e.query.map((q) => <li key={q.name}><code>{q.name}</code>: {q.description}</li>)}</ul>
          </>
        ) : null}
        {e.body ? (
          <>
            <div className="label">Body: <span className="muted">{e.body}</span></div>
            {e.bodyExample !== undefined ? <div className="docs2-inline-ex"><CodeBlock lang="json" code={json(e.bodyExample)} /></div> : null}
          </>
        ) : null}
        <div className="label">Responses</div>
        <ul className="docs2-responses">
          {e.responses.map((r) => (
            <li key={r.status}>
              <code className="docs2-status">{r.status}</code> {r.description}
              {r.example !== undefined ? <div className="docs2-inline-ex"><CodeBlock lang="json" code={json(r.example)} /></div> : null}
            </li>
          ))}
        </ul>
      </div>
      {examples ? (
        // Only one copy of the examples shows at a time (display: none on the other), so each is read once.
        <div className="docs2-ep-rail">
          <div className="docs2-ep-rail-in">
            {e.body && e.bodyExample !== undefined ? <figure><figcaption className="label">Body: <span className="muted">{e.body}</span></figcaption><CodeBlock lang="json" code={json(e.bodyExample)} /></figure> : null}
            {e.responses.filter((r) => r.example !== undefined).map((r) => (
              <figure key={r.status}><figcaption><code className="docs2-status">{r.status}</code></figcaption><CodeBlock lang="json" code={json(r.example)} /></figure>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}

/** The API reference (merged spec 10C.16): the endpoint index, then each group and its endpoints. */
export default function Reference() {
  return (
    <article className="docs2-article is-ref">
      <h1>API reference</h1>
      <p className="muted">Send your key in <code>x-api-key</code>. Also available as <a href="/openapi.json">OpenAPI 3.1</a>.</p>
      <nav className="docs2-index" aria-label="Endpoints">
        {GROUPS.map((g) => (
          <details key={g}>
            <summary>{g}</summary>
            <ul>
              {ENDPOINTS.filter((e) => e.group === g).map((e) => (
                <li key={e.id}>
                  <a href={`#${e.id}`}><span className="docs2-index-method">{e.method}</span><code>{e.path}</code><span className="docs2-index-label">{e.summary}</span></a>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </nav>
      {GROUPS.map((g) => (
        <div key={g} className="docs2-group">
          <h2 id={groupId(g)}><HeadAnchor id={groupId(g)} />{g}</h2>
          {ENDPOINTS.filter((e) => e.group === g).map((e) => <EndpointBlock key={e.id} e={e} />)}
        </div>
      ))}
    </article>
  );
}
