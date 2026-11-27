# Building pages in the merged design

How to build a page of the Plate & Proof redesign (`docs/design-specs/merged/`) in this app. Read
`web/design/README.md` first for tokens, registers, fonts and the ink match.

## The rules that don't bend

- **The copy is locked.** Use the words in the live pages (`app/**`, `components/**`) and in the
  spec's quoted copy exactly. Never invent marketing words. Where the spec says `[copy needed]`,
  use a short neutral stand-in and add it to the "Stand-in words in the build" table in
  `docs/design-specs/merged/COPY-NEEDED.md`.
- **The owner's decisions** (`docs/design-specs/merged/DECISIONS.md`) override anything older in
  the parts. Among them: CoFile's look on everything a firm uses, the firm's brand alone on
  everything its clients see; no "with CoFile" anywhere a client looks; one Brass button per screen;
  no photographs of CoFile's people for now; the owner's photography in place of the shoot.
- **One Brass button per screen** on CoFile's pages. On the public site, mark a page's own Brass
  "Run a free rehearsal" with `data-brass-cta` so the header's copy stays an outline and the phone
  bar stays away while it is on screen. A Brass button drawn inside a picture doesn't count.
- **No invented text in pictures**: Rule bars where the copy gives no words (spec D1.1).
- **Never color alone**: status always has a glyph and words (`components/ui/glyphs.tsx`, `Chip`).

## Where things are

| Need | Use |
|---|---|
| CoFile's public page frame (beta slip, header, phone menu and bar, footer) | `components/site/SiteShell.tsx` |
| The desk and dashboard frame (lockup, account label, nav, phone menu sheet) | `components/shell/AppShell.tsx` |
| A page a firm's client sees, in the firm's brand | `components/ClientPage.tsx` |
| The mark and lockup | `components/shell/Lockup.tsx`, `NamePlate.tsx` |
| Buttons (`action` is Brass in CoFile's look, the firm's fill on its pages; `ink`, `outline`, `quiet`, `danger`) | `components/ui/Button.tsx` (`.btn2 .is-action` …) |
| Chips and status, the stage track | `components/ui/Chip.tsx`, `components/StageTrack.tsx` |
| Fields | `components/ui/Field.tsx`; the filing form in `.intake2` (`styles/components/intake.css`) |
| Sheets, Letterhead, Firm Rule, notices (slips) | `components/ui/Sheet.tsx` |
| A live preview of a firm's client page | `components/desk/ClientPagePreview.tsx` |
| Photographs with their sizes, and the plate's box for the typed name | `lib/photography.ts` (files in `public/cofile/photography/`) |
| Type sizes as classes | `styles/type.css` (generated from `design/tokens.json`) |
| Tokens and registers | `styles/tokens.css`, `styles/registers.css` (read semantic tokens: `--page`, `--surface`, `--text`, `--text-2`, `--line`, `--action`, `--link`, …) |
| The component gallery | `/design` and `/design/site` (with `DESIGN_GALLERY=true`) |

Put a page's own styles in a new file under `styles/components/`, inside `@layer components { }`,
and import it from the page. Don't edit shared files (`components/ui/*`, the shells, `tokens.css`,
`registers.css`, `app/layout.tsx`, `app/globals.css`) without a reason you state in the commit; if a
shared piece needs a change, prefer a local variant.

## Checking your work

1. `npx tsc --noEmit -p .` and `npm test` in `web/`.
2. Build and serve: `ENGINE_API_URL=http://127.0.0.1:8080 PORTAL_SESSION_SECRET=<32+ chars> DESIGN_GALLERY=true npx next build && npx next start -p <port>`.
3. Screenshot every page you touched at 390 and 1440 wide, light and dark, full page, with Playwright
   (`require('playwright')` works from any directory; `chromium.launch()`), and look at them. Check
   for horizontal overflow (`document.documentElement.scrollWidth > innerWidth`) and console errors.
4. The licensed fonts are in git only as a sealed bundle (the repository is public). For true screenshots, open it with
   the key: `LICENSED_FONTS_KEY=<key> node scripts/licensed-fonts.mjs unpack` (see `public/fonts/README.md`).
