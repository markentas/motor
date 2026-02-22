export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const ff = estilos.fuente_frase || {};
  const ico = estilos.icono || {};
  const boton = estilos.boton || {};
  
  const icono = datos.icono || 'fa-check-circle';
  const numero = datos.numero || '';
  const mensaje = encodeURIComponent(datos.mensaje || 'Confirmo mi asistencia');
  const linkWhatsapp = numero ? `https://api.whatsapp.com/send?phone=${numero}&text=${mensaje}` : '#';
  
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
    titleEl.style.cssText = `color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};margin-bottom:15px;`;
    titleEl.textContent = datos.titulo;
    container.appendChild(titleEl);
  }
  
  if (datos.frase) {
    const fraseEl = document.createElement('p');
    fraseEl.style.cssText = `color:${ff.color};font-size:${ff.size};font-family:${ff.family};font-weight:${ff.weight || 'normal'};margin-bottom:30px;`;
    fraseEl.textContent = datos.frase;
    container.appendChild(fraseEl);
  }
  
  if (datos.numero) {
    const btnEl = document.createElement('a');
    btnEl.href = linkWhatsapp;
    btnEl.target = '_blank';
    btnEl.style.cssText = `
      display:inline-block;
      color:${boton.color_texto || '#fff'};
      background:${boton.color_fondo || '#25D366'};
      border:2px solid ${boton.color_borde || '#25D366'};
      padding:${boton.padding || '12px 30px'};
      text-decoration:none;
      text-transform:uppercase;
      letter-spacing:1px;
      font-size:0.9rem;
      transition:all 0.3s;
    `;
    btnEl.textContent = datos.texto_boton || 'CONFIRMAR';
    container.appendChild(btnEl);
  } else {
    const avisoEl = document.createElement('p');
    avisoEl.style.cssText = 'color:#888;font-size:0.9rem;';
    avisoEl.textContent = 'Configure el número de WhatsApp';
    container.appendChild(avisoEl);
  }
  
  contenedor.appendChild(container);
}
