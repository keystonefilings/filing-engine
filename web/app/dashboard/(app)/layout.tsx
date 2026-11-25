import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { isPlatformTenant, platformName } from "@/lib/brand";
import { requireTenant } from "@/lib/session";
import { redirect } from "next/navigation";
import { engine, sessionEnded } from "@/lib/engine";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const s = await requireTenant();
  // An ended session (expired, signed out elsewhere, password changed) goes back to log in, not to an error page.
  try { await engine(s.apiKey, "/v1/account"); } catch (e) { if (sessionEnded(e)) redirect("/session-ended"); }
  return (
    <>
      <TopBar brand={platformName()} href="/dashboard"
        links={[
          { href: "/dashboard", label: "Overview" }, { href: "/dashboard/filings", label: "Filings" }, { href: "/dashboard/firms", label: "Firms" },
          { href: "/dashboard/keys", label: "API keys" }, { href: "/dashboard/webhooks", label: "Webhooks" },
          { href: "/dashboard/setup", label: "Setup" }, { href: "/dashboard/team", label: "Team" },
          ...(isPlatformTenant(s.tenantId) ? [{ href: "/dashboard/partners", label: "Sign-ups" }] : []),
          { href: "/docs", label: "Docs" },
        ]}
        right={<form action="/logout" method="post" className="row">{s.signedInWith === "password" ? <Link className="small muted" href="/dashboard/password" title="Change password">{s.email ?? s.name}</Link> : <span className="small muted">{s.email ?? s.name}</span>}<button className="btn small" type="submit">Sign out</button></form>} />
      <main className="wrap">{children}</main>
    </>
  );
}
