let audioGlobal = null;
let musicaIniciada = false;

// Función helper para parsear margin CSS (disponible globalmente para todos los módulos)
function parseMarginCSS(marginStr) {
    if (!marginStr) return '';
    const parts = marginStr.trim().split(/\s+/);
    if (parts.length === 1) {
      return `${parts[0]} ${parts[0]} ${parts[0]} ${parts[0]}`;
    } else if (parts.length === 2) {
      return `${parts[0]} ${parts[1]} ${parts[0]} ${parts[1]}`;
    } else if (parts.length === 3) {
      return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[1]}`;
    } else if (parts.length >= 4) {
      return `${parts[0]} ${parts[1]} ${parts[2]} ${parts[3]}`;
    }
    return '';
}

// Función helper para construir estilos con margin automático
// Uso: buildStyle({ color: '#fff', size: '20px', margin: '10px 0 20px 0' })
// Retorna: "margin: 10px 0 20px 0; color: #fff; font-size: 20px;"
function buildStyle(estilos, opciones = {}) {
    if (!estilos) return '';
    let css = '';
    
    // Si tiene margin, agregarlo primero
    if (estilos.margin) {
        const m = parseMarginCSS(estilos.margin);
        if (m) css += `margin: ${m}; `;
    }
    
    // Agregar otros estilos
    Object.keys(estilos).forEach(key => {
        if (key === 'margin') return; // ya procesado
        const valor = estilos[key];
        if (valor !== undefined && valor !== null && valor !== '') {
            css += `${key}: ${valor}; `;
        }
    });
    
    return css;
}

// Función helper para crear estilo inline con margin
// Uso: styleWithMargin(estilos, 'color:#fff;font-size:20px;')
function styleWithMargin(estilos, baseStyle = '') {
    let style = baseStyle;
    if (estilos?.margin) {
        const m = parseMarginCSS(estilos.margin);
        if (m) style = `margin: ${m}; ` + style;
    }
    return style;
}

function reproducirMusica() {
  if (audioGlobal && audioGlobal.paused) {
    audioGlobal.play().catch(() => {});
    actualizarBotonMusica(true);
  }
}

function toggleMusica() {
  if (!audioGlobal) return;
  
  if (audioGlobal.paused) {
    audioGlobal.play().catch(() => {});
    actualizarBotonMusica(true);
  } else {
    audioGlobal.pause();
    actualizarBotonMusica(false);
  }
}

function actualizarBotonMusica(playing) {
  const btn = document.getElementById('btn-musica');
  if (btn) {
    btn.innerHTML = playing ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
  }
}

function crearBotonMusica() {
  if (document.getElementById('btn-musica')) return;
  
  const btn = document.createElement('div');
  btn.id = 'btn-musica';
  btn.innerHTML = '<i class="fas fa-play"></i>';
  btn.onclick = toggleMusica;
  document.body.appendChild(btn);
}

function obtenerRutaBase() {
  const esLocal = window.location.hostname === 'localhost' || 
                  window.location.hostname === '127.0.0.1' || 
                  window.location.port === '3000';
  return esLocal ? '/motor/' : 'https://markentas.github.io/motor/';
}

function aplicarFondo(seccionEl, estilos) {
  const fondo = estilos.fondo || {};
  let css = '';
  
  if (fondo.tipo === 'imagen' && fondo.imagen) {
    const urlImagen = fondo.imagen.includes('/') ? fondo.imagen : `img/${fondo.imagen}`;
    const posicion = fondo.imagen_posicion || 'center';
    css += `background-image: url('${urlImagen}'); background-size: cover; background-position: ${posicion};`;
  } else {
    css += `background-color: ${fondo.color || '#0a0a0a'};`;
  }
  
  seccionEl.style.cssText = css;
  
  if (fondo.tipo === 'imagen' && fondo.overlay_opacidad > 0) {
    const overlay = document.createElement('div');
    const overlayColor = fondo.overlay_color || '#000000';
    const rgb = hexToRgb(overlayColor);
    overlay.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(${rgb.r},${rgb.g},${rgb.b},${fondo.overlay_opacidad});z-index:1;`;
    seccionEl.appendChild(overlay);
  }
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 0, b: 0 };
}

