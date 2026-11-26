import Link from "next/link";
import { Shell } from "@/components/landing/Shell";
import { PartnerSignupForm } from "@/components/AuthForms";
import { signUpPartner } from "@/lib/accounts";
import { partnerApprovalRequired } from "@/lib/brand";

export const metadata = { title: "Create a partner account" };

export default function SignupPage() {
  return (
    <Shell>
      <main className="auth-main band">
        <div className="auth-card wide">
          <span className="field-label">Partner account</span>
          <h2>Create your firm&apos;s account</h2>
          <p className="lede">For CPA, payroll, fractional CFO and title firms filing for their clients. After you confirm your email, you&apos;ll add your branding and choose how state fees are paid.</p>
          <PartnerSignupForm action={signUpPartner} approvalRequired={partnerApprovalRequired()} />
          <p className="hero-note">A filing company or platform? <Link href="/#enterprise">Talk to us about enterprise</Link>.</p>
        </div>
      </main>
    </Shell>
  );
}
