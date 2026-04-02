# Website Execution Pack Template — Luno Growth

> Se genera a partir del Strategy Pack.
> Contiene TODO lo necesario para que un builder construya el website con minima intervencion.
> Un execution pack por website/proyecto.

---

## HEADER

| Campo | Valor |
|-------|-------|
| Cliente | {business_name} |
| Proyecto ID | {project_id} |
| Paquete | {express / pro / enterprise} |
| Strategy Pack | {strategy_pack_id} |
| Builder asignado | {builder} |
| Deadline | {deadline} |
| Status | ready_to_build / in_progress / review / delivered |

---

## 1. SITEMAP

| # | Pagina | URL slug | Secciones | Prioridad |
|---|--------|----------|-----------|-----------|
| 1 | Home | / | {lista de secciones} | P0 |
| 2 | {page_2} | /{slug} | {secciones} | P1 |

---

## 2. SECCION POR SECCION

### Seccion: Hero
**Objetivo**: Captar atencion en 3 segundos. Comunicar que hace el negocio y empujar a actuar.

| Campo | Contenido |
|-------|-----------|
| H1 | {headline — del messaging hierarchy} |
| Subtitle | {1-2 oraciones — propuesta de valor} |
| CTA primario | {texto} → {destino: WhatsApp / #pricing / #contact} |
| CTA secundario | {texto} → {destino} |
| Microcopy | {ej: "Respuesta en menos de 24h"} |
| Visual | {que mostrar: foto del negocio / mockup / ilustracion / nada} |

### Seccion: Servicios / Que ofrecemos
**Objetivo**: Mostrar la oferta de forma clara y rapida.

| # | Titulo | Descripcion (1 linea) | Icono/imagen |
|---|--------|----------------------|-------------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

### Seccion: Evidencia / Portfolio / Resultados
**Objetivo**: Generar confianza con prueba real.

| Tipo | Contenido |
|------|-----------|
| Testimonios | {citas reales del cliente o "pendiente"} |
| Numeros | {metricas: "X anos", "X clientes", "X productos"} |
| Fotos | {URLs de fotos o "pendiente sesion"} |
| Google reviews | {link a reviews si existen} |

### Seccion: Precios (si aplica)
**Objetivo**: Mostrar opciones claras sin friccion.

| Tier | Nombre | Precio | Incluye | CTA |
|------|--------|--------|---------|-----|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

### Seccion: Proceso / Como funciona
**Objetivo**: Reducir incertidumbre. Mostrar que es facil.

| Paso | Titulo | Descripcion | Tiempo |
|------|--------|-------------|--------|
| 1 | | | |
| 2 | | | |
| 3 | | | |

### Seccion: FAQ
**Objetivo**: Resolver objeciones antes del contacto.

| Pregunta | Respuesta |
|----------|-----------|
| | |
| | |
| | |

### Seccion: CTA Final / Contacto
**Objetivo**: Cerrar. Ultimo empujon para contactar.

| Campo | Contenido |
|-------|-----------|
| Titulo | {ej: "Tu proximo [keyword] empieza aqui."} |
| CTA primario | {texto} → {destino} |
| CTA secundario | {texto} → {destino} |
| Info de contacto | WhatsApp: {tel}, Email: {email} |

### Seccion: Footer
| Campo | Contenido |
|-------|-----------|
| Logo | {si / no / pendiente} |
| Links | {paginas del sitemap} |
| Redes | {instagram / facebook / tiktok URLs} |
| Direccion | {si aplica} |
| Horario | {si aplica} |
| Copyright | © {year} {business_name} |

---

## 3. CTA MAP COMPLETO

| Ubicacion | Texto | Destino | Canal | Visible en |
|-----------|-------|---------|-------|-----------|
| Hero | | | | Desktop + Mobile |
| Sticky bar | | WhatsApp | | Solo mobile |
| Post-servicios | | | | Desktop + Mobile |
| Post-precios | | | | Desktop + Mobile |
| Footer | | | | Desktop + Mobile |

---

## 4. ASSETS REQUERIDOS

| Asset | Status | Fuente | Notas |
|-------|--------|--------|-------|
| Logo (PNG/SVG) | {disponible / pendiente} | {logo_url} | |
| Fotos del negocio | {disponible / pendiente} | {photos_url} | |
| Favicon | {crear de logo / pendiente} | | 32x32 + 180x180 |
| OG Image | {crear / pendiente} | | 1200x630 |
| Colores | {palette del Strategy Pack} | | |
| Tipografia | {Geist / otra} | | |

---

## 5. FEATURES TECNICAS

| Feature | Incluido | Notas |
|---------|----------|-------|
| Mobile responsive | SIEMPRE | |
| WhatsApp button | SIEMPRE | |
| Boton de llamada | {si / no} | |
| Google Analytics | {si Pro+ / no} | GA4 |
| SEO basico (meta tags) | {si Pro+ / no} | |
| Schema markup | {si Pro+ / no} | LocalBusiness |
| Sitemap.xml | {si Pro+ / no} | |
| Catalogo | {si advanced_features} | |
| Citas/reservaciones | {si advanced_features} | |
| Formulario avanzado | {si advanced_features} | |
| Pagos | {si advanced_features} | |

---

## 6. BRAND SPEC

| Propiedad | Valor |
|-----------|-------|
| Color primario | {hex} |
| Color secundario | {hex} |
| Color fondo | {hex} |
| Color texto | {hex} |
| Border radius | {px} |
| Font heading | {font} |
| Font body | {font} |
| Tono | {directo / amigable / premium / casual} |

---

## 7. CONSTRAINTS

| Constraint | Valor |
|-----------|-------|
| Max paginas | {1 / 3-5 dependiendo del paquete} |
| Max secciones por pagina | {5 Express / 9 Pro / ilimitado Enterprise} |
| Rondas de revision | {1 Express / 1 Pro / 2 Enterprise} |
| Framework | Next.js + Tailwind |
| Deploy | Vercel |
| Hosting | {Vercel / WaaS included} |
| Timeline | {48-72h Express / 4-7d Pro / 1-3sem Enterprise} |

---

## 8. CHECKLIST PRE-BUILD

- [ ] Strategy Pack aprobado por Angel
- [ ] Assets disponibles (logo, fotos, o plan B definido)
- [ ] Copy de todas las secciones escrito y aprobado
- [ ] CTA map definido
- [ ] Dominio listo (o plan de dominio temporal)
- [ ] Palette de colores definida
- [ ] Tipografia definida
- [ ] Features tecnicas confirmadas
- [ ] Deadline confirmado

---

## 9. PROMPT PARA BUILDER

> Este prompt se usa para alimentar a un builder (humano o agente) con TODO lo necesario.

```
Construye un website para {business_name}.

CONTEXTO:
{business_description}
Audiencia: {target_audience}
Ubicacion: {location}
Paquete: {package}

ESTRUCTURA:
{sitemap completo con secciones}

COPY:
{copy de cada seccion, listo para copiar-pegar}

CTAs:
{CTA map completo}

BRAND:
Colores: {palette}
Font: {font}
Tono: {tono}

FEATURES:
{lista de features tecnicas}

ASSETS:
{lista de assets con URLs}

CONSTRAINTS:
- Framework: Next.js + Tailwind
- Deploy: Vercel
- Mobile-first
- WhatsApp como CTA principal
- Performance: < 3s load, 60fps
- Accesibilidad: reduced-motion, focus-visible
- SEO: {meta tags / schema / sitemap si aplica}

DEADLINE: {fecha}
```

---

*Template v1.0 — Luno Growth Production System*
