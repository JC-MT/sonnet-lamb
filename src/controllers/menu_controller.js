import { Controller } from '@hotwired/stimulus';
const routes = {
  404: './src/pages/404.html',
  '/': './src/pages/home.html',
  '/About': './src/pages/about.html'
};

export default class extends Controller {
  static targets = ['navLinks'];

  initialize() {
    this.handleLocation();
    window.onpopstate = this.handleLocation;
  }

  handleLocation() {
    const { pathname } = window.location;
    const mainPage = document.getElementById('main-page');
    const route = routes[pathname] || routes[404];
    fetch(route)
      .then((response) => response.text())
      .then((html) => {
        mainPage.innerHTML = html;
      })
      .catch((error) => {
        console.error('Failed to load the page:', error);
      });
  }

  handleRouting(e) {
    e.preventDefault();
    window.history.pushState({}, '', e.target.href);
    this.handleLocation();
    window.innerWidth <= 767 ? this.toggleMenu() : null;
  }

  toggleMenu() {
    const { classList } = this.navLinks;
    classList.remove('duration-0');
    classList.add('duration-500');
    classList.toggle('opacity-0');

    setTimeout(() => {
      classList.remove('duration-500');
      classList.add('duration-0');
    }, 500);
  }

  get navLinks() {
    return this.navLinksTarget;
  }
}
