# Kit de diagnóstico de IA

> Privado: `docs/` está en `.vercelignore`. **Aquí no van datos de clientes**: ni cifras de
> facturación, ni pedidos, ni teléfonos. Las cifras exactas se quedan en la conversación con
> el cliente y en su informe firmado.

## Para qué sirve

Es el método con el que se hace (y se enseña) el diagnóstico de 490€ de `/consultoria-ia/`.
Primero se aplica a tres negocios reales con permiso: Ruipérez Studio, TukTuk Cartagena y
Floristería Alameda. De ahí salen el informe de ejemplo y los primeros casos publicables.

## La regla que lo sostiene

**Nunca se publica «ahorra X horas» si X no se ha medido.** Un ahorro se mide así:

    horas ahorradas al mes = veces que ocurre al mes × (minutos antes − minutos después) ÷ 60

- **«Antes»** lo mide alguien con un cronómetro durante una semana (`registro-de-tiempos.md`).
  No se pregunta de memoria: de memoria todo el mundo se equivoca, siempre a favor de la tesis.
- **«Después»** se mide en el flujo ya automatizado, con el mismo cronómetro.
- **«Veces al mes»** sale del propio sistema (pedidos, reservas, mensajes), no de una estimación.

Si los datos son pocos, se dice: «por cada pedido ahorra X minutos; con tus N pedidos al mes,
son Y horas». El cálculo lo hace el cliente con su volumen, que es lo honesto cuando el
volumen aún es pequeño.

## Los cinco pasos

1. **Permiso por escrito** del cliente (correo vale), con lo que se podrá publicar.
2. **Cuestionario previo** (`cuestionario-previo.md`), 15 minutos.
3. **Observación** de su web y, si el cliente lo autoriza, de su panel. **Sin pedir contraseñas
   por chat**: si hace falta ver el panel, lo enseña el cliente en pantalla o manda capturas.
4. **Medición**: registro de tiempos de una semana (`registro-de-tiempos.md`).
5. **Informe** (`plantilla-informe.md`) y repaso de 30 minutos.

## Qué se publica y qué no

| Se puede publicar | No se publica sin permiso escrito |
|---|---|
| Lo que cualquiera ve en la web pública del cliente | Cifras de ventas, pedidos o reservas |
| Minutos ahorrados **por operación**, medidos | Capturas de paneles con datos sin difuminar |
| Capturas del flujo público, hasta antes de pagar | Direcciones de acceso (`/admin`, paneles) |
| El método y la fórmula | Cualquier dato personal de sus clientes |

## Estado (09/10/2026)

| Negocio | Diagnóstico | Falta |
|---|---|---|
| Ruipérez Studio | borrador en `diagnosticos/ruiperez-studio.md` | registro de tiempos de Álvaro |
| TukTuk Cartagena | borrador en `diagnosticos/tuktuk-cartagena.md` | **permiso recibido el 09/10/2026** (Álvaro confirma que lo dieron; guardar el mensaje), cuestionario, flota actual y tiempos |
| Floristería Alameda | borrador en `diagnosticos/floristeria-alameda.md` | **permiso recibido el 09/10/2026** (ídem), cuestionario, % de pedidos por WhatsApp y tiempos |

La página pública `/consultoria-ia/diagnostico-real/` enseña el método y las capturas de los flujos
públicos. Está en `noindex` y fuera del sitemap **hasta que haya tiempos medidos**.