5. Pages that need data need the engine: `PORT=<port> API_KEYS=<24+ char key>:acme STAFF_API_KEYS=<key>:ops@acme APPROVAL_SIGNING_SECRET=<32+ chars> npx tsx src/index.ts`
   from the repo root (in-memory store); seed with the API (`x-api-key` header).
6. Run the automated checks below before you push; CI runs them on every change.

## The automated checks

CI's `site-checks` job (`.github/workflows/test.yml`) builds the site and runs four checks against the production
build, with an in-memory engine beside it for the desk. Each runs locally with one command from `web/`, after
`npm run build` (and `npm ci` at the repository root, for the desk's pages). They start `next start` on port 3303 (and
the engine on 8093) themselves, or use what is already listening there; `CHECKS_BASE_URL` points them at another server.

| Command | What it checks | Time |
|---|---|---|
| `npm run check:a11y` | axe-core, WCAG 2.2 A and AA, on every public page, the design gallery and the desk (Filings, New filing, a filing), at 390 and 1440, light and dark. A serious or critical finding fails (`tests/a11y.spec.ts`, with the rules of `scripts/a11y-check.cjs`) | about 45 s |
| `npm run check:visual` | Full-length screenshots of every public page and the gallery, light at 320, 390, 834 and 1440 and dark at 390 and 1440, against the baselines in `tests/visual/linux`. Also fails a page that scrolls sideways (`tests/visual.spec.ts`) | about 40 s |
| `npm run check:pseudo-locale` | The +35% pseudo-locale (merged spec 12.4): every text on every public page made 35% longer, at 390 and 1440; fails on sideways scroll, clipped text, text running out of its box, text over text, and button labels that no longer fit (`tests/pseudo-locale.spec.ts`) | about 15 s |
| `npm run check:perf` | The performance budgets (merged spec 13.1): each route's script before idle (gzip, from the build), the photographs' sizes, and Lighthouse's mobile profile on the public pages for largest paint, layout shift and fonts (`tests/perf/budgets.mjs`; it installs its own Lighthouse into `tests/perf` the first time) | about 75 s |
| `npm run check:site` | The first three in one run, as CI does | about 1.5 min |

**The screenshots** are taken at half resolution (a 1440 page is a 720 px image) with the photographs masked to grey
boxes, with reduced motion, other hosts refused and the fonts pinned (`tests/fonts.conf`: Liberation and DejaVu only),
so one Ubuntu machine draws exactly what another does. They are made with the stand-in fonts, as in CI: a build with
the licensed fonts is refused.

**Updating the baselines** after a change that is meant to look different:

- On Ubuntu 24.04 with `fonts-liberation`, `fonts-dejavu-core` and `fonts-dejavu-mono` (CI's machine): `npm run build`,
  then `npm run check:visual:update`. It redraws only the pictures that changed and re-encodes them losslessly (about
  half the bytes). Look at each changed PNG before you commit it.
- Anywhere else (a Mac draws text differently): push, and let CI draw them. A failing `site-checks` run uploads the
  redrawn pictures as the `visual-baselines` artifact: `gh run download <run id> -n visual-baselines -D web/tests/visual/linux`,
  look at them, commit.

On a failure the run's `site-checks-report` artifact holds Playwright's report with each difference, the pseudo-locale's
full-page screenshot of what broke, and the performance report.

**Known and held.** A finding that sits in a shared file and can't be fixed in the change at hand is listed rather than
left failing: the desk's dark-mode contrast (a `test.fixme` in `tests/a11y.spec.ts`), `tests/pseudo-locale.known.ts`,
and the budgets the tree is already over (`OVER_TODAY` in `tests/perf/budgets.mjs`, held at today's level so they
can't get worse). Remove the entry, or lower the ceiling, with the fix.

**Link-preview cards.** Every public page has an `opengraph-image.tsx` beside it, drawn at build time by
`lib/share-card.tsx` from the page's own kicker and h1 (`lib/share-cards.ts`; `npm test` checks they still match the
pages). The licensed Miller and Founders Grotesk are used when the build has them (`scripts/card-fonts.mjs` decodes
them from WOFF2 into `node_modules/.cache`, never committed or served), Liberation otherwise. Client pages (`/i/…`,
`/<firm>/<service>`, `/e/…`, `/embed/…`) have their own neutral card with the firm's name only (`lib/client-card.tsx`).
