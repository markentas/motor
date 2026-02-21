// motor.js (Versión para GitHub)
async function iniciarMotor() {
  try {
    const respuesta = await fetch("./config.json");
    const config = await respuesta.json();
    const app = document.getElementById("app");

    // Aplicar fondo global
    document.body.style.backgroundColor = config.estilos_globales.color_fondo;

    app.innerHTML = config.secciones
      .filter((sec) => sec.visible)
      .sort((a, b) => a.orden - b.orden)
      .map((sec) => {
        if (sec.tipo === "hero") {
          return `
                        <section class="hero-section">
                            <h1>${sec.datos.titulo}</h1>
                            <p>${sec.datos.frase}</p>
                        </section>
                    `;
        }
        return "";
      })
      .join("");
  } catch (e) {
    console.error("Error en motor central:", e);
  }
}
window.onload = iniciarMotor;
