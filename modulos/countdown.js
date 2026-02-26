import { parseMargin } from './util.js';

export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const fechaStr = datos.fecha || '2026-01-01';
  const horaStr = datos.hora || '00:00';
  
  const fechaHoraStr = `${fechaStr}T${horaStr}:00`;
  const targetMs = new Date(fechaHoraStr).getTime();
  
  const ft = estilos.fuente_titulo || {};
  const fn = estilos.fuente_numeros || {};
  const fl = estilos.fuente_labels || {};
  const fc = estilos.circulo || {};
  
  const diseno = estilos.diseno || 'basico';
  
  // Margins
  const iconoEstilos = estilos.icono || {};
  const marginIcono = iconoEstilos.margin ? `margin:${parseMargin(iconoEstilos.margin)};` : 'margin-bottom:20px;';
  const marginTitulo = ft.margin ? `margin:${parseMargin(ft.margin)};` : 'margin-bottom:30px;';
  
  const now = new Date().getTime();
  const yaPaso = targetMs - now < 0;
  
  let html = `<div style="padding:20px;">`;
  
  // Renderizar icono si existe y esta habilitado
  const mostrarIcono = iconoEstilos.mostrar !== false;
  const iconoDatos = datos.icono;

  if (mostrarIcono && iconoDatos) {
    const color = iconoEstilos.color || '#ffffff';
    const size = iconoEstilos.size || '40px';
    
    let iconoHtml = '';
    
    if (iconoDatos.includes('.jpg') || iconoDatos.includes('.jpeg') || iconoDatos.includes('.gif') || iconoDatos.includes('.png') || iconoDatos.includes('img/')) {
      iconoHtml = `<img src="${iconoDatos}" alt="icono" style="${marginIcono}width:${size};height:${size};object-fit:contain;display:block;margin-left:auto;margin-right:auto;">`;
    } else {
      const prefix = iconoDatos.startsWith('fa-') && !['fa-instagram', 'fa-facebook', 'fa-twitter', 'fa-tiktok', 'fa-whatsapp', 'fa-youtube', 'fa-telegram'].includes(iconoDatos) ? 'fas' : 'fab';
      iconoHtml = `<i class="${prefix} ${iconoDatos}" style="${marginIcono}font-size:${size};color:${color};display:block;"></i>`;
    }
    
    html += iconoHtml;
  }
  
  if (datos.titulo && !yaPaso) {
    html += `<h2 style="${marginTitulo}color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};text-transform:uppercase;letter-spacing:3px;">${datos.titulo}</h2>`;
  }
  
  if (yaPaso) {
    html += `<div id="countdown-container"><span style="font-size:${fn.size};color:${fn.color};font-family:${fn.family};">¡LLEGÓ EL MOMENTO!</span></div>`;
  } else {
    if (diseno === 'circulo') {
      html += renderCirculoDesign(fn, fl, fc);
    } else {
      html += renderBasicoDesign(fn, fl);
    }
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
      if (diseno === 'circulo') {
        updateCirculoDesign(container, days, hours, minutes, seconds);
      } else {
        container.querySelector('[data-unit="days"]').textContent = days;
        container.querySelector('[data-unit="hours"]').textContent = hours;
        container.querySelector('[data-unit="minutes"]').textContent = minutes;
        container.querySelector('[data-unit="seconds"]').textContent = seconds;
      }
    }
  }
  
  updateCountdown();
  const interval = setInterval(updateCountdown, 1000);
}

