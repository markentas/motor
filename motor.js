let audioGlobal = null;
let musicaIniciada = false;

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
    css += `background-image: url('${urlImagen}'); background-size: cover; background-position: center;`;
  } else {
    css += `background-color: ${fondo.color || '#0a0a0a'};`;
  }
  
  seccionEl.style.cssText = css;
  
  if (fondo.tipo === 'imagen' && fondo.overlay_opacidad > 0) {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,' + fondo.overlay_opacidad + ');z-index:1;';
    seccionEl.appendChild(overlay);
  }
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
      seccionEl.style.minHeight = '100vh';
      seccionEl.style.position = 'relative';
      seccionEl.style.display = 'flex';
      seccionEl.style.flexDirection = 'column';
      seccionEl.style.justifyContent = 'center';
      seccionEl.style.alignItems = 'center';
      
      aplicarFondo(seccionEl, seccion.estilos || {});
      
      const contenido = document.createElement('div');
      contenido.style.cssText = 'position:relative;z-index:2;width:100%;max-width:600px;padding:20px;text-align:center;';
      seccionEl.appendChild(contenido);
      
      const rutaModulo = `${modulosRuta}${seccion.tipo}.js`;
      try {
        const modulo = await import(rutaModulo);
        if (modulo.render) {
          modulo.render(seccion, contenido, { 
            scrollANext: () => scrollANextSection(seccionEl),
            reproducirMusica: reproducirMusica
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
