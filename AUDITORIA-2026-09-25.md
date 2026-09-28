# Auditoría pre-campaña · 25/09/2026

Método: skill `auditoria-web-preads` (7 fases, en orden). Verificación en
**producción** por HTTP contra `ruiperezstudio.es` y lectura directa de **nueve
competidores** del sureste. Cada afirmación va marcada **(Seguro)** si hay cita
textual, **(Probable)** si es inferencia.

---

## 1. Lo que no me estás preguntando

### 🔴 El píxel de Meta no existe. Todo lo demás está montado y esperando.

`js/consent.js` → `metaPixelId: ""` **(Seguro)**. Lo que ya está hecho y es
bastante: la CSP de producción ya permite `connect.facebook.net`, la política de
cookies ya declara `_fbp` y `_fbc` con transferencia a EE. UU., el banner ya
tiene categoría de publicidad separada, y el evento `Contact` ya se dispara
**antes** de la redirección a WhatsApp con un `eventID` puesto para deduplicar
con la Conversions API.

**No hay que tocar nada más. Solo pegar el ID.** Meta Business Suite →
Configuración → Orígenes de datos → Conjuntos de datos.

### ⚪ El aviso legal no tiene domicilio — DESCARTADO POR ÁLVARO (25/09)

Hoy solo consta «Ubicación: Cartagena, Murcia (España)» **(Seguro)**. Ni calle,
ni número, ni código postal. La sanción leve llega a 30.000€.

**Álvaro decidió dejarlo como está** («ignóralo, no hay problema en eso»). Queda aquí por si cambia de idea, y conviene que lo vea una asesoría, porque hay alternativas
sobre qué domicilio consignar cuando un autónomo trabaja desde casa. Ya he
puesto tu nombre como titular (antes ponía solo «Ruipérez Studio», que es una
marca, no una persona) y he dejado el pendiente en un comentario del código.

### 🔴 No hay ninguna forma de convertir que no pase por WhatsApp

Cero `<form>`, cero `mailto:`, cero `tel:` en la home. `/gracias/` da **404**
**(Seguro)**. Y el evento `Contact` solo se dispara si el visitante aceptó
cookies de publicidad — legalmente correcto, pero significa que **el ROAS que
veas en Meta estará sistemáticamente por debajo del real**, y que si WhatsApp
Web falla en el móvil de alguien, el lead se pierde sin rastro.

Con un formulario y una `/gracias/` tendrías un segundo evento de conversión
independiente del canal. Es la diferencia entre optimizar la campaña y adivinar.

---

## 2. Errores objetivos encontrados

### Corregidos en esta rama

| Fallo | Dónde | Cita literal | Severidad |
|---|---|---|---|
| Mismo servicio, dos precios | `/` vs `/automatizacion/` | Home: «sincronización entre apps. **Desde 1.490€**» · página: 12 apariciones de **1.200€** | GRAVE |
| Tarjeta que se contradice sola | `/` | Prosa: «**Ocho publicaciones** al mes» · etiqueta debajo: «**12 publicaciones/mes**» | GRAVE |
| Horquilla propia mal | `/` | «Ruipérez Studio **590–2.500€** en webs». Sus webs van de 690€ a 2.490€; el 590€ es la auditoría de accesibilidad, que no es una web | GRAVE |
| Afirmación falsa en su mercado | `/` | «**Casi todas las agencias te obligan a llamar** para saber el precio». De 9 competidores leídos hoy, **6 publican precio** | GRAVE |
| Claim comparativo sin fuente | `/accesibilidad-web/` | «**El mercado español cobra entre 800€ y 2.500€**». Hay consultores españoles a 350€ | GRAVE (Ley 3/1991 art. 5) |
| Copy que se dispara al pie | `/` | «Esto es lo que no te va a montar **el de la web de 690€**» — su landing cuesta 690€ | MENOR |
| Titular legal = marca | `/aviso-legal/`, `/privacidad/` | «Titular: **Ruipérez Studio**». Cero apariciones de «Álvaro» en ambas | GRAVE |
| 12 precios del JSON-LD obsoletos | las 12 páginas de servicio | Google enseñaba «890€» mientras la página decía 1.490€ | GRAVE |
| Consent Mode v2 sin documentar | `/cookies/` | Implementado en código, 0 menciones en la política | MENOR |
| 4 meta descriptions largas | `/`, `/casos/`, `/diseno-web/`, `/email-marketing/` | hasta 196 caracteres (Google corta ~160) | MENOR |
| `og:description` desalineado | `/` | decía otra cosa que la `meta description` | MENOR |

### Pendientes, porque necesitan algo tuyo

