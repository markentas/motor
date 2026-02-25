export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const ff = estilos.fuente_frase || {};
  const fu = estilos.fuente_usuario || {};
  const fh = estilos.fuente_hashtag || {};
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
  
  // Margins
  const marginIcono = iconoEstilos.margin ? `margin:${parseMargin(iconoEstilos.margin)};` : 'margin-bottom:20px;';
  const marginTitulo = ft.margin ? `margin:${parseMargin(ft.margin)};` : 'margin-bottom:20px;';
  const marginFrase = ff.margin ? `margin:${parseMargin(ff.margin)};` : 'margin-bottom:10px;';
  const marginUsuario = fu.margin ? `margin:${parseMargin(fu.margin)};` : 'margin-top:10px;';
  const marginHashtag = fh.margin ? `margin:${parseMargin(fh.margin)};` : 'margin-top:5px;';
  
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.textAlign = 'center';
  
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
    const titleEl = document.createElement('h2');
    titleEl.style.cssText = `${marginTitulo}color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};`;
    titleEl.textContent = datos.titulo;
    container.appendChild(titleEl);
  }
  
  if (datos.frase) {
    const fraseEl = document.createElement('p');
    fraseEl.style.cssText = `${marginFrase}color:${ff.color};font-size:${ff.size};font-family:${ff.family};font-weight:${ff.weight || 'normal'};line-height:1.5;`;
    fraseEl.textContent = datos.frase;
    container.appendChild(fraseEl);
  }
  
  if (datos.usuario) {
    const usuarioEl = document.createElement('p');
    usuarioEl.style.cssText = `${marginUsuario}color:${fu.color};font-size:${fu.size};font-family:${fu.family};font-weight:${fu.weight || 'normal'};`;
    usuarioEl.textContent = datos.usuario;
    container.appendChild(usuarioEl);
  }
  
  if (datos.frase2) {
    const frase2El = document.createElement('p');
    frase2El.style.cssText = `${marginFrase}color:${ff.color};font-size:${ff.size};font-family:${ff.family};font-weight:${ff.weight || 'normal'};margin-top:25px;margin-bottom:5px;line-height:1.5;`;
    frase2El.textContent = datos.frase2;
    container.appendChild(frase2El);
  }
  
  if (datos.hashtag) {
    const hashtagEl = document.createElement('p');
    hashtagEl.style.cssText = `${marginHashtag}color:${fh.color};font-size:${fh.size};font-family:${fh.family};font-weight:${fh.weight || 'normal'};`;
    hashtagEl.textContent = datos.hashtag;
    container.appendChild(hashtagEl);
  }
  
  contenedor.appendChild(container);
}
