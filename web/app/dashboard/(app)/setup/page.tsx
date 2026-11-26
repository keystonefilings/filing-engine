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
import { Chip } from "@/components/ui/Chip";
import { Notice } from "@/components/ui/Sheet";
import { ContentsRail } from "@/components/dashboard/ContentsRail";

export const metadata = { title: "Setup" };

const DAY = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });

/** The page's own h2s, for the contents rail. */
const SECTIONS = [
  { id: "payment-methods", label: "Payment methods" },
  { id: "state-portal-logins", label: "State portal logins" },
  { id: "named-on-filings", label: "Who's named on your filings" },
  { id: "defaults-per-portal", label: "Defaults per portal" },
];

/**
 * Setup (merged spec 10C.11): a form book in one narrow column, each section opened by its h2 and its explanation,
 * with a sticky contents rail at 1280 px and up. The page carries several forms, so every save is Ink.
 */
export default async function SetupPage() {
  const s = await requireTenant();
  let setup: AccountSetup | null = null;
  try { setup = await engine<AccountSetup>(s.apiKey, "/v1/account/setup"); } catch (e) { if (!(e instanceof EngineError && e.status === 403)) throw e; }
  if (!setup) return <div className="narrow"><Notice tone="problem">This page is for enterprise accounts.</Notice></div>;
  return (
    <div className="dash2-setup">
      <div className="dash2-setup-main">
        <h1 id="setup-title">Setup</h1>
        {!setup.configured ? <Notice tone="attention">Your account settings haven&apos;t been set up yet, so nothing here can be saved. We&apos;ll do that with you first.</Notice> : null}

        <h2 id="payment-methods">Payment methods</h2>
        <p className="muted">Your subscription and state filing fees can be paid by different cards. Saved cards are held by Basis Theory, a card vault, never in our database; a card is used only to pay a state. When filings are ready to pay with a saved card, we ask the card&apos;s owner for its security code on the Ready to pay page and keep it for an hour at most.</p>
        <SavedCards methods={setup.payments.methods} />
        {process.env.BASIS_THEORY_PUBLIC_KEY ? <AddCard publicKey={process.env.BASIS_THEORY_PUBLIC_KEY} save={saveCard} /> : <Notice>Saving cards isn&apos;t turned on for your account yet. Email {supportEmail()} to turn it on.</Notice>}
        <RoutingForm action={saveRouting} methods={setup.payments.methods} routing={setup.payments.routing} kinds={FILING_KINDS.map((k) => ({ id: k.id, title: k.title }))} njLoginConnected={!!setup.portalLogins["nj-portal"]} />

        <h2 id="state-portal-logins">State portal logins</h2>
        <p className="muted">Filings run under your own account on each state site. A login you connect is sealed (encrypted) as soon as it arrives, kept apart from every other account, and read only when a filing runs. It&apos;s never shown again.</p>
        <div className="dash2-table dash2-logins">
          <table>
            <thead><tr><th scope="col">Portal</th><th scope="col">Pays by</th><th scope="col">Login</th></tr></thead>
            <tbody>
              {setup.portals.map((p) => {
                const c = setup.portalLogins[p.id];
                return (
                  <tr key={p.id}>
                    <th scope="row">{p.name}</th>
                    <td data-label="Pays by" className="small">{p.pays}</td>
                    <td data-label="Login" className="small dash2-login">
                      {c ? (
                        <div className="dash2-connected">
                          <Chip tone="done-quiet" compact>Connected {DAY.format(new Date(c.connectedAt))}{c.connectedBy ? ` by ${c.connectedBy}` : ""}</Chip>
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

        <h2 id="named-on-filings">Who&apos;s named on your filings</h2>
        <p className="muted">Used when a client&apos;s firm doesn&apos;t name its own. A name given on a filing always takes priority.</p>
        <FilingDefaultsForm action={saveFilingDefaults} v={setup.filingDefaults ?? {}} />
        <h3>Your registered agent in each state</h3>
        <p className="muted">When a client asks you to provide the agent, this is the agent named.</p>
        <AgentsForm action={saveTenantAgents} states={["NY", "NJ", "FL"]} agents={setup.filingDefaults?.registeredAgents ?? {}} />

        <h2 id="defaults-per-portal">Defaults per portal</h2>
        <p className="muted">Used on every filing at that portal unless the filing says otherwise.</p>
        <div className="dash2-defaults">
          {setup.portals.filter((p) => p.defaults.length).map((p) => (
            <DefaultsForm key={p.id} title={p.name} fields={p.defaults} values={setup.portalDefaults[p.id] ?? {}} action={saveDefaults.bind(null, p.id)} />
          ))}
        </div>
      </div>
      <aside className="dash2-setup-rail"><ContentsRail items={SECTIONS} labelledBy="setup-title" /></aside>
    </div>
  );
}
