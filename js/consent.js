/*!
 * Ruipérez Studio — gestor de consentimiento y medición
 * ---------------------------------------------------------------------------
 * Un único archivo para las 16 páginas. Sustituye al banner inline anterior,
 * que solo declaraba "cookies analíticas" con Aceptar/Rechazar: eso deja de
 * sostenerse en cuanto se instala Meta Pixel o TikTok Pixel (RGPD + LSSI
 * art. 22.2 + guía AEPD). Tres categorías, panel granular y bloqueo REAL por
 * defecto: sin consentimiento no se inyecta ningún script de terceros NI se
 * escribe nada en el almacenamiento del navegador salvo la propia decisión.
 *
 * PARA PONERLO EN MARCHA: rellena los IDs en RS_CONFIG. Mientras estén vacíos,
 * ese píxel simplemente no se carga — la web funciona igual y no falla nada.
 */
(function () {
  "use strict";
  if (window.rsConsent) return;          // guarda contra doble carga: si no, se
                                         // duplicarían los eventos de conversión

  /* ═══ CONFIGURACIÓN ═══ */
  var RS_CONFIG = {
    metaPixelId:   "",              // [PEDIR AL CLIENTE] Meta Events Manager → ID del píxel (15-16 dígitos)
    tiktokPixelId: "",              // [PEDIR AL CLIENTE] TikTok Events Manager → ID del píxel
    ga4Id:         "G-D61B7R46V5", // Google Analytics 4 · propiedad ruiperezstudio.es
    vercelAnalytics: true,
    appendOriginToWhatsApp: true    // añade la campaña de origen al mensaje de WhatsApp
  };

  var STORE = "rs-consent-v2";      // clave nueva a propósito: el consentimiento
                                    // anterior solo cubría analítica y no vale
                                    // para publicidad, hay que volver a pedirlo
  var POLICY_VERSION = 2;
  var CADUCIDAD = 730 * 864e5;      // 24 meses, el máximo que admite la AEPD

  /* ═══ ESTADO ═══ */
  function leer() {
    try {
      var raw = localStorage.getItem(STORE);
      if (!raw) return null;
      var v = JSON.parse(raw);
      if (v.version !== POLICY_VERSION) return null;
      if (!v.fecha || (Date.now() - Date.parse(v.fecha)) > CADUCIDAD) return null;
      return { version: v.version, necesarias: true,
               analiticas: !!v.analiticas, publicidad: !!v.publicidad, fecha: v.fecha };
    } catch (e) { return null; }
  }

  /* Borra las cookies de primera parte de un proveedor al que se le retira el
     consentimiento. Sin esto, «revocar» solo dejaría de enviar datos nuevos
     mientras las cookies ya escritas siguen en el navegador. */
  function borrarCookies(nombres) {
    var host = location.hostname;
    var dominios = [host, "." + host];
    var partes = host.split(".");
    if (partes.length > 2) dominios.push("." + partes.slice(-2).join("."));
    document.cookie.split(";").forEach(function (c) {
      var n = c.split("=")[0].trim();
      if (!n) return;
      var coincide = nombres.some(function (p) {
        return p.slice(-1) === "*" ? n.indexOf(p.slice(0, -1)) === 0 : n === p;
      });
      if (!coincide) return;
      dominios.forEach(function (d) {
        document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=" + d;
      });
      document.cookie = n + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    });
  }

  function guardar(analiticas, publicidad) {
    var antes = leer();
    var v = {
      version: POLICY_VERSION, necesarias: true,
      analiticas: !!analiticas, publicidad: !!publicidad,
      fecha: new Date().toISOString()          // registro del consentimiento
    };
    try { localStorage.setItem(STORE, JSON.stringify(v)); } catch (e) {}

    /* Retirar consentimiento tiene que ser tan efectivo como darlo (art. 7.3
       RGPD). Meta y TikTok no leen Consent Mode y sus scripts ya están en
       ejecución, así que la única forma honesta es borrar y recargar. */
    var retirado = antes && ((antes.analiticas && !v.analiticas) || (antes.publicidad && !v.publicidad));
    if (retirado) {
      if (antes.analiticas && !v.analiticas) borrarCookies(["_ga", "_ga_*", "_gid", "_gcl_*"]);
      if (antes.publicidad && !v.publicidad) {
        borrarCookies(["_fbp", "_fbc", "_ttp", "ttclid", "_tt_enable_cookie"]);
        try { sessionStorage.removeItem(ORIGEN_KEY); } catch (e) {}
        origenMem = "";
      }
      location.reload();
      return v;
    }
    aplicar(v);
    return v;
  }

  /* ═══ CONSENT MODE v2 — denegado por defecto, antes de cargar nada ═══ */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: 500
  });

  /* ═══ CARGA DE TERCEROS — solo con consentimiento y solo si hay ID ═══ */
  var cargado = {};
  function script(id, src, onload) {
    if (cargado[id] || document.getElementById(id)) return;
    cargado[id] = true;
    var s = document.createElement("script");
    s.id = id; s.async = true; s.src = src;
    if (onload) s.onload = onload;
    document.head.appendChild(s);
  }

  function cargarAnaliticas() {
    /* Ruta de primer origen: no sale del dominio, así que no añade ningún
       tercero ni transferencia internacional por este concepto. */
    if (RS_CONFIG.vercelAnalytics) script("rs-vercel", "/_vercel/insights/script.js");
    if (RS_CONFIG.ga4Id) {
      script("rs-ga4", "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(RS_CONFIG.ga4Id), function () {
        gtag("js", new Date());
        gtag("config", RS_CONFIG.ga4Id);
      });
    }
  }

  function cargarPublicidad() {
    if (RS_CONFIG.metaPixelId && !window.fbq) {
      var n = window.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!window._fbq) window._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      script("rs-meta", "https://connect.facebook.net/en_US/fbevents.js");
      window.fbq("init", RS_CONFIG.metaPixelId);
      window.fbq("track", "PageView");
    }
    if (RS_CONFIG.tiktokPixelId && !window.ttq) {
      var t = window.ttq = { _q: [], _i: {} };
      ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"]
        .forEach(function (m) { t[m] = function () { t._q.push([m].concat([].slice.call(arguments, 0))); }; });
      script("rs-tiktok", "https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=" + encodeURIComponent(RS_CONFIG.tiktokPixelId) + "&lib=ttq");
      window.ttq.page();
    }
  }

  function aplicar(v) {
    gtag("consent", "update", {
      ad_storage:         v.publicidad ? "granted" : "denied",
      ad_user_data:       v.publicidad ? "granted" : "denied",
      ad_personalization: v.publicidad ? "granted" : "denied",
      analytics_storage:  v.analiticas ? "granted" : "denied"
    });
    if (v.publicidad) { persistirOrigen(); cargarPublicidad(); }
    if (v.analiticas) cargarAnaliticas();
  }

  /* ═══ ORIGEN DE CAMPAÑA ═══
     Saber de qué anuncio viene el lead es medición publicitaria, no una
     necesidad técnica: por eso se guarda en memoria y solo se persiste en
     sessionStorage si se acepta la categoría de publicidad. */
  var ORIGEN_KEY = "rs-origen";
  var origenMem = "";

  function limpiar(s) { return String(s || "").replace(/[^A-Za-z0-9_-]/g, "").slice(0, 40); }

  function capturarOrigen() {
    try {
      var p = new URLSearchParams(location.search);
      var src = p.get("utm_source") || (p.get("fbclid") && "meta") || (p.get("ttclid") && "tiktok");
      if (!src) return;
      var camp = p.get("utm_campaign") || p.get("utm_content") || "";
      origenMem = [limpiar(src), limpiar(camp)].filter(Boolean).join("-");
    } catch (e) {}
  }
  function persistirOrigen() {
    try { if (origenMem) sessionStorage.setItem(ORIGEN_KEY, origenMem); } catch (e) {}
  }
  function origen() {
    if (origenMem) return origenMem;
    try { return sessionStorage.getItem(ORIGEN_KEY) || ""; } catch (e) { return ""; }
  }

  /* ═══ ATRIBUCIÓN DE WHATSAPP ═══
     Todos los CTA van a wa.me y el píxel no ve esa conversión: sin esto Meta
     optimizaría a «clic en enlace» y traería tráfico basura. El evento se
     dispara ANTES de la redirección. */
  function pagina() { return location.pathname.replace(/^\/|\/$/g, "") || "home"; }

  function prepararWhatsApp() {
    document.addEventListener("click", function (e) {
      /* Solo los CTA con mensaje precargado. El teléfono del pie es un enlace
         de contacto, no una petición de presupuesto: no cuenta como conversión. */
      var a = e.target.closest && e.target.closest('a[href*="wa.me/"][href*="text="]');
      if (!a) return;

      var v = leer();
      if (!v) return;

      if (v.publicidad) {
        var eid = "wa-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
        if (window.fbq) window.fbq("track", "Contact", { content_name: pagina(), source: origen() }, { eventID: eid });
        if (window.ttq) window.ttq.track("Contact", { content_name: pagina() }, { event_id: eid });

        /* El marcador viaja hasta WhatsApp, que es Meta: solo con consentimiento
           de publicidad. */
        if (RS_CONFIG.appendOriginToWhatsApp && !a.dataset.rsMarcado) {
          var o = origen();
          var m = o && a.href.match(/([?&]text=)([^&#]*)/);
          if (m) {
            var i = m.index + m[0].length;
            a.href = a.href.slice(0, i) + encodeURIComponent(" · ref: " + o) + a.href.slice(i);
            a.dataset.rsMarcado = "1";
          }
        }
      }
      if (v.analiticas && RS_CONFIG.ga4Id) {
        gtag("event", "generate_lead", { page: pagina(), source: origen() });
      }
    }, true);
  }

  /* ═══ INTERFAZ ═══ */
  var CSS = [
    '.rsc-b{position:fixed;left:0;right:0;bottom:0;z-index:9000;background:#211D18;color:#F7F2E9;padding:1.1rem clamp(1rem,4vw,2.5rem);',
    'display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:1rem 1.6rem;',
    'transform:translateY(110%);transition:transform .45s cubic-bezier(.16,1,.3,1);font-family:Karla,system-ui,sans-serif;box-shadow:0 -10px 40px -20px rgba(0,0,0,.6)}',
    '.rsc-b.on{transform:none}',
    /* el foco se mueve aqui solo para anunciar el banner a un lector de
       pantalla; no es un elemento navegable, asi que no lleva anillo */
    '.rsc-b:focus{outline:none}',
    '.rsc-b[hidden]{display:none}',
    '.rsc-b p{margin:0;font-size:.86rem;line-height:1.55;color:rgba(247,242,233,.9);max-width:40rem}',
    '.rsc-b a{color:#E4A57F;text-decoration:underline}',
    '.rsc-acts{display:flex;gap:.6rem;flex-wrap:wrap}',
    /* Los tres botones son idénticos en tamaño Y en tratamiento visual: destacar
       «Aceptar» sobre «Rechazar» es el patrón que las Directrices 03/2022 del
       CEPD señalan como engañoso. */
    '.rsc-btn{font:700 .84rem/1 Karla,system-ui,sans-serif;padding:.8rem 1.25rem;border-radius:8px;cursor:pointer;',
    'min-height:44px;min-width:9rem;border:1.5px solid rgba(247,242,233,.55);background:transparent;color:#F7F2E9;transition:background .2s,border-color .2s}',
    '.rsc-btn:hover{background:rgba(247,242,233,.1);border-color:#F7F2E9}',
    '.rsc-btn:focus-visible,.rsc-sw:focus-visible{outline:2.5px solid #E4A57F;outline-offset:3px}',
    '.rsc-ov{position:fixed;inset:0;z-index:9100;background:rgba(33,29,24,.62);backdrop-filter:blur(3px);display:none;align-items:center;justify-content:center;padding:1.2rem}',
    '.rsc-ov.on{display:flex}',
    '.rsc-m{background:#FDFBF7;color:#211D18;border-radius:16px;max-width:34rem;width:100%;max-height:88vh;overflow:auto;padding:clamp(1.4rem,3vw,2rem);font-family:Karla,system-ui,sans-serif}',
    '.rsc-m h2{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:1.6rem;margin:0 0 .5rem;line-height:1.15}',
    '.rsc-m>p{font-size:.9rem;color:#4A443C;line-height:1.6;margin:0 0 1.2rem}',
    '.rsc-row{border-top:1px solid #E5DCCB;padding:1rem 0;display:flex;gap:1rem;align-items:flex-start;justify-content:space-between}',
    '.rsc-row h3{font-size:.98rem;font-weight:700;margin:0 0 .25rem}',
    '.rsc-row p{font-size:.83rem;color:#5A5348;line-height:1.5;margin:0}',
    /* el borde da 3:1 contra el fondo del panel: sin él, el estado apagado era
       indistinguible (1,58:1) */
    '.rsc-sw{flex:none;width:46px;height:26px;border-radius:100px;border:1px solid #8A8175;background:#D6C9B4;position:relative;cursor:pointer;transition:background .2s,border-color .2s}',
    '.rsc-sw::after{content:"";position:absolute;top:2px;left:2px;width:20px;height:20px;border-radius:50%;background:#FDFBF7;transition:transform .2s}',
    '.rsc-sw[aria-checked="true"]{background:#56663F;border-color:#56663F}',
    '.rsc-sw[aria-checked="true"]::after{transform:translateX(20px)}',
    '.rsc-sw[aria-disabled="true"]{opacity:.65;cursor:not-allowed}',
    '.rsc-f{display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1.4rem;border-top:1px solid #E5DCCB;padding-top:1.3rem}',
    '.rsc-m .rsc-btn{border-color:#8A8175;color:#211D18}',
    '.rsc-m .rsc-btn:hover{background:rgba(33,29,24,.06);border-color:#211D18}',
    '.rsc-m .rsc-btn.pri{background:#B5522F;border-color:#B5522F;color:#FDFBF7}',
    '.rsc-m .rsc-btn.pri:hover{background:#8E3F23;border-color:#8E3F23}',
    /* hereda el color del pie: funciona igual en la paleta crema y en la oscura */
    '.rsc-pref{background:none;border:0;padding:0;font:inherit;font-size:.82rem;color:var(--soft,#4A443C);text-decoration:underline;cursor:pointer}',
    '.rsc-pref:hover{color:var(--terra-txt,#A84A28)}',
    '@media (prefers-reduced-motion:reduce){.rsc-b,.rsc-sw,.rsc-sw::after{transition:none}}',
    '@media(max-width:640px){.rsc-b{justify-content:stretch}.rsc-acts{width:100%}.rsc-btn{flex:1;min-width:0}}'
  ].join("");

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }

  var banner, overlay, swAnal, swPub, ultimoFoco, inertizados = [];

  function construir() {
    var st = el("style"); st.textContent = CSS; document.head.appendChild(st);

    banner = el("div", { class: "rsc-b", role: "dialog", "aria-label": "Consentimiento de cookies", tabindex: "-1" });
    banner.appendChild(el("p", null,
      'Uso cookies propias y de terceros para analizar el tráfico y para medir mis campañas de publicidad. ' +
      'Las de publicidad implican transferencia de datos fuera de la UE. Puedes aceptarlas, rechazarlas todas o elegir una a una. ' +
      '<a href="/cookies/">Política de cookies</a>'));
    var acts = el("div", { class: "rsc-acts" });
    var bCfg = el("button", { class: "rsc-btn", type: "button" }, "Configurar");
    var bNo  = el("button", { class: "rsc-btn", type: "button" }, "Rechazar todas");
    var bSi  = el("button", { class: "rsc-btn", type: "button" }, "Aceptar todas");
    bCfg.onclick = abrir;
    bNo.onclick  = function () { cerrarBanner(); guardar(false, false); };
    bSi.onclick  = function () { cerrarBanner(); guardar(true, true); };
    acts.appendChild(bCfg); acts.appendChild(bNo); acts.appendChild(bSi);
    banner.appendChild(acts);
    document.body.appendChild(banner);

    overlay = el("div", { class: "rsc-ov" });
    var m = el("div", { class: "rsc-m", role: "dialog", "aria-modal": "true", "aria-labelledby": "rsc-t" });
    m.appendChild(el("h2", { id: "rsc-t" }, "Preferencias de cookies"));
    m.appendChild(el("p", null, "Decides tú qué se activa. Puedes cambiarlo cuando quieras desde «Preferencias de cookies», en el pie de página. Si retiras un permiso, borro las cookies correspondientes y recargo la página."));

    function fila(titulo, texto, fijo) {
      var r = el("div", { class: "rsc-row" });
      var d = el("div"); d.appendChild(el("h3", null, titulo)); d.appendChild(el("p", null, texto));
      var sw = el("button", { class: "rsc-sw", type: "button", role: "switch",
                              "aria-checked": fijo ? "true" : "false", "aria-label": titulo });
      /* aria-disabled en vez de disabled: sigue siendo enfocable, así que quien
         navega con teclado o lector percibe que está activado y es obligatorio */
      if (fijo) { sw.setAttribute("aria-disabled", "true"); sw.onclick = function (e) { e.preventDefault(); }; }
      else sw.onclick = function () { sw.setAttribute("aria-checked", sw.getAttribute("aria-checked") === "true" ? "false" : "true"); };
      r.appendChild(d); r.appendChild(sw);
      m.appendChild(r);
      return sw;
    }
    fila("Necesarias", "Hacen que la web funcione y recuerdan esta misma elección. No se pueden desactivar.", true);
    swAnal = fila("Analíticas", "Métricas de uso del sitio, de forma agregada: qué páginas se visitan y cuánto tardan en cargar.", false);
    swPub  = fila("Publicidad", "Meta (Facebook e Instagram) y TikTok. Miden si un anuncio ha traído un cliente y recuerdan de qué campaña vienes. Implican transferencia de datos a Estados Unidos.", false);

    var f = el("div", { class: "rsc-f" });
    var gNo = el("button", { class: "rsc-btn", type: "button" }, "Rechazar todas");
    var gOk = el("button", { class: "rsc-btn pri", type: "button" }, "Guardar mi elección");
    gNo.onclick = function () { cerrar(); cerrarBanner(); guardar(false, false); };
    gOk.onclick = function () {
      var a = swAnal.getAttribute("aria-checked") === "true", p = swPub.getAttribute("aria-checked") === "true";
      cerrar(); cerrarBanner(); guardar(a, p);
    };
    f.appendChild(gNo); f.appendChild(gOk);
    m.appendChild(f);
    overlay.appendChild(m);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) cerrar(); });
    overlay.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { cerrar(); return; }
      if (e.key !== "Tab") return;
      /* trampa de foco: aria-modal dice al lector que el resto no existe, así
         que el tabulador no puede salir del diálogo */
      var f = m.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      if (!f.length) return;
      var primero = f[0], ultimo = f[f.length - 1];
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus(); }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus(); }
    });
    document.body.appendChild(overlay);

    var legal = document.querySelector(".fl-legal");
    if (legal) {
      var b = el("button", { class: "rsc-pref", type: "button" }, "Preferencias de cookies");
      b.onclick = abrir;
      legal.appendChild(b);
    }
  }

  function abrir() {
    var v = leer();
    swAnal.setAttribute("aria-checked", v && v.analiticas ? "true" : "false");
    swPub.setAttribute("aria-checked",  v && v.publicidad ? "true" : "false");
    ultimoFoco = document.activeElement;
    overlay.classList.add("on");
    inertizados = [];
    [].slice.call(document.body.children).forEach(function (c) {
      if (c !== overlay && !c.inert) { c.inert = true; inertizados.push(c); }
    });
    overlay.querySelector('.rsc-sw[aria-label="Analíticas"]').focus();
  }
  function cerrar() {
    overlay.classList.remove("on");
    inertizados.forEach(function (c) { c.inert = false; });
    inertizados = [];
    /* si el foco venía de un botón del banner que acaba de ocultarse, se
       devuelve a un sitio que sí existe */
    if (ultimoFoco && ultimoFoco.focus && ultimoFoco.offsetParent) ultimoFoco.focus();
    else {
      var p = document.querySelector(".rsc-pref");
      if (p) p.focus(); else document.body.focus();
    }
  }
  function cerrarBanner() {
    if (!banner || banner.hidden) return;
    banner.classList.remove("on");
    /* hidden y no solo fuera de pantalla: si no, quedan tres botones fantasma
       en el orden de tabulación al final de cada página */
    setTimeout(function () { banner.hidden = true; }, 500);
  }

  /* ═══ ARRANQUE ═══ */
  function init() {
    capturarOrigen();              // solo en memoria; se persiste si hay consentimiento
    construir();
    prepararWhatsApp();
    var v = leer();
    if (v) { banner.hidden = true; aplicar(v); }
    else setTimeout(function () { banner.classList.add("on"); banner.focus(); }, 900);
    window.rsConsent = { abrir: abrir, estado: leer };
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
