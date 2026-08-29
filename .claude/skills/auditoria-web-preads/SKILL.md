---
name: auditoria-web-preads
description: Audita una web de negocio local español ANTES de invertir en Meta Ads, TikTok Ads o Google Ads. Revisa siete capas — coherencia de oferta y precios, copy y eslóganes, prueba social, cumplimiento legal (LSSI, RGPD, cookies con píxeles), medición y píxeles, encaje entre el tráfico frío y la landing, y comparativa con la competencia local real. Úsala SIEMPRE que el usuario diga "analiza mi web", "revisa mi web antes de hacer anuncios", "voy a empezar con Meta/TikTok ads", "mi web no convierte", "audita esta web", "compárame con la competencia", "revisa mis textos/eslóganes", "está lista mi web para publicidad", o cuando pegue una URL de una web de servicios o comercio local pidiendo mejoras. Úsala también cuando prepare la web de un cliente para una campaña, aunque no use la palabra "auditoría".
---

# Auditoría web pre-campaña (mercado español, negocio local)

Objetivo: decidir si una web está lista para recibir tráfico de pago, y si no lo está, decir exactamente qué hay que arreglar y en qué orden. El entregable no es una lista de opiniones de diseño: es una lista de fallos con evidencia, ordenada por dinero perdido.

## Principio rector

**Una web bonita que recibe tráfico de pago sin estar lista quema presupuesto más rápido que una web fea sin tráfico.** El orden de trabajo es siempre: bloqueantes legales/fiscales → medición → coherencia de oferta → encaje mensaje-tráfico → copy → estética. Nunca al revés.

Segundo principio: **no se audita contra un ideal, se audita contra la competencia que el cliente va a ver en la misma SERP o en el mismo scroll.** Un fallo que también tienen los cinco competidores no es urgente. Una ventaja que ya reclaman los cinco competidores no es una ventaja.

## Procedimiento

Ejecuta las siete fases en orden. No saltes a recomendaciones de copy antes de completar la fase 1.

### Fase 0 — Recogida

1. `web_fetch` de la home con `html_extraction_method: markdown`.
2. `web_fetch` de todas las páginas de servicio y de las landings por ciudad enlazadas en el footer. Mínimo: 3 páginas internas.
3. `web_fetch` del aviso legal, la política de privacidad y la de cookies. **Nunca omitas este paso** — es donde aparecen la mitad de los bloqueantes.
4. Anota de cada página: title, meta description, H1, precio anunciado, CTA principal, persona gramatical (yo / nosotros).

Si una URL no es fetcheable, dilo explícitamente en el informe en vez de asumir que está bien.

### Fase 1 — Bloqueantes (legal, fiscal, identidad)

Ver `references/legal-espana.md` para el detalle. Comprueba como mínimo:

- Aviso legal con los datos del art. 10 LSSI: titular, NIF, domicilio o localidad, email, teléfono.
- Si se publica un DNI como NIF, verifica que exista alta censal (modelo 036/037). Publicar DNI + anunciar "+21% IVA" + actividad habitual = rastro probatorio ante la AEAT. **Márcalo como bloqueante, no como observación.**
- Banner de cookies: ¿declara solo analíticas? Si se van a instalar Meta Pixel o TikTok Pixel, hace falta categoría de publicidad, panel de configuración granular y política actualizada. Aceptar/Rechazar a secas no basta cuando hay varias finalidades.
- Email de contacto en dominio propio, no en gmail/hotmail.
- Coherencia entre el nombre comercial y el email (un "@...yasociados@gmail" contradice un posicionamiento de freelance individual).

### Fase 2 — Medición

Sin esto, la campaña no se puede optimizar y el gasto es ciego.

- ¿Hay Meta Pixel / TikTok Pixel / GA4 instalados? ¿Consent Mode v2?
- **El CTA principal a WhatsApp rompe la atribución.** Si todos los CTA van a `wa.me`, el píxel no ve la conversión. Exige: evento personalizado en el clic del botón antes de la redirección, o `wa.me` con parámetro de origen por campaña, o formulario alternativo visible.
- ¿Existe una página de gracias / evento de conversión definido? Si no, la campaña optimizará a "clic en enlace" y traerá basura.

### Fase 3 — Coherencia de oferta y precios

Cruza los precios de TODAS las páginas en una tabla. Busca específicamente:

- El mismo servicio con dos precios distintos en dos páginas.
- El mismo caso de éxito presentado con dos cifras de "inversión" distintas.
- Rangos de precio en tablas comparativas que no cubren el catálogo real.
- Promesas absolutas ("0€ de cuota mensual") desmentidas por algún servicio del catálogo o por la letra pequeña (hosting, licencias, cuota de chatbot).
- Persona gramatical: si la home dice "yo" y las páginas de servicio dicen "nosotros", la promesa de trato directo queda desmentida.

