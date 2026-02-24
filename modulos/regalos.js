export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const ff = estilos.fuente_frase || {};
  const iconoEstilos = estilos.icono || {};
  const boton = estilos.boton || {};
  const modal = estilos.modal || {};
  
  const mostrarBoton = datos.mostrar_boton !== false;
  const tieneDatos = datos.alias || datos.nombre_cuenta || datos.titular;
  
  const container = document.createElement('div');
  container.style.padding = '20px';
  
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
      iconEl.style.cssText = `font-size:${size};color:${color};margin-bottom:20px;display:block;`;
      container.appendChild(iconEl);
    }
  }
  
  if (datos.titulo) {
    const titleEl = document.createElement('h2');
    titleEl.style.cssText = `color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};margin-bottom:20px;`;
    titleEl.textContent = datos.titulo;
    container.appendChild(titleEl);
  }
  
  if (datos.frase) {
    const fraseEl = document.createElement('p');
    fraseEl.style.cssText = `color:${ff.color};font-size:${ff.size};font-family:${ff.family};font-weight:${ff.weight || 'normal'};margin-bottom:30px;line-height:1.5;`;
    fraseEl.textContent = datos.frase;
    container.appendChild(fraseEl);
  }
  
  if (mostrarBoton && tieneDatos) {
    const btnEl = document.createElement('button');
    btnEl.style.cssText = `
      background:${boton.color_fondo || 'transparent'};
      color:${boton.color_texto || '#fff'};
      border:2px solid ${boton.color_borde || '#fff'};
      padding:${boton.padding || '12px 24px'};
      text-transform:uppercase;
      letter-spacing:1px;
      font-size:0.9rem;
      cursor:pointer;
      transition:all 0.3s;
    `;
    btnEl.textContent = datos.texto_boton || 'VER DATOS DE PAGO';
    btnEl.onclick = () => abrirModalRegalos();
    container.appendChild(btnEl);
  }
  
  contenedor.appendChild(container);
  
  // Crear modal
  const modalEl = document.createElement('div');
  modalEl.id = 'modal-regalos';
  modalEl.style.cssText = `
    display:none;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:${modal.overlay_color || 'rgba(0,0,0,0.9)'};
    z-index:9999;
    align-items:center;
    justify-content:center;
  `;
  
  const modalContent = document.createElement('div');
  modalContent.onclick = (e) => e.stopPropagation();
  modalContent.style.cssText = `
    background:${modal.fondo_color || '#1a1a1a'};
    padding:30px;
    border-radius:12px;
    max-width:90%;
    width:350px;
    text-align:center;
    color:${modal.fuente_color || '#fff'};
  `;
  
  const modalTitle = document.createElement('h3');
  modalTitle.style.cssText = `margin-bottom:20px;font-family:${ft.family};`;
  modalTitle.textContent = 'DATOS DE PAGO';
  modalContent.appendChild(modalTitle);
  
  if (datos.alias) {
    const aliasDiv = document.createElement('div');
    aliasDiv.style.margin = '15px 0';
    if (datos.imagen_banco) {
      const img = document.createElement('img');
      img.src = datos.imagen_banco;
      img.style.cssText = 'height:30px;vertical-align:middle;margin-right:10px;';
      aliasDiv.appendChild(img);
    }
    const aliasSpan = document.createElement('span');
    aliasSpan.style.cssText = 'font-size:1.2rem;font-weight:bold;';
    aliasSpan.textContent = datos.alias;
    aliasDiv.appendChild(aliasSpan);
    modalContent.appendChild(aliasDiv);
  }
  
  if (datos.nombre_cuenta) {
    const nombreEl = document.createElement('p');
    nombreEl.style.cssText = 'color:#888;font-size:0.9rem;margin:10px 0;';
    nombreEl.textContent = datos.nombre_cuenta;
    modalContent.appendChild(nombreEl);
  }
  
  if (datos.titular) {
    const titularEl = document.createElement('p');
    titularEl.style.cssText = 'color:#666;font-size:0.8rem;margin-top:15px;';
    titularEl.textContent = `Titular: ${datos.titular}`;
    modalContent.appendChild(titularEl);
  }
  
  const closeBtn = document.createElement('button');
  closeBtn.style.cssText = `
    margin-top:25px;
    background:transparent;
    border:1px solid #555;
    color:#fff;
    padding:10px 30px;
    cursor:pointer;
    border-radius:4px;
  `;
  closeBtn.textContent = 'CERRAR';
  closeBtn.onclick = () => cerrarModalRegalos();
  modalContent.appendChild(closeBtn);
  
  modalEl.appendChild(modalContent);
  document.body.appendChild(modalEl);
  
  // Funciones globales
  window.abrirModalRegalos = function() {
    const modal = document.getElementById('modal-regalos');
    if (modal) modal.style.display = 'flex';
  };
  
  window.cerrarModalRegalos = function(event) {
    if (!event || event.target.id === 'modal-regalos') {
      const modal = document.getElementById('modal-regalos');
      if (modal) modal.style.display = 'none';
    }
  };
}
