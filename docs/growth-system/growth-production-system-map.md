# Growth Production System Map — Luno Growth

> Mapa maestro del sistema completo de produccion de Growth Services.
> Referencia canonica para entender como fluye un proyecto de punta a punta.

---

## PIPELINE COMPLETO

```
LEAD INTAKE
  │
  ├─ Landing page brief form (luno-growth-web)
  ├─ WhatsApp directo
  ├─ Referido / network
  └─ ops-sync API (desde luno-ops)
  │
  ▼
PERSISTENCIA
  │
  ├─ POST /api/growth/intake → luno-platform /api/ops-sync
  ├─ Crea growth_clients record
  ├─ Crea growth_projects record
  └─ Status: new → reviewed → qualified → converted
  │
  ▼
RESEARCH (por proyecto)
  │
  ├─ Input: brief estructurado
  ├─ Output: research-pack (mercado, competencia, audiencia, keywords)
  ├─ Template: research-pack-template.md
  └─ Agente: research-engine (futuro)
  │
  ▼
STRATEGY (por proyecto)
  │
  ├─ Input: research-pack
  ├─ Output: strategy-pack (brand, messaging, website/marketing/SEO direction)
  ├─ Template: strategy-pack-template.md
  ├─ Agente: strategy-engine (futuro)
  └─ GATE: [ANGEL] aprueba strategy antes de continuar
  │
  ▼
EXECUTION PACKS (por proyecto/servicio)
  │
  ├─ Website Execution Pack → website-execution-pack-template.md
  │   └─ Prompt completo para builder
  │
  ├─ Marketing Execution Pack → marketing-execution-pack-template.md
  │   └─ Pilares, calendario, campanas
  │
  └─ SEO Execution Pack → seo-execution-pack-template.md
      └─ Keywords, metadata, on-page, local
  │
  ▼
BUILD (por entregable)
  │
  ├─ Website: Builder (Carlos + Claude Code) construye con execution pack
  ├─ Marketing: Produccion de contenido con calendar
  └─ SEO: Implementacion tecnica + local
  │
  ▼
QA (por entregable)
  │
  ├─ QA Website checklist → qa-checklists-growth.md
  ├─ QA Marketing checklist → qa-checklists-growth.md
  ├─ QA SEO checklist → qa-checklists-growth.md
  └─ GATE: [ANGEL] aprueba calidad visual y de copy
  │
  ▼
DELIVERY
  │
  ├─ Status: delivered
  ├─ Definition of Done por tipo → delivery-definition-of-done.md
  └─ GATE: [ANGEL] confirma entrega con cliente
  │
  ▼
CONTINUITY (post-entrega)
  │
  ├─ Maintenance mensual (si contratado)
  ├─ Marketing mensual (si contratado)
  ├─ SEO monitoring (si Pro+)
  └─ Client success check-ins
```

---

## ARTEFACTOS DEL SISTEMA

| # | Artefacto | Ruta | Status |
|---|-----------|------|--------|
| 1 | Este documento | `docs/growth-system/growth-production-system-map.md` | EXISTE |
| 2 | Creative Doctrine | `docs/growth-system/creative-doctrine-growth.md` | EXISTE |
| 3 | Intake Schema | `docs/growth-system/intake-schema-growth.md` | EXISTE |
| 4 | Research Pack Template | `docs/growth-system/research-pack-template.md` | EXISTE |
| 5 | Strategy Pack Template | `docs/growth-system/strategy-pack-template.md` | EXISTE |
| 6 | Website Execution Pack | `docs/growth-system/website-execution-pack-template.md` | EXISTE |
| 7 | Marketing Execution Pack | `docs/growth-system/marketing-execution-pack-template.md` | EXISTE |
| 8 | SEO Execution Pack | `docs/growth-system/seo-execution-pack-template.md` | EXISTE |
| 9 | QA Checklists | `docs/growth-system/qa-checklists-growth.md` | EXISTE |
| 10 | Definition of Done | `docs/growth-system/delivery-definition-of-done.md` | EXISTE |
| 11 | Economics Tracking | `docs/growth-system/economics-tracking-spec.md` | EXISTE |

---

## CODIGO DEL SISTEMA

| Componente | Ruta | Funcion | Status |
|-----------|------|---------|--------|
| Brief Form (enhanced) | `src/components/sections/Brief.tsx` | Captura 25+ campos estructurados | EXISTE |
| Intake API | `src/app/api/growth/intake/route.ts` | Persiste brief → ops-sync → CRM | EXISTE |
| Contact Config | `src/config/contact.ts` | WhatsApp URLs, brief builder | EXISTE |
| Brand Config | `src/config/brand.ts` | Tokens de color | EXISTE |
| Motion Config | `src/lib/motion.ts` | Tokens de animacion | EXISTE |

