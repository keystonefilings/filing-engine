# CoFile merged design, part 7: platforms and emails (10C and 10D)

Merge round, Nov 26, 2026. This part designs every surface a platform works in (the dashboard,
the API docs and their machine-readable files, the white-label hosted page and the embed widget)
and every email the product sends. It builds on `01-foundation.md` and uses its tokens, type scale,
example data and Direction D1 to D7 without reopening them. The choices this part makes where the
ten designers split are in `DECISIONS.md`.

Hal's section 10 is the base, Dev and Priya lead on the dashboard and the docs, and Greta, Elaine,
Jun, Marcus, Rosa, Tomás and Amara are credited where their ideas are used.

**The copy is locked.** Every quoted line is the product's own text, from
`web/app/dashboard/**`, `web/app/docs/**`, `web/app/llms.txt/route.ts`, `web/app/docs.md/route.ts`,
`web/components/*` (the forms those pages use), `web/components/PublicIntake.tsx`,
`web/app/embed.js/route.ts`, `src/comms/render.ts`, `src/comms/notifier.ts`,
`src/comms/resend.ts`, `src/users/routes.ts` and `src/inbound/*`. Straight apostrophes in the
source render as ’ (foundation 5.4). Values in angle quotes, such as ‹Account name›, ‹n› or
‹date›, are layout placeholders for live data, not copy. Example firms, clients and values are D4's.
Anything the design needs that the copy does not have is marked `[copy needed]` and listed in
10C.21 and 10D.18.

---

## 10C. Platforms

### 10C.1 The register: CoFile's own working room

The dashboard and the docs are register 1 (foundation 2.4): CoFile's own pages, read by a
platform's operations staff and developers who live in them all day. They wear CoFile: Cotton
paper, Plate Ink, Miller for page titles and big numbers, Founders Grotesk for everything worked
with, Founders Grotesk Mono for everything a machine reads, and one point of Brass. They are the
quietest of CoFile's pages: no photographs, no motion beyond the interface's own, no texture on the
working grounds (the 3% cotton scan stays on the page ground only, off under cards and tables).

The white-label hosted page and the embed widget are register 3: CoFile disappears. The firm's
Letterhead (or, inside the widget, the host website itself) leads, and nothing of ours is drawn on
them (decision 12): the one place our name appears is the product's own consent line, in the
form's fine print (10C.18).

**The firm's filing desk shares this register** (decision 2). The treatment in 10C.1 and 10C.2
(the shell's construction, the buttons, the notices, the tables, the chips, the fields, the plate
field and dark mode) is the desk's too, and only the pages and their links differ, so the desk and
the dashboard read as one product: a letterhead row, a rule, a 52 px navigation row, content on
the 12-column grid to 1200 px at a 17 px base, and "narrow" pages in a centred 720 px column with
an optional 320 px rail at 1280 px and up (foundation 6.8). On the desk the firm's name and logo
are content, never its letterhead: the account label in the letterhead row shows the firm's logo
at 24 px tall with its name, and no Firm Rule is drawn (the firm's-pages part). A platform's staff
and a firm's staff therefore learn one room.

**CoFile's letterhead, in the apps and in mail** (Hal): the horizontal lockup, then a **1 px Plate
Ink rule** under it, full width. It is the plain counterpart of the Firm Rule that heads a firm's
client pages. The thick-and-thin stays reserved for the foot of the marketing site (D5).

**Buttons on the dashboard** (one Brass button per screen, D5):

| Kind | Look | Used for |
|---|---|---|
| **Brass** | `--brass` fill, Plate Ink text (7.4:1), `button` 18/24 Founders Grotesk Medium, 48 px tall (56 px and full width on phones), `--chamfer` corners; hover `--brass-deep`; press 1 px down with a 1 px inset shadow (D2) | The page's one primary action, when it has exactly one: "Log in" (API-key log-in), "Create key", "Save endpoints", "Save filing desk", "Add" (Team), "Change password", "Subscribe", and "Pay and file" when a single card is waiting |
| **Ink** | Plate Ink fill `#1D2130`, Cotton text `#FBFAF6` (15.3:1), same size and corners; hover Plate Ink under an 8% white overlay (≈ `#33374A`) | A primary action that repeats down a page or shares the page with others: every save on Setup, "Invite", "Approve" on each sign-up and request row, "Pay and file" when two or more cards wait, "Confirm" and "Save login" |
| **Outline** | Sheet fill, 1 px Rule Strong border (3.7:1), Plate Ink text; hover Cotton 2 fill and a Plate Ink border | Secondary: "Show", "Copy", "Copy link", "Add another endpoint", "Manage billing", "Connect", "Disconnect", "Remove", "Decline", "Text me a code", "Remove this number", "Log out", the per-portal "Save" |
| **Danger** | Outline construction with Madder `#9A2D2D` text; hover Madder Tint fill and a Madder border | Only where the product already marks the action as destructive: "Revoke" and "Turn down" |

Small buttons (the row-level ones the product marks `small`) are 40 px tall with `button-s` 16/20
Medium, rising to 48 px on touch screens. Pending labels are the product's ("Saving…",
"Checking…", "Sending…", "Adding…", "Opening Stripe…", "Opening…"): the label swaps, the button
keeps its width, and nothing spins unless the wait passes 3 s (D2), when a 14 px ring in the label's
color appears before the label.

**Dark mode** follows the system (foundation 4.6): the page is Night `#14161E`, cards and tables
Night Card `#1F2230` with table heads on `#2A2D3B`, text Night Ink `#ECE8DF`, rules `#323646`,
field borders `#6E7180`. Brass buttons keep Brass with Night text (8.3:1); Ink buttons invert to a
Night Ink fill with Night text. Firm logos shown on the dashboard sit on the white logo plate (3.5).
Anything that previews a firm's client page (the preview on a firm's page, 10C.8) stays a white
sheet.

**When a deployment sets its own platform name** (`PLATFORM_NAME`, read by `platformName()`), the
dashboard, the API-key log-in and the docs show that name where they show "CoFile" today. The
CoFile mark and wordmark are never drawn around another company's name: the lockup is replaced by
the name set in Founders Grotesk Medium 20 / 24 in Plate Ink, with no plate and no Brass lozenge,
and the 1 px rule under it stays.

### 10C.2 The dashboard shell

**Desktop (1440).**

```
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│120│ [▱Co▱] CoFile◆                                           ‹email›     [ Log out ]      │120│  76 px, Cotton
├────────────────────────────────────────────────────────────────────────────────────────────────┤  1 px Plate Ink, full window
│   │ Overview  Filings  Ready to pay  Firms  API keys  Webhooks  Setup  Team  Billing  │  Docs │   │  52 px, sticky
├────────────────────────────────────────────────────────────────────────────────────────────────┤  1 px Rule, full window
│   │ ‾‾‾‾‾‾‾‾  (2 px Brass Line under the current link, 6 px below its baseline)              │   │
│   │                                                                          48 px            │   │
│   │ Page title (Miller Display, page-title 32 / 38)                                           │   │
│   │                                                                          32 px            │   │
│   │ ┌───────────────────────────── content, 12 columns, 1200 px ────────────────────────────┐ │   │
│   │ │                                                                                        │ │   │
│   │ └────────────────────────────────────────────────────────────────────────────────────────┘ │   │
│   │                                                                          96 px            │   │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

- **The letterhead row**, 76 px, Cotton, not sticky (it scrolls away; the navigation row stays).
  Left: the horizontal lockup at 28 px tall, linking to `/dashboard`, the lozenge in Brass Line
  (3.3). Right, vertically centred: the signed-in person's email (`s.email ?? s.name`) in `small`
  15 / 23; when the session is personal it is a link to `/dashboard/password` with the title
  "Change password", Plate Ink, underlined 1 px in Brass Line; for an API-key session it is plain
  Graphite text. 16 px after it, "Log out" as an outline small button (40 px). On the desk the
  same row also carries the firm's account label (10C.1).
- **The 1 px Plate Ink rule** under the row runs the full window width.
- **The navigation row**, 52 px, Cotton, sticky at the top once the letterhead row has scrolled
  away, with a 1 px Rule bottom edge. Links in `nav` 17 / 24 Founders Grotesk Text, Plate Ink, 28 px
  apart, in the product's order: "Overview", "Filings", "Ready to pay", "Firms", "API keys",
  "Webhooks", "Setup", "Team", then "Billing" for subscribers or "Sign-ups" on the platform's own
  account. The current page carries `aria-current="page"` and a 2 px Brass Line underline 6 px below
  the baseline (the site header's construction, 6.7). "Docs" sits at the right end of the row,
  after a 1 px × 20 px Rule divider, because it leaves the dashboard.
- **Ready to pay's count.** When filings are waiting for a card's code, "Ready to pay" is followed
  by a 20 px Ochre Tint count chip (`chip` 14 / 18 Medium, Ochre text, tabular, `--chamfer-s`)
  holding the number the Overview's notice already counts. It is a number, not a word, and it
  disappears at zero.
- **Content** starts 48 px under the navigation row: the h1 in `page-title` (Miller Display 400,
  32 / 38, Plate Ink), then 32 px to the first block, blocks 32 px apart, groups 48 px apart (6.3).
  Wide pages use the full 1200 px (Overview, Filings, Firms, Ready to pay, Billing, Sign-ups);
  narrow pages use a centred 720 px column (API keys, Webhooks, a firm, Setup, Team, Password), with
  Setup's contents rail at the right at 1280 px and up (10C.11). h2 in `display-s` (Miller Text
  26 / 32); h3, card titles and fieldset legends in `section` (Founders Grotesk Medium 22 / 28).
- **Lede paragraphs** (the product's `muted` paragraphs under each h1) in `body-desk` 17 / 26
  Graphite, measure 68 ch, 24 px under the h1.
- **Page changes** cross-fade the content in 200 ms with a cross-document View Transition that
  keeps the letterhead row and the navigation row perfectly still (D2).

**Laptop (1024 to 1279).** Margins 48 px, links 20 px apart: the row still fits (about 760 px of
links plus "Docs").

**Tablet and phone (below 1024).** The navigation collapses into the current page's own name, so
the menu needs no new word:

```
PHONE (390)                                   MENU OPEN
┌──────────────────────────────┐              ┌──────────────────────────────┐
│ [▱Co▱] CoFile◆               │ 64 px        │ [▱Co▱] CoFile◆               │
├──────────────────────────────┤ 1 px ink     ├──────────────────────────────┤
│ Overview  ▾          │ Docs  │ 52 px sticky │ Overview  ▴          │ Docs  │
├──────────────────────────────┤              ├──────────────────────────────┤
│                              │              │ Overview                ━━   │ 56 px rows,
│ ‹Account name›               │ page-title   │ Filings                      │ Founders Text 18 / 24,
│ 28 / 34                      │ phone        │ Ready to pay           (1)   │ 1 px Rule between
│                              │              │ Firms                        │
│ ┌ notice ──────────────────┐ │              │ API keys                     │
│ │ ◆ 1 approved filing is … │ │              │ Webhooks                     │
│ │   Pay and file           │ │              │ Setup                        │
│ └──────────────────────────┘ │              │ Team                         │
│ ┌ Filings ─────────────────┐ │              │ Billing                      │
│ │ ##                       │ │              │ ──────────────────────────── │
│ │ ## live, ## rehearsals   │ │              │ ‹email›  (Change password)   │ 15 / 23
│ └──────────────────────────┘ │              │ [          Log out         ] │ outline, full width
│ …                            │              └──────────────────────────────┘
└──────────────────────────────┘
```

- Header 64 px with the lockup at 24 px tall; the email and "Log out" move to the foot of the menu.
- The 52 px row holds a disclosure button with the current page's label and a 12 px chevron
  (accessible name: the nav's existing "Main"), and "Docs" at the right. It opens a sheet that drops
  from under the row: Cotton, `--e-menu`, the nav in 56 px rows, the current item with a 2 px Brass
  Line bar on its left edge. The sheet closes with `--ease-exit` 160 ms, on Escape, on a tap
  outside it and on navigation. Focus moves into the sheet and is trapped until it closes.
- Content margins 20 px (16 px at ≤ 360), blocks 24 px apart, groups 32 px apart.

**Shared pieces on every dashboard page.**

*Notices* (the product's `notice` with `warn`, `bad`, `ok` or no tone). A Sheet-white block (Night
Card in dark), 2 px radius, padding 16 px 20 px, with a 3 px left rule and a 12 px glyph in the
tone's color set at x-height 10 px before the text; text `body-desk` 17 / 26 Plate Ink; any link in
it is Plate Ink, Medium, underlined in Brass Line. Tones (4.3): a filing waiting on the account's own
action (the "Pay and file" notice) is **Your turn** (Ochre `#855A0C`, lozenge ◆); `warn` is
**Attention** (Ochre, half circle ◐); `bad` is **Problem** (Madder `#9A2D2D`, bar ▬); `ok` is
**Done** (Verdigris `#2E6B57`, filled circle ●); a notice with no tone has a Rule Strong left rule
and no glyph. The tone's tint never fills the block: the rule and glyph carry it, so a page with
three notices stays paper (Hal, Priya). `role="alert"` for errors and `role="status"` for results,
as the product sets them.

*Tables.* A Sheet card with a 1 px Rule border and no shadow, holding the table edge to edge. Head
row 44 px on Cotton 2, `table` header 14 / 18 Founders Grotesk Medium Graphite, sentence case as the
product writes it. Body rows at least 56 px, padding 14 px 16 px, `table` 16 / 22, separated by 1 px
Rule; second lines (dates under names, ids under titles) in `small` 15 / 23 Graphite, or Mono
14 / 20 Graphite for ids. Hover: the row takes Cotton `#FBFAF6`; a focused row link draws the focus
ring. Numbers and dates in lining tabular figures; counts right-aligned. Empty tables keep their
head and show the product's empty line ("No filings.", "No keys created here yet.") in one 56 px
row, Graphite. On phones (≤ 599 px) every table becomes a list of blocks: the first cell as the
block's title line (17 / 24 Medium), each other cell on its own line led by its column head as a
14 / 18 Graphite label, actions full width at the foot of the block, blocks separated by 1 px Rule.

