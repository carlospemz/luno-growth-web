# SEO Execution Pack Template — Luno Growth

> Se genera a partir del Research Pack + Strategy Pack.
> Define la estrategia SEO tecnica y de contenido para el cliente.
> Un execution pack por website.

---

## HEADER

| Campo | Valor |
|-------|-------|
| Cliente | {business_name} |
| Proyecto ID | {project_id} |
| Website URL | {domain_name} |
| Research Pack | {research_pack_id} |
| Strategy Pack | {strategy_pack_id} |
| Fecha | {date} |
| Status | draft / implemented / monitoring |

---

## 1. KEYWORD CLUSTERS

### Cluster 1: {tema_principal — ej: "servicios"}
| Keyword | Intent | Pagina target | Volumen | Dificultad | Prioridad |
|---------|--------|--------------|---------|-----------|-----------|
| {keyword_1} | transactional | / | | | P0 |
| {keyword_2} | transactional | / | | | P0 |
| {keyword_3} | informational | /servicios | | | P1 |

### Cluster 2: {tema — ej: "ubicacion/local"}
| Keyword | Intent | Pagina target | Volumen | Dificultad | Prioridad |
|---------|--------|--------------|---------|-----------|-----------|
| "{business_type} en {zone}" | transactional | / | | | P0 |
| "{business_type} cerca de mi" | transactional | / | | | P0 |
| "{business_type} {city}" | transactional | / | | | P1 |

### Cluster 3: {tema — ej: "producto/servicio especifico"}
| Keyword | Intent | Pagina target | Volumen | Dificultad | Prioridad |
|---------|--------|--------------|---------|-----------|-----------|

---

## 2. PAGE INTENT MAP

| Pagina | URL | Keyword principal | Intent | Meta title | Meta description |
|--------|-----|-------------------|--------|-----------|-----------------|
| Home | / | {kw} | transactional | {title — max 60 chars} | {desc — max 155 chars} |
| {page_2} | /{slug} | {kw} | {intent} | | |

---

## 3. METADATA DIRECTION

### Home
```
<title>{business_name} — {propuesta_de_valor_corta} | {city}</title>
<meta name="description" content="{descripcion con CTA y ubicacion. Max 155 chars.}" />
<meta property="og:title" content="{title}" />
<meta property="og:description" content="{desc}" />
<meta property="og:image" content="{og_image_url}" />
<meta property="og:type" content="website" />
```

### {page_2}
```
<title>{page_title} — {business_name}</title>
<meta name="description" content="{desc}" />
```

---

## 4. ON-PAGE CHECKLIST

### Estructura
- [ ] H1 unico por pagina con keyword principal
- [ ] H2s descriptivos (no genericos como "Nuestros servicios")
- [ ] Parrafos cortos (2-3 oraciones max)
- [ ] Listas cuando aplique
- [ ] Internal links entre paginas

### Imagenes
- [ ] Alt text descriptivo en todas las imagenes
- [ ] Formato WebP o AVIF (Next.js Image component)
- [ ] Lazy loading (nativo en Next.js)
- [ ] Dimensiones especificadas (no layout shift)

### Tecnico
- [ ] URLs limpias (sin parametros innecesarios)
- [ ] HTTPS (Vercel provee)
- [ ] Mobile-first (responsive design)
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Sitemap.xml generado
- [ ] Robots.txt configurado
- [ ] Canonical URLs definidas

### Schema Markup
- [ ] LocalBusiness (si negocio fisico)
  - name, address, phone, openingHours, geo, url
- [ ] Organization (si solo digital)
- [ ] BreadcrumbList (si multi-pagina)
- [ ] FAQ (si seccion de FAQ existe)

---

## 5. INTERNAL LINKING DIRECTION

| Desde | Hacia | Anchor text sugerido | Contexto |
|-------|-------|---------------------|----------|
| Home hero | /servicios (si existe) | "Ver nuestros servicios" | CTA secundario |
| Home FAQ | / (scroll) | "Cotizar ahora" | Respuesta a precio |
| Footer | Todas las paginas | Nombres de pagina | Navegacion |

---

## 6. LOCAL SEO (si aplica)

### Google My Business
- [ ] Perfil creado/reclamado
- [ ] Nombre exacto: {business_name}
- [ ] Direccion: {address}
- [ ] Telefono: {phone}
- [ ] Horario: {hours}
- [ ] Categorias: {primary_category}, {secondary_category}
- [ ] Fotos subidas (min 5: fachada, interior, productos, equipo)
- [ ] Descripcion con keywords

### NAP Consistency
- Nombre: {business_name} (exacto en todas partes)
- Direccion: {address} (formato identico)
- Phone: {phone} (formato identico)

### Citas locales
| Directorio | Status | URL |
|-----------|--------|-----|
| Google My Business | {pendiente / configurado} | |
| Facebook Page | {pendiente / configurado} | |
| Yelp | {si aplica} | |
| TripAdvisor | {si restaurante} | |
| Doctoralia | {si healthcare} | |

---

## 7. MONITORING

### Metricas a trackear
| Metrica | Tool | Frecuencia |
|---------|------|-----------|
| Posiciones de keywords | Google Search Console | Semanal |
| Trafico organico | GA4 | Semanal |
| Clicks desde busqueda | GSC | Semanal |
| Core Web Vitals | PageSpeed Insights | Mensual |
| Backlinks | GSC | Mensual |

### Setup requerido
- [ ] Google Search Console verificado
- [ ] GA4 configurado con conversion events
- [ ] Propiedad conectada a website
- [ ] Sitemap enviado a GSC

---

## 8. IMPLEMENTATION PRIORITY

| Prioridad | Tarea | Impacto | Esfuerzo |
|-----------|-------|---------|----------|
| P0 | Meta tags en todas las paginas | Alto | Bajo |
| P0 | Schema LocalBusiness | Alto | Bajo |
| P0 | Sitemap.xml | Alto | Bajo |
| P0 | H1s con keywords | Alto | Bajo |
| P1 | Google My Business setup | Alto | Medio |
| P1 | Alt text en imagenes | Medio | Bajo |
| P1 | Internal linking | Medio | Bajo |
| P2 | Contenido long-tail (blog si Enterprise) | Medio | Alto |
| P2 | Citas locales | Medio | Medio |

---

*Template v1.0 — Luno Growth Production System*
