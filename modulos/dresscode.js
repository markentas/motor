export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const ff = estilos.fuente_frase || {};
  const fl = estilos.fuente_linea || {};
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
  const marginFrase = ff.margin ? `margin:${parseMargin(ff.margin)};` : 'margin:10px 0;';
  const marginLinea = fl.margin ? `margin:${parseMargin(fl.margin)};` : 'margin-top:20px;';
  
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
    fraseEl.style.cssText = `${marginFrase}color:${ff.color};font-size:${ff.size};font-family:${ff.family};font-weight:${ff.weight || 'normal'};`;
    fraseEl.textContent = datos.frase;
    container.appendChild(fraseEl);
  }
  
  if (datos.linea) {
    const lineaDiv = document.createElement('div');
    lineaDiv.style.cssText = 'margin:20px auto;width:80px;height:1px;background:#fff;';
    container.appendChild(lineaDiv);
    
    const lineaEl = document.createElement('p');
    lineaEl.style.cssText = `${marginLinea}color:${fl.color};font-size:${fl.size};font-family:${fl.family};font-weight:${fl.weight || 'normal'};`;
    lineaEl.textContent = datos.linea;
    container.appendChild(lineaEl);
  }
  
  contenedor.appendChild(container);
}
