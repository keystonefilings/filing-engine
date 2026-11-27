"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { GoogleButton, PartnerSignupForm, Slip, type GoogleSignupIdentity, type SlipTone } from "@/components/AuthForms";
import type { FormState } from "@/lib/accounts";
import { readCarriedFirm, writeCarriedName } from "@/lib/firm-name-carry";
import { firmVars, inkMatch } from "@/lib/design/ink";
import { segments } from "@/lib/plate-lettering";
import { PlateName } from "./PlateName";

/** The head of the firm's client pages before it adds a logo (10A.9.3, 3.5.5): its name typeset alone, then its rule. */
function ClientHead({ name, color }: { name: string; color?: string }) {
  const style = useMemo(() => (color ? (firmVars(inkMatch(color)) as CSSProperties) : undefined), [color]);
  const text = name.trim();
  return (
    <div className={["su2-head", "sheet", color ? "has-color" : ""].filter(Boolean).join(" ")} style={style} aria-hidden="true">
      <p className="su2-head-name">
        {text
          ? segments(text).map((s, i) => <span key={i} className={s.kind === "cred" ? "is-cred" : undefined}>{s.text}</span>)
          : <span className="su2-caret" />}
      </p>
      <div className="su2-rule" />
    </div>
  );
}

/**
 * Sign-up (merged spec 10A.9): the card with the product's form, and beside it the blank brass plate with the firm
 * name cut into it as it's typed, and the head of the firm's client pages set with it. A name carried from the home
 * page's Close arrives in "Firm name" as an ordinary entered value; typing writes it back to the same tab's storage.
 * The name reaches the server only as "Firm name" when the form is sent.
 *
 * Nov 27: "Continue with Google" sits above the form when Google sign-in is set up (`googleOn`). A sign-up that
 * began with Google comes back here with `google` set: the heading says what's left (the firm), the email is
 * Google's and there is no password. `notice` is why a Google sign-in came back to this page, if it did.
 */
export function SignupDesk({ action, approvalRequired, platform, googleOn, google, notice }: {
  action: (prev: FormState, fd: FormData) => Promise<FormState>; approvalRequired: boolean; platform: string;
  googleOn?: boolean; google?: GoogleSignupIdentity; notice?: { text: string; tone: SlipTone };
}) {
  const [name, setName] = useState("");
  const [color, setColor] = useState<string | undefined>();
  const [rake, setRake] = useState(false);
  const [live, setLive] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const saveTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const field = wrap.current?.querySelector<HTMLInputElement>('input[name="companyName"]');
    const carried = readCarriedFirm();
    if (field && carried?.name && !field.value) field.value = carried.name;
    if (carried?.color) setColor(carried.color);
    if (field?.value) {
      setName(field.value);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const t = window.setTimeout(() => setRake(true), 300);
        return () => window.clearTimeout(t);
      }
    }
  }, []);

  const onInput = (e: React.FormEvent<HTMLDivElement>) => {
    const t = e.target as HTMLInputElement;
    if (t.name !== "companyName") return;
    setLive(true);
    setRake(false);
    setName(t.value);
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(() => writeCarriedName(t.value), 300);
  };

  return (
    <div className="site2-in su2" ref={wrap}>
      <div className="su2-col">
        <div className="acct2-card su2-card">
          <p className="t-kicker acct2-kicker">For firms</p>
          <h1 className="t-display-m acct2-h1">{google ? "Finish setting up your filing desk" : "Set up your firm's filing desk"}</h1>
          <p className="t-lede acct2-lede">{google
            ? <>You&apos;re signed in with Google as {google.email}. Tell us about your firm and your filing desk opens right away. Then put your name and logo on the door, and choose which card pays the state&apos;s fees.</>
            : <>For firms that file for their clients. Your filing desk opens the moment you sign up: put your name and logo on the door, and choose which card pays the state&apos;s fees. Your first filing can be a free rehearsal: nothing filed, nothing paid.</>}</p>
          <div className="acct2-body" onInput={onInput}>
            {notice ? <Slip tone={notice.tone} role={notice.tone === "problem" ? "alert" : "status"}>{notice.text}</Slip> : null}
            {googleOn && !google ? <><GoogleButton purpose="signup" /><hr className="acct2-rule" /></> : null}
            <PartnerSignupForm action={action} approvalRequired={approvalRequired} google={google} />
          </div>
          <div className={["su2-inline", live && "is-live"].filter(Boolean).join(" ")}>
            <PlateName name={name} view="strip" rake={rake} />
            <div className="su2-inline-head"><ClientHead name={name} color={color} /></div>
          </div>
        </div>
        <p className="acct2-note su2-platforms">Building a filing product? <Link href="/platforms">See {platform} for platforms</Link>.</p>
      </div>
      <div className={["su2-panel", live && "is-live"].filter(Boolean).join(" ")}>
        <PlateName name={name} view="tall" rake={rake} />
        <ClientHead name={name} color={color} />
      </div>
    </div>
  );
}
