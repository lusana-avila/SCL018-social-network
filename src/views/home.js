import { closeSession } from '../lib/firebase.js';

export const home = () => {
  const drawHome = document.createElement('section');
  const homeTemplate = `
  <header>
  <div class="container-header">
    <div class="container-kambalache-verde">
      <img src="Img/kambalache_logo_verde.png" id="logoVerde">
    </div>
  </div>
</header>

<div class="wall">
  <div class="post">
    <button id="write" class="write">¿Qué quieres trocar? ... </button>
    <div id="picture">
    <img id="picture-icon" src="Img/icono-subir-imagen.png">
    </div>
    </div>
</div>

<footer>
  <div class="container-footer">
    <img src="Img/icono-home-verde.png" class="home-green">
    <img src="Img/icono-agregar-post-verde.png" class="post-green">
    <img src="Img/icono-cerrar-sesion-verde.png" class="close-green">
  </div>
</footer>
`;

  drawHome.innerHTML = homeTemplate;

  const exit = drawHome.querySelector('.close-green');
  exit.addEventListener('click', () => {
    closeSession();
  });

  return drawHome;
};
