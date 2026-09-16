# El asistente de la web — qué es y qué no

Vive en [`/js/asistente.js`](../js/asistente.js). Aparece como un botón flotante en las 19 páginas indexables. Las dos landings de pago (`/lp/`) lo llevan **a propósito desactivado**: tienen un único CTA y nada debe competir con él.

## Qué es exactamente

Un **buscador de respuestas** sobre una base de conocimiento escrita a mano con las FAQ que ya están publicadas en el sitio. El visitante escribe, se normaliza el texto (minúsculas, sin tildes) y se busca coincidencia **por palabra completa** contra las claves de cada entrada. Gana la de mayor puntuación; las claves de varias palabras puntúan más que las sueltas.

Si ninguna entrada llega a la puntuación mínima, **no improvisa**: dice que no lo sabe, da el teléfono y abre WhatsApp con la pregunta del visitante ya escrita en el mensaje.

## Qué NO es

**No es un modelo de lenguaje.** Y eso es deliberado, no una limitación que haya que disimular:

1. Una web estática no puede ejecutar un LLM. Haría falta un backend.
2. Poner una clave de API en el navegador es regalarla: cualquiera abre el código fuente y la usa a tu costa.
3. **Álvaro vende chatbots con IA de verdad, desde 1.200€.** Si aquí se anunciara como «IA» un buscador de palabras clave, el primer visitante que lo probara y notara la diferencia concluiría que los chatbots que vende son igual de flojos. El daño comercial sería mayor que el beneficio.

Por eso en la interfaz pone «Resuelvo tus dudas» y «Respuestas automáticas sobre lo que ya está publicado en la web». En ningún sitio dice «IA».

## Cómo añadir o cambiar respuestas

En `KB`, al principio del archivo. Cada entrada:

```js
{ k:["palabras","que","la","activan"],
  t:"Titular de la respuesta",
  l:["lista","opcional","de","puntos"],
  n:"Matiz o nota final",
  u:"/pagina-relacionada/" }
```

Reglas para las claves:
- Evita palabras genéricas sueltas (`cuanto`, `como`, `que`). Usa la expresión entera: `"cuanto cuesta"`, `"cuanto tarda"`.
- Cuidado con las claves cortas. `"ia"` activaba la respuesta del chatbot al escribir «murc**ia**»; por eso ahora la coincidencia exige palabra completa.
- Las claves de 4 letras o más admiten sufijo: `"tarda"` casa con «tardas» y «tardarás».

Si cambias un precio o un plazo, **cámbialo también aquí**: esta base es independiente de las FAQ de las páginas y no se sincroniza sola.

## Si algún día quieres una IA de verdad

Es perfectamente viable en este proyecto, pero es otro trabajo y tiene coste recurrente:

1. **Función serverless en Vercel** (`/api/chat`). El proyecto no tiene `package.json` todavía; habría que añadirlo. La CSP ya permite `connect-src 'self'`, así que por ahí no hay que tocar nada.
2. **Clave de API** de Anthropic o de OpenAI, guardada como variable de entorno en Vercel — nunca en el navegador.
3. **Protección contra abuso**: límite por IP y tope de gasto mensual. Sin esto, cualquiera puede dejar la factura a cero o a las nubes.
4. **Contexto**: se le pasan al modelo los precios, plazos y servicios reales para que no se los invente. Aun así, un LLM puede equivocarse, así que hay que instruirle para que escale a WhatsApp cuando no esté seguro.
5. **Cookies**: si el chat guarda la conversación, hay que declararlo en `/cookies/`.

Coste orientativo: unos céntimos por conversación, más lo que cueste el plan de Vercel si hace falta subirlo. Con poco tráfico son un par de euros al mes; con una campaña de pago detrás, hay que poner el tope.

## Lo que sí conviene hacer ya

Revisar cada pocas semanas **qué preguntas acaban en «esto no sé contestártelo»**. Cada una de ellas es o una respuesta que falta en la base, o una duda que no está resuelta en la web. Ahora mismo eso no se registra en ningún sitio: si quieres medirlo, se puede enviar un evento a GA4 cuando el asistente no sabe responder.
