// assets/js/inicio-admin.js
(function () {
  var raiz = document.getElementById('inicio');
  if (!raiz) return;

  var IMG = '../assets/images/home/';

  var slides = [
    { clase: 'slide-azul', img: 'hero-hojas.svg', alt: 'Hoja de respuestas',
      titulo: 'Practica para el ICFES con simulacros',
      texto: 'Resuelve preguntas organizadas por área y llega al examen con más seguridad.',
      boton: 'Ver las áreas', destino: '#areas' },
    { clase: 'slide-violeta', img: 'hero-progreso.svg', alt: 'Gráfico de progreso',
      titulo: 'Mide tu avance en cada área',
      texto: 'Revisa tus resultados después de cada simulacro y descubre qué debes reforzar.',
      boton: 'Cómo funciona', destino: '#como-funciona' },
    { clase: 'slide-verde', img: 'hero-estudio.svg', alt: 'Computador con pregunta',
      titulo: 'Estudia a tu ritmo',
      texto: 'Entra cuando quieras y practica desde el computador o el celular.',
      boton: 'Ver las áreas', destino: '#areas' }
  ];

  var areas = [
    { icono: 'mdi-calculator-variant', color: 'c-violeta', nombre: 'Matemáticas',
      texto: 'Resuelve problemas con razonamiento cuantitativo, álgebra, geometría y estadística.', codArea: 1 },
    { icono: 'mdi-book-open-variant', color: 'c-azul', nombre: 'Lectura Crítica',
      texto: 'Comprende, interpreta y evalúa textos de distintos tipos.', codArea: 2 },
    { icono: 'mdi-flask', color: 'c-verde', nombre: 'Ciencias Naturales',
      texto: 'Aplica conceptos de biología, química y física para explicar fenómenos.', codArea: 3 },
    { icono: 'mdi-earth', color: 'c-naranja', nombre: 'Sociales y Ciudadanas',
      texto: 'Analiza situaciones históricas, sociales y de participación ciudadana.', codArea: 4 },
    { icono: 'mdi-translate', color: 'c-rojo', nombre: 'Inglés',
      texto: 'Practica la comprensión de lectura y el uso del idioma.', codArea: 5 }
  ];

  var html = '';

  // ---- Dashboard ----
  html += '<section id="dashboard" class="inicio-seccion" style="margin-top:0">' +
    '<h3>Dashboard</h3>' +
    '<p class="inicio-sub">Estadísticas generales de rendimiento por grado y grupo.</p>' +

    // Fila 1: tortas promedio grado 10 y 11 + intentos por grado
    '<div class="row g-4 mb-4">' +
      '<div class="col-md-4"><div class="card-style p-3 h-100"><h6 class="mb-3">Promedio puntaje — Grado 10</h6><canvas id="chart-prom-10" height="200"></canvas></div></div>' +
      '<div class="col-md-4"><div class="card-style p-3 h-100"><h6 class="mb-3">Promedio puntaje — Grado 11</h6><canvas id="chart-prom-11" height="200"></canvas></div></div>' +
      '<div class="col-md-4"><div class="card-style p-3 h-100"><h6 class="mb-3">Intentos por grado</h6><canvas id="chart-intentos-grado" height="200"></canvas></div></div>' +
    '</div>' +

    // Fila 2: barras horizontales promedio por grupo + top 5 grado 10 y 11
    '<div class="row g-4 mb-4">' +
      '<div class="col-md-4"><div class="card-style p-3 h-100"><h6 class="mb-3">Promedio puntaje por grupo</h6><canvas id="chart-prom-grupo" height="260"></canvas></div></div>' +
      '<div class="col-md-4"><div class="card-style p-3 h-100"><h6 class="mb-3">Top 5 mejores puntajes — Grado 10</h6><canvas id="chart-top10" height="260"></canvas></div></div>' +
      '<div class="col-md-4"><div class="card-style p-3 h-100"><h6 class="mb-3">Top 5 mejores puntajes — Grado 11</h6><canvas id="chart-top11" height="260"></canvas></div></div>' +
    '</div>' +
  '</section>';

  // ---- Slider ----
  html += '<div id="carruselInicio" class="carousel slide inicio-carrusel" data-bs-ride="carousel" aria-label="Novedades">';
  html += '<div class="carousel-indicators">';
  slides.forEach(function(s, i) {
    html += '<button type="button" data-bs-target="#carruselInicio" data-bs-slide-to="' + i + '"' +
            (i === 0 ? ' class="active" aria-current="true"' : '') + ' aria-label="Diapositiva ' + (i+1) + '"></button>';
  });
  html += '</div><div class="carousel-inner">';
  slides.forEach(function(s, i) {
    html += '<div class="carousel-item' + (i === 0 ? ' active' : '') + '">' +
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
  areas.forEach(function(a) {
    html += '<div class="col-12 col-md-6 col-xl-4 col-xxl">' +
      '<div class="tarjeta" style="cursor:pointer" onclick="verPreguntasArea(' + a.codArea + ',\'' + a.nombre + '\')">' +
      '<div class="icono ' + a.color + '"><i class="mdi ' + a.icono + '"></i></div>' +
      '<h5>' + a.nombre + '</h5><p>' + a.texto + '</p></div></div>';
  });
  html += '</div></section>';

  // Panel CRUD de preguntas
  html += '<section id="panel-crud" style="display:none;margin-top:32px">' +
    '<div class="card-style">' +
      '<div class="d-flex justify-content-between align-items-center mb-3">' +
        '<h5 id="crud-titulo" class="mb-0"></h5>' +
        '<button class="btn btn-sm btn-outline-secondary" onclick="cerrarCrud()">✕ Cerrar</button>' +
      '</div>' +
      '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover" style="font-size:.85rem">' +
          '<thead class="table-light"><tr><th>#</th><th>Enunciado</th><th>Tema</th><th>Acciones</th></tr></thead>' +
          '<tbody id="crud-tbody"><tr><td colspan="4" class="text-center">Cargando...</td></tr></tbody>' +
        '</table>' +
      '</div>' +
    '</div>' +
  '</section>';

  // Modal editar pregunta
  html += '<div class="modal fade" id="modalEditar" tabindex="-1">' +
    '<div class="modal-dialog modal-lg">' +
      '<div class="modal-content">' +
        '<div class="modal-header"><h5 class="modal-title">Editar Pregunta</h5>' +
          '<button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>' +
        '<div class="modal-body">' +
          '<input type="hidden" id="edit-id">' +
          '<div class="mb-3"><label class="form-label">Enunciado</label>' +
            '<textarea class="form-control" id="edit-enunciado" rows="3"></textarea></div>' +
          '<div id="edit-respuestas"></div>' +
        '</div>' +
        '<div class="modal-footer">' +
          '<button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>' +
          '<button class="btn btn-primary" onclick="guardarEdicion()">Guardar</button>' +
        '</div>' +
      '</div>' +
    '</div>' +
  '</div>';

  raiz.className = 'inicio';
  raiz.innerHTML = html;

  var quiereMenosMovimiento = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  new bootstrap.Carousel(document.getElementById('carruselInicio'), {
    interval: quiereMenosMovimiento ? false : 6000,
    ride: quiereMenosMovimiento ? false : 'carousel',
    touch: true
  });

  // ---- Cargar datos para gráficas ----
  cargarDashboard();
})();

async function cargarDashboard() {
  try {
    var estudiantes = await getEstudiantes();
    var usuarios    = await getUsuarios();
    var intentos    = await fetch('http://localhost:3000/api/intentos').then(function(r){ return r.json(); });

    // Cruzar: intento -> usuario -> estudiante
    var datos = intentos.map(function(it) {
      var u = usuarios.find(function(u){ return u.CodUsuario === it.CodUsuario; });
      var e = u ? estudiantes.find(function(e){ return e.CodEstudiante === u.CodEstudiante; }) : null;
      return { puntaje: Number(it.Puntaje) || 0, grado: e ? String(e.Grado) : null, seccion: e ? String(e.Seccion) : null, nombre: e ? e.Nombre + ' ' + e.Apellido : 'Desconocido' };
    }).filter(function(d){ return d.grado; });

    var grado10 = datos.filter(function(d){ return d.grado === '10'; });
    var grado11 = datos.filter(function(d){ return d.grado === '11'; });

    var avg = function(arr){ return arr.length ? (arr.reduce(function(s,d){ return s+d.puntaje; },0)/arr.length).toFixed(1) : 0; };

    var prom10 = Number(avg(grado10));
    var prom11 = Number(avg(grado11));

    // Torta grado 10
    new Chart(document.getElementById('chart-prom-10'), {
      type: 'doughnut',
      data: { labels: ['Promedio', 'Restante'], datasets: [{ data: [prom10, Math.max(0, 100 - prom10)], backgroundColor: ['#4f46e5','#e5e7eb'] }] },
      options: { plugins: { legend: { display: false }, tooltip: { callbacks: { label: function(c){ return c.label + ': ' + c.raw; } } } }, cutout: '65%' }
    });
    document.getElementById('chart-prom-10').insertAdjacentHTML('afterend', '<p class="text-center fw-bold mt-1" style="font-size:1.3rem;color:#4f46e5">' + prom10 + ' pts</p>');

    // Torta grado 11
    new Chart(document.getElementById('chart-prom-11'), {
      type: 'doughnut',
      data: { labels: ['Promedio', 'Restante'], datasets: [{ data: [prom11, Math.max(0, 100 - prom11)], backgroundColor: ['#0ea5e9','#e5e7eb'] }] },
      options: { plugins: { legend: { display: false } }, cutout: '65%' }
    });
    document.getElementById('chart-prom-11').insertAdjacentHTML('afterend', '<p class="text-center fw-bold mt-1" style="font-size:1.3rem;color:#0ea5e9">' + prom11 + ' pts</p>');

    // Intentos por grado (torta)
    var grupos = {};
    datos.forEach(function(d){ grupos[d.grado] = (grupos[d.grado] || 0) + 1; });
    var gradosKeys = Object.keys(grupos);
    new Chart(document.getElementById('chart-intentos-grado'), {
      type: 'doughnut',
      data: { labels: gradosKeys.map(function(g){ return 'Grado ' + g; }), datasets: [{ data: gradosKeys.map(function(g){ return grupos[g]; }), backgroundColor: ['#4f46e5','#0ea5e9','#10b981','#f59e0b','#ef4444'] }] },
      options: { plugins: { legend: { position: 'bottom' } } }
    });

    // Promedio por grupo (barras horizontales)
    var grupoMap = {};
    datos.forEach(function(d){
      var key = 'Grado ' + d.grado + ' - Grupo ' + d.seccion;
      if (!grupoMap[key]) grupoMap[key] = [];
      grupoMap[key].push(d.puntaje);
    });
    var grupoLabels = Object.keys(grupoMap).sort();
    var grupoProms  = grupoLabels.map(function(k){ return Number((grupoMap[k].reduce(function(s,v){ return s+v; },0)/grupoMap[k].length).toFixed(1)); });
    new Chart(document.getElementById('chart-prom-grupo'), {
      type: 'bar',
      data: { labels: grupoLabels, datasets: [{ label: 'Promedio', data: grupoProms, backgroundColor: '#4f46e5' }] },
      options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, max: 100 } } }
    });

    // Top 5 grado 10 (barras horizontales)
    var top10 = grado10.slice().sort(function(a,b){ return b.puntaje - a.puntaje; }).slice(0,5);
    new Chart(document.getElementById('chart-top10'), {
      type: 'bar',
      data: { labels: top10.map(function(d){ return d.nombre; }), datasets: [{ label: 'Puntaje', data: top10.map(function(d){ return d.puntaje; }), backgroundColor: '#10b981' }] },
      options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, max: 100 } } }
    });

    // Top 5 grado 11 (barras horizontales)
    var top11 = grado11.slice().sort(function(a,b){ return b.puntaje - a.puntaje; }).slice(0,5);
    new Chart(document.getElementById('chart-top11'), {
      type: 'bar',
      data: { labels: top11.map(function(d){ return d.nombre; }), datasets: [{ label: 'Puntaje', data: top11.map(function(d){ return d.puntaje; }), backgroundColor: '#f59e0b' }] },
      options: { indexAxis: 'y', plugins: { legend: { display: false } }, scales: { x: { beginAtZero: true, max: 100 } } }
    });

  } catch(e) { console.error('Dashboard error:', e); }
}

