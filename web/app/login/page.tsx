import { supportEmail } from "@/lib/brand";
import Link from "next/link";
import { AccountShell } from "@/components/site-pages/AccountShell";
import { EmailLoginForm, Slip, type SlipTone } from "@/components/AuthForms";
import { Vignette } from "@/components/Vignette";
import { signInWithEmail } from "@/lib/accounts";
import { googleConfigured } from "@/lib/google";

export const metadata = { title: "Log in" };

/** Google's own "G", in its four colors, as its sign-in branding guidelines draw it. */
function GoogleG() {
  return (
    <svg className="gsi2-g" width="20" height="20" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

/**
 * Log in (merged spec 10A.11): a turnstile, fast and plain, with the door from the step beside it on wide screens.
 * The header's one link is "Run a free rehearsal" as text; the card's "Log in" is the page's Brass button.
 */
export default async function LoginPage({ searchParams }: { searchParams: Promise<{ new?: string; reset?: string; ended?: string; google?: string }> }) {
  const sp = await searchParams;
  // V37: why a Google sign-in came back here, and the tone each answer takes (10A.0.6).
  const googleError = ({
    "no-account": ["No account uses that Google email. Log in with your email and password, or set up your firm's filing desk first.", "problem"],
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
            {googleConfigured() ? <a className="gsi2" href="/auth/google"><GoogleG /><span>Continue with Google</span></a> : null}
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
