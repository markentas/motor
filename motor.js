async function iniciarMotor() {
  console.log("🎬 MOTOR: Iniciando...");

  try {
    const respuesta = await fetch("./config.json?v=" + Date.now());
    if (!respuesta.ok) throw new Error("No se pudo obtener config.json");

    const config = await respuesta.json();
    const app = document.getElementById("app");
    if (!app) return;

    if (config.estilos_globales?.color_fondo) {
      document.body.style.backgroundColor = config.estilos_globales.color_fondo;
    }

    const esLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.port === "3000";

    // Configuración de rutas directas a GitHub Pages
    const baseRuta = esLocal
      ? "/motor/modulos/"
      : "https://markentas.github.io/motor/modulos/";

    console.log("📍 Modo:", esLocal ? "LOCAL" : "REMOTO (GitHub Pages)");

    const listaSecciones = config.secciones || [];
    app.innerHTML = "";

    for (const seccion of listaSecciones
      .filter((s) => s.visible)
      .sort((a, b) => a.orden - b.orden)) {
      const rutaModulo = `${baseRuta}${seccion.tipo}.js`;
      try {
        const modulo = await import(rutaModulo);
        if (modulo.render) {
          modulo.render(seccion, app);
        }
      } catch (err) {
        console.error(`❌ Error en módulo [${seccion.tipo}]:`, err);
      }
    }
    console.log("✅ MOTOR: Renderizado finalizado.");
  } catch (e) {
    console.error("🚨 MOTOR: Error Crítico:", e);
  }
}

if (document.readyState === "complete") {
  iniciarMotor();
} else {
  window.addEventListener("load", iniciarMotor);
}
