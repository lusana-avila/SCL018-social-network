import { loginUser } from '../views/login.js';
import { registerUser } from '../views/register.js';
import { home } from '../views/home.js';

export const changeRoute = (hash) => {
  /* aquí abajo se selecciona el div root del html, para rellenarlo con la vista que corresponda
  según la ruta elegida. Recordar que una SPA es una sola página, compuesta de múltiples vistas */
  const root = document.getElementById('root');
  root.innerHTML = '';

  switch (hash) {
    case '':
    case '#':
    case '#/':
    case '#/login':
      root.appendChild(loginUser());
      break;
    case '#/register':
      root.appendChild(registerUser());
      break;
    case '#/home':
      root.appendChild(home());
      break;
    default:
      alert('¡Ups, parece que te has equivocado!');
  }
};
