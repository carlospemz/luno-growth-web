@AGENTS.md

# Luno Growth — Public Landing Page

This repo is the public-facing website for **Luno Growth** (marketing services branch).
It is NOT the product (that's Luno OS in `luno-platform`).
It is NOT the admin (that's Luno Ops in `luno-platform`).

## Branch Identity
- **Luno Growth** = cash flow engine. Marketing services sold to businesses.
- This repo = public landing page + brief intake form
- Backend = lives in `luno-platform` (/api/growth/*, /admin/growth/*)
- Connection = brief form -> /api/growth/intake -> luno-platform /api/ops-sync

## Platform Connection (updated 2026-04-05)

### How this site connects to luno-platform
- Brief form submits to `/api/growth/intake` → forwards to luno-platform `/api/ops-sync`
- Creates: growth_brief + growth_client + growth_project in shared Supabase
- New: Strategic Core system in luno-platform auto-compiles brief into strategic_core

### Source of Truth
- Product/strategy decisions: luno-platform/docs/os/
- Creative doctrine: this repo's docs/growth-system/creative-doctrine-growth.md
- Operational process: luno-ops/

### Company Posture (April 2026)
Growth = cash engine now. OS = asset built in parallel.
Monclova = lab. Monterrey = market.
Angel proposes → Eduardo translates → Carlos executes.
