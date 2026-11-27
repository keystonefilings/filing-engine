"use client";

import { useKeptForm } from "./useKeptForm";
import type { RoleCandidate, StateRoleSettings } from "@/lib/engine";

export type RolesState = { ok?: boolean; message?: string; error?: string; issues?: Record<string, string> } | null;

/** A role as the settings page shows it (lib/state-roles.ts, made serializable for this client component). */
export interface RoleView { id: string; title: string; what: string; needs: "firm" | "signer"; always: RoleCandidate[]; optional: RoleCandidate[]; decidable: RoleCandidate[]; auto: RoleCandidate[] }

/** How each answer reads to the firm choosing what to offer. */
export function settingsLabel(c: RoleCandidate, ctx: { state: string; stateName: string; platform: string; filerName?: string; agentUsd?: number }): string {
  switch (c) {
    case "partner": return "Your firm";
    case "saved": return "Your saved agent for this state (Setup, Registered agents)";
    case "ours": return `${ctx.platform}'s registered agent service${ctx.agentUsd ? ` ($${ctx.agentUsd} a year per business)` : ""}`;
    case "entity": return `The new business itself, at its main business address${ctx.state === "NJ" ? " (a New Jersey street address)" : ""}`;
    case "member": return `One of its members or managers, at a ${ctx.stateName} street address`;
    case "client": return "The client (an owner or authorized person), who enters the details";
    case "other": return "Someone else the client names";
    case "service_company": return "A service company the client has hired";
    case "filing_company": return `${ctx.filerName ?? "The filing company"}, the company that files it`;
    case "none": return `None (not required in ${ctx.stateName})`;
  }
}

function Issue({ s, k }: { s: RolesState; k: string }) {
  const m = s?.issues?.[k];
  return m ? <p className="help" style={{ color: "var(--bad)" }}>{m}</p> : null;
}

/**
 * Nov 27: one state's role settings. First the firm as it is named in that state (and who signs for it, where a
 * role needs a person), then each role: which answers clients may pick (the state's own are always there; the
 * firm adds itself and, where it has them, its saved agent or our service), and whether the firm decides it.
 */
export function StateRolesForm({ action, state, stateName, firmName, v, roles, ctx }: {
  action: (prev: RolesState, fd: FormData) => Promise<RolesState>;
  state: string; stateName: string; firmName: string; v?: StateRoleSettings; roles: RoleView[];
  ctx: { platform: string; filerName?: string; agentUsd?: number };
}) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  const needsFirm = roles.some((r) => r.needs === "firm");
  const needsSigner = roles.some((r) => r.needs === "signer");
  const label = (c: RoleCandidate) => settingsLabel(c, { state, stateName, ...ctx });
  const a = v?.firm?.address;
  return (
    <form {...formProps} className="card stack">
      <h2 style={{ margin: 0 }}>{stateName}</h2>
      {s?.error ? <p className="notice bad" role="alert">{s.error}</p> : s?.message ? <p className="notice ok" role="status">{s.message}</p> : null}
      {needsFirm ? (
        <fieldset className="field">
          <legend><strong>Your firm in {stateName}</strong></legend>
          <p className="help">Used wherever a client picks your firm for a role. The address must be in {stateName}.</p>
          <div className="field"><label htmlFor={`${state}-fn`}>Name as it should appear</label><input id={`${state}-fn`} name="firm.name" defaultValue={v?.firm?.name ?? firmName} /></div>
          <div className="field"><label htmlFor={`${state}-s1`}>Street address in {stateName}</label><input id={`${state}-s1`} name="firm.street1" defaultValue={a?.street1} /><Issue s={s} k="firm" /></div>
          <div className="field-row n3">
            <div className="field"><label htmlFor={`${state}-s2`}>Suite (optional)</label><input id={`${state}-s2`} name="firm.street2" defaultValue={a?.street2} /></div>
            <div className="field"><label htmlFor={`${state}-city`}>City</label><input id={`${state}-city`} name="firm.city" defaultValue={a?.city} /></div>
            <div className="field"><label htmlFor={`${state}-zip`}>ZIP</label><input id={`${state}-zip`} name="firm.zip" defaultValue={a?.zip} inputMode="numeric" /></div>
          </div>
        </fieldset>
      ) : null}
      {needsSigner ? (
        <fieldset className="field">
          <legend><strong>Who signs for your firm in {stateName}</strong></legend>
          <p className="help">A person, named where a client picks your firm as the signer.</p>
          <div className="field-row n2">
            <div className="field"><label htmlFor={`${state}-sn`}>Full name</label><input id={`${state}-sn`} name="signer.name" defaultValue={v?.signer?.name} /><Issue s={s} k="signer" /></div>
            <div className="field"><label htmlFor={`${state}-st`}>Title</label><input id={`${state}-st`} name="signer.title" defaultValue={v?.signer?.title ?? "Authorized Representative"} /></div>
          </div>
        </fieldset>
      ) : null}
      {roles.map((r) => {
        const cfg = v?.roles?.[r.id];
        const fixed = cfg?.fixed && r.decidable.includes(cfg.fixed) ? cfg.fixed : "";
        return (
          <fieldset key={r.id} className="field">
            <legend><strong>{r.title}</strong></legend>
            <p className="help">{r.what}</p>
            <p className="small" style={{ margin: "8px 0 4px" }}>Clients may choose:</p>
            <ul className="small" style={{ margin: "0 0 8px", paddingLeft: 20 }}>
              {r.always.map((c) => <li key={c}>{label(c)}</li>)}
              {r.auto.map((c) => <li key={c}>{label(c)}</li>)}
            </ul>
            {r.optional.map((c) => (
              <label key={c} className="check"><input type="checkbox" name={`roles.${r.id}.offer`} value={c} defaultChecked={cfg?.offer?.includes(c) ?? false} /> {c === "partner" ? "Your firm too" : label(c)}</label>
            ))}
            {r.decidable.length ? (
              <div className="field" style={{ marginTop: 8 }} role="radiogroup" aria-label={`${r.title}: who decides`}>
                <label className="choice"><input type="radio" name={`roles.${r.id}.fixed`} value="" defaultChecked={!fixed} /><span>Let the client choose on the form</span></label>
                {r.decidable.map((c) => (
                  <label key={c} className="choice"><input type="radio" name={`roles.${r.id}.fixed`} value={c} defaultChecked={fixed === c} /><span>Always {c === "partner" ? "your firm" : c === "client" ? "the client" : label(c).toLowerCase()}</span></label>
                ))}
              </div>
            ) : null}
            <Issue s={s} k={`roles.${r.id}`} />
          </fieldset>
        );
      })}
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : `Save ${stateName}`}</button>
    </form>
  );
}
