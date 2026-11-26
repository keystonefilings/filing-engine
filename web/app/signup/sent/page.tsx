import Link from "next/link";
import { Shell } from "@/components/landing/Shell";

export const metadata = { title: "Check your email" };

export default async function SignupSentPage({ searchParams }: { searchParams: Promise<{ open?: string }> }) {
  const { open } = await searchParams;
  return (
    <Shell>
      <main className="auth-main band">
        <div className="auth-card">
          <span className="field-label">Partner account</span>
          <h2>Check your email</h2>
          <p className="lede">
            We sent a link to confirm your email address. Open it to finish.
            {open
              ? <> Once it&apos;s confirmed you can <Link href="/login">log in</Link> with the email and password you chose.</>
              : <> If your account needs a review before it opens, we&apos;ll email you as soon as it&apos;s approved.</>}
          </p>
          <p className="hero-note">No email after a few minutes? Check spam, or <Link href="/verify-email">send the link again</Link>.</p>
        </div>
      </main>
    </Shell>
  );
}
