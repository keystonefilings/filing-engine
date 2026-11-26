import { supportEmail } from "@/lib/brand";
import { engine, type ApiKeyInfo } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { NewKeyForm } from "@/components/NewKeyForm";
import { createKey, revokeKey } from "./actions";

export const metadata = { title: "API keys" };

export default async function KeysPage() {
  const s = await requireTenant();
  const { keys } = await engine<{ keys: ApiKeyInfo[] }>(s.apiKey, "/v1/api-keys");
  return (
    <div className="stack narrow">
      <h1>API keys</h1>
      <p className="muted">Keys you create here. A key we set up for you isn&apos;t listed here. To revoke it, email {supportEmail()}. See <a href="/docs/authentication">Authentication</a> for rotating keys.</p>
      <NewKeyForm action={createKey} />
      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead><tr><th>Name</th><th>Key</th><th>Last used</th><th /></tr></thead>
          <tbody>
            {keys.length === 0 ? <tr><td colSpan={4} className="muted">No keys created here yet.</td></tr> : keys.map((k) => (
              <tr key={k.id}>
                <td>{k.name}<div className="small muted">created {new Date(k.createdAt).toLocaleDateString()}</div></td>
                <td><code>{k.prefix}…</code></td>
                <td className="small">{k.revokedAt ? <span className="badge bad">Revoked</span> : k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleString() : "Never"}</td>
                <td>{k.revokedAt ? null : <form action={revokeKey}><input type="hidden" name="id" value={k.id} /><button className="btn small danger" type="submit">Revoke</button></form>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
