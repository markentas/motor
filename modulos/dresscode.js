export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const ff = estilos.fuente_frase || {};
  const fl = estilos.fuente_linea || {};
  const ico = estilos.icono || {};
  
  const icono = datos.icono || 'fa-tshirt';
  
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
    titleEl.style.cssText = `color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};margin-bottom:20px;`;
    titleEl.textContent = datos.titulo;
    container.appendChild(titleEl);
  }
  
  if (datos.frase) {
    const fraseEl = document.createElement('p');
    fraseEl.style.cssText = `color:${ff.color};font-size:${ff.size};font-family:${ff.family};font-weight:${ff.weight || 'normal'};margin:10px 0;`;
    fraseEl.textContent = datos.frase;
    container.appendChild(fraseEl);
  }
  
  if (datos.linea) {
    const lineaDiv = document.createElement('div');
    lineaDiv.style.cssText = 'margin:20px auto;width:80px;height:1px;background:#fff;';
    container.appendChild(lineaDiv);
    
    const lineaEl = document.createElement('p');
    lineaEl.style.cssText = `color:${fl.color};font-size:${fl.size};font-family:${fl.family};font-weight:${fl.weight || 'normal'};margin-top:20px;`;
    lineaEl.textContent = datos.linea;
    container.appendChild(lineaEl);
  }
  
  contenedor.appendChild(container);
}
