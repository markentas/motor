export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const ff = estilos.fuente_frase || {};
  const inp = estilos.input || {};
  const btnEnviar = estilos.boton_enviar || {};
  const btnVer = estilos.boton_ver || {};
  const modal = estilos.modal || {};
  const iconoEstilos = estilos.icono || {};
  
  const SUPABASE_URL = 'https://duwqmbkrbjldinzckpkx.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_F498KHXcrmfpbZUFpWc8Bg_pmPYmWSx';
  
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
    titleEl.style.cssText = `color:${ft.color};font-size:${ft.size};font-family:${ft.family};font-weight:${ft.weight || 'normal'};margin-bottom:15px;`;
    titleEl.textContent = datos.titulo;
    container.appendChild(titleEl);
  }
  
  if (datos.frase) {
    const fraseEl = document.createElement('p');
    fraseEl.style.cssText = `color:${ff.color};font-size:${ff.size};font-family:${ff.family};font-weight:${ff.weight || 'normal'};margin-bottom:25px;`;
    fraseEl.textContent = datos.frase;
    container.appendChild(fraseEl);
  }

  const formEl = document.createElement('div');
  formEl.style.cssText = 'max-width:300px;margin:0 auto;';
  
  const inputNombre = document.createElement('input');
  inputNombre.type = 'text';
  inputNombre.placeholder = datos.placeholder_nombre || 'Tu nombre';
  inputNombre.id = 'visitas-nombre';
  inputNombre.style.cssText = `
    width:100%;
    padding:12px;
    margin-bottom:10px;
    background:${inp.color_fondo || '#1a1a1a'};
    color:${inp.color_texto || '#fff'};
    border:1px solid ${inp.color_borde || '#333'};
    border-radius:${inp.radio || '4px'};
    font-size:0.9rem;
    box-sizing:border-box;
  `;
  formEl.appendChild(inputNombre);
  
  const textarea = document.createElement('textarea');
  textarea.placeholder = datos.placeholder_mensaje || 'Tu mensaje';
  textarea.id = 'visitas-mensaje';
  textarea.rows = 3;
  textarea.style.cssText = `
    width:100%;
    padding:12px;
    margin-bottom:10px;
    background:${inp.color_fondo || '#1a1a1a'};
    color:${inp.color_texto || '#fff'};
    border:1px solid ${inp.color_borde || '#333'};
    border-radius:${inp.radio || '4px'};
    font-size:0.9rem;
    font-family:inherit;
    resize:none;
    box-sizing:border-box;
  `;
  formEl.appendChild(textarea);
  
  const btnEnviarEl = document.createElement('button');
  btnEnviarEl.style.cssText = `
    width:100%;
    padding:${btnEnviar.padding || '12px 24px'};
    background:${btnEnviar.color_fondo || '#c64600'};
    color:${btnEnviar.color_texto || '#fff'};
    border:2px solid ${btnEnviar.color_borde || '#c64600'};
    border-radius:${inp.radio || '4px'};
    cursor:pointer;
    font-size:0.9rem;
    text-transform:uppercase;
    letter-spacing:1px;
    margin-bottom:10px;
  `;
  btnEnviarEl.textContent = datos.boton_enviar || 'ENVIAR';
  btnEnviarEl.onclick = () => enviarMensaje(datos, formEl, btnEnviarEl);
  formEl.appendChild(btnEnviarEl);
  
  const btnVerEl = document.createElement('button');
  btnVerEl.style.cssText = `
    width:100%;
    padding:${btnVer.padding || '12px 24px'};
    background:${btnVer.color_fondo || 'transparent'};
    color:${btnVer.color_texto || '#fff'};
    border:2px solid ${btnVer.color_borde || '#fff'};
    border-radius:${inp.radio || '4px'};
    cursor:pointer;
    font-size:0.9rem;
    text-transform:uppercase;
    letter-spacing:1px;
  `;
  btnVerEl.textContent = datos.boton_ver || 'VER SALUDOS';
  btnVerEl.onclick = () => window.abrirModalMensajes(datos);
  formEl.appendChild(btnVerEl);
  
  container.appendChild(formEl);
  contenedor.appendChild(container);
  
  function getSlug() {
    const pathParts = window.location.pathname.split('/').filter(s => s && s !== 'index.html');
    const clientesIndex = pathParts.indexOf('clientes');
    return clientesIndex >= 0 && pathParts[clientesIndex + 1] 
      ? pathParts[clientesIndex + 1] 
      : (pathParts[pathParts.length - 1] || 'demo');
  }
  
  async function cargarMensajes() {
    const lista = document.getElementById('visitas-lista');
    if (!lista) return;
    
    lista.innerHTML = '<p style="color:#888;text-align:center;padding:20px;">Cargando...</p>';
    
    try {
      const slug = getSlug();
      
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/mensajes?cliente_slug=eq.${slug}&order=created_at.desc`,
        {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        }
      );
      
      if (!response.ok) {
        lista.innerHTML = '<p style="color:#f55;text-align:center;">Error al cargar mensajes</p>';
        return;
      }
      
      const data = await response.json();
      
      if (!data || data.length === 0) {
        lista.innerHTML = '<p style="color:#666;text-align:center;padding:30px;">No hay saludos aún.<br>¡Sé el primero!</p>';
        return;
      }
      
      lista.innerHTML = data.map(m => `
        <div style="border-bottom:1px solid #333;padding:15px 0;text-align:left;">
          <strong style="color:${ft.color}">${m.nombre}</strong>
          <p style="color:#aaa;font-size:0.85rem;margin-top:5px;">${m.mensaje || ''}</p>
          <small style="color:#666;font-size:0.7rem;">${new Date(m.created_at).toLocaleDateString()}</small>
        </div>
      `).join('');
    } catch (e) {
      console.error('Error cargando mensajes:', e);
      lista.innerHTML = '<p style="color:#f55;text-align:center;">Error al cargar mensajes</p>';
    }
  }
  
  window.cargarMensajes = cargarMensajes;
  
  async function enviarMensaje(datosSeccion, formEl, btn) {
    const nombre = document.getElementById('visitas-nombre').value.trim();
    const mensaje = document.getElementById('visitas-mensaje').value.trim();
    
    if (!nombre) {
      alert('Por favor ingresa tu nombre');
      return;
    }
    
    if (!mensaje) {
      alert('Por favor ingresa un mensaje');
      return;
    }
    
    btn.textContent = 'ENVIANDO...';
    btn.disabled = true;
    
    try {
      const slug = getSlug();
      
      const response = await fetch(`${SUPABASE_URL}/rest/v1/mensajes`, {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          cliente_slug: slug,
          nombre: nombre,
          mensaje: mensaje
        })
      });
      
      if (response.ok) {
        const successMsg = document.createElement('div');
        successMsg.style.cssText = 'background:#28a745;color:#fff;padding:10px;border-radius:4px;margin-bottom:15px;font-size:0.9rem;';
        successMsg.textContent = '¡Gracias por tu saludo!';
        formEl.insertBefore(successMsg, formEl.firstChild);
        
        document.getElementById('visitas-nombre').value = '';
        document.getElementById('visitas-mensaje').value = '';
        
        setTimeout(() => {
          successMsg.remove();
        }, 3000);
        
        cargarMensajes();
      } else {
        alert('Error al enviar. Intenta de nuevo.');
      }
    } catch (e) {
      console.error('Error enviando mensaje:', e);
      alert('Error de conexión. Intenta de nuevo.');
    }
    
    btn.textContent = datos.boton_enviar || 'ENVIAR';
    btn.disabled = false;
  }
  
  const existingModal = document.getElementById('modal-visitas');
  if (existingModal) existingModal.remove();
  
  const modalEl = document.createElement('div');
  modalEl.id = 'modal-visitas';
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
    overflow-y:auto;
  `;
  
  const contentEl = document.createElement('div');
  contentEl.style.cssText = `
    background:${modal.fondo_color || '#1a1a1a'};
    padding:25px;
    border-radius:12px;
    max-width:90%;
    width:350px;
    max-height:80vh;
    overflow-y:auto;
    color:${modal.fuente_color || '#fff'};
    margin:20px;
  `;
  
  const titleEl = document.createElement('h3');
  titleEl.style.cssText = 'margin-bottom:20px;text-align:center;';
  titleEl.textContent = 'SALUDOS';
  contentEl.appendChild(titleEl);
  
  const listaEl = document.createElement('div');
  listaEl.id = 'visitas-lista';
  listaEl.style.cssText = 'max-height:400px;overflow-y:auto;';
  contentEl.appendChild(listaEl);
  
  const closeBtn = document.createElement('button');
  closeBtn.style.cssText = `
    margin-top:20px;
    width:100%;
    background:transparent;
    border:1px solid #555;
    color:#fff;
    padding:12px;
    cursor:pointer;
    border-radius:4px;
  `;
  closeBtn.textContent = 'CERRAR';
  closeBtn.onclick = () => {
    modalEl.style.display = 'none';
  };
  contentEl.appendChild(closeBtn);
  
  modalEl.appendChild(contentEl);
  
  modalEl.onclick = (e) => {
    if (e.target === modalEl) {
      modalEl.style.display = 'none';
    }
  };
  
  document.body.appendChild(modalEl);
  
  window.abrirModalMensajes = function(datosSeccion) {
    modalEl.style.display = 'flex';
    cargarMensajes();
  };
}
