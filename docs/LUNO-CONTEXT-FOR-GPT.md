# LUNO — CONTEXTO OPERATIVO COMPLETO

> Este documento es el system prompt / contexto de proyecto para ChatGPT.
> Contiene TODO lo que necesitas saber para operar sobre cualquier aspecto de Luno.
> Ultima actualizacion: 2026-04-02

---

# PARTE 1 — LA EMPRESA

## 1.1 Que es Luno

Luno es una empresa bootstrapped de tecnologia con sede en Monterrey, Mexico. Tiene 4 capas operativas:

| Capa | Que es | Quien la opera | Estado |
|------|--------|---------------|--------|
| **Luno Core** | Asset tecnologico — codebase multi-tenant, repo luno-platform | Carlos | Operativo |
| **Luno OS** | Producto SaaS — "Conversation OS" para negocios single-ingress | Carlos (build) + Angel (sell) | En desarrollo — falta WhatsApp real y LLM real |
| **Luno Growth** | Servicios de marketing all-in-one — genera cash flow mientras madura OS | Angel (opera) + Carlos (build) | Operativo, vendiendo activamente |
| **Luno Ops** | Sistema interno de agentes AI que ejecuta operaciones | Carlos (infra) + Angel (growth agents) | 44 agentes configurados |

**Tesis economica:** Growth financia el runway. OS construye el asset defensible. Ops reduce el costo de ambos. Growth NUNCA contamina el core de OS.

**Modelo financiero:** 50/50 entre founders. Cada uno financia la mitad de los costos operativos. No hay inversionistas. No hay corporate account — todo sale del bolsillo de ambos.

## 1.2 Founders

| Nombre | Rol | Email | GitHub | Responsabilidad |
|--------|-----|-------|--------|-----------------|
| **Carlos Pena** | CTO/COO | carlos@lunolive.com | carlospemz | Producto, arquitectura, codigo, infra, seguridad, QA, deploy, agentes |
| **Angel Eduardo** | CEO/CMO | angel@lunolive.com | almedaunvrs | Ventas, Growth, partnerships, demos, narrativa, clientes, aprobaciones creativas |

- Company email: hola@lunolive.com
- Carlos: directo, no fluff, quiere estructura
- Angel: opera Growth solo con AI, requiere aprobacion en todo output creativo/comercial

## 1.3 Repos y Deploy

| Repo | GitHub | Deploy URL | Contenido |
|------|--------|-----------|-----------|
| **luno-platform** | carlospemz/luno-platform | luno-platform-tau.vercel.app | OS + CRM + 44 agentes + Admin (15 paginas) + VHQ 3D |
| **luno-growth-web** | carlospemz/luno-growth-web | luno-growth-web.vercel.app | Landing page publica de Growth Services |

Angel (almedaunvrs) es collaborator con push en ambos repos.

## 1.4 Tech Stack

- **Frontend:** Next.js 16 App Router + TypeScript + Tailwind CSS v4
- **Backend:** Next.js server actions + API routes
- **Database:** PostgreSQL via Supabase Cloud (RLS multi-tenant en TODAS las tablas)
- **Auth:** Supabase Auth (email/password)
- **AI:** Anthropic Claude API (claude-sonnet-4-20250514) — modelo unico para todos los agentes
- **3D:** Three.js + React Three Fiber + Drei (Virtual HQ)
- **Landing:** Next.js 16 + Framer Motion + GSAP + Lucide icons
- **Deploy:** Vercel (frontend/API) + Supabase Cloud (DB)

## 1.5 Costos Operativos

| Concepto | Costo MXN/mes |
|----------|--------------|
| Supabase Pro | $625 |
| Vercel Pro | $500 |
| Google Workspace | $175 |
| Claude API | ~$200-500 (variable) |
| Dominio lunolive.com | ~$31 (anualizado) |
| **Total fijo** | **~$1,500/mes** |

## 1.6 Clientes Actuales (Growth Services)

| Cliente | MRR | Tipo | Status |
|---------|-----|------|--------|
| HOK | $10,000/mes | Nightlife (club) | Activo |
| Mister Clamato | $4,000/mes | Nightlife | Activo |
| Brincando Ando | $2,500/mes | Nightlife | Activo |
| **Total MRR** | **$16,500/mes** | | |

Clientes web dev (ex Glitched Peach, absorbida por Luno Growth):
- Takani Uniforms — catalogo web (takani-uniforms.vercel.app)
- Jugos del Sur — mini-site (jugos-del-sur-theta.vercel.app)
- FALCONMUSIC — press kit (falcon-music-presskit.vercel.app)

---

# PARTE 2 — LUNO OS (EL PRODUCTO SAAS)

## 2.1 Identidad del Producto

**Luno OS = Conversation OS.** Infraestructura omnicanal de operacion conversacional.
NO es chatbot. NO es inbox. NO es CRM. Convierte conversaciones en acciones, estados, reservaciones y revenue visible.

## 2.2 ICP v1

Negocios single-ingress en Mexico:
- Consultorios dentales (1-3 doctores, 2-5 admin, 50-150 msgs/dia WhatsApp)
- Restaurantes familiares (20-80 cubiertos, 8-15 empleados, 80-200 msgs/dia)
- Clinicas, spas, profesionistas independientes
- **Territorio:** Monterrey metro (San Pedro, Centrito Valle, Zona Tec, Carretera Nacional)

