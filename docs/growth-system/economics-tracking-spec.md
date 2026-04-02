# Economics Tracking Spec — Luno Growth

> Especificacion para trackear costos, margenes y capacidad del sistema de produccion.
> Toda superficie de costo debe ser visible. Sin estimaciones — datos reales.

---

## 1. SUPERFICIES DE COSTO

### Costo por proyecto

| Superficie | Como medir | Donde registrar |
|-----------|-----------|----------------|
| Horas founder (Angel) | Timer o registro manual post-tarea | crm_activities.metadata_json |
| Horas founder (Carlos) | Timer o registro manual post-tarea | crm_activities.metadata_json |
| Tokens Claude (research) | agent_runs.metadata_json.tokens | credit_usage por proyecto |
| Tokens Claude (strategy) | agent_runs.metadata_json.tokens | credit_usage por proyecto |
| Tokens Claude (QA) | agent_runs.metadata_json.tokens | credit_usage por proyecto |
| Infra prorrateada | $1,300 MXN/mes / num_clientes_activos | calculado mensualmente |
| Assets externos | Fotos stock, dominio, etc. | growth_invoices como gasto |
| Retrabajo | Rondas extra de revision | Contar rondas en project status log |

### Costo por tipo de servicio

| Servicio | Costo estimado v1 | Componentes |
|----------|-------------------|-------------|
| Website Express | ~$2,000-3,000 | 4-6h Carlos + ~$5 Claude + $108 infra |
| Website Pro | ~$4,000-6,000 | 8-15h Carlos + ~$15 Claude + $108 infra |
| Website Enterprise | ~$8,000-15,000 | 20-40h Carlos + ~$30 Claude + $108 infra |
| Marketing mensual | ~$2,000-4,000 | 4-8h Angel + ~$10 Claude |
| SEO setup | ~$1,000-2,000 | 2-4h Carlos + ~$5 Claude |

> ESTAS SON ESTIMACIONES INICIALES. Deben reemplazarse con datos reales despues de los primeros 3 proyectos.

---

## 2. MARGEN POR PROYECTO

### Formula

```
Margen = (Precio cobrado - Costo total) / Precio cobrado × 100

Donde Costo total =
  (horas_angel × tarifa_angel) +
  (horas_carlos × tarifa_carlos) +
  costo_claude +
  infra_prorrateada +
  assets_externos +
  costo_retrabajo
```

### Tarifa interna de founders
| Founder | Tarifa por hora | Razon |
|---------|----------------|-------|
| Angel | $500 MXN/h | Basado en meta de ingreso personal |
| Carlos | $500 MXN/h | Basado en meta de ingreso personal |

> Ajustar cuando haya datos reales de cuanto tiempo toma cada tipo de proyecto.

### Umbrales

| Nivel | Margen | Accion |
|-------|--------|--------|
| Saludable | > 60% | Continuar |
| Aceptable | 40-60% | Monitorear, buscar eficiencia |
| Alerta | 20-40% | Revisar pricing o reducir scope |
| Critico | < 20% | Pausar ventas, reestructurar oferta |

---

## 3. CAPACIDAD

### Modelo actual (2 founders + AI)

| Recurso | Horas disponibles/semana | Tipo de trabajo |
|---------|------------------------|----------------|
| Angel | ~20-25h | Ventas, aprobaciones, relacion con clientes |
| Carlos | ~20-25h | Websites, infra, agentes |
| Claude API | Ilimitado (costo variable) | Research, strategy, QA, content |

### Capacidad por tipo de proyecto

| Tipo | Horas founder | Proyectos simultaneos max |
|------|-------------|--------------------------|
| Website Express | 4-6h Carlos | 4-5 por semana |
| Website Pro | 8-15h Carlos | 1-2 por semana |
| Website Enterprise | 20-40h Carlos | 1 cada 1-3 semanas |
| Marketing mensual | 4-8h Angel/mes/cliente | 3-5 clientes |
| SEO setup | 2-4h Carlos | Paralelo con website |

### Umbral de capacidad

```
IF (horas_comprometidas / horas_disponibles > 0.80) → ALERTA
IF (horas_comprometidas / horas_disponibles > 0.95) → STOP VENTAS
```

---

## 4. TRACKING DE TIEMPO

### Como registrar (V1 — simple)

Cada vez que un founder trabaja en un proyecto:

```json
// En crm_activities o como campo en growth_projects
{
  "activity_type": "work_log",
  "entity_type": "project",
  "entity_id": "{project_id}",
  "actor": "carlos@lunolive.com",
  "metadata_json": {
    "hours": 2.5,
    "category": "build",  // build | review | meeting | admin
    "notes": "Hero + pricing sections"
  }
}
```

### Categorias de tiempo

| Categoria | Que incluye |
|-----------|-------------|
| sales | Discovery call, proposal, follow-up, negociacion |
| research | Market research, competitor analysis |
| strategy | Brand direction, messaging, website direction |
| build | Codigo, diseno, contenido, deploy |
| review | QA, revision de calidad, feedback |
| meeting | Calls con cliente, alineacion interna |
| admin | Facturacion, CRM, email, coordinacion |

---

## 5. RETRABAJO

### Como medir
- Contar rondas de revision por proyecto (esperado vs real)
- Registrar razon del retrabajo:
  - `scope_change` — cliente cambio de idea
  - `quality_issue` — no paso QA
  - `communication_gap` — brief incompleto o malinterpretado
  - `creative_direction` — Angel requirio cambio de direccion

### Umbral aceptable
- Express: 1 ronda incluida, 0 extra es ideal
- Pro: 1 ronda incluida, 1 extra max
- Enterprise: 2 rondas incluidas, 1 extra max

### Costo de retrabajo
```
costo_retrabajo = rondas_extra × horas_promedio_por_ronda × tarifa_founder
```

---

## 6. REPORTES

### Reporte semanal (automatizable)
- Proyectos activos y su status
- Horas trabajadas por founder
- Tokens consumidos por agente/proyecto
- Briefs recibidos vs convertidos
- Pipeline value (total en negociacion)

### Reporte mensual
- Revenue total (MRR + proyectos one-time)
- Costo total (founders + Claude + infra)
- Margen bruto (total y por proyecto)
- Capacidad utilizada (% de horas)
- Retrabajo (rondas extra y costo)
- Tiempo promedio de entrega por tipo
- NPS o satisfaccion del cliente (si medible)

---

## 7. CAMPOS A AGREGAR EN DB

### growth_projects (campos nuevos)

```sql
ALTER TABLE growth_projects ADD COLUMN IF NOT EXISTS
  estimated_hours NUMERIC(6,1),
  actual_hours NUMERIC(6,1),
  estimated_cost NUMERIC(10,2),
  actual_cost NUMERIC(10,2),
  margin_percent NUMERIC(5,2),
  revision_rounds INTEGER DEFAULT 0,
  revision_rounds_included INTEGER DEFAULT 1,
  retrabajo_reason TEXT,
  delivery_days INTEGER,
  research_pack_id UUID,
  strategy_pack_id UUID,
  execution_pack_id UUID;
```

### Tabla: work_logs

```sql
CREATE TABLE work_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES growth_projects(id),
  actor TEXT NOT NULL,
  hours NUMERIC(5,2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('sales','research','strategy','build','review','meeting','admin')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

---

*Template v1.0 — Luno Growth Production System*
