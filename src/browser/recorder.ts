import type { Page } from "playwright";
import type { ArtifactStore } from "../artifacts/store.js";
import type { Store } from "../store/types.js";

/** Per-step evidence: full-page screenshot + DOM snapshot, attached to the run. */
export class StepRecorder {
  constructor(
    private readonly artifacts: ArtifactStore,
    private readonly store: Store,
    private readonly ctx: { filingId: string; runId: string },
  ) {}

  async record(page: Page, screenKey: string, note?: string): Promise<string[]> {
    const ids: string[] = [];
    try {
      const png = await page.screenshot({ fullPage: true, type: "png" });
      const shot = await this.artifacts.put(
        { ...this.ctx, kind: "screenshot", label: `${screenKey}${note ? ` (${note})` : ""}`, contentType: "image/png" }, png,
      );
      ids.push(shot.id);
    } catch { /* page may be closed */ }
    try {
      const html = await page.content();
      const dom = await this.artifacts.put({ ...this.ctx, kind: "dom_snapshot", label: screenKey, contentType: "text/html" }, html);
      ids.push(dom.id);
    } catch { /* ignore */ }
    const run = await this.store.getRun(this.ctx.runId);
    if (run) {
      await this.store.updateRun(run.id, { steps: [...run.steps, { screenKey, at: new Date().toISOString(), artifactIds: ids, note }] });
    }
    return ids;
  }

  async noteOnly(screenKey: string, note: string): Promise<void> {
    const run = await this.store.getRun(this.ctx.runId);
    if (run) await this.store.updateRun(run.id, { steps: [...run.steps, { screenKey, at: new Date().toISOString(), artifactIds: [], note }] });
  }
}
