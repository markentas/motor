export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  const fondo = estilos.fondo || {};

  // Función para parsear margin CSS (soporta 1, 2, 3 o 4 valores)
  const parseMargin = (marginStr) => {
    if (!marginStr) return { top: '0', right: '0', bottom: '0', left: '0' };
    const parts = marginStr.trim().split(/\s+/);
    if (parts.length === 1) {
      return { top: parts[0], right: parts[0], bottom: parts[0], left: parts[0] };
    } else if (parts.length === 2) {
      return { top: parts[0], right: parts[1], bottom: parts[0], left: parts[1] };
    } else if (parts.length === 3) {
      return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[1] };
    } else if (parts.length >= 4) {
      return { top: parts[0], right: parts[1], bottom: parts[2], left: parts[3] };
    }
    return { top: '0', right: '0', bottom: '0', left: '0' };
  };

  // Función para crear elemento con margin CSS
  const crearConMargin = (elem, marginStr, estilos) => {
    const m = parseMargin(marginStr);
    const baseStyle = `
      margin-top: ${m.top};
      margin-right: ${m.right};
      margin-bottom: ${m.bottom};
      margin-left: ${m.left};
    `;
    
    if (elem === 'h1') {
      return `<h1 style="${baseStyle}color:${estilos.color};font-size:${estilos.size};font-family:${estilos.family};font-weight:${estilos.weight || 'normal'};text-shadow:2px 2px 4px rgba(0,0,0,0.5);">${datos.titulo || ''}</h1>`;
    } else if (elem === 'p') {
      return `<p style="${baseStyle}color:${estilos.color};font-size:${estilos.size};font-family:${estilos.family};font-weight:${estilos.weight || 'normal'};">`;
    } else if (elem === 'button') {
      return null; // El botón se maneja diferente
    }
    return '';
  };

  let html = '<div style="position:relative;width:100%;height:100%;min-height:inherit;display:flex;flex-direction:column;justify-content:center;align-items:center;">';

  // Icono
  const iconoEstilos = estilos.icono || {};
  const mostrarIcono = iconoEstilos.mostrar !== false;
  const iconoDatos = datos.icono;
  const mIcono = parseMargin(iconoEstilos.margin);

  if (mostrarIcono && iconoDatos) {
    const color = iconoEstilos.color || '#ffffff';
    const size = iconoEstilos.size || '40px';
    const marginCss = `margin:${mIcono.top} ${mIcono.right} ${mIcono.bottom} ${mIcono.left};`;
    
    let iconoHtml = '';
    if (iconoDatos.includes('.jpg') || iconoDatos.includes('.jpeg') || iconoDatos.includes('.gif') || iconoDatos.includes('.png') || iconoDatos.includes('img/')) {
      const imgUrl = iconoDatos.startsWith('http') ? iconoDatos : iconoDatos;
      iconoHtml = `<img src="${imgUrl}" alt="icono" style="${marginCss}width:${size};height:${size};object-fit:contain;">`;
    } else {
      const prefix = iconoDatos.startsWith('fa-') && !['fa-instagram', 'fa-facebook', 'fa-twitter', 'fa-tiktok', 'fa-whatsapp', 'fa-youtube', 'fa-telegram'].includes(iconoDatos) ? 'fas' : 'fab';
      iconoHtml = `<i class="${prefix} ${iconoDatos}" style="${marginCss}font-size:${size};color:${color};"></i>`;
    }
    html += iconoHtml;
  }

  // Título
  if (estilos.fuente_titulo && datos.titulo) {
    const ft = estilos.fuente_titulo;
    const mTitulo = parseMargin(ft.margin);
    const marginCss = `margin:${mTitulo.top} ${mTitulo.right} ${mTitulo.bottom} ${mTitulo.left};`;
    html += `<h1 style="${marginCss}color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};text-shadow:2px 2px 4px rgba(0,0,0,0.5);">${datos.titulo}</h1>`;
  }

  // Frase
  if (datos.frase) {
    const ff = estilos.fuente_frase || {};
    const mFrase = parseMargin(ff.margin);
    const marginCss = `margin:${mFrase.top} ${mFrase.right} ${mFrase.bottom} ${mFrase.left};`;
    html += `<p style="${marginCss}color:${ff.color};font-size:${ff.size};font-family:${ff.family};font-weight:${ff.weight || 'normal'};">${datos.frase}</p>`;
  }

  // Frase 2
  if (datos.frase_2) {
    const ff2 = estilos.fuente_frase_2 || {};
    const mFrase2 = parseMargin(ff2.margin);
    const marginCss = `margin:${mFrase2.top} ${mFrase2.right} ${mFrase2.bottom} ${mFrase2.left};`;
    html += `<p style="${marginCss}color:${ff2.color};font-size:${ff2.size};font-family:${ff2.family};font-weight:${ff2.weight || 'normal'};">${datos.frase_2}</p>`;
  }

  // Botón
  const eb = estilos.estilo_boton || {};
  const mBoton = parseMargin(eb.margin);
  const marginCssBoton = `margin:${mBoton.top} ${mBoton.right} ${mBoton.bottom} ${mBoton.left};`;
  html += `
    <button id="btn-ingresar" onclick="handleIngresar()" style="
      ${marginCssBoton}
      background:${eb.color_fondo || 'transparent'};
      color:${eb.color_texto || '#fff'};
      border:2px solid ${eb.color_borde || '#fff'};
      padding:${eb.padding || '12px 30px'};
      border-radius:${eb.radio || '4px'};
      font-size:1rem;
      cursor:pointer;
      text-transform:uppercase;
      letter-spacing:2px;
      transition:all 0.3s;
    ">${datos.boton_texto || 'INGRESAR'}</button>
  `;

  html += '</div>';

  contenedor.innerHTML = html;

  window.handleIngresar = function() {
    console.log('Botón INGRESAR clickeado');
    if (helpers.reproducirMusica) {
      helpers.reproducirMusica();
    }
    setTimeout(() => {
      if (helpers.scrollANext) {
        helpers.scrollANext();
      }
    }, 300);
  };
}
