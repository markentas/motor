export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const fl = estilos.fuente_lugar || {};
  const fd = estilos.fuente_direccion || {};
  const iconoEstilos = estilos.icono || {};
  const boton = estilos.boton || {};
  
  // Función local para parsear margin
  const parseMargin = (marginStr) => {
    if (!marginStr) return '';
    const parts = marginStr.trim().split(/\s+/);
    if (parts.length === 1) return `${parts[0]} ${parts[0]} ${parts[0]} ${parts[0]}`;
    if (parts.length === 2) return `${parts[0]} ${parts[1]} ${parts[0]} ${parts[1]}`;
    if (parts.length === 3) return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[1]}`;
    if (parts.length >= 4) return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`;
    return '';
  };
  
  // Margins
  const marginIcono = iconoEstilos.margin ? `margin:${parseMargin(iconoEstilos.margin)};` : 'margin-bottom:20px;';
  const marginTitulo = ft.margin ? `margin:${parseMargin(ft.margin)};` : 'margin-bottom:20px;';
  const marginLugar = fl.margin ? `margin:${parseMargin(fl.margin)};` : 'margin:5px 0;';
  const marginDireccion = fd.margin ? `margin:${parseMargin(fd.margin)};` : 'margin:5px 0;';
  const marginBoton = boton.margin ? `margin:${parseMargin(boton.margin)};` : 'margin-top:20px;';
  
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
  
  if (datos.titulo) {
    html += `<h2 style="${marginTitulo}color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};">${datos.titulo}</h2>`;
  }
  
  if (datos.lugar) {
    html += `<p style="${marginLugar}color:${fl.color};font-size:${fl.size};font-family:${fl.family};font-weight:bold;">${datos.lugar}</p>`;
  }
  
  if (datos.direccion) {
    html += `<p style="${marginDireccion}color:${fd.color};font-size:${fd.size};font-family:${fd.family};font-weight:${fd.weight || 'normal'};">${datos.direccion}</p>`;
  }
  
  if (datos.link_maps) {
    html += `
      <a href="${datos.link_maps}" target="_blank" style="
        display:inline-block;
        ${marginBoton}
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
