# CLAUDE.md — ruiperezstudio.es

> Estado real del proyecto. Si algo aquí contradice al código, gana el código y se actualiza este archivo.
> El plan de trabajo vivo está en `PLAN.md`. Léelo antes de tocar nada.

## Qué es esto

Web de marca y escaparate comercial de **Álvaro Ruipérez** (Ruipérez Studio), diseñador web freelance en Cartagena, Región de Murcia.

- **URL de producción:** https://ruiperezstudio.es
- **Repositorio:** github.com/Ruiperezz/Ruiperez-dise-ador-y-automatizador-web
- **Despliegue:** Vercel, proyecto `ruiperez-dise-ador-y-automatizador-web`. La rama `main` va directa a producción.
- **Objetivo actual:** dejar la web lista para invertir en **Google Ads y Meta Ads** (TikTok no se usa). **Ámbito: sureste de España** (Región de Murcia, Alicante, Almería y **Valencia**, añadida el 23/09/2026 porque Álvaro tiene familia allí y contactos que explotar). La sede sigue en Cartagena. Ver `PLAN.md`.

## Stack

HTML + CSS + JavaScript **estático puro**. Sin `package.json`, sin npm, sin bundler, **sin paso de build**. Cada página es un `index.html` con todo el CSS y el JS en línea.

- **No hay frameworks.** Ni React, ni Vue, ni Tailwind.
- **No hay librerías de animación.** GSAP, ScrollTrigger, Lenis y Three.js **se eliminaron el 27/08/2026** (commit `89a9b5f`): pesaban 112 KB en línea y la home pasó de 243 KB a 48 KB. No los reintroduzcas.
- Las animaciones son **CSS + `IntersectionObserver`** en JS nativo: revelado al hacer scroll, marquesina de clientes, contadores, luz que sigue al cursor, barra de progreso.
- Todo el movimiento se desactiva bajo `prefers-reduced-motion`.

## Estructura

**27 páginas** (08/10/2026), una carpeta por URL:

| Grupo | Rutas |
|---|---|
| Home | `/` |
| Servicios (12) | `/web-corporativa/` `/landing-page/` `/tienda-online/` `/aplicaciones-web/` `/automatizacion/` `/chatbot-whatsapp/` `/seo-local/` `/email-marketing/` `/mantenimiento-web/` `/gestion-redes-sociales/` `/accesibilidad-web/` `/meta-ads/` |
| General (1) | `/diseno-web/` |
| Legales (3) | `/aviso-legal/` `/privacidad/` `/cookies/` |
| Estudio (2) | `/sobre-mi/` · `/casos/` |
| Tráfico de pago (5) | `/lp/hosteleria/` `/lp/comercio-local/` `/lp/automatizacion/` `/lp/chatbot-ia/` `/lp/aplicaciones/` — noindex, sin menú, un solo CTA. **Nunca mandar tráfico de pago a la home.** |
| Error (1) | `404.html` — noindex, con cuatro salidas útiles |
| Conversión (1) | `/presupuesto/` — noindex, sin menú, formulario que termina en WhatsApp |

**Las tres landings nuevas son del 01/10/2026**, para Google Ads. Cubren los servicios
que las dos de web no cubrían. La del chatbot **dice por escrito que no hay caso
publicado todavía**: es el servicio más nuevo e inventarle un caso sería lo que critica
la FAQ de `/meta-ads/`.

Otros archivos: `sitemap.xml` (19 URLs — las noindex quedan fuera), `robots.txt`, `fonts/` (3 WOFF2), `vercel.json` (CSP, HSTS, X-Frame-Options, cache de `/img/`), `favicon.svg`, `apple-touch-icon.png`, `img/`.

## Precios oficiales

**Estos son los precios buenos.** Son los que están en producción. Todos **sin IVA**; cada precio visible debe llevar «+ 21% IVA» al lado.

**No inventes lo que costó un caso.** Ningún caso de estudio lleva precio: el precio va en el bloque de precio del servicio, que es el oficial.

| Servicio | Precio |
|---|---|
| Landing page | desde 590€ · pago único |
| Web esencial (hasta 4 páginas) | desde 690€ · pago único |
| Web corporativa | desde 1.190€ · pago único |
| Tienda online | desde 1.490€ · pago único |
| Aplicación web de gestión | desde 2.900€ · pago único + 90€/mes |
| Automatización esencial | desde 390€ |
| Automatización de procesos | desde 990€ |
| Chatbot IA para WhatsApp | desde 1.290€ + 120€/mes |
| Email marketing | desde 290€/mes |
| SEO local | desde 390€/mes |
| Gestión de redes sociales | desde 450€/mes · **8 publicaciones, 2 en vídeo, 1 red** |
| Auditoría de accesibilidad | desde 590€ · con correcciones 1.190€ · monitorización 95€/mes |
| **Mantenimiento web** | **39 / 69 / 99€/mes · alojamiento incluido** |
| **Gestión de Meta Ads** | **240€/mes** hasta 1.000€/mes de inversión · por encima, 15% de la inversión |
| **Tarjeta NFC de reseñas** | **27€** la unidad · 2 por 50€ · 4 por 100€ · instalada por Álvaro |

**Bajada del 30/09/2026, la última.** Álvaro la pidió con un objetivo explícito:
**captar y cerrar clientes pequeños cuanto antes para ganar experiencia**, porque
hoy solo ingresa 100€/mes de mantenimiento y el resto sale de sus ahorros. Se
comparó contra **freelances del sureste que publican precio**, no contra agencias:
Ferrís (landing 300€, web 550-800€, tienda 800-950€), TomyFlow (350€), Fran López
(599€), Pablo Alcaraz (900€ / 1.190€ / «a medida desde 2.900€»), Blanco (800€ /
1.200-1.500€), González (tienda 1.400€). La tabla queda **por debajo de agencia en
todo y dentro de la banda junior de 18-30€/hora**: 590€/20h = 29,5€/h · 690€/25h =
27,6€/h · 1.190€/40h = 29,8€/h · 1.490€/55h = 27,1€/h. **Bajar más lo saca de esa
banda**: sería trabajar por debajo de lo que vale su hora, no ser competitivo.

**Los dos mensuales de coste NO bajan** (90€/mes de la aplicación, 120€/mes del
chatbot) ni los cuatro servicios mensuales (SEO 390, redes 450, email 290, Meta Ads
240): lo que se bajó es el pago único, que es lo que frena la primera venta.

**Mantenimiento en tres niveles (30/09/2026).** Antes eran 95-190€/mes con diez
cambios; el mercado cobra 15-50€/mes con media hora. **Daba más que nadie y por eso
parecía caro.** Ahora:

| Plan | €/mes | Cambios incluidos |
|---|---|---|
| Básico | 39 | ninguno · a 60€/hora |
| Estándar | 69 | 4 al mes |
| Completo | 99 | 10 al mes |

**El alojamiento va incluido en los tres.** El dominio no: se gestiona sin recargo
o se pone a nombre del cliente, que es lo que recomienda la FAQ y lo que ya decía
`js/asistente.js`.

⚠️ **Si la web lleva automatización, el plan mínimo es el Estándar.** Decisión de
Álvaro: una automatización vive en una base de datos (Supabase) que cuesta dinero
todos los meses. **Un Básico de 39€ con automatización pierde dinero.** Está escrito
en la página, en la FAQ, en el JSON-LD y en `api/servicios.json`.

**Los tres clientes actuales siguen a 100€/mes**, que es lo que hoy es el Completo.
Los tres niveles son para clientes nuevos.

**Packs recalculados al 16% (30/09/2026):**

| Pack | Lleva | Suelto | Pack |
|---|---|---|---|
| **Arranca** | Web esencial + automatización esencial + 1 tarjeta NFC | 1.107€ | **910€** |
| **Capta** | Landing page + 3 meses de Meta Ads | 1.310€ | **1.100€** |
| **Vende online** | Tienda online + automatización | 2.480€ | **2.080€** |
| **Atiende solo** | Web corporativa + automatización + chatbot IA | 3.470€ | **2.910€** |

`scripts/verifica-api.py` comprueba que el «suelto» cuadra con la suma real.

Cambios puntuales fuera de contrato: 60€/hora.

**Plazos de entrega (30/09/2026):**

| Servicio | Plazo |
|---|---|
| Landing page · web esencial · web corporativa · tienda online | **1-2 semanas** |
| **Aplicación web de gestión** | **2-3 semanas** — lleva base de datos y usuarios |

**Ampliados el 30/09/2026 a petición de Álvaro:** «no me da tiempo si no». Es el cambio
correcto — **un plazo que se incumple hace más daño que uno más largo que se cumple**, y
aun con la horquilla sigue muy por debajo de Corbax (6-10 semanas), Ovalles (4-6) y
Alicante Developers (3-5).

Antes iban de 5-7 días una landing a 4-8 semanas una aplicación. Se bajaron a una
semana el 25/09 y la aplicación subió a dos el 28/09, a petición de Álvaro.

**Se escribe siempre «desde que me pasas el contenido»**, nunca «desde que firmamos».
El plazo solo corre cuando el cliente ha entregado, y eso es lo único que evita la
discusión de quién retrasó qué.

