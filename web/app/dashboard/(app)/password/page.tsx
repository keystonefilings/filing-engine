import { ChangePasswordForm } from "@/components/AuthForms";
import { changePassword } from "@/lib/accounts";
import { requireTenant } from "@/lib/session";

export const metadata = { title: "Password" };

export default async function DashboardPasswordPage() {
  const s = await requireTenant();
  return (
    <>
      <h1>Password</h1>
      {s.signedInWith === "password"
        ? <ChangePasswordForm action={changePassword} />
        : <p className="muted">You signed in with an API key, which has no password. Team members who log in with their email can change their password here.</p>}
    </>
  );
}
