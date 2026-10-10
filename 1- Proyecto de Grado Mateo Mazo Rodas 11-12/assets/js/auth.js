// assets/js/auth.js
// Se incluye en el <head> de cada página interna:
//   <script src="../assets/js/auth.js" data-rol="administrador"></script>
// - Si no hay sesión, manda a login.html.
// - Si el rol no coincide, manda al front que le corresponde.
// - Rellena el nombre/correo y activa el botón "Sign Out".
(function () {
  var BASE = "../"; // las páginas internas están un nivel dentro de la raíz
  var RUTAS = {
    administrador: BASE + "Administrador/indexAdministrador.html",
    estudiante: BASE + "Usuarios/indexUsuarios.html"
  };
  var ETIQUETA = { administrador: "Administrador", estudiante: "Estudiante" };
  var script = document.currentScript;
  var rolRequerido = script && script.getAttribute("data-rol");

  function leerSesion() {
    try {
      return JSON.parse(sessionStorage.getItem("sesion") || localStorage.getItem("sesion") || "null");
    } catch (e) { return null; }
  }
  function cerrarSesion() {
    sessionStorage.removeItem("sesion");
    localStorage.removeItem("sesion");
    window.location.href = BASE + "login.html";
  }

  var sesion = leerSesion();
  if (!sesion || !RUTAS[sesion.rol]) { window.location.replace(BASE + "login.html"); return; }
  if (rolRequerido && sesion.rol !== rolRequerido) { window.location.replace(RUTAS[sesion.rol]); return; }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("[data-usuario-nombre]").forEach(function (el) { el.textContent = sesion.nombre; });
    document.querySelectorAll("[data-usuario-correo]").forEach(function (el) { el.textContent = sesion.correo; });

    // Menú de perfil de la plantilla
    var nombre = document.querySelector(".profile-info .info h6");
    var rol = document.querySelector(".profile-info .info p");
    var nombre2 = document.querySelector(".author-info h4");
    var correo = document.querySelector(".author-info a");
    if (nombre) nombre.textContent = sesion.nombre;
    if (rol) rol.textContent = ETIQUETA[sesion.rol];
    if (nombre2) nombre2.textContent = sesion.nombre;
    if (correo) correo.textContent = sesion.correo;

    document.querySelectorAll("[data-logout]").forEach(function (el) {
      el.addEventListener("click", function (e) { e.preventDefault(); cerrarSesion(); });
    });
  });
})();
