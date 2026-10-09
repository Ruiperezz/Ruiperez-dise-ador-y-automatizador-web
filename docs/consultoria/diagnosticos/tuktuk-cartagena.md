# Diagnóstico · TukTuk Cartagena

> **BORRADOR, no publicable.** Solo contiene lo observado el 09/10/2026 en la web pública.
> Lo marcado como **[MEDIR]** son hipótesis: no se convierten en cifra hasta que haya cronómetro.
> Falta el permiso por escrito del cliente para publicar nada (`../README.md`).

Capturas: `../capturas/tuktuk-01-home.png` y `tuktuk-02-reserva.png`.

## 1. Lo que ya está automatizado (observado)

| Observación | Dónde se ve |
|---|---|
| El cliente reserva **sin que nadie intervenga**: tour, fecha, hora, personas, nombre y correo (6 datos) y paga en la misma pantalla («Confirmar reserva y pagar») | Formulario público |
| La web promete «reserva en menos de 60 segundos» | Cabecera del formulario |
| Horario y aforo ya están en el formulario: lunes a sábado 8:00-19:00, domingos 8:00-15:00; máximo indicado de 28 personas (7 tuk tuks) | Formulario |
| Cuatro idiomas (ES, EN, DE, FR) | Cabecera |
| Hay un segundo canal: formulario de contacto (nombre, correo, mensaje) y el correo `reservas@` | Pie de la web |

Conocido del proyecto, **no observado hoy desde fuera**: correos automáticos al cliente y al
empresario, y un panel privado con pagos, reservas y bloqueo de días, horas o parte de la flota.

## 2. ⚠️ A comprobar en el panel

- **La flota son 7 tuk tuks** (confirmado por Álvaro el 09/10/2026), como dice el formulario público.
  Pero la leyenda del panel (captura que pasó Álvaro) habla de «3 disponibles (libre)», «1-2
  (parcial)» y «0 (bloqueado)». **Hay que abrir el panel y comprobar si un día con los 7 libres se
  muestra bien y si el dueño puede bloquear 4, 5, 6 o 7 tuk tuks.** Si la leyenda arrastra el 3
  de una versión anterior, es un fallo del panel de un cliente, no de esta web.
  *(Las páginas de ruiperezstudio.es no citan ninguna cifra de flota.)*
- **Volumen real.** Con el volumen actual, todavía bajo, no se puede hablar de horas ahorradas
  al mes; sí de minutos ahorrados **por reserva**.

## 3. Hipótesis de ahorro **[MEDIR]**

| Tarea manual que desaparece | Cómo se mide el «antes» |
|---|---|
| Reserva que llega por teléfono, WhatsApp o en persona, y hay que apuntarla y cobrarla | Cronómetro desde que llega hasta que queda apuntada y cobrada |
| Bloquear una hora que ya se vendió en persona o por avería | Cronómetro de «cerrar en el panel» frente a «avisar y revisar la web» |
| Confirmar y recordar al cliente | Minutos por reserva, hoy por hoy |
| Cambios y cancelaciones | Veces al mes y minutos por vez |
| Reconciliar pagos con reservas | Minutos a la semana |

## 4. Lo que tiene que decir el informe, aunque no guste

- Con pocas reservas, el valor de la automatización hoy es **no depender de contestar a las 23:00
  a un turista**, no las horas. Se dice así.
- Un posible tercer paso: **aviso al guía** de las reservas del día siguiente.

## 5. Preguntas para el cuestionario (específicas)

¿Cuántas reservas entran por la web y cuántas por otros canales? ¿Quién atiende los mensajes en
alemán y francés? ¿Se cancela y se reembolsa a mano? ¿Cuánto se tarda en cerrar un día por avería?
