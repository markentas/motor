export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const ico = estilos.icono || {};
  
  const icono = datos.icono || 'fa-heart';
  
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.textAlign = 'center';
  
  if (ico.mostrar !== false) {
    const iconEl = document.createElement('i');
    iconEl.className = `fas ${icono}`;
    iconEl.style.cssText = `font-size:${ico.size || '40px'};color:${ico.color || '#fff'};margin-bottom:20px;display:inline-block;`;
    container.appendChild(iconEl);
  }
  
  if (datos.titulo) {
    const titleEl = document.createElement('h2');
    titleEl.style.cssText = `color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};`;
    titleEl.textContent = datos.titulo;
    container.appendChild(titleEl);
  }
  
  contenedor.appendChild(container);
}
