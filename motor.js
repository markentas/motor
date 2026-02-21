console.log("Motor v1.2: Sincronizado");

async function iniciar() {
  try {
    const res = await fetch("./config.json");
    const config = await res.json();
    console.log("Config cargada:", config);

    let titulo = "Evento";
    let subtitulo = "";

    // Lógica flexible: busca en 'modulos' o en 'datos' (por si acaso)
    if (config.modulos && config.modulos.length > 0) {
      const hero = config.modulos.find((m) => m.tipo === "hero");
      if (hero && hero.opciones) {
        titulo = hero.opciones.titulo;
        subtitulo = hero.opciones.subtitulo || "";
      }
    } else if (config.datos) {
      titulo = config.datos.titulo;
    }

    document.getElementById("app").innerHTML = `
      <div style="text-align:center; margin-top:100px; font-family:sans-serif;">
        <h1>${titulo}</h1>
        <p>${subtitulo}</p>
      </div>`;
  } catch (e) {
    console.error("Error crítico en el motor:", e);
    document.getElementById("app").innerHTML =
      "<h1>Error al cargar configuración</h1>";
  }
}

window.onload = iniciar;
