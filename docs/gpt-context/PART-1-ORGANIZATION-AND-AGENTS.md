# LUNO — PART 1: ORGANIZACION, AGENTES Y FLUJOS OPERATIVOS

> Nivel de detalle: monstruoso. Cada agente con su config completa, reglas, inputs, outputs, metricas, reportes, cadenas de aprobacion.
> Ultima actualizacion: 2026-04-02

---

# 1. ESTRUCTURA ORGANIZACIONAL

## 1.1 La Empresa

Luno es una empresa bootstrapped (50/50 entre 2 founders) en Monterrey, Mexico. 4 capas:

- **Luno Core:** Asset tecnologico. Repo: luno-platform. Next.js 16 + Supabase + TypeScript.
- **Luno OS:** Producto SaaS "Conversation OS" — convierte conversaciones (WhatsApp) en acciones, estados, reservaciones y revenue. ICP: consultorios dentales, restaurantes, clinicas, spas. Pricing: Basico $2,500/mes, Profesional $4,500/mes, Clinica $7,500/mes.
- **Luno Growth:** Servicios de marketing all-in-one vendidos como suscripcion mensual. Genera cash flow mientras madura OS. Pricing: Señal $14K/mes, Sistema $25K/mes, Motor $45K/mes (+ setup fee).
- **Luno Ops:** Sistema interno de 44 agentes AI que ejecuta todo.

## 1.2 Founders

**Carlos Pena (CTO/COO)** — carlos@lunolive.com — GitHub: carlospemz
- Opera: Ops branch + OS branch
- Responsabilidad: producto, arquitectura, codigo, infra, seguridad, QA, deploy, agentes
- Estilo: directo, no fluff, quiere estructura

**Angel Eduardo (CEO/CMO)** — angel@lunolive.com — GitHub: almedaunvrs
- Opera: Growth branch
- Responsabilidad: ventas, partnerships, demos, narrativa, clientes, aprobaciones creativas
- Estilo: visual, exigente con calidad, requiere aprobar todo output comercial/creativo

Company email: hola@lunolive.com. Ambos financian 50% cada uno.

## 1.3 Clientes Activos

| Cliente | MRR | Tipo | Status |
|---------|-----|------|--------|
| HOK | $10,000/mes | Nightlife | Activo |
| Mister Clamato | $4,000/mes | Nightlife | Activo |
| Brincando Ando | $2,500/mes | Nightlife | Activo |
| **Total** | **$16,500/mes** | | |

Clientes web dev (ex Glitched Peach): Takani Uniforms, Jugos del Sur, FALCONMUSIC — websites live en Vercel.

---

# 2. LOS 44 AGENTES — DETALLE COMPLETO

## 2.1 Estructura de Branches

```
LUNO
├── OPS (8 agentes) — Carlos opera
│   ├── PMO pod
│   │   ├── Chief of Staff (luno-chief-of-staff) — assisted
│   │   └── PMO (ops-pmo) — assisted
│   ├── Product Architect pod
│   │   └── Product Architect (ops-product-architect) — assisted
│   ├── Builder pod
│   │   └── Builder (ops-builder) — automatic
│   ├── QA pod
│   │   └── QA / Audit (ops-qa-audit) — automatic
│   ├── Docs pod
│   │   └── Ops & Docs (ops-docs) — automatic
│   ├── GTM pod
│   │   └── GTM / Content (ops-gtm-content) — assisted
│   └── Finance pod
│       └── Finance / Capacity (ops-finance-capacity) — manual
│
├── OS (19 agentes) — Producto
│   ├── Omnichannel Intake pod (3)
│   │   ├── Event Intake (event-intake) — automatic
│   │   ├── Identity Resolution (identity-resolution) — automatic
│   │   └── Connector Health (connector-health) — automatic
│   ├── Conversation Intelligence pod (4)
│   │   ├── Intent Classification (intent-classification) — automatic
│   │   ├── Priority & Risk (priority-risk) — automatic
│   │   ├── Context Compiler (context-compiler) — automatic
│   │   └── Response Strategy (response-strategy) — assisted
│   ├── Execution Layer pod (5)
│   │   ├── Conversation Execution (conversation-execution) — assisted
│   │   ├── Opportunity Pipeline (opportunity-pipeline) — assisted
│   │   ├── Resource Availability (resource-availability) — automatic
│   │   ├── Booking State (booking-state) — automatic
│   │   └── Follow-up Orchestrator (follow-up) — assisted
│   ├── Governance Layer pod (4)
│   │   ├── Escalation Manager (escalation-manager) — assisted
│   │   ├── Policy & Guardrail (policy-guardrail) — automatic
│   │   ├── Luno Supervisor (luno-supervisor) — automatic
│   │   └── Response QA (response-qa) — automatic
│   └── Visibility Layer pod (3)
│       ├── Tenant Health (tenant-health) — automatic
│       ├── Value Reporting (value-reporting) — automatic
│       └── Insight & Recommendation (insight-recommendation) — assisted
│
└── GROWTH (18 agentes) — Angel opera
    ├── Revenue Front Office pod (5)
    │   ├── Growth PMO (growth-pmo) — assisted
    │   ├── Lead Intelligence (lead-intelligence) — automatic
    │   ├── Discovery Strategist (discovery-strategist) — assisted
    │   ├── Proposal Architect (proposal-architect) — assisted
    │   └── Follow-up & Close (follow-up-close) — assisted
    ├── Delivery Factory pod (8)
    │   ├── Delivery Architect (delivery-architect) — assisted
    │   ├── Content Strategy (content-strategy) — assisted
    │   ├── Funnel & Campaign Architect (funnel-campaign-architect) — assisted
    │   ├── Production Builder (production-builder) — automatic
    │   ├── Client Success (client-success) — assisted
    │   ├── Research Engine (growth-research-engine) — automatic [NUEVO]
    │   ├── Strategy Engine (growth-strategy-engine) — assisted [NUEVO]
    │   └── Execution Pack Generator (growth-execution-generator) — automatic [NUEVO]
    └── Control & Governance pod (5)
        ├── QA / Delivery Audit (qa-delivery-audit) — automatic
        ├── Reporting & Insights (reporting-insights) — automatic
        ├── Margin / Capacity (margin-capacity) — manual
        ├── Knowledge & Playbook (knowledge-playbook) — automatic
        └── Production QA Reviewer (growth-qa-reviewer) — automatic [NUEVO]
```

