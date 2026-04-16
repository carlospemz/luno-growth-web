# LUNO — PART 2: FLUJOS DE PRODUCCION Y PLATAFORMA

> Cada flujo documentado paso a paso con inputs, outputs, agentes, gates, y dependencias.
> Ultima actualizacion: 2026-04-02

---

# 1. FLUJO: REVENUE LOOP (Luno OS — Pipeline de Mensajes)

Este es el pipeline canonico de como un mensaje de WhatsApp se convierte en una accion de negocio.

```
PASO 1: MESSAGE INGRESS
  Trigger: Webhook POST /api/webhook/inbound
  Agente: event-intake
  Input: Raw webhook payload (WhatsApp Business API / Facebook Graph v21.0)
  Proceso:
    - Validar firma del webhook
    - Normalizar telefono a E.164 (+521XXXXXXXXXX)
    - Detectar idioma (es-MX default)
    - Sanitizar contenido (strip HTML, limit 4096 chars)
    - Crear conversation si no existe, o append (window 24h)
  Output: normalized_event {provider, phone, message, timestamp, tenant_slug}
  SLA: <2s para responder al webhook (evitar retry del proveedor)
  Si falla: Log error, alertar connector-health

PASO 2: IDENTITY RESOLUTION
  Agente: identity-resolution
  Input: normalized_event
  Proceso:
    - Match primario por telefono E.164
    - Match secundario por nombre + canal si no hay telefono
    - Si confidence >0.95 → merge automatico
    - Si 0.7-0.95 → merge manual (flag para operador)
    - Enriquecer con historial de conversaciones previas
  Output: unified_contact_profile, conversation_id
  Regla: NUNCA borrar datos — solo marcar duplicados como merged

PASO 3: PERSIST MESSAGE
  Proceso: INSERT en messages table con conversation_id, content, metadata
  Output: message_id

PASO 4: INTENT CLASSIFICATION
  Agente: intent-classification
  Input: normalized_message, conversation_history (last 5), tenant_config
  Proceso:
    - Enviar a Claude claude-sonnet-4-20250514 con system prompt de clasificacion
    - Clasificar entre 11 intents (dental) o 6 intents (restaurant)
    - Extraer entidades: fecha, hora, servicio, nombre, telefono
    - Calcular confidence score
  Output: {intent, confidence, entities[], priority}
  Gate: Si confidence <0.7 → intent="otro" → escalar a information_gathering
  Modelo: Claude Sonnet, ~500 tokens

PASO 5: CONTEXT COMPILATION
  Agente: context-compiler
  Input: tenant_config, contact_profile, intent, entities
  Proceso:
    - Cargar config del negocio (horarios, servicios, precios, FAQs, politicas)
    - Consultar disponibilidad real de slots/mesas (proximos 30 dias)
    - Cargar historial del contacto (ultimas 5 interacciones)
    - Aplicar reglas de negocio (paciente nuevo min 60 min, limpiezas solo manana)
    - Incluir lista de espera si no hay disponibilidad
  Output: compiled_context {business_config, available_slots, service_catalog, contact_history, rules}
  Regla: NUNCA inventar disponibilidad

PASO 6: RESPONSE STRATEGY
  Agente: response-strategy
  Input: intent, context, priority_score, contact_profile
  Proceso:
    - Seleccionar flujo: direct_booking | guided_booking | information_gathering | escalate
    - Seleccionar template de prompt segun flujo
    - Definir tono (consultorio: profesional/empatico/usted; restaurante: calido/entusiasta)
    - Definir acciones requeridas (check availability, create booking, send info)
  Output: response_flow, prompt_template, tone_directive, required_actions

PASO 7: RESPONSE GENERATION
  Agente: conversation-execution
  Input: prompt_template, compiled_context, conversation_history
  Proceso:
    - Llamar Claude claude-sonnet-4-20250514 con system prompt + contexto
    - Generar respuesta (max 300 chars para WhatsApp)
    - Validar que no inventa datos
  Output: generated_response
  Modelo: Claude Sonnet, ~300-500 tokens

PASO 8: GUARDRAIL CHECK
  Agente: policy-guardrail
  Input: generated_response, tenant_policies
  Proceso:
    - Validar: no diagnosticos medicos, no datos de otros pacientes
    - Validar precios contra catalogo (bloquear si >5% diferencia)
    - Validar que no hay contenido ofensivo
    - LFPDPPP compliance check
  Output: validation_result (pass | block)
  Si block: Regenerar respuesta o escalar a humano

PASO 9: RESPONSE QA
  Agente: response-qa
  Input: generated_response, original_message, compiled_context
  Proceso:
    - Score 0-100
    - <60: rechazar, 60-80: aprobar con flag, >80: aprobar
    - Rechazar si inventa disponibilidad, >500 chars, no responde la pregunta
    - Flag si tono no coincide con brand voice
  Output: quality_score, approved_response | rejection_reason
  Si rechazado: Max 1 reintento. Si segundo falla → escalar a humano

PASO 10: SEND OUTBOUND
  Agente: conversation-execution
  Input: approved_response, contact_phone
  Proceso:
    - Enviar via WhatsApp Business API (graph.facebook.com/v21.0/{phoneId}/messages)
    - O via MockChannelAdapter si no hay API token
  Output: delivery_confirmation, message_id

PASO 11: PIPELINE UPDATE
  Agente: opportunity-pipeline
  Input: conversation_analysis
  Proceso:
    - Detectar keywords de oportunidad ("multiple", "sucursal", "referido", "premium")
    - Score: 0-30 frio, 30-60 tibio, 60-100 caliente
    - Si score >50 → crear pipeline entry automatico
    - Si >$5000 potencial → notificar tenant owner
  Output: opportunity_record | null

PASO 12: BOOKING (si aplica)
  Agente: booking-state
  Input: booking_request (from response strategy)
  Proceso:
    - Validar disponibilidad (bloqueo temporal 10 min)
    - Crear booking: draft → pending_confirmation → confirmed
    - Generar referencia: DEN-YYMMDD-XXX o RST-YYMMDD-XXX
    - Enviar confirmacion al contacto
  Output: booking_record, reference_code

PASO 13: FOLLOW-UP SCHEDULING
  Agente: follow-up
  Input: booking_record
  Proceso:
    - Programar recordatorio 24h antes
    - Programar recordatorio 2h antes
    - Programar post-cita 24h despues
    - Si 90 dias sin contacto → reactivacion
  Output: scheduled_reminders[]
  Restriccion: No enviar 9pm-8am, max 3 recordatorios por cita

PASO 14: ESCALATION CHECK
  Agente: escalation-manager
  Input: conversation_result, intent, priority
  Proceso:
    - Si emergencia/queja grave/amenaza legal → escalacion inmediata
    - Si fuera de scope / pregunta medica → escalacion rapida (<5 min)
    - Incluir en handoff: resumen, intent, historial
    - Si no hay operador → responder que contactaran en <30 min
  Output: escalation_notification | null

PASO 15: TELEMETRY
  Proceso: SIEMPRE ejecuta (incluso si hay error)
    - Log pipeline_result: success/failure, intent, response_sent, escalation, step_timings
    - Update agent_runs, agent_events
    - Update branch_health (throughput, error_rate)
```

