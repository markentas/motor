// motor.js (Versión con Detección de Entorno)
async function iniciarMotor() {
  try {
    const respuesta = await fetch("./config.json");
    const config = await respuesta.json();
    const app = document.getElementById("app");

    if (config.estilos_globales?.color_fondo) {
      document.body.style.backgroundColor = config.estilos_globales.color_fondo;
    }

    const listaSecciones = config.secciones || [];
    app.innerHTML = "";

    // DETERMINAR RUTA BASE: Local vs GitHub
    const esLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    const rutaBaseModulos = esLocal
      ? "/motor/modulos/"
      : "https://cdn.jsdelivr.net/gh/markentas/motor/modulos/";

    console.log(
      `🚀 Cargando módulos desde: ${esLocal ? "ENTORNO LOCAL" : "CDN GITHUB"}`,
    );

    for (const seccion of listaSecciones
      .filter((s) => s.visible)
      .sort((a, b) => a.orden - b.orden)) {
      try {
        // Importación dinámica usando la ruta inteligente
        const rutaModulo = `${rutaBaseModulos}${seccion.tipo}.js`;
        const modulo = await import(rutaModulo);

        modulo.render(seccion, app);
      } catch (err) {
        console.error(`❌ Error en módulo [${seccion.tipo}]:`, err);
      }
    }

    console.log("✅ Motor sincronizado correctamente");
  } catch (e) {
    console.error("❌ Error crítico en motor:", e);
  }
}

window.onload = iniciarMotor;