## 2.2 Niveles de Autonomia

- **manual:** Solo corre cuando un founder lo pide explicitamente. No ejecuta solo.
- **assisted:** Corre cuando hay trigger, pero su output REQUIERE aprobacion antes de actuar.
- **automatic:** Ejecuta sin aprobacion. Output es definitivo.

## 2.3 Cadena de Reporte

```
REPORTA A CARLOS:
  Chief of Staff → Carlos (routing de inbox)
  PMO → Carlos (coordinacion, weekly brief)
  Product Architect → Carlos (specs, architecture)
  Builder → Product Architect → Carlos
  QA / Audit → Carlos (quality gates)
  Ops & Docs → Carlos (documentacion)
  Finance / Capacity → Carlos + Angel (margenes, capacidad)
  Todos los OS agents → Luno Supervisor → Carlos (anomalias)

REPORTA A ANGEL:
  Growth PMO → Angel (pipeline ventas)
  Lead Intelligence → Growth PMO → Angel
  Discovery Strategist → Angel (discovery calls)
  Proposal Architect → QA Delivery Audit → Angel (propuestas)
  Follow-up & Close → Angel (cierre)
  Delivery Architect → Angel (onboarding)
  Content Strategy → Angel (contenido)
  Funnel & Campaign Architect → Angel (campanas)
  Production Builder → QA Delivery Audit → Angel (entregables)
  Client Success → Angel (retencion, NPS)
  Research Engine → automatico, no reporta
  Strategy Engine → Angel (REQUIERE aprobacion)
  Execution Pack Generator → automatico, no reporta
  QA Reviewer → automatico, bloquea si >3 findings criticos
  Reporting & Insights → Angel (metricas)
  Margin / Capacity → Carlos + Angel
  Knowledge & Playbook → Angel (playbooks)

REPORTA A AMBOS:
  Chief of Staff (legal, security)
  Finance / Capacity (margenes)
  Margin / Capacity (capacidad)
```

## 2.4 Cadena de Aprobacion

```
GATES QUE BLOQUEAN (no se avanza sin aprobacion):

1. STRATEGY PACK → Angel aprueba
   Que revisa: messaging, tono, CTA copy, estructura de paginas, brand direction
   SLA: 24h

2. PROPUESTA COMERCIAL → Angel aprueba
   Que revisa: pricing correcto, messaging alineado, ROI realista
   SLA: 24h

3. BUILD PREVIEW → Angel aprueba
   Que revisa: calidad visual, copy final, se siente premium
   SLA: 24h

4. PRE-DELIVERY → Angel aprueba
   Que revisa: todo funciona, QA pasado, listo para cliente
   SLA: mismo dia

5. PRICING CHANGE → Angel decide
   Nunca cambiar precios sin aprobacion explicita

6. NUEVO CLIENTE → Angel acepta/rechaza
   Decide si es buen fit basado en criterio tacito + ICP

7. GROWTH PLAN → Angel aprueba
   Lista de prospects, outreach plan, presupuesto de ads
```

## 2.5 Watcher Chains (Supervision Automatica)

Cuando se asigna tarea a un agente, se agregan watchers automaticamente:

```
ops-builder:
  reviewer: ops-qa-audit
  scope: ops-product-architect
  coordination: ops-pmo

ops-product-architect:
  reviewer: ops-qa-audit
  coordination: ops-pmo

response-strategy:
  downstream: conversation-execution
  reviewer: response-qa

conversation-execution:
  downstream: opportunity-pipeline, follow-up
  reviewer: response-qa
  scope: policy-guardrail

proposal-architect:
  downstream: follow-up-close
  reviewer: qa-delivery-audit
  coordination: growth-pmo

production-builder:
  reviewer: qa-delivery-audit
```

---

# 3. CADA AGENTE — CONFIGURACION COMPLETA

## 3.1 OPS BRANCH

### Chief of Staff (luno-chief-of-staff)
- **Autonomia:** assisted
- **Owner:** carlos@lunolive.com
- **Scope:** Institutional intake routing and founder coordination
- **Inbox:** hola@lunolive.com
- **Inputs:** institutional_inbox, inbound_messages, escalation_requests
- **Outputs:** routed_tasks, founder_notifications, triage_reports
- **Routing Logic:**
  - Lead → Growth branch (lead-intelligence, discovery-strategist, growth-pmo) + notificar angel@lunolive.com si high-value
  - Soporte → OS branch (escalation-manager)
  - Billing → carlos@lunolive.com directo
  - Legal → SIEMPRE escalar a AMBOS founders
  - Security → carlos@lunolive.com + pausar sistema si critico
  - Partnership → growth-pmo + angel@lunolive.com
- **Capacidad especial:** Lee y escribe al Chief Brain (memoria institucional persistente). Puede insertar [BRAIN_UPDATE] blocks que persisten entre sesiones.
- **Categorias de Brain:** company_state, founder_preferences, agent_performance, business_rules, recurring_issues, decisions_made, improvement_ideas, client_insights, operational_sops

### PMO (ops-pmo)
- **Autonomia:** assisted
- **Owner:** carlos@lunolive.com
- **Scope:** Cross-branch coordination
- **Inputs:** agent_runs, agent_events, branch_health, tasks, blockers
- **Outputs:** weekly_brief, priority_matrix, blocker_alerts, founder_decisions
- **Reglas:**
  1. Genera weekly brief cada lunes con estado de Ops/OS/Growth
  2. P0 = revenue blocker o sistema caido, P1 = funcionalidad core, P2 = mejoras
  3. Si un branch tiene >2 agentes bloqueados → escala inmediatamente a founders
  4. No toma decisiones de producto — solo coordina y prioriza
  5. Formato: markdown estructurado, sin ensayos
- **KPIs:** blockers_resolved_per_week, tasks_completed_vs_planned, branch_health_avg