---

# 2. FLUJO: GROWTH PRODUCTION PIPELINE (Brief → Delivery)

Este es el pipeline de como un lead se convierte en un proyecto entregado.

```
FASE 0: LEAD INTAKE
  Trigger: Cliente llena formulario en luno-growth-web.vercel.app/#brief
  Endpoint: POST /api/growth/intake (luno-growth-web)
  Proceso:
    1. Validar campos requeridos (business_name, contact_name, contact_phone, business_description, target_audience, desired_actions, primary_channels)
    2. Honeypot check (campo _hp)
    3. Rate limit (3 requests/min/IP)
    4. Normalizar business_type (restaurante→restaurant, clinica→healthcare, etc.)
    5. Inferir package (basado en extra_pages, advanced_features, budget_range)
    6. Forward a luno-platform: POST /api/ops-sync action=create_brief
  Output al usuario: WhatsApp se abre con el brief como texto (backup)
  Output al sistema: {submission_id, synced: true/false}

  Datos capturados (25+ campos):
    NEGOCIO: business_name, contact_name, contact_phone, contact_email, business_type, business_description, target_audience, location_city, location_zone
    SERVICIO: service_types[], package_interest, payment_preference, desired_actions[], primary_channels[], timeline, budget_range
    ASSETS: has_domain, domain_name, has_logo, logo_url, has_photos, photos_url, competitors, reference_sites, extra_pages[], advanced_features[], additional_notes
    METADATA: source, utm_source, utm_medium, utm_campaign

FASE 0.5: CRM AUTO-CREATION
  Endpoint: POST /api/ops-sync action=create_brief (luno-platform)
  Proceso:
    1. INSERT en growth_briefs (todos los campos)
    2. CHECK si growth_clients ya existe (por nombre)
    3. Si no existe → INSERT en growth_clients (status: lead, owner: angel@lunolive.com)
    4. INSERT en growth_projects (status: scoping, pipeline_stage: intake, project_type inferido)
    5. INSERT en crm_activities (activity_type: note, "Brief recibido desde landing page")
    6. UPDATE growth_briefs con growth_client_id + growth_project_id
  Output: {brief_id, client_id, project_id}
  Ahora Angel puede ver el lead en /admin/growth

FASE 1: RESEARCH
  Trigger: POST /api/growth/pipeline {brief_id, stage: "research"}
  Agente: growth-research-engine (automatic)
  Input: Brief completo de growth_briefs
  Proceso:
    1. Construir task con todos los datos del brief
    2. Llamar Claude claude-sonnet-4-20250514 (max 4096 tokens)
    3. Generar research pack en JSON:
       - business_profile: resumen, vertical, sub-categoria
       - market_analysis: contexto de zona, densidad de competencia, oportunidades
       - competitors: 3+ competidores con URL, fortalezas, debilidades, SEO, WhatsApp CTA, mobile
       - audience: persona primaria (nombre, edad, ubicacion, busca, preocupa, convence, canal preferido) + journey
       - keywords: primary[], long_tail[], local[]
       - positioning: diferenciadores, value prop draft, tono sugerido
       - assets_status: logo, fotos, dominio, redes sociales
       - risks: [{risk, impact, mitigation}]
    4. INSERT en production_packs (pack_type: research, status: draft)
    5. UPDATE growth_projects (pipeline_stage: research, research_pack_id)
    6. Log agent_runs + agent_events + extract learnings
  Output: research_pack (JSON + markdown)
  Tokens: ~2000-3000

FASE 2: STRATEGY (GATE: REQUIERE APROBACION ANGEL)
  Trigger: POST /api/growth/pipeline {brief_id, stage: "strategy"}
  Prerequisito: research pack existente
  Agente: growth-strategy-engine (assisted)
  Input: Research pack + brief + package_interest
  Proceso:
    1. Cargar research pack de production_packs
    2. Llamar Claude con research + brief + scope del paquete
    3. Generar strategy pack en JSON:
       - brand_direction: value_prop, tone, palette, typography
       - messaging_hierarchy: H1, secondary_messages[], taglines_by_section{}
       - website_direction: sitemap[], cta_map[], features[], visual_direction
       - content_direction: pillars[], formats[], calendar_base[]
       - seo_direction: keyword_strategy[], on_page_priorities[], local_seo_actions[]
       - scope_boundaries: included[], not_included[], requires_angel_approval[]
    4. INSERT en production_packs (pack_type: strategy, status: REVIEW)
    5. UPDATE growth_projects (pipeline_stage: strategy_review, strategy_pack_id)
    6. Output contiene "REQUIERE APROBACION:"
  Output: strategy_pack (JSON + markdown)
  Tokens: ~2000-4000

  *** PIPELINE SE DETIENE AQUI ***
  Angel debe abrir el strategy pack, revisarlo, y actualizar status a "approved" en production_packs.
  Solo entonces se puede ejecutar la siguiente fase.

FASE 3: EXECUTION PACKS
  Trigger: POST /api/growth/pipeline {brief_id, stage: "execution"}
  Prerequisito: strategy pack con status = "approved"
  Agente: growth-execution-generator (automatic)
  Input: Strategy pack aprobado + research pack + brief
  Proceso:
    1. Verificar que strategy pack esta approved (si no → 400 error)
    2. Llamar Claude con TODO el contexto (max 8192 tokens — el mas grande)
    3. Generar 3 packs en un solo JSON:
       A. WEBSITE EXECUTION PACK:
          - sitemap: [{page, slug, sections[], priority}]
          - sections: [{name, objective, copy: {h_tag, body, cta_text, cta_destination}, visual}]
          - cta_map: [{location, text, destination, channel, visible_on}]
          - assets_required: [{asset, status, source, notes}]
          - brand_spec: {primary_color, secondary, background, text, font_heading, font_body, tone}
          - constraints: {max_pages, max_sections, revision_rounds, framework, deploy, timeline}
          - builder_prompt: "Prompt ULTRA-DETALLADO para construir el website completo.
            Incluye: estructura, copy de CADA seccion, CTAs, colores, tipografia, features,
            constraints, deadline. Un developer debe poder construir el website COMPLETO
            con MINIMA intervencion."
       B. MARKETING EXECUTION PACK:
          - pillars: [{name, description, percentage}]
          - calendar_month1: [{week, day, theme, format, copy_draft, channel}]
          - campaigns: [{name, objective, duration, channels[], budget, cta}]
          - assets_needed: []
       C. SEO EXECUTION PACK:
          - keyword_clusters: [{cluster_name, keywords: [{keyword, intent, page_target, volume, difficulty}]}]
          - page_metadata: [{page, title_tag, meta_description, h1}]
          - schema_markup: "LocalBusiness JSON-LD template"
          - local_seo_checklist: []
          - monitoring_setup: [{metric, tool, frequency}]
    4. INSERT 3 registros en production_packs (website_execution, marketing_execution, seo_execution)
    5. UPDATE growth_projects (pipeline_stage: building)
  Output: 3 execution packs
  Tokens: ~4000-8000

FASE 4: QA
  Trigger: POST /api/growth/pipeline {brief_id, stage: "qa"}
  Prerequisito: execution packs existentes
  Agente: growth-qa-reviewer (automatic)
  Input: Los 3 execution packs + brief + strategy
  Proceso:
    1. Cargar execution packs de production_packs
    2. Validar contra checklists:
       - WEBSITE: Copy sin errores, CTAs con destino, sin placeholders, colores del brand, mobile responsive definido
       - MARKETING: Pilares balanceados, calendario completo, tono correcto, assets definidos
       - SEO: Meta tags completos (<60 chars title, <155 chars desc), keywords en H1, schema definido
    3. Validar pricing oficial:
       - Señal: $14,000/mes + $6,000 setup
       - Sistema: $25,000/mes + $10,000 setup
       - Motor: $45,000/mes + $15,000 setup
    4. Generar reporte:
       - overall_status: pass | fail
       - score: 0-100
       - findings: [{severity, category, description, location, suggestion}]
       - recommendation
    5. Si pass → UPDATE growth_projects (pipeline_stage: qa)
    6. Si fail → UPDATE growth_projects (pipeline_stage: revision)
  Output: QA report (JSON)
  Tokens: ~1500-2500

FASE 5: BUILD (manual — Carlos + Claude Code)
  Trigger: QA passed + Angel aprueba preview
  Proceso:
    1. Carlos toma el website_execution_pack
    2. Usa el builder_prompt como input para Claude Code
    3. Construye el website en un nuevo repo (Next.js + Tailwind)
    4. Deploy a Vercel
    5. Angel revisa preview → aprueba o pide cambios
    6. Si cambios → revision round (max segun paquete)
  Output: Website live en Vercel
  Dependencia: Carlos (4-40h dependiendo del paquete)

FASE 6: DELIVERY
  Trigger: Angel aprueba el build final
  Proceso:
    1. QA Website checklist final (mobile, CTAs, copy, performance)
    2. Dominio configurado (si cliente tiene)
    3. Analytics configurado (si paquete Pro+)
    4. Angel confirma entrega con cliente
    5. UPDATE growth_projects (pipeline_stage: delivered)
    6. Handoff a Client Success
  Output: Proyecto entregado, cliente operando

FASE 7: CONTINUITY
  Agente: client-success
  Proceso continuo:
    - Check-in mensual (WhatsApp o llamada 10 min)
    - Monitoreo de uso
    - NPS cada 90 dias
    - Si marketing activo → ejecutar calendario mensual
    - Si SEO activo → monitorear posiciones + ajustar
    - Maintenance si contratado → fixes menores segun SLA
```

