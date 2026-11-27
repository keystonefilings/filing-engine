"use client";

import { useKeptForm } from "./useKeptForm";
import type { AgentsState } from "./AgentsForm";
import "@/styles/components/field.css";

const NAMES: Record<string, string> = { NY: "New York", NJ: "New Jersey", FL: "Florida", MO: "Missouri" };
const list = (states: string[]) => states.map((s) => NAMES[s] ?? s).join(", ").replace(/, ([^,]*)$/, " and $1");

/**
 * Decided Nov 27: a partner firm can use ours as its registered agent, $59 a year per business
 * (the engine's price, billed to the firm on its invoices), or its own saved agents. The choice is
 * the answer the firm's forms start with; anyone filling a form can still pick the other.
 */
export function AgentChoiceForm({ action, offer, choice, platform }: {
  action: (prev: AgentsState, fd: FormData) => Promise<AgentsState>;
  offer: { provider: string; annualUsd: number; states: string[] };
  choice?: string; platform: string;
}) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  const ours = choice === "filing_company";
  return (
    <form {...formProps} className="card stack">
      <fieldset className="stack" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend><strong>Who is the registered agent on your filings?</strong></legend>
        <label className="check2" htmlFor="rac-ours">
          <input id="rac-ours" type="radio" name="registeredAgentChoice" value="filing_company" defaultChecked={ours} />
          <span><strong>{platform}&apos;s registered agent service</strong>, through {offer.provider}, in {list(offer.states)}. <strong>${offer.annualUsd} a year per business</strong>, added to your next invoice when a filing is submitted and renewed each year until you cancel it (Billing lists each business). Your clients see it as your firm&apos;s service, without a price.</span>
        </label>
        <label className="check2" htmlFor="rac-own">
          <input id="rac-own" type="radio" name="registeredAgentChoice" value="client_provided" defaultChecked={!ours} />
          <span><strong>Your own agent</strong>, saved below for each state. No charge from {platform}.</span>
        </label>
      </fieldset>
      <button className="btn primary" type="submit" disabled={pending}>{pending ? "Saving…" : "Save choice"}</button>
      {s?.error ? <p className="notice bad" role="alert">{s.error}</p> : s?.message ? <p className="notice ok" role="status">{s.message}</p> : null}
    </form>
  );
}
