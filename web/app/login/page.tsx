import { supportEmail } from "@/lib/brand";
import Link from "next/link";
import { AccountShell } from "@/components/site-pages/AccountShell";
import { EmailLoginForm, GoogleButton, Slip, type SlipTone } from "@/components/AuthForms";
import { Vignette } from "@/components/Vignette";
import { signInWithEmail } from "@/lib/accounts";
import { googleConfigured } from "@/lib/google";

export const metadata = { title: "Log in" };

/**
 * Log in (merged spec 10A.11): a turnstile, fast and plain, with the door from the step beside it on wide screens.
 * The header's one link is "Run a free rehearsal" as text; the card's "Log in" is the page's Brass button.
 */
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ new?: string; reset?: string; ended?: string; google?: string }> }) {
  const sp = await searchParams;
  // V37: why a Google sign-in came back here, and the tone each answer takes (10A.0.6). A Google account with no
  // account here doesn't come back: it goes on to /signup/google to set up its firm (Nov 27).
  const googleError = ({
    pending: ["Your account is waiting for approval. We'll email you when it's ready.", "attention"],
    blocked: [`This account can't sign in. If you think that's wrong, email ${supportEmail()}.`, "problem"],
    cancelled: ["Google sign-in was cancelled.", "plain"],
    expired: ["That Google sign-in took too long. Try again.", "problem"],
    failed: ["Google sign-in didn't work. Try again, or log in with your email and password.", "problem"],
    off: ["Google sign-in isn't available here yet.", "plain"],
  } as Record<string, [string, SlipTone]>)[sp.google ?? ""];
  const [notice, noticeTone]: [string | undefined, SlipTone] = sp.ended ? ["Your session ended. Log in again to carry on.", "plain"]
    : sp.reset ? ["Your password is changed. Log in with the new one.", "done"]
    : sp.new ? ["Your account is ready. Log in to set it up.", "done"] : [undefined, "plain"];
  return (
    <AccountShell link={{ href: "/signup", label: "Run a free rehearsal", underlined: true }}>
      <div className="site2-in acct2-split">
        <div className="acct2-card">
          <p className="t-kicker acct2-kicker">Log in</p>
          <h1 className="t-display-m acct2-h1">Welcome back</h1>
          <p className="t-lede acct2-lede">Firms go to their filing desk, platforms to their dashboard.</p>
          <div className="acct2-body">
            {googleError ? <Slip tone={googleError[1]} role={googleError[1] === "problem" ? "alert" : "status"}>{googleError[0]}</Slip> : null}
            {googleConfigured() ? <GoogleButton /> : null}
            {googleConfigured() ? <hr className="acct2-rule" /> : null}
            <EmailLoginForm action={signInWithEmail} notice={notice} noticeTone={noticeTone} />
            <p className="acct2-note acct2-foot">New here? <Link href="/signup">Set up your firm&apos;s filing desk</Link>. Enterprise developers can also <Link href="/dashboard/login">log in with an API key</Link>.</p>
          </div>
        </div>
        <div className="acct2-panel"><Vignette name="v05-door-from-step" size={440} master="full" /></div>
      </div>
    </AccountShell>
  );
}
