import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { platformName } from "@/lib/brand";

export default function Home() {
  const name = platformName();
  return (
    <>
      <TopBar brand={name} href="/" links={[{ href: "/docs", label: "API docs" }, { href: "/dashboard", label: "Dashboard" }]} />
      <main className="wrap">
        <h1>{name}</h1>
        <p className="muted">State business filings by API: LLC formation, EINs, certificates and payroll registration, each approved by the client before anything is filed.</p>
        <div className="grid" style={{ marginTop: 24 }}>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>API docs</h3>
            <p className="muted small">Authentication, filings, approvals, webhooks and the full reference.</p>
            <Link className="btn" href="/docs">Read the docs</Link>
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Dashboard</h3>
            <p className="muted small">For filing service companies: API keys, webhooks, usage and your CPA and payroll firms.</p>
            <Link className="btn" href="/dashboard">Sign in</Link>
          </div>
          <div className="card">
            <h3 style={{ marginTop: 0 }}>Firm portals</h3>
            <p className="muted small">Each CPA or payroll firm gets its own branded portal at <code>/p/firm-name</code>, reached by an invite link.</p>
          </div>
        </div>
      </main>
    </>
  );
}
