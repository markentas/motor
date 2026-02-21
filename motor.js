console.log("Motor v1.2: Sincronizado");

async function iniciar() {
  try {
    const res = await fetch("./config.json");
    const config = await res.json();
    console.log("Config cargada:", config);

    let titulo = "Evento";
    let subtitulo = "";

    // Lógica inteligente para evitar el error de 'undefined'
    if (config.modulos && config.modulos.length > 0) {
      // Formato nuevo: busca el módulo hero
      const hero = config.modulos.find((m) => m.tipo === "hero");
      if (hero && hero.opciones) {
        titulo = hero.opciones.titulo;
        subtitulo = hero.opciones.subtitulo || "";
      }
    } else if (config.datos) {
      // Formato viejo: compatibilidad
      titulo = config.datos.titulo || "Evento";
    }

    document.getElementById("app").innerHTML = `
      <div style="text-align:center; margin-top:100px; font-family:sans-serif;">
        <h1>${titulo}</h1>
        <p>${subtitulo}</p>
      </div>`;
  } catch (e) {
    console.error("Error crítico en el motor:", e);
    document.getElementById("app").innerHTML =
      "<h1>Error al cargar invitación</h1>";
  }
}

window.onload = iniciar;
