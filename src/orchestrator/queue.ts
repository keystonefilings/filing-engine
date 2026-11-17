export interface Job { id: string; kind: "run_filing" | "deliver_webhooks" | "reconcile"; filingId?: string; enqueuedAt: string }

/**
 * Queue boundary. A claimed job is never handed out again: a worker that dies mid-run
 * leaves its filing "running", and the next worker start settles it (see
 * FilingService.recoverInterruptedRuns) instead of blindly re-running a government filing.
 */
export interface JobQueue {
  enqueue(job: Omit<Job, "id" | "enqueuedAt">): Promise<Job>;
  dequeue(workerId?: string): Promise<Job | null>;
  complete(jobId: string): Promise<void>;
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
  async complete(): Promise<void> { /* nothing to record in memory */ }
  async size(): Promise<number> { return this.items.length; }
}
