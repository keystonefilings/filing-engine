import { ChangePasswordForm } from "@/components/AuthForms";
import { changePassword } from "@/lib/accounts";
import { confirmPhoneCode, phoneStatus, removePhone, sendPhoneCode } from "@/lib/phone";
import { PhoneForm } from "@/components/PhoneForm";
import { personalSession, requireFirm } from "@/lib/session";

export const metadata = { title: "Password" };

export default async function PortalPasswordPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await requireFirm(slug);
  const phone = await phoneStatus();
  return (
    <>
      <h1>Password</h1>
      {personalSession(s)
        ? <ChangePasswordForm action={changePassword} />
        : <p className="muted">You opened this dashboard from an invite link, so there is no password to change.</p>}
      {phone?.numbers ? <PhoneForm status={phone} send={sendPhoneCode} confirm={confirmPhoneCode} remove={removePhone} /> : null}
    </>
  );
}