---

# 3. FLUJO: AGENT EXECUTION (Como corre un agente)

```
POST /api/agents/run { agentId, task }

1. FETCH AGENT
   - Buscar en tabla agents por ID (o por nombre si agentId = "__chief_of_staff__")
   - Si no existe → 404
   - Si disabled → 400

2. SET RUNNING
   - UPDATE agents SET current_status = 'running', current_task = task
   - INSERT agent_runs (status: running, trigger_event: "manual_ui" o "pipeline_auto")
   - INSERT agent_events (event_type: run_started)

3. BUILD SYSTEM PROMPT
   Estructura del prompt:
   ```
   Eres {display_name}, un agente AI operativo dentro de Luno — Conversation OS.

   ROL: {function_description}
   BRANCH: {branch}
   POD: {pod}
   AUTONOMIA: {autonomy_mode}
   REPORTA A: {config.owner}
   SCOPE: {config.scope}

   [CHIEF BRAIN — si es Chief of Staff: 30 entries agrupadas por categoria]
   [APRENDIZAJES PREVIOS — top 10 learnings por usage_count]

   EMPRESA:
   - Luno = Conversation OS
   - Founders: Carlos Pena (CTO) y Angel Eduardo (CEO)
   - ICP: single-ingress en Mexico (dental, restaurant, clinic, spa)
   - Pricing OS: Basico $2,500, Profesional $4,500, Clinica $7,500
   - Pipeline: WhatsApp → Intake → Intent → Context → Strategy → Execution → Booking → Follow-up
   - Territorio: Monterrey metro

   CONFIGURACION OPERATIVA:
   {JSON completo del config_json del agente — scope, rules, inputs, outputs, ICP, intents, etc.}

   REGLAS ABSOLUTAS:
   - SIEMPRE en espanol (Mexico)
   - Conciso y accionable
   - Output en markdown estructurado
   - Si necesitas aprobacion → "REQUIERE APROBACION:"
   - Si fuera de scope → decir que agente deberia manejarlo
   - NUNCA inventes datos
   ```

4. CALL CLAUDE API
   - Model: claude-sonnet-4-20250514
   - Max tokens: 2048 (standard) o 4096-8192 (pipeline)
   - User message: "TAREA ASIGNADA: {task}\n\nEjecuta esta tarea. Entrega resultado completo, estructurado y listo para usar."

5. PARSE RESPONSE
   - Si contiene "aprobacion"/"aprobación" → status: escalated, agent: waiting_approval
   - Si contiene "escalar"/"fuera de mi scope" → status: escalated, agent: waiting_approval
   - Si no → status: success, agent: idle

6. LOG COMPLETION
   - UPDATE agent_runs (status, output_summary [first 2000 chars], duration_ms, tokens, model)
   - INSERT agent_events (run_finished, tokens, duration, status)
   - UPDATE agents (current_status, last_run_at)

7. EXTRACT LEARNINGS (async, fire-and-forget)
   - Si success → INSERT agent_learnings (lesson_type: success_pattern, confidence: 0.6)
   - Si escalated → INSERT agent_learnings (lesson_type: decision_rationale, confidence: 0.7)
   - Tags: agent_name + "auto_extracted"

8. CHIEF BRAIN UPDATES (solo Chief of Staff)
   - Regex: /\[BRAIN_UPDATE\]([\s\S]*?)\[\/BRAIN_UPDATE\]/g
   - Parse: category, title, content, priority
   - UPSERT en chief_brain (si title existe → update, si no → insert)

RETURN: { runId, status, tokens, durationMs, output: first 500 chars }
```

