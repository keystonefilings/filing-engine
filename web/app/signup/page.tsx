import { platformName, partnerApprovalRequired } from "@/lib/brand";
import { AccountShell } from "@/components/site-pages/AccountShell";
import { SignupDesk } from "@/components/site-pages/SignupDesk";
import { signUpPartner } from "@/lib/accounts";
import "@/styles/components/signup.css";

export const metadata = { title: "Set up your firm's filing desk" };

/** Sign-up (merged spec 10A.9): it's already yours. The header's one link is "Log in"; "Create account" is the Brass. */
export default function SignupPage() {
  return (
    <AccountShell link={{ href: "/login", label: "Log in" }}>
      <SignupDesk action={signUpPartner} approvalRequired={partnerApprovalRequired()} platform={platformName()} />
    </AccountShell>
  );
}