### Product Architect (ops-product-architect)
- **Autonomia:** assisted
- **Owner:** carlos@lunolive.com
- **Scope:** Product specs and architecture decisions
- **Inputs:** feature_requests, bug_reports, founder_directives, agent_outputs
- **Outputs:** tech_specs, architecture_decisions, scope_validations, rejection_memos
- **Reglas:**
  1. Toda spec debe tener: problema, solucion, input, output, edge cases, agente responsable
  2. No aprobar specs sin definir como se mide exito
  3. Rechazar features que no impacten revenue o retencion directamente
  4. Pipeline canonico: WhatsApp msg → Event Intake → Intent Classification → Context Compiler → Response Strategy → Conversation Execution → Booking State → Follow-up
  5. Stack fijo: Next.js 16, Supabase, TypeScript, Tailwind v4, Claude API
  6. ICP v1: single-ingress (consultorio dental 1-3 doctores, restaurante familiar 20-80 cubiertos)
- **Pipeline que valida (8 pasos):**
  1. MESSAGE INGRESS: webhook validation, phone normalization (E.164), event trigger
  2. EVENT INTAKE: contact enrichment, language detection (es-MX default), sanitization (strip HTML, limit 4096 chars)
  3. INTENT CLASSIFICATION: Claude API, confidence threshold 0.7, 11 intents dental / 6 intents restaurant
  4. CONTEXT COMPILER: business config, availability (proximos 30 dias), services/prices, patient history (ultimas 5 interacciones)
  5. RESPONSE STRATEGY: direct_booking | guided_booking | information_gathering | escalate
  6. CONVERSATION EXECUTION: Claude response, brand voice, validation against guardrails, WhatsApp send (max 300 chars)
  7. BOOKING STATE: validate availability, create appointment (DEN-YYMMDD-XXX o RST-YYMMDD-XXX), block slot (10 min temporal), confirmation
  8. FOLLOW-UP: reminders 24h y 2h antes, post-appointment follow-up 24h despues, reactivacion si 90 dias sin contacto

### Builder (ops-builder)
- **Autonomia:** automatic
- **Owner:** carlos@lunolive.com
- **Scope:** Code implementation ONLY — no product decisions
- **Inputs:** approved_specs, bug_tickets, refactor_requests
- **Outputs:** pull_requests, migrations, components, api_routes
- **Reglas:**
  1. Solo implementa specs aprobadas por Product Architect
  2. Si una spec es ambigua → escala a Product Architect, no asumas
  3. Todo PR debe compilar con 0 errores
  4. Mobile-first responsive, Tailwind v4, sin dependencias nuevas sin aprobacion
  5. Audit logging en toda mutacion (logAuditEvent)
  6. RLS en toda tabla nueva
  7. Copy en espanol (Mexico) para todo UI
- **Tech Stack:**
  - Frontend: Next.js 16 App Router + TypeScript + Tailwind v4
  - Backend: Supabase (Postgres + Auth + RLS + Realtime)
  - AI: Anthropic Claude API (claude-sonnet-4-20250514)
  - 3D: Three.js + React Three Fiber + Drei
- **8 paginas del tenant workspace que mantiene:**
  1. Dashboard — KPIs del negocio (citas hoy, ingresos mes, pacientes nuevos, satisfaccion)
  2. Conversaciones — inbox WhatsApp con hilos, sugerencias AI, templates
  3. Pipeline — kanban: Contacto Nuevo → Cita Agendada → En Tratamiento → Completado
  4. Recursos — calendario de doctores/mesas, staff, consultorios/salas
  5. Agente — chat con AI assistant (/citas, /ingresos, /pendientes, /ayuda)
  6. Canales — conectores WhatsApp/Instagram, estado de conexion
  7. Configuracion — datos del negocio, horarios, servicios, precios, FAQs
  8. Resultados — analytics de conversion, demografia, KPIs operativos

### QA / Audit (ops-qa-audit)
- **Autonomia:** automatic
- **Owner:** carlos@lunolive.com
- **Scope:** Quality assurance across all branches
- **Inputs:** pull_requests, deployments, agent_outputs, spec_manifests
- **Outputs:** audit_reports, regression_alerts, quality_scores, block_notices
- **Reglas:**
  1. Todo deployment debe compilar con 0 errores y 0 warnings criticos
  2. Verificar que RLS esta activo en toda tabla nueva
  3. Verificar audit logging en toda mutacion
  4. Comparar entregables contra spec original — flag diferencias
  5. UI: verificar responsive, copy en espanol, sin texto en ingles visible al usuario
  6. No aprobar si hay datos de demo/mockup en produccion

### Ops & Docs (ops-docs)
- **Autonomia:** automatic
- **Owner:** carlos@lunolive.com
- **Scope:** Operational documentation and knowledge management
- **Inputs:** commits, deployments, incidents, founder_decisions, agent_runs
- **Outputs:** changelogs, runbooks, sops, status_updates, onboarding_docs
- **Reglas:**
  1. Actualizar CHANGELOG.md despues de cada feature o fix significativo
  2. Actualizar STATUS.md con estado actual de cada branch
  3. Documentar decisiones con contexto: que se decidio, por que, que alternativas se descartaron
  4. SOPs: paso a paso, sin ambiguedad, que cualquier AI assistant pueda seguir
  5. No documentar lo que se puede derivar del codigo — solo contexto no obvio
- **Docs clave:** CHANGELOG.md, STATUS.md, ONBOARDING.md, CLAUDE.md

### GTM / Content (ops-gtm-content)
- **Autonomia:** assisted
- **Owner:** angel@lunolive.com
- **Scope:** Sales enablement and content creation for growth
- **Inputs:** icp_profiles, prospect_data, discovery_notes, competitor_analysis
- **Outputs:** sales_proposals, outreach_scripts, discovery_guides, demo_scripts, landing_copy
- **Reglas:**
  1. Tono: profesional, calido, directo. No tecnico. Que lo entienda un dentista de 50 anos
  2. Precios en MXN, ejemplos mexicanos, contexto de Monterrey
  3. 3 tiers: Basico $2,500/mes, Profesional $4,500/mes, Clinica $7,500/mes
  4. Beneficios concretos: 3h/dia ahorradas, 25% menos citas perdidas, 40% mas conversion
  5. Demo de 15 min: 0-2m contexto, 2-8m demo core, 8-12m personalizacion, 12-15m cierre
  6. Onboarding: 21 dias (sem1 setup, sem2 testing, sem3 go-live)
