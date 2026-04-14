@AGENTS.md

# VINCENT Growth — Public Landing Page

> **Note:** the repo is still named `luno-growth-web` for legacy reasons. The brand is **VINCENT** (rebrand April 2026). Every user-facing string in this codebase should say VINCENT, not Luno.

This repo is the public-facing website for **VINCENT Growth** — the marketing-services branch of VINCENT. It is NOT Vincent OS (that's the SaaS product in `luno-platform`), NOT Vincent Ops (the admin in `luno-platform`), and NOT Vincent Care (the clinical product that's still pre-launch).

## Branch Identity
- **VINCENT Growth** = cash-flow engine. Marketing services sold to clients.
- This repo = public landing + Brief intake form
- Backend lives in `luno-platform` (`/api/growth/*`, `/admin/growth/*`)
- Connection: Brief form → `/api/growth/intake` → luno-platform `/api/ops-sync` → Supabase (`growth_brief`, `growth_client`, `growth_project`)

## Commercial architecture (PDF Abril 2026)

**3 núcleos:**
- **Brand System** — diagnóstico + canon de marca + Brand Kit + strategic brief. One-time. $8–18K MXN.
- **Content Engine** — operación mensual de contenido. $4.5–16K/mes.
- **Demand Engine** — captación con Meta Ads + landing + seguimiento. Setup $5–12K + $6–15K/mes. Media spend aparte.

**2 add-ons controlados:**
- **Website Execution** — landing o sitio como downstream. $6–35K.
- **Local Search** — Google Business + SEO local. $2–7K/mes.

**1 add-on restringido:**
- **Lead Ops** — CRM simple. Solo se vende junto con Demand Engine o Website. Nunca suelto.

**Secuencia de venta:** Entrada → Recurrencia → Aceleración → Conversión → Retención.

## Dual positioning (April 2026 strategy)

Growth serves any vertical, **but actively focuses on sector salud** (consultorios dentales, médicos, clínicas estéticas, fisio, psicología, pediatría). Reason: Vincent Care is coming as a SaaS product for clinics, and Growth's current health clients become Care's launch cohort.

- Hero is vertical-agnostic (universal problem)
- ForWhom strip lists salud verticals first with heavier visual weight
- FAQ has explicit dual-positioning question
- Brief form captures `industry` + `industry_bucket` (salud / otros)
- HealthTeaser in Work section + cream-tone teaser in ManifestoQuote anticipate Care
- Plausible events segment by `industry_bucket` — the ratio is the KPI that decides Care launch timing
- Same playbook will be replicated with sector inmobiliario → future product

**DO NOT say "somos la agencia de dentistas"** — that closes doors. Say "trabajamos con cualquiera, tenemos un cariño especial por los que cuidan la salud de los demás."

## Brand tokens (from brand bible, Angel Villarreal, April 2026)

| Token | Hex | Role |
|---|---|---|
| Deep Indigo | `#0B1E38` | Primary — night sky, where Vincent works |
| Cobalt | `#2D4E8E` | Secondary — depth, variation |
| Star Gold | `#E8B931` | Accent — CTAs, logo, highlights, star of the "i" |
| Moon Cream | `#F5F0E1` | Light surface — moonlight, manifesto background |

**Typography:**
- Wordmark: custom SVG with diamond dot on the "i" (`src/components/ui/VincentWordmark.tsx`)
- Headlines: **Barlow Condensed ExtraBold** (monumental)
- Body + UI: **DM Sans**
- Data + prices: **JetBrains Mono**

All three loaded via `next/font/google` in `src/app/layout.tsx`.

**Signature visual**: the **Vincent Split** (`src/components/sections/VincentSplit.tsx`). Diagonal divide, indigo top ("where Vincent works"), cream bottom ("where you live"), gold tagline pill on the intersection: *"Vincent vive en la intersección."* Mobile-first, no mouse tracking, clip-path animated once on viewport entry.

## Rules (brand bible voice)

- **Never say**: revoluciona, disruptivo, experiencia única, transforma tu negocio, unlock, game changer, solución integral
- **Say**: Vincent, artistas del futuro, pintamos, la noche, el día
- **Tone**: poetic, surgical, confident, nocturnal, calm (not shouting)
- Mobile-first everywhere — 375px is the baseline
- Forbidden: parallax pesado, 3D, WebGL, cursor tracking, auto-rotating carousels, glassmorphism pesado, neon cyberpunk
- Allowed: fade_up on enter, spotlight cursor follow on GlowCard (desktop only, degrades on touch), diamond_breathe, diagonal_reveal, star_twinkle, ambient_float

## Stack

- Next.js 16.2.2 (Turbopack) + React 19 + TypeScript strict
- Tailwind CSS v4
- framer-motion 12 (single animation lib — no gsap, no lenis, no matter-js)
- lucide-react for icons
- `next/font/google` for Barlow Condensed + DM Sans + JetBrains Mono
- Deploy: Vercel

## Section order (`src/app/page.tsx`)

```
PageBackdrop (ConstellationBackdrop — fixed canvas, 30 stars mobile / 60 desktop)
UrgencyBanner (soft kicker, Abril 2026)
Navbar (wordmark + WA CTA)
main:
  Hero                 ← brand bible copy, CTAs: "Habla con Vincent" + "Ver la oferta"
  VincentSplit         ← signature piece (clip-path diagonal)
  ForWhom              ← 12 verticals, salud-first in positions 1–6
  SocialProof          ← honest (3 activos, 100% retention, no fake numbers)
  CoreOffers           ← 3 núcleos: Brand System / Content Engine / Demand Engine
  AddonsControlled     ← Website Execution / Local Search / Lead Ops (restricted)
  SalesSequence        ← Entrada → Recurrencia → Aceleración → Conversión → Retención
  Process              ← 3 steps, ambient icon animations preserved
  Work                 ← 3 real cases + HealthTeaser sub-block (teases Care)
  Founders             ← Ángel + Carlos bios
  ManifestoQuote       ← cream background rhythm break — Angel's "Van Gogh del futuro" quote
  FAQ                  ← dual-positioning aware (9 questions)
  Brief                ← intake form with industry select (salud grouped first)
  Contact              ← final CTA + footer
MobileBar              ← floating WA button
```

## Company Posture (April 2026)

Growth = cash engine now. OS = asset built in parallel. Care = coming, built on Growth's health client base.
Monclova = lab. Monterrey = market. MX nacional crece. USA multiplica.
Angel proposes → Eduardo translates → Carlos executes.

## Rules when editing this repo

- NEVER reintroduce Luno copy, gradients, or dark-purple/cyan palette
- NEVER soften the "dual positioning" — it's strategic, not a tone choice
- NEVER add a Care product landing here. Care will have its own route/repo.
- NEVER break the Brief → `/api/growth/intake` backend contract. If `industry` needs to be added to the Supabase schema, do it in `luno-platform` with a migration first.
- ALWAYS run `npm run build` before committing
- ALWAYS preserve `prefers-reduced-motion` — it's wired in globals.css and vincent-landing.css
- Mobile-first, always
