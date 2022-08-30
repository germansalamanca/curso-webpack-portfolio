import Template from './templates/Template.js';
// vamos a añadir los estilos luego de instalar los de css
import './styles/main.css';
// Importamos el archivo styl
import './styles/vars.styl';

(async function App() {
  const main = null || document.getElementById('main');
  main.innerHTML = await Template();
})();