---

# 4. FLUJO: LEAD → CRM (ops-sync)

```
POST /api/ops-sync
Auth: Bearer {SUPABASE_SERVICE_ROLE_KEY}

ACCIONES DISPONIBLES:

create_brief → Brief completo desde landing (crea brief + client + project + activity)
create_lead → Lead simple (solo growth_clients + revenue_contracts si monthly_value > 0)
create_prospect → Prospect de OS (os_pipeline)
log_decision → Memoria institucional (chief_brain)
log_learning → Aprendizaje de agente (agent_learnings)
bulk_leads → Importacion masiva de leads

FLUJO create_brief:
  1. INSERT growth_briefs (25+ campos)
  2. CHECK growth_clients por nombre (dedup)
  3. Si no existe → INSERT growth_clients (status: lead, owner: angel)
  4. INSERT growth_projects (status: scoping, pipeline_stage: intake)
  5. INSERT crm_activities ("Brief recibido desde landing page")
  6. UPDATE growth_briefs con client_id + project_id
  Return: {brief_id, client_id, project_id}
```

---

# 5. PLATAFORMA — INTERCONEXION COMPLETA

## 5.1 Mapa de tablas y relaciones

```
profiles (1:1 auth.users)
  └── platform_access (platform_owner, platform_admin)
  └── tenant_memberships (per tenant)

tenants
  ├── tenant_configs
  ├── connectors (WhatsApp config)
  ├── conversations
  │   └── messages
  ├── resources (doctores, mesas)
  │   └── bookings (reservaciones)
  └── tenant_memberships

agents (44 registros)
  ├── agent_runs (execution history)
  ├── agent_events (timeline)
  ├── agent_learnings (memoria per-agente)
  ├── queue_states (workload)
  └── handoff_events (transfers)

branch_health (ops, os, growth)

chief_brain (memoria institucional)
memory_feedback (cierra el loop)

growth_clients
  ├── growth_projects
  │   └── production_packs (research, strategy, execution×3)
  ├── growth_invoices
  │   └── finance_transactions (when paid)
  ├── crm_activities
  └── growth_briefs (intake from landing)

os_pipeline (separate CRM for SaaS prospects)

revenue_contracts
credit_usage
work_logs
audit_logs (EVERY mutation)

tasks
  └── task_watchers
directives
  └── directive_targets
kpi_snapshots
founder_presence (VHQ 3D positions)
```

