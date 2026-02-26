import { parseMargin } from './util.js';

export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  const ft = estilos.fuente_titulo || {};
  const iconoEstilos = estilos.icono || {};
  const lineasEstilos = estilos.lineas || {};
  
  const alineacion = ft.alineacion || 'center';
  const lineHeight = ft.line_height || '1.6';
  const texto = (datos.titulo || '').replace(/\n/g, '<br>');
  
  // Margin para icono
  const marginIcono = iconoEstilos.margin ? `margin:${parseMargin(iconoEstilos.margin)};` : 'margin-bottom:20px;';
  
  // Configuración de líneas
  const mostrarLineas = lineasEstilos.mostrar !== false;
  const colorLineas = lineasEstilos.color || 'rgba(255,255,255,0.3)';
  const grosorLineas = lineasEstilos.grosor || '1px';
  
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
    const borderStyle = mostrarLineas ? `border-top:${grosorLineas} solid ${colorLineas};border-bottom:${grosorLineas} solid ${colorLineas};` : '';
    html += `
      <div style="${borderStyle}padding:30px 10px;">
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
