import type { ClientCompany } from "./engine";
import type { FilingKind } from "./intake/forms";

/**
 * V22: a firm's saved settings fill or skip questions on its forms (the partner's own filings,
 * its client links and its public pages alike). A saved registered agent for the form's state:
 *  - where the form asks who the agent is (NJ), "Our saved agent: <name>" becomes the first and
 *    default answer, and the agent's fields stay folded away;
 *  - where the agent is optional or its fields differ (NY, FL), the saved agent fills them in.
 * The submit actions apply the same function, so the answer the form shows is one the server takes.
 */
export const SAVED_AGENT = "firm_saved";

type Agent = { name: string; email?: string; address?: { street1: string; street2?: string; city: string; state: string; zip: string } };

export function savedAgent(company: Pick<ClientCompany, "registeredAgentsByState">, state: string): Agent | undefined {
  const all = company.registeredAgentsByState as Record<string, Agent | undefined> | undefined;
  return all?.[state];
}

export function withFirmDefaults(kind: FilingKind, company: Pick<ClientCompany, "registeredAgentsByState">): { kind: FilingKind; prefill: Record<string, string> } {
  const agent = savedAgent(company, kind.state);
  if (!agent) return { kind, prefill: {} };
  const prefill: Record<string, string> = {};
  const addr = (path: string) => {
    if (!agent.address) return;
    for (const k of ["street1", "street2", "city", "state", "zip"] as const) if (agent.address[k]) prefill[`${path}.${k}`] = agent.address[k]!;
  };
  let offered = false;
  const sections = kind.sections.map((s) => ({
    ...s,
    items: s.items.map((it) => {
      if (it.kind === "field" && it.path === "formation.registeredAgentChoice" && it.type === "radio" && kind.state === "NJ") {
        offered = true;
        return { ...it, defaultValue: SAVED_AGENT, options: [{ value: SAVED_AGENT, label: `Our saved agent: ${agent.name}` }, ...(it.options ?? [])] };
      }
      return it;
    }),
  }));
  if (!offered) {
    // NY (optional agent) and FL: fill the agent's details in; the person can still change them.
    prefill["formation.registeredAgent.name"] = agent.name;
    if (agent.email) prefill["formation.registeredAgent.email"] = agent.email;
    addr("formation.registeredAgent.address");
    if (kind.state === "FL") { prefill["intake.portal.flAgentKind"] = "business"; prefill["intake.portal.flAgentBusinessName"] = agent.name; }
  }
  return { kind: { ...kind, sections } as FilingKind, prefill };
}
