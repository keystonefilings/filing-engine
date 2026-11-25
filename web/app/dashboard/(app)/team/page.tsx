import { engine, type PublicUser } from "@/lib/engine";
import { requireTenant } from "@/lib/session";
import { TeamForm } from "@/components/TeamForm";
import { addTeamMember } from "./actions";

export const metadata = { title: "Team" };

export default async function TeamPage() {
  const s = await requireTenant();
  const { users } = await engine<{ users: PublicUser[] }>(s.apiKey, "/v1/users");
  return (
    <div className="stack narrow">
      <h1>Team</h1>
      <p className="muted">People who sign in to this dashboard with their email and password. API keys are managed under API keys.</p>
      <div className="table-wrap card" style={{ padding: 0 }}>
        <table>
          <thead><tr><th>Name</th><th>Email</th><th>Last signed in</th></tr></thead>
          <tbody>
            {users.length ? users.map((u) => (
              <tr key={u.id}><td>{u.name}</td><td className="small">{u.email}</td><td className="small muted">{u.lastSignInAt ? new Date(u.lastSignInAt).toLocaleString() : "Not yet"}</td></tr>
            )) : <tr><td colSpan={3} className="muted">No one yet.</td></tr>}
          </tbody>
        </table>
      </div>
      <h2>Add someone</h2>
      <TeamForm action={addTeamMember} />
    </div>
  );
}
