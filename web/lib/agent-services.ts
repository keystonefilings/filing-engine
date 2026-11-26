"use server";

import { revalidatePath } from "next/cache";
import { engine } from "./engine";
import { readSession } from "./session";

/** Decision 9: our registered agent service per business, charged to the firm each year. */
export type AgentService = {
  id: string; entityName: string; state: string; provider: string; annualUsd: number; status: "active" | "cancelled";
  startedAt: string; nextChargeAt: string; yearsCharged: number; lastChargedAt?: string; cancelledAt?: string;
};

export async function agentServices(): Promise<{ offer: { provider: string; annualUsd: number; states: string[] } | null; services: AgentService[] } | null> {
  const s = await readSession();
  if (!s || s.kind !== "firm") return null;
  return engine<{ offer: { provider: string; annualUsd: number; states: string[] } | null; services: AgentService[] }>(s.apiKey, `/v1/client-companies/${encodeURIComponent(s.clientCompanyId)}/agent-services`).catch(() => null);
}

export async function cancelAgentService(id: string): Promise<void> {
  const s = await readSession();
  if (!s || s.kind !== "firm" || !/^[0-9a-f-]{36}$/i.test(id)) return;
  await engine(s.apiKey, `/v1/client-companies/${encodeURIComponent(s.clientCompanyId)}/agent-services/${encodeURIComponent(id)}/cancel`, { method: "POST", body: {} }).catch(() => undefined);
  revalidatePath(`/p/${encodeURIComponent(s.slug)}/billing`);
}