---

## DEPENDENCIAS ENTRE FASES

```
Brief Form → Intake API → ops-sync → growth_clients + growth_projects
                                            │
                                            ▼
                                    Research Engine
                                            │
                                            ▼
                                    Strategy Engine
                                            │
                               ┌────────────┼────────────┐
                               ▼            ▼            ▼
                          Website Pack  Marketing Pack  SEO Pack
                               │            │            │
                               ▼            ▼            ▼
                            Builder      Producer      Implementer
                               │            │            │
                               ▼            ▼            ▼
                             QA Web     QA Marketing   QA SEO
                               │            │            │
                               └────────────┼────────────┘
                                            ▼
                                    [ANGEL] Approval
                                            │
                                            ▼
                                        Delivery
                                            │
                                            ▼
                                       Continuity
```

---

## PAQUETES ACTUALES (actualizado por Angel 2026-04-01)

| Plan | Setup | Mensual | Incluye |
|------|-------|---------|---------|
| **Señal** | $6,000 | $14,000/mes | Landing + WhatsApp funnel + bot basico + 12 posts/mes + GMB + automatizacion + reporte |
| **Sistema** | $10,000 | $25,000/mes | Todo de Señal + Meta/Google Ads + 16 posts + 2 Reels + chatbot 24/7 + seguimiento automatico |
| **Motor** | $15,000 | $45,000/mes | Todo de Sistema + SEO + freelancer contenido + direccion creativa + dashboard realtime + reunion mensual |

> Pauta publicitaria siempre aparte. Setup fee unico. Sin contratos de largo plazo.

## SERVICIOS QUE EL SISTEMA SOPORTA

| Servicio | Plan que lo incluye | Execution Pack | QA | DoD |
|----------|-------------------|---------------|-----|-----|
| Landing page | Todos | website-execution-pack | si | si |
| WhatsApp funnel + chatbot | Todos | marketing-execution-pack | si | si |
| Social media (posts/reels) | Todos | marketing-execution-pack | si | si |
| Meta/Google Ads | Sistema, Motor | marketing-execution-pack | si | si |
| SEO + posicionamiento local | Motor | seo-execution-pack | si | si |
| Direccion creativa | Motor | strategy-pack | si | si |
| Reporte mensual | Todos | — | si | si |

---

## FOUNDER DEPENDENCY MAP

| Fase | Angel | Carlos | AI |
|------|-------|--------|-----|
| Intake | Recibe WhatsApp | Mantiene API | — |
| CRM entry | Opera CRM | — | ops-sync auto |
| Research | — | — | Research engine |
| Strategy | **APRUEBA** | — | Strategy engine |
| Website build | — | **CONSTRUYE** | Claude Code assist |
| Marketing build | Contenido/vision | — | Production assist |
| SEO build | — | **IMPLEMENTA** | SEO engine |
| QA | **APRUEBA** visual/copy | Valida tecnico | QA checklists |
| Delivery | **CONFIRMA** con cliente | Deploy | — |
| Economics | Valida margenes | Trackea horas + costos | Reports |

---

## GATES DE APROBACION

| Gate | Quien | Que bloquea | SLA esperado |
|------|-------|-----------|-------------|
| Strategy approval | Angel | No se puede empezar a construir sin strategy aprobado | 24h |
| Build preview | Angel | No se puede hacer QA sin preview aprobado | 24h |
| Pre-delivery | Angel | No se entrega al cliente sin approval final | Mismo dia |

---

## PROXIMOS PASOS (NO implementar todavia — solo mapear)

1. **Automatizar research engine** — agente que genera research-pack desde brief
2. **Automatizar strategy engine** — agente que genera strategy-pack desde research
3. **Automatizar execution pack** — agente que genera los 3 packs desde strategy
4. **Template library** — componentes reutilizables entre websites de clientes
5. **Client portal** — que el cliente vea status de su proyecto
6. **Automated QA** — Lighthouse + accessibility + link checks automaticos
7. **Time tracking integration** — registrar horas automaticamente
8. **Real cost tracking** — conectar agent_runs tokens a credit_usage por proyecto

---

*Master Map v1.0 — Luno Growth Production System*
*Fecha: 2026-04-01*
