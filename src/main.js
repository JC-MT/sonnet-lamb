import './styles/tailwind.css';
import { Application } from '@hotwired/stimulus';
import MenuController from './controllers/menu_controller';
import SliderController from './controllers/slider_controller';
import ParallaxController from './controllers/parallax_controller';
import EmailController from './controllers/email_controller';

window.Stimulus = Application.start();
Stimulus.register('menu', MenuController);
Stimulus.register('slider', SliderController);
Stimulus.register('parallax', ParallaxController);
Stimulus.register('email', EmailController);