*Chips* (the product's `badge` and `StatusBadge`). 28 px tall, padding 0 10 px, `chip` 14 / 18
Medium, a 12 px glyph and 6 px gap, `--chamfer` corners. On the dashboard's dense tables, Done
uses the quiet form (Verdigris on Verdigris Tint) (4.3). The product's status tones map as follows:

| Product tone | Statuses (from `web/lib/status.ts`) | Chip |
|---|---|---|
| `ok` | "Approved", "EIN issued", "Submitted to the state", "Accepted by the state", "Completed" | Done, quiet ● |
| `warn`, waiting on a person | "Needs information", "Waiting for approval", "Changes requested" | Your turn, in CoFile's form: Ochre on Ochre Tint ◆ |
| `warn`, held | "On hold", "Paused: state site changed", "Name unavailable", "Being checked" | Attention ◐ |
| `bad` | "Needs correcting", "Rejected by the state", "Failed", "Stopped" | Problem ▬ |
| none | "Received", "Getting the state's review page", "Queued", "Filing now", "Final check" | In hand ○ (Iron outline) |
| "Test" (a dry-run filing) | — | Rehearsal: dashed 1.5 px Plate Ink outline, the ghost-light glyph (4.4) |
| "Revoked", "Declined", a raw sign-up status | — | Neutral: Sheet, 1 px Rule Strong, Graphite text, no glyph |

*Fields* (labels above fields, one per row, field-rows of two or three on desktop only). `label`
16 / 22 Medium; inputs 48 px tall, `input` 18 / 24, Sheet fill, 1 px Rule Strong border, 2 px
radius; read-only fields on Cotton 2 with a Rule border; help under the field in `help` 15 / 22
Graphite; errors in Madder 15 / 22 with the ▬ glyph and a 1.5 px Madder border on the field.
Focus everywhere: a 2 px Plate Ink outline offset 2 px from a 2 px white ring (D5). Machine values
(hex colors, URLs, keys, slugs) are typed in Founders Grotesk Mono 17 / 24. Checkboxes and radios
("choice" rows) are 24 px controls with 48 px rows, built as in Components (section 11).

*The plate field.* Anything shown once and meant to be copied (a new API key, a new signing secret,
an invitation link, a page address, the widget code's one line) sits in a **plate field**: Cotton 2
fill (Night 2 in dark), 1 px Rule Strong border, `--chamfer` corners, padding 12 px 16 px, the value
in Founders Grotesk Mono 17 / 24 Plate Ink, wrapping at any character, with the product's "Copy"
(or "Copy link") outline small button attached at its right (below it on phones). A stationer
strikes a plate once; the key is shown once (Hal's plate field, Priya's shown-once panel). After a
copy the button shows a confirmation for 2 s `[copy needed: "Copied"]` and announces it to screen
readers. No eye, padlock or key icon anywhere (3.9).

*Loading.* Pages render on the server; on a slow route change the content area shows blank sheets
at their final sizes (a table head and three 56 px rows of Rule bars, or the stat tiles' outlines)
pulsing 60% to 100% opacity over 1.6 s (D2). *Errors* beyond the page's own notices (the engine
unreachable) use the system error page; an ended session goes to `/session-ended` (both designed
in the public-site part). *Empty* states use the product's lines; Ready to pay and Firms add an
engraved vignette (10C.6, 10C.7).

### 10C.3 Log in with an API key (`/dashboard/login`)

An auth page (foundation 6.8): one 480 px card on Cotton, in the same frame as the site's other
log-in pages (the public-site part), with the lockup centred 48 px above the card.

```
DESKTOP                                              PHONE (390)
┌──────────────────────────────────────────────┐     ┌──────────────────────────────┐
│                [▱Co▱] CoFile◆                │     │ [▱Co▱] CoFile◆               │
│                                              │     │                              │
│            CoFile dashboard                  │     │ CoFile dashboard             │
│  (display-m, Miller Display 36 / 42)         │     │ (28 / 34)                    │
│  Log in with one of your API keys to manage  │     │ Log in with one of your API  │
│  keys, webhooks, your firms' portals and     │     │ keys to manage keys, …       │
│  usage.             (body-desk, Graphite)    │     │                              │
│  ┌──────────── card 480 ──────────────────┐  │     │ API key                      │
│  │ API key                                │  │     │ [••••••••••••••••••••••••••] │
│  │ [••••••••••••••••••••••••••••••••••••] │  │     │ [          Log in          ] │ Brass, 56
│  │ [               Log in               ] │  │     │ You stay logged in for 12 …  │
│  │ You stay logged in for 12 hours. …     │  │     │                              │
│  └────────────────────────────────────────┘  │     │ Have an email and password?  │
│  Have an email and password? Log in here     │     │ Log in here instead.         │
│  instead.                                    │     └──────────────────────────────┘
└──────────────────────────────────────────────┘
```

- h1 "‹platformName()› dashboard", so "CoFile dashboard"; the lede "Log in with one of your API
  keys to manage keys, webhooks, your firms' portals and usage." Both left-aligned above the card,
  aligned to its edge.
- The card: Sheet (Night Card in dark), 1 px Rule, `--e-sheet`, 32 px padding (20 px on phones,
  where the card's border and shadow drop and the card is the screen). "API key" field: password
  type, the dots in Mono. "Log in" Brass, full card width. Help: "You stay logged in for 12 hours.
  Your browser keeps only an encrypted cookie, and the key itself is never sent back to it."
- Under the card in `small`: "Have an email and password? Log in here instead." with "Log in
  here" linking to `/login`.
- Errors appear at the top of the card as a Problem notice: "Enter one of your API keys.", "That
  key isn't valid, or it was revoked.", "The filing engine can't be reached right now." Focus moves
  to the notice.

### 10C.4 Overview (`/dashboard`)

**Desktop (1440).**

```
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ ‹Account name›                                        (page-title, Miller Display 32 / 38) │
│                                                                                    32       │
│ ┌ notice · Attention ◐ ───────────────────────────────────────────────────────────────────┐ │
│ │ ◐ Real filings need an active subscription; rehearsals are free. Subscribe              │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────┘ │
│ ┌ notice · Your turn ◆ ───────────────────────────────────────────────────────────────────┐ │
│ │ ◆ 1 approved filing is ready to pay and need a card's security code. Pay and file       │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────┘ │
│                                                                                    48       │
│ ┌ c1–c4 ────────────────────┐ ┌ c5–c8 ────────────────────┐ ┌ c9–c12 ───────────────────┐  │
│ │ Filings                   │ │ Webhook deliveries        │ │ API keys                  │  │ 15 / 23 Medium Graphite
│ │                           │ │                           │ │                           │  │
│ │ ##                        │ │ ##                        │ │ #                         │  │ stat 40 / 44 Miller Display
│ │ ## live, ## rehearsals    │ │ ## pending, ## failed     │ │ Manage keys               │  │ small 15 / 23
│ └───────────────────────────┘ └───────────────────────────┘ └───────────────────────────┘  │ 152 px tall
│                                                                                    24       │
│ ┌ By status ────────────────┐ ┌ By state ─────────────────┐ ┌ By month ─────────────────┐  │ section 22 / 28
│ │ ◆ Waiting for approval    │ │ New Jersey                │ │ 2026-06                   │  │
│ │ ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇  ##  │ │ ▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇▇  ##  │ │ ▇▇▇▇▇▇▇▇▇▇            ##  │  │
│ │ ● Completed               │ │ New York                  │ │ 2026-07                   │  │
│ │ ▇▇▇▇▇▇▇▇▇▇▇▇▇▇        ##  │ │ ▇▇▇▇▇▇▇▇▇▇▇▇▇         ##  │ │ ▇▇▇▇▇▇▇▇▇▇▇▇▇▇        ##  │  │
│ │ ○ Queued                  │ │ Florida                   │ │ …                         │  │
│ │ ▇▇▇▇▇                 ##  │ │ ▇▇▇▇▇                 ##  │ │                           │  │
│ └───────────────────────────┘ └───────────────────────────┘ └───────────────────────────┘  │
│                                                                                    24       │
│ As of ‹date, time›.                                                     (small, Graphite)   │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

(Figures and months are layout placeholders. The labels are the product's.)

- **h1** the account's name, `page-title`.
- **Notices**, in the product's order and only when they apply: "Real filings need an active
  subscription; rehearsals are free. Subscribe" (Attention, "Subscribe" linking to Billing); "1
  approved filing is ready to pay and need a card's security code. Pay and file" or "‹n› approved
  filings are ready to pay and need a card's security code. Pay and file" (Your turn, the one notice
  here that asks the reader to act); "Your account settings haven't been set up by the platform yet,
  so filings can't be approved or run. Ask the platform team to configure tenant ‹tenantId›." with
  the tenant id in Mono (Attention). 16 px between notices; 48 px from the last to the tiles.
- **Three stat tiles** (Hal, Dev, Priya), c1–c4, c5–c8, c9–c12: Sheet, 1 px Rule, no shadow,
  24 px padding, 152 px tall. The label ("Filings", "Webhook deliveries", "API keys") in 15 / 23
  Founders Grotesk Medium Graphite; 16 px; the figure in `stat` (Miller Display 400, 40 / 44, lining
  figures), the only Miller on the page besides the h1; 8 px; the sub-line in `small` Graphite: "‹n›
  live, ‹n› rehearsals", "‹n› pending, ‹n› failed", and "Manage keys" as a link to API keys. The
  figures never count up (D2: money and numbers never move). A tile is not a link; only "Manage
  keys" is.
- **Three chart cards** ("By status", "By state", "By month"), same columns and card as the tiles,
  24 px padding, title in `section`. Each is the product's own table of rows, drawn as a quiet
  annual-report chart (Hal, Elaine, Greta, Jun):
  - A row is 56 px: the label on its own line (`table` 16 / 22 Plate Ink), and under it, 6 px
    below, the bar and its value. The bar is 10 px tall, square-cut (paper), **one ink**: Plate Ink
    at 80% on a full-width Cotton 2 track, so every bar's share of the largest reads at a glance.
    The value sits right-aligned at the row's end in 16 / 22 Medium tabular, 12 px clear of the
    track. No legends, no gridlines, no axis.
  - "By status" leads each label with its status glyph (12 px, in its tone, 4.3), so status keeps
    its shape even here while the bars stay one ink. Rows sort largest first, as the product sorts.
  - "By state" uses the state names as the product supplies them.
  - "By month" keeps the product's last 12 months in date order. The month keys are shown formatted
    as a short month and year by `Intl.DateTimeFormat` (a formatting change, no new words); the
    current month's label is Medium.
  - Empty: the product's "None yet." in `small` Graphite, 16 px under the title.
  - Accessibility: each chart stays a real `table` (row headers are the labels, cells the counts),
    so a screen reader reads the numbers; the bar is `aria-hidden`. Every value is printed, so no
    hover is needed to read one.
- **"As of ‹date, time›."** in `small` Graphite, 24 px under the cards.
- **Tablet (834):** tiles in a row of three at 8 columns (tiles 120 px tall, figure 32 / 36); chart
  cards stack one per row at full width. **Phone:** tiles stack, each a 96 px row with the label
  above and the figure at 32 / 36 at the left, the sub-line under it; chart cards stack; bars span
  the card.
- **Dark:** tiles and cards on Night Card; bars Night Ink at 80% on a `#2A2D3B` track.

### 10C.5 Filings (`/dashboard/filings`)

```
DESKTOP (wide page)
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ Filings                                                                                    │
│ [ All firms                          ▾ ]  [ Show ]          select 320 px + outline button │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ Filing                      │ Firm               │ Type          │ Status        │Created│ │ head, Cotton 2
│ ├─────────────────────────────┼────────────────────┼───────────────┼───────────────┼───────┤ │
│ │ Two Sisters Bakery LLC      │ Harbor & Pine CPA  │ NJ formation  │ ◆ Waiting for │ ‹date›│ │
│ │ f_‹id›                      │                    │               │   approval    │       │ │
│ │                             │                    │               │ ●●○○○         │       │ │ stage track,
│ │                         │                    │               │ Proof, step 2 of 5│       │ │ one line in
│ ├─────────────────────────────┼────────────────────┼───────────────┼───────────────┼───────┤ │ the product
│ │ Two Sisters Bakery LLC      │ Harbor & Pine CPA  │ NJ formation  │ ● Approved    │ ‹date›│ │
│ │ ┆◌ Test┆  f_‹id›            │                    │               │ ●●●○○         │       │ │
│ │                             │                    │               │ 3 of 5 ·      │       │ │
│ │                             │                    │               │ Filing        │       │ │
│ │                             │                    │               │ Ready to pay: │       │ │
│ │                             │                    │               │ needs the     │       │ │
│ │                             │                    │               │ card's code   │       │ │
│ ├─────────────────────────────┼────────────────────┼───────────────┼───────────────┼───────┤ │
│ │ Hudson Ledger LLC           │ Harbor & Pine CPA  │ NY formation  │ ● Completed   │ ‹date›│ │
│ │                             │                    │               │ ●●●●●         │       │ │
│ │                         │                    │               │ Done, step 5 of 5 │       │ │
│ │ Orchard Lane Inc.           │ Harbor & Pine CPA  │ NJ payroll …  │ ● Submitted to│ ‹date›│ │
│ │                             │                    │               │   the state   │       │ │
│ │                             │                    │               │ ●●●●○         │       │ │
│ │                             │                    │               │ 4 of 5 · With │       │ │
│ │                             │                    │               │ the state     │       │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

- h1 "Filings". The filter: the product's select (accessible name "Firm"), first option "All
  firms", then each firm by name, 48 px tall, max 320 px, with "Show" as an outline button 12 px to
  its right. With JavaScript the list also updates when the select changes, and "Show" stays for
  everyone else.
- Columns at 1200 px: Filing 34%, Firm 20%, Type 16%, Status 18%, Created 12%.
  - **Filing**: the title (the business name, or the state and type when there is none) in
    `table` 16 / 22 Medium Plate Ink; a dry run adds the rehearsal chip "Test" 8 px after it; the
    filing id under it in Mono 14 / 20 Graphite.
  - **Firm**: the firm's name in 15 / 23 Plate Ink.
  - **Type**: the product's state and type ("NJ formation") in 15 / 23. (The desk's filing titles,
    such as "New Jersey LLC formation", would read better `[copy needed: confirm using the desk's
    filing titles here]`.)
  - **Status**: the status chip, and 6 px under it the same five-step stage track the desk's
    Filings ledger carries (the firm's-pages part, 10B.4; `web/components/StageTrack.tsx`), so a
    status reads the same in both rooms: five 8 px dots, the reached ones Plate Ink and the rest
    Rule (Night Ink and `#323646` in dark), then "Proof, step 2 of 5" in the `stage` style (13 / 18
    Graphite, tabular; foundation 4.3), the steps being "Details", "Proof", "Filing", "With the
    state" and "Done", read aloud as "Step 2 of 5: Proof". No track for a rejected, failed or
    stopped filing. The dashboard's page doesn't render it yet (a build change: the desk's
    component in this cell). When a filing waits for a card's code, the product's link "Ready to
    pay: needs the card's code" sits 6 px under the track in 15 / 23, linking to Ready to pay.
  - **Created**: the date, `small` Graphite tabular.
- **Firm, not "Sent by".** The desk's ledger names who sent each filing (its "Sent by" column);
  the dashboard lists filings across all of a platform's firms, so this column names the firm, as
  the product does.
- The product shows up to 500 rows; the table keeps its head sticky under the navigation row when
  it is taller than the screen.
- Empty: "No filings." in one row.
- Phone: blocks (10C.2), each block headed by the filing title and its chips, then "Firm", "Type",
  "Status" (the chip with its track under it), "Created" lines.

### 10C.6 Ready to pay (`/dashboard/pay`)

The one page where money moves, so it is the calmest: one card per saved card waiting, and one
field each.

```
DESKTOP (wide page; cards at 640 px, left-aligned)
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ Ready to pay                                                                               │
│ Approved filings that pay the state with a saved card wait here for the card's security    │
│ code (the 3 or 4 digits on the card). Enter it once and every filing waiting for that card │
│ goes ahead. We keep the code for an hour at most, then delete it.     (body-desk, Graphite)│
│                                                                                            │
│ ┌──────────────────────── card, 640 px ─────────────────────────┐                          │
│ │ ‹Card name› ending ‹1234› (Harbor & Pine CPA's card)          │ section 22 / 28; the     │
│ │ ───────────────────────────────────────────────────────────── │ firm part in Graphite    │
│ │ ◆ Two Sisters Bakery LLC   approved, waiting since ‹date›     │ 16 / 22, the since-line  │
│ │                                                               │ in Graphite              │
│ │ Security code for ‹Card name› ending ‹1234›                   │ label                    │
│ │ [ 123     ]   field 160 px                                    │ Basis Theory frame       │
│ │ [ Pay and file ]                                              │ Brass if it's the only   │
│ └───────────────────────────────────────────────────────────────┘ card; else Ink          │
│                                                                                            │
│ A card's security code can't be stored, so we ask for it when filings are ready to pay.   │
│ It goes straight to Basis Theory, our card vault, and is deleted within the hour. (help)  │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

- h1 "Ready to pay"; the lede as written.
- **A waiting card** (Sheet, 1 px Rule, 32 px padding, 640 px): the head is the card's name and
  last four as the product writes them ("‹Card name› ending ‹1234›"), with "(‹Firm›'s card)" in
  Graphite when the card is a firm's. A 1 px Rule, then the filings as a list: each a 7 px lozenge
  in Ochre (a list waiting on the reader), the filing title in 16 / 22 Medium, then "approved,
  waiting since ‹date, time›" in Graphite. Then the field: label "Security code for ‹card›", Basis
  Theory's frame drawn by us (48 px tall, 160 px wide, 1 px Rule Strong, 2 px radius), its text set
  through Basis Theory's style options in the system mono stack at 18 px with the placeholder "123"
  in Graphite. 16 px, then "Pay and file": **Brass** when only one card is waiting (the page's
  single action), **Ink** on every card when two or more wait.
- **Results** under the button: "Thanks. The filing is being filed now.", "Thanks. ‹n› filings
  are being filed now." or "Thanks. Filings for this card pay with it for the next hour." (Done);
  errors "Type the 3 or 4 digit code from the card.", "The code wasn't sent.", "The code wasn't
  accepted. Try again.", "The field couldn't load. Reload the page and try again." (Problem). After
  a success the field and button fold away (240 ms height ease) and the card keeps its list with
  each filing's lozenge turned to an In hand ring, so the reader sees what went ahead.
- Without the card vault: "Card payments need the card vault switched on for this site." as a
  plain notice in place of the field.
- The closing help line as written, `help` 15 / 22 Graphite, 32 px under the last card.
- **Empty:** "Nothing is waiting for a card right now." in `body-desk` Graphite, under an engraved
  vignette of a clear desk (D1, kind 4), 120 px wide, Plate Ink line (Night Ink in dark), 32 px
  above the line.
- **Phone:** the card is the full width with 20 px padding; the field is 100% wide up to 200 px;
  "Pay and file" full width, 56 px.

### 10C.7 Firms (`/dashboard/firms`)

Even here, a platform sees its firms in their own brands (Marcus, Jun, Tomás, Amara): every row is
led by the firm's own mark.

```
DESKTOP (wide page)
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ Firms                                                                                      │
│ The CPA, payroll and other firms you file for. Give a firm its own branded filing desk,    │
│ then invite its staff.                                                                     │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ Firm                                          │ Filing desk               │ Approvers    │ │
│ ├───────────────────────────────────────────────┼───────────────────────────┼──────────────┤ │
│ │ [⌂≈] Harbor & Pine CPA                        │ /p/‹slug›                 │            2 │ │
│ │      ‹clientCompanyId›                        │                           │              │ │
│ ├───────────────────────────────────────────────┼───────────────────────────┼──────────────┤ │
│ │ [⊓ Northgate Payroll ]                        │ /p/‹slug›                 │            1 │ │
│ │      ‹clientCompanyId›                        │                           │              │ │
│ ├───────────────────────────────────────────────┼───────────────────────────┼──────────────┤ │
│ │ [··] ‹Firm name›                              │ Not set up                │            0 │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

- h1 "Firms"; the lede as written.
- **Firm**: the firm's logo in a 32 px-tall bay (its square crop at 32 × 32, a wide logo at
  32 px tall up to 112 px wide, processed and sized as at upload, 3.5), or the firm's monogram tile
  (32 px, `--firm-fill`, 3.5) when it has no logo, then 12 px, the firm's name as a link (16 / 22
  Medium, Plate Ink, underlined in Brass Line), with its id in Mono 14 / 20 Graphite under it. A
  wide wordmark logo that contains the name still has the typed name beside it here: this is a list
  to scan, not a letterhead. In dark mode the logo sits on the white logo plate.
- **Filing desk**: `/p/‹slug›` in Mono 15 / 22, or the neutral chip "Not set up".
- **Approvers**: the count, right-aligned, tabular. A firm with none keeps "0" in Plate Ink: the
  warning lives on the firm's own page.
- **Empty:** "No firms yet. Add one with PUT /v1/client-companies/{id} (see the API reference)." as
  a plain notice with the call in Mono, under the engraved vignette of the blank plate (D1) at
  120 px: a plate waiting for a firm's name.
- **Phone:** blocks headed by the mark and name.

### 10C.8 A firm (`/dashboard/firms/<id>`)

A narrow page that becomes two columns at 1024 px and up: the settings on the left, a live
preview of the firm's client page on the right, so the platform sees the page the firm's clients
get change as it types (Marcus's live preview; Hal's Branding preview).

