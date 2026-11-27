import Link from "next/link";
import type { CSSProperties } from "react";
import { engine, type ClientCompany } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { logoSrc } from "@/lib/brand";
import { brandOf, brandStyle, logoInfoOf } from "@/lib/firm";
import { LogoImage } from "@/components/ui/LogoImage";
import { Chip } from "@/components/ui/Chip";
import { Notice } from "@/components/ui/Sheet";
import { Vignette } from "@/components/Vignette";

export const metadata = { title: "Firms" };

const initials = (name: string) => name.split(/\s+/).filter((w) => /^[A-Za-zÀ-ÿ]/.test(w)).slice(0, 2).map((w) => w[0]!.toUpperCase()).join("");

/**
 * The firm's own mark, to lead its row (10C.7): its logo in a 32 px bay, or its monogram tile in its main color (Plate
 * Ink when it has chosen none). In dark mode the logo sits on the white logo plate; a logo of light marks sits on a
 * Plate Ink plate instead, and in dark mode straight on the page (10B.2.3).
 */
function FirmMark({ c }: { c: ClientCompany }) {
  const logo = logoSrc(c.portal);
  if (logo) return <LogoImage src={logo} alt="" info={logoInfoOf(c.portal)} place="mark" wrap="dash2-mark is-logo" />;
  const style = c.portal?.primaryColor ? brandStyle(brandOf(c)) as CSSProperties : undefined;
  return <span className={["dash2-mark is-mono", style && "is-firm"].filter(Boolean).join(" ")} style={style} aria-hidden="true">{initials(c.name)}</span>;
}

/** Firms (merged spec 10C.7): every row led by the firm's own mark, then its filing desk's address and its approvers. */
export default async function FirmsPage() {
  const s = await requireTenant();
  const { clientCompanies } = await engine<{ clientCompanies: ClientCompany[] }>(s.apiKey, "/v1/client-companies");
  return (
    <div className="dash2-firms">
      <h1>Firms</h1>
      <p className="muted">The CPA, payroll and other firms you file for. Give a firm its own branded filing desk, then invite its staff.</p>
      {clientCompanies.length === 0 ? (
        <div className="dash2-empty">
          <Vignette name="v01-blank-plate" size={120} />
          <Notice>No firms yet. Add one with <code>PUT /v1/client-companies/&#123;id&#125;</code> (see the <a href="/docs/reference">API reference</a>).</Notice>
        </div>
      ) : (
        <div className="dash2-table">
          <table>
            <thead><tr><th scope="col">Firm</th><th scope="col">Filing desk</th><th scope="col" className="is-num">Approvers</th></tr></thead>
            <tbody>{clientCompanies.map((c) => (
              <tr key={c.clientCompanyId}>
                <th scope="row">
                  <span className="dash2-firm">
                    <FirmMark c={c} />
                    <span className="dash2-firm-text">
                      <Link href={`/dashboard/firms/${encodeURIComponent(c.clientCompanyId)}`}>{c.name}</Link>
                      <code className="dash2-id">{c.clientCompanyId}</code>
                    </span>
                  </span>
                </th>
                <td data-label="Filing desk">{c.portal ? <code className="dash2-path">/p/{c.portal.slug}</code> : <Chip tone="neutral" compact>Not set up</Chip>}</td>
                <td data-label="Approvers" className="is-num">{c.approvers?.length ?? 0}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