## 5.2 15 Admin Pages y sus data sources

| Pagina | Queries | Write actions |
|--------|---------|--------------|
| Dashboard | tenants, conversations, connectors, audit_logs | — |
| Agent Ops | agents, agent_runs, agent_events, queue_states, branch_health | enableAgent, disableAgent, changeAutonomy, changeStatus, forceRetry, forceEscalate |
| Agents Telemetry | agent_runs (filtrable por branch/pod) | — |
| Tenants | tenants, tenant_configs, tenant_memberships | createTenant, updateTenant |
| Growth CRM | growth_clients, growth_projects, growth_invoices, os_pipeline, crm_activities, finance_revenue, credit_usage | createClient, updateStatus, createProject, createInvoice, updateInvoice, createProspect, updateStage, logActivity |
| Connectors | connectors (per tenant) | — |
| Incidents | connectors (degraded), agent_runs (failed), agent_events (escalation) | — |
| Audit | audit_logs (all mutations) | — |
| Finance | finance_accounts, finance_transactions, finance_recurring, finance_revenue, credit_usage, monthly_close_snapshots | createSubscription, markPaid, closeMonth |
| Billing | (placeholder for Stripe) | — |
| Onboarding | — | createTenant + configs + membership (wizard) |
| Knowledge | (links to luno-ops) | — |
| Ops | tasks, directives, blockers | assignTask, createDirective, emitDirective |
| Security | platform_access, tenant_memberships, auth events | — |
| Live | agents (2D floor view, legacy) | — |

