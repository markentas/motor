export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  const fondo = estilos.fondo || {};

  let html = '<div style="padding:20px;">';

  // Renderizar icono si existe y esta habilitado
  const iconoEstilos = estilos.icono || {};
  const mostrarIcono = iconoEstilos.mostrar !== false;
  const iconoDatos = datos.icono;

  if (mostrarIcono && iconoDatos) {
    const color = iconoEstilos.color || '#ffffff';
    const size = iconoEstilos.size || '40px';
    
    let iconoHtml = '';
    
    // Determinar si es una imagen o un icono FA
    if (iconoDatos.includes('.jpg') || iconoDatos.includes('.jpeg') || iconoDatos.includes('.gif') || iconoDatos.includes('.png') || iconoDatos.includes('img/')) {
      // Es una imagen
      const imgUrl = iconoDatos.startsWith('http') ? iconoDatos : iconoDatos;
      iconoHtml = `<img src="${imgUrl}" alt="icono" style="width:${size};height:${size};object-fit:contain;margin-bottom:20px;display:block;margin-left:auto;margin-right:auto;">`;
    } else {
      // Es un icono FA
      const prefix = iconoDatos.startsWith('fa-') && !['fa-instagram', 'fa-facebook', 'fa-twitter', 'fa-tiktok', 'fa-whatsapp', 'fa-youtube', 'fa-telegram'].includes(iconoDatos) ? 'fas' : 'fab';
      iconoHtml = `<i class="${prefix} ${iconoDatos}" style="font-size:${size};color:${color};margin-bottom:20px;display:block;"></i>`;
    }
    
    html += iconoHtml;
  }

  if (estilos.fuente_titulo) {
    const ft = estilos.fuente_titulo;
    html += `<h1 style="color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};margin-bottom:20px;text-shadow:2px 2px 4px rgba(0,0,0,0.5);">${datos.titulo || ''}</h1>`;
  }

  if (datos.frase) {
    const ff = estilos.fuente_frase || {};
    html += `<p style="color:${ff.color};font-size:${ff.size};font-family:${ff.family};font-weight:${ff.weight || 'normal'};margin-bottom:40px;">${datos.frase}</p>`;
  }

  if (datos.frase_2) {
    const ff2 = estilos.fuente_frase_2 || {};
    html += `<p style="color:${ff2.color};font-size:${ff2.size};font-family:${ff2.family};font-weight:${ff2.weight || 'normal'};margin-bottom:40px;">${datos.frase_2}</p>`;
  }

  const eb = estilos.estilo_boton || {};
  html += `<button id="btn-ingresar" onclick="handleIngresar()" style="
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
  ">${datos.boton_texto || 'INGRESAR'}</button>`;

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
