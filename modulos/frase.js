export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  const ft = estilos.fuente_titulo || {};
  
  const alineacion = ft.alineacion || 'center';
  const lineHeight = ft.line_height || '1.6';
  const texto = (datos.titulo || '').replace(/\n/g, '<br>');
  
  let html = `<div style="padding:20px;">`;
  
  if (datos.titulo) {
    html += `
      <div style="
        border-top:1px solid rgba(255,255,255,0.3);
        border-bottom:1px solid rgba(255,255,255,0.3);
        padding:30px 10px;
      ">
        <p style="
          color:${ft.color};
          font-size:${ft.size};
          font-family:${ft.family};
          font-weight:${ft.weight || 'normal'};
          text-align:${alineacion};
          line-height:${lineHeight};
          margin:0;
          white-space: pre-wrap;
        ">${texto}</p>
      </div>
    `;
  }
  
  html += `</div>`;
  contenedor.innerHTML = html;
}
