import Link from "next/link";
import { Shell } from "@/components/landing/Shell";

export const metadata = { title: "Account requested" };

export default function SignupSentPage() {
  return (
    <Shell>
      <main className="auth-main band">
        <div className="auth-card">
          <span className="field-label">Partner account</span>
          <h2>Thanks, we have your request</h2>
          <p className="lede">We review new partner accounts before they open. Once yours is approved you can <Link href="/login">log in</Link> with the email and password you chose.</p>
        </div>
      </main>
    </Shell>
  );
}
