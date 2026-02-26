import { parseMargin } from './util.js';

export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const ff1 = estilos.fuente_frase_1 || {};
  const ff2 = estilos.fuente_frase_2 || {};
  const ff3 = estilos.fuente_frase_3 || {};
  const iconoEstilos = estilos.icono || {};
  const alineacion = ft.alineacion || 'center';
  
  // Margins
  const marginIcono = iconoEstilos.margin ? `margin:${parseMargin(iconoEstilos.margin)};` : 'margin-bottom:20px;';
  const marginTitulo = ft.margin ? `margin:${parseMargin(ft.margin)};` : '';
  const marginFrase1 = ff1.margin ? `margin:${parseMargin(ff1.margin)};` : 'margin:10px 0;';
  const marginFrase2 = ff2.margin ? `margin:${parseMargin(ff2.margin)};` : 'margin:10px 0;';
  const marginFrase3 = ff3.margin ? `margin:${parseMargin(ff3.margin)};` : 'margin:10px 0;';
  
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.textAlign = alineacion;
  
  // Renderizar icono si existe y esta habilitado
  const mostrarIcono = iconoEstilos.mostrar !== false;
  const iconoDatos = datos.icono;

  if (mostrarIcono && iconoDatos) {
    const color = iconoEstilos.color || '#ffffff';
    const size = iconoEstilos.size || '40px';
    
    if (iconoDatos.includes('.jpg') || iconoDatos.includes('.jpeg') || iconoDatos.includes('.gif') || iconoDatos.includes('.png') || iconoDatos.includes('img/')) {
      const imgEl = document.createElement('img');
      imgEl.src = iconoDatos;
      imgEl.alt = 'icono';
      imgEl.style.cssText = `${marginIcono}width:${size};height:${size};object-fit:contain;display:block;margin-left:auto;margin-right:auto;`;
      container.appendChild(imgEl);
    } else {
      const prefix = iconoDatos.startsWith('fa-') && !['fa-instagram', 'fa-facebook', 'fa-twitter', 'fa-tiktok', 'fa-whatsapp', 'fa-youtube', 'fa-telegram'].includes(iconoDatos) ? 'fas' : 'fab';
      const iconEl = document.createElement('i');
      iconEl.className = `${prefix} ${iconoDatos}`;
      iconEl.style.cssText = `${marginIcono}font-size:${size};color:${color};display:inline-block;`;
      container.appendChild(iconEl);
    }
  }
  
  if (datos.titulo) {
    const tituloHtml = datos.titulo.replace(/\n/g, '<br>');
    const titleEl = document.createElement('div');
    titleEl.style.cssText = `
      ${marginTitulo}
      color:${ft.color};
      font-size:${ft.size};
      font-family:${ft.family};
      font-weight:${ft.weight || 'normal'};
      line-height:1.4;
    `;
    titleEl.innerHTML = tituloHtml;
    container.appendChild(titleEl);
  }
  
  // Frase 1
  if (datos.frase_1) {
    const frase1Html = datos.frase_1.replace(/\n/g, '<br>');
    const frase1El = document.createElement('div');
    frase1El.style.cssText = `
      ${marginFrase1}
      color:${ff1.color};
      font-size:${ff1.size};
      font-family:${ff1.family};
      font-weight:${ff1.weight || 'normal'};
      line-height:1.4;
    `;
    frase1El.innerHTML = frase1Html;
    container.appendChild(frase1El);
  }
  
  // Frase 2
  if (datos.frase_2) {
    const frase2Html = datos.frase_2.replace(/\n/g, '<br>');
    const frase2El = document.createElement('div');
    frase2El.style.cssText = `
      ${marginFrase2}
      color:${ff2.color};
      font-size:${ff2.size};
      font-family:${ff2.family};
      font-weight:${ff2.weight || 'normal'};
      line-height:1.4;
    `;
    frase2El.innerHTML = frase2Html;
    container.appendChild(frase2El);
  }
  
  // Frase 3
  if (datos.frase_3) {
    const frase3Html = datos.frase_3.replace(/\n/g, '<br>');
    const frase3El = document.createElement('div');
    frase3El.style.cssText = `
      ${marginFrase3}
      color:${ff3.color};
      font-size:${ff3.size};
      font-family:${ff3.family};
      font-weight:${ff3.weight || 'normal'};
      line-height:1.4;
    `;
    frase3El.innerHTML = frase3Html;
    container.appendChild(frase3El);
  }
  
  contenedor.appendChild(container);
}
