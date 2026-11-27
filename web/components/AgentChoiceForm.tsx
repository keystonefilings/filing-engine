"use client";

import { useKeptForm } from "./useKeptForm";
import type { AgentsState } from "./AgentsForm";
import { FormSlip, SaveButton } from "@/components/desk/SetupFields";

const NAMES: Record<string, string> = { NY: "New York", NJ: "New Jersey", FL: "Florida", MO: "Missouri" };
const list = (states: string[]) => states.map((s) => NAMES[s] ?? s).join(", ").replace(/, ([^,]*)$/, " and $1");

/**
 * Decided Nov 27: a partner firm can use ours as its registered agent, $59 a year per business
 * (the engine's price, billed to the firm on its invoices), or its own saved agents. The choice is
 * the answer the firm's forms start with; anyone filling a form can still pick the other.
 * Drawn as the desk's choice cards in one white sheet (10B.9, 11.3); its save is Ink, since "Save agents" below is the
 * page's Brass.
 */
export function AgentChoiceForm({ action, offer, choice, platform }: {
  action: (prev: AgentsState, fd: FormData) => Promise<AgentsState>;
  offer: { provider: string; annualUsd: number; states: string[] };
  choice?: string; platform: string;
}) {
  const { state: s, pending, formProps } = useKeptForm(action, null);
  const ours = choice === "filing_company";
  return (
    <form {...formProps} className="ds2-sheet ds2-form ds2-agentchoice">
      <fieldset className="ds2-group">
        <legend className="ds2-legend">Who is the registered agent on your filings?</legend>
        <div className="ds2-choices">
          <label className="choice2" htmlFor="rac-ours">
            <input id="rac-ours" type="radio" name="registeredAgentChoice" value="filing_company" defaultChecked={ours} />
            <span><strong>{platform}&apos;s registered agent service</strong>, through {offer.provider}, in {list(offer.states)}. <strong>${offer.annualUsd} a year per business</strong>, added to your next invoice when a filing is submitted and renewed each year until you cancel it (Billing lists each business). Your clients see it as your firm&apos;s service, without a price.</span>
          </label>
          <label className="choice2" htmlFor="rac-own">
            <input id="rac-own" type="radio" name="registeredAgentChoice" value="client_provided" defaultChecked={!ours} />
            <span><strong>Your own agent</strong>, saved below for each state. No charge from {platform}.</span>
          </label>
        </div>
      </fieldset>
      <FormSlip s={s} />
      <p className="ds2-actions"><SaveButton pending={pending} busy="Saving…">Save choice</SaveButton></p>
    </form>
  );
}
