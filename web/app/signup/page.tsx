import Link from "next/link";
import { platformName } from "@/lib/brand";
import { Shell } from "@/components/landing/Shell";
import { PartnerSignupForm } from "@/components/AuthForms";
import { signUpPartner } from "@/lib/accounts";
import { partnerApprovalRequired } from "@/lib/brand";

export const metadata = { title: "Set up your firm's filing desk" };

export default function SignupPage() {
  return (
    <Shell>
      <main className="auth-main band">
        <div className="auth-card wide">
          <span className="field-label">For firms</span>
          <h2>Set up your firm&apos;s filing desk</h2>
          <p className="lede">For firms that file for their clients. Confirm your email, put your name and logo on the door, and choose which card pays the state&apos;s fees. Your first filing can be a free rehearsal: nothing filed, nothing paid.</p>
          <PartnerSignupForm action={signUpPartner} approvalRequired={partnerApprovalRequired()} />
          <p className="hero-note">Building a filing product? <Link href="/#enterprise">See {platformName()} for platforms</Link>.</p>
        </div>
      </main>
    </Shell>
  );
}
