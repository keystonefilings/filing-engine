import Link from "next/link";
import { Shell } from "@/components/landing/Shell";
import { FirmNameCarry } from "@/components/pictures/FirmNameCarry";

export const metadata = { title: "Check your email" };

export default async function SignupSentPage({ searchParams }: { searchParams: Promise<{ open?: string }> }) {
  const { open } = await searchParams;
  return (
    <Shell>
      <main className="auth-main band">
        <div className="auth-card">
          <span className="field-label">Your filing desk</span>
          <h2>Check your email</h2>
          <p className="lede">
            We sent you a link. Open it to confirm your email.
            {open
              ? <> Then your filing desk opens: <Link href="/login">log in</Link> with the email and password you chose. Your first filing can be a rehearsal: nothing filed, nothing paid.</>
              : <> If your account needs a review before it opens, we&apos;ll email you as soon as it&apos;s approved.</>}
          </p>
          <FirmNameCarry clear />
          <p className="hero-note">No email after a few minutes? Check spam, or <Link href="/verify-email">send the link again</Link>.</p>
        </div>
      </main>
    </Shell>
  );
}
