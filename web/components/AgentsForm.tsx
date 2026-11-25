"use client";

import { useKeptForm } from "./useKeptForm";

export type AgentsState = { ok?: boolean; message?: string; error?: string } | null;
type Agent = { name: string; email?: string; address?: { street1: string; street2?: string; city: string; zip: string } };
const NAMES: Record<string, string> = { NY: "New York", NJ: "New Jersey", FL: "Florida", MO: "Missouri" };

/** V22: the firm's registered agent per state; saved once, used on every filing in that state. */
export function AgentsForm({ action, states, agents }: { action: (prev: AgentsState, fd: FormData) => Promise<AgentsState>; states: string[]; agents: Record<string, Agent | undefined> }) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  return (
    <form {...formProps} className="stack">
      {states.map((st) => {
        const a = agents[st];
        return (
          <fieldset key={st} className="card">
            <legend><strong>{NAMES[st] ?? st}</strong>{st === "NY" ? <span className="small muted"> (optional in New York)</span> : null}</legend>
            <div className="field"><label htmlFor={`ra-${st}-name`}>Agent name</label><input id={`ra-${st}-name`} name={`${st}.name`} defaultValue={a?.name} placeholder="Leave empty for none" /></div>
            {st === "NJ" ? <div className="field"><label htmlFor={`ra-${st}-email`}>Agent email (optional)</label><input id={`ra-${st}-email`} name={`${st}.email`} type="email" defaultValue={a?.email} /></div> : null}
            <div className="field"><label htmlFor={`ra-${st}-s1`}>Street address in {NAMES[st] ?? st}</label><input id={`ra-${st}-s1`} name={`${st}.street1`} defaultValue={a?.address?.street1} /></div>
            <div className="field-row n3">
              <div className="field"><label htmlFor={`ra-${st}-s2`}>Suite (optional)</label><input id={`ra-${st}-s2`} name={`${st}.street2`} defaultValue={a?.address?.street2} /></div>
              <div className="field"><label htmlFor={`ra-${st}-city`}>City</label><input id={`ra-${st}-city`} name={`${st}.city`} defaultValue={a?.address?.city} /></div>
              <div className="field"><label htmlFor={`ra-${st}-zip`}>ZIP</label><input id={`ra-${st}-zip`} name={`${st}.zip`} defaultValue={a?.address?.zip} inputMode="numeric" /></div>
            </div>
          </fieldset>
        );
      })}
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save agents"}</button>
      {s?.error ? <p className="notice bad" role="alert">{s.error}</p> : s?.message ? <p className="notice ok" role="status">{s.message}</p> : null}
    </form>
  );
}
