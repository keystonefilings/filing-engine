/** A fixed-window counter per key, in memory (one API process). Good enough to blunt a burst. */
export class RateLimiter {
  private readonly hits = new Map<string, { n: number; until: number }>();
  constructor(private readonly max: number, private readonly windowMs: number, private readonly clock: () => number = Date.now) {}
  take(key: string): boolean {
    const t = this.clock();
    const h = this.hits.get(key);
    if (!h || h.until <= t) { this.hits.set(key, { n: 1, until: t + this.windowMs }); return true; }
    if (h.n >= this.max) return false;
    h.n++;
    return true;
  }
}
