# Panel de negocio de Ruipérez Studio — plan y accesos (10/10/2026)

> Privado (`docs/` está en `.vercelignore`). **Sin ninguna clave aquí**: los secretos van en las variables de entorno de Vercel
> y en Supabase, nunca en el repositorio ni en un chat.

## 0. Estado real hoy

| Pieza | Estado |
|---|---|
| Meta Ads | cuenta `1086058157249572`, activa, **0 € gastados y ninguna campaña** |
| Google Ads | **sin acceso desde aquí** (nunca hubo conector) |
| GA4 | propiedad `552072025` con `generate_lead` disparando; **sin acceso directo desde aquí** (solo lo había por Windsor, ya descartado) |
| Search Console | `ruiperezstudio.es`; sin acceso desde aquí |
| Supabase | **un solo proyecto**, «Ruiperezz's Project» (eu-west-1), que casi seguro usan automatizaciones de clientes |
| Vercel | equipo `ruiperezz's projects`; **plan sin confirmar** (Hobby es solo uso no comercial) |
| Tráfico | septiembre: 14 clics desde Google. **Una IA no puede optimizar con ese volumen** (ver §5) |

## 1. Lo que tienes que darme, por orden de urgencia

**Regla:** me pasas IDs y, si hace falta, un token que pones tú en Vercel. **Nunca pegues una clave en el chat.**

### A. Para que el panel exista
1. **Un proyecto de Supabase NUEVO solo para el panel.** No mezcles los datos de tus anuncios y tus prospectos con las bases de datos de tus clientes.
2. **Subdominio** `panel.ruiperezstudio.es` (un CNAME en IONOS hacia Vercel; te digo el valor cuando lo cree). Acceso solo con tu correo, con segundo factor.
3. **Confirmar el plan de Vercel** (Pro). Un panel con claves de anuncios en una cuenta Hobby incumple sus condiciones.
4. **Una clave de la API de Anthropic** para la IA, con límite de gasto mensual fijado por ti.

### B. Datos de anuncios (lectura primero)
| Fuente | Qué necesito | Cómo se consigue | Tiempo |
|---|---|---|---|
| **Google Ads** | ID de cliente (xxx-xxx-xxxx), **token de desarrollador** (nivel Básico), credencial OAuth | Cuenta de administrador (MCC) → Centro de API → solicitar acceso Básico. Proyecto en Google Cloud con la API de Google Ads activada | **de 1 a varios días laborables** (lo aprueba Google): pídelo ya |
| **Meta Ads** | ID de cuenta (ya lo tengo), **token de usuario del sistema** con `ads_read` (y `ads_management` solo cuando quieras que el panel pueda pausar), ID del píxel, ID de la página | Business Manager → Usuarios del sistema → generar token. App de Meta en modo desarrollo vale para tu propia cuenta | mismo día |
| **GA4** | ID de propiedad (ya lo tengo) | Google Cloud → cuenta de servicio con la API de datos de Analytics → añadir su correo como **Lector** en la propiedad | mismo día |
| **Search Console** | — | La misma cuenta de servicio, añadida como usuario de la propiedad | mismo día |
| **Ficha de Google** | — | La API de Business Profile exige solicitud de acceso a Google; es opcional | días |

### C. Para cerrar el círculo del dinero (lo que de verdad cambia las decisiones)
5. **Dónde se anota cada contacto y qué pasó con él.** Hoy WhatsApp abierto = intención, no lead. El panel tendrá una tabla de contactos (origen, anuncio, estado: contactado / presupuesto / cerrado / perdido, importe). **Sin esto la IA solo sabría quién hace clic, no quién paga.**
6. Opcional pero potente: **WhatsApp Business Platform (Cloud API)**. Permitiría saber qué conversaciones llegan de qué anuncio y registrar el lead confirmado. Exige migrar o añadir un número a la API oficial; lo decidimos después.
7. **Costes del negocio** (herramientas, dominio, hosting, la IA): una lista mensual para que «dónde se va mi dinero» incluya algo más que anuncios. Facturas: solo importes en el panel, no se suben al repositorio.

### D. Para la prospección (ver §6)
8. **Clave de Google Places API** y clave de **PageSpeed Insights API** (ambas gratuitas hasta cierto uso, en el mismo proyecto de Google Cloud).
9. Qué herramienta de datos de contacto usarías (hay conectores de Apollo y Vibe Prospecting disponibles; cuestan créditos). **Semrush no tiene unidades de API** ahora mismo.

## 2. Arquitectura

Proyecto aparte (`ruiperez-panel`), no dentro de la web estática: Next.js + Supabase + Vercel, igual que Finca Doña Carmen.
- **Los secretos solo viven en el servidor** (funciones de Vercel). El navegador nunca ve un token de anuncios.
- **Sincronización** por tareas programadas (cron de Vercel) que copian cada día los datos a Supabase: el panel y la IA leen de ahí, no de las APIs en directo (más rápido, más barato y sin agotar cuotas).
- **Roles de la base de datos:** la IA lee con un rol de **solo lectura**; cualquier acción que gaste dinero (pausar, subir presupuesto) pasa por una **cola de aprobación** donde tú pulsas «aplicar».
- Registro de auditoría de todo lo que la IA propone y de lo que tú apruebas.

## 3. Secciones del panel

