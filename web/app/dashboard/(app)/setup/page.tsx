import { supportEmail } from "@/lib/brand";
import { engine, EngineError, type AccountSetup } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { FILING_KINDS } from "@/lib/intake/forms";
import { DefaultsForm, RoutingForm } from "@/components/EnterpriseSetupForms";
import { connectLogin, disconnectLogin, saveDefaults, saveRouting } from "./actions";
import { PortalLoginForm } from "@/components/PortalLoginForm";
import { FilingDefaultsForm } from "@/components/FilingDefaultsForm";
import { AgentsForm } from "@/components/AgentsForm";
import { saveFilingDefaults, saveTenantAgents } from "./actions";
import { AddCard } from "@/components/AddCard";
import { SavedCards } from "@/components/SavedCards";
import { saveCard } from "@/lib/cards";

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
      <p className="muted">Your subscription and state filing fees can be paid by different cards. Saved cards are held by Basis Theory, a card vault, never in our database; a card is used only to pay a state. When filings are ready to pay with a saved card, we ask the card&apos;s owner for its security code on the Ready to pay page and keep it for an hour at most.</p>
      <SavedCards methods={setup.payments.methods} />
      {process.env.BASIS_THEORY_PUBLIC_KEY ? <AddCard publicKey={process.env.BASIS_THEORY_PUBLIC_KEY} save={saveCard} /> : <p className="notice">Saving cards isn&apos;t turned on for your account yet. Email {supportEmail()} to turn it on.</p>}
      <RoutingForm action={saveRouting} methods={setup.payments.methods} routing={setup.payments.routing} kinds={FILING_KINDS.map((k) => ({ id: k.id, title: k.title }))} />

      <h2>State portal logins</h2>
      <p className="muted">Filings run under your own account on each state site. A login you connect is sealed (encrypted) as soon as it arrives, kept apart from every other account, and read only when a filing runs. It&apos;s never shown again.</p>
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
                  <td className="small">
                    {c ? (
                      <div className="row" style={{ gap: 6 }}>
                        <span className="badge ok">Connected {new Date(c.connectedAt).toLocaleDateString()}{c.connectedBy ? ` by ${c.connectedBy}` : ""}</span>
                        <form action={disconnectLogin.bind(null, p.id)}><button className="btn small" type="submit">Disconnect</button></form>
                      </div>
                    ) : !p.needsLogin && p.id !== "fl-sunbiz" ? <span className="muted">Not needed</span>
                      : <>{!p.needsLogin ? <span className="muted">Only for a prepaid Sunbiz E-file account. </span> : null}<PortalLoginForm action={connectLogin.bind(null, p.id)} portalName={p.name} /></>}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2>Who&apos;s named on your filings</h2>
      <p className="muted">Used when a client&apos;s firm doesn&apos;t name its own. A name given on a filing always takes priority.</p>
      <FilingDefaultsForm action={saveFilingDefaults} v={setup.filingDefaults ?? {}} />
      <h3>Your registered agent in each state</h3>
      <p className="muted">When a client asks you to provide the agent, this is the agent named.</p>
      <AgentsForm action={saveTenantAgents} states={["NY", "NJ", "FL"]} agents={setup.filingDefaults?.registeredAgents ?? {}} />

      <h2>Defaults per portal</h2>
      <p className="muted">Used on every filing at that portal unless the filing says otherwise.</p>
      {setup.portals.filter((p) => p.defaults.length).map((p) => (
        <DefaultsForm key={p.id} title={p.name} fields={p.defaults} values={setup.portalDefaults[p.id] ?? {}} action={saveDefaults.bind(null, p.id)} />
      ))}
    </div>
  );
}
