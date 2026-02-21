async function iniciar() {
  try {
    console.log("Motor v1.0 iniciado...");
    // Lee el config.json de la carpeta donde esté el index.html
    const response = await fetch("./config.json");
    const config = await response.json();

    // Buscamos el módulo 'hero' (tu bienvenida)
    const hero = config.modulos.find((m) => m.tipo === "hero");

    if (hero) {
      document.getElementById("app").innerHTML = `
                <div style="text-align:center; margin-top:100px;">
                    <h1>${hero.opciones.titulo}</h1>
                    <p>${hero.opciones.subtitulo}</p>
                </div>`;
    }
  } catch (e) {
    console.error("Error crítico: No se pudo leer el config.json local", e);
  }
}
window.onload = iniciar;
