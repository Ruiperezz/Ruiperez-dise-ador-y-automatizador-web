# Mantenimiento de ruiperezstudio.es

> Encargo permanente para quien lleve el mantenimiento recurrente (Cowork o
> cualquier sesión de Claude con el repositorio y el conector de Windsor.ai).
> **Lee `CLAUDE.md` entero antes de tocar nada.** Es la fuente de verdad del
> proyecto y este documento no la sustituye.

**Ámbito: solo ruiperezstudio.es.** Los mantenimientos de clientes (Alameda,
TukTuk, Finca Doña Carmen) los lleva Álvaro directamente con cada cliente. La
única excepción es la comprobación diaria de que sus webs siguen en pie (punto 1),
porque /casos/ promete que se pueden abrir.

---

## Antes de nada, en cada sesión

Tres reglas que no se saltan nunca:

1. **No inventes clientes, cifras, testimonios ni proyectos.** Si falta un dato,
   escribe `[PEDIR A ÁLVARO]` y sigue.
2. **Primera persona del singular en todo.** Nunca «nosotros», «gestionamos» ni
   «nuestro equipo». El trato directo es el diferenciador y el plural lo desmiente.
3. **Nunca prometas cumplimiento legal garantizado** en accesibilidad. Ni
   «100% conforme», ni «sin riesgo de multa».

Si algo de lo que te piden contradice `CLAUDE.md`, **para y avisa** en vez de
decidir por tu cuenta.

### Lo que necesitas conectado

| Qué | Para qué |
|---|---|
| El repositorio (público, se clona sin credenciales) | Todo lo de la web |
| Conector **Windsor.ai** (`google_my_business`) | Ficha de Google: publicaciones, reseñas, servicios |
| Conector **Windsor.ai** (`searchconsole`) | Posiciones y consultas. Solo lectura |
| Conector **Vercel** | Estado de despliegues, errores y vuelta atrás de un despliegue roto |

Ficha de Google: `locations/10546771556631248285`
Requiere que Álvaro tenga activado *Settings → API Access → Enable write actions*
en Windsor. Si da error de escritura, es eso.

### Límite de red de las sesiones en la nube

Desde las sesiones en la nube **no se puede hacer `curl`** a los dominios de las
webs, ni a `api.indexnow.org`, ni a la API de PageSpeed: el proxy los rechaza con
un 403 (comprobado el 23/09/2026). Para comprobar las webs se usa:

- `web_fetch_vercel_url` del conector de Vercel para las alojadas en Vercel
  (ruiperezstudio.es, tuktukcartagena.com, floristeriaalameda.com), que devuelve
  el código de estado.
- `WebFetch` para zenconfort.es, que no está en Vercel.

El aviso a IndexNow (punto 10) hay que hacerlo desde el Mac de Álvaro o desde
una sesión que sí tenga salida a ese dominio.

---

## Cada día · 9:00

### 1. Que las webs sigan en pie

```
ruiperezstudio.es          Vercel · ruiperez-dise-ador-y-automatizador-web
tuktukcartagena.com        Vercel · tuk-tuk-cartagena-web
floristeriaalameda.com     Vercel · floristeria-alameda
zenconfort.es              fuera de Vercel (Shopify headless)
```

«Correctamente» es: responde 200, el HTML trae el contenido real (título y texto
de la home, no una página de error ni una en blanco) y el último despliegue de
producción en Vercel está en `READY`.

**Si una falla, primero lo arreglas tú y luego Álvaro comprueba:**

- **Despliegue roto en Vercel** (el último de producción está en `ERROR`, o la web
  da 5xx desde un despliegue nuevo): vuelve al último despliegue `READY` anterior
  con el conector de Vercel. Es reversible y no toca el código.
- **Fallo en el código** que no se arregla volviendo atrás: prepara la corrección
  en una rama y el diff. **No hagas merge ni push a `main`.**
- **Fuera de tu alcance** (dominio, DNS, certificado, Shopify, pasarela de pago):
  diagnostica y dile exactamente qué ha pasado y qué tiene que hacer él.

En todos los casos, la primera línea del informe es `CAÍDA: <web> — <error>` para
que la notificación del móvil diga qué pasa sin abrirla. Si todo está bien, una
sola línea: `Las 4 webs en pie`.

### 2. Reseñas nuevas · en menos de 24 horas

La misma tarea diaria las revisa. Respóndelas **una a una y sin plantilla**. Lee
las respuestas anteriores para mantener el tono: directo, sin adular y mencionando
algo concreto de lo que dice quien escribe.

- **4 o 5 estrellas:** publícala directamente con `reply_to_review`.
- **1 a 3 estrellas:** no la publiques sola. Redáctala y mándasela a Álvaro. Una
  respuesta pública a una queja, escrita sin él, puede empeorar el problema.

---

## Cada semana · lunes

### 3. Una publicación en la ficha de Google

Conector `google_my_business`, acción `create_local_post`.

- **Antes de escribir, lee las publicaciones que ya hay** para no repetir tema ni
  contradecir nada.
- **Rota el tipo:** un servicio, un proyecto real, una duda frecuente, un dato del
  sector. Nunca dos seguidas del mismo tipo.
- **Proyectos:** solo se presentan como clientes TukTuk Cartagena, Floristería
  Alameda y Finca Doña Carmen. Casa del Sushi, Belu y Buccaro, como trabajo
  entregado, nunca como clientes.
- **Imágenes: solo JPG o PNG, desde `/img/gbp/`.** Google rechaza WebP y todas las
  capturas del sitio son WebP. Mínimo 250×250 y 10 KB, y la URL tiene que ser
  pública.