## 5.3 Auth y Multi-tenant

```
BROWSER REQUEST
  ↓
MIDDLEWARE (middleware.ts)
  ├── Skip auth for: /api/ops-sync, /api/webhook, /api/agents
  ├── supabase.auth.getUser() → refresh session
  ├── No user + not /login → redirect /login
  └── User + is /login → redirect /app

ADMIN ROUTES (/admin/*)
  → getPlatformContext()
    → Admin client (service role, bypasses RLS)
    → Check platform_access table for user
    → Return: {userId, platformRole, userName}
    → If no platform_access → redirect /app

TENANT ROUTES (/app/[tenantSlug]/*)
  → getTenantContext(slug)
    → Server client (cookies, RLS enforced)
    → Fetch tenant by slug
    → Check tenant_memberships for user
    → Return: {tenantId, tenantSlug, tenantName, tenantStatus, userId, userRole, userName, isSuspended}
    → If no membership → redirect /app

3 SUPABASE CLIENTS:
  browser (client.ts) → anon key, RLS via user session, for client components
  server (server.ts)  → cookies, RLS via user session, for server components
  admin (admin.ts)    → SERVICE_ROLE_KEY, bypasses ALL RLS, server-only, NEVER in client code
```

## 5.4 Audit Trail

TODA mutacion pasa por logAuditEvent():
```typescript
logAuditEvent({
  tenantId: string | null,
  actorUserId: string,
  entityType: "growth_client" | "growth_project" | "agent" | "tenant" | ...,
  entityId: string,
  action: "create" | "update" | "delete" | "status_change" | ...,
  summary: string,
  metadataJson?: object
})
```
Se escribe via admin client (service role) — users regulares NO pueden insertar en audit_logs.

