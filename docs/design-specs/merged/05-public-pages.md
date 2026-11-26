# CoFile merged design, part 5: the public pages (10A)

Merge round, Nov 26, 2026. This part designs the pages behind the home page (How it works, For
firms, What we file, Pricing, Security, Questions, For platforms), the account pages (sign-up and
its sent page, log in, forgot and reset password, confirm your email, invitations) and the legal
and system pages (Terms, Privacy, 404, error). It is built on `01-foundation.md` and uses its
tokens, type scale, example data (D4) and signature moments (D3) without reopening them. Section
numbers in parentheses ("4.3", "6.7", "D1") refer to the foundation. "Home 2", "Home 7" and so on
are the home page's bands as numbered in the foundation's 6.5 table; their pictures are specified
by the home page writer and reused here as named.

Hal's section 10 is the base. Marcus leads sign-up (the typed name carried in) and For firms'
studio; Elaine and Hal lead How it works' photography; Greta leads Pricing and the 1-2-3. Credits
in parentheses as in the foundation. The choices this part settled where the ten disagree are in
`DECISIONS.md`.

The copy is locked: every line quoted here is the round 3 copy in the page files listed in each
section (and the product's own labels where a product picture shows them). Long paragraphs are
placed by their opening words and "(as written)". Anything this part needs that doesn't exist is
marked `[copy needed]` and listed in 10A.17.

**Measures used in the wireframes.** Desktop is drawn at 1440 px: content 1200 px, 12 columns of
78 px with 24 px gutters, margins 120 px. Column spans: c1–4 384, c1–5 486, c1–6 588, c1–7 690,
c1–8 792, c3–10 792, c4–9 588, c7–12 588, c8–12 486, c9–12 384, c1–12 1200. Tablet is 834 px
(8 columns, 40 px margins, 754 px content). Phone is 390 px (4 columns, 20 px margins, 350 px
content; 16 px margins at 360 and below).

---

## 10A.0 What every page here shares

### 10A.0.1 The frame

- **Beta notice, header, footer** exactly as the home page (6.7 and the home writer's 9.0). On
  the seven pages behind the home page the header carries the five links; the current page has
  its 2 px Brass Line underline 6 px below the baseline (How it works, For firms, What we file,
  Pricing, For platforms). Security and Questions are reached from the footer and underline
  nothing.
- **The header button on these pages.** None of these pages has a hero button, so the header's
  "Run a free rehearsal" is Brass from first paint. It switches to its outline state (1 px Plate
  Ink, Plate Ink text) with the 200 ms crossfade whenever another Brass button on the page is in
  view (a close's button, For platforms' "Send"), so a screen never holds two (4.8).
- **The sticky phone bar** (6.7) on the seven pages behind the home page slides up once the page
  head has scrolled out of view, and slides away while the page's close button is on screen,
  inside For platforms' inquiry form, and whenever a field has focus (For firms' studio
  included). It never appears on the account pages, Terms, Privacy, the 404 or the error page:
  those pages have their own one job.
- **Account pages** (sign-up, sent, log in, password, confirm, invite expired) use the Shell
  without the five links. Their header holds the lockup and one quiet text link, never a Brass
  button, because the page's own button is the action: "Log in" on sign-up, the sent page, the
  password pages, confirm your email and invite expired; "Run a free rehearsal" (as a text link,
  Plate Ink, Brass Line underline) on Log in. The header CTA would otherwise point at the page
  you're on (sign-up) or compete with its button (log in). On phones the same: lockup left, the
  one link right, 64 px.
- **Anchors** (`#proof`, `#checks`, `#steps`, the question ids) land with `scroll-margin-top:
  96px`, the compact header plus 36 px, so a section's first line never hides under the header.

### 10A.0.2 The title page (`PageHead`)

Each of the seven pages opens like the title page of a booklet (Hal): the kicker, the h1, the
lede, and a frontispiece only where the page has one.

```
DESKTOP 1440 (Cotton)                                                   above 96 · below 128
 c1                                       c7    c8 c9                         c12   bleed
┌──────────────────────────────────────────────┬──┬──────────────────────────────┬────┐
│ ━ Kicker (16/22 500 Graphite, Brass Line rule)│  │ ┌──────────────────────────┐ │    │
│                                               │  │ │                          │ │    │
│ H1 at display-page, 60/64, Miller Display     │  │ │ frontispiece (if any),   │ │    │
│ one sentence per line, c1–c7 (690 px)         │  │ │ its top on the h1's cap  │ │    │
│                                               │  │ │ height                   │ │    │
│ Lede, Miller Text 22/34, max 34 em (c1–c7)    │  │ └──────────────────────────┘ │    │
│                                               │  │ caption 14/20 Graphite       │    │
└──────────────────────────────────────────────┴──┴──────────────────────────────┴────┘

PHONE 390                                                               above 48 · below 64
┌──────────────────────────────┐
│ ━ Kicker 15/22               │
│ H1 38/42, balanced           │
│ Lede 19/30                   │
│                              │ 32
│ [frontispiece, full width,   │
│  its own phone crop]         │
│ caption                      │
└──────────────────────────────┘
```

- Ground Cotton `#FBFAF6`. Space above 96 / 72 / 48 px (desktop / tablet / phone), below 128 /
  96 / 64.
- The kicker (`kicker`, 16/22 Founders Grotesk Medium, Graphite) is led by the 24 × 1.5 px Brass
  Line `#A87A1E` rule at x-height (5.2); 16 px to the h1 (12 on phone); h1 24 px to the lede (16
  on phone).
- The h1 is `display-page` (60/64, 50/54, 38/42), Miller Display 400, −0.8%, in Plate Ink
  `#1D2130`. Multi-sentence h1s set one sentence per line on desktop and tablet (5.4); one-sentence
  h1s use `text-wrap: balance`.
- Without a frontispiece the h1 and lede take c1–c8 and the right of the head stays paper. With
  one, the words take c1–c7 and the picture c9–c12, bleeding up to 120 px into the right margin.
  The picture's top edge sits on the h1's cap height (6.2). On tablet the frontispiece drops under
  the lede at c1–c8; on phones it follows the lede at full width, in its own phone crop.

### 10A.0.3 Bands, and how they meet

Four kinds of band, from the foundation's rhythm (6.3):

| Band | Ground | Space above / below (desktop · tablet · phone) | Holds |
|---|---|---|---|
| **Showpiece** | Cotton | 128 / 160 · 96 / 128 · 64 / 80 | An h2, its lede and list, and one picture |
| **Support** | Cotton 2 `#F3F0E8` where it sits between Cotton bands; Cotton on pages that are all support (Security, Questions, Terms, Privacy) | 96 / 112 · 72 / 88 · 56 / 64 | Reading only: no picture, no motion |
| **Close** | Cotton 2 | 96 / 128 · 72 / 96 · 56 / 64 | The page's own close: h2, lede, buttons |
| **Stage** | Night `#14161E` (`--stage`; `#0E1016` in dark mode) | as showpiece | What we file's "How a filing type goes live." only: the rehearsal, where the copy talks about a performance |

- **Bands on the same ground don't add up.** Between two bands on the same ground the gap is the
  larger of the first's space below and the next's space above; a change of ground keeps both.
  So a page head (below 128) followed by a Cotton showpiece (above 128) is 128 apart, not 256.
- **Words beside a picture.** On these pages the h2s are `display-m` (36/42, 32/38, 28/34) and the
  ledes run longer than the home page's, so the standard split is **five columns of words, one
  empty, six of picture** (c1–c5 / c7–c12, or mirrored), Hal's `nx-two` grid; the picture may
  bleed 120 px into the margin on its open side. The words are vertically centred on the
  picture's main object, except where the words run longer than the picture, when both
  top-align on the h2's cap height. Tablet: words c1–c6, then the picture c1–c8, 40 px apart.
  Phone: words, then the picture, 40 px apart (6.6).
- **h2 to lede** 24 px (16 phone); **lede to list or picture** 48 px (40 tablet, 32 phone).
- **Lists**: the 7 px Brass Line lozenge hung in the margin, text in `body` (18/29, Founders
  Grotesk Text, Plate Ink), 16 px between items, 24 px text indent. Support bands use the plain
  6 px Graphite en rule instead (5.4). Links in lists and paragraphs: Plate Ink, underlined 1 px
  in Brass Line at a 3 px offset, 2 px Plate Ink on hover (4.8).

### 10A.0.4 The page close

How it works, For firms, What we file and Pricing each end on their own close (their own copy).
It is set like the last paragraph of a letter, above the footer's thick-and-thin rule.

```
DESKTOP (Cotton 2)                                                       above 96 · below 128
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ H2 at display-l, 52/56, one sentence per line (c1–c8)                                  │
│ Lede, Miller Text 22/34 (c1–c7)                                     24                 │
│                                                                      48                │
│ [ Run a free rehearsal ]  [ Questions ]   56 px, 16 px apart                           │
└───────────────────────────────────────────────────────────────────────────────────────┘
══════════════════════════ footer: thick-and-thin in Plate Ink (3 px · 2 · 1 px) ════════

PHONE: h2 34/38 · lede 19/30 · buttons full width, stacked 12 px apart
```

- Flush left. Primary "Run a free rehearsal": Brass `#D9A84A`, Plate Ink text (7.4:1),
  `button-l` 18/24 Founders Grotesk Medium, 56 px, 28 px side padding, `--chamfer` corners.
  The secondary, where the copy has one ("Questions", "See pricing"), is the outline button:
  56 px, 1 px Plate Ink border, Plate Ink text, no fill; hover fills Sheet `#FFFFFF` (on Cotton 2)
  in 120 ms.
- No picture, except For firms', whose close is the blank plate (10A.2.6). The close never
  animates (D2.1).
- While the close's Brass button is in view, the header button shows its outline and the phone
  bar slides away (10A.0.1).

### 10A.0.5 Pictures on these pages

- Every product picture is the live component with the example data (D1.1, D4), at 1:1, a white
  sheet with `--e-sheet` on Cotton, with its example label as a 14/20 Graphite caption under its
  lower-left corner, 12 px below. The home page's components are reused where these pages reuse
  the home page's stand-ins (`ProofVisual`, `TextToFormVisual`, `DeskVisual`, `TwoFirmsVisual`,
  `PapersVisual`, `RehearsalLog`), at a different crop or composition from the home page where
  noted, so a visitor coming from the home page isn't shown the same page twice (Elaine).
- A moving picture plays once per page view when 40% in view and then rests in its final frame,
  with the 24 px replay control in its caption row (D2.2). With reduced motion every picture is
  in its final state.
- Photographs are the foundation's commissions (C1–C12, D1). Engraved vignettes appear only on
  the account and system pages here (D1.4); this part names three, for the art-direction writer
  to commission with the rest of the set:

| # | Vignette | Used on |
|---|---|---|
| E1 | **The door from the step**: a firm's front door seen from the pavement, a blank name plate beside it with two level screws, the door a hand's width ajar | Log in (side panel), invite expired |
| E2 | **The letter at the door**: a plain envelope slipped halfway under a closed door, on the sill | Check your email, confirm your email, forgot and reset password |
| E3 | **The blank plate**: the Name Plate engraved at large size, full bevel, slotted screws level, nothing on it (Hal V7) | The 404 |

  One ink: Plate Ink on light, Night Ink `#ECE8DF` on dark; line weight 0.6 to 2.4 px at 1×; a
  vignette shape that fades out in hatching, never boxed; decorative (`alt=""`), because each
  sits beside words that say the same thing.

### 10A.0.6 Notices and form states on these pages

