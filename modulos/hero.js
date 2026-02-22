export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  const fondo = estilos.fondo || {};

  let html = '<div style="padding:20px;">';

  if (estilos.fuente_titulo) {
    const ft = estilos.fuente_titulo;
    html += `<h1 style="color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};margin-bottom:20px;text-shadow:2px 2px 4px rgba(0,0,0,0.5);">${datos.titulo || ''}</h1>`;
  }

  if (datos.frase) {
    const ff = estilos.fuente_frase || {};
    html += `<p style="color:${ff.color};font-size:${ff.size};font-family:${ff.family};font-weight:${ff.weight || 'normal'};margin-bottom:40px;">${datos.frase}</p>`;
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
