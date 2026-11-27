import "@/styles/components/desk.css";
import Link from "next/link";
import { notFound } from "next/navigation";
import { firmContext, offeredKinds } from "@/lib/firm";
import { platformName } from "@/lib/brand";
import { available, rolesForState, STATE_NAMES } from "@/lib/state-roles";
import { StateRolesForm, type RoleView } from "@/components/StateRolesForm";
import { saveStateRoles } from "../actions";

export const metadata = { title: "Who's named on your filings" };

/**
 * Setup, Who's named on your filings (Nov 27): per state, the roles that state's filings name, which answers the
 * firm's clients may choose for each (its own firm among them, if it says so), and which the firm decides itself.
 */
export default async function RolesPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { company } = await firmContext(slug);
  if (!company.partner) notFound();
  const states = Array.from(new Set(offeredKinds(company).filter((k) => k.type === "formation").map((k) => k.state as string))).sort().filter((st) => rolesForState(st).length);
  const platform = platformName();
  return (
    <div className="narrow stack desk2-one">
      <p className="small"><Link href={`/p/${encodeURIComponent(slug)}/setup`}>← Setup</Link></p>
      <h1>Who&apos;s named on your filings</h1>
      <p className="muted">Each state&apos;s filing names people in roles: who receives legal papers, who signs, who the state writes to. Choose, state by state, which answers your clients see on your forms, including your own firm, and which you decide for every filing. Anyone filling a form still sees only the answers you allow.</p>
      {states.length === 0 ? <p className="notice">None of the services you offer form a business, so there are no roles to set.</p> : states.map((st) => {
        const roles: RoleView[] = rolesForState(st).map((r) => ({
          id: r.id, title: r.title, what: r.what, needs: r.needs, always: r.always, optional: r.optional, decidable: r.decidable,
          auto: [...(r.saved && available(r, "saved", company) ? ["saved" as const] : []), ...(r.shape === "agentChoice" && available(r, "ours", company) ? ["ours" as const] : [])],
        }));
        return <StateRolesForm key={st} action={saveStateRoles.bind(null, slug, st)} state={st} stateName={STATE_NAMES[st] ?? st} firmName={company.portal?.displayName || company.name}
          v={company.stateRoles?.[st]} roles={roles} ctx={{ platform, filerName: company.filerName, agentUsd: company.ourAgent?.annualUsd }} />;
      })}
    </div>
  );
}