```
DESKTOP (≥ 1024; the narrow column widens to the 12-column grid here)
┌────────────────────────────────────────────────────────────────────────────────────────────┐
│ ← Firms                                                              (small)               │
│ Harbor & Pine CPA                                                     page-title           │
│ ┌ notice · Attention ◐ (only without approvers) ─────────────────────────────────────────┐ │
│ │ ◐ This firm has no approvers, so its filings can't be approved. Add them with PUT …     │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────┘ │
│ Filing desk                                                           h2, display-s        │
│ ┌ c1–c7: the form ────────────────────────────────┐  ┌ c8–c12: preview, sticky ──────────┐ │
│ │ ☑ This firm has a portal                        │  │ Preview of a client's page        │ │
│ │ Its address is /p/‹slug›. Unchecking turns the  │  │ ┌ white sheet, 0.75 scale ──────┐ │ │
│ │ portal off.                                     │  │ │ [⌂≈] Harbor & Pine CPA        │ │ │
│ │ Name shown on the filing desk                   │  │ │ ═════════════════════════════ │ │ │
│ │ [ Harbor & Pine CPA                         ]   │  │ │ ───────────────────────────── │ │ │
│ │ Logo                                            │  │ │ Please fill in your LLC       │ │ │
│ │ [ Choose file … ]                               │  │ │ formation details. What       │ │ │
│ │ A PNG, JPEG or WebP picture. A wide logo on a   │  │ │ you'll need                   │ │ │
│ │ clear background looks best. …                  │  │ │ [ Send for approval ]         │ │ │
│ │ [ Remove logo ]   Use a link instead            │  │ └───────────────────────────────┘ │ │
│ │ Main color            Second color              │  └───────────────────────────────────┘ │
│ │ [■][#1d4e63]          [■][#2b5a47]              │                                        │
│ │ ■■■■■■■■■             ■■■■■■■■■                 │                                        │
│ │ Buttons and the top…  Links and highlights. …   │                                        │
│ │ Support email shown to clients                  │                                        │
│ │ [                                           ]   │                                        │
│ │ ☐ Public pages and website widget               │                                        │
│ │   A page per service anyone can fill in, …      │                                        │
│ │ Filings offered                                 │                                        │
│ │ ☑ New York LLC formation  ☑ New Jersey LLC …    │                                        │
│ │ [ Save filing desk ]                    Brass   │                                        │
│ └─────────────────────────────────────────────────┘                                        │
│ ┌ Public pages and website widget ─────────────────────────────────────────────────────────┐ │
│ │ Send a page link, or paste the widget code into the firm's website where the form …     │ │
│ │ ▸ New Jersey LLC formation: https://cofile.app/e/‹account›/‹slug›/llc-formation-new-jersey│ │
│ │ ▾ New York LLC formation: …                                                              │ │
│ │   ┌ plate field ─────────────────────────────────────────────────────────┐ [ Copy ]     │ │
│ │   │ <script src="https://cofile.app/embed.js" data-account="…" … async></script> │        │ │
│ │   └──────────────────────────────────────────────────────────────────────┘              │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────┘ │
│ Invite staff                                                          h2                   │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ [ name@firm.com                                              ]  [ Invite ]   Ink         │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────────────────────────┘
```

- "← Firms" in `small`, 24 px above the h1, the arrow part of the link.
- h1 the firm's name in `page-title`. The no-approver notice (Attention) as written, the call in
  Mono.
