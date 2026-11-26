# CoFile website design spec: "In Register"

| | |
|---|---|
| **Designer** | Dev Raman, staff product designer |
| **Date** | Nov 26, 2026 |
| **Covers** | Every surface in the brief: public site, filing desk, service pages, client pages and the proof, enterprise dashboard, white-label and embed, developer docs, emails |
| **Copy** | Quoted from the repo and locked. Anything that needs new words is marked `[copy needed]` and listed in Appendix B |

---

## 1. Who I am and how that shapes this

I've spent eight years designing for payments and banking-as-a-service companies: design systems,
operator dashboards, and API references that are products in their own right. In that world the
screen that matters most is the confirmation before money moves, and the engineering idea that matters
most is that what the user confirmed is exactly what gets executed. You hash it, compare it, and
refuse to run if the two differ.

CoFile is that idea applied to state filings. So I work on it as a systems designer:

- **Tokens before pages.** CoFile will render thousands of firms' brands, so I design the theming
  engine, and CoFile's own look is simply the first theme that runs through it.
- **States before screens.** A filing moves through about twenty statuses. Each needs one color, glyph,
  label and next step everywhere it appears: chip, timeline, table, email, webhook.
- **One precise site, two reading depths.** The precision that makes a developer trust an API (exact
  values, copyable IDs, visible checks) is the same precision that makes a 60-year-old CPA trust a filing.

Today's paper-and-manila look is warm and well made, but it says "nice letterhead." I want CoFile to say
"this was checked."

## 2. The concept: In Register

On a multi-color press, every plate has to land in exactly the same place. When it does, the print is
**in register**: the edges line up and the job is true. When it doesn't, you see a ghost edge, slightly
off. Press operators check registration before the run and stop the press when it drifts.

That's CoFile, literally:

1. The copy already chose the printer's proof as its metaphor ("You've approved a proof before: business
   cards, letterhead, an invitation at the printer"). Registration is what the press checks *after* the
   proof is approved, so the metaphor carries through to the filing itself.
2. The product's job is keeping two things in register: **what the client approved** and **what the
   state's website shows**. The review page has to match the proof, the fee on the payment screen has to
   match the proof's fee, and if anything drifts, CoFile stops before paying.
3. To a developer, being in register is a diff with zero changes, or a hash that matches. It's the same idea in their vocabulary.

The design language follows from that:

- **The mark** is two sheets in register.
- **Layouts** pair values: approved on the left, what the state shows on the right, with a narrow
  "register gutter" between them that carries the check.
- **Motion** is things sliding into register: a ghost edge that settles and disappears.
- **The signature** is the **proof print**, a register mark generated from the approved details
  themselves, which follows the filing everywhere it goes (3.5).

None of it is decoration. Every visual device corresponds to a check the engine really performs.

## 3. Brand identity

### 3.1 The mark: "the Pair"

Two sheets of the same width, stacked, with their edges aligned. The top one is an outline (the proof)
and the bottom one is solid (the filing). Together they read as an equals sign: *matches*.

On a 24 × 24 grid:

| Part | Geometry |
|---|---|
| Top sheet | Rounded rectangle x 3 → 21, y 4 → 11, radius 2, 2-unit stroke drawn inside, no fill |
| Bottom sheet | Rounded rectangle x 3 → 21, y 13 → 20, radius 2, solid |
| Gap | 2 units, equal to the stroke, so outline and fill read as one family |
| Register notch | A 2 × 2 square cut from the bottom sheet's top-right corner (x 19 → 21, y 13 → 15). The one asymmetry: it orients the mark and stops it being a plain "=" |
| Rule | Left and right edges align exactly at every size. A half-pixel misalignment in an export is a bug |

Hinted variants: **16 px** (favicon) drops the notch and uses radius 1.5; **20–32 px** is the master;
**48 px and up** thins the stroke to 1.75/24. The mark is monochrome only: Carbon `#0F1419` on light,
Bond `#F6F6F3` on dark. Never in Proof Blue or any status color: color belongs to meaning.

### 3.2 Wordmark and lockups

"CoFile", one word with a capital C and F, set in GT Standard Medium (Section 5) and redrawn by hand:

- The **F** has two arms of exactly equal length (the retail lower arm is shorter), echoing the Pair's
  two sheets; arm length equals the width of the "o".
- The **o** is widened 2% so "Co" doesn't look condensed next to "File". The **i** gets a square tittle
  aligned to the F's upper arm. The **e** terminal is cut horizontal to match the F's flat arm ends.
- Tracking -10 at display sizes, 0 at 14 px and below. The cap height of C and F aligns with the top of
  the Pair's top sheet in the horizontal lockup.

Lockups: horizontal (default; gap = half the mark height), stacked (square spaces), mark only. Clear
space on every side equals the height of one sheet. Minimums: horizontal lockup 72 px wide, mark 16 px.

```
Horizontal (default)          Stacked (social, square)        Mark only (favicon, app)
┌────────────────────┐        ┌──────────┐                    ┌────┐
│ ▭▭▭  CoFile        │        │   ▭▭▭    │                    │▭▭▭ │
│ ███                │        │   ██▀    │                    │██▀ │
└────────────────────┘        │  CoFile  │                    └────┘
  gap = ½ mark height         └──────────┘                  (▀ = register notch)
```

Don't tint the mark, put it in a container shape (except where an app platform forces one), set
"CoFile" in caps or write "Cofile", animate it outside the register motion (Section 8), or place it on a
firm's page anywhere except inside the co-brand mark.

### 3.3 The "with CoFile" co-brand mark

The only sign of CoFile on a firm's pages. It's a component, not an image, so it inherits the page theme
and always passes contrast.

| Property | Value |
|---|---|
| Content | The Pair at 12 px followed by "with CoFile" (locked copy) |
| Type | GT Standard Regular 12/16, `--cf-fg-subtle` (6.06:1 on white, 6.08:1 on dark surface) |
| Placement | Right end of the firm header on desktop, under the firm name on phones; once more in the proof's footer |
| Never | In the firm's color, larger than the firm's name, inside the embed's form area, or linked anywhere but cofile.app (new tab) |
| Minimum | 11 px text; below that, drop the mark and keep the words |

### 3.4 Usage on CoFile's own pages

The mark and Proof Blue lead on cofile.app, the docs and the dashboard. The wordmark alone (no mark) is
allowed in running text, the footer line and legal pages.

### 3.5 The signature: the proof print

The engine already binds every approval to a SHA-256 hash of the exact request (`canonicalHash` in
`src/approvals/hash.ts`). Today nobody sees that hash. I want to print it.

**The proof print** is a small register seal generated from the approved details. The same details
always give the same print, and a change of one character gives a different one. That's the moment the
copy describes: "If anything has to change later, it comes back to them to approve again."

```
        ╷ ╷╷ ╷ ╷╷╷         32 radial ticks on a ring (r 16, 48-unit grid)
     ╶╴            ╶╴        long tick (6 units) = bit 1, short (3) = bit 0
    ╶       ◯        ╴       index gap at 12 o'clock fixes orientation
     ╶╴            ╶╴        centre: empty circle r 6, stroke 1.5
        ╵ ╵╵╵ ╵ ╵╵
          4F2A·91C0          the same 32 bits as 8 hex characters, Mono
```

- **Bits** are the first 32 bits of `HMAC-SHA256(server_key, canonicalHash)`. Using an HMAC means a
  truncated hash of personal details can't be used to test guesses.
- **Color** is always `--cf-fg-default`, never the firm's or a status color. Because it's neutral, it can
  appear on white-label pages without being a CoFile logo.
- **Sizes:** 40 px on the proof, 20 px in timelines and tables, 14 px in log lines, and 64 px in emails
  as a 2× PNG.
- **Text:** the 8 characters are real text in GT Standard Mono, so screen readers read them and two
  people can compare them by eye or over the phone.

| Where | Beside which existing words |
|---|---|
| The proof | "Filing reference {id}" |
| The decision page | "Approval recorded" |
| Filing detail timeline | The "Approved" step, and each run check reading "matched the proof" or "matches the proof" |
| Rehearsal log (home, filing detail) | "Review page: matched the proof"; "Payment: $100.00 + $3.50 NJ portal fee: matches the proof" |
| Emails | "Your proof is ready to approve" and "Completed" |
| Dashboard filings table | A narrow column after Status |
| API and webhooks | A proposed `proofPrint` field on the filing and on `filing.approved`, so platforms can show the same print in their own product |

This is the one idea I'd fight for. It turns "Checked twice. Filed once." from a claim into something
you can see. The CPA reads it as a notary's embosser and the engineer reads it as a content hash. It costs
little because the hash already exists. It needs a short label before it ships (Appendix B); until then
it appears only beside the existing words above.

## 4. Color

### 4.1 Token architecture

| Tier | Example | Set by |
|---|---|---|
| Reference | `ref.carbon.900 = #0F1419` | Design system |
| System `--cf-*` | `--cf-fg-default`, `--cf-status-go-fg` | Design system, per mode (light, dark, high contrast) |
| Brand slot `--cf-brand-*` | `--cf-brand-solid`, `--cf-brand-text` | The theming engine (Section 11), from the firm's inputs |
| Component `--cf-c-*` | `--cf-c-button-primary-bg: var(--cf-brand-solid)` | Design system |

CoFile's pages fill the brand slot with Proof Blue and a firm's pages fill it with the firm's color.
**CoFile is tenant zero of its own theming system**: there's one code path, so every firm gets the quality
CoFile gets. Status, mode and commit tokens sit outside the brand slot, and no firm input can reach them.

### 4.2 Neutrals

| Token | Light | Dark | Use |
|---|---|---|---|
| `--cf-bg-page` | `#F6F6F3` Bond | `#0C0F13` | Page |
| `--cf-bg-surface` | `#FFFFFF` | `#13171D` | Cards, tables, the proof sheet |
| `--cf-bg-sunken` | `#EEEEE9` | `#090B0E` | Wells, table headers, code |
| `--cf-bg-raised` | `#FFFFFF` + elevation 3 | `#1A1F26` | Menus, command palette |
| `--cf-border-default` | `#DEDDD6` | `#2B323C` | Decorative hairlines |
| `--cf-border-control` | `#80858E` (3.71:1) | `#6B7480` (3.80:1) | Input and checkbox edges (passes 1.4.11) |
| `--cf-fg-default` | `#0F1419` Carbon (17.10:1 on Bond) | `#E9ECEF` (16.20:1) | Body |
| `--cf-fg-muted` | `#3D4450` (9.06:1) | `#B3BBC5` (9.27:1) | Secondary text |
| `--cf-fg-subtle` | `#5C636E` (6.06:1) | `#8E97A2` (6.08:1) | Captions, meta; never below 12 px |
| `--cf-focus` | `#1659D1` | `#8FB4FF` | 2 px ring, 2 px offset, on everything focusable |

Bond keeps a trace of warmth so long pages aren't clinical, but surfaces are pure white: the proof
should look like a clean sheet, not parchment.

### 4.3 Proof Blue

Printers mark up proofs in non-photo blue, a pencil color the camera doesn't pick up: instructions that
never reach the final print. CoFile's accent comes from that tradition, deepened to pass contrast. It's
the color of guidance and action, never of status.

| Token | Light | Dark |
|---|---|---|
| `--cf-brand-solid` / hover / active | `#1659D1` / `#0F47AD` / `#0B3A8F` (white text 6.21:1) | `#7FAAFF` / `#A3C2FF` / `#C2D6FF` (Carbon text 8.32:1) |
| `--cf-brand-text` | `#1659D1` (6.21:1 on white) | `#8FB4FF` (8.68:1) |
| `--cf-brand-tint` | `#E7EFFC` (brand text on it 5.36:1) | `#16233D` |
| `--cf-highlight` | `#CFE6F6` non-photo blue (Carbon 14.37:1) | `#1C3550` (text 10.58:1) |

