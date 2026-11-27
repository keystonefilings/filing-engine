"use client";

import { useKeptForm } from "./useKeptForm";
import type { RoleCandidate, StateRoleSettings } from "@/lib/engine";
import { describedBy, FormSlip, Opt, SaveButton, Text } from "@/components/desk/SetupFields";

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

/**
 * Nov 27: one state's role settings, in one white sheet (drawn as Registered agents, 10B.9). First the firm as it is
 * named in that state (and who signs for it, where a role needs a person), then each role: which answers clients may
 * pick (the state's own are always there; the firm adds itself and, where it has them, its saved agent or our service),
 * and whether the firm decides it. The page holds one form per state, so each save is Ink.
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
  const issue = (k: string) => s?.issues?.[k];
  const a = v?.firm?.address;
  return (
    <form {...formProps} className="ds2-sheet ds2-form ds2-state-roles" aria-labelledby={`${state}-roles`}>
      <h2 className="ds2-sheet-title" id={`${state}-roles`}>{stateName}</h2>
      <FormSlip s={s} />
      {needsFirm ? (
        <fieldset className="ds2-group ds2-part" aria-describedby={`${state}-firm-help`}>
          <legend className="ds2-legend">Your firm in {stateName}</legend>
          <p className="field2-help" id={`${state}-firm-help`}>Used wherever a client picks your firm for a role. The address must be in {stateName}.</p>
          <Text id={`${state}-fn`} label="Name as it should appear" name="firm.name" defaultValue={v?.firm?.name ?? firmName} />
          <Text id={`${state}-s1`} label={`Street address in ${stateName}`} name="firm.street1" defaultValue={a?.street1} error={issue("firm")} />
          <div className="ds2-trio">
            <Text id={`${state}-s2`} label={<Opt>Suite</Opt>} name="firm.street2" defaultValue={a?.street2} />
            <Text id={`${state}-city`} label="City" name="firm.city" defaultValue={a?.city} />
            <Text id={`${state}-zip`} label="ZIP" name="firm.zip" defaultValue={a?.zip} inputMode="numeric" />
          </div>
        </fieldset>
      ) : null}
      {needsSigner ? (
        <fieldset className="ds2-group ds2-part" aria-describedby={`${state}-signer-help`}>
          <legend className="ds2-legend">Who signs for your firm in {stateName}</legend>
          <p className="field2-help" id={`${state}-signer-help`}>A person, named where a client picks your firm as the signer.</p>
          <div className="ds2-pair">
            <Text id={`${state}-sn`} label="Full name" name="signer.name" defaultValue={v?.signer?.name} error={issue("signer")} />
            <Text id={`${state}-st`} label="Title" name="signer.title" defaultValue={v?.signer?.title ?? "Authorized Representative"} />
          </div>
        </fieldset>
      ) : null}
      {roles.map((r) => {
        const cfg = v?.roles?.[r.id];
        const fixed = cfg?.fixed && r.decidable.includes(cfg.fixed) ? cfg.fixed : "";
        const err = issue(`roles.${r.id}`);
        const id = `${state}-${r.id}`;
        return (
          <fieldset key={r.id} className="ds2-group ds2-part ds2-role" aria-describedby={describedBy(id, true, err)}>
            <legend className="ds2-legend">{r.title}</legend>
            <p className="field2-help" id={`${id}-help`}>{r.what}</p>
            <div className="ds2-offer">
              <p className="ds2-may">Clients may choose:</p>
              <ul className="ds2-answers">
                {r.always.map((c) => <li key={c}>{label(c)}</li>)}
                {r.auto.map((c) => <li key={c}>{label(c)}</li>)}
              </ul>
              {r.optional.map((c) => (
                <label key={c} className="check2"><input type="checkbox" name={`roles.${r.id}.offer`} value={c} defaultChecked={cfg?.offer?.includes(c) ?? false} /><span>{c === "partner" ? "Your firm too" : label(c)}</span></label>
              ))}
            </div>
            {r.decidable.length ? (
              <div className="ds2-decide" role="radiogroup" aria-label={`${r.title}: who decides`}>
                <label className="check2"><input type="radio" name={`roles.${r.id}.fixed`} value="" defaultChecked={!fixed} /><span>Let the client choose on the form</span></label>
                {r.decidable.map((c) => (
                  <label key={c} className="check2"><input type="radio" name={`roles.${r.id}.fixed`} value={c} defaultChecked={fixed === c} /><span>Always {c === "partner" ? "your firm" : c === "client" ? "the client" : label(c).toLowerCase()}</span></label>
                ))}
              </div>
            ) : null}
            {err ? <p className="field2-error" id={`${id}-error`}>{err}</p> : null}
          </fieldset>
        );
      })}
      <p className="ds2-actions"><SaveButton pending={pending} busy="Saving…">{`Save ${stateName}`}</SaveButton></p>
    </form>
  );
}