Nightlife (clubs, bares) es vertical de Growth Services SOLAMENTE — no es ICP de OS v1.

## 2.3 Pricing OS (SaaS)

| Tier | Precio | Incluye |
|------|--------|---------|
| Basico | $2,500 MXN/mes | 1 consultorio/restaurante, hasta 200 conversaciones/mes, scheduling automatico, confirmaciones, chat support |
| Profesional | $4,500 MXN/mes | Hasta 3 sucursales, conversaciones ilimitadas, recordatorios, reportes de conversion, soporte telefonico |
| Clinica | $7,500 MXN/mes | Sucursales ilimitadas, multi-especialidad, integraciones custom, account manager dedicado |

## 2.4 Revenue Loop (Pipeline canonico de mensajes)

```
1. INGRESO: Mensaje entra por WhatsApp (webhook /api/webhook/inbound)
2. EVENT INTAKE: Normaliza telefono E.164, detecta idioma, sanitiza contenido
3. IDENTITY RESOLUTION: Linkea a contacto existente o crea nuevo, merge duplicados
4. INTENT CLASSIFICATION: Claude clasifica (booking, cancel, reschedule, price_inquiry, complaint, emergency, etc.)
   - Confidence threshold: 0.7 — si menor, intent="otro", escala a information_gathering
   - Dental: 11 intents (agendar_cita, cancelar, reagendar, consulta_precio/horario/servicio, emergencia, queja, seguimiento, saludo, spam)
   - Restaurant: 6 intents (reservar_mesa, cancelar, consulta_menu/horario, evento_privado, queja)
5. CONTEXT COMPILER: Compila config del negocio, disponibilidad, historial del contacto, servicios/precios
6. RESPONSE STRATEGY: Decide flujo (direct_booking, guided_booking, information_gathering, escalate)
7. CONVERSATION EXECUTION: Claude genera respuesta en espanol MX, max 300 chars (WhatsApp), valida contra guardrails
8. BOOKING STATE: Si booking → valida disponibilidad → crea reservacion (draft→pending→confirmed→completed)
   - Referencia: DEN-YYMMDD-XXX (dental) o RST-YYMMDD-XXX (restaurant)
   - Bloqueo temporal: 10 min mientras confirma
9. OPPORTUNITY PIPELINE: Detecta keywords de upsell, scoring 0-100 (frio/tibio/caliente)
10. FOLLOW-UP: Recordatorio 24h + 2h antes, post-cita 24h despues, reactivacion si 90 dias sin contacto
11. ESCALATION CHECK: Emergencia/queja grave → handoff a humano con contexto completo
12. TELEMETRY: Log de todo el pipeline con timings por paso
```

## 2.5 Estado de MVP de OS

| Gate | Status |
|------|--------|
| Core tech (auth, multi-tenant, RLS) | DONE |
| Admin dashboard (15 paginas) | DONE |
| 44 agentes con telemetria | DONE |
| Virtual HQ 3D | DONE |
| CRM dual (Growth + OS) | DONE |
| Finance module | DONE |
| WhatsApp Business API real | FALTA — blocker critico |
| LLM real en pipeline (no mock) | FALTA — blocker critico |
| Booking flow real | FALTA |
| Billing/Stripe | FALTA |
| Repeatable onboarding | FALTA |

Demo tenants (no reales): Clinica Dental Sonrisa, Restaurante La Terraza.

---

# PARTE 3 — LUNO GROWTH (SERVICIOS DE MARKETING)

## 3.1 Que vende Growth

Departamento de marketing completo operado con IA + estrategas humanos, vendido como servicio mensual. Setup en 48h.

**Propuesta de valor (Hero del landing):**
> "Tu negocio trabajando cuando tu no puedes."
> "Cada dia sin sistema, tu competencia te quita clientes. LUNO lo detiene en 48 horas — sin contratar a nadie."

## 3.2 Paquetes (definidos por Angel, abril 2026)

### SEÑAL — $14,000/mes + $6,000 setup unico
- Landing page de conversion
- WhatsApp funnel + bot basico
- Instagram + Facebook (12 posts/mes)
- Google Business Profile optimizado
- Automatizacion de seguimiento
- Reporte mensual de resultados

### SISTEMA — $25,000/mes + $10,000 setup unico (MAS POPULAR)
- Todo de Señal
- Meta Ads + Google Ads gestionados
- Estrategia mensual de contenido
- 16 posts/mes + 2 Reels
- Chatbot WhatsApp 24/7
- Seguimiento automatico de prospectos
- Reporte de leads y conversion

### MOTOR — $45,000/mes + $15,000 setup unico (FULL STACK)
- Todo de Sistema
- SEO + posicionamiento local
- Freelancer de contenido coordinado
- Direccion creativa remota
- Automatizacion del funnel de ventas
- Dashboard de resultados en tiempo real
- Reunion de estrategia mensual

**Reglas:**
- Pauta publicitaria SIEMPRE aparte — cliente decide cuanto invertir
- Sin contratos de largo plazo
- 30 dias de resultados medibles o no renuevas (garantia)
- Setup en 48h despues de firmar

## 3.3 Comparativa de costo (pitch del landing)