**Sobre las 50-70 horas de la tienda de Alameda:** esa cifra NO es la referencia de
lo que tarda una tienda. Álvaro explicó el 28/09/2026 que fue **su primera web y su
primera tienda online a la vez**, así que lleva dentro toda la curva de aprendizaje.
Tomarla como ritmo normal era un error mío. **No la uses para estimar plazos.**

**Packs: son cuatro** (desde el 30/09/2026), en `#packs` de la home y enlazados desde el
bloque de precio de las páginas implicadas. La tabla vigente es la de arriba; **no hay
otra**. La regla de «tres, no más» sigue valiendo por su motivo —con demasiados el cliente
no elige—, pero cuatro funcionan porque la escalera 910 / 1.100 / 2.080 / 2.910 es clara y
cada uno resuelve algo distinto. **No añadas un quinto.**

⚠️ **Arranca existe porque Álvaro pidió un pack de 1.099€ y ese número no cuadraba.**
Web esencial 790€ + automatización completa 1.200€ son 1.990€: a 1.099€ el descuento
habría sido del 45% y **el pack habría costado menos que la automatización sola**, lo que
revienta su precio. La solución fue crear **Automatización esencial a 490€** —solo el
correo de confirmación y el aviso al móvil— y armar el pack sobre ella: 1.280€ sueltos,
910€ en pack tras la bajada del 30/09. **Si tocas alguno de esos dos precios, recalcula el pack.**
**La escalera 910 / 1.100 / 2.080 / 2.910 es la respuesta a «¿pymes o negocios pequeños?»:**
el pack de entrada abre puerta al pequeño y el de arriba a la mediana, sin tener que
mover la tabla de precios por cuarta vez. Si cambias un precio de la tabla, recalcula
las tres columnas: el «suelto» tiene que cuadrar con la suma real o el descuento es mentira.

**Cambios del 30/09/2026, decididos por Álvaro tras estudiar 17 competidores del sureste
con precio publicado:**

- **Tienda online 2.490€ → 1.900€.** La investigación le dio la razón: para un negocio
  pequeño era 2,5-4× las tiendas locales de 650-995€. A 1.900€ queda **entre las de
  plantilla y las de agencia** (2.500-2.900€), que es una posición defendible.
  ⚠️ **Es el cuarto movimiento de precios en ocho días y el único que BAJA algo ya
  publicado.** Queda dicho; fue decisión suya con los datos delante.
- **Web esencial, 790€, escalón NUEVO** en `/web-corporativa/#esencial`. **Hasta 4
  páginas.** No baja la corporativa: es la respuesta del mercado —**ninguno de los 17
  competidores tiene un solo producto de web; todos tienen de 3 a 6 niveles, y ninguno
  baja el precio del que ya tiene**. Los textos los escribe Álvaro, igual que en la
  corporativa: la diferencia es el tamaño, no el alcance.
  **Pendiente: el precio del sistema de reservas opcional.** Hoy dice «presupuestado
  aparte» porque él no dio cifra. **No te la inventes.**
- **El pack Vende online se recalculó:** suelto 3.100€ (1.900 + 1.200), pack **2.590€**,
  ahorro 510€, descuento del 16%. Los tres packs siguen en la banda 16-18%.

**Lo que la investigación del 30/09 dejó claro y no hay que olvidar:**
- Una web de 500-800€ del sureste **no incluye textos redactados, ni diseño propio, ni
  hosting a partir del año 2** (70-300€/año). Corbax cobra el diseño propio aparte:
  +400-1.200€. **La web de 1.490€ no compite con una de 600€, compite con 600€ + 400€ de
  diseño + 300€ de textos.**
- **Su plazo de 1 semana machaca a casi todos:** Corbax 6-10 semanas, Ovalles 4-6,
  Alicante Developers 3-5. Solo Dvesign (3 días) y Tu Estudio Web (5 días) igualan.
  **Ese argumento está infrautilizado.**
- **Ni un solo proveedor local publica precio de chatbot ni de automatización.** En webs
  «publico mis precios» ya no distingue, pero **ahí sigue siendo territorio vacío**.

**Meta Ads, servicio nuevo del 25/09/2026.** El mercado español cobra el 15–20% de la
inversión con un mínimo de 300–500€/mes, y un freelance especializado entre 400 y
1.200€/mes. Se entra a 240€/mes, por debajo del suelo.

⚠️ **Álvaro está aprendiendo Meta Ads mientras lo vende.** Aquí el dinero del cliente se
quema directo, no como en una web que solo queda sosa. **El tope de 1.000€ de inversión
no es solo comercial: limita el daño mientras coge oficio.** No lo subas hasta que haya
campañas con resultados. Los límites (3 campañas, 6 anuncios, revisión semanal) van
escritos en la página y en el JSON-LD: es la lección de la gestión de redes, que se
comió el margen justo por no tenerlos. La FAQ dice abiertamente que este servicio es
más nuevo que los demás y que no hay casos publicados. **No le inventes un caso real.**

**Gestión de redes, acotada el 23/09/2026.** Prometía 12 publicaciones, historias semanales **y contestar comentarios y mensajes**: unas 17–22 h/mes a 450€, o sea 13–17€/hora, y encima de guardia. Ahora son **8 publicaciones (2 en vídeo), 2 historias, 1 red social** y **no se contestan mensajes** — en su lugar se entrega un guion de respuestas, que es trabajo de una vez y no una correa. **Lo que hacía inviable el servicio no era el volumen, era la mensajería:** las publicaciones se hacen del tirón un día, los mensajes interrumpen todos los días. Si alguien vuelve a meter «contesto los mensajes» en el copy, el servicio vuelve a perder dinero.

**Subida del 25/09/2026, y por qué el vaivén.** El 23 bajaron un 16–35% para captar volumen entre micronegocios. El 24 Álvaro decidió enfocarse en **medianas**, que es donde está el dinero, así que suben. **Bajar precio y querer medianas tiran en direcciones contrarias: el precio posiciona.** Referencia de mercado: web corporativa con agencia 1.500–5.500€, desarrollo a medida acotado 5.000–15.000€, tienda online a medida más de 8.000€, freelance desde 800€. La tabla de arriba queda por debajo de agencia en todo y por encima del suelo freelance, que es donde tiene que estar quien vende a medianas.

**Los dos mensuales NO subieron:** los 90€/mes de la aplicación y los 120€/mes del chatbot. Son coste (base de datos, alojamiento, llamadas a la API), no margen.

⚠️ **Pendiente:** la publicación de Google Business del 23/09 dice «acabo de bajarlos» y lista los precios viejos. **Hay que reescribirla.** Windsor estaba caído el 24 y no se pudo.


⚠️ **Lección del 30/09/2026, sobre cómo NO hacer una bajada de precios.** Se migró
con un script de reemplazos en cadena y dos reglas se pisaron entre sí:

1. `"1200"` tenía que ser el `price` del JSON-LD, pero también pilló
   `og:image:width content="1200"` **en las 21 páginas**, que es la miniatura al
   compartir en WhatsApp y Facebook.
2. La regla `490€ → 390€` corrió **antes** que `3.490€ → 2.910€`, así que el pack
   Atiende solo salió **3.390€**, un precio que no existe.

Las dos se pillaron, la segunda gracias a `scripts/verifica-api.py`. **Si vuelves a
tocar la tabla de precios: usa tokens intermedios (`@@x@@`) para que un reemplazo no
pise el resultado de otro, ordena las reglas de más específica a más general, y
ejecuta `verifica-api.py` antes de commitear.** Un precio mal puesto en una página
es peor que no haberla tocado.

⚠️ **El JSON-LD de la home llevaba semanas desfasado** y nadie lo vio, porque no se
ve en la web: decía tienda 1.990€, automatización 900€, SEO 290€, email 190€, redes
350€ y mantenimiento 90€. **Ninguno era un precio real de ninguna tabla.** Google
enseñaba eso en los resultados enriquecidos. Corregido y ahora comprobado.


## Estado del 04/10/2026

**Reseñas: 11, todas de cinco estrellas → 5,0★.** `deku 311` cambió su valoración de 1 a
5 el 01/10 (era un cliente que se equivocó, confirmado por Álvaro). **Compruébalo en vivo
antes de escribirlo en ninguna página**, que en una semana ha sido 5,0 → 4,6 → 5,0.

**Redes sociales (04/10/2026).** Botones de Instagram y Facebook en el pie de las 16
páginas, con el logo real, 44×44 y `aria-label`.
- Instagram: `https://www.instagram.com/ruiperez.studio/`
- Facebook: `https://www.facebook.com/profile.php?id=1378239218703135`

⚠️ **El enlace de Facebook que pasó Álvaro era una URL de BÚSQUEDA**
(`facebook.com/search/top/?q=RuiperezStudio`), que lleva a resultados y no a su página.
Se usa la canónica por ID, que sale de su propio conector `facebook_organic`. **Si algún
día pone un nombre de usuario propio, se cambia por él.**

⚠️ **El `sameAs` del JSON-LD declaraba `instagram.com/RuiperezStudio`, que no es su
cuenta.** Un `sameAs` apuntando a un perfil ajeno le dice a Google que la entidad es
otra. Corregido.

