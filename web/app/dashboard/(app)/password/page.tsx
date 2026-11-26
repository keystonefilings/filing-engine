import { ChangePasswordForm } from "@/components/AuthForms";
import { changePassword } from "@/lib/accounts";
import { confirmPhoneCode, phoneStatus, removePhone, sendPhoneCode } from "@/lib/phone";
import { PhoneForm } from "@/components/PhoneForm";
import { personalSession, requireTenant } from "@/lib/session";

export const metadata = { title: "Password" };

export default async function DashboardPasswordPage() {
  const s = await requireTenant();
  const phone = await phoneStatus();
  return (
    <>
      <h1>Password</h1>
      {personalSession(s)
        ? <ChangePasswordForm action={changePassword} />
        : <p className="muted">You signed in with an API key, which has no password. Team members who log in with their email can change their password here.</p>}
      {phone?.numbers ? <PhoneForm status={phone} send={sendPhoneCode} confirm={confirmPhoneCode} remove={removePhone} /> : null}
    </>
  );
}
