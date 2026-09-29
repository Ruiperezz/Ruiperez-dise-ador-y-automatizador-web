# CLAUDE.md — ruiperezstudio.es

> Estado real del proyecto. Si algo aquí contradice al código, gana el código y se actualiza este archivo.
> El plan de trabajo vivo está en `PLAN.md`. Léelo antes de tocar nada.

## Qué es esto

Web de marca y escaparate comercial de **Álvaro Ruipérez** (Ruipérez Studio), diseñador web freelance en Cartagena, Región de Murcia.

- **URL de producción:** https://ruiperezstudio.es
- **Repositorio:** github.com/Ruiperezz/Ruiperez-dise-ador-y-automatizador-web
- **Despliegue:** Vercel, proyecto `ruiperez-dise-ador-y-automatizador-web`. La rama `main` va directa a producción.
- **Objetivo actual:** dejar la web lista para invertir en Meta Ads y TikTok Ads. **Ámbito: sureste de España** (Región de Murcia, Alicante, Almería y **Valencia**, añadida el 23/09/2026 porque Álvaro tiene familia allí y contactos que explotar). La sede sigue en Cartagena. La sede sigue en Cartagena. Ver `PLAN.md`.

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
| Servicios (12) | `/web-corporativa/` `/landing-page/` `/tienda-online/` `/aplicaciones-web/` `/automatizacion/` `/chatbot-whatsapp/` `/seo-local/` `/email-marketing/` `/mantenimiento-web/` `/gestion-redes-sociales/` `/accesibilidad-web/` `/meta-ads/` |
| General (1) | `/diseno-web/` |
| Legales (3) | `/aviso-legal/` `/privacidad/` `/cookies/` |
| Estudio (2) | `/sobre-mi/` · `/casos/` |
| Tráfico de pago (2) | `/lp/hosteleria/` `/lp/comercio-local/` — noindex, sin menú, un solo CTA. **Nunca mandar tráfico de pago a la home.** |

Otros archivos: `sitemap.xml` (19 URLs — las noindex quedan fuera), `robots.txt`, `fonts/` (3 WOFF2), `vercel.json` (CSP, HSTS, X-Frame-Options, cache de `/img/`), `favicon.svg`, `apple-touch-icon.png`, `img/`.

## Precios oficiales

**Estos son los precios buenos.** Son los que están en producción. Todos **sin IVA**; cada precio visible debe llevar «+ 21% IVA» al lado.

**No inventes lo que costó un caso.** Ningún caso de estudio lleva precio: el precio va en el bloque de precio del servicio, que es el oficial.

| Servicio | Precio |
|---|---|
| Landing page | desde 690€ · pago único |
| Web corporativa | desde 1.490€ · pago único |
| Tienda online | desde 2.490€ · pago único |
| Aplicación web de gestión | desde 3.900€ · pago único + 90€/mes |
| Automatización de procesos | desde 1.200€ |
| Chatbot IA para WhatsApp | desde 1.590€ + 120€/mes |
| Email marketing | desde 290€/mes |
| SEO local | desde 390€/mes |
| Gestión de redes sociales | desde 450€/mes · **8 publicaciones, 2 en vídeo, 1 red** |
| Auditoría de accesibilidad | desde 590€ · con correcciones 1.190€ · monitorización 95€/mes |
| Mantenimiento web | 95–190€/mes |
| **Gestión de Meta Ads** | **240€/mes** hasta 1.000€/mes de inversión · por encima, 15% de la inversión |

Cambios puntuales fuera de contrato: 60€/hora.

**Plazos de entrega (28/09/2026):**

| Servicio | Plazo |
|---|---|
| Landing page · web corporativa · tienda online | **1 semana** |
| **Aplicación web de gestión** | **2 semanas** — lleva base de datos y usuarios |

Antes iban de 5-7 días una landing a 4-8 semanas una aplicación. Se bajaron a una
semana el 25/09 y la aplicación subió a dos el 28/09, a petición de Álvaro.

**Se escribe siempre «desde que me pasas el contenido»**, nunca «desde que firmamos».
El plazo solo corre cuando el cliente ha entregado, y eso es lo único que evita la
discusión de quién retrasó qué.

**Sobre las 50-70 horas de la tienda de Alameda:** esa cifra NO es la referencia de
lo que tarda una tienda. Álvaro explicó el 28/09/2026 que fue **su primera web y su
primera tienda online a la vez**, así que lleva dentro toda la curva de aprendizaje.
Tomarla como ritmo normal era un error mío. **No la uses para estimar plazos.**

