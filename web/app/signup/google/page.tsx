import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { platformName, partnerApprovalRequired } from "@/lib/brand";
import { AccountShell } from "@/components/site-pages/AccountShell";
import { SignupDesk } from "@/components/site-pages/SignupDesk";
import { signUpPartnerWithGoogle } from "@/lib/accounts";
import { GOOGLE_SIGNUP_COOKIE, type GoogleSignup } from "@/lib/google";
import { unseal } from "@/lib/seal";
import "@/styles/components/signup.css";

export const metadata = { title: "Finish setting up your filing desk" };

/**
 * Nov 27: the second half of a sign-up that began with "Continue with Google". Google has vouched for the
 * person's email (sealed in a 15-minute cookie by the callback); the firm's details are all that's left,
 * and the desk opens the moment they're sent. Also where a Google log-in with no account yet lands.
 */
export default async function GoogleSignupPage() {
  const jar = await cookies();
  const who = unseal<GoogleSignup & Record<string, unknown>>("google-signup", jar.get(GOOGLE_SIGNUP_COOKIE)?.value);
  if (!who) redirect("/signup?google=expired");
  return (
    <AccountShell link={{ href: "/login", label: "Log in" }}>
      <SignupDesk action={signUpPartnerWithGoogle} approvalRequired={partnerApprovalRequired()} platform={platformName()}
        google={{ email: who.email, name: who.name }}
        notice={who.from === "signin" ? { text: `No account uses ${who.email} yet. Set up your firm's filing desk here, or log in with another email.`, tone: "plain" } : undefined} />
    </AccountShell>
  );
}