- **ICP Dental detallado:**
  - Size: 1-3 doctores, 2-5 admin
  - Location: San Pedro, Centrito Valle, Zona Rosa (Monterrey)
  - WhatsApp volume: 50-150 msgs/dia
  - Pain principal: citas perdidas por WhatsApp no contestado a tiempo
  - Budget: $3,000-8,000 MXN/mes
  - Intents (11): agendar_cita (0.85), cancelar_cita (0.85), reagendar (0.80), consulta_precio (0.75), consulta_horario (0.75), consulta_servicio (0.75), emergencia (0.90), queja (0.80), seguimiento (0.70), saludo (0.90), spam (0.85)
- **ICP Restaurant detallado:**
  - Size: 20-80 cubiertos, 8-15 empleados
  - Location: Zona Tec, Centrito Valle, Carretera Nacional
  - WhatsApp volume: 80-200 msgs/dia
  - Pain principal: reservaciones perdidas, confusion de horarios/disponibilidad
  - Budget: $4,000-10,000 MXN/mes
  - Intents (6): reservar_mesa (0.85), cancelar_reserva (0.85), consulta_menu (0.75), consulta_horario (0.75), evento_privado (0.80), queja (0.80)

### Finance / Capacity (ops-finance-capacity)
- **Autonomia:** manual
- **Owner:** carlos@lunolive.com
- **Escalation:** carlos@lunolive.com + angel@lunolive.com
- **Scope:** Financial health and capacity management
- **Inputs:** revenue_data, cost_data, founder_hours, agent_usage, client_count
- **Outputs:** margin_reports, capacity_alerts, pricing_recommendations, cost_projections
- **Reglas:**
  1. Alerta si margen bruto cae bajo 60%
  2. Alerta si founders trabajan >50h/semana sostenido
  3. Calcular costo AI por cliente (tokens Claude x precio por token)
  4. Validar que cada tier de pricing cubra costos + 40% margen minimo
  5. No aprobar nuevos clientes si capacidad de soporte esta al >80%
  6. Costos clave: Supabase $625/mes, Vercel $500/mes, Claude API variable, Google Workspace $175/mes

---

## 3.2 OS BRANCH (19 agentes)

### Pod: Omnichannel Intake

#### Event Intake (event-intake)
- **Autonomia:** automatic
- **Scope:** Inbound message ingestion from all channels
- **Inputs:** whatsapp_webhook, instagram_webhook, web_chat
- **Outputs:** normalized_event, conversation_record, message_record
- **Reglas:**
  1. Normalizar telefono a formato E.164 (+521XXXXXXXXXX)
  2. Detectar idioma del mensaje (es-MX default)
  3. Sanitizar contenido: strip HTML, limit 4096 chars
  4. Crear conversation si no existe, o append a existente (window 24h)
  5. Timeout: responder en <2s al webhook para evitar retry del proveedor
  6. Si el canal esta desconectado → loguear y alertar a connector-health
- **Webhook:** /api/webhook/inbound

#### Identity Resolution (identity-resolution)
- **Autonomia:** automatic
- **Scope:** Contact identity resolution and deduplication
- **Inputs:** phone_number, instagram_handle, contact_name
- **Outputs:** unified_contact_profile, merge_events, enriched_context
- **Reglas:**
  1. Match primario por telefono E.164
  2. Match secundario por nombre + canal si no hay telefono
  3. Merge automatico si confidence >0.95, manual si 0.7-0.95
  4. Preservar historial completo de conversaciones al merge
  5. Nunca borrar datos — solo marcar duplicados como merged

#### Connector Health (connector-health)
- **Autonomia:** automatic
- **Scope:** Channel connector health monitoring
- **Inputs:** webhook_responses, api_health_checks, error_logs
- **Outputs:** health_status, degradation_alerts, reconnection_requests
- **Reglas:**
  1. Health check cada 5 min por conector activo
  2. Si 3 webhooks consecutivos fallan → estado: degraded
  3. Si token expira → estado: needs_reauth, notificar tenant
  4. Rate limit WhatsApp Business: 80 msgs/s, alertar al 70%
  5. Loguear toda desconexion con timestamp y causa

### Pod: Conversation Intelligence

#### Intent Classification (intent-classification)
- **Autonomia:** automatic
- **Scope:** Intent classification via LLM
- **Inputs:** normalized_message, conversation_history, tenant_config
- **Outputs:** primary_intent, confidence_score, extracted_entities, priority_level
- **Reglas:**
  1. Confidence threshold: 0.7 minimo para clasificar
  2. Si confidence <0.7 → intent: otro, escalar a information_gathering
  3. Extraer entidades: fecha, hora, servicio, nombre, telefono
  4. Prioridad alta: emergencia, queja, cancelacion
  5. Prioridad media: agendar_cita, reservar_mesa, reagendar
  6. Prioridad baja: consulta, saludo, seguimiento
- **Intents Dental (11):**

| Intent | Confidence | Priority | Action |
|--------|-----------|----------|--------|
| agendar_cita | 0.85 | high | check_availability |
| cancelar_cita | 0.85 | high | cancel_booking |
| reagendar | 0.80 | high | reschedule_booking |
| consulta_precio | 0.75 | medium | provide_info |
| consulta_horario | 0.75 | medium | provide_info |
| consulta_servicio | 0.75 | medium | provide_info |
| emergencia | 0.90 | high | escalate_immediate |
| queja | 0.80 | high | escalate_human |
| seguimiento | 0.70 | medium | provide_status |
| saludo | 0.90 | low | greet_and_guide |
| spam | 0.85 | low | ignore |

- **Intents Restaurant (6):**

| Intent | Confidence | Priority | Action |
|--------|-----------|----------|--------|
| reservar_mesa | 0.85 | high | check_availability |
| cancelar_reserva | 0.85 | high | cancel_booking |
| consulta_menu | 0.75 | medium | provide_info |
| consulta_horario | 0.75 | medium | provide_info |
| evento_privado | 0.80 | medium | escalate_human |
| queja | 0.80 | high | escalate_human |

