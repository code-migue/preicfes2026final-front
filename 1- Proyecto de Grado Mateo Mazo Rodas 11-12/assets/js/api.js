const API = 'http://localhost:3000/api';

// ── LOGIN ──────────────────────────────────────────────
async function loginUsuario(correo, contrasena) {
    const res = await fetch(`${API}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Correo: correo, Contraseña: contrasena })
    });
    if (!res.ok) throw await res.json();
    return res.json();
}

// ── ESTUDIANTES ────────────────────────────────────────
async function getEstudiantes() {
    const res = await fetch(`${API}/estudiantes`);
    return res.json();
}
async function crearEstudiante(data) {
    const res = await fetch(`${API}/estudiantes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}
async function actualizarEstudiante(id, data) {
    const res = await fetch(`${API}/estudiantes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}
async function eliminarEstudiante(id) {
    const res = await fetch(`${API}/estudiantes/${id}`, { method: 'DELETE' });
    return res.json();
}

// ── USUARIOS ───────────────────────────────────────────
async function getUsuarios() {
    const res = await fetch(`${API}/usuarios`);
    return res.json();
}
async function crearUsuario(data) {
    const res = await fetch(`${API}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}
async function actualizarUsuario(id, data) {
    const res = await fetch(`${API}/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}
async function eliminarUsuario(id) {
    const res = await fetch(`${API}/usuarios/${id}`, { method: 'DELETE' });
    return res.json();
}

// ── AREAS ──────────────────────────────────────────────
async function getAreas() {
    const res = await fetch(`${API}/areas`);
    return res.json();
}

// ── TEMAS ──────────────────────────────────────────────
async function getTemas() {
    const res = await fetch(`${API}/temas`);
    return res.json();
}
async function crearTema(data) {
    const res = await fetch(`${API}/temas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

// ── PREGUNTAS ──────────────────────────────────────────
async function getPreguntasPorArea(codArea) {
    const res = await fetch(`${API}/preguntas/porArea/${codArea}`);
    if (!res.ok) throw new Error('No se pudieron cargar las preguntas del área.');
    return res.json();
}
async function getPreguntasPorTema(codTema) {
    const res = await fetch(`${API}/preguntas/porTema/${encodeURIComponent(codTema)}`);
    if (!res.ok) throw new Error('No se pudieron cargar las preguntas del tema.');
    return res.json();
}
async function getPreguntasAleatorio() {
    const res = await fetch(`${API}/preguntas/aleatorio`);
    return res.json();
}

async function getPreguntas() {
    const res = await fetch(`${API}/preguntas`);
    return res.json();
}
async function crearPregunta(data) {
    const res = await fetch(`${API}/preguntas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

// ── RESPUESTAS ─────────────────────────────────────────
async function getRespuestasPorPregunta(codPregunta) {
    const res = await fetch(`${API}/respuestas`);
    const todas = await res.json();
    return todas.filter(r => r.CodPregunta === codPregunta);
}
async function crearRespuesta(data) {
    const res = await fetch(`${API}/respuestas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}

// ── INTENTOS ───────────────────────────────────────────
async function crearIntento(data) {
    const res = await fetch(`${API}/intentos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}
async function getIntentosPorUsuario(codUsuario) {
    const res = await fetch(`${API}/intentos`);
    const todos = await res.json();
    return todos.filter(i => i.CodUsuario === codUsuario);
}

// ── INTENTOS RESPUESTAS ────────────────────────────────
async function crearIntentoRespuesta(data) {
    const res = await fetch(`${API}/intentosrespuestas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.json();
}
