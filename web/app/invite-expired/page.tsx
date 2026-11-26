import { AccountCard, AccountShell } from "@/components/site-pages/AccountShell";
import { Vignette } from "@/components/Vignette";

export const metadata = { title: "Link expired" };

/**
 * An old staff invite link (merged spec 10A.14): CoFile's account frame and one quiet card with the door from the
 * step above it (120 px tall; 96 on phones). No button: the next step is in someone else's hands. No red, no warning.
 */
export default function InviteExpired() {
  return (
    <AccountShell link={{ href: "/login", label: "Log in" }}>
      <AccountCard
        title="This link has expired or isn't valid"
        lede="Ask whoever sent it for a new invitation. Invitations now come by email with a link to set your own password."
        vignette={<Vignette name="v05-door-from-step" size={96} phone={77} />}
      />
    </AccountShell>
  );
}