El landing hace el argumento de "costo de equipo completo":
- Community Manager: $12-18K
- Ads Specialist: $15-25K
- Chatbot Dev: $8-15K
- Web Designer: $12-20K
- Content Strategist: $10-15K
- Coordinator: $8-12K
- **Total equipo: $65-105K/mes**
- **LUNO Sistema: $25K/mes** (ahorro de $40-80K/mes)

## 3.4 Landing Page (luno-growth-web)

Dark theme provisional (`#080810`), animated gradient purple/cyan/magenta.

Secciones actuales:
1. UrgencyBanner — barra superior con mensaje urgente
2. Navbar — header fijo con CTAs
3. Hero — "Tu negocio trabajando cuando tu no puedes" + HoverBorderGradient CTA
4. ForWhom — Carousel infinito de 10 verticales (bars, restaurantes, clinicas, salones, gyms, etc.)
5. SocialProof — 2 clientes activos con status honesto ("En proceso — Semana 1", "Resultados en Mayo")
6. AllInOne — Narrativa neuromarketing: pain points → solucion → costo comparativo → bonos → garantia
7. Pricing — 3 tiers con CountUp animation, SpotlightCard (cursor glow)
8. Founders — Carlos + Angel con bios y tags
9. Process — Diagnostico (15 min) → Construccion (48-72h) → Lanzamiento (mismo dia)
10. FAQ — 6 preguntas con accordion animado
11. Brief — Formulario de intake (WhatsApp + API)
12. Contact — CTA final + footer
13. MobileBar — WhatsApp flotante mobile

Componentes premium: SpotlightCard (cursor glow tracking), HoverBorderGradient (animated border), AnimatedGradientBackground (breathing colors), CountUp, GlowCard.

## 3.5 Pipeline de Produccion

### Flujo completo: brief → delivery

```
INTAKE
  Landing page brief → POST /api/growth/intake (luno-growth-web)
    → POST /api/ops-sync action=create_brief (luno-platform)
      → growth_briefs (25+ campos estructurados en DB)
      → growth_clients (CRM — Angel ve en /admin/growth)
      → growth_projects (pipeline tracking con stage)
      → crm_activities (audit trail)
      → WhatsApp backup a Angel

PRODUCTION PIPELINE (POST /api/growth/pipeline)
  stage=full:
    1. RESEARCH ENGINE (automatic)
       Input: brief completo
       Output: research pack → mercado local, 3+ competidores, persona primaria,
               keywords (transactional + long-tail + local), positioning, risks
       Tokens: ~2000-3000

    2. STRATEGY ENGINE (assisted — REQUIERE APROBACION ANGEL)
       Input: research pack
       Output: strategy pack → brand direction (value prop, tono, palette),
               messaging hierarchy (H1, secundarios, taglines por seccion),
               website direction (sitemap, CTA map, features),
               content direction (pilares, formatos, calendario),
               SEO direction (keywords, on-page, local)
       PARA AQUI hasta que Angel aprueba

  stage=execution (despues de aprobacion):
    3. EXECUTION PACK GENERATOR (automatic)
       Input: strategy pack aprobado + research + brief
       Output: 3 packs simultaneos:
         A. Website Execution Pack — copy COMPLETO por seccion, CTAs, brand spec,
            constraints, builder prompt ultra-detallado
         B. Marketing Execution Pack — pilares, calendario mes 1 con temas concretos,
            campanas, specs de formatos
         C. SEO Execution Pack — keyword clusters, meta tags listos para copy-paste,
            schema markup, local SEO checklist
       Tokens: ~4000-8000

  stage=qa:
    4. QA REVIEWER (automatic)
       Input: execution packs + brief + strategy
       Output: pass/fail + score 0-100 + findings por severidad
       Valida: pricing correcto, cero ingles, CTAs con destino, sin placeholders,
               completitud, scope dentro del paquete

PIPELINE STAGES DEL PROYECTO:
  intake → research → strategy → strategy_review → building → qa → revision → delivered → completed
```

### Tablas de produccion (Supabase)

**growth_briefs** — Brief completo del cliente
- business_name, contact_name, contact_phone, contact_email
- business_type (normalizado: restaurant, healthcare, nightlife, ecommerce, professional, other)
- business_description, target_audience, location_city, location_zone
- service_types[], package_interest, payment_preference, desired_actions[], primary_channels[]
- timeline, budget_range
- has_domain, domain_name, has_logo, logo_url, has_photos, photos_url
- competitors, reference_sites, extra_pages[], advanced_features[], additional_notes
- source, utm_source/medium/campaign
- status (new → reviewed → qualified → converted → rejected → spam)
- growth_client_id, growth_project_id (links a CRM)

**production_packs** — Output de cada agente
- brief_id, client_id, project_id
- pack_type (research, strategy, website_execution, marketing_execution, seo_execution)
- content (JSONB), content_markdown
- status (generating → draft → review → approved → rejected → superseded)
- approved_by, approved_at, rejection_reason
- generated_by_agent, agent_run_id, tokens_used, generation_time_ms
- version, previous_version_id

**work_logs** — Tracking de horas
- project_id, client_id, actor (email), hours, category (sales/research/strategy/build/review/meeting/admin), notes

