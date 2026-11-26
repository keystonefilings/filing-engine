import { Shell } from "@/components/landing/Shell";
import { ConfirmEmailForm, ResendConfirmationForm } from "@/components/AuthForms";
import { confirmEmail, resendConfirmation } from "@/lib/accounts";

export const metadata = { title: "Confirm your email" };

export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <Shell>
      <main className="auth-main band">
        <div className="auth-card">
          <span className="field-label">Your filing desk</span>
          <h2>Confirm your email</h2>
          {token ? (
            <>
              <p className="lede">One click and your email is confirmed.</p>
              <ConfirmEmailForm action={confirmEmail} token={token} />
            </>
          ) : (
            <>
              <p className="lede">Lost the email, or the link expired? Enter the email you signed up with and we&apos;ll send a new link.</p>
              <ResendConfirmationForm action={resendConfirmation} />
            </>
          )}
        </div>
      </main>
    </Shell>
  );
}
