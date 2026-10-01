# SEO orgánico — plan y línea base

> Todo lo de aquí sale de **sus propios datos de Search Console** (jul-sep 2026),
> no de estimaciones de herramientas. Ahrefs no tiene plan y Semrush se quedó sin
> unidades de API el 01/10/2026; si algún día se contratan, este documento se
> contrasta, no se sustituye.

## La línea base, para poder decir si algo funcionó

Medido el 01/10/2026, ventana julio-septiembre:

| Consulta | Impresiones | Posición |
|---|---:|---:|
| diseño web cartagena | 194 | 24,6 |
| diseño web en cartagena | 106 | 41,1 |
| paginas web en cartagena | 73 | 51,1 |
| mantenimiento web murcia | 42 | 34,9 |
| chatbot inteligente con ia murcia | 31 | 64,9 |
| diseño tienda online murcia | 60 | 51,8 |
| diseñador web cartagena | 21 | 22,5 |
| precios página web murcia | 3 | 69,3 |

**Clics en septiembre: 14.** Posición media 26,8.

**Vuelve a medir esto el 1 de noviembre y el 1 de diciembre.** Si las posiciones no
se mueven en dos meses, lo que se hizo no funcionó y hay que cambiar de hipótesis,
no insistir.

## Lo que se arregló el 01/10/2026, y por qué

**Los `<title>` decían «Sureste de España».** Nadie busca eso. Mientras tanto había
**413 impresiones de consultas con ciudad** cayendo en páginas cuyo título nunca
nombraba Cartagena ni Murcia.

El `title` es la señal más fuerte que tiene una página sobre de qué va. Esa es la
explicación de por qué `/diseno-web-cartagena/`, **que está borrada desde el
23/09**, seguía teniendo 141 impresiones mientras `/diseno-web/` tenía cero: la
borrada sí llevaba la ciudad en el título.

Once títulos reescritos a **servicio + ciudad + precio**, todos por debajo de 60
caracteres para que Google no los corte. Siete descripciones nuevas.

**Esto es lo barato y lo que más mueve.** Lo siguiente ya no es gratis.

## Lo que queda, por orden de impacto

### 1. Enlaces entrantes — el techo real

**Tiene tres.** Dos en floristeriaalameda.com y uno en tuktukcartagena.com, puestos
el 29/09. Con tres enlaces no se gana una búsqueda competida, por muy bien
optimizada que esté la página.

El plan está en `docs/enlaces-entrantes.md`. Lo de más valor sigue siendo lo mismo:
**los sitios que él ya mantiene y cobra**. Falta Finca Doña Carmen, que se pondrá al
publicarse.

### 2. Bing Places — sigue sin darse de alta

Importa más de lo que parece: **ChatGPT busca en Bing**. Sin ficha en Bing Places,
ChatGPT no lo cita cuando alguien pregunta por un diseñador web en Cartagena. Es
gratis y son veinte minutos.

### 3. Contenido informativo — hoy hay cero

Las 21 páginas indexadas son todas comerciales. **No hay ni un artículo.** Eso
cierra la puerta a la cola larga, que es de donde sale el tráfico de un negocio
local pequeño.

Lo que tiene sentido escribir, y solo porque él tiene algo real que decir:

- **Qué cuesta de verdad una web en Murcia, con los precios de nueve competidores.**
  Ya hay dos auditorías con esos datos. Nadie más publica una comparativa así.
- **La Ley 11/2023 de accesibilidad: a quién le aplica de verdad.** Tiene la
  excepción de microempresa bien estudiada y una web que pasa axe con cero
  violaciones para demostrarlo.
- **Qué pasa cuando no contestas un WhatsApp fuera de horario.**

⚠️ **No escribir por escribir.** Las páginas de ciudad se borraron el 23/09 justo
por eso: repetían contenido y competían contra la home. Un artículo que no aporte
un dato que no esté en otro sitio hace el mismo daño.

### 4. Esperar a que Google digiera la fusión

`/diseno-web-cartagena/` y `/diseno-web-murcia/` **siguen acumulando impresiones**
pese a estar borradas y redirigidas con 308. Las redirecciones funcionan, el sitemap
está bien y se ha avisado por IndexNow. **No hay nada roto: Google tarda semanas.**
No tocar nada por esto y no volver a crear páginas de ciudad.

## Lo que NO hay que hacer

- **No recrear páginas por ciudad.** Fue decisión de Álvaro el 23/09 y el motivo
  sigue siendo válido. Para **Google Ads no hacen falta**: la segmentación
  geográfica va a nivel de campaña.
- **No perseguir «diseño web» a secas** (504 impresiones, puesto 11). Sin ciudad ni
  intención de compra: posición buena, cliente cero. Lo mismo con «web hosting» (83)
  y «web development» (52).
- **No tocar `robots.txt`.** Los tres Content Signals están en sí a propósito.
- **No meter `aggregateRating` en el JSON-LD** con sus propias reseñas de Google.
  Google lo considera autopromoción y puede costar una acción manual.

## Estado técnico

No es el cuello de botella, y conviene saberlo para no perder tiempo ahí:

- 24 páginas, **cero violaciones de axe-core 4.10.2** en los dos modos de movimiento
- Lighthouse móvil 100/100/100/100, LCP 1,5s
- `ProfessionalService` con horario, área de servicio de 9 lugares y catálogo de ofertas
- `FAQPage` idéntico al FAQ visible en las 14 páginas que lo llevan
- `sitemap.xml`, `robots.txt`, IndexNow, `llms.txt`, API en JSON, manifiestos ARD
- 24 páginas en markdown para los modelos

**Esto ya está por encima de cualquier competidor local.** Lo que falta son enlaces
y contenido, que es trabajo de meses, no de código.
