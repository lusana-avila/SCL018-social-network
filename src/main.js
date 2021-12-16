// Este es el punto de entrada de tu aplicacion

// import { observer } from './lib/firebase.js';
import { myFunction } from './lib/index.js';
import { changeRoute } from './lib/router.js';

myFunction();
const init = () => {
  window.location.hash = '#/';
  window.addEventListener('hashchange', () => {
    // observer();
    changeRoute(window.location.hash);
  });
};

window.addEventListener('load', init);