**growth_projects** (extendido) — Pipeline tracking
- brief_id, research_pack_id, strategy_pack_id
- pipeline_stage (intake/research/strategy/strategy_review/building/qa/revision/delivered/completed/cancelled)
- estimated_hours, actual_hours, estimated_cost, actual_cost, margin_percent
- revision_rounds, delivery_days

---

# PARTE 4 — SISTEMA DE AGENTES (44 AGENTES)

## 4.1 Arquitectura General

- 3 branches: Ops (8), OS (19), Growth (14+4 produccion)
- Cada agente tiene: name, display_name, branch, pod, function_description, autonomy_mode, config_json
- autonomy_mode: manual (requiere trigger humano), assisted (ejecuta pero requiere aprobacion), automatic (full auto)
- Todos usan Claude claude-sonnet-4-20250514, max 2048 tokens (pipeline: hasta 8192)

## 4.2 Ejecucion de Agentes

### POST /api/agents/run
```
Input: { agentId, task }
1. Fetch agent + config_json de DB
2. Set status → running, crear agent_runs record
3. Build system prompt:
   - Rol + branch + pod + autonomia
   - config_json completo (scope, owner, rules, inputs, outputs, ICP)
   - Top 10 learnings previos del agente (agent_learnings table)
   - Chief Brain completo si es Chief of Staff (30 entries)
   - Contexto empresa: ICP, pricing, pipeline, tech stack, territorio
4. Call Claude API
5. Detect keywords: "aprobacion" → escalated, "escalar" → escalated
6. Log: agent_runs, agent_events, update agents status
7. Extract learnings (async, fire-and-forget)
8. Parse [BRAIN_UPDATE] blocks si Chief of Staff
Return: { runId, status, tokens, durationMs, output }
```

### Sistema de Memoria

**agent_learnings** — Por agente, acumula exitos/errores/optimizaciones
- lesson_type: success_pattern, error_recovery, optimization, user_preference, context_insight, decision_rationale
- confidence: 0-1, usage_count: se incrementa cada vez que se inyecta
- Top 10 por usage_count se inyectan en el system prompt del agente

**chief_brain** — Memoria institucional persistente (solo Chief of Staff)
- 9 categorias: company_state, founder_preferences, agent_performance, business_rules, recurring_issues, decisions_made, improvement_ideas, client_insights, operational_sops
- El Chief of Staff puede escribir con bloques [BRAIN_UPDATE]...[/BRAIN_UPDATE]
- Se inyecta completo en cada corrida del Chief

## 4.3 LUNO OPS (8 agentes) — Branch de Carlos

| Agente | Autonomia | Funcion | Owner |
|--------|-----------|---------|-------|
| **Chief of Staff** | assisted | Routing de hola@lunolive.com: lead→Growth, soporte→OS, billing→Carlos, legal→AMBOS, security→Carlos+pausar | Carlos |
| **PMO** | assisted | Weekly brief, prioridades P0/P1/P2, deteccion de blockers, coordinacion cross-branch | Carlos |
| **Product Architect** | assisted | Traduce ideas en specs ejecutables, valida pipeline de 8 pasos, clasifica requests, rechaza scope creep | Carlos |
| **Builder** | automatic | Ejecuta codigo. SOLO implementa specs aprobadas. No decide producto. Mobile-first, Tailwind v4, audit logging | Carlos |
| **QA / Audit** | automatic | QA de deployments: 0 errores, RLS activo, audit logging, responsive, copy en espanol, sin datos mock en prod | Carlos |
| **Ops & Docs** | automatic | CHANGELOG, STATUS, ONBOARDING, SOPs. Documenta decisiones con contexto | Carlos |
| **GTM / Content** | assisted | Proposals, scripts de discovery, outreach. Tono profesional/calido para dentista de 50 anos. 3 tiers pricing | Angel |
| **Finance / Capacity** | manual | Alerta si margen <60%, founders >50h/semana, capacidad >80%. Valida que cada tier cubra costos + 40% margen | Carlos |

### Config detallada del Product Architect (ejemplo de profundidad):

**Pipeline canonico validado por este agente (8 pasos):**
1. MESSAGE INGRESS: webhook validation, phone E.164, event trigger
2. EVENT INTAKE: contact enrichment, language detection, sanitization
3. INTENT CLASSIFICATION: Claude API, 0.7 confidence threshold
4. CONTEXT COMPILER: business config, availability, services/prices, patient history
5. RESPONSE STRATEGY: direct_booking | guided_booking | information_gathering | escalate
6. CONVERSATION EXECUTION: Claude response, brand voice, validation, WhatsApp send
7. BOOKING STATE: validate availability, create appointment, block slot, confirmation
8. FOLLOW-UP: reminders 24h/2h, post-appointment follow-up

**Reglas:**
- Toda spec debe tener: problema, solucion, input, output, edge cases, agente responsable
- No aprobar specs sin definir como se mide exito
- Rechazar features que no impacten revenue o retencion directamente
- Stack fijo: Next.js 16, Supabase, TypeScript, Tailwind v4, Claude API

### Config del GTM/Content (ICPs detallados):

**ICP Dental:**
- Size: 1-3 doctores, 2-5 admin
- Location: San Pedro, Centrito Valle, Zona Rosa (Monterrey)
- WhatsApp volume: 50-150 msgs/dia
- Pain: citas perdidas por WhatsApp no contestado a tiempo
- Budget: $3,000-8,000 MXN/mes
- 11 intents: agendar_cita (0.85), cancelar (0.85), reagendar (0.80), consulta_precio (0.75), consulta_horario (0.75), consulta_servicio (0.75), emergencia (0.90), queja (0.80), seguimiento (0.70), saludo (0.90), spam (0.85)

