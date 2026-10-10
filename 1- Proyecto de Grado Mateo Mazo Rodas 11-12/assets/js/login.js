var RUTAS = {
    administrador: 'Administrador/indexAdministrador.html',
    estudiante: 'Usuarios/indexUsuarios.html'
};

function normalizarRol(rol) {
    var valor = String(rol || '').trim().toLowerCase();
    if (valor === 'admin' || valor === 'administrador') return 'administrador';
    if (valor === 'estudiante') return 'estudiante';
    return '';
}

var form = document.getElementById('formLogin');
var mensaje = document.getElementById('mensaje');
var claveInput = document.getElementById('clave');
var verClave = document.getElementById('verClave');

try {
    var previa = JSON.parse(sessionStorage.getItem('sesion') || localStorage.getItem('sesion') || 'null');
    if (previa && RUTAS[previa.rol]) window.location.replace(RUTAS[previa.rol]);
} catch (e) {}

verClave.addEventListener('click', function () {
    var oculta = claveInput.type === 'password';
    claveInput.type = oculta ? 'text' : 'password';
    verClave.textContent = oculta ? 'Ocultar' : 'Mostrar';
    verClave.setAttribute('aria-pressed', String(oculta));
});

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    mensaje.textContent = '';

    var rol = form.querySelector('input[name="rol"]:checked').value;
    var correo = document.getElementById('correo').value.trim().toLowerCase();
    var clave = claveInput.value;
    var recordar = document.getElementById('recordar').checked;

    if (!correo || !clave) {
        mensaje.textContent = 'Escribe tu correo y tu contraseña.';
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Correo: correo, Contraseña: clave, Rol: rol })
        });

        if (!res.ok) {
            if (res.status === 403) {
                mensaje.textContent = 'El rol seleccionado no corresponde a esta cuenta.';
                return;
            }
            mensaje.textContent = 'Correo o contraseña incorrectos.';
            return;
        }

        const usuario = await res.json();
        var rolAutorizado = normalizarRol(usuario.Rol);
        if (!rolAutorizado || rolAutorizado !== rol) {
            mensaje.textContent = 'El servidor no confirmó el rol de esta cuenta.';
            return;
        }

        var sesion = JSON.stringify({
            rol: rolAutorizado,
            nombre: usuario.NombreUsuario,
            correo: usuario.Correo,
            CodUsuario: usuario.CodUsuario
        });

        sessionStorage.removeItem('sesion');
        localStorage.removeItem('sesion');
        (recordar ? localStorage : sessionStorage).setItem('sesion', sesion);

        window.location.href = RUTAS[rolAutorizado];

    } catch (err) {
        mensaje.textContent = 'No se pudo conectar con el servidor.';
    }
});
