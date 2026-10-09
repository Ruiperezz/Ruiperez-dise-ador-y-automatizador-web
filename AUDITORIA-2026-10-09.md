# Auditoría técnica y comercial · 09/10/2026

> Privado (`AUDITORIA-*.md` está en `.vercelignore`). Sin datos personales ni secretos.
> **Alcance:** las 31 páginas del repositorio, el código de consentimiento, la configuración de despliegue
> y la producción medida con navegador. **No** se declara que la web «cumpla la ley» ni que sea «segura»:
> una inspección automática no lo demuestra (ver §4).
> **Nota de método:** las plantillas de auditoría pegadas pedían parar y esperar aprobación entre fases.
> Álvaro indicó seguir ejecutando, así que no hubo parada; cada bloque va en su propio commit para poder
> revertirlo por separado.

## 1. Stack y método

- **Stack:** HTML, CSS y JavaScript estático puro, sin `package.json` ni build. 31 páginas (una carpeta
  por URL), `js/consent.js` (consentimiento y medición), `js/asistente.js` (buscador de respuestas, no es IA),
  `js/webmcp.js`, `vercel.json` (cabeceras y redirecciones, **sin** `routes`).
- **Herramientas usadas:** script de auditoría estática propio (metadatos, enlaces, precios, textos, JSON-LD,
  imágenes), `scripts/verifica-api.py` (8 controles), analizador de HTML, axe-core 4.10.2 en los **dos**
  modos (con y sin `prefers-reduced-motion`), Playwright contra producción (red, consola, LCP, CLS, objetivos
  táctiles), `curl` para cabeceras y redirecciones, y la propia convocatoria del Instituto de Fomento.
- **Medido en producción antes de los cambios** (sin consentimiento previo, 31 páginas): 0 conexiones a
  terceros, 0 errores de consola (salvo los 2 bloqueos de Google intencionados), 0 respuestas 4xx/5xx, LCP
  60-524 ms, CLS ≤ 0,001, peso 5-60 KB. Son medidas de laboratorio, **no** datos de campo ni de Lighthouse.

## 2. Defectos confirmados y corregidos

| # | Gravedad | Dónde | Evidencia | Corrección | Prueba |
|---|---|---|---|---|---|
| 1 | **Alta · privacidad** | `/privacidad/` | «Este sitio web no dispone de formularios de contacto», y desde el 08/10 existe `/presupuesto/` | Párrafo reescrito: el formulario no envía ni guarda nada, solo compone el mensaje de WhatsApp | Lectura del texto y comprobación de que el formulario no hace peticiones de red con los datos |
| 2 | **Alta · privacidad** | `/privacidad/` | Google Analytics 4 está activo y no figura entre los destinatarios | Añadido; añadida también la línea del proveedor de IA para el diagnóstico | Cruce con la tabla de `/cookies/` y con `RS_CONFIG` |
| 3 | Media · privacidad | `/cookies/` | «Meta … todavía no activados»; el píxel de Meta se activó el 29/09 | Reescrito: Meta activo, TikTok sin activar | Cruce con `consent.js` |
| 4 | Baja · legal | 3 páginas legales | Fechas de «29 y 27 de agosto» | Actualizadas a 09/10/2026; aviso legal incluye consultoría de IA | — |
| 5 | **Alta · conversión** | `/landing-page/` | «Ampliar cuesta … (300€)» y «300€ más»; hoy son 100€ (esencial) o 600€ (corporativa) | Corregido en el texto visible **y** en el JSON-LD de la FAQ | FAQ visible = JSON-LD (6 de 6) |
| 6 | **Alta · honestidad** | `/automatizacion/`, `/panel-de-negocio/` | «hasta 12 personas, tres tuk tuks»; el formulario público de TukTuk dice 28 personas y 7 tuk tuks | Cifras retiradas | `grep` sin resultados |
| 7 | **Alta · UX móvil** | todas las páginas con menú | El botón del menú mide 22-31 px de ancho en móvil (producción) | `flex:none; min-width:44px` | Medido en táctil emulado: 44×44 |
| 8 | Media · accesibilidad | pie, migas, «Preferencias de cookies» | Objetivos de 15-24 px de alto frente a los 44 px del proyecto | Áreas táctiles de 44 px en pantallas táctiles | De ~26 objetivos pequeños por página a 0-1, luego 0 |
| 9 | Media · UX móvil | 20 páginas | Desbordamiento horizontal a 340 px (20 px) y 320 px (40 px), **ya existente** | Icono del botón oculto <380 px y logotipo compacto <350 px | 0 desbordes a 320, 340, 350, 360, 375 y 390 px en 31 páginas |
| 10 | Alta · conversión | `js/asistente.js` | «web esencial» y «web corporativa» no obtenían respuesta | Entrada nueva con los tres precios y el plazo | 19 consultas de prueba, 0 incorrectas |
| 11 | Baja · honestidad | `js/asistente.js` | No sabía contestar «¿eres una IA?» | Respuesta clara: no lo es | Consultas de prueba |
| 12 | Media · conversión | `/presupuesto/` | Sin `?s=`, el desplegable quedaba en «Consultoría de IA» (primera opción) | Por defecto «Todavía no lo sé» | 6 casos probados; 23 de 23 opciones preseleccionan |
| 13 | Media · infraestructura | `vercel.json` | `www.ruiperezstudio.es` responde 200 en vez de redirigir | Redirección 308 a `ruiperezstudio.es` | Ver §5 (se verifica tras desplegar) |
| 14 | Baja · SEO | home y `/tarjeta-nfc-resenas/` | Títulos de 64 y 63 caracteres (se truncan) | 59 y 47 caracteres; Open Graph y Twitter a juego | Script de longitud |
| 15 | Baja · SEO | `sitemap.xml` | `lastmod` de agosto en páginas modificadas | `lastmod` real | 23 URLs |
| 16 | Baja · datos | `llms.txt`, `api/servicios.json` | «5,0★ con 7 reseñas»; API «actualizado 08/10» | 11 reseñas (comprobado 04/10); API 09/10 | `verifica-api.py` |

