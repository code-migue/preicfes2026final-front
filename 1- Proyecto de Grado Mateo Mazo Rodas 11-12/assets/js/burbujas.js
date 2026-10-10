// assets/js/burbujas.js
// Dibuja el arte de PREICFES (login y portada): una hoja de respuestas de burbujas donde las respuestas
// "marcadas" forman una escalera que sube hacia la respuesta correcta (el check amarillo).
// Se adapta al tamaño del panel y las burbujas se marcan una a una al cargar.
(function () {
  var svg = document.getElementById("burbujas");
  if (!svg) return;

  // De la diagonal hacia adentro: amarillo, blanco y azules cada vez más profundos
  var COLORES = ["#FFD23F", "#FFFFFF", "#BFD0FF", "#8CA9FF", "#5D82F5", "#3B5FE0"];
  var ultimoAncho = 0;

  function dibujar(animar) {
    var caja = svg.getBoundingClientRect();
    var w = caja.width, h = caja.height;
    if (!w || !h) return;
    ultimoAncho = w;

    // Cuadrícula con medio espacio de margen en todos los lados (ninguna burbuja queda cortada)
    var cols = Math.max(6, Math.round(w / Math.max(30, Math.min(66, w / 11))));
    var celda = w / cols;
    var filas = Math.max(3, Math.floor(h / celda));
    var oy = (h - filas * celda) / 2 + celda / 2;
    var radio = celda * 0.34;

    // Diagonal de la escalera. En un panel ancho y bajo (celular) arranca más a la derecha
    // para no tapar el logo.
    // Se puede ajustar desde el HTML: data-modo="ancho", data-x0="0.45", data-subida="0.7"
    var ancho = svg.dataset.modo ? svg.dataset.modo === "ancho" : w / h > 1.6;
    var x0 = svg.dataset.x0 ? parseFloat(svg.dataset.x0) : (ancho ? 0.3 : 0);
    var subida = svg.dataset.subida ? parseFloat(svg.dataset.subida) : (ancho ? 0.62 : 0.88);

    var vacias = "", llenas = "", meta = null;

    for (var c = 0; c < cols; c++) {
      for (var f = 0; f < filas; f++) {
        var x = (c + 0.5) * celda, y = oy + f * celda;
        var t = (x / w - x0) / (1 - x0);
        var dv = (y / h - (1 - t * subida)) * h / celda + 0.05;

        if (t < 0 || dv < 0) {
          vacias += '<circle cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + radio.toFixed(1) + '"/>';
          continue;
        }
        var d = Math.min(COLORES.length - 1, Math.floor(dv));
        var retraso = c * 38 + (filas - f) * 20;
        llenas += '<circle class="relleno" style="animation-delay:' + retraso + 'ms" fill="' + COLORES[d] +
                  '" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (radio * 1.04).toFixed(1) + '"/>';
        // La meta: la burbuja amarilla más a la derecha que quepa entera con su aro
        if (d === 0 && x + celda * 0.62 <= w && y - celda * 0.62 >= 0 && (!meta || x > meta.x)) {
          meta = { x: x, y: y, retraso: retraso };
        }
      }
    }

    var extra = "";
    if (meta) {
      var r = radio * 1.3;
      extra =
        '<g class="relleno" style="animation-delay:' + (meta.retraso + 350) + 'ms">' +
        '<circle cx="' + meta.x.toFixed(1) + '" cy="' + meta.y.toFixed(1) + '" r="' + (celda * 0.6).toFixed(1) +
        '" fill="#0A1F66" stroke="#FFD23F" stroke-opacity=".55" stroke-width="2"/>' +
        '<circle cx="' + meta.x.toFixed(1) + '" cy="' + meta.y.toFixed(1) + '" r="' + r.toFixed(1) + '" fill="#FFD23F"/>' +
        '<path d="M' + (meta.x - r * 0.46).toFixed(1) + ' ' + (meta.y + r * 0.02).toFixed(1) +
        ' L' + (meta.x - r * 0.1).toFixed(1) + ' ' + (meta.y + r * 0.38).toFixed(1) +
        ' L' + (meta.x + r * 0.5).toFixed(1) + ' ' + (meta.y - r * 0.34).toFixed(1) +
        '" fill="none" stroke="#0A1F66" stroke-width="' + (r * 0.26).toFixed(1) +
        '" stroke-linecap="round" stroke-linejoin="round"/></g>';
    }

    svg.setAttribute("viewBox", "0 0 " + w.toFixed(0) + " " + h.toFixed(0));
    svg.classList.toggle("sin-animacion", !animar);
    svg.innerHTML =
      '<g fill="none" stroke="#FFFFFF" stroke-opacity=".16" stroke-width="2">' + vacias + "</g>" + llenas + extra;
  }

  var reducir = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  dibujar(!reducir);

  var temporizador;
  window.addEventListener("resize", function () {
    clearTimeout(temporizador);
    temporizador = setTimeout(function () {
      if (Math.abs(svg.getBoundingClientRect().width - ultimoAncho) > 20) dibujar(false);
    }, 150);
  });
})();
