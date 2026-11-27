# Spanish typesetting review: brief for a Spanish-speaking typographer

Weeks are counted from the start of our build (week 1).

## Who we are

CoFile (cofile.app) is a filing service for accounting, payroll, fractional-CFO and title firms.
Firms use it to file state business filings for their clients, such as LLC formations, payroll
registrations and EINs, under the firm's own brand. A firm works in our filing desk. Its clients see
pages and emails in the firm's own name, logo, colors and font, mostly on their phones.

## What we need

We need a Spanish-speaking typographer to review every page and email we set in Spanish before
launch. We want an expert eye on how the Spanish is set:

- hyphenation;
- accents and other diacritics, in every font we use;
- line lengths and line breaks;
- punctuation, including the opening ¿ and ¡;
- numerals and currency;
- headlines, status labels and the price card;
- the firms' own fonts.

We are asking for a typesetting review, not a translation. If any wording reads wrong, please flag
it.

### Why Spanish, and what is set in it

The design is built to be read in Spanish as well as English:

- **Space for longer text.** Spanish runs 20 to 30% longer than English, so no button, status label,
  navigation link or table cell has a fixed width. We also test every page with a test language that
  makes each string 35% longer.
- **Accented names on every page.** Client names and addresses carry Spanish accents, such as
  "Lucía" and "Muñoz", whatever language the page is in. So every font must have the accented
  letters.
- **Spanish-speaking users.** Our accessibility sessions include Spanish-speaking clients over 60,
  who use our forms in Spanish.
- **Values stay as the state needs them.** Values that go to a state agency are kept exactly as that
  agency needs them, whatever language the page is in. One example is a business name in capitals,
  "TWO SISTERS BAKERY LLC".

