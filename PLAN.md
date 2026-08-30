# PLAN.md — Rediseño y corrección de ruiperezstudio.es

> Documento de trabajo del proyecto. Claude Code lo lee entero antes de tocar nada.
> Las fases se ejecutan **en orden**, con parada y aprobación humana al final de cada una.
> Estado del proyecto: **las seis fases cerradas y fusionadas en `main` el 30/08/2026.** Pendiente de `git push` (lo aprueba Álvaro).

---

## CONTEXTO

Soy Ruipérez, diseñador web freelance en Cartagena (Murcia). Mi web es `https://ruiperezstudio.es/` y es mi escaparate comercial. Vendo: webs a medida, landings, tiendas online, automatización con n8n, chatbots de WhatsApp con IA, SEO local, email marketing y mantenimiento.

**Voy a empezar a invertir en Meta Ads y TikTok Ads.** Antes de gastar el primer euro, la web tiene que estar corregida, medible y con el mensaje adecuado para tráfico frío. Se ha hecho una auditoría completa y este documento contiene los hallazgos y los cambios exactos.

Clientes reales verificables: Floristería Alameda (Cartagena, 4,9★ / 311 reseñas), Casa del Sushi (Cartagena), TukTuk Cartagena (turismo).
**Zenconfort NO es cliente: es un proyecto propio mío.**

Teléfono/WhatsApp: 642 08 40 42.

---

## HERRAMIENTAS QUE DEBES USAR

**Skills (invócalas explícitamente, no esperes a que se activen solas):**
- `auditoria-web-preads` — mi skill propia. **Léela primero, entera, incluidos los tres archivos de `references/`.** Define el orden de trabajo y los criterios de este proyecto.
- `ui-ux-pro-max` — para cualquier decisión visual. Ejecuta antes de tocar CSS:
  `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "web design agency freelance local business spain conversion" --design-system -p "RuiperezStudio"`
- `web-design-guidelines` (Vercel) — antes de tocar layout o accesibilidad.
- `vercel-optimize` — solo en la fase 6, para rendimiento.

**Subagentes VoltAgent (lánzalos en paralelo donde lo indico):**
- `code-reviewer` — revisión final de cada fase, obligatorio.
- `frontend-developer` — implementación HTML/CSS/JS.
- `ui-designer` — sistema visual y jerarquía.
- `seo-specialist` — metadatos, schema, canonicals, enlazado interno.
- `prompt-engineer` — no lo necesitas aquí, no lo lances.

**Regla de uso de subagentes:** paralelízalos solo cuando trabajen sobre archivos distintos. Nunca dos subagentes escribiendo el mismo archivo.

---

## FASE 0 — Reconocimiento (no toques nada todavía)

1. Detecta el stack real: ¿HTML/CSS/JS estático? ¿Next.js? ¿Dónde está desplegado (Hostinger, Vercel)? ¿Hay build?
2. Mapea todas las páginas y sus URLs reales.
3. Comprueba si existen: `sitemap.xml`, `robots.txt`, schema JSON-LD, GA4, algún píxel.
4. Localiza dónde vive el banner de cookies y cómo se cargan los scripts.
5. Comprueba si hay tests, linter o CI.

**Entrégame un informe de 15 líneas máximo y PARA.** No implementes nada en esta fase.

---

## FASE 1 — Errores objetivos (corrección, sin rediseño)

Estos son fallos verificados. Corrígelos exactamente como se indica.

### 1.1 Contradicción de precios en el mismo caso de estudio
- En `/diseno-web-cartagena/` el caso de Floristería Alameda aparece con **«Inversión 590€»**.
- En `/web-corporativa/` el mismo caso aparece con **«Inversión 890€»**.
- **Corrección:** el caso de Alameda es una web corporativa. En ambas páginas debe figurar **890€**. En la página de Cartagena, el bloque de precio deja de estar pegado al caso y pasa a ser un bloque de rango: «Landing desde 590€ · Web corporativa desde 890€».