function scrollANextSection(currentSection) {
    const nextSection = currentSection.nextElementSibling;
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

async function iniciarMotor() {
  console.log('🎬 MOTOR: Iniciando...');

  try {
    const respuesta = await fetch('./config.json?v=' + Date.now());
    if (!respuesta.ok) throw new Error('No se pudo obtener config.json');

    const config = await respuesta.json();
    const app = document.getElementById('app');
    if (!app) return;

    if (config.estilos_globales?.color_fondo) {
      document.body.style.backgroundColor = config.estilos_globales.color_fondo;
    }

    const baseRuta = obtenerRutaBase();
    const modulosRuta = baseRuta + 'modulos/';

    console.log('📍 Motor listo');

    const listaSecciones = config.secciones || [];
    app.innerHTML = '';

    let index = 0;
    for (const seccion of listaSecciones
      .filter((s) => s.visible)
      .sort((a, b) => a.orden - b.orden)) {
      
      const seccionEl = document.createElement('section');
      seccionEl.id = 'seccion-' + (index + 1);
      seccionEl.dataset.tipo = seccion.tipo;
      seccionEl.style.position = 'relative';
      seccionEl.style.display = 'flex';
      seccionEl.style.flexDirection = 'column';
      seccionEl.style.justifyContent = 'center';
      seccionEl.style.alignItems = 'center';
      
      aplicarFondo(seccionEl, seccion.estilos || {});
      
      // Aplicar altura DESPUÉS de aplicarFondo para que no se sobrescriba
      const altura = seccion.estilos?.fondo?.altura || '100vh';
      seccionEl.style.minHeight = altura;
      
      // Aplicar ancho del contenido al elemento section directamente
      const anchoContenido = seccion.estilos?.fondo?.ancho_contenido || '600px';
      if (anchoContenido && anchoContenido !== '100%') {
        seccionEl.style.maxWidth = anchoContenido;
        seccionEl.style.margin = '0 auto';
        seccionEl.style.left = '0';
        seccionEl.style.right = '0';
      }
      
      const contenido = document.createElement('div');
      contenido.style.cssText = 'position:relative;z-index:2;width:100%;max-width:100%;padding:20px;text-align:center;';
      
      const renderTarget = seccion.tipo === 'slider' ? seccionEl : contenido;
      const esSliderEnSeccion = seccion.tipo === 'slider';
      
      if (seccion.tipo !== 'slider') {
        seccionEl.appendChild(contenido);
      }
      
      const rutaModulo = `${modulosRuta}${seccion.tipo}.js`;
      try {
        const modulo = await import(rutaModulo);
        if (modulo.render) {
          modulo.render(seccion, renderTarget, { 
            scrollANext: () => scrollANextSection(seccionEl),
            reproducirMusica: reproducirMusica,
            esSliderEnSeccion
          });
        }
        
        if (seccion.tipo === 'hero' && seccion.datos?.archivo_musica) {
          const musica = seccion.datos.archivo_musica;
          const urlMusica = musica.includes('/') ? musica : `audio/${musica}`;
          
          audioGlobal = document.createElement('audio');
          audioGlobal.id = 'audio-global';
          audioGlobal.src = urlMusica;
          audioGlobal.loop = true;
          document.body.appendChild(audioGlobal);
          
          crearBotonMusica();
        }
      } catch (err) {
        console.error(`❌ Error en módulo [${seccion.tipo}]:`, err);
        contenido.innerHTML = `<p style="color:red">Error: módulo ${seccion.tipo}</p>`;
      }
      
      app.appendChild(seccionEl);
      index++;
    }
    
    console.log('✅ MOTOR: Renderizado finalizado.');
  } catch (e) {
    console.error('🚨 MOTOR: Error Crítico:', e);
  }
}

if (document.readyState === 'complete') {
  iniciarMotor();
} else {
  window.addEventListener('load', iniciarMotor);
}
