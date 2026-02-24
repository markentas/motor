export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const iconoEstilos = estilos.icono || {};
  
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
      imgEl.style.cssText = `width:${size};height:${size};object-fit:contain;margin-bottom:20px;display:block;margin-left:auto;margin-right:auto;`;
      container.appendChild(imgEl);
    } else {
      const prefix = iconoDatos.startsWith('fa-') && !['fa-instagram', 'fa-facebook', 'fa-twitter', 'fa-tiktok', 'fa-whatsapp', 'fa-youtube', 'fa-telegram'].includes(iconoDatos) ? 'fas' : 'fab';
      const iconEl = document.createElement('i');
      iconEl.className = `${prefix} ${iconoDatos}`;
      iconEl.style.cssText = `font-size:${size};color:${color};margin-bottom:20px;display:inline-block;`;
      container.appendChild(iconEl);
    }
  }
  
  if (datos.titulo) {
    const titleEl = document.createElement('h2');
    titleEl.style.cssText = `color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};`;
    titleEl.textContent = datos.titulo;
    container.appendChild(titleEl);
  }
  
  contenedor.appendChild(container);
}
