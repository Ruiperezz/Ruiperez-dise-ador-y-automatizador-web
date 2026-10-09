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

## 2. 🔎 El hallazgo principal: los botones de WhatsApp no llevan el producto

Comprobado en el código de la web pública el 09/10/2026:

| Dónde | Mensaje que se precarga | ¿Lleva producto, fecha o dirección? |
|---|---|---|
| Portada y cabecera | «Hola, quiero hacer un pedido» | No |
| Portada (otros botones) | «quisiera un arreglo personalizado» / «información sobre vuestros arreglos» | No |
| **Ficha de producto** | «Hola, me gustaría información sobre vuestros arreglos florales» | **No: ni siquiera el nombre del producto que se está mirando** |
| **Carrito** | Mensaje armado por código con el contenido del pedido | **Sí** (a verificar con un pedido de prueba del propio cliente) |

Es decir: quien pulsa «Pedir por WhatsApp» desde una ficha de producto manda un mensaje que **no dice
qué producto estaba mirando**, y alguien tiene que preguntárselo. Es exactamente el problema que tuvo
la web de Álvaro con sus mensajes «buenas, necesito info».

La web tiene además un `pedido-modal.js` cuyo funcionamiento no he podido ver desde fuera.

## 3. Hipótesis de ahorro **[MEDIR]**

| Tarea | Cómo se mide el «antes» |
|---|---|
| Pedido por WhatsApp: preguntar producto, fecha, dirección y dedicatoria y apuntarlo | Cronómetro desde el primer mensaje hasta que el pedido queda anotado |
| Comprobar un pago por Bizum (si requiere confirmar a mano) **[PREGUNTAR cómo se verifica hoy]** | Minutos por pago |
| Preparar la hoja de reparto del día | Minutos cada mañana |
| Picos (San Valentín, Día de la Madre, difuntos) | Pedidos en la semana punta y horas extra |

## 4. Propuesta a evaluar (no a prometer)

Que el botón de WhatsApp de cada ficha lleve **precargado el nombre del producto** y lo que falta
(fecha y dirección). Es un cambio pequeño en el enlace; lo que hay que medir es cuántos pedidos
entran hoy por esa vía antes de decidir.

## 5. Preguntas para el cuestionario (específicas)

¿Qué porcentaje de pedidos entra por WhatsApp y qué porcentaje por el carrito? ¿Cómo se confirma un
pago por Bizum? ¿Quién monta el reparto del día? ¿Cuántas llamadas son «¿ha llegado mi pedido?»?