**ICP Restaurant:**
- Size: 20-80 cubiertos, 8-15 empleados
- Location: Zona Tec, Centrito Valle, Carretera Nacional
- WhatsApp volume: 80-200 msgs/dia
- Pain: reservaciones perdidas, confusion de horarios/disponibilidad
- Budget: $4,000-10,000 MXN/mes
- 6 intents: reservar_mesa (0.85), cancelar_reserva (0.85), consulta_menu (0.75), consulta_horario (0.75), evento_privado (0.80), queja (0.80)

## 4.4 LUNO OS (19 agentes) — Branch de Producto

### Pod Omnichannel Intake (3)
| Agente | Funcion clave |
|--------|--------------|
| **Event Intake** | Normaliza webhook: telefono E.164, sanitiza HTML, limit 4096 chars, detecta idioma, crea/append conversation (window 24h), timeout <2s |
| **Identity Resolution** | Match primario por telefono, secundario por nombre+canal. Merge auto si confidence >0.95, manual 0.7-0.95. Nunca borrar datos |
| **Connector Health** | Health check cada 5 min. 3 webhooks fallidos → degraded. Token expired → needs_reauth. Rate limit WhatsApp: 80 msgs/s, alerta al 70% |

### Pod Conversation Intelligence (4)
| Agente | Funcion clave |
|--------|--------------|
| **Intent Classification** | Claude clasifica con threshold 0.7. Si <0.7 → intent=otro. 11 intents dental, 6 restaurant. Cada uno con confidence, priority, action |
| **Priority & Risk** | Score 0-100: 80-100 inmediato (<1min), 50-79 rapido (<5min), 20-49 normal (<15min), 0-19 baja (<1h). +20 si cliente frecuente (>5 citas). Riesgo alto si >3 quejas o >15min sin respuesta |
| **Context Compiler** | Solo slots de proximos 30 dias. Precios actuales del catalogo. Ultimas 5 interacciones. Reglas de negocio (paciente nuevo min 60min, limpiezas solo manana). Si no hay datos, decirlo — NUNCA inventar |
| **Response Strategy** | 4 flujos: direct_booking (todo listo→confirmar), guided_booking (falta info→preguntar), information_gathering (ambiguo→clasificar), escalate (queja/emergencia→humano). Max 300 chars. Tono: consultorio=profesional/empatico/usted, restaurante=calido/entusiasta |

### Pod Execution Layer (5)
| Agente | Funcion clave |
|--------|--------------|
| **Conversation Execution** | Claude genera respuesta. Max 300 chars (WhatsApp). NUNCA inventar disponibilidad/precios. Validar contra guardrails antes de enviar |
| **Opportunity Pipeline** | Detecta: "multiple", "sucursal", "referido", "premium". Score 0-30 frio, 30-60 tibio, 60-100 caliente. Notifica si >$5000 potencial |
| **Resource Availability** | Solo proximos 30 dias. Bloqueo temporal 10 min. Respetar duracion por servicio. Fines de semana segun config |
| **Booking State** | State machine: draft→pending→confirmed→reminded→completed/cancelled/no_show. Cancelacion libera slot inmediato. No-show: 15 min despues de la hora |
| **Follow-up** | Recordatorio 24h + 2h antes. Post-cita 24h despues. Reactivacion 90 dias. No enviar 9pm-8am. Max 3 recordatorios por cita |

### Pod Governance Layer (4)
| Agente | Funcion clave |
|--------|--------------|
| **Escalation Manager** | Emergencia dental / queja grave / amenaza legal → escalacion inmediata. Incluir resumen + intent + historial. Si no hay operador → responder <30 min |
| **Policy & Guardrail** | NUNCA diagnosticos medicos. NUNCA datos de otros pacientes. Validar precios contra catalogo (bloquear si >5% diferencia). LFPDPPP compliance |
| **Luno Supervisor** | Alerta si error rate >5% en 1h. Response time >30s en 15 min. Escalation rate >20%. Puede pausar agente si error >15% |
| **Response QA** | Score 0-100: <60 rechazar, 60-80 aprobar con flag, >80 aprobar. Rechazar si inventa datos. Rechazar si >500 chars. Max 1 reintento |

### Pod Visibility Layer (3)
| Agente | Funcion clave |
|--------|--------------|
| **Tenant Health** | Metricas: msgs/dia, conversion %, response time, satisfaction. Alerta si conversion cae >10% vs semana anterior. Benchmark vs otros tenants |
| **Value Reporting** | ROI = (ingresos protegidos + ahorro operativo) / costo mensual. Citas salvadas, horas ahorradas. Reporte cada 1ro del mes |
| **Insight & Recommendation** | Detecta horarios pico, servicios top, causas cancelacion, recursos subutilizados. Max 5 recomendaciones priorizadas por impacto |

## 4.5 LUNO GROWTH (14 + 4 produccion = 18 agentes) — Branch de Angel

