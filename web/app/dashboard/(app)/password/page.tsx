import { ChangePasswordForm } from "@/components/AuthForms";
import { changePassword } from "@/lib/accounts";
import { confirmPhoneCode, phoneStatus, removePhone, sendPhoneCode } from "@/lib/phone";
import { PhoneForm } from "@/components/PhoneForm";
import { personalSession, requireTenant } from "@/lib/session";

export const metadata = { title: "Password" };

/** Password (merged spec 10C.13): a narrow 480 px column; changing it is the page's one Brass action. */
export default async function DashboardPasswordPage() {
  const s = await requireTenant();
  const phone = await phoneStatus();
  return (
    <div className="dash2-password">
      <h1>Password</h1>
      {personalSession(s)
        ? <div className="dash2-pw"><ChangePasswordForm action={changePassword} /></div>
        : <p className="muted dash2-pw-line">You signed in with an API key, which has no password. Team members who log in with their email can change their password here.</p>}
      {phone?.numbers ? <PhoneForm status={phone} send={sendPhoneCode} confirm={confirmPhoneCode} remove={removePhone} /> : null}
    </div>
  );
}
