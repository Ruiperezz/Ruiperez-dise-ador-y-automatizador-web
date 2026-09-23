# PLAN — Auditoría de accesibilidad web (EAA / Ley 11/2023)

> **FASE 0 completada. Esto es el plan. No se ha escrito una línea de código.**
> Rama: `feat/accesibilidad-web`. Nada se toca hasta que Álvaro apruebe.
> No sustituye a `PLAN.md`, que es el registro del rediseño de agosto.

---

## 0. Lo primero: el encargo está escrito para otro proyecto

El encargo da por hecho un stack que **este repositorio no tiene**. No es un detalle
de forma: afecta a la mitad de las instrucciones.

| El encargo pide | Aquí hay | Consecuencia |
|---|---|---|
| `content/servicios/accesibilidad.ts` | 0 archivos `.ts` | No hay build que compile un `.ts` |
| «nunca hardcodeados en el JSX» | 0 archivos `.jsx` | No hay JSX |
| Rutas tipo `/servicios/...` | Carpeta por ruta en la raíz | La convención es `/accesibilidad-web/` |
| Componentes reutilizables | 0 componentes: HTML duplicado | Reutilizo clases CSS, no componentes |
| Build sin errores de TypeScript ni ESLint | Sin `package.json`, sin `node_modules` | No hay build que pueda fallar |
| Endpoint `/api/scan` | 0 endpoints, sitio 100% estático | Sería el primer código de servidor del proyecto |
| Almacenar leads | Ninguna base de datos | Sería el primer dato personal almacenado |
| i18n | Solo `es` y `x-default` | No aplica |

**Esto no bloquea la FASE 1.** La página de servicio se puede hacer hoy y encaja
perfectamente con lo que ya existe. Lo que cambia de raíz es la FASE 2.

---

## 1. Lo que he encontrado (FASE 0)

**Stack:** HTML + CSS + JS estático puro. Sin framework, sin npm, sin bundler, sin
paso de build. Cada página es un `index.html` con **todo el CSS en línea** (35 KB en
la home). Solo 2 archivos JS externos: `js/consent.js` y `js/asistente.js`.

**Rutas:** una carpeta por URL con su `index.html`. 19 páginas. Servicios en la raíz
(`/tienda-online/`, `/automatizacion/`…), no bajo `/servicios/`.

**Componentes:** no existen. El pie está **duplicado en 17 archivos**. Lo que se
reutiliza son clases CSS por convención: `.hero` (16 páginas), `.sec-hd` (13),
`.faq` (12), `.inc` (12), `.pbox` (11), `.caso` (11), `.proc` (10), `.btn-p` (14).

**Dónde vive un servicio:** en cuatro sitios a mano y hay que tocar los cuatro.
1. Su `carpeta/index.html`
2. Tarjeta en la home, sección `#servicios` (hoy 10 tarjetas)
3. Enlace en el pie de 14 páginas
4. `sitemap.xml` y la base de conocimiento de `js/asistente.js`

**SEO:** metadatos escritos a mano en cada `<head>` (title, description, canonical,
11 etiquetas `og:`, 5 `twitter:`, 2 bloques JSON-LD). `sitemap.xml` a mano, 17 URLs.

**Formularios: no hay ninguno.** Cero `<form>` en todo el sitio. Los 16 CTA salen por
`wa.me`. No hay `/api`, ni base de datos, ni ningún dato personal almacenado hoy.

---

## 2. FASE 1 — Página de servicio

### Ruta
`/accesibilidad-web/` — en la raíz, como los otros diez servicios. **No**
`/servicios/accesibilidad-web`, que rompería la convención de las 19 páginas.

### Archivos a crear
- `accesibilidad-web/index.html`

### Archivos a modificar (mínimo imprescindible, como pides)
- `index.html` — tarjeta en `#servicios` (pasa de 10 a 11)
- Pie de las 14 páginas que lo llevan — **el pie tiene que ser idéntico en todas**
- `sitemap.xml` — de 17 a 18 URLs
- `js/asistente.js` — entrada en la `KB`, o el asistente mandará a WhatsApp una
  pregunta que la web ya responde
