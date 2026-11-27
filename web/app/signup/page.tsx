import { platformName, partnerApprovalRequired, supportEmail } from "@/lib/brand";
import { AccountShell } from "@/components/site-pages/AccountShell";
import { SignupDesk } from "@/components/site-pages/SignupDesk";
import type { SlipTone } from "@/components/AuthForms";
import { signUpPartner } from "@/lib/accounts";
import { googleConfigured } from "@/lib/google";
import "@/styles/components/signup.css";

export const metadata = { title: "Set up your firm's filing desk" };

/**
 * Sign-up (merged spec 10A.9): it's already yours. The header's one link is "Log in"; "Create account" is the Brass.
 * Nov 27: the account opens at once, and "Continue with Google" stands above the email form.
 */
export default async function SignupPage({ searchParams }: { searchParams: Promise<{ google?: string }> }) {
  const sp = await searchParams;
  // Why a Google sign-up came back here, and the tone each answer takes (10A.0.6).
  const notice = ({
    pending: ["That Google email already has an account, and it's waiting for approval. We'll email you when it's ready.", "attention"],
    blocked: [`That Google email's account can't sign in. If you think that's wrong, email ${supportEmail()}.`, "problem"],
    cancelled: ["Google sign-in was cancelled. You can still sign up with your email below.", "plain"],
    expired: ["That Google sign-in took too long. Try again.", "problem"],
    failed: ["Google sign-in didn't work. Try again, or sign up with your email below.", "problem"],
    off: ["Google sign-in isn't available here yet. Sign up with your email below.", "plain"],
  } as Record<string, [string, SlipTone]>)[sp.google ?? ""];
  return (
    <AccountShell link={{ href: "/login", label: "Log in" }}>
      <SignupDesk action={signUpPartner} approvalRequired={partnerApprovalRequired()} platform={platformName()} googleOn={googleConfigured()}
        notice={notice ? { text: notice[0], tone: notice[1] } : undefined} />
    </AccountShell>
  );
}
