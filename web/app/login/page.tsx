import Link from "next/link";
import { Shell } from "@/components/landing/Shell";
import { EmailLoginForm } from "@/components/AuthForms";
import { signInWithEmail } from "@/lib/accounts";

export const metadata = { title: "Log in" };

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ new?: string }> }) {
  const sp = await searchParams;
  return (
    <Shell>
      <main className="auth-main band">
        <div className="auth-card">
          <span className="field-label">Log in</span>
          <h2>Welcome back</h2>
          <p className="lede">Partner firms go to their dashboard, enterprise accounts to theirs.</p>
          <EmailLoginForm action={signInWithEmail} notice={sp.new ? "Your account is ready. Log in to set it up." : undefined} />
          <p className="hero-note">New here? <Link href="/signup">Create a partner account</Link>. Enterprise developers can also <Link href="/dashboard/login">sign in with an API key</Link>.</p>
        </div>
      </main>
    </Shell>
  );
}
