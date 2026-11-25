# Voice memo, 2026-11-25: what the site should be (transcript)

Source: `in_Grasshopper_1.amr` (10 min 44 s, 8 kHz phone audio). Transcribed on the session machine
with Whisper (sherpa-onnx, `turbo` and `small.en`, cross-checked), then lightly cleaned: filler
removed, punctuation added. Words in [brackets] are unclear in the audio or were inferred from
context. The gap analysis against the code is `docs/vision-check-2026-11-25.md`.

---

**[00:00]** Okay, this is roughly what I have in mind for the site. I want you to check it against
what's actually done already: everything that still needs to happen, or what could be improved.

**[00:13] Filing engine.** All states (New York, New Jersey, Florida), all types of filings, and the
IRS EIN should all be mapped out by now, and it should all be active to use. Whatever needs payment
methods, the filings should use those payments.

**[00:43] Landing page.** The site has a landing page with compelling copy that gets people to use the
site. On the landing page, three options: create an account as a CPA, CFO, payroll firm, etc.; or
enterprise; and then the login option.

**[01:12] Login.** Any user that logs in should automatically be routed: an enterprise user to the
enterprise dashboard, a payroll/CPA user to that dashboard. Have a forgot-password option: all the
basics a site needs to function properly.

**[01:31] Enterprise.** The enterprise option is a form to fill out to request enterprise, and we get
back to them. Once they have enterprise access they get a login, password, etc. Google [sign-in]
eventually has to be connected.

**[01:46] Documentation and integration.** This is a filing engine, and it has to have full
documentation: API, webhook endpoints, everything. It has to be readable for AI web developers and
human web developers, and downloadable, so they can plug it into their existing system. It has to
plug into their website and get filings from the website, do the filing [unclear: "as long as it's
still embedded"]: the filing engine stops at the review page and sends a screenshot of the review by
email, and has to get an approval. Once it gets approval, it finishes the payment and submits.

**[02:42] Billing and payment methods.** There also have to be billing options for them: how they pay
for the subscription. It should be subscription-based, plus set pricing and everything. They also
have to be able to store the payment methods they want to use for the actual filings, and probably a
secondary method if the first fails, and the engine takes that and puts it in. To be fully safe, let
me know if we need a third-party connector to store the payment methods the engine uses each time.

**[03:19] Enterprise setup.** When an enterprise sets up the account the first time (besides the
documentation, API, webhooks), they have a setup page where they set up each portal: the New York
State DOS portal, the [New York] unemployment portal, New Jersey, the IRS, Florida, and so on as we
add states. They need a place to add the logins, saved securely. The engine uses these every time
there's a filing for them.

**[03:55] Per-state defaults.** For each state, besides connecting the portal, they need a list of
options to choose. Say New York corporate filings: who is the registered agent; do they use a
registered agent where it's not mandatory; where it is mandatory, who is the agent if the client
doesn't have their own. Each default is overwritten if the information coming from the site chose
anything else; if the site said "use this company's agent" or didn't choose at all, the default
applies. Who is the signer, who receives service of process, who is the organizer, etc. Any other
settings: think through deeply which settings should be there, once and for all.

**[04:49] Email and channels.** We also have to connect to Resend eventually, and everything should
have email options to send the screenshot and send back the approval. We also want filings to be
sent to the engine through email, Slack, WhatsApp, so you'll need connectors. Let me know how we
connect with them, what the process is, and how we get that up and running.

**[05:25] Partner front end (CPA, payroll).** CPAs and payroll firms don't have their own website and
aren't connected at the enterprise level to the API. That's what my own front end is for. They
create an account, then log in. Once they log in they get the setup page: company name, logo,
colors, fonts (preset font options, and they can upload their own font). They also need payment to
us, and payment methods for the filings. That's the setup guide.

**[06:23] Partner portal and branded pages.** Once set up, they have a portal where they see every
filing type on offer, in a hierarchy: first the state, then the filing type. Choosing a filing type
links to a web page with the intake form for it, co-branded with their logo, colors and fonts. Say
the domain is keystonefilings.com: each partner gets keystonefilings.com/bestaccounting/llc-filing-new-york.
Each partner gets their own web page for each type of service, with their branding; think Stripe.

**[07:13] Who fills the form.** They can fill it out themselves (straight to the filing engine, and
the finished filing comes back to their email) or send the link to their client. Each form has to
be really thought out: the least required information possible, no duplicate information, "same as"
wherever it fits, optional things collapsed and expanded only when needed. Maybe save client
information for next time, not sure. Very simple to use.

**[08:03]** Whether the client or the client's client fills it out, it comes straight into the engine
and gets filed. The client also has to be able to save who their registered agent is in each state:
part of their setup is setting defaults, but not passwords, since they use our accounts. They're not
an enterprise-level client.

**[08:41] Copy review.** For the full copy of the site: simulate 20 different people (different ages,
professions, types), have them read the full copy and give recommendations, and use the best of
everything.

**[09:06] EIN letter.** The filing engine has to fetch the EIN PDF as soon as it's rendered, because
you can't get it again for that EIN.

**[09:26] Copy emails.** Enterprise clients choose which email address goes on the state website for
copies. For CPAs on the front end, filings go through our Keystone accounts, so New York sends the
documents to the email on our account; the engine has to handle that. Where New York has the "To"
and "CC" options (see the walkthrough), the engine should put the client's email in CC: not the end
client, the CPA firm, so they get a copy.
