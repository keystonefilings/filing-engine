import type { Job, JobQueue } from "./queue.js";

/**
 * Tells the worker there is work, so a filing starts within seconds of its approval while the
 * worker otherwise checks the database only every few minutes (a hosted Postgres such as Neon
 * can then scale to zero between checks). Best effort: a wake that fails is logged, and the
 * worker's own periodic check still picks the job up.
 */
export class WorkerWaker {
  constructor(private readonly url: string, private readonly token: string | null, private readonly fetchImpl: typeof fetch = fetch) {}

  wake(): void {
    void this.fetchImpl(this.url, {
      method: "POST",
      headers: this.token ? { authorization: `Bearer ${this.token}` } : {},
      signal: AbortSignal.timeout(5_000),
    }).then(
      (r) => { if (!r.ok) console.warn(`worker wake answered HTTP ${r.status}; the worker's periodic check will pick the job up`); },
      (e: Error) => console.warn(`worker wake failed (${e.message.split("\n")[0]}); the worker's periodic check will pick the job up`),
    );
  }
}

/** A queue that wakes the worker after every enqueue. */
export class WakingQueue implements JobQueue {
  constructor(private readonly inner: JobQueue, private readonly waker: WorkerWaker) {}
  async enqueue(job: Omit<Job, "id" | "enqueuedAt">): Promise<Job> {
    const queued = await this.inner.enqueue(job);
    this.waker.wake();
    return queued;
  }
  dequeue(workerId?: string, tenants?: string[]): Promise<Job | null> { return this.inner.dequeue(workerId, tenants); }
  complete(jobId: string): Promise<void> { return this.inner.complete(jobId); }
  size(): Promise<number> { return this.inner.size(); }
}