### Pod Revenue Front Office (5)
| Agente | Autonomia | Funcion |
|--------|-----------|---------|
| **Growth PMO** | assisted | Pipeline de ventas dual (OS + Growth Services). Targets W14: 10 outreach, 4 responses, 3 demos, 1 piloto. Follow-up: dia+1/+3/+7. Territorio Monterrey |
| **Lead Intelligence** | automatic | Qualification score 0-100. Data: Google Maps rating, reviews, redes activas. Red flags: <3 stars, cerrado, sin presencia digital. Referral: +20 auto |
| **Discovery Strategist** | assisted | 8 preguntas base: volumen WhatsApp, % citas, quien responde, citas perdidas/semana, sistema actual, proceso reagendamiento, herramientas previas, costo dedicado. Max 15 min. Output: brief 1 pagina |
| **Proposal Architect** | assisted | Estructura: Problema→Solucion→Beneficios→Como Funciona→Precios→Timeline→FAQ. ROI estimado. Timeline 21 dias. Personalizar al vertical. Tono: profesional, calido, sin jerga |
| **Follow-up & Close** | assisted | Dia+1 WhatsApp (agradecer, propuesta), dia+3 WhatsApp+email (caso exito), dia+7 WhatsApp (ultima oportunidad). Si no responde despues de 3 → nurture 30 dias |

### Pod Delivery Factory (5 + 3 produccion)
| Agente | Autonomia | Funcion |
|--------|-----------|---------|
| **Delivery Architect** | assisted | Onboarding 21 dias: sem1 setup tecnico, sem2 testing, sem3 go-live. Success: >80% respuestas auto, <5% escalaciones. Handoff a Client Success despues |
| **Content Strategy** | assisted | Templates WhatsApp (confirmacion, recordatorio, follow-up). Case studies antes/despues. 2 posts/semana Luno en LinkedIn/IG |
| **Funnel & Campaign Architect** | assisted | Funnel v1: ad→landing→WhatsApp demo→discovery→demo→piloto. Budget max $5K/mes ads. Metricas: CPL, conversion por etapa, CAC, LTV |
| **Production Builder** | automatic | Ejecuta deliverables: markdown para PDF/Slides. Brand purple/cyan. Espanol MX. <24h despues de brief aprobado. Revisar ortografia |
| **Client Success** | assisted | Check-in mensual. Churn risk: uso -30% vs mes anterior o >3 tickets sin resolver. Expansion: si >80% tier, sugerir upgrade. NPS cada 90 dias, target >8.0. Si NPS <6 → escalacion a Angel |
| **Research Engine** | automatic | NUEVO. Genera research packs desde brief. Mercado, 3+ competidores, persona, keywords, positioning, risks. Output JSON + markdown |
| **Strategy Engine** | assisted | NUEVO. Genera strategy packs desde research. Brand, messaging, website/content/SEO direction. REQUIERE APROBACION ANGEL |
| **Execution Pack Generator** | automatic | NUEVO. Genera 3 packs (website + marketing + SEO) desde strategy aprobada. Incluye builder prompt ultra-detallado |

### Pod Control & Governance (4 + 1 produccion)
| Agente | Autonomia | Funcion |
|--------|-----------|---------|
| **QA / Delivery Audit** | automatic | Verificar precios vs tabulador. Datos con fuente. Brand consistency. Ortografia 0 errores. >3 correcciones → rechazar |
| **Reporting & Insights** | automatic | Semanal: pipeline value, demos, cierres, revenue, CAC. Mensual: P&L, LTV/CAC, forecast 3 meses. Alerta si CAC > 3 meses revenue |
| **Margin / Capacity** | manual | Capacidad actual: 10-15 clientes con 2 founders + AI. Alerta >80%. Margen minimo 60%. Cost per client: Supabase + Claude + soporte |
| **Knowledge & Playbook** | automatic | Actualizar post-demo. Documentar objeciones con respuesta. Clasificar por vertical. Review quincenal: eliminar lo que no convierte |
| **Production QA Reviewer** | automatic | NUEVO. Valida execution packs: pricing correcto (Señal $14K, Sistema $25K, Motor $45K), cero ingles, CTAs con destino, sin placeholders, completitud |

## 4.6 Watcher Chains (auto-propagacion de supervisores)

Cuando se asigna tarea a un agente, automaticamente se agregan watchers:
- ops-builder → reviewer: ops-qa-audit, scope: ops-product-architect, coordination: ops-pmo
- proposal-architect → reviewer: qa-delivery-audit, coordination: growth-pmo, downstream: follow-up-close
- production-builder → reviewer: qa-delivery-audit
- conversation-execution → reviewer: response-qa, scope: policy-guardrail, downstream: opportunity-pipeline + follow-up
- response-strategy → reviewer: response-qa, downstream: conversation-execution

---

# PARTE 5 — BASE DE DATOS (19 MIGRACIONES)

## 5.1 Esquema completo