### 1.2 Persona gramatical inconsistente
- La home habla en primera persona del singular («Yo lo pongo por escrito», «Te respondo yo»).
- Las páginas de servicio cambian a plural («los escribimos **nosotros**», «Lo gestionamos **nosotros**», «te acompañamos», «Configuramos»).
- **Corrección:** todo en **primera persona del singular**, en todas las páginas, sin excepción. Busca y sustituye: `nosotros`, `gestionamos`, `escribimos`, `configuramos`, `desarrollamos`, `nuestro equipo`, `te acompañamos`. Es mi único diferenciador real frente a las agencias; el plural lo desmiente.

### 1.3 «0€ de cuota mensual obligatoria» es falso
- La home lo anuncia como métrica destacada, pero el chatbot es «1.200€ **+ 120€/mes**».
- **Corrección:** cambiar la métrica a **«0€ de cuota en la web»** y añadir línea aclaratoria: «Los servicios de automatización y mantenimiento sí tienen cuota; la web no.»

### 1.4 Contradicción de hosting
- FAQ actual: «El código es tuyo al 100%… El alojamiento está gestionado por Ruipérez Studio». No dice quién paga ni qué pasa si dejo de gestionarlo.
- **Corrección:** reescribir esa respuesta declarando el coste anual aproximado del hosting, quién lo paga, y que la migración es gratuita y sin permiso previo.

### 1.5 Zenconfort presentado como cliente
- Aparece en la marquesina «Negocios que ya confían».
- **Corrección:** sácalo de ahí. Si se quiere mostrar, va en una sección aparte etiquetada «Proyecto propio».

### 1.6 Email de contacto
- El aviso legal expone `ruiperezyasociadoss@gmail.com`. Gmail + «y asociados» contradice el posicionamiento de freelance individual.
- **Corrección:** sustituir por `hola@ruiperezstudio.es` en todo el sitio. Déjame una nota recordándome que debo crear ese buzón antes del deploy.

### 1.7 Reseñas duplicadas en estructura
- Dos de los tres testimonios usan la misma plantilla («Desde el primer momento… Supo/Supieron entender perfectamente…»).
- **Corrección:** déjalos literales pero reordénalos y **añade el enlace directo a mi ficha de Google Business** bajo el bloque, con el texto «Ver las reseñas en Google». No inventes testimonios nuevos.

### 1.8 Claim «+30% más clientes» repetido 9 veces sin fuente
- **Corrección:** reducirlo a **tres apariciones máximo** (home, `/web-corporativa/`, caso de estudio) y reformularlo siempre como: **«+30% más clientes según datos del propio cliente»**. Marco legal: Ley 3/1991 de Competencia Desleal, art. 5 — la carga de la prueba es mía.

### 1.9 Rango de precios incorrecto en la tabla comparativa
- Dice «590–2.500€», pero la tienda online empieza en 1.990€ y el chatbot en 1.200€ + cuota.
- **Corrección:** cambiar a **«590–2.500€ en webs · proyectos de automatización aparte»**.

### 1.10 Comparativa con agencias sin fuente
- «Agencia tradicional 2.500–8.000€» con la nota «Precios medios del mercado en Murcia · 2026».
- **Corrección:** o se cita el método («precios publicados en las webs de N agencias de la Región de Murcia, consultados en [fecha]»), o se elimina la horquilla numérica y se deja la comparación cualitativa.

### 1.11 SEO local a 450€/mes
- Es la mitad de una web corporativa, cada mes, para un comercio de Cartagena. No es vendible y ancla mal el resto del catálogo.
- **Corrección:** bajar a **«desde 290€/mes»**.

**Al terminar:** lanza `code-reviewer` sobre el diff completo, muéstrame la lista de archivos tocados y **PARA**.

---

## FASE 2 — Medición y cumplimiento legal de cookies

**Bloqueante: sin esto no se lanza campaña.**