| Fallo | Detalle | Severidad |
|---|---|---|
| ~~**Email en Gmail**~~ *(28/09: cambiado a `ruiperezstudio.info@gmail.com`, que al menos lleva la marca; el dominio propio queda para más adelante)* | `ruiperezyasociadoss@gmail.com` en las tres páginas legales y como vía de ejercicio de derechos RGPD **(Seguro)**. Una mediana que va a firmar 3.900€ lo lee antes de firmar. `hola@ruiperezstudio.es` es trabajo de una tarde | GRAVE (posicionamiento) |
| **Las landings de pago no encajan con la estrategia** | `/lp/hosteleria/` y `/lp/comercio-local/` apuntan a restaurantes y tiendas de barrio. Si los anuncios van a medianas, falta una tercera | GRAVE |
| **El 4,9★ de Alameda sale en 7 páginas** | La regla propia dice máximo 3. Está atribuido en todas, así que no es deshonesto, pero repetirlo deja claro que solo hay un caso fuerte | MEDIO |
| ⚠️ **`CLAUDE.md` se contradice consigo mismo** | Su tabla «qué caso va en qué página» asigna Alameda a **4** páginas, y tres líneas más arriba la regla dice **máximo 3 veces**. Hay que decidir cuál gana | MEDIO |

---

## 3. Eslóganes · rúbrica de la skill (0-2 en 4 ejes, se reescribe por debajo de 5)

| Página | Titular | Concr. | Consec. | Espec. | Voz | **Total** |
|---|---|:-:|:-:|:-:|:-:|:-:|
| `/mantenimiento-web/` | Te enteras de que la web está caída porque te lo dice un cliente | 2 | 2 | 2 | 2 | **8** |
| `/tienda-online/` | Te piden el pedido por WhatsApp y el pago por Bizum | 2 | 2 | 2 | 2 | **8** |
| `/meta-ads/` | Le das a «Promocionar». Te llegan likes, no clientes | 2 | 2 | 2 | 2 | **8** |
| `/lp/hosteleria/` | No, no necesitas pagar 300€ al mes por la web de tu restaurante | 2 | 2 | 2 | 2 | **8** |
| `/lp/comercio-local/` | 333 reseñas de 4,9★ y una web con los textos de ejemplo sin quitar | 2 | 2 | 2 | 2 | **8** |
| `/web-corporativa/` | Te piden la web y les mandas el Instagram | 2 | 2 | 1 | 2 | **7** |
| `/automatizacion/` | Entra un pedido y tú copias, pegas, avisas y apuntas | 2 | 2 | 1 | 2 | **7** |
| `/chatbot-whatsapp/` | Las mismas cinco preguntas, cuarenta veces al día | 2 | 2 | 1 | 2 | **7** |
| `/gestion-redes-sociales/` | Tu última publicación es de hace tres semanas | 2 | 2 | 1 | 2 | **7** |
| `/diseno-web/` | Pides tres presupuestos de web y te dan tres cifras distintas | 2 | 2 | 1 | 2 | **7** |
| `/email-marketing/` | Ya te compró una vez. ¿Y ahora qué? | 1 | 2 | 1 | 2 | **6** |
| `/seo-local/` | Aparecer el cuarto es no aparecer | 1 | 2 | 1 | 2 | **6** |
| `/` (home) | Tu negocio funciona. Pero funciona porque estás tú delante | 1 | 2 | 1 | 2 | **6** |
| `/aplicaciones-web/` | El dato bueno está en el ordenador de otra persona | 1 | 2 | 1 | 2 | **6** |
| `/landing-page/` | Pagas el clic, llega a tu web y se va sin escribirte | 1 | 2 | 1 | 2 | **6** |
| **`/accesibilidad-web/`** | **Auditoría de accesibilidad web (Ley 11/2023 / EAA)** | 1 | **0** | 1 | **0** | **2** ✗ |

**El único por debajo del umbral es accesibilidad, y está así a propósito:**
quien busca eso escribe literalmente «auditoría de accesibilidad web», y un
titular con gancho le haría perder la búsqueda. Pero la rúbrica tiene razón en
que no dice nada. Dos alternativas que conservan el término de búsqueda:

- **«Auditoría de accesibilidad: te digo si la ley te obliga antes de cobrarte»**
  — mantiene el término, añade consecuencia y una postura comercial real.
- **«Tu web pasa la ley de accesibilidad o no. Te lo digo en cinco días.»**
  — más gancho y plazo concreto, pero pierde «auditoría», que es la palabra que
  se busca. Solo la usaría en una landing de pago, no en la orgánica.

---

## 4. Competencia real · nueve competidores leídos el 25/09/2026

