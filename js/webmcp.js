/* ═══════════════════════════════════════════════════════════════════════════
 * WebMCP · herramientas del sitio para agentes que operan en el navegador
 * https://webmachinelearning.github.io/webmcp/
 *
 * Este archivo SOLO se descarga si el navegador tiene navigator.modelContext.
 * A fecha de 29/09/2026 eso es ningún navegador público: la API está en el
 * Early Preview Program de Chrome. El bootstrap que lo carga vive en línea en
 * cada página y es un «if» que hoy sale false, así que para un visitante real
 * esto no cuesta ni una petición.
 *
 * Los datos NO se duplican aquí: las herramientas piden /api/servicios.json
 * cuando se las invoca. Así no hay una segunda copia de precios que se quede
 * desfasada, que es el fallo que ya nos pasó con el JSON-LD.
 * ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  "use strict";
  if (!navigator.modelContext || window.rsWebMCP) return;
  window.rsWebMCP = true;

  var cache = null;
  function catalogo() {
    if (cache) return Promise.resolve(cache);
    return fetch("/api/servicios.json", { headers: { accept: "application/json" } })
      .then(function (r) {
        if (!r.ok) throw new Error("no se pudo leer el catálogo (" + r.status + ")");
        return r.json();
      })
      .then(function (d) { cache = d; return d; });
  }

  // Punto de millar SIEMPRE, también con cuatro cifras. toLocaleString("es-ES")
  // devuelve "1490" porque en español los números de cuatro dígitos no lo llevan,
  // pero la web escribe "1.490€" en todas partes y las dos cosas tienen que coincidir.
  var eur = function (n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "€"; };
  var IVA = 1.21;

  function texto(s) { return { content: [{ type: "text", text: s }] }; }

  navigator.modelContext.provideContext({
    tools: [
      {
        name: "listar_servicios",
        description:
          "Lista los servicios y packs de Ruipérez Studio con su precio de entrada, " +
          "modelo de cobro y plazo de entrega. Devuelve también el identificador de cada " +
          "servicio, que es lo que necesita calcular_presupuesto. Todos los precios son " +
          "SIN IVA: en España se factura con un 21% encima.",
        inputSchema: { type: "object", properties: {}, additionalProperties: false },
        async execute() {
          var d = await catalogo();
          var l = d.servicios.map(function (s) {
            var p = s.precio, t = "· " + s.id + " — " + s.nombre + ": desde " + eur(p.desde_eur_sin_iva);
            if (p.hasta_eur_sin_iva) t += " hasta " + eur(p.hasta_eur_sin_iva);
            if (p.modelo === "suscripcion_mensual") t += "/mes";
            if (p.cuota_mensual_eur_sin_iva) t += " + " + eur(p.cuota_mensual_eur_sin_iva) + "/mes";
            if (p.plazo_entrega_dias) t += " · entrega en " + p.plazo_entrega_dias + " días";
            return t;
          });
          var k = d.packs.map(function (p) {
            return "· pack " + p.id + " — " + p.nombre + ": " + eur(p.precio_eur_sin_iva) +
              " en vez de " + eur(p.precio_suelto_eur_sin_iva) + " (incluye: " + p.incluye.join(", ") + ")";
          });
          return texto(
            "SERVICIOS (precios SIN IVA, se añade el 21%)\n" + l.join("\n") +
            "\n\nPACKS\n" + k.join("\n") +
            "\n\n" + d.iva_nota + "\n" + d.plazos_nota +
            "\nSon precios «desde»: el definitivo se cierra por escrito antes de empezar."
          );
        }
      },
      {
        name: "calcular_presupuesto",
        description:
          "Calcula lo que costaría contratar varios servicios de Ruipérez Studio a la vez. " +
          "Devuelve el total sin IVA y con IVA, las cuotas mensuales por separado, y avisa " +
          "si alguno de los packs cubre esa combinación más barato. Usa los identificadores " +
          "que devuelve listar_servicios.",
        inputSchema: {
          type: "object",
          properties: {
            servicios: {
              type: "array", minItems: 1,
              items: { type: "string" },
              description: "Identificadores de servicio, por ejemplo [\"web-corporativa\",\"automatizacion\"]"
            }
          },
          required: ["servicios"], additionalProperties: false
        },
        async execute(args) {
          var d = await catalogo();
          var pedidos = (args && args.servicios) || [];
          var idx = {}; d.servicios.forEach(function (s) { idx[s.id] = s; });

          var desconocidos = pedidos.filter(function (i) { return !idx[i]; });
          if (desconocidos.length) {
            return texto("No existen estos servicios: " + desconocidos.join(", ") +
              ".\nLos válidos son: " + Object.keys(idx).join(", "));
          }

          var unico = 0, mensual = 0, lineas = [];
          pedidos.forEach(function (i) {
            var s = idx[i], p = s.precio;
            if (p.modelo === "pago_unico") {
              unico += p.desde_eur_sin_iva;
              lineas.push("· " + s.nombre + ": " + eur(p.desde_eur_sin_iva) + " (pago único)");
            } else {
              mensual += p.desde_eur_sin_iva;
              lineas.push("· " + s.nombre + ": " + eur(p.desde_eur_sin_iva) + "/mes");
            }
            if (p.cuota_mensual_eur_sin_iva) {
              mensual += p.cuota_mensual_eur_sin_iva;
              lineas.push("   + " + eur(p.cuota_mensual_eur_sin_iva) + "/mes de servicio");
            }
          });

          // ¿Hay un pack que cubra todo lo pedido y salga más barato?
          var mejor = null;
          d.packs.forEach(function (p) {
            var cubre = pedidos.every(function (i) {
              return p.incluye.some(function (x) { return x.split(" ")[0] === i; });
            });
            if (cubre && p.precio_eur_sin_iva < unico && (!mejor || p.precio_eur_sin_iva < mejor.precio_eur_sin_iva)) mejor = p;
          });

          var out = "PRESUPUESTO ORIENTATIVO\n" + lineas.join("\n") + "\n";
          if (unico) out += "\nPago único: " + eur(unico) + " sin IVA · " +
            eur(Math.round(unico * IVA)) + " con IVA";
          if (mensual) out += "\nCuota mensual: " + eur(mensual) + " sin IVA · " +
            eur(Math.round(mensual * IVA)) + " con IVA";
          if (mejor) out += "\n\n⚠️ Sale más barato en pack: «" + mejor.nombre + "» cuesta " +
            eur(mejor.precio_eur_sin_iva) + " en vez de " + eur(unico) +
            ", un ahorro de " + eur(mejor.ahorro_eur) + ". " + (mejor.nota || "");
          out += "\n\nSon precios «desde». El definitivo se cierra por escrito antes de " +
            "empezar, según el alcance. Para pedirlo: https://wa.me/34642084042 · " +
            "ruiperezstudio.info@gmail.com";
          return texto(out);
        }
      }
    ]
  });
})();