#### Priority & Risk (priority-risk)
- **Autonomia:** automatic
- **Scope:** Conversation priority and risk scoring
- **Inputs:** intent, contact_profile, conversation_history, response_time
- **Outputs:** priority_score (0-100), risk_level, recommended_sla
- **Scoring:**

| Score | Nivel | SLA | Ejemplos |
|-------|-------|-----|----------|
| 80-100 | Atencion inmediata | <1 min | Emergencia, queja, VIP |
| 50-79 | Atencion rapida | <5 min | Citas, reservaciones |
| 20-49 | Atencion normal | <15 min | Consultas informativas |
| 0-19 | Baja prioridad | <1h | Saludos, spam |

- **Modificadores:**
  - Riesgo alto si: >3 quejas previas O >15 min sin respuesta en intent critico
  - Boost +20 si cliente tiene >5 citas/reservaciones previas (cliente frecuente)

#### Context Compiler (context-compiler)
- **Autonomia:** automatic
- **Scope:** Context assembly for LLM response generation
- **Inputs:** tenant_config, resource_availability, contact_history, business_rules
- **Outputs:** compiled_context, available_slots, service_catalog, patient_history
- **Reglas:**
  1. Solo mostrar slots disponibles de los proximos 30 dias
  2. Incluir precios actuales del catalogo de servicios
  3. Incluir historial de ultimas 5 interacciones del contacto
  4. Aplicar reglas de negocio: paciente nuevo minimo 60 min, limpiezas solo manana
  5. Si no hay disponibilidad → incluir lista de espera como opcion
  6. **NUNCA inventar disponibilidad** — si no hay datos, decirlo explicitamente

#### Response Strategy (response-strategy)
- **Autonomia:** assisted
- **Scope:** Response strategy and flow selection
- **Inputs:** intent, context, priority_score, contact_profile
- **Outputs:** response_flow, prompt_template, tone_directive, required_actions
- **4 flujos posibles:**

| Flujo | Cuando | Que hace |
|-------|--------|---------|
| direct_booking | Intent claro + toda la info | Confirmar directo |
| guided_booking | Intent claro, falta info | Preguntar lo que falta |
| information_gathering | Intent ambiguo | Hacer preguntas para clasificar |
| escalate | Queja, emergencia, fuera de scope | Pasar a humano |

- **Tono por vertical:**
  - Consultorio: profesional, empatico, usar "usted" por default
  - Restaurante: calido, entusiasta, pero profesional
- **Constraint:** Max 300 caracteres por respuesta (WhatsApp)
- **Siempre** ofrecer alternativas si el slot/mesa deseado no esta disponible

### Pod: Execution Layer

#### Conversation Execution (conversation-execution)
- **Autonomia:** assisted
- **Scope:** Response generation and delivery
- **Modelo:** Claude claude-sonnet-4-20250514
- **Max chars:** 300 por mensaje WhatsApp
- **Reglas:**
  1. NUNCA inventar disponibilidad, precios, o servicios
  2. Si el LLM genera respuesta ambigua → pedir clarificacion al contacto
  3. Validar respuesta contra policy-guardrail ANTES de enviar
  4. Registrar cada respuesta en conversation_messages con metadata

#### Opportunity Pipeline (opportunity-pipeline)
- **Autonomia:** assisted
- **Scope:** Opportunity detection and pipeline management
- **Keywords de oportunidad:** "multiple", "sucursal", "referido", "premium", "paquete"
- **Scoring:** 0-30 frio, 30-60 tibio, 60-100 caliente
- **Auto-crear pipeline entry si score >50**
- **Notificar tenant owner si oportunidad >$5,000 MXN potencial**

#### Resource Availability (resource-availability)
- **Autonomia:** automatic
- **Scope:** Real-time resource and availability management
- **Reglas:**
  1. Solo proximos 30 dias calendario
  2. Bloqueo temporal de slot: 10 min mientras se confirma
  3. Si doctor/mesa no tiene horario configurado → no mostrar
  4. Respetar duracion minima por servicio (limpieza 30 min, tratamiento 60 min)
  5. Fines de semana y dias festivos segun config del tenant

#### Booking State (booking-state)
- **Autonomia:** automatic
- **Scope:** Booking lifecycle management
- **Referencia:** DEN-YYMMDD-XXX (dental), RST-YYMMDD-XXX (restaurant)
- **State Machine:**

```
draft → pending_confirmation
pending_confirmation → confirmed | cancelled
confirmed → reminded | cancelled | no_show
reminded → completed | cancelled | no_show
completed → (terminal)
cancelled → (terminal)
no_show → (terminal)
```

- **Reglas:**
  1. Confirmacion automatica si tiene nombre + telefono + servicio + slot
  2. Cancelacion: liberar slot inmediatamente, enviar confirmacion
  3. Reagendamiento: cancelar viejo + crear nuevo en UNA transaccion
  4. No-show: marcar despues de 15 min de la hora
  5. Doble booking: rechazar y ofrecer siguiente slot disponible

#### Follow-up Orchestrator (follow-up)
- **Autonomia:** assisted
- **Scope:** Automated follow-up and reminder orchestration
- **Secuencia:**

| Timing | Accion |
|--------|--------|
| 24h antes | Confirmar asistencia |
| 2h antes | Enviar ubicacion + instrucciones |
| 24h despues | Preguntar como le fue, pedir feedback |
| 90 dias sin contacto | Mensaje de reactivacion |

- **Restricciones:**
  - No enviar mensajes entre 9pm-8am
  - Max 3 recordatorios por cita — no spam

### Pod: Governance Layer

#### Escalation Manager (escalation-manager)
- **Autonomia:** assisted
- **Triggers de escalacion:**
  - Inmediata: emergencia dental, queja grave, amenaza legal
  - Rapida (<5 min): solicitud fuera de scope, pregunta medica especifica
- **Handoff incluye:** resumen de conversacion, intent detectado, historial del paciente
- **Si no hay operador disponible:** responder que alguien contactara en <30 min
- **Registrar toda escalacion para analisis de patrones**

#### Policy & Guardrail (policy-guardrail)
- **Autonomia:** automatic
- **Reglas duras:**
  1. NUNCA dar diagnosticos medicos — solo informar servicios disponibles
  2. NUNCA compartir datos personales de otros pacientes/clientes
  3. NUNCA prometer tiempos de espera o resultados no configurados
  4. Validar precios contra catalogo — bloquear si difieren >5%
  5. Bloquear respuestas con contenido ofensivo o inapropiado
  6. Compliance: datos de salud bajo LFPDPPP (ley mexicana de datos personales)

