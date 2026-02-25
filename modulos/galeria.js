export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const ft = estilos.fuente_titulo || {};
  const ff = estilos.fuente_frase || {};
  const grid = estilos.grid || {};
  const imgEstilos = estilos.imagenes || {};
  const iconoEstilos = estilos.icono || {};
  const botonSubir = estilos.boton_subir || {};
  
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
  const marginTitulo = ft.margin ? `margin:${parseMargin(ft.margin)};` : 'margin-bottom:10px;';
  const marginFrase = ff.margin ? `margin:${parseMargin(ff.margin)};` : 'margin-bottom:25px;';
  
  const CLOUD_NAME = 'dkenj9wlq';
  const UPLOAD_PRESET = 'ml_default';
  const SUPABASE_URL = 'https://duwqmbkrbjldinzckpkx.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_F498KHXcrmfpbZUFpWc8Bg_pmPYmWSx';
  
  const container = document.createElement('div');
  container.style.padding = '30px 20px';
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
  
  const uploadBtn = document.createElement('button');
  uploadBtn.id = 'galeria-upload-btn';
  uploadBtn.style.cssText = `
    padding: ${botonSubir.padding || '14px 40px'};
    background: ${botonSubir.color_fondo || '#c64600'};
    color: ${botonSubir.color_texto || '#fff'};
    border: 2px solid ${botonSubir.color_borde || '#c64600'};
    border-radius: 30px;
    cursor: pointer;
    font-family: ${botonSubir.fuente || 'Montserrat, sans-serif'};
    font-size: ${botonSubir.size || '1rem'};
    font-weight: ${botonSubir.weight || '600'};
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 30px;
  `;
  uploadBtn.textContent = datos.boton_subir || 'SUBIR FOTO';
  container.appendChild(uploadBtn);
  
  const inputFile = document.createElement('input');
  inputFile.type = 'file';
  inputFile.accept = 'image/*';
  inputFile.multiple = true;
  inputFile.style.display = 'none';
  
  uploadBtn.onclick = () => inputFile.click();
  container.appendChild(inputFile);
  
  const uploadStatus = document.createElement('div');
  uploadStatus.id = 'galeria-status';
  uploadStatus.style.cssText = 'margin-bottom:20px;font-size:0.9rem;';
  container.appendChild(uploadStatus);
  
  const gridWrapper = document.createElement('div');
  gridWrapper.id = 'galeria-grid-wrapper';
  const columnas = grid.columnas || 3;
  const filas = grid.filas || 3;
  const tamano = imgEstilos.tamano_thumbnail || '150px';
  const gap = grid.gap || '5px';
  
  gridWrapper.style.cssText = `
    max-width: ${columnas * parseInt(tamano) + (columnas - 1) * parseInt(gap)}px;
    margin: 0 auto;
    max-height: ${filas * parseInt(tamano) + (filas - 1) * parseInt(gap) + 20}px;
    overflow-y: auto;
    padding-right: 5px;
  `;
  
  const gridContainer = document.createElement('div');
  gridContainer.id = 'galeria-grid';
  gridContainer.style.cssText = `
    display:grid;
    grid-template-columns:repeat(${columnas}, 1fr);
    gap:${gap};
  `;
  gridWrapper.appendChild(gridContainer);
  container.appendChild(gridWrapper);
  
  contenedor.appendChild(container);
  
  function getSlug() {
    const pathParts = window.location.pathname.split('/').filter(s => s && s !== 'index.html');
    const clientesIndex = pathParts.indexOf('clientes');
    return clientesIndex >= 0 && pathParts[clientesIndex + 1] 
      ? pathParts[clientesIndex + 1] 
      : (pathParts[pathParts.length - 1] || 'demo');
  }
  
  async function cargarFotos() {
    const gridEl = document.getElementById('galeria-grid');
    if (!gridEl) {
      console.log('Grid element not found');
      return;
    }
    
    console.log('Cargando fotos...');
    gridEl.innerHTML = '<p style="color:#888;grid-column:1/-1;padding:20px;">Cargando fotos...</p>';
    
    const slug = getSlug();
    console.log('Slug:', slug);
    
    fotosCache = [];
    
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/galeria_fotos?cliente_slug=eq.${slug}&order=created_at.desc`,
        {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`
          }
        }
      );
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        gridEl.innerHTML = '<p style="color:#f55;grid-column:1/-1;">Error al cargar fotos</p>';
        return;
      }
      
      const fotos = await response.json();
      console.log('Fotos cargadas:', fotos);
      
      if (!fotos || fotos.length === 0) {
        gridEl.innerHTML = '<p style="color:#666;grid-column:1/-1;padding:30px;">Aún no hay fotos.<br>¡Sé el primero en enviar!</p>';
        return;
      }
      
      gridEl.innerHTML = '';
      
      fotos.forEach((foto, index) => {
        fotosCache.push(foto);
        const imgContainer = document.createElement('div');
        imgContainer.style.cssText = 'position:relative;overflow:hidden;';
        
        const img = document.createElement('img');
        img.src = foto.url;
        img.style.cssText = `
          width:100%;
          height:${tamano};
          object-fit:cover;
          border-radius:4px;
          cursor:pointer;
          transition:transform 0.2s;
        `;
        img.onclick = () => abrirFoto(foto.url, index);
        img.onmouseover = () => img.style.transform = 'scale(1.05)';
        img.onmouseout = () => img.style.transform = 'scale(1)';
        
        imgContainer.appendChild(img);
        gridEl.appendChild(imgContainer);
      });
      
    } catch (e) {
      console.error('Error cargando fotos:', e);
      gridEl.innerHTML = '<p style="color:#f55;grid-column:1/-1;">Error al cargar fotos</p>';
    }
  }
  
  async function guardarEnSupabase(slug, url, publicId) {
    console.log('Intentando guardar en Supabase:', { slug, url, publicId });
    
    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/galeria_fotos`,
        {
          method: 'POST',
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            cliente_slug: slug,
            url: url,
            public_id: publicId
          })
        }
      );
      
      console.log('Supabase response status:', response.status);
      return response.ok;
    } catch (e) {
      console.error('Error guardando en Supabase:', e);
      return false;
    }
  }
  
  inputFile.onchange = async () => {
    const archivos = inputFile.files;
    if (archivos.length === 0) return;
    
    const slug = getSlug();
    const btn = document.getElementById('galeria-upload-btn');
    const status = document.getElementById('galeria-status');
    
    btn.disabled = true;
    btn.textContent = 'SUBIENDO...';
    
    let exitos = 0;
    let errores = 0;
    
    for (let i = 0; i < archivos.length; i++) {
      const archivo = archivos[i];
      status.innerHTML = `<p style="color:#fff;">Subiendo ${i + 1} de ${archivos.length}...</p>`;
      
      try {
        const formData = new FormData();
        
        const fileName = archivo.name.replace(/[^a-zA-Z0-9._-]/g, '_').substring(0, 50);
        const blob = archivo.slice(0, archivo.size, archivo.type);
        const sanitizedFile = new File([blob], fileName, { type: archivo.type });
        
        formData.append('file', sanitizedFile);
        formData.append('upload_preset', UPLOAD_PRESET);
        formData.append('folder', `clientes/${slug}/galeria`);
        
        const cloudResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData
          }
        );
        
        const cloudResult = await cloudResponse.json();
        
        console.log('Cloudinary response:', cloudResult);
        
        if (cloudResult.secure_url) {
          const guardado = await guardarEnSupabase(slug, cloudResult.secure_url, cloudResult.public_id);
          console.log('Guardado en Supabase:', guardado);
          if (guardado) {
            exitos++;
          } else {
            errores++;
          }
        } else {
          console.error('Cloudinary error:', cloudResult.error);
          errores++;
        }
      } catch (e) {
        console.error('Error upload:', e);
        errores++;
      }
    }
    
    btn.disabled = false;
    btn.textContent = datos.boton_subir || 'SUBIR FOTO';
    
    if (errores === 0 && exitos > 0) {
      status.innerHTML = `<p style="color:#10b981;font-weight:600;">¡${exitos} foto(s) subida(s) con éxito!</p>`;
      inputFile.value = '';
      cargarFotos();
      setTimeout(() => { status.innerHTML = ''; }, 4000);
    } else if (errores > 0) {
      status.innerHTML = `<p style="color:#f55;">${errores} foto(s) no se pudieron subir (nombres con caracteres especiales)</p>`;
    }
  };
  
  let fotosCache = [];
  
  function abrirFoto(url, index) {
    fotosCache = fotosCache || [];
    let fotoIndex = index !== undefined ? index : fotosCache.findIndex(f => f.url === url);
    
    const modal = document.createElement('div');
    modal.style.cssText = `
      position:fixed;
      top:0;
      left:0;
      width:100%;
      height:100%;
      background:rgba(0,0,0,0.95);
      z-index:9999;
      display:flex;
      align-items:center;
      justify-content:center;
    `;
    
    const img = document.createElement('img');
    img.src = url;
    img.style.maxWidth = '90%';
    img.style.maxHeight = '90%';
    img.style.borderRadius = '8px';
    img.style.transition = 'opacity 0.3s';
    
    modal.appendChild(img);
    
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&#10094;';
    prevBtn.style.cssText = `
      position:absolute;
      left:20px;
      top:50%;
      transform:translateY(-50%);
      background:rgba(255,255,255,0.2);
      border:none;
      color:white;
      font-size:30px;
      padding:15px 20px;
      cursor:pointer;
      border-radius:50%;
      transition:background 0.3s;
    `;
    prevBtn.onmouseover = () => prevBtn.style.background = 'rgba(255,255,255,0.4)';
    prevBtn.onmouseout = () => prevBtn.style.background = 'rgba(255,255,255,0.2)';
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&#10095;';
    nextBtn.style.cssText = `
      position:absolute;
      right:20px;
      top:50%;
      transform:translateY(-50%);
      background:rgba(255,255,255,0.2);
      border:none;
      color:white;
      font-size:30px;
      padding:15px 20px;
      cursor:pointer;
      border-radius:50%;
      transition:background 0.3s;
    `;
    nextBtn.onmouseover = () => nextBtn.style.background = 'rgba(255,255,255,0.4)';
    nextBtn.onmouseout = () => nextBtn.style.background = 'rgba(255,255,255,0.2)';
    
    const counter = document.createElement('div');
    counter.style.cssText = `
      position:absolute;
      bottom:20px;
      left:50%;
      transform:translateX(-50%);
      color:white;
      font-size:14px;
      background:rgba(0,0,0,0.5);
      padding:8px 16px;
      border-radius:20px;
    `;
    counter.textContent = `${fotoIndex + 1} / ${fotosCache.length}`;
    
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = `
      position:absolute;
      top:20px;
      right:20px;
      background:rgba(255,255,255,0.2);
      border:none;
      color:white;
      font-size:30px;
      width:40px;
      height:40px;
      cursor:pointer;
      border-radius:50%;
    `;
    
    function showPhoto(idx) {
      if (idx < 0) idx = fotosCache.length - 1;
      if (idx >= fotosCache.length) idx = 0;
      img.style.opacity = '0';
      setTimeout(() => {
        img.src = fotosCache[idx].url;
        counter.textContent = `${idx + 1} / ${fotosCache.length}`;
        img.style.opacity = '1';
      }, 150);
      fotoIndex = idx;
    }
    
    prevBtn.onclick = (e) => {
      e.stopPropagation();
      showPhoto(fotoIndex - 1);
    };
    
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      showPhoto(fotoIndex + 1);
    };
    
    if (fotosCache.length > 1) {
      modal.appendChild(prevBtn);
      modal.appendChild(nextBtn);
    }
    modal.appendChild(counter);
    modal.appendChild(closeBtn);
    
    closeBtn.onclick = () => modal.remove();
    modal.onclick = (e) => {
      if (e.target === modal) modal.remove();
    };
    
    document.body.appendChild(modal);
    
    let touchStartX = 0;
    modal.ontouchstart = (e) => {
      touchStartX = e.touches[0].clientX;
    };
    modal.ontouchend = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) showPhoto(fotoIndex + 1);
        else showPhoto(fotoIndex - 1);
      }
    };
  }
  
  setTimeout(() => {
    cargarFotos();
  }, 100);
}
