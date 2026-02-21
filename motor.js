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

    const esLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    // En remoto usamos jsDelivr para evitar problemas de caché de GitHub Pages
    const baseRuta = esLocal
      ? "/motor/modulos/"
      : "https://cdn.jsdelivr.net/gh/markentas/motor/modulos/";

    for (const seccion of listaSecciones
      .filter((s) => s.visible)
      .sort((a, b) => a.orden - b.orden)) {
      try {
        const rutaModulo = `${baseRuta}${seccion.tipo}.js`;
        const modulo = await import(rutaModulo);
        modulo.render(seccion, app);
      } catch (err) {
        console.error(`❌ Error en módulo [${seccion.tipo}]:`, err);
      }
    }
  } catch (e) {
    console.error("❌ Error central:", e);
  }
}

window.onload = iniciarMotor;