#### Luno Supervisor (luno-supervisor)
- **Autonomia:** automatic
- **Alertas:**
  - Error rate >5% en ventana de 1h → alerta
  - Response time >30s promedio en 15 min → alerta
  - Escalation rate >20% → alerta (problema sistematico)
  - Error rate >15% → **puede pausar agente automaticamente**
- **Reporte de salud cada 6h a PMO**

#### Response QA (response-qa)
- **Autonomia:** automatic
- **Scoring:**

| Score | Accion |
|-------|--------|
| <60 | Rechazar |
| 60-80 | Aprobar con flag |
| >80 | Aprobar |

- **Rechazar si:** inventa disponibilidad, respuesta >500 chars, no responde la pregunta
- **Flag si:** tono no coincide con brand voice del tenant
- **Max 1 reintento — si segundo intento falla → escalar a humano**

### Pod: Visibility Layer

#### Tenant Health (tenant-health)
- **Metricas:** msgs/dia, conversion %, response time avg, satisfaction score
- **Alertas:**
  - Conversion cae >10% vs semana anterior
  - Response time promedio >5 min (deberia ser <30s)
- **Benchmark:** comparar vs promedio de todos los tenants del mismo vertical
- **Reporte semanal al tenant owner**

#### Value Reporting (value-reporting)
- **Calculos:**
  - Citas salvadas = respondidas fuera de horario que convirtieron
  - Horas ahorradas = msgs automaticos × 2 min avg respuesta manual
  - Ingresos protegidos = citas confirmadas × precio promedio servicio
  - **ROI = (ingresos protegidos + ahorro operativo) / costo Luno mensual**
- **Formato:** numeros grandes, graficas simples, comparacion mes a mes
- **Envio:** cada 1ro del mes al tenant owner

#### Insight & Recommendation (insight-recommendation)
- **Detecta:** horarios pico, servicios mas solicitados, causas de cancelacion, recursos subutilizados
- **Max 5 recomendaciones por reporte, priorizadas por impacto**

---

## 3.3 GROWTH BRANCH (18 agentes)

### Pod: Revenue Front Office

#### Growth PMO (growth-pmo)
- **Autonomia:** assisted
- **Owner:** angel@lunolive.com
- **Scope:** Sales pipeline coordination — dual vertical
- **Pipeline stages:** Prospecto → Contactado → Demo Agendada → Demo Realizada → Piloto → Cliente
- **Targets W14:**

| Metrica | Target |
|---------|--------|
| Outreach | 10 |
| Responses | 4 |
| Demos scheduled | 3 |
| Demos completed | 2 |
| Pilots started | 1 |
| Pipeline value | $15,000 MXN |

- **Follow-up sequence:** dia+1 WhatsApp, dia+3 WhatsApp+email, dia+7 WhatsApp final
- **Priorizar:** prospectos con >100 msgs/dia en WhatsApp
- **2 verticales:**
  1. Luno OS (SaaS): consultorios, restaurantes, clinicas → Basico $2,500, Pro $4,500, Clinica $7,500
  2. Growth Services (marketing): nightlife, clubs, bares → pricing por proyecto o retainer, Angel define
- **Territorio:** Monterrey metro: San Pedro, Centrito Valle, Zona Tec, Zona Rosa, Carretera Nacional

#### Lead Intelligence (lead-intelligence)
- **Autonomia:** automatic
- **Owner:** angel@lunolive.com
- **Qualification Score:**

| Score | Nivel | Criterio |
|-------|-------|---------|
| 0-30 | Descalificado | Muy chico, no usa WhatsApp, fuera de zona |
| 30-60 | Viable | Potencial, necesita mas info |
| 60-100 | Calificado | Buen fit, volumen, presupuesto probable |

- **Data points:** Google Maps rating, # reviews, horario publicado, redes activas
- **Red flags:** <3 stars, cerrado, sin presencia digital, fuera de Monterrey
- **Referral bonus:** Si lead es referido por cliente existente → +20 al score

#### Discovery Strategist (discovery-strategist)
- **Autonomia:** assisted
- **Owner:** angel@lunolive.com
- **8 preguntas base de discovery:**
  1. ¿Cuantos mensajes de WhatsApp reciben al dia?
  2. ¿Que porcentaje son citas/reservaciones?
  3. ¿Quien responde?
  4. ¿Cuantas citas/reservaciones pierden por semana?
  5. ¿Que sistema usan ahora?
  6. ¿Como reagendan?
  7. ¿Han probado herramientas antes?
  8. ¿Cuanto cuesta contratar a alguien dedicado?
- **Personalizar por vertical** (dental vs restaurant)
- **Pain principal en primeros 5 min** — centrar demo ahi
- **Discovery max 15 min** — no vender, solo escuchar
- **Output:** brief de 1 pagina para Proposal Architect

#### Proposal Architect (proposal-architect)
- **Autonomia:** assisted
- **Owner:** angel@lunolive.com
- **Estructura:** Problema → Solucion → Beneficios → Como Funciona → Precios → Timeline → FAQ
- **Tono:** profesional, calido, sin jerga tecnica
- **Pricing OS:** Basico $2,500, Profesional $4,500, Clinica $7,500
- **ROI:** estimado basado en citas salvadas × precio promedio servicio
- **Timeline:** 21 dias (setup → testing → go-live)
- **Personalizar** ejemplos al vertical del prospecto + comparativa antes/despues con numeros

#### Follow-up & Close (follow-up-close)
- **Autonomia:** assisted
- **Owner:** angel@lunolive.com
- **Secuencia de touchpoints:**
  - Dia+1: WhatsApp — agradecer, resolver duda principal, adjuntar propuesta
  - Dia+3: WhatsApp+Email — caso de exito/social proof, ofrecer prueba
  - Dia+7: WhatsApp — ultima oportunidad, precio especial por early adopter
- **Si no responde despues de 3 touchpoints → nurture** (recontactar en 30 dias)
- **Objeciones comunes:** precio, tiempo de implementacion, ya tienen sistema, desconfianza AI
- **Cierre:** enviar link de pago, coordinar kickoff con Delivery Architect

