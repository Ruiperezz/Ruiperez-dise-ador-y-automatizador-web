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

1. **El evento se dispara antes de la redirección.** Un listener en fase de captura intercepta cualquier clic sobre `a[href*="wa.me/"]` y envía el evento antes de que el navegador salga.
2. **El origen viaja en el propio mensaje.** Así, cuando el lead entra por WhatsApp, ya sabes de qué campaña viene sin depender de que él te lo diga.

## Eventos

| Evento | Se dispara desde | Plataforma | Parámetros |
|---|---|---|---|
| `PageView` | Carga de cualquier página | Meta | — |
| `page` | Carga de cualquier página | TikTok | — |
| `Contact` | Clic en **cualquier** enlace a `wa.me` | Meta | `content_name` = página, `source` = campaña de origen |
| `Contact` | Clic en cualquier enlace a `wa.me` | TikTok | `content_name` = página |
| `generate_lead` | Clic en cualquier enlace a `wa.me` | GA4 | `page`, `source` |

`content_name` es la ruta de la página: `home`, `web-corporativa`, `diseno-web-cartagena`… Sirve para saber **qué página genera contactos**, que es lo que decide dónde mandar el presupuesto de anuncios.

No hay que etiquetar los botones uno a uno: el listener los coge todos, incluidos los que se añadan en el futuro. Hoy son 3 en la home, 2 en cada página de servicio y 1 en el pie.

### Configurar el evento de conversión

En Meta Events Manager, marca `Contact` como **conversión personalizada** y usa esa conversión como objetivo de la campaña. Si dejas el objetivo en «tráfico» o «clics en el enlace», todo lo anterior no sirve de nada.

## Origen de campaña

Al cargar cualquier página se leen los parámetros de la URL y se guarda el origen en `sessionStorage` (clave `rs-origen`) durante la sesión:

- `utm_source` + `utm_campaign` si vienen en la URL
- si no, `fbclid` → `meta`, `ttclid` → `tiktok`

Ese valor se añade al final del mensaje de WhatsApp como ` · ref: meta-hosteleria`, y viaja también en el parámetro `source` del evento.

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

| Categoría | Qué carga |
|---|---|
| Necesarias | Nada de terceros. Solo el recuerdo de tu elección. |
| Analíticas | Vercel Analytics · Google Analytics 4 |
| Publicidad | Meta Pixel · TikTok Pixel |

Los eventos de WhatsApp también respetan la categoría: si el visitante rechazó publicidad, se dispara el clic pero no se envía nada a Meta ni a TikTok.

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

## Pendiente

- [ ] Rellenar los tres IDs en `RS_CONFIG`
- [ ] Marcar `Contact` como conversión personalizada en Meta y en TikTok
- [ ] Comprobar con Pixel Helper los seis pasos de arriba
- [ ] Las landings de pago con sus UTM (fase 5 del plan)
