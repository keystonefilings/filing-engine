import { AppShell, type ShellLink } from "@/components/shell/AppShell";
import { isPlatformTenant, platformName } from "@/lib/brand";
import { requireTenant, personalSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { engine, sessionEnded } from "@/lib/engine";
import { waitingForCardCodes } from "@/lib/cards";
import "@/styles/components/dashboard.css";

/**
 * The platform's dashboard (merged spec 10C.2) on the shell it shares with the filing desk: CoFile's letterhead row
 * and rule, the sticky navigation row in the product's order with "Docs" at its end, and the menu sheet on phones.
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const s = await requireTenant();
  // An ended session (expired, signed out elsewhere, password changed) goes back to log in, not to an error page.
  try { await engine(s.apiKey, "/v1/account"); } catch (e) { if (sessionEnded(e)) redirect("/session-ended"); }
  const platform = isPlatformTenant(s.tenantId);
  // The number the Overview's notice counts: filings waiting for a card's security code.
  const waiting = (await waitingForCardCodes().catch(() => [])).reduce((n, c) => n + c.filings.length, 0);
  const links: ShellLink[] = [
    { href: "/dashboard", label: "Overview", exact: true }, { href: "/dashboard/filings", label: "Filings" },
    { href: "/dashboard/pay", label: "Ready to pay", count: waiting }, { href: "/dashboard/firms", label: "Firms" },
    { href: "/dashboard/keys", label: "API keys" }, { href: "/dashboard/webhooks", label: "Webhooks" },
    { href: "/dashboard/setup", label: "Setup" }, { href: "/dashboard/team", label: "Team" },
    ...(platform ? [] : [{ href: "/dashboard/billing", label: "Billing" }]),
    ...(platform ? [{ href: "/dashboard/partners", label: "Sign-ups" }] : []),
    { href: "/docs", label: "Docs", end: true },
  ];
  const user = { email: s.email ?? s.name, passwordHref: personalSession(s) ? "/dashboard/password" : undefined };
  return (
    <AppShell home="/dashboard" platform={platformName()} user={user} links={links}>
      <div className="dash2">{children}</div>
    </AppShell>
  );
}
