import { closeSession, addPostToCollection } from '../lib/firebase.js';
import { showPosts } from './posts.js';

export const home = () => {
  const drawHome = document.createElement('section');
  const homeTemplate = `
  <body>
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

        <section class="modal-container" id="modal_container"> 

          <div class="modal">
            
            <div class="modal-post">
              <div class="publication">
                <button class="close-btn" id="close_btn">X</button>
                <input id="modalTitle" class="modal-title" placeholder="   ¿Qué quieres trocar?"></input>
                <textarea id="modalText" class="modal-text" placeholder="   Descríbelo aquí"></textarea >
              </div>
  
              <div class="icons">
                <img id="modal-icon" src="Img/icono-subir-imagen.png">
                <button id="modalBtn" class="modal-btn close-btn"> Publicar </button>
              </div>
            </div>
          </div>
        </section>

        <section class="feed-container" id="feed_container">
        </section>


      </div>
    </div>

  <footer>

    <div class="container-footer">
      <img src="Img/icono-home-verde.png" class="home-green">
      <img src="Img/icono-agregar-post-verde.png" class="post-green add-post">
      <img src="Img/icono-cerrar-sesion-verde.png" class="close-green">
    </div>

  </footer>
  </body>
`;

  drawHome.innerHTML = homeTemplate;

  // se añade la función de cerrar sesión al botón
  const exit = drawHome.querySelector('.close-green');
  exit.addEventListener('click', () => {
    closeSession();
  });

  // se añade el modal al clickear el "falso input"
  const writePost = drawHome.querySelectorAll('.add-post');
  const modal = drawHome.querySelector('.modal-container');
  const closeBtn = drawHome.querySelectorAll('.close-btn');

  writePost.forEach((elem) => {
    elem.addEventListener('click', () => {
      modal.classList.add('show');
    });
  });

  // se añade función para capturar y leer la data al botón Publicar
  const publishBtn = drawHome.querySelector('.modal-btn');
  publishBtn.addEventListener('click', () => {
    const title = drawHome.querySelector('.modal-title').value;
    const description = drawHome.querySelector('.modal-text').value;
    console.log(title, description);
    addPostToCollection(title, description);
  });

  showPosts();

  closeBtn.forEach((elem) => {
    elem.addEventListener('click', () => {
      modal.classList.remove('show');
      document.getElementById('modalTitle').value = '';
      document.getElementById('modalText').value = '';
    });
  });

  return drawHome;
};
