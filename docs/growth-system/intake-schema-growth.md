# Intake Schema — Luno Growth Services

> Schema de datos para el sistema de intake de clientes.
> Todo brief capturado debe persistirse en DB con esta estructura.
> Este schema alimenta: research, strategy, execution packs, CRM, y tracking.

---

## 1. BRIEF SUBMISSION (Formulario Landing)

### Campos del Brief

#### Bloque A: Negocio (requerido)

| Campo | Tipo | Requerido | Validacion | Ejemplo |
|-------|------|-----------|------------|---------|
| business_name | string | si | min 2 chars | "Restaurante La Terraza" |
| contact_name | string | si | min 2 chars | "Juan Perez" |
| contact_phone | string | si | 10-15 digitos | "8112345678" |
| contact_email | string | no | email format | "juan@laterraza.mx" |
| business_type | enum | si | predefinido | "restaurante" |
| business_description | text | si | min 10 chars | "Restaurante de mariscos en San Pedro" |
| target_audience | text | si | min 3 chars | "Familias y ejecutivos zona San Pedro" |
| location_city | string | no | — | "Monterrey" |
| location_zone | string | no | — | "San Pedro Garza Garcia" |

#### Bloque B: Servicio Deseado (requerido)

| Campo | Tipo | Requerido | Validacion | Opciones |
|-------|------|-----------|------------|----------|
| service_type | enum[] | si | min 1 | website, marketing, seo, bundle |
| package_interest | enum | no | — | express, pro, enterprise, unsure |
| payment_preference | enum | si | — | one_time, monthly, unsure |
| desired_actions | enum[] | si | min 1 | quote, reserve, order, contact, schedule |
| primary_channel | enum[] | si | min 1 | whatsapp, instagram, call, form |
| timeline | enum | no | — | urgent (< 1 week), normal (2-4 weeks), flexible |
| budget_range | enum | no | — | under_8k, 8k_15k, 15k_25k, above_25k, unsure |

#### Bloque C: Assets y Contexto (opcional)

| Campo | Tipo | Requerido | Validacion | Ejemplo |
|-------|------|-----------|------------|---------|
| has_domain | boolean | si | — | true |
| domain_name | string | condicional | URL format | "laterraza.mx" |
| has_logo | boolean | no | — | true |
| logo_url | string | condicional | URL format | "drive.google.com/..." |
| has_photos | boolean | no | — | true |
| photos_url | string | condicional | URL format | "drive.google.com/..." |
| competitors | text | no | — | "restaurantemarisol.mx, elcamaronfeliz.com" |
| reference_sites | text | no | — | "me gusta como se ve apple.com" |
| extra_pages | enum[] | no | — | menu, location, services, gallery, team |
| advanced_features | enum[] | no | — | catalog, appointments, payments, advanced_form, analytics |
| additional_notes | text | no | max 500 chars | "Queremos algo premium pero rapido" |

#### Bloque D: Metadata (auto-generado)

| Campo | Tipo | Fuente |
|-------|------|--------|
| submission_id | uuid | auto |
| submitted_at | timestamp | auto |
| source | enum | landing_page / direct / referral / ops_sync |
| utm_source | string | URL param |
| utm_medium | string | URL param |
| utm_campaign | string | URL param |
| ip_country | string | geo lookup |
| device_type | enum | user-agent parse |

---

## 2. CAMPOS NUEVOS vs ACTUALES

### Campos que YA existen en el brief actual
- business_name (businessName)
- contact_name (contactName → contactName)
- contact_phone (contactPhone)
- contact_email (email)
- business_description (whatYouSell)
- target_audience (whoYouSellTo)
- desired_actions (desiredActions)
- primary_channel (orderChannels)
- payment_preference (paymentPreference)
- has_domain (hasDomain)
- has_logo (hasLogo)
- logo_url (logoLinks)
- extra_pages (extraPages)
- advanced_features (advancedFeatures)
- timeline (timeline)

### Campos NUEVOS a agregar
- business_type (enum — restaurante, consultorio, nightlife, profesional, ecommerce, otro)
- location_city
- location_zone
- service_type (website, marketing, seo, bundle)
- package_interest (express, pro, enterprise, unsure)
- budget_range
- has_photos + photos_url
- competitors
- reference_sites
- additional_notes
- Metadata automatica (submission_id, timestamps, UTM, device)

---

## 3. NORMALIZACION

### Business Type Mapping
| Input del usuario | Valor normalizado |
|-------------------|-------------------|
| restaurante, restaurant, comida, food | restaurant |
| consultorio, clinica, doctor, dental | healthcare |
| bar, antro, club, nightlife, eventos | nightlife |
| tienda, shop, ecommerce, productos | ecommerce |
| profesional, freelance, servicios, despacho | professional |
| otro, no se, general | other |

