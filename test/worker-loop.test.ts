import { describe, it, expect } from "vitest";
import type { AddressInfo } from "node:net";
import { InMemoryQueue, type JobQueue } from "../src/orchestrator/queue.js";
import { startWorkerHttp, WorkerLoop } from "../src/orchestrator/worker-loop.js";
import { WakingQueue, WorkerWaker } from "../src/orchestrator/wake.js";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

describe("worker loop", () => {
  it("runs queued work, then waits; a wake starts new work at once instead of after the wait", async () => {
    const queue = new InMemoryQueue();
    const ran: string[] = [];
    const loop = new WorkerLoop({ queue, run: async (id) => { ran.push(id); }, workerId: "w", tenants: [], idlePollMs: 60_000 });
    await queue.enqueue({ kind: "run_filing", filingId: "f1", tenantId: "keystone" });
    const done = loop.runUntilStopped();
    await sleep(50);
    expect(ran).toEqual(["f1"]);
    await queue.enqueue({ kind: "run_filing", filingId: "f2", tenantId: "keystone" });
    await sleep(50);
    expect(ran).toEqual(["f1"]); // still waiting out the 60 s idle check
    loop.wake();
    await sleep(50);
    expect(ran).toEqual(["f1", "f2"]);
    loop.stop();
    await done;
  });

  it("keeps going when the database cannot be reached", async () => {
    let fails = 2;
    const inner = new InMemoryQueue();
    const queue: JobQueue = {
      enqueue: (j) => inner.enqueue(j), complete: () => inner.complete(), size: () => inner.size(),
      dequeue: async (w, t) => { if (fails-- > 0) throw new Error("connection terminated unexpectedly"); return inner.dequeue(w, t); },
    };
    const ran: string[] = [];
    const loop = new WorkerLoop({ queue, run: async (id) => { ran.push(id); }, workerId: "w", tenants: [], idlePollMs: 10 });
    await inner.enqueue({ kind: "run_filing", filingId: "f1", tenantId: "keystone" });
    const done = loop.runUntilStopped();
    await sleep(100);
    expect(ran).toEqual(["f1"]);
    loop.stop();
    await done;
  });

  it("stop() lets the filing in progress finish and takes no new one", async () => {
    const queue = new InMemoryQueue();
    const ran: string[] = [];
    let release!: () => void;
    const loop = new WorkerLoop({ queue, workerId: "w", tenants: [], idlePollMs: 10,
      run: (id) => new Promise<void>((r) => { ran.push(`start ${id}`); release = () => { ran.push(`end ${id}`); r(); }; }) });
    await queue.enqueue({ kind: "run_filing", filingId: "f1", tenantId: "keystone" });
    await queue.enqueue({ kind: "run_filing", filingId: "f2", tenantId: "keystone" });
    const done = loop.runUntilStopped();
    await sleep(30);
    expect(loop.busy).toBe(true);
    loop.stop();
    release();
    await done;
    expect(ran).toEqual(["start f1", "end f1"]);
    expect(await queue.size()).toBe(1); // f2 waits for the next worker
  });
});

describe("worker wake", () => {
  it("the worker's /wake needs the token; /healthz is open", async () => {
    const queue = new InMemoryQueue();
    const loop = new WorkerLoop({ queue, run: async () => {}, workerId: "w", tenants: [], idlePollMs: 60_000 });
    const server = startWorkerHttp(0, "wake-token-0123456789abcdef", loop);
    await new Promise((r) => server.once("listening", r));
    const base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
    expect((await fetch(`${base}/healthz`)).status).toBe(200);
    expect((await fetch(`${base}/wake`, { method: "POST" })).status).toBe(401);
    expect((await fetch(`${base}/wake`, { method: "POST", headers: { authorization: "Bearer nope" } })).status).toBe(401);
    expect((await fetch(`${base}/wake`, { method: "POST", headers: { authorization: "Bearer wake-token-0123456789abcdef" } })).status).toBe(202);
    const closed = startWorkerHttp(0, null, loop); // no token configured: /wake stays closed
    await new Promise((r) => closed.once("listening", r));
    expect((await fetch(`http://127.0.0.1:${(closed.address() as AddressInfo).port}/wake`, { method: "POST", headers: { authorization: "Bearer " } })).status).toBe(401);
    server.close(); closed.close();
  });

  it("the API wakes the worker after queuing, and a failed wake never fails the enqueue", async () => {
    const calls: { url: string; auth: string | undefined }[] = [];
    const ok = (async (url: string, init: RequestInit) => { calls.push({ url, auth: (init.headers as Record<string, string>).authorization }); return new Response(null, { status: 202 }); }) as unknown as typeof fetch;
    const q = new WakingQueue(new InMemoryQueue(), new WorkerWaker("http://worker.internal:8081/wake", "tok", ok));
    await q.enqueue({ kind: "run_filing", filingId: "f1", tenantId: "keystone" });
    await sleep(10);
    expect(calls).toEqual([{ url: "http://worker.internal:8081/wake", auth: "Bearer tok" }]);
    const down = (async () => { throw new Error("ECONNREFUSED"); }) as unknown as typeof fetch;
    const q2 = new WakingQueue(new InMemoryQueue(), new WorkerWaker("http://worker.internal:8081/wake", "tok", down));
    await expect(q2.enqueue({ kind: "run_filing", filingId: "f2", tenantId: "keystone" })).resolves.toMatchObject({ filingId: "f2" });
    expect(await q2.size()).toBe(1);
  });
});
