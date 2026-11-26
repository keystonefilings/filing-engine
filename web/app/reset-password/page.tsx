import Link from "next/link";
import { AccountCard, AccountShell } from "@/components/site-pages/AccountShell";
import { ResetPasswordForm } from "@/components/AuthForms";
import { Vignette } from "@/components/Vignette";
import { resetPassword } from "@/lib/accounts";

export const metadata = { title: "Choose a new password" };

/** Choose a new password (merged spec 10A.12.2): with a link, the form; without one, the lede alone and no button. */
export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ token?: string }> }) {
  const { token } = await searchParams;
  return (
    <AccountShell link={{ href: "/login", label: "Log in" }}>
      <AccountCard
        kicker="Reset password"
        title="Choose a new password"
        vignette={<Vignette name="v04-letter-at-door" size={120} phone={96} />}
        lede={token ? undefined : <>This link isn&apos;t complete. Open it again from the email, or <Link href="/forgot-password">ask for a new one</Link>.</>}
      >
        {token ? <div className="acct2-body"><ResetPasswordForm action={resetPassword} token={token} /></div> : null}
      </AccountCard>
    </AccountShell>
  );
}