Every form here (sign-up, log in, the password and confirmation forms, For platforms' inquiry)
uses the same pieces, drawn in CoFile's ink. The components writer owns the full specs; what these
pages need:

- **Fields:** labels above, `label` 16/22 Founders Grotesk Text Medium, Plate Ink; the field
  56 px tall, Sheet fill, 1 px Rule Strong `#8A8578` border, `--r-sheet` (2 px) corners, 16 px
  side padding, text `input` 18/24. Help under the field in `help` 15/22 Graphite, 8 px below.
  "(optional)" stays in the label as the copy writes it. 24 px field to field, 48 px between
  groups (20 / 40 on phone). Focus: 2 px Plate Ink border plus the focus ring (D5). Selects carry
  a 12 px chevron of two 1.5 px strokes.
- **Checkboxes:** 24 px, 1.5 px Rule Strong border, 2 px corners; checked: Plate Ink fill, a
  white 2 px tick (the one tick on the site belongs in a box you tick). Label `ui` 17/24, the
  whole row a 48 px tap target.
- **Field error:** 2 px Madder `#9A2D2D` border; the message from the form (for example "Enter
  your work email.") 8 px under the field in 15/22 Madder, led by the 12 px Problem bar ▬ (4.3);
  `aria-describedby` already links them.
- **The notice slip** for a form's message and a page's notices: a Sheet strip, 1 px Rule border,
  a 4 px left rule in the tone, 16 px padding, text `ui` 17/24 Plate Ink, any link underlined; the
  tone's glyph (12 px) before the text, so tone is never color alone.

| Tone | Left rule | Glyph | Used for (these pages) |
|---|---|---|---|
| Plain | Plate Ink | none | "Your session ended. Log in again to carry on."; "If that email has an account, we've sent it a link …"; "If that email is waiting for confirmation, we've sent a new link. …"; "Google sign-in was cancelled."; "Google sign-in isn't available here yet." |
| Done | Verdigris `#2E6B57` | ● | "Your password is changed. Log in with the new one."; "Your account is ready. Log in to set it up."; "Your email is confirmed. …"; "Thanks. We have your request and will reply by email." |
| Attention | Ochre `#855A0C` | ◐ | "Your account is waiting for approval. We'll email you when it's ready."; "Confirm your email first: open the link we sent when you signed up." |
| Problem | Madder `#9A2D2D` | ▬ | "Check the highlighted fields."; "That email and password don't match an account."; every "… Try again in a minute."; "Too many tries. …"; "Too many sign-ups from here. …"; "This link has expired …"; the other Google messages |

- **Where the form's message sits:** directly above the form's button, so it is where the person
  pressed (the component's `Msg` moves up; its words don't change). It is `role="alert"` for
  problems and `role="status"` otherwise, and takes focus on a failed submit.
- **Pending:** the button shows the component's own label ("Creating…", "Signing in…",
  "Sending…", "Saving…", "Confirming…") and holds its pressed (debossed) state; fields stay
  editable.
- In dark mode the cards become Night Card `#1F2230`, fields Night 2 `#1A1D27` with a 1 px
  `#6E7180` border and Night Ink text; slips Night Card with the dark tone values (4.6).

---

## 10A.1 How it works (`/how-it-works`)

The page that explains the job, so it has more pictures than any other page behind the home page:
the three people who do the three steps, the proof as the firm gets it, the text that becomes a
filing, the papers coming home (Hal, Elaine).

Copy from `web/app/how-it-works/page.tsx`.

**Order and grounds:** title page (Cotton) · the steps (Cotton) · the proof (Cotton) · requests
(Cotton) · checks (support, Cotton 2) · after (Cotton) · close (Cotton 2).

### 10A.1.1 Title page

Kicker "How it works" · h1 "Your client asks. You approve it. CoFile files it." in three lines,
one sentence each, c1–c8 · lede "Three steps. Your client hands the job to you, and you sign off
before anything is filed." No frontispiece: the steps directly below are the picture.

### 10A.1.2 The steps (`#steps`): one, two, three

Three columns, each led by its numeral and its photograph: the client who asks, the firm owner who
approves, the filing professional who files (Elaine's triptych, Greta's 1-2-3, Hal's middle
sheet). It's an ordered list (`<ol>`), so the numerals are list numbers, not new copy.

```
DESKTOP 1440 (Cotton)                                                  showpiece rhythm
   c1–c4 (384)                c5–c8 (384, on a sheet)          c9–c12 (384)
                           ┌──────────────────────────────┐
   1                       │ 2                            │     3            ← Miller Display
                           │                              │                    120/120, Plate Ink
  ┌──────────────────┐     │ ┌──────────────────────────┐ │    ┌──────────────────┐
  │ C5 (alt frame):  │     │ │ C8: the firm owner at    │ │    │ C10: one of      │
  │ Ana at the       │     │ │ her desk, reading the    │ │    │ CoFile's filing  │
  │ counter, thumbing│     │ │ proof on screen          │ │    │ professionals at │
  │ a text           │     │ │                          │ │    │ work, from the   │
  │ 4:5, 320 × 400   │     │ │ 4:5, 320 × 400           │ │    │ side · 320 × 400 │
  └──────────────────┘     │ └──────────────────────────┘ │    └──────────────────┘
  Ana Ortiz · text …       │ Sample proof · test details …│    [caption: copy needed]
                           │                              │
  Your client asks.        │ You approve it.              │    CoFile files it.  ← display-s
  They fill in a short     │ You get the proof: one page  │    It fills in the      26/32
  form from your link, …   │ with your firm's name at the │    state's own website  body 18/29
  (as written)             │ top, showing every detail and│    screen by screen, …
                           │ every fee.                   │    (as written)
                           └──────────────────────────────┘
                              32 px inner margin, --e-sheet
```

- **Numerals** "1", "2", "3": Miller Display, lining figures, 120/120 desktop, 96/96 tablet,
  72/72 phone, Plate Ink, hung so their left edge sits 4 px outside the column's text edge (optical
  alignment of the figure's left side bearing). 24 px to the photograph.
- **The middle column is a sheet** (Hal): Sheet `#FFFFFF`, `--e-sheet`, `--r-sheet`, 32 px inner
  margins on all sides, extending from 32 px above the numeral to 32 px below the paragraph. The
  outer two columns carry the same 32 px inner offset without the sheet, so the three numerals,
  photographs and leads sit on the same lines. It's the firm's step, and the firm's sheet.
- **Photographs** 4:5 at 320 × 400 (the column less its inner margins), square-cut, 24 px to the
  lead. Captions 14/20 Graphite 12 px under each: step 1 "Ana Ortiz · text message · example"
  (her phone shows the text in CoFile's neutral bubble, D1 C5); step 2 "Sample proof · test
  details · not a real business" (the proof is composited on her screen); step 3 the person's name
  and role `[copy needed]` (C10: real staff with consent).
  - Step 1 uses a second frame from the C5 session, closer, on the hands and the phone, so the
    home page's Requests photograph isn't repeated.
  - Step 2 is C8, cropped to 4:5 on her face, the reading glasses and the screen.
  - Step 3 is C10's side-on frame at the desk.
- **Leads** "Your client asks.", "You approve it.", "CoFile files it." in `display-s` (Miller Text
  26/32), 12 px to the paragraph in `body`.
- **If C10 can't be photographed with real staff**, all three photographs drop together and the
  steps stand on the numerals alone (the numerals then grow to 160/144, `price-xl`'s size, which
  is free on this page because it has no price). A triptych with a hole in it would say the wrong
  thing about the people.
- **No motion.** The steps are read, not watched.
- **Tablet:** three columns at c1–c3 / c4–c6 / c7–c8 don't hold; the steps become one row each:
  numeral and photograph (4:5, 240 × 300) in c1–c3, lead and paragraph in c4–c8; the middle row
  on its sheet. **Phone:** stacked; each step is numeral (72), lead, paragraph, then its
  photograph at 4:3 (350 × 262, the photographer's phone crop), 48 px between steps; step 2's sheet
  runs edge to edge (no side margins, no shadow, 20 px inner margins), like the proof on a phone.

```
PHONE 390
┌──────────────────────────────┐
│ 1                  72/72     │
│ Your client asks.  22/28     │
│ They fill in a short form …  │ 17/27
│ ┌──────────────────────────┐ │
│ │ C5 alt frame, 4:3        │ │ 350 × 262
│ └──────────────────────────┘ │
│ Ana Ortiz · text message · … │
│                              │ 48
│▐ 2 ─────── sheet, edge to edge│
│▐ You approve it.             │
│▐ You get the proof: one page …│
│▐ [ C8, 4:3 ]                 │
│▐ Sample proof · test details  │
│                              │ 48
│ 3 · CoFile files it. · …     │
└──────────────────────────────┘
```

### 10A.1.3 The proof (`#proof`): you've approved a proof before

The page's moment (D3): a letterhead proof from the printer becomes the filing proof, and the
list points at it (Marcus M10 and M11, Elaine's numbered callouts, Hal's printer's proof).

h2 "You see what the state will see, before the state does." · the lede "You've approved a proof
before: business cards, letterhead, an invitation at the printer. …" (as written) · the six items.

```
DESKTOP 1440 (Cotton)                                                           showpiece
 c1–c5 (486)                                c7–c12 (588) + bleed 120
┌──────────────────────────────────┐      ┌────────────────────────────────────────────┐
│ You see what the state will see, │      │ ┌ the proof (picture size, 560) ─────────┐ │
│ before the state does.  display-m│      │ │        [H&P]  Harbor & Pine CPA         │ │
│                                  │      │ │ ═══════════════════════════════════════ │ │
│ You've approved a proof before:  │      │ │ ─────────────────────────────────────── │ │
│ business cards, letterhead, an   │      │ │ Two Sisters Bakery LLC  ◆ Ready to…     │ │
│ invitation at the printer. …     │  [1] │ │ Business name   TWO SISTERS BAKERY LLC  │ │
│ (lede 22/34, as written)         │      │ │ Members         Ana Ortiz, Lucia Ortiz… │ │
│                                  │      │ │ Main business…  88 Grove St, Jersey…    │ │
│ ┌ C9, 3:2, 486 × 324 ──────────┐ │  [2] │ │ Formation filing fee ·········· $100.00 │ │
│ │ the printer's proof, pencil  │ │      │ │ NJ portal fee, by card ··········· $3.50│ │
│ │ initials, a loupe            │ │      │ │ ─────────────────────────────────────── │ │
│ └──────────────────────────────┘ │      │ │ Total to the state ············ $103.50 │ │
│                                  │      │ │ ═══════════════════════════════════════ │ │
│ [1] Every name, address and      │  [3] │ │ New Jersey's own review page, filled in │ │
│     answer, in the order the     │      │ │ ┌ Business Name  TWO SISTERS BAKERY ──┐ │ │
│     state asks for them          │      │ │ └ Designator     LLC ───────────────────┘ │ │
│ [2] Every fee in dollars and …   │  [4] │ │ Authorizations                          │ │
│ [3] Where the state's website …  │      │ │ I authorize the filing company to pay   │ │
│ [4] Each statement on the form,  │      │ │ the state fee shown on the proof. ▬▬▬▬  │ │
│     and who made it, …           │  [5] │ │ [ Approve for filing ]  (Harbor)        │ │
│ [5] One button. Until it's       │      │ │                 ────                    │ │
│     pressed, nothing is …        │      │ │              with CoFile                │ │
│ ─────────                        │      │ └─────────────────────────────────────────┘ │
│ Like reviewing a return before   │      │ Sample proof · test details · not a real…  │
│ you e-file it: nothing goes to   │      └────────────────────────────────────────────┘
│ the state until you've signed    │       callout tiles [1]–[5] hang in the 28 px left
│ off.   (lede, italic)            │       margin of the sheet, on Cotton
└──────────────────────────────────┘
```

- **Words** c1–c5, top-aligned with the proof's top edge (the column is longer than the picture).
  The lede is `lede`; the printer's photograph **C9** follows it 32 px below at 3:2, 486 × 324,
  square-cut, its caption `[copy needed]` or none (fictional names only on the cards in it, D1
  C9). The copy's own comparison, in a picture (Hal, Elaine, Marcus).
- **The six items** 48 px below the photograph. Items one to five are led by a **callout tile**
  instead of a lozenge: a 28 × 28 px tile with `--chamfer-s` corners, 1 px Plate Ink border, Sheet
  fill, its number in Founders Grotesk Text Medium 14/18 tabular, Plate Ink, hung in the margin.
  Item text `body`, 16 px apart. The sixth item, "Like reviewing a return before you e-file it:
  nothing goes to the state until you've signed off.", is set apart as the closing remark in
  `lede` in Miller Text Italic, Plate Ink, under a 40 px Rule hairline 24 px above it, with no
  marker: it's the line every CPA will recognise (Hal, Elaine, Priya). It stays the last item of
  the same list.
- **The picture** c7–c12: the proof at picture size (560 px wide, the proof component's
  "picture" size from the firm-pages writer, the same as Home 4), showing D4's proof data, plus,
  on this page only, a short **Authorizations** group above the button, so item four has a place
  to point to: the product's own legend "Authorizations" (`web/components/IntakeForm.tsx`), the
  product's own New Jersey statement "I authorize the filing company to pay the state fee shown
  on the proof." (`web/lib/intake/forms.ts`, `nj-payment`), and who made it as a neutral 96 × 8 px
  Rule bar, never an invented name (D1.1). The "New Jersey payment screen" slip under the sheet's
  foot is left off on this page: the list doesn't mention it, and Home 4 owns it.
- **Callout tiles on the picture**: the same five tiles hang in a 28 px margin left of the sheet,
  each level with the top of its region (1 the details rows, 2 the fees, 3 the state's review
  page, 4 the Authorizations group, 5 the button). They're CoFile's annotations, outside the
  firm's sheet, in Plate Ink; nothing of CoFile's ink touches the proof itself.
- **Pointing (M11, Marcus).** Hovering or focusing a list item one to five (each is a focusable
  `button` wrapping the item's words) washes its region on the proof in `--firm-tint` `#DDEEF7`
  (the proof's own "check this" highlight, 3.6) and fills its two tiles with Plate Ink, numbers in
  Sheet, in `--t-quick` 120 ms. Leaving clears it. The tour goes at the reader's pace; nothing
  plays on its own.
- **The moment: the letterhead proof becomes the filing proof** (Marcus M10, D3), once, when the
  picture is 40% in view, 1.6 s:
  1. 0 ms: the sheet lies in place as a **letterhead proof**: Harbor & Pine's centred Letterhead
     and Firm Rule at the top (exactly as on the proof), below it a letter's body in seven grey
     Rule bars, and printer's **crop marks** at the four corners (0.5 px Plate Ink, 16 px arms,
     8 px outside the sheet).
  2. 0–300 ms: the crop marks fade (`--ease-exit`).
  3. 200–1100 ms: the Letterhead stays perfectly still; the grey bars set into the proof's rows
     one by one, 70 ms apart, each with `press-in` (D2): the title row and chip, three detail
     rows, the fee rows with leaders drawing (`--t-draw`), the total with its single and double
     rules, the review-page frame, the Authorizations group.
  4. 1100–1450 ms: the "Approve for filing" button presses in last (it never pulses).
  5. 1450–1600 ms: the callout tiles fade in beside their regions.
  Reduced motion and no-JavaScript: the finished proof with its tiles. The replay control sits in
  the caption row.
- **Dark mode:** the page goes Night; the proof stays a white sheet with `--e-sheet-dark`; the
  tiles become Night Ink outlines on Night.
- **Tablet:** words c1–c8, then the picture c1–c8 (the proof at 560, centred, tiles in its left
  margin). **Phone:** h2, lede, C9 (350 × 233), the six items (tiles hung in the 20 px margin),
  then the proof in its phone layout, 318 px wide, keeping a 32 px gutter of Cotton on its left
  where the five tiles hang at 24 px, level with their regions (so the tiles still never touch the
  firm's sheet). No hover: the numbers do the pointing.

### 10A.1.4 Requests (`#requests`): the text becomes a filing

h2 "Clients don't always fill in forms. They text you." · lede "Send the request on as it is, by
email, text, WhatsApp or Slack. …" (as written).

The words sit on the right this time (c8–c12) and the picture on the left (c1–c6, bleeding left).
Because step 1 above already shows Ana at the counter, the picture here is the product alone: the
copy is about a text, so the **drawn phone slab** (6.4: 44 px radius, 10 px Plate Ink bezel, no
brand) holds Ana's message in CoFile's neutral bubble ("Need an LLC for the bakery. It's me and my
sister, 50/50, in Jersey City." with "Ana Ortiz · text message · example" under it), and the
**draft sheet** ("Draft: New Jersey LLC formation", "For your team to check", the five rows of D4
with their "from the text" and "already filled" tags) lies beside it, overlapping the slab's right
edge by 48 px.

```
DESKTOP 1440 (Cotton)
 bleed  c1–c6 (588)                                    c8–c12 (486)
┌──────────────────────────────────────────────┐    ┌─────────────────────────────────┐
│  ╭─────────────╮                              │    │ Clients don't always fill in    │
│  │ ┌─────────┐ │   ┌─────────────────────────┐│    │ forms. They text you. display-m │
│  │ │Need an  │ │   │ [H&P] Harbor & Pine CPA ││    │                                 │
│  │ │LLC for  │ │   │ ════════════════════════ ││    │ Send the request on as it is,   │
│  │ │the bak… │─┼───┤ Draft: New Jersey LLC …  ││    │ by email, text, WhatsApp or     │
│  │ └─────────┘ │   │ Business name  TWO SIS… ◂││    │ Slack. … (lede, as written)     │
│  │ Ana Ortiz · │   │ Members  Ana Ortiz, Lu… ◂││    │                                 │
│  │ text message│   │ City     Jersey City, NJ ││    └─────────────────────────────────┘
│  ╰─────────────╯   │ Registered agent  Your… ││
│  slab 260 × 520    │ Organizer and signer …   ││
│                    └─────────────────────────┘│
│  Example · test details · not a real firm     │
└──────────────────────────────────────────────┘
```

- Slab 260 × 520 px; draft sheet 400 px wide; both sit on Cotton, the sheet with `--e-sheet`.
- Motion: the home page's "Nobody retypes it" choreography (Home 3, 3.4 s, D3) plays on this
  instance once: the three phrases underline in Brass Line, leaders draw from the bubble to their
  rows, the two saved rows ink together without lines, the chip presses in last.
- Caption "Example · test details · not a real firm".
- **Phone:** words, then the slab (240 × 480, centred) with the draft sheet under it at full
  width, overlapping the slab's foot by 32 px; leaders are dropped and the phrases' Brass Tint
  `#F6EBD0` highlights match the rows' tags instead.

### 10A.1.5 Checks (`#checks`): a support band

h2 "Checks before every filing." · lede "A state filing can't be taken back, so CoFile would rather
stop and ask than guess." · four items (as written), the band Security links to.

```
DESKTOP 1440 (Cotton 2)                                                    support rhythm
 c1–c4 (384)                          c6–c12 (690)
┌────────────────────────────────┐  ┌──────────────────────────────────────────────────┐
│ Checks before every filing.    │  │ – The fee you approve comes from a verified fee   │
│                      display-m │  │   table. CoFile reads it again on the state's …   │
│ A state filing can't be taken  │  │                                              24   │
│ back, so CoFile would rather   │  │ – It reads the fine print. By card, New Jersey's  │
│ stop and ask than guess.       │  │   standing certificate costs $52 for an LLC and …│
│                     lede 22/34 │  │ – If a state has changed its form since …         │
│                                │  │ – A filing is never sent twice on its own. …      │
└────────────────────────────────┘  └──────────────────────────────────────────────────┘
```

- Cotton 2, support rhythm. Items in `body`, 24 px apart, each led by the 6 px Graphite en rule
  (support lists, 5.4); "$52" and "$27" in tabular lining figures. No picture, no icons, no motion,
  no checks or shields: plain, well-set reading for the reader who comes looking (Hal, Marcus,
  Elaine).
- Tablet: h2 and lede c1–c8, items c1–c8 below. Phone: stacked.

### 10A.1.6 After (`#after`): the papers come home

h2 "The papers come back to you." · lede "Some states answer at once. Others take their time: …"
(as written) · three items.

Words c1–c5; picture c7–c12 bleeding right: photograph **C6** in its envelope frame (the heavy white
envelope addressed "Harbor & Pine CPA" on the walnut desk, papers edge-on), 4:3 at 708 × 531
including the bleed, and the live **record sheet** (`PapersVisual`: the stages "Approved",
"Submitted", "Filed" on their hairline, the two document cards "New Jersey · Certificate of
Formation · TWO SISTERS BAKERY LLC" and "IRS · EIN letter (CP 575) · EIN 00-0000000") laid over
the photograph's lower-left corner, 420 px wide, overlapping it by 96 px to the left (into c6) and
120 px from below. It's Home 5's scene from the other side: there the envelope opens, here the
papers are already home.

```
 c1–c5 (486)                          c7–c12 (588) + bleed
┌────────────────────────────────┐   ┌──────────────────────────────────────────┐
│ The papers come back to you.   │   │  C6: walnut desk, the envelope addressed │
│ Some states answer at once. …  │   │  "Harbor & Pine CPA", papers edge-on     │
│ ◆ The state's documents, saved │   │  4:3                                     │
│   to the filing and sent to you│ ┌─┴───────────────────────────┐              │
│ ◆ The EIN: CoFile applies with │ │ ● Approved ─ ● Submitted ─ ● Filed        │
│   the IRS once …               │ │ ┌ New Jersey ────┐ ┌ IRS ────────────┐   │
│ ◆ What was approved, what was  │ │ │ Certificate of │ │ EIN letter      │   │
│   filed and what the state …   │ │ │ Formation      │ │ (CP 575)        │   │
└────────────────────────────────┘ │ └────────────────┘ └─────────────────┘   │
                                   └──────────────────────────────┘
                                    Example record · sample documents
```

- Motion: the three stages ink along the hairline (Done chips press in, 70 ms apart), then the two
  document cards set side by side with `press-in`; 1.6 s, once. No envelope animation here (it's
  already open in the photograph).
- Caption "Example record · sample documents" under the record sheet; the photograph's alt text
  `[copy needed]` (D7).
- **Phone:** words, then C6 at 4:5 (350 × 438), then the record sheet full width overlapping the
  photograph's foot by 48 px.

### 10A.1.7 Close

h2 "Run one rehearsal. Then decide." (one sentence per line) · lede "A rehearsal fills in every
screen of the state's real website and stops before the last button. It's free, and nothing is
filed or paid." · "Run a free rehearsal" (Brass) and "Questions" (outline). The page close
(10A.0.4).

### 10A.1.8 The page on a phone, top to bottom

Header 64 · beta notice · title page (kicker, h1 in three balanced lines at 38/42, lede) · the
three steps · the proof (h2, lede, C9, list, proof) · requests (words, slab, draft) · checks on
Cotton 2 · after (words, C6, record) · close · footer. The sticky bar appears once the title page
has scrolled away and leaves while the close's button is on screen.

---

## 10A.2 For firms (`/for-firms`)

The page for the owner who is already interested, and it's about her firm: the engraver cutting
the firm's name, her own name and color on four pieces of her desk at once, the two doors, her
saved agent, and the blank plate waiting at the end (Marcus, Hal, Rosa's film structure).

Copy from `web/app/for-firms/page.tsx`.

**Order and grounds:** title page with the engraver film (Cotton) · the desk and the brand studio
(Cotton) · the doors (Cotton) · the agent (Cotton) · close with the blank plate (Cotton 2).

### 10A.2.1 Title page, with the engraver

Kicker "For CPA, payroll, fractional CFO and title firms" (it may wrap to two lines; in Spanish it
will) · h1 "Form the business. Keep the client." (two lines, one sentence each) · the lede "Your
client needs an LLC. Who do they call? You. They always have. Until now, saying yes meant someone
on staff typing the same agent address into a state website again, or sending the client to an
online formation site and getting back a filing you never saw. CoFile lets you say yes and keep
your name on it."

**The frontispiece: the engraver film (C11, D3).** A hand engraver at the bench cuts "Harbor & Pine
CPA" into the brass plate, then fits it beside the harbor-blue door. 12 s, silent, shot for 4:5
(and 16:9 for the social cut).

```
DESKTOP 1440 (Cotton)                                                  above 96 · below 128
 c1–c7 (690)                                       c9–c12 (384) + bleed 120 = 504
┌───────────────────────────────────────────┐     ┌──────────────────────────────────┐
│ ━ For CPA, payroll, fractional CFO and    │     │                                  │
│   title firms                             │     │   C11: the engraver film, 4:5    │
│                                           │     │   504 × 630                      │
│ Form the business.                        │     │   0–7 s  the burin cuts "Harbor  │
│ Keep the client.           display-page   │     │          & Pine CPA" (macro)     │
│                                           │     │   7–10 s the plate is lifted,    │
│ ┌──┐our client needs an LLC. Who do they  │     │          polished                │
│ │Y │call? You. They always have. Until    │     │   10–12 s fitted beside the door │
│ └──┘now, saying yes meant someone on staff│     │          (C1's medium frame);    │
│ typing the same agent address into a …    │     │          holds                   │
│ (lede 22/34, 34 em, as written)           │     │ [❚❚]                             │
│                                           │     └──────────────────────────────────┘
│                                           │      [credit: copy needed]
└───────────────────────────────────────────┘
```

- The lede is the longest paragraph on the public pages and reads like a letter from one firm
  owner to another, so it gets the full `lede` size and a 34 em measure, and its first letter is
  a three-line **initial**: a Miller Display "Y" at `initial-letter: 3`, Plate Ink, no color, no
  ornament (Hal; his Copper becomes ink, since Brass is never text on paper). Desktop and tablet
  only; phones set the lede plainly.
- **The film**: 504 × 630 (c9–c12 plus the 120 px bleed), square-cut, no shadow (it's a
  photograph). Plays once, muted, when 40% in view; holds its last frame, the finished plate on
  Harbor & Pine's door, which is C1's medium frame (D1). A 40 px pause/play button sits inside the
  film's lower-left corner, 16 px in: `--chamfer`, Sheet fill at 100%, 1 px Rule border, a 16 px
  Plate Ink glyph; its accessible names `[copy needed]`. With reduced motion, Save-Data or no
  JavaScript the poster is the last frame and nothing plays. A text description for screen
  readers and the craftsperson's credit under it, 14/20 Graphite `[copy needed]` (D7). Weight:
  under 2.5 MB (AV1/H.264, 1008 × 1260 at 2×), loaded only once the head is in view.
- **Tablet:** words c1–c8; the film under the lede at c1–c6, 4:5. **Phone:** words, then the film
  at 350 × 438, its own phone master (tighter on the hands and the plate).

### 10A.2.2 The desk (`#desk`): your filing desk, in your brand, and the studio

h2 "Your filing desk, in your brand." · five items (as written):

1. "Your filing desk carries your firm's name, logo and color."
2. "Send one client a link, keep a permanent filing page for each filing you offer, or put the
   filing button on your own website."
3. "Your client sees your firm on the form and in every email. The only sign of us is a small
   “with CoFile”." The quoted words are set in the **Imprint** style itself (`imprint`, 13/16:
   "with" in Miller Text Italic, then the wordmark's small master, Graphite), inside the 18 px
   sentence; the curly quotes stay at the sentence's size. Ours, in small type, again, literally.
   It's still text, read normally by a screen reader.
4. "Your saved answers (registered agent, organizer, signer, addresses) fill in every filing, so
   nobody types them twice."
5. "CoFile is built and run by filing professionals. When a filing needs a person, one of them
   takes over." This item is led by a 40 px square crop of one C10 portrait instead of a lozenge
   (Hal, Priya), the only portrait in a list on the site; without C10, the lozenge stays.

The band's picture is **the desk**, and under it the **brand studio**: the visitor types a name and
picks a color, and four pieces of the firm's own product take it at once (Marcus M12, Dev's dial,
D3).

```
DESKTOP 1440 (Cotton)                                                          showpiece
 c1–c5 (486)                                c7–c12 (588) + bleed 120 = 708
┌───────────────────────────────────┐   ┌────────────────────────────────────────────────┐
│ Your filing desk, in your brand.  │   │ [H&P] Harbor & Pine CPA     with CoFile  ……▾   │ 76
│                         display-m │   │ ═══════════════════════════════════════════════ │
│ ◆ Your filing desk carries your   │   │ Filings  New filing  Ready to pay  Client links │ 52
│   firm's name, logo and color.    │   │ Client filings                    [New filing]  │
│ ◆ Send one client a link, …       │   │ Two Sisters Bakery LLC     ◆ Proof ready to …  │
│ ◆ Your client sees your firm on … │   │ New Jersey LLC formation                        │
│   small "with CoFile".  ← imprint │   │ Hudson Ledger LLC          ● Filed              │
│ ◆ Your saved answers (registered  │   │ …   the desk, 1:1, cropped at 520 px tall       │
│   agent, …) …                     │   └────────────────────────────────────────────────┘
│ [▣] CoFile is built and run by …  │    Example · test details · not a real firm
└───────────────────────────────────┘
                                                                                      48
┌ the studio tray (Cotton 2, 1 px Rule, 24 px padding), c1–c12 ────────────────────────────┐
│ Name your clients see                Main color                          Font              │
│ [ Harbor & Pine CPA            ]     ▣ ▣ ▣ ▣ ▣ ▣ ▣ ▣ ▣ ▣  [▦] #1D4E63      [ Lora (serif) ▾]│
│  field 400 × 56                      10 swatches, 40 px, 8 apart; picker   select 260     │
└──────────────────────────────────────────────────────────────────────────────────────────┘
                                                                                      24
┌ c1–c4: a client's page ──┐ ┌ c5–c8: the proof's head ─┐ ┌ c9–c12: an email ──────────┐
│ [H&P] Harbor & Pine CPA  │ │      [H&P]               │ │      [H&P]                  │
│ ════════════════════════ │ │   Harbor & Pine CPA      │ │   Harbor & Pine CPA         │
│ Start your New Jersey LLC│ │ ════════════════════════ │ │ ═══════════════════════════ │
│ Business name            │ │ Two Sisters Bakery LLC   │ │ Your proof is ready         │
│ [______________________] │ │ ◆ Ready to approve       │ │ ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬       │
│ Who owns it              │ │ [ Approve for filing ]   │ │ [ Open your proof ]         │
│ [______________________] │ │          ────            │ │          ────               │
│ [ Continue ]             │ │       with CoFile        │ │       with CoFile           │
│          ────            │ └──────────────────────────┘ └─────────────────────────────┘
│       with CoFile        │   each 384 × 440, 1:1, its live phone-width layout
└──────────────────────────┘
 Example · test details · not a real firm
```

- **The desk** (c7–c12, bleeding right to 708 px): the live filing desk at 1:1 in Harbor & Pine's
  brand, D4's desk data, cropped at 520 px tall: the Letterhead row with "with CoFile" at its
  right (3.4), the Firm Rule, the navigation row with the desk's own labels ("Filings", "New
  filing", "Ready to pay", "Client links", "Signatures", "Setup", "Billing", as many as the width
  shows), "Client filings" and the four rows. The account-menu email is a neutral Rule bar (the
  foundation's desk wireframe calls the address a placeholder). Same component as the hero
  (Home 1), here wider and without the proof tucked behind.
- **The studio tray** (c1–c12, 48 px under the desk): Cotton 2, 1 px Rule border, `--r-sheet`,
  24 px padding, three of the product's own Branding controls with their own labels
  (`web/components/SetupForms.tsx`, `BrandFields.tsx`):
  - "Name your clients see": the field, 400 × 56, pre-filled "Harbor & Pine CPA", or with the
    name the visitor typed at the home page's Close or here before (the same `sessionStorage`
    record as D3; it never leaves the browser). Max 80 characters, as in the product.
  - "Main color": ten 40 × 40 swatches with `--chamfer` corners, 8 px apart: Harbor `#1D4E63`
    first and selected, then the product's nine ready colors (`#1f4fd1`, `#0f766e`, `#15803d`,
    `#b45309`, `#b91c1c`, `#7e22ce`, `#be185d`, `#334155`, `#111827`), then the product's color
    picker (40 × 40) and the hex in Founders Grotesk Mono 15/22 Graphite. Selected: a 2 px Sheet
    gap and a 2 px Plate Ink ring. Accessible names as the product's ("Ready colors for main
    color" for the group, each swatch its hex, "Main color, picker"). The product's help line under
    the color ("Buttons and the top of the page. Button text is white, so choose a dark color.") is
    left out of the studio: the ink match (3.6) makes any color work here, and whether that line
    changes is the foundation's open copy question.
  - "Font": the product's select with its presets ("Standard (the device's own)", "Inter", "IBM
    Plex Sans", "Roboto", "Open Sans", "Lato", "Montserrat", "Source Serif (serif)",
    "Merriweather (serif)", "Lora (serif)"), 260 px, "Lora (serif)" selected.
  - The tray's group name for screen readers `[copy needed]`.
- **The four previews** (the desk above, and three 384 × 440 crops below the tray), each a live
  component at 1:1 on a white sheet with `--e-sheet`: a client's page ("Start your New Jersey
  LLC", "Business name", "Who owns it", "Continue", the Imprint at its foot) in its phone-width
  layout; the proof's head (the centred Letterhead, "Two Sisters Bakery LLC", the "Ready to
  approve" chip, "Approve for filing", the Imprint); and the proof-ready email (the centred
  Letterhead, the product's own "Your proof is ready", one grey Rule bar for its paragraph, the
  product's own "Open your proof" button, the Imprint). Text inside them never drops under its
  real size, and the Imprint is its true 13 px (Marcus).
- **What a change does** (M12): typing changes the name everywhere on each keystroke (no
  animation: it's typing); choosing a color re-inks all four, name first, then the Firm Rule, then
  the buttons, chips and links, 60 ms stagger across the four, each a 240 ms crossfade. The ink
  match (3.6) derives `--firm-fill`, `--firm-ink`, `--firm-wash` and the rest live, so a yellow or
  a pale pink looks right at once and the visitor sees the system at work. The font applies to
  the name, headings and client buttons only (3.7). **"with CoFile" never changes, never moves,
  never takes the color.**
  - Once the visitor edits the name, Harbor & Pine's logo is dropped from all four (we never put
    one firm's logo beside another firm's name) and each Letterhead becomes the **typeset name
    alone** at its no-logo size (3.5.5: 30/36 on the sheets, 20/26 in the desk row), with the
    Firm Rule doing the work. The **monogram tile** (the plate's chamfered square in
    `--firm-fill`, up to two initials in `--firm-on`) appears only where a square symbol is
    unavoidable: the desk's account menu and the email's avatar. A firm looks finished before it
    adds a logo (Marcus, with the foundation's no-logo rule).
  - Emptying the field shows the product's own preview placeholder, "Your firm"
    (`BrandPreview`), in every Letterhead.
  - The chosen color is kept in the same `sessionStorage` record as the name and carried to
    sign-up's letterhead preview (10A.9.3) and, for the firm-pages writer, to Branding.
- **Reduced motion:** changes apply instantly. **No JavaScript:** the four previews show Harbor &
  Pine and the controls are hidden (the band still reads).
- **Tablet:** words c1–c8; the desk c1–c8 at 1:1 (754 px); the tray full width with the swatches
  wrapping to two rows; the three crops in a horizontal row that snaps inside itself (each 320 px,
  16 px peek). **Phone:** words; the desk in its phone layout (350 wide, cropped at 440); the tray
  (each control full width; swatches two rows of five, 48 px targets; the picker and hex on their
  own row); then the three crops as a snap row (300 px cards, 16 px peek, 12 px gaps), with 6 px
  page dots under them, `aria-hidden`. No sticky controls (6.6).

### 10A.2.3 The doors (`#brand`): your name on the door, ours in small type

h2 "Your name on the door. Ours in small type." set as on the home page: "Your name on the door."
at the band's h2 size (`display-m` here), then "Ours in small type." on its own line in
`small-type` (Miller Text Italic 18/26, Graphite) 16 px below, one h2 (5.4) · lede "The same page
carries each firm's own name, logo and color. Your clients never see another firm's, or a big
CoFile logo."

The picture is **Two doors, one page** (Home 2, `TwoFirmsVisual`): the two door photographs (C1,
C2), the same client page under Harbor & Pine and under Northgate Payroll, "with CoFile" at the
foot of both, unmoved, and the brass wipe handle between them.

- Picture c1–c7 bleeding left, words c9–c12 (the home page's arrangement, since the copy repeats
  the home page's headline here).
- **On this page the picture rests in its final state with the wipe handle at the middle of the
  left page**, so the two brands show side by side on one sheet from the start (Hal 10.2). It plays
  the 4.2 s signature only if the visitor hasn't already seen it on the home page during this
  visit (a `sessionStorage` flag): the signature belongs to the first time.
- The two doors stay the two example firms; the visitor's typed name doesn't appear on them
  (foundation decision "Where the visitor types their own firm's name").
- Caption "Two example firms · same page, each in its own brand". Phone: words, then the doors as
  the home page's two-card swipe, resting on the left card.

### 10A.2.4 The agent (`#agent`): your registered agent, or ours

h2 "Your registered agent, or ours." · lede "Name your own registered agent in each state, or use
ours, provided through Registered Agents, Inc. Either way it's filled in on every filing." · three
items: "You approve every filing before it goes to the state. How it works" ("How it works" a
link), "CoFile saves the state's documents and the IRS letter and sends them to you.", "Pay per
filing or by plan. Pricing" ("Pricing" a link).

Words c1–c5; picture c7–c12: photograph **C8**, the firm owner at her own desk reading the proof
on screen (4:5, 486 × 608 in c8–c12 bleeding 120 px right), with a **detail plate** of the draft
laid over its lower-left corner: a white sheet 400 px wide, the edge of Harbor & Pine's Letterhead
and Firm Rule at its top (24 px of it), and two rows from D4's draft at 1:1, "Registered agent ·
Your saved agent · already filled" and "Organizer and signer · Your saved answers · already
filled", the "already filled" tags as on the home page (Elaine, Hal). It overlaps the photograph
by 104 px to the left (into c7) and sits 64 px above its foot. The owner, her proof and her saved
agent, in one picture: "Either way it's filled in on every filing."

```
 c1–c5 (486)                                    c7–c12 (588) + bleed
┌───────────────────────────────────┐          ┌──────────────────────────────────┐
│ Your registered agent, or ours.   │          │ C8: the firm owner reading the   │
│ Name your own registered agent …  │          │ proof at her desk, 4:5           │
│ ◆ You approve every filing before │          │                                  │
│   it goes to the state. How it …  │ ┌────────┴─────────────────────┐            │
│ ◆ CoFile saves the state's …      │ │ ═════════ (letterhead edge)   │            │
│ ◆ Pay per filing or by plan. …    │ │ Registered agent  Your saved … │ already    │
└───────────────────────────────────┘ │ Organizer and signer  Your …   │ filled     │
                                      └────────┬─────────────────────┘            │
                                               └──────────────────────────────────┘
                                                Example · test details · not a real firm
```

- One caption for the figure, "Example · test details · not a real firm"; the photograph's alt
  text `[copy needed]` (D7).
- No motion: the two rows are simply there, which is the point.
- Phone: words, then C8 at 4:5 (350 × 438), then the detail plate full width, overlapping the
  photograph's foot by 40 px.

### 10A.2.5 The page on a phone

Header · beta notice · title page (no initial) · the film · the desk: words, desk, tray, the three
crops · the doors: words, the swipe · the agent: words, C8, the detail plate · the close (below) ·
footer.

### 10A.2.6 Close: your plate, waiting

h2 "Open your firm's filing desk." · lede "Add your logo and color, then rehearse a real filing on
the state's own website. It's free, and nothing is filed or paid." · "Run a free rehearsal"
(Brass).

The only page close with a picture, because the page is about the firm's own name (Hal, Marcus,
Elaine): photograph **C3**, the blank plate in C1's light (C4 at dusk in dark mode), 4:5 at
c8–c12 (486 × 608, bleeding 120 px right). If the visitor typed a name (at the home page's Close
or in the studio above), it is **already engraved** on the plate, drawn with the engraving's SVG
version (the `feSpecularLighting` treatment, D2), still, complete on first paint: no cutting, no
push-in, nothing to wait for. If not, the plate is blank, in good light. This page shows the plate;
the home page's Close and sign-up are where it is cut.

```
DESKTOP 1440 (Cotton 2)                                                        close rhythm
 c1–c6 (588)                                         c8–c12 (486) + bleed 120
┌───────────────────────────────────────────┐      ┌──────────────────────────────────┐
│ Open your firm's filing desk.  display-l  │      │                                  │
│                                           │      │   C3: the blank plate on the     │
│ Add your logo and color, then rehearse a  │      │   harbor-blue door, 4:5          │
│ real filing on the state's own website.   │      │   ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲         │
│ It's free, and nothing is filed or paid.  │      │   │ ⊖  [typed name,   ⊖ │        │
│                                           │      │   │     or blank]       │        │
│ [ Run a free rehearsal ]                  │      │   ╲____________________╱         │
└───────────────────────────────────────────┘      └──────────────────────────────────┘
```

- Words vertically centred on the plate. The photograph's alt text: for the blank plate, the
  foundation's C3 alt; with a name, a pattern that includes the typed name `[copy needed]`.
- The name is fitted as at sign-up (10A.9.4).
- Phone: words and button first, then the photograph at 4:5 (350 × 438).

---

## 10A.3 What we file (`/what-we-file`)

The listings page. A filing firm reads this the way it reads a fee schedule, so it is set as a
clean ledger: every row's stage in words and in the plate glyph, nothing decorative (Hal, Priya),
with one stage scene in the middle that shows how a filing type earns its way to live.

Copy from `web/app/what-we-file/page.tsx`; rows and labels from `web/lib/coverage.ts`.

**Order and grounds:** title page (Cotton) · the table (Cotton) · how a filing type goes live
(**the stage**, Night) · state by state (Cotton) · close (Cotton 2).

### 10A.3.1 Title page

Kicker "What we file" · h1 "New York, New Jersey, Florida and the IRS." set by hand in four lines,
one place to a line, as a station's list of destinations (Greta): "New York, / New Jersey, /
Florida / and the IRS." (`display-page`, c1–c7; one h1, the breaks are `<br>`-free block spans so
a screen reader reads one sentence) · lede "Every filing type carries a plain label, so you
always know which ones are live today." beside the last two lines in c9–c12 on desktop (its first
baseline on the third line's), under the h1 on tablet and phone. No frontispiece: the four places
are the picture. Phone: the four lines hold at 38/42.

### 10A.3.2 The table (`#coverage`)

All sixteen rows of `COVERAGE`, in their order, as a **ledger table**: "Filing", "Where", "Where it
stands".

```
DESKTOP 1440 (Cotton)                                                          showpiece
 c1–c6 (588)                               c7–c8 (180)     c9–c12 (384)
 Filing                                    Where           Where it stands       ← 14/18 Medium
 ═══════════════════════════════════════════════════════════════════════════════   Graphite;
 LLC formation                             New Jersey      ┆▱┆ Rehearsed to the     1 px Ink rule
                                                           ┆  ┆ payment screen
 ───────────────────────────────────────────────────────────────────────────────  1 px Rule
 Standing certificate (through the API;    New Jersey      ┆▱┆ Rehearsed to the …
 not on the filing desk yet)  ← parenthetical in Graphite
 ───────────────────────────────────────────────────────────────────────────────
 …
 EIN, with the IRS letter saved            IRS             │▭│ Screens recorded,
                                                                rehearsal next
 …
 Corporation formation (for-profit)        New Jersey      │▭│ Offered, not yet rehearsed
 …
 Alternate name, charter amendments        New Jersey      ┊▭┊ Planned
 ───────────────────────────────────────────────────────────────────────────────
 Rehearsed to the payment screen: CoFile completed every screen on the state's real website
 with test details and stopped before paying. Screens recorded: … Write to hello@cofile.app
 and we'll tell you each one by name.          ← small 15/23 Graphite, c1–c8, 24 px below
```

- **Columns:** "Filing" c1–c6, `ui` 17/24 Plate Ink; a parenthetical within it ("(through the
  API; not on the filing desk yet)", "(LLC)", "(business corporation)", "(NYS-100)", "(NJ-REG)",
  "(DBA)", "(foreign corporation)", "(for-profit)") in Graphite, the same size. "Where" c7–c8,
  `ui` Graphite. "Where it stands" c9–c12: the row's chip.
- **Header row:** `table` header 14/18 Founders Grotesk Text Medium, Graphite, sentence case, with
  a 1 px Plate Ink rule 12 px beneath. **Rows:** at least 64 px, 16 px vertical padding, text
  top-aligned, 1 px Rule `#DDD7CB` between rows, no zebra, no hover (the rows aren't links). The
  table sits straight on the Cotton page, no card, no outer border (Hal's ledger).
- **The chip** (`chip` 14/18 Medium, 30 px tall, 12 px side padding, `--chamfer-s` corners, the
  16 × 10 px plate glyph 8 px before the label; long labels wrap inside the chip, which grows):

| `statusOf` label | Chip | Glyph (4.5) |
|---|---|---|
| "Live" | Done, quiet: Verdigris `#2E6B57` text on Verdigris Tint `#E4F0EA`, no border | Inked plate: solid Verdigris with a 1 px Cotton line across its middle |
| "Rehearsed to the payment screen" | Sheet fill, 1.5 px **dashed** Plate Ink border (dash 4, gap 3), Plate Ink text: the rehearsal mark (4.4) | The plate outline in 1.5 px dashed Plate Ink |
| "Screens recorded, rehearsal next" | Sheet fill, 1 px solid Graphite border, Plate Ink text | The plate outline in 1 px solid Graphite |
| "Offered, not yet rehearsed" | As above | As above (the label tells them apart) |
| "Planned" | No fill, 1 px dotted Rule Strong border, Graphite text | The plate outline in 1 px dotted Rule Strong |

  The glyph is `aria-hidden`; the label carries the meaning. "Live" comes from the deployment's
  switch, so any row may show it; the design holds whichever chip `statusOf` returns.
- **The note** under the table, 24 px below the last rule, `small` 15/23 Graphite, c1–c8 (it runs
  long), the email link underlined, its subject line as the code has it.
- **No motion, no sticky header** (16 rows at 64 px fit about one screen; the header is the page's
  only sticky element, 6.6), no filters: the H1 already names the four places, and the order is
  the copy's.
- **Tablet:** "Filing" c1–c4, "Where" c5–c6, "Where it stands" c7–c8. **Phone:** each row becomes a
  block on the page (no card): "Where" first in the `kicker` style (15/22 Medium Graphite, no
  rule), the filing name in `ui` 17/24 Medium, then the chip 8 px below; 16 px padding, 1 px Rule
  between blocks. No horizontal scrolling.

```
PHONE 390
┌──────────────────────────────┐
│ New Jersey          15/22    │
│ LLC formation       17/24 500│
│ ┆▱ Rehearsed to the payment ┆ │
│ ┆  screen                   ┆ │
│ ──────────────────────────── │
│ New Jersey                   │
│ Standing certificate         │
│ (through the API; not on the │
│ filing desk yet)             │
│ ┆▱ Rehearsed to the …       ┆ │
│ ──────────────────────────── │
│ …                            │
└──────────────────────────────┘
```

### 10A.3.3 How a filing type goes live (`#live`): the stage

h2 "How a filing type goes live." · lede "Any filing can run as a rehearsal: the whole filing,
performed on the state's real website with no audience. …" (as written), and the rehearsal's run
sheet (`RehearsalLog`).

This is the page's one dark band and the site's second appearance of the stage (D1 C7): the copy
says "performed … with no audience", so the house lights go down here, exactly as in Home 7, and
nowhere else on this page.

```
DESKTOP 1440 (Night #14161E; #0E1016 in dark mode)                             showpiece
 c1–c5 (486)                                c7–c12 (588) + bleed 120
┌───────────────────────────────────┐     ┌──────────────────────────────────────────────┐
│ How a filing type goes live.      │     │  C7: the empty stage from the back of the    │
│        display-m, Night Ink       │     │  house, the ghost light on, 4:5 (708 × 885)  │
│                                   │     │                                              │
│ Any filing can run as a rehearsal:│     │            ○ ghost light                     │
│ the whole filing, performed on …  │     │   ┌ the run sheet (programme), 420 ───────┐  │
│ (lede 22/34 Night Ink, as written)│     │   │ Rehearsal · New Jersey LLC formation  │  │
│                                   │     │   │                         test details  │  │
│                                   │     │   │ Business name ················ filled │  │
│                                   │     │   │ Name check ··················· passed │  │
│                                   │     │   │ …                                     │  │
│                                   │     │   │ Pay Now ········· held, on purpose    │  │
│                                   │     │   └───────────────────────────────────────┘  │
└───────────────────────────────────┘     └──────────────────────────────────────────────┘
                                            Rehearsal · nothing filed, nothing paid
                                                                                      64
 the road to live (c1–c12), aria-hidden
   ┊▭┊ ─────────── │▭│ ─────────── │≡│ ─────────── ┆▱┆ ─────────── ▰
  Planned       Offered, not     Screens recorded,  Rehearsed to the   Live
                yet rehearsed    rehearsal next     payment screen
```

- Night ground, the black-card texture at 4% (4.8). Text Night Ink `#ECE8DF` (14.8:1); no kicker.
- **The picture** c7–c12, bleeding right: C7 in its 4:5 frame, 708 × 885 including the bleed,
  with the **run sheet** (the home page's programme, Home 7, at the same component and size) laid
  over its lower half, 420 px wide, under the ghost light's pool (the one gradient on the site,
  4.8). The words are vertically centred on the run sheet. Caption "Rehearsal · nothing filed,
  nothing paid" in 14/20 `#A9ABB5`.
- **Motion:** the home page's house-lights choreography (D3, Home 7): the ghost light comes up
  (the photograph 70% → 100% over 1.2 s) and the run sheet's lines are cued 120 ms apart as the
  pool moves down to each; "Pay Now · held, on purpose" arrives like every other line. About
  2.4 s, once; reduced motion shows it lit and complete.
- **The road to live** (Hal's stage ladder, Marcus's road): 64 px under the picture, across
  c1–c12, the five stages as the plate glyphs drawn at 40 × 25 px, joined by a 1 px `#6E7180`
  hairline, each labelled beneath in `small` 15/23 Night Ink with the existing stage labels in
  order: "Planned", "Offered, not yet rehearsed", "Screens recorded, rehearsal next", "Rehearsed to
  the payment screen", "Live". At this size the "Screens recorded" plate carries three short 1 px
  rules inside it (its screens mapped), the one refinement of 4.5's shared glyph at large size;
  the "Live" plate is solid `#2E6B57` with its Night Ink line. It's what "earns its way to live"
  looks like, read left to right, with no words added. A picture, so `aria-hidden`: the table
  above carries the meaning. Still: facts don't perform (Elaine).
- **Phone:** words; C7 at 4:5 (350 × 438) with the run sheet under it at full width overlapping the
  photograph's foot by 64 px; the road to live turns vertical, glyphs down the left on a vertical
  hairline, labels to their right.

### 10A.3.4 State by state (`#states`)

h2 "State by state." · four notes: "New York", "New Jersey", "Florida", "IRS", each its h3 and
paragraph (as written).

Set on the home page's **sample cards** (Home 6), so each place keeps one picture across the site
(Hal): four white cards c1–c3, c4–c6, c7–c9, c10–c12 (276 px each), 1 px Rule border, no shadow
(cards on paper), 32 px padding (276 leaves 212 px of text, about 26 characters a line at 18 px,
which suits a short note). The place name as the h3 in `display-m` (Miller Display 36/42), then the
24 × 1.5 px Brass Line rule 16 px below it, then the paragraph in `body` 16 px below. Equal heights
(the tallest note sets the row). No state shapes, seals or colors (3.9).

- Tablet: two by two. Phone: stacked, 16 px apart, the h3 at 28/34.

### 10A.3.5 Close

h2 "Rehearse one you know by heart." (no lede in the copy) · "Run a free rehearsal" (Brass) and
"See pricing" (outline). The page close (10A.0.4), with 48 px between the h2 and the buttons.

---

## 10A.4 Pricing (`/pricing`)

The stationer's price card in full: "$45" as the biggest number on the page, then one heavy card
with four plans printed on it like a rate card, then a plain ledger and an errata slip (Hal's card
stock, Greta's ruled columns).

Copy from `web/app/pricing/page.tsx`; every figure from `web/lib/pricing.ts` (`usd()`), so if the
figures change the design doesn't.

**Order and grounds:** title page (Cotton) · the plans (Cotton) · what counts as a filing (Cotton)
· what's separate (Cotton, on a slip) · close (Cotton 2).

### 10A.4.1 Title page: the price as the picture

Kicker "Pricing for firms" · h1 "$45 a filing. EIN included with a formation." set as on the home
page (Home 8): "$45" at `price-xl` (160/144, Miller Display lining figures, the "$" at 60% raised to
cap height and hung into the left margin), " a filing." on its baseline at `display-page`, and "EIN
included with a formation." on the next line at `display-page`. One h1; the size change is inside
the headline (5.2). c1–c10 so the second line holds on one line at 1440.

· lede "Pay for each live filing, or take a plan with filings included every month. Every plan is
backed by filing professionals, and rehearsals are always free."

**Under the lede, the people** (Elaine, Greta; C10): when real portraits exist, three 72 × 72 px
square crops of CoFile's filing professionals in a row, 12 px apart, 32 px under the lede, no
caption on the page, each with the person's name and role as alt text `[copy needed]`. "Every plan
is backed by filing professionals", and here they are. Without consent, the row is dropped.

```
DESKTOP 1440 (Cotton)                                                  above 96 · below 128
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ ━ Pricing for firms                                                                  │
│ ˢ                                                                                    │
│ $45  a filing.                     ← "$45" price-xl 160/144; " a filing." 60/64       │
│ EIN included with a formation.     ← display-page 60/64                              │
│                                                                       c1–c10         │
│ Pay for each live filing, or take a plan with filings included every month. Every   │
│ plan is backed by filing professionals, and rehearsals are always free.  lede, c1–c7│
│ [▣][▣][▣]   72 px portraits (C10), if they exist                                      │
└─────────────────────────────────────────────────────────────────────────────────────┘
PHONE: "$45" 88/80 · " a filing." 38/42 · the second line wraps to two at 38/42 · lede 19/30
```

### 10A.4.2 The plans (`#plans`): one card, four columns

The four plans from `PRICING.plans`, printed on **one heavy price card** in four ruled columns, the
way a stationer's rate card lists its sizes (Greta's timetable on Hal's card stock).

```
DESKTOP 1440 (Cotton)                                                           showpiece
┌ the price card, c1–c12 (1200), Sheet, --e-card, 40 px padding ────────────────────────────┐▌
│ Pay as you go        │ Starter              │▀▀▀▀ Growth ▀▀▀▀▀▀▀▀▀▀│ Unlimited           │▌
│               26/32  │                      │ (3 px Brass Line top)│                     │▌
│ ˢ45                  │ ˢ250                 │ ˢ500                 │ ˢ1,000              │▌ price-l
│ a filing     22/34   │ a month              │ a month              │ a month             │▌ 56/60
│ No monthly fee. Pay  │ or $2,500 a year     │ or $5,000 a year     │ or $10,000 a year   │▌ small
│ only for live        │ (2 months free)      │ (2 months free)      │ (2 months free)     │▌ 15/23
│ filings.             │                      │                      │                     │▌
│ ──────────────────── │ ──────────────────── │ ──────────────────── │ ─────────────────── │▌ 1 px Rule
│ ◆ $25 for an EIN on  │ ◆ 6 filings a month  │ ◆ 15 filings a month │ ◆ Unlimited filings │▌ body
│   its own            │ ◆ $40 for each       │ ◆ $33 for each       │   (fair use: 60 a   │▌ 18/29
│ ◆ $15 for copies and │   filing past that   │   filing past that   │   month)            │▌
│   certificates       │                      │                      │ ◆ $15 for each      │▌
│                      │                      │                      │   filing past fair  │▌
│                      │                      │                      │   use               │▌
│                      │                      │                      │ ◆ Priority help     │▌
│                      │                      │                      │   from a person     │▌
│ ···················· │ ···················· │ ···················· │ ··················· │▌ dotted
│ A filing professional│ A filing professional│ A filing professional│ A filing            │▌ ui 17/24
│ takes over when a    │ takes over when a    │ takes over when a    │ professional takes  │▌ 500
│ filing needs one     │ filing needs one     │ filing needs one     │ over when a filing  │▌
│                      │                      │                      │ needs one           │▌
└──────────────────────┴──────────────────────┴──────────────────────┴─────────────────────┘▌
 ▀▀▀▀ 2 px Rule Strong edge line along the bottom and right: card thickness
 Prices in US dollars, for partner firms. Building a filing product for many businesses?
 Talk to us about platform pricing.                               ← small 15/23 Graphite, 24 below
```

- **The card:** Sheet `#FFFFFF`, `--e-card` (the sheet shadow plus the 2 px Rule Strong edge line
  along the bottom and right), `--r-sheet`, 40 px padding, no texture. Four equal columns (280 px
  each, 32 px inner side padding, 216 px of text), divided by 1 px Rule vertical hairlines that
  run from the plan names to the card's foot. CSS subgrid aligns the rows across the four: name,
  figure, unit, annual line, rule, list, takeover line.
- **Plan name** ("Pay as you go", "Starter", "Growth", "Unlimited"): `display-s` Miller Text 26/32,
  Plate Ink.
- **Price:** the figure in `price-l` (Miller Display 56/60, lining tabular, so the four line up),
  the "$" at 60% raised to cap height and hung into the column's left padding; 16 px below the
  name. The unit, " a filing" or " a month", on the next line in `lede` (Miller Text 22/34)
  Graphite: in a 216 px column "$1,000 a month" won't hold on one line at 56 px, so every column
  breaks the same way. The annual line (or "No monthly fee. Pay only for live filings.") in
  `small` 15/23 Graphite, 8 px below.
- **The list** 24 px under a 1 px Rule: `body` with Brass Line lozenges, 12 px apart, tabular
  figures in "$25", "$15", "$40", "$33", "6", "15", "60".
- **The takeover line**, the owner's "A filing professional takes over when a filing needs one",
  is the last item of every plan and is set apart at the foot of each column under a dotted Rule
  Strong rule (the dot leader's dots, 0.4 em apart), in `ui` 17/24 Founders Grotesk Text Medium,
  Plate Ink, no lozenge. The subgrid puts it at the same height in all four columns: the same
  promise, on the same line, on every plan (Hal).
- **Growth** (the code's `r3-plan-mid`) is marked by one thing: a **3 px Brass Line `#A87A1E` rule
  along the top of its column**, inside the card's padding, the full column width. No fill, no
  ribbon, no "most popular": the copy has none, and we don't fake popularity (Hal, Greta, Marcus,
  Elaine).
- **Nothing moves** (D3, Home 8): a price that animates looks negotiable.
- **The note** 24 px under the card, `small` Graphite, "Talk to us about platform pricing" a link.
- **Tablet:** the card holds two by two (Pay as you go | Starter, then Growth | Unlimited), the rows
  divided by a 1 px Rule with 32 px around it; Growth's Brass Line rule on its quarter's top.
  **Phone:** the card runs full width (350, 20 px padding), the four plans stacked inside it in the
  code's order, each separated by a 1 px Rule and 32 px; Growth's Brass Line rule along its top;
  the figure at 44/48; the takeover line closing each plan under its dotted rule.

```
PHONE 390
┌ price card, full width ──────┐▌
│ Pay as you go       22/28    │▌
│ ˢ45                 44/48    │▌
│ a filing            19/30    │▌
│ No monthly fee. Pay only …   │▌
│ ──────────────────────────── │▌
│ ◆ $25 for an EIN on its own  │▌
│ ◆ $15 for copies and …       │▌
│ ···························· │▌
│ A filing professional takes  │▌
│ over when a filing needs one │▌
│ ════════════════════════════ │▌  1 px Rule, 32 px around
│ Starter …                    │▌
│ ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀ │▌  Growth's Brass Line rule
│ Growth …                     │▌
│ Unlimited …                  │▌
└──────────────────────────────┘▌
```

- **Dark mode:** the card is Night Card `#1F2230` (CoFile's own card, 4.6), text Night Ink, the
  edge line `#6E7180`, Growth's rule full Brass `#D9A84A`.

### 10A.4.3 What counts as a filing (`#counts`)

h2 "What counts as a filing." · lede "Only live filings sent to a state or the IRS count. Rehearsals
never do." · five items, set as a **definition ledger** with dot leaders (5.4, Hal, Greta, Priya):
each bold lead in its own left column, a leader running from the lead to the definition, the rest
of the sentence on the right. The words and their order don't change; the leads just get their own
column, like accounts in a ledger.

```
 c1–c5 (486)                          c7–c12 (588)
┌──────────────────────────────┐   ┌──────────────────────────────────────────────────────┐
│ What counts as a filing.     │   │ One filing: ··········· a formation, a payroll        │
│                   display-m  │   │ ▬▬▬▬▬▬ (1)              registration, an amendment, a │
│ Only live filings sent to a  │   │                         dissolution, an assumed name …│
│ state or the IRS count.      │   │ ───────────────────────────────────────────────────── │
│ Rehearsals never do.         │   │ Included: ············· the EIN that goes with a      │
│                  lede 22/34  │   │                         formation.                    │
│                              │   │ ───────────────────────────────────────────────────── │
│                              │   │ An EIN on its own: ···· $25, or half a filing on a    │
│                              │   │ ▬▬▬░░░ (½)              plan.                         │
│                              │   │ Copies and ·········· · $15, or a third of a filing   │
│                              │   │ certificates:           on a plan.                    │
│                              │   │ ▬▬░░░░ (⅓)                                             │
│                              │   │ Unused filings ········ roll over to the next month,  │
│                              │   │                         for one month.                │
└──────────────────────────────┘   └──────────────────────────────────────────────────────┘
   leads: 200 px column, body 18/29 Medium · definitions: body 18/29 · rows 20 px padding,
   1 px Rule between
```

- Leads ("One filing:", "Included:", "An EIN on its own:", "Copies and certificates:", "Unused
  filings") in `body` at 500, Plate Ink, in a 200 px column; the leader (Founders periods every
  0.4 em, Rule Strong) fills from the end of the lead's last line to 16 px before the definition
  column, on the lead's last baseline. Definitions in `body`, 372 px. Rows 20 px top and bottom,
  1 px Rule between.
- **The units, drawn** (Marcus, Elaine): under the leads of "One filing:", "An EIN on its own:" and
  "Copies and certificates:", a 72 × 6 px bar with a 1 px Plate Ink outline, filled in Plate Ink to
  its share from `PRICING.units` (1, ½, ⅓), so "half a filing" and "a third of a filing" are seen,
  not computed. `aria-hidden`. Still.
- Phone: h2, lede, then each row as lead (with its bar) above its definition, no leader.

### 10A.4.4 What's separate (`#separate`): the slip

h2 "What's separate." · four items (as written): "State fees belong to the state. …", "CoFile's
registered agent service, if you use ours instead of your own.", "New York's publication notice
for a new LLC, which has its own costs.", "You see your plan and its price on your Billing page
before you're charged. Filings past your plan go on your next invoice."

A support band on Cotton (between two Cotton bands, the slip carries the change): the h2 in c1–c5;
the four items on a **slip** in c7–c12, a narrower white sheet (Sheet, `--e-sheet`, `--r-sheet`,
32 px padding), the stationer's errata slip, tucked in honestly, not hidden (Hal). It lies flat.
Items in `body` with the support en rule, 20 px apart; the bold leads ("State fees", "CoFile's
registered agent service,", "New York's publication notice") stay inline in Founders Grotesk Text
Medium. Phone: h2, then the slip full width.

### 10A.4.5 Close

h2 "Start with a free rehearsal." · lede "Rehearsals run on the state's real website and stop before
the last button. They're free and never count toward a plan." · "Run a free rehearsal" (Brass). The
page close (10A.0.4).

---

## 10A.5 Security (`/security`)

A support page: plain, well-set typesetting and no pictures. It should read like a letter from a
careful firm (Hal, Elaine, Greta, Priya). Security is support, not the story: nothing on this page
is illustrated, nothing moves, and there are no padlocks, shields, vaults, keys, check badges or
glowing blue anywhere (2.6, 3.9).

Copy from `web/app/security/page.tsx`.

**Order and grounds:** title page (Cotton) · the five (Cotton, support rhythm) · the links
paragraph (Cotton 2, support rhythm).

### 10A.5.1 Title page

Kicker "Security" · h1 "How we handle what you trust us with." (balanced, c1–c8) · lede "Social
Security numbers, cards and state logins, and how CoFile keeps each one." No frontispiece.

### 10A.5.2 The five (`#security`): a ledger

"Encrypted, masked SSNs" · "Cards in a vault, logins encrypted" · "Single-use links to the proof"
· "Signatures only on approval" · "Separate accounts", each with its paragraph (as written), in the
copy's order, set as **ledger rows**, not as cards with icons (Hal).

```
DESKTOP 1440 (Cotton)                                                     support rhythm
 c1–c4 (384)                          c5–c11 (690)
 ══════════════════════════════════════════════════════════════════════════  1 px Plate Ink
 Encrypted, masked SSNs               Social Security numbers are encrypted, masked on
                     display-s 26/32  proofs, in API responses, in logs and in recorded
                                      screens, used only for the filing they belong to, and
                                      deleted 30 days after that filing finishes.   body 18/29
 ──────────────────────────────────────────────────────────────────────────  1 px Rule
 Cards in a vault, logins encrypted   Saved cards are held by Basis Theory, a card vault,
                                      never in our database. When filings are ready to pay, …
 ──────────────────────────────────────────────────────────────────────────
 Single-use links to the proof        Signed, expiring links, bound to the exact details
                                      shown. An optional one-time code adds a second check.
 ──────────────────────────────────────────────────────────────────────────
 Signatures only on approval          A saved signature is applied only to a filing that has
                                      been approved.
 ──────────────────────────────────────────────────────────────────────────
 Separate accounts                    Logins, jobs, clients and documents are kept per
                                      account. One account never sees another's.
 ──────────────────────────────────────────────────────────────────────────
```

- A 1 px Plate Ink rule opens the ledger; 1 px Rule between rows; each row 32 px top and bottom.
- h3 in `display-s` (Miller Text 26/32), Plate Ink, c1–c4, top-aligned with the paragraph's first
  line (cap heights level). Paragraphs in `body`, c5–c11, measure about 64 characters. "30 days",
  "an hour" are words, set as written; any figures tabular.
- Tablet: h3 c1–c3, paragraph c4–c8. Phone: h3 (22/28) above its paragraph, 12 px apart, rows
  24 px top and bottom.

### 10A.5.3 The links paragraph

"The checks CoFile runs on every filing before it pays, such as reading the fee again on the
state's payment screen, are on How it works. How we use and keep personal information is in our
Privacy Policy. Security questions: hello@cofile.app." in `lede` (Miller Text 22/34), c1–c8, on a
Cotton 2 band; its three links ("How it works" to `/how-it-works#checks`, "Privacy Policy", the
email) underlined in Brass Line. Then the footer.

The header's "Run a free rehearsal" is the page's only Brass. On phones the sticky bar appears once
the title page has scrolled away (there is no close on this page).

---

## 10A.6 Questions (`/faq`)

Fourteen questions as an index of disclosures: big questions, readable answers, nothing promoted
over anything else (Hal, Elaine, Marcus).

Copy from `web/app/faq/page.tsx`.

### 10A.6.1 Title page

Kicker "Questions" · h1 "Questions, answered." · lede "Something else? hello@cofile.app" (the email
a link, underlined in Brass Line).

### 10A.6.2 The fourteen

On Cotton, support rhythm, one column c1–c8 (792 px); c9–c12 stay paper except where a portrait
sits.

```
DESKTOP 1440 (Cotton)                                                     support rhythm
 c1–c8 (792)
 ═══════════════════════════════════════════════════════════════════  1 px Plate Ink
 What does “in beta” mean?                                         ◇   ← 72 px min row
                                          display-s 26/32 Plate Ink     20 px lozenge, outline
 ───────────────────────────────────────────────────────────────────  1 px Rule
 What is a rehearsal?                                              ◆   ← open: filled
   The whole filing, performed on the state's real website with no       Brass Line
   audience. CoFile fills in every screen with your details and stops
   before the last button. … (body 18/29, max 34 em, 24 above, 32 below)
 ───────────────────────────────────────────────────────────────────
 Who approves a filing?                                            ◇
 ───────────────────────────────────────────────────────────────────
 Is a person involved?                                             ◆
   Yes. CoFile is built and run by filing          ┌──────────┐
   professionals. Software fills in the state's    │ C10      │ 200 × 250, floated right
   website; when a filing needs a person, …        │ portrait │ floated right
                                                   └──────────┘
 ───────────────────────────────────────────────────────────────────
 … (the other ten, in the copy's order)
```

- **Each question** is a `<details>` row with its `id` kept (`#beta`, `#rehearsal`, `#approves`,
  `#people`, `#proof`, `#texts`, `#fees`, `#cost`, `#ein`, `#timing`, `#publication`, `#agent`,
  `#law`, `#live`). The `summary` is the whole row: at least 72 px tall, 20 px top and bottom,
  the question in `display-s` (Miller Text 26/32), Plate Ink, and at the right a 20 px **lozenge**
  (a square turned 45°, the list mark grown): a 1.5 px Plate Ink outline when closed, filled Brass
  Line `#A87A1E` when open (3.8:1 on Cotton, so the state reads as a graphic). No plus, minus or
  chevron. Hover: the row's ground Cotton 2 in 120 ms. Focus: the ring around the whole row.
- **Answers** open beneath in `body`, max 34 em, 24 px above and 32 px below; links inside them
  ("What we file", "More on the proof", "Pricing", the email) underlined in Brass Line. Opening
  takes 240 ms on height (`--ease-settle`), none with reduced motion. Several may be open at once;
  nothing closes on its own.
- **Arriving at an anchor** (`/faq#approves`, the links from How it works and the footer) opens
  that answer, scrolls its row to 96 px below the header, and gives the row a Cotton 2 wash that
  fades over 2 s.
- **"Is a person involved?"** carries the page's one picture inside its answer: a single C10
  portrait of one of CoFile's filing professionals, 4:5, 200 × 250, floated right with 24 px
  around it, its alt text the person's name and role `[copy needed]` (Hal, Greta, Elaine). Without
  real portraits, nothing: no vignette, no stock.
- The questions' own typographic marks stay as written: “in beta” with curly quotes, "What’s on
  the proof?" with its apostrophe.
- **Print:** every answer prints open, lozenges hidden.
- **Tablet:** c1–c8 of 8. **Phone:** full width, rows at least 64 px, the question at 22/28, the
  lozenge 20 px inside a 48 px tap area; the portrait goes above the answer's text at 160 × 200,
  left-aligned.

---

## 10A.7 For platforms (`/platforms`)

The page for a different reader: a product manager or developer at a filing company, bank or
fintech. It stays on the shop's paper, like every other page, and the change of reader shows in the
picture: the platform's own brand on top, and CoFile literally underneath, ending in the one piece
of code the copy names, set on the stage because a dry run is a rehearsal.

Copy from `web/app/platforms/page.tsx`; the form from `InquiryForm` in
`web/components/AuthForms.tsx`.

**Order and grounds:** title page with "underneath" (Cotton) · the list and the order form (Cotton).
No close band: the form is the call to action (Marcus).

### 10A.7.1 Title page: underneath

Kicker "For platforms" · h1 "Building a filing product? Put CoFile underneath it." across c1–c12,
one sentence per line (the second line sits under the first, as the product sits under theirs;
Greta's joke, told by the line break alone) · lede "Filing companies, and platforms that sign up new
businesses, can offer state filings inside their own product under their own brand. Tell us what
you file and roughly how many, and we'll set up your account with you." in c1–c5 · the picture in
c7–c12, its top on the lede's first cap height.

**The picture, "underneath"** (Jun, Priya, Dev, Marcus): three sheets lying on the Cotton desk,
stacked with offsets, never tilted, never in perspective (D1.1), front to back:

1. **On top, a white-label proof** in a neutral platform's letterhead: where a platform's logo would
   be, a 120 × 32 px Rule `#DDD7CB` block (no name: it is whoever's brand), and its Firm Rule in Iron
   `#3F434F` with a 35% Iron hairline. Below it D4's proof data at picture size (the title "Two
   Sisters Bakery LLC", "Ready to approve", the three detail rows, the fees and "Total to the state
   $103.50"), the "Approve for filing" button in Iron, and a support line drawn as a Rule bar where
   the platform's support contact goes ("A white-label setup, with your name and support contact on
   the proof"). No Imprint: on white label CoFile is absent (2.4). 440 px wide, cropped at 520 px.
2. **In the middle, the embed widget** (the platforms writer's component) in Best Accounting's brand
   (Best Blue `#1F4FD1`, Inter, its wide wordmark), showing its first two fields, with "Filed with
   CoFile" at its foot in the Imprint style. 360 px wide, offset 120 px right and 88 px down from the
   proof's top-left.
3. **At the back and bottom, the stage**: a **code panel** on Night `#14161E` (the rehearsal's
   ground, 4.6), `--r-sheet`, 28 px padding, `code` 15/24 Founders Grotesk Mono in Night Ink, holding
   a trimmed request from the API guide (`web/app/docs/guides.tsx`, "Filings and the lifecycle"),
   with the example's names left out:

   ```
   curl …/v1/filings \
     -H "x-api-key: $COFILE_API_KEY" \
     -d '{
       "type": "formation",
       "state": "NJ",
       "formation": { … },
       "dryRun": true
     }'
   ```

   The `"dryRun": true` line carries the **rehearsal mark** (4.4): a 1.5 px dashed Night Ink outline
   around the line (dash 4, gap 3) and the 14 px ghost-light glyph in its left gutter. It is the only
   dark thing on the page and it is dark for the right reason: a dry run is a rehearsal. 480 px wide,
   offset 200 px right and 300 px down, so it shows below and to the right of the two sheets.

```
DESKTOP 1440 (Cotton)                                                  above 96 · below 128
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ ━ For platforms                                                                        │
│ Building a filing product?                                 display-page 60/64, c1–c12  │
│ Put CoFile underneath it.                                                              │
│                                                                                        │
│ c1–c5 (486)                          c7–c12 (588) + bleed 120                          │
│ Filing companies, and platforms     ┌ white-label proof, 440 ───────────┐              │
│ that sign up new businesses, can    │ [▭▭▭▭]                             │              │
│ offer state filings inside their    │ ══════ (Iron)                      │              │
│ own product under their own brand.  │ Two Sisters Bakery LLC  ◆ Ready … ┌┴ widget, 360 ─────┐
│ Tell us what you file and roughly   │ Business name  TWO SISTERS …      │ [Best Accounting] │
│ how many, and we'll set up your     │ …                                 │ ══════            │
│ account with you.     lede 22/34    │ Total to the state ······ $103.50 │ [_____________]   │
│                                     │ [ Approve for filing ] (Iron)  ┌──┴───────────────────┴──┐
│                                     │ ▬▬▬▬▬▬▬▬ (support line)        │ curl …/v1/filings \     │
│                                     └────────────────────────────────│   -H "x-api-key: …" \   │
│                                                                      │   -d '{ "type": …,      │
│                                                                      │ ○┆ "dryRun": true    ┆  │ Night
│                                                                      │   }'                    │
│                                                                      └─────────────────────────┘
│                                      Sample proof · test details · not a real business        │
└───────────────────────────────────────────────────────────────────────────────────────┘
```

- The proof and widget are white sheets with `--e-sheet`; the code panel, being on Night, takes no
  shadow (a dark card on paper casts none you can see) and a 1 px `#323646` edge. The sheets overlap
  the way papers on a desk do; nothing floats.
- **Motion:** once, when 40% in view, the three press in back to front (the code panel, then the
  widget, then the proof), 120 ms apart, each `press-in` (D2); then the dashed mark around
  `"dryRun": true` draws round its line (`--t-draw`, 600 ms, `stroke-dashoffset`). Under 1.6 s.
  Reduced motion: complete.
- **Captions:** two lines under the figure's lower-left corner, the proof's existing label "Sample
  proof · test details · not a real business" and, under it, the widget's "Example · test details ·
  not a real firm" (Best Accounting is an example firm). The figure's accessible name is
  `[copy needed]`; until it's written, the list beside it ("A white-label setup …", "An embeddable widget
  for your own pages", the `"dryRun": true` item) already says in words what the picture shows.
- **Tablet:** the h1 at 50/54 across c1–c8, the lede c1–c8, the picture c1–c8 below at the same
  offsets scaled to its width (the sheets keep their 1:1 text; the stack is cropped on the right).
  **Phone:** h1 (38/42, the two sentences on their own lines, each balanced), lede, then the picture
  restacked vertically: the proof full width (cropped at 360), the widget under it overlapping by
  40 px and inset 24 px from the right, the code panel under that, full width, scrolling sideways
  inside itself if a line is long (never the page).

### 10A.7.2 The list and the order form (`#enterprise`)

Five items, left, in c1–c5: "An API, with webhooks for each stage" · "A white-label setup, with your
name and support contact on the proof" · "An embeddable widget for your own pages" · "Your own state
logins, registered agent, signers and defaults" · "Start with `"dryRun": true`: the run rehearses on
the state's website and stops before the final submit. Read the API docs." In `body` with Brass Line
lozenges, 16 px apart. The inline `"dryRun": true` is `mono` (Founders Grotesk Mono 16/24) on a
Night chip (`#14161E`, Night Ink text, 4 px horizontal padding, `--r-sheet`) with the same 1.5 px
dashed rehearsal outline: the same object as in the picture. "Read the API docs" is a link.

Right, in c7–c12: **the inquiry form as CoFile's own order form** (Hal): a white sheet (Sheet,
`--e-sheet`, 40 px margins), headed by CoFile's horizontal lockup at 24 px and a 1 px Rule 16 px
under it. It is CoFile's form, so it carries CoFile's letterhead, the shop's own order pad.

```
 c1–c5 (486)                               c7–c12 (588)
┌──────────────────────────────────┐   ┌──────────────────────────────────────────────┐
│ ◆ An API, with webhooks for each │   │ [plate] CoFile                    24 px lockup│
│   stage                          │   │ ───────────────────────────────────────────── │
│ ◆ A white-label setup, with your │   │ Name                 Company                  │
│   name and support contact on …  │   │ [________________]   [________________]       │
│ ◆ An embeddable widget for your  │   │ Work email           Phone (optional)         │
│   own pages                      │   │ [________________]   [________________]       │
│ ◆ Your own state logins, …       │   │ States you file in   Filings per month        │
│ ◆ Start with ┆"dryRun": true┆:   │   │ [ New York      ▾]   [ Under 50       ▾]      │
│   the run rehearses on the       │   │ What you'd like to do (optional)              │
│   state's website and stops …    │   │ [                                          ]  │
│   Read the API docs.             │   │ [                                          ]  │
└──────────────────────────────────┘   │ [                     4 rows, 144 px       ]  │
                                       │                                               │
                                       │ [ Send ]                     Brass, 56 px      │
                                       └──────────────────────────────────────────────┘
```

- **Fields** in the component's order and pairs: "Name" | "Company"; "Work email" | "Phone
  (optional)"; "States you file in" (select: "New York", "New Jersey", "Florida", "Several of
  these", "Other states too") | "Filings per month" (select: "Under 50", "50 to 250", "250 to 1,000",
  "Over 1,000"); "What you'd like to do (optional)" (textarea, full width, 4 rows, 144 px, grows
  with its text, 2000 characters as the component allows). Pairs are 242 px each with a 24 px
  gutter at 1024 px and up; one per row below. The honeypot ("Leave this field empty (it helps us
  block spam)") stays visually hidden and out of the tab order, as now.
- **"Send"**: the page's one Brass button, 56 px, left-aligned at its natural width on desktop
  (min 160 px), full width on phones. Pending "Sending…". While it's in view the header button
  shows its outline (10A.0.1); the phone bar is away for the whole form.
- **States** (10A.0.6): field errors "Enter your name.", "Enter your company.", "Enter your work
  email." under their fields; "Check the highlighted fields." or "We couldn't send that just now.
  Try again in a minute." as a Problem slip above "Send". **Sent:** the component replaces the form
  with its message, so the sheet keeps its letterhead and the fields' space fills with one Done
  slip, "Thanks. We have your request and will reply by email.", 24 px under the lockup's rule; the
  sheet shrinks to fit (240 ms height ease) and nothing celebrates.
- **Phone:** the list, then the order form full width (20 px margins, 20 px padding), one field per
  row.

---

## 10A.8 The account pages: one layout

Sign-up, the sent page, log in, the password pages, confirm your email and invite expired are
CoFile's own pages (register 1): Cotton, Miller for the heading, Founders for everything you read
and fill in, one Brass button. Each is a single **card**, the shop's order pad: a white sheet the
person fills in (6.8).

- **The card:** Sheet `#FFFFFF`, `--e-sheet`, `--r-sheet`, 32 px padding (20 on phones); 480 px
  wide (416 px inside), 560 px for sign-up. Dark mode: Night Card `#1F2230` with `--e-sheet-dark`
  (4.6).
- **Inside, top to bottom:** the page's label as the kicker (`kicker`, with its Brass Line lead
  rule); 16 px; the heading at `display-m` (Miller Display 36/42; 28/34 on phones), which the code
  writes as an `h2` and which should be the page's `h1` in the markup (the words don't change);
  16 px; the lede in `lede` (Miller Text 22/34; 19/30 on phones); 32 px; the form (10A.0.6); the
  Brass button full width, 56 px; 16 px; the page's note in `small` Graphite with its links.
- **Placement:** with a side panel (sign-up, log in) the card's left edge is on c1 and the panel
  fills c7–c12; without one the card is centred on the grid (in c4–c9). 96 px below the header
  (72 tablet, 32 phone), 128 px above the footer (96, 64).
- **The vignette** (10A.0.5) on single-card pages: 120 px tall, its left edge on the card's text
  edge, 24 px above the card, on Cotton. Phones: 96 px tall, 16 px above.
- **Header:** the lockup and the page's one quiet link (10A.0.1). The beta notice and the footer as
  everywhere. No sticky phone bar.
- **Phones:** the card runs full width inside the 20 px margins; side panels collapse as each page
  says.

```
SINGLE CARD, DESKTOP 1440 (Cotton)                     PHONE 390
            c4 ───────────── c9                         ┌──────────────────────────────┐
            [vignette, 120 px]                          │ [plate] CoFile        Log in │
            24                                          │ beta notice                  │
            ┌ card 480 ──────────────────────┐          │ [vignette 96]                │
            │ ━ Kicker                       │          │ ┌ card 350, 20 padding ─────┐│
            │ Heading at display-m           │          │ │ ━ Kicker                  ││
            │ Lede, Miller Text 22/34        │          │ │ Heading 28/34             ││
            │ Label                          │          │ │ Lede 19/30                ││
            │ [____________________________] │          │ │ Label                     ││
            │ [ notice slip, if any ]        │          │ │ [_______________________] ││
            │ [      Brass button, 56     ]  │          │ │ [     Brass button     ]  ││
            │ note, small Graphite           │          │ │ note                      ││
            └────────────────────────────────┘          │ └───────────────────────────┘│
                                                        └──────────────────────────────┘
```

---

## 10A.9 Sign-up (`/signup`): it's already yours

The page where a firm decides, and the first time its own name is set on anything of ours. As the
owner types "Firm name", it is cut into the same blank brass plate the home page ended on, and set
at the head of a sheet the way it will head every page her clients see (D3; Hal M9, Marcus,
Elaine, Tomás, Greta).

Copy from `web/app/signup/page.tsx` and `PartnerSignupForm` in `web/components/AuthForms.tsx`.

### 10A.9.1 Layout

```
DESKTOP 1440 (Cotton)
 header: [plate] CoFile                                                               Log in
 beta notice
 c1 ── card 560 ────────────────────────────┐       c7–c12: the side panel (588) ─────────┐
│ ━ For firms                                │      │                                      │
│ Set up your firm's filing desk  display-m  │      │   C3: the blank plate on Harbor &    │
│ For firms that file for their clients.     │      │   Pine's door, 4:5, 588 × 735        │
│ Confirm your email, put your name and logo │      │                                      │
│ on the door, and choose which card pays    │      │      ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲        │
│ the state's fees. Your first filing can be │      │      │ ⊖  [the name, as    ⊖ │       │
│ a free rehearsal: nothing filed, nothing   │      │      │     typed]            │       │
│ paid.                          lede 22/34  │      │      ╲______________________╱        │
│                                       32   │      │                                      │
│ Firm name                                  │      └──────────────────────────────────────┘
│ [________________________________________] │       24
│ Kind of firm                               │      ┌ the letterhead, Sheet, 588 × 176 ────┐
│ [ Choose one                           ▾ ] │      │ [the name, as typed]       30/36     │
│ ─────────────────────────── 1 px Rule       │      │ ═════════════════════════════════════│
│ Your name                                  │      │ ─────────────────────────────────────│
│ [________________________________________] │      │                ────                  │
│ Work email                                 │      │             with CoFile              │
│ [________________________________________] │      └──────────────────────────────────────┘
│ Password               Password again      │
│ [__________________]   [__________________]│
│ At least 12 characters. A short sentence   │
│ works well.                   help 15/22   │
│ ───────────────────────────                 │
│ Phone (optional)       Website (optional)  │
│ [__________________]   [https://__________]│
│ ───────────────────────────                 │
│ States you file in                         │
│ ☐ New York    ☐ New Jersey    ☐ Florida    │
│ Filings per month                          │
│ [ Under 10          ▾ ]                    │
│ ───────────────────────────                 │
│ ☐ I agree to the Terms of Service and the  │
│   Privacy Policy.                          │
│ [ form message slot ]                       │
│ [            Create account             ]  │ Brass, 56
│ You'll confirm your email. If your account │
│ needs a review before it opens, we'll email│
│ you when it's ready. Already have one?     │
│ Log in.                       small 15/23  │
└────────────────────────────────────────────┘
 Building a filing product? See CoFile for platforms.        small Graphite, 24 below the card
```

- Card 560 (496 inside) at c1; side panel c7–c12, top-aligned with the card. Neither is sticky
  (6.6): the plate is in view while "Firm name" is typed, which is when it matters.
- **Tablet:** the card c1–c8 at 560, centred; the panel becomes a 16:9 strip (the plate, cropped
  tight) inside the card under the lede, as on phones; the letterhead preview under the strip.
- **Phone:** words first, then the plate: kicker, heading, lede, then the **plate strip** (C3
  cropped 16:9 on the plate, the card's full width edge to edge, 350 × 197, no shadow), then "Firm
  name" directly under it, so the field and the plate are on screen together. The letterhead
  preview is dropped on phones. Fields one per row.

```
PHONE 390
┌──────────────────────────────┐
│ [plate] CoFile        Log in │ 64
│ beta notice                  │
│ ┌ card ─────────────────────┐│
│ │ ━ For firms               ││
│ │ Set up your firm's filing ││ 28/34
│ │ desk                      ││
│ │ For firms that file for … ││ 19/30
│ ├───────────────────────────┤│
│ │  ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲     ││ plate strip 350 × 197
│ │  │ ⊖ [as typed]   ⊖ │     ││
│ │  ╲__________________╱     ││
│ ├───────────────────────────┤│
│ │ Firm name                 ││
│ │ [_______________________] ││
│ │ Kind of firm …            ││
│ │ … one field per row …     ││
│ │ [     Create account     ]││
│ │ You'll confirm your … Log ││
│ │ in.                       ││
│ └───────────────────────────┘│
│ Building a filing product? … │
└──────────────────────────────┘
```

### 10A.9.2 The form

In the component's order, with its labels, options and help (10A.0.6 for the field anatomy):

| Group | Fields (as written) | Layout |
|---|---|---|
| The firm | "Firm name" (`autocomplete="organization"`); "Kind of firm": "Choose one" (disabled default), "CPA or accounting firm", "Payroll company", "Fractional CFO firm", "Title company", "Something else" | One per row, full width |
| You | "Your name"; "Work email"; "Password" and "Password again", with "At least 12 characters. A short sentence works well." under the pair | Name and email full width; the passwords paired at 236 px each from 600 px up |
| Optional | "Phone (optional)"; "Website (optional)" with its placeholder "https://" in Graphite | Paired from 600 px up |
| Your filings | "States you file in" (a fieldset; its legend in `label` style): "New York", "New Jersey", "Florida" as 24 px checkboxes in one row, 24 px apart (a column on phones); "Filings per month": "Under 10" (default), "10 to 50", "50 to 200", "Over 200" | The select 236 px |
| Agreement | "I agree to the Terms of Service and the Privacy Policy." with both links (they open in a new tab, as now) | Checkbox row, 48 px target |

- Groups are separated by a 1 px Rule with 24 px on each side (48 px, the group gap); no group
  headings are added (Marcus).
- **"Create account"**, Brass, 56 px, full width of the card. Pending "Creating…".
- **The note** under it: "You'll confirm your email. If your account needs a review before it
  opens, we'll email you when it's ready." or "Your account opens as soon as you confirm your
  email.", depending on the platform's setting, then " Already have one? Log in." with "Log in" a
  link. `small` Graphite, 16 px under the button.
- **Show the password** (optional, Priya): a 40 px quiet text button inside the right end of each
  password field, for owners who'd rather see what they typed `[copy needed: its two labels]`.
  Without the words, it's left out.

### 10A.9.3 The side panel: the plate and the letterhead

- **The plate:** photograph C3 (C4 in dark mode), the blank brass plate on Harbor & Pine's
  harbor-blue door in C1's light, at 4:5, 588 × 735, square-cut. The plate's face is framed at
  about 60% of the photograph's width, slightly above centre. Alt text: the foundation's C3 alt
  `[copy needed]`; the engraved name is not announced (the field already says it).
- **The letterhead** under it (24 px): a Sheet 588 × 176 with `--e-sheet` and 32 px margins,
  `aria-hidden`, showing the Letterhead the firm will have before it adds a logo (3.5.5):
  - the typed name, typeset alone at the no-logo size: 30/36, Founders Grotesk Medium (the
    fallback for a firm's name until it picks its font, 3.7), Plate Ink, wrapping to two balanced
    lines when long, never truncated; credentials ("CPA", "LLC", "PC" …) at 88% with +0.04 em;
  - 20 px below, the **Firm Rule** in Plate Ink (3 px, 2 px gap, 1 px at 35%), because no color has
    been chosen; if the visitor chose a color in For firms' studio, the rule is drawn in it with the
    ink match's `--firm` and `--firm-2` (the firm's color lives inside the picture, 4.8);
  - 24 px below, the **Imprint** centred under its 40 px hairline, 13 px, Graphite, exactly 3.4.
    Ours in small type, from the first minute.
- **Empty** (nothing typed and nothing carried in): the plate is blank in good light, with no
  push-in (that's the Close's camera move, not this page's); the letterhead shows a static
  2 × 28 px Plate Ink caret where the name will go (it doesn't blink: nothing loops), the Firm Rule
  and the Imprint.

### 10A.9.4 The engraving

- **Arriving with a name:** if the visitor typed a firm name at the home page's Close (or in For
  firms' studio), "Firm name" arrives **pre-filled** with it as an ordinary entered value, and the
  plate shows it already cut. On first paint one slow light rakes across the plate (`--t-light`,
  1.2 s, `--ease-sweep`), the only thing that moves on arrival. It's already theirs (D3).
- **Typing:** each new letter is cut into the brass in about 90 ms with a glint at the bottom of
  the cut (the WebGL engraving lit from the C1 HDRI, D2); deleting fills a letter back in 60 ms; a
  pasted name cuts left to right at 30 ms a letter, never longer than 600 ms in all. If typing runs
  ahead of the cutting by more than 400 ms, the plate jumps to the current text. The letterhead
  updates on every keystroke with no animation.
- **Lettering** (as the home page's Close, so the plate is the same plate): the name exactly as
  typed, never forced to capitals or any case ("you don't change a person's name to fit a style",
  3.3), in Miller Display with the ampersand in Miller Display Italic (Greta's courtesy, 3.5), the
  letters filled black like C1's and C2's hand-engraved plates, centred optically between the
  screws.
- **Fitting:** the lettering area is the plate's face inside the bevel, between the screws (about
  70% of the face's width and 60% of its height). One line at a cap height of 30% of the face's
  height while it fits; then it shrinks to 20%; then it breaks onto two lines at the word boundary
  nearest the middle, balanced, each up to 20%; then it shrinks to a floor of 12%; anything still
  longer (past about 60 characters; the field allows 120) takes a third line. Never truncated,
  letter-spaced or condensed to fit.
- **Fallbacks** (D2): devices under `deviceMemory 4`, Save-Data, or a failed WebGL context get the
  SVG version (`feSpecularLighting` over the text's alpha), cut letter by letter with the same
  timing; reduced motion gets the finished lettering at once with no rake; without JavaScript the
  plate stays blank and the field works as a plain field.
- **Privacy:** the name and any chosen color live only in the visitor's browser (`sessionStorage`)
  until the form is submitted, when "Firm name" goes with the form as it always has (D3).

### 10A.9.5 States

| State | What shows |
|---|---|
| **Empty** | The form as above; the plate blank; the letterhead with its caret |
| **Pre-filled** | "Firm name" filled; the plate cut; the letterhead set; one light rake |
| **A field error** (on submit) | Under each field, its message in Madder with the ▬ bar and a 2 px Madder border: "Enter your firm's name.", "Pick what kind of firm you are.", "Enter your name.", "Enter your work email.", "The two passwords don't match.", and under the agreement row "Agree to the Terms of Service and Privacy Policy to create an account."; the Problem slip "Check the highlighted fields." above "Create account" takes focus. A server password rule comes back as "Password: …" in the same slip and under "Password" |
| **Blocked or down** | Problem slip above the button: "Too many sign-ups from here. Try again later." or "We can't create your account right now. Try again in a minute."; every field keeps its value (the form keeps its state) and the plate keeps the name |
| **Pending** | "Creating…", the button held pressed |
| **Done** | The page moves to `/signup/sent` (10A.10). Nothing celebrates (D2.6) |

---

## 10A.10 Check your email (`/signup/sent`)

The single card (10A.8), with vignette **E2** (the letter at the door) above it.

Kicker "Your filing desk" · heading "Check your email" · the lede, in one of its two forms:

- when the desk opens straight away: "We sent you a link. Open it to confirm your email. Then your
  filing desk opens: log in with the email and password you chose. Your first filing can be a
  rehearsal: nothing filed, nothing paid." ("log in" a link);
- when it needs a review: "We sent you a link. Open it to confirm your email. If your account needs
  a review before it opens, we'll email you as soon as it's approved."

· the note "No email after a few minutes? Check spam, or send the link again." in `small` Graphite,
24 px below the lede, "send the link again" a link to `/verify-email`.

There's no button on this page in the copy, so there's no Brass on it at all: the job is in the
visitor's inbox. Header: the lockup and "Log in". Phone: as 10A.8.

---

## 10A.11 Log in (`/login`)

A turnstile, so fast and plain, with one quiet picture beside it: the door from the step, for
someone coming back to a desk that is already theirs (Hal's split, the foundation's vignette for
the log-in side panel, D1.4).

Copy from `web/app/login/page.tsx` and `EmailLoginForm`.

```
DESKTOP 1440 (Cotton)
 header: [plate] CoFile                                              Run a free rehearsal
 beta notice
 c1 ── card 480 ─────────────────────────┐          c7–c12: side panel (588) ─────────────┐
│ ━ Log in                                │         │                                      │
│ Welcome back                display-m   │         │     E1: the door from the step,      │
│ Firms go to their filing desk,          │         │     the blank plate beside it, the   │
│ platforms to their dashboard.  lede     │         │     door a hand's width ajar         │
│ [Google notice slip, if any]            │         │     engraved vignette, 440 × 550,    │
│ [ G  Continue with Google             ] │ 48      │     centred on the card              │
│ ───────────────────────────── 1 px Rule  │         │                                      │
│ [form notice slip, if any]              │         │                                      │
│ Email                                   │         └──────────────────────────────────────┘
│ [_____________________________________] │
│ Password                                │
│ [_____________________________________] │
│ Forgot your password?           small   │
│ [ form message slot ]                    │
│ [               Log in                ] │ Brass, 56
│ ─────────────────────────────            │
│ New here? Set up your firm's filing     │
│ desk. Enterprise developers can also    │
│ log in with an API key.         small   │
└─────────────────────────────────────────┘
```

- Kicker "Log in" · heading "Welcome back" · lede "Firms go to their filing desk, platforms to
  their dashboard."
- **"Continue with Google"** (when Google is configured): Google's own sign-in button, built to
  Google's published branding guidelines (their white theme, their "G" mark, their wording), the
  full width of the card and 48 px tall. It's Google's brand, used as Google requires, and the only
  third-party mark on the site; it never takes Brass. Then a 1 px Rule hairline with 24 px above and
  below. No "or" is added.
- **The email form:** "Email", "Password", then "Forgot your password?" as a `small` link 8 px under
  the password field, then "Log in" (Brass, 56 px, full width; pending "Signing in…").
- **The note** under a 1 px Rule, 24 px below the button: "New here? Set up your firm's filing desk.
  Enterprise developers can also log in with an API key." with both links. (The API-key log-in at
  `/dashboard/login` belongs to the platforms writer and uses this same card.)
- **The side panel** c7–c12: vignette E1 at 440 × 550, centred horizontally in the panel and
  vertically on the card, Plate Ink on Cotton (Night Ink on Night). Decorative.
- **Header:** the lockup, and "Run a free rehearsal" as a plain text link on the right; no Brass
  in the header, because the card's "Log in" is the page's Brass button.
- **Phone:** the card full width; the vignette is dropped (the form comes first, and a returning
  owner wants it under her thumb).

**Notices and messages** (tones from 10A.0.6). The page can arrive with one notice; the form can
answer with one message.

| Where it shows | Words (as written) | Tone |
|---|---|---|
| Under the lede, above Google (`?google=…`) | "No account uses that Google email. Log in with your email and password, or set up your firm's filing desk first." | Problem |
| | "Your account is waiting for approval. We'll email you when it's ready." | Attention |
| | "This account can't sign in. If you think that's wrong, email hello@cofile.app." | Problem |
| | "Google sign-in was cancelled." | Plain |
| | "That Google sign-in took too long. Try again." · "Google sign-in didn't work. Try again, or log in with your email and password." | Problem |
| | "Google sign-in isn't available here yet." | Plain |
| Above "Email" (`?ended`, `?reset`, `?new`) | "Your session ended. Log in again to carry on." (also where `/session-ended` sends a personal session) | Plain |
| | "Your password is changed. Log in with the new one." | Done |
| | "Your account is ready. Log in to set it up." | Done |
| Above "Log in", after submitting | "Enter your email and password." · "That email and password don't match an account." · "Too many tries. Wait a few minutes and try again." · "We can't sign you in right now. Try again in a minute." | Problem |
| | "Confirm your email first: open the link we sent when you signed up." with the link "Send the link again" | Attention |
| | "Your account is waiting for approval. We'll email you when it's ready." | Attention |
| | "This account can't sign in. If you think that's wrong, email hello@cofile.app." | Problem |

A form message replaces the arrival notice once the form has been submitted (the component already
hides the notice then).

---

## 10A.12 Forgot and reset password

### 10A.12.1 Forgot password (`/forgot-password`)

The single card (10A.8), vignette **E2** above. Kicker "Forgot password" · heading "Reset your
password" · lede "Enter the email you log in with. We'll send a link to choose a new password." ·
"Email" · "Email me a reset link" (Brass; pending "Sending…") · the note "Back to log in" (a link,
`small`).

- **Error:** "Enter the email you log in with." under the field (Madder) and as the Problem slip;
  "We can't send a reset link right now. Try again in a minute." as the Problem slip.
- **Sent:** the component replaces the form with its message, set as a **Plain** slip, "If that
  email has an account, we've sent it a link to choose a new password. It works for an hour." The
  slip is plain on purpose: it can't say whether the email has an account, so it doesn't look like
  a success. The heading, lede and "Back to log in" stay; there is no button left on the page.

### 10A.12.2 Choose a new password (`/reset-password`)

The single card, vignette **E2** above. Kicker "Reset password" · heading "Choose a new password".

- **With a link (`?token=`):** "New password", then "At least 12 characters. A few unrelated words
  work well." as the field's help directly under it (moved up from after the second field, so it's
  read before typing: Rosa), then "New password again" · "Set new password" (Brass; pending
  "Saving…"). The optional show-password control as at sign-up `[copy needed]`.
- **Errors:** "The two passwords don't match." under the second field; "Password: …" (the server's
  rule) under the first; Problem slip above the button for "This link has expired or was already
  used. Ask for a new one below.", "This link isn't complete. Open it again from the email." and
  "We can't change your password right now. Try again in a minute."; after the expired message the
  component's link "Ask for a new link" sits 16 px under the button as a `ui` 17/24 Medium link.
- **Done:** the page moves to Log in with the Done notice "Your password is changed. Log in with the
  new one."
- **Without a link:** no form; the lede alone, "This link isn't complete. Open it again from the
  email, or ask for a new one." ("ask for a new one" a link to `/forgot-password`). No button.

---

## 10A.13 Confirm your email (`/verify-email`)

The single card, vignette **E2** above. Kicker "Your filing desk" · heading "Confirm your email".

| Arrives | Shows | Then |
|---|---|---|
| **With a link** (`?token=`) | Lede "One click and your email is confirmed." · "Confirm my email" (Brass; pending "Confirming…") | **Confirmed, desk open:** the form gives way to the Done slip "Your email is confirmed. You can log in now." and the slip's link "Log in" is set beneath it as the page's Brass button, 56 px, full width, the same word and destination (styling, not new copy) · **Confirmed, in review:** the Done slip "Your email is confirmed. We review new filing desks and will email you as soon as yours is open." and nothing else · **Link expired:** Problem slip "This link has expired or isn't valid. Ask for a new one below." with its link "Send a new link" · **Down:** "We can't confirm your email right now. Try again in a minute." |
| **Without a link** | Lede "Lost the email, or the link expired? Enter the email you signed up with and we'll send a new link." · "Email" · "Send a new link" (Brass; pending "Sending…") | **Sent:** Plain slip "If that email is waiting for confirmation, we've sent a new link. It works for 7 days." · **Errors:** "Enter the email you signed up with." (field and slip), "We can't send a link right now. Try again in a minute." |

Confirming gets no stamp, tick burst or confetti (D2.6): the Done slip presses in like any other
slip (`press-in`, 440 ms) and that's all.

---

## 10A.14 Invitations (`/join/<token>`, `/invite-expired`)

- **`/join/<token>`** has no page: old staff invite links redirect at once (303) to
  `/invite-expired`. Nothing to draw; no interstitial, no spinner.
- **`/invite-expired`** today renders a bare page outside the Shell. It gets the account-page frame
  (10A.8): the header (the lockup and "Log in"), the beta notice, the footer, and the single card
  with vignette **E1** (the door from the step) above it. The person here was invited by a firm
  whose name the old link no longer carries, so the page is CoFile's, and quiet.
  - Heading "This link has expired or isn't valid" (`display-m`; the code's `h1`) · lede "Ask
    whoever sent it for a new invitation. Invitations now come by email with a link to set your own
    password."
  - No button: the copy has none, and the next step is in someone else's hands. No red, no warning
    glyph: an old link isn't an alarm (Greta).
  - Phone: as 10A.8.

---

## 10A.15 Terms of Service and Privacy Policy (`/terms`, `/privacy`)

Long documents, so they're set as a well-printed booklet a careful owner might print and read with
a pen (Hal, Elaine, Greta). Both use `LegalPage`; copy from `web/app/terms/page.tsx` and
`web/app/privacy/page.tsx`.

```
DESKTOP 1440 (Cotton)                                                      support rhythm
 c1–c2 (180)  c3–c10 (792; the text at 68 ch, about 650 px)
              Terms of Service                                  display-page 60/64
              Effective November 26, 2026. See also our Privacy Policy.   small, Graphite
              ─────────────────────────────────────────────────  1 px Rule, 48 above and below
         1.   What CoFile does                  9.   Other services            ← the contents:
         2.   What CoFile is not               10.   Changes and availability     ui 17/24,
         3.   Accounts                         11.   Disclaimers                  numbers tabular
         …                                     …                                  Graphite, hung;
         8.   Acceptable use                   16.   Contact                      titles linked
              ─────────────────────────────────────────────────
              These terms govern your use of CoFile: the website, the portals and
              dashboards, the API and the messages we exchange with you. …   reading 19/30

         1.   What CoFile does                     ← h2: the number hung in c1–c2, right-aligned
                                                     24 px short of the text; display-s 26/32;
              CoFile is software that fills in and   number Graphite, title Plate Ink; 64 above,
              submits business filings on government   16 below
              websites at your direction: …

         2.   What CoFile is not
              **CoFile is not a law firm or an accounting firm and does not give legal, tax or
              accounting advice.** Using CoFile creates no …   ← strong: Miller Text Bold
```

- **Title:** the h1 at `display-page`; under it, 16 px, "Effective November 26, 2026. See also our
  Privacy Policy." (or "… Terms of Service.") in `small` Graphite with its link.
- **The contents** (Hal): the page's own h2s as links, in two columns on desktop (Terms 1–8 and
  9–16; Privacy's ten as 5 and 5), `ui` 17/24, between two 1 px Rules with 48 px around. On Terms
  the section number hangs to the left of each title in tabular Graphite (it's part of the heading's
  text, split visually, not added); Privacy's headings have no numbers and the list has none. The
  list is a `nav` whose accessible name is `[copy needed]`. It is not sticky (6.6): it's the
  booklet's contents page, and the browser's find does the rest.
- **The text:** Miller Text 400 at **19/30** (tablet 19/30, phone 18/29), Plate Ink, measure 68 ch,
  starting on c3 (5.1: Miller Text carries long reading on CoFile's own pages). Paragraphs 16 px
  apart, no indents. `strong` ("CoFile is not a law firm …", "CoFile is not a government agency",
  Privacy's list leads) in **Miller Text Bold 700**, the one cut this part adds to 5.1, for these
  two pages only, so legal emphasis stays emphatic without leaving the serif. Links underlined in
  Brass Line.
- **Headings:** Terms' "1. What CoFile does" … "16. Contact" in `display-s` (Miller Text 26/32),
  the "1." hung in c1–c2 in Graphite, right-aligned 24 px short of the text column, the title on
  c3 in Plate Ink; Privacy's unnumbered headings the same without the hung number. 64 px above
  each, 16 px below.
- **Lists** (Privacy's "What we collect", "Sensitive information", "Who we share it with"): the
  support en rule hung in the margin, items 12 px apart, the bold lead ("Account details:", "Filing
  details:" …) in Miller Text Bold.
- **No pictures, no motion.** The header (with its five links) and the footer as usual; no sticky
  phone bar.
- **Print** (both pages): US Letter, 1 in margins; Miller Text 11/15 pt, headings 13/17 pt, the
  contents printed; the header, beta notice and footer don't print; a running foot in Founders
  Grotesk Text 8.5 pt, "CoFile · Terms of Service · 3" (the document's title and the page number;
  no new words); links print their address in brackets after the link text (except the email, which
  is already its own address); no heading at the foot of a page, no widows or orphans under three
  lines.
- **Tablet:** the hung numbers stay in a 96 px margin column; text c2–c8. **Phone:** the number moves
  inline before its title ("1. What CoFile does" on one line at 22/28); the contents run as one
  column; text 18/29 full width.
- **Dark mode:** Night ground, Night Ink text, the rules `#323646`.

---

## 10A.16 Page not found and Something went wrong

### 10A.16.1 Page not found (`not-found.tsx`)

The blank plate, engraved large, says there's nothing here, gently and without a joke (Hal).

```
DESKTOP 1440 (Cotton), with the full header (five links) and the footer
            c4 ─────────────── c9 (588)
            ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲
            │ (⊖)                    (⊖) │   E3: the blank plate, engraved vignette,
            │                            │   360 × 144, Plate Ink
            ╲____________________________╱
                                       48
            Page not found                       display-m 36/42
            The link may be old or mistyped.     lede 22/34
                                       48
            [ Go to the home page ]              outline button, 56
```

- Today the 404 renders without the Shell; it gets the full Shell (header with the five links,
  beta notice, footer), so someone who followed a bad link can go anywhere from it.
- Flush left in c4–c9, 128 px below the header and 160 px above the footer. "Go to the home page"
  is the outline button (the copy's `btn`, not primary), so the header's "Run a free rehearsal"
  stays the screen's one Brass button.
- Phone: the plate at 280 × 112, then the words and the button full width.
- Dark mode: the plate in Night Ink on Night.
- 404s under a firm's address (`/p/<firm>/…`, a client link) are the firm-pages writer's, in the
  firm's Letterhead, never with CoFile's plate.

### 10A.16.2 Something went wrong (`error.tsx`)

A broken page shouldn't try to be charming (Hal): no picture, no red, an apology rather than an
alarm (Greta).

```
DESKTOP 1440 (Cotton)
 [plate] CoFile                                      ← a minimal header: the lockup only, linking
 ──────────────────────────────────────────────────     home, 76 px (64 phone), 1 px Rule under it
            ┌ card 480 ──────────────────────────────┐
            │ Something went wrong      display-m    │
            │ This page couldn't load just now. It's │
            │ usually a short hiccup on our side.    │
            │                              lede      │
            │ [ Try again ]  [ Log in again ]        │  Brass 56 · outline 56, 16 apart
            │ If it keeps happening, tell us this    │
            │ reference: ┊ 3f9c2a01 ┊        small   │  digest: Founders Grotesk Mono 15/22
            └────────────────────────────────────────┘
```

- The error boundary renders inside the root layout (the beta notice stays) but outside the page's
  Shell, so it draws its own minimal header: the lockup alone, no links and no CTA, so a page that
  just failed loads as little as possible. No footer.
- The card (10A.8) centred, 96 px below the header. Heading "Something went wrong" (`display-m`,
  the code's `h1`) · lede "This page couldn't load just now. It's usually a short hiccup on our
  side." · "Try again" (Brass) and "Log in again" (outline), side by side, stacked full width on
  phones · the reference line, only when there's a digest, "If it keeps happening, tell us this
  reference: …" in `small` Graphite 24 px below, the digest in Founders Grotesk Mono 15/22 on a
  Cotton 2 chip with 4 px padding, selected whole with one click (`user-select: all`). (The digest
  in the wireframe is a layout placeholder.)
- "Try again" holds its pressed state while the page retries.
- Firm-side errors use the firm's Letterhead and the same calm card (the firm-pages writer).

---

## 10A.17 `[copy needed]` raised by this part

Beyond the foundation's list (D7: alt text for every photograph, replay controls, the Close's
field, "Menu", the engraver film's credit and description), these pages need:

| Where | What |
|---|---|
| How it works, step 3 (10A.1.2) | The caption under the C10 photograph: the filing professional's name and role |
| How it works, the proof (10A.1.3) | A caption for the printer's proof photograph C9, if one is wanted (fictional names only on the cards in it) |
| For firms, the film (10A.2.1) | The accessible names of the film's pause and play control |
| For firms, the studio (10A.2.2) | The accessible name of the studio's control group |
| For firms, close (10A.2.6) | The alt text pattern for the plate when it carries the visitor's typed name |
| Pricing, title page (10A.4.1) | The names and roles of the filing professionals in the three portraits (alt text) |
| Questions, "Is a person involved?" (10A.6.2) | The name and role of the person in the portrait (alt text) |
| For platforms, "underneath" (10A.7.1) | The picture's accessible name (and a caption, if the owner wants one beyond the proof's label) |
| Sign-up and Choose a new password (10A.9.2, 10A.12.2) | The two labels of the optional show-password control; without them it's left out |
| Terms and Privacy (10A.15) | The accessible name of the contents list |

---

## 10A.18 What this part takes from, and leaves to, the other parts

- **From the home page part:** the header, footer and beta notice; the pictures reused here
  (`DeskVisual`, `TwoFirmsVisual` with its wipe and signature, `TextToFormVisual`'s choreography,
  `ProofVisual` at picture size, `PapersVisual`, the run sheet and its house-lights moment, the
  sample cards, the price card's construction, the plate lettering at the Close).
- **From the firm's pages and the proof:** the live components the pictures are built from (the
  filing desk, the client page, the proof and its picture size, the proof-ready email), the ink
  match and Letterhead in use, and the Branding page that receives the visitor's carried name and
  color.
- **From the platforms part:** the embed widget shown under "underneath", and the API-key log-in
  (`/dashboard/login`), which uses this part's card.
- **From components:** buttons, fields, chips, slips and their states; 10A.0.6 lists only what these
  pages need of them.
- **For art direction:** the vignettes E1–E3 (10A.0.5), the second C5 frame for How it works'
  step 1, C8's 4:5 crop, and C10's side-on frame and tight portraits. Two commissions are used once
  more than the foundation's table lists, with no change to what they show: C6's envelope frame on
  How it works' After (10A.1.6), and C3 (C4 in dark mode) at For firms' close (10A.2.6).
- **For production:** one added cut, Miller Text Bold 700, on Terms and Privacy only (10A.15); the
  C11 film's delivery (12 s, 4:5 and 16:9, under 2.5 MB on the page); the engraving reused on
  sign-up exactly as at the Close.