**Packs (25/09/2026).** Tres combinaciones, en la sección `#packs` de la home y
enlazadas desde el bloque de precio de las seis páginas implicadas:

| Pack | Lleva | Suelto | Pack |
|---|---|---|---|
| **Capta** | Landing page + 3 meses de Meta Ads | 1.410€ | **1.190€** |
| **Vende online** | Tienda online + automatización de pedidos | 3.690€ | **2.990€** |
| **Atiende solo** | Web corporativa + automatización + chatbot IA | 4.280€ | **3.490€** |

Descuento del 16–19%. **Tres, no más:** con cuatro o cinco el cliente no elige, se va.
**La escalera 1.190 / 2.990 / 3.490 es la respuesta a «¿pymes o negocios pequeños?»:**
el pack de entrada abre puerta al pequeño y el de arriba a la mediana, sin tener que
mover la tabla de precios por cuarta vez. Si cambias un precio de la tabla, recalcula
las tres columnas: el «suelto» tiene que cuadrar con la suma real o el descuento es mentira.

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
- **Casa del Sushi** — Cartagena, restauración. **Entregado, el cliente no siguió adelante.** `casa-del-sushi.vercel.app`. Carta, info del local, ubicación y reseñas, **reserva de mesa con correo de confirmación automático** y un **panel de administración** donde el dueño ve sus reservas. **Álvaro dice que el trabajo no está cerrado del todo** (22/09/2026): sigue etiquetado como caso real porque la web está publicada y se puede abrir, pero confirma con él antes de llamarle «cliente» en copy nuevo. **Álvaro confirmó el 21/09/2026 que Perico Del Rey NO es Casa del Sushi.** Casa del Sushi es cliente y tiene su caso en `/web-corporativa/` y `/casos/`, pero **no ha dejado reseña en Google**: no le atribuyas ninguna.

**Ficha de Google propia: `locations/10546771556631248285`.** 5,0★ con 7 reseñas, verificada. Enlace público `https://maps.google.com/maps?cid=16135944171140006039`; para pedir reseñas, `https://search.google.com/local/writereview?placeid=ChIJoxdRJpnbFWoRl8BVVLtj7t8`. **El 4,9★ con 333 reseñas es de Alameda, no suyo**: donde aparezca hay que decir de quién es. En el hero va su 5,0★ real.

**Floristería Buccaro (Alicante): landing informativa entregada, pendiente de cerrar.** No era una maqueta: es un encargo real al precio oficial de landing page. Aparece en `/landing-page/` etiquetada «Proyecto entregado · pendiente de cerrar». **El precio no va en el caso**, va en el bloque de precio del servicio, como todos. No se le atribuyen resultados porque no los hay.

En curso: **Finca Doña Carmen** — aplicación con panel de administración para la finca y acceso privado para cada pareja (Next.js + Supabase + Vercel). **No está publicada.** Aparece en `/aplicaciones-web/` etiquetada «Proyecto en curso · cliente real», describiendo qué hace y **sin ninguna cifra de resultado**, porque todavía no las hay. Se añade a `/casos/` el día que esté en producción.

**El precio de la aplicación (3.900€ + 90€/mes) se fijó el 22/09/2026** comparando con el mercado español: las agencias parten de 5.000–8.000€ para un desarrollo acotado y los freelance se mueven entre 8.000 y 25.000€. La cuota mensual **no es un extra comercial**: una aplicación tiene base de datos y usuarios vivos 24 h y eso cuesta todos los meses. Si se quita la cuota, el servicio pierde dinero.

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

**Empresas pequeñas y, sobre todo, MEDIANAS del sureste español** (decidido el 24/09/2026). La sede sigue en Cartagena.

**Tensión anotada el mismo día, sin resolver del todo:** todo el sitio venía escrito para micronegocios —«el de al lado», «tu local», «el mostrador»— y el portfolio son floristería, restaurante, tuktuk y fisio. Además los precios bajaron un 35% el día antes. **Una empresa mediana que lee «desde 690€» no piensa «qué barato», piensa «esto es para tiendas pequeñas».** El precio posiciona.

**Lo que sí acerca a medianas es el trabajo real, no el copy:** 4 sistemas de reserva con cobro, 3 paneles de administración, correos automáticos y Stripe. Ese es el eje del mensaje ahora. Un freelance que hace webs bonitas hay uno en cada esquina; uno que entrega un panel donde bloqueas parte de la flota, no.

