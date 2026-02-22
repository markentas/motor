export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const ffe = estilos.fuente_fecha || {};
  const fho = estilos.fuente_hora || {};
  const ico = estilos.icono || {};
  
  const icono = datos.icono || 'fa-calendar-day';
  
  let html = `<div style="padding:20px;">`;
  
  if (ico.mostrar !== false) {
    html += `<i class="fas ${icono}" style="font-size:${ico.size || '40px'};color:${ico.color || '#fff'};margin-bottom:20px;display:block;"></i>`;
  }
  
  if (datos.titulo) {
    html += `<h2 style="color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};margin-bottom:20px;">${datos.titulo}</h2>`;
  }
  
  if (datos.fecha) {
    html += `<p style="color:${ffe.color};font-size:${ffe.size};font-family:${ffe.family};font-weight:${ffe.weight || 'normal'};margin:5px 0;">${datos.fecha}</p>`;
  }
  
  if (datos.hora) {
    html += `<p style="color:${fho.color};font-size:${fho.size};font-family:${fho.family};font-weight:${fho.weight || 'normal'};margin:5px 0;">${datos.hora}</p>`;
  }
  
  html += `</div>`;
  contenedor.innerHTML = html;
}
