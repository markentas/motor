export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  const ft = estilos.fuente_titulo || {};
  const iconoEstilos = estilos.icono || {};
  
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
  
  const alineacion = ft.alineacion || 'center';
  const lineHeight = ft.line_height || '1.6';
  const texto = (datos.titulo || '').replace(/\n/g, '<br>');
  
  // Margin para icono
  const marginIcono = iconoEstilos.margin ? `margin:${parseMargin(iconoEstilos.margin)};` : 'margin-bottom:20px;';
  
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
    const marginTitulo = ft.margin ? `margin:${parseMargin(ft.margin)};` : '';
    html += `
      <div style="
        border-top:1px solid rgba(255,255,255,0.3);
        border-bottom:1px solid rgba(255,255,255,0.3);
        padding:30px 10px;
      ">
        <p style="
          ${marginTitulo}
          color:${ft.color};
          font-size:${ft.size};
          font-family:${ft.family};
          font-weight:${ft.weight || 'normal'};
          text-align:${alineacion};
          line-height:${lineHeight};
          margin:0;
          white-space: pre-wrap;
        ">${texto}</p>
      </div>
    `;
  }
  
  html += `</div>`;
  contenedor.innerHTML = html;
}
