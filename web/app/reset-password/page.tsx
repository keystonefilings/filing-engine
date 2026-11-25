import Link from "next/link";
import { Shell } from "@/components/landing/Shell";
import { ResetPasswordForm } from "@/components/AuthForms";
import { resetPassword } from "@/lib/accounts";

export const metadata = { title: "Choose a new password" };

export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <Shell>
      <main className="auth-main band">
        <div className="auth-card">
          <span className="field-label">Reset password</span>
          <h2>Choose a new password</h2>
          {token ? (
            <ResetPasswordForm action={resetPassword} token={token} />
          ) : (
            <p className="lede">This link isn&apos;t complete. Open it again from the email, or <Link href="/forgot-password">ask for a new one</Link>.</p>
          )}
        </div>
      </main>
    </Shell>
  );
}