The design names the places where Spanish changes how a page is set (see "Where Spanish changes the
setting" below). Which pages and emails ship in Spanish at launch is still to be decided:
[owner to confirm: the pages and emails that ship in Spanish at launch].

## Scope

### Pages

Review whichever of these ship in Spanish:

- **The public site:** the home page and its nine sections, How it works, For firms, What we file,
  Pricing, Security, Questions, For platforms, sign-up and the other account pages, Terms and
  Privacy, page not found and the error page.
- **The filing desk:** every page, including its navigation row and phone menu, status labels and
  the five-step track.
- **The proof** (the page where a firm approves each filing), in every state.
- **Client pages:** the firm's page for each filing, the client link page, the intake form and its
  states.
- **The white-label pages and the website widget** that firms embed on their own sites.
- **The dashboard and the API documentation.**
  [owner to confirm: whether the dashboard and the documentation ship in Spanish].

**The product pictures on the home page.** The design isn't consistent on whether these switch to
Spanish. One part says they are live pages that switch language along with the page. Others say
they keep the example firm's English desk and pages. [owner to confirm: which]. We will tell you
before the review starts.

### Emails

Review both letterheads:

- **CoFile's letterhead:** emails to the firm and CoFile's own account emails.
- **The firm's letterhead:** emails to the firm's clients, under the firm's name.

We will give you the list of emails that ship in Spanish. [owner to confirm: whether emails ship in
Spanish at launch]. Emails use system fonts:

- Georgia for CoFile's headlines;
- a system sans-serif (Apple's system font, Segoe UI, Helvetica or Arial) for the body;
- the firm's own web font for headlines on the firm's emails, in the mail apps that load it.

### Fonts to check

Check every face with á é í ó ú ü ñ, the accented capitals Á É Í Ó Ú Ñ, and ¿ ¡ « » “ ” ‘ ’:

| Role | Font | Styles used |
|---|---|---|
| Headlines, prices, page titles | Miller Display | Roman, Italic, Semibold (Semibold only in our temporary wordmark) |
| Introductory paragraphs, subheads, long reading | Miller Text | Roman, Italic, Bold (Bold on Terms and Privacy only) |
| Everything read, filled in or pressed | Founders Grotesk Text (20 px and below) and Founders Grotesk (21 px and above) | Regular, Medium |
| Values as they go to the state, references, code | Founders Grotesk Mono | Regular, Medium |
| Fallbacks while web fonts load, or if they fail | Georgia, Times New Roman, Helvetica Neue, Arial, the system font; for mono, the system's monospace fonts (SF Mono, Menlo, Consolas) | As above |
| A firm's name and headings on its client pages | The firm's choice: the device's own font, Inter, IBM Plex Sans, Roboto, Open Sans, Lato, Montserrat, Source Serif, Merriweather, Lora, or a font file the firm uploads | 400 and 600 |

**How we load the fonts.**

- Our fonts are cut down to Latin and Latin Extended-A, keeping kerning, ligatures, the figure
  styles, case-sensitive forms, small capitals and fractions. Please check that nothing Spanish is
  lost in that cut.
- Each firm font is scaled to match the x-height of Founders Grotesk Text. Please check that accents
  still sit well after the scaling.
- When a firm uploads a font, we check it for á é í ó ú ü ñ ¿ ¡. A font that lacks them is used for
  the firm's name only, and the firm sees a short note (its words are still being written).
- If a firm font lacks a letter in a string, that whole string falls back to Founders Grotesk.

**The engraving.** At the end of our home page and on sign-up, a visitor types their firm's name
and it engraves into a brass plate. The letters are in Miller Display, with an italic "&" and
credentials such as "CPA" in small capitals. It accepts Latin and Latin Extended-A. Please try it
with Spanish names such as "Muñoz".

### Where Spanish changes the setting

The design asks for these, and we want you to judge them:

- **Headlines.** In English, two-sentence headlines break one sentence per line. In Spanish,
  headlines use balanced wrapping instead, and may take a third line on desktop.
- **Accented capitals at the largest size.** Accented capitals (Á É Í Ó Ú Ñ) must clear the line
  above. The tightest case is the home page headline: 72 px type on a 76 px line. Please test every
  headline slot with long strings that open with ¿ or ¡ and carry accented capitals.
- **Opening ¿ and ¡** hang into the margin at display sizes, as opening quotation marks do.
- **Hyphenation** is automatic on Spanish body text only. Headlines, names, buttons and the proof's
  values are never hyphenated.
- **Kickers and buttons** may wrap to two lines. They grow in height and never shrink below their
  minimum size. (A kicker is the short line above a headline.)
- **Status labels** are 14 px. The desk's 13 px step line (in English, "Proof, step 2 of 5") wraps
  whole and is never cut mid-word or truncated.
- **Navigation.** The public header moves its links into the menu below 1240 px wide in Spanish
  (1100 px in English). The desk's navigation row switches to the phone menu when its links no
  longer fit.
- **The price card.** Its dot leaders shrink to make room for longer items. When less than 40 px of
  leader would remain, the right-hand item drops under the left.
- **Sentence case** everywhere. Nothing is set in all capitals except values a state receives in
  capitals, which use the case-sensitive forms.
- **Line length.** Paragraphs run 60 to 68 characters a line, introductory paragraphs at most 34 em,
  and captions up to 72 characters.

### Numerals, currency, dates and punctuation

The design sets these rules in English and doesn't yet say how they work in Spanish. We want your
recommendation for Spanish-speaking readers in the United States:

- **Figures** are lining and tabular in every table, fee, date, status label and price. Old-style
  figures appear only inside Miller running text. Do these hold in Spanish?
- **Money** is in US dollars. The design writes "$103.50", and every amount on the proof shows cents.
  At large sizes, the "$" is set at 60% of the figure's size, raised to cap height and hung in the
  margin. What decimal mark, thousands separator and "$" placement should Spanish pages use? Plan
  prices such as "$1,000" are an example.
- **Dates and times** are written "Dec 1, 2026" and "5:00 PM Eastern" in English. What should the
  Spanish forms be?
- **Quotation marks and apostrophes.** The design uses typographer's apostrophes and quotation marks
  (’ “ ”). Should Spanish use « » or “ ”?
- **Separators.** The design uses en dashes in ranges, and a middot as a separator ("Harbor & Pine
  CPA · Two Sisters Bakery LLC").

## Standard or criteria

A page or email passes when all of these hold:

1. Every accented letter and mark renders in its intended font and weight, with no clipping, no
   collision with the line above, and no fallback to another font in the middle of a word.
2. Hyphenation follows standard Spanish orthography (the Real Academia Española's *Ortografía* is
   our reference). It appears only on body text.
3. No bad breaks occur: no widows in headlines, no stranded short words where you judge them wrong,
   and no button, status label or kicker shrunk or truncated.
4. ¿ and ¡ appear wherever they are needed, and hang correctly at display sizes.
5. Numbers, money, dates and quotation marks follow the rules you recommend, consistently.
6. Line lengths stay within the measures above.
7. Values that go to the state are left exactly as entered.

## Deliverables

1. **Annotated captures** of every page and email reviewed, with each issue marked.
2. **An issue list** that gives, for each issue:
   - where it is (the page, state or email, and the screen width);
   - what's wrong;
   - its severity: wrong (it changes meaning or is unreadable), poor (a real typesetting fault) or
     polish;
   - the fix, marked as a style fix, a wording fix or a font problem.
3. **A short Spanish style sheet for CoFile:** numbers, money, dates, times, quotation marks,
   hyphenation, and words never to hyphenate.
4. **A table of each firm preset font and each fallback font,** showing whether it covers Spanish
   fully, and anything that looks wrong.
5. **A recheck of the fixes,** before launch.

## Timing

The review takes place in the final passes before launch, in weeks 13 to 15:

- **Early in week 13:** the first review.
- **Before launch:** a recheck of the fixes.

[owner to confirm: the review dates].

## What we provide

- Staging links with Spanish switched on, and a list of every page and state.
- The Spanish text as it will ship. [owner to supply: the Spanish copy, or who is translating it].
- Captures of each email in the main mail clients, from our email-testing service.
- Test firm accounts:
  - one for each preset font;
  - one with an uploaded font that lacks accents;
  - one with a long Spanish firm name.
- Long Spanish test strings for the headline slots.
- The font list above.
- A contact: [CoFile contact].

You review on our staging site in your own browser. We don't send font files, because our licenses
don't allow it.

## Rights, privacy and consent

- Every page uses fictional example data only. No real firm, client or person appears.
- Staging links and captures are confidential until launch.
- We own the style sheet and the issue list you deliver, and may use them in our own guidelines.

## To quote

Please send back:

1. A price for the review and the recheck. If you price by page, tell us so: we will send the page
   and email count when the Spanish set is final.
2. Your timeline for each.
3. Your experience setting Spanish for the screen, and for readers in the United States.
4. A sample of similar review work, if you can share one.

**Spec references:** 08-components-and-production.md 12.4, 13.1 (fonts and component workshop rows),
13.4 (row 14), 13.5 (phase 8); 01-foundation.md 3.5, 3.7, 5.1 to 5.5; 03-home-page-top.md 9.0 and
the Spanish rows of 9.1 to 9.4; 04-home-page-bottom.md 9.8, 9.9; 06-firm-pages-and-the-proof.md
10B.7.2, 10B.28; 07-platforms-and-emails.md 10D.2; BUILD-PLAN.md A.18, C.13.