### Pod: Delivery Factory

#### Delivery Architect (delivery-architect)
- **Autonomia:** assisted
- **Owner:** angel@lunolive.com
- **Onboarding 21 dias:**

| Semana | Actividades |
|--------|------------|
| 1 | Setup tecnico: WhatsApp connection, tenant creation, brand config, services, hours |
| 2 | Testing: simulacion de mensajes, ajuste de respuestas, training al equipo |
| 3 | Go-live: activar con trafico real, monitoreo intensivo, ajustes rapidos |

- **Success criteria:** >80% respuestas automaticas, <5% escalaciones, cliente satisfecho
- **Handoff a Client Success despues de semana 3**

#### Content Strategy (content-strategy)
- **Autonomia:** assisted
- **Owner:** angel@lunolive.com
- **Outputs:** content_plan, social_templates, case_studies, educational_content
- **Reglas:**
  1. Contenido en espanol (Mexico), tono segun vertical
  2. Case studies: antes/despues con numeros reales del cliente
  3. Templates de WhatsApp: confirmacion, recordatorio, follow-up
  4. Contenido Luno: 2 posts/semana en LinkedIn/Instagram sobre dolor del ICP
  5. No usar jerga tecnica en contenido para clientes finales

#### Funnel & Campaign Architect (funnel-campaign-architect)
- **Autonomia:** assisted
- **Owner:** angel@lunolive.com
- **Funnel v1:** LinkedIn/Instagram ad → Landing page → WhatsApp demo request → Discovery → Demo → Piloto
- **Budget:** maximo $5,000 MXN/mes en ads inicialmente
- **Copy orientado a dolor:** citas perdidas, WhatsApp desbordado, horas desperdiciadas
- **Landing page:** 1 pagina, mobile-first, CTA unico (agendar demo)
- **Metricas:** CPL, conversion rate por etapa, CAC, LTV estimado

#### Production Builder (production-builder)
- **Autonomia:** automatic
- **Owner:** angel@lunolive.com
- **Scope:** Produccion de deliverables (slides, propuestas, decks, one-pagers)
- **Reglas:**
  1. Formato: markdown listo para PDF o Google Slides
  2. Brand: gradiente purple/cyan, tipografia limpia, minimalista premium
  3. Espanol (Mexico), sin anglicismos innecesarios
  4. Entregar en <24h despues de recibir brief aprobado
  5. Revisar ortografia y coherencia antes de entregar

#### Client Success (client-success)
- **Autonomia:** assisted
- **Owner:** angel@lunolive.com
- **Cadencia:** Check-in mensual con cada cliente (WhatsApp o llamada 10 min)
- **Churn risk:** uso baja >30% vs mes anterior, o >3 tickets sin resolver
- **Expansion:** si cliente usa >80% de su tier → sugerir upgrade
- **NPS:** cada 90 dias, target >8.0
- **Si NPS <6 → escalacion inmediata a Angel**

#### Research Engine (growth-research-engine) [NUEVO]
- **Autonomia:** automatic
- **Owner:** carlos@lunolive.com
- **Scope:** Market research, competitor analysis, audience profiling, keyword discovery
- **Inputs:** growth_briefs record, business_type, location, competitors
- **Outputs:** research_pack (JSON + markdown)
- **Reglas:**
  1. SIEMPRE buscar al menos 3 competidores reales del mismo giro y zona
  2. Incluir keywords transaccionales Y long-tail
  3. Incluir persona primaria con journey completo
  4. Si no hay competidores en el brief → inferir del giro + ubicacion
  5. Output en JSON estructurado + markdown legible
  6. NUNCA inventar datos — si no hay info, marcar como "pendiente_verificar"
- **Output JSON structure:**
  - business_profile: {summary, vertical, sub_category}
  - market_analysis: {zone_context, competition_density, opportunities[]}
  - competitors: [{name, url, strengths, weaknesses, seo_present, whatsapp_cta, mobile_friendly}]
  - audience: {primary_persona: {name, age_range, location, searches_for, worries_about, convinced_by, preferred_channel}, journey: []}
  - keywords: {primary[], long_tail[], local[]}
  - positioning: {differentiators[], value_prop_draft, tone_suggestion}
  - assets_status: {logo, photos, domain, social_media}
  - risks: [{risk, impact, mitigation}]

#### Strategy Engine (growth-strategy-engine) [NUEVO]
- **Autonomia:** assisted (REQUIERE APROBACION ANGEL)
- **Owner:** angel@lunolive.com
- **Scope:** Brand strategy, messaging hierarchy, website direction, content strategy, SEO strategy
- **Inputs:** research_pack, package_type (señal/sistema/motor), creative_doctrine
- **Outputs:** strategy_pack (JSON + markdown)
- **Reglas:**
  1. SIEMPRE alinear con la creative doctrine de Angel
  2. Messaging directo, espanol de Mexico, sin marketing speak
  3. Incluir CTA map completo (ubicacion, texto, destino, canal)
  4. Incluir estructura de paginas con secciones especificas
  5. Incluir pilares de contenido (si servicio incluye marketing)
  6. Incluir keyword strategy (si servicio incluye SEO)
  7. Output REQUIERE APROBACION de Angel antes de pasar a execution
  8. Adaptar alcance al paquete
- **Scope por paquete:**

| Paquete | Paginas | Secciones max | Ads | SEO | Posts/mes |
|---------|---------|--------------|-----|-----|-----------|
| Señal | 1 | 6 | No | No | 12 |
| Sistema | 1 | 9 | Si | No | 16 |
| Motor | 3-5 | Ilimitado | Si | Si | 20 |

#### Execution Pack Generator (growth-execution-generator) [NUEVO]
- **Autonomia:** automatic
- **Owner:** carlos@lunolive.com
- **Scope:** Generate builder-ready execution packs from approved strategy
- **SOLO ejecutar sobre strategy packs con status "approved"**
- **Inputs:** strategy_pack (approved), brief data, research_pack
- **Outputs:** website_execution_pack, marketing_execution_pack, seo_execution_pack
- **Reglas:**
  1. Website pack debe incluir copy COMPLETO por seccion — no placeholders
  2. Marketing pack debe incluir calendario del primer mes con temas concretos
  3. SEO pack debe incluir meta tags listos para copiar-pegar
  4. Incluir prompt de builder con TODO el contexto necesario
  5. Incluir checklist pre-build
  6. Incluir constraints por paquete (max paginas, secciones, rondas de revision)
