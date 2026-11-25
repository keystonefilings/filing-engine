"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { engine, EngineError, type PartnerProfile, type PaymentRouting } from "@/lib/engine";
import { firmContext } from "@/lib/firm";
import { FILING_KINDS } from "@/lib/intake/forms";
import { applyLogo } from "@/lib/logo-upload";
import { writeSession } from "@/lib/session";

export type SetupState = { error?: string; issues?: Record<string, string> } | null;
type Step = "details" | "branding" | "payments";

const text = (fd: FormData, k: string, max = 200) => String(fd.get(k) ?? "").trim().slice(0, max);

async function save(slug: string, step: Step, body: Record<string, unknown>): Promise<SetupState> {
  const { session, company } = await firmContext(slug);
  const done = Array.from(new Set([...(company.partner?.setupDone ?? []), step]));
  try {
    await engine(session.apiKey, `/v1/client-companies/${encodeURIComponent(session.clientCompanyId)}/profile`, {
      method: "PUT", body: { ...body, partner: { ...(body.partner as PartnerProfile | undefined), setupDone: done } },
    });
  } catch (e) {
    if (e instanceof EngineError && (e.status === 422 || e.status === 409)) {
      const issues = Object.fromEntries(((e.body as { issues?: { path: string; message: string }[] })?.issues ?? []).map((i) => [i.path.split(".").pop() ?? i.path, i.message]));
      return { error: "Check the highlighted fields.", issues };
    }
    return { error: "That didn't save. Try again in a minute." };
  }
  // A new address moves the portal too: the session follows it.
  const moved = (body.brand as { slug?: string } | undefined)?.slug;
  if (moved && moved !== slug) await writeSession({ ...session, slug: moved });
  const base = `/p/${encodeURIComponent(moved ?? slug)}`;
  revalidatePath(base, "layout");
  const next: Record<Step, string> = { details: `${base}/setup/branding`, branding: `${base}/setup/payments`, payments: `${base}/setup` };
  redirect(next[step]);
}

export async function saveDetails(slug: string, _prev: SetupState, fd: FormData): Promise<SetupState> {
  const name = text(fd, "name", 120);
  if (name.length < 2) return { error: "Enter your firm's name.", issues: { name: "Enter your firm's name." } };
  let website = text(fd, "website") || undefined;
  if (website && !/^https:\/\//.test(website)) website = `https://${website.replace(/^https?:\/\//, "")}`;
  const type = text(fd, "companyType", 20);
  return save(slug, "details", {
    name,
    partner: {
      ...(["cpa", "payroll", "cfo", "other"].includes(type) ? { companyType: type } : {}),
      contactName: text(fd, "contactName", 120) || undefined,
      contactEmail: text(fd, "contactEmail") || undefined,
      phone: text(fd, "phone", 40) || undefined,
      website,
    },
  });
}

export async function saveBranding(slug: string, _prev: SetupState, fd: FormData): Promise<SetupState> {
  const hex = (k: string) => { const c = text(fd, k, 7); return /^#[0-9a-fA-F]{6}$/.test(c) ? c : undefined; };
  let logoUrl = text(fd, "logoUrl", 500) || undefined;
  if (logoUrl && !/^https:\/\//.test(logoUrl)) return { error: "Check the highlighted fields.", issues: { logoUrl: "A logo link must start with https://" } };
  // The picture goes first, so the brand saved next keeps it.
  const { session } = await firmContext(slug);
  const logoProblem = await applyLogo(session.apiKey, session.clientCompanyId, fd, Boolean(logoUrl));
  if (logoProblem) return { error: logoProblem, issues: { data: logoProblem } };
  if (String(fd.get("logoData") ?? "")) logoUrl = undefined;
  return save(slug, "branding", {
    brand: {
      slug: text(fd, "slug", 40).toLowerCase() || undefined,
      displayName: text(fd, "displayName", 80) || undefined,
      logoUrl,
      primaryColor: hex("primaryColor"),
      secondaryColor: hex("secondaryColor"),
      supportEmail: text(fd, "supportEmail") || undefined,
    },
  });
}

export async function savePayments(slug: string, _prev: SetupState, fd: FormData): Promise<SetupState> {
  const { company } = await firmContext(slug);
  const ids = new Set((company.payments?.methods ?? []).filter((m) => m.purpose === "state_fees").map((m) => m.id));
  const pick = (k: string) => { const v = text(fd, k, 40); return v && ids.has(v) ? v : undefined; };
  const mode = fd.get("mode") === "per_filing" ? "per_filing" : "single";
  const byFilingKind: Record<string, string> = {};
  if (mode === "per_filing") for (const k of FILING_KINDS) { const v = pick(`kind.${k.id}`); if (v) byFilingKind[k.id] = v; }
  const routing: PaymentRouting = { mode, defaultMethodId: pick("defaultMethodId"), fallbackMethodId: pick("fallbackMethodId"), byFilingKind };
  if (routing.fallbackMethodId && routing.fallbackMethodId === routing.defaultMethodId) return { error: "The backup card has to be a different card." };
  return save(slug, "payments", { paymentRouting: routing });
}
