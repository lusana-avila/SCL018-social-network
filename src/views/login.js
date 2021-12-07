import { signIn, googleSignIn, observer } from '../lib/firebase.js';

export const loginUser = () => {
  const drawLogin = document.createElement('section');
  const loginTemplate = `
  
  <div class="login-container">

    <div class="container-images">
      <div class="illustration">
        <img id="illustration" src="img/kambalache_ilustracion.png" alt="man and woman bartering things">
      </div>
    <div class="logo">
        <img id="logo" src="img/kambalache_logo.png" alt="kambalache logo">
      </div>
    </div>

    <div class="login-credentials">
      <div class="form">
        <input type="email" id= "loginEmail" placeholder="Email"></input>
        <input type="password" id= "loginPassword" placeholder="Contraseña"></input>
      </div>

    <div class="buttons">
        <button id= "loginBtn">Iniciar Sesión</button>
        <button id= "googleBtn">Iniciar Sesión con Google</button>
    </div>

    <div class="register-here">
        <h4>¿No tienes cuenta?<a href='#/register'>Regístrate aquí</h4>
    </div>
  
  </div>

  </div>
`;

  drawLogin.innerHTML = loginTemplate;

  const loginBtn = drawLogin.querySelector('#loginBtn');
  loginBtn.addEventListener('click', () => {
    const loginEmail = drawLogin.querySelector('#loginEmail').value;
    const loginPassword = drawLogin.querySelector('#loginPassword').value;
    console.log(loginEmail);
    signIn(loginEmail, loginPassword);
  });

  const googleBtn = drawLogin.querySelector('#googleBtn');
  googleBtn.addEventListener('click', () => {
    googleSignIn();
  });

  return drawLogin;
};

// usuario: marion@hola.cl , contraseña: blabla //