- **Max tokens:** 8192 (el mas grande de todos los agentes)

### Pod: Control & Governance

#### QA / Delivery Audit (qa-delivery-audit)
- **Autonomia:** automatic
- **Owner:** angel@lunolive.com
- **Reglas de validacion:**
  1. Verificar precios contra tabla oficial (Basico $2,500, Pro $4,500, Clinica $7,500)
  2. Verificar datos numericos con fuente o marcados como estimacion
  3. Branding: logo correcto, colores purple/cyan, tipografia consistente
  4. Ortografia: cero errores en material que va a cliente
  5. **Si >3 correcciones → devolver a production-builder, NO aprobar**

#### Reporting & Insights (reporting-insights)
- **Autonomia:** automatic
- **Owner:** angel@lunolive.com
- **Reportes:**

| Frecuencia | Contenido |
|-----------|-----------|
| Semanal | Pipeline value, demos, cierres, revenue, CAC |
| Mensual | P&L de growth, LTV/CAC ratio, forecast 3 meses |

- **KPIs target:**
  - Response rate >30%
  - Demo → piloto >40%
  - Churn <5%/mes
- **Alerta si CAC > 3 meses de revenue del cliente**

#### Margin / Capacity (margin-capacity)
- **Autonomia:** manual
- **Owner:** angel@lunolive.com
- **Escalation:** carlos + angel
- **Capacidad actual:** 10-15 clientes con 2 founders + AI
- **Alertas:**
  - >80% capacidad → evaluar contratar o automatizar mas
  - Margen <50% → revisar pricing o reducir scope
- **Margen minimo aceptable:** 60% bruto
- **Cost per client:** Supabase prorrateado + Claude API tokens + soporte humano

#### Knowledge & Playbook (knowledge-playbook)
- **Autonomia:** automatic
- **Owner:** angel@lunolive.com
- **Reglas:**
  1. Actualizar playbook despues de cada demo (que funciono, que no)
  2. Documentar objeciones nuevas con respuesta recomendada
  3. Clasificar por vertical: dental, restaurant, otro
  4. Review quincenal: eliminar tacticas que no conviertan
  5. Formato: markdown simple, max 1 pagina por playbook entry

#### Production QA Reviewer (growth-qa-reviewer) [NUEVO]
- **Autonomia:** automatic
- **Owner:** carlos@lunolive.com
- **Scope:** Quality assurance for all growth production outputs
- **Inputs:** execution_pack, strategy_pack, creative_doctrine, qa_checklists
- **Outputs:** qa_report (pass/fail + findings)
- **Reglas de validacion:**
  1. Pricing correcto: Señal $14K/mes, Sistema $25K/mes, Motor $45K/mes
  2. Copy en espanol de Mexico — cero ingles accidental
  3. CTAs con destino definido (WhatsApp, brief, etc)
  4. Sin placeholders (lorem ipsum, TBD, TODO) en copy final
  5. Completitud: cada seccion del sitemap debe tener copy, CTA, y visual definido
  6. Scope no excede lo incluido en el paquete
  7. **Si >3 hallazgos criticos → rechazar y enviar de vuelta**
  8. Si solo hallazgos menores → aprobar con notas
- **Severidad:**

| Nivel | Significado |
|-------|-----------|
| critical | Bloquea entrega — debe corregirse |
| major | Debe corregirse antes de entregar |
| minor | Puede entregarse con nota |
| suggestion | Mejora opcional |

---

# 4. KPIs POR ROL

| Rol | KPIs |
|-----|------|
| PMO | blockers_open, blockers_resolved, weekly_brief_fresh |
| Builder | qa_first_pass_rate, lead_time_hours, tickets_completed |
| OS agents (default) | runs_total, success_rate, avg_latency_ms, escalations, failed_handoffs |
| Growth agents (default) | leads_processed, proposals_created, delivery_throughput, qa_pass_rate |
| Tenant Health | msgs_per_day, conversion_rate, response_time_avg, satisfaction_score |
| Value Reporting | roi_ratio, hours_saved, revenue_protected, citas_salvadas |
| Margin/Capacity | gross_margin_percent, founder_hours_week, client_capacity_used |

---

# 5. METRICAS Y ALERTAS

## 5.1 Alertas Automaticas

| Condicion | Accion | Quien recibe |
|-----------|--------|-------------|
| Branch >2 agentes bloqueados | Escalar inmediato | Ambos founders |
| Error rate >5% en 1h | Alerta | PMO → Carlos |
| Error rate >15% | Pausar agente auto | Luno Supervisor |
| Response time >30s avg en 15 min | Alerta | PMO |
| Escalation rate >20% | Alerta (problema sistematico) | PMO |
| Conversion cae >10% vs semana anterior | Alerta | Tenant Health → tenant owner |
| Uso de cliente baja >30% vs mes anterior | Churn risk | Client Success → Angel |
| NPS <6 | Escalacion inmediata | Client Success → Angel |
| Margen <50% | Alerta critica | Finance → ambos founders |
| Founders >50h/semana | Alerta | Finance → ambos founders |
| Capacidad >80% | Stop ventas | Margin → ambos founders |
| CAC > 3 meses revenue cliente | Alerta | Reporting → Angel |

## 5.2 Reportes Periodicos

| Reporte | Frecuencia | Genera | Recibe |
|---------|-----------|--------|--------|
| Weekly brief | Lunes | PMO | Ambos founders |
| Pipeline status | Semanal | Growth PMO | Angel |
| Branch health | Cada 6h | Luno Supervisor | PMO |
| Tenant health | Semanal | Tenant Health | Tenant owner |
| Value report | Mensual (1ro) | Value Reporting | Tenant owner |
| Growth P&L | Mensual | Reporting & Insights | Angel |
| Capacity snapshot | Semanal | Margin/Capacity | Ambos founders |
| Playbook updates | Post-demo | Knowledge & Playbook | Angel |
