# Diagnóstico · Floristería Alameda

> **BORRADOR, no publicable.** Solo contiene lo observado el 09/10/2026 en la web pública.
> Lo marcado como **[MEDIR]** son hipótesis: no se convierten en cifra hasta que haya cronómetro.
> Falta el permiso por escrito del cliente para publicar nada (`../README.md`).

Capturas: `../capturas/alameda-01-home.png`, `alameda-02-producto.png` y `alameda-03-carrito.png`.
**La tienda es `floristeriaalameda.com`** (la `.es` no existe).

## 1. Lo que ya está automatizado (observado)

| Observación | Dónde se ve |
|---|---|
| Catálogo, carrito y pago: **Bizum, tarjeta o PayPal** | Carrito |
| El carrito recoge los datos que hacen falta para entregar: **fecha, nombre, teléfono, dirección, dedicatoria y correo**, y si es a domicilio o en tienda | Carrito |
| Reparto solo en Cartagena, portes incluidos: el carrito lo explica y calcula el total | Carrito |
| Un rótulo en la cabecera dice **«Abierto» o «Cerrado»** y se actualiza solo con el horario | Cabecera |
| El panel (privado) está conectado a la tienda | Conocido del proyecto |

## 2. 🔎 El hallazgo principal: dos formas de pedir, y no son equivalentes

- **Por el carrito:** el pedido llega completo (fecha, dirección, dedicatoria, pago).
- **Por el botón «Pedir por WhatsApp»** (en la portada, la cabecera y cada ficha de producto): el
  mensaje precargado es genérico —«Hola, quiero hacer un pedido»— y **no lleva producto, fecha,
  dirección ni dedicatoria**. Cada pedido así obliga a preguntar lo que el carrito ya recoge.

**Es exactamente el problema que tuvo la web de Álvaro con sus mensajes «buenas, necesito info».**
Si una parte de los pedidos entra por WhatsApp, ahí hay minutos por pedido que ahorrar.

## 3. Hipótesis de ahorro **[MEDIR]**

| Tarea | Cómo se mide el «antes» |
|---|---|
| Pedido por WhatsApp: preguntar producto, fecha, dirección y dedicatoria y apuntarlo | Cronómetro desde el primer mensaje hasta que el pedido queda anotado |
| Comprobar un pago por Bizum (si requiere confirmar a mano) **[PREGUNTAR cómo se verifica hoy]** | Minutos por pago |
| Preparar la hoja de reparto del día | Minutos cada mañana |
| Picos (San Valentín, Día de la Madre, difuntos) | Pedidos en la semana punta y horas extra |

## 4. Propuesta a evaluar (no a prometer)

Que el botón de WhatsApp de cada producto lleve **precargado el nombre y la referencia del
producto** y un recordatorio de lo que falta (fecha, dirección). Es un cambio pequeño en el
enlace; lo que hay que medir es cuántos pedidos entran hoy por esa vía antes de decidir.

## 5. Preguntas para el cuestionario (específicas)

¿Qué porcentaje de pedidos entra por WhatsApp y qué porcentaje por el carrito? ¿Cómo se confirma un
pago por Bizum? ¿Quién monta el reparto del día? ¿Cuántas llamadas son «¿ha llegado mi pedido?»?
