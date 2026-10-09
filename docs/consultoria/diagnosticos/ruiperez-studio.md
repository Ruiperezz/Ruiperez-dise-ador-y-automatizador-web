# Diagnóstico · Ruipérez Studio (negocio propio)

> **BORRADOR, no publicable.** Solo contiene lo observado el 09/10/2026 en la web pública.
> Lo marcado como **[MEDIR]** son hipótesis: no se convierten en cifra hasta que haya cronómetro.
> Falta el permiso por escrito del cliente para publicar nada (`../README.md`).

Es el diagnóstico que se publicará como **informe de ejemplo**: es el único donde Álvaro es a la
vez cliente y consultor, así que no hace falta permiso de nadie.
Captura: `../capturas/ruiperez-01-formulario.png`.

## 1. Lo ya automatizado (observado o documentado)

| Qué | Estado |
|---|---|
| Petición de presupuesto con servicio preseleccionado, **7 campos** y página de origen, que termina en un WhatsApp con el mensaje escrito | Hecho el 08/10/2026 |
| Medición de contactos (`Contact` y `generate_lead`) por página de origen | Hecho |
| Comprobación de que los precios cuadran entre la web, la API y el resto (`scripts/verifica-api.py`) | Hecho el 30/09/2026 |
| Avisos a buscadores (IndexNow) | Manual con un comando |

## 2. Trabajo manual documentado en el propio proyecto

Son incidencias reales que constan en `CLAUDE.md`, no suposiciones:

1. **Los precios viven en seis sitios** (web, JSON-LD, API, `llms.txt`, asistente y ficha de Google).
   Se han desfasado de verdad: el JSON-LD de la home llevó semanas con precios que no existían, dos
   publicaciones de la ficha llevaban un precio de tienda que nunca fue el vigente, y un reemplazo en
   cadena dejó un pack a 3.390€. Hoy el script cubre la web y la API; **la ficha de Google, las
   publicaciones de Instagram y los textos de WhatsApp Business siguen a mano.**
2. **Los datos están en cinco sitios:** Google Analytics, Search Console, Meta, Instagram y la ficha de
   Google. Hoy no se leen sin Windsor (que Álvaro ha descartado) y el panel propio está en marcha.
3. **Los mensajes que llegan por WhatsApp** pasaron de «buenas, necesito info» sin datos a un
   formulario completo. Los seguimientos a las 24 h, 72 h y 7 días son manuales.
4. **Una publicación semanal en la ficha**, la respuesta a cada reseña y el repaso del informe de
   anuncios: rutinas repetidas.

## 3. Hipótesis de ahorro **[MEDIR por Álvaro, una semana]**

| Tarea | Veces | Minutos por vez |
|---|--:|--:|
| Primera respuesta a un contacto nuevo | [MEDIR] | [MEDIR] |
| Seguimientos a 24 h, 72 h y 7 días | [MEDIR] | [MEDIR] |
| Cambiar un precio en los seis sitios | [MEDIR] | [MEDIR] |
| Publicación semanal de la ficha | [MEDIR] | [MEDIR] |
| Reunir las cifras de la semana de cinco fuentes | [MEDIR] | [MEDIR] |

## 4. Candidatos a automatizar, por orden de lo que parece que más pesa

1. **Un único origen de precios** que alimente la web, la API, `llms.txt`, el asistente y la ficha.
2. **El panel de datos** que Álvaro está construyendo (las cinco fuentes en una pantalla).
3. **Recordatorios de seguimiento** de WhatsApp (24 h, 72 h, 7 días).

## 5. Lo que NO se automatiza (y se dice en el informe)

Contestar reseñas y la primera conversación con un cliente: son lo que diferencia a Álvaro de una
agencia, y automatizarlas lo desmentiría.
