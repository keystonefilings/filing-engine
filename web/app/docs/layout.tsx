import Link from "next/link";
import { TopBar } from "@/components/TopBar";
import { platformName } from "@/lib/brand";
import { GUIDES } from "./guides";

export const metadata = { title: "API docs" };

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar brand={platformName()} href="/" links={[{ href: "/docs", label: "API docs", current: true }, { href: "/dashboard", label: "Dashboard" }]} />
      <div className="wrap docs">
        <aside>
          <nav aria-label="Docs">
            <Link href="/docs">Overview</Link>
            <span className="navhead">Guides</span>
            {GUIDES.map((g) => <Link key={g.slug} href={`/docs/${g.slug}`}>{g.title}</Link>)}
            <span className="navhead">Reference</span>
            <Link href="/docs/reference">Endpoints</Link>
            <a href="/openapi.json">OpenAPI (JSON)</a>
          </nav>
        </aside>
        <main className="narrow" style={{ minWidth: 0 }}>{children}</main>
      </div>
    </>
  );
}