## 5.5 LLM Adapters

```typescript
// Interface que ambos implementan:
interface LLMAdapter {
  classify(message: string, context: string): Promise<IntentResult>
  respond(message: string, context: string, rules: string): Promise<string>
}

// MockLLMAdapter — heuristics hardcoded:
//   "reserv|mesa|cita|apartar" → booking (0.9)
//   "hora|horario|abierto" → faq (0.85)
//   "queja|mal|problema" → complaint (0.8)
//   respond() → "[Mock] Gracias por tu mensaje..."

// ClaudeLLMAdapter — production:
//   Model: claude-sonnet-4-20250514
//   classify(): system prompt con reglas de clasificacion, parse JSON response
//   respond(): system prompt con business context + rules, max 512 tokens
```

## 5.6 Channel Adapters

```typescript
interface ChannelAdapter {
  send(phone: string, message: string): Promise<{ success: boolean; messageId?: string }>
}

// MockChannelAdapter — console.log, fake messageId
// WhatsAppAdapter — graph.facebook.com/v21.0/{phoneNumberId}/messages
//   Requires: WHATSAPP_API_TOKEN, WHATSAPP_PHONE_NUMBER_ID
```

---

# 6. ESTADOS Y MAQUINAS DE ESTADO

## 6.1 Agent Status
```
idle → running → idle (success)
idle → running → waiting_approval (needs approval)
idle → running → failed (error)
waiting_approval → idle (approved)
waiting_approval → running (retry)
failed → idle (force retry)
any → offline (disabled)
offline → idle (enabled)
any → blocked (external dependency)
blocked → idle (recovered)
```

