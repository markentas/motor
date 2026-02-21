console.log('Motor cargado');
async function iniciar() {
  const res = await fetch('./config.json');
  const config = await res.json();
  document.getElementById('app').innerHTML = '<h1>' + config.datos.titulo + '</h1>';
}
window.onload = iniciar;
