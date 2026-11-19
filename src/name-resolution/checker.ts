import type { FilingState } from "../domain/filing.js";

/**
 * Checks whether a proposed name is available to register in a state. The real
 * implementation drives the state's name-search (NY rejects a taken name before any
 * payment; FL requires a name search first) and so runs from the fixed-IP worker, like
 * the filing adapters. Until a state's search is mapped and reachable, no checker is
 * wired for it: the name-resolution service then offers the AI options UNVERIFIED and
 * says so to the admin, rather than claiming an availability it did not confirm.
 */
export interface NameAvailabilityChecker {
  check(name: string): Promise<{ available: boolean; detail?: string }>;
}

export type NameCheckerRegistry = Partial<Record<FilingState, NameAvailabilityChecker>>;

/** Test/stub helper: availability decided by a predicate over the full name. */
export function predicateChecker(isAvailable: (name: string) => boolean | Promise<boolean>): NameAvailabilityChecker {
  return { check: async (name) => ({ available: await isAvailable(name) }) };
}
