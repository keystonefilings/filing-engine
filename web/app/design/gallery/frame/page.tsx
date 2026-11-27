import "@/styles/components/desk.css";
import "@/styles/components/branding.css";
import "@/styles/components/qa-gallery.css";
import { notFound } from "next/navigation";
import { ClientPage } from "@/components/ClientPage";
import { Notice } from "@/components/ui/Sheet";
import { IntakeForm } from "@/components/IntakeForm";
import { AppShell, type ShellLink } from "@/components/shell/AppShell";
import { BrandingStudio } from "@/components/desk/BrandingStudio";
import { BrandFont } from "@/components/BrandFont";
import { brandStyle } from "@/lib/firm";
import { filingKind } from "@/lib/intake/forms";
import { platformName } from "@/lib/brand";
import { FONT_PRESETS } from "@/lib/fonts";
import { brandFor, caseById, galleryOn } from "../cases";
import { galleryBranding, galleryIntake } from "../actions";

// One surface of one QA gallery case, drawn by the real components with the case's brand, for the gallery's frames
// (app/design/gallery). A frame so each surface lays out at its own width and, for the dark desk, in its own theme.
export const metadata = { title: "QA gallery frame", robots: { index: false } };

const LINKS: ShellLink[] = [
  { href: "#filings", label: "Filings" }, { href: "#new", label: "New filing" }, { href: "#pay", label: "Ready to pay" },
  { href: "#links", label: "Client links" }, { href: "#signatures", label: "Signatures" }, { href: "#setup", label: "Setup" }, { href: "#billing", label: "Billing" },
];

/** Branding's own font choice for a case's face, where it is one of the presets; else the standard font. */
const presetOf = (family?: string) => Object.entries(FONT_PRESETS).find(([, p]) => family && p.family === family)?.[0] ?? "system";

export default async function GalleryFrame({ searchParams }: { searchParams: Promise<{ c?: string; v?: string; t?: string }> }) {
  if (!galleryOn()) notFound();
  const q = await searchParams;
  const c = caseById(q.c);
  if (!c) notFound();
  const brand = brandFor(c);
  const kind = filingKind("nj-llc")!;
  const dark = q.t === "dark";
  const theme = <script dangerouslySetInnerHTML={{ __html: `document.documentElement.dataset.theme=${JSON.stringify(dark ? "dark" : "light")}` }} />;
  const user = { email: "owner@example.com", passwordHref: "#password" };

  switch (q.v) {
    // A client's page (the client link page): the Letterhead, the beta strip, the filing's title and summary.
    case "client":
      return <div className="qa-frame">{theme}<ClientPage brand={brand}>
        <h1 className="client2-title">{kind.title}</h1>
        <p className="client2-summary">{kind.summary}</p>
      </ClientPage></div>;
    // The firm's page for a filing (PublicIntake's body, 10B.24), its form and its "Send to {firm}" button.
    case "filing":
      return <div className="qa-frame">{theme}<ClientPage brand={brand}>
        <Notice tone="rehearsal">This page is in rehearsal for now. You can fill it in, but nothing will be filed with the state and nothing will be charged, now or later, even after you approve it. To file for real, contact {brand.name}.</Notice>
        <h1 className="client2-title">{kind.title}</h1>
        <p className="client2-summary">{kind.summary} After you send this, {brand.name} checks every detail and fee and approves exactly what will be filed. Nothing is filed or paid until they do.</p>
        {kind.feeNote ? <p className="client2-fee">{kind.feeNote}</p> : null}
        <div className="intake2"><IntakeForm kind={kind} nonce="qa-gallery" action={galleryIntake} submitLabel={`Send to ${brand.name}`} forClient={brand.name} feeNoteAbove
          footnote={<>
            <p className="client2-note">Next, {brand.name} checks it and approves the filing. Nothing is filed until they do.</p>
            <p className="client2-foot">By sending, you agree to {platformName()}&apos;s <a href="/terms">Terms of Service</a>; your details are handled under its <a href="/privacy">Privacy Policy</a>.</p>
          </>} /></div>
      </ClientPage></div>;
    // Branding (10B.7): the setup page with its live preview suite.
    case "branding":
      return <div className="qa-frame">{theme}
        <BrandFont font={brand.font} />
        <AppShell home="#" account={{ name: brand.name, logoUrl: brand.logoUrl, logo: brand.logo }} user={user} links={LINKS}>
          <BrandingStudio action={galleryBranding} v={{ displayName: c.name, logoSrc: brand.logoUrl, primaryColor: c.color.toLowerCase(), secondaryColor: (c.color2 ?? c.color).toLowerCase(), font: presetOf(c.font?.google), firstKind: kind.title }} />
        </AppShell>
      </div>;
    // The desk's letterhead row with the firm's account label, light or dark (10B.3.1, 10B.3.3).
    case "desk":
      return <div className="qa-frame">{theme}<AppShell home="#" account={{ name: brand.name, logoUrl: brand.logoUrl, logo: brand.logo }} user={user} links={LINKS}>{null}</AppShell></div>;
    // A platform's white-label desk: its Letterhead row and Firm Rule (10B.3.3).
    case "white":
      return <div className="qa-frame">{theme}<BrandFont font={brand.font} /><AppShell home="#" white={{ name: brand.name, logoUrl: brand.logoUrl, logo: brand.logo, style: brandStyle(brand) }} user={user} links={LINKS.slice(0, 5)}>{null}</AppShell></div>;
    default:
      notFound();
  }
}