// ---- CRUD preguntas por área ----
var _areaActual = null;
var _preguntasActuales = [];
var _temasAdmin = [];

async function verPreguntasArea(codArea, nombre) {
  _areaActual = codArea;
  if (!_temasAdmin.length) _temasAdmin = await getTemas();
  document.getElementById('crud-titulo').textContent = 'Preguntas — ' + nombre;
  var panel = document.getElementById('panel-crud');
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  await recargarTabla(codArea);
}

async function recargarTabla(codArea) {
  var tbody = document.getElementById('crud-tbody');
  tbody.innerHTML = '<tr><td colspan="4" class="text-center">Cargando...</td></tr>';
  try {
    var preguntas = await getPreguntasPorArea(codArea);
    _preguntasActuales = preguntas;
    if (!preguntas.length) {
      tbody.innerHTML = '<tr><td colspan="4" class="text-center text-muted">Sin preguntas registradas.</td></tr>';
      return;
    }
    tbody.innerHTML = preguntas.map(function(p, i) {
      var enunciado = (p.TextoPregunta || '').replace(/^'|'$/g, '') || '—';
      var tema = _temasAdmin.find(function(t){ return t.CodTema == p.CodTema; });
      return '<tr>' +
        '<td>' + (i+1) + '</td>' +
        '<td>' + enunciado + '</td>' +
        '<td>' + (tema ? tema.NombreTema : (p.NombreTema || '—')) + '</td>' +
        '<td>' +
          '<button class="btn btn-sm btn-warning me-1" onclick="abrirEditar(' + (p.CodPregunta) + ')">✏️ Editar</button>' +
          '<button class="btn btn-sm btn-danger" onclick="eliminarPregunta(' + (p.CodPregunta) + ')">🗑️ Eliminar</button>' +
        '</td>' +
      '</tr>';
    }).join('');
  } catch(e) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center text-danger">Error al cargar.</td></tr>';
  }
}

