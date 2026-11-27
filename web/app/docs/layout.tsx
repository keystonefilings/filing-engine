import Link from "next/link";
import { platformName, publicApiUrl } from "@/lib/brand";
import { ENDPOINTS } from "@/lib/api-catalog";
import { Lockup } from "@/components/shell/Lockup";
import { PublicBetaNotice } from "@/components/site/PublicBetaNotice";
import { GUIDES } from "./guides";
import { groupId, headingsOf } from "./anchors";
import { DocsNav, type DocsLink, type Sections } from "./DocsNav";
import "@/styles/components/shell.css";
import "@/styles/components/docs.css";

// Each docs page's title ends with the brand: "API reference · CoFile docs". Tools that look for it find the Markdown.
export function generateMetadata() {
  return { title: { default: "API docs", template: `%s · ${platformName()} docs` }, alternates: { types: { "text/markdown": "/docs.md" } } };
}

/**
 * The API docs (merged spec 10C.16), set like a technical book from the same shop: CoFile's header and rule, the
 * contents beside the article, and examples on Plate Ink plates.
 */
export default function DocsLayout({ children }: { children: React.ReactNode }) {
  const name = platformName();
  const api = publicApiUrl();
  const links: DocsLink[] = [
    { href: "/docs", label: "Overview" },
    ...GUIDES.map((g, i) => ({ href: `/docs/${g.slug}`, label: g.title, ...(i === 0 ? { head: "Guides" } : {}) })),
    { href: "/docs/reference", label: "Endpoints", head: "Reference" },
    { href: "/openapi.json", label: "OpenAPI (JSON)", file: true },
  ];
  const sections: Sections = {
    "/docs": [{ id: "quick-start", label: "Quick start" }, { id: "guides", label: "Guides" }],
    ...Object.fromEntries(GUIDES.map((g) => [`/docs/${g.slug}`, headingsOf(g.body(api))])),
    "/docs/reference": [...new Set(ENDPOINTS.map((e) => e.group))].map((g) => ({ id: groupId(g), label: g })),
  };
  return (
    <div className="reg-cofile docs2">
      <a className="shell2-skip" href="#docs-content">Skip to content</a>
      <PublicBetaNotice />
      <header className="docs2-head">
        <div className="docs2-head-in">
          <Link className="docs2-home" href="/">{name === "CoFile" ? <Lockup height={24} /> : <span className="shell2-platform">{name}</span>}</Link>
          <nav aria-label="Main" className="docs2-top">
            <Link href="/docs" aria-current="page">API docs</Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>
        </div>
      </header>
      <div className="docs2-frame">
        <DocsNav links={links} sections={sections} />
        <main className="docs2-main" id="docs-content" tabIndex={-1}>{children}</main>
      </div>
    </div>
  );
}