- `CLAUDE.md` — tabla de precios oficial
- `llms.txt` — no se sincroniza solo

### Qué reutilizo en vez de duplicar
`.hero` + `.hbadge` + `.hh1` + `.hsub` + `.hctas` + `.htrust` · `.sec-hd` + `.ey` ·
`.inc` (lista de «qué incluye») · `.proc` (los pasos) · `.pbox` + `.p-amt` + `.iva`
(precio) · `.faq` + `.fq` + `.fa` · `.caso` + `.caso-g` · pie y cabecera completos ·
`consent.js` y `asistente.js`.

**Diseño: cero CSS nuevo salvo lo estrictamente necesario.** Si hace falta algo, va
en el `<style>` de esa página, como en el resto.

### Sobre los precios en un fichero de configuración
**Recomiendo no hacerlo, y lo argumento.** Sin build, un `.ts` no se puede leer. La
única alternativa sería pintar los precios con JavaScript, y eso los deja **invisibles
para Google y para los modelos de IA**, que es justo lo contrario de lo que
perseguimos con `llms.txt`. Los precios se quedan en el HTML y la fuente de verdad es
la tabla de `CLAUDE.md`, como los otros diez servicios.

### Copy — reglas que aplico
Las tuyas, más las que ya rigen en el proyecto:
- Nunca «cumplimiento garantizado», «100% conforme» ni «sin riesgo de multa»
- Primera persona del singular (regla nº1 del proyecto: nada de «nosotros»)
- Prohibidas: `soluciones`, `profesional`, `calidad`, `a medida` sin ejemplo al lado
- Cero clientes, logos, testimonios o casos inventados

> ⚠️ **Contradicción con tu encargo:** pides «Cómo trabajamos» y «Lo que no hacemos»,
> en plural. Aquí todo va en singular. Serán **«Cómo trabajo»** y **«Lo que no hago»**.

### Premisas legales — verificadas
- **Ley 11/2023, de 8 de mayo**, transpone la Directiva (UE) 2019/882 (EAA) ✔
- **Título I en vigor desde el 28 de junio de 2025** ✔
- **Exención de microempresa:** menos de 10 empleados **y** volumen de negocio anual
  que no supere los 2 millones. Aplica a **prestadores de servicios**, no a productos ✔
- ⚠️ **Falta un matiz en tu encargo:** hay **régimen transitorio**. Los contratos de
  servicios firmados antes del 28/06/2025 pueden seguir hasta agotarse, **como máximo
  hasta el 28 de junio de 2030**. Sin esto, la sección «¿te aplica?» exagera la
  urgencia — y exagerar urgencia legal es justo lo que no queremos vender.

### SEO
`title` < 60 · `description` < 155 · canonical · JSON-LD `Service` + `FAQPage` con
**paridad literal** con el FAQ visible (regla del proyecto). Enlace desde la home, el
pie y el sitemap.

### Accesibilidad de la propia página
La página es el producto, así que se audita más duro que ninguna: un solo `<h1>`,
jerarquía sin saltos, `lang="es"`, contraste 4.5:1 y 3:1, foco visible, nada de divs
clicables, `prefers-reduced-motion`.

> ⚠️ **El skip link no existe hoy en ninguna de las 19 páginas.** Si lo añado solo
> aquí, la página que vende accesibilidad será la única accesible del sitio y
> cualquiera que audite lo verá. **Propongo añadirlo a las 19**, aunque salga del
> alcance que has marcado. Necesito tu OK: son ~20 líneas y toca todas las páginas.

---

## 3. FASE 2 — El escáner. Aquí hay que hablar.

Esto no es «una fase más». Es **el primer código de servidor y el primer dato
personal almacenado** en la historia del proyecto, y rompe tres reglas de `CLAUDE.md`.

### Lo que arrastra, en cadena

