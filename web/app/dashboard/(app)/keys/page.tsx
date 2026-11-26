import { supportEmail } from "@/lib/brand";
import { engine, type ApiKeyInfo } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { NewKeyForm } from "@/components/NewKeyForm";
import { Chip } from "@/components/ui/Chip";
import { createKey, revokeKey } from "./actions";

export const metadata = { title: "API keys" };

const DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
const WHEN = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });

/** API keys (merged spec 10C.9): the create row, the new key on its plate shown once, and the keys made here. */
export default async function KeysPage() {
  const s = await requireTenant();
  const { keys } = await engine<{ keys: ApiKeyInfo[] }>(s.apiKey, "/v1/api-keys");
  const email = supportEmail();
  return (
    <div className="narrow dash2-keys">
      <h1>API keys</h1>
      <p className="muted">Keys you create here. A key we set up for you isn&apos;t listed here. To revoke it, email <a href={`mailto:${email}`}>{email}</a>. See <a href="/docs/authentication">Authentication</a> for rotating keys.</p>
      <NewKeyForm action={createKey} />
      <div className="dash2-table">
        <table>
          <thead><tr><th scope="col">Name</th><th scope="col">Key</th><th scope="col">Last used</th><th scope="col"><span className="sr-only">Revoke</span></th></tr></thead>
          <tbody>
            {keys.length === 0 ? <tr className="is-empty"><td colSpan={4}>No keys created here yet.</td></tr> : keys.map((k) => (
              <tr key={k.id} className={k.revokedAt ? "is-revoked" : undefined}>
                <th scope="row">{k.name}<span className="dash2-sub">created {DAY.format(new Date(k.createdAt))}</span></th>
                <td data-label="Key"><code className="dash2-path">{k.prefix}…</code></td>
                <td data-label="Last used" className="dash2-when">{k.revokedAt ? <Chip tone="neutral" compact>Revoked</Chip> : k.lastUsedAt ? WHEN.format(new Date(k.lastUsedAt)) : "Never"}</td>
                <td className="is-action">{k.revokedAt ? null : <form action={revokeKey}><input type="hidden" name="id" value={k.id} /><button className="btn small danger" type="submit">Revoke</button></form>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
