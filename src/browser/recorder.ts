import type { Page } from "playwright";
import type { ArtifactStore } from "../artifacts/store.js";
import type { Store } from "../store/types.js";

/**
 * A copy of the page with every input value removed (attributes and textarea text), for
 * screens that carry an SSN/ITIN. Sent as a string so no TypeScript transform touches it;
 * it clones the DOM and never changes the live page.
 */
const SCRUBBED_DOM = `(() => {
  const clone = document.documentElement.cloneNode(true);
  clone.querySelectorAll("input").forEach((el) => { el.removeAttribute("value"); el.removeAttribute("checked"); });
  clone.querySelectorAll("textarea").forEach((el) => { el.textContent = ""; });
  clone.querySelectorAll("option").forEach((el) => { el.removeAttribute("selected"); });
  return "<!doctype html>" + clone.outerHTML;
})()`;

/**
 * Per-step evidence: full-page screenshot + DOM snapshot, attached to the run.
 * Screens marked sensitive (they show or take an SSN/ITIN) are recorded with every form
 * control masked in the screenshot and every value stripped from the DOM snapshot, so the
 * number never lands in an artifact, a drift review, or a review-gate page.
 */
export class StepRecorder {
  constructor(
    private readonly artifacts: ArtifactStore,
    private readonly store: Store,
    private readonly ctx: { filingId: string; runId: string },
    private readonly sensitiveScreens: ReadonlySet<string> = new Set(),
  ) {}

  isSensitive(screenKey: string): boolean { return this.sensitiveScreens.has(screenKey); }

  /** Full-page PNG; form controls are masked on sensitive screens. */
  async screenshot(page: Page, screenKey: string): Promise<Buffer> {
    if (!this.isSensitive(screenKey)) return page.screenshot({ fullPage: true, type: "png" });
    return page.screenshot({
      fullPage: true, type: "png",
      mask: [page.locator("input:not([type=hidden]), textarea, select")],
      maskColor: "#000000",
    });
  }

  /** Page HTML; input values are stripped on sensitive screens. */
  async domSnapshot(page: Page, screenKey: string): Promise<string> {
    if (!this.isSensitive(screenKey)) return page.content();
    return page.evaluate(SCRUBBED_DOM) as Promise<string>;
  }

  async record(page: Page, screenKey: string, note?: string): Promise<string[]> {
    const ids: string[] = [];
    try {
      const png = await this.screenshot(page, screenKey);
      const shot = await this.artifacts.put(
        { ...this.ctx, kind: "screenshot", label: `${screenKey}${note ? ` (${note})` : ""}`, contentType: "image/png" }, png,
      );
      ids.push(shot.id);
    } catch { /* page may be closed */ }
    try {
      const html = await this.domSnapshot(page, screenKey);
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
