export function render(seccion, contenedor, helpers = {}) {
  const { datos, estilos } = seccion;
  const esSliderEnSeccion = helpers.esSliderEnSeccion || false;
  
  const parseMargin = (marginStr) => {
    if (!marginStr) return '';
    const values = marginStr.trim().split(/\s+/);
    if (values.length === 1) return `${values[0]} ${values[0]} ${values[0]} ${values[0]}`;
    if (values.length === 2) return `${values[0]} ${values[1]} ${values[0]} ${values[1]}`;
    if (values.length === 3) return `${values[0]} ${values[1]} ${values[2]} ${values[1]}`;
    return `${values[0]} ${values[1]} ${values[2]} ${values[3]}`;
  };
  
  const imagenes = (datos.imagenes || []).map(img => {
    return typeof img === 'string' ? { ruta: img, orientacion: 'cover', proporcion: '' } : { proporcion: '', ...img };
  });
  const autoplay = datos.autoplay !== false;
  const intervalo = datos.intervalo || 3000;
  const mostrarNavegacion = datos.mostrar_navegacion !== false;
  const mostrarPuntos = datos.mostrar_puntos !== false;
  
  const fondo = estilos.fondo || {};
  const imgEstilos = estilos.imagenes || {};
  
  const altura = fondo.altura || imgEstilos.altura || '100vh';
  const objectFit = imgEstilos.object_fit || 'cover';
  
  const container = document.createElement('div');
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = altura;
  container.style.overflow = 'hidden';
  
  if (!esSliderEnSeccion) {
    if (fondo.tipo === 'color') {
      container.style.backgroundColor = fondo.color || '#0a0a0a';
    } else if (fondo.tipo === 'imagen' && fondo.imagen) {
      container.style.backgroundImage = `url(${fondo.imagen})`;
      container.style.backgroundSize = 'cover';
      container.style.backgroundPosition = 'center';
      if (fondo.overlay_opacidad) {
        container.style.position = 'relative';
        const overlay = document.createElement('div');
        overlay.style.position = 'absolute';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = `rgba(0,0,0,${fondo.overlay_opacidad})`;
        overlay.style.zIndex = '1';
        container.appendChild(overlay);
      }
    }
  }
  
  const sliderTrack = document.createElement('div');
  sliderTrack.id = `slider-track-${Date.now()}`;
  sliderTrack.style.display = 'flex';
  sliderTrack.style.transition = 'transform 0.5s ease-in-out';
  sliderTrack.style.height = '100%';
  sliderTrack.style.zIndex = fondo.tipo === 'imagen' && fondo.overlay_opacidad ? '2' : '1';
  sliderTrack.style.position = 'relative';
  
  imagenes.forEach((imgData) => {
    const imgContainer = document.createElement('div');
    imgContainer.style.minWidth = '100%';
    imgContainer.style.height = '100%';
    imgContainer.style.position = 'relative';
    
    const img = document.createElement('img');
    img.src = imgData.ruta;
    
    const orientacion = imgData.orientacion || objectFit;
    const proporcion = imgData.proporcion;
    
    if (orientacion === 'background') {
      img.style.width = '100vw';
      img.style.height = 'auto';
      img.style.maxWidth = 'none';
    } else {
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = orientacion;
    }
    
    if (proporcion) {
      imgContainer.style.aspectRatio = proporcion;
    }
    
    img.style.transform = `rotate(${imgData.rotacion || 0}deg)`;
    img.draggable = false;
    
    imgContainer.appendChild(img);
    sliderTrack.appendChild(imgContainer);
  });
  
  container.appendChild(sliderTrack);
  
  let puntosContainer = null;
  
  if (mostrarPuntos && imagenes.length > 1) {
    const puntosEstilos = imgEstilos.puntos || {};
    puntosContainer = document.createElement('div');
    puntosContainer.style.position = 'absolute';
    puntosContainer.style.bottom = puntosEstilos.posicion || '20px';
    puntosContainer.style.left = '50%';
    puntosContainer.style.transform = 'translateX(-50%)';
    puntosContainer.style.display = 'flex';
    puntosContainer.style.gap = puntosEstilos.gap || '10px';
    puntosContainer.style.zIndex = '10';
    
    imagenes.forEach((_, index) => {
      const punto = document.createElement('div');
      punto.style.width = puntosEstilos.tamano || '10px';
      punto.style.height = puntosEstilos.tamano || '10px';
      punto.style.borderRadius = '50%';
      punto.style.background = index === 0 ? (puntosEstilos.color_activo || '#fff') : (puntosEstilos.color_inactivo || 'rgba(255,255,255,0.5)');
      punto.style.cursor = 'pointer';
      punto.style.transition = 'background 0.3s';
      punto.onclick = () => irASlide(index);
      puntosContainer.appendChild(punto);
    });
    
    container.appendChild(puntosContainer);
  }
  
  if (mostrarNavegacion && imagenes.length > 1) {
    const navEstilos = imgEstilos.navegacion || {};
    const colorBtn = navEstilos.color || 'rgba(0,0,0,0.5)';
    const colorIcono = navEstilos.color_icono || '#fff';
    
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '&#10094;';
    prevBtn.style.position = 'absolute';
    prevBtn.style.left = navEstilos.lado_izquierdo || '10px';
    prevBtn.style.top = '50%';
    prevBtn.style.transform = 'translateY(-50%)';
    prevBtn.style.background = colorBtn;
    prevBtn.style.border = 'none';
    prevBtn.style.color = colorIcono;
    prevBtn.style.fontSize = navEstilos.tamano_icono || '24px';
    prevBtn.style.padding = navEstilos.padding || '15px';
    prevBtn.style.cursor = 'pointer';
    prevBtn.style.borderRadius = '50%';
    prevBtn.style.zIndex = '10';
    prevBtn.onclick = () => cambiarSlide(-1);
    
    const nextBtn = document.createElement('button');
    nextBtn.innerHTML = '&#10095;';
    nextBtn.style.position = 'absolute';
    nextBtn.style.right = navEstilos.lado_derecho || '10px';
    nextBtn.style.top = '50%';
    nextBtn.style.transform = 'translateY(-50%)';
    nextBtn.style.background = colorBtn;
    nextBtn.style.border = 'none';
    nextBtn.style.color = colorIcono;
    nextBtn.style.fontSize = navEstilos.tamano_icono || '24px';
    nextBtn.style.padding = navEstilos.padding || '15px';
    nextBtn.style.cursor = 'pointer';
    nextBtn.style.borderRadius = '50%';
    nextBtn.style.zIndex = '10';
    nextBtn.onclick = () => cambiarSlide(1);
    
    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
  }
  
  if (imagenes.length > 1) {
    container.style.cursor = 'pointer';
    container.onclick = (e) => {
      if (e.target.tagName === 'IMG' || e.target.tagName === 'BUTTON') return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      if (x < width / 3) {
        cambiarSlide(-1);
      } else if (x > (width * 2) / 3) {
        cambiarSlide(1);
      }
    };
  }
  
  contenedor.appendChild(container);
  
  let slideActual = 0;
  let intervalId = null;
  const totalSlides = imagenes.length;
  
  function actualizarSlider() {
    sliderTrack.style.transform = `translateX(-${slideActual * 100}%)`;
    
    if (mostrarPuntos && puntosContainer) {
      const puntos = puntosContainer.querySelectorAll('div');
      const puntosEstilos = imgEstilos.puntos || {};
      puntos.forEach((punto, i) => {
        punto.style.background = i === slideActual ? (puntosEstilos.color_activo || '#fff') : (puntosEstilos.color_inactivo || 'rgba(255,255,255,0.5)');
      });
    }
  }
  
  function cambiarSlide(direccion) {
    slideActual += direccion;
    if (slideActual < 0) slideActual = totalSlides - 1;
    if (slideActual >= totalSlides) slideActual = 0;
    actualizarSlider();
    
    if (autoplay) {
      reiniciarAutoplay();
    }
  }
  
  function irASlide(index) {
    slideActual = index;
    actualizarSlider();
    
    if (autoplay) {
      reiniciarAutoplay();
    }
  }
  
  function reiniciarAutoplay() {
    if (intervalId) {
      clearInterval(intervalId);
    }
    if (autoplay && totalSlides > 1) {
      intervalId = setInterval(() => {
        cambiarSlide(1);
      }, intervalo);
    }
  }
  
  if (autoplay && totalSlides > 1) {
    intervalId = setInterval(() => {
      cambiarSlide(1);
    }, intervalo);
  }
}
