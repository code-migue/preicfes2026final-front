// assets/js/inicio.js
(function () {
  var raiz = document.getElementById("inicio");
  if (!raiz) return;

  var IMG = "../assets/images/home/";

  var slides = [
    { clase: "slide-azul", img: "hero-hojas.svg", alt: "Hoja de respuestas con burbujas y un lápiz",
      titulo: "Practica para el ICFES con simulacros",
      texto: "Resuelve preguntas organizadas por área y llega al examen con más seguridad.",
      boton: "Ver las áreas", destino: "#areas" },
    { clase: "slide-violeta", img: "hero-progreso.svg", alt: "Gráfico de barras con el progreso por área",
      titulo: "Mide tu avance en cada área",
      texto: "Revisa tus resultados después de cada simulacro y descubre qué debes reforzar.",
      boton: "Cómo funciona", destino: "#como-funciona" },
    { clase: "slide-verde", img: "hero-estudio.svg", alt: "Computador con una pregunta de opción múltiple y un reloj",
      titulo: "Estudia a tu ritmo",
      texto: "Entra cuando quieras y practica desde el computador o el celular.",
      boton: "Ver las áreas", destino: "#areas" }
  ];

  // codArea coincide exactamente con los IDs de la BD
  var areas = [
    { icono: "mdi-calculator-variant", color: "c-violeta", nombre: "Matemáticas",
      texto: "Resuelve problemas con razonamiento cuantitativo, álgebra, geometría y estadística.", codArea: 1 },
    { icono: "mdi-book-open-variant", color: "c-azul", nombre: "Lectura Crítica",
      texto: "Comprende, interpreta y evalúa textos de distintos tipos.", codArea: 2 },
    { icono: "mdi-flask", color: "c-verde", nombre: "Ciencias Naturales",
      texto: "Aplica conceptos de biología, química y física para explicar fenómenos.", codArea: 3 },
    { icono: "mdi-earth", color: "c-naranja", nombre: "Sociales y Ciudadanas",
      texto: "Analiza situaciones históricas, sociales y de participación ciudadana.", codArea: 4 },
    { icono: "mdi-translate", color: "c-rojo", nombre: "Inglés",
      texto: "Practica la comprensión de lectura y el uso del idioma.", codArea: 5 }
  ];

  var pasos = [
    { titulo: "Elige un área", texto: "Escoge el área que quieres practicar o inicia un simulacro completo." },
    { titulo: "Resuelve el simulacro", texto: "Responde las preguntas a tu ritmo, con el mismo formato del examen." },
    { titulo: "Revisa tus resultados", texto: "Mira tu puntaje, tus aciertos y las áreas donde puedes mejorar." }
  ];

  var html = "";

  // ---- Slider ----
  html += '<div id="carruselInicio" class="carousel slide inicio-carrusel" data-bs-ride="carousel" aria-label="Novedades de la plataforma">';
  html += '<div class="carousel-indicators">';
  slides.forEach(function (s, i) {
    html += '<button type="button" data-bs-target="#carruselInicio" data-bs-slide-to="' + i + '"' +
            (i === 0 ? ' class="active" aria-current="true"' : "") + ' aria-label="Diapositiva ' + (i + 1) + '"></button>';
  });
  html += '</div><div class="carousel-inner">';
  slides.forEach(function (s, i) {
    html += '<div class="carousel-item' + (i === 0 ? " active" : "") + '">' +
      '<div class="inicio-slide ' + s.clase + ' d-flex align-items-center"><div class="row align-items-center w-100 g-0">' +
        '<div class="col-md-6"><h2>' + s.titulo + '</h2><p>' + s.texto + '</p>' +
        '<a class="inicio-boton" href="' + s.destino + '">' + s.boton + '</a></div>' +
        '<div class="col-md-6"><img src="' + IMG + s.img + '" alt="' + s.alt + '" /></div>' +
      '</div></div></div>';
  });
  html += '</div>' +
    '<button class="carousel-control-prev" type="button" data-bs-target="#carruselInicio" data-bs-slide="prev">' +
      '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Anterior</span></button>' +
    '<button class="carousel-control-next" type="button" data-bs-target="#carruselInicio" data-bs-slide="next">' +
      '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Siguiente</span></button>' +
    '</div>';

  // ---- Áreas del examen ----
  html += '<section id="areas" class="inicio-seccion"><h3>Áreas del examen</h3>' +
    '<p class="inicio-sub">Practica las cinco áreas que evalúa el examen Saber 11.</p>' +
    '<div class="row g-4 justify-content-center">';
  areas.forEach(function (a) {
    html += '<div class="col-12 col-md-6 col-xl-4 col-xxl"><div class="tarjeta" style="cursor:pointer" onclick="window.location.href=\'simulacro.html?area=' + a.codArea + '\'">' +
      '<div class="icono ' + a.color + '"><i class="mdi ' + a.icono + '"></i></div>' +
      '<h5>' + a.nombre + '</h5><p>' + a.texto + '</p></div></div>';
  });
  html += '</div></section>';

  // ---- Cómo funciona ----
  html += '<section id="como-funciona" class="inicio-seccion"><h3>Cómo funciona</h3>' +
    '<p class="inicio-sub">Tres pasos para practicar y mejorar.</p><div class="row g-4">';
  pasos.forEach(function (p, i) {
    html += '<div class="col-12 col-md-4"><div class="tarjeta paso"><div class="numero">' + (i + 1) + '</div>' +
      '<h5>' + p.titulo + '</h5><p>' + p.texto + '</p></div></div>';
  });
  html += '</div></section>';

  raiz.className = "inicio";
  raiz.innerHTML = html;

  var quiereMenosMovimiento = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  new bootstrap.Carousel(document.getElementById("carruselInicio"), {
    interval: quiereMenosMovimiento ? false : 6000,
    ride: quiereMenosMovimiento ? false : "carousel",
    touch: true
  });
})();
