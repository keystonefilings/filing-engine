import { engine, type PublicUser } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { TeamForm } from "@/components/TeamForm";
import { addTeamMember } from "./actions";

export const metadata = { title: "Team" };

const WHEN = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });

/** Team (merged spec 10C.12): who signs in to this dashboard with a password, and adding someone. */
export default async function TeamPage() {
  const s = await requireTenant();
  const { users } = await engine<{ users: PublicUser[] }>(s.apiKey, "/v1/users");
  return (
    <div className="narrow dash2-team">
      <h1>Team</h1>
      <p className="muted">People who sign in to this dashboard with their email and password. API keys are managed under API keys.</p>
      <div className="dash2-table">
        <table>
          <thead><tr><th scope="col">Name</th><th scope="col">Email</th><th scope="col">Last signed in</th></tr></thead>
          <tbody>
            {users.length ? users.map((u) => (
              <tr key={u.id}><th scope="row">{u.name}</th><td data-label="Email" className="small">{u.email}</td><td data-label="Last signed in" className="small muted dash2-when">{u.lastSignInAt ? WHEN.format(new Date(u.lastSignInAt)) : "Not yet"}</td></tr>
            )) : <tr className="is-empty"><td colSpan={3}>No one yet.</td></tr>}
          </tbody>
        </table>
      </div>
      <h2>Add someone</h2>
      <TeamForm action={addTeamMember} />
    </div>
  );
}
