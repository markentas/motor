export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const ff = estilos.fuente_frase || {};
  const fu = estilos.fuente_usuario || {};
  const fh = estilos.fuente_hashtag || {};
  const ico = estilos.icono || {};
  
  const icono = datos.icono || 'fa-instagram';
  
  const container = document.createElement('div');
  container.style.padding = '20px';
  container.style.textAlign = 'center';
  
  if (ico.mostrar !== false) {
    const iconEl = document.createElement('i');
    iconEl.className = `fab ${icono}`;
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
    fraseEl.style.cssText = `color:${ff.color};font-size:${ff.size};font-family:${ff.family};font-weight:${ff.weight || 'normal'};margin-bottom:10px;line-height:1.5;`;
    fraseEl.textContent = datos.frase;
    container.appendChild(fraseEl);
  }
  
  if (datos.usuario) {
    const usuarioEl = document.createElement('p');
    usuarioEl.style.cssText = `color:${fu.color};font-size:${fu.size};font-family:${fu.family};font-weight:${fu.weight || 'normal'};margin-top:10px;`;
    usuarioEl.textContent = datos.usuario;
    container.appendChild(usuarioEl);
  }
  
  if (datos.frase2) {
    const frase2El = document.createElement('p');
    frase2El.style.cssText = `color:${ff.color};font-size:${ff.size};font-family:${ff.family};font-weight:${ff.weight || 'normal'};margin-top:25px;margin-bottom:5px;line-height:1.5;`;
    frase2El.textContent = datos.frase2;
    container.appendChild(frase2El);
  }
  
  if (datos.hashtag) {
    const hashtagEl = document.createElement('p');
    hashtagEl.style.cssText = `color:${fh.color};font-size:${fh.size};font-family:${fh.family};font-weight:${fh.weight || 'normal'};margin-top:5px;`;
    hashtagEl.textContent = datos.hashtag;
    container.appendChild(hashtagEl);
  }
  
  contenedor.appendChild(container);
}
