"use server";

import { redirect } from "next/navigation";
import { engine, EngineError, type Account } from "@/lib/engine";
import { writeSession } from "@/lib/session";

export async function signIn(_prev: string | null, fd: FormData): Promise<string | null> {
  const apiKey = String(fd.get("apiKey") ?? "").trim();
  if (apiKey.length < 16 || apiKey.length > 300) return "Enter one of your API keys.";
  let account: Account;
  try {
    account = await engine<Account>(apiKey, "/v1/account");
  } catch (e) {
    return e instanceof EngineError && e.status === 401 ? "That key isn't valid, or it was revoked." : "The filing engine can't be reached right now.";
  }
  await writeSession({ kind: "tenant", apiKey, tenantId: account.tenantId, name: account.name });
  redirect("/dashboard");
}
