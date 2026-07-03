# Kolas Website — Next Steps

Working list of improvements for kolastechnologies.com. Roughly ordered by priority.

## Soon

- [ ] **Gmail spam filter (interim fix)** — booking emails from `onboarding@resend.dev` land in spam.
      Gmail → Settings → Filters → From: `onboarding@resend.dev` → "Never send it to Spam".
- [ ] **Verify domain in Resend (proper fix)** — Resend → Domains → Add `kolastechnologies.com`,
      add the DKIM/SPF/MX records in Google Cloud DNS, verify, then add Vercel env var
      `BOOKING_FROM` = `Kolas Website <notifications@kolastechnologies.com>` and redeploy.
      Removes the spam problem entirely and unlocks sending to any address.
- [ ] **Favicon + social preview** — add a favicon and Open Graph / Twitter meta tags
      (title, description, og:image) so links shared in email/LinkedIn/Slack look right.
- [ ] **Analytics** — enable Vercel Analytics (one click in dashboard) or add Plausible,
      to see traffic and which sections/CTAs convert.

## Booking flow

- [ ] **Auto-confirmation email to the lead** — after domain verification, send a short
      "Thanks — we'll be in touch shortly" reply to the submitter (~5 lines in `api/book-call.js`).
- [ ] **Scheduling link option** — set up Cal.com or Calendly and point "Book a Call" at it
      (or offer it in the confirmation email) so leads book a time directly instead of waiting.
- [ ] **Capture more context** — optional Name / Firm / "What are you exploring?" fields in the
      modal, so outreach can be personalized before the first reply.
- [ ] **Basic rate limiting** — cap submissions per IP in the API route if spam ever gets past
      the honeypot.

## Site content

- [ ] **Mobile nav menu** — nav links are hidden below 700px; add a hamburger menu.
- [ ] **Agent detail pages or expandable cards** — one page/section per agent with an example
      input/output, for prospects who want depth before a call.
- [ ] **Case study page** — expand the three proof cards into short anonymized write-ups
      (problem → build → result) once client permission is sorted.
- [ ] **Security page** — expand the security section into a standalone page with deployment
      diagrams (VPC / private cloud / hybrid) for IT and compliance reviewers.
- [ ] **Client portal decision** — footer links to `portal.kolastechnologies.com/login`;
      confirm the portal is real and on-brand, or remove the link.

## Infra / hygiene

- [ ] **Custom 404 page** — currently Vercel's default.
- [ ] **Lead persistence** — booking requests only exist as emails today; forward them to a
      spreadsheet/CRM (Google Sheet, Airtable, or the future Kolas CRM) from the API route.
- [ ] **Uptime/error alerting** — a simple checker on `/api/book-call` so a broken form
      (e.g. expired Resend key) is noticed before leads are lost.
