# Auditoría del 30 de septiembre de 2026

Hecha con los cuatro conectores en vivo (Search Console, ficha de Google, Meta Ads y
Facebook orgánico) más medición directa de producción con navegador. **Todo lo que hay
aquí está medido, no estimado.** Donde no hay dato, lo digo.

---

## 1. El dato que manda sobre todos los demás

| Fuente | Septiembre 2026 |
|---|---|
| Google Search (España) | 773 impresiones · **14 clics** · CTR 1,8% · posición media 26,8 |
| Ficha de Google | 62 impresiones · **1 clic a la web** · 0 llamadas · 0 mensajes · 0 «cómo llegar» |
| Página de Facebook | **0 seguidores · 0 alcance** |
| Meta Ads | cuenta `1086058157249572` activa · **0€ gastados · ninguna campaña, nunca** |
| Instagram | **sin conectar** |

**Quince visitas en todo el mes.** Dos al día.

Esto reordena la conversación que llevábamos teniendo una semana. **Bajar precios no era
el problema y tampoco es la solución**, porque no había nadie mirando el precio. Un
cliente no puede rechazar un número que nunca ha visto.

La bajada de hoy está bien hecha y está desplegada, pero **por sí sola no va a traer un
solo cliente**. Lo que trae clientes es que alguien llegue a la página.

---

## 2. Por qué no llega nadie de Google

Las búsquedas comerciales con volumen real están en la **página 3 a 6**:

| Búsqueda | Impresiones | Posición |
|---|---:|---:|
| diseño web cartagena | 78 | 30,4 |
| diseño web en cartagena | 69 | 44,2 |
| paginas web en cartagena | 40 | 61,1 |
| mantenimiento web murcia | 35 | 30,6 |
| diseño tienda online murcia | 28 | 52,3 |
| creación de páginas web en cartagena | 5 | 60,2 |

**Nadie pasa de la primera página.** Estar en el puesto 30 es estar fuera.

### Dónde sí está bien colocado

`/web-corporativa/` está en **posición 2,4**, `/automatizacion/` en **2,7** y
`/landing-page/` en **3,1**. Excelentes posiciones — pero con 21, 21 y 23 impresiones.
**Rankea primero en búsquedas que casi nadie hace.**

### Un hallazgo que parece malo y no lo es

`/diseno-web-cartagena/` (141 impresiones) y `/diseno-web-murcia/` (113) **siguen
saliendo en Google aunque las borraste el 23/09**. Entre las dos se llevan 254
impresiones, y `/diseno-web/` —la página que las sustituye— **no aparece todavía con
ninguna**.

Lo he comprobado: las **cuatro redirecciones funcionan** (308 permanente), `/diseno-web/`
responde 200 y está en el sitemap. **No hay nada roto**: Google tarda semanas en pasar el
posicionamiento de una URL a otra. Esas 254 impresiones acabarán en `/diseno-web/`. Solo
hay que esperar, y he avisado a IndexNow de las URLs nuevas para acelerarlo.

### La búsqueda «diseño web», 270 impresiones, posición 6

Es la de más volumen con diferencia y está en primera página. **No la persigas**: es una
búsqueda genérica, sin ciudad ni intención de compra. Quien la hace está estudiando la
carrera o buscando inspiración, no contratando.

---

## 3. La ficha de Google está desaprovechada

62 impresiones en un mes, con **1 clic y 0 llamadas**. Para un negocio local verificado
con 11 reseñas, eso es estar invisible en Maps.

**Lo que sí está bien** (y hoy ha quedado al día): descripción, 19 servicios con precio,
las cuatro categorías correctas, el área de servicio con siete lugares y la fecha de
apertura (septiembre de 2024).

**Lo que falla:**

1. **⚠️ Tienes una reseña de UNA estrella, del 29/09, sin comentario y sin contestar.**
   Es la única que no es de cinco, y es la que te baja de 5,0★ a 4,6★ (diez de cinco más
   una de una = 4,64). **No la he contestado porque no sé quién es.** Ver el apartado 7.
2. **Solo 4 fotos** en `/img/gbp/`. La ficha con más fotos gana posiciones en Maps, y las
   fotos de trabajo real (capturas de las webs) son las que más se miran.
3. **Cadencia rota.** La regla era una publicación semanal. Hoy hay 10 (8 corregidas + 2
   nuevas), pero se publicaron a rachas.

---

## 4. La medición está bien, y hoy lo está más

Comprobado en producción con un navegador real, paso a paso:

| Comprobación | Resultado |
|---|---|
| Peticiones a terceros **antes** de aceptar cookies | **Cero** ✓ |
| Tras aceptar: `fbevents.js`, GA4 y Vercel Analytics | cargan ✓ |
| `PageView` con el píxel `3145125662545354` | llega ✓ |
| **`Contact` al pulsar un CTA de WhatsApp** | **llega** ✓ |
| Errores de consola | **cero**, tras la corrección de abajo |

### Lo que he corregido hoy

La CSP tenía `frame-src 'none'` y `form-action 'self'`, que **bloqueaban las dos vías de
respaldo del píxel de Meta**: el iframe y el POST por formulario que `fbevents.js` usa
cuando el GET no sirve (payload largo, Safari con protección de rastreo). El evento se
perdía **sin ningún error visible en la página**.

