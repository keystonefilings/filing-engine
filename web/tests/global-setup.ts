/** Seeds the desk's firm and filings when the engine is running, and tells the tests which filing to open. */
import { ENGINE_URL, seedDesk } from "./desk.ts";

export default async function globalSetup(): Promise<void> {
  const up = await fetch(`${ENGINE_URL}/healthz`).then((r) => r.ok, () => false);
  if (!up) { console.log(`site checks: no engine at ${ENGINE_URL}, so the desk pages are skipped`); return; }
  const { filingId } = await seedDesk();
  process.env.CHECKS_DESK_FILING = filingId;
}
