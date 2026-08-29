/*!
 * Ruipérez Studio — gestor de consentimiento y medición
 * ---------------------------------------------------------------------------
 * Un único archivo para las 16 páginas. Sustituye al banner inline anterior,
 * que solo declaraba "cookies analíticas" con Aceptar/Rechazar: eso deja de
 * sostenerse en cuanto se instala Meta Pixel o TikTok Pixel (RGPD + LSSI
 * art. 22.2 + guía AEPD). Aquí hay tres categorías, panel granular, y bloqueo
 * REAL por defecto: ningún script de terceros se inyecta sin consentimiento.
 *
 * PARA PONERLO EN MARCHA: rellena los IDs en RS_CONFIG. Mientras estén vacíos,
 * ese píxel simplemente no se carga — la web funciona igual y no falla nada.
 */
(function () {
  "use strict";

  /* ═══ CONFIGURACIÓN ═══ */
  var RS_CONFIG = {
    metaPixelId:   "",              // [PEDIR AL CLIENTE] Meta Events Manager → ID del píxel (15-16 dígitos)
    tiktokPixelId: "",              // [PEDIR AL CLIENTE] TikTok Events Manager → ID del píxel
    ga4Id:         "",              // [PEDIR AL CLIENTE] GA4 → «G-XXXXXXXXXX»
    vercelAnalytics: true,          // ya estaba en producción, va en analíticas
    appendOriginToWhatsApp: true    // añade la campaña de origen al mensaje de WhatsApp
  };

  var STORE = "rs-consent-v2";      // el nombre cambia respecto al anterior: el
                                    // consentimiento viejo era solo de analíticas
                                    // y no cubre publicidad, hay que volver a pedirlo
  var POLICY_VERSION = 2;

  /* ═══ ESTADO ═══ */
  function leer() {
    try {
      var raw = localStorage.getItem(STORE);
      if (!raw) return null;
      var v = JSON.parse(raw);
      if (v.version !== POLICY_VERSION) return null;
      return v;
    } catch (e) { return null; }
  }
  function guardar(analiticas, publicidad) {
    var v = {
      version: POLICY_VERSION,
      necesarias: true,
      analiticas: !!analiticas,
      publicidad: !!publicidad,
      fecha: new Date().toISOString()      // registro de consentimiento
    };
    try { localStorage.setItem(STORE, JSON.stringify(v)); } catch (e) {}
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
    if (RS_CONFIG.vercelAnalytics) {
      script("rs-vercel", "https://cdn.vercel-insights.com/v1/script.js");
    }
    if (RS_CONFIG.ga4Id) {
      script("rs-ga4", "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(RS_CONFIG.ga4Id), function () {
        gtag("js", new Date());
        gtag("config", RS_CONFIG.ga4Id, { anonymize_ip: true });
      });
    }
  }

  function cargarPublicidad() {
    if (RS_CONFIG.metaPixelId && !window.fbq) {
      /* stub oficial de Meta, reducido y sin eval */
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
      ad_storage:          v.publicidad ? "granted" : "denied",
      ad_user_data:        v.publicidad ? "granted" : "denied",
      ad_personalization:  v.publicidad ? "granted" : "denied",
      analytics_storage:   v.analiticas ? "granted" : "denied"
    });
    if (v.analiticas) cargarAnaliticas();
    if (v.publicidad) cargarPublicidad();
  }

  /* ═══ ORIGEN DE CAMPAÑA — para saber de qué anuncio viene cada lead ═══ */
  var ORIGEN_KEY = "rs-origen";
  function capturarOrigen() {
    try {
      var p = new URLSearchParams(location.search);
      var src = p.get("utm_source") || p.get("fbclid") && "meta" || p.get("ttclid") && "tiktok";
      if (!src) return;
      var camp = p.get("utm_campaign") || p.get("utm_content") || "";
      sessionStorage.setItem(ORIGEN_KEY, [src, camp].filter(Boolean).join("-"));
    } catch (e) {}
  }
  function origen() {
    try { return sessionStorage.getItem(ORIGEN_KEY) || ""; } catch (e) { return ""; }
  }

  /* ═══ ATRIBUCIÓN DE WHATSAPP ═══
     Todos los CTA van a wa.me, y el píxel no ve esa conversión: sin esto Meta
     optimizaría a «clic en enlace» y traería tráfico basura. Se dispara el
     evento ANTES de la redirección y se marca el origen en el propio mensaje. */
  function pagina() {
    var p = location.pathname.replace(/^\/|\/$/g, "");
    return p || "home";
  }
  function prepararWhatsApp() {
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest('a[href*="wa.me/"]');
      if (!a) return;

      var v = leer();
      if (v && v.publicidad) {
        if (window.fbq) window.fbq("track", "Contact", { content_name: pagina(), source: origen() });
        if (window.ttq)  window.ttq.track("Contact", { content_name: pagina() });
      }
      if (v && v.analiticas && RS_CONFIG.ga4Id) {
        gtag("event", "generate_lead", { page: pagina(), source: origen() });
      }

      if (RS_CONFIG.appendOriginToWhatsApp && !a.dataset.rsMarcado) {
        var o = origen();
        if (o) {
          /* Se construye a mano en lugar de con URLSearchParams: este re-codifica
             los espacios como «+» y WhatsApp no siempre los interpreta como tal. */
          var suf = encodeURIComponent(" · ref: " + o);
          var m = a.href.match(/([?&]text=)([^&#]*)/);
          a.href = m ? a.href.replace(m[0], m[1] + m[2] + suf)
                     : a.href + (a.href.indexOf("?") > -1 ? "&" : "?") + "text=" + suf;
          a.dataset.rsMarcado = "1";
        }
      }
    }, true);
  }

  /* ═══ INTERFAZ ═══ */
  var CSS = [
    '.rsc-b{position:fixed;left:0;right:0;bottom:0;z-index:9000;background:#211D18;color:#F7F2E9;padding:1.1rem clamp(1rem,4vw,2.5rem);',
    'display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:1rem 1.6rem;',
    'transform:translateY(110%);transition:transform .45s cubic-bezier(.16,1,.3,1);font-family:Karla,system-ui,sans-serif;box-shadow:0 -10px 40px -20px rgba(0,0,0,.6)}',
    '.rsc-b.on{transform:none}',
    '.rsc-b p{margin:0;font-size:.86rem;line-height:1.55;color:rgba(247,242,233,.78);max-width:40rem}',
    '.rsc-b a{color:#E4A57F;text-decoration:underline}',
    '.rsc-acts{display:flex;gap:.6rem;flex-wrap:wrap}',
    /* los tres botones miden lo mismo: rechazar tiene que ser tan fácil como aceptar */
    '.rsc-btn{font:700 .84rem/1 Karla,system-ui,sans-serif;padding:.8rem 1.25rem;border-radius:8px;cursor:pointer;',
    'min-height:44px;min-width:8.5rem;border:1px solid rgba(247,242,233,.3);background:transparent;color:#F7F2E9;transition:background .2s,border-color .2s}',
    '.rsc-btn:hover{border-color:#F7F2E9}',
    '.rsc-btn.pri{background:#B5522F;border-color:#B5522F;color:#FDFBF7}',
    '.rsc-btn.pri:hover{background:#8E3F23;border-color:#8E3F23}',
    '.rsc-btn:focus-visible,.rsc-sw:focus-visible{outline:2.5px solid #E4A57F;outline-offset:3px}',
    '.rsc-ov{position:fixed;inset:0;z-index:9100;background:rgba(33,29,24,.62);backdrop-filter:blur(3px);display:none;align-items:center;justify-content:center;padding:1.2rem}',
    '.rsc-ov.on{display:flex}',
    '.rsc-m{background:#FDFBF7;color:#211D18;border-radius:16px;max-width:34rem;width:100%;max-height:88vh;overflow:auto;padding:clamp(1.4rem,3vw,2rem);font-family:Karla,system-ui,sans-serif}',
    '.rsc-m h2{font-family:"Instrument Serif",Georgia,serif;font-weight:400;font-size:1.6rem;margin:0 0 .5rem;line-height:1.15}',
    '.rsc-m>p{font-size:.9rem;color:#4A443C;line-height:1.6;margin:0 0 1.2rem}',
    '.rsc-row{border-top:1px solid #E5DCCB;padding:1rem 0;display:flex;gap:1rem;align-items:flex-start;justify-content:space-between}',
    '.rsc-row h3{font-size:.98rem;font-weight:700;margin:0 0 .25rem}',
    '.rsc-row p{font-size:.83rem;color:#6E675D;line-height:1.5;margin:0}',
    '.rsc-sw{flex:none;width:46px;height:26px;border-radius:100px;border:0;background:#D6C9B4;position:relative;cursor:pointer;transition:background .2s}',
    '.rsc-sw::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#FDFBF7;transition:transform .2s}',
    '.rsc-sw[aria-checked="true"]{background:#56663F}',
    '.rsc-sw[aria-checked="true"]::after{transform:translateX(20px)}',
    '.rsc-sw[disabled]{opacity:.5;cursor:not-allowed}',
    '.rsc-f{display:flex;gap:.6rem;flex-wrap:wrap;margin-top:1.4rem;border-top:1px solid #E5DCCB;padding-top:1.3rem}',
    '.rsc-m .rsc-btn{border-color:#CFC4AF;color:#211D18}',
    '.rsc-m .rsc-btn:hover{border-color:#211D18}',
    '.rsc-m .rsc-btn.pri{color:#FDFBF7}',
    '.rsc-pref{background:none;border:0;padding:0;font:inherit;font-size:.82rem;color:#6E675D;text-decoration:underline;cursor:pointer}',
    '.rsc-pref:hover{color:#B5522F}',
    '@media (prefers-reduced-motion:reduce){.rsc-b{transition:none}.rsc-sw,.rsc-sw::after{transition:none}}',
    '@media(max-width:640px){.rsc-b{justify-content:stretch}.rsc-acts{width:100%}.rsc-btn{flex:1}}'
  ].join("");

  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (html != null) n.innerHTML = html;
    return n;
  }

  var banner, overlay, swAnal, swPub, ultimoFoco;

  function construir() {
    var st = el("style"); st.textContent = CSS; document.head.appendChild(st);

    banner = el("div", { class: "rsc-b", role: "dialog", "aria-label": "Consentimiento de cookies", "aria-live": "polite" });
    banner.appendChild(el("p", null,
      'Uso cookies propias y de terceros para analizar el tráfico y para medir mis campañas de publicidad. ' +
      'Las de publicidad implican transferencia de datos fuera de la UE. Puedes aceptarlas, rechazarlas todas o elegir una a una. ' +
      '<a href="/cookies/">Política de cookies</a>'));
    var acts = el("div", { class: "rsc-acts" });
    var bCfg = el("button", { class: "rsc-btn", type: "button" }, "Configurar");
    var bNo  = el("button", { class: "rsc-btn", type: "button" }, "Rechazar todas");
    var bSi  = el("button", { class: "rsc-btn pri", type: "button" }, "Aceptar todas");
    bCfg.onclick = abrir;
    bNo.onclick  = function () { guardar(false, false); cerrarBanner(); };
    bSi.onclick  = function () { guardar(true, true);  cerrarBanner(); };
    acts.appendChild(bCfg); acts.appendChild(bNo); acts.appendChild(bSi);
    banner.appendChild(acts);
    document.body.appendChild(banner);

    overlay = el("div", { class: "rsc-ov" });
    var m = el("div", { class: "rsc-m", role: "dialog", "aria-modal": "true", "aria-labelledby": "rsc-t" });
    m.appendChild(el("h2", { id: "rsc-t" }, "Preferencias de cookies"));
    m.appendChild(el("p", null, "Decides tú qué se activa. Puedes cambiarlo cuando quieras desde «Preferencias de cookies», en el pie de página."));

    function fila(titulo, texto, fijo) {
      var r = el("div", { class: "rsc-row" });
      var d = el("div"); d.appendChild(el("h3", null, titulo)); d.appendChild(el("p", null, texto));
      var sw = el("button", { class: "rsc-sw", type: "button", role: "switch",
                              "aria-checked": fijo ? "true" : "false", "aria-label": titulo });
      if (fijo) sw.disabled = true;
      else sw.onclick = function () { sw.setAttribute("aria-checked", sw.getAttribute("aria-checked") === "true" ? "false" : "true"); };
      r.appendChild(d); r.appendChild(sw);
      m.appendChild(r);
      return sw;
    }
    fila("Necesarias", "Hacen que la web funcione y recuerdan esta misma elección. No se pueden desactivar.", true);
    swAnal = fila("Analíticas", "Vercel Analytics y Google Analytics 4. Me dicen qué páginas se visitan y cuánto tardan en cargar, de forma agregada.", false);
    swPub  = fila("Publicidad", "Meta (Facebook e Instagram) y TikTok. Miden si un anuncio ha traído un cliente. Implican transferencia de datos a Estados Unidos.", false);

    var f = el("div", { class: "rsc-f" });
    var gNo = el("button", { class: "rsc-btn", type: "button" }, "Rechazar todas");
    var gOk = el("button", { class: "rsc-btn pri", type: "button" }, "Guardar mi elección");
    gNo.onclick = function () { guardar(false, false); cerrar(); cerrarBanner(); };
    gOk.onclick = function () {
      guardar(swAnal.getAttribute("aria-checked") === "true", swPub.getAttribute("aria-checked") === "true");
      cerrar(); cerrarBanner();
    };
    f.appendChild(gNo); f.appendChild(gOk);
    m.appendChild(f);
    overlay.appendChild(m);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) cerrar(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && overlay.classList.contains("on")) cerrar(); });
    document.body.appendChild(overlay);

    /* revocación desde el pie, sin tocar el HTML de las 16 páginas */
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
    overlay.querySelector(".rsc-sw:not([disabled])").focus();
  }
  function cerrar() {
    overlay.classList.remove("on");
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }
  function cerrarBanner() { if (banner) banner.classList.remove("on"); }

  /* ═══ ARRANQUE ═══ */
  function init() {
    capturarOrigen();
    construir();
    prepararWhatsApp();
    var v = leer();
    if (v) aplicar(v);                                   // ya eligió: se respeta
    else setTimeout(function () { banner.classList.add("on"); }, 900);
    window.rsConsent = { abrir: abrir, estado: leer };   // por si hace falta desde fuera
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
