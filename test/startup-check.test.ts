import { describe, it, expect } from "vitest";
import { deployProblems } from "../src/startup-check.js";

const ok = { role: "api" as const, production: true, databaseUrl: "postgres://db", dataEncryptionKey: "a".repeat(64), onFly: true, artifactBucket: "kf", workerWakeUrl: "http://w/wake", workerPort: null, workerWakeToken: "t" };

describe("production deploy checks", () => {
  it("pass a complete Fly setup", () => {
    expect(deployProblems(ok)).toEqual([]);
    expect(deployProblems({ ...ok, role: "worker", workerWakeUrl: null, workerPort: 8081 })).toEqual([]);
  });
  it("refuse a production process without a database (it would lose every filing on restart)", () => {
    expect(deployProblems({ ...ok, databaseUrl: null })[0]).toMatch(/DATABASE_URL is not set/);
    expect(deployProblems({ ...ok, dataEncryptionKey: null })[0]).toMatch(/DATA_ENCRYPTION_KEY is not set/);
  });
  it("refuse Fly without object storage, but not a single machine with one disk", () => {
    expect(deployProblems({ ...ok, artifactBucket: null })[0]).toMatch(/fly storage create/);
    expect(deployProblems({ ...ok, onFly: false, artifactBucket: null })).toEqual([]);
  });
  it("refuse a wake set up on one side only", () => {
    expect(deployProblems({ ...ok, workerWakeToken: null })[0]).toMatch(/WORKER_WAKE_TOKEN is not/);
    expect(deployProblems({ ...ok, role: "worker", workerWakeUrl: null, workerPort: 8081, workerWakeToken: null })[0]).toMatch(/\/wake would stay closed/);
  });
  it("check nothing outside production", () => {
    expect(deployProblems({ ...ok, production: false, databaseUrl: null, artifactBucket: null, workerWakeToken: null })).toEqual([]);
  });
});
