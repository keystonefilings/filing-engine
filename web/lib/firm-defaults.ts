import type { ClientCompany } from "./engine";
import type { FilingKind } from "./intake/forms";
import { platformName } from "./brand.ts";

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

/**
 * Decision 9 (Nov 26): a partner firm's clients use the firm's own agent or ours (Registered Agents,
 * Inc., resold; charged to the firm per business per year). The "filing company's agent" answer is
 * ours, named as such: with its price for the firm's own staff, as the firm's service for its
 * clients, and not offered where our service isn't set up for the state.
 *
 * Decided Nov 27: in Setup the firm chooses which answer its forms start with: ours
 * (registeredAgentChoice "filing_company") or its own saved agents. Anyone can still pick the other.
 */
export function usesOurAgent(company: Partial<Pick<ClientCompany, "partner" | "ourAgent" | "registeredAgentChoice">>, state: string): boolean {
  return !!company.partner && company.registeredAgentChoice === "filing_company" && !!company.ourAgent?.states.includes(state);
}

function ourAgentChoice(kind: FilingKind, company: Partial<Pick<ClientCompany, "name" | "portal" | "partner" | "ourAgent" | "registeredAgentChoice">>, forClient: boolean): FilingKind {
  if (!company.partner) return kind;
  const offer = company.ourAgent && company.ourAgent.states.includes(kind.state) ? company.ourAgent : null;
  const ours = usesOurAgent(company, kind.state);
  const firm = company.portal?.displayName || company.name || "Your firm";
  return {
    ...kind,
    sections: kind.sections.map((s) => ({
      ...s,
      items: s.items.map((it) => {
        if (!(it.kind === "field" && it.path === "formation.registeredAgentChoice" && it.options?.some((o) => o.value === "filing_company"))) return it;
        const options = offer
          ? it.options!.map((o) => (o.value !== "filing_company" ? o : { ...o, label: forClient ? `${firm}'s registered agent service (${offer.provider})` : `Ours: ${offer.provider}, through ${platformName()} ($${offer.annualUsd} a year per business, billed to your firm)` }))
          : it.options!.filter((o) => o.value !== "filing_company");
        return { ...it, options, ...(ours ? { defaultValue: "filing_company" } : it.defaultValue === "filing_company" && !offer ? { defaultValue: "client_provided" } : {}) };
      }),
    })),
  } as FilingKind;
}

export function withFirmDefaults(kind: FilingKind, company: Pick<ClientCompany, "registeredAgentsByState"> & Partial<Pick<ClientCompany, "name" | "portal" | "partner" | "ourAgent" | "registeredAgentChoice">>, opts: { forClient?: boolean } = {}): { kind: FilingKind; prefill: Record<string, string> } {
  kind = ourAgentChoice(kind, company, !!opts.forClient);
  // A client filling the firm's form never sees "copy receipts to this email": the state's copy
  // goes to the firm (adapters/copies.ts), not to whoever filled in the form.
  if (opts.forClient) kind = { ...kind, sections: kind.sections.map((s) => ({ ...s, items: s.items.filter((i) => !(i.kind === "field" && i.path === "intake.portal.ccEmail")) })) } as FilingKind;
  // The contact block names the firm the client works with, not "the filing company".
  const filer = company.portal?.displayName || company.name;
  if (filer) kind = { ...kind, sections: kind.sections.map((s) => (s.title === "Filing contact" && s.help ? { ...s, help: s.help.replace("the filing company", () => filer) } : s)) } as FilingKind;
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
        // The saved agent is offered first; it is the starting answer unless the firm chose ours in Setup.
        return { ...it, defaultValue: usesOurAgent(company, kind.state) ? "filing_company" : SAVED_AGENT, options: [{ value: SAVED_AGENT, label: `Our saved agent: ${agent.name}` }, ...(it.options ?? [])] };
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
