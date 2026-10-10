// assets/js/landing.js
(function () {
  // ---------- Si ya hay sesión, el botón de la barra lleva directo al panel ----------
  var RUTAS = { administrador: "Administrador/indexAdministrador.html", estudiante: "Usuarios/indexUsuarios.html" };
  try {
    var sesion = JSON.parse(sessionStorage.getItem("sesion") || localStorage.getItem("sesion") || "null");
    if (sesion && RUTAS[sesion.rol]) {
      document.querySelectorAll(".js-entrar").forEach(function (a) {
        a.href = RUTAS[sesion.rol];
        a.textContent = "Ir a mi panel";
      });
    }
  } catch (e) { /* sesión dañada: se ignora */ }

  // ---------- Menú en celular ----------
  var boton = document.querySelector(".hamburguesa");
  var enlaces = document.querySelector(".enlaces");
  if (boton && enlaces) {
    boton.addEventListener("click", function () {
      var abierto = enlaces.classList.toggle("abierto");
      boton.setAttribute("aria-expanded", String(abierto));
    });
    enlaces.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { enlaces.classList.remove("abierto"); });
    });
  }

  // ---------- Resalta el enlace de la sección visible ----------
  var items = Array.prototype.slice.call(document.querySelectorAll(".enlaces a"));
  var secciones = items.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  if (secciones.length && "IntersectionObserver" in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        var enlace = items[secciones.indexOf(entrada.target)];
        if (!enlace) return;
        if (entrada.isIntersecting) {
          items.forEach(function (a) { a.classList.remove("activo"); });
          enlace.classList.add("activo");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    secciones.forEach(function (s) { observador.observe(s); });
  }

  // ---------- Mini reto: 5 preguntas, una por área ----------
  var PREGUNTAS = [
    {
      materia: "Lectura Crítica", icono: "mdi-book-open-variant",
      pregunta: "\u201cAunque el cielo estaba despejado, María llevó el paraguas porque el noticiero había anunciado lluvias para la tarde.\u201d ¿Por qué llevó María el paraguas?",
      opciones: ["Porque el cielo estaba nublado", "Por una recomendación del noticiero sobre el clima de la tarde", "Porque siempre lleva paraguas", "Porque alguien se lo pidió"],
      correcta: 1
    },
    {
      materia: "Matemáticas", icono: "mdi-calculator-variant",
      pregunta: "Un simulacro tiene 40 preguntas. Si un estudiante responde correctamente el 75 %, ¿cuántas preguntas acertó?",
      opciones: ["25", "28", "30", "32"],
      correcta: 2
    },
    {
      materia: "Sociales y Ciudadanas", icono: "mdi-earth",
      pregunta: "¿Cuántas ramas del poder público tiene el Estado colombiano?",
      opciones: ["Dos", "Tres", "Cuatro", "Cinco"],
      correcta: 1
    },
    {
      materia: "Ciencias Naturales", icono: "mdi-flask",
      pregunta: "Durante la fotosíntesis, las plantas toman dióxido de carbono y liberan principalmente:",
      opciones: ["Nitrógeno", "Hidrógeno", "Oxígeno", "Dióxido de azufre"],
      correcta: 2
    },
    {
      materia: "Inglés", icono: "mdi-translate",
      pregunta: "Choose the correct option: \u201cShe ___ to school every day.\u201d",
      opciones: ["go", "goes", "going", "gone"],
      correcta: 1
    }
  ];

  var raiz = document.getElementById("reto-caja");
  if (!raiz) return;
  var indice = 0, elegida = null, aciertos = 0, respondida = false;

  function letra(i) { return String.fromCharCode(65 + i); }

  function pintarPuntos() {
    return PREGUNTAS.map(function (_, i) {
      var clase = i < indice ? "hecho" : i === indice ? "actual" : "";
      return '<span class="' + clase + '"></span>';
    }).join("");
  }

  function pintarPregunta() {
    var p = PREGUNTAS[indice];
    var opciones = p.opciones.map(function (texto, i) {
      return '<button type="button" class="reto-opcion" data-i="' + i + '">' +
        '<span class="letra">' + letra(i) + '</span><span>' + texto + '</span></button>';
    }).join("");

    raiz.innerHTML =
      '<div class="reto-tarjeta">' +
        '<div class="reto-cabeza">' +
          '<span class="reto-materia"><i class="mdi ' + p.icono + '"></i>' + p.materia + '</span>' +
          '<span class="reto-contador">Pregunta ' + (indice + 1) + ' de ' + PREGUNTAS.length + '</span>' +
        '</div>' +
        '<div class="reto-puntos">' + pintarPuntos() + '</div>' +
        '<p class="reto-pregunta">' + p.pregunta + '</p>' +
        '<div class="reto-opciones">' + opciones + '</div>' +
        '<div class="reto-pie"><button type="button" class="boton boton-primario reto-siguiente" disabled>' +
          (indice === PREGUNTAS.length - 1 ? "Ver resultado" : "Siguiente") + '</button></div>' +
      '</div>';

    elegida = null; respondida = false;
    raiz.querySelectorAll(".reto-opcion").forEach(function (boton) {
      boton.addEventListener("click", function () {
        if (respondida) return;
        respondida = true;
        elegida = Number(boton.getAttribute("data-i"));
        if (elegida === p.correcta) aciertos++;
        raiz.querySelectorAll(".reto-opcion").forEach(function (b, i) {
          b.disabled = true;
          if (i === p.correcta) b.classList.add("correcta");
          else if (i === elegida) b.classList.add("incorrecta");
        });
        raiz.querySelector(".reto-siguiente").disabled = false;
      });
    });

    raiz.querySelector(".reto-siguiente").addEventListener("click", function () {
      indice++;
      if (indice < PREGUNTAS.length) pintarPregunta(); else pintarResultado();
    });
  }

  function pintarResultado() {
    var mensaje =
      aciertos === PREGUNTAS.length ? "¡Las 5 correctas! Vas muy bien preparado." :
      aciertos >= 3 ? "Buen resultado. Con más práctica puedes mejorar aún más." :
      "Este fue solo un abrebocas. Con simulacros completos puedes reforzar cada área.";
    raiz.innerHTML =
      '<div class="reto-tarjeta reto-resultado">' +
        '<div class="aro"><strong>' + aciertos + '/' + PREGUNTAS.length + '</strong><small>ACIERTOS</small></div>' +
        '<h3>' + mensaje + '</h3>' +
        '<p>Este mini reto solo probó una pregunta por área. Inicia sesión para hacer simulacros completos y ver tu progreso.</p>' +
        '<div class="cta">' +
          '<a class="boton boton-primario js-entrar" href="login.html">Iniciar sesión</a>' +
          '<button type="button" class="boton boton-secundario" id="reintentar">Repetir el reto</button>' +
        '</div>' +
      '</div>';
    document.getElementById("reintentar").addEventListener("click", function () {
      indice = 0; aciertos = 0; pintarPregunta();
    });
  }

  pintarPregunta();
})();
