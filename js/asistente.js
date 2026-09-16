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
      l:["Landing page: desde 590€","Web corporativa: desde 890€","Tienda online: desde 1.990€",
         "Automatización: desde 900€","Chatbot de WhatsApp: desde 1.200€ + 120€/mes",
         "SEO local: desde 290€/mes","Redes sociales: desde 350€/mes","Email marketing: desde 190€/mes",
         "Mantenimiento: 90–150€/mes"],
      n:"Todos sin IVA. El precio se cierra por escrito antes de empezar.", u:"/#servicios" },

    { k:["tarda","cuanto tardas","cuanto tarda","plazo","plazos","cuando estaria","rapido","entrega","semanas","urgente","tiempo"],
      t:"Depende del tipo de proyecto:",
      l:["Landing page: 1 semana","Web corporativa: 2–3 semanas","Tienda online: 3–4 semanas"],
      n:"El plazo cuenta desde que me pasas el contenido, y te lo digo exacto antes de empezar." },

    { k:["cuota","mensual","permanencia","suscripcion","pago unico","pagos","fraccionar","financiar"],
      t:"La web es pago único: no tiene cuota mensual obligatoria.",
      n:"Los servicios mensuales —mantenimiento, SEO, redes, email— sí llevan cuota, y ninguno tiene permanencia: avisas y se cierra el mes en curso." },

    { k:["codigo","propiedad","mio","dependo","atado","migrar","llevarme","fuente"],
      t:"El código es tuyo al 100% desde la entrega, con acceso completo al código fuente.",
      n:"Si algún día quieres llevarte la web a otro proveedor, no tienes que pedirme permiso ni pagarme nada: te ayudo con la migración sin coste." },

    { k:["seo","google","posicionar","buscar","encuentren","aparecer","primero","ranking"],
      t:"El SEO local va incluido en todas las webs, sin coste añadido.",
      l:["Estructura optimizada y datos estructurados","Velocidad de carga","Ficha de Google Business configurada",
         "Contenido orientado a lo que busca la gente de tu zona"],
      n:"Si además quieres trabajo continuo mes a mes, eso es el SEO local mensual, desde 290€/mes.", u:"/seo-local/" },

    { k:["hosting","alojamiento","dominio","servidor","anual"],
      t:"El alojamiento va en Vercel y en el plan que uso no tiene coste.",
      n:"El único gasto recurrente es el dominio, unos 12€ al año. Lo gestiono yo y te lo repercuto sin recargo, o lo pones a tu nombre si lo prefieres." },

    { k:["automatizacion","automatizar","n8n","make","procesos","tareas","repetitiv","integrar","conectar"],
      t:"Automatizo las tareas que hoy haces a mano y podrían hacerse solas.",
      l:["Email automático cuando entra un pedido o un lead","Avisos y recordatorios","Sincronización entre las apps que ya usas"],
      n:"Desde 900€. Si pierdes horas copiando datos de un sitio a otro, esto es lo que más te va a rentar.", u:"/automatizacion/" },

    { k:["chatbot","bot","inteligencia artificial","inteligencia","responder solo","24 horas","whatsapp business","contestar solo","robot"],
      t:"Monto asistentes con IA de verdad sobre WhatsApp Business.",
      l:["Responden preguntas de tus clientes las 24 horas","Toman reservas","Escalan a ti cuando no saben algo"],
      n:"Desde 1.200€ más 120€/mes. Se entrenan con tus precios, horarios y servicios.", u:"/chatbot-whatsapp/" },

    { k:["tienda","ecommerce","vender online","carrito","pasarela","pago tarjeta","productos","stock"],
      t:"Tienda online completa: catálogo, carrito, pasarela de pago y gestión de pedidos.",
      n:"Desde 1.990€. La de Floristería Alameda la puedes ver funcionando en floristeriaalameda.com.", u:"/tienda-online/" },

    { k:["zona","donde trabajas","donde estas","cartagena","murcia","desplaz","presencial","reunion","vernos","lejos","trabajas en","vives"],
      t:"Estoy en Cartagena y trabajo en toda la Región de Murcia.",
      n:"Si prefieres que nos veamos en tu negocio, me muevo. Y si te va mejor por WhatsApp o videollamada, también." },

    { k:["texto","contenido","fotos","redactar","escribir","aportar","material"],
      t:"Si no tienes los textos, los escribo yo y va incluido en el precio.",
      n:"De ti necesito saber qué vendes y a quién. Las fotos del negocio las pones tú, y te digo exactamente qué necesito y cómo hacerlas con el móvil." },

    { k:["mantenimiento","despues","soporte","actualiza","copias","backup","averia","se rompe"],
      t:"Los primeros 30 días incluyen ajustes sin coste.",
      n:"Después, plan de mantenimiento opcional desde 90€/mes o cambios puntuales a 55€/hora. Sin permanencia.", u:"/mantenimiento-web/" },

    { k:["barata","180","300","wix","wordpress","plantilla","mas barato","competencia"],
      t:"Las webs de 180–300€ son plantillas genéricas.",
      n:"Tienen su lugar si el presupuesto no da para más. El problema es lo que no incluyen: SEO local real, diseño propio y los costes anuales ocultos de hosting, plugins y renovación del tema." },

    { k:["redes","instagram","facebook","publicar","social","community"],
      t:"Llevo las redes de tu negocio: calendario, doce publicaciones al mes, historias y la ficha de Google al día.",
      n:"Desde 350€/mes, sin permanencia. Los comentarios y mensajes los contesto yo.", u:"/gestion-redes-sociales/" },

    { k:["email","newsletter","mailing","correos","brevo","mailchimp"],
      t:"Correos que se envían solos: bienvenida, seguimiento post-compra, recordatorios y recuperación de carritos.",
      n:"Desde 190€/mes, sin permanencia.", u:"/email-marketing/" },

    { k:["landing","una pagina","promocion","campaña","anuncios"],
      t:"Una sola página diseñada para convertir visitas en clientes.",
      n:"Desde 590€, lista en una semana. Va bien si quieres probar sin gastar mucho o vas a promocionar una oferta concreta.", u:"/landing-page/" },

    { k:["quien eres","sobre ti","experiencia","trabajos","portfolio","proyectos","casos","clientes"],
      t:"Soy Álvaro Ruipérez, freelance en Cartagena. Trabajo solo: quien te contesta es quien programa.",
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
        if (re.test(n)) p += c.indexOf(" ") > -1 ? 5 : (c.length >= 6 ? 3 : 2);
      });
      if (p > max) { max = p; mejor = e; }
    });
    return max >= 2 ? mejor : null;
  }

  /* ═══ INTERFAZ ═══ */
  var CSS = [
    '.rsa-fab{position:fixed;right:1.1rem;bottom:1.1rem;z-index:940;display:flex;align-items:center;gap:.55rem;',
    'background:#211D18;color:#F7F2E9;border:0;border-radius:100px;padding:.85rem 1.25rem;cursor:pointer;',
    'font:700 .92rem/1 Karla,system-ui,sans-serif;box-shadow:0 14px 34px -14px rgba(33,29,24,.6);',
    'transition:transform .22s cubic-bezier(.22,1,.36,1),background .22s}',
    '.rsa-fab:hover{background:#000;transform:translateY(-2px)}',
    '.rsa-fab:focus-visible,.rsa-x:focus-visible,.rsa-s:focus-visible,.rsa-send:focus-visible{outline:2.5px solid #E4A57F;outline-offset:3px}',
    '.rsa-fab[hidden]{display:none}',
    '.rsa-p{position:fixed;right:1.1rem;bottom:1.1rem;z-index:941;width:min(23rem,calc(100vw - 2.2rem));',
    'max-height:min(34rem,calc(100vh - 2.2rem));display:none;flex-direction:column;background:#FDFBF7;',
    'border:1px solid #E5DCCB;border-radius:18px;overflow:hidden;box-shadow:0 30px 70px -24px rgba(33,29,24,.5);',
    'font-family:Karla,system-ui,sans-serif}',
    '.rsa-p.on{display:flex}',
    '.rsa-h{display:flex;align-items:center;gap:.6rem;padding:.9rem 1rem;background:#211D18;color:#F7F2E9;flex:none}',
    '.rsa-h b{font-size:.92rem;display:block}',
    '.rsa-h span{font-size:.68rem;opacity:.74;display:block;margin-top:.1rem}',
    '.rsa-x{margin-left:auto;background:none;border:0;color:#F7F2E9;font-size:1.5rem;line-height:1;cursor:pointer;padding:.2rem .4rem;border-radius:6px}',
    '.rsa-x:hover{background:rgba(247,242,233,.14)}',
    '.rsa-b{flex:1;overflow-y:auto;padding:1rem;display:flex;flex-direction:column;gap:.7rem;background:#F4EFE4}',
    '.rsa-m{font-size:.87rem;line-height:1.5;padding:.7rem .85rem;border-radius:14px;max-width:92%}',
    '.rsa-in{align-self:flex-start;background:#FDFBF7;border:1px solid #E5DCCB;color:#4A443C;border-bottom-left-radius:4px}',
    '.rsa-out{align-self:flex-end;background:#E4D9C4;color:#211D18;border-bottom-right-radius:4px}',
    '.rsa-m strong{color:#211D18}',
    '.rsa-m ul{margin:.5rem 0 0;padding-left:1.1rem}',
    '.rsa-m li{margin-bottom:.22rem}',
    '.rsa-m a{color:#A84A28;text-decoration:underline}',
    '.rsa-wa{display:inline-flex;align-items:center;gap:.45rem;margin-top:.6rem;background:#B5522F;color:#FDFBF7;',
    'padding:.6rem 1rem;border-radius:100px;font-weight:700;font-size:.84rem;text-decoration:none}',
    '.rsa-wa:hover{background:#8E3F23;color:#FDFBF7}',
    '.rsa-sug{display:flex;flex-wrap:wrap;gap:.35rem;padding:0 1rem .7rem;background:#F4EFE4;flex:none}',
    '.rsa-s{background:#FDFBF7;border:1px solid #E5DCCB;color:#4A443C;font:600 .76rem/1.3 Karla,system-ui,sans-serif;',
    'padding:.42rem .7rem;border-radius:100px;cursor:pointer}',
    '.rsa-s:hover{border-color:#B5522F;color:#A84A28}',
    '.rsa-f{display:flex;gap:.45rem;padding:.7rem;border-top:1px solid #E5DCCB;background:#FDFBF7;flex:none}',
    '.rsa-i{flex:1;border:1px solid #E5DCCB;border-radius:100px;padding:.6rem .9rem;font:400 .86rem Karla,system-ui,sans-serif;',
    'color:#211D18;background:#F7F2E9;min-width:0}',
    '.rsa-i:focus{outline:2px solid #B5522F;outline-offset:1px}',
    '.rsa-send{flex:none;width:42px;height:42px;border-radius:50%;border:0;background:#211D18;color:#F7F2E9;cursor:pointer;',
    'display:flex;align-items:center;justify-content:center}',
    '.rsa-send:hover{background:#000}',
    '.rsa-nota{font-size:.66rem;color:#6E675D;text-align:center;padding:0 .7rem .6rem;background:#FDFBF7;flex:none;line-height:1.35}',
    '@media(max-width:720px){.rsa-fab{bottom:5.6rem}.rsa-p{bottom:.7rem;right:.7rem;left:.7rem;width:auto;max-height:calc(100vh - 1.4rem)}}',
    '@media (prefers-reduced-motion:reduce){.rsa-fab{transition:none}}'
  ].join("");

  var IWA = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg>';

  var fab, panel, cuerpo, campo, ultimoFoco;

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
          + '<br><span style="font-size:.78rem;color:#6E675D">O llámale al <strong>' + TEL + '</strong></span>');
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

    fab = el("button", { class: "rsa-fab", type: "button", "aria-expanded": "false", "aria-controls": "rsa-panel" },
      IWA + "<span>¿Alguna duda?</span>");
    fab.onclick = abrir;
    document.body.appendChild(fab);

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
    panel.classList.add("on"); fab.hidden = true; fab.setAttribute("aria-expanded", "true");
    if (!cuerpo.childElementCount) {
      decir('Hola. Puedo resolverte dudas sobre <strong>precios, plazos, qué incluye cada servicio y cómo trabajo</strong>.'
        + '<br>Pregunta abajo, o toca una de las sugerencias.');
    }
    campo.focus();
  }
  function cerrar() {
    panel.classList.remove("on"); fab.hidden = false; fab.setAttribute("aria-expanded", "false");
    if (ultimoFoco && ultimoFoco.focus && ultimoFoco.offsetParent) ultimoFoco.focus(); else fab.focus();
  }

  function init() { construir(); window.rsAsistente = { abrir: abrir, cerrar: cerrar }; }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
