import "@/styles/components/desk.css";
import "@/styles/components/desk-setup.css";
import { ChangePasswordForm } from "@/components/AuthForms";
import { changePassword } from "@/lib/accounts";
import { confirmPhoneCode, phoneStatus, removePhone, sendPhoneCode } from "@/lib/phone";
import { PhoneForm } from "@/components/PhoneForm";
import { personalSession, requireFirm } from "@/lib/session";

export const metadata = { title: "Password" };

/**
 * Password (merged spec 10B.19): a narrow page, two white sheets 480 px wide, the same two as the dashboard's (10C.13).
 * "Change password" is the page's Brass; the texting sheet's buttons are Outline and Ink.
 */
export default async function PortalPasswordPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = await requireFirm(slug);
  const phone = await phoneStatus();
  return (
    <div className="narrow ds2 ds2-pw">
      <h1>Password</h1>
      {personalSession(s)
        ? <div className="ds2-pwform"><ChangePasswordForm action={changePassword} /></div>
        : <p className="ds2-lede">You opened this dashboard from an invite link, so there is no password to change.</p>}
      {phone?.numbers ? <div className="ds2-phone"><PhoneForm status={phone} send={sendPhoneCode} confirm={confirmPhoneCode} remove={removePhone} /></div> : null}
    </div>
  );
}
