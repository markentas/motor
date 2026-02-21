async function iniciarMotor() {
  console.log("🎬 MOTOR: Iniciando proceso...");

  try {
    // Cache busting en el config solo si estamos en desarrollo local
    const esLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.port === "3000";
    const query = esLocal ? `?v=${Date.now()}` : "";

    const respuesta = await fetch(`./config.json${query}`);
    if (!respuesta.ok) throw new Error("No se pudo cargar config.json");

    const config = await respuesta.json();
    console.log("📦 Configuración cargada:", config);

    const app = document.getElementById("app");
    if (!app) throw new Error("No se encontró el contenedor #app");

    if (config.estilos_globales?.color_fondo) {
      document.body.style.backgroundColor = config.estilos_globales.color_fondo;
    }

    // Definición de ruta de módulos unificada
    const baseRuta = esLocal
      ? "/motor/modulos/"
      : "https://cdn.jsdelivr.net/gh/markentas/motor/modulos/";

    console.log(`🌐 Entorno detectado: ${esLocal ? "LOCAL" : "REMOTO"}`);
    console.log(`📍 Ruta de módulos: ${baseRuta}`);

    const listaSecciones = config.secciones || [];
    app.innerHTML = "";

    // Renderizado secuencial de secciones
    for (const seccion of listaSecciones
      .filter((s) => s.visible)
      .sort((a, b) => a.orden - b.orden)) {
      const rutaModulo = `${baseRuta}${seccion.tipo}.js${query}`;
      console.log(`🧩 Importando: ${rutaModulo}`);

      try {
        const modulo = await import(rutaModulo);
        if (modulo.render) {
          modulo.render(seccion, app);
        } else {
          console.warn(
            `⚠️ El módulo [${seccion.tipo}] no tiene función render()`,
          );
        }
      } catch (err) {
        console.error(`❌ Fallo en módulo [${seccion.tipo}]:`, err);
      }
    }

    console.log("✅ MOTOR: Renderizado completo.");
  } catch (e) {
    console.error("🚨 MOTOR: ERROR CRÍTICO ->", e.message);
    const app = document.getElementById("app");
    if (app)
      app.innerHTML = `<div style="color:red; padding:20px; background:black;">Error: ${e.message}</div>`;
  }
}

// Inicialización segura
if (document.readyState === "complete") {
  iniciarMotor();
} else {
  window.addEventListener("load", iniciarMotor);
}
