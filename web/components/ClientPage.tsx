import "@/styles/components/intake.css";
import type { ReactNode } from "react";
import { brandStyle, type FirmBrand } from "@/lib/firm";
import { inkMatch } from "@/lib/design/ink";
import { BrandFont } from "./BrandFont";
import { Chip } from "./ui/Chip";
import { BETA_CLIENT_TEXT, betaOn } from "@/lib/beta";
import { Letterhead, Register, Sheet } from "./ui/Sheet";

/**
 * A page that reaches a firm's client (decision 2, the Stripe model): the firm's register, a sheet of paper
 * under the firm's Letterhead, and nothing of CoFile on it (decision 12). The client form, client link pages
 * and the firm's page for each filing use it; the embed drops the Letterhead (it sits on the firm's own site).
 */
export function ClientPage({ brand, embed, children }: { brand: FirmBrand; embed?: boolean; children: ReactNode }) {
  return (
    <Register value="firm" firmStyle={brandStyle(brand)}>
      <BrandFont font={brand.font} />
      {/* A red-family firm's errors never rely on hue, so they never look like its button (3.6) */}
      <main className={["client2", embed && "is-embed", inkMatch(brand.color, brand.color2).flags.redFamily && "is-red"].filter(Boolean).join(" ")}>
        <Sheet size="page" className="client2-sheet">
          {embed ? null : <Letterhead name={brand.name} logoUrl={brand.logoUrl} />}
          {embed || !betaOn() ? null : <p className="client2-beta" role="note"><Chip tone="rehearsal" compact>Beta</Chip><span>{BETA_CLIENT_TEXT}</span></p>}
          {children}
        </Sheet>
      </main>
    </Register>
  );
}

/** When the firm isn't known (a link that can't be read), the same sheet with no one's name on it. */
export function NeutralPage({ children }: { children: ReactNode }) {
  return (
    <Register value="firm" firmStyle={brandStyle({ color: "#1D2130", color2: "#1D2130" })}>
      {/* The empty envelope, drawn in Graphite (V11): decorative, the words carry it */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <main className="client2"><Sheet size="page" className="client2-sheet"><img className="client2-vignette" src="/cofile/vignettes/v11-empty-envelope-small-graphite.svg" alt="" width={120} height={120} />{children}</Sheet></main>
    </Register>
  );
}
