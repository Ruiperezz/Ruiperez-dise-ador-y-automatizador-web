# Facturas, gastos y alta de autónomo

> Preparado el 01/10/2026, antes de lanzar anuncios y antes del alta.
> **Nada de esto es asesoramiento fiscal.** Lo que hay aquí es el orden de las
> cosas y dónde está cada papel. Lo que lleve «confirma con tu gestor» es porque
> hay que confirmarlo con tu gestor.

---

## ⚠️ LO PRIMERO: las facturas NO van en este repositorio

Todo lo que está en esta carpeta **se publica en ruiperezstudio.es**. Es un sitio
estático: si metes un PDF en el repo, queda accesible en internet con tu NIF, tu
dirección y tus importes dentro.

**Guárdalas fuera**, por ejemplo en:

```
~/Documents/RuiperezStudio-facturas/2026/10/
```

Ese es el sitio al que Cowork puede entrar sin que nada se publique.

---

## El orden importa: alta ANTES de gastar

Esta es la parte que más dinero puede costarte, y va primero por eso.

En España, para deducir el IVA y el gasto de algo, Hacienda quiere que estés dado
de alta en el censo **antes** de incurrir en ese gasto. Existe justo para esto la
opción del **modelo 036 de «alta previa al inicio de la actividad»**: te das de alta
en Hacienda para poder deducir los gastos de puesta en marcha, aunque todavía no
factures.

**Si te gastas los 400€ de Google Ads antes de presentar el 036, te arriesgas a no
poder deducir ni el gasto ni su IVA.** Son unos 84€ de IVA, más el gasto en sí.

👉 **Pregúntale a tu gestor esto, con estas palabras:** *«¿Puedo presentar el 036
de alta previa al inicio de actividad ahora, sin darme de alta todavía en el RETA,
para poder deducir la publicidad que voy a pagar antes de facturar?»*

Es una pregunta concreta que un gestor contesta en dos minutos. **No lo decidas tú
ni lo decida yo.**

---

## Lo del ROI: puede ahorrarte el 21%

Google y Meta te facturan desde **Irlanda**, no desde España.

| Situación | Qué pasa |
|---|---|
| **Dado de alta en el ROI** (casilla de operaciones intracomunitarias del 036) | Google **no te cobra IVA**. Tus 400€ son 400€ de anuncios |
| **Sin ROI** | Te cobra el 21%. Tus 400€ se quedan en unos 330€ de anuncios |

A cambio, estar en el ROI te obliga a presentar el **modelo 349**. Es un trámite más
al trimestre.

👉 **Misma conversación con el gestor**, en la misma llamada.

---

## Dónde está cada factura

| Proveedor | Qué es | Dónde se descarga | Cuándo |
|---|---|---|---|
| **Google Ads** | Publicidad | Facturación → Documentos → PDF | Día 1-5 del mes siguiente |
| **Meta (Facebook)** | Publicidad | Administrador de anuncios → Facturación | Al llegar al umbral o fin de mes |
| **IONOS** | Dominio ruiperezstudio.es | Área de cliente → Facturas | Anual |
| **Vercel** | Alojamiento | Dashboard → Settings → Invoices | Mensual, si pasas a plan de pago |
| **Supabase** | Base de datos de las automatizaciones | Dashboard → Billing | Mensual |
| **Windsor.ai** | Conectores | Su panel → Billing | Mensual |

⚠️ **Vercel:** el plan gratuito es para uso **no comercial**. Si alojas webs de
clientes y cobras por ello, su licencia pide plan de pago. Mira si te aplica antes
de que te lo miren ellos.

---

## Los costes que vas a tener

Para que no te pille ninguno por sorpresa cuando montes el presupuesto:

| Concepto | Aproximado | Nota |
|---|---|---|
| Cuota de autónomo | 0-80€/mes el primer año | Tarifa plana si te corresponde |
| Google Ads | 200€/mes | Lo decides tú cada mes |
| Meta Ads | 0€ de momento | Sin campañas todavía |
| Dominio | ~12€/año | IONOS |
| Supabase | desde 0€ | Sube al crecer las automatizaciones |
| Gestor | 40-70€/mes | Si lo contratas |

**Cada cuota mensual que cobras a un cliente (39, 69 o 99€) cubre una parte fija de
esto.** Tres mantenimientos completos y los costes fijos están pagados.

---

## La rutina mensual, para que no se acumule

El día 5 de cada mes, veinte minutos:

1. Descargar las facturas del mes anterior de cada proveedor de la tabla
2. Guardarlas en `~/Documents/RuiperezStudio-facturas/2026/MM/`
3. Nombrarlas igual siempre: `2026-10_google-ads_48,40.pdf`
4. Apuntar en la hoja de gastos: fecha, proveedor, base, IVA, total
5. Pasárselas al gestor antes del día 15

**Si lo haces cada mes tardas veinte minutos. Si lo dejas para el trimestre, es un
día entero y se pierden facturas.**

---

## Qué puede hacer Cowork con esto

Hoy, con lo que hay conectado:

- ✅ **Leer y ordenar** lo que haya en esa carpeta local
- ✅ **Sumar gastos** por mes y por proveedor y avisar si falta alguna factura
- ✅ **Sacar el gasto de Meta Ads** por el conector de Windsor
- ❌ **Descargar las facturas solo**: ninguna de esas plataformas lo permite por API
  sin tu sesión. Eso lo tienes que hacer tú.

**Para automatizarlo de verdad hace falta conectar el correo.** Google y Meta mandan
la factura por email cada mes; con el conector de Gmail, Cowork puede sacarlas y
archivarlas sin que toques nada.

⚠️ **El conector de Gmail está configurado pero no autorizado** (a 01/10/2026 da
«No claude.ai OAuth token found»). Hay que autorizarlo desde los ajustes de
conectores de claude.ai. **Es el único paso que separa esto de estar automatizado.**
