import Link from "next/link";
import { Shell } from "@/components/landing/Shell";
import { ForgotPasswordForm } from "@/components/AuthForms";
import { requestPasswordReset } from "@/lib/accounts";

export const metadata = { title: "Forgot password" };

export default function ForgotPasswordPage() {
  return (
    <Shell>
      <main className="auth-main band">
        <div className="auth-card">
          <span className="field-label">Forgot password</span>
          <h2>Reset your password</h2>
          <p className="lede">Enter the email you log in with. We&apos;ll send a link to choose a new password.</p>
          <ForgotPasswordForm action={requestPasswordReset} />
          <p className="hero-note"><Link href="/login">Back to log in</Link></p>
        </div>
      </main>
    </Shell>
  );
}
