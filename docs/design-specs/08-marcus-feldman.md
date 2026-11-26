# CoFile website design spec: Press Check

**Designer:** Marcus Feldman, growth and conversion design, Chicago
**Date:** Nov 26, 2026
**Scope:** every surface in the brief, plus the measurement plan, the activation metric and the experiment backlog that go with it.

> How to read this spec. Customer-facing strings in quotation marks, and the text inside wireframes, are real, locked copy from the repo (`web/app/page.tsx`, the setup and auth pages, `src/approvals/render.ts`, `src/comms/render.ts`, `web/lib/status.ts`). Notes to the right of a wireframe are mine, for the build team. Where the design needs a string that doesn't exist, it shows `[copy: Cn]` and Appendix B asks for it. "Press Check", "the Register" and "the proof that follows you" are internal names; none of them appears on the site.

---

## 1. Who I am and how that shapes this

I've spent fifteen years designing the first ten minutes of accounting and payroll software: landing pages, sign-ups, setup wizards, the first payroll run. Almost every gain I've shipped came from shortening the distance between "I'm curious" and "I've seen it work on my own data", not from new headlines.

The CPA and payroll buyer is the most cautious buyer I know: 40 to 65, buys by referral, reads the fine print, and has no time from January to April. They don't sign up to explore. They sign up to check one thing, and if they can't check it in one sitting they close the tab until May.

Four things follow, and they run through the whole spec:

1. **The sample proof is the sales pitch.** A CPA who sees a client's filing laid out like a printer's proof, with their own firm's name on top, gets it. Everything between the first visit and the first rehearsal puts that proof in front of them sooner.
2. **The path to a first rehearsal is a funnel, and I instrument it before I redesign it.** No baseline, no redesign.
3. **Experiments change layout, order and presentation, never words.** The copy is locked and it's good. My levers are sequence, emphasis, placement, evidence and interactivity.
4. **No dark patterns, and none near the irreversible act.** No fake urgency, no pre-checked boxes, no sticky approve button. The proof is excluded from conversion optimization: we test it for understanding, not approval rate.

---

## 2. The concept: Press Check

A press check is the moment in a print shop when the client stands at the press, looks at the first real sheet off the run, and either signs it or asks for a change. Nothing is printed in quantity until they sign. The copy already reaches for this ("You've approved a proof before: business cards, letterhead, an invitation at the printer"). I'm making the whole site work that way.

**The one idea: every surface lets you check the real thing before you commit to it.** The client checks the proof before the state sees it. The firm checks a rehearsal before anything is filed. And the website lets the visitor check CoFile, with their own firm's name on a real-looking proof, before it asks them for a card, a client or much of anything.

It fits CoFile for three reasons:

- **It's the product's own logic.** "Stop and ask rather than guess" is a press check. A brand built on that ritual doesn't need to claim trust; it shows the checking.
- **It turns the beta into a strength.** A rehearsal is a press check on the state's real website. "Rehearse on the real stage" and "Press Check" are the same promise: here's the real sheet, nothing has run yet.
- **It gives the design system two layers.** In print shops, ink is what gets printed and blue pencil is the commentary that doesn't reproduce. I use the same split. **Ink is what gets filed. Pencil is what explains it.** Every callout, guide line, tour step and annotation is drawn in "pencil" blue; every name, fee and detail that will reach the state is set in ink. The visual rule teaches people, without a word, which parts of a screen are the filing and which parts are us explaining it.

### The signature idea: the proof that follows you

One object, the sample proof for "Two Sisters Bakery LLC", follows the visitor from the first visit to the first rehearsal, taking on more of their firm at each step:

| Step | Where | What the proof shows |
|---|---|---|
| 1 | Home hero | "Harbor & Pine CPA", "example firm". The callouts 1 to 4 can be tapped. |
| 2 | `/signup` | The same sheet beside the form. The firm bar shows what they type in "Firm name" as they type it. |
| 3 | `/signup/sent`, `/verify-email` | Their firm name on the sheet, so the tab they come back to looks like theirs. |
| 4 | Setup, "Branding" | Their logo, color and font land on the sheet live, with the contrast fixes shown as they happen. |
| 5 | First rehearsal | The real proof, their brand, their test details, sent to them. They approve it, and the run log plays back exactly like the one on the home page. |

What we promised on the home page is what they're holding four minutes later. That continuity is the conversion mechanism: by step 4 the visitor is no longer evaluating a vendor. They're looking at their own work product.

### Growth rules we don't break

| Rule | In practice |
|---|---|
| Honest beta, always visible | The beta notice and the coverage labels are never hidden, collapsed by default or put behind a variant. |
| No fake numbers, logos or testimonials | No "trusted by" bar, no counters, no star ratings. The evidence is the rehearsal log, the coverage table and "the catch". |
| No urgency we didn't earn | The only deadlines shown are real ones (a proof's "Please decide by", a code's hour). |
| Consent is never pre-checked, never A/B tested | The Terms checkbox and every authorization on the proof are out of bounds for experiments. |
| The irreversible button is never sticky | On the proof, the approve button sits after the details and the consent, in the flow of the page. |
| No third-party tracking on client pages | Intake, the proof, client emails: first-party, server-side measurement only, no session replay. |

---

## 3. Brand identity

The current folder-tab mark and manila palette are charming, but they say "archive". I want the brand to say "checked". I'm replacing the mark and keeping the honesty of the paper-and-ink feel.

### 3.1 The mark: "the Register"

Drawn on a 32 × 32 unit grid, single color, no gradients.

- **Two crop marks.** An L at top left with its corner at (3, 3), arms running to (11, 3) and (3, 11). A mirrored L at bottom right with its corner at (29, 29), arms to (21, 29) and (29, 21). Stroke 2.5 units, square caps. Crop marks say: this sheet is trimmed to exactly what will be filed.
- **A registration ring.** Centered at (16, 16), radius 6.5 to the stroke centerline, stroke 2.5 units.
- **A center dot.** Solid, radius 2.25, at (16, 16).

The ring and dot are a registration target: two layers (the client's details and the state's form) lined up exactly. Two parties, one alignment, which is the "Co" in CoFile. The two open corners leave the top right and bottom left empty on purpose, so the mark never reads as a box or a frame you're trapped in.

Color: ink on light, paper on dark. **Never green.** Green means "go" in this system and nothing else. In onboarding illustrations only, the crop marks may be drawn in pencil blue.

Favicon: at 16 px, ring and dot only (crop marks drop out). At 32 px and up, the full mark. Apple touch icon 180 px: the full mark in paper on an ink square with 22% radius.

### 3.2 The wordmark

"CoFile", set in Atkinson Hyperlegible Next at weight 700 and then redrawn by the type studio:

- The lowercase **o** is replaced by the ring and dot at x-height. The ring's stroke matches the stem weight; the dot is 36% of the counter's width.
- The **i**'s dot is a square, echoing the square caps of the crop marks.
- The **F** crossbar is shortened by 8% so "File" doesn't drift right of "Co".
- Tracking −1%. Capital C and capital F always; never all caps, never all lowercase.

**Lockup:** mark left, wordmark right, gap 0.5 × mark width, mark height 1.4 × cap height. **Clear space:** the ring's outer diameter on all sides. **Minimum sizes:** mark 16 px, wordmark 64 px wide, lockup 96 px wide.

**Don'ts:** don't put it in green, pencil blue or a firm's color; don't put it on photographs; don't outline, rotate, animate the ring spinning or add a tagline inside the lockup.

### 3.3 The "with CoFile" co-brand mark

This is the only sign of CoFile a firm's client sees, so it has to be small, consistent and impossible to mistake for the firm's own branding.

```
  with ◉ CoFile
  └──┘ └┘ └────┘
  400   ring  600     Atkinson Hyperlegible Next, 13/18, color --ink-3
        glyph at x-height, no crop marks
```

