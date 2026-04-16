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

## Dual positioning — INTERNO, IMPLÍCITO, INVISIBLE

**REGLA DE ORO**: la landing pública **nunca menciona** el foco en salud, la estrategia de building-a-client-base-for-Care, ni el posicionamiento dual. **Es información interna.** El visitante jamás debe percibir que Vincent prefiere un sector sobre otro — si lo percibe, el que no es de ese sector asume que no es bienvenido y se va.

### Por qué

Vincent Growth es, de cara al mercado, **multi-vertical puro**: cualquier dueño de negocio que esté harto de improvisar. Punto. La estrategia interna (foco activo en salud porque Vincent Care está por salir y esos clientes son la cohorte de lanzamiento) **existe en el backend**, en la segmentación de Plausible, en el routing de leads, en cómo Carlos y Ángel priorizan su tiempo. **No en la landing.**

### Qué SÍ se puede hacer (implícito)

- Capturar `industry` + `industry_bucket` en el Brief form como campo normal — el usuario ve un select plano con todas las industrias mezcladas, el backend clasifica
- Segmentar eventos de Plausible por `industry_bucket` para medir internamente el ratio salud/otros (la métrica interna que decide timing de launch de Care)
- Priorizar internamente respuestas a leads de salud (Angel/Carlos deciden quién responde primero, no la landing)
- Tener contenido/casos de estudio específicos para salud cuando existan — pero presentados como "caso de cliente X" igual que cualquier otro, sin etiquetar "sector salud destacado"

### Qué NO se puede hacer (explícito prohibido)

- ❌ Pills tipo "Foco activo · Sector salud · 2026"
- ❌ Sub-bloques tipo HealthTeaser que anuncien "Algo especial para consultorios"
- ❌ Banners tipo "Lista de espera VINCENT Care" en el Brief
- ❌ Hints tipo "Vas primero en la lista de Care" cuando el usuario selecciona industria salud
- ❌ Preguntas de FAQ que digan "tenemos un foco especial en sector salud"
- ❌ Frases tipo "tenemos un cariño especial por los que cuidan la salud de los demás"
- ❌ Líneas de teaser tipo "mañana tenemos algo muy específico para consultorios"
- ❌ Verticales con peso visual diferenciado en el ForWhom strip (salud pesado, otros ligero)
- ❌ Optgroups visibles en selects con etiquetas "── Salud ──" / "── Otros ──"
- ❌ Mencionar Vincent Care públicamente como producto que está por salir
- ❌ Cualquier cosa que un lead NO-salud pueda leer y pensar "ah, esto no es para mí"

### La frase que resume la regla

*"Si un restaurantero o un abogado ve algo en la landing que le haga dudar si Vincent es para él, lo estamos haciendo mal."*

Mismo principio se replicará cuando el próximo foco sea sector inmobiliario → Vincent Real (o como se llame). Hoy salud es la capa invisible; mañana inmobiliaria también será invisible hasta que sea público.

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
