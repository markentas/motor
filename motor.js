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
      <section class="reveal" style="background-color: ${opt.fondo}; color: ${opt.colorTexto}; min-height: 50vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 0;">
        <h2 style="font-size: 1.5em; margin-bottom: 20px;">${opt.titulo}</h2>
        <div id="countdown_text" data-fecha="${opt.subtitulo}" style="display: flex; gap: 15px; justify-content: center;">
          <div class="count-block"> <span id="days">0</span> <br> <span class="label">DIAS</span> </div>
          <div class="count-block"> <span id="hours">0</span> <br> <span class="label">HORAS</span> </div>
          <div class="count-block"> <span id="minutes">0</span> <br> <span class="label">MINUTOS</span> </div>
          <div class="count-block"> <span id="seconds">0</span> <br> <span class="label">SEGUNDOS</span> </div>
        </div>
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

    // Esperamos un instante a que el HTML se dibuje en pantalla
    setTimeout(() => {
      ejecutarAnimaciones();
      iniciarContador();
    }, 50);
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

// Cuenta regresiva
function iniciarContador() {
  const el = document.getElementById("countdown_text");
  if (!el) return;

  // Intentamos convertir el texto "21 DE MARZO DE 2026" a fecha válida
  // Nota: JS prefiere formato "March 21, 2026" o "2026-03-21"
  const fechaString = el.getAttribute("data-fecha");
  const targetDate = new Date("March 21, 2026 21:30:00").getTime();

  const intervalo = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      el.innerHTML = "¡LLEGÓ EL MOMENTO!";
      clearInterval(intervalo);
      return;
    }

    document.getElementById("days").textContent = Math.floor(
      distance / (1000 * 60 * 60 * 24),
    );
    document.getElementById("hours").textContent = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    document.getElementById("minutes").textContent = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60),
    );
    document.getElementById("seconds").textContent = Math.floor(
      (distance % (1000 * 60)) / 1000,
    );
  }, 1000);
}
