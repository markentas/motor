// motor.js (Versión para GitHub)
async function iniciarMotor() {
  try {
    const respuesta = await fetch("./config.json");
    const config = await respuesta.json();
    const app = document.getElementById("app");

    // Validar estructura de estilos globales
    if (config.estilos_globales && config.estilos_globales.color_fondo) {
      document.body.style.backgroundColor = config.estilos_globales.color_fondo;
    }

    // IMPORTANTE: Tu server actual genera 'secciones'.
    // Si el motor en GitHub buscaba 'modulos', por eso salía 'undefined'.
    const listaSecciones = config.secciones || [];

    app.innerHTML = listaSecciones
      .filter((sec) => sec.visible)
      .sort((a, b) => a.orden - b.orden)
      .map((sec) => {
        if (sec.tipo === "hero" && sec.datos) {
          return `
                        <section class="hero-section">
                            <h1>${sec.datos.titulo || "Sin Título"}</h1>
                            <p>${sec.datos.frase || ""}</p>
                        </section>
                    `;
        }
        return "";
      })
      .join("");

    console.log("✅ Motor sincronizado con éxito");
  } catch (e) {
    console.error("❌ Error en motor central:", e);
  }
}
window.onload = iniciarMotor;
