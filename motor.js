async function iniciarMotor() {
  console.log("🎬 MOTOR: Iniciando proceso de renderizado...");

  try {
    const respuesta = await fetch("./config.json?v=" + Date.now());
    if (!respuesta.ok) throw new Error("No se pudo obtener config.json");

    const config = await respuesta.json();
    console.log("📦 Configuración detectada:", config);

    const app = document.getElementById("app");
    if (!app) throw new Error("Elemento #app no encontrado en el DOM");

    if (config.estilos_globales?.color_fondo) {
      document.body.style.backgroundColor = config.estilos_globales.color_fondo;
    }

    const esLocal =
      window.location.port === "3000" ||
      window.location.hostname === "localhost";
    const baseRuta = esLocal
      ? "/motor/modulos/"
      : "https://cdn.jsdelivr.net/gh/markentas/motor/modulos/";

    console.log("📍 Cargando módulos desde:", baseRuta);

    const listaSecciones = config.secciones || [];
    app.innerHTML = "";

    for (const seccion of listaSecciones
      .filter((s) => s.visible)
      .sort((a, b) => a.orden - b.orden)) {
      const rutaModulo = `${baseRuta}${seccion.tipo}.js`;
      console.log(`🧩 Importando módulo: ${rutaModulo}`);

      try {
        const modulo = await import(rutaModulo);
        if (modulo.render) {
          modulo.render(seccion, app);
        } else {
          console.warn(
            `⚠️ El módulo ${seccion.tipo} no tiene una función render()`,
          );
        }
      } catch (err) {
        console.error(
          `❌ Fallo en la carga del módulo [${seccion.tipo}]:`,
          err,
        );
      }
    }
    console.log("✅ MOTOR: Renderizado finalizado.");
  } catch (e) {
    console.error("🚨 MOTOR: ERROR CRÍTICO ->", e.message);
    const app = document.getElementById("app");
    if (app)
      app.innerHTML = `<div style="color:red; padding:20px;">Error Crítico: ${e.message}</div>`;
  }
}

// Ejecución inmediata para evitar esperas de window.onload si ya cargó
if (document.readyState === "complete") {
  iniciarMotor();
} else {
  window.addEventListener("load", iniciarMotor);
}
