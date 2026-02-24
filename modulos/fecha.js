export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const ffe = estilos.fuente_fecha || {};
  const fho = estilos.fuente_hora || {};
  const iconoEstilos = estilos.icono || {};
  
  let html = `<div style="padding:20px;">`;
  
  // Renderizar icono si existe y esta habilitado
  const mostrarIcono = iconoEstilos.mostrar !== false;
  const iconoDatos = datos.icono;

  if (mostrarIcono && iconoDatos) {
    const color = iconoEstilos.color || '#ffffff';
    const size = iconoEstilos.size || '40px';
    
    let iconoHtml = '';
    
    if (iconoDatos.includes('.jpg') || iconoDatos.includes('.jpeg') || iconoDatos.includes('.gif') || iconoDatos.includes('.png') || iconoDatos.includes('img/')) {
      iconoHtml = `<img src="${iconoDatos}" alt="icono" style="width:${size};height:${size};object-fit:contain;margin-bottom:20px;display:block;margin-left:auto;margin-right:auto;">`;
    } else {
      const prefix = iconoDatos.startsWith('fa-') && !['fa-instagram', 'fa-facebook', 'fa-twitter', 'fa-tiktok', 'fa-whatsapp', 'fa-youtube', 'fa-telegram'].includes(iconoDatos) ? 'fas' : 'fab';
      iconoHtml = `<i class="${prefix} ${iconoDatos}" style="font-size:${size};color:${color};margin-bottom:20px;display:block;"></i>`;
    }
    
    html += iconoHtml;
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
