export function render(seccion, contenedor) {
  const { datos, estilos } = seccion;

  const sectionEl = document.createElement("section");
  sectionEl.id = "hero-section";

  // Estilos del contenedor principal
  sectionEl.style.cssText = `
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: ${estilos.imagen_fondo ? `url(${estilos.imagen_fondo})` : estilos.color_fondo};
    background-size: cover;
    background-position: center;
    position: relative;
    overflow: hidden;
  `;

  sectionEl.innerHTML = `
    <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,${estilos.overlay_opacidad || 0.3}); z-index: 1;"></div>

    <div style="z-index: 2; padding: 20px;">
        <h1 style="color: ${estilos.fuente_titulo.color}; font-size: ${estilos.fuente_titulo.size}; font-family: ${estilos.fuente_titulo.family}; margin-bottom: 20px;">
            ${datos.titulo}
        </h1>
        <p style="color: ${estilos.fuente_frase.color}; font-size: ${estilos.fuente_frase.size}; margin-bottom: 40px;">
            ${datos.frase}
        </p>
        <button id="btn-ingresar" style="
            background: transparent;
            border: 2px solid ${estilos.estilo_boton.color_borde};
            color: ${estilos.estilo_boton.color_texto};
            padding: ${estilos.estilo_boton.padding};
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 2px;
        ">
            ${datos.boton_texto}
        </button>
    </div>

    <audio id="musica-global" loop>
        <source src="${datos.archivo_musica}" type="audio/mpeg">
    </audio>
  `;

  contenedor.appendChild(sectionEl);

  // Lógica del botón Ingresar
  const btn = sectionEl.querySelector("#btn-ingresar");
  const audio = sectionEl.querySelector("#musica-global");

  btn.onclick = () => {
    // 1. Intentar reproducir música si hay URL
    if (datos.archivo_musica) {
      audio
        .play()
        .catch((e) => console.warn("El navegador bloqueó el audio inicial."));
    }

    // 2. Scroll a la siguiente sección
    const proximaSeccion = sectionEl.nextElementSibling;
    if (proximaSeccion) {
      proximaSeccion.scrollIntoView({ behavior: "smooth" });
    } else {
      alert(
        "¡Música activada! (Aún no hay una segunda sección a la cual desplazarse)",
      );
    }
  };
}
