import Link from "next/link";
import { AccountCard, AccountShell } from "@/components/site-pages/AccountShell";
import { ForgotPasswordForm } from "@/components/AuthForms";
import { Vignette } from "@/components/Vignette";
import { requestPasswordReset } from "@/lib/accounts";

export const metadata = { title: "Forgot password" };

/** Forgot password (merged spec 10A.12.1). Once sent, the form gives way to a plain slip and no button is left. */
export default function ForgotPasswordPage() {
  return (
    <AccountShell link={{ href: "/login", label: "Log in" }}>
      <AccountCard
        kicker="Forgot password"
        title="Reset your password"
        lede="Enter the email you log in with. We'll send a link to choose a new password."
        vignette={<Vignette name="v04-letter-at-door" size={120} phone={96} />}
      >
        <div className="acct2-body">
          <ForgotPasswordForm action={requestPasswordReset} />
          <p className="acct2-note"><Link href="/login">Back to log in</Link></p>
        </div>
      </AccountCard>
    </AccountShell>
  );
}
