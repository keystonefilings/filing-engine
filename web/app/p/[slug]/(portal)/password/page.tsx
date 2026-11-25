import { ChangePasswordForm } from "@/components/AuthForms";
import { changePassword } from "@/lib/accounts";
import { requireFirm } from "@/lib/session";

export const metadata = { title: "Password" };

export default async function PortalPasswordPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await requireFirm(slug);
  return (
    <>
      <h1>Password</h1>
      {s.signedInWith === "password"
        ? <ChangePasswordForm action={changePassword} />
        : <p className="muted">You opened this dashboard from an invite link, so there is no password to change.</p>}
    </>
  );
}
