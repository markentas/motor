export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const ff = estilos.fuente_frase || {};
  const iconoEstilos = estilos.icono || {};
  const boton = estilos.boton || {};
  
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
  const marginTitulo = ft.margin ? `margin:${parseMargin(ft.margin)};` : 'margin-bottom:15px;';
  const marginFrase = ff.margin ? `margin:${parseMargin(ff.margin)};` : 'margin-bottom:30px;';
  const marginBoton = boton.margin ? `margin:${parseMargin(boton.margin)};` : '';
  
  const numero = datos.numero || '';
  const mensaje = encodeURIComponent(datos.mensaje || 'Confirmo mi asistencia');
  const linkWhatsapp = numero ? `https://api.whatsapp.com/send?phone=${numero}&text=${mensaje}` : '#';
  
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
  
  if (datos.numero) {
    const btnEl = document.createElement('a');
    btnEl.href = linkWhatsapp;
    btnEl.target = '_blank';
    btnEl.style.cssText = `
      display:inline-block;
      ${marginBoton}
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
