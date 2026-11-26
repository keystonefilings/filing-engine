import Link from "next/link";
import { Shell } from "@/components/landing/Shell";
import { EmailLoginForm } from "@/components/AuthForms";
import { signInWithEmail } from "@/lib/accounts";
import { googleConfigured } from "@/lib/google";

export const metadata = { title: "Log in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ new?: string; reset?: string; ended?: string; google?: string }> }) {
  const sp = await searchParams;
  // V37: why a Google sign-in came back here.
  const googleError = ({
    "no-account": "No account uses that Google email. Log in with your email and password, or create a partner account first.",
    pending: "Your account is waiting for approval. We'll email you when it's ready.",
    blocked: "This account can't sign in. Contact us if you think that's wrong.",
    cancelled: "Google sign-in was cancelled.",
    expired: "That Google sign-in took too long. Try again.",
    failed: "Google sign-in didn't work. Try again, or log in with your email and password.",
    off: "Google sign-in isn't available here yet.",
  } as Record<string, string>)[sp.google ?? ""];
  return (
    <Shell>
      <main className="auth-main band">
        <div className="auth-card">
          <span className="field-label">Log in</span>
          <h2>Welcome back</h2>
          <p className="lede">Partner firms go to their portal, enterprise accounts to their dashboard.</p>
          {googleError ? <p className="notice bad" role="alert">{googleError}</p> : null}
          {googleConfigured() ? <p><a className="btn" href="/auth/google" style={{ width: "100%", justifyContent: "center" }}>Continue with Google</a></p> : null}
          <EmailLoginForm action={signInWithEmail} notice={sp.ended ? "Your session ended. Log in again to carry on." : sp.reset ? "Your password is changed. Log in with the new one." : sp.new ? "Your account is ready. Log in to set it up." : undefined} />
          <p className="hero-note">New here? <Link href="/signup">Create a partner account</Link>. Enterprise developers can also <Link href="/dashboard/login">log in with an API key</Link>.</p>
        </div>
      </main>
    </Shell>
  );
}
