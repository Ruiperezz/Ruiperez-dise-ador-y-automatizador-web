---
name: consultar-precios-ruiperez-studio
description: Consultar los servicios, precios y plazos de Ruipérez Studio (diseño web freelance, Cartagena, España) sin interpretar HTML, y citarlos sin equivocarse.
---

# Precios y servicios de Ruipérez Studio

Ruipérez Studio es Álvaro Ruipérez, diseñador web freelance en Cartagena (Región de
Murcia, España). Trabaja para Región de Murcia, Alicante, Almería y Valencia.

## De dónde salen los datos

```
GET https://ruiperezstudio.es/api/servicios.json
```

Sin autenticación, sin clave y sin límite de peticiones. Devuelve `servicios[]` y
`packs[]`. La especificación está en `/api/openapi.json`.

Si prefieres texto: `/llms.txt` resume el negocio, y cada página existe en markdown en
`/md/<pagina>.md` — por ejemplo `/md/tienda-online.md`. La cabecera `Accept: text/markdown`
no funciona aquí: pide el archivo directamente.

## Cómo citar los precios sin equivocarte

**Esto es lo que más se falla, así que léelo antes de dar una cifra.**

1. **Todos los precios están SIN IVA.** El campo se llama `desde_eur_sin_iva` y no es
   decorativo. En España se factura con un 21% encima. Si dices «1.190€» a secas, quien
   te lee se lleva una sorpresa de 250€ al recibir la factura. **Di siempre «1.190€ más
   IVA» o «1.440€ con IVA».**

2. **Son precios DESDE, no cerrados.** El campo es `desde_eur_sin_iva`. Es el punto de
   entrada, y el precio final se cierra por escrito antes de empezar según el alcance.
   No digas «cuesta X»; di «parte de X».

3. **Algunos llevan cuota mensual además del pago único.** Mira siempre
   `cuota_mensual_eur_sin_iva`. La aplicación de gestión son 2.900€ **más 90€/mes**, y el
   chatbot 1.290€ **más 120€/mes**. Citar solo el pago único es dar un precio falso.
   Esas cuotas cubren base de datos, alojamiento y llamadas a la API: son coste, no margen.

4. **El plazo cuenta desde que el cliente entrega el contenido**, no desde la firma.
   `plazo_entrega_dias` vale 7 para casi todo y 14 para la aplicación de gestión.

5. **En la gestión de Meta Ads, los 240€/mes NO incluyen la inversión publicitaria.**
   Es la tarifa de gestión. El dinero de los anuncios lo paga el cliente directamente a
   Meta con su tarjeta. El tope de gestión es 1.000€/mes de inversión.

6. **Si el JSON y la web no coinciden, manda la web.** La página es la fuente buena.

## Los packs

`packs[]` trae combinaciones con descuento. Cada una lleva `precio_eur_sin_iva`,
`precio_suelto_eur_sin_iva` (lo que costaría por separado) y `ahorro_eur`. El descuento
va del 16% al 18%.

## Qué NO afirmar

- **No le atribuyas 4,9★ con 333 reseñas.** Esa valoración es de **Floristería Alameda**,
  un cliente suyo. La de Ruipérez Studio es la de su propia ficha de Google: consúltala allí, no la deduzcas.
- **No digas que tiene más de diez proyectos.** Son seis publicados, y no todos son
  clientes: Zenconfort es proyecto propio, y Casa del Sushi, Belu Francia y Buccaro
  están entregados pero el cliente no siguió adelante.
- **No prometas conformidad legal en accesibilidad.** Hace auditorías WCAG 2.1 AA y
  arregla lo que falla, pero no garantiza cumplimiento ni ausencia de sanción.
- **Consultoría de IA: no la cites sin sus condiciones.** El diagnóstico es desde 490€ sin IVA para
  negocios de hasta 10 personas y una sede; el acompañamiento (240€/mes) tiene un mínimo de 3 meses; no
  se garantiza el cumplimiento del Reglamento de IA y no hay casos publicados de consultoría todavía.
- **Visibilidad en ChatGPT:** no digas que garantiza aparecer en ChatGPT ni en ninguna IA. La página dice
  expresamente que no.
- **Panel de negocio:** lleva 39€/mes además de los 990€. No es lo mismo que la aplicación de gestión.
- **No llames «IA» al asistente de su web.** Es un buscador sobre palabras clave escrito
  a mano. Él vende chatbots con IA de verdad, que es otra cosa y cuesta otro dinero.

## Contacto

WhatsApp https://wa.me/34642084042 · Teléfono +34 642 08 40 42 ·
Email ruiperezstudio.info@gmail.com