**Titles con ciudad (01/10/2026).** Decían «Sureste de España», que no lo busca nadie,
mientras Search Console enseñaba **413 impresiones de consultas con ciudad**. Once
reescritos a servicio + ciudad + precio, todos bajo 60 caracteres. Ver
`docs/seo-organico.md`, que tiene la línea base para medir si funcionó.

**El pie nombra las seis ciudades** (Cartagena, Murcia, Alicante, Elche, Almería y
Valencia) y lidera con automatización. Es el sitio convencional para la zona de servicio
y así las seis están en las 16 páginas sin apilar palabras clave en el copy.

**Botón de volver arriba** en las 19 páginas con menú, abajo a la **izquierda**: la
derecha la ocupan el asistente y WhatsApp, y en móvil además la barra fija `.mcta`.
Fuera de las landings de pago, que son de un solo CTA.

**Métricas medidas en producción el 04/10/2026** con el navegador, sin estrangular la red:

| Página | LCP | CLS | Peticiones | Peso |
|---|--:|--:|--:|--:|
| `/` móvil | 152 ms | **0** | 16 | 398 KB |
| `/` escritorio | 256 ms | **0** | 16 | 398 KB |
| `/lp/automatizacion/` móvil | 548 ms | **0** | 16 | 376 KB |
| `/diseno-web/` móvil | 288 ms | **0** | 15 | 358 KB |

⚠️ **No son puntuaciones de Lighthouse**: van sin estrangulado de red, así que no se
comparan con los 100/100 del 29/09. Lo que sí es comparable es el **CLS 0**, que no
depende de la red. Lighthouse 13.5 **ya no arranca con Node 26** en este entorno.

**Auditoría cruzada hecha el 04/10/2026, sin contradicciones:** los 14 servicios y los 4
packs dicen **el mismo precio en la web, en `api/servicios.json`, en `llms.txt`, en
`js/asistente.js` y en los 18 servicios de la ficha de Google**. Comprobado con script,
no a ojo.

**La descripción de la ficha de Google lidera ahora con automatización**, igual que el
sitio. ⚠️ **La categoría principal sigue siendo `gcid:website_designer` y NO se toca**:
es la que le trae «diseño web cartagena», su consulta de más volumen (194 impresiones),
y cambiarla puede disparar la re-verificación de Google.


## Conectores, estado real del 04/10/2026

| Conector | Estado | Dato |
|---|---|---|
| `google_my_business` | ✅ lectura y escritura | ficha verificada |
| `searchconsole` | ✅ solo lectura | — |
| `facebook` (Meta Ads) | ✅ | cuenta activa, **0€ gastados, ninguna campaña** |
| `facebook_organic` | ✅ | **0 seguidores, 0 alcance** |
| `facebook_leads` | ✅ nuevo | — |
| **`instagram`** | ✅ | `ruiperez.studio` · **6 publicaciones desde el 04/10/2026** (carrito, reserva, precios, antes/después, automatización, reseñas) |
| **`googleanalytics4`** | ✅ **nuevo** | propiedad `552072025` · **`generate_lead` disparando** |
| `klaviyo` | ✅ nuevo | — |
| **Google Ads** | ❌ **no hay conector en Windsor** | no se puede comprobar desde aquí |

✅ **Instagram ya tiene seis publicaciones** (04/10/2026), compuestas en HTML con las
fuentes y colores del sitio y capturadas a 1080×1350. Las imágenes están en `/img/ig/`.
El conector publica (`create_image_post`, `create_carousel_post`, `create_story`,
`create_video_post`) pero **NO edita ni borra publicaciones**: una errata se corrige en la
app. **Hay una pendiente:** la del carrito dice «Floistería» en vez de «Floristería».

⚠️ **Windsor pausó las LECTURAS el 08/10/2026**: 12 cuentas conectadas y el plan gratuito
incluye 1. Mientras dure, los datos que devuelve (por ejemplo «0 publicaciones») **NO son
reales**: la respuesta lo dice literalmente («These are not your real numbers»). No
tomes decisiones con ellos. Necesita plan de pago o desconectar cuentas (todo lo de
Zenconfort y Klaviyo). No se sabe si las escrituras también están bloqueadas.

✅ **GA4 recibe datos y `generate_lead` dispara en cada clic a WhatsApp.** Eso abre el
camino limpio para Google Ads: **vincular Google Ads con GA4 e importar `generate_lead`
como conversión**, sin etiqueta nueva, sin tocar la CSP y sin declarar cookies nuevas.
Ojo al leerlo: buena parte de esos eventos de finales de septiembre son pruebas hechas
durante la verificación, no visitas reales.

## Tienda online: promesa partida en dos (04/10/2026)

**«Cobrando en 3 días» aprobado por Álvaro**, pero NO a secas. El plazo oficial son 1-2
semanas, subido el 30/09 porque no le daba tiempo. Prometer 3 días sin más se
contradiría con la propia página, la API y la ficha.

| Hito | Qué hay |
|---|---|
| **72 horas** | Catálogo publicado, carrito, cobro con tarjeta y correos de confirmación. Ya se puede vender |
| **1-2 semanas** | Diseño acabado, SEO local, fichas trabajadas, páginas legales, pasarela a su nombre |

⚠️ **Las 72 horas cuentan desde que el cliente entrega fotos, precios y textos.** Está
escrito en la página. Es lo único que evita la discusión de quién retrasó qué.

## Favicon (04/10/2026)

**El anterior era del diseño de antes del 27/08:** fondo `#0e0e1e` y borde verde lima
`rgba(163,230,53,.22)`, **dos colores que no están en ninguna parte del sitio actual**, y
una R con trazo de 21,7 que a 16px —el tamaño al que Google lo enseña— se emborronaba.

Ahora: tinta `#211D18` y crema `#F7F2E9`, R a un solo trazo. Comprobado a 16, 32, 64 y
120px. **El `apple-touch-icon.png` se genera RENDERIZANDO el SVG**, no redibujándolo:
hacerlo con primitivas de PIL dejaba una muesca donde el arco se unía al trazo.


## Decisiones y hechos del 08/10/2026

**`titusbarberfx` es el dueño de Floristería Buccaro (Alicante).** Le hizo una demo, le gustó
mucho y dejó la reseña de cinco estrellas, pero **no cerraron por problemas económicos suyos**;
quizá cierren cuando le vaya mejor. Su reseña es real y se enseña literal, **pero NO es un
cliente de pago**, así que la etiqueta dice «Dueño de un negocio en Alicante · reseña tras
una demo». ⚠️ **La reseña dice «me entregó todo en el plazo en el que cerramos» y «automatizó
varias tareas»**: describe un encargo cerrado que no existió. No la cites como caso de
cliente, ni titules nada con «un cliente al que automaticé». Se corrigió en la home y en
`/lp/automatizacion/`. También: la publicación de Instagram de las reseñas dice «Once clientes
han dejado reseña» y no es del todo exacto (no se puede editar desde el conector).

**El socio de las redes ya no existe.** `/sobre-mi/` decía que las llevaba «otra persona
especializada»: ahora dice que las lleva Álvaro. Los anuncios, orgánicos y de pago, se harán
con **Higgsfield** cuando lo pague (aún no); no hay conector de Higgsfield.

**Windsor.ai, descartado por Álvaro** (cuesta demasiado para lo que es). Quiere conectar todo
a un **panel de administración propio**. Mientras tanto Windsor sigue con las lecturas
pausadas (plan gratuito: 1 cuenta, hay 12), pero **las escrituras SÍ funcionan** (se cambió el
horario y los 20 servicios de la ficha el 08/10). Sin lecturas, **Claude no puede leer métricas
de nadie**: hasta que exista el panel, los datos salen a mano de Meta, Google Ads, GA4 y Search
Console.

**Horario nuevo (08/10/2026):** lunes a viernes 8:00-14:00 y 16:00-21:00, sábado 8:00-14:00.
Aplicado en la ficha de Google y en el JSON-LD de la home. WhatsApp Business: ver
`docs/guion-whatsapp.md`. El «mismo día» de las páginas sigue siendo cierto.

**Tarjeta NFC de reseñas, publicada (08/10/2026):** `/tarjeta-nfc-resenas/`. **27€ + IVA la
unidad, 2 por 50€ (ahorras 4€), 4 por 100€ (ahorras 8€).** La entrega en mano y **la instala
Álvaro en el negocio, funcionando**. Va con QR de respaldo y la página dice que el NFC no
funciona en todos los móviles y que Google prohíbe regalar algo a cambio de reseñas. **Una
tarjeta va incluida en el pack Arranca** (910€, suelto 1.107€, ahorro 197€ = 18%). **Álvaro
no ha dicho cuánto le cuesta cada una**, así que no se sabe el margen. La API tiene las tres
cantidades en `precio.opciones`.