- **"Filing desk"** (h2). The form is a Sheet card (32 px padding) in c1 to c7; the preview sits in
  c8 to c12, sticky 24 px under the navigation row. Below 1024 px the preview follows the form.
  - "This firm has a portal" as a choice row with its label in Medium; the help "Its address is
    /p/‹slug›." (slug in Mono) or "Its address is made from the firm's name when you save.", then
    "Unchecking turns the portal off." Unchecked, the rest of the form folds away (240 ms height
    ease) and the preview leaves.
  - "Name shown on the filing desk", placeholder the firm's name in Graphite.
  - "Logo": the file input drawn as a 96 px drop area on Cotton 2 with a 1 px **solid** Rule Strong
    border (never the usual dashed drop-zone border: dashes mean rehearsal, 4.4), holding the
    native "Choose file" control and the current logo at its sheet size. The help as written. "Remove
    logo" outline small; "Use a link instead" as a text link that opens "Or a link to your logo"
    with the placeholder "https://yourfirm.com/logo.png". Errors ("Choose a PNG, JPEG or WebP
    picture.", "That picture couldn't be opened.", "That picture is too large. Try a smaller one.")
    in the field-error style.
  - "Main color" and "Second color" side by side (stacked on phones). Each: the native picker as a
    48 × 48 swatch with a 1 px Rule Strong border and `--chamfer` corners, the hex field 120 px in
    Mono, then the product's nine ready colors as 32 px chamfered swatches 8 px apart (`role=group`,
    accessible names their hex), the chosen one ringed 2 px Plate Ink with a 2 px white gap. Help
    "Buttons and the top of the page. Button text is white, so choose a dark color." and "Links and
    highlights. Choose a color that's easy to read on white."; the format error "Use a hex code like
    #1f4fd1." When the ink match (3.6) deepens the button color, the swatch shows a split chip: the
    chosen color on the left half and the deepened button fill on the right `[copy needed: the
    foundation's line explaining a deepened button color]`.
  - "Support email shown to clients".
  - "Public pages and website widget" as a choice row, the label Medium, the description under it
    in `help` as written.
  - "Filings offered" as a fieldset (legend in `section`), the filing titles as choice rows in two
    columns at ≥ 600 px.
  - "Save filing desk", **Brass** (this page's primary). Results at the top of the card: "Saved.
    The filing desk is at /p/‹slug›." (Done) and the errors the product returns (Problem), focus
    moving to them.
- **The preview** is the same live client-page preview the desk's Branding page shows in its large
  slot (the firm's-pages part), drawn here at 0.75 scale on a white sheet with `--e-sheet`,
  recomputing the ink match on every keystroke. The product's words: "Preview of a client's page"
  (as a 14 / 20 Graphite caption above the sheet), and inside the sheet the logo, the name ("Your
  firm" when none is typed), the Firm Rule, "Please fill in your LLC formation details." with
  "What you'll need" as a link in `--firm-ink`, and "Send for approval" in `--firm-fill`. Nothing of
  CoFile is on the sheet, as on the client page itself (decision 12). In dark mode the sheet stays
  white.
- **"Public pages and website widget"** (shown when the firm has public pages): a Sheet card titled
  in `section`, its help line, then one disclosure per filing: the summary "‹Filing title›: ‹page
  address›" with the address in Mono 15 / 22 (wrapping), opening to the widget code in a plate field
  with "Copy". 8 px between disclosures; each summary a 48 px row.
- **"Invite staff"** (h2): an email field (placeholder "name@firm.com", accessible name "Staff
  email") with "Invite" (Ink) on one row in a Sheet card. After inviting, a card: "Invite for
  ‹email›" in Medium, the link in a plate field with "Copy link", and the note "We emailed ‹email›
  this link to set their password (it works for 7 days). Then they log in with their email, to this
  firm's portal only. If email isn't set up here yet, send it to them yourself." in `help`. Errors:
  "Set up the firm's portal first.", "Enter the person's email address.", "That email already has
  an account.", "The invitation couldn't be made just now. Try again in a minute."
- **Phone:** one column, the preview after the form at full width and 0.75 scale.

### 10C.9 API keys (`/dashboard/keys`)

```
DESKTOP (narrow column, 720 px)                    PHONE (390)
┌──────────────────────────────────────────────┐   ┌──────────────────────────────┐
│ API keys                                     │   │ API keys                     │
│ Keys you create here. A key we set up for    │   │ Keys you create here. …      │
│ you isn't listed here. To revoke it, email   │   │                              │
│ hello@cofile.app. See Authentication for     │   │ [Key name, e.g. Production…] │
│ rotating keys.                               │   │ [        Create key        ] │
│ ┌──────────────────────────────────────────┐ │   │                              │
│ │ [Key name, e.g. Production server ] [Create key] │ ┌ ● Production server: …  ┐ │
│ └──────────────────────────────────────────┘ │   │ │ ┌ cofile_‹…›           ┐ │ │
│ ┌ notice · Done ● ─────────────────────────┐ │   │ │ └──────────────────────┘ │ │
│ │ ● ‹Key name›: copy this key now. It won't│ │   │ │ [         Copy         ] │ │
│ │   be shown again.                        │ │   │ └──────────────────────────┘ │
│ │   ┌ plate field ───────────────┐ [Copy]  │ │   │ ┌──────────────────────────┐ │
│ │   │ cofile_‹the whole key›     │         │ │   │ │ Production server        │ │
│ │   └────────────────────────────┘         │ │   │ │ created ‹date›           │ │
│ └──────────────────────────────────────────┘ │   │ │ Key  cofile_AbCdEfGh…    │ │
│ ┌──────────────────────────────────────────┐ │   │ │ Last used  ‹date, time›  │ │
│ │ Name          │ Key            │ Last used │ │   │ │ [        Revoke        ] │ │
│ ├───────────────┼────────────────┼─────────┤ │   │ └──────────────────────────┘ │
│ │ ‹Key name›    │ cofile_AbCdEfGh…│ ‹date›  │[Revoke]│ └──────────────────────────────┘
│ │ created ‹date›│                │         │ │
│ │ ‹Key name›    │ cofile_…       │ ▭ Revoked│ │
│ └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────┘
```

- h1 "API keys". The lede as written, with the support address as a `mailto:` link and
  "Authentication" linking to `/docs/authentication`.
- **Create row**: a Sheet card (20 px padding) holding the name field (placeholder "Key name, e.g.
  Production server", accessible name "Key name", up to 60 characters) and "Create key" (Brass) on
  one line; stacked on phones.
- **The new key** (Done notice, Dev, Priya, Marcus): "‹name›: copy this key now. It won't be shown
  again." with the name in Medium, then the whole key in a plate field with "Copy". The notice stays
  until the page is left; focus moves to its "Copy" button so a keyboard user can copy at once. The
  error "Give the key a name of up to 60 characters." or the engine's message as a Problem notice.
- **The table**: "Name" (the name, then "created ‹date›" under it), "Key" (the prefix and an
  ellipsis in Mono 15 / 22, the way the docs describe it: "cofile_AbCdEfGh…"), "Last used" (date
  and time, or "Never", or the neutral chip "Revoked"), and the action column with "Revoke"
  (Danger, small) on live keys. Revoked rows set their name and key in Graphite. Empty: "No keys
  created here yet."
- Revoking the key the session was opened with ends the session and returns to the log-in page, as
  the product does; nothing animates on the way out.

### 10C.10 Webhooks (`/dashboard/webhooks`)

- h1 "Webhooks"; the lede "The engine posts each filing event to these URLs, signed with the
  endpoint's secret. See Webhooks for verifying the signature." with "Webhooks" linking to the guide.
- When the account isn't configured: the Attention notice "Your account settings haven't been set
  up yet, so endpoints can't be saved." and nothing else.
- **Each endpoint** is a Sheet card (fieldset, 32 px padding, 24 px between cards) with its legend
  "Endpoint" or "New endpoint" in `section`:
  - "URL (https)": a saved endpoint's address is read-only (Cotton 2, Mono 17 / 24); a new one is a
    normal field with the placeholder "https://example.com/cofile/webhooks" in Mono Graphite.
  - For a saved endpoint, the help "Signing secret ends in ‹hint›. To change it, remove the
    endpoint and add it again." with the hint in Mono.
  - "Every event" as a choice row; under it the disclosure "Or only these events" (a 48 px summary
    row with a chevron) opening the event list: each event a choice row with its name in Mono
    15 / 22 Medium and, under it in `help` Graphite, the product's own line on when it fires (from
    `web/app/docs/events.ts`), two columns at ≥ 720 px of card width, one below. The list scrolls
    with the page, never inside itself.
  - For a saved endpoint, "Remove this endpoint" as a choice row at the card's foot, 16 px above a
    1 px Rule.
- Under the cards: "Add another endpoint" (outline, hidden at ten) and "Save endpoints" (Brass;
  "Saving…" while pending), on one row, right-aligned on desktop, full width and stacked on phones.
- **Results** at the top of the form, focus moving to them: "Saved." and, when new endpoints got
  secrets, "Copy each new signing secret now; it won't be shown again." with each new endpoint's
  URL in Mono `small` above its secret in a plate field with "Copy" (Done notice). Errors: the
  message in Medium and its issues as a list (Problem notice), and the offending URL field takes the
  error border.

### 10C.11 Setup (`/dashboard/setup`)

A long settings page for an enterprise account, set like a well-made form book: one narrow column
(720 px) of sections, each opened by its h2 and its explanation, with a sticky contents rail at the
right from 1280 px (Elaine, Hal). The rail lists the page's own h2s, so it needs no heading:
"Payment methods", "State portal logins", "Who's named on your filings", "Defaults per portal"
(`small` 15 / 23 links, 40 px rows, the section in view marked with the 2 px Brass Line bar on its
left). Below 1280 px the rail is not shown.

```
DESKTOP (1440: column 720, rail 320 at the right of the grid)
┌──────────────────────────────────────────────────────────────────────────────────────────────┐
│ Setup                                                                                        │
│ ┌ column, 720 ──────────────────────────────────────────┐        ┌ rail, 320, sticky ──────┐ │
│ │ Payment methods                           h2          │        │ ▌Payment methods         │ │
│ │ Your subscription and state filing fees can be paid   │        │  State portal logins     │ │
│ │ by different cards. Saved cards are held by Basis …   │        │  Who's named on your     │ │
│ │ ‹Card name› · ending ‹1234›             [ Remove ]    │        │  filings                 │ │
│ │ ‹Card name› · ending ‹5678› · subscription [ Remove ] │        │  Defaults per portal     │ │
│ │ ┌ Add a card ─────────────────────── 460 ┐            │        └──────────────────────────┘ │
│ │ │ Card number                            │            │                                    │
│ │ │ [ Card number                       ]  │            │                                    │
│ │ │ Expires        Name for this card …    │            │                                    │
│ │ │ [ MM/YY ]      [ e.g. Company Amex  ]  │            │                                    │
│ │ │ [ Save card ]                    Ink   │            │                                    │
│ │ │ Saved cards are held by Basis Theory…  │            │                                    │
│ │ └────────────────────────────────────────┘            │                                    │
│ │ ┌ routing card ─────────────────────────────────────┐ │                                    │
│ │ │ Card for your subscription  [ Choose a card ▾ ]   │ │                                    │
│ │ │ State fees                                         │ │                                    │
│ │ │ ◉ One card for every filing                        │ │                                    │
│ │ │ ○ A card for each type of filing, with a main …    │ │                                    │
│ │ │ Main card [▾]            Backup card [▾]           │ │                                    │
│ │ │ New Jersey: pay with your NJ account               │ │                                    │
│ │ │ For the filing types you tick, New Jersey's …      │ │                                    │
│ │ │ ☐ New Jersey LLC formation                         │ │                                    │
│ │ │ ☐ New Jersey corporation formation                 │ │                                    │
│ │ │ ☐ New Jersey standing certificate                  │ │                                    │
│ │ │ What's saved in your NJ account [ A card ▾ ]       │ │                                    │
│ │ │ New Jersey adds its own portal fee: $3.50 by card… │ │                                    │
│ │ │ [ Save payment settings ]                    Ink   │ │                                    │
│ │ └────────────────────────────────────────────────────┘ │                                    │
│ │ State portal logins                        h2         │                                    │
│ │ ┌ Portal ─────────────┬ Pays by ─────┬ Login ───────┐ │                                    │
│ │ │ ‹Portal name›       │ ‹pays›       │ ● Connected  │ │                                    │
│ │ │                     │              │ ‹date› by ‹…›│ │                                    │
│ │ │                     │              │ [Disconnect] │ │                                    │
│ │ │ ‹Portal name›       │ ‹pays›       │ [ Connect ]  │ │                                    │
│ │ │ ‹Portal name›       │ ‹pays›       │ Not needed   │ │                                    │
│ │ └─────────────────────┴──────────────┴──────────────┘ │                                    │
│ │ …                                                     │                                    │
│ └───────────────────────────────────────────────────────┘                                    │
└──────────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Gate.** Without enterprise access the page is only the Problem notice "This page is for
  enterprise accounts." in the narrow column. When the account isn't configured, the Attention
  notice "Your account settings haven't been set up yet, so nothing here can be saved. We'll do that
  with you first." sits under the h1.
- **Every save on this page is Ink**, because the page carries several forms; none is Brass.
- **"Payment methods"** (h2) and its explanation as written. Saved cards as a plain list of 56 px
  rows separated by 1 px Rule: "‹label› · ending ‹last4›" and " · subscription" for the
  subscription card, with "Remove" (outline, small) at the right. "Add a card" is a Sheet card
  (460 px, 24 px padding), title in `section`: "Card number" and "Expires" are Basis Theory's frames
  drawn by us like any field (48 px, Rule Strong border), their placeholders "Card number" and
  "MM/YY"; "Name for this card (optional)" with the placeholder "e.g. Company Amex"; "Save card"
  (Ink); results "Saved ‹brand› ending ‹last4›." (Done) or the product's errors (Problem); the help
  as written. Without the vault: the plain notice "Saving cards isn't turned on for your account
  yet. Email hello@cofile.app to turn it on."
- **The routing card** (Sheet, 32 px padding): "Card for your subscription" select; the fieldset
  "State fees" with its two radio rows ("One card for every filing", "A card for each type of
  filing, with a main card for the rest"); "Main card" and "Backup card" side by side; in the
  per-filing mode, one select per filing title, added with a 240 ms height ease. Selects without
  cards show "No cards yet" and are disabled; otherwise "Choose a card", then "‹label› ending
  ‹last4›". The fieldset "New Jersey: pay with your NJ account", its long help as written (the
  sentence about connecting the NJ login appears only when it isn't connected, set in the same
  help style), the three choice rows, the select "What's saved in your NJ account" ("A card", "A
  bank account (eCheck)"), and the fee help with its amounts in tabular figures. When no cards are
  saved: "No cards saved yet. Add a card, then choose which card pays for what. You can save these
  choices now and pick cards later." in `help` above "Save payment settings".
- **"State portal logins"** (h2), its explanation as written. The table: "Portal" (the portal's
  name in Medium), "Pays by" (`small`), "Login": a connected login shows the Done chip "Connected
  ‹date› by ‹person›" and "Disconnect" (outline, small) beside it; a portal that needs none shows
  "Not needed" in Graphite; Sunbiz shows "Only for a prepaid Sunbiz E-file account." before its
  Connect control. **"Connect"** is a disclosure drawn as an outline small button (accessible name
  "Connect ‹portal› login"); opening it expands a full-width row under that portal's row (the table
  cell spans all three columns) holding a 360 px form: "Username for ‹portal›", "Password",
  "Authenticator key (optional)" with the placeholder "Only if the site uses an authenticator app",
  "Save login" (Ink), the error line, and the help "Sealed as soon as it arrives and never shown
  again, here or anywhere. Only a filing run reads it." No padlock, shield or key icon (3.9); the
  words do the work. After a save the row collapses and the chip appears.
- **"Who's named on your filings"** (h2) and its line. Three Sheet cards, one per person, each a
  fieldset with its legend ("Organizer", "Filer", "Signer") in `section` and its help as written:
  "Name" (placeholder "Leave empty for none") and "Title (optional)" side by side; "Street address";
  "City", "State" (two letters, Mono, 80 px) and "ZIP" (Mono, 120 px) in a row of three. Then "Also
  send the state's copies to (optional)" with its help, and "Save" (Ink). Results: "Saved." (Done)
  or the product's errors (Problem).
- **"Your registered agent in each state"** (h3, `section`) and its line. One Sheet card per state
  ("New York" with " (optional: New York doesn't require one)" in Graphite, "New Jersey" with "Agent
  email (optional)", "Florida"): "Agent name", "Street address in ‹state›", then "Suite
  (optional)", "City", "ZIP" in a row. "Save agents" (Ink); results "Saved. Filings where you
  provide the agent name these." or the product's errors.
- **"Defaults per portal"** (h2) and its line. One compact Sheet card per portal (20 px padding),
  its name in Medium, its fields (choice rows with their help after " · " in Graphite; selects with
  "No default"; numbers in tabular Mono), and "Save" as an outline small button: these are small,
  repeated saves.
- **Phone:** one column; field rows stack; the portal-login table becomes blocks and "Connect"
  opens its form inside the block.

### 10C.12 Team (`/dashboard/team`)

- h1 "Team"; the lede "People who sign in to this dashboard with their email and password. API keys
  are managed under API keys."
- The table: "Name", "Email" (`small`), "Last signed in" (date and time, or "Not yet", Graphite).
  Empty: "No one yet."
- h2 "Add someone"; a Sheet card: "Name" and "Email" side by side, "First password" with the help
  "At least 12 characters.", and "Add" (Brass; "Adding…"). Results: "Added. Give them the password
  privately; they can sign in at the log-in page." (Done) or "That email already has an account.",
  the field issues, "That didn't save. Try again in a minute." (Problem).

### 10C.13 Password (`/dashboard/password`)

A narrow page (480 px column; the product renders it without the narrow class, and the design
gives it one).

- h1 "Password".
- A personal session gets the change form in a Sheet card: "Current password", "New password",
  "New password again", the help "At least 12 characters. Changing it signs you out on every other
  device.", "Change password" (Brass), and the result notice under it. An API-key session gets the
  product's line instead, in `body-desk` Graphite: "You signed in with an API key, which has no
  password. Team members who log in with their email can change their password here."
- **"Send filing requests by text or WhatsApp"** (when the deployment has numbers), a second Sheet
  card 32 px below, its title in `section`, in one of three states:
  - *No number*: "Your mobile number" (type tel, placeholder "212 555 0100"), "Text me a code"
    (outline), the error line, and the help "We text a code to confirm the number is yours. Messages
    from it then come to your firm's account. Message and data rates may apply."
  - *Code sent*: "The 6-digit code we texted to ‹number›" as one field 200 px wide, Mono 24 / 32
    with 0.3 em tracking so the six digits read as six, `one-time-code` autocomplete; "Confirm"
    (Ink; "Checking…").
  - *Confirmed*: "Your mobile number is ‹number›. From it, text ‹number› or send a WhatsApp message
    to ‹number› with the filing you need; we answer with a link to the form filled in from your
    message." with the numbers in Medium, and "Remove this number" (outline, small).

### 10C.14 Billing (`/dashboard/billing`)

Shown to subscribers (the platform's own account has Sign-ups instead).

```
DESKTOP (card 560 px)                                PHONE
┌────────────────────────────────────────────┐      ┌──────────────────────────────┐
│ ‹Plan› plan                  ● Active      │      │ ‹Plan› plan                  │
│                                            │      │ ● Active                     │
│ $‹amount› a month         display-m Miller │      │ $‹amount› a month            │
│ Renews ‹date›.                   (small)   │      │ Renews ‹date›.               │
│ [ Manage billing ]  (outline; "Subscribe" │      │ [      Manage billing      ] │
│ in Brass instead when not subscribed)      │      │                              │
│ Your plan pays for live filings; rehearsals│      │                              │
│ are always free. State fees aren't …       │      │ Your plan pays for live …    │
└────────────────────────────────────────────┘      └──────────────────────────────┘
```

- h1 "Billing". If billing can't be loaded: the Problem notice "Billing couldn't be loaded. Try
  again shortly."; if the account isn't billed: "This account isn't billed here." in `body-desk`
  Graphite.
- **The plan card** (Sheet, 1 px Rule, 32 px padding, 560 px): the head row "‹Plan› plan" in
  `section` and, at the right, the status chip in the product's words ("Active", "Free trial" as
  Done; "No subscription yet" as neutral; "Waiting for the first payment", "The first payment
  didn't go through", "Payment failed: Stripe is retrying", "Canceled", "Unpaid", "Paused" as
  Attention). The price line in Miller Display `display-m` 36 / 42 lining figures (a price on
  CoFile's own page is set in Miller, 5.5), with the price's name before it when it differs from the
  plan's ("‹Price name›: "), or "Price set at checkout" in `body-desk`. "Renews ‹date›." or "Ends
  ‹date›." in `small` Graphite.
- Notices inside the card as they apply: "Thanks. Stripe is confirming the payment; this page
  updates in a moment." (plain), "The last payment failed. Update the card under Manage billing."
  (Attention), "Real filings need an active subscription. Rehearsals are always free." (Attention),
  "You can't subscribe from this page yet. To ask about filing for real, email hello@cofile.app."
  (plain, with the address as a link).
- Buttons: "Subscribe" (Brass; "Opening Stripe…") when not subscribed; "Manage billing" (outline;
  "Opening…") when the account has a Stripe customer. Errors under them (Problem).
- The help paragraph as written, `help` Graphite, 24 px under the buttons.
- The price never animates; nothing celebrates a subscription (D2).

### 10C.15 Sign-ups (`/dashboard/partners`, the platform's own account only)

Where CoFile's own team decides who gets a filing desk, and later which enterprise requests become
accounts.

```
DESKTOP (wide page)
┌────────────────────────────────────────────────────────────────────────────────────────────────┐
│ Sign-ups                                                                                       │
│ New partner accounts wait here for approval. Approving opens their dashboard; nothing is       │
│ emailed, so let them know yourself.                                                            │
│ Waiting for approval                                                         h2                │
│ ┌──────────────────────────────────────────────────────────────────────────────────────────────┐ │
│ │ Firm                   │ Contact            │ States, volume │ Signed up │                   │ │
│ ├────────────────────────┼────────────────────┼────────────────┼───────────┼───────────────────┤ │
│ │ Harbor & Pine CPA      │ ‹name›             │ NJ, NY         │ ‹date›    │ [Approve] [Turn   │ │
│ │ CPA · ‹website›        │ ‹email›            │ Under 10       │           │  down]            │ │
│ │                        │ ‹phone›            │                │           │  Ink     Danger   │ │
│ ├────────────────────────┼────────────────────┼────────────────┼───────────┼───────────────────┤ │
│ │ Northgate Payroll      │ ‹name› · ‹email›   │ NJ             │ ‹date›    │ [Approve] [Turn …]│ │
│ │ Payroll                │                    │ 10 to 50       │           │                   │ │
│ └──────────────────────────────────────────────────────────────────────────────────────────────┘ │
│ Decided                                                                      h2                │
│ ┌ Firm ───────────────┬ Contact ─────────────┬ Status ──────────┐                              │
│ │ ‹firm›              │ ‹email›             │ ● Approved        │                              │
│ │ ‹firm›              │ ‹email›             │ ▭ rejected        │                              │
│ └─────────────────────┴─────────────────────┴───────────────────┘                              │
│ Enterprise requests                                                          h2                │
│ From the contact form on the landing page. Approving creates the account and emails the        │
│ person a link to set their password (it works for 7 days).                                     │
│ ┌ Company ─┬ Contact ─┬ States, volume ┬ Message ───────────────┬ Sent ──┬ Status ──────────┐   │
│ │ ‹co›     │ ‹name›   │ ‹states›       │ ‹their message, wraps │ ‹date› │ [Approve][Decline]│  │
│ │          │ ‹email›  │ ‹volume›       │  to 40 ch›            │        │  Ink     Outline  │  │
│ │ ‹co›     │ …        │ …              │ …                     │ ‹date› │ ● Approved (‹id›) │  │
│ │ ‹co›     │ …        │ …              │ …                     │ ‹date› │ ▭ Declined        │  │
│ └──────────┴──────────┴────────────────┴───────────────────────┴────────┴───────────────────┘   │
└────────────────────────────────────────────────────────────────────────────────────────────────┘
```

(Harbor & Pine CPA and Northgate Payroll stand in as pending sign-ups for layout only.)

- h1 "Sign-ups". The lede is one of the product's two lines, by mode: "New partner accounts open
  straight away, without a review." or "New partner accounts wait here for approval. Approving opens
  their dashboard; nothing is emailed, so let them know yourself."
- **"Waiting for approval"** (h2): "None." in Graphite, or the table. "Firm": the firm's name in
  Medium and, under it in `small` Graphite, its kind ("CPA", "Payroll", "CFO", "Other"; a title company shows
  nothing today `[copy needed: its label]`) and " · ‹website›". "Contact": name, email, phone on three lines. "States, volume": the states joined with
  ", " (or "—") over the volume. "Signed up": the date. Actions: "Approve" (**Ink**, small, because
  every row has one) and "Turn down" (Danger, small), 8 px apart. A decided row presses out of the
  table on the next render; nothing confirms with a stamp or a tick (D2).
- **"Decided"** (h2, only when there are any): "Firm", "Contact", "Status" with "Approved" as Done
  and any other status as the neutral chip in the product's raw word ("rejected") `[copy needed: a
  label for a turned-down sign-up]`.
- **"Enterprise requests"** (h2) with its line as written. "None yet." or the table: "Company"
  (Medium), "Contact" (name, email, phone), "States, volume", "Message" (the person's own words in
  `small`, wrapping at 40 ch, never truncated), "Sent", "Status": "Approved (‹tenantId›)" as Done
  with the id in Mono, "Declined" as neutral, or "Approve" (Ink, small) and "Decline" (outline,
  small).
- **Phone:** each request and sign-up is a block headed by the firm or company name, with its
  buttons full width at the foot.

### 10C.16 The API docs (`/docs`): the specimen book

The docs are set like a well-made technical book from the same shop (Hal's specimen book, Elaine's
"technical book, set as carefully as the Terms"): Miller Text for reading, Founders Grotesk Mono for
everything typed, the example JSON on dark plates beside the text, and one rule for rehearsal
wherever `"dryRun": true` appears.

**The frame.**

```
DESKTOP (1440)
┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
│32│ [▱Co▱] CoFile◆                                                     API docs   Dashboard  │32│  64 px, Cotton
├──────────────────────────────────────────────────────────────────────────────────────────────────┤  1 px Plate Ink
│  │ ┌ nav 240, sticky ┐  32  ┌ article, 544–720 ────────────────────┐  32  ┌ code rail 400 ───┐│  │
│  │ │ Overview        │      │ API reference                        │      │ (reference pages)││  │
│  │ │                 │      │ (display-m, Miller Display 36 / 42)  │      │ ┌──────────────┐ ││  │
│  │ │ Guides          │      │                                      │      │ │ { "tenantId":│ ││  │
│  │ │ Authentication  │      │ Send your key in [x-api-key]. Also   │      │ │   "your-ten… │ ││  │
│  │ │ Filings and the │      │ available as OpenAPI 3.1.            │      │ │   …          │ ││  │
│  │ │ lifecycle       │      │                                      │      │ └──────────────┘ ││  │
│  │ │ Filing types, … │      │ ┌ endpoint index, Cotton 2 ─────────┐ │      │                  ││  │
│  │ │ Approvals       │      │ │ Filings: Create a filing · List … │ │      │                  ││  │
│  │ │ Webhooks        │      │ └────────────────────────────────────┘ │      │                  ││  │
│  │ │ Errors          │      │                                      │      │                  ││  │
│  │ │ Saved signat…   │      │ Filings                (display-s)   │      │                  ││  │
│  │ │ White-label …   │      │ [POST] /v1/filings                   │      │                  ││  │
│  │ │                 │      │ …                                    │      │                  ││  │
│  │ │ Reference       │      │                                      │      │                  ││  │
│  │ │▌Endpoints       │      │                                      │      │                  ││  │
│  │ │   API keys      │      │                                      │      │                  ││  │
│  │ │   Account …     │      │                                      │      │                  ││  │
│  │ │ OpenAPI (JSON)  │      │                                      │      │                  ││  │
│  │ └─────────────────┘      └──────────────────────────────────────┘      └──────────────────┘│  │
└──────────────────────────────────────────────────────────────────────────────────────────────────┘
```

- **Header** (the product's TopBar), 64 px, Cotton, sticky: the lockup at 24 px tall linking to
  the home page, then at the right "API docs" (current: `aria-current`, the 2 px Brass Line
  underline) and "Dashboard", in `nav` 17 / 24, 28 px apart. Under it the 1 px Plate Ink rule.
- **Widths.** At 1440: 32 px margins, a 240 px nav, 32 px gaps, a fluid article (672 px here,
  capped at 720) and a 400 px code rail. At 1280 to 1439 the margins and gaps drop to 24 px and the
  article runs from 544 px, so the foundation's 400 px rail holds at 1280 (6.8). Prose keeps its
  68 ch measure inside the article at every width; tables use the article's full width. Above
  1488 px the frame stops growing and the margins take the rest: paper doesn't stretch.
- **The nav** (sticky 24 px under the header, scrolling inside itself only if taller than the
  screen): "Overview"; the group head "Guides" in 14 / 18 Founders Grotesk Medium Graphite, 24 px
  above its first link; the eight guide titles; "Reference"; "Endpoints"; "OpenAPI (JSON)". Links
  16 / 24 Founders Grotesk Text Plate Ink in 36 px rows (44 px on touch). The current page is Medium
  with a 2 px Brass Line bar on its left edge. Under the current page, its own h2s (or, on the
  reference, its endpoint groups) are listed as anchors in 15 / 22 Graphite, indented 12 px: an
  "on this page" list with no new heading (Greta, Hal). The anchor for the section in view is Plate
  Ink.
- **1024 to 1279:** no rail; examples sit inline (below). **600 to 1023:** the nav becomes the
  disclosure row described for phones; the article is centred at up to 720 px.

**Type in the docs.**

| Element | Setting |
|---|---|
| h1 | `display-m`: Miller Display 400, 36 / 42 (28 / 34 phone), Plate Ink, 0 to 24 px |
| Docs home lede | `lede`: Miller Text 22 / 34 (19 / 30 phone), Graphite, max 34 em |
| h2 | `display-s`: Miller Text 26 / 32 (22 / 28 phone), 48 px above, 16 px below; on hover or focus a "#" anchor in Graphite hangs 24 px into the left margin |
| Prose | `docs-prose`: Miller Text 17 / 28, 68 ch, paragraphs 16 px apart; old-style figures in running text, lining in tables |
| Run-in heads (the product's `strong`) | Miller Text Italic: "*Validation.* The request is checked against the state's rules." Miller is licensed in Roman and Italic only, and an italic run-in is the book's own way (Hal, 5.1) |
| Inline code | Founders Grotesk Mono at 0.88 em (15 px in 17 px prose), on a Cotton 2 chip, padding 1 px 5 px, 2 px radius, no border; a long path may break only after "/" |
| Ordered lists | Miller Text lining numerals with a period, hung 32 px into the margin; the Quick start's four steps use Miller Display 28 / 34 numerals in a 48 px hanging column (Elaine, Marcus) |
| Unordered lists | A 6 px Graphite en rule hung in the margin (5.4, support pages) |
| Tables | Founders Grotesk `table` 16 / 22 in a Sheet card with a 1 px Rule border, header row 14 / 18 Medium Graphite on Cotton 2; codes, statuses and event names in Mono 15 / 22 |
| Small lines ("Base URL: …", "No API key needed.") | `small` Founders Grotesk 15 / 23 Graphite (these hold Mono, so they are set in Founders) |
| Links | Plate Ink, underlined 1 px in Brass Line, 3 px offset; 2 px Plate Ink on hover (4.8) |

Inline code is the one place Miller and Mono share a line. The chip sets the code apart as an
object in the line, the way a part number sits on a tag, so the two faces never mix as type (see
the note to the lead at the end of this part).

**Code samples.**

```
┌──────────────────────────────────────────────────────────────── Plate Ink #1D2130 ┐
│ curl https://api.cofile.app/v1/filings \                                  [Copy] │  Mono 15 / 24, Night Ink
│   -H "x-api-key: $COFILE_API_KEY" -H "content-type: application/json" \          │  padding 20 / 24
│   -d '{"tenantId":"your-tenant","clientCompanyId":"acme-cpa", …                  │  radius 2 px
│ ◌    "dryRun": true}'                                                           │  ◌ ghost light, - - - dashed
│      - - - - - - - -                                                             │    underline: the rehearsal
└──────────────────────────────────────────────────────────────────────────────────┘
```

- **Ground** Plate Ink `#1D2130` in light mode; in dark mode `#0E1016` with a 1 px `#323646`
  border so the block still reads as a plate on Night. Text Night Ink `#ECE8DF` (12.9:1). Padding
  20 px 24 px (16 px 20 px on phones), `--r-sheet` corners.
- **Highlighting is typographic, not a rainbow** (Greta, with Hal's and Elaine's restraint): keys,
  keywords and literals (numbers, `true`, `false`, `null`) in Founders Grotesk Mono Medium; strings,
  values and everything else in Regular; comments in `#A9ABB5` (7.0:1). No status color and no Brass
  ever appears as syntax color, so a developer who learns the site's colors learns them once.
- **"Copy"** (the product's word) at the block's top right: an outline small button drawn for the
  dark plate (1 px `#6E7180` border, Night Ink text, 32 px tall, 48 px tap area); after a copy it
  confirms for 2 s `[copy needed: "Copied"]`.
- **Long lines never wrap**: the block scrolls sideways inside itself, with a thin `#6E7180`
  scrollbar shown on hover and focus; the block is focusable (`tabindex=0`, accessible name the
  language's code) so keyboard users can scroll it. The page never scrolls sideways.
- **Width.** On guide pages and the docs home, a block is as wide as its longest line needs, from
  the article width up to the article plus the rail's 432 px (Greta's wide code), so a `curl` line
  rarely scrolls. On reference pages, examples live in the rail.
- **The rehearsal mark** (4.4, Priya, Tomás, Elaine): wherever the literal `"dryRun": true` or the
  path `/dry-run` appears, it carries the rehearsal's own sign. In a code block: a 1.5 px dashed
  Night Ink underline (dash 4, gap 3) under the token and the 14 px ghost-light glyph in the block's
  left padding on that line (the padding grows to 36 px for blocks that hold one). In prose: the
  inline-code chip swaps its Cotton 2 fill for a Sheet fill with the 1.5 px dashed Plate Ink outline.
  Developers see a rehearsal exactly as firms do: dashed means rehearsal.
- **Print**: a print stylesheet sets code on Cotton 2 with Plate Ink text and a 1 px Rule border,
  drops the nav and the header, and prints link targets after links in the article.

**The docs home (`/docs`).**

```
ARTICLE COLUMN (1440)
┌──────────────────────────────────────────────────────────────┐
│ CoFile API                                       display-m   │
│ File state business paperwork from your own product: LLC    │ lede, Miller Text 22 / 34,
│ formations in New York, New Jersey and Florida, corporation  │ Graphite
│ formations in New York and Florida, … Not every filing type  │
│ is live yet; see What we file.                               │
│ Quick start                                      display-s   │
│ 1  Get an API key from the dashboard.                        │ Miller Display numerals
│ 2  Set up the client company (the CPA or payroll firm) and   │ hung in a 48 px column
│    its approvers with [PUT /v1/client-companies/{id}], or    │
│    email hello@cofile.app and we'll do it.                   │
│ 3  Create a filing with [┆"dryRun": true┆], then approve it  │ the rehearsal chip
│    with its [approvalLink] or [POST /v1/filings/{id}/approval]│
│    . The run walks the state site and stops before the final │
│    submit.                                                   │
│ 4  Add a webhook endpoint so you hear about each step.       │
│ ┌ code ─────────────────────────────────────────────────────┐│
│ │ curl https://api.cofile.app/v1/filings -H "x-api-key: …"  ││
│ └───────────────────────────────────────────────────────────┘│
│ ┌ For your tools and AI agents (10C.17) ─────────────────────┐│
│ └────────────────────────────────────────────────────────────┘│
│ Base URL: https://api.cofile.app. All requests and responses │ small
│ are JSON.                                                    │
│ Guides                                           display-s   │
│ ┌ Authentication ──────────┐ ┌ Filings and the lifecycle ──┐ │ 2 columns, 24 px gap
│ │ API keys, where to send  │ │ Creating a filing,          │ │
│ │ them and how to rotate … │ │ idempotency, dry runs, …    │ │
│ └──────────────────────────┘ └─────────────────────────────┘ │
│ … (eight cards)                                              │
└──────────────────────────────────────────────────────────────┘
```

- The h1 "CoFile API" (from `platformName()`), the lede as written with "What we file" as a link.
- "Quick start" (h2) and the four steps as written, each step in `docs-prose`, the codes as chips,
  `"dryRun": true` carrying the rehearsal chip. Then the `curl` block.
- The "For your tools and AI agents" panel (10C.17), then "Base URL: ‹url›. All requests and
  responses are JSON." in `small` with the URL in Mono.
- "Guides" (h2) and the eight guide cards in two columns (one on phones): Sheet, 1 px Rule, 24 px
  padding, at least 120 px tall, the title in Miller Text 22 / 28 and the summary in `small`
  Founders Graphite, 8 px apart. The whole card is the link (Hal, Dev, Priya); hover lifts it
  (`--e-lift`, 2 px); focus draws the ring around the card.

**A guide (`/docs/<slug>`).** The h1 is the guide's title; the body follows the type table above.
Specific pieces:

- *Authentication*: the two code blocks (curl and Python) stack with 16 px between them; "Rotating
  a key" and "Keep keys on your server" as h2s; the ordered steps hung.
- *Filings and the lifecycle*: the long `curl` example breaks out wide; "What happens next" as
  hung numbered steps with italic run-ins ("*Validation.*", "*Firm defaults.*", "*Completeness.*",
  "*Approval.*", "*Run.*"); the "Statuses" table with each machine status in Mono and, under it, the
  plain-language chip a firm sees for that status (the same chips as 10C.2, from
  `web/lib/status.ts`), so a developer building their own screens sees both names at once.
- *Filing types, fields and state fees*: the table's first column is the filing's title in
  Founders Medium with its summary under it in `small` Graphite; "type / state" in Mono; "Fees" in
  `small`, figures tabular.
- *Webhooks*: the request example as a code block with its headers; the two verification samples
  (JavaScript, then "The same in Python:" and Python); the "Events" table with event names in Mono
  Medium.
- *Errors*: the error JSON example, then the code table with the codes in tabular Founders Medium.
- *White-label firm portal*: the three numbered steps; beside step 1, at ≥ 1280 in the rail, the
  firm-page preview from 10C.8 at 0.6 scale with Harbor & Pine's data and its example label
  ("Example · test details · not a real firm"), so a platform's developers see where a firm's logo
  and colors will sit on the pages its clients get (Marcus's logo-bay diagram, as the real
  component).

**The reference (`/docs/reference`).**

```
REFERENCE, ≥ 1280: article + rail
┌ article ─────────────────────────────────────────┐  ┌ rail, 400, sticky in its endpoint ┐
│ ─────────────────────────────────────────────────│  │                                   │
│ [POST]  /v1/filings                  Mono 18 / 26 │  │ Body: FilingRequest     (label)   │
│                                         Medium   │  │ ┌ code ─────────────────────────┐ │
│ Create a filing. Validates the request, fills    │  │ │ { "tenantId": "your-tenant",  │ │
│ blanks from the firm's onboarding answers, …     │  │ │   "clientCompanyId": "acme-…",│ │
│ (docs-prose; the summary as an italic run-in)    │  │ │   …                           │ │
│                                                  │  │ │ ◌ "dryRun": true }            │ │
│ Body: FilingRequest                              │  │ └───────────────────────────────┘ │
│ Responses                                        │  │ [201]                             │
│ [201] ‹description›                              │  │ ┌ code ─────────────────────────┐ │
│ [200] ‹description›                              │  │ │ { "id": "f_01J…", …           │ │
│ [422] ‹description›                              │  │ └───────────────────────────────┘ │
│ ─────────────────────────────────────────────────│  └───────────────────────────────────┘
└──────────────────────────────────────────────────┘
```

- h1 "API reference"; the line "Send your key in x-api-key. Also available as OpenAPI 3.1." with
  `x-api-key` as a chip and "OpenAPI 3.1" linking to `/openapi.json`.
- **The endpoint index** (the product's `nav`, accessible name "Endpoints"): a Cotton 2 panel,
  24 px padding, one row per group: the group's name in Founders Medium 15 / 23 followed by ":",
  then the endpoint summaries as links separated by " · " in Rule Strong, `small` 15 / 23, wrapping.
- **Groups** as h2s ("API keys", "Account", "Approvals", "Client companies", "Filings",
  "Signatures", "Usage", "Webhooks", in the product's order).
- **An endpoint** opens with a 1 px Rule and 48 px of space. Its heading row: the **method chip**
  (Mono 14 / 18 Medium capitals as the data has them, 1 px Plate Ink border, `--chamfer-s`, 28 px
  tall, at least 64 px wide, centred text; one style for every method, no traffic-light colors:
  Hal, Marcus, Greta), 12 px, then the path in Mono 18 / 26 Medium. Then the summary and description
  as one `docs-prose` paragraph, the summary as an italic run-in ("*Create a filing.* Validates the
  request, …"). "No API key needed." in `small` Graphite when it applies. The labels "Query",
  "Body:" and "Responses" in 14 / 18 Founders Medium Graphite, 24 px above their content. Query
  parameters as a list of Mono names with their descriptions in Founders 16 / 22. Responses as rows:
  a **status chip** (Mono 14 / 18, 1 px Rule Strong, `--chamfer-s`) and the description.
- **At 1280 and up** the body example (captioned with its "Body: ‹type›" label) and each response
  example (captioned with its status chip) move into the rail beside the endpoint, stacked 16 px
  apart, sticky 24 px under the header while the endpoint's text scrolls past (Dev, Priya, Marcus).
  **Below 1280** each example sits where the product puts it: the body example under "Body:", each
  response example under its row.
- **Anchors**: every endpoint keeps its id; arriving at an anchor scrolls it to 24 px under the
  header and flashes nothing.

**Phone (390).**

```
┌──────────────────────────────┐
│ [▱Co▱] CoFile◆  API docs  Dashboard │ 64 px (links 15 / 22 at ≤ 360)
├──────────────────────────────┤ 1 px Plate Ink
│ Webhooks                ▾    │ 52 px disclosure: the current page's title
├──────────────────────────────┤
│ Webhooks          28 / 34    │
│ Add up to 10 https endpoints │ docs-prose 17 / 27
│ on the dashboard or with     │
│ [PUT /v1/webhook-endpoints]. │
│ ┌───────────────────────────────┐ code blocks run to the screen edges,
│ │POST /your/endpoint            │ 16 px inner padding, scroll inside
│ │content-type: application/json │
│ └───────────────────────────────┘
│ Events            22 / 28    │
│ filing.validated             │ two-column tables stack: the term in Mono,
│ The request passed …         │ its meaning under it, 1 px Rule between
│ ──────────────────────────── │
└──────────────────────────────┘
```

- The nav is a disclosure whose summary is the current page's title (no new word); it opens the
  full nav as a sheet under the row, as on the dashboard (10C.2).
- Margins 20 px; code blocks bleed to both screen edges; two-column tables (statuses, events,
  errors) stack; the filing-types table stacks its three cells.
- **Dark mode** follows the system: Night page, Night Ink prose, inline-code chips on Night 2
  `#1A1D27`, code plates on `#0E1016` with their border, Brass Line links in Brass.

### 10C.17 The AI-readable and downloadable versions

The product publishes the docs three more ways: `/docs.md` (every doc in one Markdown file),
`/openapi.json` (OpenAPI 3.1 with the FilingRequest schema and every webhook) and `/llms.txt`
(where AI agents find them). They are files, not pages, so their design is how the docs present
them and how the files themselves are set.

**On the docs home: the file shelf.** The product's line "For your tools and AI agents: all docs in
one Markdown file, OpenAPI 3.1 at /openapi.json (with the full FilingRequest schema and every
webhook) and llms.txt." sits in its own quiet panel at the end of the Quick start (Jun's row of
slips, kept to the product's one sentence):

```
┌ Cotton 2, 2 px Rule Strong left rule, 20 px padding ──────────────────────────────┐
│ For your tools and AI agents: ▤ all docs in one Markdown file, ▤ OpenAPI 3.1 at   │  small, Founders 15 / 23
│ [/openapi.json] (with the full FilingRequest schema and every webhook) and        │  ▤ = 16 px file glyph
│ ▤ llms.txt.                                                                       │
└───────────────────────────────────────────────────────────────────────────────────┘
```

- Each link is preceded by a 16 px file glyph from the icon set (a sheet with a 45° clipped corner,
  the plate's chamfer, 1.5 px Plate Ink), `aria-hidden`. Links underlined in Brass Line.
- The nav's "OpenAPI (JSON)" and the reference's "OpenAPI 3.1" link to the same file with no
  glyph.
- The HTML docs announce the Markdown version to tools that look for it:
  `<link rel="alternate" type="text/markdown" href="/docs.md">` in every docs page's head.

**The files as they open.** A browser shows `/docs.md` and `/llms.txt` as raw text in its own
monospace view and `/openapi.json` in its JSON viewer; nothing can be styled there, so the files
are written to read well raw:

| File | How it is set |
|---|---|
| `/llms.txt` (`text/plain`) | Exactly the llms.txt convention the product follows: `# ‹platformName›`, a one-line `>` summary, `## Docs`, then one `- [title](absolute URL): description` per line. Under 1 KB, absolute URLs, no HTML, no trailing spaces, UTF-8 |
| `/docs.md` (`text/markdown`, opened inline, saved as `api-docs.md`) | One heading tree: `#` for the title, `##` for each part, `###` for each endpoint as `METHOD /path`. Fenced code with its language (`bash`, `python`, `json`, `javascript`). GitHub tables kept to three columns so they stay readable in a monospace window. One blank line between blocks, prose unwrapped (agents and editors wrap it), no HTML, no images, no emoji. Straight quotes and apostrophes throughout, because people paste from it into code (the HTML docs set typographer's quotes in prose only, never in code) |
| `/openapi.json` | Pretty-printed with two-space indents, `info.title` "‹platformName› API", the public API URL as its server, so a JSON viewer shows a readable, collapsible tree |

All three are generated from the same catalog as the HTML docs, so they never disagree with it.

### 10C.18 The white-label hosted page (`/e/<account>/<firm>/<service>`)

A subscriber's firm's own page for one filing, hosted for the platform. It is the same page, the
same component and the same design as a firm's page for each filing on `cofile.app/<firm>/<service>`
(the firm's-pages part): one white sheet in the firm's brand. What is specific here is where the
platform and CoFile appear, which is nowhere but the consent line's fine print (Greta, Elaine,
Priya; decision 12).

```
DESKTOP (1440): page on --firm-wash                   PHONE (390): the sheet is the screen
┌──────────────────────────────────────────────────┐  ┌──────────────────────────────┐
│     ┌───────────────── sheet, 760 ─────────────┐ │  │ [⌂≈] Harbor & Pine CPA       │
│     │ [⌂≈] Harbor & Pine CPA                   │ │  │ ════════════════════════════ │
│     │ ═════════════════════════════════════════│ │  │ ──────────────────────────── │
│     │ ─────────────────────────────────────────│ │  │ ┆◌ This page is in rehearsal┆│
│     │ ┆◌ This page is in rehearsal for now.  ┆ │ │  │ ┆  for now. …               ┆│
│     │ ┆  You can fill it in, but nothing …   ┆ │ │  │ New Jersey LLC formation     │
│     │ New Jersey LLC formation  (firm font)    │ │  │ Certificate of Formation for │
│     │ Certificate of Formation for a domestic  │ │  │ a domestic LLC, …            │
│     │ LLC, filed online through NJ Business    │ │  │ $103.50 by card: …           │
│     │ Formation. After you send this, Harbor & │ │  │ Name                         │
│     │ Pine CPA checks every detail and fee …   │ │  │ LLC name, without the ending │
│     │ $103.50 by card: the state filing fee …  │ │  │ [__________________________] │
│     │ Name                     (legend)        │ │  │ Ending                       │
│     │ LLC name, without the ending             │ │  │ [ LLC                    ▾ ] │
│     │ [_____________________________________]  │ │  │ …                            │
│     │ Ending                                   │ │  │ [ Send to Harbor & Pine CPA ]│
│     │ [ LLC                               ▾ ]  │ │  │ Next, Harbor & Pine CPA …    │
│     │ …                                        │ │  │ By sending, you agree to …   │
│     │ [ Send to Harbor & Pine CPA ] --firm-fill│ │  │ Questions about this form? … │
│     │ Next, Harbor & Pine CPA checks it and …  │ │  └──────────────────────────────┘
│     │ By sending, you agree to CoFile's Terms …│ │
│     │ Questions about this form? Email …       │ │
│     └──────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
```

(Harbor & Pine CPA's data, from D4; the address would be `cofile.app/e/‹account›/‹firm›/llc-formation-new-jersey`.)

- **Head.** The product's top bar becomes the firm's Letterhead at the head of the sheet,
  left-aligned (a working piece, 3.5): the logo at the sheets' size (6,400 px², so Harbor & Pine's
  square symbol at 64 × 64), the typeset name in the firm's font where the logo rules call for it,
  and the Firm Rule. The product's top bar also shows "with ‹platformName›" at its right; the
  design drops it rather than moving it (decision 12; a build change), so the whole sheet belongs
  to the firm. The browser tab reads "‹Filing title› · ‹Firm›" (the product's title) with the
  firm's monogram or square crop as its icon (3.5.7).
- **The rehearsal notice**, when the filing type isn't live yet, exactly as written: "This page is
  in rehearsal for now. You can fill it in, but nothing will be filed with the state and nothing
  will be charged, now or later, even after you approve it. To file for real, contact ‹Firm›." In
  the rehearsal style (4.4): Sheet, the 1.5 px dashed Plate Ink border, the ghost-light glyph,
  `body-client` 18 / 28.
- **Title and lede.** h1 the filing's title in the firm's font 600 (`page-title` 32 / 38; 28 / 34
  phone). The lede: the filing's summary and then "After you send this, ‹Firm› checks every detail
  and fee and approves exactly what will be filed. Nothing is filed or paid until they do." (for an
  EIN: "… approves exactly what will be sent to the IRS. Nothing is filed until they do.") in
  `body-client` Graphite. The fee note in `small`, its figures tabular.
- **The form** as the firm's-pages part designs the intake form: fieldsets with their legends in
  the firm's font (`section`), labels above fields, one field per row, 640 px form column, the
  submit "Send to ‹Firm›" in `--firm-fill` with `--firm-on`, 56 px, the label in the firm's font.
- **The footnote** under the submit, as written: "Next, ‹Firm› checks it and approves the filing.
  Nothing is filed until they do." (`small`); "By sending, you agree to ‹platformName›'s Terms of
  Service; your details are handled under its Privacy Policy." (`small` Graphite, the two documents
  as links in `--firm-ink`, opening in a new tab); and, when the firm set one, "Questions about this
  form? Email ‹Firm› at ‹email›." (`small` Graphite).
- **Nothing of ours at the foot.** The sheet ends under the footnote at its usual foot padding,
  with no hairline and no mark of ours (decision 12). The consent line is the one place the
  platform's name appears ("CoFile's Terms" on CoFile's own deployment), kept as the product writes
  it and set as the form's normal fine print, as the authorization text is on the client form (the
  firm's-pages part).
- **After sending**, the form is replaced in place (a 200 ms cross-fade) by the product's result:
  "Thank you, we have your details." as an h2 in the firm's font, and "Next, the firm checks every
  detail and approves the filing. Nothing is filed or paid until it does. You can close this page."
  in `body-client`. Errors at the top of the form as Problem notices: "This page isn't available any
  more.", "Reload the page and try again.", "This page has had a lot of submissions in the last
  hour. Try again later, or contact the firm."
- **A page that doesn't exist** (wrong firm, service not offered, not public) gets the site's 404.
- **Dark mode:** the page around the sheet goes to Night; the sheet and everything on it stay as
  in light mode (4.6).
- **Phone:** the sheet is the screen: edge to edge, no shadow, 20 px padding, the Letterhead at the
  top at the phone sheet size (4,400 px², Harbor & Pine's symbol at 48 × 48).

### 10C.19 The embed widget (`embed.js` and `/embed/<account>/<firm>/<service>`)

The firm's form inside the firm's own website. It must look as if the firm's own web designer
built it (Priya): the host page is the letterhead, so the widget brings none, and it shows nothing
of CoFile (decision 12). The product's "Filed with ‹platformName›" line at its foot is dropped (a
build change).

**What the firm pastes** (shown on the firm's page in the dashboard and on the desk):
`<script src="https://cofile.app/embed.js" data-account="…" data-firm="…" data-service="…" async></script>`.
The script puts a frame titled "Filing form" right after itself: full width of its container, no
border, at least 600 px tall until the form reports its height, lazy-loaded, and resized to the
form's exact height on every change so the host page never shows a scroll bar inside a scroll bar.

```
CONTAINER 640 px (a firm's site, desktop)            CONTAINER 320 px (the same site on a phone)
┌ host page ──────────────────────────────────────┐   ┌ host page ─────────────────┐
│ (the firm's own header, words, design)          │   │ (firm's header)            │
│ ┌ frame: white #FFFFFF, no border, no shadow ──┐ │   │ ┌ frame ─────────────────┐ │
│ │ ┆◌ This page is in rehearsal for now. …   ┆ │ │   │ │┆◌ This page is in    ┆│ │
│ │ New Jersey LLC formation   (firm font 28/34)│ │   │ ││  rehearsal for now. ┆│ │
│ │ Certificate of Formation for a domestic LLC,│ │   │ │ New Jersey LLC         │ │
│ │ … Nothing is filed or paid until they do.   │ │   │ │ formation    (24 / 30) │ │
│ │ $103.50 by card: …                (small)   │ │   │ │ Certificate of …       │ │
│ │ Name                                        │ │   │ │ Name                   │ │
│ │ LLC name, without the ending   Ending       │ │   │ │ LLC name, without the  │ │
│ │ [___________________________]  [ LLC  ▾ ]   │ │   │ │ ending                 │ │
│ │ …                                           │ │   │ │ [____________________] │ │
│ │ [ Send to Harbor & Pine CPA ]               │ │   │ │ Ending                 │ │
│ │ Next, Harbor & Pine CPA checks it and …     │ │   │ │ [ LLC              ▾ ] │ │
│ │ By sending, you agree to CoFile's Terms …   │ │   │ │ …                      │ │
│ │ Questions about this form? Email …          │ │   │ │ [ Send to Harbor &   ] │ │
│ └─────────────────────────────────────────────┘ │   │ │ [ Pine CPA           ] │ │
│ (the firm's own footer)                         │   │ │ Next, … · By sending … │ │
└─────────────────────────────────────────────────┘   │ └────────────────────────┘ │
                                                      │ (firm's footer)            │
                                                      └────────────────────────────┘
```

- **No head of its own**: no logo, no typeset name, no Firm Rule, no beta notice (the product
  already leaves it off), no page ground beyond the white sheet (register 3, 2.4; Hal, Dev, Greta,
  Jun, Rosa, Elaine, Priya, Tomás, Marcus). The frame's document is pure `#FFFFFF`, square, with
  no border and no shadow, so on a white host page it reads as part of the page and on a tinted one
  as a clean white panel the firm placed there. It stays light in every theme: the host page's theme
  can't be known and the firm's colors were chosen for white (4.6).
- **Padding** 20 px (foundation 6.8), 16 px when the frame is under 360 px wide.
- **The firm's brand carries through**: the firm's font for the h1 and the fieldset legends, the
  button in `--firm-fill` with `--firm-on` and the label in the firm's font, links and focus rings in
  `--firm-ink`. Fields, labels and help are Founders Grotesk Text, as on every firm page. Only
  Founders Grotesk Text Regular and Medium and the firm's font load.
- **Sizes follow the frame, not the screen** (container queries): the h1 at 28 / 34 from 480 px of
  frame width (32 / 38 from 720 px), 24 / 30 below; the form column caps at 640 px and sits at the
  frame's left edge, aligned with the host page's own text; short fields pair (ZIP and state, the
  LLC name and its ending) from 560 px; everything is one column below. Minimum frame width 300 px
  (Hal).
- **Nothing of ours at the foot.** The widget ends on its last footnote line, with 20 px of
  padding under it. The consent line names CoFile because the product's own words do, set as the
  form's normal fine print (10C.18).
- **First paint**: the frame's page is server-rendered, so the host sees the white sheet with the
  h1 and the first fields at their final sizes as soon as the frame loads, never an empty 600 px
  box.
- **After sending**, the result replaces the form in place with a 200 ms cross-fade inside the
  frame (the frame's height never animates, so the host page doesn't slide); the frame then takes
  the result's height in one step. Build note: when the
  frame shrinks while its top is above the viewport, `embed.js` scrolls the frame's top into view
  (a small change to the script), so the visitor isn't left looking at the firm's footer.
- **Unavailable**: inside the frame, a page that doesn't exist shows the product's own line "This
  page isn't available any more." on the white sheet and nothing else, never the site's 404 with
  CoFile's header inside someone else's website.
- **Rehearsal**: the rehearsal notice as on the hosted page (10C.18).
- **No motion** beyond the interface's own (focus, the cross-fade); no View Transitions inside the
  frame.

### 10C.20 The platform surfaces at a glance

| Surface | Register | Ground | Head | Headings | Primary button | Sign of CoFile |
|---|---|---|---|---|---|---|
| Dashboard | 1, CoFile's own | Cotton; cards on Sheet | CoFile's lockup and 1 px Plate Ink rule; 52 px nav | Miller Display (h1, stats), Miller Text (h2), Founders Medium (h3) | Brass, one per screen; Ink when repeated | The lockup |
| API-key log-in | 1 | Cotton, a 480 px card | The lockup, centred | Miller Display | Brass | The lockup |
| Docs | 1 | Cotton; code on Plate Ink | Lockup, 1 px Plate Ink rule, "API docs", "Dashboard" | Miller | None (links only) | The lockup |
| `/docs.md`, `/llms.txt`, `/openapi.json` | Files | The browser's | — | Markdown headings | — | The platform name as the title |
| White-label hosted page | 3 | `--firm-wash`; one white sheet | The firm's Letterhead | The firm's font | `--firm-fill` | None: only the product's consent line names it, as fine print |
| Embed widget | 3 | White sheet in the host page | None | The firm's font | `--firm-fill` | None: only the consent line, as on the hosted page |

### 10C.21 `[copy needed]` and copy notes for 10C

**`[copy needed]`**

| Where | What |
|---|---|
| Every Copy button (new key, signing secrets, invitation link, widget code, docs code) | A short confirmation shown for 2 s after copying, e.g. "Copied" |
| A firm's page in the dashboard, color fields | The foundation's line explaining a deepened button color (3.6, D7), reused here |
| Sign-ups, "Decided" | A label for a turned-down sign-up (the product shows the raw status "rejected") |
| Sign-ups, the firm's kind | A label for a title company: the product's kind map has "CPA", "Payroll", "CFO" and "Other" but sign-up offers "Title company", which shows nothing today |
| Filings, "Type" column; the email subjects (10D) | Whether to show the desk's filing titles ("New Jersey LLC formation") instead of the engine's "NJ formation" / "NJ llc formation": existing words, but the copy owner should confirm the change |

**Copy notes** (possible slips in the locked copy, for the copy owner; the design quotes them as
they are):

- `web/app/dashboard/(app)/firms/[id]/actions.ts`: "Saved. This firm has no filing deskal now."
  reads as a typo.
- The Overview's notice: "1 approved filing is ready to pay and need a card's security code." (the
  singular takes "needs").
- Sign-ups' lede says "nothing is emailed, so let them know yourself", but approving sends "Your
  partner account is open" (`src/users/routes.ts`).
- The reply to a request sent by email says "Nothing is filed until you send it and your client
  approves." while the firm approves the proof (`src/inbound/requests.ts`).
- `/docs.md`'s section names differ from the HTML guides' ("How a filing goes" against "Filings and
  the lifecycle"); aligning them is a copy choice.
- Under decision 2 the filing desk is in CoFile's look, with the firm's name and logo as content,
  and only the firm's client pages carry its colors. Two lines still describe a desk in the firm's
  brand: the Firms lede "Give a firm its own branded filing desk, then invite its staff."
  (`web/app/dashboard/(app)/firms/page.tsx`) and the White-label firm portal guide's "Give a CPA or
  payroll firm its own branded filing portal." and "a portal on this site at /p/<slug>, in the
  firm's own name, logo and color" (`web/app/docs/guides.tsx`).

---

## 10D. Emails

### 10D.1 Two letterheads, one sheet

Every email is one sheet of letterhead, the way a firm's own letters are (Hal: "one template, two
letterheads"; Jun's sheet on a ground; Elaine's "emails are pages that arrive"). Whose letterhead
it carries follows who reads it, the way the receipts a business sends through Stripe carry the
business's brand while Stripe's own mail to the business carries Stripe's (decision 2):

- **Emails to the firm** (its approvers and staff, about its filings, its card and its account),
  emails to a subscriber's staff, and CoFile's account emails carry **CoFile's letterhead** and are
  sent as "CoFile". The firm is named in them as content, in the context line above the headline
  (10D.5), never as their letterhead.
- **Emails to the firm's clients** carry **the firm's Letterhead only** and are sent under the
  firm's name. Nothing of CoFile appears on them: no lockup, no foot line, no mark (decision 12).

The body, the button, the sizes and the build are the same in both, so one template serves every
message.

Who receives each email follows `src/comms/notifier.ts` and `src/users/routes.ts`. Several filing
emails go to whoever the filing's settings name, so the letterhead is chosen **per recipient**: the
firm's approvers and a partner firm's contact are the firm; the filing's own contact is the client.
The notifier already sends each recipient a separate copy; the template is told which side the
recipient is on (10D.2).

| Email (subject as the product sends it) | Sent when | On CoFile's letterhead, sent as "CoFile" | On the firm's Letterhead, sent as the firm | Button |
|---|---|---|---|---|
| "Your proof is ready to approve: ‹filing›" | `filing.awaiting_approval` | The firm's approvers | The filing's contact, only when the firm has no approvers (a platform's own client, approving its white-label proof) | "Open your proof" |
| "Completed: ‹filing›" (documents back; carries the EIN on the CP 575's row) | `filing.completed` | The firm, when its "documents go to" setting includes it | The filing's contact, when that setting includes the client | "Open" (the filing page, when the firm has a desk), on the firm's copy only |
| "Card security code needed: ‹filing›" | `filing.card_code_needed` | The card's owner: the firm for its own card, the subscriber's staff for the subscriber's | Never | "Enter security code" |
| "More information needed: ‹filing›" | `filing.information_required` | The approvers, when the firm must act | The filing's contact when there are no approvers: the request for details | none |
| "Changes requested: ‹filing›" | `filing.changes_requested` | The approvers | The filing's contact when there are no approvers | none |
| "Rejected by the state: ‹filing›" | `filing.rejected` | As "Completed" | As "Completed" | none |
| "You're invited to ‹firm›'s filing portal" | A person at a firm is invited | That person | Never | "Set my password" |
| "Ready to check: ‹subject of their email›" | A firm's staff member emails in a request | That person | Never | "Open" |
| EIN issued (the fallback; its words `[copy needed]`, 10D.8) | An EIN was issued but the CP 575 wasn't saved | As "Completed" | As "Completed" | "Open", on the firm's copy only |
| "Choose a name: …", "Review before submit: …", "Site changed — review needed: …", "Portal bot check: …", "Failed: …", "Blocked: …", "Checking whether the state received: …" | The engine's problem and review events | The filing company's admin channels (the subscriber's staff) | Never | "Choose a name", "Review the filing", or none |
| "Filing by email works from a firm's portal" | A non-firm user emails in a request | That person | Never | none |
| "Confirm your email for CoFile" | Sign-up | The person signing up | Never | "Confirm my email" |
| "Reset your password" | A reset is asked for | The account's email | Never | "Choose a new password" |
| "Your partner account is open" | A partner sign-up is approved | The new partner | Never | "Log in" |
| "Your CoFile account is ready" | An enterprise request is approved | The new enterprise user | Never | "Set my password" |

**A client link** isn't sent by CoFile today: on Client links the firm copies it, or sends it from
its own mail app ("Email it from your mail app", `web/components/ClientLinkForm.tsx`), so it
already reaches the client from the firm. If CoFile ever sends it, it is an email to a client, on
the firm's Letterhead.

The filing company's notices go to the subscriber's own staff, never to a firm or its clients
(`renderMessage` marks them `admin`), so they carry CoFile's letterhead, with the firm named in the
context line above the headline (10D.12; decision 33).

**Sender and reply** (decision 37).

- **On CoFile's letterhead**: From "CoFile <filings@cofile.app>" (the verified sending domain, as
  the product sends today), Reply-To the support address.
- **On the firm's Letterhead**: the From display name is the firm's name as its desk shows it
  ("Name shown on the filing desk", else its name), so the inbox row a client sees first reads
  "Harbor & Pine CPA". Reply-To is the firm: its "Support email shown to clients", or, when it set
  none, its contact's email (a partner firm's contact, else its approvers), so a client's reply
  never comes to CoFile. The From address is at the **firm's own email domain once the firm
  connects one** in Setup (a new step on the desk's Setup, in the firm's-pages part; its words are
  `[copy needed]`), used only once that domain's sending records are verified. Until then the
  email goes from CoFile's sending address, `filings@cofile.app`, still under the firm's name.

```
THE INBOX ROWS (Apple Mail, desktop)
THE FIRM'S INBOX: an email to the firm
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│ CoFile                                                                         ‹time›     │
│ Your proof is ready to approve: NJ llc formation: Two Sisters Bakery LLC                  │
│ Your proof is ready. Open the link to see every detail and every fee, exactly as …        │  ← the preheader
└───────────────────────────────────────────────────────────────────────────────────────────┘
THE CLIENT'S INBOX: an email to the firm's client (a filing with no approvers)
┌───────────────────────────────────────────────────────────────────────────────────────────┐
│ Harbor & Pine CPA                                                              ‹time›     │
│ More information needed: NJ llc formation: Two Sisters Bakery LLC                         │
│ Before we can file, we still need: ‹missing items›. Please send these details to …        │
└───────────────────────────────────────────────────────────────────────────────────────────┘
```

### 10D.2 The build

**Survives every client** (Greta, Dev, Marcus): tables for layout (`role="presentation"`),
inline styles plus one `<style>` block for the phone and dark-mode rules, live text for everything
that carries meaning, VML for Outlook's buttons, nothing essential in an image, and every message
readable with images off.

| Part | Spec |
|---|---|
| **Ground** | The firm's Letterhead: `--firm-wash` (Bond `#F5F5F2` when the firm has no color), the mill tint under every firm sheet (3.5). CoFile's letterhead: Cotton 2 `#F3F0E8`. 24 px above and below the sheet on desktop |
| **Sheet** | 600 px wide, `#FFFFFF`, a 1 px Rule `#DDD7CB` border (for clients that drop the ground), square corners, no shadow. Padding 32 px at the sides and head (the ceremonial head margin, 3.5), 40 px at the foot. Content width 536 px |
| **Phone** (≤ 480 px, by media query; Gmail's apps honour it) | The sheet goes edge to edge: no ground, no border, 20 px padding, as the proof does on a phone (6.8) |
| **Heading face** | The firm's Letterhead: the firm's font when it is one of the Google presets, loaded with a `<link>` (Apple Mail, iOS Mail, Samsung Mail and Outlook for Mac show it), then `-apple-system, "Segoe UI", Helvetica, Arial, sans-serif`: never Georgia, never Times, as on the web (3.7). CoFile's letterhead: `--font-email-head` (Georgia, "Times New Roman", serif) |
| **Body face** | `--font-email-body` (`-apple-system, "Segoe UI", Helvetica, Arial, sans-serif`). Values set in Mono use the foundation's mono fallback (`ui-monospace, "SF Mono", Menlo, Consolas, monospace`). Miller and Founders are not loaded in mail |
| **Sizes** | Headline 26 / 32 (24 / 30 on phones), 600 on the firm's Letterhead, 400 Georgia on CoFile's; the filing-title line 18 / 26 500 Graphite; body 17 / 27 Plate Ink `#1D2130`; `small` 15 / 23 Graphite `#555867`; buttons 18 / 24 600. Nothing a person needs is under 15 px except the 14 px Mono URLs |
| **Spacing** | Letterhead to headline 32 px (to the context line, on CoFile's letterhead); headline to body 24 px; paragraphs 16 px apart; body to button 32 px; button to link fallback 16 px; last block to CoFile's foot 40 px; on the firm's Letterhead the sheet ends 40 px under the last block |
| **Links in text** | `--firm-ink` underlined on the firm's Letterhead; Plate Ink underlined on CoFile's |
| **Button** | One per email, left-aligned with the text: a letter, not a poster. A bulletproof table cell 56 px tall, padding 16 px 28 px, min-width 240 px, `--firm-fill` with `--firm-on` on the firm's Letterhead, Brass `#D9A84A` with Plate Ink on CoFile's (7.4:1); 3 px radius, the `--chamfer` fallback (6.4). Outlook for Windows gets a VML `v:roundrect` 56 px tall and 280 px wide, `arcsize="6%"`, no stroke, the label centred. Full width on phones. The label is the product's `linkLabel`, or "Open" |
| **Link fallback** | Under the button: "Or paste this link into your browser:" in `small` Graphite, then the URL in Mono 14 / 20 Graphite, `word-break: break-all` |
| **Preheader** | The body's first sentence as hidden preview text (Hal: no new words), padded with zero-width spaces so clients don't pull in the letterhead's text. For a rehearsal, that first sentence is the rehearsal line, so the inbox shows it before the email is opened |
| **Images** | PNG at 2× with `width` and `height` set, `display:block`, `border:0`. Every image has the alt text given below; decorative ones `alt=""`. Under 60 KB of images in any email; no background images |
| **Accessibility** | `<html lang="en">`; the wrapper `role="article"` with `aria-roledescription="email"` and the subject as its `aria-label`; one real `<h1>`; the reading order is the source order; body text is 16:1 and Graphite 7.0:1 on the white sheet, and the firm's links and button labels reach at least 4.5:1 through the ink match (3.6) |
| **Plain text** | Every email has a designed plain-text part (10D.17) |

**Structured parts.** Today `renderEmail` receives one block of prose. The design needs a few
parts lifted out of it: the rehearsal line, the list of missing items, the change-request comment,
the documents and their EIN, the state's review-page attachment, the state reference, the support
line and the business name and filing title. `src/comms/render.ts` already holds each of these as
data; the build passes them to the template as fields beside the same words (a build change, not a
copy change). Two more fields go with each recipient's copy: which side the recipient is on (the
firm or its client), which chooses the letterhead, the sender, the Reply-To and whether the desk
link is kept, and the firm's name for the context line.

### 10D.3 The firm's letterhead in mail

It heads only the emails that reach the firm's clients (10D.1). Centred: emails are ceremonial
pieces (3.5, 5.4). Everything below the Letterhead is set flush left for reading, and nothing
closes the sheet: it ends 40 px under its last block, with nothing of CoFile on it. The Branding
page's preview of an email to a client (the firm's-pages part) is this sheet.

```
┌──────────────────────────── sheet, 600 ─────────────────────────────┐
│                                32                                   │
│                            ┌────────┐                               │
│                            │  ⌂≈    │   logo, 56 × 56 (5,000 px²)   │
│                            └────────┘                               │
│                                12                                   │
│                        Harbor & Pine CPA     24 / 30, firm font 600 │
│                                20                                   │
│  ═══════════════════════════════════════════════════════════════   │  3 px --firm
│                                                                     │  2 px white
│  ───────────────────────────────────────────────────────────────   │  1 px --firm-2
│                                32                                   │
│  (headline)                                                         │
```

- **The logo** is sized by area (3.5): 5,000 px², height clamped to 28 to 56 px, at most 260 px
  wide. Harbor & Pine's square symbol is 56 × 56; Northgate Payroll's wide wordmark about 32 px
  tall; Best Accounting's about 30 px.
- **The white plate, baked in.** The server renders each firm's processed logo to a PNG on a white
  plate: 12 px of white around the trimmed logo, its corners cut at 45° like the Name Plate (3.5.6).
  On the white sheet the plate is invisible; in a mail app that forces dark mode (which recolors
  backgrounds and text but never images), the logo still sits on the white it was made for (Hal,
  Priya, Dev, Marcus, Tomás). A logo uploaded on its own solid tile is used as uploaded.
- **The typeset name**, by the logo rules (3.5): beside a square or mid logo, or alone when there is
  none (30 / 36, 24 / 30 on phones), set 12 px below the logo, centred, in the heading face at 600,
  Plate Ink, wrapping to two balanced lines when long and never truncated. The italic ampersand
  appears when the firm's font loads and has an italic (Lora does); in the fallback sans it is
  roman. Credentials ("CPA", "LLC") at 88% size with +0.04 em tracking.
- **Alt text**: `alt=""` on the logo when the name is typeset beside it; the firm's name when it
  isn't (a wide logo), styled inline (20 px, 600, Plate Ink) so a client with images off still sees
  the name, set as text, at the head of the letter.
- **The Firm Rule** as three table rows the full content width, 20 px under the name: 3 px
  `--firm`, 2 px white, 1 px `--firm-2`, each row `font-size:0; line-height:0` with
  `mso-line-height-rule: exactly`, so Outlook draws them at exactly 3, 2 and 1 px. A very pale main
  color adds the fourth 1 px row in `#E6E7EA` under the 3 px line (3.5).

### 10D.4 CoFile's letterhead in mail

It heads every email to the firm, to a subscriber's staff and every account email (10D.1), the same
for every firm.

```
┌──────────────────────────── sheet, 600 ─────────────────────────────┐
│                                32                                   │
│                           ╱‾‾‾‾‾‾‾‾╲                                │
│                           │(⊖)Co(⊖)│      the stacked lockup,       │
│                           ╲________╱      96 × 56 PNG, Plate Ink    │
│                             CoFile                                  │
│                                20                                   │
│  ───────────────────────────────────────────────────────────────   │  1 px Plate Ink
│                                32                                   │
│  Confirm your email for CoFile               Georgia 26 / 32        │
```

- The **stacked lockup** (3.3), centred, a 2× PNG drawn at 96 × 56 CSS px in Plate Ink, the
  lozenge in the letters' color (outside CoFile's own pages it never takes Brass Line, 3.3). Alt
  "CoFile", styled inline in Georgia 22 px Plate Ink for images-off.
- 20 px, then CoFile's letterhead rule: 1 px Plate Ink, the full content width.
- The headline in Georgia 26 / 32 (24 / 30 on phones), Plate Ink: mail on CoFile's letterhead is
  the only mail set in a serif, the email-safe stand-in for Miller.
- **The foot**: a 1 px Rule, 16 px, then the Shell's own line "CoFile · the filing desk behind your
  firm" in `small` Graphite, and the support line when the email has one (10D.5).

### 10D.5 Shared parts

**The context line** (CoFile's letterhead only). Every email about a filing that carries CoFile's
letterhead names the firm the filing belongs to in a line above the headline: the firm's name from
the filing, `small` 15 / 23 600 Graphite, 32 px under the letterhead rule and 8 px above the
headline, data only, no logo. It is 10D.12's construction (decision 33), used on every filing email
to the firm too, the way the proof's head names the firm and its client as text. The firm's
Letterhead needs none: it already names the firm.

**The headline block.** The subject is the headline (Hal, Greta, Dev). Where the subject joins a
phrase and a filing with ": ", the two halves are set on two lines without changing a character:
the phrase with its colon at 26 / 32 in the heading face, then the filing title at 18 / 26 500
Graphite, 4 px below, both inside one `<h1>`. A subject with no filing in it ("You're invited to
Harbor & Pine CPA's filing portal") is one line.

**The rehearsal band** (4.4; Jun's dashed band, Greta's panel). When the filing is a rehearsal, the
product's first line, "Rehearsal: nothing will be filed or paid, even if you approve.", is lifted
into a band 24 px under the headline: white, a 1.5 px dashed Plate Ink border (Outlook draws it at
2 px), padding 14 px 16 px, the 14 px ghost-light glyph (a 2× PNG, `alt=""`) and the sentence in
16 / 24 600 Plate Ink, 10 px apart. Never colored, never on a non-rehearsal.

**The support line.** Where the product ends a body with "Questions? Email ‹address›." (the
filing company's notices and CoFile's account emails), that paragraph moves into the foot, in
`small` Graphite, with the address as a `mailto:` link.

**The value plate.** A value the reader will copy or keep (an EIN) sits in a plate: Cotton 2 fill,
1 px Rule Strong border, 3 px radius, padding 12 px 16 px, the label in `small` Graphite and the
value in Mono 600 with lining tabular figures and +0.02 em tracking. The dashboard's plate field
(10C.2), without a button.

**The document row.** A 64 px row between 1 px Rules: a 24 × 32 document glyph (a 2× PNG of
CoFile's own document card, a plain sheet with a 45° clipped corner and three grey text bars in
Graphite line, never a facsimile of any state's or the IRS's paper, 3.9; `alt=""`), 16 px, then
the document's name in 17 / 24 600 Plate Ink.

### 10D.6 The proof is ready ("Your proof is ready to approve: …")

The email that matters most: it asks the firm for its yes. It looks like the head of the proof it
opens (Hal's proof card): CoFile's letterhead, the firm named in the context line and the client's
business as the card's title, as the proof itself names them (decision 2).

```
DESKTOP (600)                                                PHONE (390)
┌──────────────────────── ground: Cotton 2 ────────────────────┐   ┌──────────────────────────────┐
│ ┌────────────────────────── sheet ─────────────────────────┐ │   │       (stacked lockup)       │
│ │                   (the stacked lockup)                   │ │   │ ──────────────────────────── │
│ │ ──────────────────────────────────────────────────────── │ │   │ Harbor & Pine CPA            │
│ │ Harbor & Pine CPA                     small 600 Graphite │ │   │ Your proof is ready to       │
│ │ Your proof is ready to approve:          Georgia 26 / 32 │ │   │ approve:          24 / 30    │
│ │ NJ llc formation: Two Sisters Bakery LLC         18 / 26 │ │   │ NJ llc formation: Two        │
│ │ ┌┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┐ │ │   │ Sisters Bakery LLC           │
│ │ ┆ ◌ Rehearsal: nothing will be filed or paid, even if  ┆ │ │   │ ┌┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┐ │
│ │ ┆   you approve.                    (rehearsals only)  ┆ │ │   │ ┆ ◌ Rehearsal: nothing …   ┆ │
│ │ └┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┘ │ │   │ └┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┘ │
│ │ Your proof is ready. Open the link to see every detail   │ │   │ Your proof is ready. Open    │
│ │ and every fee, exactly as they'll go to the state, then  │ │   │ the link to see every detail │
│ │ approve it or ask for changes. Nothing is filed or paid  │ │   │ and every fee, …             │
│ │ until you approve. The link expires, so please look      │ │   │ ┌──────────────────────────┐ │
│ │ soon. Don't forward this email: anyone with the link can │ │   │ │ Two Sisters Bakery LLC   │ │
│ │ open your proof.                          17 / 27        │ │   │ │ New Jersey LLC formation │ │
│ │ ┌ proof card ──────────────────────────────────────────┐ │ │   │ │ ◆ Ready to approve       │ │
│ │ │ Two Sisters Bakery LLC            ◆ Ready to approve │ │ │   │ │ Total to the state       │ │
│ │ │ New Jersey LLC formation                             │ │ │   │ │ ............... $103.50  │ │
│ │ │ ──────────────────────────────────────────────────── │ │ │   │ └──────────────────────────┘ │
│ │ │ Total to the state .......................  $103.50  │ │ │   │ [     Open your proof      ] │
│ │ │                                             ═══════  │ │ │   │ Or paste this link into …    │
│ │ └──────────────────────────────────────────────────────┘ │ │   │ ┌ review page ─────────────┐ │
│ │ [ Open your proof ]   Brass, 56 px                       │ │   │ │  (thumbnail, 100%)       │ │
│ │ Or paste this link into your browser:                    │ │   │ └──────────────────────────┘ │
│ │ https://‹host›/approve/‹token›          Mono 14 Graphite │ │   │ Attached is a picture of …   │
│ │ ──────────────────────────────────────────────────────── │ │   │ ──────────────────────────── │
│ │ ┌ 160 ──────┐  Attached is a picture of the state's own  │ │   │ CoFile · the filing desk …   │
│ │ │ review    │  review page, filled in with your details; │ │   └──────────────────────────────┘
│ │ │ page      │  every value on it is also listed as text  │ │
│ │ │ thumbnail │  on the proof. When we file, we go ahead … │ │
│ │ └───────────┘                              small 15 / 23 │ │
│ │ ──────────────────────────────────────────────────────── │ │
│ │ CoFile · the filing desk behind your firm                │ │
│ └──────────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────────┘
```

(D4's example data. The link's path is a placeholder.)

- **The context line** "Harbor & Pine CPA", then the **headline**: "Your proof is ready to
  approve:" / the filing title.
- **The rehearsal band**, on rehearsals only.
- **The body**, one paragraph exactly as written.
- **The proof card** (Hal), 24 px under the body: white, 1 px Rule, padding 20 px 24 px. The
  client's business name in Georgia 22 / 28 Plate Ink (as `proof-title` heads the proof itself),
  the filing type title under it in `small` Graphite, and at the right the Your-turn chip "Ready to
  approve" in CoFile's form, as on the dashboard and the desk (Ochre `#855A0C` text 14 / 18 600 on
  Ochre Tint `#F7EDD8`, the ◆ lozenge in Ochre, square-cut corners in Outlook). On phones the chip
  drops under the title. The card is not a link; the button is the one way in. The event already
  carries the proof's fee lines, so the card adds one row: "Total to the state" with dot leaders
  and their sum at 18 / 26 tabular, the single rule above it and the double rule under it, exactly
  as the proof sets it ("$103.50" in D4's example). Money never moves, in mail as anywhere.
- **"Open your proof"** in Brass, then the link fallback.
- **The state's review page**, when attached ("State review page.png"): 32 px, a 1 px Rule, 24 px,
  then a 160 px-wide thumbnail of the attachment shown inline (the same file, referenced by its
  content id, 1 px Rule frame, alt "State review page.png", not a link) beside the product's
  paragraph ("Attached is a picture of the state's own review page, filled in with your details;
  every value on it is also listed as text on the proof. When we file, we go ahead only if the state
  shows exactly this page again; if anything is different, we stop before paying.") in `small`
  Graphite. On phones the thumbnail spans the width above the paragraph (Jun, Elaine, Priya). It is
  the state's real page, sent to the firm as the product's own record, so it is shown as it is,
  never redrawn.
- **CoFile's foot** (10D.4).
- **To the filing's contact** (a filing with no approvers, whose proof is a platform's white-label
  proof, 10D.1), the same sheet is set on the firm's Letterhead and sent under the firm's name: the
  firm's heading face at 600, no context line, the chip in the firm's Your-turn form (1 px
  `--firm-ink` border, `--firm-ink` text, the ◆ in `--firm`), "Open your proof" in `--firm-fill`,
  and nothing after the review page.

### 10D.7 Documents back ("Completed: …"), with the EIN

The papers come home (the foundation's moment 5), so this is the one filing email with a picture:
the engraved vignette of a returned envelope (D1, kind 4), in Plate Ink line like the blank plate
on CoFile's welcome emails, on the firm's copy (decision 35). The firm's copy is on CoFile's
letterhead; the client's copy, when the firm sends documents to its client, is on the firm's
(10D.1).

```
DESKTOP (600)
┌──────────────────────────────── sheet ─────────────────────────────────┐
│                         (CoFile's letterhead)                          │
│ Harbor & Pine CPA                                   small 600 Graphite │
│ Completed:                                          Georgia 26 / 32    │
│ NJ llc formation: Two Sisters Bakery LLC            18 / 26 Graphite   │
│                                                                        │
│ This filing is complete (state reference ‹reference›).    17 / 27,     │
│                                                           ref in Mono  │
│                          ┌────────────┐                                │
│                          │  ✉ ⟋ (the  │   engraved vignette, 120 × 80, │
│                          │  envelope) │   Plate Ink line, alt ""       │
│                          └────────────┘                                │
│ Documents:                                                15 / 23 600  │
│ ────────────────────────────────────────────────────────────────────   │
│ [▤]  Certificate of Formation                             17 / 24 600  │
│ ────────────────────────────────────────────────────────────────────   │
│ [▤]  CP 575 EIN confirmation letter                                    │
│      ┌ value plate ─────────────────────┐                              │
│      │ EIN  00-0000000                  │   Mono 28 / 34 600, tabular  │
│      └──────────────────────────────────┘                              │
│ ────────────────────────────────────────────────────────────────────   │
│ They're attached. You can also download them from the filing page.     │  small, Graphite
│ [ Open ]                                                    Brass      │
│ Or paste this link into your browser: …                                │
│ ────────────────────────────────────────────────────────────────────── │
│ CoFile · the filing desk behind your firm                              │
└────────────────────────────────────────────────────────────────────────┘
```

(D4's example documents and EIN. The formation document's name comes from the state's file.)

- **The context line**, then the **headline**: "Completed:" / the filing title.
- **The body's first paragraph** as written: "This filing is complete (state reference
  ‹reference›)." with the reference in Mono inside the sentence (5.5), or "This filing is
  complete." when there is none.
- **When documents came back**: the envelope vignette, centred, 24 px below the body, then
  "Documents:" in `small` 600 Graphite and one document row per document, in the product's order,
  named by the product's labels.
- **The EIN** (decision 34): when the documents include the IRS's CP 575, its row carries a value
  plate under the name: "EIN" and the number in Mono 28 / 34 600 (24 / 30 on phones), the largest
  figure in the email, because a firm and its client will use that number for as long as the
  business lives (Greta, Elaine). The number is read from the filing record, beside the letter that
  proves it. If an EIN was issued but the CP 575 wasn't saved, this email has no row to carry it,
  and the fallback (10D.8) sends the number on its own.
- **After the list**, in `small` Graphite, the product's closing words: "They're attached.", "‹n›
  more is too large to attach." or "‹n› more are too large to attach." when some didn't fit, and
  "You can also download them from the filing page." when the firm has a desk.
- **When nothing has come back yet**: the product's "The state's documents will follow once it
  sends them." as a body paragraph, with no vignette and no list.
- **"Open"** in Brass (the product's default label; a better one is listed in 10D.18) to the filing
  page on the firm's desk, when there is one; otherwise no button. Then CoFile's foot.
- **The client's copy** is the same sheet on the firm's Letterhead, sent under the firm's name:
  the same headline, body, document rows and EIN plate, and nothing of CoFile. It has no vignette
  (the engravings belong to CoFile's letterhead, decision 35), and no button and no "You can also
  download them from the filing page.", because the filing page is on the firm's desk, which a
  client can't open (a build change: the notifier adds both for every recipient today).
- **Phone**: the vignette at 96 × 64; the plate full width.

### 10D.8 EIN issued (the fallback)

The product has the status "EIN issued" and the engine emits `filing.ein_filed`, but no email for
it and no words (Hal, Dev, Greta, Jun, Rosa, Tomás, Amara, Marcus and Priya all found the same).
The EIN normally reaches the firm in the documents-back email, on the CP 575's row (10D.7). This
stand-alone email is the fallback (decision 34): it goes out only when the EIN was issued but the
IRS's letter wasn't saved, which shouldn't happen, so the firm is never left without the number.

```
┌──────────────────────────────── sheet ─────────────────────────────────┐
│                         (CoFile's letterhead)                          │
│ Harbor & Pine CPA                                   small 600 Graphite │
│ [copy needed: the headline]                               26 / 32      │
│ NJ llc formation: Two Sisters Bakery LLC                  18 / 26      │
│ [copy needed: the body, one or two sentences]             17 / 27      │
│ ┌ value plate, full content width ─────────────────────────────────┐   │
│ │ EIN                                                   small      │   │
│ │ 00-0000000                          Mono 36 / 44 600, tabular    │   │
│ └──────────────────────────────────────────────────────────────────┘   │
│ [ Open ]                                                    Brass      │
│ Or paste this link into your browser: …                                │
│ ────────────────────────────────────────────────────────────────────── │
│ CoFile · the filing desk behind your firm                              │
└────────────────────────────────────────────────────────────────────────┘
```

- Subject, headline and body `[copy needed]`; the EIN plate at its largest (36 / 44, 28 / 34 on
  phones), the one thing the email carries besides its words. No document row: the letter is what's
  missing. "Open" to the filing page on the firm's desk, when there is one, then CoFile's foot.
- **When it is sent**: once, when a filing completes with an EIN on its record (from
  `filing.ein_filed`) and no CP 575 among its documents, right after the documents-back email and to
  the same recipients (10D.1). A filing whose CP 575 was saved never sends it.
- **The client's copy**, when the documents go to the client: the firm's Letterhead, no button, as
  in 10D.7.

### 10D.9 Card security code needed ("Card security code needed: …")

```
┌──────────────────────────────── sheet ─────────────────────────────────┐
│                         (CoFile's letterhead)                          │
│ Harbor & Pine CPA                                   small 600 Graphite │
│ Card security code needed:                                             │
│ NJ llc formation: Two Sisters Bakery LLC                               │
│ This filing is approved and ready to pay the state with ‹card›. A      │
│ card's security code (the 3 or 4 digits on the card) isn't saved with  │
│ the card, so we need you to enter it once: log in and open Ready to    │
│ pay with the button below. Every filing waiting for this card then     │
│ goes ahead. We keep the code for an hour at most, then delete it.      │
│ Never reply to this email with the code.                               │
│ ┌ card slip ───────────────────────────────────────────────────────┐   │
│ │ ‹Card name› ending ‹1234›                       ◐ Ready to pay   │   │
│ └──────────────────────────────────────────────────────────────────┘   │
│ [ Enter security code ]                                     Brass      │
│ Or paste this link into your browser: …                                │
│ ────────────────────────────────────────────────────────────────────── │
│ CoFile · the filing desk behind your firm                              │
└────────────────────────────────────────────────────────────────────────┘
```

- **Always CoFile's letterhead** (decision 2): the card's owner is the firm (its own card) or the
  subscriber's staff (the subscriber's own), never a client. The context line names the firm the
  filing belongs to. A firm's card: the button opens the desk's Ready to pay; the subscriber's own
  card: the dashboard's (10C.6).
- **The body** as written, the card's name in 600 where it appears in the sentence.
- **The card slip** under the body: white, 1 px Rule, padding 16 px 20 px, the card's name and last
  four in 17 / 24 600 and the Attention chip "Ready to pay" (◐, Ochre `#855A0C` on Ochre Tint, the
  status color every surface shares). No card artwork, no brand logo, no padlock.
- **"Enter security code"** in Brass, then the fallback link and CoFile's foot.
- Nothing in the email asks for the code; the only field for it is on the Ready to pay page.

### 10D.10 More information needed ("More information needed: …")

- **By recipient** (10D.1): to the firm's approvers, when the firm must act, on CoFile's
  letterhead with the context line; to the filing's contact, as the request for details, on the
  firm's Letterhead only, under the firm's name.
- Headline "More information needed:" / the filing title.
- The body is the product's sentence with its list set as a list (Hal, Priya): "Before we can file,
  we still need:", then each missing item's label on its own line (17 / 27, a 7 px lozenge hung
  16 px into the margin, 8 px between items: Ochre on CoFile's letterhead, a list waiting on the
  reader as on Ready to pay, 10C.6; `--firm` on the firm's), then "Please send these details to
  whoever is preparing this filing for you. Nothing is filed or paid until then."
- No button (the product sends no link).

### 10D.11 Changes requested, and Rejected by the state

Both follow the recipient (10D.1): CoFile's letterhead with the context line for the firm, the
firm's Letterhead only for a client. The settings below are the same on both.

**"Changes requested: …".** The body's sentence opens the email, "We received your change
request:", then the comment as a quote: 17 / 27 italic in the body face, Plate Ink, with a 3 px
Rule Strong left border, 16 px inner padding and typographer's quotes, 16 px above and below; then
"Nothing has been filed. If the filing is corrected, you'll get a new link to approve." With no
comment the sentence is "We received your change request." and there is no quote. No button.

**"Rejected by the state: …".** The body as written ("The state rejected this filing: ‹reason›
Nothing more will be filed until it's corrected and sent again. Contact whoever prepared this filing
for you to fix it."), with a 2 px Madder `#9A2D2D` left rule beside the paragraph and 16 px padding:
the error construction every firm page uses (3.6), so the problem is marked by a rule and words, not
by a red banner, an icon or the firm's own red (Northgate Payroll's Ember). No button.

### 10D.12 The filing company's notices, and replies to requests sent by email

The engine's review and problem notices go to the subscriber's staff, the people who run the
filings, on **CoFile's letterhead** (10D.1). Above each headline, a context line names the firm the
filing belongs to, in `small` 600 Graphite: the firm's name from the filing, data only.

```
┌──────────────────────────────── sheet ─────────────────────────────────┐
│                         (CoFile's letterhead)                          │
│ Harbor & Pine CPA                                   small 600 Graphite │
│ Review before submit:                               Georgia 26 / 32    │
│ NJ llc formation: Two Sisters Bakery LLC            18 / 26 Graphite   │
│ The filing reached the review screen (beta). Review the captured       │
│ screen and approve to submit.                                          │
│ [ Review the filing ]                               Brass, 56 px       │
│ Or paste this link into your browser: …                                │
│ ────────────────────────────────────────────────────────────────────── │
│ CoFile · the filing desk behind your firm                              │
│ Questions? Email hello@cofile.app.                  small, Graphite    │
└────────────────────────────────────────────────────────────────────────┘
```

| Subject | Body (as written) | Button | Mark |
|---|---|---|---|
| "Choose a name: …" | "The requested name is unavailable. Open the link to pick an available alternative or enter one." | "Choose a name" | — |
| "Review before submit: …" | "The filing reached the review screen (beta). Review the captured screen and approve to submit." | "Review the filing" | — |
| "Site changed — review needed: …" | "The state changed its website, so this filing stopped before it was submitted. …" | none | 2 px Ochre left rule |
| "Blocked: …" | "The filing is blocked: ‹blockers›" | none | 2 px Ochre left rule |
| "Checking whether the state received: …" | "We can't yet tell whether the state received this filing. …" | none | 2 px Ochre left rule |
| "Portal bot check: …" | "The state portal showed a bot check that did not clear on its own (‹error›). Nothing was submitted. …" | none | 2 px Madder left rule |
| "Failed: …" | "The filing failed: ‹error›" | none | 2 px Madder left rule |

- Error details that the engine passes (an error string, a list of blockers) are set in Mono
  15 / 23 inside the sentence, so a technical message reads as quoted data.
- The appended "Questions? Email hello@cofile.app." becomes the support line in the foot.

**Replies to a request sent by email.** "Ready to check: ‹subject›" goes to the firm's staff member
who sent it, on **CoFile's letterhead** with the context line naming the firm (the link opens their
own desk, which is in CoFile's look): the product's reply ("We got your request. Open the link to
see the form filled in from your message, check every answer, add what's missing, and send it. …")
and "Open" in Brass. "Filing by email works from a firm's portal" goes to a subscriber's user, on
**CoFile's letterhead**, body only: "Sending a filing request this way works
for people who sign in to a firm's filing portal. Start the filing from your dashboard, or through
the API." Both thread under the person's own message (the same subject line), so they read as
answers.

### 10D.13 Sign-up and verification ("Confirm your email for CoFile")

```
DESKTOP (600)                                              PHONE (390)
┌──────────────────── ground: Cotton 2 ──────────────────┐ ┌──────────────────────────────┐
│ ┌──────────────────────── sheet ─────────────────────┐ │ │          (lockup)            │
│ │                   (the stacked lockup)             │ │ │ ──────────────────────────── │
│ │ ────────────────────────────────────────────────── │ │ │ Confirm your email for       │
│ │ Confirm your email for CoFile        Georgia 26/32 │ │ │ CoFile          24 / 30      │
│ │ Confirm that ‹email› is your email to finish       │ │ │ Confirm that ‹email› is your │
│ │ setting up the partner account for Harbor & Pine   │ │ │ email to finish setting up … │
│ │ CPA. The link works for 7 days.                    │ │ │ [     Confirm my email     ] │
│ │ If you didn't sign up, ignore this email.          │ │ │ Or paste this link into …    │
│ │ [ Confirm my email ]     Brass, Plate Ink text     │ │ │ ──────────────────────────── │
│ │ Or paste this link into your browser: …            │ │ │ CoFile · the filing desk     │
│ │ ────────────────────────────────────────────────── │ │ │ behind your firm             │
│ │ CoFile · the filing desk behind your firm          │ │ └──────────────────────────────┘
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

- CoFile's letterhead, the headline "Confirm your email for CoFile", the body's two paragraphs as
  written (the firm's name as typed at sign-up, in 600), "Confirm my email" in Brass, the fallback
  link, the foot.
- No picture: the first email a new firm gets is short and plain, so it is read and pressed. The
  link opens the verification page, whose button press (not the click) confirms, as the product
  does.

### 10D.14 Password reset ("Reset your password")

CoFile's letterhead, the headline "Reset your password", the body as written ("Someone asked to
reset the password for the CoFile account ‹email›. Open the link below within 60 minutes to choose
a new one. It works once." and "If this wasn't you, ignore this email: your password stays the
same."), "Choose a new password" in Brass, the fallback link, the foot. No picture, ever: password
emails stay plain on purpose (Rosa). It is CoFile's letter even for a firm's staff member, because
the account is a CoFile account.

### 10D.15 Invitations and welcomes

**"You're invited to ‹firm›'s filing portal"** is an invitation to work on the firm's filing desk.
The ten designers gave it the firm's Letterhead; the desk is now in CoFile's look (decision 2), and
the email goes to a person at the firm, so it carries **CoFile's letterhead** and is sent as
"CoFile", with the firm named in its subject and body: the one-line headline, the body as written
("‹person› has given you access to ‹firm›'s filing portal. Open the link below to choose your
password; it works for 7 days. Then log in with this email." or "You've been given access …"),
"Set my password" in Brass, the fallback link and CoFile's foot. No picture.

**"Your partner account is open"** and **"Your CoFile account is ready"** welcome a new customer,
on **CoFile's letterhead**, with the second of the two pictures CoFile's mail carries (10D.7 has
the envelope): the engraved vignette of the **blank Name Plate** (D1, kind 4), 160 × 64 CSS px,
Plate Ink line on white, centred 24 px under the letterhead rule, `alt=""`. The plate waits for
their name: the shop's promise, one picture, no words added (Hal).

```
┌──────────────────────────────── sheet ─────────────────────────────────┐
│                          (the stacked lockup)                          │
│ ────────────────────────────────────────────────────────────────────── │
│                         ╱‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾╲                             │
│                         │(⊖)          (⊖)│   the blank plate vignette, │
│                         ╲________________╱   160 × 64, Plate Ink line  │
│ Your partner account is open                        Georgia 26 / 32    │
│ Your account for Harbor & Pine CPA is approved. Log in with the email  │
│ and password you chose. Then set up your filing desk in three short    │
│ steps: your firm, your branding and how state fees are paid. You can   │
│ try a practice filing right away.                                      │
│ [ Log in ]                                          Brass              │
│ Or paste this link into your browser: …                                │
│ ────────────────────────────────────────────────────────────────────── │
│ CoFile · the filing desk behind your firm                              │
│ Questions? Email hello@cofile.app.                                     │
└────────────────────────────────────────────────────────────────────────┘
```

- "Your CoFile account is ready" is the same sheet with its own words: "Welcome, ‹name›. The
  enterprise account for ‹company› is set up. Open the link below to choose your password; it works
  for 7 days." and "After that you can add your team, API keys and webhooks from the dashboard.",
  and "Set my password" in Brass.
- Phone: the vignette at 128 × 52.

### 10D.16 Dark mode and the mail clients

Every email stays paper in dark mode: the sheet is white and everything on it keeps its light-mode
colors, because the firm's logo and colors were chosen for white paper (4.6). Only the ground
around the sheet goes to Night.

- The head declares `<meta name="color-scheme" content="light dark">` and
  `<meta name="supported-color-schemes" content="light dark">`, and the `<style>` block's
  `@media (prefers-color-scheme: dark)` rule changes only the ground (to Night `#14161E`) and
  restates the sheet's white and every text color, so clients that honour it never invert anything.
- For Outlook.com and the new Outlook, the same restatements are repeated under `[data-ogsb]` and
  `[data-ogsc]` selectors.
- For clients that force their own dark mode (Gmail's apps, Outlook for Windows in dark), the design
  is built to survive: the logo carries its baked white plate; the headline and every value are
  live text that the client re-inks legibly; the Firm Rule's table rows and the button
  keep a color the client may shift but never lose; nothing depends on an image's background.

| Client | Dark mode | What the reader sees |
|---|---|---|
| Apple Mail (macOS, iOS) | Honours our rules | Night ground, white sheet, exact colors |
| Outlook for Mac | Honours our rules | As Apple Mail |
| Outlook.com, new Outlook | Partial inversion, overridden by the `data-og*` rules | White sheet held in most cases; where not, ink text stays dark-on-light inside the logo plate |
| Gmail web | No dark rendering of the message | Light, as designed |
| Gmail iOS and Android | Forced full inversion | Dark sheet, light text, the logo on its white plate, the button shifted but readable |
| Outlook for Windows (2016 to 365) | Partial inversion; VML buttons | Square-ish VML button at 56 px; the plate keeps the logo on white |
| Yahoo, AOL, Samsung Mail | Mixed | The baked plate and live text carry it |

Test every email in this matrix before launch, with images on and off, at 100% and 200% text size,
and with a screen reader (VoiceOver on iOS Mail, NVDA with Outlook).

### 10D.17 The plain-text part

Every email ships a plain-text part with the same words in the same order (Elaine, Greta, Rosa):
the letterhead's name on the first line ("CoFile", or the firm's name on the firm's Letterhead), a
blank line, the context line on CoFile's letterhead, the headline (both halves on their own lines),
a blank line, the rehearsal line when there is one, the body's paragraphs, the list items each on
its own line led by "- ", the button's label on its own line with the link on the next, and on
CoFile's letterhead the foot's line (and the support line, when there is one) at the end. An email
on the firm's Letterhead ends with its last paragraph or link: nothing of CoFile follows.

```
CoFile

Harbor & Pine CPA
Your proof is ready to approve:
NJ llc formation: Two Sisters Bakery LLC

Rehearsal: nothing will be filed or paid, even if you approve.

Your proof is ready. Open the link to see every detail and every fee, exactly as they'll go
to the state, then approve it or ask for changes. Nothing is filed or paid until you approve.
The link expires, so please look soon. Don't forward this email: anyone with the link can
open your proof.

Open your proof
https://‹host›/approve/‹token›

CoFile · the filing desk behind your firm
```

Lines are left unwrapped in the file (mail clients wrap them); the wrap above is for this page.

### 10D.18 `[copy needed]` and copy notes for 10D

**`[copy needed]`**

| Where | What |
|---|---|
| EIN issued (10D.8), the fallback sent only when the IRS letter wasn't saved | Its subject, headline and body |
| Setup on the filing desk, the new step that connects the firm's own email domain (the firm's-pages part designs the step; 10D.1 depends on it) | Its words: the step's title, its explanation, its field labels and help, its results and errors |
| "Completed: …" (10D.7) | Optional: a button label for the filing page; the product's default "Open" is used until then |
| Every filing email's subject and its headline's second line | Whether the filing title uses the desk's titles ("New Jersey LLC formation") instead of the engine's "NJ llc formation" (also in 10C.21) |

**Copy notes.** The product's link fallback "Or paste this link into your browser:" is 13 px in
`src/comms/resend.ts`; the design sets it at 15 px (the floor for a line of more than six words).
The reply to an emailed request says "your client approves" (10C.21). "More information needed"
and "Rejected by the state" have one body each, written to a client ("Please send these details to
whoever is preparing this filing for you.", "Contact whoever prepared this filing for you to fix
it."), but they go to the firm's approvers whenever the firm has them (`src/comms/notifier.ts`), and
now on CoFile's letterhead; the copy owner may want a firm's version of each sentence.

---

## Notes on this part

- **Miller and Mono on one line in the docs.** Foundation 5.3 sets docs prose in Miller Text, and
  5.5 says Miller never shares a line with Founders or Mono. The docs' prose carries inline code in
  almost every paragraph, so 10C.16 keeps Miller Text and sets every piece of inline code as a
  Cotton 2 chip, an object in the line rather than mixed type, and sets the docs' small lines,
  tables and reference lists (which hold more code than prose) in Founders. If you would rather
  keep 5.5 absolute, the docs' prose moves to Founders Grotesk Text 17 / 28 and Miller stays for the
  docs' headings only; nothing else in this part changes.
- **The code rail at 1280.** 6.8's 240 + 720 + 400 px does not fit a 1280 px window with margins.
  10C.16 keeps the rail from 1280 by letting the article run from 544 px to 720 px and narrowing the
  margins and gaps to 24 px below 1440.
- **Who the "admin" notices go to.** Several designers put the filing company's notices ("Choose a
  name", "Review before submit" and the rest) in the firm's letterhead, but `renderMessage` sends
  them to the subscriber's own staff, never to a firm. They are on CoFile's letterhead, with the
  firm named in the context line, as the owner confirmed (decision 33); decision 2 now puts every
  email to the firm there too.
- **Emails split by recipient (a build change).** The notifier renders one message per event and
  sends the same words to every recipient. 10D.1 needs each copy to know whether its recipient is
  the firm (an approver, a partner firm's contact, a card's owner, a staff member) or the firm's
  client (the filing's contact), and to pass that to the template, which then picks the letterhead,
  the sender name, the From address (the firm's own domain once it is connected and verified) and
  the Reply-To, and, on a client's copy of documents back, leaves off the desk link and its line
  (10D.7). The stand-alone EIN email is new engine work too, as the fallback in 10D.8.
- **The stage track on the dashboard.** 10C.5 gives the dashboard's Filings the desk's stage track
  under each status chip, so the two ledgers read alike; the dashboard's page
  (`web/app/dashboard/(app)/filings/page.tsx`) doesn't render it yet. "Sent by" stays the desk's:
  the dashboard's column names the firm.
