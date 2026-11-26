import { test } from "node:test";
import assert from "node:assert/strict";
import { sentBy } from "./sender.ts";
import { STAGES, stageOf } from "./status.ts";

const filing = (portal: object | undefined, contact?: object) => ({ request: { contact, intake: portal ? { portal } : undefined } }) as never;

test("a filing sent through a client link names the client", () => {
  assert.deepEqual(
    sentBy(filing({ source: "client_link", submittedBy: "client:ana@bakery.test" }, { firstName: "Ana", lastName: "Ortiz", email: "ana@bakery.test" })),
    { who: "Ana Ortiz", detail: "ana@bakery.test", client: true },
  );
  assert.deepEqual(sentBy(filing({ source: "client_link", submittedBy: "client:ana@bakery.test" })), { who: "ana@bakery.test", client: true });
});

test("a filing the firm started names the person who started it", () => {
  assert.deepEqual(sentBy(filing({ source: "firm_portal", submittedBy: "pat@harborpine.test" })), { who: "pat@harborpine.test", client: false });
});

test("a filing with no intake record names nobody", () => {
  assert.equal(sentBy(filing(undefined)), null);
  assert.equal(sentBy(filing({ source: "client_link", submittedBy: "client" })), null);
});

test("every live status sits on a step, in order along the main path", () => {
  const path = ["created", "awaiting_approval", "approved", "queued", "running", "submitted", "accepted", "completed"];
  const steps = path.map((s) => stageOf(s)!.step);
  assert.deepEqual(steps, [...steps].sort((a, b) => a - b));
  assert.equal(stageOf("awaiting_approval")!.label, "Proof");
  assert.equal(stageOf("completed")!.step, STAGES.length - 1);
  for (const stopped of ["rejected", "failed", "aborted"]) assert.equal(stageOf(stopped), null);
});
