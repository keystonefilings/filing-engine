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
| `--pencil-line` | #4A8FDB | #5D9BE0 | Leader lines and crop marks (non-text) | 3.4 : 1 |
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
3. Form: one column, max 640, sections with paired fields, "Same as" chips, folded optional sections. On lg, a sticky right rail shows **the proof assembling as they type**: each answered field appears on a mini sheet in ink, unanswered required ones as pencil placeholders. The submit button keeps its label, "Send the proof to my client".

**Filing detail.** Header: title, status chip, Rehearsal badge. Then the timeline (9.5), the "Approved and ready to pay…" notice when relevant, "Link to the proof" with copy and open actions, "Documents" as file rows (state document, EIN letter) with type icons, and "Progress on the state site" rendered with **the same log component as the home page**: the promise and the product look identical. "Save to Google Docs" sits as a secondary action with its existing explanation.

**Client links.** "Send a client a link", the form ("Filing", "Who it's for (shown to you and the client)", "Make link"), then the result card with "Copy link" and "Email it from your mail app". The "Links you sent" table uses neutral chips for "Waiting for the client", go for "Used", ink outline for "Turned off" and "Expired".

**From email.** Split view: the original message on the left in a quoted, neutral card ("From …"), the draft on the right with "This looks like a request for:" and "Open the filled-in form". Phrases the AI read are underlined in pencil on the left and the matching fields marked in pencil on the right, the text-to-draft animation from the home page, now real.

**Signatures.** "Saved signatures" as cards showing the signature image on a white plate, the signer and the consent version; "Add a signature" opens a sheet with draw, type or upload. Empty: "No saved signatures yet."

**Ready to pay.** Grouped by card: a card row ("ending 4242"), the filings waiting under it with totals in Mono, one security-code field (4 digits max, `inputmode="numeric"`, `autocomplete="cc-csc"`) and the go button. The one-hour rule sits next to the field, not in the footer. Empty: "Nothing is waiting for a card right now."

**Billing.** A plan panel (status chip such as "No subscription yet" or "Waiting for the first payment"), "Real filings need an active subscription. Rehearsals are always free." as the panel's lede, then Stripe actions ("Manage billing"). Registered-agent renewals listed per business. No price appears until Stripe returns a real one.

**Password, signed out.** The account card template from 10.2, inside the desk frame. Signing out lands on `/login` with "Your session ended. Log in again to carry on."

### 10.4 Client-facing pages (firm's brand, CoFile nearly invisible)

**Intake (`/i/<token>`) and service pages (`/<firm>/<service>`, `/e/<tenant>/<firm>/<service>`).** One template, single column, max 680:

```
┌────────────────────────────────────────┐
│ [logo] Best Accounting    with ◉ CoFile│  brand bar
├────────────────────────────────────────┤
│ ▌▌ This page is in rehearsal for now…  │  hold notice, only when not live
│ LLC formation, New York  (kind.title)  │
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
| Platform tenant only | "Sign-ups" with "Waiting for approval" and "Enterprise requests" tables, approve and decline per row; drift reviews as a queue with before and after screenshots side by side and the diff highlighted in pencil |

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

---

## Appendix A: what I'd push back on

1. **The first rehearsal waits on a card.** Setup only offers "Start a filing" once Payment is done, but a rehearsal pays nothing. Unlock it after Branding and ask for the card before the first live filing. This is the biggest activation lever in the product.
2. **The sign-up asks eleven things.** "Kind of firm", "Phone" and "Website" are asked again in setup's "Your firm" step. Ask once, later.
3. **Confirming the email ends in a login.** "Your account is ready. Log in to set it up." Same browser, same person: confirm and continue straight into the desk.
4. **"See what your client sees" shows text, not the client's view.** The anchor lands on a list. The client's view is a phone-sized proof; show that (E7).
5. **The best evidence sits in the bottom half.** The rehearsal log, coverage and "the catch" are what win a cautious CPA, and they're sections 8 to 10 of 13. Test moving them up (E3, E4).
6. **Only two places ask for the rehearsal** on a page of thirteen sections. Reuse the label at the end of each act.
7. **"Ready to pay" has no count anywhere.** Filings wait silently for a code. Badge it in the navigation.
8. **Red brands can produce a red "Approve" button today.** The proof uses the firm's color with no semantic check. Section 11.3 fixes it.

## Appendix B: copy notes

These are suggestions for the copy owner. None of them appear in the design above.

- **C1.** The hero's sample proof button reads "Approve for filing", but the real proof's button reads "Approve, and authorize submission and payment". A CPA who knows the 8879 will notice. Consider making the sample match the real button.
- **C2.** The desk's filings table badges rehearsals "Test", while the filing detail says "Rehearsal". One word would be clearer.
- **C3.** With automatic contrast fixes, the branding help "Button text is white, so choose a dark color." is no longer true. The preview needs a short line explaining the adjusted swatch.
- **C4.** The "More information needed" email has no button or next step. It needs a link label.
- **C5.** Signed-in visitors on the coverage table could use a short pointer to per-account status in their desk.
- **C6.** "This link has expired or isn't valid" has no way forward on the invitation page; a "Log in" link may help.
- **C7.** The mobile menu button needs an accessible name ("Menu" or similar).
- **C8.** A new API key needs a "copy" action label and a one-line "shown once" note.
- **C9.** The co-brand appears as "with CoFile" on client pages and "Filed with CoFile" in the embed. Pick one.
- **C10.** Spanish versions of client-facing pages, client emails, the proof and its consent texts, by a legal translator with counsel's review.
- **C11.** The webhooks page says "The engine posts each filing event…" and the dashboard mentions "the platform team" and "tenant"; the copy review asked to keep those words out of customer-facing pages.
