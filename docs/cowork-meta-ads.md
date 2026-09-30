# Encargo permanente · informe diario de Meta Ads

Para Cowork, o para cualquier sesión con el MCP de Windsor.ai conectado.
Cadencia: **una vez al día**, por la mañana.

---

## ANTES DE EMPEZAR: no se toca nada hasta el día 7

Meta necesita entre **3 y 7 días** de fase de aprendizaje, y **unas 50 conversiones por
conjunto de anuncios** para salir de ella. Durante ese tiempo los números son malos **por
diseño**: el algoritmo está probando públicos.

**Si se apagan anuncios el día 2, se apagan anuncios que todavía no han arrancado.**

| Días 1–6 | Día 7 en adelante |
|---|---|
| Informar, **no tocar** | Informar y recomendar cambios |
| Mirar CTR y coste por clic | Mirar coste por `Contact` |
| Solo se actúa si algo está **roto** (ver abajo) | Decisiones normales |

**Qué cuenta como «roto» y sí justifica parar el día 2:**
- El anuncio lleva gastados más de 30€ y **cero clics en el enlace**
- El enlace de destino da error o lleva a la página equivocada
- El anuncio fue rechazado por Meta
- Gasto diario muy por encima del presupuesto fijado

---

## De dónde salen los datos

MCP de Windsor.ai, conector **`facebook`** (así llama Windsor a Meta Ads).

1. `get_fields(connector="facebook")` — **obligatorio antes de pedir datos.** Los nombres
   de campo se sacan de ahí, **no se adivinan**.
2. `get_data(connector="facebook", fields=[...], date_preset="last_7d")`

Campos que interesan: campaña, conjunto de anuncios, anuncio, gasto, impresiones, clics
en el enlace, CTR, CPM, frecuencia, resultados y coste por resultado.

**Si el conector no está conectado, el informe del día es una sola línea:** «Meta Ads no
está conectado en Windsor; no hay datos». No inventar cifras ni estimar.

---

## Los números que importan, y solo esos

### 1. Coste por `Contact` — el único que decide

`Contact` es el evento que se dispara cuando alguien pulsa un botón de WhatsApp. Es el
lead. Todo lo demás es contexto.

**Umbrales, calculados sobre un ticket medio de 1.442€ de sus productos de entrada:**

| Si cierra… | Un lead vale | CPA bueno | CPA tope |
|---|---|---|---|
| 1 de cada 10 | 144€ | **22€** | 50€ |
| 1 de cada 7 | 216€ | **32€** | 76€ |
| 1 de cada 5 | 288€ | **43€** | 101€ |
| 1 de cada 4 | 360€ | **54€** | 126€ |

**Hasta que haya datos reales de cierre, usar la fila de 1 de cada 7: bueno por debajo de
32€, revisar por encima de 76€.** Actualizar en cuanto Álvaro sepa cuántos presupuestos
cierra de verdad.

⚠️ **El CPA que muestra Meta está SUBESTIMADO.** El evento `Contact` solo se dispara si el
visitante aceptó cookies de publicidad; quien las rechaza es invisible. **El coste real
por lead es MEJOR que el que se ve.** No apagar un anuncio que esté un 10-20% por encima
del umbral: puede estar dentro.

### 2. CTR del enlace — dice si el creativo funciona

Es lo que sirve **antes** de tener conversiones, en la primera semana.

- **Por encima del 1,5%:** el creativo engancha
- **Entre el 0,8% y el 1,5%:** normal
- **Por debajo del 0,8% con más de 1.000 impresiones:** el creativo no funciona. Cambiar
  la imagen o el titular, no el público

### 3. Frecuencia — dice si la audiencia está quemada

En una zona pequeña como Cartagena o Murcia el público se agota rápido.

- **Por debajo de 2:** bien
- **Entre 2 y 3:** vigilar, el CTR empezará a caer
- **Por encima de 3:** cambiar el creativo o ampliar la zona. Seguir pagando por enseñar
  lo mismo a la misma gente es tirar el dinero

### 4. CPM — solo como aviso

Si sube mucho de una semana a otra sin haber tocado nada, es competencia en la subasta
o relevancia baja. Mirarlo, no reaccionar solo por eso.

---

## Qué decir cada día

Corto. Álvaro lo lee en el móvil.

```
META ADS · [fecha]  ·  día [N] de campaña

Ayer: [gasto]€ · [N] contactos · [CPA]€ por contacto
Acumulado: [gasto]€ · [N] contactos · [CPA]€

MEJOR CREATIVO  [nombre] · CTR [x]% · [N] contactos a [y]€
PEOR CREATIVO   [nombre] · CTR [x]% · [N] contactos a [y]€

[Una línea: qué hacer hoy, o «nada, sigue en aprendizaje»]
```

**Si no hay nada que decir, decirlo.** «Sin cambios, dentro de lo esperado» es un informe
válido y mejor que inventar una recomendación para parecer útil.

---

## Cuándo recomendar cada cosa (a partir del día 7)

| Situación | Recomendación |
|---|---|
| CPA por debajo del bueno y frecuencia bajo 2 | **Subir presupuesto un 20%**, no más: subidas grandes reinician el aprendizaje |
| CPA por encima del tope tras 7 días y 50+ clics | Pausar **ese anuncio**, no la campaña |
| CTR bajo 0,8% con 1.000+ impresiones | Cambiar **creativo**, mantener público |
| Frecuencia por encima de 3 | Creativo nuevo o ampliar zona |
| Gasto por encima de 3× el CPA tope sin un solo contacto | Pausar ya, aunque sea día 3 |
| Todo dentro de rango | **No tocar nada.** Es la recomendación más frecuente y la más difícil de dar |

⚠️ **No cambiar más de una cosa a la vez.** Si se toca creativo y público el mismo día,
no se sabrá qué funcionó.

---

## Lo que NO hay que hacer

- **No optimizar a `ViewContent`.** Se dispara solo por mirar la página: Meta lo genera
  automáticamente leyendo los datos estructurados del sitio. Optimizar a eso trae
  curiosos. El evento bueno es `Contact`.
- **No optimizar a «clics en el enlace».** Trae el tráfico más barato, que es el que no
  compra.
- **No mandar tráfico de pago a la home.** Para eso están `/lp/hosteleria/` y
  `/lp/comercio-local/`, que son `noindex`, sin menú y con un solo CTA.
- **No inventar cifras.** Si Windsor no devuelve datos, decirlo.
- **No recomendar tocar precios** a partir de datos de anuncios de menos de un mes.

---

## Etiquetado de campañas

Los anuncios tienen que llevar UTM en el destino, o el origen no llega al mensaje de
WhatsApp:

```
https://ruiperezstudio.es/lp/hosteleria/?utm_source=meta&utm_campaign=hosteleria-cartagena
```

Con eso, el mensaje que le entra a Álvaro acaba en ` · ref: meta-hosteleria-cartagena` y
sabe de qué anuncio viene sin preguntar. Está montado en `js/consent.js`; ver
`docs/medicion.md`.

---

## Revisión mensual

Una vez al mes, además del informe diario:

- ¿Qué página de destino convierte mejor? Es lo que decide dónde mandar el presupuesto
- ¿Cuántos de esos contactos acabaron en presupuesto enviado? **Ese dato lo tiene solo
  Álvaro** y hay que pedírselo: sin él, los umbrales de CPA de arriba son una suposición
- Actualizar la tabla de umbrales con su tasa de cierre real