- CTA `LEARN_MORE` apuntando a la página del sitio que corresponda.
- **Enséñale el texto a Álvaro antes de publicar.** Sale a su nombre en un perfil
  verificado.

---

## Cada dos semanas (lunes de semana ISO par)

### 4. Consultas a punto de entrar en primera página

En Search Console, busca las que estén **entre la posición 8 y la 20**. Son las que
con un empujón pasan a página 1; por debajo de la 20 el esfuerzo no compensa.

Propón qué página tocar y qué cambiar. **No lo cambies sin que Álvaro lo apruebe.**

---

## Cada mes · día 1

### 5. Los enlaces de /casos/ que no son clientes

casa-del-sushi.vercel.app y belu-francia-fisioterapeuta.vercel.app no entran en la
comprobación diaria, pero /casos/ promete que se pueden abrir. Si una cae, hay que
quitar el enlace o avisar a Álvaro el mismo día.

### 6. Los enlaces de vuelta

Comprueba que siguen en los pies de tuktukcartagena.com, floristeriaalameda.com y
zenconfort.es, y **sin `rel="nofollow"`**. Son los únicos enlaces externos que
tiene el dominio. Solo se comprueba: si falta uno, se avisa a Álvaro.

### 7. Métricas

Ficha de Google y Search Console. Tres líneas a Álvaro: impresiones, clics, y qué
consulta ha subido o bajado más. Nada más.

---

## Cada tres meses

### 8. axe-core sobre las 20 páginas

Reglas `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`. **Tiene que dar cero violaciones.**

**Esto no es cosmético.** `/accesibilidad-web/` afirma por escrito que el sitio no
tiene ni una y le dice al visitante que lo compruebe con la extensión axe DevTools.
Si se rompe una regla, Álvaro deja de poder vender accesibilidad. Si aparece
alguna: **arréglala en una rama y avisa el mismo día.**

Cómo se mide: servir el repo con `python3 -m http.server`, abrir cada página con
Chromium headless (Playwright, en `/opt/pw-browsers/chromium`), inyectar
`axe-core@4.10.2` con `addScriptTag` y llamar a `axe.run(document, …)` con esas
cuatro etiquetas.

### 9. Lighthouse móvil

Home y dos páginas de servicio. **Referencia a batir:** rendimiento 98,
accesibilidad 100, buenas prácticas 100, SEO 100. Desde la nube se mide sobre el
repo servido en local, porque producción no es accesible; dilo en el informe.

### 10. Precios frente a la competencia

Álvaro tiene los precios **por debajo de mercado a propósito** mientras se da a
conocer, y la idea es subirlos. Revisa qué cobran otros en el sureste y dile
cuándo toca.

---

## Siempre que cambie una URL o una página

### 11. Avisar a Bing con IndexNow

```
POST https://api.indexnow.org/indexnow
Content-Type: application/json; charset=utf-8

{"host":"ruiperezstudio.es","key":"<la de CLAUDE.md>",
 "keyLocation":"https://ruiperezstudio.es/<la clave>.txt",
 "urlList":[ … ]}
```

Respuesta 200 o 202 = aceptado. 403 = la clave no coincide con el archivo.
Desde la nube no hay salida a ese dominio: ver «Límite de red».

### 12. Actualizar `llms.txt`

**No se sincroniza solo.** Si cambia un precio, un proyecto o un servicio, cámbialo
también ahí. Es lo que leen los modelos de lenguaje para resumir el negocio.

### 13. Actualizar `CLAUDE.md`

Si cambia un precio, un cliente o una regla del proyecto.

---

## Lo que se rompe en silencio

Revisa esto **cada mes**. Ninguna de estas cosas avisa cuando falla.

| Qué | Qué pasa si falla |
|---|---|
| El archivo de IndexNow en la raíz | Bing deja de aceptar los avisos y no lo dice en ningún sitio |
| Las 8 redirecciones 301 de `vercel.json` | Cuatro URLs antiguas empiezan a dar 404 |
| El dominio (~12€/año) | Avisa a Álvaro **dos meses antes**. Fecha de renovación: `[PEDIR A ÁLVARO]` |
| El consentimiento de cookies | Caduca a los 24 meses y se vuelve a pedir solo. Es correcto, no lo toques — pero verás una caída en analítica que **no es un fallo** |

---

## Cuando Álvaro ponga el píxel de Meta

**Actualiza la tabla de `/cookies/` en el mismo commit.** Si la web carga un píxel
nuevo y la política de cookies no lo declara, es un incumplimiento de RGPD, no un
detalle pendiente. Y marca `Contact` como conversión personalizada en Meta Events
Manager: si el objetivo de campaña se queda en «tráfico», toda la medición que hay
montada no sirve de nada.

---

## Tareas programadas (Cowork)

| Tarea | Cuándo (hora de Madrid) | Qué hace |
|---|---|---|
| Diario | todos los días, 9:00 | Puntos 1 y 2 |
| Semanal | lunes, 9:00 | Punto 3, y el 4 en semanas pares |
| Mensual | día 1, 9:00 | Puntos 5–7 y «Lo que se rompe en silencio» |
| Trimestral | 1 de marzo, junio, septiembre y diciembre, 9:00 | Puntos 8–10 |

Se ejecutan en la nube: no necesitan el Mac encendido. Para que las que publican
(reseñas, vuelta atrás de un despliegue) no se queden esperando, Álvaro tiene que
activar *Automatically approve* en sus ajustes.

---

## Cómo reportar

Un resumen corto **cada lunes**: qué hiciste, qué encontraste roto y qué necesitas
de él. **Si no hay nada, dilo en una línea.** No inventes actividad para justificar
el informe.
