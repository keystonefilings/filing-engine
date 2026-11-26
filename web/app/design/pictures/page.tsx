import { notFound } from "next/navigation";
import "@/styles/components/home.css";
import "@/styles/components/story.css";
import { SiteShell } from "@/components/site/SiteShell";
import { JsMark } from "@/components/marketing/Words";
import { ExampleFonts } from "@/components/pictures/examples";
import { FullDesk, HeroDesk } from "@/components/pictures/DeskPicture";
import { TwoDoors } from "@/components/pictures/TwoDoors";
import { SlabToDraft, TextToDraft } from "@/components/pictures/TextToDraft";
import { ProofPicture } from "@/components/pictures/ProofPicture";
import { OrderComesHome, PapersHome } from "@/components/pictures/RecordPicture";
import { CoverageCards } from "@/components/pictures/CoverageCards";
import { RunSheet } from "@/components/pictures/RunSheet";
import { PriceCard } from "@/components/pictures/PriceCard";
import { StillPlate } from "@/components/pictures/ClosePlate";
import { BrandStudio } from "@/components/pictures/BrandStudio";
import { EngraverStill, SavedAgent } from "@/components/pictures/ForFirms";
import { ClientPagePicture } from "@/components/pictures/ClientPagePicture";

export const metadata = { title: "Pictures", robots: { index: false } };

function Item({ id, title, where, children, night }: { id: string; title: string; where: string; children: React.ReactNode; night?: boolean }) {
  return (
    <section className={["gpic", night && "is-night"].filter(Boolean).join(" ")} id={id}>
      <div className="site2-in">
        <p className="gpic-id">{id} · {where}</p>
        <h2 className="gpic-title">{title}</h2>
        <div className="gpic-stage">{children}</div>
      </div>
    </section>
  );
}

/**
 * The product pictures the marketing pages share (merged spec 7.3.3, L1 to L12), each as the page shows it, for review.
 * Not served in production unless DESIGN_GALLERY=true. Every picture plays once per visit (sessionStorage), so a fresh
 * tab replays them; the replay control in each caption row plays one again.
 */
export default function PicturesGallery() {
  if (process.env.NODE_ENV === "production" && process.env.DESIGN_GALLERY !== "true") notFound();
  return (
    <SiteShell>
      <JsMark />
      <ExampleFonts />
      <style>{`.gpic{padding:64px 0;overflow-x:clip}.gpic+.gpic{border-top:1px solid var(--line)}.gpic.is-night{background:var(--stage)}.gpic.is-night .gpic-id,.gpic.is-night .gpic-title{color:#ECE8DF}.gpic-id{font:500 .875rem/1.25rem var(--font-sans);color:var(--text-2)}.gpic-title{margin:4px 0 32px;font:400 2rem/2.5rem var(--font-display)}.gpic-row{display:flex;flex-wrap:wrap;gap:32px;align-items:flex-start}.gpic-stage{min-width:0}.gpic-half{max-width:708px}`}</style>
      <div className="hm st">
        <Item id="L1" title="The desk, and the page the firm's clients see" where="Home 1"><div className="gpic-half"><HeroDesk /></div></Item>
        <Item id="L1" title="The desk, wider and still" where="For firms"><div className="gpic-half"><FullDesk /></div></Item>
        <Item id="L2" title="The client page in two brands" where="part of L2"><div className="gpic-row"><ClientPagePicture firm="hp" /><ClientPagePicture firm="ng" /></div></Item>
        <Item id="L2" title="Two doors, one page" where="Home 2; For firms (parked)"><div style={{ maxWidth: 810 }}><TwoDoors /></div></Item>
        <Item id="L3" title="From a text to a draft" where="Home 3"><TextToDraft /></Item>
        <Item id="L3" title="From a text to a draft, on the phone slab" where="How it works"><div className="gpic-half"><SlabToDraft /></div></Item>
        <Item id="L4" title="The proof" where="Home 4"><ProofPicture /></Item>
        <Item id="L10" title="A letterhead proof becomes the proof" where="How it works"><ProofPicture variant="hiw" id="sample-proof-hiw" /></Item>
        <Item id="L5" title="The order comes home" where="Home 5"><div style={{ maxWidth: 810 }}><OrderComesHome /></div></Item>
        <Item id="L5" title="The papers already home" where="How it works"><div className="gpic-half"><PapersHome /></div></Item>
        <Item id="L6" title="The sample cards" where="Home 6"><CoverageCards /></Item>
        <Item id="L7" title="The programme" where="Home 7" night><div style={{ maxWidth: 810 }}><RunSheet /></div></Item>
        <Item id="L8" title="The price card" where="Home 8"><PriceCard /></Item>
        <Item id="L9" title="The plate, with the name typed at the Close if any" where="For firms' close"><div style={{ maxWidth: 486 }}><StillPlate /></div></Item>
        <Item id="L11" title="Your brand, everywhere at once" where="For firms"><BrandStudio /></Item>
        <Item id="L12" title="The saved agent" where="For firms"><div className="gpic-half"><SavedAgent /></div></Item>
        <Item id="C11" title="The engraver, as a still" where="For firms' title page"><div style={{ maxWidth: 504 }}><EngraverStill /></div></Item>
      </div>
    </SiteShell>
  );
}
