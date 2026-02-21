console.log('Motor v2: Cargado');
async function iniciar() {
  try {
    const res = await fetch('./config.json');
    const config = await res.json();
    
    // Busca la sección hero dentro del array de secciones
    const hero = config.secciones.find(s => s.tipo === 'hero');

    if (hero && hero.datos) {
      document.getElementById('app').innerHTML = \`
        <div class='hero-section'>
          <h1>${hero.datos.titulo}</h1>
          <p>${hero.datos.frase}</p>
        </div>\`;
    } else {
      document.getElementById('app').innerHTML = '<h1>Error: Datos no encontrados</h1>';
    }
  } catch (e) {
    console.error('Error cargando config:', e);
  }
}
window.onload = iniciar;
