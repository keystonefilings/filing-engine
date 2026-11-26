import { test } from "node:test";
import assert from "node:assert/strict";
import { highlight, isRehearsal, markRehearsal, tokenize, type CodeLang } from "./docs/highlight.ts";

const SAMPLES: [CodeLang, string][] = [
  ["bash", `curl https://api.cofile.app/v1/filings \\\n  -H "x-api-key: $COFILE_API_KEY" -H "content-type: application/json" \\\n  -d '{"tenantId":"your-tenant","dryRun":true,"n":2}'`],
  ["python", `import os, requests\nr = requests.get("https://api.cofile.app/v1/account", headers={"x-api-key": os.environ["COFILE_API_KEY"]})\nprint(r.json())  # the account`],
  ["javascript", "import { createHmac } from \"node:crypto\";\n// check it\nexport function verify(secret, header) {\n  const m = /t=(\\d+)/.exec(header ?? \"\");\n  return `${m}` === null;\n}"],
  ["json", `{\n  "id": "f_01J",\n  "dryRun": true,\n  "fee": 125.5,\n  "ok": null\n}`],
  ["http", `POST /your/endpoint\ncontent-type: application/json\nx-cofile-event: filing.completed\n\n{"id":"evt_…","type":"filing.completed"}`],
];

test("tokens join back to the exact source, in every language", () => {
  for (const [lang, src] of SAMPLES) {
    assert.equal(tokenize(src, lang).map((t) => t.text).join(""), src, lang);
    assert.equal(highlight(src, lang).map((l) => l.map((t) => t.text).join("")).join("\n"), src, lang);
  }
});

test("keys, keywords and literals are told apart; strings and comments too", () => {
  const json = tokenize(SAMPLES[3]![1], "json");
  assert.deepEqual(json.filter((t) => t.kind === "key").map((t) => t.text), ['"id"', '"dryRun"', '"fee"', '"ok"']);
  assert.deepEqual(json.filter((t) => t.kind === "lit").map((t) => t.text), ["true", "125.5", "null"]);
  assert.deepEqual(json.filter((t) => t.kind === "str").map((t) => t.text), ['"f_01J"']);
  const py = tokenize(SAMPLES[1]![1], "python");
  assert.ok(py.some((t) => t.kind === "kw" && t.text === "import"));
  assert.ok(py.some((t) => t.kind === "com" && t.text === "# the account"));
  const sh = tokenize(SAMPLES[0]![1], "bash");
  assert.deepEqual(sh.filter((t) => t.kind === "kw").map((t) => t.text), ["curl", "-H", "-H", "-d"]);
  // The JSON inside curl's -d is set as JSON
  assert.ok(sh.some((t) => t.kind === "key" && t.text === '"tenantId"'));
  const http = tokenize(SAMPLES[4]![1], "http");
  assert.equal(http[0]!.kind, "kw");
  assert.ok(http.some((t) => t.kind === "key" && t.text === "x-cofile-event"));
});

test("the rehearsal mark covers exactly the dryRun literal and the dry-run path", () => {
  const marked = (src: string, lang: CodeLang) => markRehearsal(tokenize(src, lang)).filter((t) => t.rehearsal).map((t) => t.text).join("");
  assert.equal(marked(SAMPLES[3]![1], "json"), '"dryRun": true');
  assert.equal(marked(SAMPLES[0]![1], "bash"), '"dryRun":true');
  assert.equal(marked(`curl -X POST ${"$"}API/v1/filings/f_1/dry-run -H "x"`, "bash"), "/dry-run");
  assert.equal(marked(`{"dryRun": false}`, "json"), "");
  assert.ok(isRehearsal('"dryRun": true') && isRehearsal("POST /v1/filings/{id}/dry-run") && !isRehearsal("/v1/filings"));
});