### 2.1 Banner y política de cookies aptos para píxeles publicitarios
El banner actual dice «Utilizamos cookies analíticas» con Aceptar/Rechazar. En cuanto se instale Meta Pixel o TikTok Pixel eso es sancionable (RGPD + LSSI art. 22.2 + guía AEPD). Implementa:
- Categorías separadas: **necesarias / analíticas / publicidad**, con toggles.
- Botón **«Configurar»** en la primera capa, al mismo nivel visual que Aceptar y Rechazar. Rechazar tan fácil como aceptar.
- **Ningún script de terceros se ejecuta antes del consentimiento.** Bloqueo real por defecto, no solo declaración. Usa `type="text/plain"` con activación tras consentimiento, o carga condicional.
- Persistencia del consentimiento y posibilidad de revocarlo desde el footer.
- Actualiza `/cookies/` con tabla: nombre, proveedor, finalidad, duración y **transferencia internacional fuera del EEE** (Meta y TikTok la implican; hay que declararla).
- Actualiza `/privacidad/` para nombrar **WhatsApp Business** como canal de contacto y encargado de tratamiento. Es el fallo más común y ahora mismo no está.

### 2.2 Píxeles y atribución
- Instala **Meta Pixel**, **TikTok Pixel** y **GA4**, todos condicionados al consentimiento de publicidad/analítica según corresponda.
- Implementa **Google Consent Mode v2**.
- **Problema crítico de atribución:** todos mis CTA van a `wa.me`. El píxel no ve esa conversión, y Meta optimizaría a «clic en enlace» trayendo tráfico basura. Implementa:
  - Evento personalizado (`Contact` / `Lead`) que dispare **antes** de la redirección a WhatsApp.
  - Parámetro de origen en la URL de WhatsApp por campaña y por página (ej. `?text=...%20[origen:meta-landing-restaurantes]`).
  - Deja documentado en `/docs/medicion.md` qué evento se dispara desde qué botón.

**Al terminar:** verifica con Meta Pixel Helper y TikTok Pixel Helper que nada dispara antes del consentimiento. Muéstrame el resultado y **PARA**.

---

## FASE 3 — Eslóganes y copy

Cada titular se puntúa 0-2 en: concreción / consecuencia para el lector / especificidad / voz humana. Menos de 5/8 se reescribe. Ver `references/rubrica-eslogan.md` de mi skill.

### Conservar sin tocar (puntuación alta)
- **«Si tu cliente no te encuentra en Google, llama al de al lado»** (7/8) — solo en la home.
- **«311 reseñas y una web que no las merecía»** (8/8) — es la mejor línea del sitio. **Súbela de posición:** debe verse antes, no a media página.
- «Tu negocio sigue atendiendo cuando tú ya has cerrado» (7/8).
- «Hoy pierdes clientes sin verlo» (7/8).
- «Cuéntame qué necesitas. Te respondo yo.»

### Reescribir (elige la opción A salvo que argumentes por la B)
| Actual | Nota | A | B |
|---|---|---|---|
| «Lo que cuesta, dicho aquí» | 3/8 | «Los precios, sin tener que llamar a nadie» | «Aquí no hay que pedir presupuesto para saber el precio» |
| «La misma calidad, sin pagar la estructura que no usas» | 4/8 | «No pagas su oficina. Pagas tu web.» | «Una agencia mantiene doce sueldos. Yo mantengo el mío.» |
| «Sabes exactamente qué pasa y cuándo» | 3/8 | «Cuatro pasos. Sabes en cuál estás en todo momento.» | «Nada se publica sin que tú lo hayas visto antes.» |
| «La web no se acaba el día que se publica» | 5/8 | «Publicar la web es el principio. Ahí empieza lo que trae clientes.» | «Una web sin mantenimiento envejece en seis meses.» |

### Prohibido en todo el sitio
`soluciones`, `a medida` sin ejemplo concreto al lado, `profesional`, `calidad`, `tu aliado digital`, `llevamos tu negocio al siguiente nivel`, `equipo multidisciplinar`.

### Cifras
Sustituye porcentajes por cifras absolutas siempre que las tenga. En negocio local «pasó de 4 a 11 pedidos por WhatsApp a la semana» se cree; «+175%» suena a marketing. Déjame huecos marcados `[PEDIR AL CLIENTE]` donde necesites el dato real. **No inventes cifras.**

**Al terminar:** enséñame los textos en diff lado a lado y **PARA**.

---

## FASE 4 — Reposicionamiento estratégico

