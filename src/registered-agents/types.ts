import type { Address } from "../domain/filing.js";

/**
 * Registered-agent handling at the enterprise level. The tenant is the filing company;
 * each filing is for one of its clients. Four outcomes:
 *  - none            the client needs no agent (e.g. NY, where the Secretary of State is agent)
 *  - client_provided the client brings its own named agent
 *  - filing_company  the filing company IS the agent, from its own per-state record (case 2)
 *  - third_party     the filing company provides the agent via a third-party provider (case 3)
 * Cases 2 and 3 are both "the filing company handles it"; which one is used is the tenant's
 * provisioning, not the client's choice.
 */
export type RegisteredAgentSource = "none" | "client_provided" | "filing_company" | "third_party";

/** The client's request-level choice (how the tenant fulfills "filing_company" is tenant config). */
export type RegisteredAgentChoice = "none" | "client_provided" | "filing_company";

export interface RegisteredAgentDetails {
  name: string;
  address: Address;
  email?: string;
}

export interface ResolvedRegisteredAgent {
  source: RegisteredAgentSource;
  /** The agent to put on the form. null when source is "none", or third_party before procurement. */
  agent: RegisteredAgentDetails | null;
  /** RA service fee to fold into the filing's fees (third-party; or a self fee if the tenant charges one). */
  costUsd?: number;
  /** Third-party provider id, when source is "third_party". */
  provider?: string;
  /** True for third_party before the agent has been ordered (the assigned agent is not known until procurement). */
  pendingProcurement?: boolean;
  /** Provider order reference, once the RA is procured at run time. */
  procurementRef?: string;
}
