# Identidad de marca · logo definitivo (09/10/2026)

> Privado (`docs/` no se despliega). El logo lo aportó Álvaro como «definitivo». **Original sin tocar:**
> `assets-originales/logo-ruiperez-studio-definitivo.png` (1254×1254, fondo ≈ #0A0B0F). Todo lo demás se
> genera a partir de él **recortando y recoloreando, nunca redibujando**.

## Qué es

Una **R** geométrica blanca con una pierna violeta (un degradado blanco→violeta en el arranque), el nombre
`RUIPÉREZ` en una sans ancha y `— STUDIO —` con dos líneas violeta. Eslogan: `IDEAS · TECNOLOGÍA · RESULTADOS`.
Cinco iconos de servicios (desarrollo web, tiendas online, automatizaciones, IA, consultor IA), que **solo
viven en el original**, no en la web.

Colores medidos en el original: fondo `#0A0B0F`, blanco `#F4F4F4`, violeta ≈ `#6C64F8`, grafito de marca `#111318`.

## Archivos (en `img/brand/`, públicos)

| Archivo | Para qué |
|---|---|
| `logo-horizontal-claro.webp` | **Cabecera y pie** (sobre fondo claro): R grafito + violeta, transparente, 440×120 |
| `logo-horizontal-oscuro.webp` | Lo mismo sobre fondo oscuro |
| `r-claro.webp`, `r-oscuro.webp` | Solo el símbolo, 135×120 |
| `logo-512.png` | Cuadrado sobre fondo de marca. **Logotipo de los datos estructurados** (JSON-LD) |
| `icon-192.png` | Icono de aplicación |
| `perfil-redes-1080.png` | Foto de perfil de **Instagram, Facebook y WhatsApp Business** (subirla a mano) |
| `../og-ruiperez-studio.png` | Imagen al compartir (1200×630) |
| `../../apple-touch-icon.png`, `../../favicon.ico` | Icono de pestaña y de pantalla de inicio |
| `../gbp/logo-ruiperez.png` | Logotipo de la ficha de Google |

## Reglas de uso

- **Sobre fondo claro, versión `claro`; sobre fondo oscuro, versión `oscuro`.** Nunca el blanco sobre claro.
- **No estirar, no recolorear, no añadir sombras ni contornos.** Margen de seguridad: la altura de la «R» entre
  el logo y cualquier otro elemento.
- **Tamaño mínimo:** el logo horizontal, 100 px de ancho; el símbolo solo, 16 px.
- En pantallas de menos de 350 px la cabecera muestra solo el símbolo.
- El logo **no** lleva el eslogan en la web: el eslogan es del cartel, no de la cabecera.

## Cómo regenerar

El script que hizo estos archivos usa solo PIL (sin dependencias del proyecto). Si algún día hay un vector
(SVG) del logo, **sustituye** estos rasters: es lo correcto y evita el escalado.

## Pendiente de Álvaro

- Subir `perfil-redes-1080.png` como foto de perfil en Instagram, Facebook y WhatsApp Business (el conector no puede cambiarla).
- Las seis publicaciones de Instagram (`img/ig/`) siguen con la identidad anterior: se pueden rehacer con el logo nuevo.
- Si tiene el logo en vector (SVG/PDF/AI), pasarlo: mejoraría el tamaño de cabecera en pantallas de alta densidad.