**El problema:** mis tres argumentos principales (precio cerrado, sin cuotas, trato directo) son copiables en una tarde y ya los reclama la competencia local. Competencia verificada:

| Competidor | Entrada | Promesa |
|---|---|---|
| elGriego.NET | 180€ | Web + SEO en 1 semana, WordPress |
| Cristina Ferrís | 300€ | WordPress + plan SEO para pequeños negocios |
| a2marketingstudio (Cartagena) | 450€ | «A medida, SEO local, conocemos Cartagena» — mi mismo copy, más barato |
| Webllope (Murcia) | ~150€+ | «Sin cobrarte ni un céntimo extra mensual» — ya reclama mi diferenciador |
| Ridaly / Manxa / Studi@rte / Boox | No publican | Agencia multidisciplinar |

Mi tabla comparativa actual compara contra «agencia 2.500–8.000€» y contra «webs de 180–300€», y **esquiva la franja peligrosa: 450–900€ con discurso idéntico al mío.**

**Lo único que la competencia local no ofrece: automatización con n8n y chatbot de WhatsApp con IA.** Ahora mismo está enterrado a mitad de página.

**Cambios:**
1. Sube el bloque de **automatización e IA** por encima del bloque de webs, o al menos dale la misma jerarquía visual.
2. Reformula la propuesta central de «diseñador web barato en Cartagena» a **«te monto la web y el sistema que contesta por ti»**.
3. Reescribe la tabla comparativa para incluir una tercera columna: **«Freelance/estudio local de 450–900€»**, comparando en lo que sí me diferencia (código propio vs WordPress, automatización incluida, chatbot, entrega del código fuente).
4. Meta title de la home: quita el precio. Nuevo: `Diseño Web en Cartagena y Murcia | Código a medida y WhatsApp con IA`. Revisa el resto de titles con `seo-specialist`.

**Al terminar:** PARA y enséñame la nueva estructura de secciones antes de maquetar.

---

## FASE 5 — Landings para tráfico de pago

**Regla innegociable: nunca se manda tráfico de pago a la home.**

Mi home está escrita para intención de búsqueda («si no te encuentran en Google…»). El usuario de TikTok no buscaba nada; ese titular le rebota.

Crea **dos landings nuevas**, sin menú de navegación, con un único CTA, ruta `/lp/`:

**`/lp/hosteleria/`** — restaurantes, bares y cafeterías de Cartagena
**`/lp/comercio-local/`** — floristerías, tiendas, ópticas, clínicas

Cada una con esta estructura:
1. Gancho visual **antes/después** en los primeros 100px (usa el caso Alameda).
2. Sector nombrado de forma explícita en el H1.
3. Objeción por delante: «No, no necesitas pagar 300 € al mes por tu web».
4. Cifra pequeña y concreta, no porcentaje.
5. Prueba social: reseña de Google del sector correspondiente.
6. Precio visible.
7. **Un solo CTA** a WhatsApp, con parámetro de origen de campaña.
8. `noindex` (son para tráfico de pago, no deben competir en orgánico con las páginas de ciudad).

Ganchos aprobados para los H1:
- «Esta floristería tenía 311 reseñas de 4,9★ y una web con textos de ejemplo sin quitar.»
- «¿Tu carta se ve así en el móvil?»
- «No, no necesitas pagar 300 € al mes por tu web.»

**Al terminar:** PARA.

---

## FASE 6 — Diseño, rendimiento y accesibilidad

Solo ahora se toca lo visual. Antes de nada, ejecuta la búsqueda de `ui-ux-pro-max` indicada arriba y aplica `web-design-guidelines`.

