# Running the remaining walks with the recorder

Three walks need a person: they need a login, an SSN, or an address the sites accept.
The recorder opens a normal browser window. You click through; it saves every screen
(screenshot, page HTML, field list, page text) and **blocks every Pay / Submit /
Purchase button** unless the walk allows one by name. SSN, password, card and bank
fields are masked in screenshots and never written to the saved files.

Setup, once, on the computer you will use (Node 22 and Git installed):

```bash
git clone https://github.com/keystonefilings/filing-engine && cd filing-engine
npm ci
npx playwright install chromium
```

In the terminal while recording: press Enter to save the current screen by hand, type
`q` and Enter to finish. Screens land in `walks/<date>/<walk>/`. When done, zip that
folder and send it, or commit it on a branch.

Use test names and fictitious people everywhere except where a step says otherwise.
The detailed screen checklists are in `docs/plan-review.md`, section H.

## Walk A: NJ signed in with Keystone's company-wide NJ login

```bash
npm run walk -- nj-signed-in --url https://my.nj.gov/aui/Login --allow "Pay Now"
```

1. Sign in yourself. Note any second-factor step.
2. Open Business Formation, run a test LLC to Payment exactly as on Nov 17.
3. On Payment: does a stored payment method or the business account appear?
4. Click **Pay Now** to see the NICUSA gateway page. `--allow` lets it through once
   only; every later pay/submit button, including another "Pay Now" on the gateway, is
   blocked. Stop there; capture; close the window.
5. Business Records, Standing Certificates: one certificate into the cart for a public
   record, choose each payment type, note the fees, then Remove it.

## Walk B: IRS EIN interview

Run from the fixed-IP machine or the office, on a weekday 6 a.m. to 1 a.m. Eastern.
Needs a responsible party who agrees to the walk; their SSN is typed by them, is masked,
and the walk stops before Submit, so no EIN is issued.

```bash
npm run walk -- irs-ein --url https://sa.www4.irs.gov/modiein/individual/index.jsp
```

Go through every screen to the summary. The recorder blocks "Submit". Note the
inactivity warning and how many minutes it gives.

## Walk C: NY DOS screen 2 bottom

From the fixed-IP machine or the office, with the ny.gov service-company login.

```bash
npm run walk -- ny-formation --url https://filings.dos.ny.gov/ords/r/corpanc/ecorp/login_desktop
```

Sign in yourself, start a Domestic LLC with a test name ending in LLC, fill screen 2,
scroll to the bottom. Open each radio group and dropdown so its options are captured.
Find the drawdown account choice and balance. The final button is blocked. Also open
the name-change amendment entry screen and the account page that shows the DD balance.

## Walk D: Missouri LLC formation and good standing

From the fixed-IP machine or the office (bsd.sos.mo.gov blocks data-center IPs with a
Cloudflare challenge), signed in with the service company's Missouri account.

```bash
npm run walk -- mo-formation --url https://bsd.sos.mo.gov/
```

1. Sign in. Note any second sign-in step (do not write the code).
2. From the dashboard choose "Create LLC". Pick "Limited Liability Company", Domestic,
   Begin.
3. Fill with the section 7 test data (use a Missouri registered agent and principal
   address). Open every dropdown and radio group and save each: duration, management,
   and the payment type at the cart.
4. Go through registered agent, organizers (add one), principal office, review
   (acknowledge box), signor (agreement box), to the shopping cart.
5. On the cart, open the payment type options and record every fee line exactly. Does
   the cart add a card or eCheck surcharge on top of $50?
6. Do not pay. The recorder blocks the payment button. Capture the cart and stop.
7. Then record good standing:
   ```bash
   npm run walk -- mo-standing --url https://bsd.sos.mo.gov/
   ```
   Dashboard "Order Good Standing", search a real Missouri entity, select it, Order
   Copies/Certificates, add to cart, open the payment options, record the $10 line and
   any surcharge, then stop before paying.
