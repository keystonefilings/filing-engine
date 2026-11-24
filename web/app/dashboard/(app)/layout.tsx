import { TopBar } from "@/components/TopBar";
import { platformName } from "@/lib/brand";
import { requireTenant } from "@/lib/session";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const s = await requireTenant();
  return (
    <>
      <TopBar brand={platformName()} href="/dashboard"
        links={[
          { href: "/dashboard", label: "Overview" }, { href: "/dashboard/filings", label: "Filings" }, { href: "/dashboard/firms", label: "Firms" },
          { href: "/dashboard/keys", label: "API keys" }, { href: "/dashboard/webhooks", label: "Webhooks" }, { href: "/docs", label: "Docs" },
        ]}
        right={<form action="/logout" method="post" className="row"><span className="small muted">{s.name}</span><button className="btn small" type="submit">Sign out</button></form>} />
      <main className="wrap">{children}</main>
    </>
  );
}
