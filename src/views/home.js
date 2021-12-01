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
    <button id="write" class="write">¿Qué hay de nuevo?</button>
    <button class="false-post">Publicar</button>
  </div>
</div>

<footer>
  <div class="container-footer">
    <img src="Img/icono-home-verde.png" class="home-verde" a href='#/home'>
    <img src="Img/icono-agregar-post-verde.png" class="post-verde">
    <img src="Img/icono-cerrar-sesion-verde.png" class="cerrarsesion-verde" a href='#/login'>
  </div>
</footer>
`;

  drawHome.innerHTML = homeTemplate;
  return drawHome;
};
