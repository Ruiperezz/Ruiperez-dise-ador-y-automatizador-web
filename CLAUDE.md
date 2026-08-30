# CLAUDE.md — ruiperezstudio.es

> Estado real del proyecto. Si algo aquí contradice al código, gana el código y se actualiza este archivo.
> El plan de trabajo vivo está en `PLAN.md`. Léelo antes de tocar nada.

## Qué es esto

Web de marca y escaparate comercial de **Álvaro Ruipérez** (Ruipérez Studio), diseñador web freelance en Cartagena, Región de Murcia.

- **URL de producción:** https://ruiperezstudio.es
- **Repositorio:** github.com/Ruiperezz/Ruiperez-dise-ador-y-automatizador-web
- **Despliegue:** Vercel, proyecto `ruiperez-dise-ador-y-automatizador-web`. La rama `main` va directa a producción.
- **Objetivo actual:** dejar la web lista para invertir en Meta Ads y TikTok Ads. Ver `PLAN.md`.

## Stack

HTML + CSS + JavaScript **estático puro**. Sin `package.json`, sin npm, sin bundler, **sin paso de build**. Cada página es un `index.html` con todo el CSS y el JS en línea.

- **No hay frameworks.** Ni React, ni Vue, ni Tailwind.
- **No hay librerías de animación.** GSAP, ScrollTrigger, Lenis y Three.js **se eliminaron el 27/08/2026** (commit `89a9b5f`): pesaban 112 KB en línea y la home pasó de 243 KB a 48 KB. No los reintroduzcas.
- Las animaciones son **CSS + `IntersectionObserver`** en JS nativo: revelado al hacer scroll, marquesina de clientes, contadores, luz que sigue al cursor, barra de progreso.
- Todo el movimiento se desactiva bajo `prefers-reduced-motion`.

## Estructura

21 páginas, una carpeta por URL:

| Grupo | Rutas |
|---|---|
| Home | `/` |
| Servicios (9) | `/web-corporativa/` `/landing-page/` `/tienda-online/` `/automatizacion/` `/chatbot-whatsapp/` `/seo-local/` `/email-marketing/` `/mantenimiento-web/` `/gestion-redes-sociales/` |
| Ciudad (4) | `/diseno-web-cartagena/` `/diseno-web-murcia/` `/automatizacion-procesos-murcia/` `/chatbot-whatsapp-cartagena/` |
| Legales (3) | `/aviso-legal/` `/privacidad/` `/cookies/` |
| Estudio (2) | `/sobre-mi/` · `/casos/` |
| Tráfico de pago (2) | `/lp/hosteleria/` `/lp/comercio-local/` — noindex, sin menú, un solo CTA. **Nunca mandar tráfico de pago a la home.** |

Otros archivos: `sitemap.xml` (19 URLs — las noindex quedan fuera), `robots.txt`, `fonts/` (3 WOFF2), `vercel.json` (CSP, HSTS, X-Frame-Options, cache de `/img/`), `favicon.svg`, `apple-touch-icon.png`, `img/`.

## Precios oficiales

**Estos son los precios buenos.** Son los que están en producción. Todos **sin IVA**; cada precio visible debe llevar «+ 21% IVA» al lado.

**No inventes lo que costó un caso.** Ningún caso de estudio lleva precio: el precio va en el bloque de precio del servicio, que es el oficial.

| Servicio | Precio |
|---|---|
| Landing page | desde 590€ · pago único |
| Web corporativa | desde 890€ · pago único |
| Tienda online | desde 1.990€ · pago único |
| Automatización de procesos | desde 900€ |
| Chatbot IA para WhatsApp | desde 1.200€ + 120€/mes |
| Email marketing | desde 190€/mes |
| SEO local | desde 290€/mes |
| Gestión de redes sociales | desde 350€/mes |
| Mantenimiento web | 90–150€/mes |

Cambios puntuales fuera de contrato: 55€/hora.

## Clientes

Solo estos tres son clientes reales verificables y pueden aparecer como tales:

- **TukTuk Cartagena** — turismo. Web desde cero en 4 idiomas (ES/EN/DE/FR). `tuktukcartagena.com`
- **Floristería Alameda** — Cartagena, 4,9★ con 311 reseñas en Google. Es una **tienda online** con catálogo, carrito y pasarela de pago. No la etiquetes como web corporativa.
- **Casa del Sushi** — Cartagena, restauración

En curso: **Finca Doña Carmen** (aplicación a medida). Se añade a `/casos/` cuando esté publicada, no antes.

**Zenconfort es un proyecto propio, no un cliente.** Nunca debe salir en «negocios que ya confían». En `/casos/` aparece etiquetado «Proyecto propio · No es un cliente», que es la única forma correcta de mostrarlo.

**No insinúes volumen que no existe.** Nada de «algunos de los muchos proyectos». Son cuatro y se enseñan los cuatro: lo que convence es que se pueden abrir y comprobar, no que parezcan muchos.

No uses ningún otro nombre de negocio. Si necesitas un dato, una cifra o un testimonio que no tienes, deja `[PEDIR AL CLIENTE]` y sigue. **Nunca inventes clientes, cifras ni reseñas.**