**Todos los botones de WhatsApp llevan primero a un formulario (08/10/2026).** Álvaro quiere
tener toda la información del cliente antes de la conversación. Cada botón de contacto va a
`/presupuesto/?s=<servicio>&p=<página>`; la página es `noindex`, sin menú, y al final abre
WhatsApp con el mensaje ya escrito (nombre, negocio, tipo, qué necesita, si tiene web, para
cuándo y descripción). **No se guarda nada en la web.** Llegan directos, a propósito: el pie
(contacto), el teléfono, el correo, el botón flotante y el asistente (dudas rápidas), y el 404.
⚠️ **Contramedida de medición:** el evento `Contact` ya no sale al pulsar el botón, sale al
**enviar el formulario**, porque el envío pulsa un `<a href="wa.me…text=">` real que
`consent.js` caza. Con `location.href` el lead no se mediría. **Un paso más baja la tasa de
conversión de los anuncios**: Álvaro lo decidió sabiéndolo. Si el coste por contacto sube
mucho, es lo primero que mirar.

## Clientes

**Seis proyectos, y no todos son clientes.** La distinción importa y está reflejada en las etiquetas del sitio:

| Proyecto | Estado | Enlace |
|---|---|---|
| TukTuk Cartagena | **Cliente** | `tuktukcartagena.com` |
| Floristería Alameda | **Cliente** | `floristeriaalameda.com` |
| Casa del Sushi | Entregado, el cliente no siguió | `casa-del-sushi.vercel.app` |
| Belu Francia (fisioterapia) | Entregado, la clienta no siguió | `belu-francia-fisioterapeuta.vercel.app` |
| Floristería Buccaro (Alicante) | Entregado, pendiente de cerrar | sin dominio público |
| Zenconfort | Proyecto propio | `zenconfort.es` |
| Finca Doña Carmen | En curso | no publicado |

**Nunca digas «+10 proyectos» ni ninguna cifra inflada.** Son seis completados y se enseñan los seis. La banda de la home usa cifras que se pueden contar una a una: 6 proyectos, 4 sistemas de reserva o pago, 3 paneles. Eso es verificable; un número redondo inventado se cae en cuanto alguien entra en `/casos/` y cuenta.

**Mantenimiento mensual (100€ cada uno, hasta 10 cambios al mes):** Floristería Alameda, TukTuk Cartagena y Finca Doña Carmen.

Los clientes verificables como tales:

- **TukTuk Cartagena** — turismo. `tuktukcartagena.com`. Web desde cero en 4 idiomas (ES/EN/DE/FR), **sistema de reservas** (servicio, personas, número de tuk tuks y cobro), **correos automáticos** de confirmación al cliente y al empresario, y un **panel de administración** donde el dueño bloquea días, horas o parte de la flota (avería, festivo) y eso desaparece al instante de la web. Ese panel es el caso real de `/aplicaciones-web/`. **Es privado: no hay captura y no se puede enseñar.**
- **Floristería Alameda** — Cartagena, **4,9★ con 333 reseñas** (verificado en floristeriaalameda.com). Es una **tienda online** con catálogo, carrito y pasarela de pago. No la etiquetes como web corporativa.
- **Casa del Sushi** — Cartagena, restauración. **Demo entregada que nunca se pagó; el cliente no siguió.** NO es un cliente, pero **es trabajo real hecho por Álvaro**: el formulario de reservas está automatizado y conectado al **Google Calendar de la empresa**. En la web se etiqueta «Proyecto entregado · demo para el cliente». `casa-del-sushi.vercel.app`. Carta, info del local, ubicación y reseñas, **reserva de mesa con correo de confirmación automático** y un **panel de administración** donde el dueño ve sus reservas. **Álvaro dice que el trabajo no está cerrado del todo** (22/09/2026): sigue etiquetado como caso real porque la web está publicada y se puede abrir, pero confirma con él antes de llamarle «cliente» en copy nuevo. **Álvaro confirmó el 21/09/2026 que Perico Del Rey NO es Casa del Sushi.** Casa del Sushi es cliente y tiene su caso en `/web-corporativa/` y `/casos/`, pero **no ha dejado reseña en Google**: no le atribuyas ninguna.

**Ficha de Google propia: `locations/10546771556631248285`.** **11 reseñas y 5,0★, las once de cinco estrellas** (leído en vivo el 04/10/2026; en una semana fue 5,0 → 4,6 → 5,0). **Compruébalo en vivo antes de escribirlo en ninguna página**, no te fíes de esta línea. Enlace público `https://maps.google.com/maps?cid=16135944171140006039`; para pedir reseñas, `https://search.google.com/local/writereview?placeid=ChIJoxdRJpnbFWoRl8BVVLtj7t8`. **El 4,9★ con 333 reseñas es de Alameda, no suyo**: donde aparezca hay que decir de quién es. En el hero van sus 11 reseñas y su 5,0★ reales.

✅ **La reseña de una estrella ya no existe:** era una cuenta falsa que Álvaro denunció, y
`deku 311` acabó poniendo cinco. Las once son de cinco estrellas.

**Floristería Buccaro (Alicante): landing hecha como DEMO, sin pagar.** Álvaro aclaró el
30/09/2026 que Casa del Sushi, Belu Francia y Buccaro **se hicieron como demostración antes
de que pagaran, y ninguno cerró** (dijeron que no lo necesitaban «de momento»). Este archivo
decía que Buccaro era «un encargo real al precio oficial»: era falso. **Nunca los llames
«clientes», ni «encargo», ni «caso real».** Se enseñan como lo que son: trabajo entregado
que se puede abrir. No se les atribuyen resultados porque no los hay.

En curso: **Finca Doña Carmen** — aplicación con panel de administración para la finca y acceso privado para cada pareja (Next.js + Supabase + Vercel). **No está publicada.** Aparece en `/aplicaciones-web/` etiquetada «Proyecto en curso · cliente real», describiendo qué hace y **sin ninguna cifra de resultado**, porque todavía no las hay. Se añade a `/casos/` el día que esté en producción.

**El precio de la aplicación se fijó en 3.900€ el 22/09/2026 y bajó a 2.900€ el 30/09/2026 (+ 90€/mes)** comparando con el mercado español: las agencias parten de 5.000–8.000€ para un desarrollo acotado y los freelance se mueven entre 8.000 y 25.000€. La cuota mensual **no es un extra comercial**: una aplicación tiene base de datos y usuarios vivos 24 h y eso cuesta todos los meses. Si se quita la cuota, el servicio pierde dinero.

**Zenconfort es un proyecto propio, no un cliente.** Nunca debe salir en «negocios que ya confían». En `/casos/` aparece etiquetado «Proyecto propio · No es un cliente», que es la única forma correcta de mostrarlo.

**No insinúes volumen que no existe.** Nada de «algunos de los muchos proyectos». Son cuatro y se enseñan los cuatro: lo que convence es que se pueden abrir y comprobar, no que parezcan muchos.

No uses ningún otro nombre de negocio. Si necesitas un dato, una cifra o un testimonio que no tienes, deja `[PEDIR AL CLIENTE]` y sigue. **Nunca inventes clientes, cifras ni reseñas.**

## Qué caso va en qué página

Un caso repetido en todas partes no es prueba social. Cada página lleva el suyo:

| Página | Caso |
|---|---|
| Home · `/tienda-online/` · `/seo-local/` | Floristería Alameda |
| `/web-corporativa/` | Casa del Sushi **y** TukTuk Cartagena |
| `/diseno-web/` | TukTuk Cartagena **y** Floristería Alameda |
| `/automatizacion/` | TukTuk (reservas) **y** Alameda (correos automáticos) |
| `/aplicaciones-web/` | TukTuk (panel de disponibilidad), Casa del Sushi (panel de reservas) **y** Finca Doña Carmen (en curso) |
| `/email-marketing/` | los tres correos automáticos: Alameda, TukTuk y Casa del Sushi |
| `/landing-page/` | Buccaro (propuesta, no cliente) |
| `/casos/` | los cuatro |

Las páginas que aún llevan «Caso tipo · ejemplo ilustrativo» son ficticias a propósito y van etiquetadas como tales. En cuanto haya un caso real de ese servicio, se sustituye.

## A quién le hablamos

**Microempresas y pequeñas empresas del sureste español** (decidido el 30/09/2026, revocando
la decisión del 24/09 de ir a medianas). La sede sigue en Cartagena.

Álvaro lo dijo con estas palabras: *«hasta tener algo más de experiencia hay que enfocarse
en negocios pequeños; lo que me interesa es cerrar negocios pequeños lo antes posible»*.
Tiene gastos y casi ningún ingreso, y quiere cerrar clientes para ganar experiencia y, más
adelante, dar el salto a agencia.

**Los precios ya están puestos para eso** (590 / 690 / 1.190 / 1.490), y las etiquetas de
los packs dicen microempresa o pequeña empresa. **No pongas «perfecto para medianas»**: un
pack de 2.910€ no lo compra una empresa de 50 personas, y decirlo le dice a la mediana que
eres barato y a la pequeña que no eres para ella.

**Objeción que sigue sin responderse:** «¿qué pasa si te pones malo?». «Trabajo solo» está
prohibido. La respuesta cierta es: el código es tuyo, va documentado y cualquier programador
puede continuarlo.

## Reglas de contenido

