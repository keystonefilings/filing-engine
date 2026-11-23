import { createServer, type Server } from "node:http";
import { keyMatches } from "../api/keys.js";
import type { JobQueue } from "./queue.js";

export interface WorkerLoopOptions {
  queue: JobQueue;
  /** opts.dryRun comes from the job: a preview, which can never make a run live. */
  run: (filingId: string, opts: { dryRun?: boolean }) => Promise<void>;
  workerId: string;
  /** Only claim jobs for these tenants (a service company's own worker); empty = any. */
  tenants: string[];
  /** Wait between checks while there is no work; a wake cuts it short. */
  idlePollMs: number;
}

/**
 * The worker's job loop. It drains the queue, then waits idlePollMs (or until woken) before
 * checking again. A database that cannot be reached (a hosted Postgres waking up, a network
 * blip) is logged and retried after the wait instead of stopping the worker. stop() lets the
 * filing in progress finish, then returns.
 */
export class WorkerLoop {
  private wakeUp: (() => void) | null = null;
  private stopping = false;
  private current: string | null = null;

  constructor(private readonly o: WorkerLoopOptions) {}

  get busy(): boolean { return this.current !== null; }
  wake(): void { this.wakeUp?.(); }
  stop(): void { this.stopping = true; this.wakeUp?.(); }

  async runUntilStopped(): Promise<void> {
    while (!this.stopping) {
      let job;
      try {
        job = await this.o.queue.dequeue(this.o.workerId, this.o.tenants.length ? this.o.tenants : undefined);
      } catch (e) {
        console.warn(`worker: could not check for work (${(e as Error).message.split("\n")[0]}); retrying`);
        await this.idle();
        continue;
      }
      if (!job) { await this.idle(); continue; }
      this.current = job.filingId ?? job.id;
      try {
        if (job.kind === "run_filing" && job.filingId) await this.o.run(job.filingId, { dryRun: job.dryRun }).catch((e) => console.error("run failed", e));
        await this.o.queue.complete(job.id);
      } finally {
        this.current = null;
      }
    }
  }

  private idle(): Promise<void> {
    if (this.stopping) return Promise.resolve();
    return new Promise((resolve) => {
      const done = () => { clearTimeout(timer); this.wakeUp = null; resolve(); };
      const timer = setTimeout(done, this.o.idlePollMs);
      this.wakeUp = done;
    });
  }
}

/**
 * The worker's HTTP listener: GET /healthz for the host's health check, POST /wake (bearer
 * WORKER_WAKE_TOKEN) to check for work now. No token configured = /wake is closed.
 */
export function startWorkerHttp(port: number, token: string | null, loop: WorkerLoop): Server {
  const server = createServer((req, res) => {
    const url = (req.url ?? "/").split("?")[0];
    if (req.method === "GET" && url === "/healthz") {
      res.setHeader("content-type", "application/json");
      return res.end(JSON.stringify({ ok: true, busy: loop.busy }));
    }
    if (req.method === "POST" && url === "/wake") {
      const bearer = String(req.headers.authorization ?? "").replace(/^Bearer\s+/i, "");
      if (!token || !keyMatches(bearer, [token])) { res.statusCode = 401; return res.end(); }
      loop.wake();
      res.statusCode = 202;
      return res.end();
    }
    res.statusCode = 404;
    res.end();
  });
  // IPv4 and IPv6 (Fly's private network, .internal, is IPv6); IPv4 only where IPv6 is off.
  server.once("error", (e: NodeJS.ErrnoException) => {
    if (e.code === "EAFNOSUPPORT" || e.code === "EADDRNOTAVAIL") server.listen(port, "0.0.0.0");
    else throw e;
  });
  server.listen(port, "::");
  return server;
}