function renderBasicoDesign(fn, fl) {
  return `
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

function renderCirculoDesign(fn, fl, fc) {
  const size = fc.tamano || '100px';
  const colorActivo = fc.color_activo || '#009B9D';
  const colorInactivo = fc.color_inactivo || '#dddddd';
  const thickness = fc.grosor || '3px';
  const gap = fc.separacion || '12px';
  const padding = fc.padding || '10px';
  
  const fontSize = fn.size || '2rem';
  const fontColor = fn.color || '#ffffff';
  const fontFamily = fn.family || 'Montserrat, sans-serif';
  const fontWeight = fn.weight || '500';
  
  const labelSize = fl.size || '0.7rem';
  const labelColor = fl.color || '#888888';
  const labelFamily = fl.family || 'Montserrat, sans-serif';
  const labelWeight = fl.weight || '400';
  
  const viewBoxW = 120;
  const viewBoxH = 150;
  const radius = 35;
  const centerX = 60;
  const centerY = 55;
  const circumference = 2 * Math.PI * radius;
  
  return `
    <div id="countdown-container" style="display:flex;justify-content:center;gap:${gap};flex-wrap:wrap;padding:${padding};width:100%;box-sizing:border-box;">
      <div class="count-block" data-unit="days" data-max="31">
        <svg width="${size}" height="${size}" viewBox="0 0 ${viewBoxW} ${viewBoxH}" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle r="${radius}" cx="${centerX}" cy="${centerY}" fill="transparent" stroke="${colorInactivo}" stroke-width="${thickness}"></circle>
            <circle class="progress-circle" r="${radius}" cx="${centerX}" cy="${centerY}" fill="transparent" stroke="${colorActivo}" stroke-width="${thickness}" stroke-linecap="round" stroke-dasharray="0,${circumference}" transform="rotate(-90 ${centerX} ${centerY})"></circle>
            <text class="count-num" text-anchor="middle" x="${centerX}" y="${centerY + 12}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fontColor}" font-family="${fontFamily}">0</text>
          </g>
          <g>
            <text class="count-label" text-anchor="middle" x="${centerX}" y="${viewBoxH - 5}" font-size="${labelSize}" font-weight="${labelWeight}" fill="${labelColor}" font-family="${labelFamily}">Días</text>
          </g>
        </svg>
      </div>
      <div class="count-block" data-unit="hours" data-max="24">
        <svg width="${size}" height="${size}" viewBox="0 0 ${viewBoxW} ${viewBoxH}" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle r="${radius}" cx="${centerX}" cy="${centerY}" fill="transparent" stroke="${colorInactivo}" stroke-width="${thickness}"></circle>
            <circle class="progress-circle" r="${radius}" cx="${centerX}" cy="${centerY}" fill="transparent" stroke="${colorActivo}" stroke-width="${thickness}" stroke-linecap="round" stroke-dasharray="0,${circumference}" transform="rotate(-90 ${centerX} ${centerY})"></circle>
            <text class="count-num" text-anchor="middle" x="${centerX}" y="${centerY + 12}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fontColor}" font-family="${fontFamily}">0</text>
          </g>
          <g>
            <text class="count-label" text-anchor="middle" x="${centerX}" y="${viewBoxH - 5}" font-size="${labelSize}" font-weight="${labelWeight}" fill="${labelColor}" font-family="${labelFamily}">Horas</text>
          </g>
        </svg>
      </div>
      <div class="count-block" data-unit="minutes" data-max="60">
        <svg width="${size}" height="${size}" viewBox="0 0 ${viewBoxW} ${viewBoxH}" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle r="${radius}" cx="${centerX}" cy="${centerY}" fill="transparent" stroke="${colorInactivo}" stroke-width="${thickness}"></circle>
            <circle class="progress-circle" r="${radius}" cx="${centerX}" cy="${centerY}" fill="transparent" stroke="${colorActivo}" stroke-width="${thickness}" stroke-linecap="round" stroke-dasharray="0,${circumference}" transform="rotate(-90 ${centerX} ${centerY})"></circle>
            <text class="count-num" text-anchor="middle" x="${centerX}" y="${centerY + 12}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fontColor}" font-family="${fontFamily}">0</text>
          </g>
          <g>
            <text class="count-label" text-anchor="middle" x="${centerX}" y="${viewBoxH - 5}" font-size="${labelSize}" font-weight="${labelWeight}" fill="${labelColor}" font-family="${labelFamily}">Min</text>
          </g>
        </svg>
      </div>
      <div class="count-block" data-unit="seconds" data-max="60">
        <svg width="${size}" height="${size}" viewBox="0 0 ${viewBoxW} ${viewBoxH}" xmlns="http://www.w3.org/2000/svg">
          <g>
            <circle r="${radius}" cx="${centerX}" cy="${centerY}" fill="transparent" stroke="${colorInactivo}" stroke-width="${thickness}"></circle>
            <circle class="progress-circle" r="${radius}" cx="${centerX}" cy="${centerY}" fill="transparent" stroke="${colorActivo}" stroke-width="${thickness}" stroke-linecap="round" stroke-dasharray="0,${circumference}" transform="rotate(-90 ${centerX} ${centerY})"></circle>
            <text class="count-num" text-anchor="middle" x="${centerX}" y="${centerY + 12}" font-size="${fontSize}" font-weight="${fontWeight}" fill="${fontColor}" font-family="${fontFamily}">0</text>
          </g>
          <g>
            <text class="count-label" text-anchor="middle" x="${centerX}" y="${viewBoxH - 5}" font-size="${labelSize}" font-weight="${labelWeight}" fill="${labelColor}" font-family="${labelFamily}">Seg</text>
          </g>
        </svg>
      </div>
    </div>
  `;
}

function updateCirculoDesign(container, days, hours, minutes, seconds) {
  const radius = 35;
  const circumference = 2 * Math.PI * radius;
  
  const units = [
    { unit: 'days', value: days, max: 31 },
    { unit: 'hours', value: hours, max: 24 },
    { unit: 'minutes', value: minutes, max: 60 },
    { unit: 'seconds', value: seconds, max: 60 }
  ];
  
  units.forEach(({ unit, value, max }) => {
    const block = container.querySelector(`[data-unit="${unit}"]`);
    if (!block) return;
    
    const circle = block.querySelector('.progress-circle');
    const text = block.querySelector('.count-num');
    
    if (circle) {
      const dashValue = (value / max) * circumference;
      circle.setAttribute('stroke-dasharray', `${dashValue},${circumference}`);
    }
    
    if (text) {
      text.textContent = value < 10 ? `0${value}` : value;
    }
  });
}
