// motor.js - Constructor Dinámico Modular
console.log("Motor v2.0: Modo Constructor Activo");

// 1. Diccionario de Componentes (Aquí definiremos cada sección)
const Componentes = {
  hero: (opt) => `
    <section class="reveal" style="background-color: ${opt.fondo}; color: ${opt.colorTexto}; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
      <h1 style="font-size: 3em; margin-bottom: 20px;">${opt.titulo}</h1>
      <p style="font-size: 1.2em;">${opt.subtitulo}</p>
    </section>
  `,

  countdown: (opt) => `
    <section class="reveal" style="background-color: ${opt.fondo}; color: ${opt.colorTexto}; height: 50vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
      <h2 style="font-size: 1.5em; margin-bottom: 10px;">${opt.titulo}</h2>
      <div id="countdown_timer" style="font-size: 2em; font-weight: bold;">
        ${opt.subtitulo}
      </div>
      <p style="margin-top: 10px; opacity: 0.8;">(Lógica de tiempo activa)</p>
    </section>
  `,
};

// 2. Función Principal
async function iniciar() {
  try {
    const res = await fetch("./config.json");
    if (!res.ok) throw new Error("No se encontró config.json");
    const config = await res.json();

    const app = document.getElementById("app");
    app.innerHTML = ""; // Limpiar antes de renderizar

    // 3. Iteración Mágica: Renderiza en el orden del Array
    if (config.modulos && Array.isArray(config.modulos)) {
      config.modulos.forEach((mod) => {
        if (mod.visible && Componentes[mod.tipo]) {
          // Ejecuta la función correspondiente según el tipo
          app.innerHTML += Componentes[mod.tipo](mod.opciones);
        }
      });
    } else {
      app.innerHTML = "<h1>Configuración no válida</h1>";
    }

    // 4. Disparar efectos visuales post-renderizado
    ejecutarAnimaciones();
  } catch (e) {
    console.error("Error en el motor:", e);
    document.getElementById("app").innerHTML =
      "<h1>Error al cargar la invitación</h1>";
  }
}

// Función simple para manejar el "reveal"
function ejecutarAnimaciones() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s ease-out";
    observer.observe(el);
  });
}

window.onload = iniciar;