## Qué caso va en qué página

Un caso repetido en todas partes no es prueba social. Cada página lleva el suyo:

| Página | Caso |
|---|---|
| Home · `/tienda-online/` · `/seo-local/` | Floristería Alameda |
| `/web-corporativa/` | Casa del Sushi |
| `/diseno-web-cartagena/` | TukTuk Cartagena |
| `/casos/` | los cuatro |

Las páginas que aún llevan «Caso tipo · ejemplo ilustrativo» son ficticias a propósito y van etiquetadas como tales. En cuanto haya un caso real de ese servicio, se sustituye.

## Reglas de contenido

- **Primera persona del singular en todo el sitio.** «Diseño», «te respondo yo», «lo gestiono yo». Nada de «nosotros», «gestionamos», «nuestro equipo». El trato directo es el único diferenciador real frente a las agencias, y el plural lo desmiente.
- Toda cifra de resultado va atribuida: «según datos del propio cliente». Marco: Ley 3/1991 de Competencia Desleal, art. 5 — la carga de la prueba es de quien lo anuncia.
- Un mismo dato de resultado aparece **como máximo tres veces** en todo el sitio.
- Prohibido en el copy: `soluciones`, `a medida` sin ejemplo concreto al lado, `profesional`, `calidad`, `tu aliado digital`, `llevamos tu negocio al siguiente nivel`, `equipo multidisciplinar`.
- Cifras absolutas antes que porcentajes: «de 4 a 11 pedidos por semana» convence más que «+175%».

## Reglas técnicas

- Las preguntas y respuestas del `FAQPage` en JSON-LD **deben coincidir literalmente** con el FAQ visible. Si cambias una, cambia la otra en el mismo commit.
- La CSP de `vercel.json` solo permite los dominios de Meta, TikTok y Google Analytics. `font-src` y `style-src` están en `'self'`. Cualquier otro recurso externo **se bloquea sin aviso en consola**.
- **Las tipografías se sirven desde `/fonts/`, no desde Google.** Son tres WOFF2 del subconjunto `latin` (54 KB): Instrument Serif normal e italic, y Karla variable 400–700. Traerlas de Google bloqueaba el renderizado ~1,8s y comunicaba la IP del visitante a Google. Si añades un peso o un idioma, descarga el archivo a `/fonts/` — no vuelvas a enlazar `fonts.googleapis.com`.
- `←`, `→` y `★` no están en ningún subconjunto de Google: usan la fuente del sistema. Es así a propósito.
- El consentimiento y la medición viven en `/js/consent.js`, compartido por las 17 páginas. Ver `docs/medicion.md`. No lo dupliques en línea.
- Imágenes con `width` y `height` reales y **`height:auto` en el CSS de esa página**. Sin `height:auto`, el navegador usa el atributo `height` y deforma la imagen. Pasó en 17 páginas a la vez: si creas una página nueva, comprueba la regla `img{}`.
- Ningún script de terceros se ejecuta antes del consentimiento de cookies.
- **GA4 activo:** `G-D61B7R46V5`, en `RS_CONFIG` de `js/consent.js`. Meta y TikTok siguen con el ID vacío, así que no cargan. Si añades uno, actualiza también la tabla de `/cookies/` en el mismo commit.
- Contraste WCAG AA, foco visible, `alt` en todas las imágenes, objetivos táctiles de 44px o más.
- `--terra` (#B5522F) da 4,47:1 sobre el fondo crema: **no vale para texto pequeño**. Para texto usa `--terra-txt` (#A84A28, 5,12:1). Para rellenos, `--terra`.
- El pie tiene que ser idéntico en las 15 páginas que lo llevan. Si añades una página, añádela al pie de todas.
- Referencia medida el 30/08/2026 con Lighthouse móvil: rendimiento 98, accesibilidad 100, buenas prácticas 100, SEO 100. LCP 1,9s · CLS 0,04.

## Skills de este proyecto

- **`auditoria-web-preads`** (`.claude/skills/`) — propia. Auditoría de web de negocio local antes de invertir en publicidad. Define el orden de trabajo: bloqueantes legales → medición → coherencia de oferta → encaje mensaje/tráfico → copy → estética.
- **`refactoring-ui`** y **`web-typography`** (`.agents/skills/`, de `wondelai/skills`) — jerarquía visual, espaciado, color, tipografía. Sustituyen a `ui-ux-pro-max`, que no existe.
- `web-design-guidelines` y `vercel-optimize` — layout, accesibilidad y rendimiento.

## Cómo trabajar

```bash
python3 -m http.server 8765      # servidor local
git checkout -b fix/fase-N-...   # una rama por fase del PLAN.md
```

- **No despliegues a producción.** Álvaro aprueba cada merge.
- Una rama por fase, commits atómicos, mensajes en español.
- Al final de cada fase: parar, decir qué cambió, qué archivos, qué queda pendiente y qué se necesita de él.

## Histórico

`docs/CLAUDE-antiguo-v6.md` es la versión anterior de este archivo. Describe un stack (GSAP, Lenis, Three.js) y unos precios (950–2.500€) que **ya no son ciertos**. Se conserva solo como referencia histórica.