### Service Type Mapping
| Combinacion de respuestas | Servicio inferido |
|---------------------------|-------------------|
| Solo website + extras basicos | website |
| Website + SEO | website + seo |
| Marketing + contenido + ads | marketing |
| Todo junto | bundle |
| No sabe / unclear | unsure → requiere discovery |

### Package Mapping (inferido, no definitivo)
| Senales del brief | Paquete sugerido |
|-------------------|-----------------|
| 1 pagina, basico, rapido, budget < $8K | express |
| 1 pagina, animaciones, SEO, budget $8-15K | pro |
| Multi-pagina, flujos, analytics, budget > $15K | enterprise |
| No sabe, sin budget claro | unsure → discovery |

---

## 4. PERSISTENCIA

### Tabla: growth_briefs

```sql
CREATE TABLE growth_briefs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Negocio
  business_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  contact_email TEXT,
  business_type TEXT NOT NULL DEFAULT 'other',
  business_description TEXT NOT NULL,
  target_audience TEXT NOT NULL,
  location_city TEXT,
  location_zone TEXT,

  -- Servicio
  service_types TEXT[] NOT NULL DEFAULT '{}',
  package_interest TEXT DEFAULT 'unsure',
  payment_preference TEXT NOT NULL DEFAULT 'unsure',
  desired_actions TEXT[] NOT NULL DEFAULT '{}',
  primary_channels TEXT[] NOT NULL DEFAULT '{}',
  timeline TEXT DEFAULT 'flexible',
  budget_range TEXT DEFAULT 'unsure',

  -- Assets
  has_domain BOOLEAN DEFAULT FALSE,
  domain_name TEXT,
  has_logo BOOLEAN DEFAULT FALSE,
  logo_url TEXT,
  has_photos BOOLEAN DEFAULT FALSE,
  photos_url TEXT,
  competitors TEXT,
  reference_sites TEXT,
  extra_pages TEXT[] DEFAULT '{}',
  advanced_features TEXT[] DEFAULT '{}',
  additional_notes TEXT,

  -- Metadata
  source TEXT NOT NULL DEFAULT 'landing_page',
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  ip_country TEXT,
  device_type TEXT,

  -- Status
  status TEXT NOT NULL DEFAULT 'new'
    CHECK (status IN ('new', 'reviewed', 'qualified', 'converted', 'rejected', 'spam')),
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,
  growth_client_id UUID REFERENCES growth_clients(id),
  growth_project_id UUID,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
```

### Flujo de Status

```
new → reviewed → qualified → converted (se crea growth_client + growth_project)
new → reviewed → rejected (no es buen fit)
new → spam (honeypot o pattern match)
```

### Integracion con CRM

Cuando status = 'converted':
1. Crear registro en `growth_clients` con datos del brief
2. Crear registro en `growth_projects` con service_type + package_interest
3. Crear `crm_activities` entry: "Brief recibido desde landing page"
4. Actualizar `growth_briefs.growth_client_id` con referencia
5. Brief queda vinculado al cliente para siempre (trazabilidad)

---

## 5. API ENDPOINT

### POST /api/growth/intake

**Origen**: Landing page brief form
**Auth**: No requiere (publico) — proteccion via honeypot + rate limit

**Payload**: JSON con todos los campos del Bloque A + B + C
**Response**: `{ success: true, submission_id: "uuid" }`

**Acciones**:
1. Validar campos requeridos
2. Normalizar business_type y service_types
3. Inferir package_interest si no dado
4. Insertar en growth_briefs
5. (Futuro) Trigger notificacion a Angel

### POST /api/growth/intake/review

**Origen**: Admin CRM
**Auth**: Platform owner (Angel o Carlos)

**Payload**: `{ brief_id, status, notes }`
**Acciones**:
1. Actualizar status
2. Si status = 'converted': crear growth_client + growth_project
3. Loggear en audit_logs

---

## 6. CAMPOS QUE ALIMENTAN CADA FASE

| Campo | Research | Strategy | Website Pack | Marketing Pack | SEO Pack |
|-------|----------|----------|-------------|---------------|----------|
| business_name | si | si | si | si | si |
| business_type | si | si | si | si | si |
| business_description | si | si | si | si | si |
| target_audience | si | si | si | si | si |
| location_city/zone | si | si | si (footer) | si (geo targeting) | si (local SEO) |
| competitors | si | si | no | si | si |
| reference_sites | no | si | si | no | no |
| desired_actions | no | si | si (CTAs) | si (conversion goals) | si (page intent) |
| primary_channels | no | si | si (CTA routing) | si (channel strategy) | no |
| extra_pages | no | no | si (sitemap) | no | si (page structure) |
| advanced_features | no | no | si (features) | no | no |
| has_domain | no | no | si (deploy) | no | si (technical SEO) |
| has_logo/photos | no | no | si (assets) | si (creative assets) | no |
| budget_range | no | si (scope) | si (tier) | si (ad budget) | si (scope) |
