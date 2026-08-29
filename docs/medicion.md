# Medición y atribución — ruiperezstudio.es

Qué se mide, desde qué botón, y qué hace falta para encenderlo. Todo vive en un único archivo: [`/js/consent.js`](../js/consent.js).

## Antes de gastar el primer euro

Los tres píxeles están montados pero **apagados**: sus IDs están vacíos en `RS_CONFIG`, al principio de `js/consent.js`. Mientras estén vacíos no se carga nada y la web funciona igual. Para encenderlos, rellena:

| Campo | Dónde se saca | Formato |
|---|---|---|
| `metaPixelId` | Meta Events Manager → Orígenes de datos → tu píxel | 15–16 dígitos |
| `tiktokPixelId` | TikTok Ads Manager → Herramientas → Eventos → Web | alfanumérico |
| `ga4Id` | Google Analytics → Administrar → Flujos de datos | `G-XXXXXXXXXX` |

No hace falta tocar nada más: la CSP de `vercel.json` ya permite los dominios de Meta, TikTok y Google.

## El problema que resuelve esto

Todos los CTA del sitio van a `wa.me`. Un clic en `wa.me` saca al usuario del sitio sin dejar rastro: el píxel no ve ninguna conversión. Si se lanza una campaña así, **Meta optimiza a «clic en enlace»** y trae el tráfico más barato posible, que es el que no compra.

La solución tiene dos partes:

1. **El evento se dispara antes de la redirección.** Un listener en fase de captura intercepta los clics sobre `a[href*="wa.me/"][href*="text="]` y envía el evento antes de que el navegador salga. El selector exige `text=` a propósito: así cuenta los CTA de presupuesto y no el número de teléfono del pie, que es un enlace de contacto y no una conversión.
2. **El origen viaja en el propio mensaje.** Así, cuando el lead entra por WhatsApp, ya sabes de qué campaña viene sin depender de que él te lo diga.

## Eventos

| Evento | Se dispara desde | Plataforma | Parámetros |
|---|---|---|---|
| `PageView` | Carga de cualquier página | Meta | — |
| `page` | Carga de cualquier página | TikTok | — |
| `Contact` | Clic en un CTA de WhatsApp | Meta | `content_name` = página, `source` = campaña, `eventID` para deduplicar |
| `Contact` | Clic en un CTA de WhatsApp | TikTok | `content_name` = página, `event_id` |
| `generate_lead` | Clic en un CTA de WhatsApp | GA4 | `page`, `source` |

`content_name` es la ruta de la página: `home`, `web-corporativa`, `diseno-web-cartagena`… Sirve para saber **qué página genera contactos**, que es lo que decide dónde mandar el presupuesto de anuncios.

No hay que etiquetar los botones uno a uno: el listener coge todos los que lleven mensaje precargado, incluidos los que se añadan en el futuro. El `eventID` va en cada evento para poder conciliar con la API de Conversiones más adelante sin duplicar.

### Configurar el evento de conversión

En Meta Events Manager, marca `Contact` como **conversión personalizada** y usa esa conversión como objetivo de la campaña. Si dejas el objetivo en «tráfico» o «clics en el enlace», todo lo anterior no sirve de nada.

## Origen de campaña

Al cargar cualquier página se leen los parámetros de la URL y el origen queda **en memoria**. Solo se guarda en `sessionStorage` (clave `rs-origen`) si se acepta la categoría de publicidad — saber de qué anuncio viene alguien es medición publicitaria, no una necesidad técnica, así que no cabe en las cookies necesarias:

- `utm_source` + `utm_campaign` si vienen en la URL
- si no, `fbclid` → `meta`, `ttclid` → `tiktok`

Ese valor se añade al final del mensaje de WhatsApp como ` · ref: meta-hosteleria`, y viaja también en el parámetro `source` del evento. Se sanea a `[A-Za-z0-9_-]` y se corta a 40 caracteres: sin eso, cualquiera podría montar una URL con un `utm_source` arbitrario y hacer que el mensaje que te llega diga lo que él quiera.

**Cómo etiquetar los anuncios.** En el destino del anuncio pon:

```
https://ruiperezstudio.es/lp/hosteleria/?utm_source=meta&utm_campaign=hosteleria-cartagena
https://ruiperezstudio.es/lp/comercio-local/?utm_source=tiktok&utm_campaign=floristerias
```

Con eso, el primer mensaje que te llegue por WhatsApp acabará en `· ref: meta-hosteleria-cartagena`.

> Si esa etiqueta en el mensaje del cliente te resulta molesta, se apaga poniendo `appendOriginToWhatsApp: false` en `RS_CONFIG`. El evento del píxel se sigue disparando igual; solo pierdes la referencia visible en el chat.

