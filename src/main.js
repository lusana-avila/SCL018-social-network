import { observer } from './lib/firebase.js';
import { changeRoute } from './lib/router.js';

window.addEventListener('load', () => {
  changeRoute(window.location.hash);
  observer();
});

window.addEventListener('hashchange', () => {
  changeRoute(window.location.hash);
  observer();
});
