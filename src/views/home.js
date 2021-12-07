import { closeSession, addPostToCollection, readData } from '../lib/firebase.js';

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

<div class="main">
<div class="wall">

  <div class="post">
 
    <button id="write" class="write add-post">¿Qué quieres trocar?... </button>
    <div class="picture">
    <img id="picture-icon" src="Img/icono-subir-imagen.png">
    </div>
    
</div>

</div>
</div>

<footer>
  <div class="container-footer">
    <img src="Img/icono-home-verde.png" class="home-green">
    <img src="Img/icono-agregar-post-verde.png" class="post-green add-post">
    <img src="Img/icono-cerrar-sesion-verde.png" class="close-green">
  </div>
</footer>
`;

  drawHome.innerHTML = homeTemplate;

  // se añade la función de cerrar sesión al botón
  const exit = drawHome.querySelector('.close-green');
  exit.addEventListener('click', () => {
    closeSession();
  });

  // se añade el modal al clickear el "falso input"
  const writePost = drawHome.querySelectorAll('.add-post');
  writePost.forEach((elem) => {
    elem.addEventListener('click', () => {
      const wallForModal = drawHome.querySelector('.main');
      const drawModal = `
  
  <div class="modal">
  <div class="modal-post">
    <div class="publication">
    <input id="modalTitle" class="modal-title" placeholder="   ¿Qué quieres trocar?"></input>
    <textarea id="modalText" class="modal-text" placeholder="   Descríbelo aquí"></textarea >
    </div>
    <div class="icons">
    <img id="modal-icon" src="Img/icono-subir-imagen.png">
    <button id="modalBtn" class="modal-btn"> Publicar </button>
    </div>
    </div>
  </div>
  `;

      wallForModal.innerHTML = drawModal;

      // se añade función para capturar y leer la data al botón Publicar
      const publishBtn = drawHome.querySelector('#modalBtn');
      publishBtn.addEventListener('click', () => {
        const title = drawHome.querySelector('#modalTitle').value;
        const description = drawHome.querySelector('#modalText').value;
        console.log(title, description);
        addPostToCollection(title, description);
        readData();
        wallForModal.innerHTML = '';
        // drawHome.innerHTML = homeTemplate;
      /*  readData().then((value) => {
          // crear función para imprimir el html, pasándole value. Iterar y eso debe arrojar el html
          console.log(value);
        }); */
      });
      return drawModal;
    });
  });
  return drawHome;
};
