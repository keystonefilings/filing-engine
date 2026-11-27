import type { Metadata } from "next";
import { NEUTRAL_CLIENT_METADATA } from "@/lib/firm-icon";
import { Vignette } from "@/components/Vignette";
import { firmBySlug } from "@/lib/public-pages";
import { brandOf } from "@/lib/firm";
import { AccountLabel } from "@/components/shell/AppShell";
import { Lockup } from "@/components/shell/Lockup";
import { platformName } from "@/lib/brand";
import "@/styles/components/shell.css";
import "@/styles/components/desk.css";

/** CoFile's tab for a partner firm's desk; for an address that may be a platform's white label, nothing of ours. */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const firm = await firmBySlug((await params).slug).catch(() => null);
  return firm?.partner ? { title: "Signed out" } : { ...NEUTRAL_CLIENT_METADATA, title: { absolute: "Signed out" } };
}

/**
 * Signed out of a firm's desk (merged spec 10B.20): one of CoFile's account pages, a centred card under the lockup.
 * When the address is a partner firm's with public pages, its account label names whose desk it is; otherwise the
 * card names nobody and shows nothing of CoFile, since the desk may be a platform's white label.
 */
export default async function SignedOut({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const firm = await firmBySlug(slug).catch(() => null);
  const partner = firm?.partner ? brandOf(firm) : null;
  return (
    <main className={["signed2", partner ? "reg-cofile" : "is-neutral"].join(" ")}>
      {partner ? <div className="signed2-mark"><Lockup height={28} name={platformName()} /></div> : null}
      <div className="signed2-card">
        <p className="signed2-vignette"><Vignette name="v05-door-from-step" size={160} phone={120} /></p>
        {partner ? <p className="signed2-acct"><AccountLabel name={partner.name} logoUrl={partner.logoUrl} /></p> : null}
        <h1>You&apos;re not signed in to this filing desk</h1>
        <p>If your firm has a filing desk, <a href="/login">log in here</a>.</p>
        <p>Otherwise open the invite link your filing company sent you. Invite links work for 7 days; if yours has run out, ask them for a new one.</p>
      </div>
    </main>
  );
}