| Competidor | Precio de entrada | Plazo | H1 literal | ¿Reservas/paneles? |
|---|---|---|---|---|
| **Dvesign** (Cartagena) | Landing 460€ · Portal 835€ · **Tienda 977€** | **«Empieza a vender en 3 días»** | «Diseño Web Cartagena» | Sí — plugin Amelia + Google Calendar |
| **e-creativos** (Murcia) | **690€** básico · 1.550€ pro | «Cumplimos los plazos» | «Precio Diseño Páginas Web Murcia» | Registro de usuarios, chat |
| **Ridaly** (Cartagena) | Web «desde 0€» · Tienda 500€ · Programación 1.700€ | 7–15 días | «Diseño web en Cartagena. Creamos tu sueño.» | Sí — «sistema de reserva online» |
| **Alicante Developers** | Landing 450–900€ · Corporativa 700–1.800€ · Tienda 1.200–8.000€ | 2–8 sem según tipo | «Presupuesto…: **precio cerrado desde 450€**» | WordPress autogestionable |
| **Tu Estudio Web** (Valencia) | 545€ – 1.195€ | 5–15 días | «Precios de diseño web en Valencia: desde 545€» | Elementor autogestionable |
| **Tienda Online Murcia** | 650€ + 79€ hosting | — | «TIENDA ONLINE WORDPRESS / WOOCOMMERCE» | Plantilla + plugins |
| **Grita Internet** | No publica | — | «Tiendas online» | ERP, stock, facturación |
| **Coweb** (Murcia) | No publica | — | «DISEÑO WEB MURCIA» | CMS |
| A Resultados | 99/595/750€ *(no verificado: bloqueó el fetch)* | — | — | — |

### La franja peligrosa

No es la barata ni la cara: es **Dvesign**. Misma ciudad, promete lo mismo
—reservas y cobro— a **977€ contra tus 2.490€**, y **en 3 días**. Detrás,
**e-creativos** coincide en tu número exacto de entrada (690€) en tu misma
región, y **Alicante Developers** usa tu mismo argumento («precio cerrado»)
con una banda que engloba todos tus precios.

### Dos cosas que creías diferenciales y ya no lo son

1. **«Publico mis precios»: 6 de 9 competidores lo hacen.** Es la norma del
   segmento, no una ventaja. Toda una sección de la home se apoyaba en eso y ya
   está reescrita: el argumento que sí queda libre es **dónde acaba el precio**
   —qué entra y qué no—, porque todos usan «desde» sin desglosar nada.
2. **«Entrego paneles y reservas»: al menos 3 competidores lo reclaman.** Con un
   matiz que te salva: lo suyo son **plugins genéricos** (Amelia, WooCommerce)
   montados sobre WordPress. Ninguno describe nada parecido a bloquear parte de
   la flota y que desaparezca al instante. **La palabra «panel» ya no vende; la
   captura del panel de TukTuk sí.** El copy tiene que enseñarlo, no nombrarlo.

### El diferenciador que sigue libre

**Ningún competidor usa un titular que ataque un problema.** Los nueve H1 son
«servicio + ciudad» o un precio desnudo. Tus titulares nuevos —escenas que el
cliente reconoce— **destacan por contraste real en este mercado**, y eso es lo
único de esta lista que la competencia no puede copiar esta semana, porque
implica reescribir toda su web.

---

## 5. Plan por orden de ejecución

### Bloquea la campaña — no gastes un euro antes

1. **Pegar el ID del píxel de Meta** en `RS_CONFIG.metaPixelId`. Lo demás está.
2. **Domicilio y nombre legal completo en el aviso legal**, validado con asesoría.

### Antes del primer euro

3. **Email en dominio propio** (`hola@ruiperezstudio.es`) en las tres páginas
   legales, `llms.txt` y la ficha de Google.
4. **Una vía de conversión que no sea WhatsApp**: formulario mínimo + `/gracias/`
   con evento propio. Sin esto la campaña optimiza medio a ciegas.
5. **Landing de pago para empresa mediana.** Las dos actuales son de hostelería y
   comercio de barrio.
6. **Las cinco publicaciones de Google** que quedaron escritas en `PLAN-medianas.md`.

### Primeras dos semanas

7. **Volver a medir Lighthouse en móvil.** La home pasó de 48 KB a 105 KB y el 98
   de rendimiento se midió con la mitad de peso.
8. **Decidir la contradicción de `CLAUDE.md`**: máximo 3 apariciones por dato, o
   la tabla que asigna Alameda a 4 páginas. Hoy manda la tabla y la regla se
   incumple.
9. **Enseñar el panel de TukTuk con captura**, aunque sea parcial o anonimizada.
   Es tu único diferenciador defendible y ahora mismo solo está contado con
   palabras, que es lo que también dice la competencia.

### Mejora continua

10. Conversions API para recuperar las conversiones de quien rechaza cookies
    (el `eventID` ya está puesto para deduplicar).
11. Backlinks. Sigue siendo el freno real del SEO.
12. Subir los precios de accesibilidad y Meta Ads cuando haya casos publicados.

---

## Anexo · 28/09/2026

**Plazos corregidos.** La aplicación web de gestión pasa a **2 semanas**; el resto se
queda en 1. Y una corrección a esta auditoría: usé las 50-70 horas de la tienda de
Alameda como referencia de lo que cuesta una tienda, y no lo es — fue la primera web y
la primera tienda de Álvaro a la vez, así que esa cifra lleva dentro la curva de
aprendizaje. **El aviso sobre los plazos que dejé en su día se apoyaba en un dato mal
interpretado.**