La vía principal funcionaba, así que no era una avería — pero es exactamente el tipo de
fuga que hace que una campaña reporte menos conversiones de las que hubo, y Meta optimice
hacia el sitio equivocado. Corregido y verificado: **las siete cabeceras de seguridad
siguen intactas y la HSTS conserva `includeSubDomains; preload`**.

### Lo único que queda pendiente de ti en medición

**Marcar `Contact` como conversión en Meta Events Manager.** Sin eso, la campaña optimiza
a «clic en el enlace» y te trae el tráfico más barato, que es el que no compra. Es un
ajuste de dos minutos y **no se puede hacer desde aquí**.

---

## 5. Estado de la web

Todo verde, y esto no es relleno: es lo que te permite vender accesibilidad por escrito.

- **21 páginas, cero violaciones** de axe-core 4.10.2 en WCAG 2.1 A y AA. Reverificado hoy.
- **Los 8 controles de `verifica-api.py` pasan**: precios de la API contra el precio
  visible de cada página, el `cap-sha256`, el digest de la habilidad, los manifiestos.
- **Todos los JSON-LD parsean** y el FAQ visible coincide palabra por palabra con el
  `FAQPage` en las 14 páginas que lo llevan.
- Lighthouse móvil estaba en 100/100/100/100 el 29/09 y los cambios de hoy son texto más
  un bloque pequeño de CSS.

### Tres cosas que estaban mal y he arreglado de paso

1. **El JSON-LD de la home llevaba semanas con precios falsos.** Decía tienda 1.990€,
   automatización 900€, SEO 290€, email 190€, redes 350€ y mantenimiento 90€. **Ninguno
   era un precio real de ninguna tabla.** Google enseñaba eso en los resultados
   enriquecidos. No se ve en la web, por eso nadie lo notó.
2. **La FAQ de automatización prometía recuperar la inversión «en menos de un mes».** Con
   1-3 horas semanales a 15€/hora eso es falso por un factor de cinco a quince. Ahora da
   la cuenta real y dice que quien prometa semanas está vendiendo humo.
3. **Dos publicaciones de la ficha ponían la tienda a 2.490€**, un precio que no era el
   vigente ni antes de la bajada de hoy.

---

## 6. Estado de los conectores

| Conector | Estado | Sirve para |
|---|---|---|
| `google_my_business` | ✅ lectura y escritura | Ficha, publicaciones, reseñas, servicios |
| `searchconsole` | ✅ solo lectura | Posiciones y búsquedas reales |
| `facebook` (Meta Ads) | ✅ conectado, sin usar | **Crear y lanzar campañas** |
| `facebook_organic` | ✅ conectado | Publicar en la página |
| `instagram` | ❌ **sin conectar** | **Es el que falta** |

`facebook` puede crear campañas, conjuntos, anuncios, subir imagen y vídeo, y
pausar/reanudar. **Está todo listo para lanzar.** Lo que no puedo saber desde aquí es si
la cuenta tiene **método de pago** configurado: compruébalo antes de que montemos nada.

**Instagram es el hueco real.** Para un diseñador web, Instagram pesa más que Facebook:
el trabajo entra por los ojos y tus capturas son buenas. Cuando quieras te paso el enlace
de autorización.

---

## 7. Lo que necesito de ti, por orden

1. **La reseña de 1 estrella: ¿sabes quién es?** Si no reconoces al autor como cliente,
   se puede reportar a Google como reseña no basada en una experiencia real. Sea como
   sea, hay que contestarla en público. **Tengo el texto escrito, solo falta tu visto
   bueno**, porque no quiero contestar en tu nombre a alguien con quien a lo mejor tienes
   una historia que yo no sé.
2. **Marca `Contact` como conversión en Events Manager.** Dos minutos.
3. **¿Cuánto puedes poner en anuncios este mes?** Te lo he preguntado dos veces y sigue
   sin respuesta, y es el número del que depende todo el plan.
4. **¿La cuenta de Meta Ads tiene método de pago?**
5. **Autoriza el conector de Instagram** si quieres orgánico.

---

## 8. El siguiente paso, y por qué es ese

Tu objetivo es **cerrar clientes pequeños cuanto antes**. Con 15 visitas al mes no se
cierra nada, así que todo lo demás va después de arreglar eso.

**Los anuncios son el único canal que te salta los 30 puestos de Google.** El SEO local
tarda meses; una campaña te pone delante de quien busca hoy, mañana.

Con presupuesto pequeño, el orden que yo seguiría:

1. **Meta Ads a las dos landings que ya tienes**, `/lp/hosteleria/` y
   `/lp/comercio-local/`. Están hechas para esto: `noindex`, sin menú, un solo CTA. Nunca
   mandes tráfico de pago a la home.
2. **Objetivo de campaña: la conversión `Contact`**, no tráfico ni alcance.
3. **No tocar nada hasta el día 7.** Meta necesita de 3 a 7 días de aprendizaje y unos 50
   eventos por conjunto. Está escrito en `docs/cowork-meta-ads.md`.
4. **Ficha de Google en paralelo**, que es gratis: una publicación semanal y subir fotos.
   Es lo que mueve el puesto en Maps, donde hoy tienes 62 impresiones.

⚠️ **Aviso que ya está en `CLAUDE.md` y repito aquí:** estás aprendiendo Meta Ads
mientras lo vendes. En tu propia campaña el dinero que se quema es el tuyo, lo cual está
bien para aprender. **No se lo lleves a un cliente hasta que tengas una campaña propia
con resultados.**