1. **Resumen:** gasto, contactos, coste por contacto y por cliente, ingresos de los clientes cerrados. Lo primero es el dinero.
2. **Dónde se va el dinero:** gasto por plataforma, campaña, conjunto y anuncio; comparado con lo que dejó de ingreso.
3. **Creativos:** ranking por coste por contacto, frecuencia y fatiga; etiqueta de estado (aprendiendo / funciona / pausar). **No hay veredicto antes de datos suficientes** (ver §5).
4. **Ángulos de venta:** cada anuncio lleva una etiqueta de ángulo (precio, rapidez, prueba social, problema concreto, automatización…). El panel compara ángulos entre sí, no solo anuncios sueltos.
5. **Embudo:** impresión → clic → visita → `form_start` → `generate_lead` → contacto real → presupuesto → cierre. Aquí se ve en qué escalón se cae cada campaña.
6. **Landing y web:** conversión por página (de GA4), velocidad, errores.
7. **Contactos (CRM mínimo):** cada contacto con su origen y su estado; es lo que cierra el círculo.
8. **Prospección:** lista de negocios, su diagnóstico online y el guion de llamada (ver §6).
9. **Asistente IA:** conversa contigo sobre todo lo anterior.
10. **Proyectos e ideas:** servicios nuevos, precios, experimentos; con la decisión tomada y el resultado.
11. **Alertas:** gasto fuera de tope, anuncio con coste disparado, conexión caída, token a punto de caducar.

## 4. La IA

**No se «entrena».** Se le da: acceso de solo lectura a los datos del panel, tus reglas de negocio (precios, topes, qué no se promete), un cuaderno con el historial de decisiones y resultados, y herramientas para consultar. Esto es más seguro y más barato que ajustar un modelo, y mejora solo a medida que el panel acumula datos.
- **Aconseja, no actúa.** Propone («pausar este anuncio, y por qué»); tú apruebas.
- **Dice cuándo no sabe.** Con pocos datos responde «todavía no hay muestra», con el número que falta.
- **Memoria:** guarda tus decisiones y su resultado para no repetir errores.
- Tope de gasto en la API de Anthropic y registro de cada consulta.

## 5. Una advertencia honesta antes de gastar

Con 14 clics al mes y 0 € invertidos, **no hay datos sobre los que decidir qué creativo funciona**. Meta pide del orden de 50 eventos por conjunto de anuncios y varios días de aprendizaje; con presupuestos de 5-10 € al día, un anuncio tarda semanas en tener muestra. Por eso:
- Los primeros 30 días el panel vale por **ordenar el gasto y registrar contactos**, no por optimizar.
- La IA debe llevar **reglas de significación mínima** (no veredicto con menos de N contactos o X euros) y mostrarlas.
- Los umbrales de coste por contacto que hay hoy son provisionales y salen de un cierre supuesto de 1 de cada 7: **hay que sustituirlos por tu tasa real** en cuanto haya presupuestos.
- Cualquier «ángulo ganador» con muestras pequeñas es ruido. La IA lo dirá así.

## 6. Prospección: qué se puede hacer y dónde está el límite

**Se puede y tiene sentido (y es lo que más te va a ahorrar tiempo):**
- Buscar negocios por zona y sector (Google Places) que **no tienen web, la tienen sin móvil, sin reservas o sin ficha cuidada**.
- Diagnóstico automático de su web: velocidad (PageSpeed), si carga en móvil, HTTPS, si tiene formulario o WhatsApp, reseñas y respuesta a ellas, si aparece en Google Maps.
- Un informe de una página por negocio y **un guion de llamada** con el problema concreto y la solución que encaja con tus servicios. Tú solo llamas.

**Límites que hay que respetar (consúltalo con tu gestoría o un abogado antes de lanzar nada masivo):**
- Los datos de contacto de empresas y autónomos están protegidos por el RGPD: hace falta una base jurídica (el interés legítimo suele valer en B2B) y **informar** a la persona en el primer contacto, con un modo claro de oponerse.
- **El correo comercial no solicitado está restringido por la LSSI (art. 21).** Por eso la propuesta es **llamada manual y mensaje individual**, no envíos masivos automáticos. Para llamadas, comprobar la **Lista Robinson**.
- No guardar más datos de los necesarios, con plazo de borrado, y no raspar plataformas cuyas condiciones lo prohíben.
- La IA **prepara**; no envía ni llama.

## 7. Fases

| Fase | Contenido | Depende de |
|---|---|---|
| **0 · Cimientos** | Proyecto Supabase nuevo, repositorio, subdominio, login con segundo factor, estructura de tablas | A.1–A.4 |
| **1 · Datos de anuncios (solo lectura)** | Meta + GA4 + Search Console, sección Resumen/Gasto/Embudo | B (Meta y GA4 son rápidos) |
| **2 · Contactos** | CRM mínimo y cierre del círculo; subida de conversiones cualificadas a Google y Meta cuando haya | C.5 |
| **3 · Google Ads** | Se añade cuando Google apruebe el token | B (token Básico) |
| **4 · Creativos y ángulos** | Etiquetado, ranking con reglas de significación, alertas | datos de las fases 1-3 |
| **5 · Asistente IA** | Consulta y consejo, cuaderno de decisiones | A.4 y datos |
| **6 · Prospección** | Búsqueda, diagnóstico, guiones | D |
| **7 · Acciones con aprobación** | Pausar/ajustar presupuesto desde el panel | tu decisión explícita, después de meses de datos |

**Orden recomendado:** pide ya el token de desarrollador de Google Ads (es lo que más tarda) mientras se montan las fases 0 y 1 con Meta y GA4.