- About 84 px wide at 13 px. It never scales with the firm's logo.
- Color: `--ink-3` on light bars (#5C6470), or white at 70% opacity on a dark firm bar. **Never the firm's color, never green.**
- Placement: right end of the firm's brand bar on the intake form, the client link page, the service page and the proof; in the footer of client emails. Once per page, never more.
- The embed keeps its existing phrasing, "Filed with CoFile", at the bottom of the widget, in the same style (see Copy note C9 on the two phrasings).
- Enterprise white-label pages carry no co-brand mark at all.
- Firms can't remove it, recolor it or move it into their logo area.

---

## 4. Color

Three principles:

1. **Green means go, and only go.** The primary action, "Approved" and "Live" share one green. Nothing decorative is green. If a visitor learns one color rule, it's this one, and it makes the CTA the most findable thing on every page.
2. **Ink is filed, pencil explains.** Body copy and filing details are ink. Callouts, guides, tours, help icons and the kicker are pencil blue.
3. **Status never depends on hue alone.** Every status carries a glyph and its words. Color helps; it never carries the meaning by itself.

### 4.1 Core tokens

All contrast ratios are WCAG 2.x, measured against the surface listed.

| Token | Light | Dark | Use | Contrast |
|---|---|---|---|---|
| `--paper` | #FAF8F4 | #0E1114 | Page background | |
| `--sheet` | #FFFFFF | #171B21 | Cards, the proof, fields | |
| `--wash` | #F1EEE7 | #13171C | Alternate section bands | |
| `--ink` | #15191F | #ECEEF1 | Headings, body, filing details | 16.6 : 1 on paper (both modes about 16 : 1) |
| `--ink-2` | #3B4350 | #B6BDC7 | Secondary text, ledes | 9.4 : 1 / 10.0 : 1 |
| `--ink-3` | #5C6470 | #8E97A4 | Captions, "with CoFile", meta | 5.6 : 1 on paper, 5.2 : 1 on wash / 5.9 : 1 on sheet |
| `--rule` | #DDD8CE | #2A3039 | Hairlines, table rules (decorative only) | |
| `--field-edge` | #8A8478 | #6B7481 | Field and checkbox borders | 3.7 : 1 / 3.7 : 1 (meets the 3 : 1 rule for components) |
| `--focus` | #1B64B8 | #7EB6F2 | Focus ring, 3 px with a 2 px offset | 5.9 : 1 / 8.1 : 1 |

### 4.2 Action and status

| Token | Light | Dark | Use | Contrast |
|---|---|---|---|---|
| `--go` | #0B7350 | #41C08A | Primary button fill, "Live" chip fill, go glyphs | White on #0B7350: 5.9 : 1. Dark text #04140C on #41C08A: 8.2 : 1 |
| `--go-hover` | #085C40 | #5CD09E | Hover and pressed | White: 8.0 : 1 |
| `--go-wash` | #E3F2EA | #0F2A1F | "Approved" and done chips | |
| `--go-ink` | #075A3E | #7FDDB2 | Text on go-wash | 7.1 : 1 / 9.4 : 1 |
| `--hold` | #8A4B00 | #F2B550 | Rehearsal hold text and glyph | 6.8 : 1 on sheet / 9.5 : 1 |
| `--hold-wash` | #FCEFD7 | #33240A | Rehearsal chip, rehearsal note | hold on hold-wash: 6.0 : 1 / 9.6 : 1 |
| `--hold-mark` | #E3A008 | #F2B550 | The hold bars glyph only (never text) | decorative |
| `--stop` | #B3261E | #FF8B80 | Stops, errors, "Stopped" | White on #B3261E: 6.5 : 1 / 7.6 : 1 on sheet |
| `--stop-wash` | #FCE9E7 | #3A1512 | Stop chip and error banners | stop-ink #A3221B on it: 6.4 : 1 / #FFA39A: 8.5 : 1 |
| `--neutral-wash` | #ECEEF1 | #232932 | In-progress chips | ink-2 on it: 8.6 : 1 / 8.8 : 1 |

### 4.3 Pencil (the guide layer)

| Token | Light | Dark | Use | Contrast |
|---|---|---|---|---|
| `--pencil` | #1B64B8 | #7EB6F2 | Callout numerals, links, the kicker, help icons | 5.9 : 1 on sheet, 5.6 : 1 on paper / 8.1 : 1 |
| `--pencil-line` | #4A8FDB | #5D9BE0 | Leader lines and crop marks (non-text) | 3.4 : 1 / 6.0 : 1 |
| `--pencil-wash` | #E6F0FB | #12263D | Tour popovers, highlighted rows on the sample proof | pencil-ink #16539A on it: 6.7 : 1 / #9CC8F6: 8.8 : 1 |

Links are pencil, underlined at 1 px with a 3 px offset, 2 px on hover. Links are never green, so a link never looks like a "go".

### 4.4 Rules for the proof

- On the client's proof, body text is `--ink` on `--sheet`: 17.6 : 1 in light mode. I'm holding the proof to AAA (7 : 1) for every piece of text, including captions, so `--ink-3` is not used on the proof; captions there use `--ink-2`.
- The state's review page image always sits on a white plate with a `--rule` edge, even in dark mode. It's a screenshot of a light website, and inverting it would misrepresent what the state shows.
- Fee totals are ink, never green. Green on a fee would read as "approved" before anyone approved anything.

---

## 5. Typography

### 5.1 Typefaces

| Role | Face | Why |
|---|---|---|
| Display, text and interface | **Atkinson Hyperlegible Next** (variable, 200 to 800) | Designed for low-vision readers by a braille institute. Its letters are deliberately distinct (I, l and 1; 0 and O; rn and m), which matters when a 62-year-old CPA checks an EIN or a ZIP code on a phone. Full Spanish coverage. Open license, so it ships everywhere, including emails and the proof, with no licensing friction. |
| Fees, codes, references, filing details, API | **Atkinson Hyperlegible Mono** | Same skeleton, so ink values on the proof feel like part of one family. Tabular by nature, so fee columns align on the decimal. |
| Proof Marks (commissioned) | A glyph set drawn to match Next's weight | The ring and dot, crop corners, circled callout numerals 1 to 9, hold bars, the stop mark, the tick, the half and empty rings for coverage stages. Delivered as an SVG sprite and a small variable icon font. |

One superfamily, two styles. That's a deliberate growth choice too: fewer font files means a faster first paint, and on a landing page every 100 ms of delay costs sign-ups. Budget: 2 variable WOFF2 files, subset to Latin and Latin Extended-A, under 110 KB together, `font-display: swap`, preloaded on the home page and the proof.

Distinctiveness doesn't come from a quirky display face. It comes from the system: the crop marks, the pencil layer, the ring and dot and the confident heavy weights of Next used large.

### 5.2 Scale: marketing site

| Style | Desktop size / line height | Mobile | Weight | Tracking |
|---|---|---|---|---|
| Display (hero H1) | 60 / 64 | 38 / 42 | 760 | −1.5% |
| H2 (section) | 40 / 46 | 29 / 34 | 720 | −1% |
| H3 | 24 / 30 | 21 / 27 | 680 | −0.5% |
| Kicker | 16 / 22 | 15 / 20 | 700, `--pencil` | 0 |
| Lede | 21 / 32 | 19 / 29 | 400, `--ink-2` | 0 |
| Body | 18 / 29 | 18 / 28 | 400 | 0 |
| UI label and button | 17 / 22 | 17 / 22 | 640 | 0 |
| Small | 15 / 22 | 15 / 22 | 400 | 0 |
| Micro | 13 / 18 | 13 / 18 | 400 to 600 | +0.5% |
| Mono value | 17 / 26 | 16 / 24 | 400 | 0 |
| Mono fee total | 24 / 30 | 22 / 28 | 600 | 0 |

### 5.3 Scale: filing desk, dashboard and client pages

| Style | Size / line height | Weight |
|---|---|---|
| Page title (H1) | 30 / 36 (mobile 26 / 32) | 720 |
| Section (H2) | 22 / 28 | 680 |
| Sub-section (H3) | 18 / 24 | 680 |
| Body | 17 / 26 | 400 |
| Table cell | 16 / 24 | 400 |
| Small, help text | 15 / 22 | 400 |
| Micro (meta, "with CoFile" only) | 13 / 18 | 400 |
| The proof's body | 18 / 28 minimum, never smaller | 400 |

**Rules:** nothing a reader has to act on is smaller than 15 px. Micro is reserved for metadata and the co-brand mark. Measure is 60 to 72 characters for prose. Headings are sentence case, as written. No all-caps anywhere: it slows older readers and the state names already arrive in caps in the filing details.

### 5.4 Numerals

- Prose uses proportional lining figures. Tables, fees, dates in lists and the coverage table use tabular figures (`font-variant-numeric: tabular-nums`).
- Fee columns are right-aligned on the decimal point, cents always shown ("$3.50", never "$3.5").
- References, EINs, card endings and API keys are Mono. Long codes are grouped visually with thin spaces in display only; the copied value has no spaces.
- **On firm-branded pages, numbers stay ours.** Whatever font the firm picks, fees, codes and filing details render in Atkinson Hyperlegible Mono. The firm owns the look; we own the legibility of the numbers a client is approving.

---

## 6. Layout

### 6.1 Grid and breakpoints

| Name | Width | Columns | Gutter | Side margin |
|---|---|---|---|---|
| xs | 0 to 599 | 4 | 16 | 16 |
| sm | 600 to 899 | 8 | 20 | 32 |
| md | 900 to 1199 | 12 | 24 | 40 |
| lg | 1200 to 1599 | 12 | 24 | auto, content max 1200 |
| xl | 1600+ | 12 | 32 | auto, content max 1280 |

Design and test at 360 × 740 first. That's the client on a phone in a parking lot, and it's the size the proof must be unmistakable at.

Page templates:

- **Marketing:** 12 columns, max content 1200. Two-column sections split 5 / 7 or 6 / 6. Prose columns never exceed 7 columns.
- **Filing desk and dashboard:** left navigation 248 px on md and up, content max 1040, one-column forms max 640.
- **Client pages and the proof:** a single column, max 680, centered. No sidebars, ever.
- **Docs:** navigation 260, content 720, code panel 440 (lg and up); code drops inline below md.

### 6.2 Spacing

A 4-based scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.

- Section padding on the marketing site: 96 top and bottom on desktop, 56 on mobile.
- Between a heading and its lede: 16. Lede to content: 32.
- Form fields: 20 between fields, 32 between groups.
- Touch targets: 44 × 44 minimum everywhere, 48 on client pages, 56 for the proof's decision buttons.

### 6.3 Radii

| Token | Value | Use |
|---|---|---|
| `--r-sheet` | 2 | The proof and any "paper" (it's a sheet, not an app card) |
| `--r-chip` | 6 | Status and coverage chips |
| `--r-control` | 8 | Buttons, fields, select menus |
| `--r-card` | 12 | Panels, cards, popovers |
| `--r-pill` | 999 | Segmented toggles only |

### 6.4 Elevation

| Level | Light value | Use |
|---|---|---|
| e0 | none | Most things |
| e1 | `0 0 0 1px rgba(21,25,31,.07), 0 1px 2px rgba(21,25,31,.06)` | Cards, tables |
| e2 | `0 4px 12px -4px rgba(21,25,31,.14), 0 0 0 1px rgba(21,25,31,.06)` | Popovers, menus, toasts |
| e3 "sheet on the desk" | `0 1px 1px rgba(21,25,31,.05), 0 18px 40px -22px rgba(21,25,31,.35)` | The proof sheet, on marketing only |
| e4 | `0 24px 64px -16px rgba(21,25,31,.40)` | Dialogs |

In dark mode, shadows are dropped below e3; surfaces separate by lightness (`--sheet` against `--paper`) and a 1 px `--rule` edge.

---

## 7. Imagery

**The product is the hero image.** In B2B tests I've run, a sharp, real product view beats lifestyle photography for sign-up intent almost every time, and for this buyer a stock handshake is a red flag. So the hierarchy is: real interface first, line illustration second, photography last.

| Kind | What | Commission from (by kind) |
|---|---|---|
| Product renders | The sample proof, the rehearsal log, the text-to-draft sequence, the coverage strip, rendered from the real components with the test details on the home page. Never screenshots of real filings. | Built in-house from the component library; final polish by an interactive motion studio |
| Pencil illustration | Single-weight line drawings in `--pencil-line`, 1.5 px at 1×: empty states, setup steps, 404 and error, email headers. Subjects: sheets, crop marks, a registration ring, an envelope, a stamp pad, a phone with a sheet on it. No people, no mascots. | A technical illustrator who works in single-weight line (architectural or patent-drawing tradition) |
| Photography | Close-ups only: hands holding a printed proof, a phone held at a kitchen table, a stack of state documents in a folder. Real offices in New York, New Jersey and Florida. No faces presented as customers, no captions suggesting anyone pictured uses CoFile. | A documentary or editorial photographer used to small-business settings, with model releases |
| Data visuals | The coverage control strip (8.11), the fee check diagram ("Checked twice"), the filing timeline | In-house, from tokens |
| 3D | None. It fights the paper metaphor and the page-weight budget. | |

**Social proof without fake proof.** We have no customers to quote yet and we won't invent any. The persuasive assets are evidence: the rehearsal log, the coverage table with honest labels, "the catch", and the security blocks. Designed with the same care a logo bar usually gets.

---

## 8. Motion and interaction

### 8.1 Principles

1. **Motion explains cause and effect.** A text message becomes a draft; a proof becomes a filing; a fee on the proof is matched to the state's screen. If an animation doesn't explain one of those, cut it.
2. **Motion never delays an action.** Every CTA is clickable from the first frame. No entrance animation on buttons.
3. **Play once, then stay still.** Signature sequences run once per session when they enter the viewport and rest in their final state. No loops anywhere on the site.
4. **Pencil draws, ink appears.** Guide lines and callouts draw on (stroke animation). Filing content fades in. That's the layer rule, in motion.

### 8.2 Tokens

| Token | Duration | Easing | Use |
|---|---|---|---|
| `--t-instant` | 80 ms | linear | Pressed states, checkbox ticks |
| `--t-quick` | 140 ms | `cubic-bezier(.2,0,0,1)` | Hover, focus, chip changes |
| `--t-base` | 220 ms | `cubic-bezier(.2,0,0,1)` | Popovers, menus, disclosure open |
| `--t-sheet` | 320 ms | enter `cubic-bezier(0,0,.2,1)`, exit `cubic-bezier(.4,0,1,1)` | Sheets, dialogs, toasts |
| `--t-pencil` | 400 ms per stroke | `cubic-bezier(.65,0,.35,1)` | Leader lines, crop marks drawing on |
| `--t-story` | 600 to 900 ms total | sequenced | Signature moments |
| Stamp spring | about 180 ms | stiffness 420, damping 32 | The hold mark landing |

### 8.3 Signature moments

| Moment | Where | Sequence |
|---|---|---|
| **The press check** | Home hero | The sheet rises 12 px and fades in (320 ms). Pencil crop marks draw at its corners (400 ms). Callouts 1 to 4 draw in, 120 ms apart. Total under 1.3 s; text and CTAs are static. |
| **Callout to check** | Hero and the "proof" section | Tapping a callout draws a pencil leader to a note holding the matching check from the list (8.6). The matching rows on the sheet get `--pencil-wash`. |
| **Text to draft** | "Clients don't fill in forms" | The phrases "me and my sister, 50/50" and "in Jersey City" underline in pencil (300 ms each), then the drafted rows "Members" and "Main business address" fade in beside the arrow line. |
| **Checked twice** | "Checked twice. Filed once." | Two fee figures, the proof's "Total to the state $103.50" and the log row "Payment: $100.00 + $3.50 NJ portal fee", slide toward each other and a single tick lands between them ("matches the proof"). |
| **The planned hold** | "Rehearse on the real stage" | Log rows appear one at a time, 350 ms apart. The last row, "Pay Now: held, on purpose", lands with the amber hold mark on the stamp spring. |
| **Live preview** | Setup, "Branding" | Color changes cross-fade at 140 ms; a contrast fix shows as a brief two-swatch split (your color, the color used) that settles in 220 ms. |

### 8.4 Reduced motion

With `prefers-reduced-motion: reduce`, every sequence renders its final state immediately, leader lines appear without drawing, the log shows all rows, cross-fades become instant, and smooth scrolling is off. The content is identical; only the motion goes. Tested as a first-class mode, not a fallback.

---

## 9. Components

### 9.1 Buttons

| Variant | Light | Use |
|---|---|---|
| Primary (go) | `--go` fill, white text, 8 radius | One per view: the action that moves things forward ("Run a free rehearsal", "Create account", "Send the proof to my client") |
| Secondary | `--sheet` fill, 1.5 px `--ink` border, ink text | The alternative ("See what your client sees", "Request changes") |
| Quiet | No border, ink text, underline on hover | Tertiary ("Log in" in the nav) |
| Destructive | `--sheet` fill, `--stop` border and text | "Turn off" a client link, revoking a key |

Sizes: large 56 (proof decisions, hero), default 48, small 36 (tables; 44 hit area kept with padding). Label 17 / 22 weight 640.

States: **hover** darkens to `--go-hover` (140 ms); **focus** adds the 3 px `--focus` ring, 2 px offset, always visible on keyboard focus; **pressed** shifts 1 px down with 80 ms; **disabled** 40% opacity with the cursor unchanged and a reason nearby (never a disabled button with no explanation); **loading** keeps the width, swaps the label for the existing pending label ("Creating…", "Sending…", "Saving…", "Opening Stripe…") with a 16 px ring spinner before it.

### 9.2 Fields

- Label above (16 / 22, weight 640), help text below (15 / 22, `--ink-2`), error below that in `--stop` with a stop glyph, linked by `aria-describedby`.
- Field: 48 tall, `--sheet`, 1 px `--field-edge`, 8 radius. Focus: 2 px `--focus` border plus ring. Error: 2 px `--stop` border.
- The required marker "*" is explained once at the top of each form with the existing "Fields marked * are required."
- **Paired fields** sit two up on md and up (first and last name, city and ZIP), stacked below. Pairs never split across a fold.
- **"Same as" chips** sit directly under an address or person label: pill-shaped 32 tall secondary chips naming the person or address already entered. Choosing one fills and visually links the fields with a pencil left rule; editing any linked field breaks the link with a 140 ms fade.
- **Folded optional questions** use the existing "More options (optional)" disclosure: a full-width row with a chevron, 48 tall, `--wash` when open.

### 9.3 The proof card

The same anatomy at three sizes: the hero sample (marketing), the live preview (signup, setup), and the real proof page (section 10.4).

```
┌──────────────────────────────────────────────┐ ← 4 px rule in the firm's accent
│ [logo] Harbor & Pine CPA      example firm   │   brand bar 56
├──────────────────────────────────────────────┤
│ Two Sisters Bakery LLC          [▌▌Rehearsal]│   H (display 26/32)
│ New Jersey LLC formation. Please approve by  │
│ Dec 3, 5:00 PM Eastern.                      │
│ ①  Business name   TWO SISTERS BAKERY LLC    │   values in Mono, highlighted
│    Members         Ana Ortiz, Lucia Ortiz    │   rows get --pencil-wash
│                    (50/50)                   │
│    Main business   88 Grove St, Jersey City  │
│    address         NJ 07302                  │
│ ②  Formation filing fee            $100.00   │   decimal-aligned
│    NJ portal fee, by card            $3.50   │
│    Total to the state              $103.50   │   Mono 600
│ ③ ┌ New Jersey's own review page, filled in ┐│   white plate, crop marks
│   │ Business Name   TWO SISTERS BAKERY      ││
│   │ Designator      LLC                     ││
│   └─────────────────────────────────────────┘│
│ ④ [ Approve for filing ]                     │
│   Nothing is submitted or paid until you     │
│   approve.                                   │
└──────────────────────────────────────────────┘
  Sample proof · test details · not a real business
```

Sheet radius 2, e3 shadow on marketing, e1 inside the app. Callout numerals are Proof Marks glyphs in pencil, 28 px circles, sitting in a 40 px left gutter outside the content so they never overlap filing details.

### 9.4 Status chips

Height 28, radius 6, 15 / 20 weight 600, glyph 14 px left of the label. Labels are exactly those in `web/lib/status.ts`.

| Family | Look | Glyph | Statuses |
|---|---|---|---|
| Go | `--go-wash`, `--go-ink` | tick | "Approved", "EIN issued", "Submitted to the state", "Accepted by the state", "Completed" |
| Hold | `--hold-wash`, `--hold` | two bars | "Waiting for approval", "Needs information", "Changes requested", "On hold", "Paused: state site changed", "Name unavailable", "Being checked" |
| Stop | `--stop-wash`, stop ink | octagon with a bar | "Needs correcting", "Rejected by the state", "Failed", "Stopped" |
| Neutral | `--neutral-wash`, `--ink-2` | ring | "Received", "Getting the state's review page", "Queued", "Final check" |
| Working | neutral, ring glyph rotates 1.2 s linear (static under reduced motion) | rotating ring | "Filing now" |

A "Rehearsal" badge sits next to the status chip on any rehearsal filing: hold styling with the two-bar glyph, so the planned hold and the rehearsal share one visual.

### 9.5 Timeline

Vertical on mobile, a horizontal rail on md and up. Nodes are 16 px rings; past nodes fill with their family color and glyph; the current node gets a 4 px halo; future nodes are `--rule` outlines. Labels come from the status list, in order: "Received" → "Getting the state's review page" → "Waiting for approval" → "Approved" → "Filing now" → "Submitted to the state" → "Accepted by the state" → "Completed", plus "EIN issued" where the filing includes one. A rehearsal's rail ends in an amber hold node; a stop ends the rail in a stop node with the reason from `nextStep()` beneath it.

### 9.6 Tables

Row height 52 (44 compact in the dashboard), 16 / 24 text, `--rule` separators, no zebra striping, sticky header on scroll, right-aligned numbers. On xs, tables with more than three columns become stacked cards: the first column as the card title, the rest as label and value pairs. Sorting arrows use Proof Marks glyphs with `aria-sort`.

### 9.7 Navigation

- **Marketing:** 64 px bar, sticky, shrinking to 56 after 80 px of scroll. Mark, then "How it works", "For firms", "What we file", "For platforms", then "Log in" (quiet) and "Run a free rehearsal" (primary). On xs: mark, the primary CTA in its small size and a menu button ([copy: C7] for its accessible name).
- **Filing desk:** left rail on md and up, in this order: "Filings", "New filing", "Ready to pay", "Client links", "Signatures", "Setup", "Billing". "Ready to pay" carries a count badge (an ink circle with a white numeral) when filings are waiting. On xs, a top bar with the firm's logo and a slide-over menu; "New filing" becomes a 56 px floating go button, bottom right, clear of the safe area.
- **Dashboard:** the same rail pattern, CoFile-branded, denser.

### 9.8 Banners and notices

- **Beta notice:** a 40 px strip above the nav, `--wash`, with an outlined "Beta" tag in ink and the existing sentence in 15 / 22. It scrolls away with the page; it's never sticky and never dismissible. On white-label pages it uses the neutral wording ("This service is in beta."). No beta strip in the embed.
- **Inline notices:** a 4 px left rule plus glyph in the family color, a wash background, text in ink. `warn` uses hold, `bad` uses stop, `ok` uses go. Notices that ask for an action end with their existing link ("Pay and file", "Subscribe").

### 9.9 Empty states

A pencil illustration (120 px), the existing sentence, and the existing actions. For example, the desk with no filings: illustration of a clean sheet with crop marks, "Your desk is clear. Start a filing (it can be a free rehearsal), or send a client a link with your logo on it.", then "New filing" (primary) and "Send a client a link" (secondary).

### 9.10 Toasts

Bottom left on md and up, bottom center on xs above the safe area. 320 to 400 px wide, e2, `--sheet`, glyph plus text, `role="status"`. Confirmations auto-dismiss after 5 s (paused on hover or focus). **Errors never toast:** they stay inline beside what failed until fixed.

### 9.11 The coverage table and control strip

Above the table, a **control strip**, borrowed from the color bar printed on the edge of every press sheet: 16 squares, one per filing type, in table order, each showing its stage glyph and color. It answers "how much is live?" at a glance and it can't be misread, because "Live" is the only solid green square and today there may be none. The legend uses the stage labels exactly.

| Stage label | Chip | Glyph |
|---|---|---|
| "Live" | **Solid `--go`, white text: the only solid chip on the whole site** | filled tick |
| "Rehearsed to the payment screen" | `--hold-wash`, hold text | two bars |
| "Screens recorded, rehearsal next" | neutral outline | half-filled ring |
| "Offered, not yet rehearsed" | neutral outline | empty ring |
| "Planned" | dashed outline, `--ink-3` | dotted ring |

The glyphs form an ordinal progression (dotted ring, empty ring, half ring, bars, solid tick), so the stage order reads without color. Table: "Filing", "Where", "Where it stands", grouped by stage under a quiet group rule, with filter chips for "New York", "New Jersey", "Florida" and "IRS". On xs, each row becomes a card: filing name, state and chip.

### 9.12 Choice controls

| Control | Spec |
|---|---|
| Checkbox | 22 px box, 2 px `--field-edge`, 4 radius, inside a 44 px hit row that includes the label. Checked: `--ink` fill with a white tick (not green: checking a box is not "go"). Focus: the 3 px ring around the box. Error: `--stop` edge plus the message below the row. Never pre-checked unless the copy defines a default. |
| Radio | 22 px circle, 2 px edge; selected is a 10 px ink dot. Groups stack vertically; a row of two is allowed for yes/no questions only. |
| Yes/no question | Two 48 px segmented buttons in one control, so a yes/no answer is a single tap on a phone. Selected segment: ink fill, white text. |
| Select | Native `select` on touch devices, always. On desktop, the native control styled to 48 px with a Proof Marks chevron. No custom comboboxes for short lists. |
| State and type pickers | Cards, not selects (10.3). 2 px `--field-edge` at rest, 2 px `--ink` on hover, the focus ring on focus, selected cards with an ink left rule. |
| "States you file in" | A row of three checkbox chips (48 px tall), wrapping on xs. |

### 9.13 Code fields

Two codes matter: the card's security code on Ready to pay and the one-time code on the proof.

- One single input, never split into per-digit boxes (they break paste, autofill and screen readers). Mono 24 / 30, letter-spacing 0.2 em, width sized to the code length plus 2 characters.
- Security code: `inputmode="numeric"`, `autocomplete="cc-csc"`, max 4. One-time code: `autocomplete="one-time-code"` so phones offer the code from the text message.
- The one-hour rule sits beside the security-code field in `--ink-2`, not under a link.
- Wrong code: the field gets the stop edge and the existing message, and the field keeps focus with the value selected so retyping replaces it.

### 9.14 Uploads

| Upload | Where | Spec |
|---|---|---|
| Logo | Branding | A 160 px tall drop zone with a pencil dashed border; drag, browse or paste. After upload: the trimmed logo on light and dark plates side by side, so the firm sees both before saving. |
| Font | Branding | A compact drop row under the presets, accepting the formats and size the help text names. After upload: a specimen line rendered in the font, plus the result of the checks in 11.3. |
| PDF documents | New York Application for Authority | A file row per document with name, size and page count once read; a stop notice if the file isn't a readable PDF or is over the limit. |
| Signature | Signatures | A sheet with three modes (draw on a 3:1 pad with a baseline, type in a script preset, upload an image); preview on a white plate at the size it will appear on the form. |

All uploads show progress as a thin bar along the bottom of the row (indeterminate under 300 ms, then determinate). Errors stay inline.

### 9.15 Copyable values

Client links, firm page URLs, the widget snippet, API keys and webhook secrets share one component: a Mono value in a `--wash` field (read-only, selectable), a copy button at the right with its existing label where one exists ("Copy link"), and on success a 140 ms swap of the button's glyph to a tick for 2 s, announced through a polite live region. Secrets show once, in full, then only their prefix.

### 9.16 The run log

The home page's rehearsal log and the filing detail's "Progress on the state site" are one component.

```
┌ Rehearsal · New Jersey LLC formation            test details ┐  header: Mono 15/22, ink-2
│ Business name                                        filled   │  rows: Mono 16/24
│ Name check                                           passed   │  result right-aligned
│ Registered agent                                     filled   │
│ Members and signatures                               filled   │
│ Review page                               matched the proof   │  "matched" results in go-ink
│ Payment: $100.00 + $3.50 NJ portal fee    matches the proof   │
│ Pay Now                                ▌▌ held, on purpose    │  hold: amber glyph + hold text
└───────────────────────────────────────────────────────────────┘
```

On marketing it sits on the ink band with inverted tokens; in the desk it's a `--sheet` card. Rows can expand (desk only) to show the captured screen for that step, on a white plate. A stop row uses the stop glyph and text and ends the log. Rows are a real list (`ol`), so a screen reader hears them in order.

### 9.17 The fee table

Used on the sample proof, the real proof, the type cards' fee note, Ready to pay and Billing. Label column left in body text; amount column right-aligned in Mono with tabular figures; the total row separated by a 2 px ink rule above, bold Mono at the fee-total size. A "Maximum you authorize" row, when present, sits under the total with its parenthetical in `--ink-2`. Never more than one total. No currency symbols in the label column.

### 9.18 Popovers, callout notes and dialogs

- **Callout notes** (the sample proof's 1 to 4, setup tips): a `--pencil-wash` note, 280 to 340 px wide, 12 radius, with a pencil leader line to its numeral. Opened by tap, click or Enter; closed by Escape, a second tap or tapping elsewhere. One open at a time. Never opened on hover alone, because hover doesn't exist on phones and surprises desktop readers.
- **Tooltips:** only for an existing `title` text (such as the Rehearsal badge's "Runs on the state's real website and stops before the last button: nothing is filed or paid"). Shown on hover after 400 ms and on focus immediately; also reachable by tapping the badge on touch devices, where it opens as a callout note.
- **Dialogs:** used only for destructive confirmations the product already has (revoking a key, turning off a link if confirmation is added). 480 px max, e4, focus trapped, Escape closes, the destructive action on the right in destructive style. No dialogs on the client's path, and never a dialog on the proof.

### 9.19 Loading

- Under 300 ms: show nothing new. 300 ms to 2 s: skeleton rows in `--wash` with a 1.4 s shimmer (static under reduced motion). Over 2 s: the skeleton stays and a one-line status appears where the product already has one ("Getting the state's review page").
- Buttons in flight keep their width and show their existing pending label (9.1).
- A filing that's running ("Filing now") updates its timeline and log every 5 s over a server event stream, without moving the page; new log rows fade in at 140 ms.

### 9.20 State matrix

Every interactive component ships with these states designed and in Storybook, in light and dark and under three torture-set brands:

| State | Buttons | Fields | Chips | Cards (pickers) | Rows (tables) |
|---|---|---|---|---|---|
| Rest | ✓ | ✓ | ✓ | ✓ | ✓ |
| Hover | darken 1 step | edge to ink-2 | none | ink edge | `--wash` |
| Focus | 3 px ring | 2 px focus edge + ring | ring (when a link) | ring | ring on the first cell |
| Pressed or selected | 1 px down | n/a | n/a | ink left rule | n/a |
| Disabled | 40% + nearby reason | `--wash` fill, ink-3 text | n/a | 40% + reason | n/a |
| Loading | pending label + spinner | n/a | working glyph | skeleton | skeleton |
| Error | n/a | stop edge + message | stop family | stop edge + message | stop chip in row |
| Success | toast or inline notice | tick at the right edge on blur (for formats like ZIP and email only) | go family | n/a | go chip in row |

---

## 10. Page by page

### 10.1 Home (`/`)

The locked order is the shipped order (it's the control for every test in section 14). I group the thirteen sections into four invisible "acts" that set the background bands and rhythm. Acts never print a label.

| Act | Sections | Band | CTA at the end |
|---|---|---|---|
| I. What your client sees | 1 Hero, 2 Process, 3 The proof | paper, wash, paper | "Run a free rehearsal" after section 3 |
| II. What your firm gets | 4 Firms, 5 Requests, 6 Checks, 7 After | wash, paper, wash, paper | none |
| III. The honest beta | 8 Rehearsals, 9 Coverage, 10 The catch | ink band (dark), paper, wash | "Run a free rehearsal" after the log |
| IV. For the careful and the technical | 11 Security, 12 Enterprise | paper, wash | the inquiry form |
| Close | 13 | paper with the sheet | "Run a free rehearsal" |

Repeating the CTA reuses the locked label exactly; I add no new buttons. On xs, a 64 px sticky bottom bar with "Run a free rehearsal" appears once the hero CTA scrolls out of view, and hides while the enterprise form or the closing CTA is on screen so it never competes with them.

**1. Hero.** Desktop 6 / 6 split. Left: the kicker in pencil, the H1 at display size, the sub, CTAs, the beta note. Right: the sample proof sheet (9.3) with its caption.

```
┌ Beta │ CoFile is in beta. Any filing can run as a free rehearsal on the state's real website… ┐
│ ◉ CoFile   How it works  For firms  What we file  For platforms      Log in  [Run a free rehearsal] │
├──────────────────────────────────────────┬────────────────────────────────────────┤
│ For CPA, payroll, fractional CFO and     │  ┌ ┐                                ┌ ┐ │
│ title firms                              │   Harbor & Pine CPA    example firm     │
│                                          │ ① Two Sisters Bakery LLC  [▌▌Rehearsal] │
│ Your client approves the                 │   …                                     │
│ proof. Then CoFile files it.             │ ② …  Total to the state      $103.50    │
│                                          │ ③ New Jersey's own review page, …       │
│ CoFile fills in your clients' LLC and …  │ ④ [Approve for filing]                  │
│                                          │  └ ┘                                └ ┘ │
│ [Run a free rehearsal]  [See what your client sees]                               │
│ In beta. A rehearsal fills in every screen of the state's real website and stops   │
│ before the last button…                  │  Sample proof · test details · not a real business │
```

On xs the order is kicker, H1 (38 / 42), sub, both CTAs full width, beta note, then the sheet at full width. The beta note always sits directly under the CTA it qualifies. "See what your client sees" scrolls to section 3 (smooth, 600 ms, off under reduced motion) and focuses its heading.

**2. Process.** "You start it. Your client approves it. CoFile files it." Three cards in a row with large numerals 1, 2, 3; the middle card ("Your client approves it.") is a raised sheet with crop marks and the others are flat. That's the lede ("your client is in charge of the middle one") said visually.

**3. The proof.** The biggest section. Desktop: the sheet pinned on the left (sticky, 7 columns) while the six checks scroll on the right. As each check reaches the reading line, the matching part of the sheet highlights in pencil wash: check 1 to callout 1 rows, check 2 to fees, check 3 to the state's page, check 4 to the consent line under the button, check 5 to the button. The sixth, "For CPAs: it does for a business filing what the 8879 does for a return.", is set apart as a pull line at H3 size with a pencil rule, because that sentence is the one that makes a CPA nod. On xs, the sheet comes first, then the checks as a list with the ticks.

**4. Firms.** Split 5 / 7. Right side: a picture of the co-branding: the brand bar of a filing desk with "Harbor & Pine CPA" large and "with ◉ CoFile" small at the end, with pencil dimension lines showing the size difference. The heading says it; the image measures it.

**5. Requests.** The bubble ("Need an LLC for the bakery…", "Ana Ortiz · text message · example") on a neutral phone-message shape (not any real messaging app's style), the pencil arrow line ("↳ read into a drafted New Jersey LLC formation for your team to check"), then the drafted rows (8.3).

**6. Checks.** Lede left, list right; above the list, the fee check diagram from 8.3.

**7. After.** List on the right; on the left a pencil drawing of a filing record: a folder holding a state document, the EIN letter and the approved proof, in the order of the three list items.

**8. Rehearsals.** An ink band (dark section in both themes) to mark the act. The log is a "console" card in Mono, one row per entry from the page's log, with "Pay Now" and "held, on purpose" in hold amber and the stamp landing at the end. Under it, the existing note ("13 screens of New Jersey's own LLC form…"). The CTA follows directly: this is the moment a skeptical CPA is most ready to try it.

**9. Coverage.** H2, lede, control strip, filter chips, table, footnote with the `mailto` link. Live status per type comes from the deployment switch exactly as today. Signed-in visitors see a small ink note linking to their desk's "New filing", where live status is per account [copy: C5].

**10. The catch.** Typeset like an errata slip: five large numerals (40 px, pencil) in a left column, each point in body size on the right, a thin rule between them, on `--wash`. Not small print. For this buyer, this section converts.

**11. Security.** Five blocks in a 3 + 2 grid (stacked on xs), each with a 32 px pencil line icon (a masked number, a vault door, a single-use link, a signature with a lock, two separate folders) and the H3 and paragraph as written.

**12. Enterprise.** Split 6 / 6: heading, lede and list left, the inquiry form right on a sheet. "Read the API docs" is styled as a secondary button below the list (same words, more weight), since developers scan for it. The `"dryRun": true` code sits in a Mono inline chip.

**13. Close.** Centered, max 760: H2, lede, the CTA with "Questions first? hello@cofile.app" beside it, then the sheet shown small and the tagline with the Register mark: "◉ Approve the proof. Then it's filed."

**Footer:** "CoFile · the filing desk behind your firm" and "New York · New Jersey · Florida · IRS" on one line; the legal line ("CoFile is not a law firm or a government agency…") and "Terms · Privacy · Security · hello@cofile.app" below at 15 px, `--ink-2`.

### 10.2 Sign-up and account pages

**`/signup`.** Two columns on md and up: form (7 columns), live sample proof (5 columns, sticky). On top, a path rail made only of existing strings, so the visitor sees where "Run a free rehearsal" leads:

```
 ● Create account ── ○ Confirm your email ── ○ Your firm ── ○ Branding ── ○ Run a free rehearsal
┌───────────────────────────────────────────┬──────────────────────────────┐
│ For firms                                 │  ┌ [Firm name as typed]  ex ┐│
│ Set up your firm's filing desk            │  │ Two Sisters Bakery LLC    ││
│ For firms that file for their clients. …  │  │ …                         ││
│                                           │  └───────────────────────────┘│
│ Firm name             [________________]  │  Sample proof · test details ·│
│ Your name [_______]   Work email [______] │  not a real business          │
│ Password  [_______]   Password again [___]│                               │
│ At least 12 characters. A short sentence works well.                      │
│ ───────────────────────────────────────── │                               │
│ Kind of firm [Choose one ▾]  Filings per month [Under 10 ▾]               │
│ States you file in  ☐ New York ☐ New Jersey ☐ Florida                     │
│ Phone (optional) [____]  Website (optional) [https://]                    │
│ ☐ I agree to the Terms of Service and the Privacy Policy.                 │
│ [ Create account ]                                                        │
│ Your account opens as soon as you confirm your email. Already have one? Log in. │
│ Building a filing product? See CoFile for platforms.                      │
```

The order changes, the words don't: account fields first, then the firm questions after a quiet rule, optional fields visually lighter. The proof's firm bar shows what's typed in "Firm name" after 300 ms of idle (the "example firm" tag stays, the caption stays). On xs, the proof collapses into a 56 px strip above the form showing only the firm bar with the typed name. Validation is on blur, never on each keystroke; the errors are the existing ones.

**`/signup/sent`.** One sheet card, "Your filing desk" label, "Check your email", the existing paragraph (open or review wording). Beside it, an illustration of an envelope whose subject line reads the real subject, "Confirm your email for CoFile", so people know what to search for. The small proof with their firm name sits below.

**`/verify-email`, `/login`, `/forgot-password`, `/reset-password`.** One template: a 480 px sheet card centered on `--paper`, label, H2, lede, form, help line. Login puts "Continue with Google" first as a full-width secondary button with the Google mark per Google's rules, then the email form, then "New here? Set up your firm's filing desk." Notices ("Your session ended. Log in again to carry on.", "Your account is ready. Log in to set it up.") sit above the form as inline notices in go or neutral. Google error messages are stop or hold notices with `role="alert"`.

**`/invite-expired`, `/join/<token>`.** Same card. An invitation that works shows the inviting firm's logo above the card. An expired one: "This link has expired or isn't valid", the existing sentence, no dead end: "Log in" as a quiet link [copy: C6].

**`/terms`, `/privacy`.** A reading layout: 68-character measure, 18 / 30 body, sticky table of contents on lg built from the headings, the version and date in Mono at the top, a print stylesheet (no nav, black on white, URLs printed after links).

**404 and error.** The nav stays. A pencil drawing of an empty sheet with crop marks, the H1, the sentence, one button: "Page not found", "The link may be old or mistyped.", "Go to the home page"; "Something went wrong", "This page couldn't load just now. It's usually a short hiccup on our side." On firm-branded routes, the same page wears the firm's brand bar.

### 10.3 Partner filing desk (`/p/<slug>`)

The desk is co-branded: the firm's logo and name lead the top bar, the firm's accent colors its 4 px top rule and selected navigation item, and status colors stay ours.

**Setup.** The single most important activation page. A vertical stepper on the left, the proof that follows you on the right.

```
 Set up your account
 Three short steps, plus registered agents if you want them. You can change any of them later.
┌──────────────────────────────────────┬──────────────────────────────┐
│ ✓ Your firm                 [Change] │  ┌ [your logo] Your Firm ───┐│
│ ● Branding           [Set up branding]│  │ Two Sisters Bakery LLC   ││
│ ○ Payment             [Set up payment]│  │ … [Approve for filing]   ││
│ ┌ Registered agents (optional) ────┐ │  └──────────────────────────┘│
│ │ Save the agent you use in each … │ │                              │
│ │ [Add agents]                     │ │                              │
│ └──────────────────────────────────┘ │                              │
│ [Start a filing]                      │                              │
```

My sequencing change: "Start a filing" appears as soon as "Your firm" and "Branding" are done, not after "Payment", because a rehearsal pays nothing. Payment stays in the list and becomes required before the first live filing (Appendix A1). Each step page shows "Step 1 of 3" and so on as a small label with a 3-segment progress bar.

- **Your firm:** the details form in two-up pairs; "Services you offer your clients" as a checklist grouped by state, each with its coverage chip so the firm sees what will rehearse.
- **Branding:** controls left (web address, name your clients see, logo drop zone, "Main color", "Second color", font presets as live-rendered sample tiles, upload, support email), the preview right: the proof, then the intake form header, then a client email header, stacked. Contrast fixes run live (section 11) and show as a two-swatch split. "Save and continue" is the primary button.
- **Registered agents:** one card per state offered, the agent fields paired, "Same as" between states.
- **Payment:** the existing explanation as the lede, saved cards as card-shaped rows (brand mark, "ending 4242", routing), the card vault's own embedded fields, then routing per filing type in a simple table.

**Filings (home).** Title row with "New filing" (primary). Notices stack in priority order: ready to pay, needs action, subscription. Then the table ("Filing", "Type", "Status", "Started") with the status chip and the Rehearsal badge. Empty: section 9.9.

**New filing.** Three steps on one route, each a full page with a back link.

1. State: three large cards ("New York", "New Jersey", "Florida") with the existing count labels. The email, text and Slack ways sit beneath as a quiet panel.
2. Type: cards sorted Live first, then rehearsed types, then the rest, each with its chip ("Live" solid green, or the amber "Rehearsal" with the existing tooltip), summary and fee note. Sorting by readiness is presentation, and it steers first rehearsals toward types that run all the way to the payment screen.
3. Form: the page opens with the three ways to start, as three equal cards in a row (stacked on xs): "Send them a link", "Start from a client you filed for before" and "New client", with "Fill in" as the action on the last. Under them, "Nothing is filed until your client approves the proof." in `--ink-2`. The form itself is one column, max 640, sections with paired fields, "Same as" chips, folded optional sections. On lg, a sticky right rail shows **the proof assembling as they type**: each answered field appears on a mini sheet in ink, unanswered required ones as pencil placeholders, and the fees fill in from the verified fee table as soon as the type and options are known. The submit button keeps its label, "Send the proof to my client".

```
 ← Other filings
 New York LLC formation                                  [▌▌ Rehearsal]
┌──────────────────┬───────────────────────────┬─────────────────┐
│ Send them a link │ Start from a client you   │ New client      │
│                  │ filed for before          │ [Fill in]       │
└──────────────────┴───────────────────────────┴─────────────────┘
 Nothing is filed until your client approves the proof.
┌──────────────────────────────────────────────┬──────────────────┐
│ Fields marked * are required.                │  mini proof      │ sticky, 320 wide
│ Filing contact                               │  ┌ your logo ──┐ │
│ The person the filing company and the state  │  │ Name  ░░░░░ │ │ pencil placeholders
│ contact about this filing. …                 │  │ Members ░░░ │ │
│ First name* [_______]  Last name* [_______]  │  │ Fees  $200… │ │ fills as typed
│ Email* [__________]    Phone* [__________]   │  └─────────────┘ │
│ ▸ More options (optional)                    │                  │
│ …                                            │                  │
│ [ Send the proof to my client ]              │                  │
└──────────────────────────────────────────────┴──────────────────┘
```

On a firm's **first** rehearsal, the contact fields are prefilled with the logged-in person's own name and email (the form already supports prefills), so the first proof comes to them and they experience the client side before risking a real client. The firm can overwrite it. Product to confirm that the contact email is where the proof is sent; if not, the same prefill applies to whichever field routes the proof.

**The first rehearsal path (signature idea, step 5).** This is the end of the funnel, so it's designed as one continuous path rather than separate pages:

| Moment | What the firm sees | Design |
|---|---|---|
| Empty desk | "Your desk is clear. Start a filing (it can be a free rehearsal)…" | Empty state with "New filing" as the primary action |
| Choosing | State cards, then type cards sorted by readiness | Types "Rehearsed to the payment screen" carry the hold chip and come first after any live ones |
| Filling | The form with the mini proof growing in the rail | Their logo is already on it from Branding |
| Sent | The filing detail, timeline at "Waiting for approval" | A neutral notice pointing to their own inbox; the approval email arrives in their brand |
| Approving | The real proof on their phone, with "Rehearsal: nothing will be filed or paid, even if you approve." | Exactly the page their client will get |
| Running | Filing detail, timeline at "Filing now", the log filling row by row | Same log as the home page, live |
| Held | The log's last row "held, on purpose" with the hold stamp | The rail ends in the amber hold node; this is the activation event |

**Your pages for clients.** On the type step, the existing "Your pages for clients" card lists each service's permanent page URL and its widget code. Each URL row uses the copyable value component (9.15) with an "open" glyph; the widget code sits in a Mono block with its own copy action, folded by default as today.

**Filing detail.** Header: title, status chip, Rehearsal badge. Then the timeline (9.5), the "Approved and ready to pay…" notice when relevant, "Link to the proof" with copy and open actions, "Documents" as file rows (state document, EIN letter) with type icons, and "Progress on the state site" rendered with **the same log component as the home page**: the promise and the product look identical. "Save to Google Docs" sits as a secondary action with its existing explanation.

```
 Two Sisters Bakery LLC   [◯ Filing now]  [▌▌ Rehearsal]
 ●───────●───────●───────◉───────○───────○
 Received  Waiting   Approved  Filing   …          horizontal rail on md+, vertical on xs
           for                 now
           approval
┌ Link to the proof ───────────────────────────┐ ┌ Documents ─────────────────┐
│ [https://api.cofile.app/approve/…  ] [copy]  │ │ (none yet)                 │
│ The signer's saved signature is placed on …  │ └────────────────────────────┘
└──────────────────────────────────────────────┘
┌ ▸ Progress on the state site (test run, running) ───────────────────────────┐
│ Business name                                                  filled       │  the run log, 9.16
│ Name check                                                     passed       │
│ …                                                                           │
└─────────────────────────────────────────────────────────────────────────────┘
 [Save to Google Docs]  A copy of this record in your Google account. …
```

On xs, the order is header, the action notice if any, the vertical timeline, the run log, the link, documents, Google Docs. What needs the reader's attention always comes before the record.

When a filing stops, the timeline ends in a stop node and the reason from `nextStep()` sits directly under it as a stop notice (for example "Something in the filing doesn't meet the state's rules. Start a corrected filing."), with the existing "New filing" action beside it as the primary button. A filing paused because the state's site changed ("Paused: state site changed") shows the hold family, not stop: nothing went wrong, CoFile stopped on purpose.

**Client links.** "Send a client a link", the form ("Filing", "Who it's for (shown to you and the client)", "Make link"), then the result card with "Copy link" and "Email it from your mail app". The "Links you sent" table uses neutral chips for "Waiting for the client", go for "Used", ink outline for "Turned off" and "Expired".

**From email.** Split view: the original message on the left in a quoted, neutral card ("From …"), the draft on the right with "This looks like a request for:" and "Open the filled-in form". Phrases the AI read are underlined in pencil on the left and the matching fields marked in pencil on the right, the text-to-draft animation from the home page, now real.

**Signatures.** "Saved signatures" as cards showing the signature image on a white plate, the signer and the consent version; "Add a signature" opens a sheet with draw, type or upload. Empty: "No saved signatures yet."

**Ready to pay.** Grouped by card: a card row ("ending 4242"), the filings waiting under it with totals in Mono, one security-code field (9.13) and the go button. The one-hour rule sits next to the field, not in the footer. Empty: "Nothing is waiting for a card right now."

```
 Ready to pay
 Approved filings that pay the state with a saved card wait here for the card's
 security code (the 3 or 4 digits on the card). Enter it once and every filing …
┌──────────────────────────────────────────────────────────────┐
│ ▭ [card label] ending 4242                                   │
│   Two Sisters Bakery LLC · New Jersey LLC formation  $103.50 │  each row links to the filing
│   …                                                          │
│   [ 4 2 · · ]  A card's security code can't be stored, so we │  code field + existing note
│                ask for it when filings are ready to pay. …   │
│   [ Pay and file ]                                           │
└──────────────────────────────────────────────────────────────┘
```

The page is the destination of the "Card security code needed" email, so it loads with the code field focused when there's exactly one card waiting. After the code is entered, each filing row's chip turns from hold to neutral ("Queued"), in place, so the person sees every filing go ahead without leaving the page. The go button is the existing "Pay and file" (pending label "Sending…").

**Billing.** A plan panel (status chip such as "No subscription yet" or "Waiting for the first payment"), "Real filings need an active subscription. Rehearsals are always free." as the panel's lede, then Stripe actions ("Manage billing"). Registered-agent renewals listed per business. No price appears until Stripe returns a real one.

**Password, signed out.** The account card template from 10.2, inside the desk frame. Signing out lands on `/login` with "Your session ended. Log in again to carry on."

### 10.4 Client-facing pages (firm's brand, CoFile nearly invisible)

**Intake (`/i/<token>`) and service pages (`/<firm>/<service>`, `/e/<tenant>/<firm>/<service>`).** One template, single column, max 680:

```
┌────────────────────────────────────────┐
│ [logo] Best Accounting    with ◉ CoFile│  brand bar
├────────────────────────────────────────┤
│ ▌▌ This page is in rehearsal for now…  │  hold notice, only when not live
│ New York LLC formation                 │  H1 = the filing type's title
│ After you send this, we'll email you a │
│ link to check and approve exactly …    │
│ Fields marked * are required.          │
│ [ form sections ]                      │
│ Next, you'll get a proof to check. …   │
│ [ Send to Best Accounting ]            │  firm action color, 56 tall
│ Terms of Service · Privacy Policy      │
│ Questions? Email …                     │
└────────────────────────────────────────┘
```

The neutral beta strip sits above the brand bar on these pages. Expired or used links: the brand bar, "This link has expired or isn't valid" / "This link can't be used" / "This filing is no longer offered", the existing sentence, the firm's support email as a link.

**Client form details.** These readers are often first-time founders on a phone, sometimes Spanish-first, sometimes older, so the client template is stricter than the desk's:

- Body 18 / 28, labels 17 / 24, fields 52 tall, one column at every width (paired fields stay paired only on sm and up).
- The rehearsal notice ("This page is in rehearsal for now. You can fill it in and see your proof, but nothing will be filed with the state and nothing will be charged, now or later, even after you approve it. To file for real, contact {firm}.") is a hold-wash band, full width, above the H1. It's the first thing read, by sight and by screen reader.
- Sections are numbered in the margin with pencil numerals, so a long legal form reads as a short sequence. Optional sections stay folded.
- Authorizations and declarations (first person, as decided) sit in their own bordered block with the checkbox at the top left of the text, never at the end of a long paragraph, and the text at 17 / 26 rather than small print. The filer definition ("{firm}, filing through CoFile") appears once above the first authorization, in `--ink-2`.
- The submit button names the firm ("Send to {firm}"), uses the firm's guarded action color and spans the column on xs.
- Progress is saved in the browser as they go (per device, encrypted with a key held in the session, cleared on submit), so a client interrupted by a phone call doesn't lose a formation's worth of answers. Social Security numbers, ITINs, signatures and authorization checkboxes are never saved on the device.

**Service pages as landing pages.** `/<firm>/<service>` pages are permanent and get shared, so they're designed as the firm's own small landing page: the firm's brand bar, the filing type's title as H1, the existing intro sentence, then the form. The page's social card is generated from the firm's brand: their logo on their tint, the filing type's title, "with CoFile" in micro at the bottom. Service pages can be indexed by search engines if the firm wants (a product setting); client links (`/i/…`) and the proof are always `noindex` and never cached by shared proxies. Canonical URLs use the firm's slug. Embedded and white-label variants (`/embed/…`, `/e/…`) use the same template minus the parts listed in 10.6.

**The proof (approval page at api.cofile.app).** The page where design matters most. Mobile first, max 680, 18 / 28 body.

```
┌──────────────────────────────────────┐
│ [logo] Harbor & Pine CPA  with ◉CoFile│
├──────────────────────────────────────┤
│ ▌▌ Rehearsal: nothing will be filed  │  only on rehearsals
│    or paid, even if you approve.     │
│ [Filing title]                       │  H1 26/32
│ Filing reference … Please decide by …│
│ ┌ By approving, you confirm every    ┐│  consent note, hold-free
│ │ detail below is correct …          ││  neutral sheet, ink left rule
│ └────────────────────────────────────┘│
│ The state's review page · Filing details · State fees │ sticky jump bar
│ The state's review page              │
│ ┌ ┐ [screenshot on a white plate] ┌ ┐│  tap to zoom, pinch allowed
│ Filing details                       │
│ Business name                        │  label above value on xs
│ TWO SISTERS BAKERY LLC               │  Mono 17/26
│ State fees                           │
│ Formation filing fee        $100.00  │
│ Total                       $103.50  │  Mono 24/30 600
│ Maximum you authorize …              │
│ ─────────────────────────────────────│
│ By approving, you confirm …(repeated)│  the consent sentence, again,
│ One-time code sent to you [______]   │  directly above the button
│ [ Approve, and authorize submission ]│  56 tall, full width, may wrap
│ [ and payment                       ]│  to two lines, centered
│ ─────────────────────────────────────│
│ What should change? (Needed only if  │
│ you ask for changes) [_____________] │
│ [ Request changes ]                  │  secondary, equal size
│ Questions: …                         │
└──────────────────────────────────────┘
```

Decisions and why:

- **The consent appears twice:** at the top (as today) and verbatim directly above the button, because consent belongs next to the act it governs.
- **The approve button is not sticky.** A sticky approve invites approving before reading. Instead, a sticky jump bar uses the page's own headings, so a reader always knows where they are.
- **Approve and Request changes are separated** by a rule and the comment box, so the two decisions can't be mis-tapped. Both are 56 tall; "Request changes" is never smaller, greyer or hidden.
- **The approve button uses the firm's action color** after contrast and collision checks (section 11). A firm whose brand is red gets its own dark ink, never red.
- **Filing details** show label above value on xs, two columns on sm and up. Masked SSNs show the existing sentence beside them.
- **After deciding,** the decision page keeps the brand bar, shows a large go tick or a neutral ring, the heading and paragraphs from `renderDecisionPage`, and nothing else. No upsell, ever.

**The proof's states.** Every one of these wears the firm's brand bar and the same 680 column. Today several of them are a bare paragraph with no branding at all, which is exactly when a nervous client needs to see their firm's name (Appendix A9).

| State | Heading and text (existing) | Design |
|---|---|---|
| Ready, rehearsal | The hold note "Rehearsal: nothing will be filed or paid, even if you approve." above the H1 | Full-width hold-wash band with the two-bar glyph, 18 / 28 bold, above everything except the brand bar. Not dismissible. |
| Ready, live | No rehearsal note | The consent note is the first block after the H1 |
| EIN in the run | "While filing, we'll get the EIN from the IRS and enter it on the state form. It's the only detail added after you approve." | Inside the consent note, as its own paragraph with a pencil "i" glyph |
| EIN after acceptance | "Once the state accepts this formation, we'll apply for its EIN with the IRS…" | Same treatment |
| SSN on the page | "Social Security numbers are masked on this page. We store them encrypted and delete them after 30 days." | Directly under the "Filing details" heading, with the masked-number glyph |
| Code required | "One-time code sent to you" | The code field (9.13) directly above the approve button |
| Wrong code | "That code didn't match. Go back, check the latest one-time code we sent you and try again." | Same page re-rendered with the field in error and the message under it, the rest of the page and any typed comment kept. Never a separate page that loses the reader's place. |
| Approved, rehearsal | "Approval recorded" / "Thank you. Your approval is recorded. This is a rehearsal, so nothing will be filed or paid." | Go tick, 64 px, then the heading and the paragraph |
| Approved, live | "Approval recorded" / "Thank you. Your approval is recorded. We'll submit the filing exactly as shown. If the state's page has changed by then, we stop before paying, and you may be asked to approve again. We'll email you when it's complete." | Same, with the sentence about stopping before paying kept in full: it's the honest part |
| Changes requested | "Thank you. Your change request is recorded, and nothing will be filed from this link. If the filing is corrected, you'll get a new link to approve." | Neutral ring, branded page, the comment they typed quoted back beneath in `--ink-2` |
| Already decided | "A decision was already recorded with this link, so there's nothing more to do here." | Neutral ring |
| Expired | "This link to the proof has expired. Ask whoever sent it for a new one." | Hold glyph; the firm's support email as a link below, from the brand |
| Not valid | "This link to the proof isn't valid. Ask whoever sent it for a new one." | Stop glyph; same support link |
| Decision couldn't be recorded | "We couldn't record your decision because this link has expired or was already used. Ask whoever sent it for a new link." | Stop glyph; same support link |

```
 Approved, rehearsal (xs)
┌──────────────────────────────────────┐
│ [logo] Harbor & Pine CPA  with ◉CoFile│
├──────────────────────────────────────┤
│                                      │
│              ( ✓ )                   │  64 px go tick, drawn on in 320 ms
│                                      │
│ Approval recorded                    │  H1 26/32
│ Thank you. Your approval is          │
│ recorded. This is a rehearsal, so    │
│ nothing will be filed or paid.       │
│                                      │
│ Questions: …                         │
└──────────────────────────────────────┘
```

**The state's review image on a phone.** A screenshot of a desktop state site is unreadable at 328 px. It's shown at full column width with crop marks, and a tap opens it full screen with pinch-zoom and a close button in the top right, 48 px. The page never depends on the image: every value on it is also in the "Filing details" table, which the existing alt text already says.

### 10.5 Enterprise dashboard (`/dashboard`)

CoFile-branded, denser (44 px rows, 15 / 22 tables), dark mode by default for developers if their system prefers it.

| Page | Layout |
|---|---|
| Overview ("CoFile dashboard") | Notices, then tiles: filings by status family (go, hold, stop, neutral counts), "Webhook deliveries" as a 14-day bar strip with failures in stop |
| API keys | Table: name, prefix in Mono (`cofile_` + 8), created, "Last used", revoke (destructive). A new key shows once in a Mono field with a copy action [copy: C8] |
| Webhooks | Endpoints table; per endpoint a delivery log with status codes, event names in Mono, retry |
| Filings, Firms, firm detail | Filterable tables; firm detail shows its desk branding preview and its filings |
| Setup | Three panels as on the page today: "Payment methods", "State portal logins" (NY DOS, NYS-100, NJ, IRS, FL, each a row with a sealed state and a connect action), "Who's named on your filings" |
| Ready to pay, Billing, Team, Password | Same components as the desk |
| Platform tenant only | "Sign-ups" with "Waiting for approval" and "Enterprise requests" tables, approve and decline per row; drift reviews as a queue with before and after screenshots side by side and the diff highlighted in pencil (10.9) |

```
┌──────────────┬──────────────────────────────────────────────────────────────┐
│ ◉ CoFile     │ CoFile dashboard                                             │
│              │ ▌ Real filings need an active subscription; rehearsals are …  │
│ Overview     │ ┌ Approved ─┐ ┌ Waiting ──┐ ┌ Stopped ──┐ ┌ In progress ┐     │ counts per family,
│ Filings      │ │ ✓  ··     │ │ ▌▌ ··     │ │ ⬣  ··     │ │ ◯  ··       │     │ each a link to the
│ Firms        │ └───────────┘ └───────────┘ └───────────┘ └─────────────┘     │ filtered Filings table
│ API keys     │ Webhook deliveries                                           │ tile labels: [copy: C12]
│ Webhooks     │ ▁▂▁▃▂▁▁▂▃▂▁▂▁▁  (14 days; failures in stop)                   │
│ Setup        │                                                              │
│ Ready to pay │ Filings (latest 10, same table as Filings)                   │
│ Billing      │                                                              │
│ Team         │                                                              │
│ Password     │                                                              │
│ ──────────── │                                                              │
│ Sign-ups     │ platform tenant only                                         │
└──────────────┴──────────────────────────────────────────────────────────────┘
```

**Setup in detail.** It's the enterprise's activation page, so it's ordered by what blocks a first filing: "State portal logins" first (each portal a row: NY DOS, NYS-100, NJ, IRS, FL, with a sealed or not-connected state, the existing "Not needed" or "Only for a prepaid Sunbiz E-file account." note where it applies, and a connect action that opens a sheet with the login fields), then "Who's named on your filings", then "Payment methods". A connected login shows only "sealed" with the date, never any part of the secret. When the account isn't configured yet, the existing notice ("Your account settings haven't been set up yet, so nothing here can be saved. We'll do that with you first.") sits at the top and every form below is shown read-only rather than hidden, so the buyer can see what's coming.

**API keys and webhooks in detail.** Keys show the readable prefix in Mono and never the secret after creation. Webhook endpoints show the last 50 deliveries with event name, HTTP status as a chip (2xx go, 4xx hold, 5xx and timeouts stop), duration and a resend action. Event names use the docs' names so a developer can search one from the other.

### 10.6 White-label and embed

`/e/<tenant>/<firm>/<service>` is the client template with the enterprise's brand and no co-brand mark. `/embed/…` (via `embed.js`) renders inside the host's page: no beta strip, no brand bar (the host page is the brand), transparent background option, auto-resize, the host's action color through the same guardrails, and "Filed with CoFile" in micro at the bottom. The embed inherits the host's light or dark scheme from a `data-theme` attribute.

### 10.7 Developer docs

The second reader. Same type and tokens, different density.

- **`/docs`:** left navigation with the guides ("Authentication", "Filings and the lifecycle", "Filing types, fields and state fees", "Approvals", "Webhooks", "Errors", "Saved signatures and PDF uploads", "White-label firm portal"), a 720 content column, a sticky dark code panel on lg. "Quick start" as four numbered steps. "Not every filing type is live yet" links to a docs copy of the coverage table, the same component.
- **`/docs/reference`:** 25 endpoints grouped by resource, each with method chip (Mono, neutral), path, parameters table, request and response examples in the code panel. `dryRun` is highlighted in hold amber wherever it appears, tying it to "rehearsal".
- **`/openapi.json`, `/llms.txt`, `/docs.md`:** linked in the docs header next to the existing "For your tools and AI agents:" line, each with a download icon. They're served raw; the design work is making them findable.

### 10.8 Emails

Two families on one 600 px template: client and firm-staff emails in the firm's brand; account emails in CoFile's.

```
 [firm logo, 32 tall]                     preheader = first body sentence
 ───────────── 4 px firm accent ─────────────
 Your proof is ready to approve: Two Sisters Bakery LLC      (H1 22/28)
 ▌▌ Rehearsal: nothing will be filed or paid, even if you approve.  (when a rehearsal)
 Your proof is ready. Open the link to see every detail …    (17/26)
 [ Open your proof ]                                         (48 tall, firm action color)
 ─────────────────────────────────────────────
 Questions: firm support email            with ◉ CoFile  (micro)
```

| Email | Subject (existing) | Button (existing) |
|---|---|---|
| Approval request | "Your proof is ready to approve: …" | "Open your proof" |
| Security code needed | "Card security code needed: …" | "Enter security code" (to Ready to pay) |
| Missing information | "More information needed: …" | none today [copy: C4] |
| Changes requested, completed, rejected | as in `src/comms/render.ts` | none |
| Filing submitted, documents back, EIN issued | as in `src/comms` | link to the filing |
| Confirm, reset, account open, invitations | "Confirm your email for CoFile", "Reset your password", "Your partner account is open", "You're invited to …'s filing portal" | as written |

Rules: a plain-text part always, live text (no text in images), dark-mode safe logos (a light-plate variant), 48 px button built as a bulletproof table, the button repeated as a plain link below it.

Per email:

- **Approval request.** The most important email we send, and the one with the most to lose to a spam folder or a skim. Subject as written; the preheader is the first body sentence ("Your proof is ready."). The rehearsal line, when present, is a hold-wash band above the body, so a client never approves a rehearsal thinking it's real. The sentence "Don't forward this email: anyone with the link can open your proof." is set as its own paragraph with the lock glyph, not buried. Sent from the firm's name, with the firm's support address as reply-to.
- **Security code needed.** Goes to the card's owner, often a firm partner who doesn't use the desk daily. The button ("Enter security code") deep-links to Ready to pay with the card preselected, through login if needed, and returns there after login. "Never reply to this email with the code." is its own paragraph with the stop glyph.
- **More information needed.** Lists the missing labels as a bulleted list, not a comma run, so a client can check them off.
- **Changes requested, completed, rejected, filing submitted, documents back, EIN issued.** One layout: subject as heading, the body, and a summary block with the filing title and the state reference in Mono when there is one. Documents-back and EIN emails name the documents as file rows (type icon, file name) that link to the filing; the files themselves are never attached, because attachments get forwarded.
- **Account emails** (confirm, reset, account open, account ready, invitations): CoFile-branded, the Register mark at 28 px, one button, the link's expiry stated where the product states it. An invitation shows the inviting firm's logo above the heading.

### 10.9 Internal staff surfaces (platform tenant)

CoFile's own staff use the dashboard with three extra queues. They're internal, but they're where "stop and ask rather than guess" actually happens, so they get real design.

| Queue | What staff see | Design |
|---|---|---|
| Sign-ups | "Waiting for approval" and "Enterprise requests", with the existing explanations | One row per firm or company: name, kind of firm, states, volume band, sign-up time. Approve (go) and decline (destructive) at the row's end. Enterprise requests show the free-text message folded. |
| Drift reviews | Filings stopped because a state changed its form ("Site changed — review needed") | A split comparison: the approved form snapshot on the left, the state's current screen on the right, the changed regions outlined in pencil with a numbered list of differences below. Decisions at the bottom as three equal buttons for the engine's three outcomes (accepted, corrected, rejected); there's no staff screen for this today, so its labels are [copy: C15]. The affected filings listed underneath with their firms. |
| Review gate, name options, reconciliation | "Review before submit", "Choose a name", "Checking whether the state received" | Each opens on the captured screen on a white plate with the filing summary beside it; actions match the email's link label. Reconciliation items show a prominent hold notice, because "Please don't file it again" is the instruction that prevents a double filing. |

### 10.10 The go-live moment

The beta is honest only if switching a type to live is visible everywhere at once. When a filing type is switched live (per deployment, or per account):

| Surface | Before | After |
|---|---|---|
| Coverage table and control strip | Hold or neutral chip | Solid green "Live" chip; its square in the strip turns solid |
| New filing type card | "Rehearsal" hold badge | "Live" chip; the card moves to the top of its state's list |
| Client form and service page | Rehearsal notice band | No band |
| The proof | "Rehearsal: nothing will be filed or paid, even if you approve." | No note; the consent note leads |
| Filing detail | Rehearsal badge | No badge on new filings; old rehearsals keep theirs forever |
| Approval email | Rehearsal line | No line |

The change is driven by the same live switch the code uses today, so no surface can disagree with another. A filing keeps the mode it was created in: a rehearsal started yesterday stays a rehearsal after the type goes live, and says so.

### 10.11 Cross-cutting states

| Situation | Treatment |
|---|---|
| Session ends mid-form | On the next action, the form's values are kept and the login opens in a sheet over the page; after logging in, the action completes. The existing "Your session ended. Log in again to carry on." is the sheet's notice. |
| Offline | A neutral strip at the top of the desk [copy: C14]; submit buttons disable with the strip as the nearby reason; fields keep working. |
| Slow state site | The timeline's current node pulses (static under reduced motion) and the run log keeps showing the last row; no spinners without context. |
| Stale data | Tables refetch on focus; changed rows flash `--pencil-wash` for 600 ms once. |
| Firm-branded errors | 404 and error pages under `/p/<slug>`, `/i/…`, `/<firm>/<service>` and the proof wear the firm's brand bar, not CoFile's. |

---

## 11. The white-label theming system

### 11.1 What a firm controls

Logo, "Name your clients see", "Main color", "Second color", font (a preset or an upload), "Support email shown to clients" and "Your web address". Enterprise tenants additionally control removal of the co-brand mark, their support contact on the proof and their default scheme for the embed.

### 11.2 What we derive

From the two colors, a build step (and the live preview) generates a ramp in OKLCH and maps it to tokens. The firm's exact color is kept wherever it's decorative; it's adjusted only where text has to be read on it.

| Token | Derived as | Used for |
|---|---|---|
| `--firm-accent` | Main color, exact | 4 px top rule, logo plate edge, selected nav |
| `--firm-action` | Main color, lightness lowered in OKLCH (hue and chroma kept) until white text reaches 4.5 : 1 | Primary buttons |
| `--firm-action-text` | White, or `--ink` if the firm's color is light enough to keep exact with ink text at 7 : 1 and the firm chose "keep my color" | Button labels |
| `--firm-link` | Second color, adjusted to 4.5 : 1 on `--sheet` | Links on client pages |
| `--firm-tint` | Main color at L 0.97, C 0.02 | Brand bar background option |
| `--firm-ink` | Main hue at L 0.30, C 0.03 | The fallback action color (11.3) |
| Dark-mode set | The same, solved against `--sheet` dark | Everything above |

Worked examples (computed, white label text):

| Firm picks | White text contrast | Used for buttons | After the fix |
|---|---|---|---|
| Sky blue #7FC8F8 | 1.8 : 1 | #337DA9 | 4.5 : 1 |
| Teal #2EC4B6 | 2.2 : 1 | #008579 | 4.5 : 1 |
| Coral #FF7F50 | 2.5 : 1 | collision with stop, so `--firm-ink` | 13 : 1 or more |
| Gold #F4C430 | 1.6 : 1 | the fix (#9B6E00) collides with hold, so `--firm-ink` | 13 : 1 or more |
| Purple #9B5DE5 | 4.1 : 1 | #9355DC | 4.6 : 1 |
| Royal blue #1F4FD1 | 6.8 : 1 | unchanged | 6.8 : 1 |

### 11.3 Guardrails

1. **Semantic collision.** If the firm's action color falls in the stop zone (OKLCH hue 10 to 45, chroma above 0.12) or the hold zone (hue 50 to 95, chroma above 0.10), or lands within ΔE OK 0.08 of `--stop` or `--hold`, the action uses `--firm-ink`, a near-black with a hint of the firm's hue. The firm's color still leads the brand bar and logo area. A red "Approve" button is never shown to a client.
2. **Status colors are never themed.** Chips, notices, the timeline and the rehearsal note always use our tokens, with glyphs.
3. **Logos.** Uploaded logos are trimmed of empty margins, capped at 40 px tall (32 on xs) and 200 px wide. A logo that is mostly light on a transparent background (average luminance above 0.8) is placed on an ink plate automatically; a dark one on a dark-mode bar gets a white plate. Raster logos under 2× resolution show a soft warning in setup.
4. **Fonts.** An uploaded font is measured: if its x-height is under 0.45 em, it lacks any of á é í ó ú ñ ü ¿ ¡, or it fails to load in 1.5 s, it's used for headings only and body falls back to Atkinson Hyperlegible Next. Fees, codes and filing details are always Atkinson Hyperlegible Mono (5.4).
5. **Every fix is shown, never silent.** The branding preview shows a two-swatch split for any adjusted color [copy: C3].
6. **The torture set.** CI renders every client template against 24 fixture brands (neon green, near-white yellow, pure red, a giant square logo, a script font, a font with no tabular figures, a white logo, a 1,200 px wide wordmark…) in light and dark, and fails the build on any contrast or overflow regression.

---

## 12. Accessibility, Spanish and dark mode

**Standard:** WCAG 2.2 AA everywhere, AAA contrast on the proof. Audited by an outside firm before launch and every six months, with sessions run by screen-reader users and readers over 65.

- Keyboard: everything reachable, visible 3 px focus, skip link, logical order (on the hero, H1 before the proof).
- Screen readers: the sample proof is a `figure` with its caption; callouts are buttons with `aria-expanded`; the state's review image keeps its existing alt text, and every value on it is also in the text table. Tables use `th scope`. The log playback is not a live region (it would chatter); its full text is in the DOM from the start.
- Targets: 44 px minimum, 48 on client pages, 56 for the proof's decisions. Text zooms to 200% with no loss, reflows at 320 px.
- Forms: errors announced on submit with a summary at the top linking to each field; nothing relies on placeholder text.
- Plain reading: one idea per paragraph is how the copy is written; the layout keeps it that way (no multi-column prose, no justified text, 60 to 72 character measure).

**Spanish.** The copy is locked in English; translation is a copy task, done by a certified legal translator and reviewed by counsel for the consent and declaration texts (Appendix B, C10). The design is ready for it now: every layout tested at +30% text length, no text in images, `lang` attributes per element, a language switch on client-facing pages showing "English" and "Español" (language names, in their own language), and dates, currency and numbers formatted per locale. The proof's consent appears in the language the client chose, with the English version one tap away, because English is what's recorded.

**Dark mode.** Follows the system setting, with a manual switch in the desk and dashboard footers. Every token has a dark value (section 4). The proof follows the system too, except the state's review image, which stays on its white plate. Emails ship with dark-safe logos. The firm's derived colors are solved separately for dark (11.2).

---

## 13. Measurement plan

### 13.1 Principles

1. **Instrument before redesigning.** Phase 0 ships the events on today's site and collects four weeks of baseline. Without it, nobody can say whether this spec helped.
2. **The firm is the unit.** B2B decisions are made by accounts. Funnels and the activation metric count firms, not sessions; people are tracked inside the firm.
3. **Server-side truth.** Anything past sign-up (confirmed, rehearsed, approved, filed) is emitted by the web app and the engine from the database state, not from a browser tag, so ad blockers and stale tabs can't distort it.
4. **No personal data in analytics.** No names, emails, business names, addresses, SSNs, EINs, card details or message text. Filing kinds, states, statuses, timings and booleans only. No session replay anywhere on desk, client or proof pages; on marketing pages only with all inputs masked.
5. **No third-party tags on client pages.** Intake, the proof and client emails get first-party, server-side events only. Marketing honors Global Privacy Control.

### 13.2 The partner funnel

| Step | Event | Definition |
|---|---|---|
| F0 Visit | `page_viewed` | Any public page, first in a 30-minute window |
| F1 Intent | `cta_clicked` | "Run a free rehearsal", with `placement` (nav, hero, after_proof, after_log, close, sticky) |
| F2 Sign-up seen | `signup_viewed` | `/signup` rendered |
| F3 Sign-up sent | `signup_submitted` → `signup_succeeded` | Account created, `approval_required` flag |
| F4 Confirmed | `email_confirmed` | Verification link used |
| F5 In the desk | `first_login` | `method`: password or Google |
| F6 Branded | `setup_step_completed` (branding) | Logo or color saved |
| F7 First rehearsal started | `filing_started` with `rehearsal: true` | Any entry point |
| F8 First own proof seen | `proof_opened` | First proof opened for the firm (`recipient_is_firm_user` true or false) |
| F9 First proof approved | `proof_decided` with `approve` | On a rehearsal |
| **F10 Rehearsed (activation)** | `run_held_at_payment` | The rehearsal ran to its planned hold |
| F11 Client-ready | `proof_sent` with `recipient_is_firm_user: false` | A proof reaches someone outside the firm |
| F12 First live filing | `filing_submitted` with `rehearsal: false` | Only for types that are live |
| F13 Paying | `subscription_activated` | From Stripe |

### 13.3 The activation metric

**Rehearsed in 7 days:** the share of firms that, within 7 days of `email_confirmed`, have a rehearsal whose proof was approved and whose run reached its planned hold ("Pay Now: held, on purpose").

Why this one: it's the moment the home page promises ("Run one rehearsal. Then decide."), it requires the firm to have seen its own branded proof, and it's the strongest predictor I'd expect of a firm sending a real client a proof. I'll validate that by checking, after eight weeks, how strongly F10 predicts F11 within 30 days, and swap the definition if a different step predicts better.

Honesty in the denominator: only firms that offer at least one type "Rehearsed to the payment screen" can reach the hold. A New York-only firm can't today. The metric is reported on **eligible firms**, with a second line for all firms, so coverage gaps aren't mistaken for design failures.

Companion numbers: **time to first own proof** (minutes from `signup_succeeded` to F8, median and 80th percentile), **time to rehearsed** (F10), and the **north star**: proofs approved per week across all firms, rehearsal and live, since every approved proof is the product doing its job.

### 13.4 Event dictionary (additions to the funnel events)

| Event | Key properties (no personal data) |
|---|---|
| `section_viewed` | `section` (hero … close), `dwell_ms`, 50% visible |
| `sample_proof_callout_opened` | `callout` 1 to 4, `surface` (hero, proof_section, signup) |
| `coverage_filtered` | `state` |
| `support_mailto_clicked` | `context` (coverage, close, footer) |
| `signup_field_completed`, `signup_validation_error` | `field`, `rule` (never values) |
| `setup_step_started`, `setup_step_completed` | `step`, `duration_ms` |
| `branding_color_set` | `contrast_fixed`, `collision` (none, stop, hold) |
| `branding_font_set` | `source` (preset, upload), `fallback_applied` |
| `filing_drafted_from_message` | `channel` (email, sms, whatsapp, slack) |
| `client_link_created`, `client_link_opened`, `client_link_used` | `kind` |
| `proof_section_viewed` | `section` (review_page, details, fees) |
| `proof_decided` | `decision`, `time_on_page_ms`, `reached_consent` |
| `run_stopped` | `reason` (drift, fee_mismatch, bot_check, other) |
| `card_code_entered` | `filings_released` |
| `enterprise_inquiry_submitted` | `states`, `volume` bands |
| `docs_viewed`, `openapi_downloaded`, `api_key_created`, `first_dry_run_created`, `first_webhook_delivered` | developer funnel, per tenant |

### 13.5 Guardrails and cadence

Guardrails watched on every change: "Request changes" rate and filings corrected after approval (if approvals rise but corrections rise too, we made approving easier, not clearer); support emails per 100 sign-ups, and specifically "which types are live" emails (the coverage design should push these down); email complaint and unsubscribe rates; p75 Largest Contentful Paint under 2.0 s on the home page and 1.5 s on the proof on a mid-range phone over 4G; zero serious accessibility violations in CI.

A weekly funnel review by sign-up cohort, segmented by kind of firm, states, device and season. A monthly read of eight to ten recorded, consented usability sessions with CPA and payroll staff, because at this traffic level qualitative research will teach us more than most tests.

### 13.6 The enterprise and developer funnel

Enterprise buyers don't sign up; they ask. Then a developer evaluates. Two funnels, joined at the account:

| Step | Event | Owner |
|---|---|---|
| D0 Enterprise interest | `section_viewed` (enterprise), `cta_clicked` (read_api_docs) | Marketing |
| D1 Inquiry | `enterprise_inquiry_submitted` | Marketing |
| D2 Account opened | `account_approved` (from Sign-ups) | Staff |
| D3 First key | `api_key_created` | Developer |
| D4 First dry run | `first_dry_run_created` (`"dryRun": true`) | Developer |
| **D5 Dry run held (developer activation)** | `run_held_at_payment` on an API-created dry run | Developer |
| D6 Webhooks working | `first_webhook_delivered` (2xx) | Developer |
| D7 First live filing | `filing_submitted`, not a dry run | Account |

**Developer activation:** an API dry run that reaches its planned hold within 14 days of the first key. It's the API's version of "Run one rehearsal". Docs pages are measured by whether their readers reach D4 sooner, not by page views. Requests for `/llms.txt`, `/docs.md` and `/openapi.json` are counted from server logs by user-agent class (browser, AI agent, other), because agent builders often never open a page.

### 13.7 Dashboards to build

| Dashboard | For | Contents |
|---|---|---|
| Partner funnel | Growth, weekly | F0 to F13 by sign-up cohort week, conversion between each step, median time between steps, segmented by kind of firm, states and device |
| Activation | Leadership, weekly | Rehearsed in 7 days (eligible and all firms), time to first own proof, time to rehearsed, the north star |
| Setup friction | Design, weekly | Step start-to-complete rates and durations, branding contrast fixes and collisions, font fallbacks |
| Proof health | Product, weekly | Proof open rate within 24 h, decisions by type, "Request changes" rate, approvals later corrected, median time on page by device |
| Coverage honesty | Product and support, monthly | Support emails tagged "which types are live", coverage filter use, rehearsals started on types that can't reach the hold |
| Developer | Platform, weekly | D0 to D7, time to first dry run, docs page to D4 conversion, error responses by code in the first week |
| Experiments | Growth | One page per running test: assignment counts, sample ratio check, primary and guardrail metrics with intervals, the stop rule |

### 13.8 Event governance

- A typed event schema in the repo (one file, reviewed like code). Events not in the schema are dropped at the collector.
- A CI check that fails if an event property name looks like personal data (`name`, `email`, `ssn`, `ein`, `address`, `phone`, `message`) or if a value matches an email, SSN or card pattern.
- Each event has an owner, a definition and the question it answers. If no one can name the question, the event isn't added.
- Retention: raw events 13 months, aggregates indefinitely. Deleting a firm's account deletes its events' link to the account id.
- Every funnel step is tested end to end in staging with a script that walks a fake firm from visit to held rehearsal and asserts each event fired once.

---

## 14. Experiment backlog

### 14.1 How we test

- **Words never change.** Every variant uses the locked copy; only layout, order, emphasis, placement and presentation vary.
- **Power first.** Each test gets a sample-size estimate from the measured baseline before launch. If it needs more than 8 weeks of traffic, it isn't an A/B test; it's a staged rollout with a holdout, or a moderated study.
- **Server-side assignment** by anonymous id (marketing) or firm (desk), no flicker, one test per surface at a time.
- **Seasonality.** No test runs across the weeks of March 15 and April 15 or the October 15 extension deadline. January is formation season; tests that start then are read against January baselines only.
- **Out of bounds:** consent wording and placement, the Terms checkbox, the proof's decision block, the beta notice, coverage labels, anything that would hide "Request changes".

### 14.2 Backlog

| ID | Surface | Variant against the shipped control | Primary metric | Guardrail | Priority |
|---|---|---|---|---|---|
| E1 | Hero | Interactive callouts on the sample proof vs a static sheet | F1 hero CTA rate | Bounce, LCP | High |
| E2 | Hero, xs | The sheet before the sub vs after the CTAs | F1 | Scroll depth to beta note | High |
| E3 | Home order | "Rehearse on the real stage" moved up to follow "The proof" (Act III earlier) | F2 sign-up seen | "Which types are live" emails | High |
| E4 | Home order | "The catch" moved directly before "Coverage" vs after | F2 | Time on page | Medium |
| E5 | Home, xs | Sticky bottom CTA vs none | F2 | Enterprise form starts | Medium |
| E6 | Home | Repeated CTAs at act ends vs hero and close only | F2 | none | Medium |
| E7 | "See what your client sees" | Scroll to the section vs open a full-screen client view of the sample proof on a phone frame | F2 and callout opens | Bounce | Medium |
| E8 | Sign-up | Account fields first, firm questions after (control is the current order) | F3 completion | Approval queue quality (staff-rated) | High |
| E9 | Sign-up | Live sample proof with the typed firm name vs no preview | F3 | Field errors | High |
| E10 | Sign-up | Firm questions moved to setup's "Your firm" step (fewer fields up front) | F3 and F10 | Approval review time | High (needs product sign-off) |
| E11 | Setup | "Start a filing" unlocked after Branding vs after Payment | F10 | First live filing delay | Highest |
| E12 | New filing, form | Proof assembling in the right rail vs no rail | F7 → F8 rate | Form errors | Medium |
| E13 | Approval email | Summary card (firm logo, filing title, total) above the button vs button only | `proof_opened` within 24 h | Complaints | Medium (comprehension, not approval) |
| E14 | Proof | Moderated study only: the consent once vs twice, sticky jump bar vs none. Measured by comprehension questions, never by approval rate | Correct answers about fees and refunds | none | High, research |
| E15 | Login | "Continue with Google" above vs below email | F5 time | Login errors | Low |
| E16 | Coverage | Grouped by stage (as designed) vs grouped by state | `coverage_filtered` use, support emails about live types | none | Medium |
| E17 | Close | The small sheet beside the closing CTA vs text only | F1 from close | none | Low |
| E18 | Desk empty state | The first-rehearsal path card (10.3) [copy: C16] vs the plain empty state | F7 within 24 h of first login | none | High |

### 14.3 The first five, in detail

**E11. Unlock the first rehearsal before Payment.**
- *Hypothesis:* a firm that has to find and enter a card before trying anything stalls at Payment; letting it rehearse first will raise Rehearsed in 7 days without delaying the first live filing for firms that convert.
- *Variant:* "Start a filing" shown after Branding; Payment stays in the list, marked as needed before filing for real (using the existing "Real filings need an active subscription; rehearsals are free." notice where Payment is incomplete).
- *Unit:* firm, assigned at sign-up. *Primary:* Rehearsed in 7 days (eligible firms). *Guardrails:* days from first rehearsal to first live filing, card-added rate by day 30.
- *Decision rule:* ship if the primary improves with a 90% interval above zero and the guardrail doesn't worsen beyond a pre-agreed margin. If traffic can't power it in 8 weeks, ship it to 80% with a 20% holdout and read it over a quarter.

**E8 and E9. Sign-up order and the live preview.**
- *Hypothesis:* putting the account fields first and showing the firm's name on the sample proof as it's typed makes the form feel like setting up the firm's own desk rather than filling in a vendor's lead form.
- *Design:* a 2 × 2 factorial (order × preview), so we learn each effect and their interaction from the same traffic.
- *Unit:* anonymous visitor. *Primary:* F3 sign-up completion from F2. *Guardrails:* field errors per submission; for approval-required deployments, the share of sign-ups staff approve.

**E3. Rehearsals earlier on the home page.**
- *Hypothesis:* for this buyer, the rehearsal log is the most convincing thing on the page, and it's currently in section 8. Moving Act III to follow "The proof" will raise sign-up starts.
- *Variant:* order 1, 2, 3, 8, 9, 10, 4, 5, 6, 7, 11, 12, 13. Every section and word is still there.
- *Unit:* anonymous visitor. *Primary:* F2. *Guardrails:* "which types are live" support emails, section views of Firms and Requests (to check we didn't hide what firms get).

**E1. Interactive callouts.**
- *Hypothesis:* letting a visitor tap 1 to 4 on the sample proof turns a picture into a demo and raises hero CTA clicks.
- *Unit:* anonymous visitor. *Primary:* F1 from the hero. *Guardrail:* LCP and bounce, since the interactive sheet adds weight.

**E18. The first-rehearsal path card.**
- *Hypothesis:* a new desk with an explicit path to one rehearsal (the steps in 10.3) gets more firms to start one on day one than a blank table.
- *Unit:* firm. *Primary:* F7 within 24 hours of first login. *Guardrail:* rehearsals abandoned before the proof is sent.

---

## 15. Production

**Stack.** The existing Next.js app. Tokens in Tokens Studio, built with Style Dictionary into CSS custom properties, a TypeScript map and email-safe inline values. Components in Storybook with Chromatic visual tests per theme and per torture-set brand. Playwright for end-to-end and screenshot tests at 360, 768 and 1280. Interactive motion in Rive (state machines for callouts, log playback, text to draft), with CSS fallbacks. Product video rendered with Remotion from the real components and test details, so no recording ever contains real client data. Emails in React Email, sent through Resend, checked on a rendering service across major clients. Analytics: a first-party event pipeline into the warehouse, product analytics and feature flags on a self-hostable platform, experiments assigned server-side. axe in CI.

**Design files.** One Figma library: Foundations (tokens, type, grid, Proof Marks), Components (with variants and states as in section 9), Patterns (proof, timeline, setup stepper, coverage), Templates (marketing, desk, client, dashboard, docs, email), and a Theming playground that runs the section 11 derivation on any color.

**Assets.** Logo set (mark, wordmark, lockups in SVG; favicons 16, 32, 180, 512; a social card template); the Proof Marks glyph set; 14 pencil illustrations (empty states, setup steps, sent, 404, error, email headers, security icons); the Two Sisters Bakery sample data set; three Rive files; a 60-second walkthrough; nine email templates; the 24-brand torture set.

**Commission (by kind).** An independent type studio for Proof Marks and the wordmark; a single-line technical illustrator; a documentary photographer for a small library of hands-and-paper images; an interactive motion studio for the Rive work; an accessibility audit firm with older and screen-reader testers; a certified legal Spanish translator; a research recruiter for CPA, payroll, CFO and title staff aged 40 to 65 in New York, New Jersey and Florida, plus Spanish-first business owners.

**Phases.**

| Phase | When | What |
|---|---|---|
| 0 | Nov 30 to Dec 18 | Events and baseline on today's site; tokens; the theming engine and torture set; the proof redesign (highest stakes, ships first) |
| 1 | Dec 7 to Jan 9 | Home, sign-up, setup sequence, the desk core (filings, new filing, filing detail), client emails. Live before January's formation season |
| 2 | Jan 12 to Feb 13 | Client links, from email, signatures, Ready to pay, service pages, white-label and embed |
| Freeze | Feb 16 to Apr 20 | No structural desk changes during tax season; fixes only; low-risk marketing tests |
| 3 | Apr 21 to Jun 30 | Dashboard, docs, Spanish client pages, commissioned illustration and type finished, the full experiment program |

Phases 0 and 1 overlap on purpose: the proof and the instrumentation are one team's work, the marketing pages another's.

**Performance budgets** (p75, mid-range Android on 4G, measured in the field, not only in the lab):

| Surface | LCP | Interaction delay | JavaScript (compressed) | Fonts |
|---|---|---|---|---|
| Home | 2.0 s | 100 ms | 90 KB before interaction; Rive loads after the hero is visible | 110 KB |
| Sign-up | 1.8 s | 100 ms | 60 KB | shared cache |
| The proof | 1.5 s | 100 ms | none required: the page works with JavaScript off; the jump bar and image zoom enhance it | 110 KB, or the system stack if fonts haven't loaded in 1 s |
| Client form | 2.0 s | 100 ms | 120 KB | firm font plus ours |
| Desk pages | 2.5 s | 150 ms | 200 KB per route | shared cache |

**QA matrix.** iOS Safari (the last two versions), Android Chrome, desktop Chrome, Safari, Edge and Firefox; VoiceOver on iOS and macOS, TalkBack, NVDA with Firefox; 200% zoom; Windows high-contrast mode; reduced motion on and off; light and dark; English and (from phase 3) Spanish; the 24 torture-set brands on every client template.

**Definition of done for a page.** Built from library components only (new components go into the library first); every state in 9.20 present; tokens only, no raw hex in code; copy pulled from the locked strings with no edits; axe clean; keyboard walk recorded; events from the schema firing in the staging walk-through; visual tests passing in both themes; for client pages, the torture set passing; reviewed on a real phone at 360 px by someone other than its builder.

**Handoff.** The Figma library is the source for design, the token package is the source for values, Storybook is the source for behavior. Each page in section 10 gets a Figma frame per breakpoint (360, 768, 1280), a Storybook story per state and a short build note listing its events. Design reviews happen in Storybook against the deployed preview, not in Figma.

---

## Appendix A: what I'd push back on

1. **The first rehearsal waits on a card.** Setup only offers "Start a filing" once Payment is done, but a rehearsal pays nothing. Unlock it after Branding and ask for the card before the first live filing. This is the biggest activation lever in the product.
2. **The sign-up asks eleven things.** "Kind of firm", "Phone" and "Website" are asked again in setup's "Your firm" step. Ask once, later.
3. **Confirming the email ends in a login.** "Your account is ready. Log in to set it up." Same browser, same person: confirm and continue straight into the desk.
4. **"See what your client sees" shows text, not the client's view.** The anchor lands on a list. The client's view is a phone-sized proof; show that (E7).
5. **The best evidence sits in the bottom half.** The rehearsal log, coverage and "the catch" are what win a cautious CPA, and they're sections 8 to 10 of 13. Test moving them up (E3, E4).
6. **Outside the nav, only two places ask for the rehearsal** on a page of thirteen sections. Reuse the label at the end of each act.
7. **"Ready to pay" has no count anywhere.** Filings wait silently for a code. Badge it in the navigation.
8. **Red brands can produce a red "Approve" button today.** The proof uses the firm's color with no semantic check. Section 11.3 fixes it.
9. **The proof's error pages are unbranded.** Expired, already decided, invalid, wrong code and the change-request confirmation are a bare paragraph on a blank page, at the exact moment a client is most likely to wonder whether the link was real. Every one of them should wear the firm's brand bar (10.4).
10. **The partner's own desk leads with CoFile, not the firm.** The desk's top bar shows the CoFile name with the firm's logo tucked in at the right. "Your name on the door" should start on the firm's own desk: firm logo and name at the left, "with CoFile" at the right.
11. **No measurement exists.** There's no event that tells us how many visitors start a sign-up, how many confirmed firms rehearse, or where they stop. Phase 0 exists because of this.
12. **The proof was designed for desktop.** A max-width page with a two-column table and a desktop screenshot is hard work at 360 px. The client is on a phone; design the proof for the phone first and let desktop be the variant.
13. **Nothing is in Spanish.** Spanish-first owners meet the intake form, the proof and the emails in English only, while approving a legal filing. Plan the translation now (C10); the design is ready for it.
14. **Payment cards are asked for in setup with no context about rehearsals.** Even if Payment stays before the first rehearsal, the step should say plainly, through its placement, that rehearsals never use the card. Today the card form comes before any mention of rehearsals on that page.

## Appendix B: copy notes

These are suggestions for the copy owner. None of them appear in the design above.

- **C1.** The hero's sample proof button reads "Approve for filing", but the real proof's button reads "Approve, and authorize submission and payment". A CPA who knows the 8879 will notice. Consider making the sample match the real button.
- **C2.** The desk's filings table badges rehearsals "Test", while the filing detail says "Rehearsal". One word would be clearer.
- **C3.** With automatic contrast fixes, the branding help "Button text is white, so choose a dark color." is no longer true. The preview needs a short line explaining the adjusted swatch.
- **C4.** The "More information needed" email has no button or next step. It needs a link label.
- **C5.** Signed-in visitors on the coverage table could use a short pointer to per-account status in their desk.
- **C6.** "This link has expired or isn't valid" has no way forward on the invitation page; a "Log in" link may help.
- **C7.** Icon-only buttons need accessible names: the mobile menu, closing the full-screen review image, copy, open and download.
- **C8.** A new API key needs a "copy" action label and a one-line "shown once" note.
- **C9.** The co-brand appears as "with CoFile" on client pages and "Filed with CoFile" in the embed. Pick one.
- **C10.** Spanish versions of client-facing pages, client emails, the proof and its consent texts, by a legal translator with counsel's review.
- **C11.** The webhooks page says "The engine posts each filing event…" and the dashboard mentions "the platform team" and "tenant"; the copy review asked to keep those words out of customer-facing pages.
- **C12.** The dashboard overview's status tiles need short labels for the four status families.
- **C13.** The proof's heading is built from codes (state abbreviation and a lowercased type, as in "NJ llc formation: …") rather than the filing type's name ("New Jersey LLC formation"). The client reads this heading first.
- **C14.** An offline notice for the desk.
- **C15.** Labels for the staff drift-review decisions (accepted, corrected, rejected).
- **C16.** The first-rehearsal path card on an empty desk, if E18 runs: a heading and short step labels.
- **C17.** After confirming their email, a first-time user lands on a login headed "Welcome back". Fine if A3 is fixed; odd if not.
- **C18.** The login's "Firms go to their filing desk, platforms to their dashboard." could sit under the sign-up page's enterprise link as well; today a platform buyer who clicks "Run a free rehearsal" learns only at the bottom of the form that it's for firms.
