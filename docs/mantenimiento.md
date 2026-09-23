# Mantenimiento de ruiperezstudio.es

> Encargo permanente para quien lleve el mantenimiento recurrente (Cowork o
> cualquier sesión de Claude con el repositorio y el conector de Windsor.ai).
> **Lee `CLAUDE.md` entero antes de tocar nada.** Es la fuente de verdad del
> proyecto y este documento no la sustituye.

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
| El repositorio | Todo lo de la web |
| Conector **Windsor.ai** (`google_my_business`) | Ficha de Google: publicaciones, reseñas, servicios |
| Conector **Windsor.ai** (`searchconsole`) | Posiciones y consultas. Solo lectura |

Ficha de Google: `locations/10546771556631248285`
Requiere que Álvaro tenga activado *Settings → API Access → Enable write actions*
en Windsor. Si da error de escritura, es eso.

---

## Cada semana · lunes

### 1. Una publicación en la ficha de Google

Conector `google_my_business`, acción `create_local_post`.

- **Antes de escribir, lee las publicaciones que ya hay** para no repetir tema ni
  contradecir nada.
- **Rota el tipo:** un servicio, un proyecto real, una duda frecuente, un dato del
  sector. Nunca dos seguidas del mismo tipo.
- **Imágenes: solo JPG o PNG, desde `/img/gbp/`.** Google rechaza WebP y todas las
  capturas del sitio son WebP. Mínimo 250×250 y 10 KB, y la URL tiene que ser
  pública.
- CTA `LEARN_MORE` apuntando a la página del sitio que corresponda.
- **Enséñale el texto a Álvaro antes de publicar.** Sale a su nombre en un perfil
  verificado.

### 2. Reseñas nuevas

Respóndelas en **menos de 48 horas**, una a una y sin plantilla. Lee las
respuestas anteriores para mantener el tono: directo, sin adular y mencionando
algo concreto de lo que dice quien escribe.

---

## Cada dos semanas

### 3. Consultas a punto de entrar en primera página

En Search Console, busca las que estén **entre la posición 8 y la 20**. Son las que
con un empujón pasan a página 1; por debajo de la 20 el esfuerzo no compensa.

Propón qué página tocar y qué cambiar. **No lo cambies sin que Álvaro lo apruebe.**

---

## Cada mes · día 1

### 4. Los tres mantenimientos

Floristería Alameda, TukTuk Cartagena y Finca Doña Carmen. **100€/mes cada uno por
hasta 10 cambios.** Pregúntale a Álvaro qué toca y cuántos cambios lleva cada
cliente, para que no se pase de diez sin cobrarlos.

### 5. Que las webs del portfolio sigan en pie

`/casos/` promete que se pueden abrir. Si una cae, la promesa se rompe y hay que
quitarla el mismo día.

```
tuktukcartagena.com
floristeriaalameda.com
casa-del-sushi.vercel.app
belu-francia-fisioterapeuta.vercel.app
zenconfort.es
```

### 6. Los enlaces de vuelta

Comprueba que siguen en los pies de las webs de clientes y **sin `rel="nofollow"`**.
Son los únicos enlaces externos que tiene el dominio. Si alguien rediseña su web,
desaparecen sin avisar a nadie.

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
alguna: **arréglala y avisa el mismo día.**

Cómo se mide (axe no acepta el documento de un iframe, hay que inyectarlo en la
página): copiar cada `index.html` a una carpeta temporal añadiendo antes de
`</body>` un `<script src="/axe.min.js">` y un runner que llame a `axe.run(document, …)`
y escriba el resultado en el DOM; después servir y volcar con Chrome headless.

### 9. Lighthouse móvil

Home y dos páginas de servicio. **Referencia a batir:** rendimiento 98,
accesibilidad 100, buenas prácticas 100, SEO 100.

### 10. Precios frente a la competencia

Álvaro tiene los precios **por debajo de mercado a propósito** mientras se da a
conocer, y la idea es subirlos. Revisa qué cobran otros y dile cuándo toca.

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
| El dominio (~12€/año) | Avisa a Álvaro **dos meses antes** |
| El consentimiento de cookies | Caduca a los 24 meses y se vuelve a pedir solo. Es correcto, no lo toques — pero verás una caída en analítica que **no es un fallo** |

---

## Cuando Álvaro ponga el píxel de Meta

**Actualiza la tabla de `/cookies/` en el mismo commit.** Si la web carga un píxel
nuevo y la política de cookies no lo declara, es un incumplimiento de RGPD, no un
detalle pendiente. Y marca `Contact` como conversión personalizada en Meta Events
Manager: si el objetivo de campaña se queda en «tráfico», toda la medición que hay
montada no sirve de nada.

---

## Cómo reportar

Un resumen corto **cada lunes**: qué hiciste, qué encontraste roto y qué necesitas
de él. **Si no hay nada, dilo en una línea.** No inventes actividad para justificar
el informe.
