import type pg from "pg";
import type { Job, JobQueue } from "./queue.js";

/**
 * Postgres job queue on the `jobs` table (db/schema.sql). The cloud tier enqueues; the
 * fixed-IP worker claims with FOR UPDATE SKIP LOCKED, so several workers never take the
 * same job. Claimed jobs are not re-leased (see JobQueue).
 */
export class PgQueue implements JobQueue {
  constructor(private readonly pool: pg.Pool) {}

  async enqueue(job: Omit<Job, "id" | "enqueuedAt">): Promise<Job> {
    const r = await this.pool.query(
      `insert into jobs (kind, filing_id) values ($1, $2) returning id, kind, filing_id, enqueued_at`,
      [job.kind, job.filingId ?? null],
    );
    return toJob(r.rows[0]);
  }

  async dequeue(workerId = "worker"): Promise<Job | null> {
    const r = await this.pool.query(
      `update jobs set taken_at = now(), taken_by = $1
         where id = (select id from jobs where taken_at is null order by id for update skip locked limit 1)
       returning id, kind, filing_id, enqueued_at`,
      [workerId],
    );
    return r.rows[0] ? toJob(r.rows[0]) : null;
  }

  async complete(jobId: string): Promise<void> {
    await this.pool.query(`update jobs set done_at = now() where id = $1`, [Number(jobId)]);
  }

  async size(): Promise<number> {
    const r = await this.pool.query(`select count(*)::int as n from jobs where taken_at is null`);
    return r.rows[0].n as number;
  }
}

function toJob(row: { id: string | number; kind: Job["kind"]; filing_id: string | null; enqueued_at: Date }): Job {
  return { id: String(row.id), kind: row.kind, filingId: row.filing_id ?? undefined, enqueuedAt: new Date(row.enqueued_at).toISOString() };
}
