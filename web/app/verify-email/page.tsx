import { AccountCard, AccountShell } from "@/components/site-pages/AccountShell";
import { ConfirmEmailForm, ResendConfirmationForm } from "@/components/AuthForms";
import { Vignette } from "@/components/Vignette";
import { confirmEmail, resendConfirmation } from "@/lib/accounts";

export const metadata = { title: "Confirm your email" };

/** Confirm your email (merged spec 10A.13): one press confirms; without a link, ask for a new one. */
export default async function VerifyEmailPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <AccountShell link={{ href: "/login", label: "Log in" }}>
      <AccountCard
        kicker="Your filing desk"
        title="Confirm your email"
        vignette={<Vignette name="v04-letter-at-door" size={120} phone={96} />}
        lede={token ? "One click and your email is confirmed." : "Lost the email, or the link expired? Enter the email you signed up with and we'll send a new link."}
      >
        <div className="acct2-body">
          {token ? <ConfirmEmailForm action={confirmEmail} token={token} /> : <ResendConfirmationForm action={resendConfirmation} />}
        </div>
      </AccountCard>
    </AccountShell>
  );
}