Cada contradicción encontrada se reporta con las dos citas literales y la URL de cada una.

### Fase 4 — Prueba social

- ¿Cuántos casos reales distintos hay? Un solo caso repetido en ocho secciones no es prueba social, es un caso repetido.
- ¿Las cifras de resultado son medidas o reportadas por el cliente? Si son reportadas, hay que decirlo en la web ("según datos del cliente"). Ver `references/claims-publicitarios.md`.
- ¿Los testimonios suenan escritos por la misma mano? Comprueba estructuras repetidas ("Desde el primer momento…", "Supieron entender perfectamente…"). Si se repiten, pide reescritura o sustitución por captura literal de Google.
- **Logos de "clientes que confían": verifica que ninguno sea un proyecto propio del usuario.** Presentar un proyecto propio como cliente es un fallo de honestidad que destruye credibilidad si alguien lo comprueba.

### Fase 5 — Encaje mensaje/tráfico (el más olvidado)

El tráfico de Google tiene intención; el de Meta y TikTok no. Un titular construido para intención de búsqueda ("si no te encuentran en Google…") no funciona con alguien que estaba viendo vídeos.

- Clasifica el titular actual: ¿asume que el visitante ya está buscando una solución? Si sí, no vale para social.
- Exige landings separadas por canal. Regla: **nunca mandar tráfico de pago a la home.**
- Para social frío, el gancho debe ser: visual (antes/después), específico de sector, y con una promesa comprobable en 3 segundos.
- Comprueba que exista al menos una landing sin menú de navegación, con un único CTA.

### Fase 6 — Copy y eslóganes

Evalúa cada titular con esta rúbrica de 4 puntos y puntúa 0-2 cada una:

1. **Concreción** — ¿contiene un número, un nombre propio o un hecho verificable?
2. **Consecuencia** — ¿nombra lo que el lector pierde o gana, no lo que el proveedor hace?
3. **Especificidad de sector** — ¿podría copiarlo cualquier competidor tal cual? Si sí, 0.
4. **Lectura en voz alta** — ¿suena a persona o a folleto?

Titulares con menos de 5/8 se reescriben. Entrega siempre 2 alternativas por titular reescrito, no una, y explica qué cambia cada una.

Elimina del copy: "soluciones", "a medida" sin ejemplo, "profesional", "calidad", "tu aliado digital", "llevamos tu negocio al siguiente nivel".

### Fase 7 — Competencia real

- Busca en `web_search` los términos exactos por los que compite ("diseño web [ciudad]", "[servicio] [ciudad]").
- Extrae de 4-6 competidores: precio de entrada anunciado, plazo prometido, promesa principal y tecnología.
- **Identifica la franja de competencia peligrosa**: no la barata ni la cara, sino la que dice lo mismo al mismo precio. Es la que roba el cliente en la comparación.
- Comprueba si la tabla comparativa del usuario esquiva esa franja. Casi siempre la esquiva.
- Formula el diferenciador defendible: el que la competencia local no puede copiar esta semana.

## Formato del entregable

```
1. Lo que no me estás preguntando (bloqueantes, máx. 3)
2. Errores objetivos encontrados — tabla: fallo | URL | cita literal | severidad
3. Análisis de eslóganes — tabla: actual | puntuación | 2 alternativas
4. Competencia — tabla comparativa + franja peligrosa + diferenciador defendible
5. Plan por orden de ejecución — Bloquea la campaña / Antes del primer euro / Primeras 2 semanas / Mejora continua
```

Cada afirmación se etiqueta con su nivel de certeza: **(Seguro)** si hay cita textual o dato verificado, **(Probable)** si es inferencia sólida, **(Suponiendo)** si se están rellenando huecos. Si la mayor parte de una sección es suposición, se dice al principio de esa sección.

## Errores frecuentes del auditor

- Empezar por el diseño. El diseño casi nunca es el cuello de botella.
- Recomendar "añade más testimonios" sin comprobar si hay clientes reales disponibles.
- Aprobar la web sin abrir la política de cookies.
- Proponer cambios de copy sin haber leído la competencia.
- Dar por buena una cifra de resultado porque está en la web del propio usuario.
- Confundir "no me gusta" con "esto pierde dinero". Solo se reporta lo segundo.

## Referencias

- `references/legal-espana.md` — LSSI, RGPD, cookies con píxeles publicitarios, claims.
- `references/claims-publicitarios.md` — cómo redactar resultados sin exponerse a competencia desleal.
- `references/rubrica-eslogan.md` — rúbrica ampliada con ejemplos buenos y malos en español.