function cerrarCrud() {
  document.getElementById('panel-crud').style.display = 'none';
}

async function abrirEditar(codPregunta) {
  var p = _preguntasActuales.find(function(x){ return x.CodPregunta === codPregunta; });
  if (!p) return;
  document.getElementById('edit-id').value = codPregunta;
  document.getElementById('edit-enunciado').value = (p.TextoPregunta || '').replace(/^'|'$/g, '');

  var resps = p.respuestas || [];
  document.getElementById('edit-respuestas').innerHTML = resps.map(function(r) {
    var estado = (r.Estado || '').replace(/^'|'$/g, '');
    return '<div class="mb-2 d-flex align-items-center gap-2">' +
      '<input type="radio" name="correcta" value="' + r.CodRespuesta + '"' + (estado === 'Correcta' ? ' checked' : '') + '>' +
      '<input type="text" class="form-control" id="resp-' + r.CodRespuesta + '" value="' + (r.TextoRespuesta || '') + '">' +
    '</div>';
  }).join('');

  new bootstrap.Modal(document.getElementById('modalEditar')).show();
}

async function guardarEdicion() {
  var codPregunta = document.getElementById('edit-id').value;
  var enunciado   = document.getElementById('edit-enunciado').value.trim();
  if (!enunciado) return alert('El enunciado no puede estar vacío.');

  await fetch('http://localhost:3000/api/preguntas/' + codPregunta, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ TextoPregunta: enunciado })
  });

  var correctaId = document.querySelector('input[name="correcta"]:checked')?.value;
  var p = _preguntasActuales.find(function(x){ return String(x.CodPregunta) === String(codPregunta); });
  if (p && p.respuestas) {
    for (var r of p.respuestas) {
      var estado = String(r.CodRespuesta) === String(correctaId) ? "'Correcta'" : "'Incorrecta'";
      await fetch('http://localhost:3000/api/respuestas/' + r.CodRespuesta, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ TextoRespuesta: document.getElementById('resp-' + r.CodRespuesta)?.value.trim(), Estado: estado })
      });
    }
  }

  bootstrap.Modal.getInstance(document.getElementById('modalEditar')).hide();
  await recargarTabla(_areaActual);
}

async function eliminarPregunta(codPregunta) {
  if (!confirm('¿Eliminar esta pregunta y sus respuestas?')) return;
  var p = _preguntasActuales.find(function(x){ return x.CodPregunta === codPregunta; });
  if (p && p.respuestas) {
    for (var r of p.respuestas) {
      await fetch('http://localhost:3000/api/respuestas/' + r.CodRespuesta, { method: 'DELETE' });
    }
  }
  await fetch('http://localhost:3000/api/preguntas/' + codPregunta, { method: 'DELETE' });
  await recargarTabla(_areaActual);
}