`--cf-highlight` is the `<mark>`: values highlighted on the sample proof, phrases in a forwarded message
that were read into a draft, docs search hits. It always means "look here," never "this is fine."

### 4.4 Status: six tones

Today amber does too much: it covers a rehearsal's planned hold, "Waiting for approval" and "Paused:
state site changed" all at once. I split tones by who needs to do what. The brief's meanings survive (green moves a
filing forward, amber is a planned hold, red is a stop), and I add violet for "a person needs to act."

| Tone | Meaning | Glyph (never color alone) | Light fg / bg / border | Dark fg / bg / border |
|---|---|---|---|---|
| `go` | Approved, live, moving forward | Filled circle with check | `#0A6B47` / `#E2F3EA` / `#9ED2B9` (5.69:1) | `#4FCB8F` / `#10281D` / `#1E5A3E` (7.65:1) |
| `hold` | Paused on purpose; safe | Two bars | `#8A4F00` / `#FCEFD8` / `#E9B465` (5.78:1) | `#F2B65A` / `#2E2210` / `#6B4A14` (8.59:1) |
| `act` | Waiting on a person | Ring with centre dot | `#5B36C9` / `#EEE9FC` / `#C3B2F5` (6.28:1) | `#B5A0FF` / `#211A3A` / `#4A3A8A` (7.41:1) |
| `stop` | Stopped; needs correcting | Octagon | `#B42318` / `#FCE9E7` / `#F1A9A1` (5.62:1) | `#FF8B7B` / `#3A1714` / `#7A2C24` (7.03:1) |
| `progress` | The engine is working | Dot, 1.6 s pulse | `#3D4450` / `#ECEEF1` / `#C9CDD3` (8.44:1) | `#B3BBC5` / `#1E242C` / `#343C47` |
| `neutral` | Recorded, nothing to do | Small dot | as progress, no pulse | as progress |

Every label in `web/lib/status.ts` maps to one tone:

| Tone | Labels (locked) |
|---|---|
| `go` | Approved · EIN issued · Submitted to the state · Accepted by the state · Completed |
| `hold` | On hold · Paused: state site changed · Being checked |
| `act` | Waiting for approval · Needs information · Changes requested · Name unavailable |
| `stop` | Needs correcting · Rejected by the state · Failed · Stopped |
| `progress` | Getting the state's review page · Queued · Filing now · Final check |
| `neutral` | Received |

Solid variants exist only for the **commit button** and the **Live** chip (`go-solid` `#0A6B47`, white
text 6.55:1; dark `#3DBA80`, Carbon text 7.80:1) and for destructive confirmations (`stop-solid` `#B42318`,
white 6.57:1).

### 4.5 Rehearsal is a mode, not a status

Every status can occur inside a rehearsal, so it gets its own layer on top of the status system:

- **Rehearsal tag:** a dashed 1.5 px border in the hold border color, hold text, no fill, hold glyph,
  reading "Rehearsal". You can tell it from a solid hold chip at a glance and in grayscale.
- **Stage hatch:** 45° lines, 1 px every 6 px, `#E9B465` at 35% (dark `#6B4A14` at 60%), as a 6 px band
  on the left edge of any card, row or page in rehearsal. Decorative; the tag carries the meaning.
- **Held step:** in logs and timelines, "Pay Now: held, on purpose" gets the hold glyph and a dashed rule
  after it, meaning the run stopped here as planned.

### 4.6 Coverage ladder

The five coverage labels form a sequence, so I draw them as a four-segment ladder. Live is the only
filled, solid-green one, so nothing else can be mistaken for Live.

| Label (locked) | Ladder | Color |
|---|---|---|
| Planned | `◌◌◌◌` dotted | `--cf-fg-subtle` |
| Offered, not yet rehearsed | `■□□□` | `--cf-fg-muted` |
| Screens recorded, rehearsal next | `■■□□` | `--cf-fg-muted` |
| Rehearsed to the payment screen | `■■■□` | hold, the rehearsal family |
| Live | `■■■■` in a solid chip | `go-solid`, white text |

### 4.7 Code theme and contrast notes

Code ("Carbon" theme), light on `#F1F2EE` and dark on `#0A0D10`: plain `#0F1419`/`#E9ECEF`, keys
`#1659D1`/`#8FB4FF`, strings `#0A6B47`/`#7FD6A8`, numbers `#8A4F00`/`#F2B65A`, keywords `#5B36C9`/`#B5A0FF`,
comments `#646B76` (4.78:1)/`#7D8692` (5.29:1).

- Everything meets WCAG 2.2 AA; the proof and intake body text meets AAA. APCA is a second gate: Lc 75
  for proof body text, Lc 60 for button labels.
- `prefers-contrast: more` maps muted and subtle text to default, thickens borders to 2 px and removes
  hatches and tints. In forced colors, chips render as bordered text with their glyphs, and the commit
  button gets a 3 px `ButtonText` border.

## 5. Typography

### 5.1 Typefaces

| Role | Family | Why |
|---|---|---|
| UI, display, body | **GT Standard** (Grilli Type); Standard width, M width for dense tables | Neutral and very legible, with open apertures and a large x-height. Built as a system with widths and a true mono. Full Latin Extended, so every Spanish character, ¿ and ¡ included |
| Codes, fees, IDs, API | **GT Standard Mono** | Related to the sans in metrics, so a fee in Mono beside a label in sans shares a baseline and optical size |
| Firm voice | The firm's chosen font, for the firm name and headings only (11.4) | Never on values, fees or consents |

Commission from the foundry, as a custom-cut addendum:

1. **ss01 on by default in Mono**: slashed zero, serifed I, tailed l, open 4. Filing references, prints and
   EINs must never be ambiguous, on screen or read aloud.
2. **A fee feature in the sans**: tabular lining figures with a narrow dollar sign.
3. **Windows hinting at 12–14 px**, because firm staff work on Windows laptops and that's where the dense tables live.

Fallbacks: `"GT Standard", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`, using a
metric-matched `@font-face` (`size-adjust: 101.5%`) so nothing shifts when the font loads. Mono:
`"GT Standard Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace`.

### 5.2 Scale

The base size is 16 px in the apps, 17 px on client pages and 18 px on the proof. Line heights sit on the 4 px grid.

| Token | Desktop | Phone | Weight | Use |
|---|---|---|---|---|
| `display-1` | 64/68, -0.025em | 40/44 | 500 | Home H1 |
| `display-2` | 48/52, -0.02em | 34/40 | 500 | Home section heads |
| `h1` | 36/44 | 28/36 | 500 | Page titles |
| `h2` | 28/36 | 24/32 | 500 | App, docs and proof sections |
| `h3` | 22/28 | 20/28 | 600 | Cards, endpoint names |
| `h4` | 18/24 | 18/24 | 600 | Form groups, table titles |
| `body-l` | 20/32 | 18/28 | 400 | Home ledes |
| `body-proof` | 18/28 | 18/28 | 400 | The proof, intake |
| `body` | 16/24 | 16/24 | 400 | Apps, docs |
| `body-s` | 14/20 | 14/20 | 400 | Compact tables, help text |
| `caption` | 12/16 | 12/16 | 400 | Meta, "with CoFile" |
| `kicker` | 13/16 Mono, 0.02em | same | 500 | "For CPA, payroll, fractional CFO and title firms" |
| `mono-l` / `mono` / `mono-s` | 18/28 · 14/20 · 12/16 | same | 400 | Proof values · IDs, code, logs · prints, timestamps |

Only weights 400, 500 and 600 are used; older readers on cheap screens lose light weights. Prose runs to 68
characters at most, 56 on the proof. Text is in sentence case, as the copy is. The only caps are values
the state records in caps, such as "TWO SISTERS BAKERY LLC".

### 5.3 Numerals and fees

`tabular-nums lining-nums` on every table, fee, count and date. Fees are in Mono, right-aligned on the
decimal, with the dollar sign hanging. The Total row has a 2 px Carbon rule above it, weight 600, and one step
larger: on the proof, "$103.50" is the largest number on the page. Codes and IDs (`f_…`,
`cofile_AbCdEfGh`, EINs, prints) are always Mono and always copyable.

## 6. Layout

| Breakpoint | Width | Columns | Gutter | Margin |
|---|---|---|---|---|
| `xs` | 0–479 | 4 | 16 | 16 (the proof is designed at 360) |
| `sm` | 480–767 | 4 | 16 | 24 |
| `md` | 768–1023 | 8 | 24 | 32; app sidebar becomes a rail |
| `lg` | 1024–1279 | 12 | 24 | 40 |
| `xl` | 1280–1535 | 12 | 32 | auto; marketing max 1200 |
| `2xl` | 1536+ | 12 | 32 | auto; apps max 1320 |

Content widths: forms 640–720, docs prose 720 with a 400–480 code rail, the proof 720.

**Spacing**, on a 4 px base: `space-1` 2, `-2` 4, `-3` 8, `-4` 12, `-5` 16, `-6` 20, `-7` 24, `-8` 32,
`-9` 40, `-10` 48, `-11` 64, `-12` 80, `-13` 96, `-14` 128. Home sections are 96 apart on desktop and 64 on
phones.

**Density** is set per user and remembered per device:

| | Comfortable (desk default) | Compact (dashboard default) | Client pages (fixed) |
|---|---|---|---|
| Table row | 52 px | 36 px | n/a |
| Input | 44 px | 36 px | 48 px |
| Button `md` | 40 px | 32 px | 48 px (`lg`) |
| Table text | 16/24 | 14/20 | n/a |
| Card padding | 24 | 16 | 20 on phones, 32 on desktop |
| Sidebar item | 40 px | 32 px | n/a |

**Radii:** 2 (glyph boxes), 4 (inputs, buttons, chips), 6 (cards, menus), 10 (the proof sheet, modals),
full (the print). They're kept small, for precision rather than softness. Firms can't change radii, which is
one of the guardrails that keeps every desk looking professional.

**Elevation:**

| Level | Light | Dark | Use |
|---|---|---|---|
| 0 | none, 1 px `--cf-border-default` | none, 1 px border | Default cards, tables |
| 1 | `0 1px 2px rgb(15 20 25 / .06)` | border `#343C47` | Hoverable cards |
| 2 | `0 2px 4px rgb(15 20 25 / .06), 0 8px 24px -8px rgb(15 20 25 / .12)` | border + `0 8px 24px -8px rgb(0 0 0 / .6)` | The proof sheet, sticky bars, drawers |
| 3 | `0 4px 8px rgb(15 20 25 / .08), 0 24px 48px -12px rgb(15 20 25 / .20)` | `#1A1F26` + border + the same shadow at .7 | Menus, command palette, modals |

In dark mode, depth comes from lighter surfaces and borders, not shadows. **Z-index scale:** base 0, sticky
100, drawer 200, overlay 300, modal 400, toast 500, palette 600.

## 7. Imagery

The product is the picture: no stock handshakes, glowing shields or robots.