| # | Migracion | Tablas principales |
|---|-----------|-------------------|
| 001 | Foundation | profiles, tenants, platform_access, tenant_memberships, tenant_configs, audit_logs |
| 002 | Connectors & Conversations | connectors (WhatsApp config), conversations, messages |
| 003 | Resources & Bookings | resources (doctores/mesas), bookings (reservaciones) |
| 004 | Agent Telemetry | agent_runs (execution history) |
| 005 | Agent Operations Center | agents (44), handoff_events, queue_states, branch_health, agent_events |
| 006 | Founder Presence | founder_presence (x,y,z en VHQ 3D) |
| 007 | VHQ Operations | tasks, directives, directive_targets, task_watchers, kpi_snapshots |
| 008 | Institutional Intake | crm_activities, growth_clients (v1), os_pipeline (v1) |
| 009 | Realtime | Canal Supabase Realtime para agent events |
| 010 | Agent Enrichment | config_json completo para cada agente (47KB de contexto operativo) |
| 011 | Vertical Types | healthcare, restaurant, spa, professional, nightlife, generic |
| 012 | Finance Module | finance_accounts, finance_transactions, finance_recurring, finance_revenue, finance_categories |
| 013 | Dual CRM | growth_clients, growth_projects, growth_invoices, os_pipeline, crm_activities (version final) |
| 014 | Finance Real Data | Seed: HOK $10K, Mister Clamato $4K, Brincando Ando $2.5K |
| 015 | Finance Agent Waterfall | agent_credit_usage, credit_allocation |
| 016 | Credit Usage | credit_usage, reinvestment_logs |
| 017 | Finance Restructure | Operational ledger, margin calculations |
| 018 | Agent Memory | agent_learnings, chief_brain, memory_feedback |
| 019 | Growth Production | growth_briefs, production_packs, work_logs, 4 production agents, growth_projects extended |

## 5.2 Tablas clave con columnas

### agents (44 registros)
id, name (unique), display_name, branch (ops/os/growth), pod, function_description, autonomy_mode (manual/assisted/automatic), current_status (idle/running/waiting_input/waiting_approval/handoff_pending/blocked/failed/cooldown/offline), health_score (0-100), enabled, owner_label, current_task, last_run_at, last_error_at, last_error_message, config_json (JSONB — contiene TODO el contexto operativo del agente)

### growth_clients
id, name, contact_name, contact_email, contact_phone, business_type, source (referral/outbound/inbound/network/social/other), status (lead/contacted/discovery/proposal/negotiation/active/paused/churned/lost), owner (default: angel@lunolive.com), monthly_value, currency, notes

### growth_projects
id, client_id, name, project_type (social_media/web_development/branding/funnel/content_production/ads_management/consulting/retainer/other), status (scoping/proposal_sent/approved/in_progress/review/delivered/completed/cancelled), total_amount, paid_amount, start_date, due_date, delivered_at, brief_id, research_pack_id, strategy_pack_id, pipeline_stage, estimated_hours, actual_hours, estimated_cost, actual_cost, margin_percent, revision_rounds, delivery_days

### bookings (state machine)
States: draft → pending_confirmation → confirmed → reminded → completed | cancelled | no_show

---

# PARTE 6 — ADMIN PAGES (15)

| Pagina | URL | Que hace |
|--------|-----|---------|
| Dashboard | /admin | KPIs: tenants activos, conversaciones abiertas, conectores degradados, eventos de audit hoy |
| Agent Ops Center | /admin/agent-ops | Branch map expandible, Inspector (4 tabs), Controls (6 acciones), Event Timeline, VHQ 3D con WASD walk mode |
| Agent Telemetria | /admin/agents | Lista de agent_runs con filtros por branch/pod, health scores |
| Tenants | /admin/tenants | Lista + detalle de cada tenant, settings |
| Growth CRM | /admin/growth | Pipeline visual, CRUD clientes/proyectos/facturas, tabs Growth Services + OS Pipeline + Actividad |
| Connectors | /admin/connectors | WhatsApp connections, test endpoints |
| Incidents | /admin/incidents | Agregacion: connector errors + failed runs + escalations |
| Audit | /admin/audit | Trail completo de todas las mutaciones: entity, action, actor, timestamp |
| Finance | /admin/finance | P&L waterfall, MRR, credit allocation, reinvestment, subscriptions |
| Billing | /admin/billing | Placeholder para Stripe |
| Onboarding | /admin/onboarding | Wizard para crear tenants nuevos |
| Knowledge | /admin/knowledge | Links a manifests de luno-ops |
| Ops | /admin/ops | Tasks internas, directives, blockers |
| Security | /admin/security | IAM, roles, auth events |
| Live | /admin/live | Floor 2D legacy (reemplazado por VHQ 3D) |

---

# PARTE 7 — API ENDPOINTS

| Endpoint | Metodo | Funcion | Auth |
|----------|--------|---------|------|
| /api/agents/run | POST | Ejecuta cualquier agente con Claude API | Interno |
| /api/growth/pipeline | POST | Orquesta cadena de produccion: research→strategy→execution→QA | Interno |
| /api/ops-sync | POST | Bridge desde repos externos. Actions: create_lead, create_brief, create_prospect, log_decision, log_learning, bulk_leads | Bearer token (SERVICE_ROLE_KEY) |
| /api/webhook/inbound | POST | Recibe mensajes WhatsApp, ejecuta revenue loop de 12 pasos | Webhook validation |
| /api/test/simulate-message | POST | Dev-only: simula mensaje sin provider real | Dev env check |
| /api/growth/intake | POST | (luno-growth-web) Recibe brief del landing, normaliza, forward a ops-sync | Publico con rate limit + honeypot |

---

# PARTE 8 — DOCTRINA CREATIVA (ANGEL)

