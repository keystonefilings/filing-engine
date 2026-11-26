import Link from "next/link";
import { Shell } from "@/components/landing/Shell";

/** The frame for the Terms and the Privacy Policy. */
export function LegalPage({ title, effective, other, children }: { title: string; effective: string; other: "terms" | "privacy"; children: React.ReactNode }) {
  return (
    <Shell>
      <main className="band">
        <article className="wrap legal" style={{ maxWidth: 760, padding: "48px 0" }}>
          <h1>{title}</h1>
          <p className="hero-note">Effective {effective}. See also our {other === "terms" ? <Link href="/terms">Terms of Service</Link> : <Link href="/privacy">Privacy Policy</Link>}.</p>
          {children}
        </article>
      </main>
    </Shell>
  );
}
