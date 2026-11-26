import Link from "next/link";
import { SiteShell } from "@/components/site/SiteShell";
import { Lines, PageHead } from "@/components/site-pages/PageHead";
import { PlayOnce } from "@/components/site-pages/PlayOnce";
import { DashedOutline, Glyph } from "@/components/ui/glyphs";
import { Lockup } from "@/components/shell/Lockup";
import { InquiryForm } from "@/components/AuthForms";
import { sendInquiry } from "@/lib/accounts";
import { platformName } from "@/lib/brand";
import "@/styles/components/platforms.css";

export function generateMetadata() {
  const name = platformName();
  return {
    title: "For platforms",
    description: `Filing companies, banks and fintechs: offer state filings inside your own product, under your own brand, with ${name} underneath.`,
  };
}

/** The dry run, as the list and the picture both show it: mono on the stage's Night, with the rehearsal's dashed edge. */
function DryRun() {
  return <code className="plat2-dry"><DashedOutline />&quot;dryRun&quot;: true</code>;
}

/**
 * "Underneath" (merged spec 10A.7.1): three sheets on the desk, front to back, a platform's white-label proof (its logo
 * a Rule block: it is whoever's brand), the embed widget in Best Accounting's brand, and at the back the one piece of
 * code the copy names, on the rehearsal's Night. Nothing of CoFile's on the first two. A picture: the list beside it
 * says the same in words, so its drawing is hidden from screen readers; its labels are read.
 */
function Underneath() {
  return (
    <PlayOnce className="und2" duration={1600} caption={<>Sample proof · test details · not a real business<br />Example · test details · not a real firm</>}>
      <div className="und2-stack" aria-hidden="true">
        <div className="und2-code">
          <pre className="und2-pre"><code>
            <span className="k">curl</span> …/v1/filings \{"\n"}
            {"  "}<span className="k">-H</span> &quot;x-api-key: $COFILE_API_KEY&quot; \{"\n"}
            {"  "}<span className="k">-d</span> &apos;{"{"}{"\n"}
            {"    "}<span className="k">&quot;type&quot;</span>: &quot;formation&quot;,{"\n"}
            {"    "}<span className="k">&quot;state&quot;</span>: &quot;NJ&quot;,{"\n"}
            {"    "}<span className="k">&quot;formation&quot;</span>: {"{ … },"}{"\n"}
            {"    "}<span className="und2-dry"><Glyph kind="ghost" /><span className="und2-dry-mark"><DashedOutline /></span><span className="k">&quot;dryRun&quot;</span>: <span className="k">true</span></span>{"\n"}
            {"  "}{"}"}&apos;
          </code></pre>
        </div>
        <div className="und2-widget sheet">
          <p className="und2-best">Best Accounting</p>
          <p className="und2-w-title">New Jersey LLC formation</p>
          <div className="und2-w-field"><span>LLC name, without the ending</span><i /></div>
          <div className="und2-w-field"><span>Ending</span><i className="is-select">LLC</i></div>
        </div>
        <div className="und2-proof sheet">
          <div className="und2-logo" />
          <div className="und2-firmrule" />
          <div className="und2-p-head"><p className="und2-p-title">Two Sisters Bakery LLC</p><span className="und2-turn"><Glyph kind="turn" />Ready to approve</span></div>
          <dl className="und2-rows">
            <div><dt>Business name</dt><dd>TWO SISTERS BAKERY LLC</dd></div>
            <div><dt>Members</dt><dd>Ana Ortiz, Lucia Ortiz (50/50)</dd></div>
            <div><dt>Main business address</dt><dd>88 Grove St, Jersey City NJ 07302</dd></div>
          </dl>
          <dl className="und2-fees">
            <div><dt>Formation filing fee</dt><dd>$100.00</dd></div>
            <div><dt>NJ portal fee, by card</dt><dd>$3.50</dd></div>
            <div className="is-total"><dt>Total to the state</dt><dd>$103.50</dd></div>
          </dl>
          <span className="und2-approve">Approve for filing</span>
          <span className="und2-bar" />
        </div>
      </div>
    </PlayOnce>
  );
}

export default function Platforms() {
  const name = platformName();
  return (
    <SiteShell>
      <PageHead kicker="For platforms" className="plat2-head" title={<Lines lines={["Building a filing product?", `Put ${name} underneath it.`]} />}>
        <div className="plat2-row">
          <p className="t-lede pg2-lede plat2-lede">Filing companies, and platforms that sign up new businesses, can offer state filings inside their own product under their own brand. Tell us what you file and roughly how many, and we&apos;ll set up your account with you.</p>
          <div className="plat2-pic"><Underneath /></div>
        </div>
      </PageHead>

      <section className="pg2-band is-show" id="enterprise">
        <div className="site2-in pg2-two is-top">
          <ul className="pg2-words pg2-list t-body plat2-list">
            <li>An API, with webhooks for each stage</li>
            <li>A white-label setup, with your name and support contact on the proof</li>
            <li>An embeddable widget for your own pages</li>
            <li>Your own state logins, registered agent, signers and defaults</li>
            <li>Start with <DryRun />: the run rehearses on the state&apos;s website and stops before the final submit. <Link href="/docs">Read the API docs</Link>.</li>
          </ul>
          <div className="pg2-pic plat2-order" data-brass-cta="">
            <div className="plat2-letterhead"><Lockup height={24} name={name} /></div>
            <InquiryForm action={sendInquiry} />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