1. **Página «Sobre mí» con foto real.** Ahora mismo prometo «te respondo yo» y no hay ninguna cara en todo el sitio. Para TikTok, mi cara es el activo. Déjame el hueco `[FOTO PENDIENTE]` y maquétalo.
2. **Segundo caso de estudio.** Un caso repetido nueve veces no es prueba social. Prepara la plantilla para TukTuk Cartagena y Casa del Sushi con huecos `[PEDIR AL CLIENTE]`.
3. Jerarquía visual: automatización e IA al mismo nivel que las webs (ver fase 4).
4. Accesibilidad: contraste WCAG AA, foco visible, `alt` en todas las imágenes, orden de tabulación, `prefers-reduced-motion` respetado en las animaciones GSAP.
5. Rendimiento con `vercel-optimize`: LCP < 2,0s en móvil 4G, CLS < 0,1, imágenes en WebP/AVIF con `width`/`height`, fuentes con `font-display: swap` y precarga.
6. Revisa que el enlazado interno del footer sea idéntico en todas las páginas (ahora hay footers distintos: la home no enlaza `/automatizacion-procesos-murcia/` ni `/chatbot-whatsapp-cartagena/`, otras páginas sí). Que `seo-specialist` verifique canonicals, sitemap y schema JSON-LD `LocalBusiness` + `Service` + `FAQPage`.

**Al terminar:** `code-reviewer` sobre todo el proyecto + informe de Lighthouse móvil. PARA.

---

## REGLAS PARA TODO EL TRABAJO

1. **Nunca inventes datos, cifras, testimonios ni nombres de clientes.** Si falta un dato, deja `[PEDIR AL CLIENTE]` y sigue.
2. Rama por fase: `fix/fase-1-errores`, `fix/fase-2-medicion`, etc. Commits atómicos con mensaje descriptivo en español.
3. No despliegues a producción. Yo apruebo cada merge.
4. Si encuentras una contradicción que no está en este documento, **para y avísame** en vez de decidir por tu cuenta.
5. Si algún cambio de esta lista te parece equivocado, dilo y argumenta antes de implementarlo. No lo hagas solo porque está escrito aquí.
6. Al final de cada fase: qué cambiaste, qué archivos, qué queda pendiente y qué necesitas de mí.

---

## FUERA DE ALCANCE (no lo toques, es cosa mía)

- Situación fiscal y de alta censal. El aviso legal publica mi DNI como NIF y anuncio «+21% IVA» en cada página. Eso lo resuelvo con mi asesoría, no en código. **No modifiques el aviso legal salvo el cambio de email de la fase 1.6.**
- Creación del buzón `hola@ruiperezstudio.es`.
- Obtención de las fotos y de los datos reales de los casos de estudio.

---

## EMPIEZA

Lee `auditoria-web-preads` completa (SKILL.md + los tres archivos de `references/`), ejecuta la **FASE 0** y para.

---

## REGISTRO DE FASES

Rellena esta tabla al cerrar cada fase. No la borres.

| Fase | Estado | Rama | Fecha | Pendiente de mí |
|---|---|---|---|---|
| 0 — Reconocimiento | cerrada | — | 29/08/2026 | — |
| 1 — Errores objetivos | cerrada | `fix/fase-1-errores` | 29/08/2026 | — |
| 2 — Medición y cookies | cerrada | `fix/fase-2-medicion` | 29/08/2026 | Rellenar los 3 IDs de píxel en `js/consent.js` |
| 3 — Eslóganes | cerrada | `fix/fase-3-copy` | 29/08/2026 | — |
| 4 — Reposicionamiento | cerrada | `fix/fase-4-posicionamiento` | 30/08/2026 | — |
| 5 — Landings de pago | cerrada | `fix/fase-5-landings` | 30/08/2026 | Etiquetar los anuncios con las UTM de `docs/medicion.md` |
| 6 — Diseño y rendimiento | cerrada | `fix/fase-6-diseno` | 30/08/2026 | `git push origin main` |

**Añadido fuera del plan, a petición de Álvaro:** servicio de gestión de redes sociales (350€/mes) con su página; página `/sobre-mi/`; página `/casos/` con los cuatro proyectos reales; retirada del diseño oscuro antiguo de las tres páginas legales.

**Corrección importante sobre el plan:** la fase 1.1 daba por hecho que Floristería Alameda era una web corporativa de 890€. Álvaro confirmó el 30/08 que es una **tienda online**. Los casos se repartieron: Alameda a `/tienda-online/`, Casa del Sushi a `/web-corporativa/` y TukTuk a `/diseno-web-cartagena/`. Ningún caso lleva ya precio.
