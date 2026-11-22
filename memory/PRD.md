# Sinnovation — PRD

## Original problem
Build the Sinnovation (sinnovation.si) marketing website from EMERGENT-BUILD-PLAN.md: a white-label delivery partner (Bangalore) for digital agencies in Canada/USA. Promise: "Your brand. Our team. Delivered on time." Strict copy rules: no invented stats/testimonials, no client names, no money figures, no visible "placeholder", prices only via one config ("Partner rate card on request").

## Architecture
- React (CRA) + Tailwind + shadcn; content in `src/data/` (site.js, services.js, caseStudies.js, pricing.js = single price source)
- FastAPI + MongoDB (`enquiries`, `users`); Emergent-managed Clerk auth (only wraps /inbox, /sign-in, /sign-up); Emergent-managed Resend email to OWNER_EMAIL
- SEO: React 19 head tags per page, canonical sinnovation.si, sitemap.xml, robots.txt, OG image, favicon

## Personas
Agency owners/founders/ops leads (visitors); Sinnovation team (inbox admins).

## Implemented (Phase 1 — Nov 2026)
- Home, Services + 9 service pages, Work (4 anonymized case studies, auto = strategy), Partner pricing + rate-card form, How it works, About, FAQ, Become a partner, Confidentiality, Privacy/Terms (template notice), 404
- Forms: validation, honeypot + min-time, rate limit, saved + emailed (email_status tracked)
- Private inbox: admin-only (ADMIN_EMAIL=contact@sinnovation.si), filters, mark handled, Team access roles
- Original logo, favicon, icons, OG image
- Tested: backend 100%, frontend 100% (iteration_1)

## Backlog
- P1: Founder profile, working hours, response time, footer company details, social links, booking link
- P1: Real per-service turnaround; optional published starting prices (edit data/pricing.js)
- P1: Anonymized dashboard screenshots on case studies
- P2: Calendar booking in partner flow; downloadable rate card; blog/insights
