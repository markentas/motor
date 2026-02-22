export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const fechaStr = datos.fecha || '2026-01-01';
  const horaStr = datos.hora || '00:00';
  
  const fechaHoraStr = `${fechaStr}T${horaStr}:00`;
  const targetMs = new Date(fechaHoraStr).getTime();
  
  const ft = estilos.fuente_titulo || {};
  const fn = estilos.fuente_numeros || {};
  const fl = estilos.fuente_labels || {};

  const now = new Date().getTime();
  const yaPaso = targetMs - now < 0;
  
  let html = `<div style="padding:20px;">`;
  
  if (datos.titulo && !yaPaso) {
    html += `<h2 style="color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};margin-bottom:30px;text-transform:uppercase;letter-spacing:3px;">${datos.titulo}</h2>`;
  }
  
  if (yaPaso) {
    html += `<div id="countdown-container"><span style="font-size:${fn.size};color:${fn.color};font-family:${fn.family};">¡LLEGÓ EL MOMENTO!</span></div>`;
  } else {
    html += `
      <div id="countdown-container" style="display:flex;justify-content:center;gap:20px;flex-wrap:wrap;">
        <div class="count-block">
          <span class="count-num" style="display:block;font-size:${fn.size};font-family:${fn.family};font-weight:${fn.weight || 'normal'};color:${fn.color};" data-unit="days">0</span>
          <span class="count-label" style="display:block;font-size:${fl.size};font-family:${fl.family};font-weight:${fl.weight || 'normal'};color:${fl.color};margin-top:5px;text-transform:uppercase;letter-spacing:2px;">Días</span>
        </div>
        <div class="count-block">
          <span class="count-num" style="display:block;font-size:${fn.size};font-family:${fn.family};font-weight:${fn.weight || 'normal'};color:${fn.color};" data-unit="hours">0</span>
          <span class="count-label" style="display:block;font-size:${fl.size};font-family:${fl.family};font-weight:${fl.weight || 'normal'};color:${fl.color};margin-top:5px;text-transform:uppercase;letter-spacing:2px;">Horas</span>
        </div>
        <div class="count-block">
          <span class="count-num" style="display:block;font-size:${fn.size};font-family:${fn.family};font-weight:${fn.weight || 'normal'};color:${fn.color};" data-unit="minutes">0</span>
          <span class="count-label" style="display:block;font-size:${fl.size};font-family:${fl.family};font-weight:${fl.weight || 'normal'};color:${fl.color};margin-top:5px;text-transform:uppercase;letter-spacing:2px;">Min</span>
        </div>
        <div class="count-block">
          <span class="count-num" style="display:block;font-size:${fn.size};font-family:${fn.family};font-weight:${fn.weight || 'normal'};color:${fn.color};" data-unit="seconds">0</span>
          <span class="count-label" style="display:block;font-size:${fl.size};font-family:${fl.family};font-weight:${fl.weight || 'normal'};color:${fl.color};margin-top:5px;text-transform:uppercase;letter-spacing:2px;">Seg</span>
        </div>
      </div>
    `;
  }
  
  html += `</div>`;
  contenedor.innerHTML = html;
  
  if (yaPaso) return;
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetMs - now;
    
    if (distance < 0) {
      clearInterval(interval);
      const container = contenedor.querySelector('#countdown-container');
      if (container) {
        container.innerHTML = `<span style="font-size:${fn.size};color:${fn.color};font-family:${fn.family};">¡LLEGÓ EL MOMENTO!</span>`;
      }
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    const container = contenedor.querySelector('#countdown-container');
    if (container) {
      container.querySelector('[data-unit="days"]').textContent = days;
      container.querySelector('[data-unit="hours"]').textContent = hours;
      container.querySelector('[data-unit="minutes"]').textContent = minutes;
      container.querySelector('[data-unit="seconds"]').textContent = seconds;
    }
  }
  
  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
}
