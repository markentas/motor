export function render(seccion, contenedor, helpers) {
  const { datos, estilos } = seccion;
  
  const container = document.createElement('section');
  container.style.position = 'relative';
  container.style.width = datos.ancho || '100%';
  container.style.minHeight = datos.alto || '100vh';
  container.style.overflow = 'hidden';
  
  // Imagen de fondo
  if (datos.imagen) {
    const img = document.createElement('img');
    img.src = datos.imagen;
    img.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    `;
    
    // Efecto zoom
    if (datos.efecto_zoom) {
      img.style.transition = 'transform 10s ease';
      img.style.transform = 'scale(1.1)';
    }
    
    // Efecto parallax (simple)
    if (datos.efecto_parallax) {
      window.addEventListener('scroll', () => {
        const rect = container.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
        const offset = (scrollPercent - 0.5) * 50;
        img.style.transform = `translateY(${offset}px) ${datos.efecto_zoom ? 'scale(1.1)' : 'scale(1)'}`;
      });
    }
    
    container.appendChild(img);
  }
  
  // Overlay (capa de color)
  if (datos.overlay_opacidad > 0) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${datos.overlay_color || '#000000'};
      opacity: ${datos.overlay_opacidad || 0};
      z-index: 2;
      pointer-events: none;
    `;
    container.appendChild(overlay);
  }
  
  contenedor.appendChild(container);
}