## Visual
- **Growth landing:** Dark theme provisional (`#080810`), animated gradient purple/cyan/magenta
- **Luno Platform:** Light theme `#fafafa` — SIEMPRE
- **Accents:** Purple `#a855f7` + Cyan `#06b6d4`
- **Glassmorphism:** 82-92% opacity, 20-24px blur, bordes sutiles
- **Easing:** `[0.22, 1, 0.36, 1]` (pop/snappy) — NUNCA lento, lento = barato
- **Duraciones:** 150-700ms

## Prohibido
- Blobs animados que flotan (dan nausea)
- Particulas decorativas sin proposito
- Estetica toy/placeholder/casino/dashboard generico
- Sombras duras
- Ingles en UI de usuario
- Marketing speak generico ("cutting-edge", "revolutionary")
- Promesas no cumplibles

## Copy
- Espanol de Mexico: "celular" no "movil", "cotizar" no "solicitar presupuesto"
- Directo, sin hype: "Se ve pro" no "Solucion de vanguardia"
- Numeros especificos: "48-72h" no "rapido"
- Honesto: "No se puede prometer ventas"
- WhatsApp como endpoint de conversion

## Aprobaciones obligatorias de Angel
1. Cambio de precios
2. Tono de marca para cliente nuevo
3. Propuestas comerciales antes de enviar
4. Entregables finales (websites, contenido)
5. Copy de hero y CTAs principales
6. Strategy packs antes de ejecutar
7. Seleccion/rechazo de clientes

---

# PARTE 9 — DOCUMENTOS DE PRODUCCION

11 documentos en luno-growth-web/docs/growth-system/:

| Documento | Contenido |
|-----------|-----------|
| creative-doctrine-growth.md | Doctrina visual, copy, componentes, criterios aprobacion/rechazo — CONGELADO |
| intake-schema-growth.md | 25+ campos del brief, normalizacion, mapping a paquetes, SQL schema |
| research-pack-template.md | Mercado, competencia, audiencia, keywords, positioning, risks |
| strategy-pack-template.md | Brand, messaging, website/content/SEO direction, scope boundaries |
| website-execution-pack-template.md | Sitemap, copy por seccion, CTAs, assets, features, brand spec, builder prompt |
| marketing-execution-pack-template.md | Pilares, calendario, campanas, formatos, criterios de salida |
| seo-execution-pack-template.md | Keywords, metadata, on-page, local SEO, monitoring |
| qa-checklists-growth.md | Checklists: website, marketing, SEO, propuestas. Items [ANGEL] = requiere aprobacion |
| delivery-definition-of-done.md | DoD por paquete (Señal/Sistema/Motor), estados, gates de aprobacion |
| economics-tracking-spec.md | Superficies de costo, margenes, capacidad, tracking de tiempo, retrabajo |
| growth-production-system-map.md | Mapa maestro: pipeline, paquetes, dependencias, founder map, gates |

---

# PARTE 10 — REGLAS ABSOLUTAS

1. NUNCA cross-contaminar repos — cada proyecto en su repo
2. Deploy inmediato despues de cada cambio
3. Secrets en .env.local SOLAMENTE — nunca en codigo ni archivos de memoria
4. SIEMPRE correr migrations despues de escribirlas (supabase db push --linked)
5. NUNCA borrar data de usuario en cambios de pipeline
6. RLS obligatorio en toda tabla nueva
7. Audit log en toda mutacion
8. Espanol de Mexico en toda interfaz de usuario
9. Angel aprueba toda propuesta, entregable, y pricing
10. Landing pages publicas en repos SEPARADOS, nunca dentro de luno-platform
11. Todo boton mapea a accion real de backend
12. Cero fake persistence en pantallas finales

---

# PARTE 11 — ESTADO ACTUAL Y PROXIMOS PASOS

## Lo que funciona hoy
- CRM de Growth con 3 clientes activos ($16.5K MRR)
- 44 agentes configurados con contexto completo en DB
- Agent execution via Claude API con memoria persistente y learning loop
- Pipeline de produccion (research → strategy → execution → QA) como API
- Intake API que persiste briefs estructurados en DB
- 15 admin pages funcionales con data real
- Finance module con P&L y credit tracking
- Landing page de Growth con pricing, neuromarketing, formulario
- Revenue loop de 12 pasos (mock, no conectado a WhatsApp real)

## Lo que falta (bloqueante)
- WhatsApp Business API real
- LLM real en revenue loop (mock activo)
- Stripe billing
- Instagram/Facebook accounts para Luno Growth (en proceso)
- Meta Pixel en landing page
- Primeras campanas de ads
- Conectar brief form del landing al pipeline de produccion (API existe, form no la llama aun)

## Lo que falta (importante no bloqueante)
- Automatizacion de handoffs entre agentes (schema existe, logica no)
- Time tracking real de founders
- NPS/usage data de clientes
- Template library reutilizable para websites
- Client portal (que el cliente vea status)
- Automated QA (Lighthouse + accessibility checks)
- Edge Functions para webhooks en Supabase
- Rate limiting en todos los API routes
- 2FA para founders
- Email notifications

---

*Contexto generado desde los repos de Luno — luno-platform + luno-growth-web.*
*Incluye: 19 migraciones, 44 agentes, 15 admin pages, 4 API endpoints, 11 docs de produccion.*
*Fecha: 2026-04-02*