| Kind | What | Commission |
|---|---|---|
| **Product renders** (primary) | The real React components (proof, log, coverage, desk) fed with the sample data, so they never drift from the product | In-house |
| **State-screen plates** | Simplified grey line drawings of a state site's screens (form, review page, payment screen) used as the hero's ghost sheet and in Rehearsals. No state seals, logos or colors: they must read as diagrams, not replicas | A technical illustrator from patent or instruction-manual drawing |
| **Documentary photos** (sparing) | Four to six on-location images of real small CPA, payroll and title offices, with subjects mostly 40–65, natural light and nobody posing for the camera. Only in Firms, After and sign-up | An editorial photographer, with releases and a no-AI-alteration clause |
| **Document still lifes** | Fictional paper: a certificate edge, a folded letter. No agency letterhead | Same photographer |
| **Data visuals** | Ladder, timeline, dashboard charts. Status tones only for status data; a neutral categorical set for everything else (graphite `#3D4450`, Proof Blue, slate teal `#2F6F7E`, sand `#9C7A3C`) | In-house |
| **Icons** | About 60 glyphs at 20 px on a 1.5 px stroke, square caps, matching the Pair's geometry | A UI icon designer |

No 3D. The two sheets work better as flat motion than as objects.

## 8. Motion and interaction

**Principles.** (1) Motion explains a check: things slide into register when the engine has matched them.
(2) It's fast in the apps, where staff repeat the same task fifty times a day. (3) Nothing irreversible
animates: the commit button never moves, morphs or hides while it can be pressed.

| Token | Duration | Easing | Use |
|---|---|---|---|
| `motion-instant` | 80 ms | linear | Hover, press |
| `motion-quick` | 140 ms | `cubic-bezier(.2,0,0,1)` | Chips, toggles, tooltips |
| `motion-base` | 200 ms | `cubic-bezier(.2,0,0,1)` | Menus, disclosures, toasts |
| `motion-exit` | 160 ms | `cubic-bezier(.4,0,1,1)` | Anything leaving |
| `motion-slow` | 320 ms | `cubic-bezier(.3,0,0,1)` | Drawers, the palette |
| `motion-register` | 720 ms | `cubic-bezier(.16,1,.3,1)`, no overshoot | Ghost sheet sliding into place |
| `motion-print` | 900 ms | `cubic-bezier(.65,0,.35,1)`, ticks staggered 18 ms | Drawing the proof print |

**Signature moments**

- **Hero register:** the sample proof sits on a ghost state-page plate offset 12 px right and 12 px down,
  at 40% opacity. After 400 ms it slides into register; as it lands, callout 3's rows ("Business Name",
  "Designator") flash `--cf-highlight` for 600 ms. It plays once per session.
- **Callout linking:** hovering or focusing callouts 1–4 highlights the matching check in the proof
  section (1 ↔ "Every name, address and answer…", 2 ↔ "Every fee…", 3 ↔ "Where the state's website
  allows it…", 4 ↔ "One button…"), and the reverse.
- **Rehearsal log:** the seven lines arrive 220 ms apart. "Pay Now: held, on purpose" lands in hold color
  and the dashed rule draws left to right. A replay icon button restarts it.
- **Approval recorded:** the print draws in, then the heading fades up, all in under 1.2 s.
- **Live switch-on:** the first time a user sees a type newly Live, its last ladder segment fills (320 ms).
- **Filing timeline:** on an open filing detail page, when a run check passes, the step's register gutter
  flips from the progress dot to the go check with a 140 ms scale from 0.8. Status changes arrive by
  server-sent events and are announced politely.
- **Live preview:** as staff type in the new-filing form, the matching row of the preview proof gets a
  `--cf-highlight` underline for 300 ms after the last keystroke, so the eye can find what changed.
- **Copy:** the icon swaps to a check (`motion-quick`) and back after 1.2 s. No toast for copies.

**Keyboard.** Every app surface has a command palette (`⌘K`/`Ctrl K`) that jumps to any page by its
existing nav label ("Filings", "New filing", "Ready to pay", "Client links", "Signatures", "Setup",
"Billing", and on the dashboard also "API keys", "Webhooks", "Firms", "Team", "Docs"). It also finds
filings by business name or ID and searches the docs; its placeholder and group names are `[copy needed]`.
Shortcuts: `N` new filing, `G F` filings, `G P` Ready to pay, `/` search, `J`/`K` move through rows,
`C` copy ID, `?` list shortcuts. Single-key shortcuts are off inside fields and can be turned off
(WCAG 2.1.4). Copy buttons sit on every ID, link, key prefix, secret, code block and print.

**Reduced motion.** No slides or scaling. The plate starts in register, the log and print render
complete, pulses become static, and anything slower than `motion-quick` becomes a crossfade of 120 ms or
less. No meaning depends on motion.

## 9. Components

Every component is built once in React, themed only by tokens, with every state in Storybook.

### 9.1 Buttons

| Variant | Look | Use |
|---|---|---|
| `commit` | `go-solid`, white, 600 | Only actions that move a filing toward the state: "Approve, and authorize submission and payment"; "Send the proof to my client"; "Send to {firm}" on client forms; the security-code submit on Ready to pay. **Never themed by a firm** |
| `primary` | `--cf-brand-solid` | "Run a free rehearsal", "New filing", "Create account", "Log in", "Send" |
| `secondary` | Surface, `--cf-border-control` | "See what your client sees", "Request changes", "Send a client a link" |
| `quiet` | Brand text, no border | "Use a link instead", "Change" |
| `danger` | Stop text and border; `stop-solid` on confirm | "Revoke", "Remove", "Turn off", "Disconnect" |

Sizes: `sm` 32, `md` 40, `lg` 48, `xl` 56 (the proof on phones, full width, two lines allowed).

States are default, hover, pressed (1 px inset), focus-visible (ring always visible, even on colored fills),
disabled and loading. Disabled uses a sunken fill with subtle text and still passes 4.5:1; dimming to 40%
opacity is banned. Loading swaps in the existing pending text ("Sending…", "Creating…", "Saving…",
"Confirming…") with a 16 px spinner, at a width locked to the widest label. A commit button always has 24 px of clear space
above it and never sits beside another commit button.

### 9.2 Fields

The label sits above the input at 14/20 weight 500; placeholders are never used as labels. "Fields marked * are
required." heads the form. Inputs are 44 px (48 on client pages), with 16 px text minimum so iOS doesn't zoom.
Focus turns the border `--cf-focus` and adds the ring. Help text sits below, linked by `aria-describedby`. Errors
add a 2 px stop bar, the octagon and the existing message, and set `aria-invalid`. A summary at the top links
to each field.

- **Paired fields** share a row from `md` up (City / State / ZIP at 5:3:4) and stack on phones.
- **"Same as"** and **"Same person as"** chips follow address and person labels. Copied fields flash
  `--cf-highlight` for 400 ms so the user sees what was filled.
- **"More options (optional)"** is a disclosure. When closed it shows a neutral count of the answers inside,
  so nothing hidden is forgotten.
- **SSNs** display as `***-**-1234` after blur. Revealing them re-masks after 30 s.

### 9.3 The proof card

One component serves the real proof, staff's live preview and the home sample. It's structured per
filing type, in four numbered sections that keep their numbers wherever they appear: **1** details,
**2** fees, **3** the state's own review page, **4** the commit block. Numbers sit in 20 px gutter circles
in Mono 12. Details show the label (muted sans) above the value (Mono) on phones, and 40/60 on `md` and up. Labels
are the intake form's own field labels, in the state's order. A 32 px **register gutter** (`md` and up) shows
a go check on each row the preview run matched on the state's review page. States: `sample`, `draft` (staff preview:
unfinished values underlined with dots, commit block replaced by a placeholder), `ready`, `submitting`,
`expired`. The full phone layout is in 10.5. Anatomy at `md` and up:

```
┌─ firm header ──────────────────────────────────── 4 px brand rule ┐
│ [logo] Harbor & Pine CPA                              ▭ with CoFile │
├────────────────────────────────────────────────────────────────────┤
│ ▨ Rehearsal tag (rehearsals only)                                  │
│ {filing title}                                              (print)│
│ Filing reference f_…  ·  Please decide by …                        │
├─ 3 ─ the state's own review page ──────────────────────────────────┤
│ [screenshot on a white plate, tap or click to zoom]                │
├─ 1 ─ details ──────────────────────────────┬─ register gutter ─┬───┤
│ Business name   TWO SISTERS BAKERY LLC     │        ✓          │   │
│ Members         Ana Ortiz, Lucia Ortiz …   │        ✓          │   │
├─ 2 ─ fees ─────────────────────────────────┴───────────────────┴───┤
│ Formation filing fee                                      $100.00  │
│ NJ portal fee, by card                                      $3.50  │
│ ═══════════════════════════════════════════════════════════════════│
│ Total                                                     $103.50  │
├─ 4 ─ commit block ─────────────────────────────────────────────────┤
│ [code] · [ commit button ] · Request changes                       │
└────────────────────────────────────────────────────────────────────┘
```

Props the build needs: `brand` (theme output), `layout` (the per-type proof schema: sections, field order,
labels from `lib/intake/forms`), `values` (masked), `fees`, `feeCap`, `reviewImage`, `matches` (row IDs
the preview run matched), `print`, `mode` (`sample` | `draft` | `ready` | `rehearsal`), `locale`.

### 9.4 Status chip, timeline, tables

- **Chip:** 24 px, radius 4, glyph 12 + label 14/20 500. A glyph-only `compact` chip (with tooltip and
  `aria-label`) is allowed only in dense tables that also filter by status. The rehearsal tag sits beside a
  chip and never replaces it.
- **Timeline:** vertical, with a 2 px rail and 20 px tone-glyph nodes. Each step shows the status label, the
  time in Mono (`Dec 3, 4:12 PM ET`) and an optional detail line: the existing `nextStep` sentence, or a run
  check such as "matched the proof" with its print. Done steps are solid, the current step has a 4 px halo,
  and future steps are hollow. A rehearsal ends in the held step. On phones, the current step shows and the rest folds away.
- **Tables:** a sticky sunken header, row hover, and the selected row tinted with a 2 px brand bar. Numbers
  are right-aligned Mono, and IDs have a copy button that appears on hover or focus and is always visible on touch. Empty
  tables use the existing text ("No keys created here yet.", "No filings.", "None yet."). Below `md`, rows
  become cards with the status chip top-right. Primary columns never scroll sideways.

### 9.5 Navigation, banners, empty states, toasts

- **Public header:** 64 px. Once the page scrolls, it gets a hairline and an 85% Bond blur. The lockup sits left;
  the nav ("How it works", "For firms", "What we file", "For platforms") is centered; "Log in" (quiet) and
  "Run a free rehearsal" (primary) sit right. Phones show the lockup, the CTA at `sm` and a menu sheet.
- **App sidebar:** 248 px, collapsing to a 64 px rail (`[`). The current item is tinted, with brand text. Count
  badges in Mono sit on "Ready to pay" and on "Filings" when something needs action. Account email,
  password and "Log out" sit at the foot. Phones get a bottom bar with Filings, New filing, Ready to pay and a More sheet.
- **Beta notice:** a 36 px sunken band above the header with an outlined "Beta" tag (Mono 12) and the
  existing sentence at 14/20. CoFile's pages use the wording with contact details; firm pages use the neutral
  wording that doesn't name CoFile. It can't be dismissed, folds to one line on phones and is left out of the embed.
- **Notices:** a 3 px tone bar, the glyph, default text and an optional trailing link ("Pay and file",
  "Subscribe", "Open the filing").
- **Rehearsal band** (client pages): a full-width hatch band carrying the existing rehearsal sentence,
  fixed under the firm header.
- **Empty states:** text, never illustration. The existing copy ("Your desk is clear. Start a filing (it
  can be a free rehearsal), or send a client a link with your logo on it.") sits in a dashed panel with
  its two buttons above a 30% skeleton of the table to come.