## Consentimiento

Nada de lo anterior ocurre sin permiso. El orden es siempre este:

1. Al cargar, Consent Mode v2 declara **todo denegado** (`ad_storage`, `ad_user_data`, `ad_personalization`, `analytics_storage`).
2. Ningún `<script>` de terceros existe en el DOM todavía. El bloqueo es real, no declarativo.
3. El visitante elige. Se guarda en `localStorage` bajo `rs-consent-v2`, con la fecha, como registro de consentimiento.
4. Solo entonces se inyecta lo que corresponda a la categoría aceptada.

| Categoría | Qué carga | Qué almacena |
|---|---|---|
| Necesarias | Nada de terceros | `rs-consent-v2` (tu decisión, con fecha) |
| Analíticas | Vercel Analytics (`/_vercel/insights/script.js`, primer origen) · GA4 | `_ga`, `_ga_*` |
| Publicidad | Meta Pixel · TikTok Pixel | `_fbp`, `_fbc`, `_ttp`, y `rs-origen` |

**Sin consentimiento de publicidad no se envía nada a Meta ni a TikTok, y tampoco se marca el mensaje de WhatsApp.** El `ref:` viaja a WhatsApp, que es Meta, así que también depende de esa categoría. El origen de campaña se mantiene solo en memoria hasta que se acepta publicidad; solo entonces se guarda en `sessionStorage`.

**Retirar el consentimiento borra de verdad.** Meta y TikTok no leen Consent Mode y sus scripts siguen vivos una vez cargados, así que al revocar se borran las cookies de primera parte de ese proveedor y se recarga la página. Sin eso, «revocar» solo dejaría de mandar datos nuevos mientras las cookies siguen puestas.

**El consentimiento caduca a los 24 meses**, el máximo que admite la AEPD. Pasado ese plazo se vuelve a preguntar solo.

La clave de almacenamiento cambió de `cookie-consent` a `rs-consent-v2` a propósito: el consentimiento anterior solo cubría analítica y no vale para publicidad, así que a todo el mundo se le vuelve a preguntar. Es lo correcto legalmente.

## Cómo comprobar que funciona

Con los IDs ya puestos, en el navegador:

1. Abre la web en una ventana de incógnito. En DevTools → Network, filtra por `facebook`, `tiktok` y `google-analytics`. **Antes de tocar el banner no debe aparecer ninguna petición.**
2. Pulsa **Rechazar todas**. Sigue sin aparecer ninguna.
3. Recarga, pulsa **Aceptar todas**. Ahora sí deben aparecer `fbevents.js` y `events.js`.
4. Con Meta Pixel Helper y TikTok Pixel Helper instalados, repite: en el paso 1 y 2 deben decir que no hay píxel; en el 3, que hay uno activo.
5. Pulsa un botón de WhatsApp. En Pixel Helper debe verse el evento `Contact`.
6. Entra con `?utm_source=meta&utm_campaign=prueba` y pulsa un botón de WhatsApp: el mensaje precargado debe acabar en `· ref: meta-prueba`.

Si en el paso 3 no aparece nada, mira la consola por si es la CSP: cualquier dominio que no esté en `vercel.json` se bloquea **sin error visible en la página**.

### Lo que la CSP bloquea a propósito

**Google Signals y remarketing de Google Ads.** Si activas Google Signals en la propiedad de GA4, gtag.js intentará llamar a `stats.g.doubleclick.net` y `google.com/ads/ga-audiences`, que no están permitidos. Es deliberado: son dominios de publicidad cruzada. Si en algún momento quieres remarketing con Google Ads, hay que añadirlos a `connect-src` y declararlos en la política de cookies. Mejor saberlo ahora que descubrirlo cuando la campaña no reporte.

**TikTok** necesita `mssdk-i18n.tiktok.com` y `*.tiktokcdn.com` además de `analytics.tiktok.com`. Ya están permitidos; si TikTok cambia de región, el dominio puede pasar a `mssdk-va.tiktok.com` y habría que añadirlo.

## Pendiente

- [ ] Rellenar los tres IDs en `RS_CONFIG`
- [ ] Marcar `Contact` como conversión personalizada en Meta y en TikTok
- [ ] Comprobar con Pixel Helper los seis pasos de arriba
- [ ] Actualizar `/cookies/` quitando las marcas «(pendiente)» el día que se activen los píxeles
- [ ] Las landings de pago con sus UTM (fase 5 del plan) — hoy `/lp/hosteleria/` y `/lp/comercio-local/` **no existen todavía**, los ejemplos de arriba son la forma que tendrán
