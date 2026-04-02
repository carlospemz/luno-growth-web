# QA Checklists — Luno Growth Services

> Checklists de calidad para CADA tipo de entregable.
> Todo entregable debe pasar su checklist ANTES de entregar al cliente.
> Los items marcados [ANGEL] requieren aprobacion explicita de Angel.

---

## 1. QA CHECKLIST — WEBSITE

### Visual / Diseno
- [ ] Colores del brand del cliente aplicados correctamente
- [ ] Tipografia consistente en todo el sitio
- [ ] Espaciado uniforme entre secciones
- [ ] Imagenes en alta resolucion (no pixeladas, no estiradas)
- [ ] Logo visible y bien posicionado
- [ ] Sin elementos placeholder (lorem ipsum, imagenes stock genericas)
- [ ] [ANGEL] Se siente premium, no generico
- [ ] [ANGEL] Nivel visual coherente con la doctrina creativa

### Copy
- [ ] Sin errores de ortografia
- [ ] Sin ingles accidental (todo en espanol de Mexico)
- [ ] Cada seccion tiene copy final (no placeholder)
- [ ] CTAs claros y con destino correcto
- [ ] Microcopy de confianza presente ("Respuesta en menos de 24h" o equivalente)
- [ ] [ANGEL] Tono coherente con la marca del cliente

### Funcionalidad
- [ ] TODOS los links funcionan (no 404, no broken)
- [ ] WhatsApp button abre con mensaje correcto
- [ ] Boton de llamada funciona (si aplica)
- [ ] Formularios envian correctamente
- [ ] Navegacion funciona (menu, scroll to section, links internos)
- [ ] Pagina carga en < 3 segundos
- [ ] Sin errores en consola del navegador

### Mobile
- [ ] Responsive en 375px (iPhone SE)
- [ ] Responsive en 390px (iPhone 14)
- [ ] Responsive en 768px (iPad)
- [ ] Responsive en 1280px (laptop)
- [ ] Responsive en 1440px+ (desktop)
- [ ] Sticky WhatsApp bar visible en mobile
- [ ] Menu hamburguesa funciona
- [ ] Textos legibles sin zoom
- [ ] Botones tocables (min 44px touch target)
- [ ] Sin scroll horizontal

### Performance
- [ ] LCP (Largest Contentful Paint) < 2.5s
- [ ] CLS (Cumulative Layout Shift) < 0.1
- [ ] INP (Interaction to Next Paint) < 200ms
- [ ] Imagenes optimizadas (WebP/AVIF via Next.js Image)
- [ ] No hay JS bloqueante innecesario
- [ ] Lighthouse score > 85 en mobile

### Accesibilidad
- [ ] Focus visible en todos los elementos interactivos
- [ ] Alt text en todas las imagenes
- [ ] Contraste de color suficiente (WCAG AA)
- [ ] Reduced-motion respetado
- [ ] Semantic HTML (h1-h6 en orden, nav, main, footer)

### SEO (si paquete Pro+)
- [ ] Title tag unico por pagina (< 60 chars)
- [ ] Meta description unica por pagina (< 155 chars)
- [ ] H1 unico por pagina con keyword
- [ ] Open Graph tags configurados
- [ ] Schema markup (LocalBusiness si aplica)
- [ ] Sitemap.xml generado
- [ ] Robots.txt configurado

### Deploy
- [ ] Dominio configurado y apuntando correctamente
- [ ] HTTPS activo (certificado SSL)
- [ ] Favicon presente
- [ ] OG image configurada
- [ ] 404 page custom (o default aceptable)
- [ ] Analytics configurado (si aplica)

---

## 2. QA CHECKLIST — MARKETING (Contenido)

### Post individual
- [ ] Copy revisado (sin errores, tono correcto)
- [ ] Visual en dimensiones correctas (1080x1080, 1080x1920, etc.)
- [ ] Colores del brand del cliente
- [ ] Logo visible (si aplica al formato)
- [ ] CTA en caption o visual
- [ ] Hashtags relevantes (5-15)
- [ ] Sin contenido ofensivo, ambiguo o que pueda malinterpretarse
- [ ] [ANGEL] Tono y mensaje alineados con estrategia

### Calendario mensual
- [ ] Minimo 8 piezas
- [ ] Balance de pilares (40/30/20/10 o similar)
- [ ] Al menos 1 pieza de cada pilar
- [ ] Fechas clave del mes cubiertas
- [ ] No hay huecos de mas de 3 dias sin contenido
- [ ] [ANGEL] Narrativa del mes coherente

### Campana
- [ ] Objetivo claro y medible
- [ ] Budget definido (si aplica)
- [ ] Segmentacion definida (si ads)
- [ ] Copy de ad aprobado
- [ ] Landing page / destino funcionando
- [ ] Tracking de conversion configurado
- [ ] [ANGEL] Messaging alineado con brand

---

## 3. QA CHECKLIST — SEO

### On-page
- [ ] Meta tags en todas las paginas
- [ ] H1 con keyword principal
- [ ] Alt text en imagenes
- [ ] URLs limpias
- [ ] Internal links presentes
- [ ] Schema markup implementado (si Pro+)

### Tecnico
- [ ] Sitemap.xml accesible en /sitemap.xml
- [ ] Robots.txt no bloquea paginas importantes
- [ ] HTTPS sin mixed content
- [ ] Canonical URLs definidas
- [ ] No hay paginas con noindex accidental
- [ ] Core Web Vitals passing

### Local (si aplica)
- [ ] Google My Business configurado
- [ ] NAP consistente
- [ ] Categorias correctas
- [ ] Fotos subidas
- [ ] Horarios correctos

### Monitoring
- [ ] Google Search Console verificado
- [ ] GA4 conectado
- [ ] Sitemap enviado a GSC
- [ ] Baseline de posiciones documentado

---

## 4. QA CHECKLIST — PROPUESTA COMERCIAL

- [ ] Pricing correcto (verificar contra tabulador oficial)
- [ ] Nombre del cliente correcto
- [ ] Datos numericos con fuente o calificados como estimacion
- [ ] Brand de Luno aplicado (purple/cyan)
- [ ] Sin errores de ortografia
- [ ] Estructura completa (problema, solucion, beneficios, pricing, timeline, CTA)
- [ ] CTA con link funcional (WhatsApp o brief)
- [ ] [ANGEL] Messaging alineado con la vertical
- [ ] [ANGEL] Pricing aprobado para este cliente

---

*Template v1.0 — Luno Growth Production System*