- **Primera persona del singular en todo el sitio.** «Diseño», «te respondo yo», «lo gestiono yo». Nada de «nosotros», «gestionamos», «nuestro equipo». El trato directo es el único diferenciador real frente a las agencias, y el plural lo desmiente.
- **«Trabajo solo» está prohibido desde el 25/09/2026.** Tranquiliza a un comercio y asusta a una empresa de veinte personas, que es el público nuevo. **Pero NO se sustituye por empleados inventados:** se dice lo que es cierto —«hablas directamente con quien programa, sin comerciales ni juniors»— y se responde la objeción de fondo en `/sobre-mi/`: el código es tuyo, va documentado y cualquier programador puede continuarlo. Esa respuesta vale más que una plantilla ficticia que se cae en la primera reunión.
- **Las redes las lleva otra persona** (un socio de Álvaro, especializado en contenido). Está dicho en `/sobre-mi/` sin nombre ni cifras. **Pendiente de Álvaro: su nombre y si se pueden citar sus cuentas.** Ojo: si esas cuentas son suyas y no de clientes, hay que decirlo así — «ha hecho crecer sus propias cuentas», no «gestionamos cuentas de 300.000 seguidores».
- Toda cifra de resultado va atribuida: «según datos del propio cliente». Marco: Ley 3/1991 de Competencia Desleal, art. 5 — la carga de la prueba es de quien lo anuncia.
- Un mismo dato de resultado aparece **como máximo tres veces** en todo el sitio,
  **salvo el 4,9★ con 333 reseñas de Alameda, que Álvaro fijó en CUATRO páginas
  indexadas el 25/09/2026** y no debe salir en más: la home, `/casos/`,
  `/tienda-online/` y `/seo-local/`. Se retiró de `/diseno-web/` y `/lp/hosteleria/`
  **conservando el caso**, que sigue contado y enlazado: lo que se quita es la cifra
  repetida, no la prueba. La quinta es `/lp/comercio-local/`, que es `noindex` y cuyo
  hero entero ES el antes y después de Alameda, así que nunca se ve junto a las otras.
  **Si añades una página con ese dato, quítalo de otra.**
- Prohibido en el copy: `soluciones`, `a medida` sin ejemplo concreto al lado, `profesional`, `calidad`, `tu aliado digital`, `llevamos tu negocio al siguiente nivel`, `equipo multidisciplinar`.
- **Los titulares atacan un problema concreto, no describen el servicio.** «La web que tu negocio merece» no dice nada; «En tres segundos deciden si te llaman o cierran» sí. Pero la consecuencia tiene que ser **cierta y específica**: nada de meter miedo con multas o plazos falsos — eso es justo lo que `/accesibilidad-web/` critica, y contradecirse ahí sale más caro que un titular flojo.
- Cifras absolutas antes que porcentajes: «de 4 a 11 pedidos por semana» convence más que «+175%».

## Reglas técnicas

- Las preguntas y respuestas del `FAQPage` en JSON-LD **deben coincidir literalmente** con el FAQ visible. Si cambias una, cambia la otra en el mismo commit.
- **Los precios del JSON-LD también se cambian.** El 25/09/2026 los doce estaban en los valores de antes de las dos subidas: Google enseñaba «890€» en resultados enriquecidos y la página decía 1.490€. **No se ve en la web, así que nadie lo nota:** cada vez que toques la tabla de precios, comprueba `"price"` en las doce páginas.
- **La CSP dejaba fuera las dos vías de respaldo del píxel de Meta (corregido el 30/09/2026).**
  `frame-src 'none'` y `form-action 'self'` bloqueaban el iframe y el POST por formulario que
  `fbevents.js` usa cuando el GET no vale (payload largo, Safari con ITP). **El evento se perdía
  sin error visible en la página.** Ahora las dos permiten `https://www.facebook.com`. Medido en
  producción con Playwright: `PageView` y `Contact` llegan, cero errores de consola, y **las siete
  cabeceras de seguridad siguen intactas con la HSTS completa**.
  ⚠️ Los otros dos bloqueos de consola —`stats.g.doubleclick.net` y `google.es/ads/ga-audiences`—
  **se quedan bloqueados a propósito**: son Google Signals y remarketing de Google Ads.
- La CSP de `vercel.json` solo permite los dominios de Meta, TikTok y Google Analytics. `font-src` y `style-src` están en `'self'`. Cualquier otro recurso externo **se bloquea sin aviso en consola**.
- **Las tipografías se sirven desde `/fonts/`, no desde Google.** Son tres WOFF2 del subconjunto `latin` (54 KB): Instrument Serif normal e italic, y Karla variable 400–700. Traerlas de Google bloqueaba el renderizado ~1,8s y comunicaba la IP del visitante a Google. Si añades un peso o un idioma, descarga el archivo a `/fonts/` — no vuelvas a enlazar `fonts.googleapis.com`.
- `←`, `→` y `★` no están en ningún subconjunto de Google: usan la fuente del sistema. Es así a propósito.
- **El asistente vive en `/js/asistente.js`.** Es un buscador sobre una base de conocimiento escrita a mano, **NO un modelo de lenguaje**: una web estática no puede ejecutar uno y una clave de API en el navegador se regala. **Nunca lo llames «IA»** — Álvaro vende chatbots con IA de verdad desde 1.290€, y anunciar como IA un buscador de palabras clave haría dudar de su producto. Ver `docs/asistente.md`. Si cambias un precio, cámbialo también en su `KB`: no se sincroniza sola.
- **El botón flotante de WhatsApp también sale de `/js/asistente.js`**, apilado bajo el lanzador del asistente (`.rsa-stack`). Su `href` lleva `text=` obligatoriamente: es lo que `consent.js` exige para contar el evento `Contact`. Sin mensaje precargado el clic no se mide como lead. En móvil se oculta en la home, porque ahí la barra fija `.mcta` ya es ese mismo botón y saldría dos veces.
- El consentimiento y la medición viven en `/js/consent.js`, compartido por las 17 páginas. Ver `docs/medicion.md`. No lo dupliques en línea.
- Imágenes con `width` y `height` reales y **`height:auto` en el CSS de esa página**. Sin `height:auto`, el navegador usa el atributo `height` y deforma la imagen. Pasó en 17 páginas a la vez: si creas una página nueva, comprueba la regla `img{}`.
- Ningún script de terceros se ejecuta antes del consentimiento de cookies.
- **GA4 y Meta Pixel activos**, en `RS_CONFIG` de `js/consent.js`: GA4 `G-D61B7R46V5` y
  Meta `3145125662545354` (conjunto de datos «ruiperezstudio.es», activado el 29/09/2026).
  **TikTok sigue con el ID vacío**, así que no carga. Si añades uno, actualiza también la
  tabla de `/cookies/` en el mismo commit — a Meta ya se le retiró el «(pendiente)».
  **Ninguno carga sin consentimiento de la categoría de publicidad:** `cargarPublicidad()`
  solo se llama desde `aplicar(v)` cuando `v.publicidad` es cierto, y el Consent Mode v2
  arranca con los cuatro permisos en `denied`.
