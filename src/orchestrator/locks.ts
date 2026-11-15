/**
 * Decision 4: one fixed IP, so a per-site concurrency cap (start at 1). Decision 3/10:
 * one ny.gov account and one NJ account per client, so per-account serialization.
 */
export class ConcurrencyLimiter {
  private readonly active = new Map<string, number>();
  private readonly waiters = new Map<string, (() => void)[]>();
  constructor(private readonly limits: Record<string, number>, private readonly defaultLimit = 1) {}

  async acquire(key: string): Promise<() => void> {
    const limit = this.limits[key] ?? this.defaultLimit;
    while ((this.active.get(key) ?? 0) >= limit) {
      await new Promise<void>((resolve) => {
        const list = this.waiters.get(key) ?? [];
        list.push(resolve);
        this.waiters.set(key, list);
      });
    }
    this.active.set(key, (this.active.get(key) ?? 0) + 1);
    let released = false;
    return () => {
      if (released) return;
      released = true;
      this.active.set(key, (this.active.get(key) ?? 1) - 1);
      const next = this.waiters.get(key)?.shift();
      next?.();
    };
  }

  inUse(key: string): number { return this.active.get(key) ?? 0; }
}