- **Toasts:** bottom-left (top on phones), 360 px, elevation 3, for confirmations only ("Saved to Google
  Docs."). They dismiss after 6 s, pause on hover and focus, and are announced in a polite live region.
  Errors and anything the user has to act on stay inline notices, never toasts.

### 9.6 The coverage table

Columns are Filing, Where and "Where it stands" with the ladder (4.6). Filter chips (New York, New Jersey,
Florida, IRS) and a sort by stage sit above. Rows group by stage with Live first, so the top of the table answers
"which are live today." Live comes from the per-type switch (`liveFilings`), rendered on the server so it
can't be stale. On phones each row is a two-line card. The note and the "Write to hello@cofile.app" link sit
directly beneath, not in a footnote.

### 9.7 Code block and copy button

Code blocks use `--cf-code-bg` with Mono 14/20, language tabs (curl, Node, Python) and a copy button at top right.
They scroll sideways inside the block only. The copy button is 28 px. On success its icon becomes a check for 1.2 s and
a polite live region announces it (`[copy needed]`).

### 9.8 Other primitives

| Component | Spec and states |
|---|---|
| **Checkbox, radio** | 20 px box (24 px on client pages and for every consent or authorization), 2 px `--cf-border-control`, radius 4 (radio full). Checked: brand solid fill with on-solid check, except consents and authorizations, which use Carbon fill so a firm color never decorates a legal statement. States: default, hover, focus, checked, indeterminate (checkbox), disabled, error. The whole label is the hit area |
| **Toggle chips** | Used for "States you file in" and filters. 36 px, radius 4, secondary at rest, brand tint with a brand border and a check glyph when on. `aria-pressed` |
| **Select, combobox** | 44 px like inputs, chevron right. More than 8 options becomes a searchable combobox (Radix), as with "All firms" on the dashboard and US states in addresses. Type-ahead always works |
| **Tabs** | 40 px, underline style: 2 px brand bar on the active tab, muted text on the rest. Arrow-key navigation. Used for docs language tabs, response codes, firm detail and the Branding preview |
| **Disclosure** | Chevron that rotates 90° in `motion-quick`, 44 px row. Used for "More options (optional)", "Not this filing? Choose another", "Your message", and run steps |
| **Modal** | 480 px (640 wide variant), radius 10, elevation 3, Carbon scrim at 40%. Focus is trapped and returns on close. Used only for the reveal-once API key and secrets, and for destructive confirms ("Revoke", "Remove", "Disconnect") that name the object being destroyed |
| **Drawer** | 480 px from the right, elevation 2, `motion-slow`. Dashboard row details, webhook payloads. `Esc` closes |
| **Bottom sheet** (phones) | 16 px top radius, grab handle, snaps to 50% and 90%. The live preview, the menu, More |
| **Tooltip** | 12/16 on Carbon (dark: `#E9ECEF` with Carbon text), radius 4, 400 ms delay, never the only place information lives |
| **Count badge** | 20 px, Mono 12, neutral bg; `act` tint when the count is things needing a person ("Ready to pay") |
| **Skeleton** | `--cf-bg-sunken` blocks with a 1.4 s shimmer (static under reduced motion), shaped like the content to come |
| **Pagination** | Cursor-based "Load more" at the foot of long tables, with the count shown in Mono; the dashboard filings table also supports `Shift J`/`Shift K` page jumps |
| **File upload** | Dashed drop zone, 120 px, with the existing help text ("A PNG, JPEG or WebP picture. A wide logo on a clear background looks best. Big pictures are shrunk for you."); after upload a preview on both light and dark plates |
| **Signature pad** | 3:1 canvas, 1 px baseline at 70% height, pointer and touch, a clear control, and the pad's existing `aria-label` ("Signature pad: … draws their signature here with a mouse, finger or stylus.") |
| **Security-code input** | The vault's hosted field, styled through its API to match a 48 px Mono input 4 characters wide; masked by default; the card label and last four beside it |
| **Avatar** | 24/32 px circle with initials on a neutral tint; used in Team and in "Connected … by {who}" |

## 10. Page by page

### 10.1 Home `/`

The section order is locked. My job is rhythm: the page alternates **claim** sections (big type, one
idea) with **evidence** sections (a real artifact such as the proof, the log or the table). Every
evidence artifact is a live component, not a screenshot, so it can never drift from the product.

```
┌ Beta  CoFile is in beta. Any filing can run as a free rehearsal on the state's real website… ┐
├──────────────────────────────────────────────────────────────────────────────────────────────┤
│ ▭ CoFile    How it works  For firms  What we file  For platforms     Log in  [Run a free rehearsal] │
├───────────────────────────────────────────────┬──────────────────────────────────────────────┤
│ For CPA, payroll, fractional CFO and title    │   ┌ Harbor & Pine CPA        example firm ┐ ░ │
│ firms                 (Mono kicker, 13/16)    │   │ Two Sisters Bakery LLC  [▨ Rehearsal] │ ░ │
│                                               │   │ New Jersey LLC formation. Please …    │ ░ │
│ Your client approves                          │ ① │ Business name  TWO SISTERS BAKERY LLC │ ░ │
│ the proof. Then                               │   │ Members        Ana Ortiz, Lucia Ortiz │ ░ │
│ CoFile files it.          (display-1)         │   │ Main business address  88 Grove St …  │ ░ │
│                                               │ ② │ Formation filing fee        $100.00   │ ░ │
│ CoFile fills in your clients' LLC and …       │   │ NJ portal fee, by card        $3.50   │ ░ │
│ (body-l, 40rem measure)                       │   │ Total to the state          $103.50   │ ░ │
│                                               │ ③ │ New Jersey's own review page, filled in│░ │
│ [Run a free rehearsal] [See what your client sees] │ Business Name  TWO SISTERS BAKERY │ ░ │
│                                               │   │ Designator     LLC                    │ ░ │
│ ▨ In beta. A rehearsal fills in every screen  │ ④ │ [Approve for filing] Nothing is …     │ ░ │
│ of the state's real website and stops …       │   └───────────────────────────────────────┘ ░ │
│                                               │   Sample proof · test details · not a real business │
└───────────────────────────────────────────────┴──────────────────────────────────────────────┘
                                         ░ = ghost state-page plate; slides into register on load
```

| # | Section | Layout (desktop → phone) | Notes |
|---|---|---|---|
| 1 | **Hero** | Copy in cols 1–6, sample proof in cols 7–12 → copy first, proof below at full width | H1 at `display-1`, broken after "proof." on desktop. Sub at `body-l`. CTAs: "Run a free rehearsal" primary `lg`, "See what your client sees" secondary `lg` (jumps to #proof). The beta note at `body-s` muted, led by the rehearsal glyph. The sample proof is the real proof component in `sample` mode: its "Approve for filing" is a non-interactive commit look-alike (`aria-hidden`), the `<mark>` values use `--cf-highlight`, and the figure keeps the existing `aria-label` and figcaption. Hero register motion (8) |
| 2 | **Process** | Three steps as a horizontal pipeline joined by register-gutter connectors → vertical list with a left rail | "Your client approves it." is raised (elevation 2, 2 px go border), because the lede says "your client is in charge of the middle one." Step names at `h3`, text at `body` |
| 3 | **The proof** | Text in cols 1–5, the six checks in cols 7–12 → stacked | The first four checks carry callout numbers 1–4 in the gutter and link to the hero callouts. The 8879 line sits apart, under a hairline, because it speaks to CPAs specifically |
| 4 | **Firms** | Text left; on the right a "two doors" diagram: the same intake form rendered in two different example firm themes, each with a small "with CoFile" → one theme on phones | The four list items sit under the diagram. This section sells the theming engine by showing it |
| 5 | **Requests** | Text left; on the right the text bubble ("Need an LLC for the bakery…", "Ana Ortiz · text message · example"), the existing arrow line in Mono, and a mini drafted-form card whose values (Members "Ana Ortiz, Lucia Ortiz (50/50)", the Jersey City address) carry `--cf-highlight`, with thin connectors back to the phrases they came from | The bubble is a generic phone message, not any messaging app's look. The connectors draw on scroll (`motion-slow`) |
| 6 | **Checks** | Headline and lede centered; five checks in two columns → one column | The first check gets the register treatment: "verified fee table" and "the state's payment screen" as two aligned columns with a check between them |
| 7 | **After** | Text left, a document still life right, then the three items with document, EIN and record icons | Fictional paper only, no agency marks |
| 8 | **Rehearsals** | Both ledes in cols 1–5, the log in cols 7–12 → stacked | The log is a terminal-flavored panel on `--cf-code-bg`, Mono 14/20. The header row "Rehearsal · New Jersey LLC formation" has "test details" right-aligned, followed by seven rows in two columns. The held row is in hold color with the dashed rule, and prints sit beside "matched the proof" and "matches the proof". Stage hatch on the left edge. Caption beneath ("13 screens of New Jersey's own LLC form…") |
| 9 | **Coverage** | Full width; the coverage table (9.6) | Headline, lede, filters, table, then the note and mailto link directly beneath |
| 10 | **The catch** | One column of five items with Mono numerals `01`–`05` at 32 px and hairlines between | Set like the terms sheet it is: no icons, no softening |
| 11 | **Security** | Five blocks in a 3 + 2 grid, each an `h3`, paragraph and line icon (lock, vault, link, signature, partition) → one column | A dark band in both color modes, to mark the change of reader: security reviewers often land here from a direct link (`#security`) |
| 12 | **Enterprise** | Text and list in cols 1–6, with the docs quick-start block (`curl https://api.cofile.app/v1/filings -H "x-api-key: $COFILE_API_KEY"`) under the list; the inquiry form on a surface card in cols 7–12 → stacked | `InquiryForm` keeps its pairs (Name / Company, Work email / Phone (optional), States you file in / Filings per month), then "What you'd like to do (optional)" and "Send". The `"dryRun": true` item is inline Mono with a copy button. "Read the API docs" is a quiet link |
| 13 | **Close** | Centered: "Run one rehearsal. Then decide." at `display-2`, the lede, the CTA beside "Questions first? hello@cofile.app", then the tagline with the Pair | The Pair plays the register slide once when the section scrolls into view |

**Footer:** two rows on `--cf-bg-sunken`. Row one has "CoFile · the filing desk behind your firm" on the left and
"New York · New Jersey · Florida · IRS" on the right. Row two has the not-a-law-firm line on the left and "Terms ·
Privacy · Security · hello@cofile.app" on the right. On phones everything stacks and links become 44 px rows.

**Mobile reading order** of the hero: kicker, H1, sub, CTAs (stacked, full width), beta note, sample proof.
The register motion still plays, with the plate offset reduced to 8 px.

### 10.2 Sign-up, login and account pages

All of these share one **auth frame**: a Bond page, the lockup top-left, one surface card centered (480 px,
or 640 px for sign-up), the beta notice above and the footer below. On phones the card runs edge to edge with
16 px padding and no border.

| Route | Layout and locked copy |
|---|---|
| `/signup` | Kicker "For firms", heading "Set up your firm's filing desk", the lede, then `PartnerSignupForm` in its pairs (Firm name / Kind of firm; Your name / Work email; Password / Password again; Phone (optional) / Website (optional)). "States you file in" becomes three large toggle chips (New York, New Jersey, Florida) instead of small checkboxes. The terms checkbox is 24 px. "Create account" is primary `lg`, full width on phones. From `lg` up, a right-hand column previews the filing desk header with the firm name as it's typed, in a neutral theme, so the promise of the firm's name on the door is visible before the form is finished. "Building a filing product? See CoFile for platforms." at the foot |
| `/signup/sent` | Kicker "Your filing desk", "Check your email", the lede for open or reviewed accounts, and the spam line with "send the link again". An envelope icon, nothing else |
| `/login` | Kicker "Log in", "Welcome back", "Firms go to their filing desk, platforms to their dashboard." First "Continue with Google" (secondary, full width, with Google's own G per their guidelines), then a divider, Email, Password, "Forgot your password?" and "Log in" (primary). Google errors appear above as notices (`stop` for failures, `act` for "Your account is waiting for approval…"). Session notices ("Your session ended. Log in again to carry on.", "Your password is changed. Log in with the new one.") are neutral. The links line closes the card |
| `/forgot-password` | "Reset your password", its lede, Email and "Email me a reset link". Success replaces the form with a `go` message |
| `/reset-password` | "Choose a new password", two fields, the help text "At least 12 characters. A few unrelated words work well.", and a neutral length bar (no strength judgments), then "Set new password". On an expired link, "Ask for a new link" |
| `/verify-email` | "Confirm your email". With a token: "One click and your email is confirmed." and "Confirm my email". Without one: the resend lede and "Send a new link" |
| `/invite-expired` | "This link has expired or isn't valid" and its sentence, in the auth frame with no form |
| `/join/<token>`, `/session-ended` | Route handlers that redirect, with no UI of their own |
| `/terms`, `/privacy` | Legal reading layout: a 720 px column at 17/28, a sticky table of contents from `lg` up built from the headings, the last-updated date in Mono, and anchor links with copy on every heading |
| 404 | "Page not found", "The link may be old or mistyped.", "Go to the home page". The only illustration is the Pair drawn deliberately out of register, its top sheet 4 px to the right |
| Error | "Something went wrong", its sentence, then "Try again" (primary) and "Log in again" (secondary). The digest reference is in Mono with copy, so a support conversation starts from an exact string |

### 10.3 Partner filing desk `/p/<slug>`

The desk is the firm's room. The firm's logo and name lead the sidebar, with "with CoFile" beneath them. Brand
color appears on the selected sidebar item, primary buttons, links and the 4 px top rule; status and commit
never take it. Partner firms today see CoFile in the top bar with their logo off to the right. I flip that,
because the brief calls this the firm's branded area.

```
┌──────────────┬───────────────────────────────────────────────────────────────┐
│ [logo]       │ Filings                                          [New filing] │
│ Harbor & Pine│ ┃ 2 approved filings are ready to pay and need your card's     │
│ ▭ with CoFile│ ┃ security code. Pay and file                                  │
│──────────────│ ┃ 1 filing needs someone to act.                               │
│ ▸ Filings  1 │ [All] [Waiting for approval] [Needs information] [Filing now] │
│   New filing │ ┌──────────────────────────┬──────────────┬─────────────┬──────┐│
│   Ready to   │ │ Filing                   │ Type         │ Status      │Started││
│   pay      2 │ │┃Two Sisters Bakery LLC ▨ │ NJ LLC form. │ ◎ Waiting…  │11/24 ││
│   Client     │ │ …                        │ …            │ ● Approved  │ …    ││
│   links      │ └──────────────────────────┴──────────────┴─────────────┴──────┘│
│   Signatures │                                                               │
│   Setup      │                                                               │
│   Billing    │                                                               │
│──────────────│                                                               │
│ ana@harbor…  │                                                               │
│ Log out      │                                                               │
└──────────────┴───────────────────────────────────────────────────────────────┘
```

| Page | Design |
|---|---|
| **Filings (home)** | A title row with "New filing" (primary). Notices are stacked by urgency: pay (`act`, with "Pay and file"), someone needs to act (`act`), subscription ("Real filings need an active subscription; rehearsals are free." with "Subscribe"). Status filter chips use the status labels themselves. Table columns: Filing (name, plus the rehearsal tag where it applies; the current "Test" badge becomes the rehearsal tag, see Appendix B), Type, Status chip, Started. Rows needing action sort first and carry a 3 px `act` bar. Empty state per 9.5 |
| **Setup** | A checklist page. "Set up your account" (or "You're set up") and its lede, then the three steps ("Your firm", "Branding", "Payment") as rows with a progress ring, their text and their buttons ("Set up your firm", "Set up branding", "Set up payment", "Change"); the next step's button is primary. "Registered agents (optional)" is a fourth card with "Add agents" / "Change agents". When finished, "Start a filing" |
| **Setup › Branding** | A split view. On the left (5 cols): `LogoField` (upload, "Use a link instead", "Remove logo"), `ColorField` (picker, hex field, the nine ready swatches) and the font select with its presets ("Standard (the device's own)", "Inter", "IBM Plex Sans", "Roboto", "Open Sans", "Lato", "Montserrat", "Source Serif (serif)", "Merriweather (serif)", "Lora (serif)") or an upload. On the right (7 cols): a live preview with tabs for the intake form, the proof and an email, plus a light/dark toggle. The theming engine's contrast fixes show as annotations on the preview (`[copy needed]`), so the firm sees what the system changed and why |
| **Setup › Your firm** | "Name, kind of firm and who to contact." as a short paired form (firm name / kind of firm, contact name / email / phone), with the support email that will appear on every client page called out by a small preview of the proof footer beside it |
| **Setup › Agents** | One card per state (NY, NJ, FL), with "Same as" between states and the option to use CoFile's agent through Registered Agents, Inc. where the firm offers it |
| **Setup › Payments** | Saved cards (vault), then routing as a table of filing types × card with a backup column |
| **New filing › state** | "New filing", "Which state is the business in?", and the rehearsal sentence linking to "What we file". Three large cards (New York, New Jersey, Florida), 160 px tall, each with its count line ("{n} filing types, plus the federal EIN"). The "Or send us the details and we fill in the form for you to check:" options (email address, text and WhatsApp numbers, Slack `/file`) sit in a sunken side panel, with copy buttons on the address and numbers |
| **New filing › type** | "{State}: what are you filing?" and its lede. Cards in a 3-column grid, each with title, Live chip or rehearsal tag, summary, and fee note in Mono. Below, the "Your pages for clients" card lists each service's permanent URL and its widget snippet in a code block with copy |
| **New filing › form** | Two panes from `lg` up. Left (7 cols): the form, with sections as fieldsets under `h4` legends, paired fields, "Same as", folded options, the "Authorizations" fieldset with its explanation, then "Send the proof to my client" as a commit `lg`. Right (5 cols, sticky): a **live proof preview**, the proof card in `draft` state, updating as fields change, with the fee table filled from the fee note. Staff see exactly what the client will see before they send it. On phones the preview is a bottom sheet with a handle label (`[copy needed]`) |
| **Filing detail** | Header: the title, status chip, rehearsal tag and meta line ("{type} · started {date} by {person} (client link)"). Below it, the next-step notice. From `lg` up, two columns. Left (8 cols) is the **timeline** (9.4): Received, Getting the state's review page, Waiting for approval, Approved (with the print), Filing now (run checks as sub-steps, each with "matched the proof" and the print where it applies), Submitted to the state, Accepted by the state, EIN issued, Completed. Right (4 cols) has cards: "Link to the proof" (link in Mono, copy, and the who-was-emailed sentence), "Documents" (each with its kind and a download), the EIN in Mono with copy, and "Save to Google Docs" with its note. "Progress on the state site" moves into the timeline's sub-steps instead of a separate list. When the status is "Needs information", the missing-information form appears inline at the top |
| **Client links** | "Send a client a link" and its lede, `ClientLinkForm` on a card, then a "Links you sent" table: For, Filing, Made, Status ("Waiting for the client" `act`; "Used: open the filing" `go`; "Turned off", "Expired" `neutral`), and a danger "Turn off" |
| **From email** | "Request by {email / text message / WhatsApp / Slack}" and the from line. Two panes. Left: the original message in a sunken panel, with the phrases that were read highlighted. Right: "This looks like a request for: {type}.", the filled-count sentence ("We filled in {n} answers from your message. Check every answer and add what's missing before you send it.") and "Open the filled-in form" (primary). Hovering a highlighted phrase outlines the field it filled, and the reverse. "Not this filing? Choose another" is a disclosure. Once the message has been purged, the 30-day deletion notice replaces the left pane |
| **Signatures** | "Saved signatures" and its lede. A table of Signer (name, email), Saved, Last used, and "Remove" (danger). "Add a signature" shows the pad on a 3:1 canvas with a baseline rule, a clear control, and the consent text beside a 24 px checkbox |
| **Ready to pay** | "Ready to pay" and its lede. One card per saved card: the card label and last four in Mono, the waiting filings (title, total in Mono, link to each), then the security-code input (the vault's iframe, styled to match: 48 px, Mono, 4 characters wide) and the commit submit. The "We keep the code for an hour at most, then delete it." sentence repeats beside the input, because that's where the worry happens |
| **Billing** | `BillingPanel` and `PlanPicker` on cards. Plan names and prices appear only here, behind login, never on public pages. "Your plan is changing…" shows as `go` and "Billing couldn't be loaded. Try again shortly." as `stop` |
| **Password** | `ChangePasswordForm` on a 460 px card, with its help text "Changing it signs you out on every other device." |
| **Signed out** | "You're not signed in to this filing desk" and its two sentences, in the auth frame but in the firm's theme |

### 10.4 Permanent service pages `/<firm>/<service>`

A firm's public storefront for one filing, for example `cofile.app/bestaccounting/llc-filing-new-york`.
The page has the firm header with "with CoFile". When the type isn't live, the rehearsal band shows "This page is in
rehearsal for now. You can fill it in and see your proof, but nothing will be filed with the state and
nothing will be charged, now or later, even after you approve it. To file for real, contact {firm}." The H1 is
the filing type, followed by the summary and the "After you send this…" sentence, the fee note in Mono, the
intake form (10.5) with "Send to {firm}" as its commit button, the terms footnote, and the firm's support line.
These pages are indexable. Each firm and service gets a generated Open Graph image (firm logo, filing title,
neutral plate, no CoFile mark), and the `<title>` keeps the existing "{type} · {firm}" pattern.

### 10.5 Client-facing pages

These are the pages a first-time founder sees, usually on a phone. Text is 17–18 px, there's one column,
inputs are 48 px and buttons 56 px, and nothing on the page belongs to CoFile except the small co-brand mark.

**Intake `/i/<token>`.** The firm header comes first, then the rehearsal band if the type isn't live, then the H1
(the filing title, with the link label in muted text, "· {label}"), then the summary sentence ending "After you
send this, you'll get a link to check exactly what will be filed, and nothing is filed until it's approved."

- On phones, the form is chunked one fieldset per screen, with a stepper ("1 of 4" style, `[copy needed]`)
  and Back/Next controls (`[copy needed]`). On desktop it's one long page with a sticky section index.
- The authorizations fieldset ("Authorizations") shows each statement with its own 24 px checkbox, and the
  explanation sits above it, not in a tooltip.
- A signature field (NY forms) opens the pad full-screen on phones, in landscape where possible.
- The footnote ("Next, you'll get a proof to check. Nothing is filed until it's approved." and the
  terms line) sits directly above the commit button "Send to {firm}".
- Success replaces the form with the `go` notice ("Thank you." plus the message).
- Link errors are "This link has expired or isn't valid" / "Ask whoever sent it for a new one.", "This link
  can't be used", and "This filing is no longer offered" / "Contact {firm} at {email}.", each in the firm frame.

**The proof (api.cofile.app).** The most important page on the site. It's designed phone first, at 360 px:

```
┌────────────────────────────────┐
│ [logo] Harbor & Pine CPA        │ 56 px, 4 px brand rule
│ ▭ with CoFile                   │
├────────────────────────────────┤
│▨ Rehearsal: nothing will be    │ hatch band (rehearsals only)
│▨ filed or paid, even if you    │
│▨ approve.                      │
├────────────────────────────────┤
│ {filing title}                  │ h1 28/36
│ Filing reference f_8K2…  [copy] │ Mono
│ ◎ 4F2A·91C0                     │ the proof print, 40 px
│ Please decide by December 3,    │
│ 2026, 5:00 PM Eastern. After    │
│ that, this link stops working   │
│ and you'll need a new one.      │
│ ┃ By approving, you confirm     │ act notice: today's consent
│ ┃ every detail below is correct │ note, words untouched
│ ┃ and authorize its submission  │ (phase 1 placement)
│ ┃ exactly as shown, and payment │
│ ┃ of the fees shown, up to …    │ no-refund sentence in 600
│ ┃ Government sites don't save   │
│ ┃ drafts, so once you approve,  │
│ ┃ the whole filing is sent in   │
│ ┃ one go. Please check          │
│ ┃ everything now.               │
│ [The state's review page] [Filing details] [State fees]  │ anchor chips
├─ ③ The state's review page ────┤
│ This is a picture of the        │
│ state's own review page, …      │
│ ┌────────────────────────────┐ │ screenshot on a white plate;
│ │ (state page image)         │ │ tap = full-screen zoom
│ └────────────────────────────┘ │
├─ ① Filing details ─────────────┤
│ Business name                   │ label: sans 16, muted
│ TWO SISTERS BAKERY LLC          │ value: Mono 18
│ Members                         │
│ Ana Ortiz, Lucia Ortiz (50/50)  │
│ …                               │
├─ ② State fees ─────────────────┤
│ Nothing is charged on this page.│
│ These fees are paid to the …    │
│ Formation filing fee   $100.00  │
│ NJ portal fee, by card   $3.50  │
│ ══════════════════════════════  │
│ Total                  $103.50  │ Mono 22, 600
├─ ④ ────────────────────────────┤
│ One-time code sent to you       │
│ [______]                        │ 48 px, numeric keypad
│ ┌────────────────────────────┐ │
│ │ Approve, and authorize     │ │ commit xl, 56 px min,
│ │ submission and payment     │ │ two lines allowed
│ └────────────────────────────┘ │
│          24 px gap              │
│ [ Request changes ]             │ secondary; opens the textarea
│ Questions: {firm support email} │
│ ▭ with CoFile                   │
└────────────────────────────────┘
```

Decisions, and why:

- **Order.** The state's review page comes first where there is one, then details, then fees, then the
  commit block. A picture of the state's own page is the most convincing thing here, the details back it up,
  and the fees are the last thing read before the decision. Where a filing type has no review page, details
  come first. Callout numbers keep their meaning (1 details, 2 fees, 3 state page, 4 approve) even when the
  order changes, so the home page's sample still teaches this page.
- **Consent placement.** Phase 1 keeps the consent note at the top, as today, with its words untouched:
  it says "every detail below", which is only true there. I recommend moving the consent and the EIN
  sentences into the commit block, directly above the button, so the consent sits at the point of action,
  with "Government sites don't save drafts…" staying at the top as the instruction to check. That move waits
  on counsel and the one-word change in Appendix B.
- **The button belongs to the system, not the brand.** It's always commit green, 56 px, full width, two lines
  allowed. It's never sticky, never hidden behind a scroll gate, and never disabled without a reason. It has
  24 px of clear space above it and 24 px before "Request changes", a secondary button that expands the "What should
  change? (Needed only if you ask for changes)" textarea in place. The two decisions can't be mistaken for
  each other, by color, by shape or by position.
- **One-time code:** a single real input with `inputmode="numeric"` and `autocomplete="one-time-code"`,
  drawn as six boxes.
- **Masked SSNs:** the existing sentence ("Social Security numbers are masked on this page. We store them
  encrypted and delete them after 30 days.") appears once, at the top of Filing details.
- **Fee cap:** "Maximum you authorize" is its own row under Total, with its parenthetical in `body-s`.
- **The rehearsal band** is fixed under the header for the whole scroll, so no screenshot of the page can be
  taken without it.
- **Desktop:** a 720 px sheet on Bond at elevation 2, in the same order. Details are two columns, and the register
  gutter beside details shows a check per row that the preview run matched on the state's page.
- **Performance:** static HTML with inline CSS, under 60 KB before the screenshot, and readable and approvable
  with JavaScript off. The proof has to work on a five-year-old phone on a weak signal.

**After the decision.** "Approval recorded" draws the print, then shows the rehearsal paragraph ("Thank you. Your approval
is recorded. This is a rehearsal, so nothing will be filed or paid.") or the live one. Link problems use
the same frame with a neutral or stop glyph and the firm's support line: "A decision was already recorded
with this link, so there's nothing more to do here.", "This link to the proof has expired. Ask whoever
sent it for a new one.", "This link to the proof isn't valid. Ask whoever sent it for a new one."

### 10.6 Enterprise dashboard `/dashboard`

Compact density by default. The sidebar replaces today's eleven top-bar links with groups: **Work**
(Overview, Filings, Ready to pay, Firms), **Developers** (API keys, Webhooks, Docs), **Account** (Setup,
Team, Billing) and, for the platform tenant only, **Platform** (Sign-ups). The console uses CoFile's own
theme. Enterprise white-label settings apply to what their customers see, not to this console.

```
┌──────────────┬───────────────────────────────────────────────────────────────────────┐
│ ▭ CoFile     │ {Account name}                                                     ⌘K │
│ WORK         │ ┌───────────────┐ ┌──────────────────┐ ┌───────────────┐             │
│ ▸ Overview   │ │ Filings       │ │ Webhook deliveries│ │ API keys      │             │
│   Filings    │ │ {n}           │ │ {n}               │ │ {n}           │             │
│   Ready to pay│ │ {n} live, {n} │ │ {n} pending, {n} failed│ Manage keys   │             │
│   Firms      │ │ rehearsals    │ └──────────────────┘ └───────────────┘             │
│ DEVELOPERS   │ └───────────────┘                                                     │
│   API keys   │ By status            By state             By month                    │
│   Webhooks   │ ● Completed ████     NJ ███████           ▁▂▃▅▇                       │
│   Docs       │ ◎ Waiting   ██       FL ████                                          │
│ ACCOUNT      │ ⏸ Paused    █        NY ██                                            │
│   Setup      │                                                                       │
│   Team       │ As of Nov 26, 4:12 PM  ⟳                                              │
│   Billing    │                                                                       │
└──────────────┴───────────────────────────────────────────────────────────────────────┘
```

| Page | Design |
|---|---|
| **Overview** | The account name as H1, then the notices (pay, subscription, "Your account settings haven't been set up by the platform yet…" with the tenant ID in Mono). Three stat tiles: Filings ("{n} live, {n} rehearsals"), Webhook deliveries ("{n} pending, {n} failed"), API keys ("Manage keys"), with numbers in Mono 32. Three charts: By status as horizontal bars colored by tone and labeled with chips; By state and By month as neutral bars with values at the bar ends; "None yet." when empty. "As of {time}" in Mono, with a refresh button |
| **Filings** | A full-width dense table: Filing (title, rehearsal tag, ID in Mono with copy), Firm, Type, Status (chip, plus the "Ready to pay: needs the card's code" link), print, Created. Filters: firm (the "All firms" select becomes a searchable combobox), status, state, rehearsal or live; filters write to the URL so views can be shared. Clicking a row opens a 480 px right drawer with the filing's timeline and a "JSON" tab showing the `GET /v1/filings/{id}` response, highlighted and copyable. `J`/`K` move between rows with the drawer open |
| **Ready to pay** | The same component as on the desk |
| **Firms** | A table of client companies: name, slug, filings, last filing, theme swatch. Search and sort |
| **Firm detail** | A header with the firm's logo rendered through its theme. Tabs: settings (approvers, defaults, offered filing types), branding (the theming engine's output for that firm in light and dark, with its contrast report: each pair, ratio, pass/fail, and any adjustment made), links (service pages and widget snippet), filings (filtered table) |
| **API keys** | The intro sentence with its links, `NewKeyForm` inline. On create, a modal shows the full key once in Mono with copy and a required acknowledgment (`[copy needed]`); the guide already says a new key "is shown once". Table: Name (with created date), Key (prefix in Mono, `cofile_AbCdEfGh…`), Last used, "Revoke" (danger, with a confirm that names the key and repeats that revoking "takes effect at once and can't be undone") |
| **Webhooks** | The intro sentence. Endpoints as cards: URL in Mono, event subscriptions as removable tags from the event list (`filing.awaiting_approval`, `filing.approved`, `filing.completed`, `filing.drift_halted`, …), the signing secret shown once with copy, and "Send test" (`POST /v1/webhooks/test`). Below, a deliveries log: time, event, HTTP status (2xx go, 4xx and 5xx stop, pending progress), attempts, and a drawer with the signed headers (`x-cofile-event`, `x-cofile-delivery`, `x-cofile-signature`) and body |
| **Setup** | Sections as anchored cards with a sticky in-page nav: "Payment methods" (the vault sentence, saved cards, add card, routing), "State portal logins" (table: Portal, Pays by, Login, with "Connected {date} by {who}" as a go chip plus "Disconnect", "Not needed", or the login form; the login field is a password field that's never shown again), "Who's named on your filings", "Your registered agent in each state", "Defaults per portal" (one form per portal: NY DOS, NYS-100, NJ, IRS, FL) |
| **Team** | Members table (name, email, role, last active) and the invite form; invitations show as `act` rows until accepted |
| **Billing** | The same panels as the desk, for enterprise plans. Not shown to the platform tenant |
| **Password** | The same card as the desk |
| **Sign-ups** (platform tenant) | Two tabs, "Sign-ups" and "Enterprise requests". Each has its explanatory sentence as a notice and a table (firm or company, contact, "States, volume", "Signed up"), with approve (primary) and "Turn down" (danger) per row, and "Declined" rows folded at the bottom |

### 10.7 White-label surfaces

- **`/e/<tenant>/<firm>/<service>`** is identical to 10.4 but themed by the enterprise's settings for that
  firm. The co-brand slot follows the enterprise's white-label setting (Appendix A, item 5); today the page
  renders "with CoFile".
- **`/embed/...` with `embed.js`** shows only the form: no header, no beta banner, and a transparent page so it sits on
  the host site's background, with 16 px of internal padding. The iframe resizes to its content (`EmbedResizer`).
  The script tag takes `data-theme="auto|light|dark"` and `data-density="comfortable|compact"`. The co-brand
  line sits under the form at `caption` size. After submitting, the proof always opens in a new top-level
  tab, never inside the iframe, so the client approves on a page whose address they can see.

```html
<script src="https://cofile.app/embed.js" data-account="{account}" data-firm="bestaccounting"
        data-service="llc-filing-new-york" data-theme="auto" async></script>
```

`data-account`, `data-firm` and `data-service` are what `widgetSnippet` emits today; `data-theme` and
`data-density` are my additions.

### 10.8 Developer docs `/docs`

This is my home turf. The docs are a product: same tokens, a denser rhythm, three panes.

```
┌──────────────┬───────────────────────────────────────┬──────────────────────────────┐
│ ⌘K Search    │ Filings and the lifecycle             │ [curl] [Node] [Python]   ⧉ │
│ Overview     │ A filing is one thing to file with    │ curl https://api.cofile.app │
│ GUIDES       │ one state site: …                     │   /v1/filings \             │
│ Authentication│ What happens next                    │   -H "x-api-key: $COFILE_…" │
│ ▸ Filings and│ 1 Validation. … 422 with an `issues`  │   -H "content-type: …" \    │
│   the lifecycle│   list …                            │   -d '{ "dryRun": true, …'  │
│ Filing types,│ 2 Firm defaults. …                    │ ─ Response ──────────────── │
│   fields and │ 3 Completeness. …                     │ { "filing": { "id": "f_…",  │
│   state fees │ 4 Approval. …                         │   "status": "…" } }         │
│ Approvals    │ 5 Run. …                              │                             │
│ Webhooks     │ Idempotency  ·  Dry runs  ·  Statuses │                             │
│ Errors       │ [statuses table with real chips]      │                             │
│ Saved signatures and PDF uploads                     │                             │
│ White-label firm portal                              │                             │
│ REFERENCE    │                                       │                             │
│ Endpoints    │                                       │                             │
│ OpenAPI (JSON)│                                      │                             │
└──────────────┴───────────────────────────────────────┴──────────────────────────────┘
```

**Frame.** The left nav is 240 px and keeps today's structure (Overview; Guides: Authentication, Filings and the
lifecycle, Filing types, fields and state fees, Approvals, Webhooks, Errors, Saved signatures and PDF
uploads, White-label firm portal; Reference: Endpoints, "OpenAPI (JSON)"). Prose runs 720 px max. The code
rail is 400–480 px, sticky, and follows the section in view, swapping its sample as you scroll. Below `lg` the
rail folds inline under each section. The top bar carries "API docs" and "Dashboard", `⌘K`, and a theme toggle.

**Docs home.** The H1 "CoFile API" and the intro paragraph come first; its "Not every filing type is live yet" sentence
carries the rehearsal tag and links to Coverage. "Quick start" is four numbered steps, each pinning its code to
the rail. The guides grid shows the guides as cards (title, summary). A machine-readable strip follows: "all docs in one
Markdown file" (`/docs.md`), "OpenAPI 3.1" (`/openapi.json`) and `llms.txt`, each a card with the URL in
Mono, copy and download buttons, and the existing sentence "For your tools and AI agents:". Then the "Base URL:
https://api.cofile.app" line, with copy.

**Reference.** The endpoints are grouped as in `api-catalog` (Filings, Approvals, Client companies, Signatures,
Webhooks, Account, API keys, Usage). Each endpoint is its own section with an anchor (`#create-filing`):

```
┌─────────────────────────────────────────────┬──────────────────────────────┐
│ POST  /v1/filings                        ⧉ │ [curl] [Node] [Python]     ⧉ │
│ Create a filing. {description}              │ request sample               │
│ ─ Body: FilingRequest ───────────────────── │                              │
│ name              type     required  desc   │ ─ 201 ─ 200 ─ 422 ─         │
│ dryRun            boolean  —         …      │ response sample for the      │
│ idempotencyKey    string   —         …      │ selected status tab          │
│ ─ Responses ─────────────────────────────── │                              │
│ [201] [200] [422]                           │ [Open in request builder]    │
└─────────────────────────────────────────────┴──────────────────────────────┘
```

- **Method pills** are 24 px, Mono 12, 600: `GET` neutral outline, `POST` Proof Blue solid, `PUT` slate
  teal `#2F6F7E` solid, `DELETE` stop outline. Method pills aren't status chips and never use go, hold or act.
- **Paths** are in Mono with path parameters (`{id}`) highlighted. Copy on hover copies the full URL.
- **Parameter tables:** name in Mono, type, required (a dot, not a word, with an `aria-label`), description.
- **Response tabs** by status code; 2xx codes in go fg, 4xx in stop fg, as text color only.
- The `422` example shows the `issues` list with `path` values such as `formation.county`, and each `path`
  links to that field in the FilingRequest schema viewer.

**Request builder.** An optional panel per endpoint, opened from "Open in request builder" (`[copy
needed]`). It fills path parameters and body fields from the schema, updates the curl live as you type, and
copies. Sending from the browser requires pasting a key into a session-only field that is never stored, and on create-filing
it defaults to `"dryRun": true`. Even then nothing reaches a state without an approved proof, and the builder
says nothing beyond what the guides already say about that.

**Statuses, events, errors.** The statuses table renders each status with its real chip and tone, so a developer
sees what their users will see. The event list is searchable, and each event has its payload example and the
statuses that emit it. The webhook guide's verification code (`verify(secret, header, rawBody, toleranceSec = 300)`)
gets language tabs, with the signature header broken down part by part (`t=`, `v1=`) in a small annotated diagram.

**Search (`⌘K`)** covers guides, endpoints, fields (`formation.county`, `ein.responsibleParty.ssn`),
statuses and event names, with `--cf-highlight` hits. **Every page** has anchor links with copy, "Copy as Markdown"
(that page's slice of `/docs.md`, `[copy needed]` for the label), and `<link rel="alternate"
type="text/markdown">` so agents find the Markdown version.

**`/openapi.json`, `/llms.txt`, `/docs.md`** are served raw with correct content types, CORS open for
GET, and `Content-Disposition: inline`. Download buttons add `attachment`. These aren't styled pages; they're
the product too, so I test them: a CI job validates the OpenAPI document, and an agent-eval job asks a model
to create a dry-run filing from `/docs.md` alone.

### 10.9 Emails (React Email, sent through Resend)

One template system: a single 600 px column, the system font stack (custom fonts are unreliable in mail),
explicit light and dark styles, and generated plain-text versions.

```
┌──────────────────────────────────────┐
│ ▔▔▔▔ 4 px firm brand rule ▔▔▔▔▔▔▔▔▔▔ │
│ [firm logo, max 40 px high]          │
│                                      │
│ Your proof is ready to approve:      │  subject repeated as h1, 24/32
│ {filing title}                       │
│                                      │
│ ▨ Rehearsal: nothing will be filed   │  rehearsals only; hatch as a
│ or paid, even if you approve.        │  bordered table cell
│                                      │
│ Your proof is ready. Open the link … │  body 16/26
│                                      │
│ ┌──────────────────┐                 │  bulletproof button, 48 px,
│ │  Open your proof │                 │  auto-contrast brand color
│ └──────────────────┘                 │
│ https://api.cofile.app/…             │  full link, Mono 13, visible
│ ◎ 4F2A·91C0                          │  proof print PNG, 64 px
│ ──────────────────────────────────── │
│ Questions: {firm support email}      │
│ with CoFile                          │  caption, client emails only
└──────────────────────────────────────┘
```

| Email | Subject (locked, `src/comms/render.ts`) | Audience | Button and notes |
|---|---|---|---|
| Approval request | "Your proof is ready to approve: {title}" | Client | "Open your proof" (brand). "Don't forward this email: anyone with the link can open your proof." in 600 in its own paragraph |
| Security code needed | "Card security code needed: {title}" | Card owner | "Enter security code" (brand). "Never reply to this email with the code." in 600 |
| Missing information | "More information needed: {title}" | Client | No button; the missing items as a list |
| Changes requested | "Changes requested: {title}" | Client | No button; the client's comment quoted in a sunken block |
| Completed | "Completed: {title}" | Client | Documents attached or linked; the print; the state reference in Mono |
| Rejected by the state | "Rejected by the state: {title}" | Client | No button |
| Choose a name, Review before submit | "Choose a name: {title}", "Review before submit: {title}" | Firm staff | "Choose a name", "Review the filing"; the review screenshot inline |
| Site changed, bot check, failed, blocked, checking | Their existing subjects | Firm staff | "Open" to the filing; the hold or stop glyph as a PNG beside the title |
| Sign-up, verification, password reset, invitations | Existing auth copy | Firm staff | "Confirm my email", "Set new password"; invitations state the 7-day life |
| Filing submitted, documents back, EIN issued | `[copy needed]` | Client | Bodies need confirming against `filing.submitted` and `filing.ein_filed`; today only Completed and Rejected exist as client status emails |

Rules: client emails carry only the firm's brand and "with CoFile". Staff emails carry the firm brand with the
CoFile mark in the footer. Button colors go through the same contrast engine as the pages. Every link appears in
full under its button so the reader can see where it goes. The sender name is the firm's name, and the reply-to is
the firm's support email.

### 10.10 Proposed new surfaces

1. **Coverage page `/coverage`**: the coverage table on its own URL, with linkable state filters
   (`/coverage?where=nj`), so a firm can be sent a link that answers "is mine live?". The component and copy are
   the same as the home section.
2. **Status page `status.cofile.app`**: per-portal health (New York, New Jersey, Florida, IRS) and current
   "state site changed" holds, for enterprise developers and security reviewers. Every label needs copy.
3. **Shared filing timeline**: a signed, read-only link to a filing's timeline that a firm can send its client
   after approval, in the firm's theme. This needs a product decision and copy.

## 11. The white-label theming system

### 11.1 What a firm controls

| Input | Where it goes | Never goes |
|---|---|---|
| Firm name | Header, page titles, "Send to {firm}", the email sender name, OG images | Inside values or fees |
| Logo (light; optional dark) | Header (32 px desk, 40 px proof, 28 px phones), emails, OG images | CoFile's favicons |
| Main color (`color`) | `--cf-brand-*`: primary buttons, links, selected nav, the 4 px header rule, and the focus ring if it passes 3:1 | Status chips, the commit button, the rehearsal tag, the print, the coverage ladder |
| Second color (`color2`) | The header rule's gradient end and accents in the Branding preview | Text, buttons |
| Font (preset or upload) | Firm name and headings; body only if it passes 11.4 | Values, fees, codes, consents, buttons |
| Support email | Page footers, the proof, emails, error pages | |

Everything else (spacing, radii, type scale, layout, status, motion, iconography) is locked. Limiting what a
firm can change is the reason thousands of desks will all look professional, and the reason a status chip means the
same thing on every one of them.

### 11.2 The color pipeline

It runs on the server at save time, and live in the browser for the Branding preview, in OKLCH:

1. **Parse** the hex, convert it to OKLCH and gamut-map it to sRGB.
2. **Ramp:** generate 11 steps at fixed lightness (L 0.97, 0.93, 0.87, 0.78, 0.68, 0.58, 0.50, 0.43, 0.36,
   0.29, 0.22). Hue stays fixed, and chroma is scaled down at both ends so tints don't go neon and shades don't go muddy.
3. **Solid:** `--cf-brand-solid` is the firm's exact color if white or Carbon text on it reaches 4.5:1
   and APCA Lc 60. The text color is whichever gives more contrast. If neither passes (a mid grey, a dusty
   orange), L steps down by 0.02 until white passes, and the adjustment is recorded. Examples: light yellow `#F5E663` gets Carbon text
   (14.44:1) instead of white (1.28:1); pale pink `#FFB3C7` gets Carbon (11.04:1); `#1F4FD1` keeps white
   (6.78:1); teal `#0F766E` keeps white (5.47:1).
4. **Text:** `--cf-brand-text` is the ramp step nearest the firm's color that reaches 4.5:1 on the surface, on the
   light surface in light mode and the dark surface in dark mode. Links never use a failing color.
5. **Tint:** step 1 (light) or step 10 (dark), for selected nav and rows.
6. **Focus:** the brand solid if it reaches 3:1 against both page and surface; otherwise `--cf-focus`.
7. **Collision guard:** measure the hue distance to the status hues (go ≈ 155°, hold ≈ 70°, stop ≈ 27°,
   act ≈ 290° in OKLCH). If the firm's hue is within 20° of stop or hold and its chroma is above 0.08, primary
   buttons become Carbon solid with a 3 px underline in the brand color, and the brand color stays on the header rule, logo
   and selected nav. A red firm never gets red buttons beside red "Failed" chips. A violet firm near `act`
   keeps its buttons, because act always comes with its glyph and is never a button.
8. **Dark mode** comes from the same ramp, not from inverting it: the solid moves to the lightest step that keeps
   Carbon text at 7:1.

The firm sees every adjustment as a note in the Branding preview, side by side with what they picked, so
nothing changes behind their back. Every adjustment is stored with the theme (`theme.adjustments[]`) and
shown on the dashboard's firm detail page.

### 11.3 Logos

On upload: transparent padding is trimmed, and the artwork is classified as dark or light from the mean
luminance of its opaque pixels. If it would sit below 3:1 on the current surface, it goes on a plate (white
with a 1 px border in dark mode, Carbon for white logos in light mode), with radius 6 and 6 px padding. Wide logos
(ratio over 4:1) cap at 160 px wide; square logos show the firm name beside them. Uploading an optional dark-mode
logo removes the plate. Images are re-encoded server side (the engine already keeps up to 512 KB) and
served at 1×, 2× and 3×.

### 11.4 Fonts

- **Presets** are pre-vetted, and each ships with a metric-matched fallback so nothing shifts while it loads.
- **Uploads** are checked on the server for the Spanish set (Á É Í Ó Ú Ü Ñ ¿ ¡ and lowercase), digits,
  `$ % , . - ( ) # @ /`, an x-height of at least 0.45 em, and a regular weight. A font that passes everything is used
  for headings and body. A font that fails anything is used for headings and the firm name only, with body text
  falling back to the system stack.
- Script, display and decorative faces (detected by extreme stroke contrast or joined strokes) are heading-only.
- On the proof, the firm's font is limited to the firm name and section headings. Values, fees, consents and
  buttons always use GT Standard and GT Standard Mono.

### 11.5 Testing themes

A theme matrix runs in visual regression: 120 generated firm themes (every ready swatch, extremes such as
`#FFFFFF`, `#000000` and `#F5E663`, plus random draws), times light and dark, times six key screens (intake, proof, desk
home, email, embed, service page), with automated WCAG and APCA checks on every text-on-background pair. A
theme that fails anything blocks the deploy. Real firm themes are added to the matrix as they're created, in
anonymized form (colors and font only).

## 12. Accessibility, Spanish and dark mode

### 12.1 Accessibility

- The target is WCAG 2.2 AA everywhere, with AAA contrast on the proof and the intake form.
- **Semantics first:** real `<button>`, `<table>`, `<fieldset>`/`<legend>` and `<label for>`. The proof's details
  are a `<dl>` on phones and a table on desktop, in the same DOM order. Headings never skip levels.
- **Focus** is always visible (2 px ring, 2 px offset), follows reading order, and returns to the trigger
  when a drawer, sheet or modal closes. A skip link heads every page (`[copy needed]` if it isn't already written).
- **Targets** are at least 44 × 44, or 48 on client pages, with 8 px between neighbors.
- **Live regions** announce form results, toasts, copy confirmations and status changes on open filing pages.
- **The screenshot** of the state's review page keeps its existing alt text, which points the reader to
  the text details. Zoom is a real full-screen image view, not a canvas.
- **Reflow:** text resizes to 200% with nothing lost, and at 400% (320 CSS px) everything is one column.
- **Time:** the proof's deadline is written out in words, and nothing on the page times out while it's open.
  The card security code's one-hour life is stated, never shown as a ticking countdown.
- **Signatures:** the signature pad has a keyboard alternative where the state's form allows a typed
  signature. Where a drawn signature is required, the page says so before the pad.
- **Testing:** VoiceOver (iOS, macOS), TalkBack and NVDA on the proof, the intake form and the desk every
  release, plus a usability round with readers over 60 using their own phones.

### 12.2 Spanish

Client-facing pages (intake, proof, decision pages, client emails) get a language switch, "English ·
Español", in the firm header. It defaults to the browser's language, and a firm can set a default per client link.

- The Spanish copy is translated, then approved by the copy owner. Every consent and authorization goes to a
  certified legal translator, with counsel's sign-off. Each translated consent gets its own `consentVersion`, so the
  approval record shows which language was agreed.
- Layouts allow for strings 30% longer: no fixed-width buttons, a two-line commit button allowed, chips that wrap.
- Values sent to the state stay as entered: labels are translated, values never are. Fees keep the `$103.50`
  format in both languages, because that's how the state charges them.
- `lang` is set per page and on English fragments inside Spanish pages (state names, and the review-page alt
  text where the screenshot is in English).
- Staff surfaces and the docs stay in English for now.

### 12.3 Dark mode

Every surface has a full dark theme (tokens in Section 4), following `prefers-color-scheme`. The desk, dashboard
and docs add a manual override in the account menu, remembered per device. Client pages follow the device
with no toggle. On the proof in dark mode, the screenshot sits on a white plate (state pages are light), and Mono
values stay at 18 px and weight 400, with no thinning. Emails ship explicit dark styles and are tested in Apple
Mail, Gmail (web, iOS, Android) and Outlook (Windows, web).

## 13. Production

### 13.1 Stack

| Layer | Choice |
|---|---|
| Tokens | One JSON source (W3C design-tokens format), built by Style Dictionary into CSS custom properties, a TypeScript map and Figma variables. Modes: light, dark, high contrast, comfortable, compact |
| Theming engine | A pure TypeScript package (`@cofile/theme`) using culori for OKLCH and apca-w3 plus WCAG 2 math for contrast. It runs on the server at save time and in the browser for previews, and the same package themes emails and the proof |
| Components | React 19 in the existing Next.js app; Radix primitives for menus, dialogs, tabs, comboboxes and tooltips; CSS Modules that read tokens; `cmdk` for the command palette |
| The proof | Rendered by the engine at api.cofile.app from the same component package with server-side React, to static HTML with inline critical CSS: under 60 KB and readable without JavaScript |
| Motion | CSS transitions for the UI; the register slide and print drawing in CSS and SVG; the hero sequence in Rive with reduced-motion stills |
| Docs | MDX guides; the reference generated from `api-catalog` and OpenAPI; Shiki with the Carbon theme |
| Emails | React Email templates rendered by the engine and sent through Resend |
| Quality | Storybook with every component state; Chromatic visual tests including the theme matrix; axe and Playwright accessibility checks in CI; a Lighthouse budget of 95+ on the proof and intake |

### 13.2 Design-system files

In Figma, one library file ("CoFile System") holds variables that mirror the token JSON, every component with
its states in both densities, and a "Theme lab" page that runs the theming engine through a plugin, so a
designer can see any hex as a firm theme. Separate working files for Marketing, Desk, Dashboard, Docs, Client
pages and Emails are built only from the library. Code Connect maps every Figma component to its React
component, so handoff is a link, not a redline.

### 13.3 Assets and commissions

| Asset | Source |
|---|---|
| Pair mark and wordmark, hinted sizes, favicon set, app icons, OG templates | A brand identity studio with type-drawing skills, working from 3.1–3.2 |
| Proof print generator (SVG and PNG) | In-house, with the identity studio signing off the tick geometry |
| GT Standard and GT Standard Mono licenses (web, app, email images), plus the custom cut in 5.1 | The foundry |
| Icon set, about 60 glyphs | A UI icon designer |
| State-screen plates, about 30 drawings | A technical illustrator |
| 4–6 location photographs and 6 document still lifes | An editorial photographer |
| Hero register sequence and the close-section mark animation | A motion studio, delivered as Rive files |
| Spanish translation and legal translation | A translation agency and a certified legal translator |

### 13.4 Phases

| Phase | Weeks | Ships |
|---|---|---|
| 0. Foundations | 1–3 | Tokens, the theming engine, type, the component core (buttons, fields, chips, notices), the theme matrix in CI |
| 1. The proof and client pages | 4–7 | The proof (consent where it is today), decision pages, intake, service pages, embed, client emails. Highest risk goes first |
| 2. Filing desk | 8–11 | Sidebar shell, filings, new filing with the live preview, filing detail timeline, client links, from email, Ready to pay, Setup with the Branding preview |
| 3. Public site | 12–14 | Home with all 13 sections, auth-frame pages, legal pages, 404 and error, hero motion |
| 4. Dashboard and docs | 15–18 | Dashboard pages, command palette, docs three-pane, reference, request builder |
| 5. Signature and polish | 19–20 | The proof print everywhere (once its label is approved), Spanish, a dark-mode pass, motion polish |

## 14. Appendix

### A. What I'd push back on in the current site

1. **The proof is a JSON dump.** `renderReviewPage` walks the request object and prints humanized key
   paths ("Formation › Members 1 › Name") in a 40/60 table, in object-key order. The copy promises "every
   name, address and answer, in the order the state asks for them." Keeping that promise takes a proof layout per
   filing type, using the intake form's own labels and the state's order. This is the biggest gap on the site.
2. **The firm's color is on the irreversible button.** The proof's approve button takes `primaryColor`
   with no contrast check. A firm with a light brand gets white text on a pale button, and a red firm gets a
   red approve button. The commit button has to belong to the system.
3. **Amber means three things.** A planned hold, waiting for a person and "site changed" share one tone.
   Splitting out `act` (4.4) makes "who needs to do something" readable at a glance.
4. **Four names for one mode.** Filings tables show a "Test" badge, the detail page shows "Rehearsal" and
   "test run", and the code calls it practice. In the UI it should be the rehearsal tag everywhere.
5. **CoFile shows on enterprise white-label pages.** `PublicIntake` always renders "with CoFile",
   including under `/e/`. For enterprises that bought white-label, that slot should follow their own setting.
   That's a product decision for the owner.
6. **The paper-and-manila look reads as stationery, and the folder-tab mark doesn't survive 16 px.** It's
   warm, but it doesn't say "checked." The brand should look precise.
7. **Eleven top-bar links on the dashboard** neither fit a laptop nor group. A grouped sidebar does both.
8. **Firm desks lead with CoFile.** The partner desk's top bar shows CoFile's name, with the firm's logo
   off to the right. The brief calls it the firm's branded area, so the firm should lead.

### B. Copy notes (suggestions only; none of this is in the design)

| Where | Note |
|---|---|
| The proof's consent | "every detail below" is true only while the consent sits at the top. If counsel agrees to move it into the commit block, it needs "every detail on this page" or similar |
| The proof print | Needs a short visible label and an accessible name. A suggestion for the copy owner: "Proof print", with help text along the lines of "The same print means the same details." |
| Login button pending text | "Signing in…" breaks the "log in, not sign in" rule; "Logging in…" would match |
| Signed-out desk page | "You're not signed in to this filing desk" has the same problem |
| Google login errors | "Google sign-in…" and "This account can't sign in" could say "log in", except where naming Google's own product |
| Embed footer | "Filed with CoFile" differs from the "with CoFile" used everywhere else |
| Rehearsal badge | "Test" in the filings tables and "test run" on the detail page should become "Rehearsal" |
| "Approval recorded" | "We'll submit the filing exactly as shown" is followed by the stop clause, which helps; worth checking against the rule never to promise "will be submitted" |
| `[copy needed]` strings | Command palette placeholder and groups; the copy-confirmation announcement; the intake stepper ("1 of 4") and Back/Next; the live-preview sheet handle; the Branding preview's contrast notes; the API-key "saved it" acknowledgment; "Open in request builder" and "Copy as Markdown"; the skip link; the status page; bodies for the "filing submitted", "documents back" and "EIN issued" emails |
