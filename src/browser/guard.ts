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
