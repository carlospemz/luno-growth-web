# Creative Doctrine — Luno Growth Services

> Documento congelado. Esta doctrina NO se modifica sin aprobacion explicita de Angel Eduardo.
> Cualquier sistema de produccion, agente, template o builder DEBE preservar estos estandares.
> Si un criterio no esta cubierto aqui, se marca como "requiere aprobacion de Angel".

---

## 1. IDENTIDAD VISUAL

### Palette de Color (Canonical — actualizado por Angel 2026-04-01)

> NOTA: Angel pivoteo el landing de Growth a DARK theme. Esto aplica SOLO al landing
> de Growth (luno-growth-web). Luno Platform (luno-platform) sigue siendo LIGHT (#fafafa).

| Token | Valor | Uso |
|-------|-------|-----|
| Background | `#080810` | Fondo principal — DARK theme para Growth landing |
| Foreground | `#f1f5f9` | Texto principal (light on dark) |
| Surface | `rgba(255,255,255,0.05)` | Cards, inputs, modals |
| Surface-2 | `rgba(255,255,255,0.03)` | Secundario |
| Accent (Purple) | `#a855f7` | Color primario de marca |
| Accent Deep | `#9333ea` | Purple mas oscuro para contraste |
| Accent Secondary (Cyan) | `#06b6d4` | Color secundario |
| Accent Alt (Cyan Light) | `#22d3ee` | Variante de cyan |
| Border | `rgba(255, 255, 255, 0.08)` | Bordes sutiles (light on dark) |
| Glow Purple | `rgba(168, 85, 247, 0.15)` | Resplandor (mas visible en dark) |
| Glow Cyan | `rgba(6, 182, 212, 0.12)` | Resplandor |

**Regla**: Growth landing es DARK theme (`#080810`). Luno Platform sigue LIGHT (`#fafafa`).
El gradient background usa purple/cyan/magenta breathing sobre dark.

**Fuente**: `globals.css` (actualizado por Angel), `PageBackdrop.tsx`, `AnimatedGradientBackground.tsx`

### Gradientes de Marca

| Nombre | Definicion | Uso |
|--------|-----------|-----|
| Brand gradient text | `linear-gradient(135deg, #a855f7, #06b6d4)` | Palabras clave en titulos |
| CTA primary | `from-purple-600 to-cyan-500` | Botones principales |
| Shine sweep | `#9333ea → #06b6d4 → #c026d3 → #9333ea` (135deg) | Efecto iridiscente en texto |
| Accent gradient | `linear-gradient(135deg, #a855f7, #9333ea, #06b6d4)` | Fondos decorativos |
| Iridescent border | `conic-gradient` con purple/cyan/magenta al 15% opacity | Bordes de cards premium |

### Glassmorphism

| Propiedad | Valor |
|-----------|-------|
| Background | `rgba(255, 255, 255, 0.82–0.92)` |
| Backdrop blur | `20–24px` |
| Border | `1px solid rgba(0, 0, 0, 0.04–0.06)` |
| Border radius | `16–24px` |
| Shadow base | `0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)` |
| Shadow hover | `0 4px 16px rgba(0,0,0,0.06), 0 0 24px rgba(168,85,247,0.04)` |

**Regla**: Las superficies deben ser semi-transparentes para que el fondo "respire" a traves de ellas. No usar fondos blancos solidos opacos.

### Tipografia

| Nivel | Tamano | Peso | Tracking | Leading |
|-------|--------|------|----------|---------|
| Hero H1 | 36/56/64px (mobile/tablet/desktop) | Bold (700) | -0.03em | 1.05 |
| Section H2 | 28/36px | Bold (700) | -0.02em | 1.1 |
| Card H3 | 17–20px | Semibold (600) | -0.01em | 1.15 |
| Body | 14–16px | Regular (400) | normal | 1.45–1.7 |
| Small/Label | 12–13px | Medium (500) | 0.1em (uppercase) | 1.3 |

**Font**: Geist (sans) + Geist Mono
**Regla**: Nunca usar tipografia menor a 12px. Body text nunca menor a 14px en desktop.

### Sombras

| Nivel | Definicion |
|-------|-----------|
| sm | `0 1px 2px rgba(0,0,0,0.03)` |
| md | `0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)` |
| lg | `0 4px 16px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.02)` |
| glow | `0 0 24px rgba(168,85,247,0.06)` |
| glow-strong | `0 4px 20px rgba(168,85,247,0.08), 0 0 40px rgba(168,85,247,0.06)` |

**Regla**: Sombras siempre suaves, multi-capa. NUNCA sombras duras o muy oscuras.

### Radii

| Token | Valor |
|-------|-------|
| Base | 16px |
| lg | 20px |
| xl | 24px |
| Full | 9999px (pills, badges) |
| Input | 14px |

---

## 2. ANIMACION Y MOVIMIENTO

### Easing

| Nombre | Curva | Uso |
|--------|-------|-----|
| Pop (principal) | `[0.22, 1, 0.36, 1]` | La mayoria de transiciones |
| EaseOut | `[0.16, 1, 0.3, 1]` | Salidas rapidas |
| Standard | `[0.25, 0.1, 0.25, 1]` | Transiciones suaves |

**Regla**: El easing debe sentirse "snappy" y premium. NUNCA usar linear o ease generico.

### Duraciones

| Tipo | Valor | Uso |
|------|-------|-----|
| Micro | 150ms | Hover states, toggles |
| Fast | 220ms | Transiciones rapidas |
| Base | 500ms | Reveals, entradas |
| Slow | 700ms | Reveals lentos |
| Hero | 600ms | Animacion principal del hero |

**Regla**: Las animaciones deben ser rapidas. Lento = barato. Si algo se siente sluggish, es un bug.

### Reveals y Staggers

| Patron | Config |
|--------|--------|
| Fade-up standard | y: +28px, opacity: 0 → 1, scale: 0.96 → 1 |
| Stagger base | 0.1s entre items |
| Stagger rapido | 0.06s entre items |
| Viewport trigger | once: true, amount: 0.12 |

### Reglas de Movimiento

- TODA animacion debe tener proposito: revelar, guiar el ojo, confirmar accion
- NUNCA animaciones decorativas continuas (blobs flotando, particulas aleatorias)
- NUNCA loops que causen nausea o fatiga visual
- SIEMPRE respetar `prefers-reduced-motion` — todas las animaciones se desactivan
- El fondo debe ser CALMO — mesh gradient estatico, no blobs animados
- Las particulas flotantes estan PROHIBIDAS en Luno Growth

**Fuente**: Feedback directo — "las pelotas me dan nausea", "hace mucho ruido, no es enganchante"

---

## 3. COPY Y NARRATIVA

### Tono

| Atributo | Correcto | Incorrecto |
|----------|----------|------------|
| Directo | "Se ve pro, convence mas" | "Solucion de vanguardia innovadora" |
| Honesto | "No se puede prometer ventas" | "Garantizamos resultados" |
| Especifico | "48–72h despues de recibir contenido" | "Entrega rapida" |
| Mexicano | "Rapida en celular" | "Optimizado para dispositivo movil" |
| Sin hype | "Copy claro y directo" | "Copy estrategico de alto impacto" |

### Reglas de Copy

1. **Espanol de Mexico** — no es negociable. "Celular" no "movil". "Cotizar" no "solicitar presupuesto". "Llenar brief" no "cumplimentar formulario".
2. **Cada palabra justifica su espacio** — si puedes decir lo mismo con menos palabras, hazlo.
3. **Numeros siempre especificos** — "48–72h", "24h", "15 min", "$7,900 MXN". Nunca "rapido", "pronto", "competitivo".
4. **Transparencia de costos** — si algo se cobra aparte, se dice ("Dominio y correo quedan a tu nombre").
5. **Sin jerga sin explicar** — si usas un termino tecnico, acompanalo de por que le importa al cliente.
6. **WhatsApp como endpoint** — toda ruta de conversion termina en WhatsApp o brief→WhatsApp.
7. **Maximo 2-3 oraciones por bloque** — secciones densas ahuyentan.
8. **Titulos con acento gradient** — la palabra clave del titulo usa `brand-gradient-text`.

### Estructura de Copy por Seccion

| Seccion | Patron |
|---------|--------|
| Hero | Problema implicito → Solucion clara → CTA doble (primario + secundario) → Microcopy de confianza |
| Features | Titulo accion ("Lo que hacemos para que te compren") → 6 tiles max con titulo + 1 linea |
| Pricing | Nombre del tier → Precio grande → Monthly alternativo → Tagline 1 linea → 5 features max |
| Process | 3 pasos max → Cada uno con tiempo especifico → Icono + titulo + descripcion corta |
| FAQ | Pregunta directa → Respuesta honesta con tradeoffs reales → NUNCA glossear limitaciones |
| CTA final | Titulo emocional con palabra gradient → Subtitle de accion → Botones → Microcopy de confianza |

### Patrones de Copy Aprobados (ejemplos canonicos)

**Hero**: "Interfaces de alto **impacto** que convierten en **clientes.**"
**Subtitle**: "Diseno, desarrollo y lanzamiento en 48–72h. Ruta directa a cotizar por WhatsApp."
**Microcopy**: "Respuesta en menos de 24h."
**Taglines de tier**:
- Express: "Listo para vender y recibir WhatsApp sin friccion."
- Pro: "Se ve pro, convence mas y guia a la accion."
- Enterprise: "Mas estructura y flujos para cerrar y medir."
**FAQ honesta**: "No se puede prometer ventas. Lo que si garantizamos es entrega funcional."

---

## 4. COMPONENTES Y PATRONES

### Cards

| Tier | Border | Shadow | Escala | Badge |
|------|--------|--------|--------|-------|
| Silver (Express) | `rgba(0,0,0,0.04)` | shadow-md | 1x | Ninguno |
| Gold (Pro) | `rgba(168,85,247,0.20)` 1.5px | shadow-glow-strong + 3 capas | 1.03x desktop | "Recomendado" gradient pill |
| Onyx (Enterprise) | `rgba(6,182,212,0.18)` | shadow-lg + cyan glow | 1x | "Premium" dark pill |

### Botones

| Tipo | Estilo |
|------|--------|
| Primary CTA | Gradient purple→cyan, rounded-xl, shadow con glow, hover: brightness+shadow |
| Secondary | Border zinc-200, bg-white, hover: border-zinc-300 + shadow |
| Ghost | Solo texto, sin borde, hover: color change |

**Regla**: NUNCA botones flat sin depth. SIEMPRE algun nivel de shadow o border.

### Inputs

- Background: `rgba(255,255,255,0.90)`
- Border: `1px solid rgba(0,0,0,0.06)`
- Focus: purple ring (`rgba(168,85,247,0.06)` 3px) + purple border
- Radius: 14px
- Chips activos: `bg-purple-100 text-purple-700 border-purple-200`

### Icons

- Libreria: Lucide React
- Tamano: 14–20px dependiendo del contexto
- Color: purple-500 para accent, zinc-400/500 para neutral
- NUNCA icon-only sin label en acciones criticas

---

## 5. CRITERIOS DE APROBACION

### Output "Aceptable" (minimo para entregar)

- [ ] Funciona en mobile y desktop
- [ ] WhatsApp/CTAs conectados y probados
- [ ] Copy sin errores de ortografia
- [ ] Diseno coherente con palette Luno (light theme, purple/cyan)
- [ ] Carga < 3s
- [ ] Sin errores de consola
- [ ] Reduced motion funciona

### Output "Excelente" (lo que busca Angel)

- [ ] Todo lo de "aceptable" +
- [ ] Glassmorphism bien ejecutado (blur visible, transparencia elegante)
- [ ] Animaciones con proposito claro (no decorativas)
- [ ] Portfolio/evidencia con prueba real (screenshots, URLs live)
- [ ] Copy que vende sin vender — directo, honesto, sin hype
- [ ] Performance budget respetado (60fps en laptop)
- [ ] Cada pixel justificado — no hay elementos "porque si"
- [ ] Se siente premium y calmo al mismo tiempo

---

## 6. CRITERIOS DE RECHAZO

Lo siguiente SIEMPRE sera rechazado:

### Visual
- Fondos oscuros en paginas de Luno
- Animaciones continuas tipo blobs flotando o particulas aleatorias
- Sombras duras o muy oscuras
- Colores fuera de la palette sin aprobacion
- Assets placeholder o genericos (tipo Kenney Kit)
- Estetica toy-like, childish o de prototipo
- Estetica "casino" o "dashboard generico"
- Cards/tiles invisibles o sin contraste suficiente
- Imagenes rotas o 404 en produccion
- Fondo tipo "pizarron" (plano sin textura ni profundidad)

### Copy
- Ingles en UI de usuario final (excepto terminos tecnicos universales)
- Marketing speak generico ("cutting-edge", "revolutionary", "best-in-class")
- Promesas no cumplibles ("ventas garantizadas", "viral")
- Copy mas largo de 3 oraciones por bloque sin razon
- Jerga sin explicacion
- Espanol generico (debe ser Mexico: "celular", "cotizar", "WhatsApp")

### Performance
- Carga > 5s en mobile
- < 30fps en animaciones
- Layout roto en mobile
- Consola con errores
- Accesibilidad rota (falta reduced-motion, falta focus visible)

---

## 7. COSAS QUE NUNCA DEBEN ROMPERSE

1. Light theme `#fafafa` como fondo base
2. Purple `#a855f7` como color primario
3. Glassmorphism en cards (nunca solid opaque)
4. WhatsApp como canal principal de conversion
5. Espanol de Mexico en toda interfaz de usuario
6. Easing `[0.22, 1, 0.36, 1]` como curva principal
7. Reduced-motion compliance
8. Transparencia en precios (siempre mostrar que se incluye y que no)
9. Portfolio con evidencia real (screenshots, URLs live, nunca mockups genericos)
10. Copy directo, honesto, sin hype

---

## 8. COSAS QUE REQUIEREN APROBACION DE ANGEL

Las siguientes decisiones NO pueden tomarse por sistema, agente o builder sin aprobacion explicita:

1. **Cambio de precios** — Express/Pro/Enterprise, Addons, Maintenance, WaaS
2. **Nuevo vertical de cliente** — que industria es "buen fit"
3. **Tono de marca para un cliente nuevo** — como hablar del negocio del cliente
4. **Nivel de calidad "suficiente"** — que se siente premium vs generico en un diseno nuevo
5. **Cuanta animacion es "suficiente" vs "ruido"** — equilibrio de movimiento
6. **Narrativa visual por vertical** — nightlife ≠ dental ≠ restaurante ≠ consultorio
7. **Seleccion/rechazo de clientes** — quien entra al pipeline y quien no
8. **Propuestas comerciales** — toda propuesta antes de enviar al cliente
9. **Entregables finales** — todo website/contenido antes de entregar
10. **Copy de hero y CTAs principales** — las palabras que mas impactan conversion

---

## 9. POR VERTICAL — ADAPTACION DE DOCTRINA

### Luno Growth (servicios web dev)
- Light theme, purple/cyan, glassmorphism
- Copy directo, orientado a conversion por WhatsApp
- Portfolio con sitios reales

### Nightlife (clientes de marketing de Angel)
- Puede ser dark si el cliente lo requiere
- Estetica editorial premium (ver FALCONMUSIC como referencia)
- Copy con terminologia del giro (sets, eventos, reservaciones)
- Paleta adaptada al brand del cliente, NO Luno

### Consultorio/Clinica
- Light theme preferido
- Copy claro sin jerga medica innecesaria
- Enfasis en confianza y profesionalismo
- CTA: agendar cita + WhatsApp

### Restaurante
- Puede ser light o dark dependiendo del brand
- Copy orientado a antojo y accion rapida
- CTA: reservar + pedir + WhatsApp

**Regla**: La doctrina de Luno (purple/cyan/light) aplica a Luno Growth solamente.
Los sitios de clientes usan la marca DEL CLIENTE, no la de Luno.
La calidad y estandar de produccion aplican a TODOS.

---

## 10. FUENTES DE EVIDENCIA

| Archivo | Que contiene |
|---------|-------------|
| `luno-growth-web/src/config/brand.ts` | Tokens de color canonicos |
| `luno-growth-web/src/lib/motion.ts` | Tokens de animacion canonicos |
| `luno-growth-web/src/app/globals.css` | Variables CSS del design system |
| `luno-growth-web/src/styles/luno-landing.css` | 14 clases de efectos visuales |
| `luno-platform/artifacts/vhq-visual-reset/02-art-direction-pack.md` | Direccion de arte 3D |
| `luno-platform/artifacts/vhq-visual-reset/01-memo-descarte.md` | Rechazos explicitos |
| `~/.claude/projects/-Users-carlospena/memory/feedback_luno_light_theme.md` | Mandato light theme |
| Feedback directo de sesiones | "pelotas dan nausea", "transparentosa fea", "pizarron" |

---

*Documento congelado. Version 1.0. Fecha: 2026-04-01.*
*Cualquier cambio requiere aprobacion explicita de Angel Eduardo.*
