// motor.js - Constructor Dinámico Modular
console.log("Motor v2.1: Sincronizado");

const Componentes = {
  hero: (opt) => `
    <section class="reveal" style="background-color: ${opt.fondo}; color: ${opt.colorTexto}; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 20px;">
      <h1 style="font-size: 3.5rem; margin: 0 0 10px 0; color: inherit;">${opt.titulo}</h1>
      <p style="font-size: 1.5rem; margin: 0; color: inherit; opacity: 0.9;">${opt.subtitulo}</p>
    </section>
  `,

  countdown: (opt) => `
    <section class="reveal" style="background-color: ${opt.fondo}; color: ${opt.colorTexto}; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px 20px;">
      <h2 style="font-size: 1.8rem; margin-bottom: 30px; color: inherit;">${opt.titulo}</h2>
      <div id="countdown_text" data-fecha="${opt.subtitulo}" style="display: flex; gap: 10px; justify-content: center; color: inherit;">
        <div class="count-block"> <span id="days" style="color: inherit;">0</span> <span class="label">DÍAS</span> </div>
        <div class="count-block"> <span id="hours" style="color: inherit;">0</span> <span class="label">HS</span> </div>
        <div class="count-block"> <span id="minutes" style="color: inherit;">0</span> <span class="label">MIN</span> </div>
        <div class="count-block"> <span id="seconds" style="color: inherit;">0</span> <span class="label">SEG</span> </div>
      </div>
    </section>
  `,
};

async function iniciar() {
  try {
    const res = await fetch("./config.json");
    if (!res.ok) throw new Error("No config");
    const config = await res.json();
    const app = document.getElementById("app");
    app.innerHTML = "";

    if (config.modulos && Array.isArray(config.modulos)) {
      config.modulos.forEach((mod) => {
        if (mod.visible && Componentes[mod.tipo]) {
          app.innerHTML += Componentes[mod.tipo](mod.opciones);
        }
      });
    }

    // Pequeño delay para asegurar que el DOM cargó los colores antes de animar
    setTimeout(() => {
      ejecutarAnimaciones();
      iniciarContador();
    }, 100);
  } catch (e) {
    console.error("Error:", e);
  }
}

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
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 1s ease-out";
    observer.observe(el);
  });
}

function iniciarContador() {
  const el = document.getElementById("countdown_text");
  if (!el) return;

  // Usamos una fecha por defecto si la del input no es válida
  const targetDate = new Date("March 21, 2026 21:00:00").getTime();

  const intervalo = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      el.innerHTML = "¡YA COMENZÓ!";
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
