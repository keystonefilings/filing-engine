export interface Job { id: string; kind: "run_filing" | "deliver_webhooks" | "reconcile"; filingId?: string; enqueuedAt: string }

/** Queue boundary so pg-boss can replace the in-memory version without touching callers. */
export interface JobQueue {
  enqueue(job: Omit<Job, "id" | "enqueuedAt">): Promise<Job>;
  dequeue(): Promise<Job | null>;
  size(): Promise<number>;
}

export class InMemoryQueue implements JobQueue {
  private readonly items: Job[] = [];
  private seq = 0;
  async enqueue(job: Omit<Job, "id" | "enqueuedAt">): Promise<Job> {
    const full: Job = { ...job, id: `job_${++this.seq}`, enqueuedAt: new Date().toISOString() };
    this.items.push(full);
    return full;
  }
  async dequeue(): Promise<Job | null> { return this.items.shift() ?? null; }
  async size(): Promise<number> { return this.items.length; }
}
