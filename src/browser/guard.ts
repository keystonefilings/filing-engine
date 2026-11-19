/** Thrown when a dry run reaches the point where a real run would submit or pay. */
export class DryRunStop extends Error {
  constructor(public readonly screenKey: string, public readonly action: string) {
    super(`dry run stopped before "${action}" on ${screenKey}`);
  }
}

/** Thrown when the live page differs from the approved snapshot (decision 6). */
export class DriftHalt extends Error {
  constructor(public readonly screenKey: string, public readonly haltId: string, public readonly summary: string) {
    super(`drift halt on ${screenKey}: ${summary}`);
  }
}

/** Thrown when the site shows a fee that does not match the approved table/cap (decision 5). */
export class FeeMismatch extends Error {
  constructor(public readonly screenKey: string, public readonly detail: string) {
    super(`fee mismatch on ${screenKey}: ${detail}`);
  }
}

/** Thrown when a bot challenge, CAPTCHA, or block page is detected (decision 4). */
export class BotChallenge extends Error {
  constructor(public readonly site: string, public readonly detail: string) {
    super(`bot challenge on ${site}: ${detail}`);
  }
}

/**
 * Thrown in beta when a run reaches the review screen with the tenant's review gate on:
 * the engine screenshots the page and stops so an admin can review before the filing is
 * submitted. On approval the filing is re-queued and runs past the gate in one pass.
 */
export class ReviewGateHalt extends Error {
  constructor(public readonly screenKey: string, public readonly recordId: string) {
    super(`review gate halt on ${screenKey}: awaiting admin review (${recordId})`);
  }
}

/**
 * Thrown when an irreversible click returned but the adapter could not read evidence that
 * the portal took the filing (no confirmation number, receipt or assigned EIN). The submit
 * intent stays open, so the filing goes to needs_reconciliation and is never re-run.
 */
export class SubmissionUnconfirmed extends Error {
  constructor(public readonly adapterKey: string, public readonly detail: string) {
    super(`submission not confirmed on ${adapterKey}: ${detail}`);
  }
}

/** Thrown when this worker no longer holds the filing's run lease (another worker may own it now). */
export class LeaseLost extends Error {
  constructor(public readonly filingId: string) {
    super(`run lease for filing ${filingId} was lost; stopping before any irreversible click`);
  }
}
