import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";
import { platformName, supportEmail } from "@/lib/brand";
import { betaOn } from "@/lib/beta";
import { Lockup } from "@/components/shell/Lockup";
import { Chip } from "@/components/ui/Chip";
import { signIn } from "./actions";
import "@/styles/components/shell.css";
import "@/styles/components/app.css";
import "@/styles/components/dashboard.css";

export const metadata = { title: "Log in with an API key" };

/**
 * Log in with an API key (merged spec 10C.3): an auth page in CoFile's look, the lockup centred over one 480 px card.
 * A deployment with its own platform name shows that name in type, never inside our mark.
 */
export default function LoginPage() {
  const name = platformName();
  const email = supportEmail();
  return (
    <main className="reg-cofile dashlogin2">
      {/* The site's own beta slip (CoFile's own page), in place of the old banner above the page */}
      {betaOn() ? (
        <div className="dashlogin2-beta" role="note">
          <div><Chip tone="rehearsal" compact>Beta</Chip><span>{name} is in beta. Any filing can run as a free rehearsal on the state&apos;s real website. It stops before the last button, so nothing is filed or paid. Filing types go live one at a time. Questions or problems? <a href={`mailto:${email}`}>{email}</a></span></div>
        </div>
      ) : null}
      <div className="dashlogin2-in shell2-content">
        <Link className="dashlogin2-mark" href="/">{name === "CoFile" ? <Lockup height={28} /> : <span className="shell2-platform">{name}</span>}</Link>
        <h1>{name} dashboard</h1>
        <p className="muted">Log in with one of your API keys to manage keys, webhooks, your firms&apos; portals and usage.</p>
        <LoginForm action={signIn} />
        <p className="small muted dashlogin2-alt">Have an email and password? <Link href="/login">Log in here</Link> instead.</p>
      </div>
    </main>
  );
}
