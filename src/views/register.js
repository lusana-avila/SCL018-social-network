import { createUser } from '../lib/firebase.js';

export const registerUser = () => {
  const drawRegister = document.createElement('section'); // crea un nodo de tipo element
  const registerTemplate = `
  
  <div class="register-container">

    <div class="container-images">
      <div class="illustration">
        <img id="illustration" src="img/kambalache_ilustracion.png" alt="man and woman bartering things">
      </div>
      <div class="logo">
        <img id="logo" src="img/kambalache_logo.png" alt="kambalache logo">
      </div>
      </div>

      <div class="register-credentials">
      <div class="form">
        <input type="text" id="name" placeholder="Nombre de usuario"></input>
        <input type="email" id="email" placeholder="Email"></input>
        <input type="password" id="password" placeholder="Contraseña"></input>
      </div>

      <div class="buttons">
        <button id="registerBtn">Registrate</button>
      </div>

      <div class="conditions">
        <h4>Al hacer click en “Registrarte”, confirmo que leí y acepto los <a href='#/login'>Acuerdos de convivencia.</a></h4>
      </div>

      <div class="login-here">
        <h4>¿Ya tienes cuenta?<a href='#/login'>Inicia sesión aqui</a></h4>
      </div>
  
    </div>
  </div>
`;

  drawRegister.innerHTML = registerTemplate;
  // preguntar por que querySelector y no getelementbyid
  const registerBtn = drawRegister.querySelector('#registerBtn');
  registerBtn.addEventListener('click', () => {
    const email = drawRegister.querySelector('#email').value;
    const password = drawRegister.querySelector('#password').value;
    console.log(email);
    createUser(email, password);
  });
  return drawRegister;
};
