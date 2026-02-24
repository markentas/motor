export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const fl = estilos.fuente_lugar || {};
  const fd = estilos.fuente_direccion || {};
  const iconoEstilos = estilos.icono || {};
  const boton = estilos.boton || {};
  
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
  
  if (datos.lugar) {
    html += `<p style="color:${fl.color};font-size:${fl.size};font-family:${fl.family};font-weight:${fl.weight || 'normal'};margin:5px 0;font-weight:bold;">${datos.lugar}</p>`;
  }
  
  if (datos.direccion) {
    html += `<p style="color:${fd.color};font-size:${fd.size};font-family:${fd.family};font-weight:${fd.weight || 'normal'};margin:5px 0;">${datos.direccion}</p>`;
  }
  
  if (datos.link_maps) {
    html += `
      <a href="${datos.link_maps}" target="_blank" style="
        display:inline-block;
        margin-top:20px;
        color:${boton.color_texto || '#fff'};
        background:${boton.color_fondo || 'transparent'};
        border:2px solid ${boton.color_borde || '#fff'};
        padding:${boton.padding || '10px 20px'};
        text-decoration:none;
        text-transform:uppercase;
        letter-spacing:1px;
        font-size:0.9rem;
        transition:all 0.3s;
      ">CÓMO LLEGAR</a>
    `;
  }
  
  html += `</div>`;
  contenedor.innerHTML = html;
}