## 6.2 Growth Client Status
```
lead → contacted → discovery → proposal → negotiation → active
lead → lost (rejected)
active → paused → active (reactivated)
active → churned (lost)
```

## 6.3 Growth Project Pipeline Stage
```
intake → research → strategy → strategy_review → building → qa → revision → delivered → completed
strategy_review → strategy (rejected, redo)
qa → revision (failed QA)
revision → qa (resubmit)
any → cancelled
```

## 6.4 Production Pack Status
```
generating → draft → review → approved → (used by next stage)
review → rejected → (feedback to agent, regenerate)
approved → superseded (new version)
```

## 6.5 Booking State Machine
```
draft → pending_confirmation → confirmed → reminded → completed
confirmed → cancelled
confirmed → no_show (15 min past appointment)
reminded → cancelled
reminded → no_show
```

## 6.6 Growth Invoice Status
```
draft → sent → paid (creates finance_transaction)
sent → partial → paid
sent → overdue
any → cancelled
```

---

# 7. COSTOS Y ECONOMICS

## 7.1 Costo por corrida de agente

| Agente | Tokens estimados | Costo estimado |
|--------|-----------------|----------------|
| Standard agent (2048 max) | 1500-3000 | $0.03-0.05 |
| Research Engine (4096 max) | 2000-3000 | $0.04-0.06 |
| Strategy Engine (4096 max) | 2000-4000 | $0.04-0.08 |
| Execution Generator (8192 max) | 4000-8000 | $0.08-0.15 |
| QA Reviewer (4096 max) | 1500-2500 | $0.03-0.05 |
| Pipeline completo (4 agentes) | 10000-18000 | $0.20-0.35 |

Pricing Claude claude-sonnet-4-20250514: ~$3/1M input, ~$15/1M output

## 7.2 Costo por proyecto (estimado, no verificado)

| Tipo | Horas founder | Claude | Infra prorate | Total estimado |
|------|--------------|--------|--------------|---------------|
| Señal setup | 4-6h Carlos | ~$0.50 | $108 | $2,500-3,500 |
| Sistema setup | 8-15h Carlos | ~$1.00 | $108 | $4,500-8,000 |
| Motor setup | 20-40h Carlos | ~$2.00 | $108 | $10,000-20,000 |
| Marketing mensual | 4-8h Angel | ~$0.50 | — | $2,000-4,000 |

Tarifa interna founders: $500 MXN/h (meta de ingreso personal)

## 7.3 Umbrales de margen

| Nivel | Margen | Accion |
|-------|--------|--------|
| Saludable | >60% | Continuar |
| Aceptable | 40-60% | Monitorear |
| Alerta | 20-40% | Revisar pricing o reducir scope |
| Critico | <20% | Pausar ventas, reestructurar |

## 7.4 Capacidad

| Recurso | Horas/semana | Tipo de trabajo |
|---------|-------------|----------------|
| Angel | 20-25h | Ventas, aprobaciones, relacion clientes |
| Carlos | 20-25h | Websites, infra, agentes, code |
| Claude API | Ilimitado | Research, strategy, QA, content |

Capacidad maxima: 10-15 clientes con 2 founders + AI
Alerta al 80%. Stop ventas al 95%.
