/*!
 * Ruipérez Studio — asistente de respuestas + acceso directo a WhatsApp
 * ---------------------------------------------------------------------------
 * QUÉ ES, CON PRECISIÓN: un buscador de respuestas sobre una base de
 * conocimiento escrita a mano con las FAQ reales del sitio. NO es un modelo
 * de lenguaje: una web estática no puede ejecutar uno, y meter una clave de
 * API en el navegador sería regalarla. Por eso en ningún sitio se anuncia
 * como «IA»: Álvaro VENDE chatbots con IA de verdad, y un visitante que
 * probara este y descubriera que es un buscador concluiría que los suyos
 * también lo son. Ver docs/asistente.md para la versión con LLM real.
 *
 * Cuando no sabe responder, no improvisa: da el teléfono y el enlace directo.
 */
(function () {
  "use strict";
  if (window.rsAsistente) return;

  var TEL = "642 08 40 42";
  var WA  = "https://wa.me/34642084042?text=";

  /* ═══ BASE DE CONOCIMIENTO ═══
     Cada entrada: claves que activan la respuesta, y la respuesta.
     Los textos salen de las FAQ que ya están publicadas en el sitio. */
  var KB = [
    { k:["precio","cuesta","cuanto cuesta","cuanto vale","cuanto seria","vale","cobras","tarifa","presupuesto","caro","barato","coste","cuanto me","precios"],
      t:"Los precios están publicados, sin tener que preguntar:",
      l:["Landing page: desde 590€","Web esencial (hasta 4 páginas): desde 690€","Web corporativa: desde 1.190€","Tienda online: desde 1.490€","Aplicación de gestión: desde 2.900€ + 90€/mes",
         "Consultoría de IA: diagnóstico desde 490€","Asistente interno de IA: 490€","Panel de negocio: desde 990€ + 39€/mes","Visibilidad en ChatGPT: desde 390€","Automatización: desde 990€ (esencial, 390€)","Chatbot de WhatsApp: desde 1.290€ + 120€/mes",
         "Redes sociales: desde 450€/mes","Email marketing: desde 290€/mes",
         "Accesibilidad (Ley 11/2023): desde 590€","Mantenimiento: 39–99€/mes, alojamiento incluido","Tarjeta NFC de reseñas: desde 27€"],
      n:"Todos sin IVA. El precio se cierra por escrito antes de empezar.", u:"/#servicios" },

    { k:["tarda","cuanto tardas","cuanto tarda","plazo","plazos","cuando estaria","rapido","entrega","semanas","urgente","tiempo"],
      t:"Depende del tipo de proyecto:",
      l:["Landing page, web esencial, web corporativa y tienda online: 1–2 semanas","Aplicación de gestión: 2–3 semanas"],
      n:"El plazo cuenta desde que me pasas el contenido, y te lo digo exacto antes de empezar." },

    { k:["cuota","mensual","permanencia","suscripcion","pago unico","pagos","fraccionar","financiar"],
      t:"La web es pago único: no tiene cuota mensual obligatoria.",
      n:"Los servicios mensuales —mantenimiento, redes, email— sí llevan cuota, y ninguno tiene permanencia salvo el acompañamiento de IA, que es de tres meses: avisas y se cierra el mes en curso." },

    { k:["codigo","propiedad","mio","dependo","atado","migrar","llevarme","fuente"],
      t:"El código es tuyo al 100% desde la entrega, con acceso completo al código fuente.",
      n:"Si algún día quieres llevarte la web a otro proveedor, no tienes que pedirme permiso ni pagarme nada: te ayudo con la migración sin coste." },

    { k:["seo","google","posicionar","buscar","encuentren","aparecer","primero","ranking"],
      t:"El SEO local va incluido en todas las webs, sin coste añadido.",
      l:["Estructura optimizada y datos estructurados","Velocidad de carga","Ficha de Google Business configurada",
         "Contenido orientado a lo que busca la gente de tu zona"],
      n:"El trabajo de posicionamiento mes a mes no lo ofrezco ahora mismo." },

    { k:["hosting","alojamiento","dominio","servidor","anual"],
      t:"El alojamiento va en Vercel y en el plan que uso no tiene coste.",
      n:"El único gasto recurrente es el dominio, unos 12€ al año. Lo gestiono yo y te lo repercuto sin recargo, o lo pones a tu nombre si lo prefieres." },

    { k:["pack","packs","packs de servicios","combinacion","todo junto","varios servicios","descuento","oferta","promocion","mas barato si contrato varios","junto","lote"],
      t:"Hay tres packs, entre un 16% y un 18% más baratos que contratando suelto.",
      l:["Arranca: web esencial + automatización esencial + tarjeta NFC de reseñas · 910€ (suelto 1.107€)","Vende online: tienda + automatización de pedidos · 2.080€ (suelto 2.480€)",
         "Atiende solo: web + automatización + chatbot IA · 2.910€ (suelto 3.470€)"],
      n:"Si necesitas otra combinación, dime qué dos o tres cosas te hacen falta y te la presupuesto con el mismo descuento por ir juntas.", u:"/#packs" },

    { k:["meta ads","facebook ads","instagram ads","anuncios","publicidad","campañas","promocionar","anuncios de facebook","anuncios de instagram","publicidad de pago","gestion de anuncios","cuanto cuesta anunciarse","presupuesto anuncios","inversion publicitaria"],
      t:"Ahora mismo no gestiono campañas de anuncios para clientes.",
      n:"Lo que sí hago es la página a la que enviar ese tráfico: una landing con un único botón de contacto, desde 590€ (+ IVA).", u:"/landing-page/" },

    { k:["accesibilidad","accesible","wcag","ley 11/2023","eaa","discapacidad","lector de pantalla","contraste","multa accesibilidad","en 301 549"],
      t:"Auditoría de accesibilidad: desde 590€, informe en 5 días.",
      l:["Auditoría sola: 590€","Auditoría más correcciones: 1.190€","Monitorización mensual: 95€/mes",
         "WCAG 2.1 AA a través de la EN 301 549"],
      n:"La exención de microempresa solo vale para servicios y exige menos de 10 empleados Y hasta 2 millones de facturación. Escríbeme y te digo si te aplica, sin cobrarte.", u:"/accesibilidad-web/" },

    { k:["aplicacion","aplicacion web","app","cuesta una aplicacion","precio aplicacion","precio de la aplicacion","cuesta una app","precio app","panel de gestion","panel de administracion","software a medida","programa de gestion","area privada","zona de clientes"],
      t:"Una aplicación web de gestión: desde 2.900€ más 90€/mes.",
      l:["Panel de administración solo para ti","Cada cliente entra con su usuario y ve solo lo suyo",
         "Base de datos propia, no una hoja de cálculo","De 2 a 3 semanas desde que me pasas el contenido"],
      n:"Los 90€/mes cubren alojamiento, base de datos, copias de seguridad y soporte. Sin permanencia.", u:"/aplicaciones-web/" },

    { k:["automatizacion","automatizar","n8n","make","procesos","tareas","repetitiv","integrar","conectar"],
      t:"Automatizo las tareas que hoy haces a mano y podrían hacerse solas.",
      l:["Email automático cuando entra un pedido o un lead","Avisos y recordatorios","Sincronización entre las apps que ya usas"],
      n:"Desde 990€, o 390€ la versión esencial. Si pierdes horas copiando datos de un sitio a otro, esto es lo que más te va a rentar.", u:"/automatizacion/" },

    { k:["consultoria","consultor","consultoria ia","diagnostico","diagnostico ia","chatgpt","por donde empiezo","formacion ia","taller","reglamento ia","alfabetizacion","que puedo automatizar"],
      t:"La consultoría de IA empieza por un diagnóstico de 490€ + IVA:",
      l:["Sesión de 90 minutos e informe en 5 días laborables","Qué tareas puede hacer la IA, cuánto cuesta montarlas y cuántas horas ahorran",
         "Plan con taller para tu equipo: 1.390€","Acompañamiento: 240€/mes, 3 horas y una reunión al mes, mínimo 3 meses"],
      n:"Si el informe no trae tres acciones concretas con su coste, te devuelvo el dinero. Si ya sabes lo que quieres automatizar, no te hace falta: mira la automatización esencial.", u:"/consultoria-ia/" },

    { k:["web esencial","web corporativa","pagina web","paginas web","diseno web","sitio web","hacer una web","crear una web","web para mi negocio","quiero una web","necesito una web"],
      t:"Según el tamaño que necesites:",
      l:["Landing page (una sola página para anuncios): desde 590€","Web esencial (hasta 4 páginas): desde 690€","Web corporativa (completa, con SEO local): desde 1.190€"],
      n:"Todo sin IVA, con precio cerrado por escrito y de 1 a 2 semanas desde que me pasas el contenido. El código es tuyo desde la entrega.", u:"/web-corporativa/" },

    { k:["eres una ia","eres un bot","eres un robot","eres humano","eres una persona","hablo con una persona","hablo con un robot","hablo con una maquina","con quien hablo","eres chatgpt"],
      t:"No: este asistente no es una inteligencia artificial.",
      n:"Es un buscador sobre respuestas que he escrito yo. Si quieres hablar con una persona, te contesta Álvaro por WhatsApp." },

    { k:["panel","dashboard","estadisticas","metricas","cuanto vendo","panel de control","ver mis ventas","cuadro de mando"],
      t:"El panel de negocio junta en una pantalla lo que has cobrado, los pedidos o reservas, las visitas y los clics a WhatsApp:",
      l:["Desde 990€ + 39€/mes, sin permanencia","Hasta tres fuentes de datos: tu tienda, Stripe, Google Analytics…","Ya funcionan tres: TukTuk Cartagena, Floristería Alameda y Finca Doña Carmen"],
      n:"Si además quieres trabajar desde ahí —altas, precios, bloquear días—, eso es una aplicación de gestión.", u:"/panel-de-negocio/" },

    { k:["aparecer en chatgpt","salir en chatgpt","que me recomiende chatgpt","perplexity","gemini","buscadores con ia","buscadores ia","llms"],
      t:"Reviso qué contestan ChatGPT, Gemini y Perplexity sobre tu negocio y preparo tu web para que te entiendan:",
      l:["Revisión: 390€","Con los cambios hechos: 790€, y repetimos las preguntas a los 60 días"],
      n:"No te prometo que te citen: nadie puede. Lo he hecho primero en mi propia web y lo puedes comprobar.", u:"/visibilidad-chatgpt/" },

    { k:["asistente interno","documentos de la empresa","procedimientos","manual de la empresa","base de conocimiento"],
      t:"El asistente interno de IA conoce los documentos de tu empresa y contesta a tu equipo con lo que pone en ellos:",
      l:["490€, pago único","Hasta 20 documentos, probado con 20 preguntas reales","La suscripción a Claude, ChatGPT o Gemini la pagas tú"],
      n:"Conmigo no hay cuota.", u:"/consultoria-ia/#asistente" },

    { k:["chatbot","bot","inteligencia artificial","inteligencia","responder solo","24 horas","whatsapp business","contestar solo","robot"],
      t:"Monto asistentes con IA de verdad sobre WhatsApp Business.",
      l:["Responden preguntas de tus clientes las 24 horas","Toman reservas","Escalan a ti cuando no saben algo"],
      n:"Desde 1.290€ más 120€/mes. Se entrenan con tus precios, horarios y servicios.", u:"/chatbot-whatsapp/" },

    { k:["tienda","ecommerce","vender online","carrito","pasarela","pago tarjeta","productos","stock"],
      t:"Tienda online completa: catálogo, carrito, pasarela de pago y gestión de pedidos.",
      n:"Desde 1.490€, y el catálogo queda cobrando en 72 horas desde que me pasas fotos y precios. La de Floristería Alameda la puedes ver funcionando en floristeriaalameda.com.", u:"/tienda-online/" },

    { k:["zona","donde trabajas","donde estas","cartagena","murcia","desplaz","presencial","reunion","vernos","lejos","trabajas en","vives"],
      t:"Estoy en Cartagena y trabajo en toda la Región de Murcia.",
      n:"Si prefieres que nos veamos en tu negocio, me muevo. Y si te va mejor por WhatsApp o videollamada, también." },

    { k:["texto","contenido","fotos","redactar","escribir","aportar","material"],
      t:"Si no tienes los textos, los escribo yo y va incluido en el precio.",
      n:"De ti necesito saber qué vendes y a quién. Las fotos del negocio las pones tú, y te digo exactamente qué necesito y cómo hacerlas con el móvil." },

    { k:["nfc","tarjeta","tarjetas","resenas","reseñas","valoraciones","opiniones google","dejar resena"],
      t:"Tarjeta NFC de reseñas: 27€ más IVA, pago único.",
      l:["1 tarjeta: 27€ · 2 tarjetas: 50€ · 4 tarjetas: 100€","Te la llevo y la dejo instalada y funcionando en tu negocio","QR impreso de respaldo, por si el móvil no lee NFC","Funciona en iPhone desde el XS y en la mayoría de Android","Una tarjeta va incluida en el pack Arranca"],
      n:"No te prometo cuántas reseñas conseguirás: depende de que tu equipo se la ofrezca al cliente. Es un producto nuevo y no tengo cifras que enseñarte.", u:"/tarjeta-nfc-resenas/" },

    { k:["mantenimiento","despues","soporte","actualiza","copias","backup","averia","se rompe"],
      t:"Los primeros 30 días incluyen ajustes sin coste.",
      n:"Después, plan de mantenimiento opcional desde 39€/mes con el alojamiento incluido, o cambios puntuales a 60€/hora. Sin permanencia.", u:"/mantenimiento-web/" },

    { k:["barata","180","300","wix","wordpress","plantilla","mas barato","competencia"],
      t:"Las webs de 180–300€ son plantillas genéricas.",
      n:"Tienen su lugar si el presupuesto no da para más. El problema es lo que no incluyen: SEO local real, diseño propio y los costes anuales ocultos de hosting, plugins y renovación del tema." },

    { k:["redes","redes sociales","instagram","tiktok","facebook","publicaciones","publicar","cuantas publicaciones","contestas los mensajes","contestar mensajes","comentarios","community manager","contenido","reels","videos"],
      t:"Gestión de redes: 8 publicaciones al mes, dos de ellas en vídeo, desde 450€/mes.",
      l:["8 publicaciones al mes, 2 en vídeo","2 historias al mes","Una red social incluida; la segunda, 90€/mes más","Calendario que apruebas tú antes de publicar"],
      n:"Lo que NO incluye: contestar comentarios y mensajes. Eso es estar de guardia todo el día y a este precio no se hace bien. Te dejo escritas las respuestas que más se repiten.", u:"/gestion-redes-sociales/" },

    { k:["email","newsletter","mailing","correos","brevo","mailchimp"],
      t:"Correos que se envían solos: bienvenida, seguimiento post-compra, recordatorios y recuperación de carritos.",
      n:"Desde 290€/mes, sin permanencia.", u:"/email-marketing/" },

    { k:["landing","una pagina","promocion","campaña","anuncios"],
      t:"Una sola página diseñada para convertir visitas en clientes.",
      n:"Desde 590€, lista en 1-2 semanas desde que me pasas el contenido. Va bien si quieres probar sin gastar mucho o vas a promocionar una oferta concreta.", u:"/landing-page/" },

    { k:["quien eres","sobre ti","experiencia","trabajos","portfolio","proyectos","casos","clientes"],
      t:"Soy Álvaro Ruipérez. Construyo webs, tiendas y aplicaciones de gestión en el sureste.",
      n:"Tengo cuatro proyectos publicados que puedes abrir y comprobar ahora mismo.", u:"/casos/" },

    { k:["factura","iva","autonomo","pagar","transferencia","bizum"],
      t:"Todos los precios del sitio son sin IVA; se suma el 21% en la factura.",
      n:"El precio se cierra por escrito antes de empezar, y no hay extras que aparezcan a mitad del proyecto." },

    { k:["movil","responsive","telefono","tablet"],
      t:"Todas las webs se hacen pensando primero en el móvil.",
      n:"Es desde donde te va a mirar la mayoría de tus clientes, así que es donde tiene que verse bien y cargar rápido." },

    { k:["garantia","seguro","confiar","estafa","fiable"],
      t:"Precio cerrado por escrito antes de empezar, 30 días de ajustes incluidos y el código es tuyo desde la entrega.",
      n:"Y los cuatro proyectos que enseño están publicados con nombre y dirección: puedes abrirlos y comprobarlos.", u:"/casos/" }
  ];

  var SUGERENCIAS = ["¿Cuánto cuesta una web?","¿Cuánto tardas?","¿Hay cuota mensual?","¿Incluye SEO?","¿El código es mío?"];

  /* ═══ BÚSQUEDA ═══ */
  function normalizar(s) {
    return String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\s]/g, " ");
  }
  /* Coincidencia por PALABRA COMPLETA, no por subcadena. Con subcadena,
     «murcia» activaba la clave «ia» y devolvía la respuesta del chatbot.
     Las claves de 4 letras o más admiten sufijo: «tarda» casa con «tardas». */
  function buscar(q) {
    var n = " " + normalizar(q).replace(/\s+/g, " ").trim() + " ";
    if (n.replace(/\s/g, "").length < 3) return null;
    var mejor = null, max = 0;
    KB.forEach(function (e) {
      var p = 0;
      e.k.forEach(function (clave) {
        var c = normalizar(clave).trim();
        if (!c) return;
        var re = new RegExp("(^| )" + c.replace(/ +/g, " ") + (c.length >= 4 ? "[a-z]*" : "") + "( |$)");
        if (re.test(n)) p += c.indexOf(" ") > -1 ? 4 + c.split(" ").length : (c.length >= 6 ? 3 : 2);
      });
      if (p > max) { max = p; mejor = e; }
    });
    return max >= 2 ? mejor : null;
  }

  /* ═══ INTERFAZ ═══ */
  var CSS = [
    '.rsa-stack{position:fixed;right:1.1rem;bottom:1.1rem;z-index:940;display:flex;flex-direction:column;',
    'align-items:flex-end;gap:.6rem}',
    '.rsa-stack[hidden]{display:none}',
    '.rsa-fab{display:flex;align-items:center;gap:.55rem;',
    'background:#111318;color:#F7F7FA;border:0;border-radius:100px;padding:.85rem 1.25rem;cursor:pointer;',
    'font:700 .92rem/1 Karla,system-ui,sans-serif;box-shadow:0 14px 34px -14px rgba(17,19,24,.6);',
    'transition:transform .22s cubic-bezier(.22,1,.36,1),background .22s}',
    '.rsa-fab:hover{background:#000;transform:translateY(-2px)}',
    '.rsa-fab:focus-visible,.rsa-x:focus-visible,.rsa-s:focus-visible,.rsa-send:focus-visible{outline:2.5px solid #A99DF7;outline-offset:3px}',
    '.rsa-fab[hidden]{display:none}',
    '.rsa-wf{width:56px;height:56px;border-radius:50%;background:#128C7E;color:#fff;flex:none;',
    'display:flex;align-items:center;justify-content:center;text-decoration:none;',
    'box-shadow:0 14px 34px -12px rgba(18,140,126,.8);',
    'transition:transform .22s cubic-bezier(.22,1,.36,1),background .22s}',
    '.rsa-wf:hover{background:#0E6B60;color:#fff;transform:translateY(-2px)}',
    '.rsa-wf:focus-visible{outline:2.5px solid #111318;outline-offset:3px}',
    '.rsa-p{position:fixed;right:1.1rem;bottom:1.1rem;z-index:941;width:min(23rem,calc(100vw - 2.2rem));',
    'max-height:min(34rem,calc(100vh - 2.2rem));display:none;flex-direction:column;background:#FFFFFF;',
    'border:1px solid #E1E2E8;border-radius:18px;overflow:hidden;box-shadow:0 30px 70px -24px rgba(17,19,24,.5);',
    'font-family:Karla,system-ui,sans-serif}',
    '.rsa-p.on{display:flex}',
    '.rsa-h{display:flex;align-items:center;gap:.6rem;padding:.9rem 1rem;background:#111318;color:#F7F7FA;flex:none}',
    '.rsa-h b{font-size:.92rem;display:block}',
    '.rsa-h span{font-size:.68rem;opacity:.74;display:block;margin-top:.1rem}',
    '.rsa-x{margin-left:auto;background:none;border:0;color:#F7F7FA;font-size:1.5rem;line-height:1;cursor:pointer;padding:.2rem .4rem;border-radius:6px}',
    '.rsa-x:hover{background:rgba(247,247,250,.14)}',
    '.rsa-b{flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.7rem;background:#F3F3F7}',
    '.rsa-m{font-size:.87rem;line-height:1.5;padding:.7rem .85rem;border-radius:14px;max-width:92%}',
    '.rsa-in{align-self:flex-start;background:#FFFFFF;border:1px solid #E1E2E8;color:#4B4F5C;border-bottom-left-radius:4px}',
    '.rsa-out{align-self:flex-end;background:#DEDFE6;color:#111318;border-bottom-right-radius:4px}',
    '.rsa-m strong{color:#111318}',
    '.rsa-m ul{margin:.5rem 0 0;padding-left:1.1rem}',
    '.rsa-m li{margin-bottom:.22rem}',
    '.rsa-m a{color:#5B4BD9;text-decoration:underline}',
    '.rsa-wa{display:inline-flex;align-items:center;gap:.45rem;margin-top:.6rem;background:#6C5CE7;color:#FFFFFF;',
    'padding:.6rem 1rem;border-radius:100px;font-weight:700;font-size:.84rem;text-decoration:none}',
    '.rsa-wa:hover{background:#5546CF;color:#FFFFFF}',
    '.rsa-sug{display:flex;flex-wrap:wrap;gap:.35rem;padding:0 1rem .7rem;background:#F3F3F7;flex:none}',
    '.rsa-s{background:#FFFFFF;border:1px solid #E1E2E8;color:#4B4F5C;font:600 .76rem/1.3 Karla,system-ui,sans-serif;',
    'padding:.42rem .7rem;border-radius:100px;cursor:pointer}',
    '.rsa-s:hover{border-color:#6C5CE7;color:#5B4BD9}',
    '.rsa-f{display:flex;gap:.45rem;padding:.7rem;border-top:1px solid #E1E2E8;background:#FFFFFF;flex:none}',
    '.rsa-i{flex:1;border:1px solid #E1E2E8;border-radius:100px;padding:.6rem .9rem;font:400 .86rem Karla,system-ui,sans-serif;',
    'color:#111318;background:#F7F7FA;min-width:0}',
    '.rsa-i:focus{outline:2px solid #6C5CE7;outline-offset:1px}',
    '.rsa-send{flex:none;width:42px;height:42px;border-radius:50%;border:0;background:#111318;color:#F7F7FA;cursor:pointer;',
    'display:flex;align-items:center;justify-content:center}',
    '.rsa-send:hover{background:#000}',
    '.rsa-nota{font-size:.66rem;color:#5F6371;text-align:center;padding:0 .7rem .6rem;background:#FFFFFF;flex:none;line-height:1.35}',
    '@media(max-width:720px){.rsa-stack{right:.8rem;bottom:.8rem}',
    'html.rsa-bar .rsa-stack{bottom:5.4rem}',
    'html.rsa-bar .rsa-wf{display:none}',
    '.rsa-p{bottom:.7rem;right:.7rem;left:.7rem;width:auto;max-height:calc(100vh - 1.4rem)}}',
    '@media (prefers-reduced-motion:reduce){.rsa-fab,.rsa-wf{transition:none}}'
  ].join("");

  var IWA = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg>';

  var IWF = '<svg viewBox="0 0 24 24" width="27" height="27" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg>';

  var fab, stack, panel, cuerpo, campo, ultimoFoco;

  function el(t, a, h) {
    var n = document.createElement(t);
    if (a) Object.keys(a).forEach(function (k) { n.setAttribute(k, a[k]); });
    if (h != null) n.innerHTML = h;
    return n;
  }
  function wa(texto) { return WA + encodeURIComponent(texto); }

  function decir(html, quien) {
    var m = el("div", { class: "rsa-m " + (quien === "yo" ? "rsa-out" : "rsa-in") }, html);
    cuerpo.appendChild(m);
    cuerpo.scrollTop = cuerpo.scrollHeight;
    return m;
  }

  function responder(q) {
    decir(q.replace(/</g, "&lt;"), "yo");
    var e = buscar(q);
    setTimeout(function () {
      if (!e) {
        decir('<strong>Esto no sé contestártelo.</strong> Prefiero decírtelo a inventarme una respuesta.'
          + '<br>Escríbele a Álvaro directamente, te contesta él:'
          + '<br><a class="rsa-wa" href="' + wa("Hola Álvaro, te escribo desde la web. Mi pregunta es: " + q)
          + '" target="_blank" rel="noopener noreferrer">' + IWA + ' Preguntar por WhatsApp</a>'
          + '<br><span style="font-size:.78rem;color:#5F6371">O llámale al <strong>' + TEL + '</strong></span>');
        return;
      }
      var h = "<strong>" + e.t + "</strong>";
      if (e.l) h += "<ul>" + e.l.map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul>";
      if (e.n) h += "<br>" + e.n;
      if (e.u) h += '<br><a href="' + e.u + '">Ver el detalle →</a>';
      h += '<br><a class="rsa-wa" href="' + wa("Hola Álvaro, quiero preguntarte por: " + q)
        + '" target="_blank" rel="noopener noreferrer">' + IWA + ' Hablar con Álvaro</a>';
      decir(h);
    }, 260);
  }

  function construir() {
    var st = el("style"); st.textContent = CSS; document.head.appendChild(st);

    /* La home lleva barra CTA fija en móvil: ahí el flotante de WhatsApp sobra
       (serían dos veces el mismo botón) y la pila tiene que subir para no taparla. */
    if (document.querySelector(".mcta")) document.documentElement.classList.add("rsa-bar");

    stack = el("div", { class: "rsa-stack" });

    fab = el("button", { class: "rsa-fab", type: "button", "aria-expanded": "false", "aria-controls": "rsa-panel" },
      IWA + "<span>¿Alguna duda?</span>");
    fab.onclick = abrir;
    stack.appendChild(fab);

    /* El href lleva 'text=' a propósito: es lo que consent.js exige para contar
       el evento Contact. Sin mensaje precargado no se mediría como lead. */
    stack.appendChild(el("a", {
      class: "rsa-wf",
      href: wa("Hola Álvaro, vengo de tu web. Mi negocio es ___ en ___ y necesito ___"),
      target: "_blank", rel: "noopener noreferrer",
      "aria-label": "Escríbeme por WhatsApp al 642 08 40 42"
    }, IWF));

    document.body.appendChild(stack);

    panel = el("div", { class: "rsa-p", id: "rsa-panel", role: "dialog", "aria-label": "Asistente de Ruipérez Studio" });

    var h = el("div", { class: "rsa-h" });
    h.appendChild(el("div", null, "<b>Resuelvo tus dudas</b><span>Respuestas al momento · sin esperas</span>"));
    var x = el("button", { class: "rsa-x", type: "button", "aria-label": "Cerrar el asistente" }, "&times;");
    x.onclick = cerrar; h.appendChild(x);
    panel.appendChild(h);

    cuerpo = el("div", { class: "rsa-b" });
    panel.appendChild(cuerpo);

    var sug = el("div", { class: "rsa-sug" });
    SUGERENCIAS.forEach(function (s) {
      var b = el("button", { class: "rsa-s", type: "button" }, s);
      b.onclick = function () { responder(s); };
      sug.appendChild(b);
    });
    panel.appendChild(sug);

    var f = el("form", { class: "rsa-f" });
    campo = el("input", { class: "rsa-i", type: "text", placeholder: "Escribe tu pregunta…",
                          "aria-label": "Escribe tu pregunta", autocomplete: "off" });
    var env = el("button", { class: "rsa-send", type: "submit", "aria-label": "Enviar pregunta" },
      '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>');
    f.appendChild(campo); f.appendChild(env);
    f.onsubmit = function (ev) { ev.preventDefault(); var v = campo.value.trim(); if (!v) return; campo.value = ""; responder(v); };
    panel.appendChild(f);

    panel.appendChild(el("div", { class: "rsa-nota" },
      'Respuestas automáticas sobre lo que ya está publicado en la web. Si no sé algo, te paso con Álvaro.'));

    panel.addEventListener("keydown", function (e) { if (e.key === "Escape") cerrar(); });
    document.body.appendChild(panel);
  }

  function abrir() {
    ultimoFoco = document.activeElement;
    panel.classList.add("on"); stack.hidden = true; fab.setAttribute("aria-expanded", "true");
    if (!cuerpo.childElementCount) {
      decir('Hola. Puedo resolverte dudas sobre <strong>precios, plazos, qué incluye cada servicio y cómo trabajo</strong>.'
        + '<br>Pregunta abajo, o toca una de las sugerencias.');
    }
    campo.focus();
  }
  function cerrar() {
    panel.classList.remove("on"); stack.hidden = false; fab.setAttribute("aria-expanded", "false");
    if (ultimoFoco && ultimoFoco.focus && ultimoFoco.offsetParent) ultimoFoco.focus(); else fab.focus();
  }

  function init() { construir(); window.rsAsistente = { abrir: abrir, cerrar: cerrar }; }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