## 3. Descartado tras revisarlo (falsos positivos, para que nadie los «arregle»)

- Reseñas con «profesional», «nuestra página web»: son **citas literales** de clientes.
- «Nadie puede garantizar eso» en `/meta-ads/`: es la refutación de una promesa, no una promesa.
- `Informe de septiembre · 312€ invertido` en `/meta-ads/`: está etiquetado «Las cifras son de muestra, no de un cliente».
- «Servicios profesionales» y «Autónomo o profesional»: etiquetas de sector, no el adjetivo vacío.
- «a medida» en `/aplicaciones-web/`: lleva el ejemplo al lado y es la forma en que se busca el servicio.
- Canonical de la home sin barra final: coincide con el sitemap. Páginas `noindex` sin canonical: correcto.
- `/img/logo-cliente.png` «inexistente»: es un comentario HTML.
- `www` y las 8 redirecciones de páginas fusionadas son **308**, no 301 (equivalentes para Google).

## 4. No se puede comprobar con el código o sin acciones de Álvaro

| Tema | Por qué importa | Qué hace falta |
|---|---|---|
| **Plan de Vercel** | La web dice que el alojamiento «no tiene coste». Si la cuenta es Hobby, ese plan es para uso **no comercial**; el equipo se llama «ruiperezz's projects» (nombre por defecto de cuentas personales) y la API no devuelve plan. **Probable, no confirmado** | Mirar vercel.com → Settings → Billing. Si es Hobby, pasar a Pro antes de invertir en anuncios |
| **Tienda online: Shopify y WooCommerce** | La FAQ de `/tienda-online/` los menciona y no aparecen en ningún otro sitio (API, ficha, casos). Alameda está hecha a medida | Decidir si se ofrecen. Si no, quitar esa respuesta |
| **«5€/producto» y «50 productos»** | Precios que no están en la tabla oficial ni en la API | Confirmar o retirar |
| **Reseñas: 5,0★ y 11** | Windsor tiene las lecturas pausadas | Comprobar en la ficha; última lectura real 04/10 |
| **Panel de TukTuk** | La leyenda dice «3 disponibles» y la flota son 7 | Abrir el panel y bloquear 4-7 tuk tuks de un día |
| **Alta fiscal** | Se vende consultoría y formación | Confirmar con la gestoría que el alta (IAE/CNAE) las cubre |
| **Permiso de TukTuk y Alameda** | Es verbal y condicionado a que su web siga activa | Un WhatsApp de confirmación |
| **Proveedor de IA del diagnóstico** | La web promete un servicio «cuyas condiciones no permiten entrenar con tus datos» | Elegirlo, comprobar esas condiciones y nombrarlo antes del primer cliente |
| **Cumplimiento legal** | Una inspección automática no lo demuestra | Revisión de un profesional; los textos legales de esta auditoría son correcciones de hechos, no asesoría |
| **Indexación, Core Web Vitals de campo, conversiones** | No hay datos reales | Search Console y GA4 pasadas unas semanas |

