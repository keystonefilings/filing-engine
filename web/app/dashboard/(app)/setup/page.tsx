import { engine, EngineError, type AccountSetup } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { FILING_KINDS } from "@/lib/intake/forms";
import { DefaultsForm, RoutingForm } from "@/components/EnterpriseSetupForms";
import { saveDefaults, saveRouting } from "./actions";

export const metadata = { title: "Setup" };

export default async function SetupPage() {
  const s = await requireTenant();
  let setup: AccountSetup | null = null;
  try { setup = await engine<AccountSetup>(s.apiKey, "/v1/account/setup"); } catch (e) { if (!(e instanceof EngineError && e.status === 403)) throw e; }
  if (!setup) return <p className="notice bad">This page is for enterprise accounts.</p>;
  return (
    <div className="stack narrow">
      <h1>Setup</h1>
      {!setup.configured ? <p className="notice warn">Your account settings haven&apos;t been set up yet, so nothing here can be saved. We&apos;ll do that with you first.</p> : null}

      <h2>Payment methods</h2>
      <p className="muted">Your subscription and state filing fees can be paid by different cards. Cards are held by a card vault, never by us; the engine asks the vault for the card only when it pays a state.</p>
      <RoutingForm action={saveRouting} methods={setup.payments.methods} routing={setup.payments.routing} kinds={FILING_KINDS.map((k) => ({ id: k.id, title: k.title }))} />

      <h2>State portal logins</h2>
      <p className="muted">Filings run under your own account on each state site. Logins are kept in a vault under your account and read only when a run starts.</p>
      <div className="table-wrap card" style={{ padding: 0 }}>
        <table>
          <thead><tr><th>Portal</th><th>Pays by</th><th>Login</th></tr></thead>
          <tbody>
            {setup.portals.map((p) => {
              const c = setup.portalLogins[p.id];
              return (
                <tr key={p.id}>
                  <td><strong>{p.name}</strong></td>
                  <td className="small">{p.pays}</td>
                  <td className="small">{!p.needsLogin ? <span className="muted">Not needed</span> : c ? <span className="badge ok">Connected {new Date(c.connectedAt).toLocaleDateString()}</span> : <button className="btn small" type="button" disabled title="Connecting logins opens once the vault is chosen">Connect</button>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="help">Connecting a login opens once the vault provider is chosen.</p>

      <h2>Defaults per portal</h2>
      <p className="muted">Used on every filing at that portal unless the filing says otherwise.</p>
      {setup.portals.filter((p) => p.defaults.length).map((p) => (
        <DefaultsForm key={p.id} title={p.name} fields={p.defaults} values={setup.portalDefaults[p.id] ?? {}} action={saveDefaults.bind(null, p.id)} />
      ))}
    </div>
  );
}