1. `/api/scan.js` → obliga a `package.json` → **se acaba el «sin npm, sin build»**
2. axe-core necesita un navegador real → Playwright o Puppeteer + `@sparticuz/chromium`
3. **Riesgo real de timeout:** en el plan Hobby de Vercel una función tiene ~10 s.
   Arranque en frío del Chromium (2-5 s) + carga de la página + axe se come ese
   presupuesto a menudo. **Un escáner que falla la mitad de las veces vende lo
   contrario de lo que quieres vender.**
4. Guardar leads → base de datos → **nuevo tratamiento de datos personales**:
   actualizar la política de privacidad, registro de actividades de tratamiento,
   contrato de encargado con el proveedor, plazo de conservación y procedimiento de
   supresión. Nada de eso existe hoy porque hoy no se guarda nada.
5. La CSP de `vercel.json` habría que tocarla

### La alternativa que recomiendo para la v1

**Escáner con persona detrás, no automático.** Formulario → te llega la URL → pasas
axe tú → le mandas el informe.

Por qué es mejor ahora mismo:
- **Cero infraestructura, cero RGPD nuevo** más allá del propio formulario
- **Convierte más:** un informe que le mandas tú abre conversación; uno automático
  se lee y se cierra
- **No te expone:** un escáner automático que se equivoca sobre el cumplimiento legal
  de un tercero es un problema tuyo, no suyo
- **Tú vendes que los overlays automáticos no valen.** Un escáner automático como
  gancho contradice tu propio argumento

Si el volumen lo justifica, se automatiza después con la interfaz `ScannerProvider`
que propones — que es buena idea y la dejo definida.

### Si aun así quieres el automático
Lo hago, pero entonces: `package.json`, proveedor externo de escaneo en vez de
Chromium propio (por los timeouts), plan Vercel Pro, y **la FASE 2 se convierte en un
proyecto aparte con su propio plan legal**. No lo meto de rondón en esta rama.

### Lo que sí está bien pensado en tu encargo
El bloqueo de SSRF (localhost e IPs privadas), el rate limit por IP, la casilla **no
premarcada**, guardar el texto exacto de la casilla y la versión de la política como
prueba, y no guardar el email si no hay casilla marcada. Todo eso es correcto y se
mantiene sea cual sea el camino.

---

## 4. Decisiones que necesito que confirmes

1. **¿Ruta `/accesibilidad-web/` en la raíz?** (rompo tu `/servicios/...` para no
   romper la convención de las 19 páginas)
2. **¿Precios en el HTML** en vez de en un fichero de configuración, por lo del SEO?
3. **¿Añado el skip link a las 19 páginas** o solo a la nueva?
4. **FASE 2: ¿manual primero o automático desde el día uno?**
5. **¿Cuál es el precio del servicio?** No me lo has dado (ver placeholders)
6. **¿Va al asistente y a `llms.txt`?** Yo digo que sí, pero es tocar fuera del
   alcance que has marcado

---

## 5. Placeholders pendientes

| Placeholder | Qué falta |
|---|---|
| `{{PRECIO_AUDITORIA}}` | Precio de la auditoría puntual |
| `{{PRECIO_CORRECCION}}` | Precio de aplicar las correcciones |
| `{{PRECIO_MONITORIZACION}}` | Cuota mensual de monitorización |
| `{{PLAZO_AUDITORIA}}` | Cuántos días tardas en entregar el informe |
| `{{QUE_ENTREGAS}}` | Qué recibe exactamente: ¿PDF? ¿lista priorizada? ¿evidencias? |
| `{{EMAIL_CONTACTO}}` | Hoy todo va por WhatsApp. ¿Este servicio también? |
| `{{EXPERIENCIA_PREVIA}}` | **¿Has hecho ya alguna auditoría de accesibilidad?** Si no, la página no puede insinuar experiencia que no hay |

---

## 6. Orden de trabajo propuesto

1. Apruebas las seis decisiones y me pasas los placeholders
2. FASE 1: la página + los seis archivos que toca. Commits pequeños
3. FASE 3 sobre la FASE 1: axe-core sin violaciones critical ni serious, Lighthouse
   accesibilidad ≥ 95 y SEO ≥ 95, recorrido de teclado documentado
4. Paras, revisas y decides si hay FASE 2 y de qué tipo
