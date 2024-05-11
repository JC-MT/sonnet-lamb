import { Application } from '@hotwired/stimulus';

import MenuController from './controllers/menu_controller';

window.Stimulus = Application.start();
Stimulus.register('menu', MenuController);

document.querySelector('#app').innerHTML = `
  <div>
    <h1>Hello World!</h1>
  </div>
`;
