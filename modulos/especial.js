export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const alineacion = ft.alineacion || 'center';
  
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.textAlign = alineacion;
  
  if (datos.titulo) {
    const tituloHtml = datos.titulo.replace(/\n/g, '<br>');
    const titleEl = document.createElement('div');
    titleEl.style.cssText = `
      color:${ft.color};
      font-size:${ft.size};
      font-family:${ft.family};
      font-weight:${ft.weight || 'normal'};
      line-height:1.4;
    `;
    titleEl.innerHTML = tituloHtml;
    container.appendChild(titleEl);
  }
  
  contenedor.appendChild(container);
}