- Contraste WCAG AA, foco visible, `alt` en todas las imágenes, objetivos táctiles de 44px o más.
- `--terra` (#B5522F) da 4,47:1 sobre el fondo crema: **no vale para texto pequeño**. Para texto usa `--terra-txt` (#A84A28, 5,12:1). Para rellenos, `--terra`.
- El pie tiene que ser idéntico en las 16 páginas que lo llevan (las tres legales llevan un pie reducido, sin lista de servicios). Si añades una página, añádela al pie de todas.
- **En móvil el mockup del hero va ANTES del texto** (`.scene{order:-1}`). Su portfolio vende con fotografía real; el escaparate no puede esconder su única prueba tras 800px de texto, que es justo donde aterriza el tráfico de pago. Con ese orden, el elemento LCP en móvil pasa a ser la imagen y el `fetchpriority="high"` por fin sirve para algo. Medido: mismo LCP que con el texto delante.
- Las webs de los clientes se enlazan de verdad, con `rel="noopener noreferrer nofollow"`: floristeriaalameda.com, zenconfort.es, tuktukcartagena.com y casa-del-sushi.vercel.app. La página promete «puedes abrirlas y comprobarlo», así que tienen que ser enlaces, no texto.
- **Capturas reales en `/img/`:** `alameda-catalogo`, `alameda-tienda`, `alameda-producto` y `alameda-resenas` (tienda online de Alameda); `tuktuk-home`, `tuktuk-tours`, `tuktuk-reserva` y `tuktuk-galeria` (TukTuk Cartagena); `alameda-carrito` (el carrito con Stripe); `buccaro-alicante` y `buccaro-catalogo` (propuesta de landing). 900px de ancho y WebP a calidad 82, como el resto. **No pongas mockups inventados donde haya una captura real**: los mockups en CSS con productos y precios de mentira se han ido sustituyendo por capturas de webs publicadas.
- **Las páginas de ciudad se fusionaron el 23/09/2026.** `/diseno-web-cartagena/` y `/diseno-web-murcia/` → `/diseno-web/`; `/automatizacion-procesos-murcia/` → `/automatizacion/`; `/chatbot-whatsapp-cartagena/` → `/chatbot-whatsapp/`. Decisión de Álvaro: repetían contenido y competían contra la home, que ya rankeaba por encima de ellas. **Las ocho redirecciones 301 viven en `vercel.json`: no las borres**, son lo único que evita que esas URLs devuelvan 404 a quien las tenga guardadas o a lo que Google ya tenía indexado.
- **IndexNow activo (23/09/2026).** La clave es `a8577673437441do892Fddobbmi810doF4mi2` y vive en un archivo de ese mismo nombre en la raíz. **No lo borres ni lo renombres:** si desaparece, Bing deja de aceptar los avisos y no lo dice. No es un secreto — tiene que ser público para que funcione. Cada vez que cambien URLs importantes, avisa con un POST a `api.indexnow.org/indexnow` con el host, la clave y la lista.
- **Bing Webmaster Tools** está dado de alta con `ruiperezstudio.es`. Importa porque **ChatGPT busca en Bing**: sin estar bien indexado ahí, ChatGPT no te cita.
- **`llms.txt` en la raíz** resume el negocio para los modelos. Si cambias precios o proyectos, cámbialo también ahí: no se sincroniza solo.
- **Content Signals en `robots.txt` (28/09/2026):** `search=yes, ai-input=yes, ai-train=yes`.
  **Los tres en SÍ a propósito.** El objetivo de esta web es que ChatGPT, Gemini y
  Perplexity la citen: negar el entrenamiento sería dispararse en el pie. El ejemplo que
  circula en las auditorías de «agent readiness» trae `ai-train=no`. **No lo copies.**
- **API pública en JSON (28/09/2026).** Álvaro pidió el `api-catalog` de la RFC 9727 y
  se hizo bien: en vez de publicar un catálogo que apunta a una API inexistente, **se
  creó la API.** Son cuatro archivos estáticos, sin servidor detrás:

  | Ruta | Qué es |
  |---|---|
  | `api/servicios.json` | Los 12 servicios y 3 packs con precio, modelo de cobro y plazo |
  | `api/openapi.json` | Especificación OpenAPI 3.1 de los dos endpoints |
  | `api/status.json` | Disponibilidad. Al ser estático, si responde, está vivo |
  | `.well-known/api-catalog` | Catálogo RFC 9727 en `application/linkset+json` |

  **`scripts/verifica-api.py` cruza los precios del JSON contra el precio visible de
  cada página, comprueba que el `cap-sha256` de `docs/dns-aid.md` cuadre con
  `api-catalog` y que todo lo que lista `agents.json` exista. Falla si algo no cuadra.** Ejecútalo siempre que toques la tabla de precios:
  una API con precios distintos a la web es peor que no tener API. La cabecera `Link`
  de `vercel.json` anuncia siete relaciones: `api-catalog`, `service-desc`, `service-doc`,
  `describedby` (a `llms.txt`), `privacy-policy`, `terms-of-service` y `author`.
  **Las siete están en el registro de IANA y las siete apuntan a algo que existe.**
  Ojo: `rel="sitemap"` se probó y se quitó — es de uso común pero **NO está registrado**,
  y la RFC 8288 exige que una relación no registrada sea una URI, no un token suelto.
  El sitemap ya se declara en `robots.txt`, que es el mecanismo canónico. El `api-catalog` no tiene extensión, así que su `Content-Type` va a mano en
  `vercel.json`: **si lo borras, se sirve como texto y deja de validar.**

- **DNS-AID (28/09/2026), a medias a propósito.** El índice de descubrimiento está
  publicado en `.well-known/agents.json` y anunciado con `rel="service-meta"` (RFC 8631).
  **Declara `"agents": []` porque no hay agentes**: ni A2A ni servidor MCP. Lo que lista
  es la API de solo lectura. Un índice que dice la verdad le ahorra al consumidor sondear
  el dominio; inventarse un agente para rellenarlo sería justo lo contrario.
  **El registro DNS SVCB NO se hace: comprobado el 28/09/2026 que el panel de dominios
  de IONOS no ofrece ese tipo.** Su lista es A, AAAA, CAA, CNAME, MX, NS, SRV y las de
  TXT. Los docs de IONOS que sí lo listan son de *IONOS Cloud DNS*, otro producto.
  Habría que mover el DNS del dominio entero, y eso no se hace por un borrador que
  caduca el 28/11/2026. Queda escrito en `docs/dns-aid.md` por si algún día cambia el
  proveedor. **No mandes a Álvaro a buscar SVCB en IONOS: no está.**
  ⚠️ **DNSSEC no hace falta:** el borrador dice «SHOULD», no «MUST». No lo actives por
  esto — si la firma y el DS se desincronizan, el dominio deja de resolver y se cae la web
  y el correo. Si algún día se activa, otro día distinto que el registro SVCB.
  El `cap-sha256` depende del contenido de `api-catalog`: **si tocas ese archivo, el
  registro DNS deja de cuadrar.** `scripts/verifica-api.py` lo comprueba y falla.

- **Autenticación: se declara que NO hay, explícitamente (28/09/2026).** `api/openapi.json`
  lleva `security: []` global y en cada operación, y `agents.json` lo dice con palabras.
  Sin eso, un cliente no distingue «es público a propósito» de «se les olvidó
  documentarlo». **Esa es la respuesta correcta a «¿cómo se autentica un agente?»: no
  tiene que hacerlo.** No se publica `/.well-known/openid-configuration` ni
  `oauth-authorization-server` porque no hay servidor de autorización: declararlos
  apuntando a endpoints que dan 404 es peor que no tenerlos.

- **Índice de habilidades para agentes (29/09/2026).**
  `.well-known/agent-skills/index.json` según la RFC v0.2.0 de Cloudflare, con **una sola
  habilidad**: `consultar-precios`. No es relleno — resuelve un riesgo real. Un modelo que
  lea el JSON de precios puede decir «una web corporativa cuesta 1.490€» y callarse que es
  **sin IVA**, que es un precio **«desde»**, o que la aplicación lleva **90€/mes además**
  del pago único. Ese cliente llega con la expectativa equivocada y la culpa parece suya.
  El SKILL.md dice esas reglas de interpretación por escrito, y además lo que NO se debe
  afirmar: el 4,9★ es de Alameda y no suyo, son seis proyectos y no diez, no se promete
  conformidad legal, y el asistente de la web no es IA.
  **El `digest` es un sha256 del SKILL.md: si se edita el documento, hay que recalcularlo.**
  `scripts/verifica-api.py` lo comprueba y falla. **No añadas habilidades inventadas para
  engordar el índice:** una que dice la verdad vale más que cinco de relleno.

- **WebMCP (29/09/2026), a petición de Álvaro.** `js/webmcp.js` expone dos herramientas a
  agentes que operen dentro del navegador: `listar_servicios` y `calcular_presupuesto`,
  que suma servicios, separa las cuotas mensuales, calcula el IVA y **avisa si un pack
  cubre esa combinación más barato**. Esa última parte es lo único no duplicado: un agente
  sumando por su cuenta se olvidaría del descuento.

  **Coste para un visitante real: cero.** El arranque es un `if (navigator.modelContext)`
  en línea de 148 bytes; el archivo solo se descarga si esa API existe, y a fecha de hoy
  **no existe en ningún navegador público** — está en el Early Preview Program de Chrome,
  que exige apuntarse. No está en Firefox, Safari ni Edge.

  **Los precios NO se duplican en ese archivo:** las herramientas piden
  `/api/servicios.json` cuando se las invoca. Una segunda copia de precios se habría
  quedado desfasada, que es exactamente lo que pasó con el JSON-LD.

  ⚠️ **El formateo de miles va a mano, no con `toLocaleString`.** En español un número de
  cuatro cifras no lleva punto, así que `toLocaleString("es-ES")` devuelve «1490» mientras
  la web escribe «1.490€». Se usa una expresión regular que pone el punto siempre, para
  que herramienta y página digan lo mismo.

  **Fuera de las dos landings de pago**, que son `noindex`, de un solo CTA y sin asistente.

- **Manifiestos ARD (29/09/2026).** `.well-known/ai-catalog.json` y `.well-known/ard.json`,
  con **6 entradas cada uno: la API, el OpenAPI, el api-catalog, la habilidad, `llms.txt` y
  las páginas en markdown.** Todas existen y `scripts/verifica-api.py` lo comprueba.
  **Ni servidor MCP ni agente A2A**, que es lo que la spec pone de ejemplo: no los hay.

  ⚠️ **El informe de «agent readiness» mezcla DOS especificaciones distintas.** Pide
  `/.well-known/ai-catalog.json` con `specVersion`, `host` y `representationQueries`, pero:
  - La **ARD oficial** (`ards-project/ard-spec`, v0.91) usa `/.well-known/ard.json`, **no**
    tiene `specVersion` ni `host`, y el campo se llama **`representativeQueries`**.
  - **`ai-catalog`** (`Agent-Card/ai-catalog`) es otro proyecto: sí usa `specVersion: "1.0"`
    y `host`, pero **en su especificación no existe ningún campo de consultas**.

  Se publican **los dos, cada uno en su formato correcto**, porque son pequeños y describen
  los mismos recursos reales. **No mezcles campos entre ellos** aunque el informe lo sugiera.

  Las `representativeQueries` de `ard.json` (15, entre 2 y 4 por entrada) son preguntas que
  alguien haría de verdad: «cuánto cuesta una tienda online en Cartagena», «los precios de
  ruiperezstudio.es llevan IVA incluido». Sirven para que un registro construya su índice
  semántico. **Es lo más cercano a AEO que hay en todo este montaje: si se tocan, que sigan
  siendo preguntas reales y no palabras clave apiladas.**

- **Lo que NO se publica, y por qué.** El mismo informe de «agent readiness» pedía
  `openid-configuration`, `oauth-authorization-server`, `oauth-protected-resource`,
  `auth.md` y una tarjeta de servidor MCP. **Se descartaron los cinco:** esta web no tiene autenticación,
  ni formularios, ni servidor MCP, ni herramientas que exponer. **Publicar un descriptor
  de algo que no existe no es estar preparado para agentes, es ruido** — y puede
  confundir justo a los rastreadores que interesan. Si algún día hay área privada,
  entonces tocará revisarlo.
- **La ficha de Google se gestiona por Windsor.ai**, conector `google_my_business`. Requiere que Álvaro tenga activado *Settings → API Access → Enable write actions*. Desde ahí se puede cambiar descripción, categorías, servicios, horarios, atributos, fotos, publicaciones y respuestas a reseñas. **Hecho el 21/09/2026:** descripción reescrita en primera persona del singular, los 9 servicios con precio y descripción, y las 7 reseñas respondidas una a una. **Ficha actualizada al sureste el 23/09/2026:** descripción reescrita a «Región de Murcia, Alicante y Almería» (límite duro de **750 caracteres**, la primera versión se pasó y dio error), 12 servicios con precio incluyendo accesibilidad y aplicación de gestión, y **las 4 primeras publicaciones** (accesibilidad, Alameda, TukTuk y precios publicados). **Las imágenes de las publicaciones van en `/img/gbp/` en JPG o PNG**: Google no acepta WebP y todas las capturas del sitio lo son. **Cadencia a partir de ahora: una publicación por semana.** Las cuatro se publicaron de golpe porque la API no permite programarlas.
**Ficha actualizada el 25/09/2026:** los 11 servicios tenían los precios de antes de
la subida (390€, 690€, 450€, 1.290€, 1.990€, 240€, 890€, 690€, 290€, 160€, 75€), todos
obsoletos. Ahora hay **16 servicios** con la tabla al día, incluidos Meta Ads y los tres
packs. Las **7 publicaciones** están reescritas: las cinco que quedaban llevaban precios
viejos o estaban en plural («diseñamos», «Te atendemos», «integramos»), y se ha añadido
una octava con los packs. ~~Pendiente: añadir Alicante, Almería y Valencia al área de servicio.~~ **HECHO**, comprobado el
30/09/2026: son siete lugares — Murcia, Alicante, Almería, Valencia, Elche, Cartagena y Región de
Murcia.
~~Pendiente de Álvaro: la fecha de apertura.~~ **HECHA: septiembre de 2024**, leída del conector.

**Ficha actualizada el 30/09/2026 con la última bajada.** Descripción reescrita (724 de los 750
caracteres), **19 servicios** con la tabla nueva —incluidos Automatización esencial y el pack
Arranca, que no estaban—, **siete publicaciones corregidas** y una octava nueva sobre los tres
planes de mantenimiento.
⚠️ **Dos publicaciones llevaban la tienda online a 2.490€**, un precio que no era el vigente ni
antes de esta bajada. **Las publicaciones de la ficha no se actualizan solas cuando cambias la
tabla: hay que repasarlas una a una.**
**Categorías (21/09/2026):** principal `gcid:website_designer`; secundarias `gcid:internet_marketing_service`, `gcid:marketing_agency` y `gcid:software_company`. Un `update_location` con teléfono o web da 400: mándalos solo si de verdad cambian. **La dirección no se toca:** cambiarla dispara la re-verificación de Google y puede tumbar la ficha. Search Console (`searchconsole`, propiedades `ruiperezstudio.es` y `zenconfort.es`) es **solo lectura**.
- **La URL de la barra del navegador (`.brw-url`) tiene que ser la de la captura que hay debajo.** En `/web-corporativa/` ponía `floristeriaalameda.com` sobre una captura de Casa del Sushi: si el visitante abre esa URL y ve otra cosa, la prueba se vuelve en contra. Corregido el 23/09/2026.
- **Accesibilidad: las 21 páginas pasan axe-core 4.10.2 con CERO violaciones WCAG 2.1 A y AA,
  medido en los DOS modos** (01/10/2026).

  ⚠️ **FALLO DE MÉTODO, descubierto el 01/10/2026.** Todas las medidas anteriores estaban mal.
  **axe no analiza lo que tiene `opacity:0`**, y la animación de revelado (`.rv`) arranca justo
  así: en la home son **52 elementos invisibles para el escáner** en el momento en que corre.
  Se estuvo midiendo medio sitio y dando el otro medio por bueno.

  Con `prefers-reduced-motion: reduce` el revelado no ocurre, todo está visible desde el
  principio y aparecieron **18 violaciones reales en 5 páginas**:

  | Dónde | Qué | Gravedad |
  |---|---|---|
  | `/web-corporativa/` y `/automatizacion/` | el bloque `#esencial` reutiliza `.pbox` (oscuro) con el fondo cambiado a claro, pero la regla `.pbox li` seguía pintando el texto a `rgba(247,242,233,.86)`: **#f8f3eb sobre #fdfbf7, contraste 1,06** | **texto invisible** |
  | `/` | los números `01-04` de `.proc-n` usaban `--terra` a 16,8px: 4,47 | contraste |
  | `/mantenimiento-web/`, `/diseno-web/` | enlaces dentro de un párrafo distinguidos solo por el color | `link-in-text-block` |

  **Lo del bloque `#esencial` no era un detalle:** la lista de lo que incluye la Web esencial de
  690€ era texto casi blanco sobre blanco. El `color` en línea del `<ul>` no ganaba porque
  `.pbox li` apunta al `li` directamente y la herencia pierde contra una regla específica.

  **MIDE SIEMPRE LAS DOS VECES**, con y sin `prefers-reduced-motion`. Si solo mides una, mides
  la que te da la razón. Es el mismo error que el de las cabeceras con `routes`: comprobar lo
  que fuiste a buscar en vez de la respuesta completa. **Esto es ahora un argumento de venta**: `/accesibilidad-web/` lo dice por escrito e invita a comprobarlo. Si rompes una regla, dejas de poder venderlo. Comprueba axe antes de tocar una página, no después.
- **Enlace de salto (`a.skip`) en las 21 páginas**, apuntando a `#main-content`. Si creas una página nueva, ponlo: sin él, la web que vende accesibilidad tendría una página que no la cumple.
- **El servicio de accesibilidad NO se apoya en auditorías previas a clientes**, porque no las hay. Lo que hizo Álvaro a Alameda y TukTuk fue una auditoría digital de negocio, que es otra cosa. La única prueba que se usa es la propia web medida con axe. **No insinúes experiencia en accesibilidad que no existe.**
- **Precios de accesibilidad (23/09/2026):** el mercado español cobra 800–2.500€ por una auditoría básica y 400–1.590€/mes de monitorización. Álvaro sale por debajo a propósito para darse a conocer, y la FAQ lo dice abiertamente. **Están pensados para subir.**
- **Nunca prometas conformidad.** Ni «cumplimiento garantizado», ni «100% conforme», ni «sin riesgo de multa». La FAQ responde que no se garantiza y por qué.
- **Lighthouse móvil, medido el 29/09/2026** con Lighthouse 13.5.0 contra producción:

  | Página | Rend. | Acces. | B. prác. | SEO | LCP | CLS | TBT |
  |---|:-:|:-:|:-:|:-:|--:|--:|--:|
  | `/` | **100** | 100 | 100 | 100 | 1,5s | 0,008 | 0ms |
  | `/meta-ads/` | **100** | 100 | 100 | 100 | 1,2s | 0,001 | 0ms |
  | `/lp/hosteleria/` | **100** | 100 | 100 | 66¹ | 1,6s | 0,002 | 0ms |

  ¹ El 66 de SEO es correcto y esperado: la única auditoría que falla es «Page is blocked
  from indexing», y esa página es `noindex` a propósito por ser de tráfico de pago.
  **No lo "arregles".**

  **El aviso anterior sobre el peso queda cancelado.** Se temía que la home doblara de
  48 KB a 105 KB hubiera hundido el rendimiento. Medido: no lo hizo. Subió de 98 a 100 y
  el LCP bajó de 1,9s a 1,5s. El CSS en línea pesa pero no bloquea, y las fuentes locales
  con `preload` más el mockup del hero antes del texto en móvil hacen el resto.

  Para repetir la medida sin tocar el repositorio: instalar `lighthouse` con npm **fuera**
  del proyecto (en un directorio temporal), exportar `CHROME_PATH` y lanzarlo contra la
  URL de producción. La API de PageSpeed Insights tiene cuota diaria compartida y suele
  estar agotada.

## Skills de este proyecto

- **`auditoria-web-preads`** (`.claude/skills/`) — propia. Auditoría de web de negocio local antes de invertir en publicidad. Define el orden de trabajo: bloqueantes legales → medición → coherencia de oferta → encaje mensaje/tráfico → copy → estética.
- **`refactoring-ui`** y **`web-typography`** (`.agents/skills/`, de `wondelai/skills`) — jerarquía visual, espaciado, color, tipografía. Sustituyen a `ui-ux-pro-max`, que no existe.
- `web-design-guidelines` y `vercel-optimize` — layout, accesibilidad y rendimiento.

## Markdown para agentes: los archivos SÍ, la negociación NO (29/09/2026)

**Publicado y funcionando:** los 21 `md/*.md`, con `Content-Type: text/markdown`,
anunciados en `llms.txt`, en `agents.json` y en los dos manifiestos ARD. Un modelo que
quiera el contenido sin HTML lo tiene en `https://ruiperezstudio.es/md/<pagina>.md`.

**NO funciona:** pedir la página normal con `Accept: text/markdown`. Se intentó dos veces.

1. **Con `rewrites` + `has`:** desplegado y medido — devolvía HTML. Los `rewrites` se
   evalúan **después** del sistema de archivos, y en un sitio estático `/meta-ads/` ES un
   archivo, así que la regla nunca se ejecuta. Está en los docs de Vercel.
2. **Con `routes` + `{"handle": "filesystem"}`:** la negociación **sí funcionó**, pero
   rompió algo mucho peor. **Con `routes` activo, Vercel deja de aplicar la propiedad
   `headers` entera.** En producción desaparecieron `Content-Security-Policy`,
   `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Content-Type-Options`,
   `Link` y `Vary`, y la HSTS perdió `includeSubDomains; preload`. **Revertido en minutos.**
   Los docs de Vercel dicen que `routes` convive con `headers`. En la práctica, no.

⚠️ **EL FALLO DE MÉTODO, que vale más que la conclusión.** Probé la vista previa antes de
fusionar, pero solo comprobé que la página se servía bien — **no que las cabeceras
siguieran ahí.** Medí lo que había ido a buscar en vez de la respuesta completa. Por eso
la regresión llegó a producción. **Cuando cambies enrutado o cabeceras, compara la
respuesta ENTERA contra el estado anterior**, no solo la parte que te interesa:

```bash
curl -s -D- -o /dev/null https://ruiperezstudio.es/ | grep -iE \
  '^(content-security-policy|x-frame-options|referrer-policy|permissions-policy|x-content-type-options|strict-transport-security|link|vary):'
```

**Se podría intentar metiendo las cabeceras dentro de `routes`**, que sí acepta un campo
`headers` por regla. **No se ha hecho:** reescribir siete cabeceras de seguridad a mano,
en una primitiva que ya demostró comportarse distinto a su documentación, para ganar un
mecanismo que hoy no usa ningún rastreador, es mucho riesgo por muy poco. **Si alguien lo
intenta, que compare la respuesta entera antes y después.**

⚠️ **Este entorno no alcanza `*.vercel.app`**, así que las vistas previas no se prueban con
`curl` desde aquí. Se leen con `web_fetch_vercel_url` del MCP de Vercel, que **no permite
cabeceras propias ni muestra las de respuesta con detalle**: sirve para ver que el sitio no
está roto, no para validar cabeceras. Esa limitación es parte de por qué falló el método.

## Decisiones de Álvaro que no hay que revertir (25/09/2026)

La auditoría de ese día levantó cuatro cosas y él decidió sobre las cuatro. **No las
vuelvas a marcar como fallo ni las "arregles" por tu cuenta:**

- **El domicilio del aviso legal se queda como está.** La auditoría lo marcó como
  bloqueante por el art. 10.1.a LSSI (hoy solo consta la localidad, no la calle).
  Álvaro dijo literalmente «ignóralo, no hay problema en eso». El comentario con el
  detalle sigue en `aviso-legal/index.html` por si algún día cambia de idea.
- **Correo oficial desde el 28/09/2026: `ruiperezstudio.info@gmail.com`.** Sustituye a
  `ruiperezyasociadoss@gmail.com` en las tres páginas legales, el JSON-LD de la home y
  `api/openapi.json`. **Es el correo por el que Álvaro quiere que le escriban los
  clientes**, así que también está en el pie de las 16 páginas como `mailto:`, junto al
  teléfono como `tel:`. Antes no había ni uno ni otro en todo el sitio: el único camino
  era WhatsApp, que era el bloqueante GRAVE que levantó la auditoría del 25/09.
  **Es Gmail y se queda así:** Álvaro comprobó el 28/09/2026 que no tiene buzón en el
  dominio propio y decidió no comprarlo de momento. **No vuelvas a proponérselo.**
  Si algún día cambia, son 6 sitios y el pie de 16 páginas.
- ~~El ID del píxel de Meta lo pasa él.~~ **Entregado y activo desde el 29/09/2026.**
  Ya no bloquea nada: se puede lanzar campaña.
- **Alameda en cuatro páginas está bien**, y en ninguna más. Ver la regla de arriba.

## Auditoría del 30/09/2026

`AUDITORIA-2026-09-30.md`, hecha con los cuatro conectores en vivo. **El dato que manda sobre
todos los demás:**

| Fuente | Septiembre 2026 |
|---|---|
| Google Search (España) | 773 impresiones · **14 clics** · posición media 26,8 |
| Ficha de Google | 62 impresiones · **1 clic a la web** · 0 llamadas · 0 mensajes |
| Página de Facebook | **0 seguidores · 0 alcance** |
| Meta Ads | cuenta activa, **ninguna campaña, nunca** |
| Instagram | **sin conectar** |

**Quince visitas en todo el mes.** El precio nunca fue el cuello de botella: **no había tráfico al
que enseñárselo.** Cualquier discusión de copy o de precio es secundaria hasta que eso cambie.

## Auditoría del 25/09/2026

`AUDITORIA-2026-09-25.md` es la auditoría pre-campaña completa hecha con la skill
`auditoria-web-preads`, con verificación en producción y lectura de nueve competidores
reales del sureste. **Léela antes de tocar precios o copy de venta.** Lo que cambia
respecto a lo que este archivo daba por bueno:

- **«Publico mis precios» ya NO es diferencial.** Seis de nueve competidores del sureste
  publican precio. e-creativos (Murcia) coincide en el número exacto de entrada: 690€.
- **«Entrego paneles y reservas» está parcialmente reclamado** por Dvesign, Ridaly y
  Grita Internet, aunque con plugins genéricos (Amelia, WooCommerce) sobre WordPress.
  **La palabra «panel» ya no vende; la captura del panel sí.**
- **La franja peligrosa es Dvesign (Cartagena):** tienda a 977€ contra 2.490€, «empieza
  a vender en 3 días» y reservas con Amelia. Mismo mercado, mitad de precio.
- **Lo único que sigue libre: ningún competidor usa un titular que ataque un problema.**
  Los nueve H1 leídos son «servicio + ciudad» o un precio desnudo.

## Enlaces entrantes

`docs/enlaces-entrantes.md` es el plan. **Ya NO está en cero: el 29/09/2026 Álvaro puso
el crédito en floristeriaalameda.com (2 enlaces) y tuktukcartagena.com (1)**, verificados
en el HTML servido, sin `nofollow` y sin depender de JavaScript. Falta Finca Doña Carmen,
que se pondrá al publicarse. Quedan pendientes Bing Places —importa porque ChatGPT busca
en Bing— y los directorios locales. Lo de más valor son los tres sitios que
Álvaro ya mantiene y cobra (Alameda, TukTuk, Finca Doña Carmen): un crédito de diseñador
en el pie, **pedido y no puesto a escondidas**, sin `nofollow` y con el texto del enlace
distinto en cada uno para no parecer comprado. Ahí está el HTML y el mensaje para pedirlo.

## Meta Ads: informe diario

`docs/cowork-meta-ads.md` es el encargo permanente para Cowork o cualquier sesión con
Windsor conectado. Lo esencial: **no se toca nada hasta el día 7** —Meta necesita de 3 a 7
días de aprendizaje y unos 50 eventos por conjunto—, se decide por **coste por `Contact`**
y no por clics ni por `ViewContent`, y **el CPA que muestra Meta está subestimado** porque
el evento solo se dispara con consentimiento de publicidad.

✅ **El conector `facebook` de Windsor SÍ está conectado** (comprobado el 30/09/2026): cuenta
`1086058157249572`, estado `ACTIVE`, **0€ gastados y ninguna campaña creada nunca**. También
están `facebook_organic` (páginas RuiperezStudio y Zenconfort), `google_my_business` y
`searchconsole`. **Falta `instagram`**, que es el que hace falta para el orgánico.

**Los umbrales de CPA son provisionales:** salen de un ticket medio de 1.442€ y una tasa de
cierre supuesta de 1 de cada 7. **Hay que pedirle a Álvaro cuántos presupuestos cierra de
verdad** y recalcularlos.

## Mantenimiento recurrente

`docs/mantenimiento.md` es el encargo permanente para quien lleve el mantenimiento semanal y mensual (Cowork o cualquier sesión con el repo y Windsor conectados). Cubre publicaciones en la ficha, respuesta a reseñas, los tres mantenimientos de clientes, las revisiones trimestrales de axe y Lighthouse, y la lista de cosas que se rompen sin avisar. **Si cambias una de esas rutinas, cámbiala ahí también.**

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