**Objeción pendiente de responder en la web:** una mediana pregunta «¿qué pasa si te pones malo?». «Trabajo solo» tranquiliza a un comercio y asusta a una empresa de veinte personas. Hoy el sitio no lo responde en ninguna parte.

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
- La CSP de `vercel.json` solo permite los dominios de Meta, TikTok y Google Analytics. `font-src` y `style-src` están en `'self'`. Cualquier otro recurso externo **se bloquea sin aviso en consola**.
- **Las tipografías se sirven desde `/fonts/`, no desde Google.** Son tres WOFF2 del subconjunto `latin` (54 KB): Instrument Serif normal e italic, y Karla variable 400–700. Traerlas de Google bloqueaba el renderizado ~1,8s y comunicaba la IP del visitante a Google. Si añades un peso o un idioma, descarga el archivo a `/fonts/` — no vuelvas a enlazar `fonts.googleapis.com`.
- `←`, `→` y `★` no están en ningún subconjunto de Google: usan la fuente del sistema. Es así a propósito.
- **El asistente vive en `/js/asistente.js`.** Es un buscador sobre una base de conocimiento escrita a mano, **NO un modelo de lenguaje**: una web estática no puede ejecutar uno y una clave de API en el navegador se regala. **Nunca lo llames «IA»** — Álvaro vende chatbots con IA de verdad desde 1.590€, y anunciar como IA un buscador de palabras clave haría dudar de su producto. Ver `docs/asistente.md`. Si cambias un precio, cámbialo también en su `KB`: no se sincroniza sola.
- **El botón flotante de WhatsApp también sale de `/js/asistente.js`**, apilado bajo el lanzador del asistente (`.rsa-stack`). Su `href` lleva `text=` obligatoriamente: es lo que `consent.js` exige para contar el evento `Contact`. Sin mensaje precargado el clic no se mide como lead. En móvil se oculta en la home, porque ahí la barra fija `.mcta` ya es ese mismo botón y saldría dos veces.
- El consentimiento y la medición viven en `/js/consent.js`, compartido por las 17 páginas. Ver `docs/medicion.md`. No lo dupliques en línea.
- Imágenes con `width` y `height` reales y **`height:auto` en el CSS de esa página**. Sin `height:auto`, el navegador usa el atributo `height` y deforma la imagen. Pasó en 17 páginas a la vez: si creas una página nueva, comprueba la regla `img{}`.
- Ningún script de terceros se ejecuta antes del consentimiento de cookies.
- **GA4 activo:** `G-D61B7R46V5`, en `RS_CONFIG` de `js/consent.js`. Meta y TikTok siguen con el ID vacío, así que no cargan. Si añades uno, actualiza también la tabla de `/cookies/` en el mismo commit.
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
una octava con los packs. **Pendiente: añadir Alicante, Almería y Valencia al área de
servicio** — hace falta el `place_id` de Google Maps de cada una.
**Pendiente de Álvaro: la fecha de apertura del negocio**, que está vacía. Dice «+2 años» pero no tengo el mes ni el año exactos y no me los invento.
**Categorías (21/09/2026):** principal `gcid:website_designer`; secundarias `gcid:internet_marketing_service`, `gcid:marketing_agency` y `gcid:software_company`. Un `update_location` con teléfono o web da 400: mándalos solo si de verdad cambian. **La dirección no se toca:** cambiarla dispara la re-verificación de Google y puede tumbar la ficha. Search Console (`searchconsole`, propiedades `ruiperezstudio.es` y `zenconfort.es`) es **solo lectura**.
- **La URL de la barra del navegador (`.brw-url`) tiene que ser la de la captura que hay debajo.** En `/web-corporativa/` ponía `floristeriaalameda.com` sobre una captura de Casa del Sushi: si el visitante abre esa URL y ve otra cosa, la prueba se vuelve en contra. Corregido el 23/09/2026.
- **Accesibilidad: las 21 páginas pasan axe-core 4.10.2 con CERO violaciones WCAG 2.1 A y AA** (25/09/2026). **Esto es ahora un argumento de venta**: `/accesibilidad-web/` lo dice por escrito e invita a comprobarlo. Si rompes una regla, dejas de poder venderlo. Comprueba axe antes de tocar una página, no después.
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
- **El ID del píxel de Meta lo pasa él.** Hasta entonces `metaPixelId: ""` y los
  anuncios no se pueden medir. Todo lo demás está montado: CSP, cookies, banner y el
  evento `Contact` antes de la redirección.
- **Alameda en cuatro páginas está bien**, y en ninguna más. Ver la regla de arriba.

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