## 5. Antes de gastar en Google Ads (lista de cierre)

1. Vincular Google Ads con GA4 e importar `generate_lead`. Al activar Google Ads, **actualizar `/cookies/` y `/privacidad/`** (cookies `_gcl_*` y el destinatario) el mismo día.
2. Verificar el dominio en Meta (la meta-etiqueta **todavía no está** en la web; Álvaro pasa la línea).
3. Confirmar el plan de Vercel (§4).
4. Reescribir la publicación de la ficha de Google que dice «acabo de bajarlos» y corregir «Floistería» en Instagram (el conector no edita).
5. Probar un contacto real de extremo a extremo desde un anuncio de prueba.

## 6. Lo que NO se ha tocado, por ser decisión de Álvaro

Precios y condiciones comerciales (solo se corrigió la diferencia de la landing, que era una contradicción
con la tabla oficial), NIF y domicilio del aviso legal, el contenido de los testimonios, la estructura de
packs, y el copy salvo los cuatro casos de §2.

## 7. Pasada final antes de Google Ads y Meta Ads (09/10/2026, tarde)

| # | Prioridad | Hallazgo | Qué se hizo | Prueba |
|---|---|---|---|---|
| 1 | P1 · medición | Solo existían `generate_lead` y `Contact`; no se distinguía interés de intención | Añadidos `view_service`, `click_primary_cta`, `form_start`, `email_click`, `phone_click`, `view_project` y `ViewContent` de Meta. `generate_lead` se documenta como **intención** (WhatsApp abierto), no como mensaje enviado | Red interceptada: rechazo = 0 eventos y 0 terceros; aceptar = 1 evento de cada, sin datos personales; solo analítica = sin Meta |
| 2 | P1 · confianza | La home comparaba con «agencias» y «freelances» con generalizaciones sin fuente (WordPress con plantilla, sin código, sin automatización…) | Sustituido por ventajas propias comprobables y por una invitación a comparar punto por punto; FAQ y asistente alineados; `/aplicaciones-web/` y `/sobre-mi/` sin la jerga de «oficina y doce sueldos» | FAQ visible = JSON-LD en todas las páginas |
| 3 | P1 · coherencia | `/casos/` decía «ninguno es una maqueta… con gente comprando» sobre tres demos | Reescrito: dos clientes, tres demos, uno propio | Lectura |
| 4 | P2 · plazos | Landing decía «1 semana» y «1-2 semanas»; automatización y chatbot sin plazo | Landing en 1-2 semanas; automatización y chatbot: «plazo cerrado por escrito antes de empezar» (sin inventar uno) | `verifica-api.py` |
| 5 | P2 · accesibilidad | `/cookies/` en móvil: tres tablas con scroll sin foco de teclado | `tabindex="0"` y etiqueta accesible | axe a 390 y 1280 px |

**Medido en producción el 09/10/2026** (navegador, sin estrangular la red, contexto limpio; son datos de laboratorio, **no** de campo ni Lighthouse):
LCP 84–264 ms, CLS 0–0,003, 8–10 peticiones y 7–163 KB transferidos en las 9 páginas probadas (móvil 390 y escritorio 1280).
axe-core 4.10.2, WCAG 2.1 A y AA, `prefers-reduced-motion`: **0 violaciones en 31 de 31 páginas a 1280 px y en 30 de 31 a 390 px** (la restante era el punto 5, ya corregido).
Recorrido de pago completo (landing con UTM → aceptar → CTA → formulario → enviar): validación sin datos no abre WhatsApp; caracteres especiales bien codificados; teléfono correcto; `ref: meta-auto-oct` solo con consentimiento de publicidad; `generate_lead` y `Contact` una sola vez.

**Pendiente en vivo (necesita tus accesos):** GA4 DebugView y «Probar eventos» de Meta con una visita de prueba; importar `generate_lead` en Google Ads; verificar el dominio en Meta; Search Console para indexación; revisión jurídica de la política de cookies y privacidad (esta auditoría no declara cumplimiento).
