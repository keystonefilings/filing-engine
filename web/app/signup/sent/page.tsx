import Link from "next/link";
import { AccountCard, AccountShell } from "@/components/site-pages/AccountShell";
import { ForgetFirmName } from "@/components/site-pages/ForgetFirmName";
import { Vignette } from "@/components/Vignette";

export const metadata = { title: "Check your email" };

/**
 * Check your email (merged spec 10A.10): no button in the copy, so no Brass on the page; the job is in the inbox.
 * Only deployments set to "approval" send anyone here (Nov 27: by default the desk opens at once). `review`:
 * a Google sign-up waiting for approval, with no email to confirm.
 */
export default async function SignupSentPage({ searchParams }: { searchParams: Promise<{ open?: string; review?: string }> }) {
  const { open, review } = await searchParams;
  return (
    <AccountShell link={{ href: "/login", label: "Log in" }}>
      <ForgetFirmName />
      <AccountCard
        kicker="Your filing desk"
        title={review ? "We're opening your desk" : "Check your email"}
        vignette={<Vignette name="v04-letter-at-door" size={120} phone={96} />}
        lede={review
          ? <>Your account is set up and waiting for a short review. We&apos;ll email you as soon as your filing desk is open; then <Link href="/login">log in with Google</Link>.</>
          : <>
            We sent you a link. Open it to confirm your email.
            {open
              ? <> Then your filing desk opens: <Link href="/login">log in</Link> with the email and password you chose. Your first filing can be a rehearsal: nothing filed, nothing paid.</>
              : <> If your account needs a review before it opens, we&apos;ll email you as soon as it&apos;s approved.</>}
          </>}
      >
        {review ? null : <p className="acct2-note">No email after a few minutes? Check spam, or <Link href="/verify-email">send the link again</Link>.</p>}
      </AccountCard>
    </AccountShell>
  );
}
